import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const isDoctor = user?.unsafeMetadata?.role === 'doctor';

  return (
    <section className="bg-gray-100 py-20 min-h-screen w-full">
      <div className="container mx-auto px-4 text-center">
        <SignedIn>
          {isDoctor ? (
            <>
              <h1 className="text-5xl font-bold mb-6 text-gray-900">
                Welcome back, Dr. {user?.firstName || 'Doctor'}
              </h1>
              <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
                Access your patient list and manage appointments.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/patients')}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Your Patients
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl font-bold mb-6 text-gray-900">
                Welcome {user?.firstName || 'Patient'}
              </h1>
              <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
                Patient dashboard coming soon! You'll be able to manage your appointments and view your health records.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/patients')}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Your Patients
                </button>
              </div>
            </>
          )}
        </SignedIn>

        <SignedOut>
          <h1 className="text-6xl font-bold mb-24 text-gray-900 tracking-wide">
            <TypeAnimation
              sequence={[
                'Welcome to VedaHelp',
                1000,
              ]}
              wrapper="span"
              speed={40}
              style={{
                display: 'inline-block',
                position: 'relative'
              }}
              cursor={false}
              repeat={0}
            />
            <span className="animate-blink inline-block w-0.5 h-12 bg-gray-800 ml-1" style={{ verticalAlign: 'middle' }}></span>
          </h1>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Your holistic healthcare platform bridging ancient Ayurvedic wisdom with modern medical practices for complete wellness.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/get-started')}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Begin Your Wellness Journey
            </button>
            <p className="text-gray-500">
              Join our growing community of Ayurvedic practitioners and wellness seekers
            </p>
          </div>
        </SignedOut>

        {/* Features Preview - Only show for signed out users */}
        <SignedOut>
          <div className="mt-20 grid md:grid-cols-3 gap-8 animate-slide-up">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Dosha Analysis</h3>
              <p className="text-gray-600">Discover your unique constitution and personalized wellness recommendations</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Holistic Consultation</h3>
              <p className="text-gray-600">Connect with experienced Ayurvedic practitioners for personalized guidance</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Wellness Tracking</h3>
              <p className="text-gray-600">Monitor your progress and maintain balance through Ayurvedic principles</p>
            </div>
          </div>
        </SignedOut>
      </div>
    </section>
  );
};

export default Home;