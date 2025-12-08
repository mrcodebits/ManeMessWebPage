import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const SectionHeading = ({ title, subtitle, centered = true, className }) => {
    return (
        <div className={cn("mb-12", centered && "text-center", className)}>
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-2 block"
            >
                {subtitle}
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-display font-bold text-gradient-gold tracking-tight"
            >
                {title}
            </motion.h2>
            <div className={cn("w-20 h-1.5 bg-primary-500 rounded-full mt-4", centered && "mx-auto")} />
        </div>
    );
};

export default SectionHeading;
