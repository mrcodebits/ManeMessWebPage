import SectionHeading from '../ui/SectionHeading';
import TeamSection from './TeamSection';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section className="py-20 bg-white bg-pattern-royal relative z-10" id="about">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="The Mane Mess Legacy"
                    subtitle="Heritage on a Plate"
                    centered={true}
                />

                {/* Timeline Story Section */}
                <div className="space-y-24 mt-16 max-w-5xl mx-auto">

                    {/* Story Block 1 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1"
                        >
                            <div className="relative">
                                <div className="absolute top-4 left-4 w-full h-full border-2 border-primary-200 rounded-3xl -z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop"
                                    alt="Grandma Cooking"
                                    className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
                                />
                            </div>
                        </motion.div>
                        <div className="order-1 md:order-2 space-y-6">
                            <span className="text-6xl font-display font-bold text-primary-100 absolute -z-10 -mt-10 ml-4">2015</span>
                            <h3 className="text-3xl font-display font-bold text-dark-900">It Started in a Small Kitchen</h3>
                            <p className="text-lg text-dark-600 leading-relaxed">
                                Mrs. Mane started this journey with just 5 dabbas for college students living nearby. Her secret?
                                She refused to use anything she wouldn't feed her own children.
                                <br /><br />
                                No soda, no frozen veggies, just pure spices ground at home.
                            </p>
                        </div>
                    </div>

                    {/* Story Block 2 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 md:text-right">
                            <span className="text-6xl font-display font-bold text-primary-100 absolute -z-10 -mt-10 -ml-12">2018</span>
                            <h3 className="text-3xl font-display font-bold text-dark-900">Features & "Purnabrahma"</h3>
                            <p className="text-lg text-dark-600 leading-relaxed">
                                As word spread, we grew. But we made a promise: <span className="text-primary-600 font-bold">Hygiene First</span>.
                                We customized our kitchen with stainless steel counters and strictly implemented the "Ann He Purnabrahma" philosophy—treating food as divine.
                            </p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative">
                                <div className="absolute bottom-4 right-4 w-full h-full border-2 border-secondary-200 rounded-3xl -z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1606914469725-e396604dc903?q=80&w=1000&auto=format&fit=crop"
                                    alt="Modern Hygienic Kitchen"
                                    className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Story Block 3 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1"
                        >
                            <div className="relative">
                                {/* Parallax-style overlap */}
                                <img
                                    src="https://images.unsplash.com/photo-1546833999-b9f5816029bd?q=80&w=1000&auto=format&fit=crop"
                                    alt="Community Feasts"
                                    className="rounded-3xl shadow-xl w-full h-[400px] object-cover relative z-10"
                                />
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full blur-2xl opacity-40 -z-0" />
                            </div>
                        </motion.div>
                        <div className="order-1 md:order-2 space-y-6">
                            <span className="text-6xl font-display font-bold text-primary-100 absolute -z-10 -mt-10 ml-4">Today</span>
                            <h3 className="text-3xl font-display font-bold text-dark-900">A Community of 5000+</h3>
                            <p className="text-lg text-dark-600 leading-relaxed">
                                Today, Mane Mess is more than a service. It's a daily ritual for thousands of Punekars.
                                We still grind our own spices. We still taste every dal before it leaves the kitchen.
                                And we still believe that <span className="italic">Atithi Devo Bhava</span>.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-20">
                    <TeamSection />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
