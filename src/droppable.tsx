import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export function Droppable(props: { id: string; children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    borderRadius: "12px", // Smooth rounded corners
    minHeight: "300px",
    padding: "12px",
    transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transition
    boxShadow: isOver
      ? "0px 4px 10px rgba(255, 165, 0, 0.4)"
      : "0px 2px 6px rgba(0, 0, 0, 0.1)", // Soft shadow
    backgroundColor: isOver ? "#111827" : "#111827",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
