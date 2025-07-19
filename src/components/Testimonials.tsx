import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      content: "John delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise is outstanding.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mike Chen", 
      role: "Product Manager, InnovateCorp",
      content: "Working with John was a pleasure. He understood our requirements perfectly and delivered a scalable solution on time and within budget.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, CreativeHub",
      content: "John's full-stack expertise helped us build our dream platform. His communication skills and problem-solving approach are remarkable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-6 bg-surface-dark/50" ref={ref}>
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            What my clients say about working with me
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, rotateY: 5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="p-6 glass-effect hover:glow-accent transition-all duration-500 border-border/50 h-full group">
                <motion.div 
                  className="flex items-center mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Quote className="h-8 w-8 text-accent/50 mr-2" />
                  </motion.div>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <Star className="h-4 w-4 fill-accent text-accent" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors"
                  whileHover={{ x: 5 }}
                >
                  "{testimonial.content}"
                </motion.p>
                
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 10 }}
                >
                  <motion.img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-accent/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;