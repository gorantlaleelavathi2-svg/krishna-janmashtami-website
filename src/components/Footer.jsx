import React from "react";

export default function Footer() {
  return (
    <footer
      className="section"
      style={{
        textAlign: "center",
        paddingTop: 60,
        paddingBottom: 60,
        borderTop: "1px solid var(--glass-border)",
      }}
    >
      <div style={{ fontSize: 30, marginBottom: 14 }}>🦚 🎵 🪔</div>
      <h3 style={{ fontSize: "1.3rem", marginBottom: 8 }}>Radhe Radhe 💙</h3>
      <p style={{ fontSize: "0.95rem", opacity: 0.75 }}>
        Hare Krishna • Hare Krishna • Krishna Krishna • Hare Hare
      </p>
      <p style={{ fontSize: "0.8rem", opacity: 0.45, marginTop: 24 }}>
        Made with devotion for Janmashtami.
      </p>
    </footer>
  );
}
