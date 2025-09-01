// src/contexts/BlogContext.js
import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/blogs");
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // create new blog
  const createBlog = async (blogData) => {
    try {
      const { data } = await API.post("/blogs", blogData);
      setBlogs((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  // update blog
  const updateBlog = async (id, blogData) => {
    try {
      const { data } = await API.put(`/blogs/${id}`, blogData);
      setBlogs((prev) => prev.map((b) => (b._id === id ? data : b)));
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // delete blog
  const deleteBlog = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{ blogs, loading, fetchBlogs, createBlog, updateBlog, deleteBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
};

const useBlog = () => useContext(BlogContext);

export default useBlog;
  