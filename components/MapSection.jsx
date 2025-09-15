"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Map, Compass, Snowflake, Wind, Castle, Trees, Home, Mountain } from 'lucide-react';

export default function MapSection() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [mapZoomed, setMapZoomed] = useState(false);
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  
  const locations = [
    {
      name: "Arendelle Castle",
      description: "The royal castle where Elsa and Anna grew up. This majestic structure sits at the edge of the fjord, surrounded by protective walls and featuring distinctive purple rooftops.",
      x: 50,
      y: 60,
      sound: "/audio/castle-ambience.mp3",
      icon: <Castle size={24} />,
      color: "#9370DB"
    },
    {
      name: "Ice Palace",
      description: "Elsa's magnificent creation on the North Mountain. A stunning structure made entirely of ice, featuring a grand staircase and hexagonal snowflake motifs throughout its crystalline walls.",
      x: 75,
      y: 30,
      sound: "/audio/ice-cracking.mp3",
      icon: <Snowflake size={24} />,
      color: "#a5f2f3"
    },
    {
      name: "Enchanted Forest",
      description: "Home to the spirits of nature. A mystical woodland shrouded in mist, where the elemental spirits of earth, fire, water, and air reside in harmony with the indigenous Northuldra people.",
      x: 25,
      y: 40,
      sound: "/audio/forest-sounds.mp3",
      icon: <Trees size={24} />,
      color: "#7CFC00"
    },
    {
      name: "Arendelle Village",
      description: "The charming village surrounding the castle. A bustling trading hub with colorful buildings, cobblestone streets, and a lively marketplace where citizens go about their daily lives.",
      x: 45,
      y: 70,
      sound: "/audio/village-bells.mp3",
      icon: <Home size={24} />,
      color: "#FF9C5B"
    },
    {
      name: "North Mountain",
      description: "The tallest peak in the region, covered in snow year-round. This imposing mountain is where Elsa fled to isolate herself and later built her magnificent Ice Palace.",
      x: 70,
      y: 20,
      sound: "/audio/wind-howling.mp3",
      icon: <Mountain size={24} />,
      color: "#E0FFFF"
    }
  ];
  
  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Section entrance animation
    gsap.fromTo(
      '.map-title',
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
    
    // Map reveal animation
    gsap.fromTo(
      mapRef.current,
      { scale: 0.9, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.5, 
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      }
    );
    
    // Markers staggered entrance
    gsap.fromTo(
      markersRef.current,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      }
    );
    
    // Create floating snowflakes
    createSnowflakes();
    
    // Compass animation
    gsap.to('.compass-needle', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
    
    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);
  
  const createSnowflakes = () => {
    if (!sectionRef.current) return;
    
    const container = sectionRef.current;
    
    for (let i = 0; i < 30; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('map-snowflake');
      
      const size = Math.random() * 10 + 5;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.position = 'absolute';
      snowflake.style.top = `${Math.random() * 100}%`;
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      snowflake.style.borderRadius = '50%';
      snowflake.style.background = 'white';
      snowflake.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
      snowflake.style.zIndex = '1';
      
      container.appendChild(snowflake);
      
      gsap.to(snowflake, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  };
  
  const handleLocationHover = (location) => {
    setActiveLocation(location);
    
    // Get marker element
    const markerIndex = locations.indexOf(location);
    const marker = markersRef.current[markerIndex];
    
    // Pulse animation
    gsap.to(marker, {
      scale: 1.3,
      boxShadow: `0 0 20px ${location.color}`,
      duration: 0.5,
      yoyo: true,
      repeat: 1
    });
    
    // Special effects based on location
    if (location.name === "Ice Palace") {
      // Shimmering ice effect
      createIceShimmer(location);
    } else if (location.name === "Enchanted Forest") {
      // Fireflies appear
      createFireflies(location);
    } else if (location.name === "Arendelle Castle") {
      // Royal banner unfurling
      createRoyalBanner(location);
    } else if (location.name === "North Mountain") {
      // Snow flurry
      createSnowFlurry(location);
    }
    
    // Play sound if available
    if (location.sound) {
      const audio = new Audio(location.sound);
      audio.volume = 0.3;
      audio.play();
      
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 3000);
    }
  };
  
  const createIceShimmer = (location) => {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    for (let i = 0; i < 30; i++) {
      const shimmer = document.createElement('div');
      shimmer.classList.add('ice-shimmer');
      
      const size = Math.random() * 8 + 2;
      shimmer.style.width = `${size}px`;
      shimmer.style.height = `${size}px`;
      shimmer.style.position = 'absolute';
      shimmer.style.left = `${location.x - 15 + Math.random() * 30}%`;
      shimmer.style.top = `${location.y - 15 + Math.random() * 30}%`;
      shimmer.style.background = '#a5f2f3';
      shimmer.style.borderRadius = '50%';
      shimmer.style.opacity = '0';
      shimmer.style.boxShadow = '0 0 10px #a5f2f3';
      shimmer.style.zIndex = '10';
      
      mapContainer.appendChild(shimmer);
      
      gsap.to(shimmer, {
        opacity: Math.random() * 0.7 + 0.3,
        scale: Math.random() * 2 + 1,
        duration: Math.random() * 1 + 0.5,
        delay: Math.random() * 0.5,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          if (mapContainer.contains(shimmer)) {
            mapContainer.removeChild(shimmer);
          }
        }
      });
    }
  };
  
  const createFireflies = (location) => {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    for (let i = 0; i < 20; i++) {
      const firefly = document.createElement('div');
      firefly.classList.add('firefly');
      
      firefly.style.position = 'absolute';
      firefly.style.width = '3px';
      firefly.style.height = '3px';
      firefly.style.backgroundColor = '#ffff80';
      firefly.style.borderRadius = '50%';
      firefly.style.left = `${location.x - 15 + Math.random() * 30}%`;
      firefly.style.top = `${location.y - 15 + Math.random() * 30}%`;
      firefly.style.opacity = '0';
      firefly.style.boxShadow = '0 0 5px #ffff80';
      firefly.style.zIndex = '10';
      
      mapContainer.appendChild(firefly);
      
      gsap.to(firefly, {
        x: Math.random() * 30 - 15,
        y: Math.random() * 30 - 15,
        opacity: 0.8,
        duration: 2,
        ease: "power1.inOut",
        repeat: 1,
        yoyo: true,
        onComplete: () => {
          if (mapContainer.contains(firefly)) {
            mapContainer.removeChild(firefly);
          }
        }
      });
    }
  };
  
  const createRoyalBanner = (location) => {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    const banner = document.createElement('div');
    banner.classList.add('royal-banner');
    
    banner.style.position = 'absolute';
    banner.style.width = '40px';
    banner.style.height = '0';
    banner.style.left = `${location.x}%`;
    banner.style.top = `${location.y - 5}%`;
    banner.style.background = 'linear-gradient(to bottom, #9370DB, #7B68EE)';
    banner.style.transformOrigin = 'top center';
    banner.style.zIndex = '5';
    banner.style.borderRadius = '0 0 5px 5px';
    banner.style.boxShadow = '0 0 10px rgba(147, 112, 219, 0.5)';
    
    // Add Arendelle crest
    const crest = document.createElement('div');
    crest.style.width = '20px';
    crest.style.height = '20px';
    crest.style.position = 'absolute';
    crest.style.left = '50%';
    crest.style.top = '50%';
    crest.style.transform = 'translate(-50%, -50%)';
    crest.style.backgroundImage = "url('/images/arendelle-crest.png')";
    crest.style.backgroundSize = 'contain';
    crest.style.backgroundRepeat = 'no-repeat';
    crest.style.opacity = '0';
    
    banner.appendChild(crest);
    mapContainer.appendChild(banner);
    
    gsap.to(banner, {
      height: '60px',
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        gsap.to(crest, {
          opacity: 1,
          duration: 0.5
        });
        
        setTimeout(() => {
          gsap.to(banner, {
            height: 0,
            duration: 0.5,
            delay: 1.5,
            onComplete: () => {
              if (mapContainer.contains(banner)) {
                mapContainer.removeChild(banner);
              }
            }
          });
        }, 2000);
      }
    });
  };
  
  const createSnowFlurry = (location) => {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    for (let i = 0; i < 40; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snow-flurry');
      
      const size = Math.random() * 5 + 2;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.position = 'absolute';
      snowflake.style.left = `${location.x}%`;
      snowflake.style.top = `${location.y}%`;
      snowflake.style.background = 'white';
      snowflake.style.borderRadius = '50%';
      snowflake.style.opacity = '0';
      snowflake.style.zIndex = '10';
      
      mapContainer.appendChild(snowflake);
      
      gsap.to(snowflake, {
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 2 + 1,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(snowflake, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              if (mapContainer.contains(snowflake)) {
                mapContainer.removeChild(snowflake);
              }
            }
          });
        }
      });
    }
  };
  
  const handleMapZoom = () => {
    setMapZoomed(!mapZoomed);
    
    if (!mapZoomed) {
      // Zoom in
      gsap.to(mapRef.current, {
        scale: 1.5,
        duration: 1,
        ease: "power2.out"
      });
      
      // Hide markers temporarily
      gsap.to(markersRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        onComplete: () => {
          // Show markers again with new positions
          gsap.to(markersRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.5
          });
        }
      });
    } else {
      // Zoom out
      gsap.to(mapRef.current, {
        scale: 1,
        duration: 1,
        ease: "power2.out"
      });
      
      // Reset markers
      gsap.to(markersRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 0.5
      });
    }
  };
  
  return (
    <section className="map-section" id="map" ref={sectionRef}>
      <div className="map-bg-decoration"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="section-header mb-12">
          <Map className="section-icon" size={40} />
          <h2 className="map-title text-4xl text-center mb-2">Explore Arendelle</h2>
          <div className="header-underline"></div>
          <p className="text-center text-xl mt-4 max-w-2xl mx-auto">
            Discover the magical locations from the world of Frozen
          </p>
        </div>
        
        <div className="map-controls">
          <button 
            className="zoom-button"
            onClick={handleMapZoom}
          >
            {mapZoomed ? 'Zoom Out' : 'Zoom In'}
          </button>
          
          <div className="compass">
            <div className="compass-face">
              <div className="compass-needle">
                <div className="needle-north"></div>
                <div className="needle-south"></div>
              </div>
              <div className="compass-center"></div>
              <div className="compass-marking north">N</div>
              <div className="compass-marking east">E</div>
              <div className="compass-marking south">S</div>
              <div className="compass-marking west">W</div>
            </div>
          </div>
        </div>
        
        <div className="map-wrapper">
          <div 
            className="map-container" 
            ref={mapRef}
          >
            <div className="map-image" style={{ backgroundImage: 'url(/images/arendelle-map.jpg)' }}></div>
            <div className="map-overlay"></div>
            
            {locations.map((location, index) => (
              <div 
                key={index}
                ref={el => markersRef.current[index] = el}
                className="map-marker"
                style={{ 
                  left: `${location.x}%`, 
                  top: `${location.y}%`,
                  backgroundColor: location.color
                }}
                onMouseEnter={() => handleLocationHover(location)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                <div className="marker-icon">
                  {location.icon}
                </div>
                <div className="marker-pulse" style={{ borderColor: location.color }}></div>
              </div>
            ))}
            
            {activeLocation && (
              <div 
                className="location-popup"
                style={{ 
                  left: `${activeLocation.x}%`, 
                  top: `${activeLocation.y + 5}%`
                }}
              >
                <div className="popup-header" style={{ backgroundColor: activeLocation.color + '33' }}>
                  <div className="popup-icon" style={{ color: activeLocation.color }}>
                    {activeLocation.icon}
                  </div>
                  <h3>{activeLocation.name}</h3>
                </div>
                <div className="popup-body">
                  <p>{activeLocation.description}</p>
                </div>
                <div className="popup-arrow" style={{ borderTopColor: activeLocation.color + '33' }}></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="map-legend">
          <h3 className="legend-title">Map Legend</h3>
          <div className="legend-items">
            {locations.map((location, index) => (
              <div key={index} className="legend-item">
                <div className="legend-marker" style={{ backgroundColor: location.color }}>
                  {location.icon}
                </div>
                <span>{location.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}