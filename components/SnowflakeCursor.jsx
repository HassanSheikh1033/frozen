"use client";

import { useEffect, useState } from 'react';

export default function SnowflakeCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);
  
  return (
    <div 
      className="snowflake-cursor" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        backgroundImage: `url('/images/snowflake.svg')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
}