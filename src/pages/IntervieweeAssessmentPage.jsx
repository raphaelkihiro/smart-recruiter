import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { runJest } from "../../utils/jestRunner";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function IntervieweeAssessmentsPage() {
  const [assessments, setAssessments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return toast.error("Please log in");

    fetch(`${BASE_URL}/assessments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setAssessments)
      .catch(() => toast.error("Failed to load assessments"));
  }, []);

  async function handleSelect(id) {
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(`${BASE_URL}/assessments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setSelected(data);
      setSubmitted(false);
      setAnswers({});
      setTimeLeft(data.time_limit * 60);
      fetchQuestions(id, token);
    } catch {
      toast.error("Could not load assessment");
    }
  }

  async function fetchQuestions(id, token) {
    try {
      const res = await fetch(`${BASE_URL}/assessments/${id}/questions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setQuestions(data);
    } catch {
      toast.error("Failed to load questions");
    }
  }

  function updateAnswer(questionId, field, value) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [field]: value,
      },
    }));
  }

  async function handleSubmit(auto = false) {
    const token = localStorage.getItem("access_token");
    if (!token) return toast.error("Login required");
    if (submitted) return;

    const payload = {
      assessment_id: selected.id,
      answers,
    };

    if (!auto) toast.loading("Submitting your assessment...");
    try {
      const res = await fetch(`${BASE_URL}/submissions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      if (!auto) toast.dismiss();
      toast.success("Submission successful!");
      setSubmitted(true);
      setTimeLeft(0);
    } catch {
      if (!auto) toast.dismiss();
      toast.error("Submission failed");
    }
  }

  useEffect(() => {
    if (timeLeft === null || submitted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          toast("⏱ Time’s up! Submitting automatically.");
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, submitted]);

  return (
    <div className="space-y-6 p-6 bg-[#12283f] text-white min-h-screen">
      <h2 className="text-2xl font-bold text-cyan-400">Assessments</h2>

      <ul className="space-y-2">
        {assessments.map((a) => (
          <li
            key={a.id}
            className="cursor-pointer bg-[#112D44] text-white p-3 rounded hover:bg-cyan-600 transition"
            onClick={() => handleSelect(a.id)}
          >
            {a.title}
          </li>
        ))}
      </ul>

      {selected && (
        <div className="mt-4 p-6 border border-cyan-400 rounded bg-[#0D1B2A] shadow space-y-6">
          <h3 className="text-xl font-semibold text-cyan-300">
            {selected.title}
          </h3>
          <p>Time Limit: {selected.time_limit} mins</p>
          <p>Published: {selected.published ? "✅ Yes" : "❌ No"}</p>

          {timeLeft !== null && !submitted && (
            <div className="text-orange-400 font-semibold">
              ⏳ Time Remaining: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </div>
          )}

          <h4 className="text-md font-semibold">Questions</h4>
          <ul className="space-y-4">
            {questions.map((q) => (
              <li
                key={q.id}
                className="bg-[#112D44] p-4 rounded shadow space-y-2"
              >
                <p>
                  <strong>Prompt:</strong> {q.prompt}
                </p>
                <p>
                  <strong>Type:</strong> {q.type}
                </p>

                {q.type === "multiple_choice" && (
                  <select
                    className="w-full p-2 mt-2 bg-[#12283f] border border-cyan-400 rounded text-white"
                    disabled={submitted}
                    onChange={(e) =>
                      updateAnswer(q.id, "response", e.target.value)
                    }
                  >
                    <option value="">Select an option</option>
                    {q.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {(q.type === "codekata" || q.type === "codewars") && (
                  <>
                    <select
                      className="p-2 mt-2 bg-[#12283f] border border-cyan-400 rounded text-white"
                      disabled={submitted}
                      onChange={(e) =>
                        updateAnswer(q.id, "language", e.target.value)
                      }
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                    </select>

                    {q.meta?.whiteboard?.bdd && (
                      <div className="mt-2 text-sm text-cyan-300 whitespace-pre-wrap">
                        <strong>📋 BDD:</strong>
                        <br />
                        {q.meta.whiteboard.bdd}
                      </div>
                    )}
                    {q.meta?.whiteboard?.pseudocode && (
                      <div className="mt-2 text-sm text-cyan-300 whitespace-pre-wrap">
                        <strong>🧠 Pseudocode:</strong>
                        <br />
                        {q.meta.whiteboard.pseudocode}
                      </div>
                    )}
                    {q.meta?.whiteboard?.starter && (
                      <div className="mt-2 text-sm text-cyan-300 whitespace-pre-wrap">
                        <strong>💡 Starter Code:</strong>
                        <br />
                        {q.meta.whiteboard.starter}
                      </div>
                    )}

                    <textarea
                      rows={10}
                      disabled={submitted}
                      className="w-full p-2 mt-2 bg-[#12283f] border border-cyan-400 rounded font-mono text-white"
                      placeholder="Write your solution here..."
                      onChange={(e) =>
                        updateAnswer(q.id, "code", e.target.value)
                      }
                    />

                    {answers[q.id]?.language === "javascript" &&
                      answers[q.id]?.code &&
                      q.meta?.whiteboard?.tests?.length > 0 && (
                        <div className="mt-4 p-4 bg-[#0f2d3a] rounded text-white border border-cyan-500">
                          <h5 className="text-cyan-400 font-semibold mb-2">
                            🔎 Local Test Results
                          </h5>
                          {runJest(
                            answers[q.id].code,
                            q.meta.whiteboard.tests
                          ).map((r, i) => (
                            <div
                              key={i}
                              className={`text-sm mb-1 ${
                                r.passed ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              <strong>Test {i + 1}:</strong> input ={" "}
                              {JSON.stringify(r.input)}, expected ={" "}
                              {JSON.stringify(r.expected)}, got ={" "}
                              {JSON.stringify(r.output)}
                            </div>
                          ))}
                        </div>
                      )}
                  </>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleSubmit(false)}
            disabled={submitted}
            className="bg-cyan-500 hover:bg-cyan-600 text-[#0D1B2A] font-semibold px-4 py-2 rounded transition"
          >
            {submitted ? "Submitted ✅" : "Submit Assessment"}
          </button>
        </div>
      )}
    </div>
  );
}
