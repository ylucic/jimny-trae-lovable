
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc'; 
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <motion.header 
      className="py-6 mb-8 border-b border-gray-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      role="banner"
      aria-label="Site header"
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div 
            className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center"
            role="img"
            aria-label="Jimny logo"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-6 h-6"
              aria-hidden="true"
            >
              <rect x="3" y="9" width="18" height="12" rx="2" />
              <path d="M8 5v4" />
              <path d="M16 5v4" />
              <circle cx="7" cy="16" r="2" />
              <circle cx="17" cy="16" r="2" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-medium tracking-tight">Jimny Sightings</h1>
            <p className="text-xs text-gray-500">Log your Suzuki Jimny sightings</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {user.email}
              </div>
              <Button 
                onClick={() => signOut()}
                variant="ghost"
                className="hover:bg-red-50 text-red-600"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => signInWithGoogle()}
              className="bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 px-5 py-2 rounded-full flex items-center space-x-2"
              variant="outline"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Sign in with Google</span>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
