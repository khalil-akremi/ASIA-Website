import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Terminal } from 'lucide-react';
import eventsData from '../data/events.json';

/**
 * EventsTerminal - Dark Terminal with Scanning Line (Mobile Optimized)
 * CRT monitor effect with matrix-style animations
 */
const EventsTerminal = () => {
  const hasEvents = eventsData && eventsData.length > 0;

  return (
    <section className="py-12 md:py-20 px-4 relative overflow-hidden bg-black">
      {/* Matrix-style falling lines background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(124, 58, 237, 0.1) 2px,
              rgba(124, 58, 237, 0.1) 4px
            )
          `,
        }} />
      </div>

      {/* Scanning Line Animation */}
      <motion.div
        className="absolute left-0 right-0 h-1 z-20"
        style={{
          background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
          boxShadow: '0 0 20px #7c3aed',
        }}
        animate={{
          top: ['0%', '100%', '0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
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
          <h2 className="pixel-font-lg text-3xl md:text-5xl mb-2" style={{ color: '#7c3aed' }}>
            UPCOMING_EVENTS
          </h2>
          <pre className="ascii-art text-xs mt-3 md:mt-4" style={{ color: '#10b981' }}>
{`╔═══════════════════════════════════════════════╗
║   REAL_TIME_EVENT_STREAM                      ║
║   STATUS: <ACTIVE />                           ║
╚═══════════════════════════════════════════════╝`}
          </pre>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Terminal Frame */}
          <div className="border-2 md:border-3 border-purple-500 bg-gray-950" style={{ boxShadow: '6px 6px 0px 0px #000' }}>
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b-2 border-purple-500 bg-gray-900">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex gap-1 md:gap-1.5">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 border border-black" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500 border border-black" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 border border-black" />
                </div>
                <span className="terminal-font text-xs md:text-sm text-purple-400 truncate">
                  ~/asia/events_stream.exe
                </span>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="terminal-font text-xs text-green-500 hidden sm:inline">LIVE</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 md:p-6 min-h-[280px] md:min-h-[350px] relative overflow-hidden">
              {/* Scanlines overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 0, 0, 0.1) 2px,
                    rgba(0, 0, 0, 0.1) 4px
                  )`,
                }}
              />

              {hasEvents ? (
                /* Events List */
                <div className="space-y-3 md:space-y-4 relative z-0">
                  {eventsData.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border-2 border-purple-500 p-3 md:p-4 bg-gray-900"
                    >
                      <div className="flex items-start gap-2 md:gap-3">
                        <Terminal className="text-purple-500 flex-shrink-0 mt-1" size={18} />
                        <div className="flex-1 min-w-0">
                          <h3 className="pixel-font text-base md:text-lg mb-1 md:mb-2" style={{ color: '#7c3aed' }}>
                            {`> ${event.title}`}
                          </h3>
                          <div className="flex flex-wrap gap-2 md:gap-4 text-gray-400 terminal-font text-xs md:text-sm">
                            {event.date && (
                              <span className="flex items-center gap-1">
                                <Calendar size={12} className="text-green-500" />
                                {event.date}
                              </span>
                            )}
                            {event.time && (
                              <span className="flex items-center gap-1">
                                <Clock size={12} className="text-blue-500" />
                                {event.time}
                              </span>
                            )}
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={12} className="text-orange-500" />
                                <span className="truncate">{event.location}</span>
                              </span>
                            )}
                          </div>
                          {event.description && (
                            <p className="terminal-font text-xs md:text-sm text-gray-500 mt-1 md:mt-2 line-clamp-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* No Events - Scanning Message */
                <div className="flex flex-col items-center justify-center h-full min-h-[220px] md:min-h-[280px] relative z-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-center"
                  >
                    <pre className="terminal-font text-sm md:text-xl whitespace-pre" style={{ color: '#7c3aed' }}>
{`╔══════════════════════════════════╗
║                                  ║
║   SCANNING FOR UPCOMING DATA...  ║
║                                  ║
║   [████░░░░░░░░░░░░░░░░░░░░] 15% ║
║                                  ║
╚══════════════════════════════════╝`}
                    </pre>

                    {/* Blinking cursor */}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="terminal-font text-2xl md:text-3xl"
                      style={{ color: '#7c3aed' }}
                    >
                      █
                    </motion.span>

                    <p className="terminal-font text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
                      {'>'} AWAITING_EVENT_TRANSMISSION_
                    </p>
                  </motion.div>

                  {/* Loading bar animation */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="mt-4 md:mt-6 h-1 bg-purple-500"
                    style={{ boxShadow: '0 0 10px #7c3aed' }}
                  />
                </div>
              )}
            </div>

            {/* Terminal Footer */}
            <div className="flex items-center justify-between px-3 md:px-4 py-1.5 md:py-2 border-t-2 border-purple-500 bg-gray-900">
              <span className="terminal-font text-xs text-gray-500">
                TERMINAL v2.0.25
              </span>
              <div className="flex items-center gap-2 md:gap-4">
                <span className="terminal-font text-xs text-purple-400">
                  EVENTS: {hasEvents ? eventsData.length : '0'}
                </span>
                <span className="terminal-font text-xs text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="hidden sm:inline">CONNECTED</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ASCII Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 md:mt-8 text-center"
        >
          <pre className="ascii-art text-xs hidden md:block" style={{ color: '#10b981' }}>
{`┌──────────────────────────────────────────────┐
│  END_OF_EVENT_STREAM                          │
│  [SYSTEM_READY]                               │
└──────────────────────────────────────────────┘`}
          </pre>
          {/* Mobile simplified */}
          <div className="md:hidden terminal-font text-xs" style={{ color: '#10b981' }}>
            ── END_OF_EVENT_STREAM ──
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsTerminal;