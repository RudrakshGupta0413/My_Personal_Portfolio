import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const Testimonials = () => {
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
    <section className="py-16 px-6 bg-surface-dark/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            What my clients say about working with me
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className={`p-6 glass-effect hover:glow-accent transition-all duration-500 fade-in-up stagger-${index + 1} border-border/50`}
            >
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-accent/50 mr-2" />
                <div className="flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;