import React, { useState } from "react";
import { motion } from "framer-motion";

function SingleDiya({ index }) {
  const [lit, setLit] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <motion.button
      onClick={() => setLit((l) => !l)}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      data-cursor="glow"
      className="float-slow"
      style={{ animationDelay: `${index * 0.6}s`, position: "relative", width: 70, background: "none" }}
      aria-pressed={lit}
      aria-label={lit ? "Diya lit" : "Tap to light diya"}
    >
      <motion.div
        animate={{
          opacity: lit || hover ? 1 : 0.5,
          scale: lit ? 1.15 : hover ? 1.05 : 1,
        }}
        style={{
          width: 14,
          height: 22,
          margin: "0 auto",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: "linear-gradient(180deg,#fff2c9,#ff9452 60%,#ff6a1f)",
          filter: lit || hover ? "drop-shadow(0 0 14px #ff9452)" : "none",
          animation: lit ? "flame-flicker 0.6s ease-in-out infinite" : "none",
        }}
      />
      <div
        style={{
          width: 60,
          height: 20,
          margin: "0 auto",
          borderRadius: "50%",
          background: "linear-gradient(180deg,#c9932f,#7a5215)",
          boxShadow: lit ? "0 0 24px 6px rgba(255,148,82,0.45)" : "none",
        }}
      />
    </motion.button>
  );
}

export default function Diya() {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap", marginBottom: 20 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <SingleDiya key={i} index={i} />
        ))}
      </div>
      <p style={{ fontSize: "0.95rem", opacity: 0.75 }}>
        Let the divine light of Krishna illuminate your life.
      </p>
    </div>
  );
}
