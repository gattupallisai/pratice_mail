

"use client";

import { useEffect, useState } from 'react';
import { FiMail, FiShield, FiZap, FiGlobe, FiLock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const BENEFITS = [
  "Military-Grade Encryption",
  "Lightning Fast Delivery",
  "Global Server Network",
  "Zero-Knowledge Privacy",
  "AI-Powered Organization"
];

const iconComponents = [FiShield, FiZap, FiGlobe, FiLock, FiMail];

export default function LoadingAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const benefitInterval = setInterval(() => {
      setCurrentBenefit(prev => (prev + 1) % BENEFITS.length);
    }, 1500);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearInterval(benefitInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible || !isClient) return null;

  const CurrentIcon = iconComponents[currentBenefit];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900">
      {/* Floating particles background */}
      {dimensions.width > 0 && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            opacity: [0, 0.3, 0],
            transition: {
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="absolute rounded-full bg-white/20"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5
          }}
        />
      ))}

      {/* Main centered container */}
      <div className="relative flex flex-col items-center justify-center w-full h-full pt-32">
        {/* Animated gradient rings */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-64 h-64 border-2 border-blue-400 rounded-full"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.8, opacity: 0.1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          className="absolute border-2 border-indigo-400 rounded-full w-80 h-80"
        />

        {/* Logo and content container */}
        <motion.div 
          className="flex flex-col items-center justify-center"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 10 }}
        >
          {/* CQ Logo with enhanced animation */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotate: 0,
              transition: { type: "spring", stiffness: 100 }
            }}
            className="relative"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0px rgba(255,255,255,0.1)",
                  "0 0 20px 10px rgba(99, 102, 241, 0.3)",
                  "0 0 0 0px rgba(255,255,255,0.1)"
                ]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 3, repeat: Infinity }
              }}
              className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600"
            ></motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center w-40 h-40 rounded-full shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-600 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg"
              >
                <motion.span 
                  className="text-3xl font-bold text-blue-600"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  CQ
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Animated Text with more motion */}
          <div className="mt-12 text-center">
            <motion.h1 
              initial={{ y: 40, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.3
              }}
              className="mb-4 text-5xl font-bold text-transparent bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                CamelQ Mail
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.5
              }}
              className="mb-8 text-xl text-blue-200"
            >
              The next generation of secure business communication
            </motion.p>
          </div>

          {/* Enhanced rotating benefits */}
          <div className="h-20 mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBenefit}
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.9 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  duration: 0.5 
                }}
                className="flex flex-col items-center justify-center gap-2"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1.1, 1]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <CurrentIcon className="w-8 h-8 text-blue-300" />
                </motion.div>
                <span className="text-2xl font-medium text-blue-100">
                  {BENEFITS[currentBenefit]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced loading dots */}
          <motion.div 
            className="flex justify-center mt-10 space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                  backgroundColor: [
                    "rgba(255,255,255,0.6)",
                    "rgba(99,102,241,1)",
                    "rgba(255,255,255,0.6)"
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-4 h-4 bg-white rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Animated tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.7 }}
          transition={{ 
            delay: 2,
            type: "spring",
            stiffness: 50
          }}
          className="absolute text-sm bottom-8 text-blue-300/70"
        >
          {/* <motion.span
            animate={{
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 5px rgba(255,255,255,0.3)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          >
            "Where security meets velocity in business communication"
          </motion.span> */}
        </motion.p>
      </div>
    </div>
  );
}