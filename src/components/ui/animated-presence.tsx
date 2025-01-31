import { FC, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

interface AnimatedPresenceProps {
  children: ReactNode;
}

export const AnimatedPresence: FC<AnimatedPresenceProps> = ({ children }) => {
  return <AnimatePresence mode='popLayout'>{children}</AnimatePresence>;
};
