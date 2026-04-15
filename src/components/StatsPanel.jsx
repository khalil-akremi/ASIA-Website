import { motion } from 'framer-motion';
import { Users, Layers, Target } from 'lucide-react';
import { SPREADSHEET_ROWS, STATS } from '../data/constants';

/**
 * StatsPanel - Neo-Brutalist High-Tech Statistics
 * Clean typography with strict color hierarchy
 */
const StatsPanel = () => {
  const totalMembers = 11 + (SPREADSHEET_ROWS - 1);

  // Stats with color hierarchy: Violet=Action, Cyan=Data, Pink=Alert
  const stats = [
    {
      label: 'MEMBERS',
      value: `${totalMembers}+`,
      icon: Users,
      color: '#7c3aed', // Violet - Action
      type: 'action',
    },
    {
      label: 'POLES',
      value: STATS.poles,
      icon: Layers,
      color: '#06b6d4', // Cyan - Data
      type: 'data',
    },
    {
      label: 'MISSION',
      value: '01',
      icon: Target,
      color: '#db2777', // Pink - Alert
      type: 'alert',
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 dot-grid-bg relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="terminal-font text-xs text-gray-500">STATS://</span>
          <h2 className="pixel-font-lg text-3xl md:text-5xl text-black">METRICS</h2>
        </div>
        <div className="terminal-font text-sm text-gray-600">
          <span style={{ color: '#7c3aed' }}>●</span> REAL_TIME_DATA <span style={{ color: '#06b6d4' }}>|</span> SYNC: <span style={{ color: '#10b981' }}>ONLINE</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, rotate: -3 + index * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.05,
              rotate: index % 2 === 0 ? -2 : 2,
            }}
            className="bg-white p-4 md:p-6 relative overflow-hidden group cursor-pointer"
            style={{
              borderWidth: '0.5px',
              borderColor: '#000',
              boxShadow: '4px 4px 0px 0px #000',
            }}
          >
            {/* Corner Accent */}
            <div
              className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-10 md:w-12 h-10 md:h-12 rotate-45"
              style={{ backgroundColor: stat.color }}
            />

            {/* Type Badge */}
            <div
              className="absolute top-2 right-2 px-2 py-0.5 terminal-font text-xs text-white"
              style={{
                background: stat.color,
                opacity: 0.8,
              }}
            >
              {stat.type.toUpperCase()}
            </div>

            {/* Icon */}
            <div
              className="w-12 md:w-16 h-12 md:h-16 flex items-center justify-center mb-3 md:mb-4"
              style={{
                borderWidth: '0.5px',
                borderColor: '#000',
                backgroundColor: `${stat.color}15`,
                boxShadow: '3px 3px 0px 0px #000',
              }}
            >
              <stat.icon size={24} className="md:hidden" style={{ color: stat.color }} />
              <stat.icon size={32} className="hidden md:block" style={{ color: stat.color }} />
            </div>

            {/* Value */}
            <div
              className="pixel-font-lg text-3xl md:text-5xl mb-1 md:mb-2"
              style={{
                color: stat.color,
                textShadow: `0 0 20px ${stat.color}40`,
              }}
            >
              {stat.value}
            </div>

            {/* Label */}
            <div className="terminal-font text-base md:text-lg text-black tracking-wider">
              {stat.label}
            </div>

            {/* Loading Bar */}
            <div className="mt-3 h-1 bg-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="h-full"
                style={{ background: stat.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 md:mt-16 text-center"
      >
        <div className="terminal-font text-sm text-gray-600">
          <span style={{ color: '#7c3aed' }}>SYS:</span> STATS_LOADED
          <span className="mx-2">|</span>
          <span style={{ color: '#06b6d4' }}>DATA:</span> SYNCED
        </div>
      </motion.div>
    </section>
  );
};

export default StatsPanel;