import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { memo } from "react";

const Errorpage = () => {
  const navigate = useNavigate();
  const progress = Math.floor(Math.random() * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#001433] text-white p-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-[#ef476f] mb-4">Oops! Something went wrong.</h1>
        <p className="text-gray-200 mb-6">
          We couldnt load the page you requested. It might be a server issue or a wrong link.
        </p>

        <div className="w-full mb-6">
          <div className="flex justify-between mb-1 text-gray-300 text-sm font-medium">
            <span>API Status</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4">
            <div
              className="bg-[#0066FF] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Button
          onClick={() => navigate("/home")}
          className="bg-[#0066FF] hover:bg-[#3385FF] text-white w-full py-2 rounded-xl"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default memo(Errorpage);
