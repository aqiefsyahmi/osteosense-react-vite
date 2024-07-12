/* eslint-disable react/prop-types */
// ModalSuccessMessage.js
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModalSuccessMessage = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const homePage = () => {
    navigate("/doctors");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>Data submitted successfully!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={homePage}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSuccessMessage;
