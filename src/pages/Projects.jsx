import { useState } from "react";
import { LayoutGrid, Table } from "lucide-react";
import ProjectTable from "../components/ProjectTable";
import ProjectList from "../components/ProjectList";
import { useNavigate } from "react-router-dom";

const ProjectsPage = ({ projects, loading, onEdit, onDelete }) => {
  const [view, setView] = useState("table"); // default to table view
  const navigate = useNavigate();

  return (
    <div className="py-20 px-6">
      {/* Header with toggle and Add Project button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate("/projects/new")}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700"
          >
            + Add Project
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

      {/* Conditional rendering */}
      {view === "table" ? (
        <ProjectTable
          projects={projects}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <ProjectList
          projects={projects}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
