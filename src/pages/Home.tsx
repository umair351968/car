import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

// 360-degree car images for the rotator
const mercedesImages = [
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555652736-e92021d28a10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF1ZGl8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1657976763238-baab2fee9c53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lcmNlZGVzJTIwYmVueiUyMHMlMjBjbGFzcyUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1677982704997-7cd9f5cc55ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHJvbGxzJTIwcm95Y2UlMjBwaGFudG9tJTIwY2FyfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
];

const featuredCars = [
  {
    name: 'Mercedes-Benz S-Class',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80',
    price: '$350/day',
    category: 'Luxury Sedan',
    features: ['V8 Engine', 'Premium Interior', 'Advanced Safety']
  },
  {
    name: 'BMW 7 Series',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
    price: '$320/day',
    category: 'Luxury Sedan',
    features: ['TwinPower Turbo', 'Executive Seating', 'Gesture Control']
  },
  {
    name: 'Audi A8',
    image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&w=900&q=80',
    price: '$300/day',
    category: 'Luxury Sedan',
    features: ['Quattro AWD', 'Virtual Cockpit', 'Massage Seats']
  },
  {
    name: 'Range Rover Sport',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80',
    price: '$400/day',
    category: 'SUV',
    features: ['Terrain Response', 'Luxury Interior', 'Off-road Capable']
  },
  {
    name: 'Porsche 911',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80',
    price: '$500/day',
    category: 'Sports Car',
    features: ['Flat-6 Engine', 'Sport Chrono', 'Carbon Fiber']
  },
  {
    name: 'Bentley Continental GT',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
    price: '$600/day',
    category: 'Luxury GT',
    features: ['W12 Engine', 'Handcrafted Interior', 'Diamond Knurling']
  },
  {
    name: 'Rolls-Royce Phantom',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80',
    price: '$800/day',
    category: 'Ultra Luxury',
    features: ['V12 Engine', 'Starlight Headliner', 'Bespoke Interior']
  },
  {
    name: 'Ferrari F8 Tributo',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
    price: '$700/day',
    category: 'Supercar',
    features: ['Twin-Turbo V8', 'Carbon Fiber', 'Racing Heritage']
  }
];

const luxuryServices = [
  {
    name: 'Airport Transfer',
    icon: '✈️',
    description: 'Professional airport pickup and drop-off with flight monitoring',
    price: 'From $150'
  },
  {
    name: 'Wedding Service',
    icon: '💒',
    description: 'Elegant transportation for your special day',
    price: 'From $300'
  },
  {
    name: 'Corporate Events',
    icon: '🏢',
    description: 'Executive transportation for business meetings',
    price: 'From $200/hour'
  },
  {
    name: 'City Tours',
    icon: '🗺️',
    description: 'Guided tours with knowledgeable chauffeurs',
    price: 'From $180/hour'
  },
  {
    name: 'VIP Concierge',
    icon: '👑',
    description: 'Personalized VIP service with dedicated concierge',
    price: 'From $500'
  },
  {
    name: 'Long Distance',
    icon: '🛣️',
    description: 'Comfortable long-distance travel with amenities',
    price: 'From $2.50/mile'
  }
];

const specialPackages = [
  {
    title: 'Weekend Getaway Package',
    description: 'Enjoy a luxury weekend with our premium fleet. Includes 48-hour rental, professional chauffeur, and concierge service.',
    price: '$899',
    originalPrice: '$1,200',
    badge: 'LIMITED TIME'
  },
  {
    title: 'Wedding Package',
    description: 'Make your special day unforgettable with our wedding transportation package. Includes multiple vehicles and professional coordination.',
    price: '$1,500',
    badge: 'POPULAR'
  },
  {
    title: 'Corporate Fleet Package',
    description: 'Complete corporate transportation solution with multiple vehicles, dedicated account manager, and priority booking.',
    price: '$2,500/month',
    badge: 'NEW'
  }
];

const Home: React.FC = () => {
  const [serviceType, setServiceType] = useState<'daily' | 'hourly'>('daily');
  const [bookingData, setBookingData] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: ''
  });
  const [currentCarImage, setCurrentCarImage] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextCarImage = () => {
    setCurrentCarImage((prev) => (prev + 1) % mercedesImages.length);
  };

  const prevCarImage = () => {
    setCurrentCarImage((prev) => (prev - 1 + mercedesImages.length) % mercedesImages.length);
  };

  const handleCarClick = (car: any) => {
    setSelectedCar(car);
  };

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
  };

  const handlePackageClick = (packageItem: any) => {
    setSelectedPackage(packageItem);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setSelectedService(null);
    setSelectedPackage(null);
  };

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setBookingData({
      pickup: '',
      dropoff: '',
      date: '',
      time: ''
    });
  };

  // Scroll effect for header
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inline styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #000000 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative' as 'relative',
      zIndex: 1
    },
    section: {
      padding: '4rem 1.5rem'
    },
    sectionContainer: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      marginBottom: '1rem',
      color: 'white'
    },
    sectionSubtitle: {
      fontSize: '1.125rem',
      color: '#9ca3af',
      textAlign: 'center' as const,
      marginBottom: '3rem',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '3rem'
    },
    card: {
      background: 'rgba(31, 41, 55, 0.5)',
      backdropFilter: 'blur(8px)',
      borderRadius: '0.5rem',
      padding: '2rem',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      transition: 'all 0.3s ease'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: 'white'
    },
    cardText: {
      color: '#d1d5db',
      lineHeight: 1.6,
      marginBottom: '1.5rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginTop: '3rem'
    },
    statCard: {
      textAlign: 'center' as const,
      padding: '2rem',
      background: 'rgba(31, 41, 55, 0.3)',
      borderRadius: '0.5rem',
      border: '1px solid rgba(75, 85, 99, 0.3)'
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#60a5fa',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#9ca3af',
      fontSize: '1rem'
    },
    testimonialCard: {
      background: 'rgba(31, 41, 55, 0.5)',
      backdropFilter: 'blur(8px)',
      borderRadius: '0.5rem',
      padding: '2rem',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      textAlign: 'center' as const
    },
    testimonialText: {
      fontSize: '1.125rem',
      color: '#d1d5db',
      fontStyle: 'italic',
      marginBottom: '1.5rem',
      lineHeight: 1.6
    },
    testimonialAuthor: {
      color: '#60a5fa',
      fontWeight: 'bold',
      fontSize: '1rem'
    },
    ctaSection: {
      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
      padding: '4rem 1.5rem',
      textAlign: 'center' as const
    },
    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: 'white'
    },
    ctaText: {
      fontSize: '1.125rem',
      color: '#d1d5db',
      marginBottom: '2rem',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '0.5rem',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.125rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
    },
    header: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0.75rem 2rem',
      background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(96, 165, 250, 0.2)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative' as const
    },
    contactInfo: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: 'white'
    },
    logo: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    logoIcon: {
      width: '2rem',
      height: '2rem',
      background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
      borderRadius: '50%',
      marginBottom: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(96, 165, 250, 0.4)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: '900',
      letterSpacing: '0.15em',
      color: 'white',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      background: 'linear-gradient(135deg, #ffffff, #e5e7eb)',
      WebkitBackgroundClip: 'text' as const,
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '2.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      position: 'relative' as const
    },
    navLink: {
      color: '#d1d5db',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      padding: '0.5rem 0',
      fontWeight: 500,
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const
    },
    navButton: {
      background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
      color: 'white',
      padding: '0.625rem 1.5rem',
      borderRadius: '2rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: 'bold',
      fontSize: '0.875rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    heroSection: {
      position: 'relative' as const,
      padding: '8rem 1.5rem 3rem 1.5rem'
    },
    heroContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '3rem',
      alignItems: 'center'
    },
    heading: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 'bold',
      lineHeight: 1.2,
      marginBottom: '1.5rem'
    },
    headingAccent: {
      color: '#60a5fa'
    },
    subheading: {
      fontSize: '1.125rem',
      color: '#d1d5db',
      lineHeight: 1.6
    },
    carRotator: {
      display: 'flex',
      justifyContent: 'center',
      position: 'relative' as const
    },
    carContainer: {
      position: 'relative' as const,
      width: '100%',
      maxWidth: '400px'
    },
    carGlow: {
      position: 'absolute' as const,
      inset: 0,
      background: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
      borderRadius: '50%',
      filter: 'blur(3rem)',
      animation: 'pulse 2s infinite'
    },
    carImage: {
      position: 'relative' as const,
      zIndex: 10,
      width: '100%',
      height: 'auto',
      borderRadius: '0.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      transition: 'all 0.3s ease'
    },
    navArrow: {
      position: 'absolute' as const,
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      borderRadius: '50%',
      padding: '0.75rem',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 20
    },
    navArrowLeft: {
      left: '1rem'
    },
    navArrowRight: {
      right: '1rem'
    },
    rotationIndicator: {
      position: 'absolute' as const,
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      borderRadius: '9999px',
      padding: '0.5rem 1rem',
      color: 'white',
      fontSize: '0.875rem',
      zIndex: 20
    },
    instructions: {
      position: 'absolute' as const,
      bottom: '-2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center' as const,
      color: '#9ca3af',
      fontSize: '0.875rem'
    },
    featuresCard: {
      background: 'rgba(31, 41, 55, 0.5)',
      backdropFilter: 'blur(8px)',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      border: '1px solid rgba(75, 85, 99, 0.5)'
    },
    featuresTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: 'white'
    },
    featuresList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.75rem',
      color: '#d1d5db'
    },
    featureDot: {
      width: '0.5rem',
      height: '0.5rem',
      background: '#60a5fa',
      borderRadius: '50%',
      marginRight: '0.75rem'
    },
    bookingSection: {
      padding: '2rem 1.5rem',
      background: 'rgba(31, 41, 55, 0.3)'
    },
    bookingContainer: {
      maxWidth: '1152px',
      margin: '0 auto'
    },
    bookingCard: {
      background: 'rgba(17, 24, 39, 0.5)',
      backdropFilter: 'blur(8px)',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      border: '1px solid rgba(75, 85, 99, 0.5)'
    },
    serviceToggles: {
      display: 'flex',
      marginBottom: '1.5rem'
    },
    serviceToggle: {
      padding: '0.75rem 1.5rem',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer'
    },
    serviceToggleActive: {
      background: '#4b5563',
      color: 'white'
    },
    serviceToggleInactive: {
      background: '#374151',
      color: '#d1d5db'
    },
    serviceToggleLeft: {
      borderTopLeftRadius: '0.5rem',
      borderBottomLeftRadius: '0.5rem'
    },
    serviceToggleRight: {
      borderTopRightRadius: '0.5rem',
      borderBottomRightRadius: '0.5rem'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    inputContainer: {
      position: 'relative' as const
    },
    input: {
      width: '100%',
      padding: '0.75rem 2.5rem 0.75rem 1rem',
      background: '#374151',
      border: '1px solid #4b5563',
      borderRadius: '0.5rem',
      color: 'white',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box' as const
    },
    inputPlaceholder: {
      color: '#9ca3af'
    },
    inputIcon: {
      position: 'absolute' as const,
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      fontSize: '1.125rem',
      pointerEvents: 'none' as const,
      zIndex: 10
    },
    bookButton: {
      background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
      color: 'white',
      padding: '0.75rem 2rem',
      borderRadius: '0.5rem',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
    },
    featuredSection: {
      padding: '4rem 1.5rem'
    },
    featuredContainer: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    featuredTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      marginBottom: '3rem',
      color: 'white'
    },
    carCard: {
      background: 'rgba(31, 41, 55, 0.5)',
      backdropFilter: 'blur(8px)',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      transition: 'all 0.3s ease'
    },
    carCardImage: {
      width: '100%',
      height: '12rem',
      objectFit: 'cover' as const
    },
    carCardContent: {
      padding: '1.5rem'
    },
    carCardTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: 'white'
    },
    carCardCategory: {
      color: '#9ca3af',
      fontSize: '0.875rem',
      marginBottom: '0.75rem'
    },
    carCardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    carCardPrice: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#60a5fa'
    },
    selectButton: {
      background: '#2563eb',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontWeight: 500,
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    mobileMenuButton: {
      display: 'none',
      background: 'rgba(96, 165, 250, 0.1)',
      border: '1px solid rgba(96, 165, 250, 0.3)',
      color: 'white',
      fontSize: '1.125rem',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)'
    },
    mobileMenu: {
      display: 'none',
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      right: 0,
      background: 'rgba(17, 24, 39, 0.98)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
      padding: '1rem 0'
    },
    mobileMenuOpen: {
      display: 'block'
    },
    mobileNavLink: {
      display: 'block',
      color: 'white',
      textDecoration: 'none',
      padding: '1rem 1.5rem',
      borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
      transition: 'all 0.3s ease'
    },
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    },
    modalContent: {
      background: 'rgba(31, 41, 55, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '0.5rem',
      padding: '2rem',
      maxWidth: '500px',
      width: '100%',
      maxHeight: '80vh',
      overflow: 'auto',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      position: 'relative' as const
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(75, 85, 99, 0.3)'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.25rem',
      transition: 'all 0.3s ease'
    },
    modalImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover' as const,
      borderRadius: '0.5rem',
      marginBottom: '1rem'
    },
    modalDetails: {
      color: '#d1d5db',
      lineHeight: 1.6,
      marginBottom: '1rem'
    },
    modalFeatures: {
      listStyle: 'none',
      padding: 0,
      margin: '1rem 0'
    },
    modalFeature: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem',
      color: '#d1d5db'
    },
    modalFeatureDot: {
      width: '0.5rem',
      height: '0.5rem',
      background: '#60a5fa',
      borderRadius: '50%',
      marginRight: '0.75rem'
    },
    modalPrice: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#60a5fa',
      marginBottom: '1rem'
    },
    modalButton: {
      background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%'
    },
    clickableCard: {
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    bookingFormModal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    },
    bookingFormContent: {
      background: 'rgba(31, 41, 55, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1rem',
      padding: '2.5rem',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      border: '1px solid rgba(96, 165, 250, 0.3)',
      position: 'relative' as const,
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
    },
    bookingFormHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(75, 85, 99, 0.3)'
    },
    bookingFormTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      margin: 0,
      background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
      WebkitBackgroundClip: 'text' as const,
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    bookingFormClose: {
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.25rem',
      transition: 'all 0.3s ease',
      width: '2.5rem',
      height: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bookingFormGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    bookingFormInput: {
      width: '100%',
      padding: '1rem 1rem 1rem 3rem',
      background: 'rgba(55, 65, 81, 0.5)',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      borderRadius: '0.75rem',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box' as const
    },
    bookingFormInputContainer: {
      position: 'relative' as const
    },
    bookingFormInputIcon: {
      position: 'absolute' as const,
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#60a5fa',
      fontSize: '1.25rem',
      zIndex: 10
    },
    bookingFormTextarea: {
      width: '100%',
      padding: '1rem',
      background: 'rgba(55, 65, 81, 0.5)',
      border: '1px solid rgba(75, 85, 99, 0.5)',
      borderRadius: '0.75rem',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      minHeight: '100px',
      resize: 'vertical' as const,
      fontFamily: 'inherit'
    },
    bookingFormButton: {
      background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '0.75rem',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1.125rem',
      width: '100%',
      boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)'
    },
    bookingFormLabel: {
      color: '#d1d5db',
      fontSize: '0.875rem',
      fontWeight: 500,
      marginBottom: '0.5rem',
      display: 'block'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={{
        ...styles.header,
        ...(isScrolled && { background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.99) 0%, rgba(31, 41, 55, 0.98) 100%)' })
      }} className={isScrolled ? 'header-scrolled' : ''}>
        <div style={styles.headerContent}>

          {/* Logo */}
          <div style={styles.logo} className="logo">
            <div style={{...styles.logoIcon}} className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7h18v10H3z"/>
                <path d="M3 7l2-4h14l2 4"/>
                <path d="M7 7v10"/>
                <path d="M17 7v10"/>
              </svg>
            </div>
            <span style={styles.logoText} className="text-reveal">Apna Showroom</span>
          </div>

          {/* Desktop Navigation */}
          <nav style={styles.nav}>
            <a href="#home" style={styles.navLink} className="nav-link">HOME</a>
            <a href="#services" style={styles.navLink} className="nav-link">SERVICES</a>
            <a href="#fleet" style={styles.navLink} className="nav-link">OUR FLEET</a>
            <a href="#about" style={styles.navLink} className="nav-link">ABOUT US</a>
            <a href="#contact" style={styles.navLink} className="nav-link">CONTACT</a>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginLeft: '2rem',
              paddingLeft: '2rem',
              borderLeft: '1px solid rgba(75, 85, 99, 0.3)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: '#9ca3af'
              }}>
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <button 
                style={styles.navButton} 
                className="nav-button"
                onClick={handleBookNow}
              >
                BOOK NOW
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            style={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-button"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        <div style={{
          ...styles.mobileMenu,
          ...(isMobileMenuOpen ? styles.mobileMenuOpen : {})
        }}>
          <a href="#home" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>HOME</a>
          <a href="#services" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>SERVICES</a>
          <a href="#fleet" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>OUR FLEET</a>
          <a href="#about" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>ABOUT US</a>
          <a href="#contact" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>CONTACT</a>
          <div style={{ padding: '1rem 1.5rem' }}>
            <button 
              style={styles.navButton} 
              className="w-full"
              onClick={handleBookNow}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" style={styles.heroSection}>
        <div style={styles.heroContent}>
          {/* Left - Main Heading */}
          <div>
            <h1 style={styles.heading} className="hero-title">
              <span style={{ display: 'block' }}>PREMIUM LUXURY</span>
              <span style={{ ...styles.headingAccent, display: 'block' }}>CAR RENTAL</span>
              <span style={{ display: 'block' }}>SERVICE</span>
            </h1>
            <p style={styles.subheading} className="hero-subtitle">
              Experience the ultimate in luxury transportation. We specialize in premium vehicles 
              for discerning clients who demand excellence in every journey.
            </p>
          </div>

          {/* Center - 360° Car Rotator */}
          <div style={styles.carRotator} className="hero-car">
            <div style={styles.carContainer}>
              {/* Background glow effect */}
              <div style={styles.carGlow}></div>
              
              {/* Car image */}
              <img 
                src={mercedesImages[currentCarImage]}
                alt="Mercedes-Benz S-Class"
                style={styles.carImage}
              />
              
              {/* Navigation arrows */}
              <button
                onClick={prevCarImage}
                style={{ ...styles.navArrow, ...styles.navArrowLeft }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextCarImage}
                style={{ ...styles.navArrow, ...styles.navArrowRight }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Rotation indicator */}
              <div style={styles.rotationIndicator}>
                {currentCarImage + 1} / {mercedesImages.length}
              </div>

              {/* Instructions */}
              <div style={styles.instructions}>
                <p>Click arrows to rotate • View {currentCarImage + 1} of {mercedesImages.length}</p>
              </div>
            </div>
          </div>

          {/* Right - Description */}
          <div>
            <div style={styles.featuresCard}>
              <h3 style={styles.featuresTitle}>Why Choose CarGo?</h3>
              <ul style={styles.featuresList}>
                <li style={styles.featureItem} className="stagger-item">
                  <div style={styles.featureDot}></div>
                  Premium luxury vehicles
                </li>
                <li style={styles.featureItem} className="stagger-item">
                  <div style={styles.featureDot}></div>
                  24/7 customer support
                </li>
                <li style={styles.featureItem} className="stagger-item">
                  <div style={styles.featureDot}></div>
                  Flexible booking options
                </li>
                <li style={styles.featureItem} className="stagger-item">
                  <div style={styles.featureDot}></div>
                  Professional chauffeur service
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Cars Section */}
      <section id="fleet" style={styles.featuredSection}>
        <div style={styles.featuredContainer}>
          <h2 style={styles.featuredTitle}>
            Our Premium Fleet
          </h2>
          
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            loop
            className="featured-cars-swiper"
          >
            {featuredCars.map((car, idx) => (
              <SwiperSlide key={idx}>
                <div 
                  style={{
                    ...styles.carCard,
                    position: 'relative',
                    overflow: 'visible',
                    ...styles.clickableCard
                  }} 
                  className="car-card fade-in"
                  onClick={() => handleCarClick(car)}
                >
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    style={styles.carCardImage}
                  />
                  <div style={styles.carCardContent}>
                    <h3 style={styles.carCardTitle}>{car.name}</h3>
                    <p style={styles.carCardCategory}>{car.category}</p>
                    
                    {/* Features list */}
                    <div style={{
                      marginBottom: '1rem'
                    }}>
                      {car.features.map((feature, featureIdx) => (
                        <div key={featureIdx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '0.25rem',
                          fontSize: '0.75rem',
                          color: '#9ca3af'
                        }}>
                          <div style={{
                            width: '0.25rem',
                            height: '0.25rem',
                            background: '#60a5fa',
                            borderRadius: '50%',
                            marginRight: '0.5rem'
                          }}></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div style={styles.carCardFooter}>
                      <span style={styles.carCardPrice}>{car.price}</span>
                      <button style={styles.selectButton} className="button-primary">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Luxury Services Slider */}
      <section id="services" style={styles.section}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Premium Services</h2>
          <p style={styles.sectionSubtitle}>
            Discover our comprehensive range of luxury transportation services tailored to your needs.
          </p>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            loop
            className="featured-cars-swiper"
          >
            {luxuryServices.map((service, idx) => (
              <SwiperSlide key={idx}>
                <div 
                  style={{
                    ...styles.card,
                    textAlign: 'center',
                    padding: '2.5rem 2rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    ...styles.clickableCard
                  }} 
                  className="service-card fade-in"
                  onClick={() => handleServiceClick(service)}
                >
                  <div>
                    <div style={{
                      fontSize: '3rem',
                      marginBottom: '1rem'
                    }}>
                      {service.icon}
                    </div>
                    <h3 style={{
                      ...styles.cardTitle,
                      fontSize: '1.25rem',
                      marginBottom: '1rem'
                    }}>
                      {service.name}
                    </h3>
                    <p style={{
                      ...styles.cardText,
                      fontSize: '0.875rem',
                      marginBottom: '1.5rem'
                    }}>
                      {service.description}
                    </p>
                  </div>
                  <div style={{
                    color: '#60a5fa',
                    fontWeight: 'bold',
                    fontSize: '1.125rem'
                  }}>
                    {service.price}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Special Offers Slider */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Special Offers & Packages</h2>
          <p style={styles.sectionSubtitle}>
            Exclusive deals and packages designed for the ultimate luxury experience.
          </p>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop
            className="featured-cars-swiper"
          >
            <SwiperSlide>
              <div 
                style={{
                  ...styles.card,
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                  border: '2px solid rgba(96, 165, 250, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  ...styles.clickableCard
                }} 
                className="package-card fade-in"
                onClick={() => handlePackageClick(specialPackages[0])}
              >
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#ef4444',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  LIMITED TIME
                </div>
                <h3 style={{
                  ...styles.cardTitle,
                  color: '#60a5fa'
                }}>
                  Weekend Getaway Package
                </h3>
                <p style={styles.cardText}>
                  Enjoy a luxury weekend with our premium fleet. Includes 48-hour rental, professional chauffeur, and concierge service.
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1rem'
                }}>
                  <div>
                    <div style={{
                      color: '#ef4444',
                      textDecoration: 'line-through',
                      fontSize: '0.875rem'
                    }}>
                      $1,200
                    </div>
                    <div style={{
                      color: '#60a5fa',
                      fontWeight: 'bold',
                      fontSize: '1.5rem'
                    }}>
                      $899
                    </div>
                  </div>
                  <button style={{
                    ...styles.selectButton,
                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)'
                  }}>
                    Book Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
            
            <SwiperSlide>
              <div 
                style={{
                  ...styles.card,
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                  border: '2px solid rgba(168, 85, 247, 0.3)',
                  position: 'relative',
                  ...styles.clickableCard
                }} 
                className="package-card fade-in"
                onClick={() => handlePackageClick(specialPackages[1])}
              >
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#10b981',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  POPULAR
                </div>
                <h3 style={{
                  ...styles.cardTitle,
                  color: '#a855f7'
                }}>
                  Wedding Package
                </h3>
                <p style={styles.cardText}>
                  Make your special day unforgettable with our wedding transportation package. Includes multiple vehicles and professional coordination.
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1rem'
                }}>
                  <div style={{
                    color: '#a855f7',
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                  }}>
                    $1,500
                  </div>
                  <button style={{
                    ...styles.selectButton,
                    background: 'linear-gradient(135deg, #7c3aed, #ec4899)'
                  }}>
                    Book Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
            
            <SwiperSlide>
              <div 
                style={{
                  ...styles.card,
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  position: 'relative',
                  ...styles.clickableCard
                }} 
                className="package-card fade-in"
                onClick={() => handlePackageClick(specialPackages[2])}
              >
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#f59e0b',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  NEW
                </div>
                <h3 style={{
                  ...styles.cardTitle,
                  color: '#10b981'
                }}>
                  Corporate Fleet Package
                </h3>
                <p style={styles.cardText}>
                  Complete corporate transportation solution with multiple vehicles, dedicated account manager, and priority booking.
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1rem'
                }}>
                  <div style={{
                    color: '#10b981',
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                  }}>
                    $2,500/month
                  </div>
                  <button style={{
                    ...styles.selectButton,
                    background: 'linear-gradient(135deg, #10b981, #3b82f6)'
                  }}>
                    Contact Us
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="about" style={styles.section}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Why Choose CarGo?</h2>
          <p style={styles.sectionSubtitle}>
            Trusted by thousands of satisfied customers worldwide for premium luxury transportation.
          </p>
          <div style={styles.statsGrid}>
            <div style={styles.statCard} className="fade-in">
              <div style={styles.statNumber} className="stat-number">10K+</div>
              <div style={styles.statLabel}>Happy Customers</div>
            </div>
            <div style={styles.statCard} className="fade-in">
              <div style={styles.statNumber} className="stat-number">50+</div>
              <div style={styles.statLabel}>Luxury Vehicles</div>
            </div>
            <div style={styles.statCard} className="fade-in">
              <div style={styles.statNumber} className="stat-number">24/7</div>
              <div style={styles.statLabel}>Customer Support</div>
            </div>
            <div style={styles.statCard} className="fade-in">
              <div style={styles.statNumber} className="stat-number">99%</div>
              <div style={styles.statLabel}>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>What Our Clients Say</h2>
          <p style={styles.sectionSubtitle}>
            Don't just take our word for it. Here's what our valued customers have to say about their experience.
          </p>
          <div style={styles.grid}>
            <div style={styles.testimonialCard}>
              <p style={styles.testimonialText}>
                "CarGo provided exceptional service for our corporate event. The vehicles were immaculate and the chauffeurs were professional and punctual."
              </p>
              <div style={styles.testimonialAuthor}>- Sarah Johnson, CEO TechCorp</div>
            </div>
            <div style={styles.testimonialCard}>
              <p style={styles.testimonialText}>
                "The airport transfer service was flawless. Our driver was waiting with a sign and made our journey comfortable and stress-free."
              </p>
              <div style={styles.testimonialAuthor}>- Michael Chen, Business Executive</div>
            </div>
            <div style={styles.testimonialCard}>
              <p style={styles.testimonialText}>
                "For our wedding day, CarGo delivered elegance and reliability. The luxury fleet made our special day even more memorable."
              </p>
              <div style={styles.testimonialAuthor}>- Emily & David Rodriguez</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contact" style={styles.ctaSection}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.ctaTitle}>Ready to Experience Luxury?</h2>
          <p style={styles.ctaText}>
            Book your premium transportation today and discover why CarGo is the preferred choice for luxury car rental and chauffeur services.
          </p>
          <button style={styles.ctaButton} onClick={handleBookNow}>
            Book Your Luxury Ride Now
          </button>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div style={styles.bookingFormModal} onClick={closeBookingForm}>
          <div style={styles.bookingFormContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.bookingFormHeader}>
              <h2 style={styles.bookingFormTitle}>Book Your Luxury Ride</h2>
              <button style={styles.bookingFormClose} onClick={closeBookingForm}>×</button>
            </div>

            {/* Service Type Toggles */}
            <div style={styles.serviceToggles}>
              <button
                onClick={() => setServiceType('daily')}
                style={{
                  ...styles.serviceToggle,
                  ...styles.serviceToggleLeft,
                  ...(serviceType === 'daily' ? styles.serviceToggleActive : styles.serviceToggleInactive)
                }}
              >
                DAILY RENTAL
              </button>
              <button
                onClick={() => setServiceType('hourly')}
                style={{
                  ...styles.serviceToggle,
                  ...styles.serviceToggleRight,
                  ...(serviceType === 'hourly' ? styles.serviceToggleActive : styles.serviceToggleInactive)
                }}
              >
                HOURLY SERVICE
              </button>
            </div>

            {/* Booking Form */}
            <div style={styles.bookingFormGrid}>
              <div style={styles.bookingFormInputContainer}>
                <label style={styles.bookingFormLabel}>Pickup Location</label>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={bookingData.pickup}
                  onChange={(e) => handleInputChange('pickup', e.target.value)}
                  style={styles.bookingFormInput}
                />
                <div style={styles.bookingFormInputIcon}>📍</div>
              </div>

              <div style={styles.bookingFormInputContainer}>
                <label style={styles.bookingFormLabel}>Dropoff Location</label>
                <input
                  type="text"
                  placeholder="Enter dropoff location"
                  value={bookingData.dropoff}
                  onChange={(e) => handleInputChange('dropoff', e.target.value)}
                  style={styles.bookingFormInput}
                />
                <div style={styles.bookingFormInputIcon}>📍</div>
              </div>

              <div style={styles.bookingFormInputContainer}>
                <label style={styles.bookingFormLabel}>Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  style={styles.bookingFormInput}
                />
                <div style={styles.bookingFormInputIcon}>📅</div>
              </div>

              <div style={styles.bookingFormInputContainer}>
                <label style={styles.bookingFormLabel}>Time</label>
                <input
                  type="time"
                  value={bookingData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  style={styles.bookingFormInput}
                />
                <div style={styles.bookingFormInputIcon}>🕐</div>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={styles.bookingFormLabel}>Additional Requirements</label>
              <textarea
                placeholder="Any special requirements or notes..."
                style={styles.bookingFormTextarea}
              />
            </div>

            <button style={styles.bookingFormButton} className="booking-form-button">
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Car Details Modal */}
      {selectedCar && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{selectedCar.name}</h3>
              <button style={styles.closeButton} onClick={closeModal}>×</button>
            </div>
            <img src={selectedCar.image} alt={selectedCar.name} style={styles.modalImage} />
            <div style={styles.modalPrice}>{selectedCar.price}</div>
            <p style={styles.modalDetails}>
              Experience the ultimate luxury with our {selectedCar.name}. This {selectedCar.category.toLowerCase()} 
              offers exceptional performance, comfort, and style for your premium transportation needs.
            </p>
            <ul style={styles.modalFeatures}>
              {selectedCar.features.map((feature: string, index: number) => (
                <li key={index} style={styles.modalFeature}>
                  <div style={styles.modalFeatureDot}></div>
                  {feature}
                </li>
              ))}
            </ul>
            <button style={styles.modalButton}>
              Book This Vehicle
            </button>
          </div>
        </div>
      )}

      {/* Service Details Modal */}
      {selectedService && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{selectedService.name}</h3>
              <button style={styles.closeButton} onClick={closeModal}>×</button>
            </div>
            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
              {selectedService.icon}
            </div>
            <div style={styles.modalPrice}>{selectedService.price}</div>
            <p style={styles.modalDetails}>
              {selectedService.description}
            </p>
            <button style={styles.modalButton}>
              Book This Service
            </button>
          </div>
        </div>
      )}

      {/* Package Details Modal */}
      {selectedPackage && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{selectedPackage.title}</h3>
              <button style={styles.closeButton} onClick={closeModal}>×</button>
            </div>
            <p style={styles.modalDetails}>
              {selectedPackage.description}
            </p>
            <div style={styles.modalPrice}>{selectedPackage.price}</div>
            <button style={styles.modalButton}>
              Book This Package
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 