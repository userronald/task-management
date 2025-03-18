export type ITaskProjects = {
  status: string;
  id: string;
  projectTitle: string;
  requirements: string;
  members: string;
  deadline: string;
  image?: string;
  alt?: string;
  tags: {
    title: string;
    bg: string;
    text: string;
  }[];
};

type Project = {
  name: string;
  items: ITaskProjects[];
};

export type Projects = {
  [key: string]: Project;
};
