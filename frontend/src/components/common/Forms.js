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

export const EditEventForm = ({ event, onUpdate, errorMessage }) => {
  const [eventDate, setEventDate] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    eventName: "",
    ticketPrice: "",
    eventDescription: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: ""
    }
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    if (event) {
      const { eventName, ticketPrice, eventDescription, eventDate, eventAddress, eventImages } = event;
      setEventDate(eventDate || "");
      setFormData({
        eventName: eventName || "",
        eventDescription: eventDescription || "",
        ticketPrice: ticketPrice || "",
        address: eventAddress || "",
        eventImages: eventImages || "",
      });
    }
  }, [event]);
  const handelUpdate = async () => {
    try {
      // Call the onSave function and pass formData and eventDate
      onUpdate({ ...formData, eventDate, eventImages: imageFiles });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedFiles = imageFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setImageFiles(updatedFiles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Event information</h5>
        <Form encType="multipart/form-data">
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="eventName"
                  placeholder="Enter your event name"
                  value={formData.eventName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Event Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setEventDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          eventDate
                            ? moment(eventDate).format("MM/DD/YYYY")
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
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Ticket Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="ticketPrice"
                  placeholder="$0+"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label className="form-label">Event Images</Form.Label>
                <Form.Control
                  type="file"
                  multiple={true}
                  className="form-control"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setImageFiles([...imageFiles, ...files]);
                  }}
                />
                {imageFiles.length > 0 && (
                  <ul className="list-unstyled">
                    {imageFiles.map((file, index) => (
                      <li key={index} className="mb-2">
                        <div className="d-flex align-items-center">
                          <span className="image-name">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="btn btn-sm btn-danger ms-2"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="file-preview">
                          {!file.type.startsWith("image/") && (
                            <span className="file-type">
                              File type: {file.type}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  required
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={8} className="mb-3">
              <Form.Group>
                <Form.Label>Street</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="street"
                  placeholder="Enter your home address"
                  value={formData.address.street}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="zipCode"
                  placeholder="ZIP"
                  value={formData.address.zipCode}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="state"
                  placeholder="state"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.address.country}
                  onChange={handleAddressChange}
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
            <Button variant="primary" type="button" onClick={handelUpdate}>
              Update
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};