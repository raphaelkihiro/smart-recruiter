import { useState } from "react";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AddInterviewForm() {
  const [formData, setFormData] = useState({
    name: "",
    interview_number: "",
    company: "",
    role: "",
    date: "",
    time: "",
    location: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) return toast.error("Login required");

    try {
      const res = await fetch(`${BASE_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create interview");

      toast.success("Interview added successfully");
      setFormData({
        name: "",
        interview_number: "",
        company: "",
        role: "",
        date: "",
        time: "",
        location: "",
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-[#0D1B2A] text-white shadow rounded max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-cyan-400">
        📅 Schedule Interview
      </h2>

      {["name", "interview_number", "company", "role", "location"].map(
        (field) => (
          <div key={field}>
            <label className="block font-medium mb-1 text-gray-200">
              {field.replace("_", " ").toUpperCase()}
            </label>
            <input
              name={field}
              type={field === "interview_number" ? "number" : "text"}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#12283f] border border-cyan-400 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
              placeholder={`Enter ${field.replace("_", " ")}`}
            />
          </div>
        )
      )}

      <div>
        <label className="block font-medium mb-1 text-gray-200">Date</label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-3 bg-[#12283f] border border-cyan-400 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
        />
      </div>

      <div>
        <label className="block font-medium mb-1 text-gray-200">Time</label>
        <input
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-3 bg-[#12283f] border border-cyan-400 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
        />
      </div>

      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-600 text-[#0D1B2A] font-semibold px-4 py-2 rounded transition duration-200 w-full"
      >
        Add Interview
      </button>
    </form>
  );
}
