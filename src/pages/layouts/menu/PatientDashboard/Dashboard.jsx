import React, { useState } from 'react';
import { CircleUserRound, ClipboardCheck, Heart, Users, ShieldCheck } from 'lucide-react';
import { useSelector } from 'react-redux';
import DashboardOverview from './DashboardOverview'
const theme = {
  bg: 'bg-[#0e1630]', 
  accent: 'text-[#F4C430]', 
  cardBg: 'bg-white/10',
  sectionCard: 'bg-white/10 p-4 rounded-lg',
  buttonBase: 'px-4 py-2 rounded-lg flex items-center gap-2 text-white',
  buttonActive: 'bg-[#0e1630]', 
  buttonHover: 'hover:bg-[#1b264a]', 
  buttonDisabled: 'bg-gray-400',
  modalContainer: 'fixed inset-0 bg-black/40 flex items-center justify-center z-50',
  modalBox: 'bg-white rounded-xl p-6 w-full max-w-xl',
  input: 'w-full border p-2 rounded', 
  checkboxLabel: 'block', 
  modalButtons: 'flex justify-end gap-4'
};

export default function App() {
  const [activeSection, setActiveSection] = useState('basic');
  const [familyTab, setFamilyTab] = useState('history');
  const [profileCompletion, setProfileCompletion] = useState(25);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe', 
    gender: 'Male', 
    phone: '+1 234 567 8900',
    bloodGroup: '', 
    dob: '1990-01-01', 
    height: '', 
    weight: '',
    isAlcoholic: false, 
    isSmoker: false, 
    allergies: '', 
    surgeries: '',
    familyHistory: { 
      diabetes: false, 
      cancer: false, 
      heartDisease: false, 
      mentalHealth: false, 
      disability: false 
    },
    familyMembers: [],
    insurance: {
      provider: '',
      policyNumber: '',
      coverageType: '',
      startDate: '',
      endDate: '',
      coverageAmount: '',
      primaryHolder: true
    }
  });

  const sections = [
    { id: 'basic', name: 'Basic Details', completion: 25, icon: CircleUserRound, isCompleted: true },
    { id: 'personal', name: 'Personal Health', completion: 50, icon: Heart, isCompleted: formData.height && formData.weight },
    { id: 'family', name: 'Family Details', completion: 75, icon: Users, isCompleted: Object.values(formData.familyHistory).some(v => v) || formData.familyMembers.length > 0 },
    { id: 'insurance', name: 'Insurance', completion: 100, icon: ShieldCheck, isCompleted: formData.insurance.provider && formData.insurance.policyNumber }
  ];

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const form = e.target.elements;
    
    if (type === 'personal') {
      setFormData(p => ({
        ...p,
        height: form.height.value, 
        weight: form.weight.value, 
        bloodGroup: form.bloodGroup.value,
        surgeries: form.surgeries.value, 
        allergies: form.allergies.value,
        isSmoker: form.smoker.checked, 
        isAlcoholic: form.alcohol.checked
      }));
      setProfileCompletion(50);
    } else if (type === 'family') {
      // Update family history if those fields were submitted
      if (form.diabetes) {
        const familyHistory = {
          diabetes: form.diabetes.checked, 
          cancer: form.cancer.checked,
          heartDisease: form.heartDisease.checked, 
          mentalHealth: form.mentalHealth.checked, 
          disability: form.disability.checked
        };
        setFormData(p => ({ ...p, familyHistory }));
      }
      
      // Add family member if those fields were submitted
      if (form.memberName) {
        const newMember = {
          name: form.memberName.value, 
          relation: form.relation.value,
          dob: form.dob.value, 
          gender: form.memberGender.value, 
          contact: form.contact.value
        };
        setFormData(p => ({ ...p, familyMembers: [...p.familyMembers, newMember] }));
      }
      
      setProfileCompletion(75);
    } else if (type === 'insurance') {
      setFormData(p => ({ 
        ...p, 
        insurance: {
          provider: form.provider.value,
          policyNumber: form.policyNumber.value,
          coverageType: form.coverageType.value,
          startDate: form.startDate.value,
          endDate: form.endDate.value,
          coverageAmount: form.coverageAmount.value,
          primaryHolder: form.primaryHolder.checked
        } 
      }));
      setProfileCompletion(100);
    }
    
    setShowModal(false);
  };

  const handleFamilyCheckboxChange = (e, item) => {
    setFormData(prev => ({
      ...prev,
      familyHistory: {
        ...prev.familyHistory,
        [item]: e.target.checked
      }
    }));
  };

  const user = useSelector((state) => state.auth?.user);
  
  const navigate = (path) => {
    console.log(`Navigating to ${path}`);
  };

  return (
    <div className="min-h-screen">
      <div className={`${theme.bg} text-white sm:p-4 rounded-xl`}>
        <div className="flex items-center gap-1 sm:gap-4">
          <div className="relative w-24 h-24 sm:w-30 sm:h-30">
            <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle className="text-white/80" strokeWidth="1" stroke="currentColor" fill="none" r="16" cx="18" cy="18" />
              <circle className="text-green-600" strokeWidth="2" strokeDasharray="100" strokeDashoffset={100 - profileCompletion}
                strokeLinecap="round" stroke="currentColor" fill="none" r="16" cx="18" cy="18" />
            </svg>
            <div className="w-full h-full rounded-full bg-white/60 flex items-center justify-center">
              <CircleUserRound className="w-16 h-16 sm:w-28 sm:h-28 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#F4C430] text-[#0e1630] font-bold px-3 py-2 rounded-full text-xs sm:text-base">
              {profileCompletion}%
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 py-4 rounded-md">
            <div className="flex flex-wrap items-center gap-6 text-white-700 text-lg">
              {/* Name */}
              <div className="flex flex-col">
                <span className="text-lg text-[#F4C430]">Name</span>
                <span className="text-lg text-white-600">
                  {user?.firstName || "Guest"} {user?.lastName || ""}
                </span>
              </div>

              {/* Divider */}
              <span className="hidden lg:block h-8 w-px bg-gray-300"></span>

              {/* DOB */}
              <div className="flex flex-col">
                <span className="text-lg text-[#F4C430]">Date of Birth</span>
                <span className="text-lg text-white-600">{user?.dob || "N/A"}</span>
              </div>

              <span className="hidden lg:block h-8 w-px bg-gray-300"></span>

              {/* Gender */}
              <div className="flex flex-col">
                <span className="text-lg text-[#F4C430]">Gender</span>
                <span className="text-lg text-white-600">{user?.gender || "N/A"}</span>
              </div>

              <span className="hidden lg:block h-8 w-px bg-gray-300"></span>

              {/* Phone */}
              <div className="flex flex-col">
                <span className="text-lg text-[#F4C430]">Phone No.</span>
                <span className="text-lg text-white-600">{user?.phone || "N/A"}</span>
              </div>

              <span className="hidden lg:block h-8 w-px bg-gray-300"></span>

              {/* Blood Group */}
              <div className="flex flex-col">
                <span className="text-lg text-[#F4C430]">Blood Group</span>
                <span className="text-lg text-white-600">{formData?.bloodGroup || "Not Set"}</span>
              </div>
            </div>
          </div>
          <button className="bg-[#F4C430] text-[#0e1630] font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
            onClick={() => navigate('/healthcard')}>
            <ClipboardCheck className="inline-block mr-2" /> Generate Health Card
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mt-10 flex gap-4 sm:gap-6 flex-wrap">
        {sections.map((s, i) => {
          const Icon = s.icon;
          const disabled = s.id !== 'basic' && !sections[i - 1].isCompleted;
          const active = activeSection === s.id;
          return (
            <button key={s.id} onClick={() => { setActiveSection(s.id); if (s.id !== 'basic') setShowModal(true); }}
              disabled={disabled}
              className={`${theme.buttonBase} ${disabled ? theme.buttonDisabled : active ? theme.buttonActive : `bg-[#1f2a4d] ${theme.buttonHover}`} text-sm sm:text-base`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" /> {s.name}
              {s.isCompleted && <ClipboardCheck className="text-green-400" />}
            </button>
          );
        })}
      </div>

      {showModal && (
        <div className={theme.modalContainer}>
          <div className={theme.modalBox}>
            {activeSection === 'personal' && (
              <form onSubmit={e => handleSubmit(e, 'personal')} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold">Personal Health Details</h2>
                <input name="height" placeholder="Height (cm)" className={theme.input} required />
                <input name="weight" placeholder="Weight (kg)" className={theme.input} required />
                <select name="bloodGroup" className={theme.input} required>
                  <option value="">Select Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => <option key={g}>{g}</option>)}
                </select>
                <input name="surgeries" placeholder="Surgeries (if any)" className={theme.input} />
                <input name="allergies" placeholder="Allergies" className={theme.input} />
                <label className={theme.checkboxLabel}><input type="checkbox" name="smoker" /> Do you smoke?</label>
                <label className={theme.checkboxLabel}><input type="checkbox" name="alcohol" /> Do you consume alcohol?</label>
                <div className={theme.modalButtons}>
                  <button type="button" onClick={() => setShowModal(false)} className="text-gray-600">Cancel</button>
                  <button type="submit" className={`${theme.bg} text-white px-4 py-2 rounded`}>Save</button>
                </div>
              </form>
            )}

            {activeSection === 'family' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Family Details</h2>
                
                <div className="flex mb-4">
                  <button 
                    type="button" 
                    onClick={() => setFamilyTab('history')}
                    className={`flex-1 py-2 border-b-2 ${familyTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-gray-300'} text-center hover:bg-gray-50 focus:outline-none`}>
                    Family Health History
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFamilyTab('members')}
                    className={`flex-1 py-2 border-b-2 ${familyTab === 'members' ? 'border-blue-500 text-blue-600' : 'border-gray-300'} text-center hover:bg-gray-50 focus:outline-none`}>
                    Family Members
                  </button>
                </div>
                
                {familyTab === 'history' && (
                  <form onSubmit={e => handleSubmit(e, 'family')} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {['diabetes', 'cancer', 'heartDisease', 'mentalHealth', 'disability'].map(item => (
                        <div key={item} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-blue-100">
                          <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              name={item}
                              className="accent-blue-500 w-5 h-5"
                              onChange={(e) => handleFamilyCheckboxChange(e, item)}
                            />
                            <span>{item.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}</span>
                          </label>
                          <input
                            type="text"
                            name={`${item}Relation`}
                            placeholder="Relation (e.g., Father, Grandmother)"
                            className="mt-2 w-full px-3 py-2 border rounded text-sm focus:ring focus:ring-blue-200" />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button type="button" onClick={() => setShowModal(false)} className="text-gray-600">Cancel</button>
                      <button type="submit" className={`${theme.bg} text-white px-4 py-2 rounded`}>Save</button>
                    </div>
                  </form>
                )}
                
                {familyTab === 'members' && (
                  <form onSubmit={e => handleSubmit(e, 'family')} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <input name="memberName" placeholder="Name" className={theme.input} required />
                      </div>
                      <div>
                        <input name="relation" placeholder="Relation" className={theme.input} required />
                      </div>
                      <div>
                        <input name="memberGender" placeholder="Gender" className={theme.input} required />
                      </div>
                      <div>
                        <input name="dob" type="date" className={theme.input} required />
                      </div>
                      <div>
                        <input name="contact" placeholder="Contact" className={theme.input} required />
                      </div>
                    </div>
                    
                    {formData.familyMembers.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Added Family Members</h3>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                          {formData.familyMembers.map((member, index) => (
                            <div key={index} className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-gray-500">{member.relation} • {member.gender}</p>
                              </div>
                              <div className="text-sm text-gray-500">
                                {member.contact}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-3 pt-4">
                      <button type="button" onClick={() => setShowModal(false)} className="text-gray-600">Cancel</button>
                      <button type="submit" className={`${theme.bg} text-white px-4 py-2 rounded`}>Add Member</button>
                    </div>
                  </form>
                )}
              </div>
            )}
            
            {activeSection === 'insurance' && (
              <form onSubmit={e => handleSubmit(e, 'insurance')} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold">Insurance Details</h2>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <input name="provider" placeholder="Insurance Provider" className={theme.input} required />
                  </div>
                  <div className="sm:col-span-2">
                    <input name="policyNumber" placeholder="Policy Number" className={theme.input} required />
                  </div>
                  <div>
                    <select name="coverageType" className={theme.input} required>
                      <option value="">Select Coverage Type</option>
                      {['Individual', 'Family', 'Group', 'Senior Citizen', 'Critical Illness', 'Accident'].map(type => 
                        <option key={type} value={type}>{type}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <input name="coverageAmount" placeholder="Coverage Amount" className={theme.input} required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Start Date</label>
                    <input name="startDate" type="date" className={theme.input} required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">End Date</label>
                    <input name="endDate" type="date" className={theme.input} required />
                  </div>
                </div>
                
                <label className={`${theme.checkboxLabel} mt-2`}>
                  <input type="checkbox" name="primaryHolder" defaultChecked /> 
                  <span className="ml-2">I am the primary policy holder</span>
                </label>
                
                <div className={theme.modalButtons}>
                  <button type="button" onClick={() => setShowModal(false)} className="text-gray-600">Cancel</button>
                  <button type="submit" className={`${theme.bg} text-white px-4 py-2 rounded`}>Save</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      <DashboardOverview/>
    </div>
  );
}