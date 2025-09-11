import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Award, Target, Megaphone } from "lucide-react";
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

  if (loading || updates.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
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
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {updates.map((update) => {
            const Icon = typeIcons[update.type];
            return (
              <motion.div key={update.id} variants={cardVariants}>
                <Card className="glass-effect border-white/20 hover:border-white/30 transition-all duration-300 h-full group">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${typeColors[update.type]} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs capitalize">
                        {update.type}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {update.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {update.description}
                      </p>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {new Date(update.created_at).toLocaleDateString()}
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