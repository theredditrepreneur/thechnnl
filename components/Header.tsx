"use client";
import Image from "next/image";
import { useState } from "react";
import type { SiteSettings } from "../lib/content";
export function Header({settings}: {settings: SiteSettings}) {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="topbar wrap">
      <a href="/" className="wordmark" aria-label={`${settings.publicationName} home`}>{settings.logoUrl ? <Image className="header-logo" src={settings.logoUrl} alt={settings.logo?.alt || settings.publicationName} width={240} height={80} priority /> : <><span>THE</span> CHNNL<i /></>}</a>
      <nav className="desktop-nav" aria-label="Main navigation">{settings.navigation.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
      <div className="actions"><a href="/search" className="search-link">Search</a><a href="#subscribe" className="button small">Subscribe</a><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu"><span /><span /></button></div>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{settings.navigation.map(n => <a onClick={() => setOpen(false)} key={n.href} href={n.href}>{n.label}</a>)}<a href="/search">Search</a></nav>}
  </header>;
}
