import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Award, Target, Megaphone, Smile, Code, Shuffle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useRef } from "react";

interface FreelanceUpdate {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'achievement' | 'milestone' | 'announcement' | 'vibe_check' | 'snippet' | 'random';
  priority: number;
  created_at: string;
}

const typeIcons = {
  project: Briefcase,
  achievement: Award,
  milestone: Target,
  announcement: Megaphone,
  vibe_check: Smile,
  snippet: Code,
  random: Shuffle,
};

const typeColors = {
  project: "bg-blue-500/20 text-blue-300",
  achievement: "bg-green-500/20 text-green-300",
  milestone: "bg-purple-500/20 text-purple-300",
  announcement: "bg-orange-500/20 text-orange-300",
  vibe_check: "bg-pink-500/20 text-pink-300",
  snippet: "bg-cyan-500/20 text-cyan-300",
  random: "bg-yellow-500/20 text-yellow-300",
};

const FreelanceUpdates = () => {
  const [updates, setUpdates] = useState<FreelanceUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data, error } = await supabase
          .from("freelance_updates")
          .select("*")
          .eq("status", "active")
          .order("priority", { ascending: false })
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) {
          console.error("Error fetching freelance updates:", error);
        } else {
          setUpdates(data as FreelanceUpdate[] || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  // Don't render if loading or no updates
  if (loading) {
    return (
      <section id="freelance-updates" ref={ref} className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-primary font-medium text-sm">Latest Updates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Freelance Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Loading updates...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (updates.length === 0) {
    return (
      <section id="freelance-updates" ref={ref} className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-primary font-medium text-sm">Latest Updates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Freelance Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No updates available at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const messageBoxVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 120
      }
    },
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };


  return (
    <section id="freelance-updates" ref={ref} className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-l from-secondary/20 to-primary/20 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="text-primary font-medium text-sm">Latest Updates</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Binary Bites
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick updates on my technical progress, projects, and new discoveries in the world of coding and freelancing.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {updates.map((update, index) => {
            const Icon = typeIcons[update.type];
            
            return (
              <motion.div
                key={update.id}
                variants={messageBoxVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${
                  index === 0 || index === 4 || index === 8 ? 'md:col-span-1 lg:col-span-1' : ''
                } ${
                  index === 1 || index === 7 ? 'md:row-span-1' : ''
                }`}
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-500 group hover:shadow-xl hover:shadow-primary/5">
                  <CardContent className="p-4 h-full flex flex-col">
                    {/* Header with Icon and Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <motion.div 
                        className={`p-2 rounded-lg ${typeColors[update.type]} group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 10 }}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.div>
                      <Badge variant="outline" className="text-xs capitalize border-primary/30">
                        {update.type}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-base mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {update.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3 mb-3">
                      {update.description}
                    </p>

                    {/* Timeline */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(update.created_at)}
                      </span>
                      <motion.div
                        className="w-2 h-2 rounded-full bg-primary/60"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FreelanceUpdates;