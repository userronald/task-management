import { useState, useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Draggable } from "../../draggable";
import { Droppable } from "../../droppable";
import { ITaskProjects } from "../../types/projects";
import ProjectForm from "../forms/projectForm";
import { v4 as uuidv4 } from "uuid";

const Project= () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [projectFormData, setProjectFormData] = useState<ITaskProjects | null>(null);

  const [projects, setProjects] = useState({
    todo: { title: "To Do", items: [] as ITaskProjects[] },
    inProgress: { title: "In Progress", items: [] as ITaskProjects[] },
    review: { title: "Review", items: [] as ITaskProjects[] },
    completed: { title: "Completed", items: [] as ITaskProjects[] },
  });

  // Add or Edit Project Function
  const handleAddProject = (
    projectTitle: string,
    requirements: string,
    members: string,
  
  ) => {
    const newProject: ITaskProjects = {
      id: editProjectId || uuidv4(),
      projectTitle,
      requirements,
      members,

      tags: [],
      deadline: "",
      status: "To Do | In Progress | Completed| Review",
    };

    setProjects((prevProjects) => {
      const updatedProjects = { ...prevProjects };

      if (editProjectId) {
        // Edit existing project
        Object.keys(updatedProjects).forEach((projectKey) => {
          updatedProjects[projectKey as keyof typeof updatedProjects].items =
            updatedProjects[projectKey as keyof typeof updatedProjects].items.map(
              (project) =>
                project.id === editProjectId ? { ...project, ...newProject } : project
            );
        });
      } else {
        // Add a new project
        updatedProjects.todo.items = [...updatedProjects.todo.items, newProject];
      }

      return updatedProjects;
    });

    setEditProjectId(null);
    setProjectFormData(null);
    setShowProjectForm(false);
  };

  // Edit project detail Function
  const handleEditProject = (project: ITaskProjects) => {
    console.log("Editing Project:", project);
    setEditProjectId(project.id);
    setProjectFormData(project); // Store existing task data
    setShowProjectForm(true);
  };

  // Delete project detail Function
  const handleDeleteProject = (projectId: string) => {
    console.log("Deleting task with ID:", projectId); // Check the task ID
    setProjects((prevProjects) => {
      const updatedProjects = { ...prevProjects };
      Object.keys(updatedProjects).forEach((projectKey) => {
        updatedProjects[projectKey as keyof typeof updatedProjects].items =
          updatedProjects[projectKey as keyof typeof updatedProjects].items.filter(
            (project) => project.id !== projectId
          );
      });
      console.log("Updated columns:", updatedProjects); // Check the state after deletion
      return updatedProjects;
    });
  };

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // Handle Drag and Drop
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const sourceProjectKey = Object.keys(projects).find((key) =>
      projects[key as keyof typeof projects].items.some(
        (project) => project.id === active.id
      )
    ) as keyof typeof projects;

    const destinationProjectKey = over.id as keyof typeof projects;

    if (!sourceProjectKey || !destinationProjectKey) return;

    if (sourceProjectKey === destinationProjectKey) {
      const projectDatas = [...projects[sourceProjectKey].items];
      const oldIndex = projectDatas.findIndex((project) => project.id === active.id);
      const newIndex = projectDatas.findIndex((project) => project.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setProjects((prevProjects) => ({
          ...prevProjects,
          [sourceProjectKey]: {
            ...prevProjects[sourceProjectKey],
            items: arrayMove(projectDatas, oldIndex, newIndex),
          },
        }));
      }
      return;
    }

    const projectToMove = projects[sourceProjectKey].items.find(
      (project) => project.id === active.id
    );
    if (!projectToMove) return;

    setProjects((prevProjects) => ({
      ...prevProjects,
      [sourceProjectKey]: {
        ...prevProjects[sourceProjectKey],
        items: prevProjects[sourceProjectKey].items.filter(
          (project) => project.id !== active.id
        ),
      },
      [destinationProjectKey]: {
        ...prevProjects[destinationProjectKey],
        items: [...prevProjects[destinationProjectKey].items, projectToMove],
      },
    }));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <h1>Projects</h1>

      <button
        onClick={() => {
          setShowProjectForm(true);
          setEditProjectId(null);
          setProjectFormData(null);
        }}
        className="h-[40px] w-[120px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-orange-500 hover:ring-2"
      >
        Create Project
      </button>

      {showProjectForm && (
        <ProjectForm
          onSubmit={handleAddProject}
          initialProjectTitle={projectFormData?.projectTitle || ""}
          initialRequirements={projectFormData?.requirements || ""}
          initialMembers={projectFormData?.members || ""}
          
        />
      )}

      <div className="flex gap-4">
        {Object.keys(projects).map((projectKey) => {
          const project = projects[projectKey as keyof typeof projects];

          return (
            <Droppable key={projectKey} id={projectKey}>
              <div className="h-[300px] w-[230px] p-2 border rounded-md">
                <h3 className="font-bold">{project.title}</h3>

                <SortableContext
                  items={project.items.map((project) => project.id)}
                >
                  <ul className="task-list mt-4">
                    {project.items.map((project) => (
                      <li
                        key={project.id}
                        className="border border-solid rounded-lg p-2 border-orange-500 cursor-pointer z-10"
                      >
                        <Draggable id={project.id}>
                          <div>
                            <h2 className="font-semibold">
                              {project.projectTitle}
                            </h2>
                            <p>{project.requirements}</p>
                            <p className="text-sm text-gray-500">
                              {project.members}
                            </p>
                            {/* <p className="text-xs text-gray-400">
                              {task.deadline}
                            </p> */}
                          </div>
                        </Draggable>

                        {/* Fix: Click handlers should work properly now */}
                        <button
                          onClick={() => {
                            console.log("Edit task clicked", project.id); // Log the task ID
                            handleEditProject(project);
                          }}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            console.log("Delete task clicked", project.id); // Log the task ID
                            handleDeleteProject(project.id);
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

export default Project;
