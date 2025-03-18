export type ITask = {
  status: string;
  id: string;
  title: string;
  description: string;
  priority: string;
  deadline: string;
  image?: string;
  alt?: string;
  tags: {
    title: string;
    bg: string;
    text: string;
  }[];
};

type Column = {
  name: string;
  items: ITask[];
};

export type Columns = {
  [key: string]: Column;
};
