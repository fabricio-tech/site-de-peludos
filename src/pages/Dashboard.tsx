import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, PawPrint, User, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Animal form state
  const [animalData, setAnimalData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    description: "",
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
        created_by: user?.id,
        status: "available",
      });

      if (error) throw error;

      toast({
        title: "Animal cadastrado!",
        description: `${animalData.name} foi cadastrado com sucesso.`,
      });

      setAnimalData({ name: "", type: "", breed: "", age: "", description: "" });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AdoPet
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" />
            Sair
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="animal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-9">
            <TabsTrigger value="animal" className="text-sm">
              <PawPrint className="h-4 w-4 mr-1" />
              Cadastrar Animal
            </TabsTrigger>
            <TabsTrigger value="person" className="text-sm">
              <User className="h-4 w-4 mr-1" />
              Meu Perfil
            </TabsTrigger>
          </TabsList>

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
                          <SelectItem value="Pássaro">Pássaro</SelectItem>
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
                  <Button type="submit" className="w-full h-8" disabled={isLoading} variant="hero">
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
                  <Button type="submit" className="w-full h-8" disabled={isLoading} variant="hero">
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
