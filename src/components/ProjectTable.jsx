import { Edit, Trash2 } from "lucide-react";
import Spinner from "./Spinner";

const ProjectTable = ({ projects, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="w-12 h-12" color="border-green-600" />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">No projects found.</p>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Objectives
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm font-medium text-gray-800">
                {project.title}
              </td>
              <td className="px-6 py-4">
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
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(project.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {project.objectives?.slice(0, 2).join(", ")}
                {project.objectives?.length > 2 && (
                  <span className="text-green-500"> + more</span>
                )}
              </td>
              <td className="px-6 py-4 text-center flex items-center justify-center gap-4">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
