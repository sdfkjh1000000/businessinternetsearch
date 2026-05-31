// Read-only FAQ for Business Internet Quotes. The site's genuine machine-readable
// data: question/answer pairs about business internet, coverage, and the quote process.
// Mirrored by the MCP server (/mcp). Documented at /.well-known/faq-openapi.json.
// Read-only only — the lead/quote form is never exposed here.
import { SITE, FAQ } from "../_data.js";

export async function onRequest() {
  const body = JSON.stringify(
    {
      name: "Business Internet Quotes FAQ",
      description: "Common questions about business internet, coverage lookups, and the quote process. Read-only, public, no authentication.",
      site: SITE.url,
      count: FAQ.length,
      faq: FAQ,
    },
    null,
    2
  );
  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Content-Signal": "search=yes, ai-input=yes, ai-train=no",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
