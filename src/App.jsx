import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import RectuireSignup from "./pages/Rectuiresignup";
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
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/intervieweedashboard"
            element={<IntervieweeDashboard />}
          />
          <Route path="/recruiter-signup" element={<RectuireSignup />} />
          <Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
