import React, {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Col, Row } from "@themesberg/react-bootstrap";
import { AddEventForm } from "../../components/organizer/Forms";
import { Routes as CustomRoutes } from "../../routes";
import jwt_decode from "jwt-decode"; // A library to decode JWT tokens

const AddEvent = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const token = localStorage.getItem('organizerToken');
  const save = async (eventData) => {
    try {

      const organizerToken = localStorage.getItem("organizerToken");
      const decodedToken = jwt_decode(organizerToken);
      const formData = new FormData();
    
      formData.append("userId", decodedToken.userId);      
      formData.append("eventName", eventData.eventName);
      formData.append("ticketPrice", eventData.ticketPrice);
      formData.append("ticketQuantity", eventData.ticketQuantity);
      formData.append("eventDescription", eventData.eventDescription);
      formData.append("eventDate", eventData.eventDate);
    
      // Append the "address" object as JSON string
      formData.append("street", eventData.address.street);
      formData.append("city", eventData.address.city);
      formData.append("state", eventData.address.state);
      formData.append("country", eventData.address.country);
      formData.append("zipcode", eventData.address.zipcode);      
      
      // Append each file to the FormData object with the correct name
      eventData.eventImages.forEach((file) => {
        formData.append("file", file);
      });
      
      const response = await fetch(`${API_URL}/events/create`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    
      if (!response.ok) {
        const responseData = await response.json();
        const errorMessage = responseData.error;
        setErrorMessage(errorMessage);
        throw new Error("Network response was not ok");
      } else {
        navigate(CustomRoutes.EventList.path);
      }
    } catch (error) {
      console.error("Error updating attendee:", error);
    }   
    
  };    

  return (
    <>
      <Row className="mt-5">
        <Col xs={12} xl={12}>
          <AddEventForm  onSave={save} errorMessage={errorMessage}/>
        </Col>
      </Row>
    </>
  );
};

export default AddEvent;
