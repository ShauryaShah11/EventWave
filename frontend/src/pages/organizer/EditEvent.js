import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row } from "@themesberg/react-bootstrap";
import { EditEventForm } from "../../components/common/Forms";
import { Routes as CustomRoutes } from "../../routes";

const EditEvent = () => {
  const [eventData, setEventData] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const token = localStorage.getItem('organizerToken');

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("id");

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/events/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            
          }
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEventData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[eventId]);

  const updateEvent = async (eventData) => {
    try {
      const formData = new FormData();
  
      // Append the text data to the form data
      formData.append("eventName", eventData.eventName);
      formData.append("eventDescription", eventData.eventDescription);
      formData.append("ticketPrice", eventData.ticketPrice);
      formData.append("ticketQuantity", eventData.ticketQuantity);
      formData.append("eventDate", eventData.eventDate);
  
      // Append each file to the form data
      eventData.eventImages.forEach((file) => {
        formData.append("eventImages", file);
      });
  
      // Append address fields to the form data
      formData.append("address", JSON.stringify(eventData.address));
  
      const response = await fetch(
        `http://localhost:8000/events/${eventId}`,
        {
          method: "PUT", // Use 'PUT' method to update the event
          body: formData, // Use the FormData object as the body
          headers: {
            // Include the token in the "Authorization" header
            "Authorization": `Bearer ${token}`,
        },
        }
      );
  
      if (!response.ok) {
        const responseData = await response.json(); // Parse the response JSON
        const errorMessage = responseData.error; // Extract the error message
  
        // Now you can set the error message and handle it accordingly
        setErrorMessage(errorMessage);
        throw new Error("Network response was not ok");
      } else {
        navigate(CustomRoutes.EventList.path);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message or log the error
      console.error("Error updating Event:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>

      <Row>
        <Col xs={12} xl={12}>
          <EditEventForm event={eventData} onUpdate={updateEvent} errorMessage={errorMessage}/>
        </Col>
      </Row>
    </>
  );
};

export default EditEvent;
