import { motion } from 'framer-motion';
import { Mail, ArrowRight, Users, Camera, Link2 } from 'lucide-react';
import { SOCIALS, JOIN_LINK, PROJECTS_LINK } from '../data/constants';

/**
 * JoinSection - Neo-Brutalist High-Tech Join Section
 * Clean typography with strict color hierarchy
 */
const JoinSection = ({ darkMode = false }) => {
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
    <section
      className="py-16 md:py-20 px-4 relative overflow-hidden"
      style={{ background: darkMode ? 'linear-gradient(180deg, #0b2f6b 0%, #092550 100%)' : '#f0f0f5' }}
    >
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.15
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="terminal-font text-xs" style={{ color: darkMode ? '#a7b9d6' : '#6b7280' }}>JOIN://</span>
            <h2 className="pixel-font-lg text-3xl md:text-5xl" style={{ color: darkMode ? '#f4f8ff' : '#000' }}>THE_FAMILY</h2>
          </div>
          <div className="terminal-font text-sm" style={{ color: darkMode ? '#cbd9ef' : '#4b5563' }}>
            <span style={{ color: '#db2777' }}>●</span> BECOME_PART_OF_THE_COMMUNITY
            <span className="mx-2" style={{ color: '#06b6d4' }}>|</span>
            LEARN · GROW · BUILD
          </div>
        </motion.div>

        {/* Gallery Grid - Mobile First */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          {/* Mobile: 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-1.5 pb-6" style={{ borderWidth: '0.5px', borderColor: '#000', boxShadow: '4px 4px 0px 0px #000', background: darkMode ? '#132b54' : '#fff' }}>
                  <div className="aspect-square overflow-hidden border" style={{ background: darkMode ? '#12335c' : '#e5e7eb', borderColor: '#000' }}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))">
                            <span class="pixel-font text-2xl" style="color: #7c3aed">ASIA</span>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className="mt-1.5 text-center">
                    <span className="terminal-font text-xs" style={{ color: darkMode ? '#a7b9d6' : '#4b5563' }}>
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Scattered Polaroids */}
          <div className="hidden md:flex flex-wrap justify-center gap-6 md:gap-8">
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
                <div className="p-2 pb-8 border-3 border-black" style={{ boxShadow: '6px 6px 0px 0px #000', background: darkMode ? '#132b54' : '#fff' }}>
                  <div className="w-40 h-40 md:w-48 md:h-48 overflow-hidden border-2 border-black" style={{ background: darkMode ? '#12335c' : '#e5e7eb' }}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))">
                            <span class="pixel-font text-2xl" style="color: #7c3aed">ASIA</span>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="terminal-font text-xs" style={{ color: darkMode ? '#a7b9d6' : '#4b5563' }}>
                      GROUP_PHOTO_#{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Tape effect */}
                <div
                  className="absolute -top-3 left-1/2 w-14 h-5 bg-yellow-300 border-2 border-black"
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
          className="text-center mb-12 md:mb-16"
        >
          <a
            href={JOIN_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <motion.button
              whileHover={{ scale: 1.02, x: 2, y: 2 }}
              whileTap={{ scale: 0.98, x: 5, y: 5 }}
              className="brutal-btn bg-purple-600 text-white px-6 py-4 md:px-10 md:py-5"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
              }}
            >
              <span className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
                {'>'} JOIN_THE_FAMILY
                <ArrowRight size={18} />
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
          className="text-center mb-10 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
            <span className="terminal-font text-xs" style={{ color: darkMode ? '#a7b9d6' : '#6b7280' }}>CONNECT://</span>
            <h3 className="pixel-font text-lg md:text-xl" style={{ color: darkMode ? '#f4f8ff' : '#000' }}>
              WITH_US
            </h3>
          </div>

          {/* Mobile: 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 px-4 md:hidden">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-2 px-3 py-3"
                style={{ borderWidth: '0.5px', borderColor: '#000', boxShadow: '3px 3px 0px 0px #000', background: darkMode ? '#132b54' : '#fff' }}
              >
                <social.icon size={18} style={{ color: '#7c3aed' }} />
                <span className="terminal-font text-sm" style={{ color: darkMode ? '#f4f8ff' : '#000' }}>{social.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Desktop: Flex Row */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
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
                className="flex items-center gap-2 px-4 py-2"
                style={{ borderWidth: '0.5px', borderColor: '#000', boxShadow: '4px 4px 0px 0px #000', background: darkMode ? '#132b54' : '#fff' }}
              >
                <social.icon size={20} style={{ color: '#7c3aed' }} />
                <span className="terminal-font text-sm" style={{ color: darkMode ? '#f4f8ff' : '#000' }}>{social.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-16"
        >
          {/* ASCII Logo Footer - Desktop */}
          <div className="hidden md:block text-center mb-8">
            <pre
              className="font-mono text-base"
              style={{
                color: '#7c3aed',
                textShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
                letterSpacing: '0.1em',
              }}
            >
{`    █████╗  ██████╗ ██████╗ ███████╗
   ██╔══██╗██╔════╝██╔════╝ ██╔════╝
   ███████║██║     ██║     █████╗
   ██╔══██║██║     ██║     ██╔══╝
   ██║  ██║╚██████╗╚██████╗███████╗
   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚══════╝`}
            </pre>
            <p className="terminal-font text-xs mt-4" style={{ color: darkMode ? '#cbd9ef' : '#4b5563' }}>
              Association de Statistique et d'Intelligence Artificielle
            </p>
          </div>

          {/* Mobile simplified footer */}
          <div className="md:hidden text-center">
            <pre
              className="font-mono text-xs"
              style={{
                color: '#7c3aed',
                textShadow: '0 0 8px rgba(124, 58, 237, 0.5)',
              }}
            >
{`█████╗ ██████╗
╚════╝ ╚═════╝`}
            </pre>
            <p className="terminal-font text-xs mt-2" style={{ color: darkMode ? '#cbd9ef' : '#4b5563' }}>
              © {new Date().getFullYear()} ASIA - All Rights Reserved
            </p>
          </div>

          {/* Version Info */}
          <div className="mt-6 md:mt-8 text-center">
            <div className="terminal-font text-xs md:text-sm" style={{ color: darkMode ? '#cbd9ef' : '#4b5563' }}>
              <span style={{ color: '#7c3aed' }}>VERSION:</span> 2.0
              <span className="mx-2 md:mx-4">|</span>
              <span style={{ color: '#06b6d4' }}>BUILD:</span> NEO_BRUTALIST
              <span className="mx-2 md:mx-4 hidden sm:inline">|</span>
              <span className="hidden sm:inline" style={{ color: '#db2777' }}>UI:</span> CYBER_TERMINAL
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;