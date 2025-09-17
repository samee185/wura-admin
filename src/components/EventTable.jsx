import React from "react";

const EventTable = ({ events }) => {
  if (!events || events.length === 0) {
    return <p className="text-center text-gray-500">No events available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
            <th className="p-3">Venue</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id} className="border-t">
              <td className="p-3">{event.title}</td>
              <td className="p-3">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="p-3">{event.time}</td>
              <td className="p-3">{event.venue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
