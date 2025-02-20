import { ColumnDef } from "@tanstack/react-table";
import AcoesDisciplina from "../AcoesDisciplinas";

export type Disciplina = {
  CodigoDisciplina: number,
  Nome: string,
  Creditos: number,
  SemestreRecomendado: number,
  AnoRecomendado: number,
  OfertaSemestre: 'par' | 'impar' | 'ambos',
  CodigoCurso: number,
};

export const columns: ColumnDef<Disciplina>[] = [
  {
    accessorKey: 'CodigoDisciplina',
    header: 'Código',
  },
  {
    accessorKey: 'Nome',
    header: 'Nome',
  },
  {
    accessorKey: 'Creditos',
    header: 'Créditos',
  },
  {
    accessorKey: 'SemestreRecomendado',
    header: 'Semestre Recomendado',
  }, 
  {
    accessorKey: 'AnoRecomendado',
    header: 'Ano Recomendado',
  },
  {
    accessorKey: 'OfertaSemestre',
    header: "Tipo de oferta de semestre",
    cell: (cellCtx) => {
      const v = cellCtx.getValue();

      if (v === 'par') {
        return <p>Par</p>
      };
      if (v === 'impar') {
        return <p>Ímpar</p>
      };

      return <p>Ambos</p>;
    }
  },
  {
    accessorKey: 'CodigoCurso',
    header: 'Código do Curso',
  },
  {
    id: "actions",
    header: "Ações",
    cell: (cellCtx) => <AcoesDisciplina row={cellCtx.row.original} />,
  },
]