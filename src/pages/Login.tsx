import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Para fins de apresentação - acesso direto
    toast({
      title: "Bem-vindo! 🎉",
      description: "Acesso liberado para apresentação.",
    });
    
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 500);
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
            <CardTitle className="text-xl font-bold text-center">Entrar</CardTitle>
            <CardDescription className="text-center text-sm">
              Faça login para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="py-2">
            <form onSubmit={handleSubmit} className="space-y-3">
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
              <Button
                type="submit"
                className="w-full h-9"
                disabled={isLoading}
                variant="hero"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 py-3">
            <div className="text-sm text-center text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Cadastre-se
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

export default Login;
