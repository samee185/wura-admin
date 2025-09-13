import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProjectContext = createContext();


const API_URL = import.meta.env.VITE_API_URL; 


export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  });
  const [error, setError] = useState(null);

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/project`);
      setProjects(response.data.data); 
      console.log(response.data.data);
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  // Create a new project
  const createProject = async (projectData) => {
  setLoading((prev) => ({ ...prev, create: true }));
  setError(null);

  try {
    let formData = new FormData();

    formData.append("title", projectData.title);
    formData.append("description", projectData.description);

    if (projectData.date) {
      const formattedDate = new Date(projectData.date);
      if (!isNaN(formattedDate)) {
        formData.append("date", formattedDate.toISOString()); 
      }
    }

    formData.append("status", projectData.status);

    if (Array.isArray(projectData.objectives)) {
      formData.append("objectives", JSON.stringify(projectData.objectives));
    }

    if (Array.isArray(projectData.images)) {
      projectData.images.forEach((file) => formData.append("images", file));
    }


    console.log("==== FormData Contents ====");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log("==========================");

    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/project`, formData, {
      headers: { Authorization : `Bearer ${token}` }, // ✅ no Content-Type
    });

    setProjects((prev) => [...prev, response.data.data]);
    return response.data.data;
  } catch (err) {
    setError(err.response?.data?.message || "Failed to create project");
    throw err;
  } finally {
    setLoading((prev) => ({ ...prev, create: false }));
  }
};



  // Update project
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

      const response = await axios.put(`${API_URL}/project/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProjects((prev) =>
        prev.map((p) => (p._id === id ? response.data.data : p))
      );
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    setError(null);

    try {
      await axios.delete(`${API_URL}/project/${id}`);
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
