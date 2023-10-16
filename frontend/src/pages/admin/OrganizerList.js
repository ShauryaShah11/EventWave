import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {  Breadcrumb } from "@themesberg/react-bootstrap";
import { OrganizerTable } from "../../components/common/Tables";
import { Routes as CustomRoutes } from "../../routes";

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
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            listProps={{
              className: "breadcrumb-primary breadcrumb-text-light text-white"
            }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Organizer List</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Organizer List</h4>
          {/* <p className="mb-0"></p> */}
        </div>
      </div>
      <OrganizerTable
        organizers={organizerData}
        onDeleteOrganizer={handleDeleteOrganizer}
        onUpdateOrganizer={handleUpdateOrganizer}
      />
    </>
  );
};

export default OrganizerList;
