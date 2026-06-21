import { motion } from "framer-motion";
import { experienceData } from "../data/experience";
import {
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="experience"
      className="py-24 bg-light-section dark:bg-dark-section border-y border-slate-100 dark:border-slate-900 transition-colors"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
            Career Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-light-text dark:text-dark-text tracking-tight">
            Work{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted max-w-xl mx-auto">
            A walkthrough of my professional journey, key impact areas, and
            software contributions in mobile engineering.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative pl-6 sm:pl-10">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800">
            {/* Glowing scroll-reactive gradient indicator */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent rounded-full" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {experienceData.map((exp) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative group text-left"
              >
                {/* Timeline node marker */}
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 p-1 rounded-full bg-light-bg dark:bg-dark-bg border-2 border-brand-primary text-brand-primary z-10 transition-transform duration-300 group-hover:scale-125">
                  <FiBriefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>

                {/* Timeline Content Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  {/* Glowing card border corner detail */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-primary/10 to-transparent blur-xl pointer-events-none" />

                  {/* Header info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-light-muted dark:text-dark-muted font-medium mt-1">
                        <span className="text-brand-primary dark:text-blue-400 font-bold">
                          {exp.company}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span className="flex items-center gap-1">
                          <FiMapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Date Tag */}
                    <div className="flex items-center gap-1.5 self-start md:self-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-650 dark:text-slate-350">
                      <FiCalendar className="w-3.5 h-3.5 text-brand-primary" />
                      <span className="text-brand-primary font-bold">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Role Brief Intro */}
                  <p className="text-xs sm:text-sm italic text-light-muted dark:text-dark-muted mb-4">
                    {exp.description}
                  </p>

                  {/* Key Responsibilities */}
                  <ul className="space-y-2.5 mb-6">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-750 dark:text-slate-300 leading-relaxed"
                      >
                        <FiCheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-850">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mr-1">
                      Stack Used:
                    </span>
                    {exp.tech.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 text-brand-primary dark:text-blue-300 text-[10px] sm:text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
