import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projects";
import {
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
  FiSmartphone,
} from "react-icons/fi";

// const getProjectUrl = (project) => {
//   const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
//   const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
//   const isAndroid = /android/i.test(userAgent);

//   if (isIOS && project.appStoreUrl) return project.appStoreUrl;
//   if (isAndroid && project.playStoreUrl) return project.playStoreUrl;
//   return project.webUrl || project.playStoreUrl || project.appStoreUrl || '#';
// };
const getProjectUrl = (project) => {
  const userAgent =
    navigator.userAgent || navigator.vendor || window.opera || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIOS && project.appStoreUrl) return project.appStoreUrl;
  return project.playStoreUrl || project.appStoreUrl || project.webUrl || null;
};

function ProjectCard({ project, isExpanded, onToggle }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: x * 4, y: y * -4 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleViewApplication = () => {
    window.open(getProjectUrl(project), "_blank", "noopener,noreferrer");
  };

  const projectUrl = getProjectUrl(project);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.y, rotateY: tilt.x, y: tilt.x !== 0 ? -4 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="group rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-300 flex flex-col justify-between overflow-hidden text-left relative"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex flex-col" style={{ transform: "translateZ(10px)" }}>
        <div className="h-48 sm:h-56 overflow-hidden relative border-b border-slate-100 dark:border-slate-800 bg-slate-950">
          <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-950/85 text-[10px] font-bold uppercase tracking-wider text-brand-primary shadow-sm">
            <FiSmartphone className="w-3.5 h-3.5" />
            Mobile App
          </div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-primary">
              {project.subtitle}
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mt-1">
              {project.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed">
            {project.description}
          </p>

          <div className="border-t border-b border-slate-100 dark:border-slate-800 py-3">
            <button
              onClick={onToggle}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-primary transition-colors cursor-pointer"
            >
              <span>Core Features</span>
              {isExpanded ? (
                <FiChevronUp className="w-4 h-4 text-brand-primary" />
              ) : (
                <FiChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-hidden"
                >
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div
        className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8 z-20"
        style={{ transform: "translateZ(15px)" }}
      >
        <button
          type="button"
          onClick={handleViewApplication}
          className="w-full btn-premium flex justify-center items-center gap-2 py-3 rounded-lg bg-brand-primary hover:bg-blue-700 text-sm font-semibold text-white shadow-md shadow-blue-500/15 transition-colors cursor-pointer"
        >
          <FiExternalLink className="w-4 h-4" />
          <span> {projectUrl ? "View Application" : "No live link"}</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const toggleFeatures = (id) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-light-text dark:text-dark-text tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted">
            A focused selection of mobile applications and business platforms
            built with production quality, clean UX, and practical performance
            in mind.
          </p>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard
                project={project}
                isExpanded={expandedProjectId === project.id}
                onToggle={() => toggleFeatures(project.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
