// components/ModelViewer.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ModelViewer = ({ filePath }) => {
  const { scene } = useGLTF(filePath);

  return (
    <Canvas style={{ height: '500px', width: '100%' }}>
      {/* Lights for better visibility */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      
      {/* Load the GLTF model */}
      <primitive object={scene} scale={1.5} />
      
      {/* Orbit controls to rotate the model */}
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
