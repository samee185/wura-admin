// src/contexts/ProjectContext.js
import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  });
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    setError(null);

    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  const createProject = async (projectData) => {
    setLoading((prev) => ({ ...prev, create: true }));
    setError(null);

    try {
      let formData = new FormData();
      Object.entries(projectData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });

      const { data } = await API.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProjects((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const updateProject = async (id, projectData) => {
    setLoading((prev) => ({ ...prev, update: true }));
    setError(null);

    try {
      let formData = new FormData();
      Object.entries(projectData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });

      const { data } = await API.put(`/projects/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProjects((prev) => prev.map((p) => (p._id === id ? data : p)));
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const deleteProject = async (id) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    setError(null);

    try {
      await API.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
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
        error,
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

export const useProject = () => useContext(ProjectContext);
 