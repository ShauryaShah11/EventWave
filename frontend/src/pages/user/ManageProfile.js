import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "@themesberg/react-bootstrap";
import { EditAttendeeForm } from "../../components/user/Forms";
import { Routes as CustomRoutes } from "../../routes";
import jwt_decode from "jwt-decode"; // A library to decode JWT tokens

const ManageProfile = () => {
  const [userData, setUserData] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  
  const token = localStorage.getItem("userToken");
  const decodedToken = jwt_decode(token);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/users/info/${decodedToken.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [decodedToken.userId, token]);

  const updateAttendee = async (attendeeData) => {
    try {
      const response = await fetch(
        `${API_URL}/users/update/${decodedToken.userId}`,
        {
          method: "PUT", // Use 'PUT' method to update the attendee
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the request headers
          },
          body: JSON.stringify(attendeeData)
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
        alert("Profile successfully updated")
        navigate(CustomRoutes.Home.path)
      }
    } catch (error) {
      // Handle errors, e.g., show an error message or log the error
      console.error("Error updating attendee:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Row>
        <Col xs={12} xl={12}>
          <EditAttendeeForm attendee={userData} onUpdate={updateAttendee} errorMessage={errorMessage}/>
        </Col>
      </Row>
    </>
  );
};

export default ManageProfile;
