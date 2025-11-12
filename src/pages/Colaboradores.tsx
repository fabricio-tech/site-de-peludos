import Navbar from "@/components/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const Colaboradores = () => {
  const colaboradores = [
    { id: 1, nome: "Fabricio", papel: "Desenvolvedor" },
    { id: 2, nome: "Samily", papel: "Desenvolvedora" },
    { id: 3, nome: "José", papel: "Desenvolvedor" },
    { id: 4, nome: "Gilmar", papel: "Desenvolvedor" },
    { id: 5, nome: "Denise", papel: "Desenvolvedora" },
    { id: 6, nome: "Tiago", papel: "Desenvolvedor" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-12 w-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Colaboradores
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Projeto Integrador 2
            </p>
          </div>

          <Card className="shadow-lg animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Equipe do Projeto</CardTitle>
              <CardDescription>
                Conheça os membros que contribuíram para o desenvolvimento do Amor em Patas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">#</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Papel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {colaboradores.map((colaborador) => (
                    <TableRow key={colaborador.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{colaborador.id}</TableCell>
                      <TableCell className="font-semibold">{colaborador.nome}</TableCell>
                      <TableCell className="text-muted-foreground">{colaborador.papel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-muted-foreground animate-fade-in">
            <p className="flex items-center justify-center gap-2">
              <span>Desenvolvido com</span>
              <span className="text-primary">❤️</span>
              <span>pela equipe do Projeto Integrador 2</span>
            </p>
          </div>
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

export default Colaboradores;
