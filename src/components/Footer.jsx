import { animateScroll as scroll } from "react-scroll";
import {
  FiArrowUp,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhoneCall,
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    scroll.scrollToTop({ duration: 500, smooth: true });
  };

  return (
    <footer className="w-full bg-light-bg dark:bg-dark-bg border-t border-slate-200 dark:border-slate-900 transition-colors py-12 px-6 md:px-12 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Side: Brand & Copyright */}
        <div className="text-center sm:text-left space-y-1">
          <p className="font-heading font-extrabold text-sm text-slate-800 dark:text-slate-200">
            Hariom Sisodiya
          </p>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            &copy; {currentYear} Personal Portfolio. All rights reserved.
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4 order-last sm:order-none">
          <a
            href="https://github.com/HariomSisodiya"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full border border-slate-100 hover:border-brand-primary dark:border-slate-850 dark:hover:border-brand-primary hover:text-brand-primary dark:hover:text-brand-primary transition-colors text-light-muted dark:text-dark-muted"
            aria-label="GitHub"
          >
            <FiGithub className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/hariom-sisodiya"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full border border-slate-100 hover:border-brand-primary dark:border-slate-850 dark:hover:border-brand-primary hover:text-brand-primary dark:hover:text-brand-primary transition-colors text-light-muted dark:text-dark-muted"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:hariom.sisodiya.dev@gmail.com"
            className="p-2 rounded-full border border-slate-100 hover:border-brand-primary dark:border-slate-850 dark:hover:border-brand-primary hover:text-brand-primary dark:hover:text-brand-primary transition-colors text-light-muted dark:text-dark-muted"
            aria-label="Email"
          >
            <FiMail className="w-4 h-4" />
          </a>
          <a
            href="tel:+918770155914"
            aria-label="Phone"
            className="p-2 rounded-full border border-slate-100 hover:border-brand-primary dark:border-slate-850 dark:hover:border-brand-primary hover:text-brand-primary dark:hover:text-brand-primary transition-colors text-light-muted dark:text-dark-muted"
            aria-label="Phone"
          >
            <FiPhoneCall className="w-4 h-4" />
          </a>
        </div>

        {/* Right Side: Back to Top Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="btn-premium group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-350 transition-all duration-300"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <FiArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
