import SectionHeading from '../ui/SectionHeading';
import { ShieldCheck, Heart, Truck, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-secondary-500" />,
        title: "100% Hygienic",
        description: "Our kitchen follows strict hotel-grade hygiene protocols. Hairnets, gloves, and regular sanitization are mandatory.",
        delay: 0.1
    },
    {
        icon: <Heart className="w-8 h-8 text-primary-500" />,
        title: "Homestyle Taste",
        description: "No excess oil, no soda, no artificial colors. Just pure, wholesome food that tastes like mom's cooking.",
        delay: 0.2
    },
    {
        icon: <Truck className="w-8 h-8 text-primary-500" />,
        title: "On-Time Delivery",
        description: "Hot tiffins delivered to your doorstep. Live tracking available for dinner deliveries.",
        delay: 0.3
    },
    {
        icon: <Utensils className="w-8 h-8 text-secondary-500" />,
        title: "Weekly Variety",
        description: "We hate 'Boring' too. Our menu changes every week to ensure you never get tired of the same food.",
        delay: 0.4
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-2 block">Why Choose Us</span>
                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-dark-900 mb-6 leading-tight">
                            The Purest Form of <br />
                            <span className="text-primary-600">Culinary Devotion.</span>
                        </h2>
                        <p className="text-dark-600 text-lg mb-10 leading-relaxed font-normal">
                            In our culture, serving food is an act of worship. We bring that same devotion to your daily tiffin, ensuring every meal is Satvik, healthy, and full of love.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: feature.delay, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="p-6 transition-all duration-300 group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 hover:border-primary-100"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-white flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary-100 shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <h4 className="font-bold text-dark-900 mb-3 text-lg font-display">{feature.title}</h4>
                                    <p className="text-sm text-dark-500 leading-relaxed font-medium group-hover:text-dark-600 transition-colors">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative hidden lg:block"
                    >
                        <div className="absolute inset-0 bg-primary-200/50 rounded-[3rem] rotate-6 blur-3xl animate-pulse" />
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/40 group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop"
                                alt="Healthy Salad Bowl"
                                className="w-full h-[600px] object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />

                            <div className="absolute bottom-10 left-10 right-10 z-20">
                                <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl flex items-center gap-4 shadow-lg">
                                    <div className="text-4xl font-display font-bold text-primary-600">100%</div>
                                    <div className="text-dark-900 font-medium leading-tight">
                                        Nutritionally Balanced <br /> Daily Meals
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
