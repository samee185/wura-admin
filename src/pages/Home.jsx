// src/pages/Dashboard.jsx
import { useProject } from "../contexts/ProjectContext";
import { useBlog } from "../contexts/BlogContext";
import { FolderKanban, BookOpen, Users, DollarSign } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { projects } = useProject();
  const { blogs } = useBlog();
  const { user } = useAuth();

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      color: "indigo",
      icon: <FolderKanban className="w-8 h-8 text-indigo-600" />,
    },
    {
      label: "Total Blogs",
      value: blogs.length,
      color: "pink",
      icon: <BookOpen className="w-8 h-8 text-pink-600" />,
    },
    {
      label: "Active Users",
      value: 3,
      color: "green",
      icon: <Users className="w-8 h-8 text-green-600" />,
    },
    {
      label: "Donations",
      value: "---",
      color: "yellow",
      icon: <DollarSign className="w-8 h-8 text-yellow-600" />,
    },
  ];

  return (
    <div className="pt-20 px-6 space-y-10">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.firstName}</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}-600`}>
                {stat.value}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Latest Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={p.images[0]}
                alt={p.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {p.description}
                </p>
                <span
                  className={`inline-block mt-3 text-xs px-2 py-1 rounded ${
                    p.status === "ongoing"
                      ? "bg-blue-100 text-blue-600"
                      : p.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blogs Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={b.image}
                alt={b.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{b.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {b.excerpt}
                </p>
                <span className="text-xs text-gray-400 mt-2 block">
                  {new Date(b.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="bg-white rounded-2xl shadow-md divide-y">
          {[
            "Project Alpha marked as completed",
            "New blog post published: Scaling Node.js",
            "5 new users signed up today",
            "Revenue updated",
          ].map((activity, idx) => (
            <li
              key={idx}
              className="p-4 hover:bg-gray-50 transition text-gray-700"
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
