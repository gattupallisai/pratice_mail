"use client";

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

// --- Main Component ---
function ComingSoon() {
  const lines: string[] = [
    "🚀 Exciting things are on the way!",
    "Our new experience will launch soon.",
    "Stay tuned and check back shortly.",
  ];

  return (
    <main
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200"
      aria-label="Coming Soon Page"
    >
      <AnimatePresence>
        <motion.section
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          className="flex flex-col items-center w-full max-w-lg p-8 bg-white shadow-2xl rounded-2xl"
          aria-labelledby="coming-soon-title"
        >
          <motion.h1
            id="coming-soon-title"
            className="mb-6 text-4xl font-extrabold tracking-tight text-indigo-700"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          >
            Coming Soon
          </motion.h1>
          <div className="space-y-3 text-center">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                className="text-lg text-gray-700"
                variants={textVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween" }}
                aria-live={i === 0 ? "polite" : undefined}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            aria-hidden="true"
          >
            <svg
              className="w-16 h-16 text-indigo-400 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 48 48"
            >
              <circle cx="24" cy="24" r="20" stroke="currentColor" />
              <path
                d="M24 16v8l6 3"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}

export default React.memo(ComingSoon);