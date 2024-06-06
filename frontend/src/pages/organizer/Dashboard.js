import React, { useEffect, useState, useCallback } from "react";
import {
  faCalendar,
  faCashRegister,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
} from "@themesberg/react-bootstrap";

import { CounterWidget } from "../../components/common/Widgets";
import { Routes as CustomRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Title, Tooltip, Legend);

const DashboardOverview = () => {
  // const [data, setData] = useState([]);
  const [eventCount, setEventCount] = useState(0);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("organizerToken");
  const API_URL = process.env.REACT_APP_API_URL;

  const decodedToken = jwt_decode(token);

  // Sample chart data
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/revenue/revenue-by-month/${decodedToken.userId}`, {
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

      // Generate labels for the last 12 months
      const currentDate = new Date();
      const last12MonthsLabels = [];
      for (let i = 0; i < 12; i++) {
        const month = currentDate.getMonth() + 1; // Months are zero-indexed
        const year = currentDate.getFullYear();
        last12MonthsLabels.unshift(`${month}/${year}`);
        currentDate.setMonth(currentDate.getMonth() - 1);
      }

      // Populate revenue data, set to 0 if no data is available
      const revenueData = last12MonthsLabels.map(label => {
        const foundData = data.find(item => `${item._id.month}/${item._id.year}` === label);
        return foundData ? foundData.totalRevenue : 0;
      });

      // Update the chart data with the generated data
      setBarChartData({
        ...barChartData,
        labels: last12MonthsLabels,
        datasets: [
          {
            ...barChartData.datasets[0],
            data: revenueData,
          },
        ],
      });

      const eventCountResponse = await fetch(`${API_URL}/events/count/${decodedToken.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!eventCountResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const eventCountData = await eventCountResponse.json();

      setEventCount(eventCountData.count);

      const attendeeCountResponse = await fetch(`${API_URL}/events/count/events-attended/${decodedToken.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!attendeeCountResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const attendeeCountData = await attendeeCountResponse.json();
      console.log(attendeeCountData);
      setAttendeeCount(attendeeCountData.count);

      const revenueResponse = await fetch(`${API_URL}/revenue/totalRevenue/${decodedToken.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!revenueResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const totalRevenueData = await revenueResponse.json();

      setTotalRevenue(totalRevenueData.totalRevenue);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate(CustomRoutes.Signin.path);
    }
  }, [token]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Events"
            title={eventCount}
            icon={faCalendar}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title={`₹ ${totalRevenue}`}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Attendee Joined"
            title={attendeeCount}
            icon={faUsers}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={6} xl={12} className="mb-4">
          <div className="card">
            <div className="card-header">Total Revenue Per Month</div>
            <div className="card-body">
              <Bar data={barChartData} />
            </div>
          </div>
        </Col>
      </Row>

      
    </>
  );
};

export default DashboardOverview;