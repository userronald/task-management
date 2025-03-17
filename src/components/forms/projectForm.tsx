import { useEffect, useState} from "react";

interface FormProps {
  onSubmit: (
    projectTitle: string,
    requirements: string,
    members: string
  ) => void;
  initialProjectTitle?: string;
  initialRequirements?: string;
  initialMembers?: string;
  
}

const ProjectForm = ({
  onSubmit,
  initialProjectTitle = "",
  initialRequirements = "",
  initialMembers = "",
  
}: FormProps) => {
  const [projectTitle, setProjectTitle] = useState(initialProjectTitle);
  const [requirements, setRequirements] = useState(initialRequirements);
  const [members, setMembers] = useState(initialMembers);
  

  useEffect(() => {
    setProjectTitle(initialProjectTitle);
    setRequirements(initialRequirements);
    setMembers(initialMembers);
  }, [initialProjectTitle, initialRequirements, initialMembers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(projectTitle, requirements, members);
    setProjectTitle("");
    setRequirements("");
    setMembers("");
   
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-orange-500 hover:ring-2 p-6  shadow-lg max-w-sm w-full">
          <div className="flex flex-col">
            <label htmlFor="projectTitle"> Project Title: </label>
            <input
              type="text"
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="px-3 py-2 bg-black rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="requirements">Requirements: </label>
            <textarea
              name="requirements"
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="px-3 py-2 h-64 bg-black rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label htmlFor="dueDate">Members: </label>
            <input
              type="text"
              id="members"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              className="px-3 py-2 bg-black rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ProjectForm;
