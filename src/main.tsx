
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import Modal from "react-modal";


Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
);
