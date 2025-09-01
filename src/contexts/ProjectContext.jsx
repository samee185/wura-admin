// src/contexts/ProjectContext.js
import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      const { data } = await API.post("/projects", projectData);
      setProjects((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const { data } = await API.put(`/projects/${id}`, projectData);
      setProjects((prev) => prev.map((p) => (p._id === id ? data : p)));
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

const useProject = () => useContext(ProjectContext);


