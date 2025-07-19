import { Code, Database, Globe, Smartphone, Server, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Frontend Development",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
      color: "neon-cyan"
    },
    {
      icon: Server,
      title: "Backend Development", 
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker"],
      color: "neon-purple"
    },
    {
      icon: Database,
      title: "Database & Cloud",
      skills: ["AWS", "Firebase", "Supabase", "Redis", "GraphQL"],
      color: "neon-pink"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: ["React Native", "Flutter", "iOS", "Android", "PWA"],
      color: "accent"
    },
    {
      icon: Globe,
      title: "Web Technologies",
      skills: ["HTML5", "CSS3", "JavaScript", "REST APIs", "WebSockets"],
      color: "primary"
    },
    {
      icon: Palette,
      title: "Design & Tools",
      skills: ["Figma", "Adobe XD", "Git", "Webpack", "Vite"],
      color: "neon-cyan"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mastering modern technologies to build exceptional digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className={`p-6 glass-effect hover:glow-accent transition-all duration-500 fade-in-up group cursor-pointer border-border/50 stagger-${index % 4 + 1}`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gradient-neon/10 group-hover:bg-gradient-neon/20 transition-colors`}>
                  <category.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold ml-4">{category.title}</h3>
              </div>
              
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill} className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3 group-hover:shadow-glow-accent"></div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;