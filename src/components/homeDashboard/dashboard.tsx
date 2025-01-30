import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Draggable } from "../../draggable";
import { Droppable } from "../../droppable";
import { ITask } from "../../types";
import Form from "../forms/form";
import { v4 as uuidv4 } from "uuid";

const HomeDashboard = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [columns, setColumns] = useState({
    todo: { title: "To Do", items: [] as ITask[] },
    inProgress: { title: "In Progress", items: [] as ITask[] },
    review: { title: "Review", items: [] as ITask[] },
    completed: { title: "Completed", items: [] as ITask[] },
  });

  const handleAddTask = (
    title: string,
    description: string,
    deadline: string,
    priority: string
  ) => {
    const newTask: ITask = {
      id: uuidv4(), // Unique ID
      title,
      description,
      deadline,
      priority,
      tags: [],
    };

    setTasks([...tasks, newTask]);

    setColumns((prevColumns) => ({
      ...prevColumns,
      todo: {
        ...prevColumns.todo,
        items: [...prevColumns.todo.items, newTask],
      },
    }));

    setShowForm(false);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumnKey = Object.keys(columns).find((key) =>
      columns[key as keyof typeof columns].items.some(
        (task) => task.id === active.id
      )
    ) as keyof typeof columns;

    const destinationColumnKey = over.id as keyof typeof columns;

    if (!sourceColumnKey || !destinationColumnKey) return;

    // If moving within the same column (sorting)
    if (sourceColumnKey === destinationColumnKey) {
      const columnTasks = [...columns[sourceColumnKey].items];
      const oldIndex = columnTasks.findIndex((task) => task.id === active.id);
      const newIndex = columnTasks.findIndex((task) => task.id === over.id);

      if (oldIndex !== newIndex) {
        setColumns((prevColumns) => ({
          ...prevColumns,
          [sourceColumnKey]: {
            ...prevColumns[sourceColumnKey],
            items: arrayMove(columnTasks, oldIndex, newIndex),
          },
        }));
      }
      return;
    }

    // If moving to another column
    const taskToMove = columns[sourceColumnKey].items.find(
      (task) => task.id === active.id
    );
    if (!taskToMove) return;

    setColumns((prevColumns) => ({
      ...prevColumns,
      [sourceColumnKey]: {
        ...prevColumns[sourceColumnKey],
        items: prevColumns[sourceColumnKey].items.filter(
          (task) => task.id !== active.id
        ),
      },
      [destinationColumnKey]: {
        ...prevColumns[destinationColumnKey],
        items: [...prevColumns[destinationColumnKey].items, taskToMove],
      },
    }));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <h1>Task Management</h1>

      <button
        onClick={() => setShowForm(true)}
        className="h-[40px] w-[120px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-orange-500 hover:ring-2"
      >
        Add Task
      </button>

      {showForm && <Form onSubmit={handleAddTask} />}

      <div className="flex gap-4">
        {Object.keys(columns).map((columnKey) => {
          const column = columns[columnKey as keyof typeof columns];

          return (
            <Droppable key={columnKey} id={columnKey}>
              <div className=" h-[500px] w-[250px] p-2 border rounded-md">
                <h3 className="font-bold">{column.title}</h3>

                <SortableContext items={column.items.map((task) => task.id)}>
                  <ul className="task-list mt-4">
                    {column.items.map((task) => (
                      <Draggable key={task.id} id={task.id}>
                        <li className="border border-solid rounded-lg p-2 border-orange-500 cursor-pointer z-10">
                          <h2 className="font-semibold">{task.title}</h2>
                          <p>{task.description}</p>
                          <p className="text-sm text-gray-500">
                            {task.priority}
                          </p>
                          <p className="text-xs text-gray-400">
                            {task.deadline}
                          </p>
                        </li>
                      </Draggable>
                    ))}
                  </ul>
                </SortableContext>
              </div>
            </Droppable>
          );
        })}
      </div>
    </DndContext>
  );
};

export default HomeDashboard;
