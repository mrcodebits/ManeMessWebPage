import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const festivals = [
    {
        name: "Ganesh Chaturthi",
        dish: "Ukadiche Modak",
        desc: "Steamed rice dumplings filled with coconut & jaggery, served with ghee.",
        image: "https://images.unsplash.com/photo-1631867675167-90a456a90863?q=80&w=800&auto=format&fit=crop",
        month: "September"
    },
    {
        name: "Gudi Padwa",
        dish: "Shrikhand Puri",
        desc: "Smooth, saffron-spiced strained yogurt served with fluffy hot puris.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
        month: "April"
    },
    {
        name: "Holi",
        dish: "Puran Poli",
        desc: "Sweet flatbread stuffed with lentil and jaggery filling, a true classic.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop",
        month: "March"
    },
    {
        name: "Diwali",
        dish: "Faral & Basundi",
        desc: "A festive feast with Chakli, Chivda and rich creamy Basundi.",
        image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=800&auto=format&fit=crop",
        month: "November"
    }
];

const FestiveSpecials = () => {
    return (
        <section className="py-24 relative z-10 overflow-hidden">
            {/* Ambient Background - Warm */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <SectionHeading
                    title="Festive Feasts"
                    subtitle="Celebrations on a Plate"
                />

                <p className="text-center text-lg text-dark-500 max-w-2xl mx-auto mb-20 font-medium leading-relaxed">
                    Maharashtra is a land of festivals, and no festival is complete without its special dish.
                    At Mane Mess, we celebrate every occasion with authentic traditional sweets and thalis.
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                    {festivals.map((fest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group relative h-[300px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                            <img
                                src={fest.image}
                                alt={fest.dish}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                            />

                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex justify-between items-end mb-2">
                                        <h3 className="text-3xl font-display font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">{fest.dish}</h3>
                                        <span className="text-xs font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-white/30">
                                            {fest.month}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-bold text-primary-400 uppercase tracking-widest mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{fest.name}</h4>
                                    <p className="text-white/90 text-sm leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        {fest.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-block p-8 bg-white rounded-3xl max-w-3xl border border-dark-100 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary-50/50 -z-10" />
                        <h4 className="text-dark-900 font-bold text-xl mb-3 flex items-center justify-center gap-2">
                            <span>📅</span> Mark Your Calendar!
                        </h4>
                        <p className="text-dark-600 text-base">
                            These special festive meals are available for all monthly subscribers at <span className="text-primary-600 font-bold">no extra cost</span>.
                            Non-members can pre-book seasonal thalis 2 days in advance.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FestiveSpecials;
