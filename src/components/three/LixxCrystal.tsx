"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type LixxCrystalProps = {
    /** Beats per minute for the heartbeat pulse. */
    bpm?: number;
    /** Normalized pointer position in [-1..1] for both axes. */
    pointer?: THREE.Vector2;
    /** When true, reduces shader/animation intensity for low-power devices. */
    lowPower?: boolean;
    /** Icosahedron detail level. Desktop should be 6+. */
    detail?: number;
};

type BeforeCompileShader = {
    uniforms: Record<string, { value: any }>;
    vertexShader: string;
    fragmentShader: string;
};

// Lightweight classic Perlin noise (3D) — derivative-free, good enough for subtle vertex distortion.
// Source: common GLSL classic noise patterns (Stefan Gustavson / Ashima Arts style), adapted inline.
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = vec4(Pi0.zzzz);
  vec4 iz1 = vec4(Pi1.zzzz);

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000), dot(g010,g010), dot(g100,g100), dot(g110,g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001), dot(g011,g011), dot(g101,g101), dot(g111,g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = Pf0 * Pf0 * Pf0 * (Pf0 * (Pf0 * 6.0 - 15.0) + 10.0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}
`;

export default function LixxCrystal({
    bpm = 128,
    pointer,
    lowPower = false,
    detail = 6,
}: LixxCrystalProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const shaderRef = useRef<BeforeCompileShader | null>(null);
    const smoothPointer = useRef(new THREE.Vector2(0, 0));

    const pointerSafe = useMemo(() => pointer ?? new THREE.Vector2(0, 0), [pointer]);

    const material = useMemo(() => {
        const m = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#FAFF00"),
            transmission: 1.1,
            thickness: 2,
            roughness: 0.1,
            iridescence: 1,
            metalness: 0,
            transparent: true,
            opacity: 1,
            ior: 1.35,
            clearcoat: 0.6,
            clearcoatRoughness: 0.15,
        });

        // Candy-like volumetric tint (subtle) — helps readability for thick transmission materials.
        // MeshPhysicalMaterial supports attenuation in modern three versions.
        (m as any).attenuationColor = new THREE.Color("#FAFF00");
        (m as any).attenuationDistance = 1.2;
        return m;
    }, []);

    useEffect(() => {
        const zen = new THREE.Color("#B6A6E9");
        const charge = new THREE.Color("#FAFF00");

        material.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = { value: 0 };
            shader.uniforms.uBpm = { value: bpm };
            shader.uniforms.uPointer = { value: new THREE.Vector2(0, 0) };
            shader.uniforms.uStrength = { value: lowPower ? 0.06 : 0.12 };
            shader.uniforms.uZen = { value: zen };
            shader.uniforms.uCharge = { value: charge };

            shader.vertexShader = shader.vertexShader.replace(
                "#include <common>",
                `#include <common>
uniform float uTime;
uniform float uBpm;
uniform vec2 uPointer;
uniform float uStrength;
${NOISE_GLSL}
float lixxPulse(float t, float bpm){
  float f = bpm / 60.0;
  float s = sin(t * f * 6.28318530718);
  // Sharpen: only positive lobe, steep falloff = heartbeat vibe
  return pow(max(s, 0.0), 3.0);
}
`
            );

            shader.vertexShader = shader.vertexShader.replace(
                "#include <begin_vertex>",
                `#include <begin_vertex>
float pulse = lixxPulse(uTime, uBpm);
vec3 pN = normalize(position);
float n1 = cnoise(pN * 2.25 + vec3(uTime * 0.65));
float n2 = cnoise(pN * 4.10 - vec3(uTime * 0.35));
float n = 0.65 * n1 + 0.35 * n2;

// Cursor bulge: approximate a direction from uPointer, then bias deformation toward facing normals.
vec3 cursorDir = normalize(vec3(uPointer, 1.0));
float facing = clamp(dot(normalize(normal), cursorDir), 0.0, 1.0);
float cursorBulge = 0.35 + 0.65 * smoothstep(0.0, 1.0, facing);

float amp = uStrength * (0.55 + 0.85 * pulse) * cursorBulge;
transformed += normal * (n * amp);
`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                "#include <common>",
                `#include <common>
uniform float uTime;
uniform float uBpm;
uniform vec2 uPointer;
uniform vec3 uZen;
uniform vec3 uCharge;
${NOISE_GLSL}
float lixxPulse(float t, float bpm){
  float f = bpm / 60.0;
  float s = sin(t * f * 6.28318530718);
  return pow(max(s, 0.0), 2.0);
}
`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                "vec4 diffuseColor = vec4( diffuse, opacity );",
                `vec4 diffuseColor = vec4( diffuse, opacity );
float pulse = lixxPulse(uTime, uBpm);
float tintNoise = cnoise(vViewPosition * 0.04 + vec3(0.0, 0.0, uTime * 0.25));
float tint = clamp(0.06 + 0.10 * pulse + 0.03 * tintNoise, 0.0, 0.18);
diffuseColor.rgb = mix(uCharge, uZen, tint);
`
            );

            shaderRef.current = shader;
        };

        material.customProgramCacheKey = () => `lixxCrystal_v1_${lowPower ? "lp" : "hp"}`;
        material.needsUpdate = true;

        return () => {
            shaderRef.current = null;
        };
    }, [bpm, lowPower, material]);

    useFrame(({ clock }, delta) => {
        const t = clock.getElapsedTime();
        smoothPointer.current.lerp(pointerSafe, 0.12);

        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = t;
            shaderRef.current.uniforms.uBpm.value = bpm;
            shaderRef.current.uniforms.uPointer.value.copy(smoothPointer.current);
            shaderRef.current.uniforms.uStrength.value = lowPower ? 0.06 : 0.12;
        }

        const mesh = meshRef.current;
        if (!mesh) return;

        const baseSpin = lowPower ? 0.12 : 0.18;
        mesh.rotation.y += delta * baseSpin;

        // Cursor-driven rotation (smoothed)
        const targetX = smoothPointer.current.y * 0.22;
        const targetY = smoothPointer.current.x * 0.42;
        mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetX, 0.08);
        mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, -smoothPointer.current.x * 0.08, 0.06);
        mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, mesh.rotation.y + targetY * 0.04, 0.06);
    });

    return (
        <mesh ref={meshRef} material={material} castShadow={false} receiveShadow={false}>
            <icosahedronGeometry args={[1.35, Math.max(0, detail)]} />
        </mesh>
    );
}

