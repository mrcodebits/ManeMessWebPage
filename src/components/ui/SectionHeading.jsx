import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const SectionHeading = ({ title, subtitle, centered = true, className }) => {
    return (
        <div className={cn("mb-16 relative z-10", centered && "text-center", className)}>
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary-600 font-bold uppercase tracking-[0.2em] text-sm mb-3 block"
            >
                {subtitle}
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-display font-bold text-dark-900 tracking-tight"
            >
                {title}
            </motion.h2>
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 80, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={cn("h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full mt-6", centered && "mx-auto")}
            />
        </div>
    );
};

export default SectionHeading;
