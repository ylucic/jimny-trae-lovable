
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ConfettiEffectProps {
  run: boolean;
  onComplete?: () => void;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ run, onComplete }) => {
  const { width, height } = useWindowSize();
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    if (run) {
      setIsActive(true);
      
      // Stop confetti after 4 seconds
      const timer = setTimeout(() => {
        setIsActive(false);
        if (onComplete) onComplete();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [run, onComplete]);

  return isActive ? (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
      colors={['#FF0000', '#FFD700', '#0000FF', '#006400', '#FFA500', '#C0C0C0']}
    />
  ) : null;
};

export default ConfettiEffect;
