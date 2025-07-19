import React from 'react';
// import { Canvas } from '@react-three/fiber'; // Uncomment for 3D model
// import { OrbitControls } from '@react-three/drei';

const car = {
  name: 'Tesla Model S',
  image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=900&q=80',
  price: 120,
  brand: 'Tesla',
  location: 'New York',
  year: 2023,
  color: 'Red',
  seats: 5,
  transmission: 'Automatic',
  fuel: 'Electric',
  description: 'Experience the future of driving with the Tesla Model S. Premium comfort, advanced technology, and zero emissions.',
};

const CarDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col md:flex-row gap-10 animate-fade-in">
        {/* Featured Image or 3D Viewer */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <img src={car.image} alt={car.name} className="w-full max-w-md rounded-2xl shadow-lg mb-4" />
          {/* <Canvas style={{ width: 400, height: 300 }}>
            <ambientLight intensity={0.5} />
            <OrbitControls />
            // Add 3D model here
          </Canvas> */}
          <span className="text-gray-400 text-xs">3D viewer coming soon</span>
        </div>
        {/* Car Specs and Booking */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">{car.name}</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{car.brand}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{car.location}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{car.year}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{car.color}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{car.seats} Seats</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{car.transmission}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{car.fuel}</span>
            </div>
            <p className="text-gray-700 mb-6 transition-opacity duration-700 ease-in-out">{car.description}</p>
          </div>
          <div className="flex items-center justify-between mt-6">
            <span className="text-2xl font-bold text-blue-800">${car.price}/day</span>
            <button className="bg-blue-700 hover:bg-blue-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail; 