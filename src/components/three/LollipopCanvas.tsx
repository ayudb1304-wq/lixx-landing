"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

import LixxLollipop from "@/components/three/LixxLollipop";

function computeLowPower() {
  if (typeof window === "undefined") return true;
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const small = window.innerWidth < 768;
  const hc = typeof navigator !== "undefined" ? navigator.hardwareConcurrency : undefined;
  const weakCpu = typeof hc === "number" ? hc <= 4 : false;
  return coarse || reduceMotion || small || weakCpu;
}

export type LollipopCanvasProps = {
  color: string;
  highlight?: string;
  className?: string;
};

export default function LollipopCanvas({ color, highlight, className }: LollipopCanvasProps) {
  const [lowPower, setLowPower] = useState(true);

  useEffect(() => {
    const update = () => setLowPower(computeLowPower());
    update();

    const mmReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mmCoarse = window.matchMedia?.("(pointer: coarse)");
    const onMmqChange = () => update();

    window.addEventListener("resize", update, { passive: true });
    mmReduce?.addEventListener?.("change", onMmqChange);
    mmCoarse?.addEventListener?.("change", onMmqChange);

    return () => {
      window.removeEventListener("resize", update);
      mmReduce?.removeEventListener?.("change", onMmqChange);
      mmCoarse?.removeEventListener?.("change", onMmqChange);
    };
  }, []);

  const detail = useMemo(() => (lowPower ? 0.65 : 1), [lowPower]);

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.15, 3.1], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.setClearColor(new THREE.Color("#050505"), 0);
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3.5, 5, 2]} intensity={1.2} color={color} />
        <directionalLight position={[-4, -2, -3]} intensity={0.7} color={"#B6A6E9"} />

        {!lowPower && <Environment preset="studio" blur={0.75} />}

        <Float speed={0.9} rotationIntensity={0.5} floatIntensity={0.55}>
          <LixxLollipop color={color} highlight={highlight} scale={detail} lowPower={lowPower} />
        </Float>

        {!lowPower && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.12}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

