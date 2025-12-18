import { SidebarTrigger } from "@/components/ui/sidebar"
import { Link} from "react-router-dom";
import { CommandMenu } from "@/components/seach";
import { Search } from "lucide-react";
import User from "@/components/user";

export function NavigationMen() {


  return (
    <nav className=" h-26 flex items-center justify-between px-6 py-4 bg-[#001433] text-white shadow-md">

      {/* mobile */}

<div className="flex gap-7">
  <SidebarTrigger 
        className=" rounded-lg 
    border  border-gray-900
    text-white cursor-pointer
    hover:text-white 
    hover:bg-white/30
    active:bg-white/50
    transition-all 
    duration-200 
    w-10 h-10
    flex items-center justify-center"
    
      />
<Link className="text-[18px] sm:text-2xl pt-2 sm:pt-0.5 font-semibold hover:text-white transition" to={'/home'}>Home</Link>
</div>
      
<div className="flex items-center gap-3 pl-4">


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


  <CommandMenu />
</div>  
<User/>

    
    </nav>
  );
}
