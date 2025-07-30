import React, { useState, useEffect } from "react";
import ResultForm from "../components/ResultsForm";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RecruiterSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [grades, setGrades] = useState({});
  const [formVisibility, setFormVisibility] = useState({});

  useEffect(() => {
    fetchSubmissions();
  }, []);

  function fetchSubmissions() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please log in");
      return;
    }

    fetch(`${BASE_URL}/submissions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setSubmissions)
      .catch(() => toast.error("Failed to load submissions"));
  }

  function updateGrade(id, value) {
    setGrades((prev) => ({ ...prev, [id]: parseFloat(value) }));
  }

  async function saveGrade(submissionId) {
    const token = localStorage.getItem("access_token");
    const grade = grades[submissionId];
    if (grade == null) return;

    try {
      const res = await fetch(`${BASE_URL}/submissions/${submissionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ grade }),
      });

      if (!res.ok) throw new Error();
      toast.success("Grade updated");
    } catch {
      toast.error("Failed to update grade");
    }
  }

  function toggleForm(submissionId) {
    setFormVisibility((prev) => ({
      ...prev,
      [submissionId]: !prev[submissionId],
    }));
  }

  async function resetAllSubmissions() {
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(`${BASE_URL}/submissions`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();
      setSubmissions([]);
      setGrades({});
      setFormVisibility({});
      toast.success("All submissions deleted");
    } catch {
      toast.error("Failed to delete submissions");
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-cyan-400">
           Submissions Review
        </h2>
        <button
          onClick={resetAllSubmissions}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold shadow"
        >
           Reset All
        </button>
      </div>

      {submissions.map((s) => (
        <div
          key={s.id}
          className="border border-cyan-400 p-6 rounded-lg shadow bg-[#0D1B2A] text-white space-y-4"
        >
          <div className="space-y-1">
            <p>
              <strong>Interviewee:</strong>{" "}
              <span className="text-cyan-300">{s.user?.name}</span>
            </p>
            <p>
              <strong>Submitted at:</strong>{" "}
              <span className="text-gray-300">
                {new Date(s.submitted_at).toLocaleString()}
              </span>
            </p>
          </div>

          <ul className="list-disc pl-4 space-y-1">
            {Object.entries(s.answers || {}).map(([qid, ans]) => (
              <li key={qid}>
                <strong>Q{qid}:</strong>{" "}
                {ans.response ? (
                  <span>{ans.response}</span>
                ) : (
                  <pre className="bg-[#12283f] p-2 rounded text-white">
                    {ans.code}
                  </pre>
                )}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <input
              type="number"
              placeholder="Grade"
              value={grades[s.id] ?? s.grade ?? ""}
              onChange={(e) => updateGrade(s.id, e.target.value)}
              className="p-2 w-28 bg-[#12283f] border border-cyan-400 rounded text-white placeholder-gray-400"
            />
            <button
              onClick={() => saveGrade(s.id)}
              className="bg-green-500 hover:bg-green-600 text-[#0D1B2A] px-4 py-2 rounded font-semibold"
            >
              Save
            </button>
            <button
              onClick={() => toggleForm(s.id)}
              className="bg-blue-500 hover:bg-blue-600 text-[#0D1B2A] px-4 py-2 rounded font-semibold"
            >
              {formVisibility[s.id] ? "Hide Result Form" : "Enter Result"}
            </button>
          </div>

          {formVisibility[s.id] && (
            <div className="mt-4 animate-fade-in">
              <ResultForm key={s.id} submissionId={s.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
