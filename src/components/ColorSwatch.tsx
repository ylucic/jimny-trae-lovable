
import React from 'react';
import { motion } from 'framer-motion';
import { ColorOption } from '../lib/types';

interface ColorSwatchProps {
  colors: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ 
  colors, 
  selectedColor, 
  onSelectColor 
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Choose Color</h3>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-9">
        {colors.map((color, index) => (
          <motion.div
            key={color.hex}
            className={`swatch-option ${selectedColor === color.hex ? 'selected' : ''}`}
            style={{ 
              backgroundColor: color.hex,
              borderColor: color.hex === '#FFFFFF' ? '#E5E7EB' : color.hex
            }}
            onClick={() => onSelectColor(color.hex)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              ease: 'easeOut'
            }}
            whileHover={{ scale: 1.1, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedColor === color.hex && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-3 h-3 rounded-full ${color.hex === '#FFFFFF' ? 'bg-black' : 'bg-white'}`} />
              </motion.div>
            )}
            <span className="sr-only">{color.name}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Selected: {colors.find(c => c.hex === selectedColor)?.name || 'None'}
      </div>
    </div>
  );
};

export default ColorSwatch;
