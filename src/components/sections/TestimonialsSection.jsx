import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const REVIEWS = [
    {
        id: 1,
        name: "Aditi Deshpande",
        role: "Corporate Professional",
        rating: 5,
        text: "The taste is exactly like home! I've been subscribing for 3 months now. The variety in the weekly menu keeps it exciting, and the hygiene is top-notch.",
        date: "2 weeks ago"
    },
    {
        id: 2,
        name: "Rahul Mehta",
        role: "Student",
        rating: 5,
        text: "Best tiffin service in Pune. Affordable specifically for students, and the quantity is generous. The Sunday special sweets are the best part!",
        date: "1 month ago"
    },
    {
        id: 3,
        name: "Priya Kulkarni",
        role: "Working Mom",
        rating: 5,
        text: "Mane Mess has been a lifesaver. Reliable delivery, hot food, and less spicy which is perfect for my kids too. Highly recommended!",
        date: "3 weeks ago"
    },
    {
        id: 4,
        name: "Suresh Patil",
        role: "Banker",
        rating: 4,
        text: "Very authentic Maharashtrian taste. Reminds me of my village. Service is prompt and the packaging is spill-proof.",
        date: "2 months ago"
    }
];

const TestimonialsSection = () => {
    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden" id="reviews">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <SectionHeading
                    title="Voices of Delight"
                    subtitle="What Our Happy Customers Say"
                    centered={true}
                />

                {/* Scrollable Container for Mobile, Grid for Desktop */}
                <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pb-8 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                    {REVIEWS.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow min-w-[280px] w-[85%] md:w-auto snap-center"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} `}
                                            />
                                        ))}
                                    </div>
                                    <Quote size={24} className="text-primary-100" />
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                                    "{review.text}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-lg">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-dark-900">{review.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span>{review.role}</span>
                                        <span>•</span>
                                        <span>{review.date}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
                    >
                        View all Google Reviews <Star className="w-4 h-4 fill-primary-600" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
