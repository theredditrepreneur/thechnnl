import type { Metadata } from "next";
export const metadata: Metadata = { title: "Opportunities", description: "Creator programmes, jobs, affiliate opportunities, brand partnerships and other ways to build a career or business around online content." };
const filters = ["All", "Jobs", "Creator programmes", "Brand opportunities", "Affiliate programmes", "Events"];
const opportunities = [
  { type: "Jobs", title: "Social commerce content producer", org: "Example commerce studio", location: "London / Hybrid" },
  { type: "Creator programmes", title: "Emerging creator commerce cohort", org: "Example programme", location: "UK / Remote" },
  { type: "Affiliate programmes", title: "Home and lifestyle affiliate network", org: "Example retail platform", location: "Remote" },
  { type: "Events", title: "Creator economy operators roundtable", org: "Example event", location: "Manchester" },
];
export default function Opportunities() { return <div className="page-shell wrap"><header className="category-header opportunities-header"><span className="eyebrow">Careers / programmes / partnerships</span><h1>Find opportunities in the creator economy.</h1><p>Creator programmes, jobs, affiliate opportunities, brand partnerships and other ways to build a career or business around online content.</p></header><div className="demo-note"><strong>Launch preview</strong> These listings are clearly marked sample entries and are not live opportunities.</div><nav className="filter-row" aria-label="Opportunity filters">{filters.map((f, i) => <button key={f} className={i === 0 ? "active" : ""}>{f}</button>)}</nav><section className="opportunity-list">{opportunities.map((o, i) => <article key={o.title}><span className="opportunity-index">0{i + 1}</span><div><span className="eyebrow">Sample · {o.type}</span><h2>{o.title}</h2><p>{o.org}</p></div><span className="location">{o.location}</span><button aria-label={`View ${o.title}`}>→</button></article>)}</section></div> }
