"use client";

import { useDisciplinas } from "@/hooks/useDisciplinas";

export default function TabelaDisciplinas() {
  const { useGetDisciplina } = useDisciplinas();
  const { data, isLoading } = useGetDisciplina(1001);

  console.log(data, isLoading);

  return (
    <p>Teste...</p>
  );
}