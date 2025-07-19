import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Database, Globe, Smartphone, Server, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const skillCategories = [
    {
      icon: Code,
      title: "Frontend Development",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 80 }
      ],
      color: "neon-cyan"
    },
    {
      icon: Server,
      title: "Backend Development", 
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 82 },
        { name: "MongoDB", level: 80 },
        { name: "Docker", level: 75 }
      ],
      color: "neon-purple"
    },
    {
      icon: Database,
      title: "Database & Cloud",
      skills: [
        { name: "AWS", level: 78 },
        { name: "Firebase", level: 85 },
        { name: "Supabase", level: 88 },
        { name: "Redis", level: 70 },
        { name: "GraphQL", level: 82 }
      ],
      color: "neon-pink"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: [
        { name: "React Native", level: 85 },
        { name: "Flutter", level: 70 },
        { name: "iOS", level: 75 },
        { name: "Android", level: 75 },
        { name: "PWA", level: 90 }
      ],
      color: "accent"
    },
    {
      icon: Globe,
      title: "Web Technologies",
      skills: [
        { name: "HTML5", level: 98 },
        { name: "CSS3", level: 95 },
        { name: "JavaScript", level: 92 },
        { name: "REST APIs", level: 88 },
        { name: "WebSockets", level: 80 }
      ],
      color: "primary"
    },
    {
      icon: Palette,
      title: "Design & Tools",
      skills: [
        { name: "Figma", level: 85 },
        { name: "Adobe XD", level: 75 },
        { name: "Git", level: 95 },
        { name: "Webpack", level: 80 },
        { name: "Vite", level: 88 }
      ],
      color: "neon-cyan"
    }
  ];

  return (
    <section id="skills" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mastering modern technologies to build exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 glass-effect hover:glow-accent transition-all duration-500 group cursor-pointer border-border/50 h-full">
                <motion.div 
                  className="flex items-center mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-3 rounded-lg bg-gradient-neon/10 group-hover:bg-gradient-neon/20 transition-colors">
                    <category.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">{category.title}</h3>
                </motion.div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs text-accent font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-surface-dark rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-neon rounded-full relative"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ 
                            duration: 1.5, 
                            delay: (index * 0.1) + (skillIndex * 0.1),
                            ease: "easeOut"
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;