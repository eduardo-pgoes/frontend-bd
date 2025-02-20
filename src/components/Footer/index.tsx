import { Heart } from "lucide-react";
import { FlipWords } from "../ui/flip-words";

export default function Footer() {
  return (
    <footer className="w-full p-8 bg-purple-100 text-stone-950 h-max text-sm flex flex-col gap-2 items-start justify-center">
      <p className="w-max flex items-center justify-center">
        Feito com <Heart className="mx-1" /> por <FlipWords words={["Eduardo Paulo Goes", "Rafael Pires Moreira Silva", "José Vanderlei da Silva Júnior"]} />
      </p>
    </footer>
  )
}