
import React from 'react';
import { motion } from 'framer-motion';
import { SightingStats as SightingStatsType } from '../lib/types';
import { getColorNameFromHex } from '../utils/mockData';

interface SightingStatsProps {
  stats: SightingStatsType;
}

const SightingStats: React.FC<SightingStatsProps> = ({ stats }) => {
  const { totalSightings, mostFrequentColor, byModel } = stats;
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <motion.section
      className="glass-panel rounded-2xl p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="Sighting statistics"
    >
      <h2 className="text-xl font-medium mb-6" id="stats-title">Sighting Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-labelledby="stats-title">
        <motion.div 
          className="bg-gray-50 p-4 rounded-xl"
          variants={itemVariants}
          role="article"
          aria-label="Total sightings count"
        >
          <p className="text-sm text-gray-500 mb-1">Total Sightings</p>
          <p className="text-3xl font-semibold">{totalSightings}</p>
        </motion.div>
        
        <motion.div 
          className="bg-gray-50 p-4 rounded-xl"
          variants={itemVariants}
          role="article"
          aria-label="Most frequent color"
        >
          <p className="text-sm text-gray-500 mb-1">Most Common Color</p>
          <p className="text-3xl font-semibold">{getColorNameFromHex(mostFrequentColor)}</p>
        </motion.div>

        <motion.div 
          className="bg-gray-50 p-4 rounded-xl"
          variants={itemVariants}
          role="article"
          aria-label="Model distribution"
        >
          <p className="text-sm text-gray-500 mb-1">Model Distribution</p>
          <div className="space-y-2">
            <p>Three-door: {byModel['three-door']}</p>
            <p>Five-door: {byModel['five-door']}</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SightingStats;
