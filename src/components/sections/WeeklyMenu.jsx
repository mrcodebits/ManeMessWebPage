import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Star, Leaf, Clock } from 'lucide-react';

const menuData = {
    Monday: {
        Lunch: {
            items: ["Paneer Butter Masala", "Dal Tadka", "3 Chapatis", "Jeera Rice", "Salad & Pickle", "Gulab Jamun"],
            calories: "650 kcal",
            tags: ["Bestseller", "Mild Spice"]
        },
        Dinner: {
            items: ["Aloo Gobi", "Dal Fry", "3 Chapatis", "Steamed Rice", "Curd", "Fruit Salad"],
            calories: "500 kcal",
            tags: ["Light", "Homestyle"]
        }
    },
    Tuesday: {
        Lunch: {
            items: ["Veg Kolhapuri", "Dal Makhani", "3 Chapatis", "Pulao", "Raita", "Soojji Halwa"],
            calories: "700 kcal",
            tags: ["Spicy", "Rich"]
        },
        Dinner: {
            items: ["Baingan Bharta", "Moong Dal", "3 Chapatis", "Rice", "Buttermilk", "Salad"],
            calories: "450 kcal",
            tags: ["Healthy", "Low Oil"]
        }
    },
    Wednesday: {
        Lunch: {
            items: ["Chole Masala", "Mix Veg", "2 Parathas", "Jeera Rice", "Onion Salad", "Kheer"],
            calories: "750 kcal",
            tags: ["Chef Special", "Protein Rich"]
        },
        Dinner: {
            items: ["Bhindi Masala", "Dal Tadka", "3 Chapatis", "Rice", "Curd", "Papad"],
            calories: "480 kcal",
            tags: ["Homestyle"]
        }
    },
    Thursday: {
        Lunch: {
            items: ["Kadhai Paneer", "Rajma Masala", "3 Chapatis", "Rice", "Green Salad", "Fruit Custard"],
            calories: "680 kcal",
            tags: ["Popular"]
        },
        Dinner: {
            items: ["Lauki Kofta", "Yellow Dal", "3 Chapatis", "Rice", "Buttermilk", "Pickle"],
            calories: "460 kcal",
            tags: ["Light Dinner"]
        }
    },
    Friday: {
        Lunch: {
            items: ["Dum Aloo", "Palak Dal", "3 Chapatis", "Veg Biryani", "Raita", "Shrikhand"],
            calories: "800 kcal",
            tags: ["Sweet Treat", "Feast"]
        },
        Dinner: {
            items: ["Sev Tamatar", "Dal Fry", "3 Chapatis", "Rice", "Roasted Papad", "Salad"],
            calories: "500 kcal",
            tags: ["Kathiyawadi Special"]
        }
    },
    Saturday: {
        Lunch: {
            items: ["Matar Paneer", "Dal Tadka", "3 Chapatis", "Jeera Rice", "Kachumber Salad", "Moong Dal Halwa"],
            calories: "720 kcal",
            tags: ["Weekend Special"]
        },
        Dinner: {
            items: ["Masala Khichdi", "Kadhi", "Bhajiya (2pcs)", "Papad", "Pickle", "Chaas"],
            calories: "600 kcal",
            tags: ["Comfort Food"]
        }
    },
    Sunday: {
        Lunch: {
            items: ["Special Thali", "Paneer Tikka Masala", "Dal Makhani", "2 Naan/Roti", "Veg Pulao", "Ice Cream"],
            calories: "900 kcal",
            tags: ["Sunday Feast", "Premium"]
        },
        Dinner: {
            items: ["Light Khichdi", "Soup", "Roasted Papad"],
            calories: "300 kcal",
            tags: ["Detox Dinner"]
        }
    }
};

const days = Object.keys(menuData);

const WeeklyMenu = () => {
    const [activeDay, setActiveDay] = useState('Monday');

    return (
        <section className="py-24 relative z-10" id="menu">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="What's Cooking This Week?"
                    subtitle="Fresh • Nutritious • Delicious"
                />

                {/* Days Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-16">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${activeDay === day
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 border-primary-500 scale-105 active:scale-95'
                                : 'bg-white text-dark-500 hover:bg-white hover:text-primary-600 hover:border-primary-200 hover:shadow-md active:scale-95'
                                }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Menu Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeDay}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                    >
                        {/* Lunch Card */}
                        <MenuCard
                            title="Lunch"
                            time="12:00 PM - 2:30 PM"
                            data={menuData[activeDay].Lunch}
                            icon={<Star className="w-5 h-5 text-primary-500" />}
                        />

                        {/* Dinner Card */}
                        <MenuCard
                            title="Dinner"
                            time="7:30 PM - 9:30 PM"
                            data={menuData[activeDay].Dinner}
                            icon={<Leaf className="w-5 h-5 text-secondary-500" />}
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="text-center mt-12">
                    <p className="text-dark-400 text-sm italic font-medium">
                        * Menu is subject to minor changes based on seasonal vegetable availability.
                    </p>
                </div>
            </div>
        </section>
    );
};

const MenuCard = ({ title, time, data, icon }) => (
    <div className="bg-white p-8 rounded-[2rem] relative overflow-hidden group border border-dark-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-0 transition-opacity duration-500" />

        <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-3xl font-display font-bold text-dark-900 flex items-center gap-3">
                        {title} {icon}
                    </h3>
                    <p className="text-dark-500 flex items-center gap-2 text-sm mt-2 font-medium">
                        <Clock className="w-4 h-4 text-primary-400" /> {time}
                    </p>
                </div>
                <span className="bg-primary-50 border border-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {data.calories}
                </span>
            </div>

            <div className="space-y-4 mb-8">
                {data.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 group/item">
                        <div className="w-2 h-2 rounded-full bg-primary-400 group-hover/item:scale-125 transition-transform" />
                        <span className="text-dark-700 font-medium tracking-wide">{item}</span>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 flex-wrap">
                {data.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-bold text-dark-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg uppercase tracking-wider hover:bg-primary-50 hover:text-primary-700 transition-colors">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

export default WeeklyMenu;
