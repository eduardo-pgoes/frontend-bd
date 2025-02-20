import { DialogAtualizaDisciplina } from "./DialogAtualizaDisciplina";
import { DialogDeletaDisciplina } from "./DialogDeletaDisciplina";

export default function AcoesDisciplina({
  row,
} : {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any,
}) {
  console.log(row);

  return (
    <div className="flex items-center justify-end gap-2">
      <DialogDeletaDisciplina cod={row.CodigoDisciplina} />
      <DialogAtualizaDisciplina row={row} />
    </div>
  );
}