import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiPhone,
} from "react-icons/fi";

const initialFormData = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message should be at least 10 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError("");

    if (errors[name]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formDataObj = new FormData();

      formDataObj.append(
        "access_key",
        import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      );

      formDataObj.append("name", formData.name.trim());
      formDataObj.append("email", formData.email.trim());
      formDataObj.append(
        "subject",
        formData.subject.trim() || "Portfolio Contact Request",
      );
      formDataObj.append("message", formData.message.trim());

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      
      if (!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
        setSubmitError("Contact form is not configured.");
        setIsSubmitting(false);
        return;
      }

      setErrors({});
      setSubmitSuccess(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(
        error.message || "Something went wrong while sending your message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-light-text dark:text-dark-text tracking-tight">
            Connect{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              With Me
            </span>
          </h2>
          <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted">
            Have an application idea, a job opportunity, or just want to chat
            about React Native optimization? Reach out below!
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Cards Side: Quick Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <h3 className="text-xl font-heading font-extrabold text-slate-800 dark:text-slate-100">
              Let's Discuss Your Project
            </h3>
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
              I am open to contract roles, remote work partnerships, and
              full-time mobile development positions. Let's make something
              amazing.
            </p>

            <div className="space-y-4 pt-4">
              {/* Phone Card */}
              <a
                href="tel:+918770155914"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-150 dark:border-slate-850 bg-white dark:bg-slate-900 shadow-sm hover:border-brand-primary hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">
                  <FiPhone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-light-muted dark:text-dark-muted tracking-wider">
                    Phone
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-750 dark:text-slate-200 truncate">
                    +91-8770155914
                  </p>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:hariomsisodiya503@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-150 dark:border-slate-850 bg-white dark:bg-slate-900 shadow-sm hover:border-brand-primary hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-brand-primary flex items-center justify-center flex-shrink-0">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-light-muted dark:text-dark-muted tracking-wider">
                    Email
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-750 dark:text-slate-200 truncate">
                    hariomsisodiya503@gmail.com
                  </p>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/in/hariom-sisodiya19"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-150 dark:border-slate-850 bg-white dark:bg-slate-900 shadow-sm hover:border-brand-primary hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <FiLinkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-light-muted dark:text-dark-muted tracking-wider">
                    LinkedIn
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-750 dark:text-slate-200 truncate">
                    linkedin.com/in/hariom-sisodiya19
                  </p>
                </div>
              </a>

              {/* Github Card */}
              <a
                href="https://github.com/HariomSisodiya"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-150 dark:border-slate-850 bg-white dark:bg-slate-900 shadow-sm hover:border-brand-primary hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-950/15 dark:bg-white/10 text-slate-800 dark:text-slate-200 flex items-center justify-center flex-shrink-0">
                  <FiGithub className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-light-muted dark:text-dark-muted tracking-wider">
                    GitHub
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-750 dark:text-slate-200 truncate">
                    github.com/hariom-sisodiya
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Cards Side: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 w-full"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-150 shadow-md glass-effect dark:bg-slate-900/60 dark:border-slate-800 text-left relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  // Success State Visual
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                  >
                    <FiCheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
                    <h3 className="text-2xl font-heading font-extrabold text-slate-800 dark:text-white">
                      Message Dispatched!
                    </h3>
                    <p className="text-sm text-light-muted dark:text-dark-muted max-w-sm">
                      Thank you for reaching out, Hariom. Your message has been
                      sent successfully. I will get back to you shortly!
                    </p>
                  </motion.div>
                ) : (
                  // Normal Form Display
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-650 dark:text-slate-350 uppercase tracking-wider">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/45 transition-colors ${
                            errors.name
                              ? "border-red-500 focus:ring-red-500/40"
                              : ""
                          }`}
                        />
                        {errors.name && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-red-500">
                            <FiAlertCircle />
                            <span>{errors.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-650 dark:text-slate-350 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/45 transition-colors ${
                            errors.email
                              ? "border-red-500 focus:ring-red-500/40"
                              : ""
                          }`}
                        />
                        {errors.email && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-red-500">
                            <FiAlertCircle />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subject Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-650 dark:text-slate-350 uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Inquiry topic"
                        className="w-full px-4 py-2.5 rounded-lg border text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/45 transition-colors"
                      />
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-650 dark:text-slate-350 uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your project details or request here..."
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/45 transition-colors resize-none ${
                          errors.message
                            ? "border-red-500 focus:ring-red-500/40"
                            : ""
                        }`}
                      />
                      {errors.message && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-red-500">
                          <FiAlertCircle />
                          <span>{errors.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-premium flex justify-center items-center gap-2 py-3 rounded-lg text-sm font-semibold bg-brand-primary text-white shadow-lg hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        <>
                          <FiSend className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    {submitError && (
                      <div className="flex items-start gap-2 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-xs font-semibold text-red-600 dark:text-red-300">
                        <FiAlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
