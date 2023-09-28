import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPlus, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
import { AddEventForm } from "../common/Forms";
import { Routes as CustomRoutes } from "../../routes";
import jwt_decode from "jwt-decode"; // A library to decode JWT tokens

const AddEvent = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const save = async (eventData) => {
    try {

      const organizerToken = localStorage.getItem("organizerToken");
      const decodedToken = jwt_decode(organizerToken);
      console.log("decodedToken:", decodedToken);
      const formData = new FormData();
    
      formData.append("organizerId", decodedToken.userId);      
      formData.append("eventName", eventData.eventName);
      formData.append("ticketPrice", eventData.ticketPrice);
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
        formData.append("eventImages", file);
      });
      
      // Don't set the "Content-Type" header when sending FormData
      const response = await fetch(`http://localhost:8000/events/create`, {
        method: "POST",
        body: formData,
      });
    
      if (!response.ok) {
        const responseData = await response.json();
        const errorMessage = responseData.error;
        setErrorMessage(errorMessage);
        throw new Error("Network response was not ok");
      } else {
        navigate(CustomRoutes.AttendeeList.path);
      }
    } catch (error) {
      console.error("Error updating attendee:", error);
    }
    
    
  };
    

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown>
          <Dropdown.Toggle
            as={Button}
            variant="secondary"
            className="text-dark me-2"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>New</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item>
              <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Document
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" />{" "}
              Subscription Plan
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row>
        <Col xs={12} xl={12}>
          <AddEventForm  onSave={save} errorMessage={errorMessage}/>
        </Col>
      </Row>
    </>
  );
};

export default AddEvent;
