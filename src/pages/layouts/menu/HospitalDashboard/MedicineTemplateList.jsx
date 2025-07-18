import React, { useState, useEffect } from 'react';
import { Plus, Download } from 'lucide-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2pdf from 'html2pdf.js';
import DynamicTable from '../../../../components/microcomponents/DynamicTable';
import ReusableModal from '../../../../components/microcomponents/Modal';

const STORAGE_KEY = 'medicines_records_simple';

const frequencyOptions = [
  { value: 'OD', label: 'OD (Once Daily)' },
  { value: 'BID', label: 'BID (Twice Daily)' },
  { value: 'TID', label: 'TID (Three Times Daily)' },
  { value: 'QID', label: 'QID (Four Times Daily)' },
  { value: 'PRN', label: 'PRN (As Needed)' },
  { value: 'STAT', label: 'STAT (Immediately)' }
];

const dosageOptions = [
  { value: '100mg', label: '100 mg' },
  { value: '200mg', label: '200 mg' },
  { value: '250mg', label: '250 mg' },
  { value: '500mg', label: '500 mg' },
  { value: '650mg', label: '650 mg' },
  { value: '1g', label: '1 g' },
  { value: '10mg', label: '10 mg' }
];

const defaultMedicines = [
  { id: 1, medicineName: 'Paracetamol', dosage: '500mg', frequency: 'TID', duration: 5, prescribedBy: 'Dr. Smith' },
  { id: 2, medicineName: 'Amoxicillin', dosage: '250mg', frequency: 'BID', duration: 7, prescribedBy: 'Dr. John' },
  { id: 3, medicineName: 'Ibuprofen', dosage: '200mg', frequency: 'OD', duration: 3, prescribedBy: 'Dr. Jane' },
  { id: 4, medicineName: 'Metformin', dosage: '500mg', frequency: 'BID', duration: 30, prescribedBy: 'Dr. Rao' },
  { id: 5, medicineName: 'Aspirin', dosage: '100mg', frequency: 'OD', duration: 10, prescribedBy: 'Dr. Lee' },
  { id: 6, medicineName: 'Loratadine', dosage: '10mg', frequency: 'OD', duration: 5, prescribedBy: 'Dr. Patel' }
];

export default function MedicineTemplateList() {
  const [medicines, setMedicines] = useState([]);
  const [modal, setModal] = useState({ open: false, mode: 'add', item: null });
  const [filterDoctor, setFilterDoctor] = useState('');
  const [templateHtml, setTemplateHtml] = useState('');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const arr = JSON.parse(stored);
      if (Array.isArray(arr) && arr.length > 0) {
        setMedicines(arr);
      } else {
        setMedicines(defaultMedicines);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMedicines));
      }
    } else {
      setMedicines(defaultMedicines);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMedicines));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
  }, [medicines]);

  const getFields = () => [
    { name: 'medicineName', label: 'Medicine Name', type: 'text' },
    { name: 'dosage', label: 'Dosage', type: 'select', options: dosageOptions },
    { name: 'frequency', label: 'Frequency', type: 'select', options: frequencyOptions },
    { name: 'duration', label: 'Duration (days)', type: 'number' },
    { name: 'prescribedBy', label: 'Prescribed By', type: 'text' }
  ];

  const openModal = (mode, item = null) => setModal({ open: true, mode, item });
  const closeModal = () => setModal({ open: false, mode: 'add', item: null });

  const handleSave = (data) => {
    const isEdit = modal.mode === 'edit';
    const id = modal.item?.id || Date.now();
    const newItem = { ...data, id };
    if (isEdit) {
      setMedicines(prev => prev.map(m => m.id === id ? newItem : m));
      toast.success('Medicine updated');
    } else {
      setMedicines(prev => [...prev, newItem]);
      toast.success('Medicine added');
    }
    closeModal();
  };

  const handleDelete = () => {
    setMedicines(prev => prev.filter(m => m.id !== modal.item.id));
    toast.success('Medicine deleted');
    closeModal();
  };

  const filteredMedicines = filterDoctor
    ? medicines.filter(m => m.prescribedBy === filterDoctor)
    : medicines;

  const uniqueDoctors = [...new Set(medicines.map(m => m.prescribedBy))];

  const prepareTemplateHtml = () => {
    if (filteredMedicines.length === 0) {
      toast.error('No medicines to generate template');
      return;
    }

    const html = `
      <div style="font-family: Arial; padding: 20px; color: #333;">
        <div style="text-align: center; border-bottom: 2px solid #01D48C; margin-bottom: 20px;">
          <h1 style="margin: 0; color: #01D48C;">AV Swathya Hospital</h1>
          <h2 style="margin: 0;">Patient Medicine Template</h2>
          <p>Doctor Filter: ${filterDoctor || 'All'}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f2f2f2;">
              <th style="border: 1px solid #ccc; padding: 8px;">#</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Medicine</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Dosage</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Frequency</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Duration</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Prescribed By</th>
            </tr>
          </thead>
          <tbody>
            ${filteredMedicines.map((med, index) => `
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">${index + 1}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${med.medicineName}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${med.dosage}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${frequencyOptions.find(f => f.value === med.frequency)?.label || med.frequency}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${med.duration}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${med.prescribedBy}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;

    setTemplateHtml(html);
    setIsTemplateModalOpen(true);
  };

  const downloadTemplate = () => {
    const element = document.createElement('div');
    element.innerHTML = templateHtml;

    const options = {
      margin: 0.5,
      filename: `medicine-template-${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save().then(() => {
      setIsTemplateModalOpen(false);
      toast.success('PDF downloaded');
    });
  };

  return (
    <div className="pt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="h3-heading">Medicines</h2>
        <div className="flex items-center gap-2">
          <select
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All Doctors</option>
            {uniqueDoctors.map(doc => (
              <option key={doc} value={doc}>{doc}</option>
            ))}
          </select>

          <button onClick={prepareTemplateHtml} className="edit-btn flex items-center gap-1">
            <Download size={16} /> Generate PDF
          </button>

          <button className="btn btn-primary flex items-center gap-2" onClick={() => openModal('add')}>
            <Plus size={16} /> Add Medicine
          </button>
        </div>
      </div>

      <DynamicTable
        columns={[
          { accessor: 'medicineName', header: 'Medicine Name' },
          { accessor: 'dosage', header: 'Dosage' },
          { accessor: 'frequency', header: 'Frequency' },
          { accessor: 'duration', header: 'Duration (days)' },
          { accessor: 'prescribedBy', header: 'Prescribed By' },
          {
            header: 'Actions', accessor: 'actions',
            cell: (row) => (
              <div className="flex space-x-2">
                <button onClick={() => openModal('edit', row)} className="edit-btn hover:bg-blue-100 rounded p-1 transition hover:animate-bounce">
                  <FaEdit className="text-[--primary-color]" />
                </button>
                <button onClick={() => openModal('confirmDelete', row)} className="delete-btn hover:bg-blue-100 rounded p-1 transition hover:animate-bounce">
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            )
          }
        ]}
        data={filteredMedicines}
      />

      <ReusableModal
        isOpen={modal.open}
        onClose={closeModal}
        mode={modal.mode}
        title={
          modal.mode === 'edit' ? 'Edit Medicine' :
          modal.mode === 'confirmDelete' ? 'Delete Confirmation' :
          'Add Medicine'
        }
        data={modal.item}
        fields={getFields()}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      {/* Template Preview Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 shadow-xl">
            <div dangerouslySetInnerHTML={{ __html: templateHtml }} />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setIsTemplateModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Close</button>
              <button onClick={downloadTemplate} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded hover:bg-[var(--accent-color)]">Download PDF</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
