import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "Erro",
            description: "Este email já está cadastrado.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        // Update profile with phone number
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ phone })
          .eq("id", data.user.id);

        if (profileError) {
          console.error("Error updating profile:", profileError);
        }

        toast({
          title: "Cadastro realizado! 🎉",
          description: "Sua conta foi criada com sucesso.",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar sua conta.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 group">
          <Heart className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AdoPet
          </span>
        </Link>

        <Card className="shadow-2xl animate-scale-in">
          <CardHeader className="space-y-1 py-4">
            <CardTitle className="text-xl font-bold text-center">Criar Conta</CardTitle>
            <CardDescription className="text-center text-sm">
              Preencha seus dados para se cadastrar
            </CardDescription>
          </CardHeader>
          <CardContent className="py-2">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="fullName" className="text-sm">Nome Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-sm">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-9 text-sm"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-9"
                disabled={isLoading}
                variant="hero"
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 py-3">
            <div className="text-sm text-center text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Entrar
              </Link>
            </div>
            <Button variant="ghost" size="sm" asChild className="w-full h-8">
              <Link to="/">Voltar para o início</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
