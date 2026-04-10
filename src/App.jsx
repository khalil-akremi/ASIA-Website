import { motion } from 'framer-motion';
import HeroPanel from './components/HeroPanel';
import StatsPanel from './components/StatsPanel';
import BoardGrid from './components/BoardGrid';
import PolesPanel from './components/PolesPanel';
import EventsTerminal from './components/EventsTerminal';
import JoinSection from './components/JoinSection';

/**
 * ASIA Website - Main App Component
 * Neo-Brutalist / Cyber-Terminal Identity
 * Raw, energetic, anti-corporate aesthetic
 */
function App() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#f0f0f5' }}>
      {/* Dot Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.15
        }}
      />

      {/* Navigation - Neo-Brutalist */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b-3 border-black"
        style={{ boxShadow: '0 4px 0 0 #000' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ASIA Logo"
              className="w-10 h-10 object-contain border-2 border-black"
              style={{ boxShadow: '3px 3px 0 0 #000' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="pixel-font text-xl text-black">
              ASIA
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="#board"
              className="terminal-font text-sm px-3 py-1 bg-white border-2 border-black text-black hover:bg-purple-600 hover:text-white transition-colors hidden md:block"
            >
              BOARD
            </a>
            <a
              href="#poles"
              className="terminal-font text-sm px-3 py-1 bg-white border-2 border-black text-black hover:bg-green-600 hover:text-white transition-colors hidden md:block"
            >
              POLES
            </a>
            <a
              href="#events"
              className="terminal-font text-sm px-3 py-1 bg-white border-2 border-black text-black hover:bg-blue-600 hover:text-white transition-colors hidden md:block"
            >
              EVENTS
            </a>
            <motion.a
              href="#join"
              whileHover={{ scale: 1.05, x: 2, y: 2 }}
              whileTap={{ scale: 0.95, x: 3, y: 3 }}
              className="terminal-font text-sm px-4 py-2 bg-purple-600 border-2 border-black text-white"
              style={{ boxShadow: '4px 4px 0 0 #000' }}
            >
              JOIN_
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="hero">
          <HeroPanel />
        </section>

        {/* Stats Section */}
        <section id="stats">
          <StatsPanel />
        </section>

        {/* Board Section */}
        <section id="board">
          <BoardGrid />
        </section>

        {/* Poles Section */}
        <section id="poles">
          <PolesPanel />
        </section>

        {/* Events Section */}
        <section id="events">
          <EventsTerminal />
        </section>

        {/* Join Section */}
        <section id="join">
          <JoinSection />
        </section>
      </main>
    </div>
  );
}

export default App;