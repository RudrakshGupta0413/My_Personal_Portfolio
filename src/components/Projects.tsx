import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
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
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, from concept to deployment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className={`overflow-hidden glass-effect hover:glow-accent transition-all duration-500 group fade-in-up stagger-${index % 4 + 1} border-border/50`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="text-xs glass-effect border-border/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="glass-effect hover:bg-secondary/20">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;