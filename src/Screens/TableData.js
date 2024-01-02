// TableData.js
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const TableData = () => {
  const [formDataArray, setFormDataArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("formDataArray")) || [];
    setFormDataArray(dataFromLocalStorage);
    const handleBeforeUnload = () => {
        localStorage.removeItem("formDataArray");
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
  }, []);

  const handleEdit = (index) => {
    setSelectedItem(formDataArray[index]);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedData = formDataArray.map((item) =>
      item.id === selectedItem.id ? { ...item, ...selectedItem } : item
    );
    setFormDataArray(updatedData);
    localStorage.setItem("formDataArray", JSON.stringify(updatedData));
    setShowEditModal(false);
  };

  const handleDelete = (index) => {
    const updatedData = formDataArray.filter((item, i) => i !== index);
    setFormDataArray(updatedData);
    localStorage.setItem("formDataArray", JSON.stringify(updatedData));
  };

  return (
    <>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Email</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>City</th>
            <th>State</th>
            <th>Zipcode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formDataArray.map((data, index) => (
            <tr key={index}>
              <td>{data.email}</td>
              <td>{data.productName}</td>
              <td>{data.price}</td>
              <td>{data.quantity}</td>
              <td>{data.city}</td>
              <td>{data.state}</td>
              <td>{data.zipcode}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(index)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="editProductName">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="email"
                name="email"
                value={selectedItem?.email || ""}
                onChange={(e) => setSelectedItem((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="editProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                name="productName"
                value={selectedItem?.productName || ""}
                onChange={(e) => setSelectedItem((prev) => ({ ...prev, productName: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="editProductName">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                name="price"
                value={selectedItem?.price || ""}
                onChange={(e) => setSelectedItem((prev) => ({ ...prev, price: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="editProductName">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quantity"
                name="price"
                value={selectedItem?.quantity || ""}
                onChange={(e) => setSelectedItem((prev) => ({ ...prev, quantity: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="editProductName">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={selectedItem?.city || ""}
                onChange={(e) => setSelectedItem((prev) => ({ ...prev, city: e.target.value }))}
                required
              />
            </Form.Group>
            <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  value={selectedItem?.state}
                  onChange={(e) => setSelectedItem((prev) => ({ ...prev, city: e.target.value }))}
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
            <Form.Group controlId="editProductName">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="zipcode"
                name="zipcode"
                value={selectedItem?.zipcode || ""}
                onChange={(e) => setSelectedItem((prev) => ({ ...prev, zipcode: e.target.value }))}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TableData;
