import React, { useState, useEffect } from "react";
import ResultForm from "../components/ResultsForm";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RecruiterSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [grades, setGrades] = useState({});
  const [formVisibility, setFormVisibility] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return toast.error("Please log in");

    fetch(`${BASE_URL}/submissions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Loaded submissions:", data);
        setSubmissions(data);
      })

      .catch(() => toast.error("Failed to load submissions"));
  }, []);

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

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Recruiter: Review Submissions</h2>
      {submissions.map((s) => (
        <div
          key={s.id}
          className="border p-4 rounded shadow bg-white space-y-2"
        >
          <p>
            <strong>Interviewee:</strong> {s.user?.name}
          </p>
          <p>
            <strong>Submitted at:</strong>{" "}
            {new Date(s.submitted_at).toLocaleString()}
          </p>

          <ul className="list-disc pl-4">
            {Object.entries(s.answers || {}).map(([qid, ans]) => (
              <li key={qid}>
                <strong>Q{qid}:</strong> {ans.response || <pre>{ans.code}</pre>}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="number"
              placeholder="Grade"
              value={grades[s.id] ?? s.grade ?? ""}
              onChange={(e) => updateGrade(s.id, e.target.value)}
              className="p-2 border rounded w-28"
            />
            <button
              onClick={() => saveGrade(s.id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => toggleForm(s.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              {formVisibility[s.id] ? "Hide Result Form" : "Enter Result"}
            </button>
          </div>

          {formVisibility[s.id] && (
            <div className="animate-fade-in">
              <ResultForm submissionId={s.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
