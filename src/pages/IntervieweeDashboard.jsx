import { useState, useEffect } from "react";
import IntervieweeResultsPage from "../components/IntervieweeResultsPage";
import IntervieweeAssessmentsPage from "./IntervieweeAssessmentPage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function IntervieweeDashboard() {
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    fetch(`${BASE_URL}/interviewee-profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(Array.isArray(data) ? data[0] : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/";
  }

  return (
    <div className="flex min-h-screen bg-[#12283f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1B2A] p-6 space-y-6 hidden md:block shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">
            Interviewee Panel
          </h2>
          <p className="text-sm text-gray-300 mt-1">{profile?.name}</p>
        </div>

        <nav className="space-y-4 text-lg font-medium">
          <button
            onClick={() => setActiveSection("profile")}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeSection === "profile" ? "bg-cyan-600" : "hover:bg-cyan-700"
            }`}
          >
             Interview Profile
          </button>
          <button
            onClick={() => setActiveSection("results")}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeSection === "results" ? "bg-cyan-600" : "hover:bg-cyan-700"
            }`}
          >
             My Results
          </button>
          <button
            onClick={() => setActiveSection("assessments")}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeSection === "assessments"
                ? "bg-cyan-600"
                : "hover:bg-cyan-700"
            }`}
          >
             Assessments
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-500"
          >
             Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {loading ? (
          <p>Loading profile...</p>
        ) : activeSection === "profile" ? (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Welcome back,{" "}
              <span className="text-cyan-400">{profile?.name}</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-2">Interview #</h2>
                <p className="text-2xl text-cyan-400">
                  {profile?.interview_number}
                </p>
              </div>

              <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-2">Company</h2>
                <p className="text-xl text-cyan-400">{profile?.company}</p>
              </div>

              <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-2">Role</h2>
                <p className="text-xl text-cyan-400">{profile?.role}</p>
              </div>
            </div>

            <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Upcoming Interview
              </h2>
              <p>
                <strong>Date:</strong> {profile?.date}
              </p>
              <p>
                <strong>Time:</strong> {profile?.time}
              </p>
              <p>
                <strong>Location:</strong> {profile?.location}
              </p>
            </div>
          </>
        ) : activeSection === "results" ? (
          <IntervieweeResultsPage />
        ) : (
          <IntervieweeAssessmentsPage />
        )}
      </main>
    </div>
  );
}
