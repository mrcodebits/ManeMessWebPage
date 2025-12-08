import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const festivals = [
    {
        name: "Ganesh Chaturthi",
        dish: "Ukadiche Modak",
        desc: "Steamed rice dumplings filled with coconut & jaggery, served with ghee.",
        image: "https://images.unsplash.com/photo-1631867675167-90a456a90863?q=80&w=800&auto=format&fit=crop", // Modak placeholder
        month: "September"
    },
    {
        name: "Gudi Padwa",
        dish: "Shrikhand Puri",
        desc: "Smooth, saffron-spiced strained yogurt served with fluffy hot puris.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop", // Shrikhand placeholder
        month: "April"
    },
    {
        name: "Holi",
        dish: "Puran Poli",
        desc: "Sweet flatbread stuffed with lentil and jaggery filling, a true classic.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop", // Puranpoli placeholder
        month: "March"
    },
    {
        name: "Diwali",
        dish: "Faral & Basundi",
        desc: "A festive feast with Chakli, Chivda and rich creamy Basundi.",
        image: "https://images.unsplash.com/photo-1605351473337-93d964319884?q=80&w=800&auto=format&fit=crop", // Diwali placeholder
        month: "November"
    }
];

const FestiveSpecials = () => {
    return (
        <section className="py-24 bg-white bg-pattern-royal relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-100/30 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <SectionHeading
                    title="Festive Feasts"
                    subtitle="Celebrations on a Plate"
                />

                <p className="text-center text-lg text-dark-600 max-w-2xl mx-auto mb-16">
                    Maharashtra is a land of festivals, and no festival is complete without its special dish.
                    At Mane Mess, we celebrate every occasion with authentic traditional sweets and thalis.
                </p>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {festivals.map((fest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary-50"
                        >
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Image Side */}
                                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 md:hidden" />
                                    <img
                                        src={fest.image}
                                        alt={fest.dish}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-dark-800 z-20 shadow-sm">
                                        {fest.month}
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="md:w-1/2 p-8 flex flex-col justify-center relative">
                                    {/* Decorative corner */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary-50 rounded-bl-[4rem] -z-0 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary-100" />

                                    <div className="relative z-10">
                                        <h4 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-2">{fest.name}</h4>
                                        <h3 className="text-2xl font-display font-bold text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">{fest.dish}</h3>
                                        <p className="text-dark-600 leading-relaxed text-sm">{fest.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-block p-6 bg-secondary-50 border border-secondary-100 rounded-2xl max-w-3xl">
                        <h4 className="text-secondary-800 font-bold text-lg mb-2">📅 Mark Your Calendar!</h4>
                        <p className="text-secondary-700 text-sm">
                            These special festive meals are available for all monthly subscribers at <span className="underline decoration-secondary-400 decoration-2 font-bold">no extra cost</span>.
                            Non-members can pre-book seasonal thalis 2 days in advance.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FestiveSpecials;
