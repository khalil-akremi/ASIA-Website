import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JOIN_LINK } from '../data/constants';

/**
 * HeroPanel - Neo-Brutalist High-Tech Hero with CRT Aesthetics
 * Features Matrix-style ASCII rain background with enhanced ASCII logo
 */
const HeroPanel = ({ darkMode = false }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const matrixRef = useRef(null);

  // Words with strict color hierarchy: Violet=Action, Cyan=Data, Pink=Alert
  const words = [
    { text: 'CONNECT', color: '#7c3aed', type: 'action' },   // Violet - Action
    { text: 'LEARN', color: '#db2777', type: 'alert' },      // Pink - Alert
    { text: 'COMMUNICATE', color: '#06b6d4', type: 'data' }, // Cyan - Data
    { text: 'BUILD', color: '#1e3a8a', type: 'action' },     // Dark Blue - Action
  ];

  // Staggered reveal effect
  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex, words.length]);

  // Matrix ASCII Rain Effect
  useEffect(() => {
    const canvas = matrixRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();

    const chars = 'ASIA01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(240, 240, 245, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(124, 58, 237, 0.12)';
      ctx.font = `${fontSize}px VT323`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: darkMode ? '#0a0a0f' : '#f0f0f5',
        backgroundImage: darkMode
          ? 'radial-gradient(circle, #7c3aed 1px, transparent 1px)'
          : 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* Matrix ASCII Rain Canvas */}
      <canvas
        ref={matrixRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 1 }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-16 md:pt-20">
        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center px-2"
        >
          {/* "ASIA IS..." Header */}
          <div className="mb-2 md:mb-4">
            <h1
              className="pixel-font-lg text-4xl md:text-7xl lg:text-8xl"
              style={{ color: darkMode ? '#f8fafc' : '#000' }}
            >
              ASIA IS...
            </h1>
          </div>

          {/* "A PLACE TO" */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pixel-font text-xl md:text-3xl mb-3 md:mb-4"
            style={{ color: darkMode ? '#f8fafc' : '#000' }}
          >
            A PLACE TO
          </motion.p>

          {/* Staggered Words - Mobile Responsive */}
          <div className="pixel-font-lg text-3xl md:text-5xl lg:text-6xl min-h-[50px] md:min-h-[60px] flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4">
            {words.map((word, index) => (
              <AnimatePresence key={word.text}>
                {currentWordIndex >= index + 1 && (
                  <motion.span
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    style={{
                      color: word.color,
                      textShadow: `0 0 8px ${word.color}40`,
                    }}
                    className="glitch-text"
                  >
                    {word.text}
                  </motion.span>
                )}
              </AnimatePresence>
            ))}
          </div>
        </motion.div>

        {/* Terminal Connect Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 md:mt-12 w-full max-w-sm md:max-w-md px-2"
        >
          <div className="terminal-window">
            {/* Terminal Header */}
            <div className="terminal-header px-3 md:px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 border border-black" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500 border border-black" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 border border-black" />
              </div>
              <span className="terminal-font text-xs md:text-sm ml-2 truncate" style={{ color: darkMode ? '#c4b5fd' : '#c084fc' }}>
                ~/asia/connect.exe
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                {/* Email Input */}
                <div>
                  <label className="terminal-font text-xs md:text-sm block mb-1" style={{ color: darkMode ? '#c4b5fd' : '#c084fc' }}>
                    {'>'} ENTER_EMAIL:
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border-2 terminal-font text-sm focus:outline-none"
                    style={{
                      background: darkMode ? '#0f172a' : '#000',
                      borderColor: '#7c3aed',
                      color: '#f8fafc',
                    }}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="terminal-font text-xs md:text-sm block mb-1" style={{ color: darkMode ? '#c4b5fd' : '#c084fc' }}>
                    {'>'} ENTER_PASSWORD:
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    className="w-full px-3 py-2 border-2 terminal-font text-sm focus:outline-none"
                    style={{
                      background: darkMode ? '#0f172a' : '#000',
                      borderColor: '#7c3aed',
                      color: '#f8fafc',
                    }}
                  />
                </div>

                {/* Submit Button */}
                <motion.a
                  href={JOIN_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-3 brutal-btn bg-purple-600 text-white pixel-font text-sm md:text-base text-center"
                >
                  {'>'} JOIN_THE_FAMILY
                </motion.a>

                {/* Status Line */}
                <div className="terminal-font text-xs" style={{ color: darkMode ? '#cbd5e1' : '#6b7280' }}>
                  <span className="text-cyan-500">●</span> STATUS: READY_TO_CONNECT_
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="terminal-font text-xs md:text-sm flex flex-col items-center" style={{ color: darkMode ? '#f8fafc' : '#000' }}>
            <span>SCROLL_DOWN</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mt-1"
            >
              ▼
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroPanel;