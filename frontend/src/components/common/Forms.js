import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup
} from "@themesberg/react-bootstrap";
import { useNavigate } from "react-router-dom";

export const EditAttendeeForm = ({ attendee, onUpdate }) => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    contactNumber: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (attendee) {
      const { userId, fullName, contactNumber, dateOfBirth } = attendee;
      setDateOfBirth(dateOfBirth || "");
      setFormData({
        username: userId.username || "",
        fullName: fullName || "",
        email: userId.email || "",
        contactNumber: contactNumber || ""
      });
    }
  }, [attendee]);

  const handleUpdate = async () => {
    try {
      // Call the updateAttendee function and pass formData
      onUpdate({ ...formData, dateOfBirth });
    } catch (error) {
      console.error("Error updating attendee:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="username"
                  placeholder="Enter your user name"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="contactNumber"
                  placeholder="+12-345 678 910"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setDateOfBirth}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          dateOfBirth
                            ? moment(dateOfBirth).format("MM/DD/YYYY")
                            : ""
                        }
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button
              variant="secondary"
              type="button"
              className="me-2"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
            <Button variant="primary" type="button" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
