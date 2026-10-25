import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ThreeShearsHeroProps {
  onBookClick: () => void;
  onWhatsAppClick: () => void;
}

type FinishType = 'gold' | 'rose' | 'platinum' | 'obsidian';

export const ThreeShearsHero: React.FC<ThreeShearsHeroProps> = ({
  onBookClick,
  onWhatsAppClick
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeFinish, setActiveFinish] = useState<FinishType>('gold');
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);

  // References to communicate with the render loop without re-triggering useEffect
  const finishRef = useRef<FinishType>('gold');
  const actionTriggerRef = useRef<boolean>(false);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    finishRef.current = activeFinish;
  }, [activeFinish]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Scene & Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0d0e, 0.05);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 3.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection via RoomEnvironment & PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Studio 3-Point Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xffecd0, 2.2);
    keyLight.position.set(2.5, 4.0, 3.0);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 10;
      keyLight.shadow.camera.left = -2;
      keyLight.shadow.camera.right = 2;
      keyLight.shadow.camera.top = 2;
      keyLight.shadow.camera.bottom = -2;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x323a48, 0x0c0d0e, 1.2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    rimLight.position.set(-3.0, 1.5, -2.5);
    scene.add(rimLight);

    // 5. Materials Palette
    const finishColors: Record<FinishType, { color: number; roughness: number; metalness: number }> = {
      gold: { color: 0xd9b343, roughness: 0.16, metalness: 0.94 },
      rose: { color: 0xd98f7e, roughness: 0.18, metalness: 0.92 },
      platinum: { color: 0xdcdfe4, roughness: 0.12, metalness: 0.96 },
      obsidian: { color: 0x1f2226, roughness: 0.28, metalness: 0.88 }
    };

    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: finishColors.gold.color,
      roughness: finishColors.gold.roughness,
      metalness: finishColors.gold.metalness
    });

    const pivotScrewMaterial = new THREE.MeshStandardMaterial({
      color: 0x222428,
      roughness: 0.35,
      metalness: 0.85
    });

    const bumperMaterial = new THREE.MeshStandardMaterial({
      color: 0x101012,
      roughness: 0.8,
      metalness: 0.1
    });

    // 6. Procedural Composite Shears Assembly (THREE.Group with 8 parts)
    const shearsRootGroup = new THREE.Group();
    shearsRootGroup.position.set(0, -0.1, 0);

    // Helper: Create a curved blade shape using ExtrudeGeometry
    function createBladeShape(): THREE.Shape {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(0.12, 0.4);
      shape.quadraticCurveTo(0.14, 1.2, 0.02, 1.8); // Tip
      shape.lineTo(-0.02, 1.8);
      shape.quadraticCurveTo(-0.04, 1.1, -0.06, 0.4);
      shape.lineTo(0, 0);
      return shape;
    }

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 2,
      depth: 0.024,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.015,
      bevelSegments: 4
    };

    const bladeGeometry = new THREE.ExtrudeGeometry(createBladeShape(), extrudeSettings);
    bladeGeometry.center();

    // Finger ring geometry using TorusGeometry
    const ringGeometry = new THREE.TorusGeometry(0.24, 0.05, 16, 32);

    // Left Arm Group (blade + shank + ring)
    const leftArmGroup = new THREE.Group();
    const leftBladeMesh = new THREE.Mesh(bladeGeometry, bladeMaterial);
    leftBladeMesh.position.set(0, 0.85, 0);
    leftBladeMesh.rotation.z = 0.02;
    leftBladeMesh.castShadow = !isSoftwareGl;
    leftArmGroup.add(leftBladeMesh);

    // Left Shank
    const shankGeom = new THREE.CylinderGeometry(0.045, 0.055, 0.65, 16);
    const leftShankMesh = new THREE.Mesh(shankGeom, bladeMaterial);
    leftShankMesh.position.set(-0.14, -0.32, 0);
    leftShankMesh.rotation.z = 0.25;
    leftShankMesh.castShadow = !isSoftwareGl;
    leftArmGroup.add(leftShankMesh);

    // Left Finger Ring
    const leftRingMesh = new THREE.Mesh(ringGeometry, bladeMaterial);
    leftRingMesh.position.set(-0.25, -0.68, 0);
    leftRingMesh.rotation.y = 0.1;
    leftRingMesh.castShadow = !isSoftwareGl;
    leftArmGroup.add(leftRingMesh);

    // Tang / Finger rest on left ring
    const tangCurve = new THREE.CylinderGeometry(0.025, 0.015, 0.3, 12);
    const tangMesh = new THREE.Mesh(tangCurve, bladeMaterial);
    tangMesh.position.set(-0.48, -0.76, 0);
    tangMesh.rotation.z = -0.8;
    leftArmGroup.add(tangMesh);

    // Right Arm Group (opposing blade + shank + ring)
    const rightArmGroup = new THREE.Group();
    const rightBladeMesh = new THREE.Mesh(bladeGeometry, bladeMaterial);
    rightBladeMesh.position.set(0, 0.85, -0.028);
    rightBladeMesh.rotation.z = -0.02;
    rightBladeMesh.scale.x = -1;
    rightBladeMesh.castShadow = !isSoftwareGl;
    rightArmGroup.add(rightBladeMesh);

    // Right Shank
    const rightShankMesh = new THREE.Mesh(shankGeom, bladeMaterial);
    rightShankMesh.position.set(0.14, -0.32, -0.028);
    rightShankMesh.rotation.z = -0.25;
    rightShankMesh.castShadow = !isSoftwareGl;
    rightArmGroup.add(rightShankMesh);

    // Right Finger Ring
    const rightRingMesh = new THREE.Mesh(ringGeometry, bladeMaterial);
    rightRingMesh.position.set(0.25, -0.68, -0.028);
    rightRingMesh.rotation.y = -0.1;
    rightRingMesh.castShadow = !isSoftwareGl;
    rightArmGroup.add(rightRingMesh);

    // Rubber Bumper Stop between handles
    const bumperGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.05, 12);
    const bumperMesh = new THREE.Mesh(bumperGeom, bumperMaterial);
    bumperMesh.position.set(0.1, -0.55, -0.014);
    bumperMesh.rotation.z = Math.PI / 2;
    rightArmGroup.add(bumperMesh);

    // Pivot Screw & Decorative Washer
    const pivotGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.08, 24);
    const pivotMesh = new THREE.Mesh(pivotGeom, pivotScrewMaterial);
    pivotMesh.rotation.x = Math.PI / 2;
    pivotMesh.position.set(0, 0, 0.01);
    pivotMesh.castShadow = !isSoftwareGl;

    // Screw center slot line
    const slotGeom = new THREE.BoxGeometry(0.12, 0.02, 0.01);
    const slotMesh = new THREE.Mesh(slotGeom, bumperMaterial);
    slotMesh.position.set(0, 0, 0.055);

    shearsRootGroup.add(leftArmGroup);
    shearsRootGroup.add(rightArmGroup);
    shearsRootGroup.add(pivotMesh);
    shearsRootGroup.add(slotMesh);

    // Initial slight open angle
    leftArmGroup.rotation.z = 0.12;
    rightArmGroup.rotation.z = -0.12;

    scene.add(shearsRootGroup);

    // 7. Ground Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 110);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 2.4),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
        opacity: 0.65
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, -1.2, 0);
    scene.add(shadowPlane);

    // 8. Interaction & Pointer Tracking
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = (clientX - prevMouseX) * 0.008;
        const deltaY = (clientY - prevMouseY) * 0.008;
        targetRotationRef.current.y += deltaX;
        targetRotationRef.current.x = THREE.MathUtils.clamp(
          targetRotationRef.current.x + deltaY,
          -0.6,
          0.6
        );
        prevMouseX = clientX;
        prevMouseY = clientY;
      } else {
        // Ambient tilt based on normalized mouse
        const rect = container.getBoundingClientRect();
        const nx = (clientX - rect.left) / rect.width - 0.5;
        const ny = (clientY - rect.top) / rect.height - 0.5;
        targetRotationRef.current.y = nx * 0.45;
        targetRotationRef.current.x = ny * 0.35;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop with Exponential Damping
    let animationFrameId = 0;
    let lastTime = performance.now();
    let scissorPhase = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Update Finish Colors smoothly
      const currentFinishCfg = finishColors[finishRef.current] || finishColors.gold;
      bladeMaterial.color.lerp(new THREE.Color(currentFinishCfg.color), 0.1);
      bladeMaterial.roughness = THREE.MathUtils.lerp(bladeMaterial.roughness, currentFinishCfg.roughness, 0.1);
      bladeMaterial.metalness = THREE.MathUtils.lerp(bladeMaterial.metalness, currentFinishCfg.metalness, 0.1);

      // Smooth Model Damping
      const dampFactor = 1 - Math.exp(-6 * dt);
      shearsRootGroup.rotation.y = THREE.MathUtils.lerp(
        shearsRootGroup.rotation.y,
        targetRotationRef.current.y,
        dampFactor
      );
      shearsRootGroup.rotation.x = THREE.MathUtils.lerp(
        shearsRootGroup.rotation.x,
        targetRotationRef.current.x,
        dampFactor
      );

      // Subtle natural floating idle bobbing
      shearsRootGroup.position.y = -0.1 + Math.sin(now * 0.0018) * 0.035;

      // Snip Animation logic
      if (actionTriggerRef.current) {
        scissorPhase += dt * 8.0;
        const angle = Math.abs(Math.sin(scissorPhase)) * 0.22 + 0.04;
        leftArmGroup.rotation.z = angle;
        rightArmGroup.rotation.z = -angle;

        if (scissorPhase >= Math.PI * 2) {
          actionTriggerRef.current = false;
          scissorPhase = 0;
          leftArmGroup.rotation.z = 0.12;
          rightArmGroup.rotation.z = -0.12;
          setIsSnapping(false);
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handlePointerDown);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      // Resource Disposal
      bladeGeometry.dispose();
      ringGeometry.dispose();
      shankGeom.dispose();
      tangCurve.dispose();
      bumperGeom.dispose();
      pivotGeom.dispose();
      slotGeom.dispose();
      bladeMaterial.dispose();
      pivotScrewMaterial.dispose();
      bumperMaterial.dispose();
      shadowTexture.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const triggerSnipAction = () => {
    if (!actionTriggerRef.current) {
      actionTriggerRef.current = true;
      setIsSnapping(true);
    }
  };

  const handleResetAngle = () => {
    targetRotationRef.current = { x: 0, y: 0 };
  };

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A0B0C] via-[#0F1114] to-[#0A0B0C] border-b border-[#D4AF37]/15">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.08)_0%,transparent_70%)]" />

      {/* Main 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
        title="Click and drag to rotate the 3D shears"
      />

      {/* Hero Semantic Content Overlay (DOM text for SEO & accessibility) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center pointer-events-none">
        {/* Location Indicator Kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#D4AF37] tracking-wider uppercase mb-4 pointer-events-auto">
          <span>Near Rani Public School</span>
          <span aria-hidden="true">·</span>
          <span>Burari, New Delhi</span>
          <span aria-hidden="true">·</span>
          <span>Unisex Salon</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#F4F4F0] tracking-tight leading-tight max-w-3xl mx-auto mb-5 drop-shadow-sm">
          Your Style, Perfected at <span className="text-[#D4AF37]">ART OF SCISSOR</span>
        </h1>

        {/* Hero Supporting Prose */}
        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Discover professional haircuts, hair spa treatments, ammonia-free hair colouring,
          rejuvenating facials, and grooming packages at your neighbourhood unisex salon in
          Burari, New Delhi.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <button
            onClick={onBookClick}
            className="px-6 py-3 text-sm font-semibold text-black bg-[#D4AF37] hover:bg-[#e4c256] transition-all duration-200 rounded-lg shadow-lg hover:shadow-[#D4AF37]/20 whitespace-nowrap cursor-pointer active:scale-98"
          >
            Book Your Appointment
          </button>

          <button
            onClick={onWhatsAppClick}
            className="px-6 py-3 text-sm font-semibold text-[#F4F4F0] bg-neutral-900/90 hover:bg-neutral-800 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-200 rounded-lg whitespace-nowrap cursor-pointer inline-flex items-center gap-2 active:scale-98"
          >
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* 3D Ergonomic Collapsible Control Dock (Pinned at bottom center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-auto max-w-[92vw] pointer-events-auto">
        <div className="flex flex-col items-center">
          {/* Collapse/Expand Toggle */}
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="px-3 py-1 mb-1.5 text-[11px] font-medium tracking-wide uppercase text-neutral-400 hover:text-[#D4AF37] bg-[#141619] border border-white/10 rounded-full transition-colors cursor-pointer"
            aria-label={isDockCollapsed ? "Show 3D viewer controls" : "Hide 3D viewer controls"}
          >
            {isDockCollapsed ? "▴ 3D Shears Controls" : "▾ Hide Controls"}
          </button>

          {/* Dock Body */}
          {!isDockCollapsed && (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 bg-[#121418] border border-white/10 rounded-xl shadow-2xl">
              {/* Finish Selector */}
              <div className="flex items-center gap-1.5 pr-2 sm:pr-3 sm:border-r border-white/10">
                <span className="text-[11px] text-neutral-400 font-medium">Finish:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveFinish('gold')}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      activeFinish === 'gold'
                        ? 'border-white scale-110 ring-2 ring-[#D4AF37]/40'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: '#D9B343' }}
                    title="Champagne Gold Shears"
                  />
                  <button
                    onClick={() => setActiveFinish('rose')}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      activeFinish === 'rose'
                        ? 'border-white scale-110 ring-2 ring-[#D98F7E]/40'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: '#D98F7E' }}
                    title="Rose Gold Shears"
                  />
                  <button
                    onClick={() => setActiveFinish('platinum')}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      activeFinish === 'platinum'
                        ? 'border-white scale-110 ring-2 ring-white/40'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: '#DCDFE4' }}
                    title="Platinum Steel Shears"
                  />
                  <button
                    onClick={() => setActiveFinish('obsidian')}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      activeFinish === 'obsidian'
                        ? 'border-white scale-110 ring-2 ring-neutral-500/40'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: '#1F2226' }}
                    title="Obsidian Matte Shears"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={triggerSnipAction}
                  disabled={isSnapping}
                  className="px-2.5 py-1 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 rounded-md transition-colors cursor-pointer"
                >
                  {isSnapping ? "Cutting..." : "Test Snip"}
                </button>
                <button
                  onClick={handleResetAngle}
                  className="px-2.5 py-1 text-xs font-medium text-neutral-400 hover:text-white bg-transparent hover:bg-neutral-800/60 rounded-md transition-colors cursor-pointer"
                >
                  Reset Tilt
                </button>
              </div>

              <span className="hidden md:inline text-[11px] text-neutral-500 pl-2">
                Drag to rotate · Three.js PBR Studio
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
