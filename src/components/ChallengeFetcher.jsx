import { useState, useEffect } from "react";

const BASE_API = "https://www.codewars.com/api/v1/users";

export default function ChallengeFetcher({ username = "B-Chichi", page = 0 }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    const url = `${BASE_API}/${username}/code-challenges/completed?page=${page}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const filtered = (data?.data || []).filter((c) =>
          ["JavaScript", "Python"].includes(c.completedLanguages?.[0])
        );
        setChallenges(filtered.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Could not load challenges.");
        setLoading(false);
      });
  }, [username, page]);

  return (
    <div className="space-y-4 p-6 bg-[#0D1B2A] text-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-cyan-400">
         Whiteboarding Challenges
      </h2>
      {loading ? (
        <p className="text-gray-400">Loading from Codewars...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : challenges.length === 0 ? (
        <p className="text-yellow-400">No challenges found for "{username}"</p>
      ) : (
        <ul className="space-y-3">
          {challenges.map((c, i) => (
            <li
              key={i}
              className="bg-[#12283f] p-4 rounded border border-cyan-400"
            >
              <p className="text-cyan-300 font-semibold">{c.name}</p>
              <p className="text-sm text-gray-300 mb-1">
                <strong>Language:</strong> {c.completedLanguages?.[0]} |{" "}
                <strong>Difficulty:</strong> {c.rank?.name ?? "N/A"}
              </p>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 underline"
              >
                View on Codewars
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
