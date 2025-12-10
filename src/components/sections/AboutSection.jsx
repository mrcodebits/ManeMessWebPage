import SectionHeading from '../ui/SectionHeading';
import TeamSection from './TeamSection';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section className="py-24 relative z-10" id="about">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="The Mane Mess Legacy"
                    subtitle="Heritage on a Plate"
                    centered={true}
                />

                {/* Timeline Story Section */}
                <div className="space-y-32 mt-20 max-w-6xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-primary-300 to-transparent -translate-x-1/2 hidden md:block" />

                    {/* Story Block 1 */}
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1 relative"
                        >
                            <div className="p-2 bg-white rounded-[2rem] shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500 border border-dark-100">
                                <img
                                    src="https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?q=80&w=1000&auto=format&fit=crop"
                                    alt="Grandma Cooking"
                                    className="rounded-[1.5rem] w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>
                        <div className="order-1 md:order-2 space-y-6 md:pl-10 relative">
                            <span className="text-8xl font-display font-bold text-dark-900/5 absolute -z-10 -top-16 -left-10 select-none">2015</span>
                            <h3 className="text-3xl font-display font-bold text-dark-900">It Started in a Small Kitchen</h3>
                            <p className="text-lg text-dark-600 leading-relaxed font-medium">
                                Mrs. Mane started this journey with just 5 dabbas for college students living nearby. Her secret?
                                She refused to use anything she wouldn't feed her own children.
                                <br /><br />
                                No soda, no frozen veggies, just pure spices ground at home.
                            </p>
                        </div>
                    </div>

                    {/* Story Block 2 */}
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6 md:text-right md:pr-10 relative">
                            <span className="text-8xl font-display font-bold text-dark-900/5 absolute -z-10 -top-16 -right-10 select-none">2018</span>
                            <h3 className="text-3xl font-display font-bold text-dark-900">Features & "Purnabrahma"</h3>
                            <p className="text-lg text-dark-600 leading-relaxed font-medium">
                                As word spread, we grew. But we made a promise: <span className="text-primary-600 font-bold">Hygiene First</span>.
                                We customized our kitchen with stainless steel counters and strictly implemented the "Ann He Purnabrahma" philosophy—treating food as divine.
                            </p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="p-2 bg-white rounded-[2rem] shadow-xl -rotate-2 hover:rotate-0 transition-transform duration-500 border border-dark-100">
                                <img
                                    src="https://images.unsplash.com/photo-1577308856961-0e97146a6f58?q=80&w=1000&auto=format&fit=crop"
                                    alt="Modern Hygienic Kitchen"
                                    className="rounded-[1.5rem] w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Story Block 3 */}
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1 relative"
                        >
                            <div className="p-2 bg-white rounded-[2rem] shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500 border border-dark-100">
                                <img
                                    src="https://images.unsplash.com/photo-1511690656952-34342d5c71db?q=80&w=1000&auto=format&fit=crop"
                                    alt="Community Feasts"
                                    className="rounded-[1.5rem] w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>
                        <div className="order-1 md:order-2 space-y-6 md:pl-10 relative">
                            <span className="text-8xl font-display font-bold text-dark-900/5 absolute -z-10 -top-16 -left-10 select-none">Today</span>
                            <h3 className="text-3xl font-display font-bold text-dark-900">A Community of 5000+</h3>
                            <p className="text-lg text-dark-600 leading-relaxed font-medium">
                                Today, Mane Mess is more than a service. It's a daily ritual for thousands of Punekars.
                                We still grind our own spices. We still taste every dal before it leaves the kitchen.
                                And we still believe that <span className="italic text-primary-600">Atithi Devo Bhava</span>.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-32">
                    <TeamSection />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
