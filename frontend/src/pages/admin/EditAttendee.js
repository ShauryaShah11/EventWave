import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPlus, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
import { EditAttendeeForm } from "../../components/admin/Forms";
import { Routes as CustomRoutes } from "../../routes";

const EditAttendee = () => {
  const [userData, setUserData] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const attendeeId = searchParams.get("id");
  const token = localStorage.getItem("adminToken");
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/users/${attendeeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the request headers
          }
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
  };

  const updateAttendee = async (attendeeData) => {
    try {
      const response = await fetch(
        `${API_URL}/users/${attendeeId}`,
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
        navigate(CustomRoutes.AttendeeList.path);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message or log the error
      console.error("Error updating attendee:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [attendeeId]);

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
          <EditAttendeeForm attendee={userData} onUpdate={updateAttendee} errorMessage={errorMessage}/>
        </Col>
      </Row>
    </>
  );
};

export default EditAttendee;
