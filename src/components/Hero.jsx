

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white font-sans overflow-hidden">
      
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-20 space-y-8 py-16 md:py-0"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-wide bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Yash's Blog Editor
        </h1>
        <p className="text-gray-300 text-base sm:text-lg max-w-md leading-relaxed">
          Unlock the power of intuitive editing and secure access. Your stories deserve a premium platform.
        </p>

        <Link to={"/register"}>  

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="self-start bg-pink-600 hover:bg-pink-700 px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg transition-colors"
        >
          Start Your Journey
        </motion.button></Link>

        <div className="mt-10 space-y-4 sm:space-y-6">
          <FeatureHighlight delay={0} title="Auto Save" desc="Your work is always protected in real-time." highlight />
          <FeatureHighlight delay={0.2} title="Rich Text Editor" desc="Experience seamless formatting and multimedia integration." />
          <FeatureHighlight delay={0.4} title="Secure Authentication" desc="Your privacy, guaranteed with industry-leading security." />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:w-1/2 relative h-64 sm:h-96 md:h-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-black opacity-80"></div>

        <FloatingCircle size={150} top="10%" left="15%" delay={0} className="hidden sm:block" />
        <FloatingCircle size={100} top="40%" left="60%" delay={0.3} className="hidden md:block" />
        <FloatingCircle size={130} top="65%" left="30%" delay={0.6} className="hidden md:block" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute bottom-12 left-8 text-7xl sm:text-8xl md:text-9xl font-extrabold text-white select-none pointer-events-none"
          style={{ userSelect: 'none', whiteSpace: 'nowrap' }}
        >
          Blog.
        </motion.p>
      </motion.div>
    </div>
  );
}

function FeatureHighlight({ delay, title, desc, highlight }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.7 }}
      className={`p-4 rounded-lg ${highlight ? "bg-pink-700 bg-opacity-60 shadow-xl" : "bg-gray-800 bg-opacity-40"}`}
    >
      <h3 className={`text-lg sm:text-xl font-semibold ${highlight ? "text-pink-300" : "text-gray-300"}`}>
        {title}
      </h3>
      <p className="text-gray-400 mt-1 text-sm sm:text-base">{desc}</p>
    </motion.div>
  );
}

function FloatingCircle({ size, top, left, delay, className }) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 opacity-70 ${className}`}
      style={{ width: size, height: size, top, left }}
      animate={{
        y: ["0%", "15%", "0%"],
        x: ["0%", "10%", "0%"],
        opacity: [0.7, 0.4, 0.7],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 6,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}
