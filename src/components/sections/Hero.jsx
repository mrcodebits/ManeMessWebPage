import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const Hero = () => {
    const { dailyMenu } = useAdmin();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-100/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-200/60 bg-gradient-to-r from-primary-50 to-white text-primary-700 text-xs font-bold tracking-[0.15em] uppercase mb-6 shadow-sm mx-auto lg:mx-0">
                            <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
                            Today's Special: {dailyMenu?.special || 'Maharashtrian Thali'}
                        </span>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium leading-[1.1] text-dark-900 tracking-tight">
                            Experience the <br />
                            <span className="text-primary-600 drop-shadow-sm font-bold">Warmth of Home</span> <br />
                            Cooking
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-dark-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed tracking-wide"
                    >
                        Elevate your daily dining with our award-winning tiffin service.
                        Authentic flavors, curated hygiene, and love in every bite.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col xs:flex-row items-center gap-4 justify-center lg:justify-start"
                    >
                        <Button
                            size="lg"
                            onClick={() => scrollToSection('menu')}
                            className="w-full xs:w-auto px-8 py-4 text-base shadow-xl shadow-primary-500/20 hover:shadow-primary-500/30"
                        >
                            View Menu <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => scrollToSection('plans')}
                            className="w-full xs:w-auto px-8 py-4 text-base"
                        >
                            Our Plans
                        </Button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="pt-10 flex items-center justify-center lg:justify-start gap-8 sm:gap-12 border-t border-dark-100/60"
                    >
                        <div>
                            <p className="text-3xl sm:text-4xl font-display font-bold text-dark-900">5k+</p>
                            <p className="text-dark-400 text-[10px] sm:text-xs uppercase tracking-widest font-bold mt-1">Meals Served</p>
                        </div>
                        <div className="w-px h-10 sm:h-12 bg-dark-200/50"></div>
                        <div>
                            <p className="text-3xl sm:text-4xl font-display font-bold text-primary-500">4.9</p>
                            <p className="text-dark-400 text-[10px] sm:text-xs uppercase tracking-widest font-bold mt-1">User Rating</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Visual composition */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] perspective-1000 order-1 lg:order-2 mb-10 lg:mb-0"
                >
                    {/* Abstract Composition */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-4 sm:inset-0 bg-gradient-to-tr from-primary-100/40 to-white/40 rounded-[2rem] sm:rounded-[2.5rem] border border-white/60 shadow-glass backdrop-blur-sm"
                    />

                    {/* Floating Glass Cards - Main Image */}
                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-8 right-4 sm:right-12 w-64 sm:w-80 bg-white rounded-3xl p-4 sm:p-5 flex flex-col justify-between z-20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/80"
                    >
                        <div className="h-48 sm:h-64 rounded-2xl overflow-hidden relative shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
                                alt="Royal Thali"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-3 left-3">
                                <span className="px-2 py-1 bg-white/90 backdrop-blur text-primary-700 text-[10px] font-extrabold tracking-widest uppercase rounded shadow-sm">Bestseller</span>
                            </div>
                        </div>
                        <div className="mt-4 px-1">
                            <h3 className="text-lg sm:text-2xl font-display text-dark-900 font-bold mb-1">Royal Thali</h3>
                            <div className="flex justify-between items-baseline">
                                <p className="text-primary-600 font-bold text-lg sm:text-xl">₹150</p>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Per Meal</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Secondary Floating Card */}
                    <motion.div
                        animate={{ y: [0, 20, 0], rotate: [0, -1, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-8 left-4 sm:left-8 w-56 sm:w-72 bg-white/95 backdrop-blur rounded-2xl p-4 sm:p-6 flex flex-col z-30 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white/60"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary-50 text-secondary-600 flex items-center justify-center font-bold border border-secondary-100">V</div>
                            <div>
                                <h4 className="text-base sm:text-lg font-bold text-dark-900 leading-tight">Pure Veg</h4>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">Sattvic Prep</p>
                            </div>
                        </div>
                        <p className="text-dark-600 text-xs sm:text-sm leading-relaxed italic font-medium">
                            "The taste reminds me of my mother's kitchen."
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
            >
                <div className="w-[1.5px] h-12 bg-gradient-to-b from-primary-300 via-primary-200 to-transparent rounded-full"></div>
                <span className="text-[10px] text-primary-400 tracking-[0.3em] uppercase font-bold animate-pulse">Scroll</span>
            </motion.div>
        </section>
    );
};

export default Hero;
