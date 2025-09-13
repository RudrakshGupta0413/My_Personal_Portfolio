import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Award, Target, Megaphone, Heart, MessageCircle, Repeat2, Share, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useRef } from "react";

interface FreelanceUpdate {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'achievement' | 'milestone' | 'announcement';
  priority: number;
  created_at: string;
}

const typeIcons = {
  project: Briefcase,
  achievement: Award,
  milestone: Target,
  announcement: Megaphone,
};

const typeColors = {
  project: "bg-blue-500/20 text-blue-300",
  achievement: "bg-green-500/20 text-green-300",
  milestone: "bg-purple-500/20 text-purple-300",
  announcement: "bg-orange-500/20 text-orange-300",
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const tweetVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      }
    },
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
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
            Freelance Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with my latest projects, achievements, and milestones in the freelance world
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto space-y-6"
        >
          {updates.map((update, index) => {
            const Icon = typeIcons[update.type];
            return (
              <motion.div 
                key={update.id} 
                variants={tweetVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-card/50 backdrop-blur-md border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group">
                  <CardContent className="p-6">
                    {/* Tweet Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <motion.div 
                        className="flex-shrink-0"
                        whileHover={{ rotate: 5 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-primary/30">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            My Portfolio
                          </h3>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="text-primary"
                          >
                            <Badge variant="secondary" className={`text-xs capitalize ${typeColors[update.type]} border-0`}>
                              {update.type}
                            </Badge>
                          </motion.div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          @portfolio • {formatTimeAgo(update.created_at)}
                        </p>
                      </div>
                    </div>

                    {/* Tweet Content */}
                    <motion.div 
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary/90 transition-colors duration-300">
                        {update.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {update.description}
                      </p>
                    </motion.div>

                    {/* Tweet Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/30">
                      <div className="flex items-center space-x-6">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center space-x-2 text-muted-foreground hover:text-blue-400 transition-colors duration-200"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{Math.floor(Math.random() * 10) + 1}</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center space-x-2 text-muted-foreground hover:text-green-400 transition-colors duration-200"
                        >
                          <Repeat2 className="h-4 w-4" />
                          <span className="text-sm">{Math.floor(Math.random() * 5) + 1}</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center space-x-2 text-muted-foreground hover:text-red-400 transition-colors duration-200"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{Math.floor(Math.random() * 20) + 5}</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          <Share className="h-4 w-4" />
                        </motion.button>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="text-xs text-muted-foreground"
                      >
                        {new Date(update.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </motion.div>
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