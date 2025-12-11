import { SidebarTrigger } from "@/components/ui/sidebar"
import { Link, useLocation, useParams } from "react-router-dom";
import { AddTaskDialog  } from "@/components/form";
import { CommandMenu } from "@/components/seach";
import { Search } from "lucide-react";
export function NavigationMen() {
  const {id}=useParams()
  const location = useLocation();

const parts = location.pathname.split("/").filter(Boolean);
const isBoardMain = parts[0] === "board" && parts.length === 2; 


  return (
    <nav className=" h-[6.5rem] flex items-center justify-between px-6 py-4 bg-[#073b4cff] text-white shadow-md">

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
      
<div className="flex items-center gap-3 pl-4">
  {/* Your existing stuff like AddTaskDialog */}

  <button
  type="button"
  onClick={() => {
    // This tricks the Cmd+K listener into opening the menu
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      ctrlKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  }}
  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 
             backdrop-blur transition-all duration-200"
>
  <Search className="w-4 h-4 text-white/70" />
  
  <span className="hidden md:block text-sm text-white/70">Search anything...</span>
  <kbd className="hidden lg:block ml-2 text-xs bg-white/20 px-2 py-1 rounded">
    Cmd K
  </kbd>
</button>

  {/* Render the menu itself (it's hidden until open) */}
  <CommandMenu />
</div>
   

    {isBoardMain && ( 
        <AddTaskDialog boardId={id}  />)}
 


    
    </nav>
  );
}
