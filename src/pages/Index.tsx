import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import AnimalCard from "@/components/AnimalCard";
import heroImage from "@/assets/hero-animals.jpg";
import dog1 from "@/assets/dog1.jpg";
import cat1 from "@/assets/cat1.jpg";
import dog2 from "@/assets/dog2.jpg";

const Index = () => {
  const animals = [
    {
      id: 1,
      name: "Max",
      age: "3 anos",
      type: "Cachorro",
      image: dog1,
      description: "Um golden retriever carinhoso que adora brincar e fazer novos amigos.",
    },
    {
      id: 2,
      name: "Luna",
      age: "2 anos",
      type: "Gato",
      image: cat1,
      description: "Gatinha laranja tranquila e independente, perfeita para apartamentos.",
    },
    {
      id: 3,
      name: "Bob",
      age: "6 meses",
      type: "Cachorro",
      image: dog2,
      description: "Filhote de beagle cheio de energia e pronto para aprender truques novos.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden h-[35vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background"></div>
        </div>
        
        <div className="relative container mx-auto px-4 pt-8 pb-6 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              Encontre seu novo{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                melhor amigo
              </span>
            </h1>
            <p className="text-base md:text-lg text-foreground/80 mb-4">
              Dê uma segunda chance a um animal que precisa de amor e carinho.
            </p>
            <div className="flex gap-3">
              <Button size="sm" asChild>
                <a href="#animais">Ver Animais</a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Cadastrar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Animals Section */}
      <section id="animais" className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Animais Disponíveis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} {...animal} />
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-10 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Sobre a <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Amor em Patas</span>
            </h2>
            <div className="bg-muted/50 rounded-2xl p-6 md:p-8 border border-border">
              <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-4">
                A <strong className="text-primary">Amor em Patas</strong> é uma ONG de proteção animal sediada na cidade de <strong>Tianguá, Ceará</strong>. 
                Nascemos do desejo de transformar a realidade dos animais abandonados em nossa região, promovendo um movimento de 
                <span className="text-primary font-semibold"> solidariedade</span> e <span className="text-primary font-semibold">humanidade</span>.
              </p>
              <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-4">
                Acreditamos que todo animal merece uma segunda chance e um lar cheio de amor. Nossa missão é resgatar, 
                cuidar e encontrar famílias responsáveis para cães, gatos e outros animais que precisam de proteção.
              </p>
              <p className="text-foreground/90 text-base md:text-lg leading-relaxed">
                Junte-se a nós nessa causa! Adotar é um ato de amor que transforma vidas — a do animal e a sua. 
                Juntos, podemos construir uma cidade mais compassiva e acolhedora para todos os seres vivos.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Button size="sm" asChild>
                  <a href="#animais">Conhecer Animais</a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/colaboradores">Nossa Equipe</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
