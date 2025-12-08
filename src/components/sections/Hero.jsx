import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-primary-50">

            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50/95 via-primary-50/80 to-white/70 z-10" />
                <div className="absolute inset-0 bg-primary-500/10 mix-blend-overlay z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                    poster="https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2000&auto=format&fit=crop"
                >
                    <source src="https://cdn.coverr.co/videos/coverr-preparing-indian-food-5254/1080p.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-20">

                {/* Text Content */}
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm text-primary-800 rounded-full text-sm font-bold shadow-sm mb-6 border border-primary-200">
                            🕉️ अन्न हे पूर्णब्रह्म (Ann He Purnabrahma)
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-dark-900 leading-[1.1] mb-6">
                            Ghar ka Khana, <br />
                            <span className="text-gradient-gold">Delivered Warm.</span>
                        </h1>
                        <p className="text-xl text-dark-700 mb-8 leading-relaxed font-medium">
                            Experience the taste of home with Pune's most trusted mess service.
                            Daily rotating menus, fresh ingredients, and delivered right to your doorstep.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Button size="lg" className="shadow-primary-200 shadow-xl border-white hover:border-primary-200">
                                View Today's Menu <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="bg-white/80 backdrop-blur-sm hover:bg-white border-primary-600 text-primary-700">
                                Check Plans
                            </Button>
                        </div>

                        <div className="flex items-center gap-6 text-sm font-medium text-dark-800 bg-white/60 p-4 rounded-2xl w-fit backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-secondary-600 w-5 h-5" /> No Preservatives
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-secondary-600 w-5 h-5" /> Free Delivery
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Image Content */}
                <div className="relative hidden md:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-10"
                    >
                        {/* Main Focus Image instead of pattern */}
                        <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 bg-gray-100 relative group rotate-2 hover:rotate-0 transition-all duration-700">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                                alt="Delicious Indian Thali"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>

                        {/* Floating Ratings Card */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white flex items-center gap-4"
                        >
                            <div className="bg-primary-100 p-3 rounded-full text-2xl">😋</div>
                            <div>
                                <div className="font-bold text-dark-900">4.9/5 Rating</div>
                                <div className="text-xs text-gray-500">Based on 1200+ Reviews</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
