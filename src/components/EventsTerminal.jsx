import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Terminal, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { EVENTS_SHEET_URL } from '../data/constants';

const DEFAULT_EVENTS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1_iNDWS1KBtE7bxbeqKcpro4H5Jtc4ORU97792uDBXoE/export?format=csv';

/**
 * EventsTerminal - Dark Terminal with CRT Effect
 * Syncs with Google Sheets for real-time event data
 * Sheet: https://docs.google.com/spreadsheets/d/1_iNDWS1KBtE7bxbeqKcpro4H5Jtc4ORU97792uDBXoE
 */

const buildCsvUrl = (sheetUrl) => {
  if (!sheetUrl) return '';
  if (/output=csv|format=csv/i.test(sheetUrl)) return sheetUrl;
  const match = sheetUrl.match(/https?:\/\/docs\.google\.com\/spreadsheets\/d\/([^/]+)/i);
  if (!match) return sheetUrl;
  return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
};

const normalizeImageUrl = (url) => {
  if (!url) return '';
  const raw = `${url}`.trim().replace(/^"|"$/g, '');

  // Some sheet cells contain extra text next to the URL; isolate a URL-like token first.
  const detectedUrl = raw.match(/https?:\/\/[^\s"]+/i);
  const trimmed = detectedUrl ? detectedUrl[0] : raw;

  const driveMatch = trimmed.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([a-zA-Z0-9_-]+)/i);
  if (driveMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }

  const driveThumbnailMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
  if (/drive\.google\.com\/thumbnail/i.test(trimmed) && driveThumbnailMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveThumbnailMatch[1]}`;
  }

  return trimmed;
};

const getField = (source, keys, fallback = '') => {
  for (const key of keys) {
    if (source[key] !== undefined && source[key] !== null && `${source[key]}`.trim() !== '') {
      return `${source[key]}`.trim();
    }
  }
  return fallback;
};

const EventsTerminal = ({ darkMode = true }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const sheetCsvUrl = buildCsvUrl(EVENTS_SHEET_URL || DEFAULT_EVENTS_SHEET_URL);

  // Parse CSV to JSON
  const parseCSV = (csvText) => {
    const rows = [];
    let currentRow = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (char === '"' && nextChar === '"' && insideQuotes) {
        currentValue += '"';
        i++;
        continue;
      }

      if (char === '"') {
        insideQuotes = !insideQuotes;
        continue;
      }

      if (char === ',' && !insideQuotes) {
        currentRow.push(currentValue);
        currentValue = '';
        continue;
      }

      if ((char === '\n' || char === '\r') && !insideQuotes) {
        if (currentValue.length > 0 || currentRow.length > 0) {
          currentRow.push(currentValue);
          rows.push(currentRow);
          currentRow = [];
          currentValue = '';
        }
        continue;
      }

      currentValue += char;
    }

    if (currentValue.length > 0 || currentRow.length > 0) {
      currentRow.push(currentValue);
      rows.push(currentRow);
    }

    if (rows.length < 2) return [];

    const headers = rows[0].map(header => header.trim().toLowerCase().replace(/\s+/g, '_'));
    const result = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row.length) continue;

      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = (row[index] || '').trim();
      });

      const title = getField(obj, ['title', 'name', 'event_name', 'event_title'], '');
      if (!title) continue;

      result.push({
        title,
        date: getField(obj, ['date', 'event_date', 'day'], ''),
        time: getField(obj, ['time', 'event_time'], ''),
        location: getField(obj, ['location', 'venue', 'place'], ''),
        description: getField(obj, ['description', 'desc', 'details', 'event_description'], ''),
        image: normalizeImageUrl(getField(obj, ['image', 'photo', 'image_url', 'image_link', 'thumbnail', 'image_section', 'image_path', 'image_src'], '')),
        status: getField(obj, ['status', 'state'], 'upcoming'),
      });
    }

    return result;
  };

  // Fetch events from Google Sheets
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    if (!sheetCsvUrl) {
      setLoading(false);
      setError('Add your Google Sheets CSV URL in src/data/constants.js to enable live events.');
      return;
    }

    try {
      // Try to fetch from Google Sheets
      const response = await fetch(`${sheetCsvUrl}${sheetCsvUrl.includes('?') ? '&' : '?'}t=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const csvText = await response.text();
      const parsedEvents = parseCSV(csvText);

      // Filter to only show upcoming/active events
      const activeEvents = parsedEvents.filter(event =>
        event.status.toLowerCase() !== 'completed' &&
        event.status.toLowerCase() !== 'cancelled'
      );

      setEvents(activeEvents);
      setLastSync(new Date());

      // Cache in localStorage
      localStorage.setItem('asia-events-cache', JSON.stringify({
        events: activeEvents,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Error fetching events:', err);

      // Try to load from cache
      const cached = localStorage.getItem('asia-events-cache');
      if (cached) {
        const { events: cachedEvents } = JSON.parse(cached);
        setEvents(cachedEvents);
        setError('Using cached data. Check connection for updates.');
      } else {
        setError('Failed to load events. Please check connection.');
        setEvents([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Load events on mount and set up polling
  useEffect(() => {
    // Try to load from cache first for instant display
    const cached = localStorage.getItem('asia-events-cache');
    if (cached) {
      const { events: cachedEvents, timestamp } = JSON.parse(cached);
      const cacheAge = Date.now() - timestamp;

      // Use cache if less than 5 minutes old
      if (cacheAge < 5 * 60 * 1000) {
        setEvents(cachedEvents);
        setLastSync(new Date(timestamp));
        setLoading(false);
      }
    }

    // Fetch fresh data
    fetchEvents();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchEvents, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const hasEvents = events && events.length > 0;

  return (
    <section className={`py-12 md:py-20 px-4 relative overflow-hidden ${darkMode ? 'bg-black' : 'bg-gray-900'}`}>
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
            STATUS: {loading ? (
              <span style={{ color: '#f59e0b' }}>SYNCING...</span>
            ) : (
              <span style={{ color: '#db2777' }}>ACTIVE</span>
            )}
          </div>

          {lastSync && (
            <div className="mt-2 text-xs text-gray-500 terminal-font">
              Last sync: {lastSync.toLocaleTimeString()}
            </div>
          )}
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
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchEvents}
                  disabled={loading}
                  className="p-1 hover:bg-purple-900/50 rounded transition-colors"
                  title="Refresh events"
                >
                  <RefreshCw size={16} className={`text-purple-400 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="terminal-font text-xs text-green-500 hidden sm:inline">LIVE</span>
                </div>
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

              <AnimatePresence mode="wait">
                {loading && events.length === 0 ? (
                  /* Loading State */
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[220px] md:min-h-[280px] relative z-0"
                  >
                    <div className="terminal-font text-base md:text-xl mb-4" style={{ color: '#7c3aed' }}>
                      INITIALIZING EVENT STREAM...
                    </div>
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
                  </motion.div>
                ) : error && events.length === 0 ? (
                  /* Error State */
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[220px] text-center relative z-0"
                  >
                    <div className="text-red-500 mb-4">
                      <Terminal size={48} />
                    </div>
                    <div className="terminal-font text-base text-red-400 mb-2">
                      {error}
                    </div>
                    <button
                      onClick={fetchEvents}
                      className="mt-4 px-4 py-2 bg-purple-600 text-white terminal-font text-sm border-2 border-black"
                      style={{ boxShadow: '3px 3px 0 0 #000' }}
                    >
                      RETRY CONNECTION
                    </button>
                  </motion.div>
                ) : hasEvents ? (
                  /* Events List */
                  <motion.div
                    key="events"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 md:space-y-4 relative z-0"
                  >
                    {events.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="border-2 border-purple-500 bg-gray-900 hover:bg-gray-800 transition-colors min-h-[220px]"
                      >
                          <div className="flex flex-row min-h-[220px]">
                            {/* Event Image */}
                            {event.image && event.image !== '' ? (
                              <div className="w-2/5 bg-gray-800 border-r-2 border-purple-500 overflow-hidden flex-shrink-0">
                                <img
                                  src={event.image}
                                  alt={event.title}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-purple-500 terminal-font text-xs">NO IMAGE</div>';
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-2/5 bg-gray-800 border-r-2 border-purple-500 flex-shrink-0 flex items-center justify-center">
                                <ImageIcon size={32} className="text-purple-600" />
                              </div>
                            )}

                            {/* Event Details */}
                            <div className="w-3/5 min-w-0 p-3 md:p-5">
                              <div className="flex items-start gap-2 md:gap-3">
                                <Terminal className="text-purple-500 flex-shrink-0 mt-1" size={18} />
                                <div className="flex-1 min-w-0">
                                  <h3 className="pixel-font text-base md:text-lg mb-1 md:mb-2 break-words" style={{ color: '#7c3aed' }}>
                                    {'> '}{event.title}
                                  </h3>

                                  <div className="flex flex-wrap gap-2 md:gap-4 text-gray-400 terminal-font text-xs md:text-sm">
                                    {event.date && (
                                      <span className="flex items-center gap-1">
                                        <Calendar size={12} className="text-pink-500" />
                                        <span className="text-pink-400">{event.date}</span>
                                      </span>
                                    )}
                                    {event.time && (
                                      <span className="flex items-center gap-1">
                                        <Clock size={12} className="text-cyan-500" />
                                        <span className="text-cyan-400">{event.time}</span>
                                      </span>
                                    )}
                                    {event.location && (
                                      <span className="flex items-center gap-1">
                                        <MapPin size={12} className="text-green-500" />
                                        <span className="text-green-400 truncate">{event.location}</span>
                                      </span>
                                    )}
                                  </div>

                                  {event.description && (
                                    <p className="terminal-font text-xs md:text-sm text-gray-500 mt-2 line-clamp-3">
                                      {event.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  /* No Events - Scanning Message */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[220px] md:min-h-[280px] relative z-0"
                  >
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
                        {'> '}AWAITING_EVENT_TRANSMISSION_
                      </p>

                      <p className="terminal-font text-xs text-gray-600 mt-2">
                        Check back soon for upcoming events!
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Terminal Footer */}
            <div className="flex items-center justify-between px-3 md:px-4 py-1.5 md:py-2 border-t-2 border-purple-500 bg-gray-900">
              <span className="terminal-font text-xs text-gray-500">
                TERMINAL v2.0.25
              </span>
              <div className="flex items-center gap-2 md:gap-4">
                <span className="terminal-font text-xs text-purple-400">
                  EVENTS: {events.length}
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
          </div>        </motion.div>
      </div>
    </section>
  );
};

export default EventsTerminal;
