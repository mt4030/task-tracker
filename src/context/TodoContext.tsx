import { createContext,useContext, useEffect, useReducer } from "react";
import { initBoards } from "../data/data";
import { v4 as uuid } from 'uuid';

import type { ReactNode } from "react";
import type { Board,TodoAction,TodoContextType,Status} from "../utils/type";





export const TodoContext=createContext<TodoContextType|null>(null)


///context function

const Reducerfunction = (state:Board[], action:TodoAction) => {
  switch (action.type) {
    /// board crud
    case "ADD_BOARD": {
      const newBoard = {
        id: action.payload.id,
        title: action.payload.title,
        tasks: []
      };
      return [...state, newBoard];
    }

    case "DELETE_BOARD": {
      const { id } = action.payload
      return state.filter(board => board.id !== id);
    }

    case "RENAME_BOARD": {
      return state.map(board =>
        board.id === action.payload.id
          ? { ...board, title: action.payload.title }
          : board
      );
    }

    // ----------------------
    // TASK CRUD
    // ----------------------

    case "ADD_TASK": {
      return state.map(board =>
        board.id === action.payload.boardId
          ? { ...board, tasks: [...board.tasks, action.payload.task] }
          : board
      );
    }

    case "UPDATE_TASK": {
      const { boardId, taskId, updates } = action.payload
      return state.map(board =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map(task =>
                task.id === taskId
                  ? { ...task, ...updates }
                  : task
              )
            }
          : board
      );
    }

    case "DELETE_TASK": {
      return state.map(board =>
        board.id === action.payload.boardId
          ? {
              ...board,
              tasks: board.tasks.filter(
                task => task.id !== action.payload.taskId
              )
            }
          : board
      );
    }
case "ADD_SUBTASK": {
  const { boardId, taskId, subtaskTitle } = action.payload

  return state.map((board) =>
    board.id === boardId
      ? {
          ...board,
          tasks: board.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: [
                    ...task.subtasks,
                    {
                      id: uuid(),
                      title: subtaskTitle,
                      done: false,
                    },
                  ],
                }
              : task
          ),
        }
      : board
  )
}

case "DELETE_SUBTASK": {
  const { boardId, taskId, subtaskId } = action.payload

  return state.map((board) =>
    board.id === boardId
      ? {
          ...board,
          tasks: board.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.filter((st) => st.id !== subtaskId),
                }
              : task
          ),
        }
      : board
  )
}


case 'TOGGLE_TASK':{
    const { boardId, taskId, subtaskId } = action.payload 
    return state.map(board=>
      board.id===boardId?{...board,tasks:board.tasks.map(task=>
task.id===taskId?(()=>{
  const updatedSubtasks =task.subtasks.map(sub=>
    sub.id===subtaskId?{...sub,done:!sub.done}:sub
  )
  const calculatedStatus:Status =updatedSubtasks.every(s=>s.done)?'done':updatedSubtasks.every(s=>!s.done)?'todo':'in-progress';
   return { ...task, subtasks: updatedSubtasks, status: calculatedStatus };
})():task)}:board)
}
    default:
      return state;
  }
};




//provider
export default function Todoprovider({children}:{ children: ReactNode }){

const [state,dispatch]=useReducer(Reducerfunction,initBoards,()=>{
 /// Load from LocalStorage 
  const saved = localStorage.getItem("boards");
   return saved ? JSON.parse(saved) : initBoards;
})

///Sync to LocalStorage whenever state changes
useEffect(()=>{
   localStorage.setItem("boards", JSON.stringify(state));
},[state])



const TodoData={
state,dispatch
}
    return(
        <TodoContext.Provider value={TodoData}>
        {children}
        </TodoContext.Provider>
    )
}


//////custom hook
export const useTodo=()=>{
const context=useContext(TodoContext)
if(!context){
throw new Error ('error in custom hook of context')
}
return context
} 