import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
        alt: "Fresh Samosas",
        span: "col-span-1 row-span-1"
    },
    {
        src: "https://images.unsplash.com/photo-1546833999-b9f5816029bd?q=80&w=800&auto=format&fit=crop",
        alt: "Full Thali",
        span: "col-span-1 row-span-2"
    },
    {
        src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop",
        alt: "Curry Bowl",
        span: "col-span-1 row-span-1"
    },
    {
        src: "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=800&auto=format&fit=crop",
        alt: "Roti Basket",
        span: "col-span-2 row-span-1"
    },
    {
        src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop",
        alt: "Paneer Dish",
        span: "col-span-1 row-span-1"
    }
];

const GallerySection = () => {
    return (
        <section className="py-20 bg-white" id="gallery">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="Our Kitchen Gallery"
                    subtitle="A Feast for Your Eyes"
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-3xl overflow-hidden group ${img.span}`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-bold tracking-wide">{img.alt}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
