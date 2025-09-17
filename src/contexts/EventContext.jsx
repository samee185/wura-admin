import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

  const BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch events
  const fetchEvents = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    setError(null);

    try {
      const { data } = await axios.get(`${BASE_URL}/event`);
      // ✅ Extract only the array from API response
      setEvents(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch events");
      toast.error(err.response?.data?.message || "Failed to fetch events");
      setEvents([]); // fallback to empty array
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  // Create event
  const createEvent = async (eventData) => {
    setLoading((prev) => ({ ...prev, create: true }));
    setError(null);

    try {
      let formData = new FormData();
      formData.append("title", eventData.title);
      formData.append("description", eventData.description);

      if (eventData.date) {
        const formattedDate = new Date(eventData.date);
        if (!isNaN(formattedDate)) {
          formData.append("date", formattedDate.toISOString());
        }
      }

      formData.append("venue", eventData.venue);
      formData.append("time", eventData.time);

      if (Array.isArray(eventData.images)) {
        eventData.images.forEach((img) => formData.append("images", img));
      }

      formData.append("aboutEvent", eventData.aboutEvent);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(`${BASE_URL}/event`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Append new event properly
      setEvents((prev) => [...prev, data.data || data]);
      toast.success("Event created successfully");
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
      toast.error(err.response?.data?.message || "Failed to create event");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  // Update event
  const updateEvent = async (id, eventData) => {
    setLoading((prev) => ({ ...prev, update: true }));
    setError(null);

    try {
      let formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      });

      const token = localStorage.getItem("token");

      const { data } = await axios.put(`${BASE_URL}/event/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEvents((prev) =>
        prev.map((e) => (e._id === id ? data.data || data : e))
      );

      toast.success("Event updated successfully");
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update event");
      toast.error(err.response?.data?.message || "Failed to update event");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    setError(null);

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${BASE_URL}/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prev) => prev.filter((e) => e._id !== id));
      toast.success("Event deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete event");
      toast.error(err.response?.data?.message || "Failed to delete event");
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
