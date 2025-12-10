import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
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
        { name: 'Home', path: '#' },
        { name: 'Menu', path: '#menu' },
        { name: 'Plans', path: '#plans' },
        { name: 'About', path: '#about' },
        { name: 'Contact', path: '#contact' },
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
                "w-full max-w-7xl mx-6 rounded-full px-6 py-3 flex justify-between items-center transition-all duration-500",
                scrolled
                    ? "bg-white/90 backdrop-blur-xl border border-dark-100/20 shadow-lg shadow-black/5"
                    : "bg-transparent border border-transparent"
            )}>
                {/* Logo & Brand */}
                <a href="#" className="flex items-center gap-3 group">
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
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={(e) => handleNavClick(e, link.path)}
                            className="text-sm font-medium text-dark-700 hover:text-primary-600 transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-primary-400 transition-all duration-300 -translate-x-1/2 group-hover:w-full"></span>
                        </a>
                    ))}
                    <Button
                        size="sm"
                        className="bg-primary-500 hover:bg-primary-600 text-white border-none rounded-full px-6 font-semibold shadow-lg shadow-primary-500/20"
                        onClick={(e) => handleNavClick(e, '#plans')}
                    >
                        Subscribe
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-dark-900 hover:text-primary-600 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-6 right-6 p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/20 shadow-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-4 text-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    className="text-lg font-display text-dark-800 hover:text-primary-600 transition-colors"
                                    onClick={(e) => handleNavClick(e, link.path)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button className="w-full mt-2 bg-primary-500 text-white" onClick={(e) => handleNavClick(e, '#plans')}>
                                Subscribe Now
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
