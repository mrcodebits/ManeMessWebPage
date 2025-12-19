import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { ASSETS } from '../../lib/assets';

const VideoTour = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className="py-20 md:py-24 relative z-10" id="tour">
            <div className="container mx-auto px-4 md:px-6">
                <SectionHeading
                    title="A Tour of Our Kitchen"
                    subtitle="See Where The Magic Happens"
                    centered={true}
                />

                <div
                    className="max-w-5xl mx-auto relative rounded-3xl md:rounded-[3rem] overflow-hidden shadow-xl md:shadow-2xl border border-white/20 group transform transition-transform duration-500 hover:scale-[1.01] cursor-pointer"
                    onClick={togglePlay}
                >
                    {/* Video Container - Taller on Mobile, Wide on Desktop */}
                    <div className="relative aspect-[4/5] md:aspect-video bg-dark-900">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover opacity-100 transition-opacity duration-500"
                            loop
                            muted
                            playsInline
                            poster={ASSETS.video.poster}
                        >
                            <source src={ASSETS.video.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Overlay Gradient - Desktop & Mobile */}
                        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />

                        {/* Play Button - Centered */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 transform ${isPlaying ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-xl group-hover:scale-110 transition-transform">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                                    <Play className="w-6 h-6 md:w-6 md:h-6 text-white fill-current ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section - App-like Overlay for All Screens */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h3 className="text-white text-xl md:text-2xl font-display font-bold mb-2">Hygiene & Heart</h3>
                                <p className="text-gray-200 text-sm max-w-md font-medium leading-relaxed">
                                    Take a peek inside our daily operations. From fresh vegetable sorting to our spice grinding corners.
                                </p>
                            </div>
                            <div>
                                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30 uppercase tracking-widest shadow-sm">
                                    Live Kitchen Tour
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Staff Teaser */}
                <div className="mt-12 md:mt-16 text-center px-4">
                    <p className="text-dark-600 max-w-2xl mx-auto italic font-medium text-sm md:text-base">
                        "We believe transparency adds flavor. Our kitchen is open for you to visit anytime."
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VideoTour;
