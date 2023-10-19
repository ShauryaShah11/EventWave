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
import { Routes as CustomRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Title, Tooltip, Legend);

const DashboardOverview = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  // Sample chart data
  const [barChartData, setBarChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [1000,2000, 3000,4000,5000,6000,7000,8000,9000,10000,11000,12000],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });
  

  const [lineChartData, setLineChartData] = useState({
    labels: ["Label A", "Label B", "Label C"],
    datasets: [
      {
        label: "Line Chart Example",
        data: [30, 20, 50],
        fill: false,
        borderColor: "#FFCE56",
      },
    ],
  });

  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: ["Label A", "Label B", "Label C"],
    datasets: [
      {
        data: [30, 20, 50],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/revenue/revenue-by-month`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update the chart data with fetched data
      setBarChartData({
        ...barChartData,
        datasets: [
          {
            ...barChartData.datasets[0],
            data: data.barChartData, // Update with the actual data
          },
        ],
      });

      setLineChartData({
        ...lineChartData,
        datasets: [
          {
            ...lineChartData.datasets[0],
            data: data.lineChartData, // Update with the actual data
          },
        ],
      });

      setDoughnutChartData({
        ...doughnutChartData,
        datasets: [
          {
            ...doughnutChartData.datasets[0],
            data: data.doughnutChartData, // Update with the actual data
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [token, barChartData, lineChartData, doughnutChartData]);

  useEffect(() => {
    if (!token) {
      navigate(CustomRoutes.Signin.path);
    }
  }, [token]);

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
            title="₹43,594"
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
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={6} xl={12} className="mb-4">
          <div className="card">
            <div className="card-header">Bar Chart</div>
            <div className="card-body">
              <Bar data={barChartData} />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={6} xl={6} className="mb-4">
          <div className="card">
            <div className="card-header">Doughnut Chart</div>
            <div className="card-body">
              <Doughnut data={doughnutChartData} />
            </div>
          </div>
        </Col>

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <div className="card">
            <div className="card-header">Line Chart</div>
            <div className="card-body">
              <Line data={lineChartData} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DashboardOverview;