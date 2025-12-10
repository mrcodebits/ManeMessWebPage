import Hero from '../components/sections/Hero';
import DailySpecial from '../components/sections/DailySpecial';
import FeaturesSection from '../components/sections/FeaturesSection';
import GallerySection from '../components/sections/GallerySection';
import FestiveSpecials from '../components/sections/FestiveSpecials';
import WeeklyMenu from '../components/sections/WeeklyMenu';
import PricingPlans from '../components/sections/PricingPlans';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import SEO from '../components/layout/SEO';
import VideoTour from '../components/sections/VideoTour';

const HomePage = () => {
    return (
        <div>
            <SEO title="Home" description="Mane Mess - Premium Homemade Tiffin Service in Pune." />
            <Hero />
            {/* Reverting to vertical stack as per user request */}
            <DailySpecial />
            <FeaturesSection />
            <VideoTour />
            <GallerySection />
            <FestiveSpecials />
            <WeeklyMenu />
            <PricingPlans />
            <TestimonialsSection />
            <AboutSection />

            <ContactSection />
        </div>
    );
};

export default HomePage;
