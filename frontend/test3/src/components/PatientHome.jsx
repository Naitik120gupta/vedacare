import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const PatientHome = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.firstName || 'Patient'}
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your health journey and appointments all in one place.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Find a Doctor</h2>
            <p className="text-gray-600 mb-4">Search for doctors and book appointments</p>
            <button 
              onClick={() => navigate('/find-doctors')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Search Doctors
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Appointments</h2>
            <p className="text-gray-600 mb-4">View and manage your appointments</p>
            <button 
              onClick={() => navigate('/my-appointments')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              View Appointments
            </button>
          </div>
        </div>

        {/* Health Records Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Records</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-lg font-semibold text-blue-600">Upcoming Appointments</p>
              <p className="text-2xl font-bold text-blue-700">0</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold text-green-600">Recent Prescriptions</p>
              <p className="text-2xl font-bold text-green-700">0</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-lg font-semibold text-purple-600">Medical Reports</p>
              <p className="text-2xl font-bold text-purple-700">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHome; 