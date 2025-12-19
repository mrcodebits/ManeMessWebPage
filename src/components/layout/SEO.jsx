import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonicalUrl }) => {
    const siteTitle = "Mane Mess | Premium Homemade Tiffin Service Pune";
    const siteUrl = "https://manemess.com";
    const currentUrl = canonicalUrl || siteUrl;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "FoodEstablishment",
        "name": "Mane Mess",
        "description": "Authentic Maharashtrian Mess & Tiffin Service in Pune",
        "image": [
            "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1200&auto=format&fit=crop"
        ],
        "@id": "https://manemess.com",
        "url": "https://manemess.com",
        "telephone": "+919876543210",
        "menu": "https://manemess.com/menu",
        "servesCuisine": "Maharashtrian (Home Style Mess)",
        "priceRange": "₹",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Shop No 4, Karve Nagar",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "postalCode": "411052",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 18.4900,
            "longitude": 73.8150
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "11:00",
            "closes": "22:00"
        },
        "sameAs": [
            "https://www.facebook.com/manemess",
            "https://www.instagram.com/manemess"
        ]
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${title} | Mane Mess` : siteTitle}</title>
            <meta name="description" content={description || "Authentic Maharashtrian homemade tiffin service in Karvenagar, Pune. Healthy, hygienic, and affordable meals delivered to your doorstep."} />
            <meta name="keywords" content={keywords || "tiffin service pune, homemade food karvenagar, mane mess, maharashtrian thali, student mess pune, healthy tiffin"} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || "Experience the taste of home. Authentic Maharashtrian meals delivered in Karvenagar. Book your trial tiffin today!"} />
            <meta property="og:image" content="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1200&auto=format&fit=crop" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={title || siteTitle} />
            <meta property="twitter:description" content={description || "Experience the taste of home. Authentic Maharashtrian meals delivered in Karvenagar."} />
            <meta property="twitter:image" content="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1200&auto=format&fit=crop" />

            {/* Schema.org Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default SEO;
