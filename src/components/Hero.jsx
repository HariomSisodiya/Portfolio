import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
  FiPhoneCall,
} from "react-icons/fi";
import personalImg from "../assets/personalImg.png";

const roles = [
  "React Native Developer",
  "Mobile Frontend Engineer",
  "Cross-Platform Developer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullText = roles[roleIndex];

    const tick = () => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        if (displayedText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
        } else {
          timer = setTimeout(tick, 95);
        }
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
          timer = setTimeout(tick, 45);
        }
      }
    };

    timer = setTimeout(tick, isDeleting ? 45 : 95);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-20 h-72 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.11),transparent_65%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="max-w-4xl mx-auto w-full text-center relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="availability-pulse inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          Available for Opportunities
        </motion.div>

        <div className="relative mt-8 mb-8 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
          <div className="absolute -inset-5 rounded-full bg-cyan-400/15 dark:bg-cyan-300/10 blur-3xl" />
          <div className="profile-ring absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary p-[3px] shadow-2xl shadow-blue-500/20">
            <div className="w-full h-full rounded-full bg-white dark:bg-dark-bg" />
          </div>
          <div className="absolute inset-3 rounded-full overflow-hidden border border-white/80 dark:border-white/10 bg-light-section dark:bg-dark-section shadow-2xl">
            <img
              src={personalImg}
              alt="Hariom Sisodiya"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-light-text dark:text-dark-text leading-tight">
            Hariom Sisodiya
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-brand-primary">
            React Native Developer
          </p>
          <div className="h-9 flex items-center justify-center">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 dark:text-slate-200">
              <span className="border-r-2 border-brand-accent pr-1 text-brand-secondary dark:text-brand-accent">
                {displayedText}
              </span>
            </h2>
          </div>
        </div>

        <p className="mt-5 text-base sm:text-lg text-light-muted dark:text-dark-muted max-w-2xl leading-relaxed">
          I build polished, scalable mobile applications with React Native,
          Redux, API integrations, and performance-focused interfaces that feel
          dependable in production.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-8 w-full sm:w-auto">
          <Link
            to="projects"
            smooth={true}
            offset={-80}
            duration={500}
            className="btn-premium cursor-pointer flex justify-center items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-brand-primary hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all duration-300"
          >
            <span>View Projects</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="/resume.pdf"
            download="Hariom_Sisodiya_Resume.pdf"
            className="flex justify-center items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-light-text dark:text-dark-text transition-colors duration-300"
          >
            <FiDownload className="w-4 h-4" />
            <span>Download Resume</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 pt-8">
          {[
            {
              href: "https://github.com/HariomSisodiya",
              label: "GitHub",
              icon: FiGithub,
            },
            {
              href: "https://www.linkedin.com/in/hariom-sisodiya19",
              label: "LinkedIn",
              icon: FiLinkedin,
            },
            {
              href: "mailto:hariomsisodiya503@gmail.com",
              label: "Email",
              icon: FiMail,
            },
            {
              href: "tel:+918770155914",
              label: "Phone",
              icon: FiPhoneCall,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={item.label}
                className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:text-brand-primary hover:border-brand-primary hover:-translate-y-0.5 transition-all duration-300 text-light-muted dark:text-dark-muted"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
