import { motion } from 'framer-motion';
import HeroPanel from './components/HeroPanel';
import StatsPanel from './components/StatsPanel';
import BoardGrid from './components/BoardGrid';
import PolesPanel from './components/PolesPanel';
import MeetAlpha from './components/MeetAlpha';
import EventsTerminal from './components/EventsTerminal';
import JoinSection from './components/JoinSection';
import MascotFloaters from './components/MascotFloaters';

/**
 * ASIA Website - Neo-Brutalist High-Tech Identity
 * Sophisticated design with strict color hierarchy
 * Violet = Action | Cyan = Data | Pink = Alert
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

      {/* Navigation - Neo-Brutalist High-Tech */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white"
        style={{
          borderWidth: '0 0 0.5px 0',
          borderColor: '#000',
          boxShadow: '0 4px 0 0 rgba(0,0,0,0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src="./logo/Gemini_Generated_Image_2mill52mill52mil.png"
              alt="ASIA Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
              style={{
                borderWidth: '0.5px',
                borderColor: '#000',
                boxShadow: '2px 2px 0 0 #000'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="flex items-center gap-1">
              <span className="terminal-font text-xs text-gray-500 hidden sm:block">SYS://</span>
              <span className="pixel-font text-lg md:text-xl text-black">ASIA</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="#board"
              className="terminal-font text-xs md:text-sm px-2 md:px-3 py-1 bg-white text-black hover:text-purple-600 transition-colors hidden md:block"
              style={{ borderWidth: '0.5px', borderColor: '#000' }}
            >
              BOARD
            </a>
            <a
              href="#poles"
              className="terminal-font text-xs md:text-sm px-2 md:px-3 py-1 bg-white text-black hover:text-pink-600 transition-colors hidden md:block"
              style={{ borderWidth: '0.5px', borderColor: '#000' }}
            >
              POLES
            </a>
            <a
              href="#events"
              className="terminal-font text-xs md:text-sm px-2 md:px-3 py-1 bg-white text-black hover:text-cyan-600 transition-colors hidden md:block"
              style={{ borderWidth: '0.5px', borderColor: '#000' }}
            >
              EVENTS
            </a>
            <motion.a
              href="#join"
              whileHover={{ scale: 1.05, x: 2, y: 2 }}
              whileTap={{ scale: 0.95, x: 3, y: 3 }}
              className="terminal-font text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 text-white"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                borderWidth: '0.5px',
                borderColor: '#000',
                boxShadow: '3px 3px 0 0 #000'
              }}
            >
              JOIN_
            </motion.a>
          </div>
        </div>

        {/* Status Bar */}
        <div className="hidden md:block bg-gray-900 px-4 py-1">
          <div className="max-w-7xl mx-auto flex items-center justify-between terminal-font text-xs">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">STATUS:</span>
              <span className="text-green-500">● ONLINE</span>
            </div>
            <div className="flex items-center gap-4">
              <span style={{ color: '#7c3aed' }}>ACTION</span>
              <span style={{ color: '#06b6d4' }}>DATA</span>
              <span style={{ color: '#db2777' }}>ALERT</span>
            </div>
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

        {/* Meet Alpha Section */}
        <section id="alpha">
          <MeetAlpha />
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