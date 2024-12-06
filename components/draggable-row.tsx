import { flexRender, Row } from "@tanstack/react-table";
import { useDrag, useDrop } from "react-dnd";
import { Row as TableRow, Cell } from "./ui/table";
import Each from "./widgets/each";
import { CustomFile } from "@/types/filedata.type";
const ITEM_TYPE = "ROW";

const DraggableRow = ({
  row,
  handleDrop,
}: {
  row: Row<CustomFile>;
  handleDrop: (id: string) => void;
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPE,
    item: { id: row.original.title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<{ id: string }>({
    accept: ITEM_TYPE,
    drop: (item) => {
      handleDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const isCollection = row.original.isCollection;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowRef: any = isCollection ? dropRef : dragRef;
  return (
    <TableRow
      ref={rowRef}
      className={
        isDragging
          ? "bg-gray-300"
          : `${isCollection ? "last-of-type:bg-zinc-950/10" : ""}`
      }
    >
      <Each
        of={row.getVisibleCells()}
        render={(cell) => (
          <Cell
            key={cell.id}
            {...{
              style: {
                width: cell.column.getSize(),
              },
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Cell>
        )}
      />
    </TableRow>
  );
};

export default DraggableRow;
