// src/contexts/EventContext.js
import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/events");
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    try {
      const { data } = await API.post("/events", eventData);
      setEvents((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      const { data } = await API.put(`/events/${id}`, eventData);
      setEvents((prev) => prev.map((e) => (e._id === id ? data : e)));
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await API.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{ events, loading, fetchEvents, createEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

const useEvent = () => useContext(EventContext);

export default useEvent;