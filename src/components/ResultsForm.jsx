import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ResultForm({ submissionId }) {
  const [existingResult, setExistingResult] = useState(null);
  const [score, setScore] = useState("");
  const [rank, setRank] = useState("");
  const [passStatus, setPassStatus] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isReleased, setIsReleased] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || !submissionId) return;

    fetch(`${BASE_URL}/interviewee/results`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.submission_id === submissionId);
        if (found) {
          setExistingResult(found);
          setScore(found.score ?? "");
          setRank(found.rank ?? "");
          setPassStatus(found.pass_status ?? false);
          setFeedback(found.feedback_summary ?? "");
          setIsReleased(found.is_released ?? false);
        }
      })
      .catch(() => toast.error("Failed to fetch result"));
  }, [submissionId]);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token || !submissionId) return toast.error("Login required");

    try {
      const res = await fetch(`${BASE_URL}/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          submission_id: submissionId,
          score: parseFloat(score),
          rank: rank ? parseInt(rank) : null,
          pass_status: passStatus,
          feedback_summary: feedback,
          is_released: isReleased,
        }),
      });

      const resultData = await res.json();
      if (!res.ok) throw new Error(resultData.message || "Server error");

      toast.success("Result saved successfully");
    } catch (err) {
      console.error("Error saving result:", err);
      toast.error(err.message || "Failed to save result");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mt-4 p-6 border border-cyan-400 rounded-lg shadow bg-[#0D1B2A] text-white"
    >
      <div>
        <label className="block text-sm text-gray-300 mb-1">Score</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-3 rounded bg-[#12283f] text-white border border-cyan-400 placeholder-gray-400"
          placeholder="e.g. 90"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Rank</label>
        <input
          type="number"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="w-full p-3 rounded bg-[#12283f] text-white border border-cyan-400 placeholder-gray-400"
          placeholder="e.g. 1"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Status</label>
        <select
          value={passStatus ? "passed" : "failed"}
          onChange={(e) => setPassStatus(e.target.value === "passed")}
          className="w-full p-3 rounded bg-[#12283f] text-white border border-cyan-400"
        >
          <option value="passed">Passed ✅</option>
          <option value="failed">Failed ❌</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Feedback Summary
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          className="w-full p-3 rounded bg-[#12283f] text-white border border-cyan-400 placeholder-gray-400"
          placeholder="Brief feedback or notes..."
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isReleased}
          onChange={(e) => setIsReleased(e.target.checked)}
          className="accent-cyan-400"
        />
        <label className="text-sm text-gray-300">
          Release results to interviewee
        </label>
      </div>

      <button
        type="submit"
        className="bg-cyan-400 hover:bg-cyan-500 text-[#0D1B2A] px-5 py-2 rounded font-semibold transition duration-200"
      >
        Submit Result
      </button>
    </form>
  );
}
