import React, { useEffect } from "react";
import {
  faCashRegister,
  faChartLine,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
} from "@themesberg/react-bootstrap";

import { CounterWidget } from "../../components/common/Widgets";
import { trafficShares } from "../../data/charts";
import { Routes as CustomRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";

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
            category="Organizor"
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
