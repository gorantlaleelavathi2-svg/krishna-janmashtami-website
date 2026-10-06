import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Diya from "./Diya.jsx";

export default function MakhanChor() {
  const [shaking, setShaking] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [butter, setButter] = useState([]);

  const trigger = () => {
    if (shaking) return;
    setShaking(true);
    setRevealed(false);
    setTimeout(() => {
      setButter(
        Array.from({ length: 10 }).map((_, i) => ({
          id: `${Date.now()}-${i}`,
          x: (Math.random() - 0.5) * 160,
        }))
      );
      setRevealed(true);
      setShaking(false);
    }, 700);
  };

  return (
    <section className="section" style={{ textAlign: "center" }}>
      <span className="section-eyebrow">🧈 Makhan Chor</span>
      <h2 className="section-title">The Butter Thief</h2>
      <p className="section-sub" style={{ margin: "0 auto 30px" }}>
        Tap the matki — Krishna is never far from his beloved makhan.
      </p>

      <motion.button
        onClick={trigger}
        data-cursor="glow"
        animate={shaking ? { rotate: [0, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.6 }}
        style={{ position: "relative", width: 130, margin: "0 auto" }}
        aria-label="Tap the matki"
      >
        <svg viewBox="0 0 120 130" width="130" height="140">
          <defs>
            <linearGradient id="matki" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9932f" />
              <stop offset="100%" stopColor="#8a5a2b" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="30" rx="22" ry="10" fill="url(#matki)" />
          <path d="M38 30 Q30 90 60 120 Q90 90 82 30 Z" fill="url(#matki)" />
          <ellipse cx="60" cy="30" rx="18" ry="7" fill="#3a2410" opacity="0.5" />
        </svg>

        <AnimatePresence>
          {revealed &&
            butter.map((b) => (
              <motion.span
                key={b.id}
                initial={{ opacity: 1, y: 0, x: 0 }}
                animate={{ opacity: 0, y: -90, x: b.x }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  fontSize: 16,
                }}
              >
                🧈
              </motion.span>
            ))}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {revealed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ marginTop: 20, fontSize: "1.05rem", color: "var(--gold-soft)" }}
          >
            Makhan Chor Krishna has arrived! 🧈💙
          </motion.p>
        )}
      </AnimatePresence>

      <Diya />
    </section>
  );
}
