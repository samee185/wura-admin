import React, { useState } from "react";
import { useBlog } from "../contexts/BlogContext";
import BlogList from "../components/BlogList";
import BlogTable from "../components/BlogTable";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, Table } from "lucide-react";

const Blogs = () => {
  const { blogs, loading } = useBlog();
  const navigate = useNavigate();
  const [view, setView] = useState("grid"); // default to grid view

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 px-4 pt-16">
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <h1 className="text-2xl font-bold text-gray-800 drop-shadow-lg">
            Blog Posts
          </h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigate("/blogs/new")}
              className="px-4 py-2 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-800 transition"
            >
              + Add Blog
            </button> 
            <button
              onClick={() => setView("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                view === "table"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Table className="w-4 h-4" />
              Table
            </button>
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                view === "grid"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid
            </button>
            
          </div>
        </div>
        {view === "table" ? (
          <BlogTable blogs={blogs} loading={loading.fetch} />
        ) : (
          <BlogList blogs={blogs} loading={loading.fetch} />
        )}
      </div>
    </div>
  );
};

export default Blogs;