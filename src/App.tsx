import { useRoutes } from "react-router-dom";
import routes from "./components/routes/route";

function App() {
 
   const element=useRoutes(routes);

  return (
    <>
    {element}
    </>
  );
}

export default App
