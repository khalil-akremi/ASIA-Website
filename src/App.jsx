import { motion } from 'framer-motion';
import HeroPanel from './components/HeroPanel';
import StatsPanel from './components/StatsPanel';
import BoardGrid from './components/BoardGrid';
import PolesPanel from './components/PolesPanel';
import EventsTerminal from './components/EventsTerminal';
import JoinSection from './components/JoinSection';
import MascotFloaters from './components/MascotFloaters';

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
          opacity: 0.08
        }}
      />

      {/* Navigation - Neo-Brutalist (Mobile Responsive) */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 md:border-b-3 border-black"
        style={{ boxShadow: '0 4px 0 0 #000' }}
      >
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src="/logo.png"
              alt="ASIA Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain border-2 border-black"
              style={{ boxShadow: '3px 3px 0 0 #000' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="pixel-font text-lg md:text-xl text-black">
              ASIA
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="#board"
              className="terminal-font text-xs md:text-sm px-2 md:px-3 py-1 bg-white border-2 border-black text-black hover:bg-purple-600 hover:text-white transition-colors hidden md:block"
            >
              BOARD
            </a>
            <a
              href="#poles"
              className="terminal-font text-xs md:text-sm px-2 md:px-3 py-1 bg-white border-2 border-black text-black hover:bg-green-600 hover:text-white transition-colors hidden md:block"
            >
              POLES
            </a>
            <a
              href="#events"
              className="terminal-font text-xs md:text-sm px-2 md:px-3 py-1 bg-white border-2 border-black text-black hover:bg-blue-600 hover:text-white transition-colors hidden md:block"
            >
              EVENTS
            </a>
            <motion.a
              href="#join"
              whileHover={{ scale: 1.05, x: 2, y: 2 }}
              whileTap={{ scale: 0.95, x: 3, y: 3 }}
              className="terminal-font text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 bg-purple-600 border-2 border-black text-white"
              style={{ boxShadow: '3px 3px 0 0 #000' }}
            >
              JOIN_
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="hero" className="relative">
          <HeroPanel />
          <MascotFloaters variant="hero" />
        </section>

        {/* Stats Section */}
        <section id="stats">
          <StatsPanel />
        </section>

        {/* Board Section with Floating Mascots */}
        <section id="board" className="relative">
          <BoardGrid />
          <MascotFloaters variant="board" />
        </section>

        {/* Poles Section */}
        <section id="poles">
          <PolesPanel />
        </section>

        {/* Events Section with Floating Mascots */}
        <section id="events" className="relative">
          <EventsTerminal />
          <MascotFloaters variant="events" />
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