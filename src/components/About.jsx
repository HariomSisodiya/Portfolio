import { motion } from "framer-motion";
import { FiSmartphone, FiAward, FiCheck } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { FaMedal  } from "react-icons/fa";

const stats = [
  {
    id: 1,
    value: "2+ Years",
    label: "Professional Experience",
    description: "Developing production-grade mobile platforms.",
    icon: FiSmartphone,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    id: 2,
    value: "3+ Major Projects",
    label: "Delivered & Shipped",
    description:
      "High-performance systems: Wealth Elite, Advisor X, Sales Ninja CRM.",
    icon: FiAward,
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    id: 3,
    value: "250+",
    label: "White Label Apps Deployed",
    description:
      "Successfully deployed and maintained 250+ white-label applications across Android and iOS platforms.",
    icon: FaMedal ,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    id: 4,
    value: "Financial Domain",
    label: "Domain Expertise",
    description: "Active work on Wealth Elite and Advisor X platforms.",
    icon: FaGraduationCap,
    color: "text-cyan-500 bg-cyan-500/10",
  },
];

const expertiseList = [
  "React Native",
  "React.js",
  "Redux",
  "Context API",
  "JavaScript",
  "TypeScript",
  "Mobile Application Development",
  "Performance Optimization",
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="py-24 bg-light-section dark:bg-dark-section border-y border-slate-100 dark:border-slate-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Text Detail */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                About Me
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-light-text dark:text-dark-text tracking-tight">
                Building User-Centric <br />
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  Mobile Architectures
                </span>
              </h2>
            </div>

            <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed">
              React Native Developer with 2+ years of experience building
              high-performance mobile applications. Experienced in
              developing scalable applications, improving performance, building
              reusable components, and working in Agile Scrum environments.
            </p>

            {/* Core Expertise bullets with Checkmarks */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Key Technical Expertise
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {expertiseList.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-350"
                  >
                    <span className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                      <FiCheck className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Cards Statistics Side */}
          <div className="lg:col-span-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-6"
            >
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-md flex items-center gap-6 text-left relative overflow-hidden group"
                  >
                    {/* Glowing effect inside dark cards */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Stats Icon */}
                    <div
                      className={`p-4 rounded-xl flex-shrink-0 ${stat.color} transition-colors`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Stats Texts */}
                    <div className="space-y-1 relative z-10">
                      <span className="text-2xl sm:text-3xl font-heading font-extrabold text-light-text dark:text-dark-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                      <h4 className="text-sm font-heading font-bold text-slate-750 dark:text-slate-200">
                        {stat.label}
                      </h4>
                      <p className="text-xs text-light-muted dark:text-dark-muted leading-normal">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
