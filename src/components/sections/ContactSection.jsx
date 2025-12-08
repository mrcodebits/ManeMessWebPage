import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactInfoCard = ({ icon, title, info, subInfo, color }) => (
    <div className="p-6 rounded-3xl bg-white shadow-xl shadow-gray-100 border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
        <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3 text-white`}>
            {icon}
        </div>
        <h3 className="text-lg font-bold text-dark-900 mb-1">{title}</h3>
        <p className="text-base font-medium text-primary-600 mb-1">{info}</p>
        <p className="text-xs text-gray-400">{subInfo}</p>
    </div>
);

const ContactSection = () => {
    return (
        <section className="py-20 bg-white" id="contact">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="Ready to Taste?"
                    subtitle="Get in Touch"
                    centered={true}
                />

                <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
                    <ContactInfoCard
                        icon={<Phone size={20} />}
                        title="Call Us"
                        info="+91 98765 43210"
                        subInfo="Mon-Sat, 9am - 7pm"
                        color="bg-primary-500"
                    />
                    <ContactInfoCard
                        icon={<Mail size={20} />}
                        title="Email Us"
                        info="hello@manemess.com"
                        subInfo="We reply within 24hrs"
                        color="bg-secondary-500"
                    />
                    <ContactInfoCard
                        icon={<MapPin size={20} />}
                        title="Visit Kitchen"
                        info="Hingne Home Colony"
                        subInfo="Karvenagar, Pune 411052"
                        color="bg-primary-600"
                    />
                </div>

                <div className="bg-primary-50 rounded-3xl p-8 md:p-12 overflow-hidden relative max-w-5xl mx-auto">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="grid md:grid-cols-2 gap-12 relative z-10 items-center">
                        <div>
                            <h3 className="text-3xl font-display font-bold text-dark-900 mb-4">Book a 2-Day Trial</h3>
                            <p className="text-dark-600 mb-8 text-lg">
                                Not sure? Try us for 2 days! We serve trials in Karvenagar, Kothrud, and Warje.
                                <br /><br />
                                Simple, home-cooked food that speaks for itself.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        placeholder="+91 0000000000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-1">Your Area</label>
                                    <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                                        <option>Karvenagar - Hingne Home Colony</option>
                                        <option>Kothrud</option>
                                        <option>Warje</option>
                                    </select>
                                </div>
                                <Button className="w-full mt-2">Request Call Back</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
