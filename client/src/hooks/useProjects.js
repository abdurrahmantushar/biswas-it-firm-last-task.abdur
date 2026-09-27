import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data.projects || []);
    } catch (error) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    setProjects,
    fetchProjects,
  };
};

export default useProjects;