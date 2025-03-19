import { useState,useEffect } from "react";
import { ITask } from "../../types";
import { ITaskProjects } from "../../types/projects";




const HomeDashboard = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [projects, setProjects] = useState<ITaskProjects []>([]);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);

        if (parsedTasks && typeof parsedTasks === "object") {
          const allTasks: ITask[] = [
            ...parsedTasks.todo.items.map((task: ITask) => ({
              ...task,
              status: "To Do",
            })),
            ...parsedTasks.inProgress.items.map((task: ITask) => ({
              ...task,
              status: "In Progress",
            })),
            ...parsedTasks.completed.items.map((task: ITask) => ({
              ...task,
              status: "Completed",
            })),
            ...parsedTasks.review.items.map((task: ITask) => ({
              ...task,
              status: "Review",
            })),
          ];
          setTasks(allTasks);
        } else {
          console.error("Invalid tasks structure in localStorage");
        }
      }
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
    }

    try {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);

        if (parsedProjects && typeof parsedProjects === "object") {
          const allProjects: ITaskProjects[] = [
            ...parsedProjects.todo.items.map((project: ITaskProjects) => ({
              ...project,
              status: "To Do",
            })),
            ...parsedProjects.inProgress.items.map(
              (project: ITaskProjects) => ({
                ...project,
                status: "In Progress",
              })
            ),
            ...parsedProjects.completed.items.map((project: ITaskProjects) => ({
              ...project,
              status: "Completed",
            })),
            ...parsedProjects.review.items.map((project: ITaskProjects) => ({
              ...project,
              status: "Review",
            })),
          ];
          setProjects(allProjects);
        } else {
          console.error("Invalid projects structure in localStorage");
        }
      }
    } catch (error) {
      console.error("Error parsing projects from localStorage:", error);
    }
  }, []);



  const pendingTasks = tasks.filter((task) => task.status === "To Do").length;
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const reviewTasks = tasks.filter((task) => task.status === "Review").length;

  const pendingProjects =projects.filter((project) => project.status === "To Do").length;
  const inProgressProjects = projects.filter((project) => project.status === "In Progress").length;
  const completedProjects = projects.filter((project) => project.status === "Completed").length;
  const reviewProjects = projects.filter((project) => project.status === "Review").length;


  return (
    <>
      <h1>Welcoome to ITask</h1>
      <p>A Web Application tool to create and manage tasks... </p>

      <div className="p-8 flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <div className="grid grid-cols-2 gap-6">
          {/* Tasks Card */}
          <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg w-64">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <p className="mt-2">Manage your tasks efficiently.</p>
            <p className="mt-2"> Pending: {pendingTasks}</p>
            <p className="mt-1"> In Progress: {inProgressTasks}</p>
            <p className="mt-1"> Completed: {completedTasks}</p>
            <p className="mt-1"> Review: {reviewTasks}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 rounded">
              Go to Tasks
            </button>
          </div>

          {/* Projects Card */}
          <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg w-64">
            <h2 className="text-xl font-semibold">Projects</h2>
            <p className="mt-2">Track your projects easily.</p>
            <p className="mt-2"> Pending: {pendingProjects}</p>
            <p className="mt-1"> In Progress: {inProgressProjects}</p>
            <p className="mt-1"> Completed: {completedProjects}</p>
            <p className="mt-1"> Review: {reviewProjects}</p>
            <button className="mt-4 px-4 py-2 bg-green-500 rounded">
              Go to Projects
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
