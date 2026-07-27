"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

function AuroraParticles({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mousePos = useMousePosition({ smoothing: 0.05 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#06b6d4"),
      new THREE.Color("#6366f1"),
      new THREE.Color("#a78bfa"),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 6 - 2;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 0.5;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current || prefersReducedMotion) return;

    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.02 + mousePos.normalizedX * 0.05;
    meshRef.current.rotation.x = mousePos.normalizedY * 0.03;

    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += Math.sin(t * 0.3 + i * 0.1) * 0.0008;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingOrbs() {
  const orbsRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        -3 - Math.random() * 3
      ),
      color: ["#8b5cf6", "#3b82f6", "#06b6d4", "#6366f1", "#a78bfa"][i],
      scale: 0.4 + Math.random() * 0.6,
      speed: 0.3 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!orbsRef.current || prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    orbsRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.y = orb.position.y + Math.sin(t * orb.speed + orb.phase) * 0.3;
      child.position.x = orb.position.x + Math.cos(t * orb.speed * 0.7 + orb.phase) * 0.15;
    });
  });

  return (
    <group ref={orbsRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function AuroraBackground() {
  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <AuroraParticles count={1500} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
