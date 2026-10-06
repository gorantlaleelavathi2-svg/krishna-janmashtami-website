import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * DivineArt — a layered, gold-relief style illustration of Radha & Krishna
 * with Gopikas dancing in the distance, rendered as pure SVG so the hero
 * loads instantly with zero external images.
 *
 * Three parallax layers (moon/trees, gopikas, Radha-Krishna) drift at
 * different depths as the cursor moves, giving a dimensional, "3D-ish"
 * feel without needing an actual 3D model.
 *
 * To upgrade to real 3D character models later: see
 * src/assets/models/README.md for how to load GLB files and swap this
 * component out in Hero.jsx.
 */
export default function DivineArt() {
  const wrapRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 14 });
  const springY = useSpring(my, { stiffness: 40, damping: 14 });

  const bgX = useTransform(springX, [-1, 1], [-6, 6]);
  const bgY = useTransform(springY, [-1, 1], [-4, 4]);
  const midX = useTransform(springX, [-1, 1], [-12, 12]);
  const midY = useTransform(springY, [-1, 1], [-6, 6]);
  const foreRotate = useTransform(springX, [-1, 1], [-3, 3]);
  const foreY = useTransform(springY, [-1, 1], [-3, 3]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, x)));
      my.set(Math.max(-1, Math.min(1, y)));
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [mx, my, reduced]);

  return (
    <div
      ref={wrapRef}
      className="divine-art"
      style={{ position: "relative", width: "100%", maxWidth: 560, perspective: 1000 }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-18%",
          background:
            "radial-gradient(circle at 50% 42%, rgba(233,190,92,0.32), rgba(106,63,160,0.16) 45%, transparent 72%)",
          filter: "blur(14px)",
          animation: "glow-pulse 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <svg viewBox="0 0 560 700" width="100%" height="auto" role="img" aria-labelledby="artTitle">
        <title id="artTitle">Radha and Krishna beneath a Vrindavan moon, with Gopikas dancing nearby</title>
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fff6da" />
            <stop offset="55%" stopColor="#f5d998" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f5d998" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="krishnaGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdeec0" />
            <stop offset="45%" stopColor="#e9be5c" />
            <stop offset="100%" stopColor="#a8752a" />
          </linearGradient>
          <linearGradient id="krishnaSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5b74d6" />
            <stop offset="100%" stopColor="#293b8f" />
          </linearGradient>
          <linearGradient id="radhaGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbe3ef" />
            <stop offset="45%" stopColor="#e9a3c4" />
            <stop offset="100%" stopColor="#b9548c" />
          </linearGradient>
          <linearGradient id="peacockGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3fae8f" />
            <stop offset="100%" stopColor="#0f6e5f" />
          </linearGradient>
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== Background layer: moon + trees ===== */}
        <motion.g style={{ x: bgX, y: bgY }}>
          <circle cx="440" cy="120" r="70" fill="url(#moonGlow)" />
          <circle cx="440" cy="120" r="42" fill="#fdf3d8" opacity="0.95" />
          {[ -60, 620 ].map((x, i) => (
            <g key={i} opacity="0.5">
              <path
                d={`M${x} 700 L${x} 420 Q${x + (i === 0 ? 40 : -40)} 360 ${x} 300`}
                stroke="#0f6e5f"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
              <ellipse cx={x + (i === 0 ? 20 : -20)} cy="320" rx="70" ry="50" fill="#0f6e5f" opacity="0.55" />
            </g>
          ))}
          <ellipse cx="280" cy="640" rx="260" ry="30" fill="#0f6e5f" opacity="0.22" />
        </motion.g>

        {/* ===== Midground layer: Gopikas, softly blurred for depth ===== */}
        <motion.g style={{ x: midX, y: midY }} opacity="0.55" filter="url(#softGlow)">
          {[
            { x: 110, sway: -6 },
            { x: 470, sway: 6 },
            { x: 60, sway: 4, small: true },
          ].map((g, i) => (
            <motion.g
              key={i}
              transform={`translate(${g.x} 470)`}
              animate={reduced ? {} : { rotate: [g.sway, -g.sway, g.sway] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${g.x}px 470px` }}
            >
              <ellipse cx="0" cy="0" rx={g.small ? 14 : 17} ry={g.small ? 16 : 19} fill="url(#radhaGold)" />
              <path
                d={`M-16 20 Q0 -6 16 20 L18 90 Q0 106 -18 90 Z`}
                fill="url(#peacockGrad)"
                opacity="0.85"
              />
              <path d="M-16 45 Q-40 55 -46 85" stroke="url(#radhaGold)" strokeWidth="7" fill="none" strokeLinecap="round" />
              <path d="M16 45 Q40 55 46 85" stroke="url(#radhaGold)" strokeWidth="7" fill="none" strokeLinecap="round" />
            </motion.g>
          ))}
        </motion.g>

        {/* ===== Foreground: Radha ===== */}
        <motion.g
          style={{ rotate: foreRotate, y: foreY, transformOrigin: "400px 460px" }}
          animate={reduced ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="400" cy="330" r="150" fill="url(#moonGlow)" opacity="0.45" />

          {/* dupatta flow */}
          <path
            d="M352 330 Q300 400 330 520 Q360 560 400 560 Q365 470 380 360 Z"
            fill="url(#radhaGold)"
            opacity="0.9"
          />

          {/* head */}
          <ellipse cx="400" cy="300" rx="30" ry="34" fill="url(#krishnaGold)" opacity="0.001" />
          <ellipse cx="400" cy="300" rx="29" ry="33" fill="#3a2a20" />
          <ellipse cx="400" cy="304" rx="24" ry="27" fill="url(#radhaGold)" opacity="0.001" />
          <path d="M372 292 Q400 258 428 292 Q428 322 400 334 Q372 322 372 292 Z" fill="#f3d0b8" />
          <circle cx="400" cy="278" r="4.5" fill="#e9be5c" />
          <path d="M386 268 Q400 258 414 268" stroke="#e9be5c" strokeWidth="2.4" fill="none" />

          {/* bodice + drape */}
          <path d="M368 322 Q400 300 432 322 L432 356 Q400 378 368 356 Z" fill="url(#radhaGold)" />
          <rect x="378" y="352" width="44" height="160" rx="22" fill="url(#radhaGold)" />
          <path d="M368 356 Q340 420 356 500" stroke="url(#radhaGold)" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.85" />

          {/* jewelry */}
          <circle cx="400" cy="292" r="3" fill="#e9be5c" />
          <circle cx="400" cy="340" r="4" fill="#e9be5c" />
          <path d="M384 344 Q400 352 416 344" stroke="#e9be5c" strokeWidth="2" fill="none" />
        </motion.g>

        {/* ===== Foreground: Krishna (central, larger) ===== */}
        <motion.g
          style={{ rotate: foreRotate, y: foreY, transformOrigin: "240px 460px" }}
          animate={reduced ? {} : { y: [0, -11, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="240" cy="330" r="195" fill="url(#moonGlow)" />

          {/* peacock feather crown plume */}
          <motion.g
            animate={reduced ? {} : { rotate: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "240px 150px" }}
          >
            <path d="M240 150 C220 115 245 80 238 42" stroke="url(#peacockGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
            <ellipse cx="239" cy="44" rx="13" ry="20" fill="url(#peacockGrad)" />
            <circle cx="239" cy="44" r="6" fill="#e9be5c" />
            <circle cx="239" cy="44" r="2.4" fill="#0a1030" />
          </motion.g>

          {/* head */}
          <path d="M204 170 Q240 130 276 170 L276 190 Q240 158 204 190 Z" fill="#141a3c" />
          <ellipse cx="240" cy="210" rx="34" ry="38" fill="url(#krishnaSkin)" />
          <circle cx="228" cy="206" r="3.4" fill="#0a1030" />
          <circle cx="252" cy="206" r="3.4" fill="#0a1030" />
          <path d="M228 224 Q240 231 252 224" stroke="#0a1030" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <circle cx="240" cy="238" r="4" fill="#e9be5c" />

          {/* torso + dhoti */}
          <path d="M200 242 Q240 218 280 242 L280 286 Q240 306 200 286 Z" fill="url(#krishnaGold)" />
          <rect x="212" y="280" width="56" height="190" rx="26" fill="url(#krishnaGold)" />
          <path d="M212 468 Q240 500 268 468 L268 486 Q240 512 212 486 Z" fill="#a8752a" />

          {/* sash */}
          <path d="M204 300 L276 250" stroke="url(#peacockGrad)" strokeWidth="14" strokeLinecap="round" opacity="0.9" />

          {/* arms + flute */}
          <path d="M212 292 Q168 312 156 352" stroke="url(#krishnaSkin)" strokeWidth="19" fill="none" strokeLinecap="round" />
          <path d="M268 292 Q312 312 324 352" stroke="url(#krishnaSkin)" strokeWidth="19" fill="none" strokeLinecap="round" />
          <rect x="152" y="344" width="176" height="12" rx="6" fill="#8a5a2b" transform="rotate(-9 240 350)" />
          <circle cx="160" cy="356" r="3" fill="#e9be5c" transform="rotate(-9 240 350)" />
          <circle cx="200" cy="349" r="3" fill="#e9be5c" transform="rotate(-9 240 350)" />
          <circle cx="240" cy="342" r="3" fill="#e9be5c" transform="rotate(-9 240 350)" />

          {/* jewelry accents */}
          <circle cx="240" cy="196" r="4" fill="#e9be5c" />
          <path d="M218 258 Q240 268 262 258" stroke="#e9be5c" strokeWidth="2.4" fill="none" />
          <circle cx="240" cy="276" r="4.5" fill="#e9be5c" />
        </motion.g>

        <ellipse cx="280" cy="660" rx="230" ry="26" fill="#0f6e5f" opacity="0.2" />
      </svg>
    </div>
  );
}
