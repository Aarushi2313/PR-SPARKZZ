import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Sphere, 
  MeshDistortMaterial,
  Float,
  Center,
  Sparkles,
  Stars,
  Cloud,
  Sky,
  Effects
} from '@react-three/drei';
// Removed postprocessing imports due to compatibility issues
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// Floating 3D Objects Component
function FloatingGeometry({ position, geometry, color, scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.8}
          distort={0.3}
          speed={2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// Animated Text Component - Simplified without custom font
function AnimatedText() {
  const textRef = useRef();
  
  const { position } = useSpring({
    from: { position: [0, 2, -5] },
    to: { position: [0, 0, 0] },
    config: { mass: 2, tension: 100, friction: 50 }
  });

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <animated.group position={position}>
      <Center ref={textRef}>
        <mesh>
          <boxGeometry args={[3, 0.5, 0.2]} />
          <MeshDistortMaterial
            color="#8B5CF6"
            transparent
            opacity={0.9}
            distort={0.2}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Center>
    </animated.group>
  );
}

// Particle System
function ParticleField() {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D Scene Component
function Scene3D() {
  return (
    <>
      {/* Environment */}
      <Environment preset="night" />
      <Stars radius={300} depth={60} count={1000} factor={7} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#EC4899" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#60A5FA"
        castShadow
      />

      {/* 3D Objects */}
      <FloatingGeometry
        position={[-3, 2, -2]}
        geometry={<sphereGeometry args={[0.5, 32, 32]} />}
        color="#8B5CF6"
        scale={1.2}
      />
      
      <FloatingGeometry
        position={[3, -1, -1]}
        geometry={<octahedronGeometry args={[0.7]} />}
        color="#EC4899"
        scale={0.8}
      />
      
      <FloatingGeometry
        position={[-2, -2, 1]}
        geometry={<torusGeometry args={[0.6, 0.2, 16, 100]} />}
        color="#60A5FA"
        scale={1}
      />

      <FloatingGeometry
        position={[4, 2, 2]}
        geometry={<icosahedronGeometry args={[0.8]} />}
        color="#10B981"
        scale={0.9}
      />

      {/* Central Hero Sphere */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[2, 64, 64]} position={[0, 0, -5]}>
          <MeshDistortMaterial
            color="#8B5CF6"
            transparent
            opacity={0.6}
            distort={0.6}
            speed={3}
            metalness={1}
            roughness={0}
          />
        </Sphere>
      </Float>

      {/* Animated Text */}
      <AnimatedText />

      {/* Particle System */}
      <ParticleField />

      {/* Sparkles */}
      <Sparkles
        count={50}
        scale={[20, 20, 20]}
        size={3}
        speed={0.4}
        color="#8B5CF6"
      />

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />

      {/* Removed post-processing effects due to compatibility issues */}
    </>
  );
}

// Main Enhanced 3D Scene Component
export default function Enhanced3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
    </div>
  );
}