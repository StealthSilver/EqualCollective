"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/BorderBeam";
import jeffImage from "@/assets/Equal Collective/jeff.png";
import pennyImage from "@/assets/Equal Collective/Penny.png";

export const Services = () => {
  return (
    <section
      id="services"
      className="relative w-full px-3 sm:px-4 md:px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-24 bg-white/70 dark:bg-black/70 backdrop-blur-md overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-0">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <div className="text-center">
            <div className="inline-block relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                AI Employees
              </h2>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mt-3 sm:mt-4 md:mt-6 px-2">
            Hire AI employees at a fraction of the cost of humans—delivering 10x
            efficiency to scale your Amazon business effortlessly.
          </p>
        </motion.div>

        {/* Jeff and Penny Cards - Single Row */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-16 lg:mt-20 mb-10 sm:mb-14 md:mb-20 lg:mb-28 max-w-4xl w-full px-2 sm:px-0">
            {/* Jeff Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Subtle Animated Border */}
              <div className="absolute inset-0 rounded-2xl border border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors duration-300"></div>

              {/* Card Content */}
              <div className="relative rounded-2xl p-4 sm:p-5 md:p-6 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full">
                {/* Image */}
                <div className="w-full h-56 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-3 sm:mb-4 md:mb-5 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <Image
                    src={jeffImage}
                    alt="Jeff"
                    className="w-auto h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Name and Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  Jeff
                </h3>
                <p className="text-xs sm:text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  Sales Agent
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-3">
                  {["For Agencies", "For SaaS", "For Coaches"].map((badge) => (
                    <span
                      key={badge}
                      className="inline-block px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow mb-3">
                  Jeff Sends 3x more emails, books 5x more meetings and costs
                  0.5x than your average sales representative, on autopilot!
                </p>

                {/* Learn More Button */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="w-full px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-blue-900 dark:text-blue-100 bg-blue-200/30 dark:bg-blue-900/20 hover:bg-blue-200/50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300"
                >
                  Learn More
                </motion.button>
              </div>
              <BorderBeam
                size={300}
                duration={12}
                colorFrom="#3b82f6"
                colorTo="#60a5fa"
                borderWidth={1.5}
                reverse={false}
                initialOffset={0}
                delay={0}
              />
            </motion.div>

            {/* Penny Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Subtle Animated Border */}
              <div className="absolute inset-0 rounded-2xl border border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors duration-300"></div>

              {/* Card Content */}
              <div className="relative rounded-2xl p-4 sm:p-5 md:p-6 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full">
                {/* Image */}
                <div className="w-full h-56 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-3 sm:mb-4 md:mb-5 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <Image
                    src={pennyImage}
                    alt="Penny"
                    className="w-auto h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Name and Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  Penny
                </h3>
                <p className="text-xs sm:text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  Seller Growth Agent
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-3">
                  {["For Agencies", "For Brands"].map((badge) => (
                    <span
                      key={badge}
                      className="inline-block px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow mb-3">
                  Penny understands your business goals, connects to all your
                  data sources, monitors revenue opportunities 24/7 and
                  dynamically optimizes strategies across all your channels to
                  maximize sustainable growth.
                </p>

                {/* Learn More Button */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="w-full px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-blue-900 dark:text-blue-100 bg-blue-200/30 dark:bg-blue-900/20 hover:bg-blue-200/50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300"
                >
                  Learn More
                </motion.button>
              </div>
              <BorderBeam
                size={300}
                duration={12}
                colorFrom="#3b82f6"
                colorTo="#60a5fa"
                borderWidth={1.5}
                reverse={true}
                initialOffset={0}
                delay={0}
              />
            </motion.div>
          </div>
        </div>

        {/* Why Teams Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 sm:mt-20 lg:mt-28"
        >
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="inline-block relative">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Why Teams Choose Us
              </h3>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-3 sm:mt-4 md:mt-6 px-2">
              Join hundreds of companies scaling with AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
            {[
              {
                title: "10x Efficiency",
                description:
                  "Automate repetitive tasks and scale operations without growing your team",
              },
              {
                title: "Cost Effective",
                description:
                  "Pay a fraction of traditional employee costs with zero overhead",
              },
              {
                title: "24/7 Operations",
                description:
                  "Your AI team works around the clock, never sleeps or takes time off",
              },
              {
                title: "Proven Results",
                description:
                  "Jeff books 5x more meetings, Penny optimizes revenue in real-time",
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-gray-50/50 dark:from-slate-900/50 to-gray-100/50 dark:to-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-blue-400 dark:hover:border-blue-600/50 transition-all duration-300"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon background */}
                  <div className="mb-3 inline-flex p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-gray-300 dark:border-gray-600 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 text-blue-600 dark:text-blue-400">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {benefit.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {benefit.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs sm:text-sm font-semibold">
                      Learn more
                    </span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
