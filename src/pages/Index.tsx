
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import SightingForm from '../components/SightingForm';
import SightingStats from '../components/SightingStats';
import ConfettiEffect from '../components/ConfettiEffect';
import ErrorBoundary from '../components/ErrorBoundary';
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
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    try {
      const initialStats = getSightingStats();
      setStats(initialStats);
    } catch (err) {
      console.error('Error loading stats:', err);
      setError(err instanceof Error ? err : new Error('Failed to load stats'));
    }
  }, []);
  
  const handleSightingAdded = (sighting: Sighting, isNewColor: boolean) => {
    try {
      setStats(getSightingStats());
      
      if (isNewColor) {
        setShowConfetti(true);
        setNewColorNotification(getColorNameFromHex(sighting.color));
        
        setTimeout(() => {
          setNewColorNotification(null);
          setShowConfetti(false);
        }, 5000);
      }
    } catch (err) {
      console.error('Error handling new sighting:', err);
      setError(err instanceof Error ? err : new Error('Failed to handle new sighting'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ErrorBoundary>
          <SightingForm onSightingAdded={handleSightingAdded} />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <SightingStats stats={stats} />
        </ErrorBoundary>

        <AnimatePresence>
          {newColorNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              <p>New color discovered: {newColorNotification}!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {showConfetti && <ConfettiEffect />}
      </main>
    </div>
  );
};

export default Index;
