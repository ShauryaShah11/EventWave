import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row,  } from "@themesberg/react-bootstrap";
import { EditOrganizerForm } from "../../components/admin/Forms";
import { Routes as CustomRoutes } from "../../routes";
import jwt_decode from "jwt-decode"; // A library to decode JWT tokens

const ManageProfile = () => {
  const [organizerData, setOrganizerData] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const token = localStorage.getItem('organizerToken');

  const navigate = useNavigate();
  const decodedToken = jwt_decode(token);
  

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/organizer/${decodedToken.userId}`,
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
      setOrganizerData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [decodedToken.userId, token]);

  const updateOrganizer = async (organizerData) => {
    try {
      const response = await fetch(
        `http://localhost:8000/organizer/${decodedToken.userId}`,
        {
          method: "PUT", // Use 'PUT' method to update the attendee
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the request headers
          },
          body: JSON.stringify(organizerData)
        }
      );
      
      if (!response.ok) {
        const responseData = await response.json(); // Parse the response JSON
        const errorMessage = responseData.error; // Extract the error message

        // Now you can set the error message and handle it accordingly
        setErrorMessage(errorMessage);
        throw new Error("Network response was not ok");
      }
      else{
        alert("Profile updated successfully")
        navigate(CustomRoutes.OrganizerDashboard.path);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message or log the error
      console.error("Error updating Organizer:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Row>
        <Col xs={12} xl={12}>
          <EditOrganizerForm organizer={organizerData} onUpdate={updateOrganizer} errorMessage={errorMessage}/>
        </Col>
      </Row>
    </>
  );
};

export default ManageProfile;
