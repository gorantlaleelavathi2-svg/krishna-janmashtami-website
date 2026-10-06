import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import DivineArt from "./DivineArt.jsx";

export default function Hero() {
  const scrollNext = () => {
    document.getElementById("hero-art")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", zIndex: 2 }}>
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          alignItems: "center",
          gap: "40px",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "140px clamp(20px, 6vw, 96px) 80px",
          width: "100%",
        }}
      >
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-eyebrow"
          >
            ✨ Krishna Janmashtami
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="shimmer-gold"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.4rem)", lineHeight: 1.05 }}
          >
            Hare Krishna
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", marginTop: 16, color: "var(--pink)" }}
          >
            Wishing You a Blissful Krishna Janmashtami
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            style={{ marginTop: 18, fontSize: "1.15rem", maxWidth: 480 }}
          >
            Happy Janmashtami!!!! 🦚🪈 May Kanna bless all of you with endless
            happiness and beautiful memories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            style={{ marginTop: 36, display: "flex", gap: 18, flexWrap: "wrap" }}
          >
            <button className="btn-primary" data-cursor="glow" onClick={scrollNext}>
              Enter Vrindavan <Sparkles size={18} />
            </button>
            <button
              className="btn-ghost"
              onClick={() => document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" })}
            >
              See Wishes
            </button>
          </motion.div>
        </div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center" }}
          data-cursor="glow"
        >
          <DivineArt />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.8rem",
          color: "rgba(244,239,227,0.55)",
          letterSpacing: "0.08em",
        }}
      >
        scroll ↓
      </motion.div>
    </section>
  );
}
