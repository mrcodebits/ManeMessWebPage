import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { en } from "./locales/en";
import { hi } from "./locales/hi";
import { mr } from "./locales/mr";

// Initialize i18next
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en,
            hi,
            mr,
        },
        fallbackLng: "en",
        debug: true, // Enable debug mode for now to catch issues
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'], // Persist language choice
        }
    });

export default i18n;
