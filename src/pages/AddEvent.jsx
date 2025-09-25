import React from "react";
import EventForm from "../components/BlogForm";


const AddEvent = () => {


  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 px-4 md:px-10  pt-16 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto py-12">
        <EventForm />
      </div>
    </div>
  );
};

export default AddEvent;
