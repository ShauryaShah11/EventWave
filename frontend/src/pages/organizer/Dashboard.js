import React, { useEffect } from "react";
import {
  faCalendar,
  faCashRegister,
  faChartLine,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
} from "@themesberg/react-bootstrap";

import { CounterWidget } from "../../components/common/Widgets";
import { Routes as CustomRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

const DashboardOverview = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const organizerToken = localStorage.getItem("organizerToken");
  
    if (!organizerToken) {
      navigate(CustomRoutes.Signin.path); // Redirect to the sign-in page
    } 
  }, []);
  
  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Events"
            title="345k"
            period="Feb 1 - Apr 1"
            icon={faCalendar}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="$43,594"
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Joined Event"
            title="50"
            icon={faUsers}
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardOverview;
