import { FC } from 'react';
import { motion } from 'framer-motion';

export const Header: FC = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='mb-8 flex cursor-pointer items-center justify-center gap-4'
    >
      <motion.img
        src='/field-data-logo.png'
        alt='Field Data Logo'
        className='h-12 w-auto'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
      <motion.h1
        className='text-2xl font-bold text-slate-300'
        whileHover={{ scale: 1.05 }}
      >
        FieldData Feed
      </motion.h1>
    </motion.header>
  );
};
