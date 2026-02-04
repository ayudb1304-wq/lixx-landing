"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

import LixxCrystal from "@/components/three/LixxCrystal";

function computeLowPower() {
  if (typeof window === "undefined") return true;

  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const small = window.innerWidth < 768;
  const hc = typeof navigator !== "undefined" ? navigator.hardwareConcurrency : undefined;
  const weakCpu = typeof hc === "number" ? hc <= 4 : false;

  return coarse || reduceMotion || small || weakCpu;
}

export default function HeroCrystalCanvas() {
  const pointer = useRef(new THREE.Vector2(0, 0));
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

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.set(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const detail = useMemo(() => (lowPower ? 2 : 7), [lowPower]);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.6], fov: 40, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.setClearColor(new THREE.Color("#030303"), 0);
      }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[3.5, 5, 2]} intensity={1.25} color="#FAFF00" />
      <directionalLight position={[-4, -2, -3]} intensity={0.65} color="#B6A6E9" />

      {!lowPower && <Environment preset="studio" blur={0.65} />}

      <Float speed={1.2} rotationIntensity={0.65} floatIntensity={0.7}>
        <LixxCrystal bpm={128} pointer={pointer.current} lowPower={lowPower} detail={detail} />
      </Float>

      {!lowPower && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.25}
            luminanceThreshold={0.12}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}

