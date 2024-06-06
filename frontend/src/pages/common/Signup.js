import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faUser,
  faPhone,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, FormCheck, Container, InputGroup, Card } from '@themesberg/react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { Routes as CustomRoutes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

const Signup = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    fullName: "",
    dateOfBirth: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registered successfully');
        navigate(CustomRoutes.Signin.path);
      } else {
        alert('Registration failed. Please check your data.');
      }
    } catch (error) {
      alert('Registration failed due to an error.');
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Link to={CustomRoutes.AdminDashboard.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Form className="mt-4" onSubmit={handleRegister}>
                  <Form.Group id="username" className="mb-3">
                    <Form.Label>Your Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="Your username" name="username" onChange={handleInputChange} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="email" className="mb-3">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control required type="email" placeholder="example@company.com" name="email" onChange={handleInputChange} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-3">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Password" name="password" onChange={handleInputChange} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Confirm Password" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="fullName" className="mb-3">
                    <Form.Label>Your Full Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="Your full name" name="fullName" onChange={handleInputChange} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="dateOfBirth" className="mb-3">
                    <Form.Label>Your Date of Birth</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendar} />
                      </InputGroup.Text>
                      <Form.Control required type="date" name="dateOfBirth" onChange={handleInputChange} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="contactNumber" className="mb-3">
                    <Form.Label>Your Contact Number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPhone} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="Contact number" name="contactNumber" onChange={handleInputChange} />
                    </InputGroup>
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      I agree to the <Card.Link>terms and conditions</Card.Link>
                    </FormCheck.Label>
                  </FormCheck>

                  <Button variant="primary" type="submit" className="w-100 mt-4">
                    Sign up
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Signup;
