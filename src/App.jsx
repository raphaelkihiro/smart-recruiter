import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

{/*
  import RecruiterDashboard from "./pages/RecruiterDashboard";
  import IntervieweeDashboard from "./pages/IntervieweeDashboard";*/
}

import StudentDashboard from "./pages/Studentdashboard";
// import Assessment from "./pages/Assessment";




function App() {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login/>} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/*<Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
          <Route path="/intervieweedashboard" element={<IntervieweeDashboard />} />*/}

          <Route path="/dashboard" element={<StudentDashboard />} />
          {/* <Route path="/assessment" element={<Assessment/>} /> */}

        </Routes>
      </Router>
    </>
  );
}

export default App;
