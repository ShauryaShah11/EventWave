
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Alert } from '@themesberg/react-bootstrap';
import { Routes as CustomRoutes } from "../../routes";

async function sendMail(email) {
  return fetch('http://localhost:8000/password-reset/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  })
    .then(data => data.json())
}


const ForgotPassword = () => {
  const [email,setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendMail(email);
      if (response.status === 200) {
        setError("Password reset email sent successfully");
      } else {
        setError(null);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }

  };
  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={CustomRoutes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
            </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Forgot your password?</h3>
                <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                <Form onSubmit={handleSubmit}>
                  {error && <Alert variant="success">
                    {error}
                  </Alert>}
                  <div className="mb-4">
                    <Form.Label htmlFor="email">Your Email</Form.Label>
                    <InputGroup id="email" onChange={handleEmail}>
                      <Form.Control required autoFocus type="email" placeholder="john@company.com" />
                    </InputGroup>
                  </div>
                  <Button variant="primary" type="submit" className="w-100">
                    Recover password
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

export default ForgotPassword;