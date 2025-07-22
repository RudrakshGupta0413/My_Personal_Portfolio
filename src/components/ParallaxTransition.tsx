import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxTransition = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform values based on scroll progress
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.6, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div 
      ref={ref} 
      className="h-screen relative overflow-hidden pointer-events-none"
    >
      {/* Floating code elements that move at different speeds */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-20 left-20 text-6xl text-accent/30 font-mono"
      >
        {'</>'}
      </motion.div>
      
      <motion.div
        style={{ y: y2, opacity, rotate }}
        className="absolute top-40 right-32 text-4xl text-neon-purple/40 font-mono"
      >
        {'{ }'}
      </motion.div>
      
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute bottom-32 left-1/3 text-5xl text-neon-cyan/35 font-mono"
      >
        {'=>'}
      </motion.div>
      
      {/* Large gradient orbs with parallax effect */}
      <motion.div
        style={{ y: y1, scale, opacity }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-accent/20 to-neon-purple/20 rounded-full blur-3xl"
      />
      
      <motion.div
        style={{ y: y2, scale: useTransform(scrollYProgress, [0, 1], [1, 0.8]), opacity }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-neon-cyan/25 to-neon-pink/25 rounded-full blur-2xl"
      />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -50 - i * 20]),
            opacity: useTransform(scrollYProgress, [0, 0.8, 1], [0.6, 0.3, 0]),
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          className="absolute w-3 h-3 bg-accent/50 rounded-full"
        />
      ))}
      
      {/* Circuit pattern overlay */}
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.2, 0.1])
        }}
        className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"
      />
      
      {/* Large text that fades and scales */}
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -80]),
          opacity: useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.8, 0.5, 0]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2])
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-8xl md:text-9xl lg:text-[12rem] font-bold gradient-text opacity-10 select-none">
          CODE
        </div>
      </motion.div>
      
      {/* Animated lines connecting elements */}
      <motion.svg
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.3, 0]) }}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M20,20 Q50,10 80,30 T90,70"
          stroke="url(#parallaxGradient)"
          strokeWidth="0.2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.path
          d="M10,80 Q40,60 70,80 T95,50"
          stroke="url(#parallaxGradient2)"
          strokeWidth="0.15"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 1 }}
        />
        <defs>
          <linearGradient id="parallaxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="parallaxGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--neon-purple))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--neon-purple))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--neon-purple))" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default ParallaxTransition;