"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { 
  Crown, 
  Heart, 
  Snowflake, 
  Mountain, 
  Rabbit, 
  Sword, 
  Sparkles,
  User,
  Users
} from 'lucide-react';

export default function CharactersSection() {
  const [activeTab, setActiveTab] = useState('heroes');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const snowflakesRef = useRef([]);
  const iceParticlesRef = useRef([]);
  
  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // GSAP animations for section entrance
    gsap.fromTo(
      '.section-title',
      { y: -50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    );
    
    // Animate tabs with frost effect
    gsap.fromTo(
      '.character-tabs',
      { y: 30, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        ease: 'back.out(1.7)',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        },
        onComplete: () => {
          gsap.to('.character-tab', {
            boxShadow: '0 0 15px rgba(165, 242, 243, 0.8)',
            duration: 1.5,
            repeat: -1,
            yoyo: true
          });
        }
      }
    );
    
    // Animate character cards with staggered entrance and ice formation effect
    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        },
        onComplete: () => {
          // Add frost growing animation to cards
          cardsRef.current.forEach((card, index) => {
            if (!card) return;
            
            gsap.fromTo(
              card.querySelector('.character-card-frost'),
              { opacity: 0, scale: 0 },
              {
                opacity: 0.7,
                scale: 1,
                duration: 1.5,
                delay: index * 0.1,
                ease: 'power2.out'
              }
            );
          });
        }
      }
    );
    
    // Create ice particles and snowfall
    createIceParticles();
    createSnowfall();
    
    // Add ice crystal formations
    createIceCrystals();
    
    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      
      // Clean up animations
      snowflakesRef.current.forEach(tween => tween.kill());
      iceParticlesRef.current.forEach(tween => tween.kill());
    };
  }, [activeTab]);
  
  const createIceParticles = () => {
    if (!sectionRef.current) return;
    
    const container = sectionRef.current;
    const existingParticles = container.querySelectorAll('.ice-particle');
    
    // Remove existing particles
    existingParticles.forEach(particle => {
      container.removeChild(particle);
    });
    
    // Clear previous tweens
    iceParticlesRef.current.forEach(tween => tween.kill());
    iceParticlesRef.current = [];
    
    // Create new particles
    for (let i = 0; i < 70; i++) {  // Increased number of particles
      const particle = document.createElement('div');
      particle.classList.add('ice-particle');
      
      const size = Math.random() * 20 + 5;  // Larger particles
      const isSnowflake = Math.random() > 0.7;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.position = 'absolute';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.6 + 0.2}`;
      
      if (isSnowflake) {
        // Create snowflake shape
        particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        particle.style.background = 'white';
      } else {
        // Create ice crystal shape
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%';
        particle.style.background = 'rgba(255, 255, 255, 0.8)';
      }
      
      particle.style.boxShadow = '0 0 15px rgba(165, 242, 243, 0.9)';  // Stronger glow
      particle.style.zIndex = '1';
      particle.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      container.appendChild(particle);
      
      const tween = gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 20 + 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        onRepeat: () => {
          // Pulse effect
          gsap.to(particle, {
            boxShadow: '0 0 25px rgba(165, 242, 243, 1)',
            duration: 1,
            yoyo: true,
            repeat: 1
          });
        }
      });
      
      iceParticlesRef.current.push(tween);
    }
  };
  
  const createSnowfall = () => {
    if (!sectionRef.current) return;
    
    const container = sectionRef.current;
    const existingSnowflakes = container.querySelectorAll('.snowflake');
    
    // Remove existing snowflakes
    existingSnowflakes.forEach(snowflake => {
      container.removeChild(snowflake);
    });
    
    // Clear previous tweens
    snowflakesRef.current.forEach(tween => tween.kill());
    snowflakesRef.current = [];
    
    // Create new snowflakes
    for (let i = 0; i < 100; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      
      const size = Math.random() * 10 + 2;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.position = 'absolute';
      snowflake.style.top = `-${size}px`;
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      snowflake.style.borderRadius = '50%';
      snowflake.style.background = 'white';
      snowflake.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
      snowflake.style.zIndex = '2';
      
      container.appendChild(snowflake);
      
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 10;
      
      const tween = gsap.to(snowflake, {
        y: container.offsetHeight + size,
        x: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 360,
        duration: duration,
        delay: delay,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          snowflake.style.left = `${Math.random() * 100}%`;
          snowflake.style.top = `-${size}px`;
        }
      });
      
      snowflakesRef.current.push(tween);
    }
  };
  
  const createIceCrystals = () => {
    if (!sectionRef.current) return;
    
    const container = sectionRef.current;
    const existingCrystals = container.querySelectorAll('.ice-crystal');
    
    // Remove existing crystals
    existingCrystals.forEach(crystal => {
      container.removeChild(crystal);
    });
    
    // Create ice crystals at the corners
    const crystalPositions = [
      { top: '0%', left: '0%', rotate: '0deg' },
      { top: '0%', left: '100%', rotate: '90deg' },
      { top: '100%', left: '0%', rotate: '270deg' },
      { top: '100%', left: '100%', rotate: '180deg' }
    ];
    
    crystalPositions.forEach((pos, index) => {
      const crystal = document.createElement('div');
      crystal.classList.add('ice-crystal');
      
      crystal.style.position = 'absolute';
      crystal.style.top = pos.top;
      crystal.style.left = pos.left;
      crystal.style.width = '150px';
      crystal.style.height = '150px';
      crystal.style.transform = `translate(-50%, -50%) rotate(${pos.rotate})`;
      crystal.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(165,242,243,0.4) 60%, rgba(165,242,243,0) 100%)';
      crystal.style.clipPath = 'polygon(50% 0%, 80% 30%, 100% 0%, 70% 50%, 100% 100%, 80% 70%, 50% 100%, 30% 70%, 0% 100%, 30% 50%, 0% 0%, 30% 30%)';
      crystal.style.zIndex = '1';
      crystal.style.opacity = '0';
      
      container.appendChild(crystal);
      
      gsap.to(crystal, {
        opacity: 0.7,
        duration: 2,
        delay: index * 0.5,
        ease: 'power2.out'
      });
      
      // Pulsing animation
      gsap.to(crystal, {
        scale: 1.2,
        opacity: 0.9,
        boxShadow: '0 0 30px rgba(165, 242, 243, 0.8)',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  };
  
  const handleCharacterClick = (character) => {
    if (selectedCharacter && selectedCharacter.name === character.name) {
      // If clicking the same character, close the detail view with ice shattering effect
      gsap.to('.character-detail', {
        height: 0,
        opacity: 0,
        duration: 0.5,
        onComplete: () => setSelectedCharacter(null)
      });
      
      // Create ice shattering effect
      createIceShatter();
    } else {
      // Create magical transition effect
      const characterCard = cardsRef.current[characters.indexOf(character)];
      if (!characterCard) return;
      
      // Create frost trail from card to detail section
      createFrostTrail(characterCard);
      
      // If there's already a selected character, animate it out first
      if (selectedCharacter) {
        gsap.to('.character-detail', {
          height: 0,
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setSelectedCharacter(character);
            animateCharacterDetail(character);
          }
        });
      } else {
        setSelectedCharacter(character);
        animateCharacterDetail(character);
      }
    }
  };
  
  const createFrostTrail = (sourceElement) => {
    if (!sectionRef.current) return;
    
    const container = sectionRef.current;
    const sourceRect = sourceElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Create frost particles that travel from the card to the detail section
    for (let i = 0; i < 20; i++) {
      const frost = document.createElement('div');
      frost.classList.add('frost-particle');
      
      const size = Math.random() * 15 + 5;
      frost.style.width = `${size}px`;
      frost.style.height = `${size}px`;
      frost.style.position = 'absolute';
      frost.style.top = `${sourceRect.top - containerRect.top + sourceRect.height/2}px`;
      frost.style.left = `${sourceRect.left - containerRect.left + sourceRect.width/2}px`;
      frost.style.borderRadius = '50%';
      frost.style.background = 'rgba(255, 255, 255, 0.8)';
      frost.style.boxShadow = '0 0 10px rgba(165, 242, 243, 0.9)';
      frost.style.zIndex = '10';
      
      container.appendChild(frost);
      
      // Calculate target position (center of the container)
      const targetY = container.offsetHeight * 0.6;
      const targetX = container.offsetWidth / 2;
      
      gsap.to(frost, {
        x: targetX - (sourceRect.left - containerRect.left + sourceRect.width/2) + (Math.random() * 100 - 50),
        y: targetY - (sourceRect.top - containerRect.top + sourceRect.height/2) + (Math.random() * 50 - 25),
        scale: Math.random() * 2 + 1,
        opacity: 0,
        duration: 1 + Math.random(),
        ease: 'power2.out',
        onComplete: () => {
          if (container.contains(frost)) {
            container.removeChild(frost);
          }
        }
      });
    }
  };
  
  const createIceShatter = () => {
    if (!sectionRef.current) return;
    
    const container = sectionRef.current;
    const detailSection = container.querySelector('.character-detail');
    if (!detailSection) return;
    
    const rect = detailSection.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Create ice shards that fly outward
    for (let i = 0; i < 30; i++) {
      const shard = document.createElement('div');
      shard.classList.add('ice-shard');
      
      const size = Math.random() * 20 + 5;
      shard.style.width = `${size}px`;
      shard.style.height = `${size}px`;
      shard.style.position = 'absolute';
      shard.style.top = `${rect.top - containerRect.top + rect.height/2}px`;
      shard.style.left = `${rect.left - containerRect.left + rect.width/2}px`;
      shard.style.background = 'rgba(255, 255, 255, 0.8)';
      shard.style.boxShadow = '0 0 10px rgba(165, 242, 243, 0.9)';
      shard.style.zIndex = '10';
      shard.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      shard.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      container.appendChild(shard);
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 300 + 100;
      
      gsap.to(shard, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 720 - 360,
        opacity: 0,
        duration: 1 + Math.random(),
        ease: 'power2.out',
        onComplete: () => {
          if (container.contains(shard)) {
            container.removeChild(shard);
          }
        }
      });
    }
  };
  
  const animateCharacterDetail = (character) => {
    setTimeout(() => {
      // Ice formation effect for the detail panel
      gsap.fromTo('.character-detail', 
        { height: 0, opacity: 0, background: 'rgba(255, 255, 255, 0)' },
        { 
          height: 'auto', 
          opacity: 1, 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            // Add frost growing from edges
            const detail = document.querySelector('.character-detail');
            if (detail) {
              gsap.fromTo(
                detail,
                { boxShadow: '0 0 0 rgba(165, 242, 243, 0)' },
                { 
                  boxShadow: '0 0 30px rgba(165, 242, 243, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.5)',
                  duration: 1.5
                }
              );
            }
          }
        }
      );
      
      gsap.fromTo('.character-detail-content', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out'
        }
      );
      
      // Animate character icon with ice magic effect
      gsap.fromTo('.detail-icon', 
        { scale: 0, rotation: -180 },
        { 
          scale: 1, 
          rotation: 0,
          duration: 1,
          delay: 0.5,
          ease: 'elastic.out(1, 0.5)',
          onComplete: () => {
            // Add pulsing glow
            gsap.to('.detail-icon', {
              boxShadow: '0 0 30px rgba(165, 242, 243, 0.8)',
              duration: 1.5,
              repeat: -1,
              yoyo: true
            });
          }
        }
      );
      
      // Create sparkle effects around the icon
      createSparkles();
      
      // Animate traits with staggered ice formation
      gsap.fromTo('.trait-item',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          delay: 0.8,
          ease: 'back.out(1.7)'
        }
      );
      
      // Animate powers with magical effect
      gsap.fromTo('.power-item',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          delay: 1,
          ease: 'power2.out'
        }
      );
      
      // Animate quote with frost effect
      gsap.fromTo('.detail-quote blockquote',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 1.2,
          ease: 'power2.out',
          onComplete: () => {
            // Add frost growing from edges
            const quote = document.querySelector('.detail-quote blockquote');
            if (quote) {
              gsap.fromTo(
                quote,
                { boxShadow: '0 0 0 rgba(165, 242, 243, 0)' },
                { 
                  boxShadow: '0 0 15px rgba(165, 242, 243, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.3)',
                  duration: 1
                }
              );
            }
          }
        }
      );
    }, 100);
  };
  
  const createSparkles = () => {
    const container = document.querySelector('.detail-icon-container');
    if (!container) return;
    
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('character-sparkle');
      
      const size = Math.random() * 8 + 3;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.position = 'absolute';
      sparkle.style.top = '50%';
      sparkle.style.left = '50%';
      sparkle.style.borderRadius = '50%';
      sparkle.style.background = 'white';
      sparkle.style.boxShadow = '0 0 10px rgba(165, 242, 243, 0.8)';
      
      container.appendChild(sparkle);
      
      const angle = (i / 12) * Math.PI * 2;
      const distance = 60;
      
      gsap.fromTo(sparkle,
        { 
          x: 0, 
          y: 0,
          opacity: 0
        },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0.8,
          duration: 1,
          delay: 0.5 + (i * 0.05),
          ease: 'power3.out',
          onComplete: () => {
            gsap.to(sparkle, {
              opacity: 0,
              scale: 0.5,
              duration: 0.8,
              delay: 1,
              onComplete: () => {
                if (container.contains(sparkle)) {
                  container.removeChild(sparkle);
                }
              }
            });
          }
        }
      );
    }
  };
  
  // Enhanced heroes data with more details
  const heroes = [
    {
      name: 'Elsa',
      icon: <Snowflake size={48} strokeWidth={1} />,
      color: '#a5f2f3',
      description: 'The Snow Queen with magical ice powers. Born with the ability to create and control ice and snow, Elsa struggled with her powers until she learned to embrace them.',
      powers: ['Ice Creation', 'Snow Generation', 'Freezing', 'Ice Architecture'],
      quote: "The cold never bothered me anyway.",
      traits: ['Independent', 'Protective', 'Creative'],
      role: 'Queen of Arendelle',
      age: '24'
    },
    {
      name: 'Anna',
      icon: <Heart size={48} strokeWidth={1} />,
      color: '#ff9caa',
      description: 'The fearless and optimistic princess of Arendelle. Anna is determined, brave, and fiercely loyal to her sister Elsa.',
      powers: ['Extraordinary Courage', 'Optimism', 'Determination'],
      quote: "Some people are worth melting for.",
      traits: ['Optimistic', 'Adventurous', 'Loyal'],
      role: 'Princess of Arendelle',
      age: '21'
    },
    {
      name: 'Olaf',
      icon: <Snowflake size={48} strokeWidth={1} />,
      color: '#ffffff',
      description: 'A magical snowman who loves warm hugs. Created by Elsa\'s magic, Olaf is innocent, caring, and surprisingly wise.',
      powers: ['Detachable Body Parts', 'Cold Immunity', 'Eternal Optimism'],
      quote: "Hi, I'm Olaf and I like warm hugs!",
      traits: ['Innocent', 'Loving', 'Curious'],
      role: 'Magical Snowman',
      age: 'Magically Created'
    },
    {
      name: 'Kristoff',
      icon: <Mountain size={48} strokeWidth={1} />,
      color: '#8b5a2b',
      description: 'An ice harvester with a reindeer best friend. Kristoff is rugged, practical, and has a deep connection with nature.',
      powers: ['Ice Harvesting', 'Survival Skills', 'Animal Communication'],
      quote: "Reindeers are better than people.",
      traits: ['Rugged', 'Honest', 'Resourceful'],
      role: 'Royal Ice Master and Deliverer',
      age: '24'
    },
    {
      name: 'Sven',
      icon: <Rabbit size={48} strokeWidth={1} />,
      color: '#8b4513',
      description: 'Kristoff\'s loyal reindeer companion. Sven is playful, loyal, and surprisingly expressive.',
      powers: ['Super Strength', 'Endurance', 'Loyalty'],
      quote: "*Reindeer noises*",
      traits: ['Loyal', 'Playful', 'Intelligent'],
      role: 'Reindeer Companion',
      age: 'Unknown'
    }
  ];
  
  // Enhanced villains with more details
  const villains = [
    {
      name: 'Hans',
      icon: <Sword size={48} strokeWidth={1} />,
      color: '#800020',
      description: 'The deceptive prince from the Southern Isles. Hans is manipulative, cunning, and willing to do anything to gain power.',
      powers: ['Manipulation', 'Deception', 'Swordsmanship'],
      quote: "Oh Anna, if only there was someone out there who loved you.",
      traits: ['Deceptive', 'Ambitious', 'Charming'],
      role: 'Prince of the Southern Isles',
      age: '23'
    },
    {
      name: 'Duke of Weselton',
      icon: <Crown size={48} strokeWidth={1} />,
      color: '#4b0082',
      description: 'A suspicious foreign dignitary. The Duke is paranoid, greedy, and quick to judge.',
      powers: ['Influence', 'Wealth', 'Paranoia'],
      quote: "Sorcery! I knew there was something dubious going on here.",
      traits: ['Paranoid', 'Greedy', 'Judgmental'],
      role: 'Duke of Weselton',
      age: '60s'
    }
  ];
  
  const characters = activeTab === 'heroes' ? heroes : villains;
  
  return (
    <section 
      className="characters-section" 
      id="characters" 
      ref={sectionRef}
    >
      <div className="characters-bg-decoration"></div>
      <div className="snow-overlay"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="section-header mb-12">
          <Users className="section-icon" size={40} />
          <h2 className="section-title text-4xl text-center mb-2">
            {activeTab === 'heroes' ? 'Meet the Heroes' : 'Meet the Villains'}
          </h2>
          <div className="header-underline"></div>
        </div>
        
        <div className="character-tabs flex justify-center mb-12">
          <button 
            className={`character-tab ${activeTab === 'heroes' ? 'active-tab heroes-tab' : ''}`}
            onClick={() => setActiveTab('heroes')}
          >
            <Sparkles size={20} className="tab-icon" />
            <span>Heroes</span>
          </button>
          <button 
            className={`character-tab ${activeTab === 'villains' ? 'active-tab villains-tab' : ''}`}
            onClick={() => setActiveTab('villains')}
          >
            <Sword size={20} className="tab-icon" />
            <span>Villains</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {characters.map((character, index) => (
            <div 
              key={index} 
              className={`character-card ${selectedCharacter?.name === character.name ? 'selected-card' : ''}`}
              ref={el => cardsRef.current[index] = el}
              onClick={() => handleCharacterClick(character)}
              style={{
                '--character-color': character.color
              }}
            >
              <div className="character-card-inner">
                <div className="character-card-frost"></div>
                <div className="character-card-snow-top"></div>
                <div className="character-card-snow-right"></div>
                <div className="character-card-snow-left"></div>
                
                <div className="character-icon-container" style={{ color: character.color }}>
                  {character.icon}
                </div>
                
                <h3 className="text-2xl mb-2">{character.name}</h3>
                <div className="character-role">{character.role}</div>
                
                <div className="character-traits">
                  {character.traits.map((trait, i) => (
                    <span key={i} className="character-trait">{trait}</span>
                  ))}
                </div>
                
                <p className="character-short-desc">{character.description.split('.')[0] + '.'}</p>
                
                <div className="character-card-shine"></div>
                <div className="character-card-bottom">
                  <div className="view-details">
                    <span>View Details</span>
                    <Sparkles size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedCharacter && (
          <div className="character-detail">
            <div className="character-detail-content">
              <div className="detail-header">
                <div 
                  className="detail-icon-container"
                  style={{ backgroundColor: selectedCharacter.color + '33' }}
                >
                  <div className="detail-icon" style={{ color: selectedCharacter.color }}>
                    {selectedCharacter.icon}
                  </div>
                </div>
                
                <div className="detail-title">
                  <h3 className="text-3xl mb-1">{selectedCharacter.name}</h3>
                  <div 
                    className="detail-underline" 
                    style={{ backgroundColor: selectedCharacter.color }}
                  ></div>
                </div>
              </div>
              
              <div className="detail-body">
                <p className="detail-description mb-4">{selectedCharacter.description}</p>
                
                <div className="detail-traits mb-4">
                  <h4 className="text-xl mb-2">Character Traits</h4>
                  <div className="traits-list">
                    {selectedCharacter.traits.map((trait, index) => (
                      <div key={index} className="trait-item" style={{ borderColor: selectedCharacter.color }}>
                        {trait}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="detail-powers mb-4">
                  <h4 className="text-xl mb-2">Special Abilities</h4>
                  <ul className="powers-list">
                    {selectedCharacter.powers.map((power, index) => (
                      <li key={index} className="power-item">
                        <Sparkles size={16} className="power-icon" style={{ color: selectedCharacter.color }} />
                        <span>{power}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="detail-quote">
                  <blockquote style={{ borderColor: selectedCharacter.color }}>"{selectedCharacter.quote}"</blockquote>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}