import React, { useEffect, useState } from "react";
import { EventsAttendedByUser } from "../../components/common/Tables";
import jwt_decode from "jwt-decode"; // A library to decode JWT tokens

const AttendeeList = () => {
  const [eventAttendeeData, setEventAttendeeData] = useState([]);

  const userToken = localStorage.getItem("userToken");
  const decodedToken = jwt_decode(userToken);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/events/events-attended/${decodedToken.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userToken}`, // Include the token in the request headers
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setEventAttendeeData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mx-5">
        <div className="d-block mb-4 mb-md-0">
          <h4>Attended Event</h4>
        </div>
      </div>
      <EventsAttendedByUser eventAttendeeData={eventAttendeeData}/>
    </>
  );
};

export default AttendeeList;
