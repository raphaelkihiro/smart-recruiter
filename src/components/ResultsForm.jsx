import React, { useState } from "react";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ResultForm({ submissionId, existingResult }) {
  const [score, setScore] = useState(existingResult?.score ?? "");
  const [rank, setRank] = useState(existingResult?.rank ?? "");
  const [passStatus, setPassStatus] = useState(
    existingResult?.pass_status ?? false
  );
  const [feedback, setFeedback] = useState(
    existingResult?.feedback_summary ?? ""
  );
  const [isReleased, setIsReleased] = useState(
    existingResult?.is_released ?? false
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) return toast.error("Login required");

    if (!submissionId) {
      toast.error("Invalid submission ID");
      return;
    }

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
      className="space-y-4 mt-4 p-4 border rounded shadow bg-gray-50"
    >
      <div>
        <label>Score</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label>Rank</label>
        <input
          type="number"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label>Status</label>
        <select
          value={passStatus ? "passed" : "failed"}
          onChange={(e) => setPassStatus(e.target.value === "passed")}
          className="w-full p-2 border rounded"
        >
          <option value="passed">Passed ✅</option>
          <option value="failed">Failed ❌</option>
        </select>
      </div>

      <div>
        <label>Feedback Summary</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isReleased}
          onChange={(e) => setIsReleased(e.target.checked)}
        />
        <label>Release results to interviewee</label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Result
      </button>
    </form>
  );
}
