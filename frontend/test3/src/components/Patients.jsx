import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { getAllPatients } from '../data/patientsData';

const Patients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Get all patients using the helper function
    setPatients(getAllPatients());
    setIsLoading(false);
  }, []);

  const handlePatientClick = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSortBy('name');
    setSortOrder('asc');
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Filter and sort patients
  const filteredAndSortedPatients = patients
    .filter(patient => 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === 'All' || patient.status === statusFilter)
    )
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'age') {
        return (a.age - b.age) * order;
      }
      if (sortBy === 'lastVisit') {
        return (new Date(a.lastVisit) - new Date(b.lastVisit)) * order;
      }
      return a[sortBy].localeCompare(b[sortBy]) * order;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Patients List</h2>
            <span className="text-gray-600">
              Total Patients: {filteredAndSortedPatients.length}
            </span>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="mb-6 space-y-4">
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search patients by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Treatment">In Treatment</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                onClick={clearSearch}
                className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring"
              >
                Clear Filters
              </button>
            </div>

            {/* Sort Controls */}
            <div className="flex space-x-2">
              <span className="text-gray-700">Sort by:</span>
              {['name', 'age', 'lastVisit', 'status'].map((field) => (
                <button
                  key={field}
                  onClick={() => handleSort(field)}
                  className={`px-3 py-1 rounded ${
                    sortBy === field
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortBy === field && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {filteredAndSortedPatients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No patients found matching your criteria
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => handlePatientClick(patient.id)}
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">{patient.name}</h3>
                      <p className="text-gray-600">Problem: {patient.problem}</p>
                      <p className="text-gray-500 text-sm">
                        Age: {patient.age} | Last Visit: {patient.lastVisit}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      patient.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      patient.status === 'In Treatment' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {patient.status}
                    </span>
                    <button className="text-blue-500 hover:text-blue-700">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Patients; 