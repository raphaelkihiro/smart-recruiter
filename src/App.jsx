import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import RectuireSignup from "./pages/Rectuiresignup";
import InvitePage from "./pages/Invite";

<<<<<<< HEAD
// import RecruiterDashboard from "./pages/RecruiterDashboard";
// import IntervieweeDashboard from "./pages/IntervieweeDashboard";

import StudentDashboard from "./pages/Studentdashboard";
import RecruiterDashboard from "./pages/Recruiterdashboard";
// import Assessment from "./pages/Assessment";

=======
import CreateProfile from "./pages/CreateProfile";
import UpdateProfile from "./pages/UpdateProfile";
{/*
  import RecruiterDashboard from "./pages/RecruiterDashboard";
  import IntervieweeDashboard from "./pages/IntervieweeDashboard";*/
}

// import Assessment from "./pages/Assessment";


import RecruiterDashboard from "./pages/RecruiterDashboard";
import IntervieweeDashboard from "./pages/IntervieweeDashboard";



>>>>>>> origin/main
function App() {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/recruiter-signup" element={<RectuireSignup />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/invites" element={<InvitePage />} />
      </Routes>
    </Router>
=======
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />


          {/*<Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
          <Route path="/intervieweedashboard" element={<IntervieweeDashboard />} />*/}

          
          <Route path="/update/profile" element={<UpdateProfile />} />
          <Route path="/profile" element={<CreateProfile/>} />
   
          {/* <Route path="/assessment" element={<Assessment/>} /> */}

          <Route
            path="/intervieweedashboard"
            element={<IntervieweeDashboard />}
          />
          <Route path="/recruiter-signup" element={<RectuireSignup />} />
          <Route path="/recruiterdashboard" element={<RecruiterDashboard />} />

        </Routes>
      </Router>
    </>
>>>>>>> origin/main
  );
}

export default App;
