"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Film, Music, Award, Star, Sparkles, Gift, Ticket } from 'lucide-react';

export default function TimelineSection() {
  const timelineRef = useRef(null);
  const audioRef = useRef(null);
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Create main timeline
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 60%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate the heading with a more dramatic entrance
    mainTl.from(".timeline-heading", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    });
    
    // Animate the timeline line with a glowing effect
    mainTl.from(".timeline-line", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 2,
      ease: "power3.inOut"
    }, "-=0.8");
    
    // Add a glow pulse to the timeline
    gsap.to(".timeline-line", {
      boxShadow: "0 0 15px 2px rgba(165, 242, 243, 0.8)",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut"
    });
    
    createThreeJsHorse();

    // Create continuous background snow rain animation
    createBackgroundSnowRain();
    

  // Add new function to create the 3D frozen horse
  const createFrozenHorse = (container) => {
    // Create horse container
    const horseContainer = document.createElement('div');
    horseContainer.className = 'frozen-horse-container';
    horseContainer.style.position = 'absolute';
    horseContainer.style.bottom = '5%';
    horseContainer.style.right = '10%';
    horseContainer.style.width = '300px';
    horseContainer.style.height = '300px';
    horseContainer.style.zIndex = '3';
    horseContainer.style.transform = 'scale(0)';
    horseContainer.style.transformOrigin = 'bottom center';
    container.appendChild(horseContainer);
    
    // Create horse silhouette with SVG
    horseContainer.innerHTML = `
      <div class="horse-model">
        <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M400,100 C300,120 250,200 220,300 C200,370 180,400 150,420 C120,440 100,500 120,550 C140,600 200,620 250,600 C280,590 300,560 320,540 C340,520 360,510 380,520 C400,530 410,550 430,580 C450,610 480,630 520,630 C560,630 590,610 610,580 C630,550 640,520 660,500 C680,480 700,470 720,490 C740,510 750,540 730,570 C710,600 680,620 650,630 C620,640 600,650 600,680 C600,710 620,730 650,740 C680,750 700,730 710,700 C720,670 730,650 750,640 C770,630 790,640 790,670 C790,700 770,730 740,750 C710,770 670,780 630,770 C590,760 560,730 540,700 C520,670 500,650 470,650 C440,650 420,670 400,700 C380,730 350,750 310,750 C270,750 240,730 220,700 C200,670 190,640 170,620 C150,600 120,590 100,610 C80,630 70,660 90,690 C110,720 140,730 170,720 C200,710 220,690 240,670 C260,650 280,640 300,650 C320,660 330,680 320,710 C310,740 280,760 250,770 C220,780 190,770 160,750 C130,730 110,700 100,660 C90,620 100,580 120,550 C140,520 160,500 170,470 C180,440 180,410 170,380 C160,350 140,330 110,320 C80,310 50,320 30,350 C10,380 10,420 30,450 C50,480 80,500 110,500 C140,500 160,480 170,450 C180,420 180,390 160,370 C140,350 110,340 80,350 C50,360 30,390 30,420 C30,450 50,470 80,480 C110,490 140,480 160,460 C180,440 190,410 180,380 C170,350 150,330 120,320 C90,310 60,320 40,340 C20,360 10,390 20,420 C30,450 50,470 80,480 C110,490 140,480 160,460" 
            stroke="rgba(255,255,255,0.9)" 
            stroke-width="15"
            fill="rgba(165, 242, 243, 0.2)"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="drop-shadow(0 0 10px rgba(255,255,255,0.8))"
          />
        </svg>
        <div class="horse-frost-particles"></div>
      </div>
    `;
    
    // Add frost particles to the horse
    const particlesContainer = horseContainer.querySelector('.horse-frost-particles');
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'horse-frost-particle';
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 10 + 5}px`;
      particle.style.height = `${Math.random() * 10 + 5}px`;
      particle.style.borderRadius = '50%';
      particle.style.background = 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(165,242,243,0.5))';
      particle.style.boxShadow = '0 0 10px 2px rgba(255,255,255,0.8)';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = '0';
      particlesContainer.appendChild(particle);
      
      // Animate each particle
      gsap.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: 2,
        delay: Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      // Make particles float around
      gsap.to(particle, {
        x: `${Math.random() * 20 - 10}px`,
        y: `${Math.random() * 20 - 10}px`,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
    
    // Animate the horse entrance
    gsap.timeline()
      .to(horseContainer, {
        scale: 1,
        duration: 2,
        ease: 'elastic.out(1, 0.5)',
        delay: 1
      })
      .to(horseContainer, {
        y: '-20px',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      }, '-=0.5');
    
    // Add subtle rotation animation
    gsap.to(horseContainer, {
      rotationY: 10,
      rotationX: 5,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    return horseContainer;
  };

    // Animate each timeline event with staggered timing
    const events = document.querySelectorAll('.timeline-event');
    events.forEach((event, index) => {
      const direction = index % 2 === 0 ? -1 : 1;
      
      const eventTl = gsap.timeline({
        scrollTrigger: {
          trigger: event,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Animate the icon with a more dramatic entrance
      eventTl.from(event.querySelector('.timeline-icon'), {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });
      
      // Then animate the content with a more dramatic entrance
      eventTl.from(event.querySelector('.timeline-content'), {
        x: 50 * direction,
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out"
      }, "-=0.4");
      
      // Add a subtle hover animation to each event card
      const card = event.querySelector('.timeline-card');
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.03,
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 0 15px 5px rgba(126, 192, 238, 0.3)",
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1), 0 0 8px 2px rgba(126, 192, 238, 0.2)",
          duration: 0.3
        });
      });
    });
    
    // Create enhanced snowfall particles
    createSnowfall();
    
    // Create floating ice crystals
    createFloatingCrystals();
    
    // Initialize audio element for interactive sounds
    const audio = document.createElement('audio');
    audio.preload = 'auto';
    audio.volume = 0.4;
    audioRef.current = audio;
    document.body.appendChild(audio);
    
    // Add ambient winter sound
    const ambientAudio = document.createElement('audio');
    ambientAudio.src = '/sounds/winter-ambience.mp3'; // You'll need to add this file
    ambientAudio.loop = true;
    ambientAudio.volume = 0.1;
    ambientAudio.preload = 'auto';
    
    // Play ambient sound when user interacts with the page
    const playAmbient = () => {
      ambientAudio.play().catch(e => console.log('Audio play prevented:', e));
      document.removeEventListener('click', playAmbient);
    };
    document.addEventListener('click', playAmbient);
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.body.removeChild(audio);
      document.removeEventListener('click', playAmbient);
      ambientAudio.pause();
      ambientAudio.remove();
    };
  }, []);


  const createThreeJsHorse = () => {
    // Import Three.js dynamically to avoid SSR issues
    import('three').then(THREE => {
      import('three/examples/jsm/loaders/GLTFLoader').then(({ GLTFLoader }) => {
        import('three/examples/jsm/controls/OrbitControls').then(({ OrbitControls }) => {
          // Create container for the 3D scene
          const container = document.createElement('div');
          container.className = 'horse-3d-container';
          container.style.position = 'absolute';
          container.style.top = '0';
          container.style.left = '0';
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.pointerEvents = 'none';
          container.style.zIndex = '1';
          timelineRef.current.appendChild(container);
          
          // Create scene
          const scene = new THREE.Scene();
          
          // Create camera
          const camera = new THREE.PerspectiveCamera(
            45, 
            timelineRef.current.clientWidth / timelineRef.current.clientHeight, 
            0.1, 
            1000
          );
          // Move camera back to see the horse better
          camera.position.set(0, 2, 15);
          
          // Create renderer with transparent background
          const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
          });
          renderer.setSize(timelineRef.current.clientWidth, timelineRef.current.clientHeight);
          renderer.setPixelRatio(window.devicePixelRatio);
          // Fix: Use sRGBEncoding instead of outputEncoding
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          container.appendChild(renderer.domElement);
          
          // Add ambient light - increase intensity
          const ambientLight = new THREE.AmbientLight(0xccccff, 1.0);
          scene.add(ambientLight);
          
          // Add directional light - increase intensity
          const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
          directionalLight.position.set(5, 10, 7.5);
          scene.add(directionalLight);
          
          // Add point lights for magical effect
          const blueLight = new THREE.PointLight(0x3498db, 3, 50);
          blueLight.position.set(2, 5, 5);
          scene.add(blueLight);
          
          const cyanLight = new THREE.PointLight(0x00ffff, 3, 50);
          cyanLight.position.set(-5, 3, 0);
          scene.add(cyanLight);
          
          // Create ice particles
          const particleCount = 500;
          const particles = new THREE.BufferGeometry();
          const positions = new Float32Array(particleCount * 3);
          const sizes = new Float32Array(particleCount);
          
          for (let i = 0; i < particleCount; i++) {
            // Position particles in a large volume around the scene
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = Math.random() * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
            
            // Random sizes
            sizes[i] = Math.random() * 0.5;
          }
          
          particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
          
          // Create particle material
          const particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
          });
          
          // Create particle system
          const particleSystem = new THREE.Points(particles, particleMaterial);
          scene.add(particleSystem);
          
          // Add a helper grid to debug positioning
          const gridHelper = new THREE.GridHelper(20, 20);
          scene.add(gridHelper);
          
          // Load horse model
          const loader = new GLTFLoader();
          let mixer;
          let horse;
          
          console.log('Loading horse model...');
          
          // Load the frozen horse model
          loader.load(
            '/models/frozen_horse/scene.gltf', // Path to your model
            (gltf) => {
              console.log('Horse model loaded successfully!', gltf);
              horse = gltf.scene;
              
              // Scale and position the horse - adjust scale if needed
              horse.scale.set(1, 1, 1); // Try a larger scale
              horse.position.set(0, -2, 0); // Move down a bit to be visible
              
              // Apply ice material to the horse
              horse.traverse((child) => {
                if (child.isMesh) {
                  console.log('Applying ice material to mesh:', child.name);
                  // Create ice-like material
                  const iceMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0xadd8e6,
                    metalness: 0.2,
                    roughness: 0.1,
                    transmission: 0.95,
                    thickness: 0.5,
                    envMapIntensity: 1.5,
                    clearcoat: 1.0,
                    clearcoatRoughness: 0.1,
                    transparent: true,
                    opacity: 0.8
                  });
                  
                  // Keep original material as fallback
                  child.material = iceMaterial;
                  
                  // Make sure shadows are enabled
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
              });
              
              scene.add(horse);
              console.log('Horse added to scene');
              console.log('Horse position:', horse.position);
              console.log('Horse scale:', horse.scale);
              
              // Set up animation if available
              if (gltf.animations && gltf.animations.length) {
                console.log('Animations found:', gltf.animations.length);
                mixer = new THREE.AnimationMixer(horse);
                const gallop = mixer.clipAction(gltf.animations[0]);
                gallop.play();
              } else {
                console.log('No animations found in the model');
                
                // Since there's no animation, let's add some movement
                gsap.to(horse.position, {
                  y: '-=0.5',
                  duration: 2,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut'
                });
                
                gsap.to(horse.rotation, {
                  y: '+=0.2',
                  duration: 3,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut'
                });
              }
              
              // Create a path for the horse to follow
              const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-15, 0, -5),
                new THREE.Vector3(-10, 0, 5),
                new THREE.Vector3(0, 0, 8),
                new THREE.Vector3(10, 0, 5),
                new THREE.Vector3(15, 0, -5),
                new THREE.Vector3(10, 0, -15),
                new THREE.Vector3(0, 0, -18),
                new THREE.Vector3(-10, 0, -15)
              ]);
              curve.closed = true;
              
              // Animation variables
              let progress = 0;
              const speed = 0.0005;
              
              // Animation loop
              const clock = new THREE.Clock();
              
              function animate() {
                requestAnimationFrame(animate);
                
                // Update mixer for horse animation
                if (mixer) {
                  mixer.update(clock.getDelta());
                }
                
                // Move horse along path
                if (horse) {
                  progress += speed;
                  if (progress > 1) progress = 0;
                  
                  const point = curve.getPointAt(progress);
                  horse.position.copy(point);
                  
                  // Make horse face the direction of movement
                  const tangent = curve.getTangentAt(progress);
                  horse.lookAt(point.x + tangent.x, point.y + tangent.y, point.z + tangent.z);
                }
                
                // Rotate particles for snow effect
                particleSystem.rotation.y += 0.0005;
                
                // Animate lights
                const time = Date.now() * 0.001;
                blueLight.intensity = 1.5 + Math.sin(time) * 0.5;
                cyanLight.intensity = 1.5 + Math.sin(time + 1) * 0.5;
                
                renderer.render(scene, camera);
              }
              
              animate();
            },
            (xhr) => {
              console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
              console.error('An error happened loading the horse model', error);
            }
          );
          
          // Handle window resize
          function handleResize() {
            camera.aspect = timelineRef.current.clientWidth / timelineRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(timelineRef.current.clientWidth, timelineRef.current.clientHeight);
          }
          
          window.addEventListener('resize', handleResize);
          
          // Clean up function
          return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            timelineRef.current.removeChild(container);
            renderer.dispose();
          };
        }).catch(error => console.error('Error loading OrbitControls:', error));
      }).catch(error => console.error('Error loading GLTFLoader:', error));
    }).catch(error => console.error('Error loading Three.js:', error));
  };


  const createBackgroundSnowRain = () => {
    const container = timelineRef.current;
    const snowRainContainer = document.createElement('div');
    
    // Style the snow rain container
    snowRainContainer.className = 'snow-rain-container';
    snowRainContainer.style.position = 'absolute';
    snowRainContainer.style.top = '0';
    snowRainContainer.style.left = '0';
    snowRainContainer.style.width = '100%';
    snowRainContainer.style.height = '100%';
    snowRainContainer.style.pointerEvents = 'none';
    snowRainContainer.style.zIndex = '1';
    snowRainContainer.style.overflow = 'hidden';
    
    container.appendChild(snowRainContainer);
    
    // Create different types of snowflakes for variety
    const snowflakeTypes = [
      // Simple circle
      () => {
        const flake = document.createElement('div');
        flake.style.borderRadius = '50%';
        flake.style.background = 'white';
        return flake;
      },
      // Star shape
      () => {
        const flake = document.createElement('div');
        flake.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        flake.style.background = 'white';
        return flake;
      },
      // Hexagon
      () => {
        const flake = document.createElement('div');
        flake.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
        flake.style.background = 'white';
        return flake;
      }
    ];
    
    // Create a large number of snowflakes
    const createSnowflakes = () => {
      // Create 150 snowflakes for a dense effect
      for (let i = 0; i < 150; i++) {
        // Random type of snowflake
        const typeIndex = Math.floor(Math.random() * snowflakeTypes.length);
        const flake = snowflakeTypes[typeIndex]();
        
        // Random size for depth effect
        const size = Math.random() * 8 + 2;
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        
        // Random horizontal position
        flake.style.position = 'absolute';
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.top = `-${size}px`;
        
        // Add some blur for depth effect
        flake.style.filter = `blur(${size < 4 ? 0.5 : 0}px)`;
        
        // Add glow effect
        flake.style.boxShadow = `0 0 ${size}px ${size/2}px rgba(255, 255, 255, ${size < 4 ? 0.3 : 0.6})`;
        
        // Add to container
        snowRainContainer.appendChild(flake);
        
        // Calculate animation duration based on size (smaller = slower, for parallax)
        const duration = size < 4 ? 15 + Math.random() * 10 : 8 + Math.random() * 7;
        
        // Animate the snowflake falling
        gsap.to(flake, {
          y: `${container.offsetHeight + size}px`,
          x: `${(Math.random() - 0.5) * 200}`, // Some horizontal drift
          rotation: Math.random() * 360,
          duration: duration,
          delay: Math.random() * 5, // Staggered start
          ease: 'none',
          repeat: -1,
          onRepeat: () => {
            // Reset position when repeating
            gsap.set(flake, {
              y: `-${size}px`,
              x: `${Math.random() * 100}%`,
              rotation: 0
            });
          }
        });
        
        // Add subtle oscillation for more natural movement
        gsap.to(flake, {
          x: `+=${Math.random() * 50 - 25}`,
          duration: 2 + Math.random() * 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      }
    };
    
    createSnowflakes();
    
    return snowRainContainer;
  };
  
  const timelineEvents = [
    {
      year: "2013",
      title: "Frozen Release",
      description: "The original Frozen film takes the world by storm",
      icon: Film,
      color: "bg-blue-400",
      accent: "#60a5fa"
    },
    {
      year: "2014",
      title: "Academy Awards",
      description: "Wins Oscar for Best Animated Feature & Best Original Song",
      icon: Award,
      color: "bg-amber-400",
      accent: "#fbbf24"
    },
    {
      year: "2015",
      title: "Frozen Fever",
      description: "Short film released alongside Cinderella",
      icon: Sparkles,
      color: "bg-cyan-400"
    },
    {
      year: "2017",
      title: "Olaf's Adventure",
      description: "Holiday special featuring everyone's favorite snowman",
      icon: Gift,
      color: "bg-indigo-400"
    },
    {
      year: "2019",
      title: "Frozen II",
      description: "The sequel breaks box office records worldwide",
      icon: Star,
      color: "bg-purple-400"
    },
    {
      year: "2023",
      title: "Broadway Show",
      description: "Frozen: The Musical continues its successful run",
      icon: Ticket,
      color: "bg-blue-500"
    }
  ];
  
 
  
  const createSnowfall = () => {
    const container = timelineRef.current;
    
    // More advanced snowflake patterns with varied designs
    const snowflakePatterns = [
      `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L13.5 6L12 12L10.5 6L12 0Z" />
        <path d="M12 12L13.5 18L12 24L10.5 18L12 12Z" />
        <path d="M0 12L6 10.5L12 12L6 13.5L0 12Z" />
        <path d="M12 12L18 10.5L24 12L18 13.5L12 12Z" />
        <path d="M3.5 3.5L8.5 5.5L10.5 10.5L5.5 8.5L3.5 3.5Z" />
        <path d="M13.5 13.5L18.5 15.5L20.5 20.5L15.5 18.5L13.5 13.5Z" />
        <path d="M3.5 20.5L5.5 15.5L10.5 13.5L8.5 18.5L3.5 20.5Z" />
        <path d="M13.5 10.5L15.5 5.5L20.5 3.5L18.5 8.5L13.5 10.5Z" />
      </svg>`,
      `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0v24M0 12h24M3.5 3.5l17 17M3.5 20.5l17-17" stroke="white" stroke-width="1"/>
        <circle cx="12" cy="12" r="3" fill="white"/>
      </svg>`,
      `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L14 8L12 12L10 8L12 0Z" />
        <path d="M12 12L14 16L12 24L10 16L12 12Z" />
        <path d="M0 12L8 10L12 12L8 14L0 12Z" />
        <path d="M12 12L16 10L24 12L16 14L12 12Z" />
      </svg>`
    ];
    
    for (let i = 0; i < 80; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('timeline-snowflake');
      
      // Varied sizes for depth effect
      const size = Math.random() * 12 + 3;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      
      // Use varied snowflake patterns
      const patternIndex = Math.floor(Math.random() * snowflakePatterns.length);
      snowflake.innerHTML = snowflakePatterns[patternIndex];
      
      // ... existing snowflake styling ...
      
      // Define duration based on size for parallax effect
      const duration = size < 6 ? Math.random() * 20 + 15 : Math.random() * 12 + 8;
      
      // Add 3D rotation for more realistic movement
      gsap.to(snowflake, {
        y: container.offsetHeight + 50,
        x: `+=${Math.random() * 300 - 150}`,
        rotation: Math.random() * 720 - 360,
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        duration: duration,
        ease: 'none',
        repeat: -1,
        delay: Math.random() * 10,
        onRepeat: () => {
          snowflake.style.left = `${Math.random() * 100}%`;
          snowflake.style.top = '-30px';
        }
      });
    }
  };
  
  // Add the missing createFloatingCrystals function
  const createFloatingCrystals = () => {
    const container = timelineRef.current;
    
    for (let i = 0; i < 12; i++) {
      const crystal = document.createElement('div');
      
      // Create crystal shape
      crystal.style.position = 'absolute';
      crystal.style.width = `${Math.random() * 40 + 20}px`;
      crystal.style.height = `${Math.random() * 60 + 30}px`;
      crystal.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(126,192,238,0.2))';
      crystal.style.backdropFilter = 'blur(2px)';
      crystal.style.borderRadius = '4px';
      crystal.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
      crystal.style.boxShadow = '0 0 15px rgba(255,255,255,0.5)';
      crystal.style.opacity = `${Math.random() * 0.5 + 0.2}`;
      crystal.style.zIndex = '1';
      
      // Position randomly
      crystal.style.left = `${Math.random() * 90 + 5}%`;
      crystal.style.top = `${Math.random() * 80 + 10}%`;
      
      container.appendChild(crystal);
      
      // Floating animation
      gsap.to(crystal, {
        y: `${Math.random() * 40 - 20}`,
        x: `${Math.random() * 40 - 20}`,
        rotation: Math.random() * 40 - 20,
        duration: Math.random() * 8 + 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 5
      });
      
      // Subtle glow pulse
      gsap.to(crystal, {
        boxShadow: '0 0 25px rgba(255,255,255,0.8)',
        opacity: `${Math.random() * 0.5 + 0.4}`,
        duration: Math.random() * 4 + 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 5
      });
    }
  };
  
  // Handle card click for special effects
  const handleCardClick = (event, index) => {
    setActiveEvent(activeEvent === index ? null : index);
    
    // Play magical sound effect
    if (audioRef.current) {
      audioRef.current.src = '/sounds/magic-chime.mp3'; // You'll need to add this file
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play prevented:', e));
    }
    
    // Create magical frost effect spreading from the clicked card
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create frost particles
    for (let i = 0; i < 20; i++) {
      createFrostParticle(centerX, centerY, timelineEvents[index].accent);
    }
    
    // Create magical light burst
    createLightBurst(centerX, centerY, timelineEvents[index].accent);
    
    // Animate the card with 3D effect
    gsap.to(card, {
      rotationY: activeEvent === index ? 0 : 15,
      rotationX: activeEvent === index ? 0 : -10,
      scale: activeEvent === index ? 1 : 1.1,
      boxShadow: activeEvent === index 
        ? '0 10px 20px rgba(0, 0, 0, 0.1), 0 0 8px 2px rgba(126, 192, 238, 0.2)'
        : `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px 8px ${timelineEvents[index].accent}80`,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    // Create snow filling animation
    createSnowFillAnimation(timelineEvents[index].accent || "#60a5fa");
  };
  
  // Add this new function for snow filling animation
  const createSnowFillAnimation = (accentColor) => {
    const container = timelineRef.current;
    const snowContainer = document.createElement('div');
    
    // Style the snow container
    snowContainer.style.position = 'absolute';
    snowContainer.style.top = '0';
    snowContainer.style.left = '0';
    snowContainer.style.width = '100%';
    snowContainer.style.height = '100%';
    snowContainer.style.pointerEvents = 'none';
    snowContainer.style.zIndex = '1';
    snowContainer.style.overflow = 'hidden';
    
    container.appendChild(snowContainer);
    
    // Create snow particles that will fill the screen
    const particleCount = 300;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Random size for varied snow effect
      const size = Math.random() * 15 + 5;
      
      // Style each snow particle
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.background = `radial-gradient(circle at 30% 30%, white, ${accentColor}30)`;
      particle.style.boxShadow = `0 0 10px 2px rgba(255, 255, 255, 0.8)`;
      particle.style.opacity = '0';
      
      // Position particles at the top, spread across the width
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${-Math.random() * 20}%`;
      
      snowContainer.appendChild(particle);
      particles.push(particle);
      
      // Create a timeline for each particle
      const tl = gsap.timeline();
      
      // Stagger the start times to create a filling effect
      const delay = Math.random() * 1.5;
      
      // Animate each particle falling down
      tl.to(particle, {
        y: `${container.offsetHeight + size}px`,
        x: `${(Math.random() - 0.5) * 200}`,
        opacity: 0.9,
        rotation: Math.random() * 360,
        duration: 5, // 5 second fill animation
        ease: 'power1.in',
        delay: delay,
        onComplete: () => {
          // Create a "settled" effect at the bottom
          gsap.to(particle, {
            y: `${container.offsetHeight - size/2}px`,
            opacity: 0.7,
            duration: 0.3,
            ease: 'bounce.out'
          });
        }
      });
    }
    
    // Create a dramatic flash effect
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = `radial-gradient(circle at center, ${accentColor}80, transparent)`;
    flash.style.opacity = '0';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '2';
    
    container.appendChild(flash);
    
    // Animate the flash
    gsap.timeline()
      .to(flash, {
        opacity: 0.8,
        duration: 0.5,
        ease: 'power2.out'
      })
      .to(flash, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.in'
      })
      .call(() => {
        // Remove the flash element after animation
        container.removeChild(flash);
      });
    
    // Remove the snow container after some time
    setTimeout(() => {
      gsap.to(snowContainer, {
        opacity: 0,
        duration: 2,
        ease: 'power2.in',
        onComplete: () => {
          container.removeChild(snowContainer);
        }
      });
    }, 10000); // Keep snow visible for 10 seconds
  };
  const createFrostParticle = (x, y, color) => {
    const particle = document.createElement('div');
    document.body.appendChild(particle);
    
    // Random size and position offset
    const size = Math.random() * 40 + 10;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 50;
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;
    
    // Style the frost particle
    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = `radial-gradient(circle, ${color}40, ${color}10, transparent 70%)`;
    particle.style.borderRadius = '50%';
    particle.style.filter = 'blur(2px)';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '100';
    particle.style.opacity = '0';
    
    // Animate the frost particle
    gsap.timeline()
      .to(particle, {
        x: offsetX,
        y: offsetY,
        opacity: 0.8,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(particle, {
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
        ease: 'power2.in',
        onComplete: () => {
          document.body.removeChild(particle);
        }
      }, '-=0.4');
  };
  
  const createLightBurst = (x, y, color) => {
    const burst = document.createElement('div');
    document.body.appendChild(burst);
    
    // Style the light burst
    burst.style.position = 'fixed';
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    burst.style.width = '10px';
    burst.style.height = '10px';
    burst.style.background = color;
    burst.style.borderRadius = '50%';
    burst.style.filter = 'blur(5px)';
    burst.style.boxShadow = `0 0 30px 20px ${color}`;
    burst.style.transform = 'translate(-50%, -50%)';
    burst.style.pointerEvents = 'none';
    burst.style.zIndex = '100';
    
    // Animate the light burst
    gsap.timeline()
      .to(burst, {
        width: '300px',
        height: '300px',
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        onComplete: () => {
          document.body.removeChild(burst);
        }
      });
  };


  
  // FIX: Generate random heights ONCE per mount for bottom ice crystals
  const iceCrystalHeights = useMemo(
    () => Array.from({ length: 12 }, () => Math.random() * 25 + 10),
    []
  );

  return (
    <section className="py-32 relative overflow-hidden" id="timeline" ref={timelineRef}
      style={{
        background: 'linear-gradient(to bottom, #0c2d6b, #1a4d8c, #0c2d6b)',
        color: 'white'
      }}
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-cyan-200 opacity-15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-100 opacity-15 rounded-full blur-3xl"></div>
      </div>
      
      {/* Enhanced aurora effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, rgba(14, 73, 115, 0), rgba(126, 192, 238, 0.6), rgba(165, 242, 243, 0.4), rgba(126, 192, 238, 0))',
          backgroundSize: '400% 400%',
          animation: 'aurora 15s ease infinite'
        }}
      ></div>
      
      {/* Northern lights effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-full"
            style={{
              left: `${i * 20}%`,
              width: '20%',
              background: 'linear-gradient(to top, rgba(0,0,0,0), rgba(126, 192, 238, 0.4), rgba(165, 242, 243, 0.6), rgba(126, 192, 238, 0.4), rgba(0,0,0,0))',
              animation: `northernLight ${10 + i * 2}s ease-in-out infinite alternate`,
              transformOrigin: 'center',
              opacity: 0.7,
              filter: 'blur(30px)'
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="timeline-heading text-6xl font-bold text-center mb-24 relative">
          <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-100 text-transparent bg-clip-text">
            Frozen Journey
          </span>
          <span className="block h-1.5 w-32 bg-gradient-to-r from-cyan-400 to-blue-300 mt-6 mx-auto rounded-full"></span>
          <div className="absolute w-48 h-48 bg-blue-500 rounded-full opacity-10 blur-3xl -z-10 left-1/2 transform -translate-x-1/2"></div>
        </h2>
        
        <div className="relative">
          {/* Enhanced timeline center line */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-gradient-to-b from-cyan-300 via-blue-400 to-cyan-300 h-full rounded-full"></div>
          
          {timelineEvents.map((event, index) => (
            <div 
              key={index} 
              className={`timeline-event flex items-center mb-24 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Enhanced timeline dot/icon */}
              <div className="timeline-icon z-10 flex-shrink-0 relative left-1/2 transform -translate-x-1/2">
                <div 
                  className={`${event.color} text-white p-5 rounded-full shadow-lg border-2 border-white border-opacity-30 backdrop-blur-sm ${activeEvent === index ? 'animate-pulse' : ''}`}
                  style={{
                    boxShadow: activeEvent === index 
                      ? `0 0 30px ${event.accent}, inset 0 0 15px rgba(255, 255, 255, 0.8)` 
                      : '0 0 20px rgba(126, 192, 238, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.4)'
                  }}
                >
                  <event.icon size={32} strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Enhanced content with interactive effects */}
              <div className={`timeline-content w-5/12 ${
                index % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'
              }`}>
                <div 
                  className={`timeline-card bg-gradient-to-br from-blue-400/30 to-cyan-500/20 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-cyan-300/30 transform transition-all duration-300 cursor-pointer ${
                    activeEvent === index ? 'active-card' : ''
                  }`}
                  style={{
                    boxShadow: activeEvent === index 
                      ? `0 15px 30px rgba(0, 0, 0, 0.2), 0 0 20px 5px ${event.accent}60` 
                      : '0 10px 20px rgba(0, 0, 0, 0.1), 0 0 8px 2px rgba(126, 192, 238, 0.2)',
                    transform: activeEvent === index ? 'translateZ(50px)' : 'translateZ(0)',
                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  onClick={(e) => handleCardClick(e, index)}
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold mb-3 shadow-md">
                    {event.year}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">{event.title}</h3>
                  <p className="text-blue-50 text-lg">{event.description}</p>
                  
                  {/* Decorative element inside card */}
                  <div className="absolute top-3 right-3 w-12 h-12 opacity-20">
                    <event.icon size={48} />
                  </div>
                  
                  {/* Interactive frost overlay that appears when card is active */}
                  {activeEvent === index && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                      <div className="frost-overlay"></div>
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i}
                          className="frost-crystal absolute"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 40 + 20}px`,
                            height: `${Math.random() * 40 + 20}px`,
                            opacity: Math.random() * 0.5 + 0.2,
                            transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
                            animation: `crystalGlow ${Math.random() * 3 + 2}s infinite alternate ease-in-out`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Empty space for the other side */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced ice crystal decorations at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
        {iceCrystalHeights.map((height, i) => (
          <div 
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${i * 8.33}%`,
              width: '8.33%',
              height: `${height}%`,
              background: 'linear-gradient(to top, rgba(165, 242, 243, 0.8), rgba(126, 192, 238, 0.3), rgba(165, 242, 243, 0))',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              zIndex: 2,
              filter: 'drop-shadow(0 0 10px rgba(165, 242, 243, 0.5))'
            }}
          ></div>
        ))}
      </div>
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes northernLight {
          0% { transform: scaleY(1.2) translateY(5%); }
          50% { transform: scaleY(0.8) translateY(-5%); }
          100% { transform: scaleY(1.2) translateY(5%); }
        }
        
        @keyframes crystalGlow {
          0% { opacity: 0.2; filter: blur(2px) brightness(1); }
          100% { opacity: 0.8; filter: blur(1px) brightness(1.5); }
        }
        
        @keyframes snowTwinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        
        .horse-3d-container {
          pointer-events: none;
          opacity: 0.8;
        }
        
        .horse-3d-container canvas {
          filter: drop-shadow(0 0 20px rgba(165, 242, 243, 0.6));
        }
        
        /* Existing styles */
        .snow-rain-container div {
          opacity: 0.8;
          will-change: transform;
          animation: snowTwinkle 3s infinite alternate ease-in-out;
          animation-delay: var(--delay, 0s);
        }
        
        .timeline-snowflake {
          pointer-events: none;
        }
        
        .timeline-card {
          transform-style: preserve-3d;
          perspective: 1000px;
          will-change: transform;
        }
        
        .frost-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 30%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.2) 100%);
          backdrop-filter: blur(1px);
          animation: frostPulse 3s infinite alternate ease-in-out;
        }
        
        @keyframes frostPulse {
          0% { opacity: 0.1; }
          100% { opacity: 0.4; }
        }
        
        .frost-crystal {
          background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.2));
          clip-path: polygon(50% 0%, 80% 30%, 100% 50%, 80% 70%, 50% 100%, 20% 70%, 0% 50%, 20% 30%);
          filter: blur(1px);
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
        }
      `}</style>
    </section>
  );
}