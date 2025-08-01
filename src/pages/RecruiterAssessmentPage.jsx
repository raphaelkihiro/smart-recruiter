import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import QuestionForm from "../components/QuestionForm";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RecruiterAssessmentsPage() {
  const [assessments, setAssessments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please log in");
      return;
    }

    fetch(`${BASE_URL}/assessments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setAssessments)
      .catch(() => toast.error("Failed to load assessments"));
  }, []);

  async function handleSelect(id) {
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(`${BASE_URL}/assessments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setSelected(data);
      setSelectedQuestion(null);
      setShowForm(false);
      fetchQuestions(id, token);
    } catch {
      toast.error("Could not load assessment");
    }
  }

  async function fetchQuestions(id, token) {
    try {
      const res = await fetch(`${BASE_URL}/assessments/${id}/questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setQuestions(data);
    } catch {
      toast.error("Failed to load questions");
    }
  }

  function handleAddQuestion(newQuestion) {
    setQuestions((prev) => [...prev, newQuestion]);
    setSelectedQuestion(newQuestion);
    setShowForm(false);
    toast.success("Question added");
  }

  async function handleDeleteAssessment(id) {
    if (
      !window.confirm(
        "Are you sure you want to delete this assessment? This cannot be undone."
      )
    )
      return;

    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${BASE_URL}/assessments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();
      toast.success("Assessment deleted");
      setAssessments((prev) => prev.filter((a) => a.id !== id));
      setSelected(null);
      setQuestions([]);
      setSelectedQuestion(null);
      setShowForm(false);
    } catch {
      toast.error("Failed to delete assessment");
    }
  }

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold text-cyan-400">
        Recruiter: Assessments
      </h2>

      <ul className="space-y-2">
        {assessments.map((a) => (
          <li
            key={a.id}
            className="cursor-pointer bg-[#112D44] text-white p-2 rounded hover:bg-cyan-600"
            onClick={() => handleSelect(a.id)}
          >
            {a.title}
          </li>
        ))}
      </ul>

      {selected && (
        <div className="mt-4 p-4 border border-cyan-400 rounded bg-[#0D1B2A] text-white shadow space-y-4">
          <h3 className="text-lg font-semibold text-cyan-300">
            {selected.title}
          </h3>
          <p>Time Limit: {selected.time_limit} mins</p>
          <p>Published: {selected.published ? "Yes" : "No"}</p>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="bg-cyan-500 hover:bg-cyan-600 text-[#0D1B2A] font-semibold px-4 py-2 rounded transition duration-200"
            >
              {showForm ? "Cancel" : "Add Question"}
            </button>

            <button
              onClick={() => handleDeleteAssessment(selected.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
            >
               Delete Assessment
            </button>
          </div>

          {showForm && (
            <QuestionForm
              assessmentId={selected.id}
              onAdd={handleAddQuestion}
            />
          )}

          <h4 className="text-md font-semibold mt-4">Questions</h4>
          <ul className="space-y-2">
            {questions.map((q) => (
              <li
                key={q.id}
                className="cursor-pointer bg-[#112D44] text-white p-2 rounded hover:bg-cyan-700"
                onClick={() => setSelectedQuestion(q)}
              >
                {q.prompt.substring(0, 60)}...
              </li>
            ))}
          </ul>

          {selectedQuestion && (
            <div className="mt-4 p-4 border border-cyan-400 rounded bg-[#12283f] space-y-2 text-white">
              <p>
                <strong>Prompt:</strong> {selectedQuestion.prompt}
              </p>
              <p>
                <strong>Type:</strong> {selectedQuestion.type}
              </p>
              {selectedQuestion.options && (
                <ul className="list-disc pl-6 text-cyan-300">
                  {selectedQuestion.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              )}
              <p>
                <strong>Answer:</strong> {selectedQuestion.answer_key}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
