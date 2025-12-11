import { TaskDetail  } from "@/components/tasksEdit";
import {   useParams,useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTodo } from "@/context/TodoContext";

const TaskDiPage = () => {
const { id, taskId } = useParams();
const {state ,dispatch}=useTodo()
////
const navigate = useNavigate();
// Find the board
  const board = state.find(b => b.id === id);
  if (!board) return <div>Board not found</div>;
  // Find the task inside the board
  const task = board.tasks.find(t => t.id === taskId);
  if (!task) return <div>Task not found</div>;

  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.filter((s) => s.done).length;
  const progress = totalSubtasks ? (completedSubtasks / totalSubtasks) * 100 : 0;




const handleToggle=(subtaskId)=>{
dispatch({type:'TOGGLE_TASK', payload:{boardId:id,taskId,subtaskId}})

}



  return (
    <div className="p-6 md:p-10  min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 wrap-break-word whitespace-normal">{task.title}</h1>
        <p className="text-gray-600 mb-6 wrap-break-word whitespace-normal">{task.description || "No description available"}</p>

        {/* Progress Bar */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">
            {completedSubtasks} of {totalSubtasks} subtasks completed
          </p>
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="h-3 rounded-full bg-[#118ab2ff] transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>



        {/* Subtasks */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg text-gray-800 mb-3">Subtasks</h2>
          <ul className="space-y-2">
            {task.subtasks.map((sub) => (
              <li
                key={sub.id}
                className={`flex items-center justify-between p-3 rounded border ${
                  sub.done
                    ? "bg-green-50 border-[#06d6a0] text-[#00a579] line-through"
                    : "bg-gray-100 border-gray-300 text-gray-800"
                }`}
              >

<input
                    type="checkbox"
                    checked={sub.done}
                    onChange={()=>handleToggle(sub.id)}
                    className="h-5 w-5 rounded border-gray-300 text-[#073b4cff]"
                  />
                
                {sub.title}
                <span className={`font-semibold ${sub.done ? "text-[#06d6a0]" : "text-gray-500"}`}>
                  {sub.done ? "Done" : "Pending"}
                </span>
              </li>
            ))}
          </ul>
        </div>


        <div className="flex justify-between mt-6" >
         
          <button className="text-[#118ab2ff] hover:underline" onClick={() => navigate(-1)}>
     ← Back to Tasks
          </button>
<TaskDetail
  task={task}
  boardId={id} 
  trigger={
    <Button className="bg-[#118ab2ff] hover:bg-[#073b4cff] text-white">Edit Task</Button>
  }
/>

        </div>
      </div>
    </div>
  );
};

export default TaskDiPage;
