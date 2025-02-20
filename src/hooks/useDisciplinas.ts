import { useQuery } from "@tanstack/react-query"
import axios from 'axios';

const fetchDisciplina = (id: number) => axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/disciplinas/${id}`).then((val) => val.data);

/**
 * Hook para exportar operações com o servidor (criar disciplinas, editar disciplinas, listar todas as disciplinas e pegar detalhes de
 * uma disciplina específica).
 * 
 * Exporta hooks para evitar a "lei de hooks" do React.
 */
export const useDisciplinas = () => {
  const useGetDisciplina = (id: number) => useQuery({
    queryKey: ['disciplinas', id],
    queryFn: () => fetchDisciplina(id),
  });

  return {
    useGetDisciplina,
  };
}
