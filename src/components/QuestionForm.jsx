import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_API = "https://www.codewars.com/api/v1";

// Curated Codewars problems
const curatedSlugs = [
  "multiply",
  "sum-of-positive",
  "remove-string-spaces",
  "get-the-middle-character",
  "string-repeat",
];

export default function QuestionForm({ assessmentId, onAdd }) {
  const [type, setType] = useState("multiple_choice");
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answerKey, setAnswerKey] = useState("");
  const [codewarsList, setCodewarsList] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");

  useEffect(() => {
    Promise.all(
      curatedSlugs.map((slug) =>
        fetch(`${BASE_API}/code-challenges/${slug}`).then((res) =>
          res.ok ? res.json() : null
        )
      )
    ).then((data) => setCodewarsList(data.filter(Boolean)));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) return toast.error("You must be logged in");

    let payload = {
      type,
      prompt: prompt.trim(),
      answer_key: answerKey.trim(),
      options: type === "multiple_choice" ? options : null,
    };

    if (type === "codewars" && selectedSlug) {
      const challenge = codewarsList.find((c) => c.slug === selectedSlug);
      payload = {
        type,
        prompt: challenge.name,
        answer_key: selectedSlug,
        meta: {
          url: challenge.url,
          rank: challenge.rank?.name || "Unranked",
          languages: challenge.languages,
        },
      };
    }

    toast.loading("Creating question...");
    try {
      const res = await fetch(
        `${BASE_URL}/assessments/${assessmentId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed");
      const newQuestion = await res.json();

      toast.dismiss();
      toast.success("Question added!");
      setPrompt("");
      setAnswerKey("");
      setOptions(["", "", "", ""]);
      setSelectedSlug("");
      if (onAdd) onAdd(newQuestion);
    } catch (err) {
      toast.dismiss();
      toast.error("Error adding question");
    }
  }

  function updateOption(index, value) {
    const copy = [...options];
    copy[index] = value;
    setOptions(copy);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4 border p-4 rounded shadow"
    >
      <h3 className="text-lg font-semibold">Add Question</h3>

      {type !== "codewars" && (
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter question prompt"
          className="w-full p-2 border rounded"
          required
        />
      )}

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="multiple_choice">Multiple Choice</option>
        <option value="codekata">Code Kata</option>
        <option value="codewars">Codewars Challenge</option>
      </select>

      {type === "multiple_choice" && (
        <div className="grid grid-cols-2 gap-2">
          {options.map((opt, i) => (
            <input
              key={i}
              type="text"
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              className="p-2 border rounded"
              required
            />
          ))}
        </div>
      )}

      {type === "codewars" && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Choose Challenge
          </label>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Codewars Challenge --</option>
            {codewarsList.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name} ({c.rank?.name})
              </option>
            ))}
          </select>
        </div>
      )}

      {type !== "codewars" && (
        <input
          type="text"
          value={answerKey}
          onChange={(e) => setAnswerKey(e.target.value)}
          placeholder="Answer key"
          className="w-full p-2 border rounded"
          required
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Question
      </button>
    </form>
  );
}
