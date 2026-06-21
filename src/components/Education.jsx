import { motion } from "framer-motion";
import { FiBookOpen, FiCalendar, FiAward, FiStar } from "react-icons/fi";

const educationData = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    major: "Computer Science & Engineering",
    institution: "Chameli Devi Group of Institution",
    duration: "2020 - 2024",
    metricType: "CGPA",
    metricValue: "7.5 / 10",
    description:
      "Built key foundations in Data Structures, Database Systems, Computer Networks, and Software Engineering. Conducted final year project on automated systems.",
  },
  {
    id: 2,
    degree: "Higher Secondary Certificate Examination",
    major: "Science & Mathematics Stream",
    institution: "Ramakrishna Mission Vidyapith",
    duration: "Graduated 2020",
    metricType: "Percentage",
    metricValue: "74.4%",
    description:
      "Focused on Physics, Chemistry, Mathematics, and English. Engaged in cultural events, discipline groups, and sports activities.",
  },
];

export default function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
    <section id="education" className="py-24 px-6 md:px-12 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-light-text dark:text-dark-text tracking-tight">
            My{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted max-w-xl mx-auto">
            A history of my formal studies, specialized technical learning, and
            academic grades.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative pl-6 sm:pl-10 text-left">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {educationData.map((edu) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline node marker */}
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 p-1 rounded-full bg-light-bg dark:bg-dark-bg border-2 border-brand-secondary text-brand-secondary z-10 transition-transform duration-300 group-hover:scale-125">
                  <FiBookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>

                {/* Content Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  {/* Glowing detail card overlay */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-secondary/10 to-transparent blur-xl pointer-events-none" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                        {edu.degree}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-light-muted dark:text-dark-muted font-medium mt-1">
                        <span className="text-brand-secondary dark:text-purple-400 font-bold">
                          {edu.major}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-350">
                          {edu.institution}
                        </span>
                      </div>
                    </div>

                    {/* Date Tag */}
                    <div className="flex items-center gap-1.5 self-start md:self-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-650 dark:text-slate-350">
                      <FiCalendar className="w-3.5 h-3.5 text-brand-secondary" />
                      <span className="text-brand-secondary font-bold">
                        {edu.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted mb-4 leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Performance Metric Score Badge */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-850">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted flex items-center gap-1">
                      <FiAward className="w-3.5 h-3.5 text-amber-500" />
                      Academic Score ({edu.metricType}):
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 text-brand-secondary dark:text-purple-300 text-xs font-extrabold flex items-center gap-1">
                      <FiStar className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {edu.metricValue}
                    </span>
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
