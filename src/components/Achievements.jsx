import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FiAward, FiSmartphone, FiTrendingUp, FiCpu } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";

// Animate values when they enter viewport
function Counter({ value, duration = 1.2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      // Find numeric part
      const numberMatches = value.match(/\d+(\.\d+)?/);
      if (!numberMatches) return;
      const target = parseFloat(numberMatches[0]);
      const isFloat = value.includes(".");

      let start = 0;
      const step = target / (duration * 60); // 60fps refresh rate

      const interval = setInterval(() => {
        start += step;
        if (start >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(isFloat ? Math.round(start * 10) / 10 : Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(interval);
    }
  }, [isInView, value, duration]);

  // Extract non-numeric parts for suffix
  const suffix = value.replace(/[\d.]/g, "");

  return (
    <span ref={ref} className="font-mono">
      {count}
      {suffix}
    </span>
  );
}

const achievements = [
  {
    id: 1,
    value: "2+ Years",
    title: "Experience",
    description:
      "Developing production-grade mobile interfaces and financial utilities.",
    icon: FiAward,
    color: "from-blue-500/10 to-indigo-500/10 text-brand-primary",
  },
  {
    id: 2,
    value: "3+ Major",
    title: "Delivered Apps",
    description:
      "Architected and published Wealth Elite, Advisor X, and Sales Ninja CRM.",
    icon: FiSmartphone,
    color: "from-purple-500/10 to-pink-500/10 text-purple-500",
  },
  {
    id: 3,
    value: "250+",
    title: "Apps Deployed",
    description:
      "Delivered 250+ white-label Android and iOS applications with production-ready builds and configurations.",
    icon: FaTrophy,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-500",
  },
  {
    id: 4,
    value: "100%",
    title: "Financial Focus",
    description:
      "Dedicated developer expertise in Wealth AUM tracking and dashboard reports.",
    icon: FiCpu,
    color: "from-cyan-500/10 to-blue-500/10 text-cyan-500",
  },
];

export default function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="achievements"
      className="py-24 bg-light-section dark:bg-dark-section border-y border-slate-100 dark:border-slate-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
            Key Accomplishments
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-light-text dark:text-dark-text tracking-tight">
            Professional{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Milestones
            </span>
          </h2>
          <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted">
            A snapshot of statistical metrics, engineering achievements, and
            user impact indicators.
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {achievements.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-md hover:shadow-lg transition-all duration-300 text-left relative overflow-hidden flex flex-col justify-between"
              >
                {/* Background glow strip */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-80" />

                <div className="space-y-6">
                  {/* Top Row: Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr ${item.color}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Stat Value */}
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-850 dark:text-white tracking-tight">
                      <Counter value={item.value} />
                    </div>
                    <h3 className="text-sm font-heading font-bold text-slate-750 dark:text-slate-200">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
