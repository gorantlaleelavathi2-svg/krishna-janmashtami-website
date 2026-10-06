import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const PETALS = ["🌸", "🌺", "🪷"];

/**
 * Gentle falling petals + fireflies decorative overlay. Kept lightweight
 * (pure CSS/DOM, no Three.js) so it can layer over any section cheaply.
 * Density automatically drops on small screens for performance.
 */
export default function Vrindavan() {
  const [count, setCount] = useState(18);

  useEffect(() => {
    const update = () => setCount(window.innerWidth < 768 ? 9 : 18);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 10,
        size: 14 + Math.random() * 14,
        emoji: PETALS[i % PETALS.length],
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "-10vh", x: 0, opacity: 0 }}
          animate={{ y: "110vh", x: [0, 20, -20, 0], opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            fontSize: p.size,
            filter: "drop-shadow(0 0 6px rgba(233,190,92,0.25))",
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}
