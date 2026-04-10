import { motion } from 'framer-motion';
import { BOARD_MEMBERS } from '../data/constants';

/**
 * BoardGrid - Scattered Polaroid Gallery
 * "Eparpillé" layout with random rotations and drop animations
 */
const BoardGrid = () => {
  // Pre-defined random rotations for each member (consistent across renders)
  const rotations = [
    -5, 3, -2, 4, -4, 2, -3, 5, -1, 3, -6
  ];

  // Pre-defined offsets for scattered effect
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="pixel-font-lg text-4xl md:text-5xl text-black mb-2">
            MEET_THE_BOARD
          </h2>
          <pre className="ascii-art text-xs mt-4" style={{ color: '#10b981' }}>
{`┌──────────────────────────────────────┐
│  ★ SCATTERED_POLAROID_GALLERY ★   │
└──────────────────────────────────────┘`}
          </pre>
        </motion.div>

        {/* Polaroid Container */}
        <div className="relative min-h-[1200px] md:min-h-[900px]">
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
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
              }}
              className="absolute polaroid"
              style={{
                left: `${(index % 4) * 25}%`,
                top: `${Math.floor(index / 4) * 33}%`,
                transform: `translate(${offsets[index].x}px, ${offsets[index].y}px) rotate(${rotations[index]}deg)`,
                width: '220px',
                zIndex: index + 1,
                '--rotation': `${rotations[index]}deg`,
              }}
            >
              {/* Polaroid Frame */}
              <div className="bg-white border-3 border-black" style={{ boxShadow: '6px 6px 0px 0px #000' }}>
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
                    className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200"
                    style={{ display: 'none' }}
                  >
                    <span className="pixel-font text-4xl text-purple-600">
                      {member.name.charAt(0)}
                    </span>
                  </div>

                  {/* Photo Number */}
                  <div className="absolute bottom-2 right-2 bg-yellow-400 border-2 border-black px-2 py-1">
                    <span className="terminal-font text-sm text-black">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-4 text-center bg-white">
                  <h3 className="pixel-font text-sm text-black mb-1 truncate">
                    {member.name.toUpperCase()}
                  </h3>
                  <p className="terminal-font text-xs text-gray-600">
                    {member.title}
                  </p>
                </div>

                {/* Tape Effect */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200 border-2 border-black"
                  style={{ transform: `rotate(${rotations[index] * -1}deg) translateX(-50%)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ASCII Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <pre className="ascii-art text-xs" style={{ color: '#7c3aed' }}>
{`╔═══════════════════════════════════════════════════════════════╗
║   ▓▓▓  END_OF_BOARD_GALLERY  ▓▓▓                              ║
╚═══════════════════════════════════════════════════════════════╝`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
};

export default BoardGrid;