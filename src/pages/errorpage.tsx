import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { memo } from "react";
const Errorpage = () => {
const navigate = useNavigate()
  const progress = Math.floor(Math.random()*100)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        We couldn’t load the page you requested. It might be a server issue or a wrong link.
      </p>
      <div className="w-full max-w-sm mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">API Status</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <Button onClick={() => navigate("/")} className="px-6 py-2">
        Go Back Home
      </Button>
    </div>
  )
}

export default memo(Errorpage)
