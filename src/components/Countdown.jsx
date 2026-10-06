import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Countdown to the Nishita Kaal — the midnight moment devotees celebrate as
 * Krishna's birth. Defaults to 11:57 PM tonight (a typical Nishita Puja
 * start time); pass a `target` Date prop to point it at a specific year's
 * muhurat instead.
 */
function getDefaultTarget() {
  const t = new Date();
  t.setHours(23, 57, 0, 0);
  if (t.getTime() < Date.now()) t.setDate(t.getDate() + 1);
  return t;
}

function useCountdown(target) {
  const [remaining, setRemaining] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setRemaining(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return remaining;
}

function splitTime(ms) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function Digit({ value, label }) {
  return (
    <div className="glass-panel" style={{ padding: "24px 18px", textAlign: "center", minWidth: 90 }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
          className="shimmer-gold"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700 }}
        >
          {String(value).padStart(2, "0")}
        </motion.div>
      </AnimatePresence>
      <div style={{ fontSize: "0.75rem", opacity: 0.65, marginTop: 6, letterSpacing: "0.06em" }}>{label}</div>
    </div>
  );
}

export default function Countdown({ target }) {
  const targetDate = useMemo(() => target || getDefaultTarget(), [target]);
  const remaining = useCountdown(targetDate);
  const { days, hours, minutes, seconds } = splitTime(remaining);
  const [celebrated, setCelebrated] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (remaining <= 0 && !firedRef.current) {
      firedRef.current = true;
      setCelebrated(true);
    }
  }, [remaining]);

  return (
    <section id="countdown" className="section" style={{ textAlign: "center" }}>
      <span className="section-eyebrow">🕉️ Krishna Janmashtami Is Today</span>
      <h2 className="section-title">Tonight's Divine Celebration</h2>
      <p className="section-sub" style={{ margin: "0 auto 40px" }}>
        Counting down to Nishita Kaal — the sacred midnight moment of Krishna's birth.
      </p>

      {!celebrated ? (
        <div
          className="countdown-grid"
          style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}
        >
          <Digit value={days} label="Days" />
          <Digit value={hours} label="Hours" />
          <Digit value={minutes} label="Minutes" />
          <Digit value={seconds} label="Seconds" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ position: "relative" }}
        >
          <h3 className="shimmer-gold" style={{ fontSize: "2.2rem", marginBottom: 10 }}>
            Happy Janmashtami!!!! 🦚🪈
          </h3>
          <p>May Kanna bless all of you with endless happiness and beautiful memories.</p>
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 1, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 300,
              }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i % 2 === 0 ? "#f5d998" : "#ff9452",
                boxShadow: "0 0 10px 3px rgba(233,190,92,0.8)",
              }}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
