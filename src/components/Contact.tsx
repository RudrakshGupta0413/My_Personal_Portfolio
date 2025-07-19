import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="fade-in-up">
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always excited to work on new projects and help businesses achieve their goals. 
                Whether you need a complete web application or want to enhance your existing platform, 
                I'm here to help.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-4 glass-effect border-border/50 fade-in-up stagger-1">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-neon/10 rounded-lg mr-4">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">john@developer.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 glass-effect border-border/50 fade-in-up stagger-2">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-neon/10 rounded-lg mr-4">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 glass-effect border-border/50 fade-in-up stagger-3">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-neon/10 rounded-lg mr-4">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">Available Worldwide</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="fade-in-up stagger-4">
              <h4 className="font-semibold mb-4">Available for:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Full-stack web development
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Mobile app development
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Technical consulting
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Code reviews & optimization
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 glass-effect border-border/50 fade-in-up stagger-2">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input placeholder="Your name" className="glass-effect border-border/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your@email.com" className="glass-effect border-border/50" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="Project inquiry" className="glass-effect border-border/50" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Tell me about your project..." 
                  rows={6}
                  className="glass-effect border-border/50"
                />
              </div>
              
              <Button className="w-full glow-effect hover:glow-accent transition-all duration-300">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;