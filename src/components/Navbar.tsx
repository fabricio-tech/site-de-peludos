import { Link } from "react-router-dom";
import { Heart, Menu, X, PawPrint } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              <PawPrint className="h-4 w-4 text-accent absolute -bottom-1 -right-1 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Amor em Patas
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Início
            </Link>
            <Link to="#animais" className="text-foreground hover:text-primary transition-colors font-medium">
              Animais
            </Link>
            <Link to="#sobre" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre
            </Link>
            <Link to="#contato" className="text-foreground hover:text-primary transition-colors font-medium">
              Contato
            </Link>
            <Link to="/colaboradores">
              <Button variant="outline" size="sm">
                Colaboradores
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="hero" size="sm">
                Entrar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            <Link
              to="/"
              className="block text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="#animais"
              className="block text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Animais
            </Link>
            <Link
              to="#sobre"
              className="block text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="#contato"
              className="block text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Link to="/colaboradores" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full mb-2">
                Colaboradores
              </Button>
            </Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="hero" size="sm" className="w-full">
                Entrar
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
