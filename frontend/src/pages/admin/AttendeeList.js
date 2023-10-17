import React, { useEffect, useState } from "react";
import { UserTable } from "../../components/common/Tables";
import { useNavigate } from "react-router-dom";
import { Routes as CustomRoutes } from "../../routes";
import BreadcrumbSection from "../../components/common/BreadcrumbSection";

const AttendeeList = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/users/", {
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
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteAttendee = async (attendeeId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/users/${attendeeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,// Include the token in the request headers
          }
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming the response is a success message or data
      const data = await response.json();
      setUserData((prevUserData) =>
        prevUserData.filter((attendee) => attendee._id !== attendeeId)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateAttendee = (attendeeId) => {
    navigate(CustomRoutes.EditAttendee.path + `?id=${attendeeId}`);
  };

  const handleDeleteAttendee = (attendeeId) => {
    deleteAttendee(attendeeId);
  };

  return (
    <>
      <BreadcrumbSection title="Attendee List" />
      <UserTable
        attendees={userData}
        onDeleteAttendee={handleDeleteAttendee}
        onEditAttendee={handleUpdateAttendee}
      />
    </>
  );
};

export default AttendeeList;
