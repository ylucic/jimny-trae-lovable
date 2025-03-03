import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JimnyModels from './JimnyModels';
import ColorSwatch from './ColorSwatch';
import { Sighting } from '../lib/types';
import { colorOptions, addSighting, isNewColorForUser } from '../utils/mockData';

interface SightingFormProps {
  onSightingAdded: (sighting: Sighting, isNewColor: boolean) => void;
}

const SightingForm: React.FC<SightingFormProps> = ({ onSightingAdded }) => {
  const [model, setModel] = useState<'three-door' | 'five-door'>('three-door');
  const [color, setColor] = useState<string>(colorOptions[0].hex);
  const [location, setLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!model) {
      errors.model = 'Please select a model';
    }
    if (!color) {
      errors.color = 'Please select a color';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <motion.form
      className="glass-panel rounded-2xl p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="form"
      aria-label="Jimny sighting form"
      onSubmit={(e) => {
        e.preventDefault();
        if (validateForm()) {
          // Form submission logic
        }
      }}
    >
      <h2 className="text-xl font-medium mb-6">Log a Sighting</h2>
      
      <div className="space-y-6">
        <div role="group" aria-labelledby="model-selection">
          <h3 id="model-selection" className="text-sm font-medium mb-3">Select Model</h3>
          <JimnyModels selectedModel={model} onModelSelect={setModel} />
          {formErrors.model && (
            <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.model}</p>
          )}
        </div>

        <div role="group" aria-labelledby="color-selection">
          <h3 id="color-selection" className="text-sm font-medium mb-3">Select Color</h3>
          <ColorSwatch selectedColor={color} onColorSelect={setColor} />
          {formErrors.color && (
            <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.color}</p>
          )}
        </div>

        <div role="group" aria-labelledby="location-section">
          <h3 id="location-section" className="text-sm font-medium mb-3">Location</h3>
          <button
            type="button"
            className="btn-primary w-full"
            onClick={getLocation}
            disabled={isGettingLocation}
            aria-busy={isGettingLocation}
          >
            {isGettingLocation ? 'Getting Location...' : 'Get Current Location'}
          </button>
          {locationError && (
            <p className="text-red-500 text-sm mt-1" role="alert">{locationError}</p>
          )}
        </div>
      </div>
    </motion.form>
  );
};

export default SightingForm;
