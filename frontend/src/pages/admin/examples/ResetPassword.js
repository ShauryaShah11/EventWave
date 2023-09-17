
import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@themesberg/react-bootstrap';
import { Routes as CustomRoutes } from "../../../routes";


const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const token = searchParams.get('token');

  console.log(id, token);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Send a request to your server to reset the password
    try {
      const response = await fetch('http://localhost:5000/password-reset/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, token, password }),
      });

      if (response.status === 200) {
        setError('Password succesfully updated.');
        setTimeout(() => {
          navigate(CustomRoutes.Signin.path);
        },3000)
      } else {
        setError('Password reset failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={CustomRoutes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                <Form onSubmit={handleSubmit}>
                {error && <Alert variant="success">
                  {error}
                </Alert>}
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup onChange={(e) => setPassword(e.target.value)}>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Password" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup onChange={(e) => setConfirmPassword(e.target.value)}>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Confirm Password" />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Reset password
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

export default ResetPassword;