import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';

// Import icons safely
import { TbBrandReactNative } from 'react-icons/tb';
import {
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiBootstrap,
  SiAndroidstudio,
  SiXcode,
  SiJira,
  SiPostman,
  SiClaude,
  SiOpenai,
  SiGoogle,
  SiGooglechrome,
  SiFirebase,
  SiJsonwebtokens,
  SiGoogleplay
} from 'react-icons/si';
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaApple,
  FaUsers,
  FaCode
} from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { FiTrendingUp, FiCpu, FiWind, FiShield } from 'react-icons/fi';

const iconMap = {
  TbBrandReactNative,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiBootstrap,
  SiAndroidstudio,
  SiXcode,
  SiJira,
  SiPostman,
  SiClaude,
  SiOpenai,
  SiGoogle,
  SiGooglechrome,
  SiFirebase,
  SiJsonwebtokens,
  SiGoogleplay,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaApple,
  FaUsers,
  FaCode,
  VscVscode,
  FiTrendingUp,
  FiCpu,
  FiWind,
  FiShield
};

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const progressVariants = {
    hidden: { width: '0%' },
    visible: (level) => ({
      width: `${level}%`,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.2 }
    })
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-light-text dark:text-dark-text tracking-tight">
            My Technical{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              Capabilities
            </span>
          </h2>
          <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted">
            A practical view of the languages, frameworks, tooling, testing, monitoring, authentication, and deployment workflows I use to ship production mobile apps.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillsData.map((categoryGroup, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-brand-primary/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: categoryGroup.accent || '#2563EB' }}
              />
              <div className="space-y-6">
                {/* Category Title */}
                <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100 text-left border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                  <span>{categoryGroup.category}</span>
                  <span
                    className="px-2 py-1 rounded-md text-[10px] font-bold text-white"
                    style={{ backgroundColor: categoryGroup.accent || '#2563EB' }}
                  >
                    {categoryGroup.skills.length}
                  </span>
                </h3>

                {/* Skill List */}
                <div className="space-y-4">
                  {categoryGroup.skills.map((skill, sIdx) => {
                    const IconComponent = iconMap[skill.iconName] || FaCode;
                    return (
                      <div key={sIdx} className="space-y-2 rounded-lg p-3 -mx-3 hover:bg-slate-50 dark:hover:bg-slate-950/60 transition-colors">
                        {/* Name, Icon, Percent */}
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 min-w-0">
                            <span
                              style={{
                                color: skill.color,
                                backgroundColor: `${skill.color}18`
                              }}
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            >
                              <IconComponent className="w-4 h-4" />
                            </span>
                            <span className="truncate">{skill.name}</span>
                          </div>
                          <span className="ml-3 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-brand-primary dark:text-blue-300 font-mono text-[10px]">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Bar Track */}
                        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <motion.div
                            variants={progressVariants}
                            custom={skill.level}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            style={{ backgroundColor: skill.color || '#2563EB' }}
                            className="h-full rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
