import { motion } from 'framer-motion';
import { CENTRAL_MASCOT } from '../data/constants';

/**
 * MeetAlpha - "Meet Alpha, Our ASIA Mascot" Section
 * Clean typography with floating mascot design
 */
const MeetAlpha = ({ darkMode = false }) => {
  return (
    <section
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      style={{
        background: darkMode
          ? 'linear-gradient(180deg, #0b2f6b 0%, #092550 100%)'
          : 'linear-gradient(180deg, #f0f0f5 0%, #fce7f3 50%, #f0f0f5 100%)'
      }}
    >
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.1
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="terminal-font text-xs" style={{ color: darkMode ? '#a7b9d6' : '#6b7280' }}>MASCOT://</span>
            <h2 className="pixel-font-lg text-3xl md:text-5xl" style={{ color: darkMode ? '#f4f8ff' : '#000' }}>ALPHA</h2>
          </div>
          <div className="terminal-font text-sm" style={{ color: darkMode ? '#cbd9ef' : '#4b5563' }}>
            <span style={{ color: '#db2777' }}>●</span> OUR_ASIA_MASCOT
            <span className="mx-2" style={{ color: '#06b6d4' }}>|</span>
            STATUS: <span style={{ color: '#10b981' }}>ACTIVE</span>
          </div>
        </motion.div>

        {/* Mascot Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative"
        >
          {/* Main Mascot Card */}
          <div
            className="relative mx-auto overflow-visible"
            style={{
              borderWidth: '0.5px',
              borderColor: '#000',
              boxShadow: '8px 8px 0px 0px #db2777, 12px 12px 20px rgba(219, 39, 119, 0.3)',
              maxWidth: '400px',
              background: darkMode ? '#132b54' : '#fff'
            }}
          >
            {/* Header Bar */}
            <div
              className="px-4 py-2 flex items-center justify-between"
              style={{
                background: 'linear-gradient(135deg, #db2777 0%, #1e3a8a 100%)',
                borderBottom: '0.5px solid rgba(0,0,0,0.2)',
              }}
            >
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-white/60 border border-white/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/60 border border-white/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/60 border border-white/30" />
              </div>
              <span className="terminal-font text-xs text-white/70">
                ALPHA.sys
              </span>
            </div>

            {/* Mascot Image - Floating outside container */}
            <div className="relative overflow-visible">
              <img
                src={`./mascot/${CENTRAL_MASCOT}`}
                alt="Alpha - ASIA Mascot"
                className="w-full aspect-square object-cover"
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full aspect-square flex items-center justify-center bg-gradient-to-br from-pink-200 to-blue-200">
                      <span class="pixel-font text-4xl text-gray-600">ALPHA</span>
                    </div>
                  `;
                }}
              />

              {/* Status Badge */}
              <div
                className="absolute top-2 right-2 px-2 py-1 flex items-center gap-1"
                style={{
                  background: 'rgba(16, 185, 129, 0.9)',
                  border: '0.5px solid rgba(255,255,255,0.3)',
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="terminal-font text-xs text-white">ONLINE</span>
              </div>
            </div>

            {/* Caption */}
            <div className="p-4 text-center" style={{ background: darkMode ? '#132b54' : '#fff' }}>
              <h3 className="pixel-font text-xl mb-2" style={{ color: darkMode ? '#7dd3fc' : '#1e3a8a' }}>
                ALPHA
              </h3>
              <p className="terminal-font text-sm" style={{ color: darkMode ? '#cbd9ef' : '#4b5563' }}>
                The friendly face of ASIA
              </p>

              {/* Loading Bar */}
              <div className="mt-3 flex items-center gap-2">
                <span className="terminal-font text-xs" style={{ color: darkMode ? '#a7b9d6' : '#9ca3af' }}>ENERGY</span>
                <div className="flex-1 h-1.5 overflow-hidden border" style={{ background: darkMode ? '#12335c' : '#f3f4f6', borderColor: darkMode ? 'rgba(255,255,255,0.2)' : '#e5e7eb' }}>
                  <div
                    className="h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(90deg, #db2777, #1e3a8a)',
                    }}
                  />
                </div>
                <span className="terminal-font text-xs" style={{ color: darkMode ? '#34d399' : '#10b981' }}>
                  100%
                </span>
              </div>
            </div>
          </div>

          {/* Floating Decorations */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -left-4 w-12 h-12 border-2 border-black hidden md:block"
            style={{
              background: '#db2777',
              boxShadow: '3px 3px 0 0 #000',
            }}
          />
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-black hidden md:block"
            style={{
              background: '#1e3a8a',
              boxShadow: '3px 3px 0 0 #000',
            }}
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/2 -right-8 w-10 h-10 border-2 border-black hidden md:block"
            style={{
              background: '#06b6d4',
              boxShadow: '3px 3px 0 0 #000',
            }}
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="terminal-font text-sm md:text-base max-w-lg mx-auto" style={{ color: darkMode ? '#d5e1f3' : '#374151' }}>
            Alpha represents the spirit of our community — curious, innovative,
            and always ready to learn. Join us in building the future of data science
            and artificial intelligence.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="terminal-font text-sm" style={{ color: darkMode ? '#cbd9ef' : '#4b5563' }}>
            <span style={{ color: '#7c3aed' }}>SYS:</span> MASCOT_LOADED
            <span className="mx-2">|</span>
            <span style={{ color: '#06b6d4' }}>STATUS:</span> FRIENDLY
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetAlpha;