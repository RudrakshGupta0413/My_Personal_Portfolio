import { useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="overflow-hidden glass-effect hover:glow-accent transition-all duration-500 border-border/50 h-full">
        <div className="relative overflow-hidden">
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Floating action buttons */}
          <motion.div 
            className="absolute top-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: -20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0 backdrop-blur-sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0 backdrop-blur-sm">
                <Github className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8 }}
          />
        </div>
        
        <div className="p-6" style={{ transform: "translateZ(25px)" }}>
          <motion.h3 
            className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors"
            whileHover={{ x: 5 }}
          >
            {project.title}
          </motion.h3>
          <motion.p 
            className="text-muted-foreground text-sm mb-4 leading-relaxed"
            whileHover={{ x: 10 }}
          >
            {project.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-2"
            whileHover={{ scale: 1.02 }}
          >
            {project.tech.map((tech: string, techIndex: number) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge 
                  variant="secondary" 
                  className="text-xs glass-effect border-border/50 hover:bg-accent/20"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard. Built for scalability and performance.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, team collaboration features, and detailed analytics.",
      tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "AI Content Generator",
      description: "SaaS platform leveraging AI to generate marketing content, blogs, and social media posts with custom brand voice.",
      tech: ["React", "Python", "OpenAI", "FastAPI", "Docker"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Real Estate Platform",
      description: "Modern property listing platform with advanced search, virtual tours, and mortgage calculator integration.",
      tech: ["Vue.js", "Laravel", "MySQL", "Mapbox"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Fitness Tracking App",
      description: "Mobile-first fitness application with workout tracking, nutrition planning, and social features for community engagement.",
      tech: ["React Native", "Firebase", "Redux", "Stripe"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive business intelligence dashboard with real-time data visualization and custom reporting capabilities.",
      tech: ["React", "D3.js", "Node.js", "MongoDB", "Redis"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, from concept to deployment
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="lg" className="glass-effect hover:bg-secondary/20 group">
              <span className="mr-2">View All Projects</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ExternalLink className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;