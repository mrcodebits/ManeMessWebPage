import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ variant = 'light' }) => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const languages = [
        { code: 'en', label: 'English', short: 'EN' },
        { code: 'hi', label: 'हिंदी', short: 'HI' },
        { code: 'mr', label: 'मराठी', short: 'MR' }
    ];

    const isDark = variant === 'dark';

    return (
        <div className={`flex items-center gap-1 p-1 rounded-lg border backdrop-blur-sm ${isDark
                ? 'bg-white/5 border-white/10'
                : 'bg-gray-50/50 border-gray-200/50'
            }`}>
            <Globe size={14} className={isDark ? "text-gray-500" : "text-gray-400 ml-1.5"} />
            <div className="flex">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${i18n.language === lang.code
                                ? (isDark ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-primary-600 shadow-sm border border-gray-100')
                                : (isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-dark-900 hover:bg-gray-100')
                            }`}
                        title={lang.label}
                    >
                        {lang.short}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
