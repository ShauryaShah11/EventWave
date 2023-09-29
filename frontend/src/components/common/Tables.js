import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Button
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

// import { Routes as CustomRoutes } from "../../routes";
import commands from "../../data/commands";
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
        subject="attendee"
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
                  <span className="fw-normal">{organizer.userId.email}</span>
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
                    onClick={() => onUpdateOrganizer(organizer._id)}
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
        subject="organizer"
        show={showConfirmationModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
};

export const EventTable = ({ events, onDeleteEvent, onEditEvent }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedOrganizerId, setselectedOrganizerId] = useState(null);

  const handleDeleteClick = (attendeeId) => {
    setselectedOrganizerId(attendeeId);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteEvent(selectedOrganizerId);
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
              <th className="border-bottom">Event Name</th>
              <th className="border-bottom">Event Date</th>
              <th className="border-bottom">Event Description</th>
              <th className="border-bottom">ticket Price</th>
              <th className="border-bottom">Event Venue</th>
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
                  <span className="fw-normal">{event.eventDate}</span>
                </td>
                <td>
                  <span className="fw-normal">{event.eventDescription}</span>
                </td>
                <td>
                  <span className="fw-normal">{event.ticketPrice}</span>
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
        subject="event"
        show={showConfirmationModal}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: "5%" }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: "5%" }}>
          <ul className="ps-0">
            {usage.map((u) => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: "50%" }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: "40%" }}>
          <pre>
            <Card.Link href={link} target="_blank">
              Read More{" "}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" />
            </Card.Link>
          </pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table
          responsive
          className="table-centered rounded"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: "5%" }}>
                Name
              </th>
              <th className="border-0" style={{ width: "5%" }}>
                Usage
              </th>
              <th className="border-0" style={{ width: "50%" }}>
                Description
              </th>
              <th className="border-0" style={{ width: "40%" }}>
                Extra
              </th>
            </tr>
          </thead>
          <tbody>
            {commands.map((c) => (
              <TableRow key={`command-${c.id}`} {...c} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
