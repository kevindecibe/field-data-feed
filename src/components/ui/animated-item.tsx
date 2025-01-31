import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedItemProps {
  children: ReactNode;
}

export const AnimatedItem = forwardRef<HTMLDivElement, AnimatedItemProps>(
  ({ children }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 1.2 }}
        layout
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedItem.displayName = 'AnimatedItem';
