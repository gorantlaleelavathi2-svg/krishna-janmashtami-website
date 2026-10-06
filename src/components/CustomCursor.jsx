import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (max-width: 768px)").matches;
    setEnabled(!isTouch);
    if (isTouch) return;

    let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

    const move = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${targetX}px`;
        dotRef.current.style.top = `${targetY}px`;
      }
    };

    const raf = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      requestAnimationFrame(raf);
    };

    const enlarge = (e) => {
      const target = e.target.closest("a, button, [data-cursor='glow']");
      if (target) {
        ringRef.current?.classList.add("cursor-hover");
        if (target.dataset.cursor === "glow") {
          ringRef.current?.classList.add("cursor-divine");
        }
      }
    };
    const shrink = () => {
      ringRef.current?.classList.remove("cursor-hover");
      ringRef.current?.classList.remove("cursor-divine");
    };

    const click = (e) => {
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", enlarge);
    window.addEventListener("pointerout", shrink);
    window.addEventListener("pointerdown", click);
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", enlarge);
      window.removeEventListener("pointerout", shrink);
      window.removeEventListener("pointerdown", click);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
      <style>{`
        .cursor-hover { width: 52px !important; height: 52px !important; border-color: var(--gold) !important; background: rgba(233,190,92,0.08); }
        .cursor-divine { box-shadow: 0 0 24px 6px rgba(233,190,92,0.55); }
        .cursor-ripple {
          position: fixed; width: 10px; height: 10px; border-radius: 50%;
          border: 1px solid var(--gold-soft); pointer-events: none; z-index: 9999;
          transform: translate(-50%, -50%); animation: ripple-expand 0.6s ease-out forwards;
        }
        @keyframes ripple-expand {
          to { width: 60px; height: 60px; opacity: 0; }
        }
      `}</style>
    </>
  );
}
