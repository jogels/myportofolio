import React, { createContext, useContext, useState } from 'react';
import { DICTIONARY } from '../translations/dictionary';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('erzadev_lang') || 'ID';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('erzadev_lang', newLang);
  };

  const t = (key) => {
    if (DICTIONARY[lang] && DICTIONARY[lang][key]) {
      return DICTIONARY[lang][key];
    }
    if (DICTIONARY.ID && DICTIONARY.ID[key]) {
      return DICTIONARY.ID[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
