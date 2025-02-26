import { useState,useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Draggable } from "../../draggable";
import { Droppable } from "../../droppable";
import { ITask } from "../../types";
import Form from "../forms/form";
import { v4 as uuidv4 } from "uuid";

const HomeDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ITask | null>(null);

  const [columns, setColumns] = useState({
    todo: { title: "To Do", items: [] as ITask[] },
    inProgress: { title: "In Progress", items: [] as ITask[] },
    review: { title: "Review", items: [] as ITask[] },
    completed: { title: "Completed", items: [] as ITask[] },
  });

  // Add or Edit Task Function
  const handleAddTask = (
    title: string,
    description: string,
    deadline: string,
    priority: string
  ) => {
    const newTask: ITask = {
      id: editTaskId || uuidv4(),
      title,
      description,
      deadline,
      priority,
      tags: [],
    };

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };

      if (editTaskId) {
        // Edit existing task
        Object.keys(updatedColumns).forEach((columnKey) => {
          updatedColumns[columnKey as keyof typeof updatedColumns].items =
            updatedColumns[columnKey as keyof typeof updatedColumns].items.map(
              (task) =>
                task.id === editTaskId ? { ...task, ...newTask } : task
            );
        });
      } else {
        // Add a new task
        updatedColumns.todo.items = [...updatedColumns.todo.items, newTask];
      }

      return updatedColumns;
    });

    setEditTaskId(null);
    setFormData(null);
    setShowForm(false);
  };

  // Edit Task Function
  const handleEditTask = (task: ITask) => {
     console.log("Editing task:", task);
    setEditTaskId(task.id);
    setFormData(task); // Store existing task data
    setShowForm(true);
  };

  // Delete Task Function
  const handleDeleteTask = (taskId: string) => {
    console.log("Deleting task with ID:", taskId); // Check the task ID
    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };
      Object.keys(updatedColumns).forEach((columnKey) => {
        updatedColumns[columnKey as keyof typeof updatedColumns].items =
          updatedColumns[columnKey as keyof typeof updatedColumns].items.filter(
            (task) => task.id !== taskId
          );
      });
      console.log("Updated columns:", updatedColumns); // Check the state after deletion
      return updatedColumns;
    });
  };

  // Handle Drag and Drop
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

    if (sourceColumnKey === destinationColumnKey) {
      const columnTasks = [...columns[sourceColumnKey].items];
      const oldIndex = columnTasks.findIndex((task) => task.id === active.id);
      const newIndex = columnTasks.findIndex((task) => task.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
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
        onClick={() => {
          setShowForm(true);
          setEditTaskId(null);
          setFormData(null);
        }}
        className="h-[40px] w-[120px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-orange-500 hover:ring-2"
      >
        Add Task
      </button>

      {showForm && (
        <Form
          onSubmit={handleAddTask}
          initialTitle={formData?.title || ""}
          initialDescription={formData?.description || ""}
          initialDeadline={formData?.deadline || ""}
          initialPriority={formData?.priority || ""}
        />
      )}

      <div className="flex gap-4">
        {Object.keys(columns).map((columnKey) => {
          const column = columns[columnKey as keyof typeof columns];

          return (
            <Droppable key={columnKey} id={columnKey}>
              <div className="h-[300px] w-[230px] p-2 border rounded-md">
                <h3 className="font-bold">{column.title}</h3>

                <SortableContext items={column.items.map((task) => task.id)}>
                  <ul className="task-list mt-4">
                    {column.items.map((task) => (
                      <li
                        key={task.id}
                        className="border border-solid rounded-lg p-2 border-orange-500 cursor-pointer z-10"
                      >
                        <Draggable id={task.id}>
                          <div>
                            <h2 className="font-semibold">{task.title}</h2>
                            <p>{task.description}</p>
                            <p className="text-sm text-gray-500">
                              {task.priority}
                            </p>
                            <p className="text-xs text-gray-400">
                              {task.deadline}
                            </p>
                          </div>
                        </Draggable>

                        {/* Fix: Click handlers should work properly now */}
                        <button
                          onClick={() => {
                            console.log("Edit task clicked", task.id); // Log the task ID
                            handleEditTask(task);
                          }}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            console.log("Delete task clicked", task.id); // Log the task ID
                            handleDeleteTask(task.id);
                          }}
                          className="text-red-500 hover:underline ml-2"
                        >
                          Delete
                        </button>
                      </li>
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
