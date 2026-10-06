import React from "react";
import { motion } from "framer-motion";

const STORY = [
  {
    title: "Birth of Krishna",
    icon: "🌙",
    text: "Born at midnight in a Mathura prison cell to Devaki and Vasudeva, Krishna arrived to end tyranny and restore dharma.",
  },
  {
    title: "Childhood in Gokul",
    icon: "🐄",
    text: "Carried across the Yamuna to Gokul, Krishna grew up among cowherds — playful, mischievous, and beloved by all of Vrindavan.",
  },
  {
    title: "Krishna and the Gopikas",
    icon: "💃",
    text: "His raas leela with the gopikas became the eternal symbol of devotion — pure, joyful love between the divine and the devotee.",
  },
  {
    title: "Govardhan Leela",
    icon: "⛰️",
    text: "Krishna lifted the Govardhan hill on his fingertip, sheltering Vrindavan from Indra's storm and teaching humility to the proud.",
  },
  {
    title: "Radha Krishna",
    icon: "💗",
    text: "Radha and Krishna's bond represents the union of the soul with the divine — love without condition, without end.",
  },
  {
    title: "The Flute of Krishna",
    icon: "🎶",
    text: "Wherever Krishna's flute played, the world paused to listen — its melody still echoes as the call of the divine within.",
  },
];

export default function KrishnaStory() {
  return (
    <section id="story" className="section">
      <span className="section-eyebrow">📜 The Story</span>
      <h2 className="section-title">The Divine Story of Krishna</h2>
      <p className="section-sub">A timeline through the leelas that shaped Vrindavan's eternal legend.</p>

      <div
        className="story-timeline"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
      >
        {STORY.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40, rotateX: -8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
            className="glass-panel"
            style={{ padding: "28px 24px" }}
          >
            <div style={{ fontSize: 30, marginBottom: 12 }}>{s.icon}</div>
            <h3 style={{ fontSize: "1.15rem", marginBottom: 10 }}>{s.title}</h3>
            <p style={{ fontSize: "0.92rem" }}>{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
