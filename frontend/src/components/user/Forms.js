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
import { Alert } from "@themesberg/react-bootstrap";

const FormInput = ({ label, name, type, placeholder, value, onChange }) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      required
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </Form.Group>
);

export const EditAttendeeForm = ({ attendee, onUpdate, errorMessage }) => {
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
    <Card border="light" className="bg-white shadow-sm mb-6 mx-5 mt-5">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Row>
            <Col md={6} className="mb-3">
              <FormInput
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your user name"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6} className="mb-3">
              <FormInput
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6} className="mb-3">
              <FormInput
                label="Phone"
                name="contactNumber"
                type="number"
                placeholder="+12-345 678 910"
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
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





