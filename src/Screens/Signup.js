import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    id: Math.random() * 100,
    email: "",
    productName: "",
    price: "",
    quantity: "",
    city: "",
    state: "",
    zipcode: "",
  });
const navigate = useNavigate()
  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  const isAlphabetic = (value) => {
    return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value);
  };

  const validateZipCode = (zipCode) => {
    return /^\d{6}$/.test(zipCode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!isNumeric(formData.price) || !isNumeric(formData.quantity)) {
      alert("Price and Quantity must be numeric");
      return;
    }
    if (!isAlphabetic(formData.city) || !isAlphabetic(formData.state)) {
      alert("City and State must contain only alphabetic characters");
      return;
    }
    if (!validateZipCode(formData.zipcode)) {
      alert("Invalid Zip Code. It should be a 6-digit number");
      return;
    }
    const existingData = JSON.parse(localStorage.getItem("formDataArray")) || [];

    const updatedData = [...existingData, formData];

    localStorage.setItem("formDataArray", JSON.stringify(updatedData));
    alert("Submitted Successfully");
    navigate('/userData')
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-5">
      <Row className="justify-content-center" style={{ width: "90%" }}>
        <Col md={8}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              style={{ width: "80.5%" }}
            />
          </Form.Group>
          <Form.Group controlId="productName" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Email.."
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "80.5%" }}
            />
          </Form.Group>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4}>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z\s]+"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  required
                >
                  <option value="">Select</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Odisha">Odisha</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="zipcode">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  style={{ width: "90%" }}
                  pattern="\d{6}"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Col md={9} className="text-center">
            <Button variant="dark" type="submit" className="mt-5 w-100">
              Submit
            </Button>
          </Col>
        </Col>
      </Row>
    </Form>
  );
}

export default Signup;
