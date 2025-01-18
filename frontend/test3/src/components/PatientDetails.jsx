import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { getPatientById } from '../data/patientsData';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Get patient data using the helper function
    const patientData = getPatientById(parseInt(id));
    if (patientData) {
      setPatient(patientData);
      setError(false);
    } else {
      setError(true);
    }
  }, [id]);

  // Sample chat messages - now using patient ID
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Hello, how are you feeling today?', time: '09:00 AM' },
    { id: 2, sender: 'patient', text: 'The headache is still there but fever has reduced', time: '09:05 AM' },
    { id: 3, sender: 'doctor', text: 'Have you been taking the prescribed medications regularly?', time: '09:07 AM' },
    { id: 4, sender: 'patient', text: 'Yes, doctor. Three times a day as prescribed.', time: '09:10 AM' },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'doctor',
          text: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNewMessage('');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Patient Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, we couldn't find the patient with ID: {id}</p>
            <button
              onClick={() => navigate('/patients')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Return to Patients List
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 max-w-8xl mx-auto h-full">
          {/* Left Column - Patient Details */}
          <div className="lg:w-2/3 w-full bg-white rounded-xl shadow-lg p-4 lg:p-8 overflow-y-auto">
            {/* Back Button */}
            <button
              onClick={() => navigate('/patients')}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Patients List
            </button>

            {/* Header Section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-4">
                    <label className="text-gray-600 block mb-1">Patient Name</label>
                    <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-1">Doctor Name</label>
                    <h3 className="text-xl text-gray-800">{patient.doctorName}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-4">
                    <label className="text-gray-600 block mb-1">Age</label>
                    <p className="text-xl text-gray-800">{patient.age} years</p>
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-1">Date</label>
                    <p className="text-xl text-gray-800">{patient.date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Problem Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Problem</h3>
                <p className="text-gray-700">{patient.problem}</p>
              </div>

              {/* Symptoms Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Symptoms</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {patient.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>

              {/* Medications Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Medications</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">For immediate use:</h4>
                    <p className="text-gray-600 bg-white p-3 rounded">{patient.medications.immediate}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Follow-up medication:</h4>
                    <p className="text-gray-600 bg-white p-3 rounded">{patient.medications.followUp}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Questions & Answers</h3>
              <div className="space-y-4">
                {patient.questions.map((qa, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <p className="font-semibold text-gray-700 mb-2">Q: {qa.question}</p>
                    <p className="text-gray-600 bg-white p-3 rounded">A: {qa.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Chat Section */}
          <div className="lg:w-1/3 w-full bg-white rounded-xl shadow-lg flex flex-col h-[calc(100vh-12rem)]">
            {/* Chat Header */}
            <div className="p-4 border-b bg-gray-50 rounded-t-xl">
              <h2 className="text-xl font-bold text-gray-800">Chat with Patient</h2>
              <p className="text-sm text-gray-600">Patient: {patient.name}</p>
            </div>

            {/* Messages Container */}
            <div className="flex-grow p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'doctor'
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm break-words">{message.text}</p>
                    <span className="text-xs mt-1 block opacity-75">{message.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50 rounded-b-xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientDetails; 