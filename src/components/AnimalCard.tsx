import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, PawPrint, Calendar, Dog, Cat } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AnimalCardProps {
  name: string;
  age: string;
  type: string;
  image: string;
  description: string;
}

const AnimalCard = ({ name, age, type, image, description }: AnimalCardProps) => {
  const AnimalIcon = type === "Cachorro" ? Dog : Cat;

  return (
    <Dialog>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2">
            <button
              className="bg-background/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Favoritar"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
        <CardContent className="p-3">
          <div className="mb-2">
            <h3 className="text-lg font-bold mb-0.5">{name}</h3>
            <p className="text-xs text-muted-foreground">
              {type} • {age}
            </p>
          </div>
          <p className="text-sm text-foreground/80 mb-3 line-clamp-2">{description}</p>
          <DialogTrigger asChild>
            <Button variant="default" size="sm" className="w-full">
              Conhecer {name}
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AnimalIcon className="h-6 w-6 text-primary" />
            {name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg aspect-video">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <PawPrint className="h-4 w-4 text-primary" />
              <span>{type}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{age}</span>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-foreground">Sobre {name}</h4>
            <p className="text-foreground/80 leading-relaxed">{description}</p>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              Quero Adotar
            </Button>
            <Button variant="outline" className="flex-1">
              Mais Informações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimalCard;
