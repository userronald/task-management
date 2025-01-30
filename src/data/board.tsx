import {v4 as uuidv4} from"uuid";
import { Columns } from "../types";
import { getRandomColors } from "../helpers/getrandomColors";


export const Board: Columns = {
  backlog: {
    name: "Backlog",
    items: [
      {
        id: uuidv4(),
        title: "Admin panel Front-end",
        description: "Lorem Ipsum olor site amen..",
        priority: "medium",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "lorem ipsum olor sit amen..",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Back", ...getRandomColors() },
        ],
      },
    ],
  },

  pending: {
    name: "Pending",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum olor sinte amen...",
        priority: "high",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum olor sinte amen...",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },

  todo: {
    name: "To Do",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum olor sinte amen...",
        priority: "medium",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },

  doing: {
    name: "Doing",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum olor sinte amen...",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum olor sinte amen...",
        priority: "medium",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },

  done: {
    name: "Done",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum olor sinte amen...",
        priority: "high",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
};