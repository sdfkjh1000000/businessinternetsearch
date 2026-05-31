// Canonical Business Internet Quotes data served by the API endpoint and MCP tools.
// Read-only; no PII, no writes, no lead-form access. FAQ extracted from the live page.
export const SITE = {
  name: "Business Internet Quotes",
  url: "https://businessinternetsearch.sdfkjh.com",
  email: "quotes@businessinternetsearch.sdfkjh.com",
  overview:
    "Business Internet Quotes is a free service that finds business-grade internet providers serviceable " +
    "at a specific commercial address and returns quotes — monthly cost, install timeline, hardware fees, " +
    "and contract length. The business submits its details once; the service is free to the business and " +
    "carriers pay a referral commission when a business signs. Not a carrier or reseller; submitted " +
    "information is not sold. Business-grade focus: symmetrical speeds, SLAs, static IPs, dedicated lines.",
  howItWorks: [
    "Submit your business name, service address, and contact details once.",
    "We check the business-grade ISPs serviceable at that exact address.",
    "You receive quotes including monthly cost, install timeline, hardware fees, and contract length."
  ]
};
export const FAQ = [
  {
    "q": "Why does every provider tell me \"no service available\" at my business address?",
    "a": "ISP coverage lookups are built from population data and assume residential coverage. Business connections — especially fiber and Ethernet — are often deployed building-by-building, not address-by-address. Your building might literally have fiber in the riser closet that the public lookup doesn't know about. The only way to know what's actually available is to check directly with each carrier's commercial team for your address."
  },
  {
    "q": "How do I find out which carriers actually serve my building?",
    "a": "You can call each carrier's commercial line individually — typically a dozen calls and a few days of waiting on callbacks. Or submit your address once on this site, and we check every regional and national carrier serving that location in parallel. Either route works; ours is faster."
  },
  {
    "q": "My building shows \"no fiber available\" — what are my actual options?",
    "a": "Several, depending on the address: Build-out request — some carriers will run fiber to your building if you commit to a 3–5 year contract, sometimes at no upfront cost. Fixed wireless — line-of-sight providers can deliver business-grade service in days, not months. Business cable — DOCSIS often serves buildings where fiber doesn't. Bonded copper / Ethernet over copper — older but still available in some areas. Starlink Business — viable backup, and sometimes primary, in coverage gaps. We can tell you which of these actually apply at your specific address."
  },
  {
    "q": "Do I need \"business internet,\" or can I just get residential service?",
    "a": "Residential is cheaper, but the differences matter for most businesses: SLAs — business plans typically include uptime guarantees with bill credits when missed. Residential has none. Static IPs — required to host VPN, on-premise software, security cameras with remote access, or VoIP systems. Support priority — business calls usually skip the residential queue. Symmetrical speeds — many business plans match upload to download. Residential rarely does. Terms of service — many residential ISP contracts technically prohibit business use. A one-person operation with no critical apps is sometimes fine on residential. Past that, business plans tend to pay for themselves the first time something breaks."
  },
  {
    "q": "Do I really need fiber, or is cable enough?",
    "a": "Cable (DOCSIS) can deliver fast downloads — often 1 Gbps or more — but uploads are usually 35–50 Mbps, which throttles video calls, cloud backups, VoIP quality, and remote access. Fiber is symmetrical and generally more reliable. For businesses with VoIP phones, video conferencing, cloud-hosted software, or remote workers, fiber is usually worth the premium. For email and light web use, cable is often fine."
  },
  {
    "q": "What speed does my business actually need?",
    "a": "Rough rule of thumb: 10 Mbps per person for typical office work (email, web, video calls), plus headroom for file sharing, backups, and security cameras. A 20-person office wants roughly 200 Mbps symmetric. Heavy users — designers, video editors, anyone moving large files — need more. The bigger question is usually upload speed, not download, since most businesses end up bottlenecked on the upload side."
  },
  {
    "q": "How much should I expect to pay for business internet?",
    "a": "It varies by location and technology, but typical US ranges: Business cable, 300 Mbps–1 Gbps: $100–$250/mo Fiber, 500 Mbps symmetric: $150–$400/mo Fiber, 1 Gbps symmetric: $200–$700/mo Dedicated fiber with hard SLAs: $500–$2,000+/mo Same speed at the same address can vary significantly between carriers — which is why getting actual quotes matters more than ballpark numbers."
  },
  {
    "q": "Are business internet contracts negotiable?",
    "a": "Yes, almost always. Carrier reps typically have room to discount the monthly rate, waive installation fees, extend free-trial windows, or upgrade speed tiers at the same price. Longer contracts (3 or 5 year) generally get better rates than month-to-month. You can negotiate directly, but having competitive quotes from other carriers in hand gives you real leverage."
  },
  {
    "q": "What's an SLA and does my business need one?",
    "a": "A Service Level Agreement is a contractual uptime guarantee — typically 99.9% (about 9 hours of allowed downtime per year) or 99.99% (about 53 minutes per year). When the carrier misses it, you get bill credits. If your business loses real money during an outage — e-commerce, patient care, restaurant POS, manufacturing — a real SLA is usually worth paying for. If a day of downtime is annoying but not catastrophic, you don't strictly need one."
  },
  {
    "q": "Do I need a static IP for my office?",
    "a": "You need a static IP if you: Host inbound services (VPN, on-premise email, custom software accessed from outside) Run security cameras or building controls accessed remotely Operate a VoIP phone system or on-site PBX Need to whitelist a fixed IP with a vendor or partner Otherwise, dynamic IPs are fine and cheaper."
  },
  {
    "q": "Should I get a backup internet connection?",
    "a": "If your business depends on internet — meaning a several-hour outage costs real money or stops work — yes. Common backup patterns: a second wired connection from a different carrier (best), fixed wireless (good), or cellular failover (acceptable for short outages). The cost of backup is almost always less than one bad outage at the wrong time."
  },
  {
    "q": "We're moving to a new office — how early should I order internet?",
    "a": "Sooner than you think. Typical install lead times: Cable / DOCSIS — 1–3 weeks if service exists in the building Lit fiber (carrier already in the building) — 2–4 weeks New fiber drop — 60–120 days, sometimes longer if construction permits are involved Fixed wireless — 1–2 weeks once line-of-sight is confirmed Start checking carrier availability the day you sign the lease, not after."
  },
  {
    "q": "How long does business internet installation usually take?",
    "a": "Cable / DOCSIS: 1–3 weeks if service already exists in the building Lit fiber: 2–4 weeks New fiber drop: 60–120 days, longer for permitting-heavy locations Fixed wireless: 1–2 weeks once line-of-sight is confirmed Bonded copper: 2–4 weeks"
  },
  {
    "q": "What's the catch? Why is the quote service free?",
    "a": "No catch. When a business chooses internet service through us, the carrier pays us a small ongoing referral commission — it doesn't add anything to your bill, and the price you see is the same price you'd get going direct. If you don't sign service, we don't get paid. That's the whole model. We're not a carrier, not a reseller, and we don't sell your information."
  }
];
