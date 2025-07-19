import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import developerPhoto from "@/assets/developer-photo.jpg";
import ParticleBackground from "./ParticleBackground";
import CodeSnippets from "./CodeSnippets";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Particle Background */}
      <ParticleBackground />
      
      {/* Floating Code Snippets */}
      <CodeSnippets />
      
      {/* Morphing shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-neon opacity-20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-20 w-24 h-24 bg-neon-pink opacity-30 rounded-full blur-lg"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-accent text-lg font-medium"
              >
                <Terminal className="h-5 w-5" />
                <span>console.log("Hello World!");</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="gradient-text">John</span>{" "}
                <motion.span
                  className="inline-block"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 5 }}
                >
                  Developer
                </motion.span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <h2 className="text-2xl lg:text-3xl text-muted-foreground">
                  Full Stack Developer & 
                  <motion.span
                    className="text-accent ml-2"
                    animate={{ color: ["#00ffff", "#8b5cf6", "#ff00ff", "#00ffff"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Freelancer
                  </motion.span>
                </h2>
              </motion.div>
            </div>
            
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              I craft exceptional digital experiences through clean code and innovative solutions. 
              Specializing in modern web technologies and helping businesses grow online.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="glow-effect hover:glow-accent transition-all duration-300 group">
                  <span className="mr-2">View My Work</span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="glass-effect hover:bg-secondary/20">
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { icon: Github, href: "#", color: "hover:text-neon-purple" },
                { icon: Linkedin, href: "#", color: "hover:text-neon-cyan" },
                { icon: Mail, href: "#", color: "hover:text-neon-pink" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`text-muted-foreground ${social.color} transition-all duration-300 p-3 rounded-lg hover:bg-secondary/20 group`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-6 w-6 group-hover:drop-shadow-[0_0_8px_currentColor]" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative group">
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ width: "120%", height: "120%", left: "-10%", top: "-10%" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-accent/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ width: "140%", height: "140%", left: "-20%", top: "-20%" }}
              />
              
              {/* Background glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-neon rounded-full blur-3xl opacity-30"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              
              {/* Photo container */}
              <motion.div 
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glass-effect glow-neon border-2 border-primary/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  src={developerPhoto} 
                  alt="John Developer" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Overlay effect on hover */}
                <div className="absolute inset-0 bg-gradient-neon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="p-2 rounded-full glass-effect"
        >
          <ArrowDown className="h-6 w-6 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;