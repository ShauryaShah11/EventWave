import React, { useEffect, useState } from "react";
import { EventAttendeTable  } from "../../components/common/Tables";
import { useParams } from "react-router-dom";
import BreadcrumbSection from "../../components/common/BreadcrumbSection";
const EventAttendeeList = () => {
  const [eventAttendeeData, setEventAttendeeData] = useState([]);

  const { eventId } = useParams();
  
  const token = localStorage.getItem("organizerToken") || localStorage.getItem("adminToken");

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/events/${eventId}/attendees`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setEventAttendeeData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BreadcrumbSection title="Attended User" />      
      <EventAttendeTable eventAttendeeData={eventAttendeeData}/>
    </>
  );
};

export default EventAttendeeList;
