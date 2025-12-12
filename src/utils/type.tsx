


export type TodoAction =
  | { type: "ADD_BOARD"; payload: { id: string; title: string } }
  | { type: "DELETE_BOARD"; payload: { id: string } }
  | { type: "RENAME_BOARD"; payload: { id: string; title: string } }
  | {
      type: "ADD_TASK"
      payload: { boardId: string; task: Task }
    }
  | {
      type: "UPDATE_TASK"
      payload: { boardId: string; taskId: string; updates: Partial<Task> }
    }
  | {
      type: "DELETE_TASK"
      payload: { boardId: string; taskId: string }
    }
  | {
      type: "ADD_SUBTASK"
      payload: { boardId: string; taskId: string; subtaskTitle: string }
    }
  | {
      type: "DELETE_SUBTASK"
      payload: { boardId: string; taskId: string; subtaskId: string }
    }| {
      type: "TOGGLE_TASK"
      payload: { boardId: string; taskId: string; subtaskId: string }
    }


export interface TodoContextType {
  state: Board[];
  dispatch: React.Dispatch<TodoAction>;
}

// src/types.ts
export type Status = "todo" | "in-progress" | "done";

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string; // or string | null if you prefer null allowed
  status: Status;
  boardId?: string;
  subtasks: Subtask[];
  // add other fields you use: type? boardTitle? etc.
}

export interface Board {
  id: string;
  title: string;
  tasks: Task[];
}
export interface TaskDetailProps {
  task: Task;
  trigger?: React.ReactNode;
  boardId: string;
}