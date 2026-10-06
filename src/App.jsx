import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Vrindavan from "./components/Vrindavan.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import Wishes from "./components/Wishes.jsx";
import Countdown from "./components/Countdown.jsx";
import KrishnaStory from "./components/KrishnaStory.jsx";
import Gallery from "./components/Gallery.jsx";
import MakhanChor from "./components/MakhanChor.jsx";
import Finale from "./components/Finale.jsx";
import Footer from "./components/Footer.jsx";
import PeacockFeather from "./components/PeacockFeather.jsx";

// The Three.js night-sky background is heavy, so it's loaded lazily and
// wrapped in Suspense — the rest of the page renders immediately.
const NightSky = lazy(() => import("./components/NightSky.jsx"));

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <NightSky />
      </Suspense>

      <Vrindavan />
      <CustomCursor />
      <Navbar />

      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero />

        <section id="hero-art" className="section" style={{ textAlign: "center" }}>
          <span className="section-eyebrow">🦚 A Moment With the Divine</span>
          <h2 className="section-title">Radha • Krishna • Vrindavan</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Tap the peacock feather for a small blessing of golden light.
          </p>
          <PeacockFeather />
        </section>

        <Countdown />
        <Wishes />
        <KrishnaStory />
        <Gallery />
        <MakhanChor />
        <Finale />
      </main>

      <Footer />
      <MusicPlayer />
    </>
  );
}
