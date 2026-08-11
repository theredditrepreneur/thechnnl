"use client";
import Link from "next/link";
import { useState } from "react";

const nav = ["Latest", "Commerce", "Business", "Platforms", "Brands", "People", "Opportunities"];
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="topbar wrap">
      <Link href="/" className="wordmark" aria-label="The Chnnl home"><span>THE</span> CHNNL<i /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(n => <Link key={n} href={`/${n.toLowerCase()}`}>{n}</Link>)}</nav>
      <div className="actions"><Link href="/search" className="search-link">Search</Link><a href="#subscribe" className="button small">Subscribe</a><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu"><span /><span /></button></div>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{nav.map(n => <Link onClick={() => setOpen(false)} key={n} href={`/${n.toLowerCase()}`}>{n}</Link>)}<Link href="/search">Search</Link></nav>}
  </header>;
}
