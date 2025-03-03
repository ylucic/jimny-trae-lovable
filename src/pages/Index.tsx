
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import SightingForm from '../components/SightingForm';
import SightingStats from '../components/SightingStats';
import ConfettiEffect from '../components/ConfettiEffect';
import { Sighting, SightingStats as SightingStatsType } from '../lib/types';
import { getSightings, getSightingStats, getColorNameFromHex } from '../utils/mockData';

const Index: React.FC = () => {
  const [stats, setStats] = useState<SightingStatsType>({
    totalSightings: 0,
    mostFrequentColor: null,
    byModel: { 'three-door': 0, 'five-door': 0 }
  });
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [newColorNotification, setNewColorNotification] = useState<string | null>(null);
  
  // Load initial stats
  useEffect(() => {
    setStats(getSightingStats());
  }, []);
  
  const handleSightingAdded = (sighting: Sighting, isNewColor: boolean) => {
    // Update stats
    setStats(getSightingStats());
    
    // Show confetti if it's a new color
    if (isNewColor) {
      setShowConfetti(true);
      setNewColorNotification(getColorNameFromHex(sighting.color));
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setNewColorNotification(null);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ConfettiEffect run={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      <Header />
      
      <div className="container px-4 mx-auto pb-16">
        <AnimatePresence>
          {newColorNotification && (
            <motion.div
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white py-3 px-6 rounded-full shadow-lg z-50 flex items-center space-x-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 text-yellow-400"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>First {newColorNotification} Jimny spotted! 🎉</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <SightingForm onSightingAdded={handleSightingAdded} />
          </div>
          
          <div>
            <SightingStats stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
