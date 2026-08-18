import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/* ==========================================================================
   ForgeX Industries — Precision Gyroscope Engine
   A cinematic 3D hero scene featuring a gyroscopic precision assembly:
   • Three nested orbital rings at different inclinations
   • Central turbine disc with machined gear-tooth geometry
   • Inner rotating precision core sphere
   • 600 floating metallic spark particles
   • Holographic polar grid platform
   • Full mouse parallax interaction
   ========================================================================== */

function initForgeX3D() {
    let container = document.getElementById("three-container");

    if (!container) {
        const hero3d = document.querySelector(".hero-3d");
        if (hero3d) {
            container = document.createElement("div");
            container.id = "three-container";
            hero3d.appendChild(container);
        } else {
            console.error("ForgeX 3D: .hero-3d not found");
            return;
        }
    }

    container.style.width  = "100%";
    container.style.height = "100%";
    container.style.display = "block";

    const W = container.clientWidth  || 500;
    const H = container.clientHeight || 500;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060b14, 0.018);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 120);
    camera.position.set(0, 0.5, 7.0);
    camera.lookAt(0, 0, 0);

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.toneMapping        = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace   = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled  = true;
    renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    /* ── Environment ── */
    const pmrem   = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment(renderer);
    scene.environment = pmrem.fromScene(roomEnv).texture;

    /* ════════════════════════════════════════
       MATERIALS
    ════════════════════════════════════════ */
    const matObsidian = new THREE.MeshStandardMaterial({
        color: 0x0d1520, metalness: 0.95, roughness: 0.12
    });
    const matChrome = new THREE.MeshStandardMaterial({
        color: 0xd0dce8, metalness: 1.0, roughness: 0.06
    });
    const matCyanGlow = new THREE.MeshStandardMaterial({
        color: 0x00f2fe, emissive: 0x00f2fe, emissiveIntensity: 3.2,
        metalness: 0.0, roughness: 0.0
    });
    const matGoldAccent = new THREE.MeshStandardMaterial({
        color: 0xd4a24c, metalness: 1.0, roughness: 0.08
    });
    const matRingA = new THREE.MeshStandardMaterial({
        color: 0xb8c8d8, metalness: 0.98, roughness: 0.08
    });
    const matRingB = new THREE.MeshStandardMaterial({
        color: 0x8eaec2, metalness: 0.98, roughness: 0.1
    });
    const matRingC = new THREE.MeshStandardMaterial({
        color: 0xc8d8e4, metalness: 0.96, roughness: 0.1
    });

    /* ════════════════════════════════════════
       LIGHTING RIG
    ════════════════════════════════════════ */
    const keyLight = new THREE.DirectionalLight(0xffffff, 5.5);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00f2fe, 5.0);
    cyanRim.position.set(-6, 3, -3);
    scene.add(cyanRim);

    const warmFill = new THREE.DirectionalLight(0xffd9a0, 2.2);
    warmFill.position.set(3, -3, 5);
    scene.add(warmFill);

    const bottomUp = new THREE.DirectionalLight(0x1a3a5c, 2.0);
    bottomUp.position.set(0, -5, 0);
    scene.add(bottomUp);

    scene.add(new THREE.AmbientLight(0x0a1628, 1.5));

    /* Cyan point light inside the gyro core */
    const coreGlow = new THREE.PointLight(0x00f2fe, 8.0, 6.0);
    coreGlow.position.set(0, 0, 0);
    scene.add(coreGlow);

    /* ════════════════════════════════════════
       STARFIELD
    ════════════════════════════════════════ */
    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);

    const starCount = 900;
    const starPos   = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        const r   = 5 + Math.random() * 10;
        const θ   = Math.random() * Math.PI * 2;
        const φ   = Math.acos(Math.random() * 2 - 1);
        starPos[i*3]   = r * Math.sin(φ) * Math.cos(θ);
        starPos[i*3+1] = r * Math.sin(φ) * Math.sin(θ);
        starPos[i*3+2] = r * Math.cos(φ);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    spaceGroup.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
        color: 0x7ec8e3, size: 0.028, transparent: true, opacity: 0.7
    })));

    /* ════════════════════════════════════════
       HOLOGRAPHIC PLATFORM
    ════════════════════════════════════════ */
    const platformGroup = new THREE.Group();
    platformGroup.position.y = -1.9;
    scene.add(platformGroup);

    const grid = new THREE.PolarGridHelper(2.2, 16, 6, 64, 0x00b4cc, 0x004466);
    grid.material.transparent = true;
    grid.material.opacity     = 0.28;
    platformGroup.add(grid);

    /* Thin glowing floor ring */
    const floorRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.012, 12, 120),
        new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.7 })
    );
    floorRing.rotation.x = Math.PI / 2;
    platformGroup.add(floorRing);

    const floorRing2 = new THREE.Mesh(
        new THREE.TorusGeometry(2.2, 0.008, 12, 120),
        new THREE.MeshBasicMaterial({ color: 0x0080aa, transparent: true, opacity: 0.4 })
    );
    floorRing2.rotation.x = Math.PI / 2;
    platformGroup.add(floorRing2);

    /* ════════════════════════════════════════
       MAIN GYROSCOPE GROUP
    ════════════════════════════════════════ */
    const gyroMaster = new THREE.Group();
    scene.add(gyroMaster);

    /* ── Outer Ring (Horizontal plane) ── */
    const outerRingGroup = new THREE.Group();
    gyroMaster.add(outerRingGroup);

    const outerRingMesh = new THREE.Mesh(
        new THREE.TorusGeometry(1.85, 0.072, 28, 160),
        matRingA
    );
    outerRingGroup.add(outerRingMesh);

    /* Notches on outer ring */
    for (let i = 0; i < 24; i++) {
        const angle  = (i / 24) * Math.PI * 2;
        const notch  = new THREE.Mesh(
            new THREE.BoxGeometry(0.045, 0.12, 0.045),
            matChrome
        );
        notch.position.set(Math.cos(angle) * 1.85, Math.sin(angle) * 1.85, 0);
        notch.rotation.z = angle;
        outerRingGroup.add(notch);
    }

    /* Cyan accent strips on outer ring */
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const strip = new THREE.Mesh(
            new THREE.TorusGeometry(1.85, 0.014, 8, 12, 0.22),
            matCyanGlow
        );
        strip.rotation.z = angle;
        outerRingGroup.add(strip);
    }

    /* ── Middle Ring (tilted ~55° on X) ── */
    const middleRingGroup = new THREE.Group();
    middleRingGroup.rotation.x = THREE.MathUtils.degToRad(55);
    middleRingGroup.rotation.z = THREE.MathUtils.degToRad(15);
    gyroMaster.add(middleRingGroup);

    const middleRingMesh = new THREE.Mesh(
        new THREE.TorusGeometry(1.38, 0.055, 24, 140),
        matRingB
    );
    middleRingGroup.add(middleRingMesh);

    for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        const notch = new THREE.Mesh(
            new THREE.BoxGeometry(0.035, 0.09, 0.035),
            matChrome
        );
        notch.position.set(Math.cos(angle) * 1.38, Math.sin(angle) * 1.38, 0);
        notch.rotation.z = angle;
        middleRingGroup.add(notch);
    }

    /* Gold accent bolts */
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const bolt  = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 10), matGoldAccent);
        bolt.position.set(Math.cos(angle) * 1.38, Math.sin(angle) * 1.38, 0);
        middleRingGroup.add(bolt);
    }

    /* ── Inner Ring (tilted ~-70° on X, 30° on Y) ── */
    const innerRingGroup = new THREE.Group();
    innerRingGroup.rotation.x = THREE.MathUtils.degToRad(-70);
    innerRingGroup.rotation.y = THREE.MathUtils.degToRad(30);
    gyroMaster.add(innerRingGroup);

    const innerRingMesh = new THREE.Mesh(
        new THREE.TorusGeometry(0.95, 0.042, 20, 120),
        matRingC
    );
    innerRingGroup.add(innerRingMesh);

    /* Cyan glow strip on inner ring */
    const innerGlowRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.95, 0.01, 10, 120),
        matCyanGlow
    );
    innerRingGroup.add(innerGlowRing);

    /* ── Central Turbine Disc ── */
    const turbineGroup = new THREE.Group();
    gyroMaster.add(turbineGroup);

    /* Main disc body */
    const discBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.62, 0.62, 0.14, 64),
        matObsidian
    );
    turbineGroup.add(discBody);

    /* Disc face rings (machined grooves) */
    const grooveData = [
        { r: 0.52, w: 0.018, mat: matCyanGlow },
        { r: 0.38, w: 0.012, mat: matChrome },
        { r: 0.22, w: 0.016, mat: matCyanGlow },
    ];
    grooveData.forEach(({ r, w, mat }) => {
        [-0.072, 0.072].forEach(yOff => {
            const groove = new THREE.Mesh(new THREE.TorusGeometry(r, w, 8, 80), mat);
            groove.rotation.x = Math.PI / 2;
            groove.position.y = yOff;
            turbineGroup.add(groove);
        });
    });

    /* Gear teeth around disc perimeter */
    const toothCount = 32;
    for (let i = 0; i < toothCount; i++) {
        const angle = (i / toothCount) * Math.PI * 2;
        const tooth = new THREE.Mesh(
            new THREE.BoxGeometry(0.055, 0.13, 0.065),
            matChrome
        );
        tooth.position.set(Math.cos(angle) * 0.64, 0, Math.sin(angle) * 0.64);
        tooth.rotation.y = -angle;
        turbineGroup.add(tooth);
    }

    /* Turbine blade vanes */
    const bladeCount = 8;
    for (let i = 0; i < bladeCount; i++) {
        const angle = (i / bladeCount) * Math.PI * 2;
        const blade = new THREE.Mesh(
            new THREE.BoxGeometry(0.032, 0.12, 0.38),
            matObsidian
        );
        blade.position.set(Math.cos(angle) * 0.28, 0, Math.sin(angle) * 0.28);
        blade.rotation.y = -angle + Math.PI / bladeCount;
        turbineGroup.add(blade);
    }

    /* ── Precision Core Sphere ── */
    const coreSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 40, 40),
        new THREE.MeshStandardMaterial({
            color: 0x00d4ee,
            emissive: 0x006688,
            emissiveIntensity: 1.2,
            metalness: 0.8,
            roughness: 0.05
        })
    );
    gyroMaster.add(coreSphere);

    /* Core outer halo ring */
    const haloRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.008, 8, 80),
        matCyanGlow
    );
    haloRing.rotation.x = Math.PI / 2;
    gyroMaster.add(haloRing);

    /* ── Axle Pins ── */
    [-1, 1].forEach(dir => {
        const pin = new THREE.Mesh(
            new THREE.CylinderGeometry(0.028, 0.028, 0.25, 16),
            matChrome
        );
        pin.rotation.z = Math.PI / 2;
        pin.position.x = dir * 1.1;
        gyroMaster.add(pin);

        const pinTip = new THREE.Mesh(new THREE.SphereGeometry(0.038, 14, 14), matGoldAccent);
        pinTip.position.x = dir * 1.23;
        gyroMaster.add(pinTip);
    });

    [-1, 1].forEach(dir => {
        const pin = new THREE.Mesh(
            new THREE.CylinderGeometry(0.022, 0.022, 0.22, 16),
            matChrome
        );
        pin.position.y = dir * 1.1;
        gyroMaster.add(pin);
    });

    /* ════════════════════════════════════════
       FLOATING METALLIC SPARKS
    ════════════════════════════════════════ */
    const sparkCount = 600;
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkVelocities = [];

    for (let i = 0; i < sparkCount; i++) {
        const θ = Math.random() * Math.PI * 2;
        const φ = Math.acos(Math.random() * 2 - 1);
        const r = 1.5 + Math.random() * 3.0;
        sparkPositions[i*3]   = r * Math.sin(φ) * Math.cos(θ);
        sparkPositions[i*3+1] = r * Math.sin(φ) * Math.sin(θ) * 0.6;
        sparkPositions[i*3+2] = r * Math.cos(φ);
        sparkVelocities.push({
            x: (Math.random() - 0.5) * 0.003,
            y: (Math.random() - 0.5) * 0.002,
            z: (Math.random() - 0.5) * 0.003,
            originX: sparkPositions[i*3],
            originY: sparkPositions[i*3+1],
            originZ: sparkPositions[i*3+2],
        });
    }

    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
    const sparkField = new THREE.Points(sparkGeo, new THREE.PointsMaterial({
        color: 0x88ddff,
        size: 0.022,
        transparent: true,
        opacity: 0.65
    }));
    scene.add(sparkField);

    /* ════════════════════════════════════════
       MOUSE PARALLAX
    ════════════════════════════════════════ */
    let targetMouseX = 0, targetMouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;

    window.addEventListener("mousemove", (e) => {
        targetMouseX = (e.clientX / window.innerWidth)  * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    /* ════════════════════════════════════════
       ANIMATION LOOP
    ════════════════════════════════════════ */
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        /* Smooth mouse interpolation */
        smoothMouseX += (targetMouseX - smoothMouseX) * 0.04;
        smoothMouseY += (targetMouseY - smoothMouseY) * 0.04;

        /* ── Gyro master gentle sway ── */
        gyroMaster.rotation.y = t * 0.12 + smoothMouseX * 0.45;
        gyroMaster.rotation.x = Math.sin(t * 0.3) * 0.08 - smoothMouseY * 0.25;
        gyroMaster.position.y = Math.sin(t * 0.5) * 0.08;

        /* ── Ring independent rotations ── */
        outerRingGroup.rotation.z  = t * 0.28;
        middleRingGroup.rotation.z = -t * 0.42;
        innerRingGroup.rotation.z  = t * 0.65;

        /* ── Turbine disc spin ── */
        turbineGroup.rotation.y = t * 1.4;

        /* ── Core sphere counter-spin ── */
        coreSphere.rotation.y = -t * 0.9;
        coreSphere.rotation.z =  t * 0.4;
        haloRing.rotation.z   =  t * 2.1;

        /* ── Core glow pulse ── */
        coreGlow.intensity = 7 + Math.sin(t * 3.5) * 2.5;

        /* ── Platform ring spin ── */
        floorRing.rotation.z  = t * 0.4;
        floorRing2.rotation.z = -t * 0.2;

        /* ── Starfield slow drift ── */
        spaceGroup.rotation.y = t * 0.012;

        /* ── Floating sparks drift ── */
        const posArr = sparkGeo.attributes.position.array;
        for (let i = 0; i < sparkCount; i++) {
            const v = sparkVelocities[i];
            posArr[i*3]   += v.x;
            posArr[i*3+1] += v.y;
            posArr[i*3+2] += v.z;

            /* Drift back toward origin gently */
            posArr[i*3]   += (v.originX - posArr[i*3])   * 0.003;
            posArr[i*3+1] += (v.originY - posArr[i*3+1]) * 0.003;
            posArr[i*3+2] += (v.originZ - posArr[i*3+2]) * 0.003;
        }
        sparkGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    /* ── Resize handler ── */
    window.addEventListener("resize", () => {
        const w = container.clientWidth  || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initForgeX3D);
} else {
    initForgeX3D();
}
