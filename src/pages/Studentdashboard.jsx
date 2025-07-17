import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function StudentDashboard() {
  const student = {
    name: "Daud Elmoge",
    applications: 5,
    interviews: 2,
    resumeStatus: "Uploaded",
    upcomingInterview: {
      company: "DataDriven Ltd",
      role: "Junior Software Engineer",
      date: "2025-07-20",
      time: "10:00 AM",
      location: "Zoom",
    },
  };

  return (
    <>
      <div className="flex min-h-screen bg-[#12283f] text-white">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0d1b2a] p-6 space-y-6 hidden md:block">
          <div className="flex items-center space-x-4">
            <img
              src="/src/assets/image/logo.png"
              alt="Logo"
              className="h-12 w-12 rounded-full"
            />
            <h2 className="text-xl font-bold text-cyan-400">Smart Recruiter</h2>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-cyan-400">Student Panel</h2>
            <p className="text-sm text-gray-300 mt-1">{student.name}</p>
          </div>

          <nav className="space-y-4 text-lg md:text-xl font-medium">
            <Link
              to="/student-dashboard"
              className="block text-gray-300 hover:text-cyan-500"
            >
              🏠 Dashboard
            </Link>
            <Link
              to="/applications"
              className="block text-gray-300 hover:text-cyan-400"
            >
              📄 My Applications
            </Link>
            <Link
              to="/interviews"
              className="block text-gray-300 hover:text-cyan-400"
            >
              🎤 Interviews
            </Link>
            <Link
              to="/resume"
              className="block text-gray-300 hover:text-cyan-400"
            >
              📁 Resume
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="mt-4 block text-red-400 hover:text-red-500"
            >
              🚪 Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">
            Welcome back, <span className="text-cyan-400">{student.name}</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-2">Total Applications</h2>
              <p className="text-3xl text-cyan-400">{student.applications}</p>
            </div>

            <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                Interviews Scheduled
              </h2>
              <p className="text-3xl text-cyan-400">{student.interviews}</p>
            </div>

            <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-2">Resume Status</h2>
              <p className="text-lg text-cyan-400">{student.resumeStatus}</p>
            </div>
          </div>

          <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              Upcoming Interview
            </h2>
            <p>
              <strong>Company:</strong> {student.upcomingInterview.company}
            </p>
            <p>
              <strong>Role:</strong> {student.upcomingInterview.role}
            </p>
            <p>
              <strong>Date:</strong> {student.upcomingInterview.date}
            </p>
            <p>
              <strong>Time:</strong> {student.upcomingInterview.time}
            </p>
            <p>
              <strong>Location:</strong> {student.upcomingInterview.location}
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default StudentDashboard;
