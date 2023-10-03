import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faChartLine,
  faCloudUploadAlt,
  faPlus,
  faTasks,
  faUserShield,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup
} from "@themesberg/react-bootstrap";

import { CounterWidget } from "../../components/common/Widgets";
import { trafficShares } from "../../data/charts";
import jwt_decode from "jwt-decode"; // A library to decode JWT tokens
import { Routes as CustomRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to decode the token and set user state
  const decodeToken = (token) => {
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
      console.log(user);
    } else {
      setUser(null);
    }
  };
 
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[]);

  useEffect(() => {
    // Check if the admin token is stored in localStorage
    const adminToken = localStorage.getItem("adminToken");
  
    // If the admin token is not present, redirect to the sign-in page
    if (!adminToken) {
      navigate(CustomRoutes.Signin.path); // Redirect to the sign-in page
    } else {
      // Decode the stored token and set user state
      decodeToken(adminToken);
  
      // Set the token in the state
      setToken(adminToken);
    }
  }, []);
  
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle
            as={Button}
            variant="primary"
            size="sm"
            className="me-2"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New Task
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />{" "}
              Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview
              Security
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <ButtonGroup>
          <Button variant="outline-primary" size="sm">
            Share
          </Button>
          <Button variant="outline-primary" size="sm">
            Export
          </Button>
        </ButtonGroup>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Customers"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faUsers}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Organizer"
            title="50"
            period="Feb 1 - Apr 1"
            icon={faUsers}
            data={trafficShares}
          />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Customers"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Organizer"
            title="50"
            period="Feb 1 - Apr 1"
            icon={faUsers}
            data={trafficShares}
          />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Customers"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Organizer"
            title="50"
            period="Feb 1 - Apr 1"
            icon={faUsers}
            data={trafficShares}
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardOverview;
