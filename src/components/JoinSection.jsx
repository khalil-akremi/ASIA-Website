import { motion } from 'framer-motion';
import { Mail, ArrowRight, Users, Camera, Link2 } from 'lucide-react';
import { SOCIALS, WETRANSFER_LINK } from '../data/constants';

/**
 * JoinSection - Neo-Brutalist Join Section with ASCII Footer
 * Gallery and socials with hard borders and shadows
 */
const JoinSection = () => {
  const galleryImages = [
    { src: '/gallery/460c2c27-b130-478c-b91a-2c6e2644ce8e.jpg', alt: 'ASIA Group Photo 1', rotation: -3 },
    { src: '/gallery/71be68bb-3961-47d8-8ca3-a207676e24d0.jpg', alt: 'ASIA Group Photo 2', rotation: 4 },
    { src: '/gallery/a0f5063f-abbe-45ea-9079-566296c28e25.jpg', alt: 'ASIA Group Photo 3', rotation: -2 },
    { src: '/gallery/94834f3f-4f4b-411e-8c36-3c624d9ebe23.jpg', alt: 'ASIA Group Photo 4', rotation: 5 },
  ];

  const socialLinks = [
    { name: 'FACEBOOK', icon: Users, url: SOCIALS.facebook },
    { name: 'INSTAGRAM', icon: Camera, url: SOCIALS.instagram },
    { name: 'LINKEDIN', icon: Link2, url: SOCIALS.linkedin },
    { name: 'EMAIL', icon: Mail, url: SOCIALS.email },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: '#f0f0f5' }}>
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="pixel-font-lg text-4xl md:text-5xl text-black mb-2">
            JOIN_THE_FAMILY
          </h2>
          <pre className="ascii-art text-xs mt-4" style={{ color: '#f97316' }}>
{`╔═══════════════════════════════════════════════╗
║   BECOME_PART_OF_THE_COMMUNITY                ║
║   LEARN · GROW · BUILD · CONNECT               ║
╚═══════════════════════════════════════════════╝`}
          </pre>
        </motion.div>

        {/* Gallery Grid - Scattered Polaroids */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: image.rotation }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  zIndex: 100,
                }}
                className="relative"
                style={{
                  transform: `rotate(${image.rotation}deg)`,
                }}
              >
                <div className="bg-white p-2 pb-8 border-3 border-black" style={{ boxShadow: '6px 6px 0px 0px #000' }}>
                  <div className="w-40 h-40 md:w-48 md:h-48 overflow-hidden bg-gray-200 border-2 border-black">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, #7c3aed40, #2563eb40)">
                            <span class="pixel-font text-2xl text-purple-600">ASIA</span>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="terminal-font text-xs text-gray-600">
                      GROUP_PHOTO_#{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Tape effect */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-yellow-300 border-2 border-black"
                  style={{ transform: `translateX(-50%) rotate(${Math.random() * 10 - 5}deg)` }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-16"
        >
          <a
            href={WETRANSFER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <motion.button
              whileHover={{ scale: 1.02, x: 2, y: 2 }}
              whileTap={{ scale: 0.98, x: 5, y: 5 }}
              className="brutal-btn bg-purple-600 text-white px-10 py-5"
            >
              <span className="flex items-center gap-3">
                {'>'} DOWNLOAD_RESOURCES
                <ArrowRight size={20} />
              </span>
            </motion.button>
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="pixel-font text-xl text-black mb-6">
            CONNECT_WITH_US
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white border-3 border-black flex items-center gap-2 px-4 py-2"
                style={{ boxShadow: '4px 4px 0px 0px #000' }}
              >
                <social.icon size={20} className="text-purple-600" />
                <span className="terminal-font text-sm text-black">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ASCII Art Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <pre className="ascii-art text-xs md:text-sm" style={{ color: '#7c3aed' }}>
{`
    ██████╗  █████╗ ███████╗ █████╗ ██████╗  █████╗
   ██╔════╝ ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗
   ██║      ███████║███████╗███████║██████╔╝███████║
   ██║      ██╔══██║╚════██║██╔══██║██╔══██╗██╔══██║
   ╚██████╗ ██║  ██║███████║██║  ██║██║  ██║██║  ██║
    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝

   Association de Statistique et d'Intelligence Artificielle
   ═════════════════════════════════════════════════════

   [CONNECT]  [LEARN]  [COMMUNICATE]  [BUILD]  [LEAD]

   ┌────────────────────────────────────────────────────┐
   │  © ${new Date().getFullYear()} ASIA - All Rights Reserved         │
   │  Built with 💜 by ASIA Tech Team                   │
   └────────────────────────────────────────────────────┘
`}
          </pre>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="terminal-font text-sm text-gray-600">
            <span>VERSION_2.0</span>
            <span className="mx-4">|</span>
            <span>NEO_BRUTALIST_EDITION</span>
            <span className="mx-4">|</span>
            <span>CYBER_TERMINAL_UI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;