import { RouteObject } from "react-router-dom";
import Mainlayout from "../layouts/layout";
import HomeDashboard from "../homeDashboard/dashboard";
import Project from "../projects/project";
import TaskBoard from "../tasks/task";

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
        element: <TaskBoard />,
      },
    ],
  },
];

export default routes;