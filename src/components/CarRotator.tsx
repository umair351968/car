import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface CarRotatorProps {
  carImages: string[];
  carName: string;
  className?: string;
}

const CarRotator: React.FC<CarRotatorProps> = ({ carImages, carName, className = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateX = useTransform(x, [-200, 200], [0, carImages.length - 1]);

  useEffect(() => {
    const unsubscribe = rotateX.on('change', (value) => {
      const index = Math.round(value);
      if (index >= 0 && index < carImages.length) {
        setCurrentImageIndex(index);
      }
    });

    return unsubscribe;
  }, [rotateX, carImages.length]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : carImages.length - 1));
    } else {
      setCurrentImageIndex(prev => (prev < carImages.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Car Display */}
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="relative cursor-grab active:cursor-grabbing"
        style={{ x }}
      >
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Car image */}
          <motion.img
            src={carImages[currentImageIndex]}
            alt={`${carName} - View ${currentImageIndex + 1}`}
            className="relative z-10 w-full max-w-md h-auto rounded-lg shadow-2xl"
            animate={{ scale: isDragging ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Rotation indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
            {currentImageIndex + 1} / {carImages.length}
          </div>
        </div>
      </motion.div>

      {/* Navigation arrows */}
      <button
        onClick={() => handleClick('left')}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => handleClick('right')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Instructions */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-sm">
        <p>Drag left/right to rotate • Click arrows for step rotation</p>
      </div>
    </div>
  );
};

export default CarRotator; 