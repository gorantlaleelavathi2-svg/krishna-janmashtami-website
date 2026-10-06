import React, { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A large floating peacock feather that drifts toward the cursor and bursts
 * into golden sparkles on click.
 */
export default function PeacockFeather() {
  const [sparkles, setSparkles] = useState([]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 30, damping: 14 });
  const springY = useSpring(y, { stiffness: 30, damping: 14 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / 8;
    const relY = (e.clientY - rect.top - rect.height / 2) / 8;
    x.set(relX);
    y.set(relY);
  };

  const burst = () => {
    const next = Array.from({ length: 14 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      angle: (Math.PI * 2 * i) / 14,
    }));
    setSparkles(next);
    setTimeout(() => setSparkles([]), 900);
  };

  return (
    <div
      onPointerMove={handleMove}
      onClick={burst}
      data-cursor="glow"
      style={{
        position: "relative",
        width: 180,
        height: 260,
        margin: "0 auto",
        cursor: "pointer",
      }}
      role="button"
      tabIndex={0}
      aria-label="Peacock feather — tap for a golden sparkle burst"
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && burst()}
    >
      <motion.svg
        style={{ x: springX, y: springY }}
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 140 220"
        width="100%"
        height="100%"
      >
        <defs>
          <radialGradient id="feathEye" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#e9be5c" />
            <stop offset="45%" stopColor="#0f6e5f" />
            <stop offset="100%" stopColor="#1c2c6e" />
          </radialGradient>
        </defs>
        <path d="M70 220 C70 150 70 90 70 20" stroke="#3a6b52" strokeWidth="3" fill="none" />
        <ellipse cx="70" cy="55" rx="46" ry="60" fill="url(#feathEye)" opacity="0.92" />
        <ellipse cx="70" cy="55" rx="20" ry="28" fill="#0a1030" opacity="0.7" />
        <ellipse cx="70" cy="48" rx="9" ry="13" fill="#f5d998" />
      </motion.svg>

      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          initial={{ x: 90, y: 60, opacity: 1, scale: 0.4 }}
          animate={{
            x: 90 + Math.cos(s.angle) * 90,
            y: 60 + Math.sin(s.angle) * 90,
            opacity: 0,
            scale: 1,
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#f5d998",
            boxShadow: "0 0 8px 2px rgba(233,190,92,0.9)",
          }}
        />
      ))}
    </div>
  );
}
