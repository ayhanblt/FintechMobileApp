import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

// Auth context type definition
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
});

// Auth provider component
export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is logged in on app startup
  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginState();
  }, []);

  // Mock login function - in a real app, this would make an API call
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purpose, create a mock user
      // In a real app, you'd validate credentials with a backend
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mock register function
  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purpose, create a mock user
      const mockUser: User = {
        id: '1',
        name,
        email,
        avatarUrl: undefined,
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mock forgot password function
  const forgotPassword = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would send a reset email
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error('Failed to process forgot password request.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mock reset password function
  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would validate the token and update the password
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error('Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auth context value
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);
