// Centralized asset management
// To use your own images:
// 1. Place your images in the 'src/assets' folder
// 2. Import them here: import myImage from '../assets/my-image.jpg'
// 3. Replace the string URLs below with the imported variable

export const ASSETS = {
    // Hero & General
    hero: {
        networkImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    },
    // Video Tour
    video: {
        src: "/assets/mane-mess-tour.mp4", // Put your video in public/assets or import it if small
        poster: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000&auto=format&fit=crop"
    },
    // Team Members
    team: [
        {
            name: "Sunita Maus",
            role: "Head Chef",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
            quote: "Cooking for you is like cooking for my own children."
        },
        {
            name: "Raju Bhau",
            role: "Delivery Captain",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
            quote: "Rain or shine, your dabba will reach on time."
        },
        {
            name: "Vimal Kaku",
            role: "Spices Expert",
            image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=600&auto=format&fit=crop",
            quote: "I grind fresh masalas daily. No packets here."
        }
    ],
    // Gallery
    gallery: [
        {
            src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
            alt: "Fresh Samosas",
            span: "col-span-1 row-span-1"
        },
        {
            src: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
            alt: "Full Thali",
            span: "col-span-1 row-span-2"
        },
        {
            src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop",
            alt: "Curry Bowl",
            span: "col-span-1 row-span-1"
        },
        {
            src: "https://images.unsplash.com/photo-1625398407796-82650a8c9968?q=80&w=800&auto=format&fit=crop",
            alt: "Roti Basket",
            span: "col-span-2 row-span-1"
        },
        {
            src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop",
            alt: "Paneer Dish",
            span: "col-span-1 row-span-1"
        }
    ]
};
