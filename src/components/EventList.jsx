import React, { useState } from "react";
import EventViewModal from "./EventViewModal";
import EventEditModal from "./EventEditModal";

const EventList = ({ events, onUpdate }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [saving, setSaving] = useState(false);

  if (!events || events.length === 0) {
    return <p className="text-center text-gray-500">No events available</p>;
  }

  const openView = (event) => {
    setActiveEvent(event);
    setViewOpen(true);
  };

  const openEdit = (event) => {
    setActiveEvent(event);
    setEditOpen(true);
  };

  const handleSave = async (updated) => {
    setSaving(true);
    try {
      if (onUpdate) await onUpdate(updated);
      setEditOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <EventViewModal open={viewOpen} onClose={() => setViewOpen(false)} event={activeEvent} />
      <EventEditModal open={editOpen} onClose={() => setEditOpen(false)} event={activeEvent} onSave={handleSave} saving={saving} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition relative"
          >
            {event.images && event.images.length > 0 ? (
              <img
                src={Array.isArray(event.images) ? event.images[0] : event.images}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-4 text-gray-500">
                No Image
              </div>
            )}

            <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">{event.description}</p>
            <p className="text-sm mt-2">
              <span className="font-medium">Date:</span>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <span className="font-medium">Time:</span> {event.time}
            </p>
            <p className="text-sm">
              <span className="font-medium">Venue:</span> {event.venue}
            </p>

            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={() => openView(event)}
                className="px-3 py-1 rounded-lg bg-white text-sm text-gray-700 shadow hover:bg-gray-50"
              >
                View
              </button>
              <button
                onClick={() => openEdit(event)}
                className="px-3 py-1 rounded-lg bg-green-600 text-sm text-white shadow hover:bg-green-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventList;
