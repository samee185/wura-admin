import React from "react";
import { useBlog } from "../contexts/BlogContext";

const BlogList = () => {
  const { blogs, loading } = useBlog();
//   console.log(blogs); 
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <span className="text-lg font-semibold text-gray-500 animate-pulse">Loading blogs...</span>
//       </div>
//     );
//   }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center py-20">
        <img src="/vite.svg" alt="No blogs" className="w-24 h-24 mb-4 opacity-60" />
        <span className="text-xl font-bold text-gray-400">No blogs found</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-100"
        >
          {blog.images && (
            <img
              src={blog.images[0]}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6 flex flex-col h-full">
            <h3 className="text-xl font-bold text-red-600 mb-2 line-clamp-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {blog.author || "Unknown Author"}
              </span>
              <span className="text-xs text-gray-400">
                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
