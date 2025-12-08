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
        <section className="py-20 bg-primary-50/20" id="menu">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="What's Cooking This Week?"
                    subtitle="Fresh • Nutritious • Delicious"
                />

                {/* Days Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeDay === day
                                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-dark-600 hover:bg-primary-50 border border-transparent hover:border-primary-100'
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                    >
                        {/* Lunch Card */}
                        <MenuCard
                            title="Lunch"
                            time="12:00 PM - 2:30 PM"
                            data={menuData[activeDay].Lunch}
                            icon={<Star className="w-5 h-5 text-yellow-500" />}
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
                    <p className="text-gray-500 text-sm">
                        * Menu is subject to minor changes based on seasonal vegetable availability.
                    </p>
                </div>
            </div>
        </section>
    );
};

const MenuCard = ({ title, time, data, icon }) => (
    <div className="glass rounded-3xl p-8 card-hover relative overflow-hidden group border-white/50">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-display font-bold text-dark-900 flex items-center gap-2">
                        {title} {icon}
                    </h3>
                    <p className="text-dark-500 flex items-center gap-1 text-sm mt-1">
                        <Clock className="w-4 h-4" /> {time}
                    </p>
                </div>
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {data.calories}
                </span>
            </div>

            <div className="space-y-3 mb-6">
                {data.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
                        <span className="text-dark-700 font-medium">{item}</span>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                {data.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-bold text-dark-500 bg-white/50 border border-gray-100 px-2 py-1 rounded-md">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

export default WeeklyMenu;
