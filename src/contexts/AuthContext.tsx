
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

  useEffect(() => {
    // Check for cached session on initial load
    const cachedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (cachedSession) {
      try {
        const parsedSession = JSON.parse(cachedSession);
        setUser(parsedSession);
      } catch (error) {
        console.error("Error parsing cached session:", error);
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }

    // Check for the user on initial load
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
        toast.error('Failed to load user session');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        setIsLoading(false);
        
        if (event === 'SIGNED_IN') {
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
          toast.success('Successfully signed in!');
        } else if (event === 'SIGNED_OUT') {
          localStorage.removeItem(SESSION_STORAGE_KEY);
          toast.info('Signed out');
        } else if (event === 'USER_UPDATED') {
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
          toast.success('User profile updated');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
