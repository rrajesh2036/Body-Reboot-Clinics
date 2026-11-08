import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ANATOMY_JOINTS } from '../data/clinicData';
import { AnatomyJoint } from '../types';
import { RotateCw, ZoomIn, ZoomOut, Eye, Info, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface ThreeAnatomyViewerProps {
  selectedJointId?: string | null;
  onSelectJoint?: (joint: AnatomyJoint | null) => void;
  interactive?: boolean;
  compact?: boolean;
}

// Pre-allocated math objects for zero garbage collection in render loop
const _targetPos = new THREE.Vector3();
const _camPos = new THREE.Vector3();
const _raycaster = new THREE.Raycaster();
const _pointer = new THREE.Vector2();

export const ThreeAnatomyViewer: React.FC<ThreeAnatomyViewerProps> = ({
  selectedJointId = null,
  onSelectJoint,
  interactive = true,
  compact = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const bodyGroupRef = useRef<THREE.Group | null>(null);
  const jointMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const hoveredJointRef = useRef<string | null>(null);
  
  // Camera target controls
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const cameraDesiredPosRef = useRef(new THREE.Vector3(0, 0.2, 5.2));
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);

  // UI state
  const [activeJoint, setActiveJoint] = useState<AnatomyJoint | null>(null);
  const [viewPreset, setViewPreset] = useState<'full' | 'spine' | 'upper' | 'lower'>('full');
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  // Sync with prop
  useEffect(() => {
    if (selectedJointId) {
      const match = ANATOMY_JOINTS.find((j) => j.id === selectedJointId);
      if (match) {
        handleFocusJoint(match);
      }
    } else {
      setActiveJoint(null);
    }
  }, [selectedJointId]);

  const handleFocusJoint = useCallback((joint: AnatomyJoint) => {
    setActiveJoint(joint);
    if (onSelectJoint) {
      onSelectJoint(joint);
    }
    autoRotateRef.current = false;
    setIsRotating(false);

    // Smoothly focus camera towards joint
    const [jx, jy, jz] = joint.position;
    cameraTargetRef.current.set(jx * 0.4, jy, jz);
    cameraDesiredPosRef.current.set(jx * 0.4, jy + 0.1, 2.6);
  }, [onSelectJoint]);

  const handleResetCamera = useCallback(() => {
    setActiveJoint(null);
    if (onSelectJoint) onSelectJoint(null);
    cameraTargetRef.current.set(0, 0.1, 0);
    cameraDesiredPosRef.current.set(0, 0.2, 5.2);
    autoRotateRef.current = true;
    setIsRotating(true);
    setViewPreset('full');
  }, [onSelectJoint]);

  const handlePresetChange = (preset: 'full' | 'spine' | 'upper' | 'lower') => {
    setViewPreset(preset);
    autoRotateRef.current = false;
    setIsRotating(false);

    if (preset === 'full') {
      cameraTargetRef.current.set(0, 0.1, 0);
      cameraDesiredPosRef.current.set(0, 0.2, 5.2);
    } else if (preset === 'spine') {
      cameraTargetRef.current.set(0, 1.2, 0);
      cameraDesiredPosRef.current.set(0, 1.2, 2.8);
    } else if (preset === 'upper') {
      cameraTargetRef.current.set(0, 1.6, 0);
      cameraDesiredPosRef.current.set(0, 1.6, 2.7);
    } else if (preset === 'lower') {
      cameraTargetRef.current.set(0, -1.0, 0);
      cameraDesiredPosRef.current.set(0, -1.0, 2.9);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL per Three.js skill
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
        return false;
      }
    })();

    // Initialize Renderer
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.2);
    cameraRef.current = camera;

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0e2a4a, 1.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x258aff, 0x071b36, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 4);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00c9d6, 3.0);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    const blueFill = new THREE.DirectionalLight(0x145dba, 1.8);
    blueFill.position.set(0, -3, 2);
    scene.add(blueFill);

    // ==========================================
    // PROCEDURAL 3D ANATOMICAL BODY MODEL
    // ==========================================
    const bodyGroup = new THREE.Group();
    bodyGroupRef.current = bodyGroup;
    scene.add(bodyGroup);

    // Materials
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9e6f2,
      roughness: 0.35,
      metalness: 0.15,
      flatShading: false,
    });

    const spineDiscMaterial = new THREE.MeshStandardMaterial({
      color: 0x00c9d6,
      emissive: 0x00a3ad,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.3,
    });

    const jointCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0x258aff,
      emissive: 0x145dba,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.4,
    });

    const muscleStrandMaterial = new THREE.MeshBasicMaterial({
      color: 0x145dba,
      transparent: true,
      opacity: 0.28,
      wireframe: true,
    });

    // 1. Cranium / Skull
    const craniumGeom = new THREE.SphereGeometry(0.32, 24, 20);
    craniumGeom.scale(0.85, 1.05, 0.95);
    const cranium = new THREE.Mesh(craniumGeom, boneMaterial);
    cranium.position.y = 2.65;
    bodyGroup.add(cranium);

    // Mandible
    const mandibleGeom = new THREE.BoxGeometry(0.24, 0.16, 0.28);
    const mandible = new THREE.Mesh(mandibleGeom, boneMaterial);
    mandible.position.set(0, 2.38, 0.08);
    bodyGroup.add(mandible);

    // 2. Spine Vertebrae Column (Cervical, Thoracic, Lumbar)
    const vertebraeCount = 24;
    const spineCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.3, 0.02),   // C1
      new THREE.Vector3(0, 1.95, -0.04), // C7
      new THREE.Vector3(0, 1.45, -0.08), // T6 (thoracic kyphosis)
      new THREE.Vector3(0, 0.95, -0.02), // T12
      new THREE.Vector3(0, 0.55, 0.04),  // L3 (lumbar lordosis)
      new THREE.Vector3(0, 0.25, -0.02), // L5 / Sacrum
    ]);

    const spinePoints = spineCurve.getPoints(vertebraeCount);
    spinePoints.forEach((pt, idx) => {
      // Disc
      const discGeom = new THREE.CylinderGeometry(0.12 - idx * 0.001, 0.14 - idx * 0.001, 0.04, 16);
      const isLumbarOrCervical = idx < 6 || idx > 16;
      const disc = new THREE.Mesh(discGeom, isLumbarOrCervical ? spineDiscMaterial : boneMaterial);
      disc.position.copy(pt);
      disc.rotation.x = Math.PI / 2;
      bodyGroup.add(disc);

      // Spinous process spine back spikes
      const spinousGeom = new THREE.ConeGeometry(0.04, 0.12, 8);
      const spinous = new THREE.Mesh(spinousGeom, boneMaterial);
      spinous.position.set(pt.x, pt.y, pt.z - 0.08);
      spinous.rotation.x = -Math.PI / 2.3;
      bodyGroup.add(spinous);
    });

    // 3. Thoracic Rib Cage Arches
    const ribCount = 8;
    for (let r = 0; r < ribCount; r++) {
      const ribY = 1.85 - r * 0.11;
      const ribRadius = 0.38 + Math.sin((r / ribCount) * Math.PI) * 0.22;
      const ribZScale = 0.85;

      // Left & right ribs
      const ribShape = new THREE.TorusGeometry(ribRadius, 0.022, 8, 24, Math.PI * 0.92);
      const leftRib = new THREE.Mesh(ribShape, boneMaterial);
      leftRib.position.set(0, ribY, -0.04);
      leftRib.rotation.x = Math.PI / 2 + 0.18;
      leftRib.scale.set(1, ribZScale, 1);
      bodyGroup.add(leftRib);
    }

    // Sternum
    const sternumGeom = new THREE.BoxGeometry(0.08, 0.65, 0.03);
    const sternum = new THREE.Mesh(sternumGeom, boneMaterial);
    sternum.position.set(0, 1.45, 0.38);
    bodyGroup.add(sternum);

    // 4. Clavicles & Scapulae (Shoulder Girdle)
    [-1, 1].forEach((side) => {
      // Clavicle
      const clavicleCurve = new THREE.LineCurve3(
        new THREE.Vector3(0, 1.95, 0.12),
        new THREE.Vector3(side * 0.85, 1.85, 0.02)
      );
      const clavicleGeom = new THREE.TubeGeometry(clavicleCurve, 12, 0.032, 8, false);
      const clavicle = new THREE.Mesh(clavicleGeom, boneMaterial);
      bodyGroup.add(clavicle);

      // Scapula
      const scapulaGeom = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        side * 0.25, 1.75, -0.22,
        side * 0.75, 1.78, -0.15,
        side * 0.35, 1.25, -0.24,
      ]);
      scapulaGeom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      scapulaGeom.computeVertexNormals();
      const scapula = new THREE.Mesh(scapulaGeom, boneMaterial);
      bodyGroup.add(scapula);

      // Upper arm: Humerus
      const humerusGeom = new THREE.CylinderGeometry(0.05, 0.045, 0.75, 12);
      const humerus = new THREE.Mesh(humerusGeom, boneMaterial);
      humerus.position.set(side * 1.05, 1.35, 0);
      humerus.rotation.z = side * 0.12;
      bodyGroup.add(humerus);

      // Elbow joint node
      const elbowGeom = new THREE.SphereGeometry(0.065, 12, 12);
      const elbow = new THREE.Mesh(elbowGeom, jointCoreMaterial);
      elbow.position.set(side * 1.15, 0.95, 0.02);
      bodyGroup.add(elbow);

      // Forearm: Radius & Ulna
      const forearmGeom = new THREE.CylinderGeometry(0.04, 0.035, 0.7, 12);
      const forearm = new THREE.Mesh(forearmGeom, boneMaterial);
      forearm.position.set(side * 1.22, 0.55, 0.06);
      forearm.rotation.z = side * 0.08;
      bodyGroup.add(forearm);

      // Hand
      const handGeom = new THREE.BoxGeometry(0.08, 0.2, 0.04);
      const hand = new THREE.Mesh(handGeom, boneMaterial);
      hand.position.set(side * 1.25, 0.12, 0.08);
      bodyGroup.add(hand);
    });

    // 5. Pelvic Girdle
    const pelvisGeom = new THREE.TorusGeometry(0.42, 0.09, 12, 28, Math.PI * 1.05);
    const pelvis = new THREE.Mesh(pelvisGeom, boneMaterial);
    pelvis.position.set(0, 0.22, -0.02);
    pelvis.rotation.x = Math.PI / 2 + 0.35;
    bodyGroup.add(pelvis);

    const sacrumGeom = new THREE.ConeGeometry(0.18, 0.35, 8);
    const sacrum = new THREE.Mesh(sacrumGeom, boneMaterial);
    sacrum.position.set(0, 0.12, -0.12);
    sacrum.rotation.x = -Math.PI / 1.1;
    bodyGroup.add(sacrum);

    // 6. Lower Limbs (Femur, Knee, Tibia/Fibula, Feet)
    [-1, 1].forEach((side) => {
      // Hip joint ball
      const hipGeom = new THREE.SphereGeometry(0.085, 12, 12);
      const hipMesh = new THREE.Mesh(hipGeom, jointCoreMaterial);
      hipMesh.position.set(side * 0.45, 0.05, 0.02);
      bodyGroup.add(hipMesh);

      // Thigh: Femur
      const femurGeom = new THREE.CylinderGeometry(0.065, 0.055, 1.05, 12);
      const femur = new THREE.Mesh(femurGeom, boneMaterial);
      femur.position.set(side * 0.52, -0.52, 0.05);
      femur.rotation.z = -side * 0.06;
      bodyGroup.add(femur);

      // Knee Joint / Patella
      const patellaGeom = new THREE.SphereGeometry(0.085, 16, 16);
      const patella = new THREE.Mesh(patellaGeom, jointCoreMaterial);
      patella.position.set(side * 0.55, -1.05, 0.12);
      bodyGroup.add(patella);

      // Lower leg: Tibia & Fibula
      const tibiaGeom = new THREE.CylinderGeometry(0.055, 0.045, 1.05, 12);
      const tibia = new THREE.Mesh(tibiaGeom, boneMaterial);
      tibia.position.set(side * 0.55, -1.62, 0.06);
      bodyGroup.add(tibia);

      // Ankle joint node
      const ankleGeom = new THREE.SphereGeometry(0.07, 12, 12);
      const ankle = new THREE.Mesh(ankleGeom, jointCoreMaterial);
      ankle.position.set(side * 0.55, -2.15, 0.05);
      bodyGroup.add(ankle);

      // Foot
      const footGeom = new THREE.BoxGeometry(0.12, 0.09, 0.32);
      const foot = new THREE.Mesh(footGeom, boneMaterial);
      foot.position.set(side * 0.55, -2.28, 0.16);
      bodyGroup.add(foot);
    });

    // 7. Muscular Biomechanical Silhouette Mesh
    const torsoContourGeom = new THREE.CylinderGeometry(0.55, 0.42, 1.8, 16, 8, true);
    const torsoContour = new THREE.Mesh(torsoContourGeom, muscleStrandMaterial);
    torsoContour.position.y = 1.1;
    bodyGroup.add(torsoContour);

    // ==========================================
    // INTERACTIVE GLOWING ANATOMY NODES
    // ==========================================
    const jointMeshes = new Map<string, THREE.Mesh>();
    ANATOMY_JOINTS.forEach((joint) => {
      const nodeGeom = new THREE.SphereGeometry(0.11, 20, 20);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(joint.color),
        emissive: new THREE.Color(joint.color),
        emissiveIntensity: 1.4,
        roughness: 0.1,
        metalness: 0.2,
      });

      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(...joint.position);
      nodeMesh.userData = { jointId: joint.id, jointData: joint };
      bodyGroup.add(nodeMesh);
      jointMeshes.set(joint.id, nodeMesh);

      // Outer glowing halo ring
      const ringGeom = new THREE.RingGeometry(0.13, 0.17, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(joint.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.set(...joint.position);
      ring.position.z += 0.02;
      bodyGroup.add(ring);
    });
    jointMeshesRef.current = jointMeshes;

    // Soft Radial Grounding Contact Shadow
    const shadowGeom = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 201, 214, 0.45)');
      grad.addColorStop(0.4, 'rgba(20, 93, 186, 0.2)');
      grad.addColorStop(1, 'rgba(7, 27, 54, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeom, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.35;
    scene.add(shadowPlane);

    // ==========================================
    // INTERACTION LISTENERS (MOUSE & TOUCH)
    // ==========================================
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      autoRotateRef.current = false;
      setIsRotating(false);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDraggingRef.current && bodyGroupRef.current) {
        const deltaX = clientX - previousMousePositionRef.current.x;
        const deltaY = clientY - previousMousePositionRef.current.y;
        bodyGroupRef.current.rotation.y += deltaX * 0.008;
        bodyGroupRef.current.rotation.x += deltaY * 0.004;
        bodyGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, bodyGroupRef.current.rotation.x));
        previousMousePositionRef.current = { x: clientX, y: clientY };
        return;
      }

      // Raycast hover check
      _pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      _pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (cameraRef.current) {
        _raycaster.setFromCamera(_pointer, cameraRef.current);
        const intersectables = Array.from(jointMeshes.values());
        const intersects = _raycaster.intersectObjects(intersectables, false);

        if (intersects.length > 0) {
          const hovered = intersects[0].object as THREE.Mesh;
          const jointId = hovered.userData.jointId;
          if (hoveredJointRef.current !== jointId) {
            hoveredJointRef.current = jointId;
            renderer.domElement.style.cursor = 'pointer';
          }
        } else {
          if (hoveredJointRef.current !== null) {
            hoveredJointRef.current = null;
            renderer.domElement.style.cursor = 'grab';
          }
        }
      }
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      const wasDragging = isDraggingRef.current;
      isDraggingRef.current = false;

      // Check click selection if minimal movement
      if (wasDragging) {
        const rect = renderer.domElement.getBoundingClientRect();
        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;

        _pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        _pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        if (cameraRef.current) {
          _raycaster.setFromCamera(_pointer, cameraRef.current);
          const intersectables = Array.from(jointMeshes.values());
          const intersects = _raycaster.intersectObjects(intersectables, false);

          if (intersects.length > 0) {
            const hit = intersects[0].object as THREE.Mesh;
            const jointData = hit.userData.jointData as AnatomyJoint;
            if (jointData) {
              handleFocusJoint(jointData);
            }
          }
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp, { passive: true });

    // Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // ANIMATION LOOP WITH THREE.JS SKILL DAMPING
    // ==========================================
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      // Slow elegant auto rotation when idle
      if (autoRotateRef.current && bodyGroupRef.current) {
        bodyGroupRef.current.rotation.y += delta * 0.35;
      }

      // Smooth camera interpolation (exponential damping)
      if (cameraRef.current) {
        _camPos.copy(cameraRef.current.position);
        _targetPos.copy(cameraDesiredPosRef.current);
        cameraRef.current.position.lerp(_targetPos, 0.06);

        camera.lookAt(cameraTargetRef.current);
      }

      // Subtle pulse on active or hovered joint node
      jointMeshes.forEach((mesh, id) => {
        const isSelected = activeJoint?.id === id;
        const isHovered = hoveredJointRef.current === id;

        if (isSelected) {
          const s = 1.35 + Math.sin(clock.getElapsedTime() * 4) * 0.15;
          mesh.scale.set(s, s, s);
        } else if (isHovered) {
          mesh.scale.set(1.2, 1.2, 1.2);
        } else {
          mesh.scale.set(1.0, 1.0, 1.0);
        }
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [handleFocusJoint]);

  return (
    <div className="relative w-full h-full min-h-[460px] md:min-h-[580px] flex flex-col items-center justify-between overflow-hidden select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Floating Badge (Minimal Title & Guidance) */}
      <div className="relative z-10 w-full px-4 pt-3 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-[#071B36]/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs">
          <span className="text-[#00C9D6] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            3D Biomechanical Explorer
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-300">Tap glowing joints to inspect</span>
        </div>

        <button
          onClick={handleResetCamera}
          className="pointer-events-auto bg-[#071B36]/80 hover:bg-[#145DBA] text-slate-200 hover:text-white px-2.5 py-1.5 rounded-md text-xs border border-white/10 transition-colors flex items-center gap-1.5 shadow-sm"
          title="Reset 360 View"
        >
          <RotateCw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset View</span>
        </button>
      </div>

      {/* Center Joint Focus Card (When a joint is selected) */}
      {activeJoint && (
        <div className="relative z-10 mt-auto mb-20 max-w-md mx-4 p-4 rounded-xl glass-panel text-left animate-fadeIn border border-[#00C9D6]/30 shadow-2xl">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="text-[11px] font-semibold text-[#00C9D6] uppercase tracking-wider">
                {activeJoint.category.replace('_', ' ')}
              </div>
              <h3 className="text-base font-bold text-white font-heading">
                {activeJoint.name}
              </h3>
            </div>
            <button
              onClick={handleResetCamera}
              className="text-slate-400 hover:text-white text-xs p-1 rounded hover:bg-white/10"
              aria-label="Close joint details"
            >
              ✕
            </button>
          </div>
          
          <p className="text-xs text-slate-200 mb-2 leading-relaxed">
            {activeJoint.description}
          </p>

          <div className="space-y-1.5 pt-1 border-t border-white/10 text-xs">
            <div className="text-slate-300">
              <span className="text-slate-400 font-medium">Common Symptoms: </span>
              {activeJoint.commonConditions.join(', ')}
            </div>
            <div className="text-slate-300">
              <span className="text-[#00C9D6] font-medium">Reboot Clinic Protocol: </span>
              {activeJoint.clinicalApproach}
            </div>
          </div>

          <div className="mt-3 pt-2 flex items-center justify-between gap-2 border-t border-white/10">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Info className="w-3 h-3 text-[#00C9D6]" />
              Educational model · Not a diagnosis
            </span>
            <a
              href="#appointment"
              className="text-xs font-semibold px-3 py-1.5 bg-[#258AFF] hover:bg-[#145DBA] text-white rounded-lg transition-colors whitespace-nowrap"
            >
              Consult for This Area
            </a>
          </div>
        </div>
      )}

      {/* Ergonomic Collapsible Bottom Control Dock (Strictly pinned bottom-center, zero lateral obstruction) */}
      <div className="relative z-10 w-full px-4 pb-3 flex flex-col items-center">
        {/* Toggle Collapse Button */}
        <button
          onClick={() => setControlsCollapsed(!controlsCollapsed)}
          className="mb-1.5 px-3 py-1 rounded-t-md bg-[#071B36]/90 border border-white/10 text-[11px] text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
        >
          {controlsCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-[#00C9D6]" /> Show Controls
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-[#00C9D6]" /> Minimize Controls
            </>
          )}
        </button>

        {/* Horizontal Glass Dock */}
        {!controlsCollapsed && (
          <div className="w-full max-w-2xl px-3 py-2 rounded-xl glass-panel flex flex-wrap items-center justify-between gap-2 border border-white/10 shadow-xl">
            {/* Camera View Presets */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">Views:</span>
              <button
                onClick={() => handlePresetChange('full')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  viewPreset === 'full'
                    ? 'bg-[#258AFF] text-white font-medium'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                Full Body
              </button>
              <button
                onClick={() => handlePresetChange('spine')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  viewPreset === 'spine'
                    ? 'bg-[#258AFF] text-white font-medium'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                Spine & Core
              </button>
              <button
                onClick={() => handlePresetChange('upper')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  viewPreset === 'upper'
                    ? 'bg-[#258AFF] text-white font-medium'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                Shoulder / Upper
              </button>
              <button
                onClick={() => handlePresetChange('lower')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  viewPreset === 'lower'
                    ? 'bg-[#258AFF] text-white font-medium'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                Knee / Hip
              </button>
            </div>

            {/* Quick Joint Selector Dropdown/Pills */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => {
                  const state = !isRotating;
                  setIsRotating(state);
                  autoRotateRef.current = state;
                }}
                className={`px-2 py-1 rounded-md border border-white/10 text-xs flex items-center gap-1 ${
                  isRotating ? 'text-[#00C9D6] bg-[#00C9D6]/10' : 'text-slate-300 hover:text-white'
                }`}
                title={isRotating ? 'Pause 360 Rotation' : 'Start 360 Rotation'}
              >
                <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
                <span className="hidden md:inline">{isRotating ? 'Rotating' : 'Rotate'}</span>
              </button>

              <button
                onClick={() => {
                  if (cameraDesiredPosRef.current) {
                    cameraDesiredPosRef.current.z = Math.max(1.8, cameraDesiredPosRef.current.z - 0.6);
                  }
                }}
                className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (cameraDesiredPosRef.current) {
                    cameraDesiredPosRef.current.z = Math.min(6.5, cameraDesiredPosRef.current.z + 0.6);
                  }
                }}
                className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
