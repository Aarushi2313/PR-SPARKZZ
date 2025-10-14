import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import gsap from "gsap";
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
} from "postprocessing";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Object
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0066 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Postprocessing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new BloomEffect({ intensity: 1.5 });
    composer.addPass(new EffectPass(camera, bloom));

    // GSAP animation
    gsap.to(sphere.rotation, {
      y: Math.PI * 2,
      duration: 5,
      repeat: -1,
      ease: "linear",
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      composer.render();
    };
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      composer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-screen bg-black overflow-hidden"
    ></div>
  );
}
