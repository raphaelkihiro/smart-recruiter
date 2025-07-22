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
    if (!token) return toast.error("Please log in");

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

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold">Recruiter: Assessments</h2>

      <ul className="space-y-2">
        {assessments.map((a) => (
          <li
            key={a.id}
            className="cursor-pointer bg-gray-100 p-2 rounded hover:bg-gray-200"
            onClick={() => handleSelect(a.id)}
          >
            {a.title}
          </li>
        ))}
      </ul>

      {selected && (
        <div className="mt-4 p-4 border rounded bg-white shadow space-y-4">
          <h3 className="text-lg font-semibold">{selected.title}</h3>
          <p>Time Limit: {selected.time_limit} mins</p>
          <p>Published: {selected.published ? "Yes" : "No"}</p>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showForm ? "Cancel" : "Add Question"}
          </button>

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
                className="cursor-pointer bg-gray-100 p-2 rounded hover:bg-gray-200"
                onClick={() => setSelectedQuestion(q)}
              >
                {q.prompt.substring(0, 60)}...
              </li>
            ))}
          </ul>

          {selectedQuestion && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <p>
                <strong>Prompt:</strong> {selectedQuestion.prompt}
              </p>
              <p>
                <strong>Type:</strong> {selectedQuestion.type}
              </p>
              {selectedQuestion.options && (
                <ul className="list-disc pl-6">
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
