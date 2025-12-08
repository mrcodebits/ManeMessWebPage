import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    const siteTitle = "Mane Mess | Pune's Premium Tiffin Service";

    return (
        <Helmet>
            <title>{title ? `${title} | Mane Mess` : siteTitle}</title>
            <meta name="description" content={description || "Experience the taste of home with Mane Mess. Fresh, hygienic, and free delivery in Pune."} />
            <meta name="keywords" content={keywords || "tiffin service, pune mess, homemade food, dabba service, healthy meal plan"} />
        </Helmet>
    );
};

export default SEO;
