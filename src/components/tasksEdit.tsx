import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTodo } from "@/context/TodoContext"
import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"
import type { TaskDetailProps,Status } from "../utils/type";

export function TaskDetail({ task, trigger, boardId }:TaskDetailProps) {
  const { dispatch } = useTodo()

  // Controlled form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<Status>("todo")
  const [newSubtask, setNewSubtask] = useState("")
   const [open, setOpen] = useState(false);

  // Sync with external task whenever it changes
  useEffect(() => {
    if(open){
      setTitle(task.title || "")
    setDescription(task.description || "")
    setStatus(task.status || "todo")
    setNewSubtask("") 
    }
    
  }, [open])

  // Toggle subtask checkbox
  const toggleSubtask = (id:string) => {
    dispatch({
      type: "TOGGLE_TASK",
      payload: { boardId, taskId: task.id, subtaskId: id },
    })
  }

  // Delete a subtask
  const deleteSubtask = (subtaskId:string) => {
    dispatch({
      type: "DELETE_SUBTASK",
      payload: { boardId, taskId: task.id, subtaskId },
    });
  };

  // Add a new subtask
  const addSubtask = () => {
    if (!newSubtask.trim()) return;

    dispatch({
      type: "ADD_SUBTASK",
      payload: {
        boardId,
        taskId: task.id,
        subtaskTitle: newSubtask.trim(),
      },
    });

    setNewSubtask("");
  };

  // Save the main task fields
  const handleSave = () => {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        boardId,
        taskId: task.id,
        updates: {
          title: title.trim(),
          description: description.trim() || '',
          status,
        },
      },
    });
  };

  const handleDeleteTask = () => {
    if (confirm("Delete this task permanently?")) {
      dispatch({
        type: "DELETE_TASK",
        payload: { boardId, taskId: task.id },
      });
    }
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Task</DialogTitle>
          <DialogDescription>Make changes and click save when done.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">

          {/* Title */}
          <div>
            <Label className="mb-3">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Description */}
          <div>
            <Label className="mb-3">Description (optional)</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Add details..."
              className="w-full rounded-lg border border-gray-300 bg-background px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <Label className="mb-3">Status</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Subtasks */}
          <div className="space-y-4">
            <Label>
              Subtasks ({task.subtasks.filter((s) => s.done).length} of{" "}
              {task.subtasks.length})
            </Label>

            {/* Subtask list */}
            <div className="space-y-2">
              {task.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-3 rounded-lg bg-muted p-3"
                >
                  <input
                    type="checkbox"
                    checked={subtask.done}
                    onChange={() => toggleSubtask(subtask.id)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600"
                  />

                  <span
                    className={`flex-1 ${
                      subtask.done ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {subtask.title}
                  </span>

                  <button
                    onClick={() => deleteSubtask(subtask.id)}
                    className="text-[#ef476f] hover:bg-red-100 dark:hover:bg-red-900/30 p-1 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Subtask */}
            <div className="flex gap-2">
              <Input
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSubtask()}
                placeholder="New subtask..."
                className="flex-1"
              />
              <Button
                onClick={addSubtask}
                size="icon"
                className="bg-[#ef476f] hover:bg-[#b41e41]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button className="bg-[#ef476f] hover:bg-[#b41e41]" onClick={handleDeleteTask}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete Task
          </Button>

          <div className="flex gap-3 ml-auto">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                className="bg-[#118ab2ff] hover:bg-[#073b4cff]"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
