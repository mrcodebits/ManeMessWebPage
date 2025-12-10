import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactInfoCard = ({ icon, title, info, subInfo }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-3xl bg-white text-center border border-dark-100 shadow-xl hover:shadow-2xl hover:border-primary-200 transition-all"
    >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-primary-50 text-primary-500 border border-primary-100">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-dark-900 mb-2 font-display">{title}</h3>
        <p className="text-base font-medium text-dark-600 mb-1">{info}</p>
        <p className="text-xs text-dark-400 uppercase tracking-widest">{subInfo}</p>
    </motion.div>
);

const ContactSection = () => {
    return (
        <section className="py-24 relative z-10" id="contact">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="Ready to Taste?"
                    subtitle="Get in Touch"
                    centered={true}
                />

                <div className="grid md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
                    <ContactInfoCard
                        icon={<Phone size={24} />}
                        title="Call Us"
                        info="+91 98765 43210"
                        subInfo="Mon-Sat, 9am - 7pm"
                    />
                    <ContactInfoCard
                        icon={<Mail size={24} />}
                        title="Email Us"
                        info="hello@manemess.com"
                        subInfo="We reply within 24hrs"
                    />
                    <ContactInfoCard
                        icon={<MapPin size={24} />}
                        title="Visit Kitchen"
                        info="Hingne Home Colony"
                        subInfo="Karvenagar, Pune 411052"
                    />
                </div>

                <div className="bg-white p-1 rounded-[2.5rem] max-w-5xl mx-auto shadow-2xl relative overflow-hidden border border-white/40">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />

                    <div className="bg-white/90 backdrop-blur-3xl rounded-[2.3rem] p-8 md:p-14 border border-dark-50">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h3 className="text-4xl font-display font-bold text-dark-900 mb-6">Book a 2-Day Trial</h3>
                                <p className="text-dark-600 mb-8 text-lg font-medium leading-relaxed">
                                    Not sure? Try us for 2 days! We serve trials in Karvenagar, Kothrud, and Warje.
                                    <br /><br />
                                    Simple, home-cooked food that speaks for itself.
                                </p>
                                <div className="flex gap-4 items-center">
                                    <div className="h-px flex-grow bg-dark-200" />
                                    <span className="text-primary-600 text-sm font-bold uppercase tracking-widest">No Commitment</span>
                                    <div className="h-px flex-grow bg-dark-200" />
                                </div>
                            </div>

                            <form className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-dark-500 uppercase tracking-wider mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-5 py-3 rounded-xl bg-dark-50 border border-dark-200 text-dark-900 placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-dark-500 uppercase tracking-wider mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full px-5 py-3 rounded-xl bg-dark-50 border border-dark-200 text-dark-900 placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                                        placeholder="+91 0000000000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-dark-500 uppercase tracking-wider mb-2">Your Area</label>
                                    <select className="w-full px-5 py-3 rounded-xl bg-dark-50 border border-dark-200 text-dark-900 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-100 transition-all font-medium appearance-none">
                                        <option className="text-gray-400">Select Area</option>
                                        <option value="karvenagar">Karvenagar - Hingne Home Colony</option>
                                        <option value="kothrud">Kothrud</option>
                                        <option value="warje">Warje</option>
                                    </select>
                                </div>
                                <Button className="w-full bg-primary-500 text-white hover:bg-primary-600 mt-4 h-12 text-base shadow-lg shadow-primary-500/20 border-none font-bold">
                                    Request Call Back
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
