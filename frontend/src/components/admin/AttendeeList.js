
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown  } from '@themesberg/react-bootstrap';
import { UserTable } from "../common/Tables";

const AttendeeList = () => {
  const [userData, setUserData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteAttendee = async (attendeeId) => {
    try {
      console.log("Deleting");
      const response = await fetch(`http://localhost:5000/users/${attendeeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Assuming the response is a success message or data
      const data = await response.json();
      setUserData((prevUserData) =>
          prevUserData.filter((attendee) => attendee._id !== attendeeId)
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }
  ,[])

  const handleUpdateAttendee = (updatedAttendee) => {
    
  };

  const handleDeleteAttendee = (attendeeId) => {
    deleteAttendee(attendeeId);
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
        <Breadcrumb listProps={{ className: "breadcrumb-primary breadcrumb-text-light text-white" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Attendees List</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Attendees List</h4>
          {/* <p className="mb-0"></p> */}
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
          </ButtonGroup>
        </div>
      </div>
      <UserTable 
        attendees={userData}
        onDeleteAttendee={handleDeleteAttendee} 
        onUpdateAttendee={handleUpdateAttendee}
       />
    </>
  );
};

export default AttendeeList;