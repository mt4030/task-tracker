import { useTodo } from "@/context/TodoContext";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import type { ChartOptions } from "chart.js";
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

  // Determine if there are any tasks
  const hasTasks = totalTasks > 0;

  // Pie chart data
  const pieData = {
    labels: hasTasks ? ["Completed", "In Progress"] : ["No Tasks"],
    datasets: [
      {
        label: "Tasks",
        data: hasTasks ? [completedTasks, inProgressTasks] : [1], 
        backgroundColor: hasTasks ? ["#2a9d8f", "#ffc300"] : ["#99C2FF"], 
        borderWidth: 2,
      },
    ],
  };

 const pieOptions: ChartOptions<"pie"> = {
  animation: {
    animateScale: true,
    animateRotate: true,
    duration: 1200,
    easing: "easeOutQuart",
  },
  plugins: {
    legend: { position: "bottom" },
  },
};

  const scrollToBoards = () => {
    boardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Flatten recent tasks (limit to 3 per board)
  const recentTasks = state.flatMap((board) =>
    board.tasks.slice(0, 3).map((t) => ({
      ...t,
      boardTitle: board.title,
      boardId: board.id,
    }))
  );

  return (
    <div className="min-h-screen relative overflow-hidden text-white ">
      <div className="p-6 md:p-10">

        {/* hero */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 80, damping: 15 }}
          className="text-center mb-14"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold   drop-shadow-lg">
            TaskNest Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Your productivity at a glance — organized & interactive.
          </p>
        </motion.div>

        {/* STATS card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {[
            { title: "Boards", value: totalBoards, color: "from-[#003566] to-[#1F3C88]", onClick: () => {} },
            { title: "In Progress", value: inProgressTasks, color: "from-[#ffc300] to-[#E09F1F]", onClick: scrollToBoards },
            { title: "Completed", value: completedTasks, color: "from-[#2a9d8f] to-[#0BBF9A]", onClick: () => {} },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12, delay: index * 0.15 }}
              onClick={card.onClick}
              className={`cursor-pointer p-8 rounded-2xl shadow-xl 
                bg-linear-to-br ${card.color} 
                text-white text-center backdrop-blur-xl 
                hover:scale-105 hover:shadow-2xl transition`}
            >
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <motion.p
                key={card.value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 15, duration: 0.4 }}
                className="text-5xl font-bold mt-3"
              >
                {card.value}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* chart+activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">

          {/* pie chart*/}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.2 }}
            className=" md:h-150 bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-white dark:text-gray-300">
              Task Overview
            </h3>
            <Pie data={pieData} options={pieOptions} />
            {!hasTasks && (
              <p className="text-center  dark:text-gray-400 mt-4">
                No tasks available
              </p>
            )}
          </motion.div>

          {/* resent list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.3 }}
            className="bg-white/10 h-150 overflow-y-scroll backdrop-blur-xl p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-white dark:text-gray-300">
              Recent Progress
            </h3>

            <motion.ul layout className="space-y-4">
              {recentTasks.length > 0 ? (
                recentTasks.map((t, i) => (
                  <motion.li
                    key={t.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    transition={{ type: "spring", stiffness: 110, damping: 14, delay: i * 0.08 }}
                    className="p-3 bg-white/30 dark:bg-black/20 rounded-lg shadow-sm cursor-pointer transition"
                    onClick={() => navigate(`/home/board/${t.boardId}/task/${t.id}`)}
                  >
                    <span className="font-medium">{t.title}</span>
                    <span className="text-sm text-[#E5F0FF] dark:text-gray-400 block">
                      {t.boardTitle}
                    </span>
                  </motion.li>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center mt-8">
                  No recent tasks
                </p>
              )}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
