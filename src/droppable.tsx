import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export function Droppable(props: { id: string; children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    border: isOver ? "2px solid green" : "2px solid lightgray",
    minHeight:"200px",
    padding:"10px"
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
