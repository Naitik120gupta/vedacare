import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const isDoctor = user?.unsafeMetadata?.role === 'doctor';

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (!isLoaded || !user) {
      navigate('/');
      return;
    }

    const userRole = user?.unsafeMetadata?.role;
    if (userRole === 'doctor') {
      navigate('/patients');
    } else if (userRole === 'patient') {
      navigate('/patient/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" onClick={handleLogoClick} className="flex items-center">
              <span className="text-xl font-bold text-blue-600">VedaHelp</span>
            </Link>
            <div className="hidden md:flex md:items-center md:ml-10 space-x-4">
              <SignedOut>
                <Link to="/features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  Features
                </Link>
              </SignedOut>
              <SignedIn>
                {isDoctor && (
                  <Link to="/patients" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                    Patients
                  </Link>
                )}
              </SignedIn>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                to="/sign-in"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              >
                Sign In
              </Link>
              <Link
                to="/get-started"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Get Started
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;