"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Draggable } from 'gsap/dist/Draggable';
import { Snowflake, Gamepad2, Trophy, ArrowLeft, Puzzle, Brain } from 'lucide-react';
import Image from 'next/image';

export default function GamesSection() {
  const [activeGame, setActiveGame] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  
  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, Draggable);
    }
    
    // Initialize GSAP animations
    if (!activeGame) {
      // Animate section entrance
      const sectionAnimation = gsap.fromTo(sectionRef.current, 
        { backgroundColor: 'rgba(26, 43, 76, 1)' },
        { 
          backgroundColor: 'rgba(58, 75, 108, 1)', 
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true
          }
        }
      );
      
      // Animate cards with staggered entrance
      const cardsAnimation = gsap.fromTo(cardsRef.current,
        { y: 100, opacity: 0, scale: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );
      
      // Create floating snowflakes
      createSnowflakes();
    }
    
    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        // Kill all ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [activeGame]);
  
  const createSnowflakes = () => {
    if (!sectionRef.current) return;
    
    const container = sectionRef.current;
    
    for (let i = 0; i < 20; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('games-snowflake');
      
      // Use SVG snowflake instead of a simple circle
      const svgSnowflake = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgSnowflake.setAttribute("viewBox", "0 0 24 24");
      svgSnowflake.setAttribute("width", "100%");
      svgSnowflake.setAttribute("height", "100%");
      svgSnowflake.setAttribute("fill", "white");
      
      const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path1.setAttribute("d", "M12 0L14 4L12 8L10 4L12 0Z");
      const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path2.setAttribute("d", "M12 16L14 20L12 24L10 20L12 16Z");
      const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path3.setAttribute("d", "M0 12L4 10L8 12L4 14L0 12Z");
      const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path4.setAttribute("d", "M16 12L20 10L24 12L20 14L16 12Z");
      
      svgSnowflake.appendChild(path1);
      svgSnowflake.appendChild(path2);
      svgSnowflake.appendChild(path3);
      svgSnowflake.appendChild(path4);
      
      snowflake.appendChild(svgSnowflake);
      
      const size = Math.random() * 15 + 5;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.position = 'absolute';
      snowflake.style.top = `${Math.random() * 100}%`;
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.opacity = `${Math.random() * 0.5 + 0.2}`;
      snowflake.style.zIndex = '1';
      
      container.appendChild(snowflake);
      
      gsap.to(snowflake, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  };
  
  const handleGameSelect = (game, e) => {
    e.preventDefault();
    // Create magical transition effect
    const gameCard = cardsRef.current[games.indexOf(game)];
    if (!gameCard) return;
    
    const rect = gameCard.getBoundingClientRect();
    
    // Create expanding circle effect
    const circle = document.createElement('div');
    circle.style.position = 'fixed';
    circle.style.top = `${rect.top + rect.height/2}px`;
    circle.style.left = `${rect.left + rect.width/2}px`;
    circle.style.width = '0';
    circle.style.height = '0';
    circle.style.borderRadius = '50%';
    circle.style.background = 'radial-gradient(circle, rgba(165, 242, 243, 0.8) 0%, rgba(126, 192, 238, 0.5) 100%)';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.zIndex = '100';
    document.body.appendChild(circle);
    
    // Animate the circle expansion
    gsap.to(circle, {
      width: '300vw',
      height: '300vw',
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        setActiveGame(game);
        document.body.removeChild(circle);
      }
    });
  };
  
  const handleBackToGames = () => {
    // Create magical transition back
    const container = document.querySelector('.game-container');
    if (!container) return;
    
    gsap.to(container, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      onComplete: () => {
        setActiveGame(null);
        
        // Reset and re-animate cards after returning
        setTimeout(() => {
          gsap.fromTo(cardsRef.current,
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.2,
              duration: 0.8,
              ease: "back.out(1.7)"
            }
          );
        }, 100);
      }
    });
  };
  
  const games = [
    {
      title: "Build a Snowman",
      description: "Drag & drop Olaf's parts to build him!",
      image: "/images/build-snowman-game.jpg",
      component: BuildSnowmanGame,
      icon: <Puzzle className="text-white" size={28} />
    },
    {
      title: "Ice Slide",
      description: "Race down the mountain on a sleigh!",
      image: "/images/ice-slide-game.jpg",
      component: IceSlideGame,
      icon: <Puzzle className="text-white" size={28} />
    },
    {
      title: "Match the Snowflakes",
      description: "Find matching snowflake pairs!",
      image: "/images/match-snowflakes-game.jpg",
      component: MatchSnowflakesGame,
      icon: <Brain className="text-white" size={28} />
    }
  ];
  
  return (
    <section 
      className="games-section py-20 relative bg-gradient-to-b from-[#1a2b4c] to-[#3a4b6c] overflow-hidden" 
      id="games" 
      ref={sectionRef}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('/images/snowflake-pattern.png')] bg-repeat opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="bg-[#a5f2f3]/10 p-4 rounded-full mb-4">
            <Gamepad2 className="text-[#a5f2f3] w-12 h-12" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Games & Fun Zone
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#a5f2f3] to-[#7ec0ee] rounded-full mb-6"></div>
          <p className="text-center text-xl text-white/80 max-w-2xl mx-auto">
            Experience the magic of Arendelle through these interactive games!
          </p>
        </div>
        
        {!activeGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <div 
                key={index} 
                className="game-card group cursor-pointer transform transition-all duration-300 hover:scale-105"
                ref={el => cardsRef.current[index] = el}
                onClick={(e) => handleGameSelect(game, e)}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl hover:shadow-[#a5f2f3]/20 transition-all duration-300">
                  <div className="game-card-image relative h-48 overflow-hidden">
                    {/* Game image with fallback */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7ec0ee]/30 to-[#a5f2f3]/30"></div>
                    {game.image && (
                      <Image 
                        src={game.image} 
                        alt={game.title}
                        fill
                        className="object-cover opacity-70"
                        quality={90}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                        {game.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[#a5f2f3] transition-colors duration-300">
                      {game.title}
                    </h3>
                    <p className="text-white/70 mb-6">{game.description}</p>
                    
                    <div className="flex items-center justify-center">
                      <button className="bg-gradient-to-r from-[#a5f2f3] to-[#7ec0ee] text-[#1a2b4c] font-bold py-2 px-6 rounded-full flex items-center gap-2 transform transition-all duration-300 hover:shadow-lg hover:shadow-[#a5f2f3]/20">
                        <span>Play Now</span>
                        <Snowflake size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="game-container bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl">
            <button 
              className="flex items-center gap-2 text-white/80 hover:text-[#a5f2f3] mb-6 transition-colors duration-300"
              onClick={handleBackToGames}
            >
              <ArrowLeft size={20} />
              <span>Back to Games</span>
            </button>
            
            <activeGame.component />
          </div>
        )}
        
        <div className="mt-16 flex items-center justify-center bg-white/5 backdrop-blur-sm py-4 px-6 rounded-full max-w-md mx-auto border border-white/10">
          <Trophy size={24} className="text-[#a5f2f3] mr-3" />
          <span className="text-white/80">Play all games to unlock a special surprise!</span>
        </div>
      </div>
      
      <style jsx>{`
        .games-section {
          isolation: isolate;
          will-change: transform;
        }
        
        .game-card {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .game-card-image {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        
        .game-container {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .memory-card {
          perspective: 1000px;
          transform-style: preserve-3d;
          will-change: transform;
        }
        
        .card-inner {
          transform-style: preserve-3d;
          will-change: transform;
        }
        
        .card-front, .card-back {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          will-change: transform;
        }
        
        .snowman-part {
          will-change: transform;
          transform: translateZ(0);
        }
        
        .ice-slide-canvas {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        
        .games-snowflake {
          will-change: transform;
          transform: translateZ(0);
          
        }
        
        @media (max-width: 768px) {
          .game-card-image {
            height: 180px;
          }
        }
   
        }
      `}</style>
    </section>
  );
}

// Fixed Build a Snowman Game
function BuildSnowmanGame() {
  const [parts, setParts] = useState([
    { id: 'head', placed: false, position: { x: 0, y: 0 } },
    { id: 'body', placed: false, position: { x: 0, y: 0 } },
    { id: 'bottom', placed: false, position: { x: 0, y: 0 } },
    { id: 'arms', placed: false, position: { x: 0, y: 0 } },
    { id: 'nose', placed: false, position: { x: 0, y: 0 } },
    { id: 'eyes', placed: false, position: { x: 0, y: 0 } }
  ]);
  const [completed, setCompleted] = useState(false);
  const gameRef = useRef(null);
  const partsRef = useRef({});
  const targetsRef = useRef({});
  const draggableInstancesRef = useRef([]); // Add this to track draggable instances
  
  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(Draggable);
    }
    
    // Animate game entrance
    gsap.from(gameRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Animate parts entrance
    gsap.from('.snowman-part', {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(1.7)",
      delay: 0.5
    });
    
    // Clear previous draggable instances
    draggableInstancesRef.current.forEach(instance => {
      if (instance && instance.kill) {
        instance.kill();
      }
    });
    draggableInstancesRef.current = [];
    
    // Initialize drag functionality
    if (typeof window !== 'undefined' && gameRef.current) {
      // Setup target areas first
      parts.forEach(part => {
        if (targetsRef.current[part.id] && partsRef.current[part.id]) {
          const targetArea = targetsRef.current[part.id];
          
          // Position target areas correctly
          gsap.set(targetArea, { 
            position: 'absolute',
            top: part.id === 'head' ? '10%' : 
                 part.id === 'body' ? '30%' : 
                 part.id === 'bottom' ? '60%' : 
                 part.id === 'arms' ? '30%' : 
                 part.id === 'nose' ? '15%' : '15%',
            left: part.id === 'head' ? '50%' : 
                  part.id === 'body' ? '50%' : 
                  part.id === 'bottom' ? '50%' : 
                  part.id === 'arms' ? '25%' : 
                  part.id === 'nose' ? '55%' : '45%',
            xPercent: -50,
            yPercent: -50,
            width: part.id === 'head' ? '50px' : 
                   part.id === 'body' ? '60px' : 
                   part.id === 'bottom' ? '80px' : 
                   part.id === 'arms' ? '40px' : 
                   part.id === 'nose' ? '20px' : '30px',
            height: part.id === 'head' ? '50px' : 
                    part.id === 'body' ? '60px' : 
                    part.id === 'bottom' ? '80px' : 
                    part.id === 'arms' ? '40px' : 
                    part.id === 'nose' ? '20px' : '30px',
          });
        }
      });
      
      // Setup draggable parts
      parts.forEach(part => {
        if (partsRef.current[part.id]) {
          const draggable = partsRef.current[part.id];
          
          gsap.set(draggable, { 
            position: 'relative',
            cursor: 'grab'
          });
          
          const instance = Draggable.create(draggable, {
            type: 'x,y',
            bounds: gameRef.current,
            onDragStart: function() {
              gsap.to(this.target, { scale: 1.1, duration: 0.2 });
            },
            onDragEnd: function() {
              gsap.to(this.target, { scale: 1, duration: 0.2 });
              
              // Check if part is placed in correct position
              const targetArea = targetsRef.current[part.id];
              if (!targetArea) return;
              
              const rect = targetArea.getBoundingClientRect();
              const partRect = this.target.getBoundingClientRect();
              
              if (
                partRect.left > rect.left - 30 &&
                partRect.right < rect.right + 30 &&
                partRect.top > rect.top - 30 &&
                partRect.bottom < rect.bottom + 30
              ) {
                // Snap to position
                gsap.to(this.target, {
                  x: rect.left - partRect.left + rect.width/2 - partRect.width/2,
                  y: rect.top - partRect.top + rect.height/2 - partRect.height/2,
                  duration: 0.3,
                  ease: "back.out(1.7)"
                });
                
                // Update state
                setParts(prev => prev.map(p => 
                  p.id === part.id ? { ...p, placed: true } : p
                ));
                
                // Disable dragging
                this.disable();
                
                // Check completion
                setTimeout(checkCompletion, 300);
              }
            }
          })[0]; // Get the first (and only) instance
          
          // Store the instance for cleanup
          draggableInstancesRef.current.push(instance);
        }
      });
    }
    
    return () => {
      // Cleanup
      if (typeof window !== 'undefined') {
        // Instead of using Draggable.getAll(), use our tracked instances
        draggableInstancesRef.current.forEach(instance => {
          if (instance && instance.kill) {
            instance.kill();
          }
        });
        draggableInstancesRef.current = [];
      }
    };
  }, [parts]);
  
  const checkCompletion = () => {
    if (parts.every(part => part.placed)) {
      setCompleted(true);
      
      // Celebration animation
      gsap.to('.snowman-complete', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });
      
      // Create snowburst
      const container = gameRef.current;
      if (!container) return;
      
      for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('celebration-snow');
        
        const size = Math.random() * 10 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.background = 'white';
        snowflake.style.borderRadius = '50%';
        snowflake.style.position = 'absolute';
        snowflake.style.top = '50%';
        snowflake.style.left = '50%';
        
        container.appendChild(snowflake);
        
        gsap.to(snowflake, {
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400,
          opacity: 0,
          duration: 2,
          ease: "power3.out",
          onComplete: () => {
            if (container.contains(snowflake)) {
              container.removeChild(snowflake);
            }
          }
        });
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center" ref={gameRef}>
      <h3 className="text-3xl font-bold mb-4 text-white text-center">Build a Snowman</h3>
      <p className="mb-8 text-white/80 text-center">Drag and drop Olaf's parts to build him!</p>
      
      <div className="relative w-full max-w-2xl h-[500px] bg-[#1a2b4c]/30 rounded-xl border border-white/10 overflow-hidden">
        {/* Visual guide overlay - will disappear after first interaction */}
        {!parts.some(part => part.placed) && (
          <div className="absolute inset-0 bg-[#1a2b4c]/70 backdrop-blur-sm flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center max-w-xs">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 4L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 20L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Drag & Drop</h4>
              <p className="text-white/70">Drag each snowman part to its matching target area to build Olaf!</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          {/* Target areas */}
          <div className="relative w-full h-full">
            {parts.map(part => (
              <div 
                key={`target-${part.id}`} 
                className={`target-area absolute border-2 border-dashed ${part.placed ? 'border-green-400/50' : 'border-white/40'} rounded-full flex items-center justify-center transition-colors duration-300`}
                ref={el => targetsRef.current[part.id] = el}
                style={{
                  backgroundColor: part.placed ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: part.placed ? '0 0 15px rgba(74, 222, 128, 0.3)' : 'none'
                }}
              >
                <span className={`text-xs ${part.placed ? 'text-green-400' : 'text-white/40'}`}>
                  {part.id}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Draggable parts */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-4 p-4">
          {parts.map(part => (
            <div 
              key={part.id} 
              className="snowman-part shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center bg-white/90 rounded-lg border-2 border-white"
              ref={el => partsRef.current[part.id] = el}
              style={{
                width: part.id === 'head' ? '70px' : 
                       part.id === 'body' ? '80px' : 
                       part.id === 'bottom' ? '100px' : 
                       part.id === 'arms' ? '100px' : 
                       part.id === 'nose' ? '40px' : '50px',
                height: part.id === 'head' ? '70px' : 
                        part.id === 'body' ? '80px' : 
                        part.id === 'bottom' ? '100px' : 
                        part.id === 'arms' ? '40px' : 
                        part.id === 'nose' ? '40px' : '30px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                transform: part.placed ? 'scale(0.9)' : 'scale(1)',
                opacity: part.placed ? '0.7' : '1',
                transition: 'transform 0.3s, opacity 0.3s'
              }}
            >
              {/* Snowman part visuals */}
              {part.id === 'head' && (
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative">
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full border-2 border-gray-200"></div>
                </div>
              )}
              
              {part.id === 'body' && (
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <div className="w-1/2 h-1/2 flex flex-col items-center justify-center">
                    <div className="w-3 h-3 bg-black rounded-full mb-1"></div>
                    <div className="w-3 h-3 bg-black rounded-full mb-1"></div>
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                  </div>
                </div>
              )}
              
              {part.id === 'bottom' && (
                <div className="w-full h-full bg-white rounded-full"></div>
              )}
              
              {part.id === 'arms' && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full h-2 bg-brown-600 flex items-center justify-between" style={{ backgroundColor: '#8B4513' }}>
                    <div className="w-1/4 h-10 bg-brown-600 transform -rotate-45" style={{ backgroundColor: '#8B4513' }}></div>
                    <div className="w-1/4 h-10 bg-brown-600 transform rotate-45" style={{ backgroundColor: '#8B4513' }}></div>
                  </div>
                </div>
              )}
              
              {part.id === 'nose' && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full h-1/3 bg-orange-500 transform rotate-90 rounded-t-full" style={{ backgroundColor: '#ff7518' }}></div>
                </div>
              )}
              
              {part.id === 'eyes' && (
                <div className="w-full h-full flex items-center justify-around">
                  <div className="w-1/3 h-1/3 bg-black rounded-full"></div>
                  <div className="w-1/3 h-1/3 bg-black rounded-full"></div>
                </div>
              )}
              
              {/* Add part label for clarity */}
              <div className="absolute -bottom-5 left-0 right-0 text-center">
                <span className="text-xs font-bold text-white bg-[#1a2b4c]/70 px-2 py-0.5 rounded-full">
                  {part.id}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {completed && (
          <div className="snowman-complete absolute inset-0 flex items-center justify-center bg-[#1a2b4c]/80 backdrop-blur-sm opacity-0 scale-95">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-center">
              <h3 className="text-3xl font-bold text-[#a5f2f3] mb-2">Great Job!</h3>
              <p className="text-white mb-6">You've built Olaf!</p>
              <div className="flex justify-center">
                <Snowflake className="text-white w-16 h-16 animate-spin" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Fixed Ice Slide Game
function IceSlideGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef(null);
  const animationRef = useRef(null);
  const touchPositionRef = useRef(null);
  const eventListenersRef = useRef([]); // Add this to track event listeners
  
  useEffect(() => {
    // Animate game entrance
    gsap.from(gameRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    });
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clean up any event listeners
      eventListenersRef.current.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
      });
      eventListenersRef.current = [];
    };
  }, []);
  
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Game variables
    let sleighX = canvas.width / 2;
    let speed = 5;
    let obstacles = [];
    let frameCount = 0;
    
    // Create sleigh
    const sleigh = {
      x: sleighX,
      y: canvas.height - 50,
      width: 40,
      height: 30,
      color: '#ff4757'
    };
    
    // Handle keyboard input
    const keys = {};
    const handleKeyDown = (e) => {
      keys[e.key] = true;
    };
    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };
    
    // Handle touch input for mobile
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchPositionRef.current = touch.clientX;
    };
    
    const handleTouchMove = (e) => {
      if (!touchPositionRef.current) return;
      
      const touch = e.touches[0];
      const diff = touch.clientX - touchPositionRef.current;
      
      sleigh.x += diff * 0.5;
      
      // Keep sleigh within bounds
      if (sleigh.x < 0) sleigh.x = 0;
      if (sleigh.x > canvas.width - sleigh.width) sleigh.x = canvas.width - sleigh.width;
      
      touchPositionRef.current = touch.clientX;
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    
    // Track event listeners for cleanup
    eventListenersRef.current = [
      { element: window, type: 'keydown', handler: handleKeyDown },
      { element: window, type: 'keyup', handler: handleKeyUp },
      { element: canvas, type: 'touchstart', handler: handleTouchStart },
      { element: canvas, type: 'touchmove', handler: handleTouchMove }
    ];
    
    // Game loop
    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = '#a5f2f3';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw snow lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 10; i++) {
        const y = (frameCount * 5 + i * 50) % canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Update sleigh position based on keyboard input
      if (keys['ArrowLeft'] || keys['a']) {
        sleigh.x -= 5;
      }
      if (keys['ArrowRight'] || keys['d']) {
        sleigh.x += 5;
      }
      
      // Keep sleigh within bounds
      if (sleigh.x < 0) sleigh.x = 0;
      if (sleigh.x > canvas.width - sleigh.width) sleigh.x = canvas.width - sleigh.width;
      
      // Draw sleigh
      ctx.fillStyle = sleigh.color;
      ctx.fillRect(sleigh.x, sleigh.y, sleigh.width, sleigh.height);
      
      // Create obstacles
      if (frameCount % 60 === 0) {
        const obstacle = {
          x: Math.random() * (canvas.width - 30),
          y: -30,
          width: 30,
          height: 30,
          color: '#1a2b4c'
        };
        obstacles.push(obstacle);
      }
      
      // Update and draw obstacles
      for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        obstacle.y += speed;
        
        // Draw obstacle
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Check collision
        if (
          sleigh.x < obstacle.x + obstacle.width &&
          sleigh.x + sleigh.width > obstacle.x &&
          sleigh.y < obstacle.y + obstacle.height &&
          sleigh.y + sleigh.height > obstacle.y
        ) {
          // Game over
          cancelAnimationFrame(animationRef.current);
          setGameOver(true);
          
          // Remove event listeners
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
          canvas.removeEventListener('touchstart', handleTouchStart);
          canvas.removeEventListener('touchmove', handleTouchMove);
          
          return;
        }
        
        // Remove obstacles that are off screen
        if (obstacle.y > canvas.height) {
          obstacles.splice(i, 1);
          i--;
          
          // Increase score
          setScore(prevScore => prevScore + 1);
          
          // Increase speed every 10 points
          if (score > 0 && score % 10 === 0) {
            speed += 0.5;
          }
        }
      }
      
      // Update frame count
      frameCount++;
      
      // Continue game loop
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    // Start game loop
    animationRef.current = requestAnimationFrame(gameLoop);
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  };
  
  return (
    <div className="flex flex-col items-center" ref={gameRef}>
      <h3 className="text-3xl font-bold mb-4 text-white text-center">Ice Slide</h3>
      <p className="mb-4 text-white/80 text-center">
        Use arrow keys or touch to avoid obstacles and slide down the mountain!
      </p>
      
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <div className="text-white text-xl">Score: {score}</div>
        {!gameStarted && !gameOver && (
          <button 
            className="bg-gradient-to-r from-[#a5f2f3] to-[#7ec0ee] text-[#1a2b4c] font-bold py-2 px-6 rounded-full"
            onClick={startGame}
          >
            Start Game
          </button>
        )}
        {gameOver && (
          <button 
            className="bg-gradient-to-r from-[#a5f2f3] to-[#7ec0ee] text-[#1a2b4c] font-bold py-2 px-6 rounded-full"
            onClick={startGame}
          >
            Play Again
          </button>
        )}
      </div>
      
      <div className="relative w-full max-w-md h-[400px] bg-[#1a2b4c]/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a2b4c]/70 backdrop-blur-sm">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-4">Ice Slide Challenge</h4>
              <p className="text-white/80 mb-6">Avoid obstacles and slide down the mountain!</p>
              <button 
                className="bg-gradient-to-r from-[#a5f2f3] to-[#7ec0ee] text-[#1a2b4c] font-bold py-2 px-6 rounded-full"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a2b4c]/70 backdrop-blur-sm">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-2">Game Over!</h4>
              <p className="text-3xl font-bold text-[#a5f2f3] mb-6">Score: {score}</p>
              <button 
                className="bg-gradient-to-r from-[#a5f2f3] to-[#7ec0ee] text-[#1a2b4c] font-bold py-2 px-6 rounded-full"
                onClick={startGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        <canvas 
          ref={canvasRef} 
          className="ice-slide-canvas w-full h-full"
        />
      </div>
      
      <div className="mt-4 text-white/60 text-sm text-center">
        <p>Use ← → arrow keys or touch to move the sleigh</p>
      </div>
    </div>
  );
}



// Match the Snowflakes Game
function MatchSnowflakesGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const gameRef = useRef(null);
  
  // Snowflake patterns
  const snowflakePatterns = [
    '❄️', '❅', '❆', '✻', '✼', '✽', '✾', '✿'
  ];
  
  useEffect(() => {
    // Animate game entrance
    gsap.from(gameRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Initialize game
    initializeGame();
  }, []);
  
  useEffect(() => {
    // Check for matches when two cards are flipped
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      
      // Check if the patterns match
      if (cards[firstCard].pattern === cards[secondCard].pattern) {
        // Match found
        setMatchedPairs(prev => [...prev, cards[firstCard].pattern]);
        setFlippedCards([]);
      } else {
        // No match, flip cards back after delay
        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
      
      // Increment moves
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);
  
  useEffect(() => {
    // Check if game is complete
    if (matchedPairs.length === snowflakePatterns.length) {
      const timer = setTimeout(() => {
        setGameComplete(true);
        
        // Celebration animation
        gsap.to('.game-complete', {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
        
        // Create snowburst
        const container = gameRef.current;
        if (!container) return;
        
        for (let i = 0; i < 50; i++) {
          const snowflake = document.createElement('div');
          snowflake.classList.add('celebration-snow');
          
          const size = Math.random() * 10 + 5;
          snowflake.style.width = `${size}px`;
          snowflake.style.height = `${size}px`;
          snowflake.style.background = 'white';
          snowflake.style.borderRadius = '50%';
          snowflake.style.position = 'absolute';
          snowflake.style.top = '50%';
          snowflake.style.left = '50%';
          
          container.appendChild(snowflake);
          
          gsap.to(snowflake, {
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
            duration: 2,
            ease: "power3.out",
            onComplete: () => {
              if (container.contains(snowflake)) {
                container.removeChild(snowflake);
              }
            }
          });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [matchedPairs]);
  
  const initializeGame = () => {
    // Reset game state
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameComplete(false);
    
    // Create pairs of cards with snowflake patterns
    const cardPairs = snowflakePatterns.flatMap(pattern => [
      { id: `${pattern}-1`, pattern, isFlipped: false, isMatched: false },
      { id: `${pattern}-2`, pattern, isFlipped: false, isMatched: false }
    ]);
    
    // Shuffle cards
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
  };
  
  const handleCardClick = (index) => {
    // Ignore click if card is already flipped or matched
    if (
      flippedCards.includes(index) || 
      matchedPairs.includes(cards[index].pattern) ||
      flippedCards.length >= 2
    ) {
      return;
    }
    
    // Flip the card
    setFlippedCards(prev => [...prev, index]);
  };
  
  const resetGame = () => {
    initializeGame();
    
    // Reset animation
    gsap.to('.game-complete', {
      opacity: 0,
      scale: 0.95,
      duration: 0.3
    });
  };
  
  return (
    <div className="flex flex-col items-center" ref={gameRef}>
      <h3 className="text-3xl font-bold mb-4 text-white text-center">Match the Snowflakes</h3>
      <p className="mb-4 text-white/80 text-center">Find matching pairs of snowflake patterns!</p>
      
      <div className="flex items-center justify-between w-full max-w-md mb-6">
        <div className="text-white text-xl">Moves: {moves}</div>
        <div className="text-white text-xl">Pairs: {matchedPairs.length}/{snowflakePatterns.length}</div>
        <button 
          className="bg-gradient-to-r from-[#a5f2f3] to-[#7ec0ee] text-[#1a2b4c] font-bold py-1 px-4 rounded-full text-sm"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
      
      <div className="relative w-full max-w-md">
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, index) => (
            <div 
              key={card.id} 
              className="memory-card aspect-square cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div 
                className={`card-inner w-full h-full transition-transform duration-500 ${
                  flippedCards.includes(index) || matchedPairs.includes(card.pattern) ? 'rotate-y-180' : ''
                }`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: flippedCards.includes(index) || matchedPairs.includes(card.pattern) ? 'rotateY(180deg)' : '' 
                }}
              >
                <div 
                  className="card-front absolute w-full h-full bg-gradient-to-br from-[#1a2b4c] to-[#3a4b6c] rounded-lg border border-white/10 flex items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Snowflake className="text-white/50" size={24} />
                </div>
                <div 
                  className={`card-back absolute w-full h-full bg-gradient-to-br from-[#a5f2f3] to-[#7ec0ee] rounded-lg border border-white/30 flex items-center justify-center ${
                    matchedPairs.includes(card.pattern) ? 'opacity-70' : ''
                  }`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <span className="text-4xl">{card.pattern}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {gameComplete && (
          <div className="game-complete absolute inset-0 flex items-center justify-center bg-[#1a2b4c]/80 backdrop-blur-sm opacity-0 scale-95 rounded-lg">
            <div className="bg-white/10  p-8 rounded-xl text-center">
              <h3 className="text-3xl font-bold text-[#a5f2f3] mb-2">Congratulations!</h3>
              <p className="text-white mb-2">You matched all pairs in {moves} moves!</p>
              <div className="flex justify-center mb-6">
                <Snowflake className="text-white w-16 h-16 animate-spin" />
              </div>
              <button 
                className="bg-gradient-to-r from-[#a5f2f3] to-[#7ec0ee] text-[#1a2b4c] font-bold py-2 px-6 rounded-full"
                onClick={resetGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
