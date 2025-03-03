
import React from 'react';
import { motion } from 'framer-motion';

interface JimnyModelsProps {
  selectedModel: 'three-door' | 'five-door';
  onSelectModel: (model: 'three-door' | 'five-door') => void;
}

const JimnyModels: React.FC<JimnyModelsProps> = ({ selectedModel, onSelectModel }) => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Choose Model</h3>
      <div className="grid grid-cols-2 gap-4">
        <ModelOption 
          name="3-Door Jimny" 
          modelType="three-door"
          isSelected={selectedModel === 'three-door'} 
          onSelect={() => onSelectModel('three-door')} 
        />
        <ModelOption 
          name="5-Door Jimny" 
          modelType="five-door"
          isSelected={selectedModel === 'five-door'} 
          onSelect={() => onSelectModel('five-door')} 
        />
      </div>
    </div>
  );
};

interface ModelOptionProps {
  name: string;
  modelType: 'three-door' | 'five-door';
  isSelected: boolean;
  onSelect: () => void;
}

const ModelOption: React.FC<ModelOptionProps> = ({ name, modelType, isSelected, onSelect }) => {
  return (
    <motion.div
      className={`relative p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="h-32 flex items-center justify-center mb-3">
        {modelType === 'three-door' ? (
          <svg 
            viewBox="0 0 100 60" 
            className="w-full h-full" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="20" y="20" width="60" height="25" rx="5" fill="#333" />
            <rect x="25" y="15" width="50" height="10" rx="2" fill="#444" />
            <rect x="25" y="45" width="50" height="5" rx="1" fill="#222" />
            <circle cx="30" cy="50" r="5" fill="#555" />
            <circle cx="70" cy="50" r="5" fill="#555" />
            <rect x="35" y="25" width="10" height="10" rx="1" fill="#88CCFF" />
            <rect x="55" y="25" width="10" height="10" rx="1" fill="#88CCFF" />
          </svg>
        ) : (
          <svg 
            viewBox="0 0 100 60" 
            className="w-full h-full" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" y="20" width="80" height="25" rx="5" fill="#333" />
            <rect x="15" y="15" width="70" height="10" rx="2" fill="#444" />
            <rect x="15" y="45" width="70" height="5" rx="1" fill="#222" />
            <circle cx="25" cy="50" r="5" fill="#555" />
            <circle cx="75" cy="50" r="5" fill="#555" />
            <rect x="25" y="25" width="10" height="10" rx="1" fill="#88CCFF" />
            <rect x="45" y="25" width="10" height="10" rx="1" fill="#88CCFF" />
            <rect x="65" y="25" width="10" height="10" rx="1" fill="#88CCFF" />
          </svg>
        )}
      </div>
      <div className="text-center">
        <h4 className="font-medium">{name}</h4>
        {isSelected && (
          <motion.div 
            className="inline-block px-2 py-1 bg-black text-white text-xs rounded-full mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            Selected
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default JimnyModels;
