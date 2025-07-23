import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AssessmentSubmitPage({ assessmentId }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return toast.error("Login required");

    fetch(`${BASE_URL}/assessments/${assessmentId}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setQuestions)
      .catch(() => toast.error("Failed to load questions"));
  }, [assessmentId]);

  function updateAnswer(qid, value, code = false) {
    setAnswers((prev) => ({
      ...prev,
      [qid]: code
        ? {
            type: "codekata",
            code: value.code,
            language: value.language,
          }
        : {
            type: "multiple_choice",
            response: value,
          },
    }));
  }

  async function handleSubmit() {
    const token = localStorage.getItem("access_token");
    if (!token) return toast.error("Login required");

    const payload = {
      assessment_id: assessmentId,
      answers,
    };

    toast.loading("Submitting your assessment...");
    try {
      const res = await fetch(`${BASE_URL}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      toast.dismiss();
      toast.success("Submission complete!");
      setSubmitted(true);
    } catch {
      toast.dismiss();
      toast.error("Submission failed");
    }
  }

  if (submitted) {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-green-700">
          Assessment Submitted!
        </h2>
        <p>Thanks for participating — your results will be reviewed soon.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Submit Your Assessment</h2>
      {questions.map((q) => (
        <div
          key={q.id}
          className="border p-4 rounded space-y-2 bg-white shadow"
        >
          <p>
            <strong>Prompt:</strong> {q.prompt}
          </p>

          {q.type === "multiple_choice" && (
            <select
              onChange={(e) => updateAnswer(q.id, e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select an answer</option>
              {q.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {q.type === "codekata" && (
            <>
              <select
                onChange={(e) =>
                  updateAnswer(
                    q.id,
                    {
                      ...answers[q.id],
                      language: e.target.value,
                    },
                    true
                  )
                }
                className="p-2 border rounded"
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
              </select>

              <textarea
                rows={8}
                placeholder="Enter your code"
                className="w-full p-2 border rounded font-mono"
                onChange={(e) =>
                  updateAnswer(
                    q.id,
                    {
                      ...answers[q.id],
                      code: e.target.value,
                      language: answers[q.id]?.language || "python",
                    },
                    true
                  )
                }
              />
            </>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Submit Assessment
      </button>
    </div>
  );
}
