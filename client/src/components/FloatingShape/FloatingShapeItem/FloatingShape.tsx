import React from 'react';
import { motion } from 'framer-motion';

import './FloatingShape.scss';

interface IFloatingShape {
  color: string;
  size: { width: string; height: string };
  top: string | number;
  left: string | number;
  delay: number;
}

const FloatingShape: React.FC<IFloatingShape> = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className="floating_shape_item"
      style={{
        backgroundColor: color,
        width: size.width,
        height: size.height,
        top,
        left,
      }}
      animate={{
        y: ['0%', '100%', '0%'],
        x: ['0%', '100%', '0%'],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;
