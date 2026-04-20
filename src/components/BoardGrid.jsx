import { motion } from 'framer-motion';
import { BOARD_MEMBERS } from '../data/constants';

/**
 * BoardGrid - Neo-Brutalist High-Tech Board Gallery
 * Clean typography with floating card design
 */
const BoardGrid = ({ darkMode = false }) => {
  // Pre-defined random rotations for each member (consistent across renders)
  const rotations = [
    -5, 3, -2, 4, -4, 2, -3, 5, -1, 3, -6
  ];

  // Pre-defined offsets for scattered effect (desktop)
  const offsets = [
    { x: 0, y: 0 },
    { x: 20, y: -10 },
    { x: -15, y: 15 },
    { x: 10, y: 20 },
    { x: -20, y: -5 },
    { x: 15, y: 10 },
    { x: -10, y: -15 },
    { x: 5, y: 25 },
    { x: -25, y: 5 },
    { x: 20, y: -20 },
    { x: -5, y: 30 },
  ];

  // Color accents with strict hierarchy: Violet=Action, Cyan=Data, Pink=Alert
  const accents = [
    '#7c3aed', '#06b6d4', '#db2777', '#1e3a8a', '#ec4899',
    '#7c3aed', '#06b6d4', '#db2777', '#1e3a8a', '#ec4899', '#7c3aed'
  ];

  return (
    <section
      className="py-16 md:py-20 px-4 relative overflow-hidden"
      style={{ background: darkMode ? 'linear-gradient(180deg, #0b2f6b 0%, #092550 100%)' : '#f0f0f5' }}
    >
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.15
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="terminal-font text-xs text-gray-500">TEAM://</span>
            <h2 className="pixel-font-lg text-3xl md:text-5xl text-black">BOARD</h2>
          </div>
          <div className="terminal-font text-sm text-gray-600">
            <span style={{ color: '#7c3aed' }}>●</span> SCATTERED_POLAROID_GALLERY
            <span className="mx-2" style={{ color: '#06b6d4' }}>|</span>
            STATUS: <span style={{ color: '#10b981' }}>LOADED</span>
          </div>
        </motion.div>

        {/* Mobile: Simple Grid Layout */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {BOARD_MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="overflow-hidden"
              style={{
                borderWidth: '0.5px',
                borderColor: '#000',
                boxShadow: '3px 3px 0px 0px #000',
                background: darkMode ? '#132b54' : '#fff',
              }}
            >
              {/* Photo */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={`/board/${member.image}`}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback */}
                <div
                  className="absolute inset-0 hidden items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${accents[index]}40, ${accents[index]}20)` }}
                >
                  <span className="pixel-font text-4xl" style={{ color: accents[index] }}>
                    {member.name.charAt(0)}
                  </span>
                </div>
                {/* Number Badge */}
                <div
                  className="absolute bottom-1 right-1 px-1.5 py-0.5 terminal-font text-xs text-white"
                  style={{ background: accents[index], borderWidth: '0.5px', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  #{String(index + 1).padStart(2, '0')}
                </div>
              </div>
              {/* Caption */}
              <div className="p-2 text-center" style={{ background: darkMode ? '#132b54' : '#fff' }}>
                <h3 className="pixel-font text-xs text-black truncate">
                  {member.name.toUpperCase()}
                </h3>
                <p className="terminal-font text-xs text-gray-600 truncate">
                  {member.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Scattered Polaroid Layout */}
        <div className="hidden md:block relative" style={{ minHeight: '900px' }}>
          {BOARD_MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{
                opacity: 0,
                y: -200,
                rotate: 0,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: rotations[index],
              }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.15,
                rotate: 0,
                zIndex: 100,
              }}
              className="absolute polaroid"
              style={{
                left: `${(index % 4) * 25}%`,
                top: `${Math.floor(index / 4) * 33}%`,
                width: '200px',
                zIndex: index + 1,
                '--rotation': `${rotations[index]}deg`,
              }}
            >
              {/* Polaroid Frame */}
              <div className="border-3 border-black" style={{ boxShadow: '6px 6px 0px 0px #000', background: darkMode ? '#132b54' : '#fff' }}>
                {/* Photo */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={`/board/${member.image}`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback */}
                  <div
                    className="absolute inset-0 hidden items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${accents[index]}40, ${accents[index]}20)`, display: 'none' }}
                  >
                    <span className="pixel-font text-4xl" style={{ color: accents[index] }}>
                      {member.name.charAt(0)}
                    </span>
                  </div>

                  {/* Photo Number */}
                  <div
                    className="absolute bottom-2 right-2 px-2 py-1 border-2 border-black"
                    style={{ background: accents[index] }}
                  >
                    <span className="terminal-font text-sm text-white">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-4 text-center" style={{ background: darkMode ? '#132b54' : '#fff' }}>
                  <h3 className="pixel-font text-sm text-black mb-1 truncate">
                    {member.name.toUpperCase()}
                  </h3>
                  <p className="terminal-font text-xs text-gray-600">
                    {member.title}
                  </p>
                </div>

                {/* Tape Effect */}
                <div
                  className="absolute -top-3 left-1/2 w-16 h-6 bg-yellow-200 border-2 border-black"
                  style={{ transform: `translateX(-50%) rotate(${rotations[index] * -0.5}deg)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 text-center"
        >
          <div className="terminal-font text-sm text-gray-600">
            <span style={{ color: '#7c3aed' }}>SYS:</span> BOARD_LOADED
            <span className="mx-2">|</span>
            <span style={{ color: '#06b6d4' }}>MEMBERS:</span> {BOARD_MEMBERS.length}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BoardGrid;