/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from 'axios';

const fetchDisciplina = (id: number) => axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/disciplinas/${id}`).then((val) => val.data);
const fetchDisciplinas = () => axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/disciplinas/`).then((val) => val.data);
const createDisciplina = (obj: object) => axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/disciplinas/`, obj).then((val) => val.data);
const deleteDisciplina = (id: number) => axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/disciplinas/${id}`).then((val) => val.data);
const updateDisciplina = (id: number, obj: object) => axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/disciplinas/${id}`, obj).then((val) => val.data);

/**
 * Hook para exportar operações com o servidor (criar disciplinas, editar disciplinas, listar todas as disciplinas e pegar detalhes de
 * uma disciplina específica).
 * 
 * Exporta hooks para evitar a "lei de hooks" do React.
 */
export const useDisciplinas = () => {
  const queryClient = useQueryClient();

  const useGetDisciplina = (id: number) => useQuery({
    queryKey: ['disciplinas', id],
    queryFn: () => fetchDisciplina(id),
  });

  const useGetDisciplinas = () => useQuery({
    queryKey: ['disciplinas'],
    queryFn: fetchDisciplinas,
  });

  const useCreateDisciplina = () => useMutation({
    mutationFn: createDisciplina,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['disciplinas'] }),
  });

  const useDeleteDisciplina = () => useMutation({
    mutationFn: deleteDisciplina,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['disciplinas'] }),
  });

  const useUpdateDisciplina = (id: number) => useMutation({
    mutationFn: (obj: any) => updateDisciplina(id, obj),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['disciplinas'] }),
  });

  return {
    useGetDisciplina,
    useGetDisciplinas,
    useCreateDisciplina,
    useDeleteDisciplina,
    useUpdateDisciplina,
  };
}
