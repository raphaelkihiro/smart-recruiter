import React from "react";
import { Link } from "react-router-dom";

function RecruiterDashboard() {
  const recruiter = {
    name: "Ms. Wanjiru",
    scheduledInterviews: 3,
    feedbackPending: 2,
    totalCandidates: 10,
  };

  return (
    <div className="flex min-h-screen bg-[#12283f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d1b2a] p-6 space-y-6 hidden md:block">
        <img
          src="./src/assets/image/logo.png"
          alt="Logo"
          className="absolute top-4 left-4 h-20 w-20 rounded-full z-50"
        />
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">Recruiter Panel</h2>
          <p className="text-sm text-gray-300 mt-1">{recruiter.name}</p>
        </div>

        <nav className="space-y-4 text-lg">
          <Link
            to="/recruiter-dashboard"
            className="block text-gray-300 hover:text-cyan-400"
          >
            🏠 Dashboard
          </Link>
          <Link
            to="/interviews"
            className="block text-gray-300 hover:text-cyan-400"
          >
            🎤 Scheduled Interviews
          </Link>
          <Link
            to="/candidates"
            className="block text-gray-300 hover:text-cyan-400"
          >
            👥 Candidates
          </Link>
          <Link
            to="/feedback"
            className="block text-gray-300 hover:text-cyan-400"
          >
            📝 Submit Feedback
          </Link>
         
          <Link
            to="/invites"
            className="block text-gray-300 hover:text-cyan-400"
          >
            📨 Manage Invites
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, <span className="text-cyan-400">{recruiter.name}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Scheduled Interviews</h2>
            <p className="text-3xl text-cyan-400">
              {recruiter.scheduledInterviews}
            </p>
          </div>

          <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Feedback Pending</h2>
            <p className="text-3xl text-cyan-400">
              {recruiter.feedbackPending}
            </p>
          </div>

          <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Candidates</h2>
            <p className="text-3xl text-cyan-400">
              {recruiter.totalCandidates}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecruiterDashboard;
