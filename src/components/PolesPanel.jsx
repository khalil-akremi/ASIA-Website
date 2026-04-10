import { motion } from 'framer-motion';
import { POLES } from '../data/constants';

/**
 * PolesPanel - 3D Isometric Floating Window Stack with Mascots
 * Neo-Brutalist design with perspective transforms and hover effects
 */
const PolesPanel = () => {
  // Gradient colors for each pole header
  const gradients = [
    'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', // Blue to Purple
    'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Green
    'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', // Orange
    'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', // Purple
    'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', // Cyan
    'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', // Pink
  ];

  // 3D positions for each window (staggered)
  const windowPositions = [
    { x: '5%', z: 60, rotateY: -5, rotateX: 5 },
    { x: '35%', z: 40, rotateY: 3, rotateX: -3 },
    { x: '65%', z: 20, rotateY: -8, rotateX: 6 },
    { x: '15%', z: 50, rotateY: 6, rotateX: -4 },
    { x: '45%', z: 30, rotateY: -4, rotateX: 5 },
    { x: '75%', z: 10, rotateY: 5, rotateX: -6 },
  ];

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden" style={{ background: '#f0f0f5' }}>
      {/* Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
          opacity: 0.4,
        }}
      />

      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.2
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="pixel-font-lg text-3xl md:text-5xl text-black mb-2">
            OUR_POLES
          </h2>
          <pre className="ascii-art text-xs mt-4" style={{ color: '#2563eb' }}>
{`╔═══════════════════════════════════════════════╗
║   6_SPECIALIZED_DIVISIONS                     ║
║   POWERING_ASIA'S_MISSION                     ║
╚═══════════════════════════════════════════════╝`}
          </pre>
        </motion.div>

        {/* Mobile: Simple Grid with Mascots */}
        <div className="md:hidden space-y-4">
          {POLES.map((pole, index) => (
            <motion.div
              key={pole.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border-2 border-black rounded-lg overflow-hidden"
              style={{ boxShadow: '4px 4px 0px 0px #000' }}
            >
              {/* Header */}
              <div
                className="px-4 py-2 flex items-center gap-3"
                style={{ background: gradients[index] }}
              >
                {/* Mascot Image */}
                <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-white flex-shrink-0">
                  <img
                    src={`/mascot/${pole.mascot}`}
                    alt={`${pole.name} mascot`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<span class="text-lg">🦊</span>`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="pixel-font text-white text-sm">
                      {pole.name.toUpperCase()}
                    </span>
                    <span className="pixel-font text-white/80 text-xs">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="p-4">
                <p className="terminal-font text-sm text-gray-700">
                  {pole.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: 3D Isometric Stack with Mascots */}
        <div
          className="hidden md:block relative"
          style={{
            perspective: '2000px',
            perspectiveOrigin: '50% 30%',
          }}
        >
          {/* 3D Container */}
          <motion.div
            initial={{ opacity: 0, rotateX: 30, rotateY: -20 }}
            whileInView={{ opacity: 1, rotateX: 15, rotateY: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              minHeight: '700px',
            }}
          >
            {POLES.map((pole, index) => (
              <motion.div
                key={pole.name}
                initial={{ opacity: 0, translateY: 50, translateZ: -100 }}
                whileInView={{ opacity: 1, translateY: 0, translateZ: windowPositions[index].z }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 80
                }}
                whileHover={{
                  translateZ: windowPositions[index].z + 80,
                  scale: 1.08,
                  rotateX: 0,
                  rotateY: 0,
                  zIndex: 100,
                }}
                className="absolute w-72 bg-white border-3 border-black overflow-hidden"
                style={{
                  left: windowPositions[index].x,
                  top: `${(index % 3) * 200 + 20}px`,
                  boxShadow: `
                    8px 8px 0px 0px #000,
                    12px 12px 20px rgba(0,0,0,0.2)
                  `,
                  transformStyle: 'preserve-3d',
                  zIndex: windowPositions[index].z,
                }}
              >
                {/* Window Header with Mascot */}
                <div
                  className="px-4 py-3 border-b-3 border-black relative"
                  style={{ background: gradients[index] }}
                >
                  <div className="flex items-center justify-between mb-2">
                    {/* Window Controls */}
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-white/80 border border-black/20" />
                      <div className="w-3 h-3 rounded-full bg-white/80 border border-black/20" />
                      <div className="w-3 h-3 rounded-full bg-white/80 border border-black/20" />
                    </div>
                    {/* Pole Number */}
                    <span
                      className="pixel-font text-xs px-2 py-0.5 bg-white/20 border border-white/40 rounded"
                      style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}
                    >
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Pole Name with Mascot */}
                  <div className="flex items-center gap-3">
                    {/* Mascot Avatar */}
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-white/50 overflow-hidden bg-white/20 flex-shrink-0"
                      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                    >
                      <img
                        src={`/mascot/${pole.mascot}`}
                        alt={`${pole.name} mascot`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<span class="flex items-center justify-center w-full h-full text-2xl">🦊</span>`;
                        }}
                      />
                    </div>
                    {/* Pole Name */}
                    <h3 className="pixel-font text-xl text-white" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
                      {pole.name.toUpperCase()}
                    </h3>
                  </div>
                </div>

                {/* Window Content */}
                <div className="p-4 bg-white">
                  <p className="terminal-font text-sm text-gray-700 leading-relaxed">
                    {pole.description}
                  </p>

                  {/* Mascot Mini Badge */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                      <img
                        src={`/mascot/${pole.mascot}`}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="terminal-font text-xs text-gray-500">
                      POLE_MASCOT
                    </span>
                  </div>

                  {/* Decorative Code Block */}
                  <div className="mt-3 p-2 bg-gray-100 border border-gray-300 rounded">
                    <pre className="terminal-font text-xs" style={{ color: gradients[index].includes('Purple') ? '#7c3aed' : '#2563eb' }}>
{`> STATUS: ACTIVE
> MEMBERS: ${Math.floor(Math.random() * 20) + 10}
> PROJECTS: ${Math.floor(Math.random() * 5) + 2}`}
                    </pre>
                  </div>
                </div>

                {/* Corner Accent */}
                <div
                  className="absolute top-0 right-0 w-12 h-12"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.3) 50%)',
                  }}
                />
              </motion.div>
            ))}

            {/* Floating Decorative Mascots */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`floating-mascot-${i}`}
                animate={{
                  y: [0, -15, 0],
                  rotate: [i * 3, -i * 2, i * 3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5
                }}
                className="absolute hidden lg:block"
                style={{
                  left: `${85 + i * 3}%`,
                  top: `${100 + i * 150}px`,
                  width: '60px',
                  height: '60px',
                  zIndex: 1,
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-3 border-black overflow-hidden"
                  style={{
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.5)',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(37, 99, 235, 0.1))'
                  }}
                >
                  <img
                    src={`/mascot/${POLES[i].mascot}`}
                    alt="Decorative mascot"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ASCII Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center"
        >
          <pre className="ascii-art text-xs" style={{ color: '#7c3aed' }}>
{`╔═══════════════════════════════════════════════════════════════╗
║   ▓▓▓  END_OF_POLES_SECTION  ▓▓▓                              ║
╚═══════════════════════════════════════════════════════════════╝`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
};

export default PolesPanel;