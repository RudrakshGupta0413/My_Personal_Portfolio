import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import developerPhoto from "@/assets/developer-photo.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-darker via-background to-surface-dark">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-accent text-lg font-medium fade-in-up">Hi, I'm</p>
              <h1 className="text-5xl lg:text-7xl font-bold gradient-text fade-in-up stagger-1">
                John Developer
              </h1>
              <h2 className="text-2xl lg:text-3xl text-muted-foreground fade-in-up stagger-2">
                Full Stack Developer & Freelancer
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg fade-in-up stagger-3">
              I craft exceptional digital experiences through clean code and innovative solutions. 
              Specializing in modern web technologies and helping businesses grow online.
            </p>

            <div className="flex flex-wrap gap-4 fade-in-up stagger-4">
              <Button size="lg" className="glow-effect hover:glow-accent transition-all duration-300">
                View My Work
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="glass-effect hover:bg-secondary/20">
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 fade-in-up stagger-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors p-2 hover:glow-accent rounded-lg">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors p-2 hover:glow-accent rounded-lg">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors p-2 hover:glow-accent rounded-lg">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-neon rounded-full blur-3xl opacity-30 floating-animation"></div>
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glass-effect glow-neon fade-in-up stagger-2">
                <img 
                  src={developerPhoto} 
                  alt="John Developer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-accent" />
      </div>
    </section>
  );
};

export default Hero;