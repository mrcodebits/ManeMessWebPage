import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { Check } from 'lucide-react';

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
        color: "border-gray-200"
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
        color: "border-primary-500 ring-2 ring-primary-500 ring-offset-2"
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
        color: "border-secondary-500"
    }
];

const PricingPlans = () => {
    return (
        <section className="py-20 bg-white bg-pattern-royal relative z-10" id="plans">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="Simple, Honest Pricing"
                    subtitle="No Hidden Charges"
                />

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 card-hover border ${plan.color} flex flex-col`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-primary-500/30 tracking-wide">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8 text-center mt-2">
                                <h3 className="text-xl font-bold text-dark-900 mb-2">{plan.name}</h3>
                                <p className="text-dark-500 text-sm h-10">{plan.description}</p>
                                <div className="mt-6 flex items-baseline justify-center">
                                    <span className="text-4xl font-display font-bold text-dark-900">₹{plan.price}</span>
                                    <span className="text-dark-500 ml-1">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-dark-700">
                                        <Check className="w-5 h-5 text-secondary-600 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.highlight ? 'default' : 'outline'}
                                className="w-full"
                            >
                                Choose {plan.name}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-primary-50 rounded-3xl p-8 border border-primary-100 max-w-3xl mx-auto">
                    <h3 className="text-2xl font-display font-bold text-primary-800 mb-3">🤝 The Mane Family Promise</h3>
                    <p className="text-dark-700 text-lg">
                        "When you subscribe to Mane Mess, you aren't just a customer number.
                        You become part of our family. If you're sick, tell us, and we'll send you soft Khichdi.
                        If you're celebrating, we'll send an extra sweet."
                    </p>
                    <div className="mt-4 font-bold text-dark-900">- The Mane Family</div>
                </div>
            </div>
        </section>
    );
};

export default PricingPlans;
