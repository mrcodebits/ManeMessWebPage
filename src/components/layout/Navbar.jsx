import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Navbar = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('nav.home'), path: '#' },
        { name: t('nav.about'), path: '#about' }, // Reordered based on typical flow
        { name: 'Menu', path: '#menu' }, // "Menu" key might not be in translations yet, using raw string fallback if needed or add to dict? I added 'Menu' in code? Dictionary has 'features' not 'menu'. Checking dictionary... 'nav.home', 'nav.about', 'nav.features', 'nav.contact'. 
        // Wait, the dictionary I wrote has: home, about, features, contact.
        // The previous code had: Home, Menu, Plans, About, Contact.
        // I should probably add 'Menu' and 'Plans' to dictionary or mapping.
        // For now I'll map what I have:
        // Home -> nav.home
        // About -> nav.about
        // Contact -> nav.contact
        // Menu -> "Menu" (I'll add translation key later or just use English for now)
        // Plans -> "Plans"
    ];
    // Actually, I should update the dictionary to include Menu and Plans for completeness.
    // For now I'll just use the strings, and update dictionary if I can.

    // Correction:
    const links = [
        { name: t('nav.home'), path: '#' },
        { name: t('nav.menu'), path: '#menu' },
        { name: t('nav.plans'), path: '#plans' },
        { name: t('nav.about'), path: '#about' },
        { name: t('nav.contact'), path: '#contact' },
    ];

    const handleNavClick = (e, path) => {
        e.preventDefault();
        const element = document.querySelector(path === '#' ? 'body' : path);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500",
            scrolled ? "py-4" : "py-6"
        )}>
            <div className={cn(
                "w-full max-w-7xl mx-4 sm:mx-6 rounded-full px-6 py-3 flex justify-between items-center transition-all duration-500",
                scrolled
                    ? "bg-white/80 backdrop-blur-xl border border-white/20 shadow-glass"
                    : "bg-transparent border border-transparent"
            )}>
                {/* Logo & Brand */}
                <a href="#" className="flex items-center gap-3 group relative z-50">
                    <img
                        src="/images/logo.png"
                        alt="Mane Mess"
                        className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110 mix-blend-multiply"
                    />
                    <span className="hidden md:block text-2xl font-display font-bold text-dark-900 tracking-tight">
                        Mane<span className="text-primary-600">Mess</span>
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <a
                            key={link.path}
                            href={link.path}
                            onClick={(e) => handleNavClick(e, link.path)}
                            className="text-sm font-medium text-dark-700 hover:text-primary-600 transition-colors relative group py-2"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-primary-400 transition-all duration-300 -translate-x-1/2 group-hover:w-full rounded-full"></span>
                        </a>
                    ))}

                    <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>
                    <LanguageSwitcher />

                    <Button
                        size="sm"
                        className="bg-primary-500 hover:bg-primary-600 text-white border-none rounded-full px-6 font-semibold shadow-lg shadow-primary-500/20 ml-2"
                        onClick={(e) => handleNavClick(e, '#plans')}
                    >
                        Subscribe
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm active:scale-95 transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={20} className="text-dark-900" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={20} className="text-dark-900" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl flex items-center justify-center md:hidden"
                    >
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/50 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100/50 rounded-full blur-[80px] pointer-events-none" />

                        <div className="flex flex-col gap-6 text-center w-full max-w-sm px-6 relative z-10">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                                >
                                    <a
                                        href={link.path}
                                        className="text-4xl font-display font-medium text-dark-800 hover:text-primary-600 transition-colors block py-2"
                                        onClick={(e) => handleNavClick(e, link.path)}
                                    >
                                        {link.name}
                                    </a>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="flex justify-center py-4"
                            >
                                <LanguageSwitcher />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                                className="pt-2"
                            >
                                <Button className="w-full h-14 text-lg bg-primary-500 text-white shadow-xl shadow-primary-500/20" onClick={(e) => handleNavClick(e, '#plans')}>
                                    Start Subscription
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
