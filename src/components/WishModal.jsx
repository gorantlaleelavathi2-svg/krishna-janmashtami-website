import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

export default function WishModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const reset = () => {
    setName("");
    setMessage("");
    setSent(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5,8,21,0.72)",
            backdropFilter: "blur(6px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel"
            style={{ width: "min(90vw, 460px)", padding: "36px 32px", position: "relative" }}
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              style={{ position: "absolute", top: 18, right: 18, opacity: 0.7 }}
            >
              <X size={20} />
            </button>

            {!sent ? (
              <>
                <h3 style={{ fontSize: "1.5rem", marginBottom: 8 }}>Send a Krishna Wish 💙</h3>
                <p style={{ marginBottom: 24, fontSize: "0.95rem" }}>
                  Share a blessing — it stays right here as a small offering.
                </p>
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.85rem" }}>
                    Your Name
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Radha"
                      style={{
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: "1px solid var(--glass-border)",
                        background: "rgba(255,255,255,0.05)",
                        color: "var(--ivory)",
                        fontSize: "0.95rem",
                      }}
                    />
                  </label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.85rem" }}>
                    Wish Message
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="May Krishna's flute fill your home with joy..."
                      style={{
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: "1px solid var(--glass-border)",
                        background: "rgba(255,255,255,0.05)",
                        color: "var(--ivory)",
                        fontSize: "0.95rem",
                        resize: "vertical",
                      }}
                    />
                  </label>
                  <button type="submit" className="btn-primary" style={{ justifyContent: "center", marginTop: 6 }}>
                    Send Blessings <Sparkles size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  style={{ fontSize: 42, marginBottom: 14 }}
                >
                  🦚
                </motion.div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: 10 }}>
                  Radhe Radhe{name ? `, ${name}` : ""}!
                </h3>
                <p>Your divine wishes have been sent. 🦚💙</p>
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 1, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      x: (Math.random() - 0.5) * 240,
                      y: (Math.random() - 0.5) * 240,
                    }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "40%",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#f5d998",
                      boxShadow: "0 0 8px 2px rgba(233,190,92,0.8)",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
