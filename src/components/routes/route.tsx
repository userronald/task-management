import { RouteObject } from "react-router-dom";
import Mainlayout from "../layouts/layout";
import HomeDashboard from "../homeDashboard/dashboard";
import Project from "../projects/project";
import Task from "../tasks/task";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <HomeDashboard />,
      },
      {
        path: "/projects",
        element: <Project />,
      },
      {
        path: "/tasks",
        element: <Task />,
      },
    ],
  },
];

export default routes;