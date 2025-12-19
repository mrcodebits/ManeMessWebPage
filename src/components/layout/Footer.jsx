import { Facebook, Instagram, Twitter, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-white border-t border-primary-100 pt-20 pb-10 overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Big Brand Typography */}
                <div className="mb-20 opacity-5 select-none pointer-events-none">
                    <h1 className="text-[12vw] leading-none font-display font-bold text-center tracking-tighter text-dark-900">
                        MANEMESS
                    </h1>
                </div>

                <div className="grid md:grid-cols-4 gap-12 mb-12 relative z-10">
                    <div className="space-y-6 text-center md:text-left">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <img src="/images/logo.png" alt="Mane Mess" className="h-14 w-auto object-contain" />
                            <span className="text-2xl font-display font-bold text-dark-900">
                                Mane <span className="text-primary-600">Mess</span>
                            </span>
                        </Link>
                        <p className="text-dark-600 text-base leading-relaxed">
                            Bringing the warmth of home-cooked meals to your doorstep in Pune. Healthy, hygienic, and affordable.
                        </p>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="font-bold text-dark-900 mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-4 text-dark-600">
                            <li><a href="#menu" onClick={(e) => handleScroll(e, 'menu')} className="hover:text-primary-600 transition-colors">Weekly Menu</a></li>
                            <li><a href="#plans" onClick={(e) => handleScroll(e, 'plans')} className="hover:text-primary-600 transition-colors">Plans & Pricing</a></li>
                            <li><a href="#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-primary-600 transition-colors">About Us</a></li>
                            <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-primary-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="font-bold text-dark-900 mb-6 text-lg">Contact</h4>
                        <ul className="space-y-4 text-dark-600">
                            <li>Hingne Home Colony, Karvenagar</li>
                            <li>Pune, Maharashtra 411052</li>
                            <li>+91 98765 43210</li>
                            <li>hello@manemess.com</li>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="font-bold text-dark-900 mb-6 text-lg">Follow Us</h4>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <a href="#" className="p-3 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-all hover:scale-110"><Instagram size={24} /></a>
                            <a href="#" className="p-3 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-all hover:scale-110"><Facebook size={24} /></a>
                            <a href="#" className="p-3 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-all hover:scale-110"><Twitter size={24} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-dark-100 mt-16 pt-8 text-center text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} Mane Mess. All rights reserved.</p>
                    <Link to="/admin" className="text-sm font-medium text-dark-400 hover:text-primary-500 transition-colors">Admin Login</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
