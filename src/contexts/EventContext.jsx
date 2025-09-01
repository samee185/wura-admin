// src/contexts/EventContext.js
import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  });
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    setError(null);

    try {
      const { data } = await API.get("/events");
      setEvents(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  const createEvent = async (eventData) => {
    setLoading((prev) => ({ ...prev, create: true }));
    setError(null);

    try {
      let formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await API.post("/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setEvents((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const updateEvent = async (id, eventData) => {
    setLoading((prev) => ({ ...prev, update: true }));
    setError(null);

    try {
      let formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await API.put(`/events/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setEvents((prev) => prev.map((e) => (e._id === id ? data : e)));
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update event");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const deleteEvent = async (id) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    setError(null);

    try {
      await API.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete event");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        error,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

const useEvent = () => useContext(EventContext);

export default useEvent;