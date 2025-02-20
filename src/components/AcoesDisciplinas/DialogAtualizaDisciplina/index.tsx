"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pen } from "lucide-react"
import { useDisciplinas } from "@/hooks/useDisciplinas";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  codigo_disciplina: z.coerce.number().positive(),
  nome: z.string(),
  creditos: z.coerce.number().positive(),
  semestre_recomendado: z.coerce.number().nullable(),
  ano_recomendado: z.coerce.number().positive(),
  oferta_semestre: z.string(),
  codigo_curso: z.coerce.number().positive(),
})

export function DialogAtualizaDisciplina({
  row,
} : {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any,
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo_disciplina: row.CodigoDisciplina,
      nome: row.Nome,
      creditos: row.Creditos,
      semestre_recomendado: row.SemestreRecomendado,
      ano_recomendado: row.AnoRecomendado,
      oferta_semestre: row.OfertaSemestre,
    },
  });

  const { useUpdateDisciplina } = useDisciplinas();
  const { mutate } = useUpdateDisciplina(row.CodigoDisciplina);

  const [open, setOpen] = useState(false);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <Pen className="h-4 w-4" />
              <span className="sr-only">Atualizar disciplina</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" className="group-data-[state=expanded]:hidden">
        Atualizar disciplina
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar disciplina</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, () => console.log('wtf'))} className="space-y-8">
            <FormField
              control={form.control}
              name="codigo_disciplina"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código da Disciplina</FormLabel>
                  <FormControl>
                    <Input placeholder="999" {...field} />
                  </FormControl>
                  <FormDescription>
                    Note que esse código não pode colidir com outros códigos de disciplina.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Algoritmos II" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creditos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Créditos</FormLabel>
                  <FormControl>
                    <Input placeholder="4" {...field} />
                  </FormControl>
                  <FormDescription>
                    O número de créditos equivale à carga horária semanal da disciplina.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semestre_recomendado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semestre recomendado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o semestre recomendado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1o semestre</SelectItem>
                      <SelectItem value="2">2o semestre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ano_recomendado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano Recomendado</FormLabel>
                  <FormControl>
                    <Input placeholder="4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oferta_semestre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Em qual tipo de semestre a disciplina é ofertada?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="par">Par</SelectItem>
                      <SelectItem value="impar">Ímpar</SelectItem>
                      <SelectItem value="ambos">Ofertada nos dois semestres</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Salvar disciplina</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}