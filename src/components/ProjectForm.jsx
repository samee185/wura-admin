import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../contexts/ProjectContext";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [objectives, setObjectives] = useState([]);
  const [objectiveInput, setObjectiveInput] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const { createProject, loading } = useProject();

  // Add objective to list
  const handleAddObjective = () => {
    if (objectiveInput.trim()) {
      setObjectives([...objectives, objectiveInput.trim()]);
      setObjectiveInput("");
    }
  };

  // Remove objective from list
  const handleRemoveObjective = (index) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      title,
      description,
      date,
      status,
      objectives,
      images,
    };

    try {
      await createProject(projectData);

      // ✅ Reset form after successful creation
      setTitle("");
      setDescription("");
      setDate("");
      setStatus("Ongoing");
      setObjectives([]);
      setObjectiveInput("");
      setImages([]);

      
      navigate("/projects");
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl mx-auto space-y-6 border border-gray-100"
    >
      <button
        type="button"
        onClick={() => navigate("/projects")}
        className="mb-4 px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
      >
        ← Back to Projects
      </button>

      <h2 className="text-2xl font-bold text-gray-800 text-center">Create Project</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Objectives */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Objectives</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={objectiveInput}
            onChange={(e) => setObjectiveInput(e.target.value)}
            className="flex-1 rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={handleAddObjective}
            className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {objectives.map((obj, index) => (
            <div
              key={index}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2 shadow-sm"
            >
              <span>{obj}</span>
              <button
                type="button"
                onClick={() => handleRemoveObjective(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-xl file:border-0 file:text-sm file:font-semibold
                     file:bg-green-50 file:text-green-600 hover:file:bg-green-100"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {images.length > 0 &&
            images.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-20 w-20 object-cover rounded-xl border shadow-sm"
                />
              </div>
            ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading.create}
        className="w-full py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700"
      >
        {loading.create ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
