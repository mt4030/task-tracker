import Layout from "@/layouts/layout"
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import ErrorPage from "./ErrorPage"

const arpp=()=>{
const route=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        errorElement:<ErrorPage/>,
        children:[
            {index:true,

            }
        ]

    }
])

return(
    <RouterProvider router={route}>
    
    
    </RouterProvider>
)

}
export default arpp