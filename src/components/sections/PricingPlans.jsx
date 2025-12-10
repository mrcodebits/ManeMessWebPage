import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { Check, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
    {
        name: "Student Lite",
        price: "2800",
        period: "/month",
        description: "Perfect for students who skip a few meals.",
        features: [
            "Lunch OR Dinner (Mon-Sat)",
            "Sunday Lunch Included",
            "2 Skips allowed per month",
            "Basic Menu Access",
            "No Delivery (Pickup Only)"
        ],
        highlight: false,
        delay: 0.1
    },
    {
        name: "Standard Monthly",
        price: "4500",
        period: "/month",
        description: "Our most popular balanced meal plan.",
        features: [
            "Lunch AND Dinner (Mon-Sat)",
            "Sunday Feast Included",
            "4 Skips allowed per month",
            "Includes Sweet Dish (2x week)",
            "Free Delivery within 2km"
        ],
        highlight: true,
        delay: 0.2
    },
    {
        name: "Premium Health",
        price: "6000",
        period: "/month",
        description: "Low oil, high protein, customizable.",
        features: [
            "All Meals Included (Mon-Sun)",
            "Customizable Roti (Wheat/Jowar)",
            "Unlimited Skips & Pauses",
            "Daily Salad & Fruit Bowl",
            "Priority Delivery"
        ],
        highlight: false,
        delay: 0.3
    }
];

const PricingPlans = () => {
    return (
        <section className="py-24 relative z-10" id="plans">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="Invest in Your Health"
                    subtitle="Simple, Transparent Pricing"
                />

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: plan.delay, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative rounded-[2rem] p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 border 
                                ${plan.highlight
                                    ? 'bg-white border-primary-500 shadow-2xl shadow-primary-500/10 scale-105 z-10'
                                    : 'bg-white border-dark-100 shadow-xl hover:shadow-2xl hover:border-primary-200'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg tracking-widest uppercase flex items-center gap-2">
                                    <Crown size={14} fill="currentColor" /> Most Popular
                                </div>
                            )}

                            <div className="mb-8 text-center mt-4">
                                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-primary-600' : 'text-dark-900'}`}>{plan.name}</h3>
                                <p className="text-dark-500 text-sm h-10 leading-relaxed font-medium">{plan.description}</p>
                                <div className="mt-8 flex items-baseline justify-center">
                                    <span className={`text-5xl font-display font-bold ${plan.highlight ? 'text-dark-900' : 'text-dark-800'}`}>₹{plan.price}</span>
                                    <span className="text-gray-400 ml-2">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow px-2">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-dark-600 font-medium">
                                        <div className={`mt-0.5 rounded-full p-0.5 ${plan.highlight ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full py-4 text-sm font-bold tracking-wide rounded-xl transition-all duration-300
                                    ${plan.highlight
                                        ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl shadow-primary-500/30 hover:-translate-y-0.5'
                                        : 'bg-white hover:bg-gray-50 text-dark-800 border-2 border-dark-100 hover:border-dark-300 hover:shadow-md'
                                    }`}
                            >
                                Choose {plan.name}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center bg-white p-10 rounded-[2rem] border border-dark-100 shadow-lg max-w-3xl mx-auto relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-primary-50/50 -z-10" />
                    <h3 className="text-2xl font-display font-bold text-dark-900 mb-4">🤝 The Mane Family Promise</h3>
                    <p className="text-dark-600 text-lg italic leading-relaxed">
                        "When you subscribe to Mane Mess, you aren't just a customer number.
                        You become part of our family. If you're sick, tell us, and we'll send you soft Khichdi.
                        If you're celebrating, we'll send an extra sweet."
                    </p>
                    <div className="mt-6 font-bold text-primary-600 text-sm uppercase tracking-widest">- The Mane Family</div>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingPlans;
