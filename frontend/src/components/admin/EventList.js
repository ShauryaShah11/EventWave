import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup, Breadcrumb } from "@themesberg/react-bootstrap";
import { EventTable } from "../common/Tables";
import { useNavigate } from "react-router-dom";
import { Routes as CustomRoutes } from "../../routes";
import jwt_decode from "jwt-decode"; // A library to decode JWT tokens

const EventList = () => {
  const [eventData, setEventData] = useState([]);
  const organizerToken = localStorage.getItem("organizerToken");
  const decodedToken = jwt_decode(organizerToken);
  const navigate = useNavigate();
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/events/organizer/${decodedToken.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
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
  },[decodedToken]);

  const deleteEvent = async (eventId) => {
    try {
      console.log("Deleting");
      const response = await fetch(
        `http://localhost:8000/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
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

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            listProps={{
              className: "breadcrumb-primary breadcrumb-text-light text-white"
            }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Event List</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Event List</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">
              Share
            </Button>
            <Button variant="outline-primary" size="sm">
              Export
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <EventTable
        events={eventData}
        onDeleteEvent={handleDeleteEvent}
        onEditEvent={handleUpdateEvent}
      />
    </>
  );
};

export default EventList;
