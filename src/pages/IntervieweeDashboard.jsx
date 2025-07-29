import { useState, useEffect } from "react";
import IntervieweeResultsPage from "../components/IntervieweeResultsPage";
import IntervieweeAssessmentsPage from "./IntervieweeAssessmentPage";
import ChallengeFetcher from "../components/ChallengeFetcher";
import logo from "../assets/image/logo.png"; // ✅ Logo import
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function IntervieweeDashboard() {
  const [activeSection, setActiveSection] = useState("details");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    fetch(`${BASE_URL}/profile/self`, {
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
          <Link
            to={"/profile"}
            // onClick={() => setActiveSection("challenges")}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeSection === "challenges"
                ? "bg-cyan-600"
                : "hover:bg-cyan-700"
            }`}
          >
            Profile
          </Link>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
              
                    { label: "Previous Company", value: profile?.company },
                    { label: "Interested role", value: profile?.role },
                    { label: "Place of residence", value: profile?.location },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#112D44] rounded-xl shadow-md p-4 hover:shadow-lg transition"
                    >
                      <p className="text-gray-300 text-sm">{item.label}</p>
                      <p className="text-lg font-bold text-cyan-400">
                        {item.value || "N/A"}
                      </p>
                    </div>
                  ))}

                  {/* Skills List */}
                  {profile?.skills && (
                    <div className="bg-[#112D44] rounded-xl shadow-md p-4 col-span-1 md:col-span-2">
                      <h3 className="text-xl font-bold text-cyan-400 mb-2">
                        Skills
                      </h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {profile.skills.split(",").map((skill, index) => (
                          <li key={index}>{skill.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Education List */}
                  {profile?.education && (
                    <div className="bg-[#112D44] rounded-xl shadow-md p-4 col-span-1 md:col-span-2">
                      <h3 className="text-xl font-bold text-cyan-400 mb-2">
                        Education
                      </h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {profile.education.split(",").map((edu, index) => (
                          <li key={index}>{edu.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Experience List */}
                  {profile?.experience && (
                    <div className="bg-[#112D44] rounded-xl shadow-md p-4 col-span-1 md:col-span-2">
                      <h3 className="text-xl font-bold text-cyan-400 mb-2">
                        Experience
                      </h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {profile.experience.split(",").map((exp, index) => (
                          <li key={index}>{exp.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
