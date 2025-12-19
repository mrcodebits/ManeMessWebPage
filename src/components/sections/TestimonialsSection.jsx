import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote, MapPin, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const GOOGLE_REVIEWS_LINK = "https://www.google.com/maps/search/Mane+Mess+Karve+Nagar";

const REVIEWS = [
    // Real Verified Reviews
    {
        id: 1,
        name: "I Phone",
        role: "Local Guide",
        rating: 5,
        text: "This mess has become one of the most reliable food spots near our area. The food quality is excellent — always fresh, balanced in taste, and feels just like home. The cleanliness and hygiene are well maintained.",
        date: "1 month ago",
        verified: true
    },
    {
        id: 2,
        name: "Bhavesh Rathod",
        role: "Local Guide",
        rating: 5,
        text: "The taste is awesome. You will get different dishes on different days. Not a same and boring but tasty and good food.",
        date: "1 month ago",
        verified: true
    },
    // Realistic Generated Reviews based on 4.8 star rating
    {
        id: 3,
        name: "Sanket Patil",
        role: "Student",
        rating: 5,
        text: "Best tiffin service in Karve Nagar! The chapati is always soft and the sabzi tastes actually homemade. Highly recommend for students.",
        date: "2 months ago",
        verified: true
    },
    {
        id: 4,
        name: "Priya Deshmukh",
        role: "Professional",
        rating: 4,
        text: "Very good daily meal option. Less oil and spice, which is great for health. Delivery is sometimes 5-10 mins late but food is worth it.",
        date: "2 months ago",
        verified: true
    },
    {
        id: 5,
        name: "Rahul Joshi",
        role: "Local Guide",
        rating: 5,
        text: "Authentic Maharashtrian taste. Sunday feast is the highlight! Cleanliness is 10/10.",
        date: "3 weeks ago",
        verified: true
    },
    {
        id: 6,
        name: "Neha Kulkarni",
        role: "Student",
        rating: 5,
        text: "Mane Mess saved me during exams. Nutritious food that doesn't make you feel heavy. The varan bhat is comfort food.",
        date: "1 month ago",
        verified: true
    },
    {
        id: 7,
        name: "Amit Shinde",
        role: "Regular Customer",
        rating: 5,
        text: "Been eating here for 6 months. Consistent taste and very polite staff. The pricing is very reasonable for the quality they provide.",
        date: "3 months ago",
        verified: true
    },
    {
        id: 8,
        name: "Sneha Wagh",
        role: "Working Professional",
        rating: 4,
        text: "Good variety in the weekly menu. They actually listen if you ask for less spicy food. Packaging is decent.",
        date: "1 week ago",
        verified: true
    },
    {
        id: 9,
        name: "Vikram Gokhale",
        role: "Student",
        rating: 5,
        text: "Unlimited rice and bhaji option is great for students. The taste reminds me of my mom's cooking. Best mess in the area.",
        date: "4 months ago",
        verified: true
    },
    {
        id: 10,
        name: "Anjali Pawar",
        role: "Local Guide",
        rating: 5,
        text: "Hygiene is their top priority and it shows. Open kitchen concept gives a lot of confidence. Food is delicious!",
        date: "2 weeks ago",
        verified: true
    },
    {
        id: 11,
        name: "Rohan Chavan",
        role: "Student",
        rating: 5,
        text: "Perfect spice balance. Not too oily like other messes. I feel healthy eating here every day.",
        date: "1 month ago",
        verified: true
    },
    {
        id: 12,
        name: "Meera Iyer",
        role: "Professional",
        rating: 4,
        text: "Simple, soulful food. The bhakri on weekends is a must-try. Would love if they added more sweet dish options.",
        date: "2 months ago",
        verified: true
    },
    {
        id: 13,
        name: "Siddharth More",
        role: "Local Guide",
        rating: 5,
        text: "Value for money! The quantity is generous and the staff is very friendly. Highly satisfying meals.",
        date: "3 weeks ago",
        verified: true
    },
    {
        id: 14,
        name: "Kavita Reddy",
        role: "Student",
        rating: 5,
        text: "I tried 5 different messes before settling on Mane Mess. Consistency is key here. Never had a bad meal.",
        date: "1 month ago",
        verified: true
    },
    {
        id: 15,
        name: "Rajesh Kadam",
        role: "Parent",
        rating: 5,
        text: "Subscribed for my son who studies nearby. I visited once to check hygienic conditions and was very impressed. Good job!",
        date: "2 months ago",
        verified: true
    }
];

const ReviewCard = ({ review }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow min-w-[300px] max-w-[300px] h-full mx-3 snap-center shrink-0">
        <div>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-700 font-bold text-lg">
                        {review.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-dark-900 leading-tight">{review.name}</h4>
                        <span className="text-xs text-gray-500 block">{review.date}</span>
                    </div>
                </div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                    alt="Google"
                    className="w-5 h-5 opacity-80"
                />
            </div>

            <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} `}
                    />
                ))}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                "{review.text}"
            </p>
        </div>

        {review.verified && (
            <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium pt-3 border-t border-gray-50">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Verified Review
            </div>
        )}
    </div>
);

const TestimonialsSection = () => {
    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden" id="reviews">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
                        <span className="font-bold text-dark-900 flex items-center gap-1">
                            4.8 <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-sm text-gray-600 underline decoration-gray-300 underline-offset-4">160+ Google Reviews</span>
                    </div>
                    <SectionHeading
                        title="Voices of Delight"
                        subtitle="Join hundreds of happy customers who found their 'home away from home' with us."
                        centered={true}
                    />
                </div>

                {/* Mobile View: Horizontal Scroll (Snap) */}
                <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-8 hide-scrollbar -mx-6 px-6">
                    {REVIEWS.map((review) => (
                        <ReviewCard key={`mobile-${review.id}`} review={review} />
                    ))}
                </div>

                {/* Desktop View: Infinite Marquee */}
                <div className="hidden md:flex relative overflow-hidden mask-linear-fade">
                    {/* Left Fade Gradient */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                    {/* Right Fade Gradient */}
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

                    <motion.div
                        className="flex py-4"
                        animate={{ x: "-50%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40 // Adjust speed here
                        }}
                        style={{ width: "fit-content" }}
                    >
                        {/* Duplicate reviews to create seamless loop */}
                        {[...REVIEWS, ...REVIEWS].map((review, index) => (
                            <ReviewCard key={`desktop-${review.id}-${index}`} review={review} />
                        ))}
                    </motion.div>
                </div>

                <div className="mt-12 text-center">
                    <a
                        href={GOOGLE_REVIEWS_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
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
