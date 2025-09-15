"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Film, Music, Award, Star, Sparkles, Gift, Ticket,Snowflake } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Gameland() {
  const timelineRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const characterRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const controlsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [movementKeys, setMovementKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false
  });

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
    
    // Initialize 3D scene
    initFrozenLand();
    
    // Keyboard event listeners for character movement
    const handleKeyDown = (e) => {
      switch(e.key.toLowerCase()) {
        case 'w': setMovementKeys(prev => ({ ...prev, forward: true })); break;
        case 's': setMovementKeys(prev => ({ ...prev, backward: true })); break;
        case 'a': setMovementKeys(prev => ({ ...prev, left: true })); break;
        case 'd': setMovementKeys(prev => ({ ...prev, right: true })); break;
        case 'shift': setMovementKeys(prev => ({ ...prev, run: true })); break;
      }
    };
    
    const handleKeyUp = (e) => {
      switch(e.key.toLowerCase()) {
        case 'w': setMovementKeys(prev => ({ ...prev, forward: false })); break;
        case 's': setMovementKeys(prev => ({ ...prev, backward: false })); break;
        case 'a': setMovementKeys(prev => ({ ...prev, left: false })); break;
        case 'd': setMovementKeys(prev => ({ ...prev, right: false })); break;
        case 'shift': setMovementKeys(prev => ({ ...prev, run: false })); break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      
      // Clean up Three.js resources
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
        
        if (controlsRef.current) controlsRef.current.dispose();
        if (mixerRef.current) mixerRef.current = null;
      }
    };
  }, []);
  
  // Update character movement based on keys pressed
  useEffect(() => {
    if (!characterRef.current || !mixerRef.current) return;
    
    const isMoving = movementKeys.forward || movementKeys.backward || 
                     movementKeys.left || movementKeys.right;
    
    // Change animation based on movement state
    if (isMoving) {
      if (movementKeys.run) {
        // Play running animation
        playAnimation('Run');
      } else {
        // Play walking animation
        playAnimation('Walk');
      }
    } else {
      // Play idle animation
      playAnimation('Idle');
    }
    
  }, [movementKeys]);
  
  const playAnimation = (name) => {
    if (!characterRef.current || !mixerRef.current) return;
    
    // Find the animation by name
    const clip = characterRef.current.animations.find(anim => 
      anim.name.includes(name) || anim.name.toLowerCase().includes(name.toLowerCase())
    );
    
    if (clip) {
      const action = mixerRef.current.clipAction(clip);
      action.reset();
      action.fadeIn(0.5);
      action.play();
      
      // Crossfade with other animations
      mixerRef.current._actions.forEach(otherAction => {
        if (otherAction !== action) {
          otherAction.fadeOut(0.5);
        }
      });
    }
  };
  
  const initFrozenLand = () => {
    if (!canvasRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x88ccff);
    scene.fog = new THREE.FogExp2(0xaaccff, 0.005);
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      60, 
      canvasRef.current.clientWidth / canvasRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 5, 10);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xccccff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Add hemisphere light for better ambient lighting
    const hemisphereLight = new THREE.HemisphereLight(0x8888ff, 0xffffff, 0.6);
    scene.add(hemisphereLight);
    
    // Load low_poly_snow_environment model instead of creating terrain
    const environmentLoader = new GLTFLoader();
    environmentLoader.load('/models/low_poly_snow_environment/scene.gltf', (gltf) => {
      const environment = gltf.scene;
      
      // Scale and position the environment
      environment.scale.set(10, 10, 10);
      environment.position.set(0, -1, 0); // Adjust position as needed
      environment.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      
      scene.add(environment);
    }, undefined, (error) => {
      console.error('Error loading environment model:', error);
      // Fallback to basic terrain if model fails to load
      createSnowTerrain(scene);
    });
    
    // Add decorative elements
    addDecorations(scene);
    
    // Load character model
    const loader = new GLTFLoader();
    loader.load('/models/character/scene.gltf', (gltf) => {
        const model = gltf.scene;
        characterRef.current = model;
      
        // Scale & position
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0, 0);
        // Rotate model to face forward
        model.rotation.y = Math.PI;
        

        
        const characterContainer = new THREE.Group();
        characterContainer.add(model);
        characterContainer.name = "characterContainer";
        characterContainer.position.y = 0.5;
        scene.add(characterContainer);
      
        // Setup mixer
        mixerRef.current = new THREE.AnimationMixer(model);
      
        // Store animations separately
        characterRef.current.animations = gltf.animations;
      
        console.log("Available animations:", gltf.animations.map(a => a.name));
      
        // Play idle by default
        if (gltf.animations.length > 0) {
          const idleClip = gltf.animations.find(a =>
            a.name.toLowerCase().includes("idle")
          ) || gltf.animations[0];
      
          const idleAction = mixerRef.current.clipAction(idleClip);
          idleAction.play();
        }
      
        setIsLoaded(true);
      });
      
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    controlsRef.current = controls;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update character position based on movement keys
      if (characterRef.current && isLoaded) {
        const characterContainer = sceneRef.current.getObjectByName("characterContainer");
        if (!characterContainer) {
          console.error("Character container not found!");
          return;
        }
        
        // Disable orbit controls when moving character
        if (Object.values(movementKeys).some(key => key)) {
          controlsRef.current.enabled = false;
        } else {
          controlsRef.current.enabled = true;
        }
        
        // Use a fixed delta time to avoid inconsistent movement
        const delta = 0.016; // approximately 60fps
        const speed = movementKeys.run ? 15 : 8; // Much higher speed
        
        // Simple direct movement - no complex calculations
        if (movementKeys.forward) {
          characterContainer.position.z -= speed * delta;
        }
        if (movementKeys.backward) {
          characterContainer.position.z += speed * delta;
        }
        if (movementKeys.left) {
          characterContainer.position.x -= speed * delta;
        }
        if (movementKeys.right) {
          characterContainer.position.x += speed * delta;
        }
        
        // Keep character within bounds
        const boundarySize = 45;
        if (Math.abs(characterContainer.position.x) > boundarySize) {
          characterContainer.position.x = Math.sign(characterContainer.position.x) * boundarySize;
        }
        if (Math.abs(characterContainer.position.z) > boundarySize) {
          characterContainer.position.z = Math.sign(characterContainer.position.z) * boundarySize;
        }
        
        // Ensure character stays above ground
        characterContainer.position.y = 0.5;
        
        // Update camera to follow character
        camera.position.set(
          characterContainer.position.x,
          characterContainer.position.y + 5,
          characterContainer.position.z + 10
        );
        camera.lookAt(characterContainer.position);
      }
      
      // Update animation mixer
      if (mixerRef.current) {
        mixerRef.current.update(0.016); // Use fixed time step
      }
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Add snow particles animation
      animateSnowParticles();
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };
  
  const createSnowTerrain = (scene) => {
    // Create a low-poly terrain geometry
    const geometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    geometry.rotateX(-Math.PI / 2);
    
    // Add some random height variation for a more natural look
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      // Skip the edges to create a flat boundary
      const x = vertices[i];
      const z = vertices[i + 2];
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      
      if (distanceFromCenter < 45) {
        // Add random height variation
        vertices[i + 1] = Math.random() * 1.5 - 0.5;
        
        // Add some larger hills
        if (Math.random() > 0.97) {
          vertices[i + 1] += Math.random() * 2;
        }
      }
    }
    
    // Create snow material
    const snowMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8,
      metalness: 0.1,
      flatShading: true
    });
    
    // Create mesh
    const terrain = new THREE.Mesh(geometry, snowMaterial);
    terrain.receiveShadow = true;
    scene.add(terrain);
    
    // Add snow particles
    createSnowParticles(scene);
  };
  
  const createSnowParticles = (scene) => {
    const particleCount = 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random positions within a 100x100x30 box
      particlePositions[i] = (Math.random() - 0.5) * 100;
      particlePositions[i + 1] = Math.random() * 30;
      particlePositions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    // Create snowflake texture
    const snowflakeTexture = new THREE.TextureLoader().load('/images/snowflake.png');
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      map: snowflakeTexture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: false
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.name = 'snowParticles';
    scene.add(particles);
  };
  
  const animateSnowParticles = () => {
    if (!sceneRef.current) return;
    
    const particles = sceneRef.current.getObjectByName('snowParticles');
    if (!particles) return;
    
    const positions = particles.geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // Move particles downward
      positions[i + 1] -= 0.05;
      
      // Add slight horizontal drift
      positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.01;
      positions[i + 2] += Math.cos(Date.now() * 0.0015 + i) * 0.01;
      
      // Reset particles that go below the ground
      if (positions[i + 1] < 0) {
        positions[i + 1] = 30;
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;
      }
    }
    
    particles.geometry.attributes.position.needsUpdate = true;
  };
  
  const addDecorations = (scene) => {
    // Add ice crystals
    for (let i = 0; i < 30; i++) {
      const crystalGeometry = new THREE.ConeGeometry(
        Math.random() * 0.5 + 0.5, 
        Math.random() * 3 + 2, 
        4, 
        1
      );
      
      const crystalMaterial = new THREE.MeshStandardMaterial({
        color: 0xa5f2f3,
        transparent: true,
        opacity: 0.7,
        roughness: 0.2,
        metalness: 0.8
      });
      
      const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
      
      // Random position
      crystal.position.set(
        (Math.random() - 0.5) * 80,
        Math.random() * 0.5,
        (Math.random() - 0.5) * 80
      );
      
      // Random rotation
      crystal.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      crystal.castShadow = true;
      scene.add(crystal);
    }
    
    // Add frozen trees
    for (let i = 0; i < 20; i++) {
      const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 2, 6);
      const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b4513,
        roughness: 0.9
      });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      
      const leavesGeometry = new THREE.ConeGeometry(1.5, 3, 6);
      const leavesMaterial = new THREE.MeshStandardMaterial({
        color: 0xadd8e6,
        roughness: 0.7,
        metalness: 0.2
      });
      const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
      leaves.position.y = 2.5;
      
      const tree = new THREE.Group();
      tree.add(trunk);
      tree.add(leaves);
      
      // Random position
      tree.position.set(
        (Math.random() - 0.5) * 90,
        0,
        (Math.random() - 0.5) * 90
      );
      
      tree.castShadow = true;
      scene.add(tree);
    }
  };

  return (
    <section id="timeline" className="timeline-section" ref={timelineRef}>
      <div className="container mx-auto px-4 py-16 relative">
        <h2 className="timeline-heading text-4xl md:text-5xl font-bold text-center mb-16">
          Frozen Adventure Land
        </h2>
        
        <div className="frozen-land-container relative">
          <canvas 
            ref={canvasRef} 
            className="frozen-land-canvas w-full h-[600px] rounded-xl overflow-hidden"
          />
          
          {!isLoaded && (
            <div className="loading-overlay absolute inset-0 flex items-center justify-center bg-blue-900/50 rounded-xl">
              <div className="text-white text-center">
                <div className="animate-spin mb-4">
                  <Snowflake size={48} />
                </div>
                <p className="text-xl">Loading Frozen World...</p>
              </div>
            </div>
          )}
          
          {/* <div className="controls-hint absolute bottom-4 left-4 bg-white/20 backdrop-blur-md p-4 rounded-lg text-white">
            <h3 className="font-bold mb-2">Controls:</h3>
            <ul className="text-sm">
              <li>W - Move Forward</li>
              <li>S - Move Backward</li>
              <li>A - Turn Left</li>
              <li>D - Turn Right</li>
              <li>Shift - Run</li>
            </ul>
          </div> */}
        </div>
      </div>
    </section>
  );
}