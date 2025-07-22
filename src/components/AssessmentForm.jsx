import React, { useState } from "react";
import { toast } from "react-hot-toast";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AssessmentForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    time_limit: 60,
    published: false,
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("You must be logged in to create an assessment");
      return;
    }

    toast.loading("Creating assessment...");
    setSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/assessments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          title: form.title.trim(),
        }),
      });

      if (!response.ok) throw new Error("Failed to create");

      const newAssessment = await response.json();
      toast.dismiss();
      toast.success("Assessment created!");
      setForm({ title: "", time_limit: 60, published: false });

      if (onAdd) onAdd(newAssessment);
    } catch (err) {
      toast.dismiss();
      toast.error("Error creating assessment");
      console.error("Create error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded shadow"
    >
      <h3 className="text-lg font-semibold">Add New Assessment</h3>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Assessment Title"
        required
        className="w-full p-2 border rounded"
      />

      <input
        name="time_limit"
        type="number"
        value={form.time_limit}
        onChange={handleChange}
        placeholder="Time Limit (minutes)"
        required
        className="w-full p-2 border rounded"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="published"
          checked={form.published}
          onChange={handleChange}
        />
        <span>Published</span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className={`bg-blue-600 text-white px-4 py-2 rounded ${
          submitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {submitting ? "Submitting..." : "Create Assessment"}
      </button>
    </form>
  );
}
