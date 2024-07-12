/* eslint-disable react/prop-types */
// ModalSuccessMessage.js
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal } from "react-bootstrap";

const ModalFailedLogin = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login Failed</Modal.Title>
      </Modal.Header>
      <Modal.Body>Invalid credentials</Modal.Body>
    </Modal>
  );
};

export default ModalFailedLogin;
