
import { Sighting, SightingStats, ColorOption } from '../lib/types';
import { v4 as uuidv4 } from 'uuid';

// Available Jimny colors
export const colorOptions: ColorOption[] = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Black', hex: '#000000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Green', hex: '#006400' },
  { name: 'Yellow', hex: '#FFD700' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Orange', hex: '#FFA500' },
];

// Initial mock sightings
export const mockSightings: Sighting[] = [
  {
    id: uuidv4(),
    model: 'three-door',
    color: '#FFFFFF',
    latitude: 35.6762,
    longitude: 139.6503,
    timestamp: new Date().toISOString(),
    userId: 'user-1',
  },
  {
    id: uuidv4(),
    model: 'five-door',
    color: '#000000',
    latitude: 35.6895,
    longitude: 139.6917,
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    userId: 'user-1',
  },
  {
    id: uuidv4(),
    model: 'three-door',
    color: '#FF0000',
    latitude: 35.7100,
    longitude: 139.8107,
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    userId: 'user-1',
  },
];

// Calculate mock statistics based on mock sightings
export const calculateStats = (sightings: Sighting[]): SightingStats => {
  // Count total sightings
  const totalSightings = sightings.length;
  
  // Count sightings by model
  const byModel = {
    'three-door': sightings.filter(s => s.model === 'three-door').length,
    'five-door': sightings.filter(s => s.model === 'five-door').length,
  };
  
  // Find most frequent color with null check
  const colorCount: Record<string, number> = {};
  sightings.forEach(s => {
    if (s.color) {
      colorCount[s.color] = (colorCount[s.color] || 0) + 1;
    }
  });
  
  let mostFrequentColor = colorOptions[0].hex; // Default to first color
  let maxCount = 0;
  
  Object.entries(colorCount).forEach(([color, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentColor = color;
    }
  });
  
  return {
    totalSightings,
    mostFrequentColor,
    byModel,
  };
};

// Helper function to get the color name from hex value with null check
export const getColorNameFromHex = (hex: string | null): string => {
  if (!hex) return 'Unknown';
  const color = colorOptions.find(c => c.hex.toLowerCase() === hex.toLowerCase());
  return color ? color.name : 'Unknown';
};

// Function to simulate adding a new sighting (for front-end demo until backend is connected)
let localSightings = [...mockSightings];

export const addSighting = (sighting: Omit<Sighting, 'id' | 'timestamp'>): Sighting => {
  const newSighting: Sighting = {
    ...sighting,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
  };
  
  localSightings = [newSighting, ...localSightings];
  return newSighting;
};

export const getSightings = (): Sighting[] => {
  return localSightings;
};

export const getSightingStats = (): SightingStats => {
  return calculateStats(localSightings);
};

// Function to check if a color is new for the user
export const isNewColorForUser = (userId: string, color: string): boolean => {
  return !localSightings.some(s => s.userId === userId && s.color.toLowerCase() === color.toLowerCase());
};
