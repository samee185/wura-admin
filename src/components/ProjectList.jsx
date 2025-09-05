import { useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import Spinner from "./Spinner"; 
import { useProject } from "../contexts/ProjectContext";

const ProjectList = () => {
    const { projects, loading, fetchProjects, deleteProject } = useProject();
  useEffect(() => {
    console.log("Fetched projects:", projects);
  }, [projects]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Spinner size="w-12 h-12" color="border-green-600" />
//       </div>
//     );
//   }

  if (!projects || projects.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">No projects found.</p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col"
        >
          {/* Cover Image */}
          {project.images?.length > 0 && (
            <img
              src={project.images[0]}
              alt={project.title}
              className="h-40 w-full object-cover"
            />
          )}

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3 mt-2">
              {project.description}
            </p>

            {/* Objectives */}
            {project.objectives?.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-500">
                  Objectives:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {project.objectives.slice(0, 2).map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                  {project.objectives.length > 2 && (
                    <li className="text-green-500">+ more</li>
                  )}
                </ul>
              </div>
            )}

            {/* Status & Date */}
            <div className="mt-4 flex items-center justify-between">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  project.status === "ongoing"
                    ? "bg-yellow-100 text-yellow-700"
                    : project.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {project.status}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(project.date).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => onEdit(project)}
              className="flex items-center gap-1 text-green-600 hover:text-green-800 text-sm font-medium"
            >
              <Edit className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => onDelete(project._id)}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
