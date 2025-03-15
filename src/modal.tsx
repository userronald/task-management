
import { ITask } from "./types";

interface ModalProps{
    task:ITask;
    onClose:()=>void;
}

const Modal = ({ task ,onClose}:ModalProps) => {
  if (!task) return null; // Don't render if no task is selected

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-orange-500 hover:ring-2 p-6  shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p className="mt-2">{task.description}</p>
        <p className="mt-2 text-sm text-gray-500">Priority: {task.priority}</p>
        <p className="mt-2 text-sm text-gray-500">Deadline: {task.deadline}</p>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Closeed
        </button>
      </div>
    </div>
  );
};

export default Modal;
