import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

function initForgeX3D() {
    let container = document.getElementById("three-container");

    if (!container) {
        const hero3d = document.querySelector(".hero-3d");
        if (hero3d) {
            container = document.createElement("div");
            container.id = "three-container";
            hero3d.appendChild(container);
        } else {
            console.error("Error: .hero-3d element page par nahi mila!");
            return;
        }
    }

    container.style.width = "100%";
    container.style.minHeight = "450px";
    container.style.height = "100%";
    container.style.display = "block";

    const width = container.clientWidth || window.innerWidth || 500;
    const height = container.clientHeight || window.innerHeight || 500;

    /* =========================================
       1. SCENE & CAMERA (Space Atmosphere)
    ========================================= */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.028);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 6.2);
    camera.lookAt(0, 0, 0);

    /* =========================================
       2. RENDERER (Studio Quality & Tone Mapping)
    ========================================= */
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    /* =========================================
       3. ENVIRONMENT & STUDIO REFLECTIONS
    ========================================= */
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment(renderer);
    scene.environment = pmremGenerator.fromScene(roomEnv).texture;

    /* =========================================
       4. CYBER-STUDIO LIGHTING RIG
    ========================================= */
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f2fe, 4.2);
    cyanRimLight.position.set(-5, 4, -2);
    scene.add(cyanRimLight);

    const purpleFillLight = new THREE.DirectionalLight(0x7928ca, 3.5);
    purpleFillLight.position.set(-3, -2, 4);
    scene.add(purpleFillLight);

    const topSpotlight = new THREE.SpotLight(0x38bdf8, 5.0, 12, Math.PI / 5, 0.4);
    topSpotlight.position.set(0, 5, 2);
    scene.add(topSpotlight);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    /* =========================================
       5. COSMIC SPACE ENVIRONMENT (Stars & Nebula Dust)
    ========================================= */
    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);

    // Deep Space Starfield Particles
    const starCount = 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
        new THREE.Color(0x38bdf8), // Cyan
        new THREE.Color(0x818cf8), // Indigo
        new THREE.Color(0xc084fc), // Purple
        new THREE.Color(0xffffff)  // White star
    ];

    for (let i = 0; i < starCount; i++) {
        const radius = 3.0 + Math.random() * 8.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        starPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        starPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPos[i * 3 + 2] = radius * Math.cos(phi);

        const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        starColors[i * 3] = chosenColor.r;
        starColors[i * 3 + 1] = chosenColor.g;
        starColors[i * 3 + 2] = chosenColor.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const starField = new THREE.Points(starGeo, starMat);
    spaceGroup.add(starField);

    // Cosmic Dust Ring (Horizontal floating space belt)
    const dustCount = 450;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
        const r = 1.8 + Math.random() * 2.8;
        const angle = Math.random() * Math.PI * 2;
        dustPos[i * 3] = Math.cos(angle) * r;
        dustPos[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
        dustPos[i * 3 + 2] = Math.sin(angle) * r;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));

    const dustMat = new THREE.PointsMaterial({
        color: 0x00f2fe,
        size: 0.02,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const dustRing = new THREE.Points(dustGeo, dustMat);
    spaceGroup.add(dustRing);

    /* =========================================
       6. HOLOGRAPHIC ENERGY PLATFORM & RINGS
    ========================================= */
    const platformGroup = new THREE.Group();
    scene.add(platformGroup);

    // Ground Holographic Grid Disc
    const gridHelper = new THREE.PolarGridHelper(2.0, 16, 8, 64, 0x00f2fe, 0x7928ca);
    gridHelper.position.y = -1.15;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.35;
    platformGroup.add(gridHelper);

    // Holographic Energy Ring 1 (Inner Cyan Glow)
    const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.015, 16, 100), ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = -1.14;
    platformGroup.add(ring1);

    // Holographic Energy Ring 2 (Outer Pulsing Purple)
    const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x7928ca,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.01, 16, 120), ring2Mat);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = -1.14;
    platformGroup.add(ring2);

    // Floating Inclined Tech Orbit Ring with Satellite Nodes
    const orbitMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.3
    });
    const orbitRing = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.008, 12, 120), orbitMat);
    orbitRing.rotation.x = Math.PI / 2.5;
    orbitRing.rotation.z = Math.PI / 6;
    orbitRing.position.y = -0.2;
    platformGroup.add(orbitRing);

    // Satellite Data Nodes on Orbit Ring
    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        emissive: 0x00f2fe,
        emissiveIntensity: 3.0
    });

    for (let i = 0; i < 3; i++) {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        nodeGroup.add(node);
    }
    platformGroup.add(nodeGroup);

    /* =========================================
       7. ROBOTIC ARM MODEL SETUP
    ========================================= */
    const roboticPivot = new THREE.Group();
    scene.add(roboticPivot);

    let roboticArm = null;
    let animatedJoints = { forearm: null, wrist: null, leftClaw: null, rightClaw: null };

    let HERO_POS = { x: 0, y: -0.25, z: 0 };
    let HERO_ROT = { x: THREE.MathUtils.degToRad(8), y: THREE.MathUtils.degToRad(-25) };

    const fallbackArm = createProceduralRoboticArm();
    roboticArm = fallbackArm;
    roboticPivot.add(roboticArm);
    roboticPivot.position.set(HERO_POS.x, HERO_POS.y, HERO_POS.z);
    roboticPivot.rotation.set(HERO_ROT.x, HERO_ROT.y, 0);

    const loader = new GLTFLoader();
    loader.load(
        "models/robotic-arm.glb",
        function (gltf) {
            if (fallbackArm) roboticPivot.remove(fallbackArm);
            roboticArm = gltf.scene;
            roboticPivot.add(roboticArm);

            // Material upgrades for GLTF model
            roboticArm.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        child.material.envMapIntensity = 2.8;
                        child.material.roughness = Math.min(child.material.roughness, 0.35);
                        child.material.metalness = Math.max(child.material.metalness, 0.75);
                    }
                }
            });

            const box = new THREE.Box3().setFromObject(roboticArm);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            roboticArm.position.sub(center);

            const maxDimension = Math.max(size.x, size.y, size.z);
            const targetScale = 1.95 / maxDimension;
            roboticArm.scale.setScalar(targetScale);

            roboticPivot.position.set(HERO_POS.x, HERO_POS.y, HERO_POS.z);
            roboticPivot.rotation.set(HERO_ROT.x, HERO_ROT.y, 0);
        },
        undefined,
        function (error) {
            console.warn("GLTF Load Note: Displaying high-detail 3D procedural metallic arm fallback.", error);
        }
    );

    /* =========================================
       8. PROCEDURAL 3D ROBOTIC ARM BUILDER
    ========================================= */
    function createProceduralRoboticArm() {
        const group = new THREE.Group();

        // Ultra-Premium Metallic Materials
        const obsidianMetal = new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            metalness: 0.9,
            roughness: 0.18,
            envMapIntensity: 3.0
        });

        const chromeMetal = new THREE.MeshStandardMaterial({
            color: 0xe2e8f0,
            metalness: 0.98,
            roughness: 0.1,
            envMapIntensity: 3.5
        });

        const goldPistonMat = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.92,
            roughness: 0.15,
            envMapIntensity: 2.8
        });

        const cyanGlowMat = new THREE.MeshStandardMaterial({
            color: 0x00f2fe,
            emissive: 0x00f2fe,
            emissiveIntensity: 2.8,
            roughness: 0.1
        });

        const purpleGlowMat = new THREE.MeshStandardMaterial({
            color: 0x7928ca,
            emissive: 0x7928ca,
            emissiveIntensity: 2.5,
            roughness: 0.1
        });

        // 1. Heavy Octagonal Base Pedestal
        const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.0, 0.35, 32), obsidianMetal);
        baseMesh.position.y = -0.85;
        baseMesh.castShadow = true;
        baseMesh.receiveShadow = true;
        group.add(baseMesh);

        const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.03, 16, 64), cyanGlowMat);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.position.y = -0.72;
        group.add(ringMesh);

        // 2. Swivel Shoulder Joint
        const shoulderMesh = new THREE.Mesh(new THREE.SphereGeometry(0.48, 32, 32), chromeMetal);
        shoulderMesh.position.y = -0.4;
        shoulderMesh.castShadow = true;
        group.add(shoulderMesh);

        // 3. Primary Upper Arm Segment
        const arm1Group = new THREE.Group();
        arm1Group.position.set(0, -0.4, 0);

        const arm1Mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 1.5, 24), obsidianMetal);
        arm1Mesh.position.set(0, 0.75, 0);
        arm1Mesh.rotation.z = -THREE.MathUtils.degToRad(25);
        arm1Mesh.castShadow = true;
        arm1Group.add(arm1Mesh);

        // Hydraulic Gold Cylinder Piston
        const pistonMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.1, 16), goldPistonMat);
        pistonMesh.position.set(0.22, 0.65, 0.1);
        pistonMesh.rotation.z = -THREE.MathUtils.degToRad(25);
        arm1Group.add(pistonMesh);

        // 4. Chrome Elbow Joint
        const elbowMesh = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 32), chromeMetal);
        elbowMesh.position.set(-0.64, 1.4, 0);
        elbowMesh.castShadow = true;
        arm1Group.add(elbowMesh);

        // 5. Forearm Segment
        const forearmGroup = new THREE.Group();
        forearmGroup.position.set(-0.64, 1.4, 0);

        const forearmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.3, 24), obsidianMetal);
        forearmMesh.position.set(0.38, 0.65, 0);
        forearmMesh.rotation.z = THREE.MathUtils.degToRad(60);
        forearmMesh.castShadow = true;
        forearmGroup.add(forearmMesh);

        const forearmRingMesh = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.025, 16, 32), purpleGlowMat);
        forearmRingMesh.rotation.x = Math.PI / 2;
        forearmRingMesh.position.set(0.38, 0.65, 0);
        forearmGroup.add(forearmRingMesh);

        // 6. Wrist & End Effector
        const wristMesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), chromeMetal);
        wristMesh.position.set(0.9, 1.0, 0);
        wristMesh.castShadow = true;
        forearmGroup.add(wristMesh);

        // Precision Dual Claw Grippers
        const clawGeo = new THREE.BoxGeometry(0.06, 0.32, 0.1);
        const leftClaw = new THREE.Mesh(clawGeo, chromeMetal);
        leftClaw.position.set(1.08, 1.15, 0.12);
        leftClaw.rotation.z = THREE.MathUtils.degToRad(-30);
        forearmGroup.add(leftClaw);

        const rightClaw = new THREE.Mesh(clawGeo, chromeMetal);
        rightClaw.position.set(1.08, 1.15, -0.12);
        rightClaw.rotation.z = THREE.MathUtils.degToRad(-30);
        forearmGroup.add(rightClaw);

        // Glowing Sci-Fi Laser Tip
        const laserTip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), cyanGlowMat);
        laserTip.position.set(1.15, 1.2, 0);
        forearmGroup.add(laserTip);

        arm1Group.add(forearmGroup);
        group.add(arm1Group);

        group.scale.setScalar(0.82);

        animatedJoints.forearm = forearmGroup;
        animatedJoints.leftClaw = leftClaw;
        animatedJoints.rightClaw = rightClaw;

        return group;
    }

    /* =========================================
       9. MOUSE TRACKING & INTERACTIVE SMOOTH LERP
    ========================================= */
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    window.addEventListener("mousemove", (event) => {
        targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener("touchmove", (event) => {
        if (event.touches.length > 0) {
            targetMouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    }, { passive: true });

    /* =========================================
       10. ANIMATION & RENDER LOOP
    ========================================= */
    const clock = new THREE.Clock();
    let currentRotX = HERO_ROT.x;
    let currentRotY = HERO_ROT.y;
    let currentPosZ = HERO_POS.z;

    function animate() {
        requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        // Smooth Mouse Lerp
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Robotic Arm Movement & Floating Sine Wave
        if (roboticPivot) {
            const targetRotX = HERO_ROT.x - mouseY * 0.3;
            const targetRotY = HERO_ROT.y + mouseX * 0.4 + (time * 0.04);

            currentRotX += (targetRotX - currentRotX) * 0.06;
            currentRotY += (targetRotY - currentRotY) * 0.06;

            const floatY = Math.sin(time * 1.5) * 0.04;
            const floatZ = Math.cos(time * 1.2) * 0.02;

            // Interactive 3D Depth Pop-Out on hover near center
            const cursorProximity = 1 - Math.hypot(mouseX, mouseY);
            const targetZ = HERO_POS.z + Math.max(0, cursorProximity) * 0.5;
            currentPosZ += (targetZ - currentPosZ) * 0.05;

            roboticPivot.rotation.x = currentRotX;
            roboticPivot.rotation.y = currentRotY;
            roboticPivot.rotation.z = mouseX * -0.04;

            roboticPivot.position.y = HERO_POS.y + floatY - mouseY * 0.06;
            roboticPivot.position.x = HERO_POS.x + mouseX * 0.12;
            roboticPivot.position.z = currentPosZ + floatZ;
        }

        // Procedural Micro-Kinematics Joint Animations
        if (animatedJoints.forearm) {
            animatedJoints.forearm.rotation.z = Math.sin(time * 1.8) * 0.06;
        }
        if (animatedJoints.leftClaw && animatedJoints.rightClaw) {
            const clawSpread = Math.sin(time * 2.5) * 0.02;
            animatedJoints.leftClaw.position.z = 0.12 + clawSpread;
            animatedJoints.rightClaw.position.z = -0.12 - clawSpread;
        }

        // Space Particles & Orbit Animations
        spaceGroup.rotation.y = time * 0.015;
        dustRing.rotation.y = -time * 0.03;

        ring1.rotation.z = time * 0.5;
        ring2.rotation.z = -time * 0.3;
        ring2Mat.opacity = 0.35 + Math.sin(time * 2.5) * 0.15;

        orbitRing.rotation.z = time * 0.15;
        orbitRing.rotation.x = Math.PI / 2.5 + Math.sin(time * 0.5) * 0.08;

        // Satellite Nodes Orbit Path Calculation
        for (let i = 0; i < 3; i++) {
            const angle = time * 0.6 + (i * (Math.PI * 2 / 3));
            const nodeRadius = 2.1;
            const nodeMesh = nodeGroup.children[i];
            if (nodeMesh) {
                nodeMesh.position.x = Math.cos(angle) * nodeRadius;
                nodeMesh.position.z = Math.sin(angle) * nodeRadius;
                nodeMesh.position.y = -0.2 + Math.sin(angle * 2) * 0.1;
            }
        }

        // Dynamic Lighting Parallax Shift
        cyanRimLight.position.x = -5 + mouseX * 2.5;
        cyanRimLight.position.y = 4 + mouseY * 2.0;
        keyLight.position.x = 4 + mouseX * 3.0;

        // Camera Smooth Parallax
        camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.04;
        camera.position.y += (0.4 + mouseY * 0.15 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    animate();

    /* =========================================
       11. RESPONSIVE RESIZE HANDLING
    ========================================= */
    function handleResize() {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        if (w <= 900) {
            HERO_POS = { x: 0, y: -0.35, z: 0 };
        } else {
            HERO_POS = { x: 0, y: -0.25, z: 0 };
        }
    }

    window.addEventListener("resize", handleResize);

    const btnRight = document.getElementById("pos-right");
    const btnCenter = document.getElementById("pos-center");

    if (btnRight && btnCenter) {
        btnRight.addEventListener("click", () => {
            HERO_POS.x = 0.95;
            HERO_POS.y = -0.25;
            btnRight.classList.add("active");
            btnCenter.classList.remove("active");
        });

        btnCenter.addEventListener("click", () => {
            HERO_POS.x = 0.0;
            HERO_POS.y = -0.25;
            btnCenter.classList.add("active");
            btnRight.classList.remove("active");
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initForgeX3D);
} else {
    initForgeX3D();
}