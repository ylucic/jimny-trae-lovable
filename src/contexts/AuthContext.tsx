
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getCurrentUser, signInWithGoogle, signOut } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

const SESSION_STORAGE_KEY = 'jimny_auth_state';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth context...');
        // Check for cached session on initial load
        const cachedSession = localStorage.getItem(SESSION_STORAGE_KEY);
        if (cachedSession) {
          try {
            const parsedSession = JSON.parse(cachedSession);
            setUser(parsedSession);
            console.log('Loaded cached session:', parsedSession);
          } catch (error) {
            console.error('Error parsing cached session:', error);
            localStorage.removeItem(SESSION_STORAGE_KEY);
          }
        }

        // Check for the user on initial load
        const currentUser = await getCurrentUser();
        console.log('Current user from Supabase:', currentUser);
        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
        }
      } catch (error) {
        console.error('Error in auth initialization:', error);
        setError(error instanceof Error ? error : new Error('Failed to initialize auth'));
        toast.error('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (error) {
    console.error('Auth context error:', error);
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  const handleSignInWithGoogle = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error('Failed to sign in with Google');
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signInWithGoogle: handleSignInWithGoogle,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
