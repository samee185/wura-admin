import { useState } from "react";
import ViewToggle from "../components/ViewToggle";
import BlogTable from "./BlogTable";
import BlogGrid from "./BlogGrid";

const BlogsPage = ({ blogs, loading, onEdit, onDelete }) => {
  const [view, setView] = useState("table");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blogs</h1>
        <ViewToggle view={view} setView={setView} />
      </div>

      {view === "table" ? (
        <BlogTable
          blogs={blogs}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <BlogGrid
          blogs={blogs}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default BlogsPage;
