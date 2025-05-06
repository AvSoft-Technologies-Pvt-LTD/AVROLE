import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
const InputField = ({ label, type = 'text', placeholder, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full px-4 py-1 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 bg-slate-50" />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);
function PaymentPage() {
  const { state } = useLocation();
  const doctorName = state?.doctorName || 'Dr. John Doe';
  const consultationFee = state?.consultationFee || '500';
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [paypalEmail, setPaypalEmail] = useState('');
  const [upiID, setUpiID] = useState('');
  const [bankSearch, setBankSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [netbankingDetails, setNetbankingDetails] = useState({ bankName: '' });
  const user = useSelector(state => state.auth.user);
  const patientName = user ? `${user.firstName || "Guest"} ${user.lastName || ""}`.trim() : "Guest";
  const handlePayment = async () => {
    setLoading(true);
    const paymentData = {
      date: new Date().toISOString().split('T')[0],
      invoiceNo: 'INV-' + Math.floor(Math.random() * 1000000),
      doctorName,
      serviceType: 'Consultation',
      amount: consultationFee,
      patientName,
      method: paymentMethod,
      cardDetails,
      paypalEmail,
      upiID
    };
    try {
      // First, process the payment
      const paymentResponse = await axios.post('https://6808736c942707d722de3f7b.mockapi.io/pay', paymentData);
      if (paymentResponse.status === 201) {
        // Payment was successful, prepare the notification data
        const notificationData = {
          message: `You have a new appointment with ${patientName} on ${new Date().toISOString().split('T')[0]} at 11:00. The patient is experiencing: fever.`,
          doctorName,
          id: "1", // Assuming this is a placeholder for the notification ID
          doctorId: "101" // Replace with the actual doctor ID
        };
        // Debugging: Log notification data
        console.log('Notification data:', notificationData);
        // Send notification to the doctor
        const notificationResponse = await axios.post(
          'https://67e631656530dbd3110f0322.mockapi.io/drnotifiy',
          notificationData,
          { headers: { 'Content-Type': 'application/json' } } // Ensure JSON content type
        );
        // Check if the notification request was successful
        if (notificationResponse.status === 201) {
          setPaymentStatus(`Payment of ₹${consultationFee} to ${doctorName} was successful!`);
          setShowSuccessModal(true);
        } else {
          console.error('Failed to send notification:', notificationResponse.statusText);
          alert('Failed to send notification to the doctor.');
        }
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment failed:', error.response || error.message);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-slate-800 p-4 text-center">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Payment Details</h2>
          <div className="inline-block bg-slate-700 rounded-full px-3 py-1">
            <span className="text-yellow-400 font-medium text-sm sm:text-base">₹{consultationFee}</span>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-slate-500 text-xs">Paying to</p>
            <p className="text-slate-800 font-semibold text-sm">{doctorName}</p>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {['Card', 'UPI', 'GPay', 'NetBanking'].map((method) => (
              <button key={method} onClick={() => setPaymentMethod(method)} className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${paymentMethod === method ? 'bg-yellow-400 text-slate-900 shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{method}</button>
            ))}
          </div>
          <div className="space-y-3">
            {paymentMethod === 'Card' && (
              <>
                <InputField label="Card Number" placeholder="1234 5678 9012 3456" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
                <InputField label="Name" placeholder="John Doe" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} />
                <div className="grid grid-cols-2 gap-2">
                  <InputField label="Expiry" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
                  <InputField label="CVV" type="password" placeholder="123" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                </div>
              </>
            )}
            {paymentMethod === 'GPay' && (
              <>
                <InputField label="Email" type="email" placeholder="you@example.com" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} />
                <InputField label="Mobile" type="tel" placeholder="1234567890" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} />
              </>
            )}
            {paymentMethod === 'NetBanking' && (
              <>
                <input type="text" placeholder="Search your bank" value={bankSearch} onChange={(e) => setBankSearch(e.target.value)} className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm bg-slate-50" />
                <div className="max-h-36 overflow-y-auto space-y-1 bg-slate-50 rounded-md p-2">
                  {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak'].filter(bank => bank.toLowerCase().includes(bankSearch.toLowerCase())).map(bank => (
                    <label key={bank} className="flex items-center p-2 text-sm rounded-md cursor-pointer hover:bg-slate-100">
                      <input type="radio" name="bank" value={bank} checked={netbankingDetails.bankName === bank} onChange={(e) => setNetbankingDetails({ bankName: e.target.value })} className="text-yellow-400 focus:ring-yellow-400" />
                      <span className="ml-2 text-slate-700">{bank}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
          <button onClick={handlePayment} disabled={!paymentMethod || loading} className="w-full mt-5 bg-yellow-400 text-slate-900 py-3 rounded-xl text-sm font-semibold hover:bg-yellow-500 disabled:opacity-50">
            {loading ? 'Processing...' : `Pay ₹${consultationFee}`}
          </button>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 max-w-sm w-full text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg">✓</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Payment Successful!</h3>
            <p className="text-slate-600 text-sm mb-4">{paymentStatus}</p>
            <button onClick={() => setShowSuccessModal(false)} className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default PaymentPage;