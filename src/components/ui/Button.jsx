import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({
    className,
    variant = 'default',
    size = 'md',
    isLoading = false,
    children,
    ...props
}, ref) => {

    const variants = {
        default: "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-xl hover:shadow-primary-500/20 active:scale-95",
        outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:text-primary-700 active:scale-95",
        ghost: "text-primary-600 hover:bg-primary-50/50 hover:text-primary-700 active:scale-95",
        secondary: "bg-secondary-500 text-white hover:bg-secondary-600 shadow-md hover:shadow-xl hover:shadow-secondary-500/20 active:scale-95",
        white: "bg-white text-dark-900 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-100 active:scale-95"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm font-semibold tracking-wide",
        md: "px-6 py-3 text-base font-bold tracking-wide",
        lg: "px-8 py-4 text-lg font-bold tracking-wider",
        icon: "p-2"
    };

    return (
        <motion.button
            ref={ref}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "inline-flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none font-medium",
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </motion.button>
    );
});

Button.displayName = "Button";

export default Button;
