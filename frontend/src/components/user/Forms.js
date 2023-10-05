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
    <Card border="light" className="bg-white shadow-sm mb-4">
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

export const EditOrganizerForm = ({ organizer, onUpdate, errorMessage }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contactNumber: "",
    companyName: "",
    companyAddress: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (organizer) {
      const { userId, companyName, companyAddress, contactNumber } = organizer;
      setFormData({
        username: userId.username || "",
        email: userId.email || "",
        contactNumber: contactNumber || "",
        companyName: companyName || "",
        companyAddress: companyAddress || ""
      });
    }
  }, [organizer]);

  const handleUpdate = async () => {
    try {
      // Call the updateAttendee function and pass formData
      onUpdate(formData);
    } catch (error) {
      console.error("Error updating organizer:", error);
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
                label="Company Name"
                name="companyName"
                type="text"
                placeholder="Enter your Company name"
                value={formData.companyName}
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
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3" id="companyAddress">
                <Form.Label>Company Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  required
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
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

export const EditForm = ({ attendee, onUpdate }) => {
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

export const AddEventForm = ({ onSave, errorMessage }) => {
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
      zipcode: ""
    }
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Call the onSave function and pass formData and eventDate
      onSave({ ...formData, eventDate, eventImages: imageFiles });
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
                          {file.type.startsWith("image/") && (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="img-thumbnail mt-2"
                            />
                          )}
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
                  name="zipcode"
                  placeholder="ZIP"
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
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

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