import React from "react";

const BlogTable = ({ blogs, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="text-lg font-semibold text-gray-500 animate-pulse">Loading blogs...</span>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center py-20">
        <img src="/vite.svg" alt="No blogs" className="w-24 h-24 mb-4 opacity-60" />
        <span className="text-xl font-bold text-gray-400">No blogs found</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border border-gray-200">Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border border-gray-200">Author</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border border-gray-200">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border border-gray-200">Content Preview</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {blogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm font-medium text-gray-800 border border-gray-200">{blog.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">{blog.author || "Unknown"}</td>
              <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</td>
              <td className="px-6 py-4 text-sm text-gray-600 border border-gray-200 line-clamp-2">{blog.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
