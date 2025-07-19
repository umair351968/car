import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const carData = [
  {
    id: 1,
    name: 'Tesla Model S',
    brand: 'Tesla',
    location: 'New York',
    price: 120,
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'BMW i8',
    brand: 'BMW',
    location: 'Los Angeles',
    price: 150,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Audi R8',
    brand: 'Audi',
    location: 'Chicago',
    price: 200,
    image: 'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Mercedes C-Class',
    brand: 'Mercedes',
    location: 'Miami',
    price: 110,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Toyota Supra',
    brand: 'Toyota',
    location: 'San Francisco',
    price: 90,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
  },
];

const brands = ['All', 'Tesla', 'BMW', 'Audi', 'Mercedes', 'Toyota'];
const locations = ['All', 'New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco'];

const Cars: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [maxPrice, setMaxPrice] = useState(250);

  const filteredCars = carData.filter(car =>
    (selectedBrand === 'All' || car.brand === selectedBrand) &&
    (selectedLocation === 'All' || car.location === selectedLocation) &&
    car.price <= maxPrice
  );

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Cars</h2>
      {/* Filter UI */}
      <div className="flex flex-wrap gap-4 mb-8 items-center bg-gray-50 p-4 rounded-xl shadow-sm">
        <select
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={selectedBrand}
          onChange={e => setSelectedBrand(e.target.value)}
        >
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
        >
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <label htmlFor="price" className="text-gray-700">Max Price:</label>
          <input
            id="price"
            type="range"
            min={50}
            max={250}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="accent-blue-700"
          />
          <span className="font-semibold text-blue-700">${maxPrice}</span>
        </div>
      </div>
      {/* Grid for desktop, Swiper for mobile */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map(car => (
          <div
            key={car.id}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <img src={car.image} alt={car.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-700 font-semibold">{car.brand}</span>
                <span className="text-gray-500">{car.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-900">${car.price}/day</span>
                <Link to={`/cars/${car.id}`} className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-medium transition-all">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Swiper for mobile */}
      <div className="md:hidden">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1}
          className="rounded-2xl"
        >
          {filteredCars.map(car => (
            <SwiperSlide key={car.id}>
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <img src={car.image} alt={car.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-700 font-semibold">{car.brand}</span>
                    <span className="text-gray-500">{car.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-900">${car.price}/day</span>
                    <Link to={`/cars/${car.id}`} className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-medium transition-all">View</Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Cars; 