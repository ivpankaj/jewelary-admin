import React from 'react';
import { useLoader } from './GlobalContext';
import Lottie from 'react-lottie';
import animationData from './animations.json';

const GlobalLoader = () => {
  const context = useLoader();

  if (!context) {
    console.error('Loader context is not defined');
    return null;
  }

  const { loading } = context;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black flex items-center justify-center bg-opacity-0 p-10 h-[100vh] w-[100vh] rounded-full">
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
    </div>
  );
};

export default GlobalLoader;