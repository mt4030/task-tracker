import { AddTaskDialog  } from "@/components/form";
import { Link, useParams } from "react-router-dom";
import { useTodo } from "@/context/TodoContext";
import { useMemo } from "react";

import type { Task, Subtask } from "../utils/type";
const Board = () => {
  const { id } = useParams();
  const { state } = useTodo();

  const board = state.find((b) => b.id === id);

  if (!board)
    return (
      <div className="flex items-center justify-center h-screen text-[#E5F0FF] text-xl font-semibold">
        Board not found
      </div>
    );

  // Filter tasks by status
  const todoTasks =useMemo(()=>{
    return board.tasks?.filter((t) => t.status === "todo") || [];
  },[board.tasks]) 
  const inProgressTasks =useMemo(()=>{
return board.tasks?.filter((t) => t.status === "in-progress") || [];
  },[board.tasks]) 
  const doneTasks =useMemo(()=>{
return board.tasks?.filter((t) => t.status === "done") || [];
  },[board.tasks]) 

 const renderTask = (task:Task) => (
  <Link key={task.id} to={`task/${task.id}`}> 
      <div className="bg-[#E5F0FF]  p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer mb-4">
        <h2 className="font-semibold text-gray-900 mb-1 wrap-break-word whitespace-normal">{task.title}</h2>
        <p className="text-sm text-gray-500 mb-2 overflow-clip">{task.description || "No description"}</p>
        <p className="text-xs text-gray-400 mb-2">
          {task.subtasks.filter((s) => !s.done).length} subtasks left
        </p>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="h-2 rounded-full bg-[#0066FF]"
            style={{
              width: `${
                (task.subtasks.filter((s:Subtask) => s.done).length / task.subtasks.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
        </Link>
  
);


  return (
    <div className=" min-h-screen w-full md:p-10 flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold text-[#E5F0FF] mb-12 ">Board Name : {board.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* TODO Column */}
        <div className="bg-[#ef476e29] p-4 rounded-lg shadow-lg">
          <h2 className="font-bold text-[#ef476f] mb-4 text-lg">To do</h2>
          {todoTasks.map(renderTask)}
        </div>

        {/* In Progress Column */}
        <div className="bg-[#ffd16618] p-4 rounded-lg shadow-lg">
          <h2 className="font-bold text-[#f9c140] mb-4 text-lg ">In Progress</h2>
          {inProgressTasks.map(renderTask)}
        </div>

        {/* Done Column */}
        <div className="bg-[#06d69e18] p-4 rounded-lg shadow-lg">
          <h2 className="font-bold text-[#00ffbb] mb-4 text-lg">Done</h2>
          {doneTasks.map(renderTask)}
        </div>
      </div>
 <div className="flex justify-between mt-6" >
         <Link className="text-[#0066FF] hover:underline mt-6" to={'/home'}>
 ← Back to Home
         </Link>
      
     <div className="mt-6">
        <AddTaskDialog boardId={board.id} />
      </div></div>
      
    </div>
  );
};

export default Board;
