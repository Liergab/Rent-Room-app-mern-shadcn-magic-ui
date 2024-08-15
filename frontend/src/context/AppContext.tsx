import React, { useContext, useEffect, useState } from 'react';
import { ValidateToken } from '@/services/api/Auth';
import {loadStripe, Stripe} from '@stripe/stripe-js'

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ""
type AppContextType = {
  isLoggin: boolean;
  setIsLoggin: React.Dispatch<React.SetStateAction<boolean>>;
  stripePromise:Promise<Stripe | null>
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggin, setIsLoggin] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('isLoggin') || 'false');
  });

  const { data, isLoading, isError } = ValidateToken();

  useEffect(() => {
    if (!isLoading) {
      const loggedIn = !isError && !!data;
      setIsLoggin(loggedIn);
      localStorage.setItem('isLoggin', JSON.stringify(loggedIn));
    }
  }, [isLoading, isError, data]);

  return (
    <AppContext.Provider value={{ isLoggin, setIsLoggin, stripePromise }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
