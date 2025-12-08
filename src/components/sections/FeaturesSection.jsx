import SectionHeading from '../ui/SectionHeading';
import { ShieldCheck, Heart, Truck, Utensils } from 'lucide-react';

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-white" />,
        title: "100% Hygienic",
        description: "Our kitchen follows strict hotel-grade hygiene protocols. Hairnets, gloves, and regular sanitization are mandatory.",
        color: "bg-primary-600"
    },
    {
        icon: <Heart className="w-8 h-8 text-white" />,
        title: "Homestyle Taste",
        description: "No excess oil, no soda, no artificial colors. Just pure, wholesome food that tastes like mom's cooking.",
        color: "bg-secondary-600"
    },
    {
        icon: <Truck className="w-8 h-8 text-white" />,
        title: "On-Time Delivery",
        description: "Hot tiffins delivered to your doorstep. Live tracking available for dinner deliveries.",
        color: "bg-primary-700"
    },
    {
        icon: <Utensils className="w-8 h-8 text-white" />,
        title: "Weekly Variety",
        description: "We hate 'Boring' too. Our menu changes every week to ensure you never get tired of the same food.",
        color: "bg-secondary-700"
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <SectionHeading
                            title="Why Choose Annapurna?"
                            subtitle="अतिथी देवो भव (Atithi Devo Bhava)"
                            centered={false}
                        />
                        <p className="text-dark-600 text-lg mb-8 leading-relaxed">
                            In our culture, serving food is an act of worship. We bring that same devotion to your daily tiffin, ensuring every meal is Satvik, healthy, and full of love.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${feature.color} shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-900 mb-1">{feature.title}</h4>
                                        <p className="text-sm text-dark-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-primary-500/10 rounded-[3rem] -rotate-6" />
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop"
                                alt="Healthy Salad Bowl"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
