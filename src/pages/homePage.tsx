import { useTodo } from "@/context/TodoContext";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function HomePage() {
  const { state } = useTodo();
  const boardsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const totalBoards = state.length;
  const totalTasks = state.reduce((acc, board) => acc + board.tasks.length, 0);
  const completedTasks = state.reduce(
    (acc, board) => acc + board.tasks.filter((t) => t.status === "done").length,
    0
  );
  const inProgressTasks = totalTasks - completedTasks;

  const pieData = {
    labels: ["Completed", "In Progress"],
    datasets: [
      {
        label: "Tasks",
        data: [completedTasks, inProgressTasks],
        backgroundColor: ["#06d6a0", "#ffd166"],
        borderWidth: 0,
      },
    ],
  };

  // Scroll to Boards Progress
  const scrollToBoards = () => {
    boardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };




  return (
    <div className="min-h-screen relative overflow-hidden bg-[aliceblue] dark:bg-gray-900">
      <div className="p-6 md:p-10">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg">
            TaskNest Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Your productivity at a glance — organized & interactive.
          </p>
        </motion.div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {[
            {
              title: "Boards",
              value: totalBoards,
              color: "from-[#073b4cff] to-[#2935b3]",
              onClick: () => {}, // optional
            },
            {
              title: "In Progress",
              value: inProgressTasks,
              color: "from-[#ffd166] to-[#cca712]",
              onClick: scrollToBoards, // scrolls to Boards Progress
            },
            { title: "Completed", value: completedTasks, color: "from-[#06d6a0] to-[#049670]", onClick: () => {} },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              onClick={card.onClick}
              className={`cursor-pointer p-8 rounded-2xl shadow-xl 
                bg-gradient-to-br ${card.color} 
                text-white text-center backdrop-blur-xl 
                hover:scale-105 hover:shadow-2xl transition `}
            >
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="text-5xl font-bold mt-3">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* CHART + RECENT ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/40 dark:bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Task Overview
            </h3>
            <Pie data={pieData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/40 dark:bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Recent Progress
            </h3>

            <ul className="space-y-4">
              {state.flatMap((board) =>
                board.tasks.slice(0, 3).map((t, i) => (
                  <motion.li
                    key={t.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 bg-white/30 dark:bg-black/20 rounded-lg shadow-sm cursor-pointer hover:scale-105 transition"
                    onClick={() => navigate(`/board/${board.id}/task/${t.id}`)}
                  >
                    <span className="font-medium">{t.title}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">
                      {board.title}
                    </span>
                  </motion.li>
                ))
              )}
            </ul>
          </motion.div>
        </div>

        {/* BOARDS PROGRESS */}
        
      </div>
    </div>
  );
}
