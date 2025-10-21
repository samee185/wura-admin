import React, { useState, useEffect } from "react";

const EventEditModal = ({ open, onClose, event, onSave, saving }) => {
  const [form, setForm] = useState({ title: "", description: "", date: "", time: "", venue: "" });

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        description: event.description || "",
        date: event.date ? new Date(event.date).toISOString().slice(0, 10) : "",
        time: event.time || "",
        venue: event.venue || "",
      });
    }
  }, [event]);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave({ ...event, ...form });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Edit Event</h3>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border rounded-lg px-4 py-2" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded-lg px-4 py-2 h-28" />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" name="date" value={form.date} onChange={handleChange} className="border rounded-lg px-4 py-2" />
            <input name="time" value={form.time} onChange={handleChange} placeholder="Time" className="border rounded-lg px-4 py-2" />
          </div>
          <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" className="border rounded-lg px-4 py-2" />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventEditModal;
