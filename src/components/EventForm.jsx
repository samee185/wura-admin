import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import  useEvent  from "../contexts/EventContext";

const EventForm = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const { createEvent, loading } = useEvent();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      aboutEvent: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      date: Yup.date().required("Date is required"),
      time: Yup.string().required("Time is required"),
      venue: Yup.string().required("Venue is required"),
      aboutEvent: Yup.string().required("About event is required"),
    }),
    onSubmit: async (values) => {
      try {
        const eventData = {
          ...values,
          images: files,
        };

        await createEvent(eventData);
        navigate("/event"); 
      } catch (err) {
        console.error("Event creation failed", err);
      }
    },
  });

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <button
        type="button"
        onClick={() => navigate("/event")}
        className="mb-4 px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
      >
        ← Back to Events
      </button>
      <h5 className="text-xl text-center font-bold mb-6">Create Event</h5>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Event Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter event title"
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

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Write a short description..."
            rows="4"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-3 border ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-300"
            } rounded-xl focus:ring-2 focus:ring-green-700 focus:outline-none`}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="mt-2 text-sm text-red-500">{formik.errors.description}</p>
          )}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border ${
                formik.touched.date && formik.errors.date
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-xl focus:ring-2 focus:ring-green-700 focus:outline-none`}
            />
            {formik.touched.date && formik.errors.date && (
              <p className="mt-2 text-sm text-red-500">{formik.errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Time</label>
            <input
              type="text"
              name="time"
              placeholder="e.g. 4:00 PM"
              value={formik.values.time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border ${
                formik.touched.time && formik.errors.time
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-xl focus:ring-2 focus:ring-green-700 focus:outline-none`}
            />
            {formik.touched.time && formik.errors.time && (
              <p className="mt-2 text-sm text-red-500">{formik.errors.time}</p>
            )}
          </div>
        </div>

        {/* Venue */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Venue</label>
          <input
            type="text"
            name="venue"
            placeholder="Enter venue"
            value={formik.values.venue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-3 border ${
              formik.touched.venue && formik.errors.venue
                ? "border-red-500"
                : "border-gray-300"
            } rounded-xl focus:ring-2 focus:ring-green-700 focus:outline-none`}
          />
          {formik.touched.venue && formik.errors.venue && (
            <p className="mt-2 text-sm text-red-500">{formik.errors.venue}</p>
          )}
        </div>

        {/* About Event */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">About Event</label>
          <textarea
            name="aboutEvent"
            placeholder="Write more details about the event..."
            rows="5"
            value={formik.values.aboutEvent}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-3 border ${
              formik.touched.aboutEvent && formik.errors.aboutEvent
                ? "border-red-500"
                : "border-gray-300"
            } rounded-xl focus:ring-2 focus:ring-green-700 focus:outline-none`}
          />
          {formik.touched.aboutEvent && formik.errors.aboutEvent && (
            <p className="mt-2 text-sm text-red-500">{formik.errors.aboutEvent}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Event Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="block w-full text-gray-700"
          />
          <div className="mt-3 flex flex-wrap gap-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-lg"
              >
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading.create}
          className="w-full flex items-center justify-center px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-red-500 disabled:opacity-50"
        >
          {loading.create ? (
            <Spinner className="h-5 w-5" color="border-white" />
          ) : (
            "Create Event"
          )}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
