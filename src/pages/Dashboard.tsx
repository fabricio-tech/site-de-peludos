import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, PawPrint, User, LogOut, Dog, Cat, Bird, Rabbit, Fish } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const animalGallery = [
  {
    id: 1,
    name: "Papagaio Verde",
    type: "Ave",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400",
    description: "Papagaio colorido e falante, adora interagir com pessoas. Vive em média 50 anos e precisa de muito carinho e atenção.",
  },
  {
    id: 2,
    name: "Calopsita",
    type: "Ave",
    image: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=400",
    description: "Ave dócil e carinhosa, perfeita para apartamentos. Canta lindas melodias e se apega facilmente aos donos.",
  },
  {
    id: 3,
    name: "Iguana Verde",
    type: "Réptil",
    image: "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?w=400",
    description: "Lagarto herbívoro de grande porte. Precisa de terrário espaçoso com aquecimento e iluminação UVB.",
  },
  {
    id: 4,
    name: "Gecko Leopardo",
    type: "Réptil",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400",
    description: "Pequeno lagarto noturno, fácil de cuidar. Ideal para iniciantes em répteis, vive até 20 anos.",
  },
  {
    id: 5,
    name: "Porquinho da Índia",
    type: "Roedor",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400",
    description: "Roedor sociável e carinhoso. Precisa de companhia e espaço para correr. Emite sons adoráveis.",
  },
  {
    id: 6,
    name: "Coelho Anão",
    type: "Roedor",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400",
    description: "Coelho pequeno e fofo, perfeito para famílias. Muito brincalhão e pode ser treinado para usar liteira.",
  },
  {
    id: 7,
    name: "Peixe Betta",
    type: "Peixe",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=400",
    description: "Peixe ornamental de cores vibrantes. Fácil de cuidar, ideal para aquários pequenos.",
  },
  {
    id: 8,
    name: "Hamster Sírio",
    type: "Roedor",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400",
    description: "Pequeno roedor noturno, independente e curioso. Adora correr na rodinha e armazenar comida.",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Animal form state
  const [animalData, setAnimalData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    description: "",
    imageUrl: "",
  });

  // Person form state
  const [personData, setPersonData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleAnimalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("animals").insert({
        name: animalData.name,
        type: animalData.type,
        breed: animalData.breed || null,
        age: animalData.age,
        description: animalData.description || null,
        image_url: animalData.imageUrl || null,
        created_by: user?.id,
        status: "available",
      });

      if (error) throw error;

      setAnimalData({ name: "", type: "", breed: "", age: "", description: "", imageUrl: "" });
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao cadastrar animal.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("profiles").update({
        full_name: personData.fullName,
        email: personData.email,
        phone: personData.phone,
      }).eq("id", user?.id);

      if (error) throw error;

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar perfil.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAnimalIcon = (type: string) => {
    switch (type) {
      case "Ave": return Bird;
      case "Réptil": return PawPrint;
      case "Roedor": return Rabbit;
      case "Peixe": return Fish;
      default: return PawPrint;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 relative">
      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <div className="text-center animate-scale-in">
            <div className="flex justify-center gap-4 mb-6">
              <Dog className="h-16 w-16 text-primary animate-bounce" style={{ animationDelay: "0ms" }} />
              <Cat className="h-16 w-16 text-accent animate-bounce" style={{ animationDelay: "150ms" }} />
              <Bird className="h-16 w-16 text-primary animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <div className="flex justify-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-destructive animate-pulse" />
              <PawPrint className="h-8 w-8 text-primary animate-pulse" style={{ animationDelay: "100ms" }} />
              <Heart className="h-8 w-8 text-destructive animate-pulse" style={{ animationDelay: "200ms" }} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Obrigado pelo Cadastro! 🎉
            </h2>
            <p className="text-muted-foreground">
              Seu amiguinho está pronto para encontrar um novo lar!
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Amor em Patas
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" />
            Sair
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-9">
            <TabsTrigger value="gallery" className="text-sm">
              <Heart className="h-4 w-4 mr-1" />
              Animais
            </TabsTrigger>
            <TabsTrigger value="animal" className="text-sm">
              <PawPrint className="h-4 w-4 mr-1" />
              Cadastrar
            </TabsTrigger>
            <TabsTrigger value="person" className="text-sm">
              <User className="h-4 w-4 mr-1" />
              Perfil
            </TabsTrigger>
          </TabsList>

          {/* Animal Gallery */}
          <TabsContent value="gallery">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-foreground mb-1">Conheça Nossos Animais</h2>
              <p className="text-sm text-muted-foreground">Aves, répteis, roedores e muito mais esperando por você!</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {animalGallery.map((animal) => {
                const IconComponent = getAnimalIcon(animal.type);
                return (
                  <Dialog key={animal.id}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden group">
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={animal.image}
                            alt={animal.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
                            <span className="text-xs font-medium text-foreground">{animal.type}</span>
                          </div>
                        </div>
                        <CardContent className="p-2">
                          <h3 className="font-semibold text-sm truncate">{animal.name}</h3>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-primary" />
                          {animal.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="rounded-lg overflow-hidden aspect-video">
                          <img
                            src={animal.image}
                            alt={animal.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            {animal.type}
                          </span>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Sobre {animal.name}</h4>
                          <p className="text-sm text-foreground/80 leading-relaxed">{animal.description}</p>
                        </div>
                        <Button className="w-full">
                          <Heart className="h-4 w-4 mr-2" />
                          Tenho Interesse
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </TabsContent>

          {/* Animal Registration */}
          <TabsContent value="animal">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">Cadastrar Animal</CardTitle>
                <CardDescription className="text-xs">
                  Adicione um animal para adoção
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <form onSubmit={handleAnimalSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="animalName" className="text-xs">Nome</Label>
                      <Input
                        id="animalName"
                        value={animalData.name}
                        onChange={(e) => setAnimalData({ ...animalData, name: e.target.value })}
                        required
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="animalType" className="text-xs">Tipo</Label>
                      <Select
                        value={animalData.type}
                        onValueChange={(value) => setAnimalData({ ...animalData, type: value })}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cachorro">Cachorro</SelectItem>
                          <SelectItem value="Gato">Gato</SelectItem>
                          <SelectItem value="Ave">Ave</SelectItem>
                          <SelectItem value="Réptil">Réptil</SelectItem>
                          <SelectItem value="Roedor">Roedor</SelectItem>
                          <SelectItem value="Peixe">Peixe</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="animalBreed" className="text-xs">Raça</Label>
                      <Input
                        id="animalBreed"
                        value={animalData.breed}
                        onChange={(e) => setAnimalData({ ...animalData, breed: e.target.value })}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="animalAge" className="text-xs">Idade</Label>
                      <Input
                        id="animalAge"
                        value={animalData.age}
                        onChange={(e) => setAnimalData({ ...animalData, age: e.target.value })}
                        placeholder="Ex: 2 anos"
                        required
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="animalDesc" className="text-xs">Descrição</Label>
                    <Textarea
                      id="animalDesc"
                      value={animalData.description}
                      onChange={(e) => setAnimalData({ ...animalData, description: e.target.value })}
                      className="text-sm min-h-[60px]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="animalImage" className="text-xs">URL da Imagem</Label>
                    <Input
                      id="animalImage"
                      value={animalData.imageUrl}
                      onChange={(e) => setAnimalData({ ...animalData, imageUrl: e.target.value })}
                      placeholder="https://exemplo.com/foto.jpg"
                      className="h-8 text-sm"
                    />
                  </div>
                  <Button type="submit" className="w-full h-8" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Cadastrar Animal"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Person Profile */}
          <TabsContent value="person">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">Meu Perfil</CardTitle>
                <CardDescription className="text-xs">
                  Atualize suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <form onSubmit={handlePersonSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="personName" className="text-xs">Nome Completo</Label>
                    <Input
                      id="personName"
                      value={personData.fullName}
                      onChange={(e) => setPersonData({ ...personData, fullName: e.target.value })}
                      required
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="personEmail" className="text-xs">Email</Label>
                    <Input
                      id="personEmail"
                      type="email"
                      value={personData.email}
                      onChange={(e) => setPersonData({ ...personData, email: e.target.value })}
                      required
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="personPhone" className="text-xs">Telefone</Label>
                    <Input
                      id="personPhone"
                      value={personData.phone}
                      onChange={(e) => setPersonData({ ...personData, phone: e.target.value })}
                      placeholder="(00) 00000-0000"
                      className="h-8 text-sm"
                    />
                  </div>
                  <Button type="submit" className="w-full h-8" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar Perfil"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button variant="ghost" size="sm" className="w-full mt-3" onClick={() => navigate("/")}>
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
