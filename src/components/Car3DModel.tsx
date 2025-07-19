import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Car3DModelProps {
  className?: string;
}

const Car3DModel: React.FC<Car3DModelProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 1, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Create car body
    const carGroup = new THREE.Group();

    // Car body (main chassis) - Mercedes S-Class style
    const bodyGeometry = new THREE.BoxGeometry(2.2, 0.6, 4.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1e40af, // Deep blue metallic
      shininess: 150,
      specular: 0x666666
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    body.receiveShadow = true;
    carGroup.add(body);

    // Car roof - more elegant shape
    const roofGeometry = new THREE.BoxGeometry(2, 0.4, 2.5);
    const roofMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1e40af, // Same color as body
      shininess: 150,
      specular: 0x666666
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 1.2;
    roof.position.z = -0.4;
    roof.castShadow = true;
    roof.receiveShadow = true;
    carGroup.add(roof);

    // Front grille (Mercedes-style)
    const grilleGeometry = new THREE.BoxGeometry(1.8, 0.3, 0.1);
    const grilleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x111827, // Dark chrome
      shininess: 200,
      specular: 0x888888
    });
    const grille = new THREE.Mesh(grilleGeometry, grilleMaterial);
    grille.position.set(0, 0.8, 2.3);
    carGroup.add(grille);

    // Mercedes logo
    const logoGeometry = new THREE.CircleGeometry(0.15, 32);
    const logoMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff, // Silver
      shininess: 200,
      specular: 0xffffff
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.8, 2.35);
    logo.rotation.x = -Math.PI / 2;
    carGroup.add(logo);

    // Side panels with chrome trim
    const sideTrimGeometry = new THREE.BoxGeometry(0.05, 0.8, 3);
    const chromeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xcccccc, // Chrome
      shininess: 200,
      specular: 0xffffff
    });

    const leftTrim = new THREE.Mesh(sideTrimGeometry, chromeMaterial);
    leftTrim.position.set(-1.125, 0.8, 0);
    carGroup.add(leftTrim);

    const rightTrim = new THREE.Mesh(sideTrimGeometry, chromeMaterial);
    rightTrim.position.set(1.125, 0.8, 0);
    carGroup.add(rightTrim);

    // Wheels - Mercedes-style alloy wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.45, 0.45, 0.25, 16);
    const wheelMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333, // Dark alloy
      shininess: 100,
      specular: 0x444444
    });

    // Wheel rims
    const rimGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.26, 16);
    const rimMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xcccccc, // Silver alloy
      shininess: 150,
      specular: 0x666666
    });

    const wheels: THREE.Mesh[] = [];
    const wheelPositions = [
      { x: -0.9, y: 0.45, z: 1.4 },
      { x: 0.9, y: 0.45, z: 1.4 },
      { x: -0.9, y: 0.45, z: -1.4 },
      { x: 0.9, y: 0.45, z: -1.4 }
    ];

    wheelPositions.forEach(pos => {
      // Wheel tire
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos.x, pos.y, pos.z);
      wheel.castShadow = true;
      wheel.receiveShadow = true;
      carGroup.add(wheel);
      wheels.push(wheel);

      // Wheel rim
      const rim = new THREE.Mesh(rimGeometry, rimMaterial);
      rim.rotation.z = Math.PI / 2;
      rim.position.set(pos.x, pos.y, pos.z);
      carGroup.add(rim);
    });

    // Headlights - LED style
    const headlightGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.1);
    const headlightMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.4
    });

    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.position.set(-0.7, 0.7, 2.25);
    carGroup.add(leftHeadlight);

    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.position.set(0.7, 0.7, 2.25);
    carGroup.add(rightHeadlight);

    // LED strips
    const ledGeometry = new THREE.BoxGeometry(0.25, 0.05, 0.05);
    const ledMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00ffff, // Cyan LED
      emissive: 0x00ffff,
      emissiveIntensity: 0.6
    });

    const leftLed = new THREE.Mesh(ledGeometry, ledMaterial);
    leftLed.position.set(-0.7, 0.6, 2.25);
    carGroup.add(leftLed);

    const rightLed = new THREE.Mesh(ledGeometry, ledMaterial);
    rightLed.position.set(0.7, 0.6, 2.25);
    carGroup.add(rightLed);

    // Taillights - LED style
    const taillightGeometry = new THREE.BoxGeometry(0.25, 0.15, 0.08);
    const taillightMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.3
    });

    const leftTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
    leftTaillight.position.set(-0.7, 0.7, -2.25);
    carGroup.add(leftTaillight);

    const rightTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
    rightTaillight.position.set(0.7, 0.7, -2.25);
    carGroup.add(rightTaillight);

    // Brake lights
    const brakeLightGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.05);
    const brakeLightMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff3333,
      emissive: 0xff3333,
      emissiveIntensity: 0.4
    });

    const leftBrakeLight = new THREE.Mesh(brakeLightGeometry, brakeLightMaterial);
    leftBrakeLight.position.set(-0.7, 0.6, -2.25);
    carGroup.add(leftBrakeLight);

    const rightBrakeLight = new THREE.Mesh(brakeLightGeometry, brakeLightMaterial);
    rightBrakeLight.position.set(0.7, 0.6, -2.25);
    carGroup.add(rightBrakeLight);

    // Windows - tinted glass
    const windowGeometry = new THREE.PlaneGeometry(1.8, 0.9);
    const windowMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a, // Dark tinted glass
      transparent: true,
      opacity: 0.6,
      shininess: 150,
      specular: 0x444444
    });

    const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    frontWindow.position.set(0, 1.2, 0.9);
    frontWindow.rotation.x = -0.2;
    carGroup.add(frontWindow);

    const rearWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    rearWindow.position.set(0, 1.2, -1.5);
    rearWindow.rotation.x = 0.2;
    carGroup.add(rearWindow);

    // Side windows
    const sideWindowGeometry = new THREE.PlaneGeometry(0.9, 0.7);
    const leftSideWindow = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    leftSideWindow.position.set(-1.11, 1.2, -0.4);
    leftSideWindow.rotation.y = Math.PI / 2;
    carGroup.add(leftSideWindow);

    const rightSideWindow = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    rightSideWindow.position.set(1.11, 1.2, -0.4);
    rightSideWindow.rotation.y = -Math.PI / 2;
    carGroup.add(rightSideWindow);

    // Sunroof
    const sunroofGeometry = new THREE.PlaneGeometry(1.4, 0.8);
    const sunroofMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000, // Black glass
      transparent: true,
      opacity: 0.8,
      shininess: 200,
      specular: 0x666666
    });
    const sunroof = new THREE.Mesh(sunroofGeometry, sunroofMaterial);
    sunroof.position.set(0, 1.41, -0.4);
    sunroof.rotation.x = -Math.PI / 2;
    carGroup.add(sunroof);

    // Door handles
    const handleGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.02);
    const handleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xcccccc, // Chrome
      shininess: 200,
      specular: 0xffffff
    });

    const leftHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    leftHandle.position.set(-1.125, 0.9, 0.5);
    carGroup.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    rightHandle.position.set(1.125, 0.9, 0.5);
    carGroup.add(rightHandle);

    // Exhaust pipes
    const exhaustGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8);
    const exhaustMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333, // Dark metal
      shininess: 100,
      specular: 0x444444
    });

    const leftExhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    leftExhaust.position.set(-0.4, 0.3, -2.3);
    leftExhaust.rotation.x = Math.PI / 2;
    carGroup.add(leftExhaust);

    const rightExhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    rightExhaust.position.set(0.4, 0.3, -2.3);
    rightExhaust.rotation.x = Math.PI / 2;
    carGroup.add(rightExhaust);

    // License plate
    const plateGeometry = new THREE.PlaneGeometry(0.6, 0.15);
    const plateMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      shininess: 50
    });
    const licensePlate = new THREE.Mesh(plateGeometry, plateMaterial);
    licensePlate.position.set(0, 0.5, -2.35);
    licensePlate.rotation.x = Math.PI / 2;
    carGroup.add(licensePlate);

    scene.add(carGroup);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1f2937,
      transparent: true,
      opacity: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    // Mouse event handlers
    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect && event.touches[0]) {
        mouseX = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation based on mouse position
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.3;

      carGroup.rotation.y += (targetRotationY - carGroup.rotation.y) * 0.05;
      carGroup.rotation.x += (targetRotationX - carGroup.rotation.x) * 0.05;

      // Rotate wheels
      wheels.forEach((wheel, index) => {
        if (index < 2) { // Front wheels
          wheel.rotation.x += 0.02;
        }
      });

      // Pulse headlights
      const time = Date.now() * 0.001;
      headlightMaterial.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoading(false);

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeEventListener('touchmove', handleTouchMove);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={className}
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        cursor: 'grab'
      }}
    >
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '1.125rem',
          zIndex: 10
        }}>
          Loading 3D Model...
        </div>
      )}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#9ca3af',
        fontSize: '0.875rem',
        textAlign: 'center',
        zIndex: 10
      }}>
        <p>Drag to rotate • Interactive 3D Model</p>
      </div>
    </div>
  );
};

export default Car3DModel; 