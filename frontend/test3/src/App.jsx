import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ClerkProvider, SignIn, SignUp, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import Navbar from './components/Navbar'
import Layout from './Layout'
import Home from './components/Home'
import Features from './components/Features'
import Footer from './components/Footer'
import Patients from './components/Patients'
import PatientDetails from './components/PatientDetails'
import UserTypeSelection from './components/UserTypeSelection'
import PatientDashboard from './components/PatientsPage/PatientDashboard';

// Get Clerk publishable key from environment variable
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/features" element={<Features />} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/get-started" element={<UserTypeSelection />} />
        
        {/* Auth Routes */}
        <Route
          path="/sign-in/*"
          element={
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
              <SignIn routing="path" path="/sign-in" />
            </div>
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
              <SignUp routing="path" path="/sign-up" />
            </div>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/patients"
          element={
            <>
              <SignedIn>
                <Patients />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/patient/:id"
          element={
            <>
              <SignedIn>
                <PatientDetails />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      <Route
          path="/patient/dashboard"
          element={
            <>
              <SignedIn>
                <PatientDashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  )
}

export default App