import { format } from 'date-fns';
import { useState } from 'react';

const SAMPLE_BILLS = [
  {
    id: 'INV-001',
    date: '2024-02-15',
    patientName: 'John Smith',
    serviceType: 'Consultation',
    paymentType: 'Cash',
    amount: '500'
  },
];

function Billing() {
  const [selectedBill, setSelectedBill] = useState(null);

  const handleGenerateInvoice = (bill) => {
    setSelectedBill(bill);
  };

  return (
    <div className="container ">
      <div className="bg-[#0e1630] text-white p-8 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Billing Management System</h1>
           
          </div>
         
        </div>
      </div>
      
      <div className="bg-white shadow-xl rounded-b-lg p-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#f8b84e]">
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-[#0e1630]">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-[#0e1630]">Invoice No</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-[#0e1630]">Doctor/Technician Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-[#0e1630]">Service Type</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-[#0e1630]">Payment Type</th>
                <th className="px-6 py-4 text-right text-sm font-bold uppercase tracking-wider text-[#0e1630]">Amount</th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-[#0e1630]">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {SAMPLE_BILLS.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{bill.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-[#0e1630]">{bill.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bill.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bill.serviceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full
                      ${bill.paymentType === 'Cash' ? 'bg-[#f8b84e] text-[#0e1630]' : ''}
                      ${bill.paymentType === 'Insurance' ? 'bg-blue-100 text-blue-800' : ''}
                      ${bill.paymentType === 'Card' ? 'bg-purple-100 text-purple-800' : ''}
                      ${bill.paymentType === 'UPI' ? 'bg-amber-100 text-amber-800' : ''}
                    `}>
                      {bill.paymentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium">₹{bill.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleGenerateInvoice(bill)}
                      className="bg-[#0e1630] text-white px-4 py-2 rounded-md hover:bg-[#2a466d] transition-colors"
                    >
                      Generate Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#0e1630] text-white">
                <td colSpan="5" className="px-6 py-4 text-right font-medium">Total Amount</td>
                <td className="px-6 py-4 text-right font-bold">
                  ₹{SAMPLE_BILLS.reduce((sum, bill) => sum + parseInt(bill.amount), 0)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {selectedBill && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full p-0">
            <div className="bg-[#0e1630] text-white p-6 rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">AV Swasthya</h1>
                  <p className="text-[#f8b84e]">Healthcare & Wellness Center</p>
                  <p className="text-sm opacity-80">123 Health Avenue, Medical District</p>
                  <p className="text-sm opacity-80">Contact: +91 98765 43210</p>
                </div>
                <button
                  onClick={() => setSelectedBill(null)}
                  className="text-white hover:text-gray-200 text-xl"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-8">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0e1630] mb-2">Invoice Details</h3>
                    <p className="text-gray-600">Invoice Number: <span className="font-medium text-gray-800">{selectedBill.id}</span></p>
                    <p className="text-gray-600">Date: <span className="font-medium text-gray-800">{selectedBill.date}</span></p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0e1630] mb-2">Patient Information</h3>
                    <p className="text-gray-600">Name: <span className="font-medium text-gray-800">{selectedBill.patientName}</span></p>
                  </div>
                </div>
              </div>
              
              <table className="w-full mb-8">
                <thead className="bg-[#f8b84e]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-[#0e1630]">Service Description</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-[#0e1630]">Payment Method</th>
                    <th className="px-6 py-3 text-right text-sm font-bold text-[#0e1630]">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">{selectedBill.serviceType}</td>
                    <td className="px-6 py-4">{selectedBill.paymentType}</td>
                    <td className="px-6 py-4 text-right">₹{selectedBill.amount}</td>
                  </tr>
                </tbody>
                <tfoot className="border-t-2 border-[#0e1630]">
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-right font-bold text-[#0e1630]">Total Amount</td>
                    <td className="px-6 py-4 text-right font-bold text-[#0e1630]">₹{selectedBill.amount}</td>
                  </tr>
                </tfoot>
              </table>
              
              <div className="text-center border-t border-gray-200 pt-6">
                <p className="text-gray-600 mb-4">Thank you for choosing Aav Swasthya for your healthcare needs.</p>
                <button
                  onClick={() => window.print()}
                  className="bg-[#0e1630] text-white px-8 py-3 rounded-md hover:bg-[#2a466d] transition-colors font-medium"
                >
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Billing;