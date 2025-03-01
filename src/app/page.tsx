import { DialogNovaDisciplina } from "@/components/DialogNovaDisciplina";
import Footer from "@/components/Footer";
import TabelaDisciplinas from "@/components/TabelaDisciplinas";

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]" suppressHydrationWarning>
      <main className="flex-grow w-full flex-col gap-8 dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-50">
          Gestor de Jornada Acadêmica
        </p>
        <DialogNovaDisciplina />
        <TabelaDisciplinas />
      </main>
      <Footer />
    </div>
  );
}
