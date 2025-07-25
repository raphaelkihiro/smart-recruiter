import { useState, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RankedIntervieweesPage() {
  const [ranked, setRanked] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    fetch(`${BASE_URL}/interviewee-rankings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setRanked(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 p-6 text-white">
      <h1 className="text-3xl font-bold text-cyan-400">
         Assessment Rankings
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : ranked.length === 0 ? (
        <p className="text-gray-400">No results available</p>
      ) : (
        <table className="w-full border-collapse bg-[#0D1B2A] shadow rounded">
          <thead className="bg-cyan-600 text-left">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">Name</th>
              <th className="p-3">Score</th>
              <th className="p-3">Status</th>
              <th className="p-3">Released</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((r, i) => (
              <tr
                key={i}
                className="border-t border-cyan-400 hover:bg-[#112D44]"
              >
                <td className="p-3">{r.rank ?? i + 1}</td>
                <td className="p-3 text-cyan-300">{r.name}</td>
                <td className="p-3">{r.score}</td>
                <td className="p-3">
                  {r.pass_status ? "✅ Passed" : "❌ Failed"}
                </td>
                <td className="p-3">{r.released ? "✅ Yes" : "🚫 No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
