import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const { openSignUp } = useClerk();

  const handleDoctorSignUp = () => {
    openSignUp({
      initialValues: {
        unsafeMetadata: {
          role: 'doctor',
        },
      },
      redirectUrl: '/patients',
    });
  };

  const handlePatientSignUp = () => {
    openSignUp({
      initialValues: {
        unsafeMetadata: {
          role: 'patient',
        },
      },
      redirectUrl: '/patient/dashboard',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to VedaHelp</h1>
          <p className="text-xl text-gray-600">Choose how you want to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Doctor Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">I'm a Doctor</h2>
            <p className="text-gray-600 mb-6">
              Access your patient records, manage appointments, and provide medical care
            </p>
            <button 
              onClick={handleDoctorSignUp}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continue as Doctor
            </button>
          </div>

          {/* Patient Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:shadow-xl">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">I'm a Patient</h2>
            <p className="text-gray-600 mb-6">
              Book appointments, view medical history, and communicate with your doctors
            </p>
            <button 
              onClick={handlePatientSignUp}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continue as Patient
            </button>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection; 