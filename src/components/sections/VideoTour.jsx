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
        <section className="py-24 relative z-10" id="tour">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="A Tour of Our Kitchen"
                    subtitle="See Where The Magic Happens"
                    centered={true}
                />

                <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 group">
                    {/* Placeholder for Video - Users can replace src with their local path */}
                    <div className="relative aspect-video bg-dark-900 cursor-pointer" onClick={togglePlay}>
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            loop
                            muted
                            playsInline
                            poster={ASSETS.video.poster} // Fallback poster
                        >
                            <source src={ASSETS.video.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Overlay Gradient */}
                        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />

                        {/* Play Button */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 transform ${isPlaying ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-xl group-hover:scale-110 transition-transform">
                                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                                    <Play className="w-6 h-6 text-white fill-current ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Captions / Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-end justify-between">
                            <div>
                                <h3 className="text-white text-2xl font-display font-bold mb-2">Hygiene & Heart</h3>
                                <p className="text-gray-200 text-sm max-w-md font-medium">
                                    Take a peek inside our daily operations. From fresh vegetable sorting to our spice grinding corners.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 uppercase tracking-widest">
                                    Live Kitchen Tour
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Staff Teaser */}
                <div className="mt-16 text-center">
                    <p className="text-dark-600 max-w-2xl mx-auto italic font-medium">
                        "We believe transparency adds flavor. Our kitchen is open for you to visit anytime."
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VideoTour;
