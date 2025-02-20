"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useDisciplinas } from "@/hooks/useDisciplinas";
import { useState } from "react";
 
const formSchema = z.object({
  codigo_disciplina: z.coerce.number().positive(),
  nome: z.string(),
  creditos: z.coerce.number().positive(),
  semestre_recomendado: z.coerce.number().nullable(),
  ano_recomendado: z.coerce.number().positive(),
  oferta_semestre: z.string(),
  codigo_curso: z.coerce.number().positive(),
})

export function DialogNovaDisciplina() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo_disciplina: 999,
      nome: '',
      creditos: 8,
      semestre_recomendado: 1,
      ano_recomendado: 1,
      oferta_semestre: 'par',
      codigo_curso: 101,
    },
  });

  const { useCreateDisciplina } = useDisciplinas();
  const { mutate } = useCreateDisciplina();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Criar nova disciplina
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar nova disciplina</DialogTitle>
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
            <FormField
              control={form.control}
              name="codigo_curso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código do Curso</FormLabel>
                  <FormControl>
                    <Input placeholder="101" {...field} />
                  </FormControl>
                  <FormDescription>
                    Note que esse campo pode ficar nulo - apenas significa que a matéria não faz parte de um curso específico, mas sim que é compartilhada
                    entre grades ou opcional.
                  </FormDescription>
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