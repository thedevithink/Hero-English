import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  mode: 'campus' | 'boss';
  attackTrigger?: {
    attacker: 'player' | 'boss' | 'plus_ultra';
    timestamp: number;
  } | null;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ mode, attackTrigger }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const crystalsGroupRef = useRef<THREE.Group | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);
  const bossAuraRef = useRef<THREE.Mesh | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 450;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Subtle atmospheric fog based on mode
    scene.fog = new THREE.FogExp2(
      mode === 'boss' ? 0x051b11 : 0x0f172a,
      0.035
    );

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 0.8, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(
      mode === 'boss' ? 0x15803d : 0x38bdf8,
      mode === 'boss' ? 0.9 : 1.2
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      mode === 'boss' ? 0x4ade80 : 0xfde047,
      1.5
    );
    dirLight.position.set(4, 7, 5);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(
      mode === 'boss' ? 0xa855f7 : 0x60a5fa,
      1.2
    );
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // 5. Arena Ground (Stylized Cel-Shaded Anime Stage)
    const platformGeo = new THREE.CylinderGeometry(4.5, 4.8, 0.4, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: mode === 'boss' ? 0x064e3b : 0x1e293b,
      roughness: 0.4,
      metalness: 0.2
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.2;
    scene.add(platform);

    // Arena Outer Glowing Rune Ring
    const ringGeo = new THREE.TorusGeometry(4.2, 0.08, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: mode === 'boss' ? 0x22c55e : 0x38bdf8,
      wireframe: false
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.02;
    scene.add(ring);
    ringRef.current = ring;

    // Inner Concentric Energy Ring
    const innerRingGeo = new THREE.TorusGeometry(2.4, 0.04, 16, 48);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: mode === 'boss' ? 0xeab308 : 0x818cf8
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 0.03;
    scene.add(innerRing);

    // 6. Floating 3D Quirk Energy Crystals
    const crystalsGroup = new THREE.Group();
    const crystalGeo = new THREE.OctahedronGeometry(0.35, 0);
    const crystalColors =
      mode === 'boss'
        ? [0x22c55e, 0x16a34a, 0xa855f7, 0xeab308]
        : [0x38bdf8, 0x818cf8, 0xfacc15, 0x34d399];

    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const radius = 3.6;
      const crystalMat = new THREE.MeshStandardMaterial({
        color: crystalColors[i % crystalColors.length],
        roughness: 0.2,
        metalness: 0.7,
        emissive: crystalColors[i % crystalColors.length],
        emissiveIntensity: 0.35
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.position.set(
        Math.cos(angle) * radius,
        1.1 + Math.sin(i) * 0.4,
        Math.sin(angle) * radius
      );
      crystalsGroup.add(crystal);
    }
    scene.add(crystalsGroup);
    crystalsGroupRef.current = crystalsGroup;

    // 7. Boss Aura Disc in Boss Mode
    if (mode === 'boss') {
      const auraGeo = new THREE.RingGeometry(0.8, 1.8, 32);
      const auraMat = new THREE.MeshBasicMaterial({
        color: 0x22c55e,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      const bossAura = new THREE.Mesh(auraGeo, auraMat);
      bossAura.rotation.x = -Math.PI / 2;
      bossAura.position.set(0, 0.05, -1.2);
      scene.add(bossAura);
      bossAuraRef.current = bossAura;
    }

    // 8. Rising Anime Energy Spark Particles
    const particleCount = mode === 'boss' ? 120 : 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = Math.random() * 4;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: mode === 'boss' ? 0x4ade80 : 0xbae6fd,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 9. Resize handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 450;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Outer Ring
      if (ringRef.current) {
        ringRef.current.rotation.z = elapsedTime * 0.25;
      }

      // Rotate crystals group and individual crystals
      if (crystalsGroupRef.current) {
        crystalsGroupRef.current.rotation.y = elapsedTime * 0.35;
        crystalsGroupRef.current.children.forEach((c, idx) => {
          c.rotation.x = elapsedTime * 1.2 + idx;
          c.rotation.y = elapsedTime * 0.8 + idx;
          c.position.y = 1.0 + Math.sin(elapsedTime * 2 + idx) * 0.3;
        });
      }

      // Boss aura pulse
      if (bossAuraRef.current) {
        bossAuraRef.current.scale.setScalar(1 + Math.sin(elapsedTime * 4) * 0.15);
      }

      // Floating particles rising
      if (particlesRef.current) {
        const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 1; i < posAttr.array.length; i += 3) {
          posAttr.array[i] += 0.012;
          if (posAttr.array[i] > 4.5) {
            posAttr.array[i] = 0;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Gentle camera breath
      if (cameraRef.current) {
        cameraRef.current.position.x = Math.sin(elapsedTime * 0.4) * 0.4;
        cameraRef.current.lookAt(0, 0.8, 0);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      renderer.dispose();
      platformGeo.dispose();
      platformMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      crystalGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [mode]);

  // Handle attack camera animations
  useEffect(() => {
    if (!attackTrigger || !cameraRef.current) return;
    const { attacker } = attackTrigger;

    const origY = cameraRef.current.position.y;
    const origZ = cameraRef.current.position.z;

    if (attacker === 'plus_ultra') {
      // Epic zoom in and shake
      cameraRef.current.position.z = 4.2;
      cameraRef.current.position.y = 2.0;
      setTimeout(() => {
        if (cameraRef.current) {
          cameraRef.current.position.y = origY;
          cameraRef.current.position.z = origZ;
        }
      }, 700);
    } else if (attacker === 'player') {
      // Forward quick dash
      cameraRef.current.position.z = 6.2;
      setTimeout(() => {
        if (cameraRef.current) {
          cameraRef.current.position.z = origZ;
        }
      }, 350);
    } else if (attacker === 'boss') {
      // Screen recoil
      cameraRef.current.position.x = 0.5;
      cameraRef.current.position.y = origY + 0.3;
      setTimeout(() => {
        if (cameraRef.current) {
          cameraRef.current.position.x = 0;
          cameraRef.current.position.y = origY;
        }
      }, 300);
    }
  }, [attackTrigger]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] md:min-h-[460px] relative pointer-events-none select-none overflow-hidden"
    />
  );
};
