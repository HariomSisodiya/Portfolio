import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from 'react-icons/fi';
import resumePdf from "../assets/resume.pdf";

const navItems = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Experience', target: 'experience' },
  { label: 'Education', target: 'education' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', target: 'contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const magneticRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMagneticMove = (e) => {
    const { clientX, clientY } = e;
    if (!magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Attract state within 70px bounds
    if (Math.abs(distanceX) < 70 && Math.abs(distanceY) < 70) {
      setMagneticPos({ x: distanceX * 0.35, y: distanceY * 0.35 });
    } else {
      setMagneticPos({ x: 0, y: 0 });
    }
  };

  const handleMagneticLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-navbar py-3 shadow-md'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="cursor-pointer font-heading font-bold text-xl tracking-tight flex items-center gap-2"
        >
          <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            Hariom Sisodiya
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.target}>
                <Link
                  to={item.target}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  activeClass="text-brand-primary dark:text-brand-primary font-semibold"
                  className="cursor-pointer text-sm font-medium hover:text-brand-primary dark:hover:text-brand-primary text-light-muted dark:text-dark-muted transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <FiSun className="w-4 h-4 text-amber-400" /> : <FiMoon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Resume Button with Magnetic Effect */}
            <motion.a
              ref={magneticRef}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              animate={{ x: magneticPos.x, y: magneticPos.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
              href={resumePdf}
              download="Hariom_Sisodiya_Resume.pdf"
              className="btn-premium flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-primary hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-colors cursor-pointer"
            >
              <FiDownload className="w-3.5 h-3.5" />
              <span>Resume</span>
            </motion.a>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-350 cursor-pointer"
          >
            {theme === 'dark' ? <FiSun className="w-4 h-4 text-amber-400" /> : <FiMoon className="w-4 h-4 text-indigo-600" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-lg text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-navbar border-t border-slate-200 dark:border-slate-900 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.target}>
                    <Link
                      to={item.target}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      activeClass="text-brand-primary dark:text-brand-primary font-semibold"
                      className="cursor-pointer text-base font-medium text-light-muted dark:text-dark-muted block hover:text-brand-primary transition-colors py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />

              <a
                href={resumePdf}
                download="Hariom_Sisodiya_Resume.pdf"
                className="w-full flex justify-center items-center gap-2 py-3 rounded-lg text-sm font-semibold bg-brand-primary text-white shadow-md cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <FiDownload className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
