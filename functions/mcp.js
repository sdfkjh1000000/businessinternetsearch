// Business Internet Quotes MCP server — stateless Streamable HTTP, read-only tools,
// served as a Pages Function at /mcp (same origin). No sessions, no SSE: every POST
// gets one JSON-RPC response. Tools expose the service overview and FAQ only — the
// lead/quote form (which collects PII) is never exposed.
import { SITE, FAQ } from "./_data.js";

const PROTOCOL_VERSION = "2025-06-18";
const SERVER_INFO = { name: "businessinternetsearch-mcp", title: "Business Internet Quotes", version: "1.0.0" };
const INSTRUCTIONS =
  "Read-only information about Business Internet Quotes, a free service that finds business-grade internet " +
  "providers serviceable at a commercial address. Use the tools to explain the service and answer FAQs. " +
  "Submitting a quote request is done by a person on the website, not through this server.";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Mcp-Session-Id, MCP-Protocol-Version, Authorization",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version",
};

const ENDPOINT = `${SITE.url}/mcp`;

const TOOLS = [
  {
    name: "get_overview",
    title: "Service overview",
    description: "What Business Internet Quotes is, how it works, who pays, and how to make contact.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_faqs",
    title: "List FAQs",
    description: "Every question and answer about business internet, coverage lookups, and the quote process.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "search_faqs",
    title: "Search FAQs",
    description: "Find FAQ entries whose question or answer matches a keyword (e.g. 'fiber', 'SLA', 'contract', 'install').",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Keyword to match against FAQ questions and answers." } },
      required: ["query"],
      additionalProperties: false,
    },
  },
];

function callTool(name, args = {}) {
  switch (name) {
    case "get_overview": {
      const text =
        `${SITE.name} — ${SITE.overview}\n\nHow it works:\n` +
        SITE.howItWorks.map((s, i) => `${i + 1}. ${s}`).join("\n") +
        `\n\nContact: ${SITE.email} · ${SITE.url}`;
      return { text };
    }
    case "list_faqs": {
      const text =
        `Business Internet Quotes FAQ (${FAQ.length}):\n\n` +
        FAQ.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
      return { text };
    }
    case "search_faqs": {
      const q = String(args.query || "").trim().toLowerCase();
      if (!q) return { error: "Provide a non-empty 'query'." };
      const hits = FAQ.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
      const text = hits.length
        ? `FAQ entries matching "${args.query}":\n\n` + hits.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")
        : `No FAQ entries matched "${args.query}". See all FAQs at ${SITE.url}/faq.`;
      return { text };
    }
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

const ok = (id, result) => ({ jsonrpc: "2.0", id, result });
const err = (id, code, message) => ({ jsonrpc: "2.0", id, error: { code, message } });

function handle(msg) {
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    return msg && msg.id !== undefined ? err(msg.id, -32600, "Invalid Request") : null;
  }
  const { id, method, params } = msg;
  const isRequest = id !== undefined && id !== null;
  switch (method) {
    case "initialize":
      return ok(id, {
        protocolVersion: params?.protocolVersion || PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: INSTRUCTIONS,
      });
    case "ping":
      return ok(id, {});
    case "tools/list":
      return ok(id, { tools: TOOLS });
    case "tools/call": {
      const r = callTool(params?.name, params?.arguments || {});
      if (r.error) return ok(id, { content: [{ type: "text", text: r.error }], isError: true });
      return ok(id, { content: [{ type: "text", text: r.text }] });
    }
    default:
      if (method.startsWith("notifications/")) return null;
      return isRequest ? err(id, -32601, `Method not found: ${method}`) : null;
  }
}

export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

  if (request.method === "GET") {
    return Response.json(
      {
        server: SERVER_INFO,
        transport: "streamable-http",
        endpoint: ENDPOINT,
        protocolVersion: PROTOCOL_VERSION,
        tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
        docs: SITE.url,
      },
      { headers: CORS }
    );
  }

  if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json(err(null, -32700, "Parse error"), { status: 400, headers: CORS });
  }

  const batch = Array.isArray(payload);
  const messages = batch ? payload : [payload];
  const responses = [];
  for (const m of messages) {
    const r = handle(m);
    if (r !== null) responses.push(r);
  }
  if (responses.length === 0) return new Response(null, { status: 202, headers: CORS });
  return Response.json(batch ? responses : responses[0], {
    headers: { ...CORS, "MCP-Protocol-Version": PROTOCOL_VERSION },
  });
}
