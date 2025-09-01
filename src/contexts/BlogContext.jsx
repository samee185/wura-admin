// src/contexts/BlogContext.js
import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  });
  const [error, setError] = useState(null);

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    setError(null);

    try {
      const { data } = await API.get("/blogs");
      setBlogs(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  // Create new blog (with optional file upload)
  const createBlog = async (blogData) => {
    setLoading((prev) => ({ ...prev, create: true }));
    setError(null);

    try {
      let formData = new FormData();
      Object.entries(blogData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await API.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBlogs((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  // Update blog (with optional file upload)
  const updateBlog = async (id, blogData) => {
    setLoading((prev) => ({ ...prev, update: true }));
    setError(null);

    try {
      let formData = new FormData();
      Object.entries(blogData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await API.put(`/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBlogs((prev) => prev.map((b) => (b._id === id ? data : b)));
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update blog");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  // Delete blog
  const deleteBlog = async (id) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    setError(null);

    try {
      await API.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete blog");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        fetchBlogs,
        createBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

const useBlog = () => useContext(BlogContext);


export default BlogContext;    