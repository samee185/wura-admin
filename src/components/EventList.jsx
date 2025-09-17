import React from "react";

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return <p className="text-center text-gray-500">No events available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event._id}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
            {event.images && event.images.length > 0 ? (
            <img
              src={event.images}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-4 text-gray-500">
              No Image
            </div>
          )}
          <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{event.description}</p>
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
        </div>
      ))}
    </div>
  );
};

export default EventList;
