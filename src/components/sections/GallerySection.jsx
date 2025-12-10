import { motion } from 'framer-motion';

import { ASSETS } from '../../lib/assets';

const galleryImages = ASSETS.gallery;

const GallerySection = () => {
    return (
        <section className="py-24 relative z-10" id="gallery">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-2 block">Our Kitchen Gallery</span>
                    <h2 className="text-4xl lg:text-5xl font-display font-bold text-dark-900 mb-4">
                        A Feast for <span className="text-primary-600">Your Eyes</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative rounded-3xl overflow-hidden group glass-border cursor-pointer ${img.span}`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gold-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div>
                                    <p className="text-white font-bold tracking-wide text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.alt}</p>
                                    <div className="h-0.5 w-0 group-hover:w-full bg-gold-400 mt-2 transition-all duration-500 delay-100" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
