import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { useTodo } from "@/context/TodoContext"
import { useState } from "react"
import { v4 as uuid } from "uuid"
import { Trash2} from "lucide-react"
export function AppSidebar({ showForm, setShowForm}) {
  const { state, dispatch } = useTodo()
  const [newTitle, setNewTitle] = useState("")

  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    dispatch({
      type: "ADD_BOARD",
      payload: { id: uuid(), title: newTitle },
    })

    setNewTitle("")
    setShowForm(false)
  }
const handleDelete=(id:string)=>{
 const confirmed = window.confirm("Are you sure you want to delete this board?");
  if (!confirmed) return;
dispatch({type:'DELETE_BOARD', payload:{id:id}})
}
  return (
    <Sidebar className="bg-black">
      <SidebarContent className="bg-[#073b4cff] pl-1  font-semibold ">

        <SidebarGroup>

          {/* HEADER WITH CLOSE BUTTON */}
          <div className="flex items-center justify-between mb-8 mt-5 pr-4 ">
            
         
            <div className="flex gap-2 items-center ">
             <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-8 h-8 text-blue-300 hover:scale-125 hover:animate-spin transition-transform duration-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
</svg>


              <h1 className="text-amber-50 text-3xl font-bold">TaskNest</h1>

          <SidebarTrigger 
  className="
     w-10 h-10
    rounded-lg cursor-pointer
    border border-white/15 
    text-white/70
    hover:text-white 
    hover:bg-[#118ab2]/30
    active:bg-[#118ab2]/50
    transition-all 
    duration-200
    flex items-center justify-center
  "
>
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
</SidebarTrigger>    
            </div>

                   

          </div>

          {/* BOARD LIST */}
          <SidebarGroupLabel className="text-amber-50 font-bold mb-2">
            BOARDS ({state.length})
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1  ">

              {/* BOARD ITEMS */}
              {state.map((board) => (
  <SidebarMenuItem key={board.id}>
   <div className="flex justify-between items-center "> 
    <NavLink
  to={`board/${board.id}`}
  className={({ isActive }) =>
    `px-2 py-1 w-full block rounded transition  
     ${isActive 
        ? "bg-[#118ab2]/20 text-white w-54  font-semibold"     
        : "text-[#909db0] hover:text-blue-950"      
     }`
  }
>
      <SidebarMenuButton className="  hover:text-amber-50 hover:bg-[#118ab2]/20 cursor-pointer" >

  {board.title}

           
         

    </SidebarMenuButton></NavLink>  
    <Trash2 onClick={()=>handleDelete(board.id)} className="  h-5 w-6 text-[#ef476f] hover:text-[#b41e41] cursor-pointer" /> 
    </div>
    
  </SidebarMenuItem>
))}


              {/* ADD NEW BOARD FORM */}
              {showForm ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 mt-3 px-2"
                >
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Board title"
                    className="border border-gray-300 dark:border-gray-700 p-2 rounded 
                    text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                    focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  />

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-[#118ab2ff] hover:bg-[#107da1] cursor-pointer ">Save</Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 cursor-pointer "
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <Button 
                  onClick={() => setShowForm(true)}
                  className="mt-3 w-50 text-sm bg-[#2496bb] hover:bg-[#107da1] cursor-pointer "
                >
                  + Add new board
                </Button>
              )}

            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>



      </SidebarContent>
    </Sidebar>
  )
}
