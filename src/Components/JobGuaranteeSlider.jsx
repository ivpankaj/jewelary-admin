// components/JobGuaranteeSlider.js
import React from 'react';
import { useState, useEffect } from 'react';

const slides = [
  "100% Job Guarantee: Unlock Your Future!",
  "Join Our Programs and Get Hired!",
  "Learn from Industry Experts and Succeed!",
  "Your Dream Job is Just a Click Away!",
];

const JobGuaranteeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full h-64 bg-blue-600 text-white flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-center transition-opacity duration-500">
          {slides[currentSlide]}
        </h2>
      </div>
      <div className="absolute inset-0 bg-black opacity-25"></div>
    </div>
  );
};

export default JobGuaranteeSlider;
