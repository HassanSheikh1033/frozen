"use client";

import { useEffect, useRef } from 'react';
import { Snowflake, Heart, Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Footer() {
  const footerRef = useRef(null);
  
  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Create footer snowflakes
    createFooterSnowflakes();
    
    // Animate footer elements
    gsap.fromTo(
      '.footer-title',
      { y: -30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%'
        }
      }
    );
    
    gsap.fromTo(
      '.footer-column',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%'
        }
      }
    );
    
    // Animate ice castle silhouette
    gsap.fromTo(
      '.ice-castle',
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%'
        }
      }
    );
  }, []);
  
  const createFooterSnowflakes = () => {
    if (!footerRef.current) return;
    
    const footer = footerRef.current;
    
    for (let i = 0; i < 30; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('footer-snowflake');
      
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
      
      footer.appendChild(snowflake);
      
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
  
  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-bg-decoration"></div>
      <div className="ice-castle"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="footer-header">
          <div className="footer-logo">
            <Snowflake className="logo-icon" size={32} />
            <h2 className="footer-title">Frozen</h2>
          </div>
          <div className="footer-tagline">
            Journey into a world of ice and wonder
          </div>
        </div>
        
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="column-title">Navigation</h3>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#characters">Characters</a></li>
              <li><a href="#songs">Songs</a></li>
              <li><a href="#map">Explore</a></li>
              <li><a href="#games">Games</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="column-title">Discover</h3>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#movies">Movies</a></li>
              <li><a href="#shorts">Shorts</a></li>
              <li><a href="#music">Music</a></li>
              <li><a href="#merchandise">Merchandise</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="column-title">Connect</h3>
            <div className="social-links">
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Youtube size={20} />
              </a>
            </div>
            
            <div className="newsletter">
              <h3 className="newsletter-title">Stay Updated</h3>
              <p className="newsletter-text">Subscribe to our newsletter</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email" className="newsletter-input" />
                <button className="newsletter-button">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Disney. All Rights Reserved.
          </div>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="made-with">
            Made with <Heart size={14} className="heart-icon" /> by Hassan Farooq
          </div>
        </div>
      </div>
      
      <div className="footer-snow-border"></div>
    </footer>
  );
}