import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import StudentDashboard from "./pages/Studentdashboard";

// import Assessment from "./pages/Assessment";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login/>} /> */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          {/* <Route path="/assessment" element={<Assessment/>} /> */}
        

        </Routes>
      </Router>
    </>
  );
}

export default App;
