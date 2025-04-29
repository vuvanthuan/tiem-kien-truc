'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/button';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollThreshold = 1200;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Button
      className={`fixed bottom-32 right-5 w-12 h-12 bg-stone-600 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-10'
      } hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
      onClick={scrollToTop}
      aria-label="Back to Top"
    >
      <ArrowUp className="w-6 h-6" />
    </Button>
  );
};

export default BackToTop;
