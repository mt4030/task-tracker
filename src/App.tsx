
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/homePage'
import Errorpage from './pages/errorpage'
import Layout from './pages/layout'
import Board from './pages/boread'
import Todoprovider from './context/TodoContext'
import TaskDiPage from './pages/taskdetailpage'

//////routes
const router=createBrowserRouter([
  {element:<Layout/>,
    path:'/',
  errorElement:<Errorpage/>,
  children:[
    {index: true,element:<Home/>},
    {path:'board/:id',element:<Board/>}
    ,{ path: 'board/:id/task/:taskId', element: <TaskDiPage /> }
  ]
  }
])

function App() {
  return (
   <>
   <Todoprovider>
<RouterProvider router={router}/>
   </Todoprovider>
   </>
  )
}
export default App
