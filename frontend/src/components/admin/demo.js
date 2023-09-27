import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPlus, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
import { EditOrganizerForm } from "../common/Forms";
import { Routes as CustomRoutes } from "../../routes";

const EditOrganizer = () => {
  const [organizerData, setOrganizerData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const organizerId = searchParams.get("id");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/organizer/${organizerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
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
  };

  const updateOrganizer = async (organizerData) => {
    try {
      const response = await fetch(
        `http://localhost:8000/organizer/${organizerId}`,
        {
          method: "PUT", // Use 'PUT' method to update the attendee
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(organizerData)
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate(CustomRoutes.OrganizerList.path);
    } catch (error) {
      // Handle errors, e.g., show an error message or log the error
      console.error("Error updating attendee:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [organizerId]);

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
          <EditOrganizerForm organizer={organizerData} onUpdate={updateOrganizer} />
        </Col>
      </Row>
    </>
  );
};

export default EditOrganizer;