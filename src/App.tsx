
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/homePage'
import Errorpage from './pages/errorpage'
import Layout from './layouts/layout'
import Board from './pages/boread'
import Todoprovider from './context/TodoContext'
import TaskDiPage from './pages/taskdetailpage'
import FirstVisitGate from './pages/starter'
import  {AuthProvider}  from './context/AuthContext'

//////routes
const router=createBrowserRouter([
  {element:<Layout/>,
    path:'/',
  errorElement:<Errorpage/>,
  children:[
    {index: true,element:<FirstVisitGate/>},
    {path:'/home',element:<Home/>},
    {path:'board/:id',element:<Board/>}
    ,{ path: 'board/:id/task/:taskId', element: <TaskDiPage /> },
  ]
  }
])

function App() {
  
  return (
   <AuthProvider>
   <Todoprovider>
<RouterProvider router={router}/>
   </Todoprovider>
   </AuthProvider>
  )
}
export default App
