"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type LixxLollipopProps = {
  /** Primary SKU color. */
  color?: string;
  /** Secondary swirl highlight. */
  highlight?: string;
  /** Overall scale. */
  scale?: number;
  /** Reduce shader/animation intensity on low power devices. */
  lowPower?: boolean;
};

type BeforeCompileShader = {
  uniforms: Record<string, { value: any }>;
  vertexShader: string;
  fragmentShader: string;
};

const SWIRL_GLSL = /* glsl */ `
float lixxHash21(vec2 p){
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

// Returns 0..1 stripe pattern with a spiral twist
float lixxSpiralStripes(vec2 uv, float time, float density){
  vec2 p = uv * 2.0 - 1.0;
  float r = length(p);
  float a = atan(p.y, p.x);
  // Twist stronger near center; animate subtly
  float twist = (1.6 + 0.4 * sin(time * 0.35)) * (1.0 - smoothstep(0.0, 1.0, r));
  float t = a + twist * r * 3.14159;
  float s = sin(t * density + r * density * 2.0);
  return smoothstep(-0.15, 0.15, s);
}
`;

export default function LixxLollipop({
  color = "#FAFF00",
  highlight = "rgba(255,255,255,0.95)",
  scale = 1,
  lowPower = false,
}: LixxLollipopProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shaderRef = useRef<BeforeCompileShader | null>(null);

  const base = useMemo(() => new THREE.Color(color), [color]);
  const hi = useMemo(() => new THREE.Color(highlight), [highlight]);

  const candyMaterial = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: base,
      transmission: 1.0,
      thickness: 1.2,
      roughness: 0.08,
      ior: 1.35,
      clearcoat: 0.75,
      clearcoatRoughness: 0.12,
      transparent: true,
      opacity: 1,
    });
    // Ensure UV varyings (vUv) are included in the built-in shader chunks.
    // Our swirl pattern relies on vUv, but MeshPhysicalMaterial won't include it unless USE_UV is defined.
    m.defines = { ...(m.defines ?? {}), USE_UV: "" };
    (m as any).attenuationColor = base;
    (m as any).attenuationDistance = 1.4;
    return m;
  }, [base]);

  const stickMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e9e6df"),
        roughness: 0.75,
        metalness: 0.0,
      }),
    []
  );

  useEffect(() => {
    // Keep define stable across hot reloads / prop changes.
    candyMaterial.defines = { ...(candyMaterial.defines ?? {}), USE_UV: "" };
    candyMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uBase = { value: base };
      shader.uniforms.uHi = { value: hi };
      shader.uniforms.uIntensity = { value: lowPower ? 0.65 : 1.0 };

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uHi;
uniform float uIntensity;
${SWIRL_GLSL}
`
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4 diffuseColor = vec4( diffuse, opacity );",
        `vec4 diffuseColor = vec4( diffuse, opacity );
// Spiral stripes in UV space (works well on cylinder top/bottom too)
float stripes = lixxSpiralStripes(vUv, uTime, 10.0);
vec3 swirl = mix(uBase, uHi, stripes);
diffuseColor.rgb = mix(diffuseColor.rgb, swirl, 0.55 * uIntensity);
`
      );

      shaderRef.current = shader;
    };

    candyMaterial.customProgramCacheKey = () => `lixxLollipop_v1_${lowPower ? "lp" : "hp"}`;
    candyMaterial.needsUpdate = true;

    return () => {
      shaderRef.current = null;
    };
  }, [base, hi, lowPower, candyMaterial]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (shaderRef.current) shaderRef.current.uniforms.uTime.value = t;
    const g = groupRef.current;
    if (!g) return;

    const spin = lowPower ? 0.22 : 0.35;
    g.rotation.y += delta * spin;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, Math.sin(t * 0.35) * 0.08, 0.06);
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Candy disc */}
      <mesh material={candyMaterial} castShadow={false} receiveShadow={false}>
        <cylinderGeometry args={[1.05, 1.05, 0.35, lowPower ? 28 : 48, 1, false]} />
      </mesh>

      {/* Candy rim highlight */}
      {!lowPower && (
        <mesh position={[0, 0.02, 0]} castShadow={false} receiveShadow={false}>
          <torusGeometry args={[0.92, 0.035, 12, 80]} />
          <meshStandardMaterial color={hi} roughness={0.2} metalness={0.0} transparent opacity={0.35} />
        </mesh>
      )}

      {/* Stick */}
      <mesh
        position={[0, -1.1, 0]}
        rotation={[0, 0, Math.PI / 14]}
        material={stickMaterial}
        castShadow={false}
        receiveShadow={false}
      >
        <cylinderGeometry args={[0.055, 0.055, 2.1, 18]} />
      </mesh>
    </group>
  );
}

