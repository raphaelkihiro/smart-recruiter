import React, { useState, useEffect } from "react";
import RecruiterSubmissionsPage from "./RecruiterSubmissionsPage";
import AssessmentForm from "../components/AssessmentForm";
import RecruiterAssessmentPage from "./RecruiterAssessmentPage";
import RankedIntervieweesPage from "./RankedIntervieweesPage";
import ChallengeFetcher from "../components/ChallengeFetcher";
import logo from "../assets/image/logo.png";
import InvitePage from "./Invite"; 


export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [recruiter, setRecruiter] = useState({
    name: "",
    scheduledInterviews: 0,
    feedbackPending: 0,
    totalCandidates: 0,
  });

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    console.log(localStorage.getItem("user")); 
    setRecruiter((prev) => ({
      ...prev,
      name: userData.name || "Recruiter",
    }));
  }
}, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">
              {getGreeting()},{" "}
              <span className="text-cyan-400">{recruiter.name}</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                title="Scheduled Interviews"
                value={recruiter.scheduledInterviews}
              />
              <Card
                title="Feedback Pending"
                value={recruiter.feedbackPending}
              />
              <Card
                title="Total Candidates"
                value={recruiter.totalCandidates}
              />
            </div>
          </>
        );
      case "submissions":
        return <RecruiterSubmissionsPage />;
      case "createAssessment":
        return <AssessmentForm />;
      case "assessmentList":
        return <RecruiterAssessmentPage />;
      case "rankings":
        return <RankedIntervieweesPage />;
      case "challenges":
        return <ChallengeFetcher username="B-Chichi" />;
      case "invites":
        return <InvitePage />; // ✅ Invite tab content
      default:
        return null;
    }
  };

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/";
  }

    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good morning";
      if (hour < 18) return "Good afternoon";
      return "Good evening";
    };

  return (
    <div className="flex min-h-screen bg-[#12283f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d1b2a] p-6 space-y-6 hidden md:block shadow-md">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 object-contain rounded-full shadow-md"
          />
          <h2 className="text-2xl font-bold text-cyan-400">Recruiter Panel</h2>
          <p className="text-sm text-gray-300">{recruiter.name}</p>
        </div>

        <nav className="space-y-4 text-lg font-medium">
          <Tab
            label="Dashboard"
            tab="dashboard"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            label="Submissions"
            tab="submissions"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            label="Create Assessment"
            tab="createAssessment"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            label="Assessments"
            tab="assessmentList"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            label="Leaderboard"
            tab="rankings"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            label="Toy Challenges"
            tab="challenges"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            label="Invites"
            tab="invites"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-500"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}

function Tab({ label, tab, activeTab, setActiveTab }) {
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`block text-left w-full px-4 py-2 rounded ${
        activeTab === tab
          ? "bg-cyan-600 text-white"
          : "text-gray-300 hover:text-cyan-400"
      }`}
    >
      {label}
    </button>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-[#112D44] p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl text-cyan-400">{value}</p>
    </div>
  );
}
