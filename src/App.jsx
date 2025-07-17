import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login/>} /> */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
