import Hero from '../components/sections/Hero';
import FeaturesSection from '../components/sections/FeaturesSection';
import GallerySection from '../components/sections/GallerySection';
import FestiveSpecials from '../components/sections/FestiveSpecials';
import WeeklyMenu from '../components/sections/WeeklyMenu';
import PricingPlans from '../components/sections/PricingPlans';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import SEO from '../components/layout/SEO';

const HomePage = () => {
    return (
        <div>
            <SEO title="Home" description="Mane Mess - Premium Homemade Tiffin Service in Pune." />
            <Hero />
            <FeaturesSection />
            <GallerySection />
            <FestiveSpecials />
            <WeeklyMenu />
            <PricingPlans />
            <AboutSection />
            <ContactSection />
        </div>
    );
};

export default HomePage;
