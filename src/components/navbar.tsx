import { SidebarTrigger } from "@/components/ui/sidebar"
import { Link, useLocation, useParams } from "react-router-dom";
import { AddTaskDialog  } from "@/components/form";

export function NavigationMen() {
  const {id}=useParams()
  const location = useLocation();

const parts = location.pathname.split("/").filter(Boolean);
const isBoardMain = parts[0] === "board" && parts.length === 2; // Only /board/:id


  return (
    <nav className=" h-26 flex items-center justify-between px-6 py-4 bg-[#073b4cff] text-white shadow-md">

      {/* Mobile sidebar button */}

<div className="flex gap-7">
  <SidebarTrigger 
        className=" rounded-lg 
    border border-white/15 
    text-white/70 cursor-pointer
    hover:text-white 
    hover:bg-[#118ab2]/30
    active:bg-[#118ab2]/50
    transition-all 
    duration-200 
    w-10 h-10
    flex items-center justify-center"
    
      />
<Link className="text-2xl font-semibold hover:text-[#49b8dd] transition" to={'/'}>Home</Link>
</div>
      

   

    {isBoardMain && ( 
        <AddTaskDialog boardId={id}  />)}
 


    
    </nav>
  );
}
