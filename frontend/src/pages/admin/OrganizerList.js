import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrganizerTable } from "../../components/common/Tables";
import { Routes as CustomRoutes } from "../../routes";
import BreadcrumbSection from "../../components/common/BreadcrumbSection";

const OrganizerList = () => {
  const [organizerData, setOrganizerData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken')
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/organizer/", {
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
      setOrganizerData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteOrganizer = async (organizerId) => {
    try {
      console.log("Deleting");
      const response = await fetch(
        `http://localhost:8000/organizer/${organizerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the request headers
          }
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming the response is a success message or data
      const data = await response.json();
      setOrganizerData((prevUserData) =>
        prevUserData.filter((organizer) => organizer._id !== organizerId)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleUpdateOrganizer = (organizerId) => {
    navigate(CustomRoutes.EditOrganizer.path + `?id=${organizerId}`);
    
  };

  const handleDeleteOrganizer = (organizerId) => {
    deleteOrganizer(organizerId);
  };
  return (
    <>
      <BreadcrumbSection title="Organizer List" />
      <OrganizerTable
        organizers={organizerData}
        onDeleteOrganizer={handleDeleteOrganizer}
        onUpdateOrganizer={handleUpdateOrganizer}
      />
    </>
  );
};

export default OrganizerList;
