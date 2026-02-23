"use client";

import Spline from "@splinetool/react-spline";

const DEFAULT_SPHERE_SCENE_URL =
  "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";

type SplineSphereProps = {
  className?: string;
  scene?: string;
};

export default function SplineSphere({
  className = "aspect-video h-auto w-full",
  scene = DEFAULT_SPHERE_SCENE_URL,
}: SplineSphereProps) {
  return <Spline scene={scene} className={className} />;
}
