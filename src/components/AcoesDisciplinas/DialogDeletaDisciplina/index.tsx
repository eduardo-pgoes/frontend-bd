"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { useDisciplinas } from "@/hooks/useDisciplinas";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function DialogDeletaDisciplina({
  cod,
} : {
  cod: number,
}) {
  const { useDeleteDisciplina } = useDisciplinas();
  const { mutate } = useDeleteDisciplina();

  const [open, setOpen] = useState(false);

  const onClick = () => {
    mutate(cod);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Deletar disciplina</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" className="group-data-[state=expanded]:hidden">
        Deletar disciplina
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar disciplina?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Essa ação não pode ser desfeita.
        </DialogDescription>
        <Button variant="destructive" onClick={onClick}>Deletar disciplina</Button>
      </DialogContent>
    </Dialog>
  )
}