import { useDrag, useDrop } from "react-dnd";
const useRowDrag = (
  rowId: string,
  moveRow: (draggedId: string, targetId: string) => void
) => {
  const [, drag] = useDrag({
    type: "row",
    item: { rowId },
  });

  const [, drop] = useDrop({
    accept: "row",
    hover: (item: { rowId: string }) => {
      if (item.rowId !== rowId) {
        moveRow(item.rowId, rowId);
      }
    },
  });

  return { drag, drop };
};

export default useRowDrag;
