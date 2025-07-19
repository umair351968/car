import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">About CarGo Rentals</h2>
      <p className="text-lg text-gray-600 max-w-2xl text-center">
        CarGo Rentals is dedicated to providing a modern, seamless, and enjoyable car rental experience. Our platform offers real-time car availability, 3D previews, and a wide selection of vehicles to suit every need and budget.
      </p>
    </div>
  );
};

export default About; 