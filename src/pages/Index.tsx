import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import FreelanceUpdates from "@/components/FreelanceUpdates";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";
import MobileNav from "@/components/MobileNav";
import AIChatbot from "@/components/AIChatbot";
import AdminLink from "@/components/AdminLink";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingNav />
      <MobileNav />
      <AIChatbot />
      <AdminLink />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <FreelanceUpdates />
      <Blogs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
