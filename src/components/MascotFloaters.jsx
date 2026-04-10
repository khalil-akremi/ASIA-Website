import { motion } from 'framer-motion';
import { MASCOT_IMAGES } from '../data/constants';

/**
 * MascotFloaters - Randomly positioned mascot decorations
 * Creative placement of PNG mascots throughout the site
 */
const MascotFloaters = ({ variant = 'default' }) => {
  // Different positioning sets for different sections
  const positions = {
    hero: [
      { top: '10%', right: '5%', size: 80, delay: 0, rotate: 15 },
      { bottom: '20%', left: '3%', size: 60, delay: 0.5, rotate: -10 },
    ],
    board: [
      { top: '5%', left: '2%', size: 100, delay: 0.2, rotate: -5 },
      { bottom: '10%', right: '3%', size: 90, delay: 0.4, rotate: 8 },
    ],
    poles: [
      { top: '15%', right: '-5%', size: 120, delay: 0.1, rotate: 20 },
      { bottom: '30%', left: '-3%', size: 100, delay: 0.3, rotate: -15 },
    ],
    events: [
      { top: '20%', left: '1%', size: 70, delay: 0.2, rotate: 12 },
      { bottom: '15%', right: '2%', size: 85, delay: 0.5, rotate: -8 },
    ],
    default: [
      { top: '10%', right: '3%', size: 90, delay: 0, rotate: 10 },
      { bottom: '20%', left: '2%', size: 70, delay: 0.3, rotate: -12 },
    ]
  };

  const currentPositions = positions[variant] || positions.default;

  // Only render on larger screens for better performance
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {currentPositions.map((pos, index) => {
        const mascot = MASCOT_IMAGES[index % MASCOT_IMAGES.length];
        return (
          <motion.div
            key={`${variant}-${index}`}
            initial={{ opacity: 0, scale: 0, rotate: pos.rotate - 20 }}
            animate={{ opacity: 0.9, scale: 1, rotate: pos.rotate }}
            transition={{
              duration: 0.8,
              delay: pos.delay,
              type: 'spring',
              stiffness: 100
            }}
            whileHover={{
              scale: 1.15,
              rotate: 0,
              zIndex: 100,
              transition: { duration: 0.3 }
            }}
            className="absolute pointer-events-none hidden md:block"
            style={{
              top: pos.top,
              bottom: pos.bottom,
              left: pos.left,
              right: pos.right,
              width: pos.size,
              height: pos.size,
              zIndex: 5,
              filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.2))',
            }}
          >
            <div
              className="w-full h-full rounded-2xl overflow-hidden border-3 border-black"
              style={{
                boxShadow: '6px 6px 0px 0px rgba(124, 58, 237, 0.5)',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(37, 99, 235, 0.1))'
              }}
            >
              <img
                src={`/mascot/${mascot}`}
                alt="ASIA Mascot"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default MascotFloaters;