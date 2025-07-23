import React, { useState, useEffect } from "react";
import RecruiterSubmissionsPage from "./RecruiterSubmissionsPage";
import AddInterviewForm from "../components/AddInterviewForm";
import AssessmentForm from "../components/AssessmentForm";
import RecruiterAssessmentPage from "./RecruiterAssessmentPage";

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
              Welcome, <span className="text-cyan-400">{recruiter.name}</span>
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
      case "addInterview":
        return <AddInterviewForm />;
      case "createAssessment":
        return <AssessmentForm />;
      case "assessmentList":
        return <RecruiterAssessmentPage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#12283f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d1b2a] p-6 space-y-6 hidden md:block">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">Recruiter Panel</h2>
          <p className="text-sm text-gray-300 mt-1">{recruiter.name}</p>
        </div>
        <nav className="space-y-4 text-lg">
          <Tab
            label=" Dashboard"
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
            label="Schedule Interview"
            tab="addInterview"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            label=" Create Assessment"
            tab="createAssessment"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <Tab
            label=" Assessments"
            tab="assessmentList"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
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
