import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const techSkills = [
    // Programming Languages
    { name: "JavaScript", icon: "⚡", category: "Languages", color: "from-yellow-400 to-yellow-600" },
    { name: "TypeScript", icon: "🔷", category: "Languages", color: "from-blue-400 to-blue-600" },
    { name: "Python", icon: "🐍", category: "Languages", color: "from-green-400 to-green-600" },
    { name: "Java", icon: "☕", category: "Languages", color: "from-red-400 to-red-600" },
    
    // Frontend Technologies
    { name: "React", icon: "⚛️", category: "Frontend", color: "from-cyan-400 to-cyan-600" },
    { name: "Next.js", icon: "▲", category: "Frontend", color: "from-gray-400 to-gray-600" },
    { name: "Vue.js", icon: "💚", category: "Frontend", color: "from-emerald-400 to-emerald-600" },
    { name: "Tailwind", icon: "🎨", category: "Frontend", color: "from-teal-400 to-teal-600" },
    { name: "HTML5", icon: "🌐", category: "Frontend", color: "from-orange-400 to-orange-600" },
    { name: "CSS3", icon: "🎯", category: "Frontend", color: "from-blue-400 to-purple-600" },
    
    // Backend Technologies
    { name: "Node.js", icon: "🟢", category: "Backend", color: "from-green-400 to-green-600" },
    { name: "Express", icon: "🚀", category: "Backend", color: "from-gray-400 to-gray-600" },
    { name: "GraphQL", icon: "🔗", category: "Backend", color: "from-pink-400 to-pink-600" },
    { name: "REST API", icon: "🔌", category: "Backend", color: "from-indigo-400 to-indigo-600" },
    
    // Databases
    { name: "MongoDB", icon: "🍃", category: "Database", color: "from-green-400 to-green-700" },
    { name: "PostgreSQL", icon: "🐘", category: "Database", color: "from-blue-400 to-blue-700" },
    { name: "Firebase", icon: "🔥", category: "Database", color: "from-yellow-400 to-orange-600" },
    { name: "Supabase", icon: "⚡", category: "Database", color: "from-emerald-400 to-emerald-700" },
    
    // Cloud & DevOps
    { name: "AWS", icon: "☁️", category: "Cloud", color: "from-orange-400 to-orange-600" },
    { name: "Docker", icon: "🐳", category: "DevOps", color: "from-blue-400 to-blue-600" },
    { name: "Git", icon: "📡", category: "DevOps", color: "from-red-400 to-red-600" },
    { name: "Vercel", icon: "▲", category: "Cloud", color: "from-gray-400 to-gray-600" },
    
    // Mobile & Tools
    { name: "React Native", icon: "📱", category: "Mobile", color: "from-blue-400 to-purple-600" },
    { name: "Flutter", icon: "🦋", category: "Mobile", color: "from-blue-400 to-cyan-600" },
    { name: "Figma", icon: "🎨", category: "Design", color: "from-purple-400 to-purple-600" },
    { name: "VS Code", icon: "💻", category: "Tools", color: "from-blue-400 to-blue-600" }
  ];

  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-2 h-2 bg-neon-cyan rounded-full opacity-60"
          animate={{ 
            y: [0, -30, 0], 
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-1 h-1 bg-neon-purple rounded-full opacity-40"
          animate={{ 
            y: [0, -40, 0], 
            x: [0, 20, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-neon-pink rounded-full opacity-50"
          animate={{ 
            y: [0, -20, 0], 
            x: [0, -15, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Tech Arsenal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies I wield to craft digital masterpieces
          </p>
        </motion.div>

        {/* Floating Tech Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 max-w-6xl mx-auto">
          {techSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ 
                opacity: 0, 
                y: 50,
                rotateY: -180,
                scale: 0.3
              }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                rotateY: 0,
                scale: 1
              } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.15,
                rotateY: 15,
                z: 50,
                transition: { duration: 0.3 }
              }}
              className="group relative cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="relative h-24 w-full glass-effect rounded-xl border border-border/30 overflow-hidden"
                whileHover={{ 
                  boxShadow: "0 0 30px hsl(var(--accent) / 0.3)",
                  borderColor: "hsl(var(--accent) / 0.5)"
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3 + (index % 3),
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              >
                {/* Gradient background */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-3 text-center">
                  <motion.div 
                    className="text-2xl mb-2"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-xs font-semibold text-foreground/90 group-hover:text-accent transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill.name}
                  </motion.h3>
                </div>

                {/* Floating category badge */}
                <motion.div 
                  className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-gradient-neon rounded-full text-background font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0, rotate: -180 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {skill.category}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tech Categories Summary */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {Array.from(new Set(techSkills.map(skill => skill.category))).map((category, index) => (
              <motion.span 
                key={category}
                className="px-3 py-1 glass-effect rounded-full border border-border/30 hover:border-accent/50 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.7 + index * 0.1 }}
              >
                {category}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;