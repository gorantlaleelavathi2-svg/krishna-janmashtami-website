import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Feather } from "lucide-react";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "Radha Krishna", id: "hero-art" },
  { label: "Vrindavan", id: "story" },
  { label: "Wishes", id: "wishes" },
  { label: "Krishna Story", id: "story" },
  { label: "Gallery", id: "gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: scrolled ? 10 : 22,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: scrolled ? "min(92%, 760px)" : "min(94%, 900px)",
        transition: "all 0.4s ease",
      }}
    >
      <div
        className="glass-panel"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "10px 20px" : "14px 26px",
          transition: "padding 0.4s ease",
          boxShadow: "0 8px 30px rgba(5,8,21,0.35)",
        }}
      >
        <button onClick={() => goTo("home")} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", color: "var(--gold-soft)", fontSize: "1.05rem" }}>
          <Feather size={18} color="#e9be5c" />
          Hare Krishna
        </button>

        <nav className="nav-links" style={{ display: "flex", gap: 26 }}>
          {LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => goTo(l.id)}
              style={{ fontSize: "0.92rem", color: "rgba(244,239,227,0.85)", transition: "color 0.25s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e9be5c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,239,227,0.85)")}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          className="nav-burger"
          style={{ display: "none" }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel"
            style={{ marginTop: 10, padding: 16, display: "flex", flexDirection: "column", gap: 14 }}
          >
            {LINKS.map((l) => (
              <button key={l.label} onClick={() => goTo(l.id)} style={{ textAlign: "left", fontSize: "1rem" }}>
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
