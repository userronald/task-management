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
      <div className="p-8 flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome to ITask
        </h1>
        <p className="text-lg text-gray-300 text-center mb-8">
          Track your tasks & projects seamlessly. Stay organized, stay ahead!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Tasks Card */}
  <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300 w-72">
    <h2 className="text-2xl font-semibold text-blue-400">Tasks </h2>
    <p className="mt-2 text-gray-300">Manage your tasks efficiently.</p>
    <div className="mt-4 space-y-1 text-gray-200">
      <p> To-Do: <span className="font-bold text-yellow-400">{pendingTasks}</span></p>
      <p> In Progress: <span className="font-bold text-blue-400">{inProgressTasks}</span></p>
      <p> Completed: <span className="font-bold text-green-400">{completedTasks}</span></p>
      <p> Review: <span className="font-bold text-purple-400">{reviewTasks}</span></p>
    </div>
    
  </div>

  {/* Projects Card */}
  <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300 w-72">
    <h2 className="text-2xl font-semibold text-green-400">Projects </h2>
    <p className="mt-2 text-gray-300">Track your projects easily.</p>
    <div className="mt-4 space-y-1 text-gray-200">
      <p>To-Do: <span className="font-bold text-yellow-400">{pendingProjects}</span></p>
      <p>In Progress: <span className="font-bold text-blue-400">{inProgressProjects}</span></p>
      <p>Completed: <span className="font-bold text-green-400">{completedProjects}</span></p>
      <p>Review: <span className="font-bold text-purple-400">{reviewProjects}</span></p>
    </div>
    
  </div>
</div>

      </div>
    </>
  );
};

export default HomeDashboard;
