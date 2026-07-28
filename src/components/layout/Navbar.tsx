"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
  { name: "Reservations", href: "/reservations" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        {
          "bg-white/90 backdrop-blur-md py-4 border-black/10": isScrolled || isMobileMenuOpen,
          "bg-transparent py-6": !isScrolled && !isMobileMenuOpen,
        }
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-heading font-semibold text-black tracking-wider flex-shrink-0"
        >
          L&apos;ÉTOILE
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "text-sm tracking-widest uppercase transition-colors hover:text-(--color-accent)",
                pathname === link.href ? "text-(--color-accent)" : "text-black/80"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA (Desktop) */}
        <div className="hidden md:block">
          <Link
            href="/reservations"
            className="px-6 py-2 border border-(--color-accent) text-(--color-accent) uppercase text-sm tracking-widest hover:bg-(--color-accent) hover:text-black transition-colors duration-300"
          >
            Book a Table
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-black p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[73px] left-0 right-0 h-[calc(100vh-73px)] bg-white/95 backdrop-blur-xl border-t border-black/10 p-6 flex flex-col gap-6 overflow-y-auto pb-24"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-xl tracking-widest uppercase transition-colors py-2 border-b border-black/10",
                  pathname === link.href ? "text-(--color-accent)" : "text-black"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/reservations"
              className="mt-6 px-6 py-4 text-center border border-(--color-accent) bg-(--color-accent)/10 text-(--color-accent) uppercase tracking-widest hover:bg-(--color-accent) hover:text-black transition-colors duration-300 rounded-sm"
            >
              Book a Table
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
