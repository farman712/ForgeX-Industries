/* =========================================
   FORGEX INDUSTRIES
   MAIN JAVASCRIPT & MODAL SYSTEM
========================================= */

// Global Data Store for Modals
const APP_DATA = {
    products: {
        "cnc-components": {
            title: "5-Axis Precision CNC Components",
            tag: "AEROSPACE SPEC",
            img: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1000&q=80",
            desc: "Sub-micron contoured titanium and superalloy components machined on Hermle 5-axis CNC centers. Engine blades, rotor mounts, and flight-critical fittings.",
            specs: {
                "Material Grade": "Ti-6Al-4V Titanium Alloy",
                "Machining Tolerance": "±0.002 mm (Sub-micron)",
                "Surface Roughness": "Ra 0.4 µm Electropolished",
                "Quality Inspection": "ZEISS Optical CMM & Ultrasonic NDT",
                "Certification Standard": "AS9100D Flight Critical"
            }
        },
        "industrial-parts": {
            title: "CryoForged Industrial Valve Assemblies",
            tag: "SUBSEA ENERGY",
            img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
            desc: "High-pressure offshore flow control valves engineered to withstand 15,000 PSI deep sea hydrostatic pressure and corrosive saltwater environments.",
            specs: {
                "Material Grade": "Inconel 718 Superalloy",
                "Pressure Rating": "15,000 PSI Hydrostatic",
                "Corrosion Index": "PREN > 45 Subsea",
                "Seal Specification": "Metal-to-Metal Cryogenic Seal",
                "Compliance": "API 6A / NACE MR0175"
            }
        },
        "gear-assemblies": {
            title: "OmniDrive Harmonic Gear Assemblies",
            tag: "ROBOTICS & EV",
            img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
            desc: "Zero-backlash strain wave gear modules integrated with high-resolution magnetic encoders for high-payload industrial robotic joints.",
            specs: {
                "Material Alloy": "Anodized 7075-T6 & Carbon Steel",
                "Angular Backlash": "< 1.0 Arcmin",
                "Peak Torque Capacity": "450 Nm",
                "Encoder Resolution": "20-bit Optical Encoder",
                "Protection Rating": "IP67 Waterproof"
            }
        },
        "brake-rotors": {
            title: "Carbon-Matrix Ceramic Brake Rotors",
            tag: "MOTORSPORT & EV",
            img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80",
            desc: "Ultra-lightweight carbon ceramic matrix brake discs for endurance racing and high-performance electric vehicles. Zero thermal fade up to 1250°C.",
            specs: {
                "Material Grade": "Carbon-Silicon Carbide (C/SiC)",
                "Thermal Endurance": "1250°C Peak",
                "Mass Reduction": "-58% vs Steel Rotors",
                "Cooling Geometry": "Directional Vanes",
                "Caliper Interface": "Monoblock Billet Titanium"
            }
        },
        "milling-spindle": {
            title: "HyperSpeed CNC Milling Spindles",
            tag: "MACHINING TECH",
            img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1000&q=80",
            desc: "Direct-drive electric CNC spindles operating up to 48,000 RPM with internal glycol liquid cooling jackets for high-speed aluminum and titanium slotting.",
            specs: {
                "Max Speed": "48,000 RPM",
                "Motor Power": "32 kW High Torque",
                "Bearings": "Hybrid Silicon Nitride Ceramic",
                "Runout": "< 0.001 mm at Tool Nose",
                "Cooling System": "Chilled Liquid Jacket"
            }
        },
        "modular-chassis": {
            title: "Defense-Grade DMLS 3D Printed Chassis",
            tag: "DEFENSE & TACTICAL",
            img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80",
            desc: "Direct Metal Laser Sintered (DMLS) Scalmalloy lightweight chassis featuring internal lattice geometry for defense UAVs and satellite sub-structures.",
            specs: {
                "Material Alloy": "Scalmalloy (Al-Mg-Sc)",
                "Manufacturing Tech": "Dual 1000W Fiber Laser DMLS",
                "Metal Density": "99.95% Full Density",
                "Mass Reduction": "42% Lightweight Savings",
                "ITAR Standard": "ITAR Registered Sub-assembly"
            }
        }
    },
    capabilities: {
        "cnc": {
            title: "5-Axis CNC Precision Machining",
            img: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1000&q=80",
            desc: "State-of-the-art multi-axis Hermle and DMG Mori milling centers equipped with high-speed spindles and optical in-process probing.",
            specs: [
                "Positioning Accuracy: ±0.001 mm (Sub-micron)",
                "Max Work Envelope: 1200 x 900 x 800 mm",
                "Spindle Speeds: Up to 48,000 RPM",
                "Compatible Alloys: Titanium, Inconel, Scalmalloy, 7075 Aluminum, Tool Steels"
            ]
        },
        "precision": {
            title: "Precision Engineering & Metrology",
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
            desc: "Climate-controlled metrology lab operating ZEISS Coordinate Measuring Machines (CMM) and 3D blue-light scanners for 100% dimensional inspection.",
            specs: [
                "Climate Control: 20°C ±0.1°C ISO Standard",
                "Scanning Resolution: 0.0005 mm 3D Cloud",
                "Non-Destructive Testing: X-Ray Micro-CT & Ultrasonic NDT",
                "Documentation: Full Material Test Reports (MTR) included"
            ]
        },
        "metal": {
            title: "Metal Fabrication & Vacuum Metallurgy",
            img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
            desc: "Computerized vacuum furnace heat treatment, stress relief, and Hot Isostatic Pressing (HIP) for aerospace superalloy integrity.",
            specs: [
                "Vacuum Level: 10⁻⁵ mbar",
                "Max Furnace Temp: 1350°C",
                "Quenching Gas: High-Purity Nitrogen Pressurized Quench",
                "Accreditation: NADCAP Heat Treating Certified"
            ]
        },
        "custom": {
            title: "Custom Manufacturing & DMLS 3D Metal Printing",
            img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
            desc: "Additive manufacturing using dual 1000W fiber lasers to build flight-certified metallic components with internal cooling channels.",
            specs: [
                "Build Envelope: 400 x 400 x 400 mm",
                "Layer Thickness: 20 to 60 Microns",
                "Metal Powders: Ti-6Al-4V, Inconel 718, Scalmalloy, 316L",
                "Turnaround: 24-Hour Rapid Prototyping Dispatch"
            ]
        }
    },
    industries: {
        "automotive": {
            title: "Automotive & Next-Gen EV",
            cert: "IATF 16949 Compliant Lines",
            img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80",
            desc: "Manufacturing high-performance suspension uprights, carbon ceramic brake rotors, EV battery chill plates, and electric drivetrain gears.",
            parts: [
                "Carbon Ceramic Hydro-Brake Discs",
                "Billet Aluminum Suspension Uprights",
                "EV Battery Cooling Plates",
                "Differential Ring Gears"
            ]
        },
        "construction": {
            title: "Construction & Industrial Robotics",
            cert: "ISO 9001:2015 Certified",
            img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80",
            desc: "Heavy-duty forged hydraulic cylinder mounts, robot arm joint actuators, structural pins, and automated gripper mechanisms.",
            parts: [
                "6-Axis Harmonic Drive Robot Actuators",
                "Heavy Hydraulic Cylinder Housings",
                "High-Tensile Structural Pins",
                "Automated Arm Grippers"
            ]
        },
        "energy": {
            title: "Energy & Offshore Power",
            cert: "API 6A & NACE MR0175 Compliant",
            img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80",
            desc: "Manufacturing heavy Inconel flow control valves, subsea manifold fittings, and wind turbine gearbox shafts engineered for ocean immersion.",
            parts: [
                "15,000 PSI Subsea Control Valves",
                "Inconel 718 Wellhead Flanges",
                "Offshore Wind Pitch Gears",
                "Separator Manifold Spools"
            ]
        },
        "engineering": {
            title: "Aerospace & Heavy Engineering",
            cert: "AS9100D Flight Critical Standard",
            img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1000&q=80",
            desc: "Producing flight-ready jet engine turbine blades, rocket turbopump housings, satellite payload mounts, and structural aerospace bulkheads.",
            parts: [
                "Titanium Turbofan Blades",
                "Rocket Engine Combustion Liners",
                "Satellite Payload Frames",
                "Flight Control Actuator Brackets"
            ]
        }
    },
    stats: {
        "experience": { title: "15+ Years Precision Experience", text: "Founded in 2011, ForgeX Industries has pioneered sub-micron machining and metal additive manufacturing across global markets." },
        "products": { title: "500+ Delivered Product Lines", text: "Over 500 custom precision product components engineered and delivered to aerospace, defense, automotive, and subsea energy leaders." },
        "machines": { title: "50+ Multi-Axis Machine Fleet", text: "Equipped with 5-axis Hermle milling centers, DMG Mori CNC lathes, EOS DMLS metal 3D printers, and ZEISS 3D metrology labs." },
        "markets": { title: "20+ Global Export Markets", text: "Shipping certified flight-critical and industrial parts across North America, Europe, Asia-Pacific, and the Middle East." }
    }
};

/* =========================================
   DOM EVENT LISTENERS & INITIALIZATION
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initModals();
    initForms();
});

// Navigation Setup
function initNavigation() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navbar = document.querySelector(".navbar");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    // Scroll styling
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        highlightActiveSection();
    });
}

function highlightActiveSection() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
        const secHeight = sec.offsetHeight;
        const secTop = sec.offsetTop - 120;
        const secId = sec.getAttribute("id");
        const link = document.querySelector(`.nav-menu a[href*="${secId}"]`);

        if (link) {
            if (scrollY > secTop && scrollY <= secTop + secHeight) {
                document.querySelectorAll(".nav-menu a").forEach(a => a.classList.remove("active"));
                link.classList.add("active");
            }
        }
    });
}

/* =========================================
   MODALS SYSTEM
========================================= */
function initModals() {
    // Backdrop Close Buttons
    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.close;
            closeModal(targetId);
        });
    });

    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal-overlay.active").forEach(m => closeModal(m.id));
        }
    });

    // Open Quote Modal Triggers
    document.querySelectorAll(".open-quote-modal").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal("quote-modal");
        });
    });

    // Product Card Click Listeners
    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => {
            const key = card.dataset.product;
            openProductModal(key);
        });
    });

    // Capability Card Click Listeners
    document.querySelectorAll(".capability-card").forEach(card => {
        card.addEventListener("click", () => {
            const key = card.dataset.cap;
            openCapabilityModal(key);
        });
    });

    document.querySelectorAll(".open-cap-direct").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const key = link.dataset.cap;
            openCapabilityModal(key);
        });
    });

    // Industry Item Click Listeners
    document.querySelectorAll(".industry-item").forEach(item => {
        item.addEventListener("click", () => {
            const key = item.dataset.industry;
            openIndustryModal(key);
        });
    });

    // Stats Click Listeners
    document.querySelectorAll(".stat").forEach(stat => {
        stat.addEventListener("click", () => {
            const key = stat.dataset.stat;
            const data = APP_DATA.stats[key];
            if (data) {
                openInfoModal(data.title, data.text);
            }
        });
    });

    // Factory Facility Box Listener
    const facImgBox = document.getElementById("factory-img-box");
    if (facImgBox) {
        facImgBox.addEventListener("click", () => {
            openInfoModal("ForgeX Manufacturing Hub - Facility Specs", 
                "Our 120,000 sq. ft. precision engineering plant in Indore features climate-controlled metrology cleanrooms (Class 10,000), 50+ multi-axis CNC centers, 24/7 automated robotic welding cells, and air-gapped secure CAD engineering workstations under ITAR compliance.");
        });
    }

    // Info Modal Triggers
    document.querySelectorAll(".open-info-modal").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const title = el.dataset.title || "ForgeX Info";
            const content = el.dataset.content || "Information overview.";
            openInfoModal(title, content);
        });
    });

    // CAD Download Simulation
    const downloadCadBtn = document.getElementById("download-cad-btn");
    if (downloadCadBtn) {
        downloadCadBtn.addEventListener("click", () => {
            showToast("Downloading 3D STEP File Model... (Encrypted)");
        });
    }
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

// Modal Content Generators
function openProductModal(key) {
    const data = APP_DATA.products[key];
    if (!data) return;

    document.getElementById("p-title").textContent = data.title;
    document.getElementById("p-tag").textContent = data.tag;
    document.getElementById("p-desc").textContent = data.desc;
    document.getElementById("p-img").src = data.img;

    const table = document.getElementById("p-table");
    table.innerHTML = "";
    for (const [k, v] of Object.entries(data.specs)) {
        table.innerHTML += `<tr><td>${k}:</td><td>${v}</td></tr>`;
    }

    openModal("product-modal");
}

function openCapabilityModal(key) {
    const data = APP_DATA.capabilities[key];
    if (!data) return;

    document.getElementById("c-title").textContent = data.title;
    document.getElementById("c-desc").textContent = data.desc;
    document.getElementById("c-img").src = data.img;

    const list = document.getElementById("c-list");
    list.innerHTML = "";
    data.specs.forEach(s => {
        list.innerHTML += `<li>✓ ${s}</li>`;
    });

    openModal("capability-modal");
}

function openIndustryModal(key) {
    const data = APP_DATA.industries[key];
    if (!data) return;

    document.getElementById("ind-title").textContent = data.title;
    document.getElementById("ind-cert").textContent = data.cert;
    document.getElementById("ind-desc").textContent = data.desc;
    document.getElementById("ind-img").src = data.img;

    const parts = document.getElementById("ind-parts");
    parts.innerHTML = "";
    data.parts.forEach(p => {
        parts.innerHTML += `<li>✓ ${p}</li>`;
    });

    openModal("industry-modal");
}

function openInfoModal(title, content) {
    document.getElementById("info-title").textContent = title;
    document.getElementById("info-body").innerHTML = `<p>${content}</p>`;
    openModal("info-modal");
}

/* =========================================
   FORM SUBMISSIONS & TOASTS
========================================= */
function initForms() {
    const mainForm = document.getElementById("main-contact-form");
    if (mainForm) {
        mainForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("contact-name").value;
            showToast(`Thank you ${name}! Your proposal inquiry was submitted.`);
            mainForm.reset();
        });
    }

    const rfqForm = document.getElementById("rfq-dialog-form");
    if (rfqForm) {
        rfqForm.addEventListener("submit", (e) => {
            e.preventDefault();
            closeModal("quote-modal");
            showToast("Instant RFQ Request Sent! An engineer will contact you shortly.");
            rfqForm.reset();
        });
    }
}

function showToast(msg) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;

    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 4000);
}
