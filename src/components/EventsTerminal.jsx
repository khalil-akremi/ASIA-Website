import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Terminal } from 'lucide-react';
import eventsData from '../data/events.json';

/**
 * EventsTerminal - Dark Terminal with CRT Effect (Mobile Optimized)
 * High-Tech terminal design with strict color hierarchy
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
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="terminal-font text-xs text-gray-500">EVENTS://</span>
            <h2 className="pixel-font-lg text-3xl md:text-5xl" style={{ color: '#7c3aed' }}>
              STREAM
            </h2>
          </div>
          <div className="terminal-font text-sm text-gray-600">
            <span style={{ color: '#06b6d4' }}>●</span> REAL_TIME_EVENT_STREAM
            <span className="mx-2">|</span>
            STATUS: <span style={{ color: '#db2777' }}>ACTIVE</span>
          </div>
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
                                <Calendar size={12} className="text-pink-500" />
                                {event.date}
                              </span>
                            )}
                            {event.time && (
                              <span className="flex items-center gap-1">
                                <Clock size={12} className="text-cyan-500" />
                                {event.time}
                              </span>
                            )}
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={12} className="text-blue-800" />
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
                    <div className="terminal-font text-base md:text-xl mb-4" style={{ color: '#7c3aed' }}>
                      SCANNING FOR UPCOMING DATA...
                    </div>

                    {/* Loading Bar */}
                    <div className="w-48 h-2 bg-gray-800 mx-auto overflow-hidden">
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="h-full w-1/2"
                        style={{
                          background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
                        }}
                      />
                    </div>

                    {/* Blinking cursor */}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="terminal-font text-2xl md:text-3xl mt-4 inline-block"
                      style={{ color: '#7c3aed' }}
                    >
                      █
                    </motion.span>

                    <p className="terminal-font text-xs md:text-sm text-gray-500 mt-4">
                      {'>'} AWAITING_EVENT_TRANSMISSION_
                    </p>
                  </motion.div>
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

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 md:mt-8 text-center"
        >
          <div className="terminal-font text-sm text-gray-600">
            <span style={{ color: '#7c3aed' }}>SYS:</span> EVENTS_LOADED
            <span className="mx-2">|</span>
            <span style={{ color: '#06b6d4' }}>STREAM:</span> ONLINE
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsTerminal;