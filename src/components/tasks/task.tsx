import { useState, useEffect } from "react";
import { DndContext, closestCorners,PointerSensor,useSensor,useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Draggable } from "../../draggable";
import { Droppable } from "../../droppable";
import { ITask } from "../../types";
import Form from "../forms/form";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../modal";
import { IoPencilOutline, IoTrashOutline, IoEyeOutline } from "react-icons/io5";


const TaskBoard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ITask | null>(null);
  const [openTaskDetail, setOpenTaskDetail] = useState<ITask | null>(null);

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
      status: "To Do | In Progress | Completed| Review",
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

  // open the tasks in modal popup
  const viewTask = (task: ITask) => {
    console.log("Opening Task Modal :", task);
    setOpenTaskDetail(task);
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

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setColumns(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(columns));
  }, [columns]);

// function for drag and drop in mobile deveice

const sensors= useSensors(
  useSensor(PointerSensor,{
    activationConstraint:{
      distance:5,
    }
  })
)


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
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
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

      <div className="flex gap-4 p-4">
        {Object.keys(columns).map((columnKey) => {
          const column = columns[columnKey as keyof typeof columns];

          return (
            <Droppable key={columnKey} id={columnKey}>
              <div className="outline-none h-[300px] w-[250px] rounded-md p-0  ">
                <h3 className="font-bold text-center">{column.title}</h3>

                <div
                  className={`mt-2 flex-1 overflow-y-auto overflow-x-hidden`}
                  style={{ maxHeight: "260px" }} // Ensure scroll appears only when needed
                >
                  <SortableContext items={column.items.map((task) => task.id)}>
                    <ul
                      className="task-list mt-4 justify-items-center
"
                    >
                      {column.items.map((task) => (
                        <Draggable id={task.id}>
                          <li
                            key={task.id}
                            className="border border-gray-300 rounded-lg p-2 shadow-sm cursor-pointer z-10 w-[200px]"
                            onClick={() => viewTask(task)}
                          >
                            <div>
                              <h2 className="font-semibold">{task.title}</h2>
                              <p className="truncate w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                                {task.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {task.priority}
                              </p>
                              <p className="text-xs text-gray-400">
                                {task.deadline}
                              </p>
                            </div>

                            {/* Icons container */}
                            <div className="flex justify-between items-center mt-2">
                              {/* Left side: Edit and Delete icons */}
                              <div className="flex space-x-2">
                                {/* Fix: Click handlers should work properly now */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation(); // stops triggering the modal popup while clicking this edit button
                                    console.log("Edit task clicked", task.id); // Log the task ID
                                    handleEditTask(task);
                                  }}
                                  className="text-blue-500 hover:underline"
                                >
                                  <IoPencilOutline />
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation(); // stops triggering the modal popup when this delete button is clicked
                                    console.log("Delete task clicked", task.id); // Log the task ID
                                    handleDeleteTask(task.id);
                                  }}
                                  className="text-red-500 hover:underline ml-2"
                                >
                                  <IoTrashOutline />
                                </button>
                              </div>
                              <div>
                                <IoEyeOutline />
                              </div>
                            </div>
                          </li>
                        </Draggable>
                      ))}
                    </ul>
                  </SortableContext>
                </div>
              </div>
            </Droppable>
          );
        })}
      </div>
      {openTaskDetail && (
        <Modal task={openTaskDetail} onClose={() => setOpenTaskDetail(null)} />
      )}
    </DndContext>
  );
};

export default TaskBoard;
