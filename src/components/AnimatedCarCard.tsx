import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface CarCardProps {
  car: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    year: number;
  };
  onClick?: () => void;
}

const AnimatedCarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  // Create motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform motion values for visual effects
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  const scale = useTransform(mouseX, [-300, 300], [0.95, 1.05]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Car Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Car Info */}
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {car.name}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {car.brand} • {car.year}
        </motion.p>
        
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-2xl font-bold text-blue-600">
            ${car.price.toLocaleString()}
          </span>
          
          <motion.button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </motion.div>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-blue-600/10 rounded-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default AnimatedCarCard; 