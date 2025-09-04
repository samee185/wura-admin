import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Upload, X } from "lucide-react"; 
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const BlogForm = ({ onSubmit, loading }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      if (file) {
        formData.append("image", file);
      }
      onSubmit(formData);
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeFile = () => setFile(null);

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <button
        type="button"
        onClick={() => navigate("/blogs")}
        className="mb-4 px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
      >
        ← Back to Blogs
      </button>
      <h5 className="text-xl text-center font-bold mb-6">Create Blog Post</h5>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-3 border ${
              formik.touched.title && formik.errors.title
                ? "border-red-500"
                : "border-gray-300"
            } rounded-xl focus:ring-2 focus:ring-green-700 focus:outline-none`}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="mt-2 text-sm text-red-500">{formik.errors.title}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <textarea
            name="content"
            placeholder="Write your blog content..."
            rows="6"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-3 border ${
              formik.touched.content && formik.errors.content
                ? "border-red-500"
                : "border-gray-300"
            } rounded-xl focus:ring-2 focus:ring-green-700 focus:outline-none`}
          />
          {formik.touched.content && formik.errors.content && (
            <p className="mt-2 text-sm text-red-500">{formik.errors.content}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Cover Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-green-700 transition">
            {!file ? (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-gray-500">Drag & drop or click to upload</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-3 px-4 py-2 bg-green-700 text-white rounded-lg cursor-pointer hover:bg-red-500"
                >
                  Choose File
                </label>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <p className="text-gray-700">{file.name}</p>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-red-500 disabled:opacity-50"
        >
          {loading ? <Spinner className="h-5 w-5" color="border-white" /> : "Publish Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
