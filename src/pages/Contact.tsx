import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-8">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">Contact Us</h2>
      <p className="text-lg text-blue-600 max-w-xl text-center mb-6">
        Have questions or need assistance? Reach out to our team and we’ll get back to you as soon as possible.
      </p>
      {/* Contact form or details can be added here */}
      <div className="text-blue-400">Contact form coming soon...</div>
    </div>
  );
};

export default Contact; 