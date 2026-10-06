import React from "react";
import { motion } from "framer-motion";

export default function Finale() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,190,92,0.25), transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="shimmer-gold"
        style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)", position: "relative", zIndex: 2 }}
      >
        Happy Janmashtami!!!! 🦚🪈
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
        style={{ maxWidth: 460, marginTop: 20, position: "relative", zIndex: 2, fontSize: "1.1rem" }}
      >
        May Kanna bless all of you with endless happiness and beautiful memories.
      </motion.p>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ marginTop: 34, fontSize: 40, position: "relative", zIndex: 2 }}
      >
        🦚 🪔 🌙
      </motion.div>
    </section>
  );
}
