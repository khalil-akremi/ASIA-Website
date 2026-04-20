import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
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
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('asia-dark-mode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('asia-dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('asia-dark-mode', 'false');
    }
  }, [darkMode]);

  const bgStyle = darkMode
    ? {
        background: '#0a0a0f',
      }
    : {
        background: '#f0f0f5',
      };
  const dotColor = darkMode ? '#7c3aed' : '#000';
  const dotOpacity = darkMode ? 0.1 : 0.08;
  const navBg = darkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-black';

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-300" style={bgStyle}>
      {/* Dot Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          opacity: dotOpacity
        }}
      />

      {/* Navigation - Neo-Brutalist High-Tech */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 ${navBg} border-b-2 border-black`}
        style={{ boxShadow: '0 4px 0 0 rgba(0,0,0,0.1)' }}
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
              <span className={`pixel-font text-lg md:text-xl ${textColor}`}>ASIA</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="#board"
              className={`terminal-font text-xs md:text-sm px-2 md:px-3 py-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} hover:text-purple-600 transition-colors hidden md:block`}
              style={{ borderWidth: '0.5px', borderColor: '#000' }}
            >
              BOARD
            </a>
            <a
              href="#poles"
              className={`terminal-font text-xs md:text-sm px-2 md:px-3 py-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} hover:text-pink-600 transition-colors hidden md:block`}
              style={{ borderWidth: '0.5px', borderColor: '#000' }}
            >
              POLES
            </a>
            <a
              href="#events"
              className={`terminal-font text-xs md:text-sm px-2 md:px-3 py-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} hover:text-cyan-600 transition-colors hidden md:block`}
              style={{ borderWidth: '0.5px', borderColor: '#000' }}
            >
              EVENTS
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} border-2 border-black hover:scale-105 transition-transform`}
              style={{ boxShadow: '2px 2px 0 0 #000' }}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

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
              <span className="text-gray-400">|</span>
              <span className="text-yellow-400">MODE: {darkMode ? 'DARK' : 'LIGHT'}</span>
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
          <HeroPanel darkMode={darkMode} />
          <MascotFloaters variant="hero" />
        </section>

        {/* Stats Section */}
        <section id="stats">
          <StatsPanel darkMode={darkMode} />
        </section>

        {/* Board Section with Floating Mascots */}
        <section id="board" className="relative">
          <BoardGrid darkMode={darkMode} />
          <MascotFloaters variant="board" />
        </section>

        {/* Poles Section */}
        <section id="poles">
          <PolesPanel darkMode={darkMode} />
        </section>

        {/* Meet Alpha Section */}
        <section id="alpha">
          <MeetAlpha darkMode={darkMode} />
        </section>

        {/* Events Section with Floating Mascots */}
        <section id="events" className="relative">
          <EventsTerminal darkMode={darkMode} />
          <MascotFloaters variant="events" />
        </section>

        {/* Join Section */}
        <section id="join">
          <JoinSection darkMode={darkMode} />
        </section>
      </main>
    </div>
  );
}

export default App;
