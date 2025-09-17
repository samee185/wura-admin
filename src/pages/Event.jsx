import React, { useEffect } from "react";
import  useEvent  from "../contexts/EventContext";
import EventList from "../components/EventList";
import EventTable from "../components/EventTable";

const EventPage = () => {
  const { events, fetchEvents } = useEvent();
  const [view, setView] = React.useState("grid"); // "grid" or "table"

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="px-6 pt-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Events</h2>
        <div>
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 rounded-l ${
              view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded-r ${
              view === "table" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Table
          </button>
        </div>
      </div>

     {view === "grid" ? (
        <EventList events={events} />
      ) : (
        <EventTable events={events} />
      )}
    </div>
  );
};

export default EventPage;
