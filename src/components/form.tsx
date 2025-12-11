import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useTodo } from "@/context/TodoContext"
import { v4 as uuid } from "uuid"
import { Plus, X } from "lucide-react"
interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

interface FormState {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}


export function AddTaskDialog({ boardId }) {
  const { dispatch } = useTodo()

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    status: "todo",
    subtasks: [], 
  })

  const [subtaskInput, setSubtaskInput] = useState("")

  // ADD SUBTASK
  const addSubtask = () => {
    if (!subtaskInput.trim()) return

    setForm(prev => ({
      ...prev,
      subtasks: [
        ...prev.subtasks,
        {
          id: uuid(),
          title: subtaskInput.trim(),
          done: false,
        },
      ],
    }))
    setSubtaskInput("")
  }

  // DELETE SUBTASK
  const deleteSubtask = (id:string) => {
    setForm(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(s => s.id !== id),
    }))
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()

       dispatch({
      type: "ADD_TASK",
      payload: {
        boardId,
        task: {
          id: uuid(),
          title: form.title.trim(),
          description: form.description.trim() ,
          status: form.status,
          subtasks: form.subtasks,
        },
      },
    })

    setForm({ title: "", description: "", status: "todo", subtasks: [] })
    setSubtaskInput("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>

       <Button
 
  className="cursor-pointer bg-[#2496bb] hover:bg-[#107da1] w-10 sm:w-auto flex items-center justify-center px-2 py-1"
>
  <span className="sm:hidden text-lg font-bold">+</span>
  <span className="hidden sm:inline">+ Add New Task</span>
</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div className="space-y-2">
            <Label>Title <span className="text-red-500">*</span></Label>
            <Input
              placeholder="e.g. Build login page"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description (optional)</Label>
            <textarea
              placeholder="e.g. Include email, Google login, and password reset..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none h-24"
            />
          </div>

{/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm  cursor-pointer ">
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Subtasks */}
          <div className="space-y-3">
            <Label>Subtasks</Label>

            {/* List existing subtasks */}
            {form.subtasks.map((subtask) => (
              <div key={subtask.id} className="flex items-center gap-2">
                <Input value={subtask.title} readOnly className="bg-muted" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSubtask(subtask.id)}
                  className="text-red-500 hover:bg-red-100 cursor-pointer "
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}



            {/* Add new subtask */}
            <div className="flex gap-2">
              <Input
                placeholder="e.g. Design login UI"
                value={subtaskInput}
                onChange={e => setSubtaskInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSubtask())}
              />
              <Button disabled={subtaskInput.length <= 0} type="button" className="bg-[#ef476f] hover:bg-[#b41e41] cursor-pointer " onClick={addSubtask} size="icon">
                <Plus className="h-4 w-4 " />
              </Button>
            </div>
          </div>

          

          <DialogFooter className="gap-3">
            <DialogClose asChild>
              <Button className="cursor-pointer " type="button" variant="outline">Cancel</Button>
              </DialogClose>
            
            <Button type="submit" className="bg-[#118ab2ff] hover:bg-[#073b4cff] cursor-pointer ">Create Task</Button> 
    
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
