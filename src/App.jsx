import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import RecruiterSignup from "./pages/RecruiterSignup";

import CreateProfile from "./pages/CreateProfile";
import UpdateProfile from "./pages/UpdateProfile";
import InvitePage from "./pages/Invite";
{
  /*
  import RecruiterDashboard from "./pages/RecruiterDashboard";
  import IntervieweeDashboard from "./pages/IntervieweeDashboard";*/
}

// import Assessment from "./pages/Assessment";

import RecruiterDashboard from "./pages/RecruiterDashboard";
import IntervieweeDashboard from "./pages/IntervieweeDashboard";

function App() {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <>
      <Router>
        <Routes>
          {/* Redirect home to RecruiterDashboard */}
          <Route path="/" element={<RecruiterDashboard />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/invite" element={<InvitePage />} />

          {/*<Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
          <Route path="/intervieweedashboard" element={<IntervieweeDashboard />} />*/}

          <Route path="/update/profile" element={<UpdateProfile />} />
          <Route path="/profile" element={<CreateProfile />} />

          {/* <Route path="/assessment" element={<Assessment/>} /> */}

          <Route
            path="/intervieweedashboard"
            element={<IntervieweeDashboard />}
          />
          <Route path="/recruiter-signup" element={<RecruiterSignup />} />
          <Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
