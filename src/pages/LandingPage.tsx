import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Navbar } from "@/components/Navbar";

export default function LandingPage() {
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterClick = () => {
    setShowRegister(true);
    setTimeout(() => {
      document.getElementById("register-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCloseRegister = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setShowRegister(false);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <HeroSection onRegisterClick={handleRegisterClick} />
      {showRegister && (
        <section id="register-section" className="w-full bg-[#f5f5f7] py-[80px]">
          <div className="container mx-auto px-4 md:px-6">
            <RegistrationForm onClose={handleCloseRegister} />
          </div>
        </section>
      )}
    </div>
  );
}
