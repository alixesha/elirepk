import { createContext, useContext, useState, ReactNode } from 'react';
import { NavigationState, Page } from '../types';

interface NavigationContextType {
  nav: NavigationState;
  navigate: (page: Page, options?: { productId?: string; category?: string }) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState<NavigationState>({ page: 'home' });

  const navigate = (page: Page, options?: { productId?: string; category?: string }) => {
    setNav({ page, ...options });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ nav, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
