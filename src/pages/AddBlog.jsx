import React from "react";
import BlogForm from "../components/BlogForm";
import { useBlog} from "../contexts/BlogContext";

const AddBlog = () => {
  const { createBlog, loading } = useBlog();

  const handleSubmit = async (formData) => {
    await createBlog(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 px-4 md:px-10  pt-16 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto py-12">
        <BlogForm onSubmit={handleSubmit} loading={loading.create} />
      </div>
    </div>
  );
};

export default AddBlog;
