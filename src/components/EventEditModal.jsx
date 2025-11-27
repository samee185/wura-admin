import React, { useState, useEffect } from "react";
import useEvent from "../contexts/EventContext";

const EventEditModal = ({ open, onClose, event, onSave, saving }) => {
  const [form, setForm] = useState({ title: "", description: "", date: "", time: "", venue: "", aboutEvent: "" });

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        description: event.description || "",
        date: event.date ? new Date(event.date).toISOString().slice(0, 10) : "",
        time: event.time || "",
        venue: event.venue || "",
        aboutEvent: event.aboutEvent || "",
      });
    }
  }, [event]);

  const { updateEvent, fetchEvents, loading: ctxLoading } = useEvent();

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event) return;

    try {
      // call context updateEvent which handles formdata/upload
      const res = await updateEvent(event._id, form);
      const updated = res?.data || res;
      // refresh events from server to ensure consistency
      await fetchEvents(); 
      // notify parent if provided
      if (onSave) await onSave(updated);
      // close modal on success
      onClose();
    } catch (err) {
      // error handling is done in context (toast), nothing else here
    }
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
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="mt-1 w-full border rounded-lg px-4 py-2" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Short Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short description" className="mt-1 w-full border rounded-lg px-4 py-2 h-24" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" name="date" value={form.date} onChange={handleChange} className="border rounded-lg px-4 py-2" />
            <input name="time" value={form.time} onChange={handleChange} placeholder="Time" className="border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Venue</label>
            <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" className="mt-1 w-full border rounded-lg px-4 py-2" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">About Event</label>
            <textarea name="aboutEvent" value={form.aboutEvent} onChange={handleChange} placeholder="Detailed information about the event" className="mt-1 w-full border rounded-lg px-4 py-2 h-32" />
          </div>
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
