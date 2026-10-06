import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import WishModal from "./WishModal.jsx";

const WISHES = [
  "Happy Janmashtami!!!! 🦚🪈 May Kanna bless all of you with endless happiness and beautiful memories.",
  "May Lord Krishna fill your life with love, peace, happiness and prosperity.",
  "May the divine blessings of Shri Krishna bring endless joy and positivity into your life.",
  "May your heart always be filled with Radha-Krishna's eternal love.",
  "Wishing you and your family a blessed and joyful Janmashtami.",
];

function TiltCard({ children }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(700px) rotateX(${-py * 8}deg) rotateY(${px * 8}deg) translateY(-4px)`,
    });
  };
  const onLeave = () => setStyle({ transform: "perspective(700px) rotateX(0) rotateY(0)" });

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ transition: "transform 0.35s ease", ...style }}
    >
      {children}
    </div>
  );
}

export default function Wishes() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="wishes" className="section">
      <span className="section-eyebrow">🪷 Blessings</span>
      <h2 className="section-title">Krishna Janmashtami Wishes</h2>
      <p className="section-sub">
        A few blessings to share with those you love this Janmashtami.
      </p>

      <div
        className="wishes-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 56 }}
      >
        {WISHES.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <TiltCard>
              <div
                className="glass-panel"
                data-cursor="glow"
                style={{ padding: "30px 28px", position: "relative", minHeight: 150 }}
              >
                <div style={{ fontSize: 22, marginBottom: 12, color: "var(--gold)" }}>🦚</div>
                <p style={{ fontSize: "1.02rem", color: "var(--ivory)", opacity: 0.9 }}>{text}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <button className="btn-primary" data-cursor="glow" onClick={() => setModalOpen(true)}>
          Send a Krishna Wish <HeartHandshake size={18} />
        </button>
      </div>

      <WishModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
