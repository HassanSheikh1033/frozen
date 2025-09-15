"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Snowflake,
  Music,
  Sparkles,
  Crown,
  ArrowRight,
} from "lucide-react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

// -------------------- 3D MODELS --------------------

const OlafModel = ({ position, rotation, scale }) => {
  const gltf = useLoader(GLTFLoader, "/models/olaf_from_frozen/scene.gltf");
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;

      if (clicked) {
        modelRef.current.position.y =
          position[1] + Math.sin(state.clock.elapsedTime * 5) * 0.2;
      }

      if (hovered) {
        modelRef.current.scale.set(
          scale[0] * 1.1,
          scale[1] * 1.1,
          scale[2] * 1.1
        );
      } else if (!hovered && !clicked) {
        modelRef.current.scale.set(scale[0], scale[1], scale[2]);
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    />
  );
};

const FrozenTear = ({ position, rotation, scale }) => {
  const gltf = useLoader(GLTFLoader, "/models/frozen_tear/scene.gltf");
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;

      if (!clicked) {
        modelRef.current.position.y =
          position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
      } else {
        modelRef.current.rotation.y += 0.05;
        modelRef.current.rotation.x =
          Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }

      if (hovered) {
        modelRef.current.scale.set(
          scale[0] * 1.15,
          scale[1] * 1.15,
          scale[2] * 1.15
        );
      } else if (!hovered && !clicked) {
        modelRef.current.scale.set(scale[0], scale[1], scale[2]);
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    />
  );
};

const FrozenSword = ({ position, rotation, scale }) => {
  const gltf = useLoader(GLTFLoader, "/models/frozen_sci-fi_sword/scene.gltf");
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.007;

      if (!clicked) {
        modelRef.current.rotation.z =
          Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      } else {
        modelRef.current.rotation.z =
          Math.sin(state.clock.elapsedTime * 3) * 0.5;
      }

      if (hovered) {
        modelRef.current.scale.set(
          scale[0] * 1.1,
          scale[1] * 1.1,
          scale[2] * 1.1
        );
      } else if (!hovered && !clicked) {
        modelRef.current.scale.set(scale[0], scale[1], scale[2]);
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    />
  );
};

// -------------------- HERO SECTION --------------------

export default function HeroSection() {
  const heroRef = useRef(null);
  const snowflakesRef = useRef([]);
  const iceGrowthRef = useRef([]);
  const iceLayerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".hero-title", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        { opacity: 0, y: 30, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .from(
        ".hero-icon",
        {
          opacity: 0,
          scale: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      .from(
        ".ice-button",
        { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

    createSnowfall();
    createIceGrowthEffect();
    createIceLayer();

    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      snowflakesRef.current.forEach((snowflake, index) => {
        if (index % 3 === 0) {
          gsap.to(snowflake, {
            x: `+=${(mouseX / window.innerWidth - 0.5) * 20}`,
            y: `+=${(mouseY / window.innerHeight - 0.5) * 20}`,
            duration: 2,
            ease: "power1.out",
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ❄️ CLICKABLE SNOWFLAKES
  const createSnowfall = () => {
    const container = heroRef.current;
    snowflakesRef.current = [];

    for (let i = 0; i < 80; i++) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");

      const size = Math.random() * 15 + 3;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.position = "absolute";
      snowflake.style.top = "-30px";
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      snowflake.style.cursor = "pointer";

      snowflake.innerHTML = `
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14 4L12 8L10 4L12 0Z" />
          <path d="M12 16L14 20L12 24L10 20L12 16Z" />
          <path d="M0 12L4 10L8 12L4 14L0 12Z" />
          <path d="M16 12L20 10L24 12L20 14L16 12Z" />
          <path d="M3.5 3.5L7.5 4.5L8.5 8.5L4.5 7.5L3.5 3.5Z" />
          <path d="M15.5 15.5L19.5 16.5L20.5 20.5L16.5 19.5L15.5 15.5Z" />
          <path d="M3.5 20.5L4.5 16.5L8.5 15.5L7.5 19.5L3.5 20.5Z" />
          <path d="M15.5 8.5L16.5 4.5L20.5 3.5L19.5 7.5L15.5 8.5Z" />
        </svg>
      `;

      // CLICK → burst & remove
      snowflake.addEventListener("click", () => {
        gsap.to(snowflake, {
          scale: 2,
          opacity: 0,
          duration: 0.6,
          ease: "back.in(2)",
          onComplete: () => snowflake.remove(),
        });
      });

      container.appendChild(snowflake);
      snowflakesRef.current.push(snowflake);

      const duration =
        size < 8 ? Math.random() * 15 + 10 : Math.random() * 8 + 5;
      gsap.to(snowflake, {
        y: "100vh",
        x: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 720 - 360,
        duration,
        ease: "none",
        repeat: -1,
        delay: Math.random() * 5,
      });
    }
  };

  // ❄️ CLICKABLE ICE CRYSTALS
  const createIceGrowthEffect = () => {
    const container = heroRef.current;
    iceGrowthRef.current = [];

    for (let i = 0; i < 8; i++) {
      const iceElement = document.createElement("div");
      iceElement.classList.add("ice-crystal");
      iceElement.style.position = "absolute";
      iceElement.style.bottom = "0";
      iceElement.style.left = `${i * 12.5}%`;
      iceElement.style.width = "12.5%";
      iceElement.style.height = "0";
      iceElement.style.background =
        "linear-gradient(to top, rgba(165, 242, 243, 0.7), rgba(165, 242, 243, 0.2))";
      iceElement.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
      iceElement.style.cursor = "pointer";

      // CLICK → melt & remove
      iceElement.addEventListener("click", () => {
        gsap.to(iceElement, {
          height: "0%",
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => iceElement.remove(),
        });
      });

      container.appendChild(iceElement);
      iceGrowthRef.current.push(iceElement);

      gsap.to(iceElement, {
        height: `${Math.random() * 15 + 10}%`,
        duration: Math.random() * 3 + 2,
        ease: "power2.out",
        delay: i * 0.3,
      });
    }
  };

  // New function to create the ice layer for click effects
  const createIceLayer = () => {
    const container = heroRef.current;
    const iceLayer = document.createElement("div");
    iceLayer.classList.add("ice-layer");
    iceLayer.style.position = "absolute";
    iceLayer.style.top = "0";
    iceLayer.style.left = "0";
    iceLayer.style.width = "100%";
    iceLayer.style.height = "100%";
    iceLayer.style.pointerEvents = "none";
    iceLayer.style.zIndex = "15";
    
    container.appendChild(iceLayer);
    iceLayerRef.current = iceLayer;
    
    // Add click event to the hero section for ice breaking effect
    container.addEventListener("click", handleIceBreak);
  };
  
  const handleIceBreak = (e) => {
    // Don't trigger if clicking on a button, interactive element, or canvas
    if (e.target.closest('.ice-button') || 
        e.target.closest('.snowflake') || 
        e.target.closest('.ice-crystal') ||
        e.target.tagName.toLowerCase() === 'canvas') {
      return;
    }
    
    const container = heroRef.current;
    const rect = container.getBoundingClientRect();
    
    // Create ice crack at click position
    const crack = document.createElement("div");
    crack.classList.add("ice-crack");
    
    // Position the crack at click position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    crack.style.position = "absolute";
    crack.style.left = `${x}px`;
    crack.style.top = `${y}px`;
    crack.style.width = "0";
    crack.style.height = "0";
    crack.style.borderRadius = "50%";
    crack.style.background = "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(165,242,243,0.4) 40%, transparent 70%)";
    crack.style.boxShadow = "0 0 20px 10px rgba(255,255,255,0.3)";
    crack.style.zIndex = "16";
    crack.style.pointerEvents = "none";
    
    iceLayerRef.current.appendChild(crack);
    
    // Animate the crack
    gsap.to(crack, {
      width: "200px",
      height: "200px",
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => {
        if (crack.parentNode === iceLayerRef.current) {
          iceLayerRef.current.removeChild(crack);
        }
      }
    });
    
    // Create ice shards
    for (let i = 0; i < 8; i++) {
      const shard = document.createElement("div");
      shard.classList.add("ice-shard");
      
      const size = Math.random() * 20 + 10;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      
      shard.style.position = "absolute";
      shard.style.left = `${x}px`;
      shard.style.top = `${y}px`;
      shard.style.width = `${size}px`;
      shard.style.height = `${size}px`;
      shard.style.background = "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(165,242,243,0.4))";
      shard.style.clipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
      shard.style.zIndex = "17";
      shard.style.pointerEvents = "none";
      
      iceLayerRef.current.appendChild(shard);
      
      // Animate each shard
      gsap.to(shard, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 1 + Math.random(),
        ease: "power2.out",
        onComplete: () => {
          if (shard.parentNode === iceLayerRef.current) {
            iceLayerRef.current.removeChild(shard);
          }
        }
      });
    }
    
    // Play crack sound
    const audio = new Audio("/sounds/ice-crack.mp3");
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const handleEnterKingdom = () => {
    const button = document.querySelector(".ice-button");
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const iceOverlay = document.createElement("div");
    iceOverlay.style.position = "fixed";
    iceOverlay.style.top = "0";
    iceOverlay.style.left = "0";
    iceOverlay.style.width = "100vw";
    iceOverlay.style.height = "100vh";
    iceOverlay.style.background =
      "radial-gradient(circle at center, rgba(165, 242, 243, 0.8), rgba(126, 192, 238, 0.5))";
    iceOverlay.style.opacity = "0";
    iceOverlay.style.zIndex = "10";
    iceOverlay.style.transformOrigin = `${centerX}px ${centerY}px`;

    document.body.appendChild(iceOverlay);

    gsap.to(iceOverlay, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        setTimeout(() => {
          gsap.to(iceOverlay, {
            opacity: 0,
            duration: 1,
            onComplete: () => document.body.removeChild(iceOverlay),
          });
        }, 1000);
      },
    });
  };

  return (
    <section
      className="hero-section relative h-screen overflow-hidden"
      ref={heroRef}
    >
      <div className="hero-background absolute inset-0 z-0">
        <div className="frost-overlay absolute inset-0 z-10"></div>
        <div className="aurora-effect absolute inset-0 z-0"></div>
        <div className="hero-3d-canvas absolute inset-0 z-5 opacity-80">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 15], fov: 50 }}
            style={{ touchAction: 'none' }}
            onCreated={({ gl }) => {
              gl.domElement.style.pointerEvents = 'auto';
            }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
            />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.6}
              color="#8ecdf8"
            />
            <fog attach="fog" args={["#1a365d", 10, 30]} />

            <React.Suspense fallback={null}>
              <OlafModel
                position={[-5, -2, -5]}
                rotation={[0, Math.PI / 4, 0]}
                scale={[1.2, 1.2, 1.2]}
              />
              <FrozenTear
                position={[4, 2, -3]}
                rotation={[0, 0, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
              <FrozenSword
                position={[0, -1, -2]}
                rotation={[Math.PI / 6, 0, Math.PI / 4]}
                scale={[9.3, 9.3, 9.3]}
              />
            </React.Suspense>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 4}
            />
          </Canvas>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm z-20 pointer-events-none">
        Click on the ❄️ snow, crystals & 3D models
      </div>

      <div className="hero-content relative z-30 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <div className="frozen-logo-container mb-8 flex items-center">
          <Crown className="hero-icon text-white" size={60} strokeWidth={1} />
          <h1 className="hero-title text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-blue-200 text-transparent bg-clip-text mx-4">
            FROZEN
          </h1>
          <Snowflake className="hero-icon text-white" size={60} strokeWidth={1} />
        </div>

        <h2 className="hero-subtitle text-4xl md:text-6xl mb-6 font-light">
          Welcome to Arendelle
        </h2>

        <div className="flex justify-center gap-8 mb-8">
          <Sparkles className="hero-icon text-blue-200" size={30} />
          <Music className="hero-icon text-blue-200" size={30} />
          <Snowflake className="hero-icon text-blue-200" size={30} />
        </div>

        <p className="text-xl mb-10 max-w-lg mx-auto">
          Experience the magic of Frozen in this interactive journey through the
          kingdom of Arendelle
        </p>

    <div>
          <button
          className="ice-button flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleEnterKingdom}
        >
          <span>❄️ Enter the Kingdom</span>
          <ArrowRight size={20} />
        </button>
    </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        .ice-button {
          position: relative;
          overflow: hidden;
        }
        
        .ice-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
          pointer-events: none;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        
        .hero-3d-canvas {
          cursor: grab;
        }
        
        .hero-3d-canvas:active {
          cursor: grabbing;
        }
        
        /* Fix for 3D model interaction */
        canvas {
          pointer-events: auto !important;
        }
        
        /* Add frost overlay styling */
        .frost-overlay {
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(165,242,243,0.2) 100%);
          backdrop-filter: blur(5px);
        }
        
        /* Add aurora effect styling */
        .aurora-effect {
          background: linear-gradient(45deg, rgba(14, 73, 115, 0), rgba(126, 192, 238, 0.5), rgba(165, 242, 243, 0.4), rgba(126, 192, 238, 0));
          background-size: 400% 400%;
          animation: aurora 15s ease infinite;
        }
        
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
