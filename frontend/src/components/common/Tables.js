import React, { useState } from "react";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Button
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  * as SolidIcons  from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";

const calculateAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dob.getFullYear();

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() &&
      currentDate.getDate() < dob.getDate())
  ) {
    return age - 1;
  }

  return age;
};

export const UserTable = ({ attendees, onDeleteAttendee, onEditAttendee }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedAttendeeId, setSelectedAttendeeId] = useState(null);

  const handleDeleteClick = (attendeeId) => {
    setSelectedAttendeeId(attendeeId);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteAttendee(selectedAttendeeId);
    setShowConfirmationModal(false);
    setSelectedAttendeeId(null); // Reset the selected attendee ID
  };

  const handleCancelDelete = () => {
    setSelectedAttendeeId(null);
    setShowConfirmationModal(false);
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center thead-dark">
          <thead>
            <tr className="bold-header large-font">
              <th className="border-bottom">#</th>
              <th className="border-bottom">Username</th>
              <th className="border-bottom">Full Name</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Contact Number</th>
              <th className="border-bottom">Age</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee, index) => (
              <tr key={attendee._id}>
                <td>{index + 1}</td>
                <td>
                  <span className="fw-normal">{attendee.userId.username}</span>
                </td>
                <td>
                  <span className="fw-normal">{attendee.fullName}</span>
                </td>
                <td>
                  <span className="fw-normal">{attendee.userId.email}</span>
                </td>
                <td>
                  <span className="fw-normal">{attendee.contactNumber}</span>
                </td>
                <td>
                  <span className="fw-normal">
                    {calculateAge(attendee.dateOfBirth)}
                  </span>
                </td>
                <td>
                  <Button
                    variant="outline-secondary"
                    className="m-1"
                    onClick={() => onEditAttendee(attendee._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="m-1"
                    onClick={() => handleDeleteClick(attendee._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{attendees.length}</b> out of <b>{attendees.length}</b>{" "}
            entries
          </small>
        </Card.Footer>
      </Card.Body>
      <ConfirmationModal
        subject="Are you sure you want to delete this attendee ?"
        show={showConfirmationModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
};

export const OrganizerTable = ({
  organizers,
  onDeleteOrganizer,
  onUpdateOrganizer
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedOrganizerId, setselectedOrganizerId] = useState(null);

  const handleDeleteClick = (attendeeId) => {
    setselectedOrganizerId(attendeeId);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteOrganizer(selectedOrganizerId);
    setShowConfirmationModal(false);
    setselectedOrganizerId(null); // Reset the selected attendee ID
  };

  const handleCancelDelete = () => {
    setselectedOrganizerId(null);
    setShowConfirmationModal(false);
  };
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Contact Number</th>
              <th className="border-bottom">companyAddress</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {organizers.map((organizer, index) => (
              <tr key={organizer._id}>
                <td>{index + 1}</td>
                <td>
                  <span className="fw-normal">{organizer.companyName}</span>
                </td>
                <td>
                  <span className="fw-normal">{organizer.userId.email }</span>
                </td>
                <td>
                  <span className="fw-normal">{organizer.contactNumber}</span>
                </td>
                <td>
                  <span className="fw-normal">{organizer.companyAddress}</span>
                </td>
                <td>
                  <Button
                    variant="outline-secondary"
                    className="m-1"
                    onClick={() => onUpdateOrganizer(organizer.userId._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="m-1"
                    onClick={() => handleDeleteClick(organizer._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{organizers.length}</b> out of <b>{organizers.length}</b>{" "}
            entries
          </small>
        </Card.Footer>
      </Card.Body>
      <ConfirmationModal
        subject="Are you sure you want to delete this organizer?"
        show={showConfirmationModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
};

export const EventTable = ({ events, onDeleteEvent, onEditEvent, handleToggleFeature, userRole }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteEvent(selectedEventId);
    setShowConfirmationModal(false);
    setSelectedEventId(null); // Reset the selected attendee ID
  };

  const handleCancelDelete = () => {
    setSelectedEventId(null);
    setShowConfirmationModal(false);
  };
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Event Name</th>
              <th className="border-bottom">Event Date</th>
              <th className="border-bottom">Event Venue</th>
              <th className="border-bottom">ticket quantity</th>
              <th className="border-bottom">ticket Price</th>
              <th className="border-bottom">Feature</th>
              <th className="border-bottom">Events Attended</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>
                  <span className="fw-normal">{event.eventName}</span>
                </td>
                <td>
                  <span className="fw-normal">{new Date(event.eventDate).toLocaleDateString("en-IN",{
                    year: "numeric", month:"short", day:"numeric", hour:"numeric",minute:"numeric"
                  })}</span>
                </td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "normal" }}>
                      {event.eventAddress.street},
                    </span>
                    <span style={{ fontWeight: "normal" }}>
                      {event.eventAddress.city},{event.eventAddress.state},
                    </span>
                    <span style={{ fontWeight: "normal" }}>
                      {event.eventAddress.country},{event.eventAddress.zipCode}
                    </span>
                  </div>
                </td>                
                <td>
                  <span className="fw-normal">{event.ticketQuantity}</span>
                </td>
                <td>
                  <span className="fw-normal">₹{event.ticketPrice}</span>
                </td>                
                {userRole === "admin" ? (
                  <td>
                    {event.isFeatured ? (
                      <Button onClick={() => handleToggleFeature(event._id, false)}>
                        Unfeature
                      </Button>
                    ) : (
                      <Button onClick={() => handleToggleFeature(event._id, true)}>
                        Feature
                      </Button>
                    )}
                  </td>
                ) : (
                  <td>{event.isFeatured ? "Featured" : "Not Featured"}</td>
                )}
                <td>
                  <Link to={`/events-attendee/${event._id}`}>View Events</Link>
                </td>
                <td>
                  <Button
                    variant="outline-secondary"
                    className="m-1"
                    onClick={() => onEditEvent(event._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="m-1"
                    onClick={() => handleDeleteClick(event._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{events.length}</b> out of <b>{events.length}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
      <ConfirmationModal
        subject="Are you sure you want to delete this event?"
        show={showConfirmationModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
};

export const EventsAttendedByUser = ({eventAttendeeData}) => {
  
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm mx-5 mb-5 ">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Event Name</th>
              <th className="border-bottom">Event Venue</th>
              <th className="border-bottom">Event Date</th>
              <th className="border-bottom">Ticket Price</th>
              <th className="border-bottom">Total Cost</th>
              <th className="border-bottom">Payment Status</th>
            </tr>
          </thead>
          <tbody>
          {eventAttendeeData.map((event, index) => (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>
                  <span className="fw-normal">{event.eventName}</span>
                </td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "normal" }}>
                      {event.eventAddress.street},
                    </span>
                    <span style={{ fontWeight: "normal" }}>
                      {event.eventAddress.city},{event.eventAddress.state},
                    </span>
                    <span style={{ fontWeight: "normal" }}>
                      {event.eventAddress.country},{event.eventAddress.zipCode}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="fw-normal">{new Date(event.eventDate).toLocaleDateString("en-IN",{
                    year: "numeric", month:"short", day:"numeric", hour:"numeric",minute:"numeric"
                  })}</span>
                </td>
                <td>
                  <span className="fw-normal">{event.ticketQuantity} x ₹{event.ticketPrice}</span>
                </td>
                <td>
                  <span className="fw-normal">₹{event.totalCost}</span>
                </td>
                <td>
                  <span className="fw-normal">{event.paymentStatus}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            {/* Showing <b>{events.length}</b> out of <b>{events.length}</b> entries */}
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const EventAttendeTable  = ({eventAttendeeData}) => {
  
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Attendee Name</th>
              <th className="border-bottom">Attendee Age</th>
              <th className="border-bottom">Contact Number</th>
              <th className="border-bottom">Attendence Status</th>
              <th className="border-bottom">Ticket Price</th>
              <th className="border-bottom">Total Cost</th>
              <th className="border-bottom">Payment Status</th>
            </tr>
          </thead>
          <tbody>
          {eventAttendeeData.map((event, index) => (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>
                  <span className="fw-normal">{event.attendeeId.fullName}</span>
                </td>
                <td>
                  <span className="fw-normal">{calculateAge(event.attendeeId.dateOfBirth)}</span>
                </td>
                <td>
                  <span className="fw-normal">{event.attendeeId.contactNumber}</span>
                </td>
                <td>
                  <span className="fw-normal">{event.attendanceStatus}</span>
                </td>
                <td>
                  <span className="fw-normal">{event.ticketQuantity} x ₹{event.eventId.ticketPrice}</span>
                </td>
                <td>
                  <span className="fw-normal">₹{event.totalCost}</span>
                </td>
                <td>
                  <span className="fw-normal">{event.paymentId.paymentStatus ? event.paymentId.paymentStatus : "Not Paid"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{eventAttendeeData.length}</b> out of <b>{eventAttendeeData.length}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
