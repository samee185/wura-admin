import React from "react";

const EventViewModal = ({ open, onClose, event }) => {
  if (!open || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-2xl font-extrabold text-gray-800">{event.title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 rounded-lg p-2"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {event.images && event.images.length > 0 ? (
            <img
              src={Array.isArray(event.images) ? event.images[0] : event.images}
              alt={event.title}
              className="w-full h-56 object-cover rounded-md mt-4"
            />
          ) : (
            <div className="w-full h-56 bg-gray-100 rounded-md mt-4 flex items-center justify-center text-gray-400">
              No image
            </div>
          )}

          <div className="mt-4 text-gray-700 space-y-3">
            <p className="leading-relaxed">{event?.description}</p>
            <p className="leading-relaxed text-2xl text-center font-semibold">About Event</p>
            <p className="leading-relaxed">{event?.aboutEvent}</p>
            <div className="flex gap-6 mt-4 text-sm text-gray-500">
              <div>
                <div className="font-medium text-gray-600">Date</div>
                <div>{new Date(event?.date).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="font-medium text-gray-600">Time</div>
                <div>{event?.time}</div>
              </div>
              <div>
                <div className="font-medium text-gray-600">Venue</div>
                <div>{event?.venue}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventViewModal;
