import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { Utensils, IndianRupee, Clock } from 'lucide-react';

const DailySpecial = () => {
    const { dailyMenu } = useAdmin();

    return (
        <section className="py-20 bg-white relative overflow-hidden" id="daily-menu">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 bg-primary-50 rounded-[3rem] p-8 md:p-12 border border-primary-100 shadow-xl relative">

                    {/* Floating Badge */}
                    <div className="absolute top-0 right-0 bg-secondary-500 text-white px-8 py-3 rounded-bl-[2rem] rounded-tr-[2.5rem] font-bold font-display text-xl shadow-lg z-10">
                        Today's Special
                    </div>

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 relative"
                    >
                        <div className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl relative z-10 group">
                            <img
                                src={dailyMenu.imageUrl}
                                alt={dailyMenu.special}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Freshly Prepared</span>
                                <h3 className="text-3xl font-display font-bold">{dailyMenu.special}</h3>
                            </div>
                        </div>
                        {/* Decorative Blob */}
                        <div className="absolute -bottom-10 -left-10 w-full h-full bg-secondary-200/30 rounded-full blur-[80px] -z-0" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 space-y-8"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-primary-600 font-bold tracking-widest uppercase text-sm mb-3">
                                <Clock size={16} />
                                <span>Serving Now</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 leading-tight">
                                What's Cooking <br />
                                <span className="text-primary-600">Today?</span>
                            </h2>
                            <p className="text-dark-600 mt-4 text-lg leading-relaxed">
                                Our chef's special selection for the day. Wholesome, nutritious, and tastes just like home.
                            </p>
                        </div>

                        {/* Menu Items List */}
                        <div className="bg-white p-6 rounded-2xl border border-primary-100 shadow-sm">
                            <h4 className="font-bold text-dark-900 mb-4 flex items-center gap-2">
                                <Utensils size={18} className="text-secondary-500" />
                                Menu Contents
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {dailyMenu.items.map((item, index) => (
                                    <span key={index} className="px-4 py-2 bg-gray-50 text-dark-700 rounded-lg text-sm font-medium border border-gray-100">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white border border-gray-100 rounded-xl text-center shadow-sm hover:border-primary-500 transition-colors">
                                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Full Thali</div>
                                <div className="text-3xl font-bold text-dark-900 flex justify-center items-start">
                                    <span className="text-sm mt-1">₹</span>{dailyMenu.priceFull}
                                </div>
                            </div>
                            <div className="p-4 bg-white border border-gray-100 rounded-xl text-center shadow-sm hover:border-secondary-500 transition-colors">
                                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Half Thali</div>
                                <div className="text-3xl font-bold text-dark-900 flex justify-center items-start">
                                    <span className="text-sm mt-1">₹</span>{dailyMenu.priceHalf}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DailySpecial;
