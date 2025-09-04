import React from "react";
import { useBlog } from "../contexts/BlogContext";
import BlogList from "../components/BlogList";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const { blogs, loading } = useBlog();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 px-4 md:px-10 pt-16">
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center md:text-left text-green-700 drop-shadow-lg">
            Blog Posts
          </h1>
          <button
            onClick={() => navigate("/blogs/new")}
            className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold shadow-lg hover:bg-green-700 transition"
          >
            + Add Blog
          </button>
        </div>
        <BlogList blogs={blogs} loading={loading.fetch} />
      </div>
    </div>
  );
};

export default Blogs;