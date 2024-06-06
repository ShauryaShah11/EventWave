import React, { useEffect, useState, useCallback } from "react";
import { EventTable } from "../../components/common/Tables";
import { useNavigate } from "react-router-dom";
import { Routes as CustomRoutes } from "../../routes";
import BreadcrumbSection from "../../components/common/BreadcrumbSection";

const EventList = () => {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken')
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/events/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the request headers

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
        `${API_URL}/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the request headers
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
    navigate(CustomRoutes.AdminEditEvent.path + `?id=${eventId}`);
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
  };

  const handleToggleFeature = async (eventId, isFeatured) => {
    try {
      const response = await fetch(
        `${API_URL}/events/toggle-feature/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the request headers
          },
          body: JSON.stringify({ isFeatured }),
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
      console.error("Error toggling feature:", error);
    }
  }

  return (
    <>
      <BreadcrumbSection title="Event List" />
      <EventTable
        events={eventData}
        onDeleteEvent={handleDeleteEvent}
        onEditEvent={handleUpdateEvent}
        handleToggleFeature={handleToggleFeature}
        userRole="admin"
      />
    </>
  );
};

export default EventList;
