import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ml';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    resetToEnglish: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize to 'en'. No localStorage — resets to English on refresh.
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'ml' : 'en'));
    };

    // Explicitly reset to English — called when navigating away from blog pages
    const resetToEnglish = () => {
        setLanguage('en');
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, resetToEnglish }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
