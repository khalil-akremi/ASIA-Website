import { motion } from 'framer-motion';
import { POLES } from '../data/constants';

/**
 * PolesPanel - Neo-Brutalist Poles with Mascot Overlaps
 * Mascots positioned absolutely to overlap card edges
 */
const PolesPanel = () => {
  // Mascot overlap positions (absolute positioning for edge-overlap effect)
  const mascotPositions = [
    { top: '-30px', left: '-20px', zIndex: 20 },   // Media - top-left peek
    { bottom: '-25px', right: '-15px', zIndex: 20 }, // Communication - bottom-right sit
    { top: '-25px', right: '-15px', zIndex: 15 },   // Events - top-right peek
    { bottom: '-30px', left: '-20px', zIndex: 15 }, // Projects - bottom-left sit
    { top: '-20px', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }, // Formation - top center
    { bottom: '-20px', left: '50%', transform: 'translateX(-50%)', zIndex: 15 }, // R&D - bottom center
  ];

  // Card background colors for variety
  const cardColors = [
    '#7c3aed', // Purple
    '#10b981', // Green
    '#2563eb', // Blue
    '#f97316', // Orange
    '#8b5cf6', // Light purple
    '#059669', // Emerald
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: '#f0f0f5' }}>
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="pixel-font-lg text-4xl md:text-5xl text-black mb-2">
            OUR_POLES
          </h2>
          <pre className="ascii-art text-xs mt-4" style={{ color: '#2563eb' }}>
{`╔═══════════════════════════════════════════════╗
║   6_SPECIALIZED_DIVISIONS                     ║
║   POWERING_ASIA'S_MISSION                     ║
╚═══════════════════════════════════════════════╝`}
          </pre>
        </motion.div>

        {/* Poles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {POLES.map((pole, index) => (
            <motion.div
              key={pole.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.02 }}
              className="relative"
              style={{ minHeight: '280px' }}
            >
              {/* Mascot - Positioned to overlap edges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className="absolute"
                style={{
                  ...mascotPositions[index],
                  width: '80px',
                  height: '80px',
                }}
              >
                <div
                  className="w-full h-full rounded-full border-3 border-black overflow-hidden bg-white"
                  style={{ boxShadow: '4px 4px 0px 0px #000' }}
                >
                  <img
                    src={`/mascot/${pole.mascot}`}
                    alt={`${pole.name} mascot`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-3xl" style="background: linear-gradient(135deg, ${cardColors[index]}40, ${cardColors[index]}20)">
                          🦊
                        </div>
                      `;
                    }}
                  />
                </div>
              </motion.div>

              {/* Card */}
              <div
                className="h-full bg-white border-3 border-black p-6 pt-12 relative overflow-hidden"
                style={{
                  boxShadow: '8px 8px 0px 0px #000',
                }}
              >
                {/* Colored Top Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{ backgroundColor: cardColors[index] }}
                />

                {/* Pole Number */}
                <div
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border-2 border-black"
                  style={{
                    backgroundColor: cardColors[index],
                    boxShadow: '3px 3px 0px 0px #000',
                  }}
                >
                  <span className="pixel-font text-white text-lg">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Pole Name */}
                <h3
                  className="pixel-font text-2xl mb-4"
                  style={{ color: cardColors[index] }}
                >
                  {pole.name.toUpperCase()}
                </h3>

                {/* Description */}
                <p className="terminal-font text-base text-gray-700 leading-relaxed">
                  {pole.description}
                </p>

                {/* Decorative Corner */}
                <div
                  className="absolute bottom-0 right-0 w-16 h-16"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${cardColors[index]}20 50%)`,
                  }}
                />

                {/* ASCII Accent */}
                <pre className="absolute bottom-4 left-4 text-xs opacity-30" style={{ color: cardColors[index] }}>
{`[>]
[*]`}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sigma Mascot Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white border-3 border-black px-8 py-4" style={{ boxShadow: '6px 6px 0px 0px #000' }}>
            <span className="pixel-font text-lg text-black">
              🦊 MEET_SIGMA_OUR_MASCOT
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PolesPanel;