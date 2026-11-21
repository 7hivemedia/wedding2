import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface PetalMeta {
  mesh: THREE.Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
  speedY: number;
  driftFreq: number;
  driftAmp: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  phase: number;
}

export const HeroThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2');
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

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2)
    );

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 12);

    // Subtle studio reflection for soft gold shimmer particles
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const hemiLight = new THREE.HemisphereLight(0xfbfaff, 0xddd3f1, 1.3);
    scene.add(hemiLight);

    const warmKey = new THREE.DirectionalLight(0xfff1d6, 1.1);
    warmKey.position.set(4, 6, 8);
    scene.add(warmKey);

    // Sculpted curved 3D flower petal geometry
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.14, 0.12, 0.22, 0.34, 0, 0.46);
    petalShape.bezierCurveTo(-0.22, 0.34, -0.14, 0.12, 0, 0);

    const petalGeometry = new THREE.ShapeGeometry(petalShape, 8);
    const posAttr = petalGeometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      // Gentle natural cup curvature
      const zCurve = Math.sin(y * Math.PI) * 0.04 - Math.abs(x) * 0.08;
      posAttr.setZ(i, zCurve);
    }
    petalGeometry.computeVertexNormals();

    const lilacPetalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#C8B4EB'),
      roughness: 0.55,
      metalness: 0.02,
      transparent: true,
      opacity: 0.52,
      side: THREE.DoubleSide,
    });

    const orchidPetalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E3A6D8'),
      roughness: 0.5,
      metalness: 0.04,
      transparent: true,
      opacity: 0.48,
      side: THREE.DoubleSide,
    });

    const goldMoteGeo = new THREE.OctahedronGeometry(0.032, 0);
    const goldMoteMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C9A24B'),
      roughness: 0.22,
      metalness: 0.88,
      transparent: true,
      opacity: 0.65,
    });

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const petals: PetalMeta[] = [];
    const petalCount = 26;
    for (let i = 0; i < petalCount; i++) {
      const mat = i % 2 === 0 ? lilacPetalMat : orchidPetalMat;
      const mesh = new THREE.Mesh(petalGeometry, mat);
      const baseX = (Math.random() - 0.5) * 14;
      const baseY = (Math.random() - 0.5) * 10;
      const baseZ = (Math.random() - 0.5) * 6 - 1.5;
      const scale = 0.55 + Math.random() * 0.65;
      mesh.scale.setScalar(scale);
      mesh.position.set(baseX, baseY, baseZ);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      rootGroup.add(mesh);

      petals.push({
        mesh,
        baseX,
        baseY,
        baseZ,
        speedY: 0.22 + Math.random() * 0.26,
        driftFreq: 0.4 + Math.random() * 0.5,
        driftAmp: 0.28 + Math.random() * 0.35,
        rotSpeedX: (Math.random() - 0.5) * 0.45,
        rotSpeedY: (Math.random() - 0.5) * 0.55,
        rotSpeedZ: (Math.random() - 0.5) * 0.35,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Soft floating gold dust motes
    const moteCount = 34;
    const motesInstanced = new THREE.InstancedMesh(
      goldMoteGeo,
      goldMoteMat,
      moteCount
    );
    const motePositions: Array<{ x: number; y: number; z: number; phase: number }> =
      [];
    const dummy = new THREE.Object3D();
    for (let i = 0; i < moteCount; i++) {
      const x = (Math.random() - 0.5) * 13;
      const y = (Math.random() - 0.5) * 9;
      const z = (Math.random() - 0.5) * 5 - 1;
      motePositions.push({ x, y, z, phase: Math.random() * Math.PI * 2 });
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.6 + Math.random() * 0.8);
      dummy.updateMatrix();
      motesInstanced.setMatrixAt(i, dummy.matrix);
    }
    motesInstanced.instanceMatrix.needsUpdate = true;
    motesInstanced.computeBoundingSphere();
    rootGroup.add(motesInstanced);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let pointerTargetX = 0;
    let pointerTargetY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerTargetX = nx * 0.45;
      pointerTargetY = ny * 0.3;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    if (prefersReduced) {
      renderer.render(scene, camera);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        petalGeometry.dispose();
        lilacPetalMat.dispose();
        orchidPetalMat.dispose();
        goldMoteGeo.dispose();
        goldMoteMat.dispose();
        envTexture.dispose();
        renderer.dispose();
        if (renderer.domElement.parentElement === container) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        pointerTargetX,
        3.2,
        dt
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        pointerTargetY,
        3.2,
        dt
      );
      camera.lookAt(0, 0, 0);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.mesh.position.y -= p.speedY * dt;
        if (p.mesh.position.y < -5.5) {
          p.mesh.position.y = 5.5;
          p.mesh.position.x = p.baseX;
        }
        p.mesh.position.x =
          p.baseX + Math.sin(elapsed * p.driftFreq + p.phase) * p.driftAmp;
        p.mesh.rotation.x += p.rotSpeedX * dt;
        p.mesh.rotation.y += p.rotSpeedY * dt;
        p.mesh.rotation.z += p.rotSpeedZ * dt;
      }

      for (let i = 0; i < moteCount; i++) {
        const m = motePositions[i];
        dummy.position.set(
          m.x + Math.sin(elapsed * 0.4 + m.phase) * 0.14,
          m.y + Math.cos(elapsed * 0.35 + m.phase) * 0.16,
          m.z
        );
        dummy.rotation.y = elapsed * 0.5 + m.phase;
        dummy.scale.setScalar(0.75 + Math.sin(elapsed * 1.4 + m.phase) * 0.22);
        dummy.updateMatrix();
        motesInstanced.setMatrixAt(i, dummy.matrix);
      }
      motesInstanced.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    if (isSoftwareGl) {
      renderer.render(scene, camera);
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      petalGeometry.dispose();
      lilacPetalMat.dispose();
      orchidPetalMat.dispose();
      goldMoteGeo.dispose();
      goldMoteMat.dispose();
      envTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-90"
      aria-hidden="true"
    />
  );
};
