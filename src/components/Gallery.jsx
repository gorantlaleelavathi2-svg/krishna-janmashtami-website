import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ITEMS = [
  { title: "Krishna", gradient: "linear-gradient(135deg,#1c2c6e,#0f6e5f)", icon: "🎶" },
  { title: "Radha Krishna", gradient: "linear-gradient(135deg,#6a3fa0,#e8a3c4)", icon: "💗" },
  { title: "Gopikas", gradient: "linear-gradient(135deg,#0f6e5f,#e9be5c)", icon: "💃" },
  { title: "Vrindavan", gradient: "linear-gradient(135deg,#0a1030,#1c2c6e)", icon: "🌳" },
  { title: "Peacock Feather", gradient: "linear-gradient(135deg,#0f6e5f,#1c2c6e)", icon: "🦚" },
  { title: "Flute", gradient: "linear-gradient(135deg,#e9be5c,#c9932f)", icon: "🎵" },
  { title: "Janmashtami Diyas", gradient: "linear-gradient(135deg,#ff9452,#e9be5c)", icon: "🪔" },
  { title: "Moonlit Yamuna", gradient: "linear-gradient(135deg,#0a1030,#6a3fa0)", icon: "🌊" },
];

/**
 * Placeholder gallery: each tile is a themed gradient + icon rather than a
 * real photo, so nothing here depends on external/copyrighted assets. Swap
 * `gradient`/`icon` for a real <img src="/src/assets/images/..."> once you
 * add your own photos — the layout and lightbox already support it.
 */
export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="section">
      <span className="section-eyebrow">🖼️ Gallery</span>
      <h2 className="section-title">Vrindavan Gallery</h2>
      <p className="section-sub">
        These are styled placeholder tiles, not real photos — to respect copyright, real Radha-Krishna
        images aren't bundled here. Drop your own photos into <code>src/assets/images/</code> and this
        grid will display them instead (see the README in that folder for the two-line swap).
      </p>

      <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
        {ITEMS.map((item, i) => (
          <motion.button
            key={item.title}
            onClick={() => setActive(item)}
            data-cursor="glow"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            whileHover={{ scale: 1.04, y: -4 }}
            style={{
              aspectRatio: "1 / 1",
              borderRadius: 16,
              background: item.gradient,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              border: "1px solid var(--glass-border)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <span style={{ fontSize: 34 }}>{item.icon}</span>
            <span style={{ fontSize: "0.85rem", color: "var(--ivory)" }}>{item.title}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(5,8,21,0.85)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(90vw, 480px)",
                aspectRatio: "1 / 1",
                borderRadius: 20,
                background: active.gradient,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                border: "1px solid var(--glass-border)",
              }}
            >
              <button
                onClick={() => setActive(null)}
                style={{ position: "absolute", top: 16, right: 16, color: "#fff" }}
                aria-label="Close"
              >
                <X size={22} />
              </button>
              <span style={{ fontSize: 64 }}>{active.icon}</span>
              <span style={{ fontSize: "1.2rem", marginTop: 12 }}>{active.title}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
