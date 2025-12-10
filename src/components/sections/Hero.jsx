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
        <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-primary-200/60 bg-gradient-to-r from-primary-50 to-white text-primary-700 text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
                            Today's Special: {dailyMenu?.special || 'Maharashtrian Thali'}
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] text-dark-900 tracking-tight">
                            Experience the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600 drop-shadow-sm">Warmth of Home</span> <br />
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
                        className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
                    >
                        <Button
                            size="lg"
                            onClick={() => scrollToSection('menu')}
                            className="bg-primary-500 hover:bg-primary-600 text-white border-none px-10 text-lg w-full sm:w-auto font-bold shadow-xl shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-1"
                        >
                            View Menu <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => scrollToSection('plans')}
                            className="border-2 border-dark-200 hover:border-dark-300 text-dark-700 hover:bg-white w-full sm:w-auto font-bold hover:text-dark-900"
                        >
                            Our Plans
                        </Button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="pt-10 flex items-center justify-center lg:justify-start gap-12 border-t border-dark-100/60"
                    >
                        <div>
                            <p className="text-4xl font-display font-bold text-dark-900">5k+</p>
                            <p className="text-dark-400 text-xs uppercase tracking-widest font-bold mt-1">Meals Served</p>
                        </div>
                        <div className="w-px h-12 bg-dark-200/50"></div>
                        <div>
                            <p className="text-4xl font-display font-bold text-primary-500">4.9</p>
                            <p className="text-dark-400 text-xs uppercase tracking-widest font-bold mt-1">User Rating</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Visual composition */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative hidden lg:block h-[600px] w-full perspective-1000"
                >
                    {/* Abstract Composition */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-tr from-primary-100/30 to-transparent rounded-[2.5rem] border border-white/60 shadow-2xl backdrop-blur-sm"
                    />

                    {/* Floating Glass Cards */}
                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-12 right-12 w-80 min-h-[400px] bg-white rounded-3xl p-5 flex flex-col justify-between z-20 group shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100"
                    >
                        <div className="h-64 rounded-2xl overflow-hidden relative shadow-md group-hover:shadow-lg transition-all duration-500">
                            {/* Network Image or Fallback */}
                            <img
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
                                alt="Royal Thali"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1.5 bg-white/95 backdrop-blur text-primary-700 text-[10px] font-extrabold tracking-widest uppercase rounded-lg shadow-sm">Bestseller</span>
                            </div>
                        </div>
                        <div className="mt-5 px-1">
                            <h3 className="text-2xl font-display text-dark-900 font-bold mb-1">Royal Thali</h3>
                            <div className="flex justify-between items-baseline">
                                <p className="text-primary-600 font-bold text-xl">₹150</p>
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Per Meal</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0], rotate: [0, -1, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-16 left-8 w-72 bg-white rounded-2xl p-6 flex flex-col z-30 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-100"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-secondary-50 text-secondary-600 flex items-center justify-center font-bold border border-secondary-100 shadow-sm">
                                V
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-dark-900 leading-tight">Pure Veg</h4>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Sattvic Prep</p>
                            </div>
                        </div>
                        <p className="text-dark-600 text-sm leading-relaxed italic font-medium">
                            "The paneer butter masala is absolutely divine! Reminds me of mom's cooking."
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <div className="w-[1.5px] h-16 bg-gradient-to-b from-primary-300 via-primary-200 to-transparent rounded-full"></div>
                <span className="text-[10px] text-primary-400 tracking-[0.3em] uppercase font-bold animate-pulse">Scroll</span>
            </motion.div>
        </section>
    );
};

export default Hero;
