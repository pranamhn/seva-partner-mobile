import React, { createContext, useContext, useState } from 'react';
import { BRAND } from '../constants/colors';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [status, setStatus] = useState('online'); // 'online' | 'busy' | 'offline'
  const [surge, setSurge] = useState(false);
  const [brandKey, setBrandKey] = useState('cyan');
  const [lang, setLang] = useState('id');

  const brand = BRAND[brandKey] || BRAND.cyan;

  return (
    <AppContext.Provider value={{ status, setStatus, surge, setSurge, brandKey, setBrandKey, lang, setLang, brand }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
