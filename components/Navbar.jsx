"use client";

import { useState, useEffect, useRef } from 'react';
import { Snowflake, Menu, X, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  
  const navItems = [
    { 
      name: 'Home', 
      link: '#hero' 
    },
    { 
      name: 'Characters', 
      link: '#characters' 
    },
    { 
      name: 'Songs', 
      link: '#songs' 
    },
    { 
      name: 'Explore', 
      link: '#map',
      dropdown: [
        { name: 'Map', link: '#map' },
        { name: 'Locations', link: '#locations' },
        { name: 'Kingdom', link: '#kingdom' }
      ]
    },
    { 
      name: 'Games', 
      link: '#games' 
    },
    { 
      name: 'Gallery', 
      link: '#gallery' 
    }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Create snowflake effect in navbar
    createNavSnowflakes();
    
    // Add frost corners
    createFrostCorners();
    
    // Animate logo on load
    gsap.fromTo(
      '.logo-text',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    
    // Staggered animation for nav items
    gsap.fromTo(
      '.nav-item, .dropdown-trigger',
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3
      }
    );
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const createNavSnowflakes = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    for (let i = 0; i < 10; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('nav-snowflake');
      
      const size = Math.random() * 8 + 4;
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
      
      navbar.appendChild(snowflake);
      
      gsap.to(snowflake, {
        x: `+=${Math.random() * 50 - 25}`,
        y: `+=${Math.random() * 30 - 15}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  };
  
  const createFrostCorners = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Create frost corners
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    
    positions.forEach(position => {
      const frost = document.createElement('div');
      frost.classList.add('nav-frost-corner', position);
      navbar.appendChild(frost);
    });
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
    
    // Add animation for mobile menu
    if (!isMenuOpen) {
      // Opening animation
      gsap.fromTo(
        '.navbar-links.open .nav-item, .navbar-links.open .dropdown-trigger',
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  };
  
  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
      
      // Animate dropdown items
      setTimeout(() => {
        gsap.fromTo(
          '.dropdown-menu.active .dropdown-item',
          { opacity: 0, y: -10 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.3, 
            stagger: 0.1,
            ease: 'power3.out'
          }
        );
      }, 100);
    }
  };
  
  const handleNavLinkClick = (link) => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    
    // Create snowburst effect on click
    createSnowburst(event);
    
    // Smooth scroll to section
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const createSnowburst = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    
    for (let i = 0; i < 15; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('nav-snowburst');
      
      const size = Math.random() * 6 + 2;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.position = 'fixed';
      snowflake.style.top = `${y}px`;
      snowflake.style.left = `${x}px`;
      snowflake.style.background = 'white';
      snowflake.style.borderRadius = '50%';
      snowflake.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
      snowflake.style.zIndex = '1000';
      snowflake.style.pointerEvents = 'none';
      
      document.body.appendChild(snowflake);
      
      gsap.to(snowflake, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
          if (document.body.contains(snowflake)) {
            document.body.removeChild(snowflake);
          }
        }
      });
    }
  };
  
  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} ref={navRef}>
      <div className="navbar-frost"></div>
      <div className="container mx-auto px-4 py-4">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Snowflake className="logo-icon" size={24} />
            <span className="logo-text">Frozen</span>
            <div className="logo-sparkle"></div>
          </div>
          
          <div className="navbar-mobile-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
          
          <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
            {navItems.map((item, index) => (
              <div key={index} className="nav-item-container">
                {item.dropdown ? (
                  <>
                    <div 
                      className="nav-item dropdown-trigger"
                      onClick={() => toggleDropdown(index)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        size={16} 
                        className={`dropdown-arrow ${activeDropdown === index ? 'rotated' : ''}`}
                      />
                    </div>
                    <div className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
                      {item.dropdown.map((dropItem, dropIndex) => (
                        <div 
                          key={dropIndex} 
                          className="dropdown-item"
                          onClick={(e) => handleNavLinkClick(dropItem.link, e)}
                        >
                          {dropItem.name}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div 
                    className="nav-item"
                    onClick={(e) => handleNavLinkClick(item.link, e)}
                  >
                    {item.name}
                  </div>
                )}
              </div>
            ))}
            
            <div className="nav-cta">
              <button className="cta-button">
                Watch Now
                <span className="button-frost"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}