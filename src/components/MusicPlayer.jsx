import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

/**
 * Floating "Play Krishna's Flute" control.
 *
 * Looks first for a user-provided audio file at
 * src/assets/audio/flute-loop.mp3 (see that folder's README). If none is
 * found, it gracefully falls back to a soft synthesized flute-like drone
 * built with the Web Audio API, so the feature always works out of the box
 * without bundling any copyrighted music.
 */
export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const oscRefs = useRef([]);

  const startSynthFlute = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    master.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.2);

    const notes = [523.25, 587.33, 659.25, 783.99]; // C5 D5 E5 G5 — a calm pentatonic phrase
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = 0;
      osc.connect(g);
      g.connect(master);
      osc.start();
      const stagger = i * 1.6;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.03;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfo.start();
      g.gain.setValueAtTime(0.02, ctx.currentTime + stagger);
      oscRefs.current.push(osc, lfo);
    });
  };

  const stopSynthFlute = () => {
    oscRefs.current.forEach((o) => {
      try { o.stop(); } catch (e) {}
    });
    oscRefs.current = [];
    ctxRef.current?.close();
    ctxRef.current = null;
  };

  const toggle = async () => {
    if (playing) {
      audioRef.current?.pause();
      stopSynthFlute();
      setPlaying(false);
      return;
    }

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setPlaying(true);
        return;
      } catch (e) {
        // no bundled audio file present — fall back to synth
      }
    }
    startSynthFlute();
    setPlaying(true);
  };

  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 40 }}>
      <audio ref={audioRef} loop preload="none">
        <source src="/src/assets/audio/flute-loop.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        data-cursor="glow"
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        className="glass-panel"
        aria-label={playing ? "Mute Krishna's flute" : "Play Krishna's flute"}
        style={{
          width: 62,
          height: 62,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: playing ? "0 0 30px rgba(233,190,92,0.5)" : "0 8px 24px rgba(5,8,21,0.4)",
        }}
      >
        {playing ? <VolumeX size={22} color="#f5d998" /> : <Music size={22} color="#f5d998" />}
      </motion.button>

      <AnimatePresence>
        {playing &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ opacity: [0, 1, 0], y: -70, x: (i - 1) * 22 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
              style={{ position: "absolute", left: 22, top: 0, fontSize: 18, color: "#f5d998" }}
            >
              ♪
            </motion.span>
          ))}
      </AnimatePresence>

      <span
        className="sr-only"
        aria-live="polite"
      >
        {playing ? "Playing Krishna's flute" : "Music paused"}
      </span>
    </div>
  );
}
