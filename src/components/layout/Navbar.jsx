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
            "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
            scrolled ? "bg-white/90 backdrop-blur-xl border-primary-100 shadow-sm py-3" : "bg-transparent py-5"
        )}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 group">
                    <span className="text-2xl font-display font-bold text-dark-900">Mane<span className="text-primary-600">Mess</span></span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={(e) => handleNavClick(e, link.path)}
                            className="text-dark-700 hover:text-primary-600 font-medium transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <Button size="sm" variant="default" onClick={(e) => handleNavClick(e, '#plans')}>Subscribe Now</Button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-dark-800" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-primary-100 overflow-hidden shadow-xl"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    className="text-lg font-medium text-dark-800"
                                    onClick={(e) => handleNavClick(e, link.path)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button className="w-full" onClick={(e) => handleNavClick(e, '#plans')}>Subscribe Now</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
