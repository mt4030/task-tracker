
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/homePage'
import ErrorPage from './pages/ErrorPage';
import Layout from './layouts/layout'
import Board from './pages/boardTasks'
import Todoprovider from './context/TodoContext'
import TaskDiPage from './pages/taskdetailpage'
import FirstVisitGate from './pages/FirstvisitGate'
import  {AuthProvider}  from './context/AuthContext'

//////routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstVisitGate />, 
    errorElement: <ErrorPage />,
  },
  {
    element: <Layout />,
    path: "/home",
    children: [
      { index: true, element: <Home /> },
      { path: "board/:id", element: <Board /> },
      { path: "board/:id/task/:taskId", element: <TaskDiPage /> },
    ],
  },
]);

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
