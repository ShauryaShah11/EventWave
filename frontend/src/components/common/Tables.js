
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import { pageVisits, pageTraffic, pageRanking } from "../../data/tables";
import transactions from "../../data/transactions";
import commands from "../../data/commands";


const calculateAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dob.getFullYear();

  // Check if the birthday has occurred this year
  if (currentDate.getMonth() < dob.getMonth() || (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
    return age - 1;
  }

  return age;
};

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

export const UserTable = ({ attendees }) => {
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Name</th>
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
                  <span className="fw-normal">{attendee.fullName}</span>
                </td>
                <td>
                  <span className="fw-normal">{attendee.userId.email}</span>
                </td>
                <td>
                  <span className="fw-normal">{attendee.contactNumber}</span>
                </td>
                <td>
                <span className="fw-normal">{calculateAge(attendee.dateOfBirth)}</span>
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{attendees.length}</b> out of <b>{attendees.length}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};


export const OrganizerTable = ({ organizers }) => {
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
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{organizers.length}</b> out of <b>{organizers.length}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>Name</th>
              <th className="border-0" style={{ width: '5%' }}>Usage</th>
              <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};