import { SidebarProvider} from "@/components/ui/sidebar"
import { AppSidebar } from "@/layouts/sideBar"
import { NavigationMen } from "@/layouts/navbar"
import { Outlet } from "react-router-dom"
import { useState } from "react"

export default function Layout() {
  ////for opening the sidbar and form navbar to acces the sidbar 

const [showBoardForm, setShowBoardForm] = useState(false)
  return (  
    <>
 
    <SidebarProvider>
  <div className="flex min-h-screen">

    <div className="relative">
      <AppSidebar

  showForm={showBoardForm}
  setShowForm={setShowBoardForm} />
       
    </div>

 <main className="flex-1 overflow-x-hidden ">
  <NavigationMen  />
  <div className="max-w-6xl mx-auto p-6">
    <Outlet />
  </div>
</main>

  </div>
</SidebarProvider>


    </>
   
  )
}
