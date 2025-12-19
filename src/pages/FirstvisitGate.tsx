import { motion, AnimatePresence } from "framer-motion";
import bg from "@/assets/tasknest-bg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "first_visit_choice";

export default function FirstVisitGate() {
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState("");

  const handleGuest = () => {
    localStorage.setItem(STORAGE_KEY, "guest");
    navigate("/home"); 
  };

  const handleLogin = () => {
    setLoginMessage("Login / Sign Up is not implemented yet.");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
       
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        />
        <div className="absolute inset-0 bg-black/60" />

     
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex min-h-screen w-screen pt-25 flex-col items-center justify-center px-6 text-white"
        >
          <h1 className="mb-2 text-3xl font-semibold">TaskNest</h1>
          <p className="mb-10 max-w-sm text-center text-sm text-white/80">
            A calm home for your tasks.
          </p>

          <div className="w-full max-w-sm space-y-2">
        
            <button
              onClick={handleGuest}
              className="block w-full rounded-xl bg-white py-3 text-center font-medium text-[#202E4B] hover:bg-white/90"
            >
              Enter as Guest
            </button>

       
            <button
              onClick={handleLogin}
              className="w-full rounded-xl border border-white/40 py-3 text-sm text-white hover:bg-white/10"
            >
              Sign in / Sign Up
            </button>

          
            {loginMessage && (
              <p className="mt-2 text-center text-sm text-red-400">{loginMessage}</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
