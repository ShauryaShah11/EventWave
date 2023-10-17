import React from 'react';
import { Modal, Button } from "react-bootstrap";

function PaymentModal({showPaymentModal, handlePaymentSuccess, errorMessage}) {
    return (
      <Modal show={showPaymentModal} onHide={handlePaymentSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {errorMessage && (
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          )}
          <form>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                placeholder="Enter your card number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardHolder" className="form-label">
                Card Holder
              </label>
              <input
                type="text"
                className="form-control"
                id="cardHolder"
                placeholder="Enter card holder's name"
              />
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="expiration" className="form-label">
                  Expiration Date
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expiration"
                  placeholder="MM/YY"
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  placeholder="CVV"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="amount"
                placeholder="Enter the payment amount"
              />
            </div>
          </form>
          <Button variant="primary" type="button" onClick={handlePaymentSuccess}>
            Pay Now
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
  
export default PaymentModal;