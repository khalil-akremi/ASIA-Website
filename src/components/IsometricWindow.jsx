import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * IsometricWindow - Reusable floating window component
 * Creates a 3D isometric floating panel effect with parallax animations
 */
const IsometricWindow = ({
  children,
  className = '',
  depth = 0,
  delay = 0,
  intensity = 'medium',
}) => {
  // Animation intensity variants
  const intensityValues = {
    low: { y: 5, duration: 5 },
    medium: { y: 12, duration: 4 },
    high: { y: 20, duration: 3 },
  };

  const { y, duration } = intensityValues[intensity] || intensityValues.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 5, skewY: -2 }}
      animate={{ opacity: 1, y: 0, rotateX: 5, skewY: -2 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        zIndex: 10 + depth,
        perspective: '1000px',
      }}
      className={`relative ${className}`}
    >
      {/* Floating animation container */}
      <motion.div
        animate={{
          y: [0, -y, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        style={{
          transform: 'skewY(-2deg) rotateX(5deg)',
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {/* Window chrome/top bar */}
        <div
          className="absolute -top-6 left-0 right-0 h-6 rounded-t-lg flex items-center px-3 gap-1.5"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
          }}
        >
          {/* Window buttons */}
          <div className="w-3 h-3 rounded-full bg-white/80 hover:bg-white transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-white/60 hover:bg-white transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-white/40 hover:bg-white transition-colors cursor-pointer" />
        </div>

        {/* Main content area */}
        <div
          className="bg-white rounded-lg shadow-2xl border-2 overflow-hidden"
          style={{
            borderColor: 'transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #7c3aed, #2563eb)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: `
              0 25px 50px -12px rgba(124, 58, 237, 0.25),
              0 12px 24px -8px rgba(37, 99, 235, 0.2)
            `,
          }}
        >
          {children}
        </div>

        {/* 3D Shadow effect */}
        <div
          className="absolute -bottom-4 left-4 right-4 h-4 rounded-b-lg opacity-30 blur-sm"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
            transform: 'translateZ(-20px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

IsometricWindow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  depth: PropTypes.number,
  delay: PropTypes.number,
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
};

export default IsometricWindow;