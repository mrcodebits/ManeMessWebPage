import SectionHeading from '../ui/SectionHeading';
import { motion } from 'framer-motion';

const team = [
    {
        name: "Sunita Maus",
        role: "Head Chef",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
        quote: "Cooking for you is like cooking for my own children."
    },
    {
        name: "Raju Bhau",
        role: "Delivery Captain",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
        quote: "Rain or shine, your dabba will reach on time."
    },
    {
        name: "Vimal Kaku",
        role: "Spices Expert",
        image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=600&auto=format&fit=crop",
        quote: "I grind fresh masalas daily. No packets here."
    }
];

const TeamSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="Meet the Makers"
                    subtitle="The Hands That Feed You"
                    centered={true}
                />

                <p className="text-center text-lg text-dark-600 max-w-2xl mx-auto mb-16">
                    Behind every delicious tiffin is a team of dedicated "Mausis" and staff who treat you like family.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group text-center"
                        >
                            <div className="relative mb-6 inline-block">
                                <div className="absolute inset-0 bg-primary-100 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 -z-10" />
                                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-dark-900">{member.name}</h3>
                            <p className="text-primary-600 font-medium text-sm mb-4 uppercase tracking-wide">{member.role}</p>

                            <div className="bg-primary-50 p-4 rounded-xl relative mx-4">
                                <span className="text-4xl text-primary-200 absolute -top-4 left-2">"</span>
                                <p className="text-dark-700 italic relative z-10">{member.quote}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
