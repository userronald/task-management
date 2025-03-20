import { useEffect, useState} from "react";

interface FormProps{
    onSubmit:(
        title:string,
        description:string,
        deadline:string,
        priority:string
    )=> void;
    initialTitle?:string;
    initialDescription?:string;
    initialDeadline?:string;
    initialPriority?:string;    
}

const Form =({
    onSubmit,
    initialTitle ="",
    initialDescription ="",
    initialDeadline= "",
    initialPriority = "",

        }:FormProps)=>{
   
             const[title,setTitle]=useState(initialTitle);
             const[description,setDescription]=useState(initialDescription);
             const[deadline,setDeadline]=useState(initialDeadline);
             const [priority,setPriority]=useState(initialPriority);



    useEffect(()=>{
        setTitle(initialTitle);
        setDescription(initialDescription);
        setDeadline(initialDeadline);
        setPriority(initialPriority);

    },[initialTitle,initialDescription,initialDeadline,initialPriority]);


    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        onSubmit(title,description,deadline,priority);
        setTitle("");
        setDescription("");
        setDeadline("");
        setPriority("");    
    }

 
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-orange-500 hover:ring-2 p-6  shadow-lg max-w-sm w-full">
            <div className="flex flex-col">
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-3 py-2 bg-black rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description">Description: </label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-3 py-2 h-32 bg-black rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="dueDate">Due Date: </label>
              <input
                type="date"
                id="dueDate"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="px-3 py-2 bg-black rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="priority">Priority: </label>
              <select
                name="priority"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-3 py-2 bg-black rounded-lg border border-gray-500 focus:border-orange-500 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
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
}

export default Form;
