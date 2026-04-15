import { motion } from 'framer-motion';
import { POLES } from '../data/constants';

/**
 * PolesPanel - Neo-Brutalist High-Tech Control Modules
 * Each pole is a control module with grid coordinates, loading bars, and connection lines
 * Mascots are floating PNG layers with drop-shadow
 */
const PolesPanel = () => {
  // Gradient colors for each pole header (Violet=Action, Cyan=Data, Pink=Alert)
  const poleConfig = [
    { gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', coord: 'A-1', status: 'ACTIVE', type: 'action' },
    { gradient: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)', coord: 'B-2', status: 'ACTIVE', type: 'alert' },
    { gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', coord: 'C-3', status: 'ACTIVE', type: 'data' },
    { gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', coord: 'D-4', status: 'ACTIVE', type: 'action' },
    { gradient: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)', coord: 'E-5', status: 'STANDBY', type: 'alert' },
    { gradient: 'linear-gradient(135deg, #06b6d4 0%, #1e3a8a 100%)', coord: 'F-6', status: 'ACTIVE', type: 'data' },
  ];

  // Loading bar percentages (static)
  const loadingBars = [87, 92, 78, 95, 65, 88];

  // 3D positions for desktop
  const windowPositions = [
    { x: '3%', z: 60, rotateY: -3, rotateX: 4 },
    { x: '33%', z: 40, rotateY: 2, rotateX: -2 },
    { x: '63%', z: 20, rotateY: -6, rotateX: 5 },
    { x: '13%', z: 50, rotateY: 4, rotateX: -3 },
    { x: '43%', z: 30, rotateY: -3, rotateX: 4 },
    { x: '73%', z: 10, rotateY: 4, rotateX: -5 },
  ];

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden" style={{ background: '#f0f0f5' }}>
      {/* Connection Lines SVG - Desktop Only */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
        style={{ zIndex: 1 }}
      >
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        {/* Connection lines to center */}
        <line x1="50%" y1="30%" x2="15%" y2="45%" stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="50%" y1="30%" x2="45%" y2="50%" stroke="rgba(219, 39, 119, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="50%" y1="30%" x2="75%" y2="40%" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.15
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="terminal-font text-xs text-gray-500">SYS://</span>
            <h2 className="pixel-font-lg text-3xl md:text-5xl text-black">POLES</h2>
            <span className="terminal-font text-xs text-gray-500">.module</span>
          </div>
          <div className="terminal-font text-sm text-gray-600">
            <span style={{ color: '#7c3aed' }}>●</span> 6_SPECIALIZED_DIVISIONS <span style={{ color: '#06b6d4' }}>|</span> STATUS: <span style={{ color: '#db2777' }}>ONLINE</span>
          </div>
        </motion.div>

        {/* Mobile: Simple Grid with Control Module Design */}
        <div className="md:hidden space-y-4">
          {POLES.map((pole, index) => (
            <motion.div
              key={pole.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative bg-white overflow-hidden"
              style={{
                borderWidth: '0.5px',
                borderColor: '#000',
                boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)',
              }}
            >
              {/* Grid Coordinate Badge */}
              <div
                className="absolute top-2 left-2 z-20 terminal-font text-xs px-2 py-1"
                style={{
                  background: poleConfig[index].gradient,
                  color: '#fff',
                  border: '0.5px solid rgba(255,255,255,0.3)',
                }}
              >
                {poleConfig[index].coord}
              </div>

              {/* Status Indicator */}
              <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: poleConfig[index].status === 'ACTIVE' ? '#10b981' : '#f59e0b',
                    boxShadow: `0 0 8px ${poleConfig[index].status === 'ACTIVE' ? '#10b981' : '#f59e0b'}`,
                  }}
                />
                <span className="terminal-font text-xs text-gray-500">
                  {poleConfig[index].status}
                </span>
              </div>

              {/* Header with Mascot - Floating */}
              <div
                className="pt-8 pb-2 px-4 relative"
                style={{ background: poleConfig[index].gradient }}
              >
                <h3 className="pixel-font text-lg text-white relative z-10" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
                  {pole.name.toUpperCase()}
                </h3>
                {/* Double border effect */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: 'rgba(255,255,255,0.3)' }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: 'rgba(0,0,0,0.2)', transform: 'translateY(1px)' }}
                />
              </div>

              {/* Floating Mascot */}
              <div className="relative h-32 overflow-visible">
                <img
                  src={`./mascot/${pole.mascot}`}
                  alt={`${pole.name} mascot`}
                  className="absolute right-2 top-0 w-28 h-28 object-contain z-30"
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                    transform: 'translateY(-20%)',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="p-4 pr-32">
                  <p className="terminal-font text-sm text-gray-700">
                    {pole.description}
                  </p>
                </div>
              </div>

              {/* Loading Bar */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="terminal-font text-xs text-gray-500">CAPACITY</span>
                  <span className="terminal-font text-xs" style={{ color: '#7c3aed' }}>
                    {loadingBars[index]}%
                  </span>
                </div>
                <div
                  className="h-1.5 bg-gray-200 overflow-hidden"
                  style={{ border: '0.5px solid #000' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${loadingBars[index]}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full"
                    style={{ background: poleConfig[index].gradient }}
                  />
                </div>
              </div>

              {/* Micro-border accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: poleConfig[index].gradient, opacity: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Desktop: 3D Isometric Control Modules */}
        <div
          className="hidden md:block relative"
          style={{
            perspective: '2000px',
            perspectiveOrigin: '50% 30%',
            minHeight: '800px',
          }}
        >
          {/* Central Hub Indicator */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
            style={{ opacity: 0.1 }}
          >
            <div className="w-32 h-32 rounded-full border-2 border-purple-500" />
            <div className="absolute inset-4 rounded-full border border-pink-500" />
          </div>

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
                scale: 1.05,
                rotateX: 0,
                rotateY: 0,
                zIndex: 100,
              }}
              className="absolute w-80 bg-white overflow-visible"
              style={{
                left: windowPositions[index].x,
                top: `${(index % 3) * 240 + 30}px`,
                borderWidth: '0.5px',
                borderColor: '#000',
                boxShadow: `
                  8px 8px 0px 0px rgba(0,0,0,0.3),
                  12px 12px 30px rgba(0,0,0,0.15)
                `,
                transformStyle: 'preserve-3d',
                zIndex: windowPositions[index].z,
              }}
            >
              {/* Grid Coordinate */}
              <div
                className="absolute -top-3 -left-3 z-30 px-2 py-1 terminal-font text-xs text-white"
                style={{
                  background: poleConfig[index].gradient,
                  border: '0.5px solid rgba(255,255,255,0.3)',
                  boxShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                }}
              >
                {poleConfig[index].coord}
              </div>

              {/* Status Indicator */}
              <div className="absolute -top-1 -right-1 z-30 flex items-center gap-1 px-2 py-0.5 bg-white border border-black">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: poleConfig[index].status === 'ACTIVE' ? '#10b981' : '#f59e0b',
                    boxShadow: `0 0 8px ${poleConfig[index].status === 'ACTIVE' ? '#10b981' : '#f59e0b'}`,
                  }}
                />
              </div>

              {/* Window Header */}
              <div
                className="px-4 py-3 relative"
                style={{
                  background: poleConfig[index].gradient,
                  borderBottom: '0.5px solid rgba(0,0,0,0.2)',
                }}
              >
                <div className="flex items-center justify-between">
                  {/* Window Controls */}
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/60 border border-white/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/60 border border-white/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/60 border border-white/30" />
                  </div>
                  {/* Module Type */}
                  <span className="terminal-font text-xs text-white/70 uppercase">
                    {poleConfig[index].type}
                  </span>
                </div>
                <h3
                  className="pixel-font text-xl text-white mt-2"
                  style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}
                >
                  {pole.name.toUpperCase()}
                </h3>
              </div>

              {/* Floating Mascot - Positioned outside container */}
              <div className="relative">
                <img
                  src={`./mascot/${pole.mascot}`}
                  alt={`${pole.name} mascot`}
                  className="absolute -right-4 -top-2 w-24 h-24 object-contain z-30"
                  style={{
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
                    transform: 'rotate(8deg)',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* Content Area */}
                <div className="p-4 pr-20">
                  <p className="terminal-font text-sm text-gray-700 leading-relaxed">
                    {pole.description}
                  </p>
                </div>
              </div>

              {/* Stats Panel */}
              <div className="px-4 pb-2">
                <div className="flex gap-3 mb-2">
                  <div className="flex-1 p-2 bg-gray-50 border border-gray-200">
                    <span className="terminal-font text-xs text-gray-500">MEMBERS</span>
                    <div className="pixel-font text-sm" style={{ color: '#7c3aed' }}>
                      {Math.floor(Math.random() * 20) + 10}
                    </div>
                  </div>
                  <div className="flex-1 p-2 bg-gray-50 border border-gray-200">
                    <span className="terminal-font text-xs text-gray-500">PROJECTS</span>
                    <div className="pixel-font text-sm" style={{ color: '#06b6d4' }}>
                      {Math.floor(Math.random() * 5) + 2}
                    </div>
                  </div>
                </div>

                {/* Loading Bar */}
                <div className="flex items-center gap-2">
                  <span className="terminal-font text-xs text-gray-400">LOAD</span>
                  <div className="flex-1 h-1.5 bg-gray-100 overflow-hidden border border-gray-200">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${loadingBars[index]}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.1 }}
                      className="h-full"
                      style={{ background: poleConfig[index].gradient }}
                    />
                  </div>
                  <span className="terminal-font text-xs" style={{ color: '#db2777' }}>
                    {loadingBars[index]}%
                  </span>
                </div>
              </div>

              {/* Bottom border accent */}
              <div
                className="h-1"
                style={{ background: poleConfig[index].gradient }}
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
                top: `${120 + i * 140}px`,
                width: '50px',
                height: '50px',
                zIndex: 1,
              }}
            >
              <img
                src={`./mascot/${POLES[i].mascot}`}
                alt="Decorative mascot"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="terminal-font text-xs text-gray-500">
            <span style={{ color: '#7c3aed' }}>SYS:</span> POLES_LOADED
            <span className="mx-2">|</span>
            <span style={{ color: '#06b6d4' }}>STATUS:</span> OPERATIONAL
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PolesPanel;