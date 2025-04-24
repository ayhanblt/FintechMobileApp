import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';

// Define types for our context
export type ThemeMode = 'light' | 'dark';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'BTC' | 'ETH';

interface AppContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  primaryCurrency: CurrencyCode;
  setPrimaryCurrency: (currency: CurrencyCode) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  themeMode: 'light',
  toggleTheme: () => {},
  primaryCurrency: 'USD',
  setPrimaryCurrency: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

// Provider component
export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [primaryCurrency, setPrimaryCurrency] = useState<CurrencyCode>('USD');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Toggle between light and dark mode
  const toggleTheme = useCallback(() => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  // Context value
  const contextValue: AppContextType = {
    themeMode,
    toggleTheme,
    primaryCurrency,
    setPrimaryCurrency,
    isLoading,
    setIsLoading,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Custom hook for using the context
export const useApp = () => useContext(AppContext);
