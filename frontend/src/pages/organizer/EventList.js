import React, { useEffect, useState, useCallback } from "react";
import { EventTable } from "../../components/common/Tables";
import { useNavigate } from "react-router-dom";
import { Routes as CustomRoutes } from "../../routes";
import jwt_decode from "jwt-decode";
import BreadcrumbSection from "../../components/common/BreadcrumbSection";
const EventList = () => {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('organizerToken');
  const decodedToken = jwt_decode(token);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/events/organizer/${decodedToken.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setEventData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[eventData]);

  const deleteEvent = async (eventId) => {
    try {
      console.log("Deleting");
      const response = await fetch(
        `http://localhost:8000/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming the response is a success message or data
      const data = await response.json();
      setEventData((prevUserData) =>
        prevUserData.filter((event) => event._id !== eventId)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdateEvent = (eventId) => {
    navigate(CustomRoutes.EditEvent.path + `?id=${eventId}`);
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
  };

  return (
    <>
      <BreadcrumbSection title="Event List" />
      <EventTable
        events={eventData}
        onDeleteEvent={handleDeleteEvent}
        onEditEvent={handleUpdateEvent}

      />
    </>
  );
};

export default EventList;
