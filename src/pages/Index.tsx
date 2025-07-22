import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";
import ParallaxTransition from "@/components/ParallaxTransition";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingNav />
      <Hero />
      <ParallaxTransition />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
