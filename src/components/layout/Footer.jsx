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
        <footer className="bg-white border-t border-primary-100 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-3">
                            <img src="/images/logo.svg" alt="Mane Mess" className="h-12 w-auto object-contain" />
                            <span className="text-xl font-display font-bold text-dark-900">
                                Mane <span className="text-primary-600">Mess</span>
                            </span>
                        </Link>
                        <p className="text-dark-600 text-sm">
                            Bringing the warmth of home-cooked meals to your doorstep in Pune. Healthy, hygienic, and affordable.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-dark-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-dark-600">
                            <li><a href="#menu" onClick={(e) => handleScroll(e, 'menu')} className="hover:text-primary-600">Weekly Menu</a></li>
                            <li><a href="#plans" onClick={(e) => handleScroll(e, 'plans')} className="hover:text-primary-600">Plans & Pricing</a></li>
                            <li><a href="#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-primary-600">About Us</a></li>
                            <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-primary-600">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-dark-900 mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-dark-600">
                            <li>Hingne Home Colony, Karvenagar</li>
                            <li>Pune, Maharashtra 411052</li>
                            <li>+91 98765 43210</li>
                            <li>hello@manemess.com</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-dark-900 mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="p-2 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="p-2 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-600 hover:text-white transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-dark-800 mt-16 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Mane Mess. All rights reserved.</p>
                    <Link to="/admin" className="text-xs text-dark-700 hover:text-primary-500 mt-2 inline-block transition-colors">Admin Login</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
