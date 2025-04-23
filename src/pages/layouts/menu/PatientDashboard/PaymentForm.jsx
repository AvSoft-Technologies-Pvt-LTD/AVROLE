import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const InputField = ({ label, type = 'text', placeholder, value, onChange, error, inputClassName }) => (
  <div>
    <label className="block text-sm mb-2 font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const PaymentForm = () => {
  const location = useLocation();
  const { doctorName, consultationFee } = location.state || {};

  const [paymentAmount, setPaymentAmount] = useState(consultationFee || '');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [gpayDetails, setGpayDetails] = useState({ email: '', mobile: '', transactionId: '' });
  const [netbankingDetails, setNetbankingDetails] = useState({ bankName: '' });
  const [bankSearch, setBankSearch] = useState('');

  const handlePayment = () => {
    setTimeout(() => {
      setPaymentStatus(`Payment of ₹${paymentAmount} to Dr. ${doctorName} was successful!`);
      setShowSuccessModal(true);
      updatePaymentRecord();
    }, 2000);
  };

  const updatePaymentRecord = () => {
    const paymentData = {
      doctorName,
      amount: paymentAmount,
      method: paymentMethod,
      transactionId: 'TXN12345',
      patientDetails: {}, // optional
    };

    // Example API call (disabled in mock)
    // axios.post('/api/update-payment', paymentData)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.error(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white text-blue-800 p-8 rounded-2xl shadow-lg max-w-md w-full h-[600px] overflow-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Payment to Dr. {doctorName}</h2>

        <div className="mb-4 text-lg">
          <span>Consultation Fee: ₹{consultationFee}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {['Card', 'GPay', 'NetBanking'].map((method) => (
            <label
              key={method}
              className={`border rounded-lg p-3 text-center cursor-pointer transition-all hover:border-blue-400 ${paymentMethod === method ? 'border-blue-800 bg-blue-50 font-semibold' : 'border-gray-300'}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              {method}
            </label>
          ))}
        </div>

        {paymentMethod === 'Card' && (
          <div className="space-y-4">
            <InputField label="Card Number" placeholder="Enter card number" value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
            <InputField label="Name on Card" placeholder="Enter name" value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Expiry (MM/YY)" placeholder="MM/YY" value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
              <InputField label="CVV" placeholder="CVV" type="password" value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
            </div>
          </div>
        )}

        {paymentMethod === 'GPay' && (
          <div className="space-y-4">
            <InputField label="GPay Email" placeholder="example@gmail.com" value={gpayDetails.email}
              onChange={(e) => setGpayDetails({ ...gpayDetails, email: e.target.value })} />
            <InputField label="Mobile Number" type="tel" placeholder="10-digit number" value={gpayDetails.mobile}
              onChange={(e) => setGpayDetails({ ...gpayDetails, mobile: e.target.value })} />
            <InputField label="Transaction ID (optional)" placeholder="Txn12345..." value={gpayDetails.transactionId}
              onChange={(e) => setGpayDetails({ ...gpayDetails, transactionId: e.target.value })} />
          </div>
        )}

        {paymentMethod === 'NetBanking' && (
          <div className="space-y-3">
            <input type="text" placeholder="Search Bank" value={bankSearch}
              onChange={(e) => setBankSearch(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md mb-4 focus:ring-blue-500" />
            <div className="max-h-40 overflow-y-auto space-y-2">
              {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'PNB', 'BOB', 'Yes Bank']
                .filter(bank => bank.toLowerCase().includes(bankSearch.toLowerCase()))
                .map(bank => (
                  <label key={bank} className="flex items-center space-x-2">
                    <input type="radio" name="selectedBank" value={bank}
                      checked={netbankingDetails.bankName === bank}
                      onChange={(e) => setNetbankingDetails({ ...netbankingDetails, bankName: e.target.value })} />
                    <span>{bank}</span>
                  </label>
                ))}
            </div>
          </div>
        )}

        <button
          onClick={handlePayment}
          className="w-full bg-[#1E3A8A] text-white px-4 py-3 rounded-md hover:bg-[#172c5f] transition duration-300 mt-6"
        >
          Make Payment
        </button>

        {paymentStatus && (
          <div className="mt-4 text-green-600 text-center">{paymentStatus}</div>
        )}

        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
              <h3 className="text-xl font-semibold mb-2">🎉 Payment Successful</h3>
              <p>{paymentStatus}</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;