import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, Box, Sphere, Torus, Cylinder } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// Floating 3D Icons Component
function FloatingIcon({ position, icon, color, scale = 1, speed = 1 }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
      <group ref={meshRef} position={position} scale={scale}>
        {icon === 'social' && (
          <Sphere args={[0.5, 32, 32]}>
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
          </Sphere>
        )}
        {icon === 'marketing' && (
          <Box args={[0.8, 0.8, 0.8]}>
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
          </Box>
        )}
        {icon === 'design' && (
          <Torus args={[0.5, 0.2, 16, 100]}>
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </Torus>
        )}
        {icon === 'analytics' && (
          <Cylinder args={[0.3, 0.5, 1, 8]}>
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
          </Cylinder>
        )}
      </group>
    </Float>
  );
}

// Scroll-reactive particle system
function ScrollParticles({ scrollY }) {
  const particlesRef = useRef();
  const particleCount = 50;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = scrollY * 0.001;
      particlesRef.current.position.y = scrollY * 0.002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D Scene with scroll effects
export default function Interactive3DScene({ scrollY = 0, mousePosition = { x: 0, y: 0 } }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#EC4899" />
      <pointLight position={[0, 10, -10]} intensity={0.7} color="#06B6D4" />

      {/* Floating Service Icons */}
      <FloatingIcon
        position={[-4, 2, -2]}
        icon="social"
        color="#8B5CF6"
        scale={1.2}
        speed={1}
      />
      
      <FloatingIcon
        position={[4, -1, 1]}
        icon="marketing"
        color="#EC4899"
        scale={0.8}
        speed={1.3}
      />
      
      <FloatingIcon
        position={[-3, -2, 2]}
        icon="design"
        color="#06B6D4"
        scale={1}
        speed={0.8}
      />
      
      <FloatingIcon
        position={[3, 2, -1]}
        icon="analytics"
        color="#10B981"
        scale={1.1}
        speed={1.1}
      />

      {/* Scroll-reactive particles */}
      <ScrollParticles scrollY={scrollY} />

      {/* Central rotating element */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Torus args={[2, 0.5, 16, 100]} position={[0, 0, -3]}>
          <meshStandardMaterial
            color="#8B5CF6"
            transparent
            opacity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>
      </Float>
    </Canvas>
  );
}