import SectionHeading from '../ui/SectionHeading';
import { motion } from 'framer-motion';

import { ASSETS } from '../../lib/assets';

const team = ASSETS.team;

const TeamSection = () => {
    return (
        <section className="py-12 relative z-10">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="Meet the Makers"
                    subtitle="The Hands That Feed You"
                    centered={true}
                />

                <p className="text-center text-lg text-dark-500 max-w-2xl mx-auto mb-16 font-medium">
                    Behind every delicious tiffin is a team of dedicated "Mausis" and staff who treat you like family.
                </p>

                <div className="grid md:grid-cols-3 gap-12">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group text-center"
                        >
                            <div className="relative mb-8 inline-block">
                                <div className="absolute inset-0 bg-primary-200/50 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 -z-10 blur-xl opacity-0 group-hover:opacity-100" />
                                <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-white shadow-xl mx-auto ring-4 ring-primary-100 group-hover:border-primary-400 transition-colors duration-500">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-dark-900 mb-1 font-display">{member.name}</h3>
                            <p className="text-primary-600 font-bold text-xs mb-6 uppercase tracking-[0.2em]">{member.role}</p>

                            <div className="bg-white p-6 rounded-2xl relative mx-2 border border-dark-100 shadow-md group-hover:shadow-lg transition-all">
                                <span className="text-5xl text-primary-200 absolute -top-5 left-4 font-serif">"</span>
                                <p className="text-dark-600 italic relative z-10 font-medium">{member.quote}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
