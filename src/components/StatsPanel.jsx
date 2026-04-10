import { motion } from 'framer-motion';
import { Users, Layers, Target } from 'lucide-react';
import { SPREADSHEET_ROWS, STATS } from '../data/constants';

/**
 * StatsPanel - Neo-Brutalist statistics panel
 * Hard borders, solid shadows, raw aesthetic
 */
const StatsPanel = () => {
  const totalMembers = 11 + (SPREADSHEET_ROWS - 1);

  const stats = [
    {
      label: 'MEMBERS',
      value: `${totalMembers}+`,
      icon: Users,
      color: '#7c3aed',
    },
    {
      label: 'POLES',
      value: STATS.poles,
      icon: Layers,
      color: '#10b981',
    },
    {
      label: 'MISSION',
      value: '01',
      icon: Target,
      color: '#2563eb',
    },
  ];

  return (
    <section className="py-20 px-4 dot-grid-bg relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="pixel-font-lg text-4xl md:text-5xl text-black mb-2">
          BY_THE_NUMBERS
        </h2>
        <div className="w-32 h-1 bg-purple-600 border-2 border-black mx-auto" />
      </motion.div>

      {/* Stats Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, rotate: -3 + index * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            whileHover={{
              scale: 1.05,
              rotate: index % 2 === 0 ? -2 : 2,
            }}
            className="bg-white p-6 brutal-border relative overflow-hidden group cursor-pointer"
          >
            {/* Corner Accent */}
            <div
              className="absolute -top-6 -right-6 w-12 h-12 rotate-45"
              style={{ backgroundColor: stat.color }}
            />

            {/* Icon */}
            <div
              className="w-16 h-16 flex items-center justify-center mb-4 border-3 border-black"
              style={{
                backgroundColor: `${stat.color}20`,
                boxShadow: '4px 4px 0px 0px #000',
              }}
            >
              <stat.icon size={32} style={{ color: stat.color }} />
            </div>

            {/* Value */}
            <div
              className="pixel-font-lg text-5xl mb-2"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>

            {/* Label */}
            <div className="terminal-font text-lg text-black tracking-wider">
              {stat.label}
            </div>

            {/* Decorative Lines */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black" />
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-black" />
          </motion.div>
        ))}
      </div>

      {/* Bottom ASCII Divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <pre className="ascii-art text-xs" style={{ color: '#7c3aed' }}>
{`╔══════════════════════════════════════════════════════════════╗
║                         ▓▓▓▓▓▓▓▓▓▓▓▓                        ║
╚══════════════════════════════════════════════════════════════╝`}
        </pre>
      </motion.div>
    </section>
  );
};

export default StatsPanel;