import { useState, useEffect } from "react";
import IntervieweeResultsPage from "../components/IntervieweeResultsPage";
import IntervieweeAssessmentsPage from "./IntervieweeAssessmentPage";
import ChallengeFetcher from "../components/ChallengeFetcher";
import logo from "../assets/image/logo.png"; // ✅ Logo import

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function IntervieweeDashboard() {
  const [activeSection, setActiveSection] = useState("details");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    fetch(`${BASE_URL}/profile`, {
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
        <div className="flex flex-col items-center space-y-2">
          <img
            src={logo}
            alt="App Logo"
            className="w-20 h-20 object-contain rounded-full shadow-md"
          />
          <h2 className="text-2xl font-bold text-cyan-400">
            Interviewee Panel
          </h2>
          <p className="text-sm text-gray-300">{profile?.name}</p>
        </div>

        <nav className="space-y-4 text-lg font-medium">
          <button
            onClick={() => setActiveSection("details")}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeSection === "details" ? "bg-cyan-600" : "hover:bg-cyan-700"
            }`}
          >
            Interview Details
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
            onClick={() => setActiveSection("challenges")}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeSection === "challenges"
                ? "bg-cyan-600"
                : "hover:bg-cyan-700"
            }`}
          >
            Toy Challenges
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
      <main className="flex-1 p-6 space-y-10">
        {loading ? (
          <p className="text-gray-300">Loading profile...</p>
        ) : (
          <>
            <section>
              <h1 className="text-3xl font-bold mb-6">
                Welcome back,{" "}
                <span className="text-cyan-400">{profile?.name}</span>
              </h1>

              {activeSection === "details" && (
                <div className="bg-[#112D44] p-6 rounded-xl shadow-md space-y-2">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                    Interview Details
                  </h2>
                  <p>
                    <strong>Interview #:</strong> {profile?.interview_number}
                  </p>
                  <p>
                    <strong>Company:</strong> {profile?.company}
                  </p>
                  <p>
                    <strong>Role:</strong> {profile?.role}
                  </p>
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
              )}

              {activeSection === "results" && <IntervieweeResultsPage />}
              {activeSection === "assessments" && (
                <IntervieweeAssessmentsPage />
              )}
              {activeSection === "challenges" && (
                <ChallengeFetcher
                  username={
                    profile?.codewarsUsername || profile?.name || "some-user"
                  }
                />
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
