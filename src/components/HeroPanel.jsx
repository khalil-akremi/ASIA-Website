import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HeroPanel - Neo-Brutalist Hero with Staggered Typewriter
 * Features Matrix-style ASCII rain background
 */
const HeroPanel = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const matrixRef = useRef(null);

  // Words to reveal with colors
  const words = [
    { text: 'CONNECT', color: '#7c3aed' },  // Purple
    { text: 'LEARN', color: '#10b981' },     // Green
    { text: 'COMMUNICATE', color: '#2563eb' }, // Blue
    { text: 'BUILD', color: '#f97316' },     // Orange
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

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Matrix ASCII Rain Effect
  useEffect(() => {
    const canvas = matrixRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'ASIA01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(240, 240, 245, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(124, 58, 237, 0.15)';
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
    <section className="min-h-screen relative overflow-hidden dot-grid-bg">
      {/* Matrix ASCII Rain Canvas */}
      <canvas
        ref={matrixRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        {/* ASCII Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <pre className="ascii-art text-xs md:text-sm" style={{ color: '#7c3aed' }}>
{`
    ___   _____  ____  _____
   /   | / ___/ / __ \\/ ___/
  / /| | \\__ \\ / /_/ /\\__ \\
 / ___ |___/ // ____/___/ /
/_/  |_/____//_/    /____/
`}
          </pre>
        </motion.div>

        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          {/* "ASIA IS..." Header */}
          <div className="mb-4">
            <h1 className="pixel-font-lg text-5xl md:text-7xl lg:text-8xl text-black">
              ASIA IS...
            </h1>
          </div>

          {/* "A PLACE TO" */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pixel-font text-2xl md:text-3xl mb-4 text-black"
          >
            A PLACE TO
          </motion.p>

          {/* Staggered Words */}
          <div className="pixel-font-lg text-4xl md:text-5xl lg:text-6xl min-h-[60px] flex flex-wrap justify-center items-center gap-x-4">
            {/* CONNECT - Purple */}
            <AnimatePresence>
              {currentWordIndex >= 1 && (
                <motion.span
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  style={{ color: words[0].color }}
                  className="glitch-text"
                >
                  {words[0].text}
                </motion.span>
              )}
            </AnimatePresence>

            {/* LEARN - Green */}
            <AnimatePresence>
              {currentWordIndex >= 2 && (
                <motion.span
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  style={{ color: words[1].color }}
                  className="glitch-text"
                >
                  {words[1].text}
                </motion.span>
              )}
            </AnimatePresence>

            {/* COMMUNICATE - Blue */}
            <AnimatePresence>
              {currentWordIndex >= 3 && (
                <motion.span
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  style={{ color: words[2].color }}
                  className="glitch-text"
                >
                  {words[2].text}
                </motion.span>
              )}
            </AnimatePresence>

            {/* BUILD - Orange */}
            <AnimatePresence>
              {currentWordIndex >= 4 && (
                <motion.span
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  style={{ color: words[3].color }}
                  className="glitch-text"
                >
                  {words[3].text}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Typing Cursor */}
            <span
              className="text-black"
              style={{
                opacity: showCursor ? 1 : 0,
                color: '#7c3aed',
                marginLeft: '4px'
              }}
            >
              █
            </span>
          </div>
        </motion.div>

        {/* Terminal Connect Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 w-full max-w-md"
        >
          <div className="terminal-window">
            {/* Terminal Header */}
            <div className="terminal-header px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-black" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black" />
                <div className="w-3 h-3 rounded-full bg-green-500 border border-black" />
              </div>
              <span className="terminal-font text-sm text-purple-400 ml-2">
                ~/asia/connect.exe
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="terminal-font text-purple-400 text-sm block mb-1">
                    {'>'} ENTER_EMAIL:
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 bg-black border-2 border-purple-500 text-white terminal-font focus:outline-none focus:border-purple-400"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="terminal-font text-purple-400 text-sm block mb-1">
                    {'>'} ENTER_PASSWORD:
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    className="w-full px-3 py-2 bg-black border-2 border-purple-500 text-white terminal-font focus:outline-none focus:border-purple-400"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 brutal-btn bg-purple-600 text-white pixel-font"
                >
                  {'>'} JOIN_THE_FAMILY
                </motion.button>

                {/* Status Line */}
                <div className="terminal-font text-xs text-gray-500">
                  <span className="text-green-500">●</span> STATUS: READY_TO_CONNECT_
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="terminal-font text-sm text-black flex flex-col items-center">
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