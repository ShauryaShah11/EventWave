
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown  } from '@themesberg/react-bootstrap';
import { OrganizerTable, UserTable } from "../common/Tables";



const OrganizerList = () => {
  const [organizerData, setOrganizerData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/organizer/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => setOrganizerData(data))
  .catch(error => console.error(error));
  }
  ,[])
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
        <Breadcrumb listProps={{ className: "breadcrumb-primary breadcrumb-text-light text-white" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Organizer List</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Organizer List</h4>
          {/* <p className="mb-0"></p> */}
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
          </ButtonGroup>
        </div>
      </div>
      <OrganizerTable organizers={organizerData}/>
    </>
  );
};

export default OrganizerList;