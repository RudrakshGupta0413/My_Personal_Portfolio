import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import FloatingNav from "@/components/FloatingNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingNav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Index;
