import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

export function Draggable(props: { id:string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px,0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className=" p-2 mb-2 rounded-lg cursor-pointer">
      {props.children}
    </div>
  );
}
