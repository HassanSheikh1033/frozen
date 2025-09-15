"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Music, Play, Pause, Snowflake } from 'lucide-react';

export default function SongsSection() {
  const [activeAudio, setActiveAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSongIndex, setActiveSongIndex] = useState(null);
  const sectionRef = useRef(null);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const waveformRefs = useRef([]);
  
  const songs = [
    {
      title: "Let It Go",
      artist: "Idina Menzel",
      image: "/letitgo.jpeg",
      audio: "",
      color: "#a5f2f3",
      lyrics: "The snow glows white on the mountain tonight, not a footprint to be seen...",
      description: "The iconic anthem of self-acceptance and freedom"
    },
    {
      title: "Do You Want to Build a Snowman?",
      artist: "Kristen Bell",
      image: "/snowman.jpg",
      audio: "",
      color: "#ff9caa",
      lyrics: "Do you want to build a snowman? Come on, let's go and play...",
      description: "A heartfelt plea for connection and togetherness"
    },
    {
      title: "Into the Unknown",
      artist: "Idina Menzel",
      image: "/intoknow.jpg",
      audio: "",
      color: "#9370db",
      lyrics: "Into the unknown, into the unknown, into the unknown...",
      description: "A powerful call to adventure and self-discovery"
    }
  ];
  
  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Section entrance animation
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
    
    // Create floating music notes
    createMusicNotes();
    
    // Animate song cards
    gsap.fromTo(
      '.song-card',
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      }
    );
    
    return () => {
      if (activeAudio) {
        activeAudio.pause();
      }
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);
  
  const createMusicNotes = () => {
    if (!sectionRef.current) return;
    
    const container = sectionRef.current;
    
    for (let i = 0; i < 15; i++) {
      const note = document.createElement('div');
      note.classList.add('floating-music-note');
      
      const size = Math.random() * 20 + 10;
      note.style.width = `${size}px`;
      note.style.height = `${size}px`;
      note.style.position = 'absolute';
      note.style.top = `${Math.random() * 100}%`;
      note.style.left = `${Math.random() * 100}%`;
      note.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      note.style.zIndex = '1';
      
      // Create SVG music note
      note.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      `;
      
      container.appendChild(note);
      
      gsap.to(note, {
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
  
  const playAudio = (index) => {
    const song = songs[index];
    
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }
    
    if (activeSongIndex === index && isPlaying) {
      setIsPlaying(false);
      setActiveSongIndex(null);
      return;
    }
    
    const audio = new Audio(song.audio);
    setActiveAudio(audio);
    setActiveSongIndex(index);
    setIsPlaying(true);
    
    audio.play();
    
    // Update progress bar
    audioRef.current = audio;
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setActiveSongIndex(null);
    });
    
    // Create snowflake burst animation
    createSnowburstEffect(index);
    
    // Animate active waveform
    animateActiveWaveform(index);
  };
  
  const updateProgress = () => {
    if (audioRef.current && progressRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      progressRef.current.style.width = `${progress}%`;
    }
  };
  
  const createSnowburstEffect = (index) => {
    const songCard = document.querySelector(`.song-card[data-song="${index}"]`);
    if (!songCard) return;
    
    const rect = songCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const burst = document.createElement('div');
    burst.style.position = 'fixed';
    burst.style.left = `${centerX}px`;
    burst.style.top = `${centerY}px`;
    burst.style.zIndex = '100';
    document.body.appendChild(burst);
    
    for (let i = 0; i < 30; i++) {
      const snowflake = document.createElement('div');
      snowflake.style.width = `${Math.random() * 10 + 5}px`;
      snowflake.style.height = snowflake.style.width;
      snowflake.style.background = songs[index].color || 'white';
      snowflake.style.borderRadius = '50%';
      snowflake.style.position = 'absolute';
      snowflake.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      snowflake.style.boxShadow = `0 0 10px ${songs[index].color || 'white'}`;
      snowflake.style.transform = 'translate(-50%, -50%)';
      
      burst.appendChild(snowflake);
      
      gsap.to(snowflake, {
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        opacity: 0,
        duration: 2,
        ease: 'power3.out'
      });
    }
    
    setTimeout(() => {
      if (document.body.contains(burst)) {
        document.body.removeChild(burst);
      }
    }, 2000);
  };
  
  const animateActiveWaveform = (index) => {
    // Reset all waveforms
    waveformRefs.current.forEach((waveform, i) => {
      if (i !== index && waveform) {
        const bars = waveform.querySelectorAll('.waveform-bar');
        gsap.killTweensOf(bars);
        gsap.to(bars, {
          height: '10px',
          duration: 0.5
        });
      }
    });
    
    // Animate active waveform
    if (waveformRefs.current[index]) {
      const bars = waveformRefs.current[index].querySelectorAll('.waveform-bar');
      
      bars.forEach(bar => {
        gsap.to(bar, {
          height: () => `${Math.random() * 50 + 10}px`,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      });
    }
  };
  
  return (
    <section className="songs-section" id="songs" ref={sectionRef}>
      <div className="songs-bg-decoration"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="section-header mb-12">
          <Music className="section-icon" size={40} />
          <h2 className="section-title text-4xl text-center mb-2">Magical Songs & Moments</h2>
          <div className="header-underline"></div>
          <p className="text-center text-xl mt-4 max-w-2xl mx-auto">
            Experience the enchanting melodies that bring Arendelle to life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {songs.map((song, index) => (
            <div 
              key={index} 
              className={`song-card ${activeSongIndex === index ? 'active-song' : ''}`}
              data-song={index}
              style={{ '--song-color': song.color }}
            >
              <div className="song-card-inner">
                <div className="song-image-container">
                  <img 
                    src={song.image} 
                    alt={song.title} 
                    className="song-image"
                  />
                  <div className="song-overlay"></div>
                  <button 
                    className="play-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(index);
                    }}
                  >
                    {activeSongIndex === index && isPlaying ? (
                      <Pause size={24} />
                    ) : (
                      <Play size={24} />
                    )}
                  </button>
                </div>
                
                <div className="song-info">
                  <h3 className="song-title">{song.title}</h3>
                  <p className="song-artist">{song.artist}</p>
                  <p className="song-description">{song.description}</p>
                </div>
                
                <div className="song-progress">
                  <div 
                    className="progress-bar"
                    style={{ 
                      display: activeSongIndex === index ? 'block' : 'none'
                    }}
                  >
                    <div 
                      className="progress-fill"
                      ref={activeSongIndex === index ? progressRef : null}
                    ></div>
                  </div>
                </div>
                
                <div 
                  className="waveform"
                  ref={el => waveformRefs.current[index] = el}
                >
                  {[...Array(30)].map((_, i) => (
                    <div 
                      key={i} 
                      className="waveform-bar" 
                      style={{ 
                        height: activeSongIndex === index && isPlaying ? `${Math.random() * 40 + 10}px` : '10px',
                        backgroundColor: activeSongIndex === index ? song.color : 'rgba(255, 255, 255, 0.5)'
                      }}
                    ></div>
                  ))}
                </div>
                
                {activeSongIndex === index && (
                  <div className="song-lyrics">
                    <Music size={16} className="lyrics-icon" />
                    <p>{song.lyrics}</p>
                  </div>
                )}
                
                <div className="song-card-frost"></div>
                <div className="song-card-shine"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="songs-footer">
          <Snowflake size={20} className="footer-icon" />
          <span>Listen to the full soundtrack on your favorite music platform</span>
          <Snowflake size={20} className="footer-icon" />
        </div>
      </div>
    </section>
  );
}