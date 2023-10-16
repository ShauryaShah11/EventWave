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
} from "@themesberg/react-bootstrap";

import { CounterWidget } from "../../components/common/Widgets";
import { trafficShares } from "../../data/charts";
import jwt_decode from "jwt-decode"; // A library to decode JWT tokens
import { Routes as CustomRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

 
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the request headers
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
  
    // If the admin token is not present, redirect to the sign-in page
    if (!token) {
      navigate(CustomRoutes.Signin.path); // Redirect to the sign-in page
    } 
  }, []);
  
  return (
    <>
      <Row className="justify-content-md-center mt-5">
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
    </>
  );
};

export default DashboardOverview;
