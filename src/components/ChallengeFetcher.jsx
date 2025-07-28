import { useState, useEffect } from "react";

const BASE_API = "https://www.codewars.com/api/v1";

// You can expand this list with more Codewars slugs you'd like to attempt
const curatedSlugs = [
  "multiply",
  "sum-of-positive",
  "remove-string-spaces",
  "get-the-middle-character",
  "string-repeat",
  "find-the-smallest-integer-in-the-array",
  "convert-a-string-to-a-number",
  "return-negative",
  "reversed-strings",
  "youre-a-square",
];

export default function ChallengeFetcher({ username = "B-Chichi" }) {
  const [uncompleted, setUncompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    const fetchUncompletedChallenges = async () => {
      setLoading(true);
      setError("");

      try {
        // Step 1: Get user's completed challenge slugs
        const completedRes = await fetch(
          `${BASE_API}/users/${username}/code-challenges/completed`
        );
        if (!completedRes.ok)
          throw new Error("Failed to load completed challenges");

        const completedData = await completedRes.json();
        const completedSlugs = completedData.data.map((c) => c.slug);

        // Step 2: Filter curated list to only those not yet completed
        const toAttempt = curatedSlugs.filter(
          (slug) => !completedSlugs.includes(slug)
        );

        // Step 3: Fetch full details of uncompleted challenges
        const challengeDetails = await Promise.all(
          toAttempt.map(async (slug) => {
            const res = await fetch(`${BASE_API}/code-challenges/${slug}`);
            return res.ok ? await res.json() : null;
          })
        );

        setUncompleted(challengeDetails.filter(Boolean)); // remove nulls
      } catch (err) {
        console.error("Error fetching challenges:", err);
        setError("Unable to load challenges. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUncompletedChallenges();
  }, [username]);

  return (
    <section className="space-y-4 p-6 bg-[#0D1B2A] text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-orange-400">
        Uncompleted Challenges
      </h2>

      {loading && <p className="text-gray-400">Loading from Codewars...</p>}

      {!loading && error && <p className="text-red-400">{error}</p>}

      {!loading && !error && uncompleted.length === 0 && (
        <p className="text-green-400">
          You've completed all curated challenges!
        </p>
      )}

      {!loading && !error && uncompleted.length > 0 && (
        <ul className="space-y-3">
          {uncompleted.map((c) => (
            <li
              key={c.id}
              className="bg-[#12283f] p-4 rounded border border-orange-400"
            >
              <p className="text-orange-300 font-semibold">{c.name}</p>
              <p className="text-sm text-gray-300 mb-1">
                {/*<strong>Languages:</strong> {c.languages?.join(", ") || "N/A"} |{" "}
                <strong>Difficulty:</strong> {c.rank?.name || "Unranked"}*/}
              </p>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 underline hover:text-orange-300"
              >
                Try it on Codewars
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
