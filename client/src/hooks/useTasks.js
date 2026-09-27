import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();

      console.log("Tasks API:", data);

      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Tasks Error:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    setTasks,
    fetchTasks,
  };
};

export default useTasks;