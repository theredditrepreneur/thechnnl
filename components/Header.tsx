"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { SiteSettings } from "../lib/content";
export function Header({settings}: {settings: SiteSettings}) {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="topbar wrap">
      <Link href="/" className="wordmark" aria-label={`${settings.publicationName} home`}>{settings.logoUrl ? <Image className="header-logo" src={settings.logoUrl} alt={settings.logo?.alt || settings.publicationName} width={240} height={80} priority /> : <><span>THE</span> CHNNL<i /></>}</Link>
      <nav className="desktop-nav" aria-label="Main navigation">{settings.navigation.map(n => <Link key={n.href} href={n.href}>{n.label}</Link>)}</nav>
      <div className="actions"><Link href="/search" className="search-link">Search</Link><a href="#subscribe" className="button small">Subscribe</a><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu"><span /><span /></button></div>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{settings.navigation.map(n => <Link onClick={() => setOpen(false)} key={n.href} href={n.href}>{n.label}</Link>)}<Link href="/search">Search</Link></nav>}
  </header>;
}
