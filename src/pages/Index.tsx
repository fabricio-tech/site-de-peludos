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
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background"></div>
        </div>
        
        <div className="relative container mx-auto px-4 pt-24 pb-32">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Encontre seu novo{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                melhor amigo
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
              Dê uma segunda chance a um animal que precisa de amor e carinho. 
              Adote e transforme duas vidas: a sua e a dele.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#animais">Ver Animais</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Cadastrar Animal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Animals Section */}
      <section id="animais" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Animais Disponíveis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conheça nossos amiguinhos que estão esperando por um lar cheio de amor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} {...animal} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="default" size="lg">
              Ver Todos os Animais
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Pronto para adotar?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in">
            Faça login e comece o processo de adoção hoje mesmo. 
            Seu futuro companheiro está esperando por você!
          </p>
          <Button variant="secondary" size="lg" asChild className="animate-scale-in">
            <Link to="/login">Começar Agora</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Amor em Patas. Feito com ❤️ para os animais.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
