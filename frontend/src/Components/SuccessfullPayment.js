import React from 'react'

export default function SuccessfullPayment() {
  return (
    <div>
          <div className="payment-success-container">
      <div className="checkmark-icon">&#10004;</div>
      <h1>Payment Successful</h1>
      <p>Payment from: Bank</p>
      <p>Mode: Net banking</p>
      <p>UPI ID: abc@xyzbank</p>
      <p>Amount Paid: $06.00</p>
      <p>Transaction ID: 123456789012</p>
      <button className="print-button">Print Receipt</button>
      <button className="close-button">Close</button>
    </div>

    </div>
  )
}
