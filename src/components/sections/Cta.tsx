"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShimmerButton } from "../ui/ShimmerButton";
import { BorderBeam } from "../ui/BorderBeam";

export const Cta = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: "",
    message: "",
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          useCase: "",
          message: "",
        });
        setPrivacyAccepted(false);

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        setSubmitStatus("error");
        console.error("Error sending email:", data.error);

        // Reset error message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="footer"
      className="relative w-full px-4 sm:px-6 py-16 sm:py-24 lg:py-32 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          {/* Animated Glow Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[300px] sm:w-[400px] lg:w-[600px] h-[140px] sm:h-[180px] lg:h-[240px] bg-gradient-to-r from-blue-500/15 via-blue-400/20 to-blue-500/15 dark:from-blue-500/25 dark:via-blue-400/35 dark:to-blue-500/25 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="relative z-10 py-8 sm:py-10 lg:py-16">
            <h2 className="font-ibm-plex-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 lg:mb-10 tracking-tight text-gray-900 dark:text-gray-100">
              Ready to Scale with
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400 bg-clip-text text-transparent inline-block animate-gradient pb-1">
                AI Employees?
              </span>
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto font-sans leading-relaxed px-2 mb-8 sm:mb-10 lg:mb-12">
              Join Amazon sellers, agencies, and SaaS companies transforming
              their operations with our AI team. Start automating critical tasks
              and scale without headcount.
            </p>

            {/* Connect Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <ShimmerButton
                onClick={() => {
                  window.open(
                    "https://cal.com/aryan-sethi-zafoth/30min",
                    "_blank"
                  );
                }}
                className="font-sans px-6 py-2.5 sm:px-7 sm:py-3 text-sm font-bold text-white"
                background="#3B82F6"
                shimmerColor="#ffffff"
              >
                CONNECT NOW
              </ShimmerButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
