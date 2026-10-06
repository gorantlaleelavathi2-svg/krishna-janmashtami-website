import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * Moon: a soft glowing sphere with a layered halo.
 */
function Moon() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity =
        1.4 + Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
    }
  });
  return (
    <group position={[6, 4.5, -14]}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.6, 48, 48]} />
        <meshStandardMaterial
          color="#fdf3d8"
          emissive="#f5d998"
          emissiveIntensity={1.4}
          roughness={0.6}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial color="#f5d998" transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[3.4, 32, 32]} />
        <meshBasicMaterial color="#e9be5c" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

/**
 * Fireflies + golden dust: a soft drifting particle field that reacts gently
 * to pointer position for a subtle sense of depth.
 */
function Fireflies({ count = 220, mobile = false }) {
  const points = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = Math.random() * 12 - 3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18 - 4;
    }
    return arr;
  }, [count]);

  const speeds = useMemo(
    () => new Array(count).fill(0).map(() => 0.2 + Math.random() * 0.6),
    [count]
  );

  React.useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    const arr = points.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * speeds[i] + i) * 0.0025;
      arr[i * 3] += Math.cos(t * speeds[i] * 0.6 + i) * 0.0015 + mouse.current.x * 0.0006;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y = mouse.current.x * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={mobile ? 0.05 : 0.07}
        color="#f5d998"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SceneContents({ mobile }) {
  return (
    <>
      <ambientLight intensity={0.35} color="#5b6fd6" />
      <pointLight position={[6, 4.5, -12]} intensity={2.2} color="#f5d998" distance={30} />
      <Stars
        radius={60}
        depth={30}
        count={mobile ? 900 : 2400}
        factor={2.2}
        saturation={0}
        fade
        speed={0.4}
      />
      <Moon />
      <Fireflies count={mobile ? 90 : 220} mobile={mobile} />
      <fog attach="fog" args={["#0a1030", 12, 34]} />
    </>
  );
}

export default function NightSky() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <div className="app-canvas-layer" aria-hidden="true">
      <Canvas
        dpr={[1, mobile ? 1.3 : 2]}
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContents mobile={mobile} />
      </Canvas>
    </div>
  );
}
