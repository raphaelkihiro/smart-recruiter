import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function IntervieweeResultsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return toast.error("Please log in");

    fetch(`${BASE_URL}/interviewee/results`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setResults)
      .catch(() => toast.error("Failed to load results"));
  }, []);

  const sorted = [...results].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return (
    <div className="p-6 space-y-6 bg-[#12283f] text-white min-h-screen">
      <h2 className="text-2xl font-bold text-cyan-400">
        My Assessment Results
      </h2>

      {sorted.map((r) => (
        <div
          key={r.id}
          className="border border-cyan-400 rounded-lg p-6 bg-[#0D1B2A] shadow space-y-2"
        >
          <p>
            <strong className="text-cyan-300">Score:</strong> {r.score}
          </p>
          <p>
            <strong className="text-cyan-300">Grade:</strong>{" "}
            {r.submission?.grade ?? "Not available"}
          </p>
          <p>
            <strong className="text-cyan-300">Rank:</strong>{" "}
            {r.rank ?? "Pending"}
          </p>
          <p>
            <strong className="text-cyan-300">Status:</strong>{" "}
            {r.pass_status ? "✅ Passed" : "❌ Failed"}
          </p>
          <p>
            <strong className="text-cyan-300">Time Taken:</strong>{" "}
            {r.time_taken} mins
          </p>
          <p>
            <strong className="text-cyan-300">Feedback:</strong>{" "}
            {r.feedback_summary || "No feedback provided"}
          </p>
        </div>
      ))}
    </div>
  );
}
