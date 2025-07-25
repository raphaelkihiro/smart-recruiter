import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function InvitePage() {
  const [form, setForm] = useState({
    assessment_id: "",
    interviewee_email: "",
    expires_in_days: 7,
  });
  const [assessments, setAssessments] = useState([]);
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please log in");
      return;
    }

    try {
      const assessmentsRes = await fetch(`${BASE_URL}/assessments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const assessmentsData = await assessmentsRes.json();
      setAssessments(assessmentsData);

      const invitesRes = await fetch(`${BASE_URL}/invites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const invitesData = await invitesRes.json();
      setInvites(invitesData);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "assessment_id" || name === "expires_in_days"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Please log in");
      return;
    }

    toast.loading("Sending invite...");

    try {
      const response = await fetch(`${BASE_URL}/invites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send invite");
      }

      const result = await response.json();
      toast.dismiss();
      toast.success("Invite sent successfully!");

      setInvites((prev) => [result.invite, ...prev]);

      setForm({
        assessment_id: "",
        interviewee_email: "",
        expires_in_days: 7,
      });
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Error sending invite");
    }
  }

  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#12283f] text-white">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#12283f] text-white">
      <Header />

      <div className="max-w-6xl mx-auto p-6 py-12">
        <h1 className="text-3xl font-bold text-cyan-500 mb-8">
          Manage Assessment Invites
        </h1>

        <div className="bg-[#112D44] rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            Send New Invitation
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Assessment</label>
                <select
                  name="assessment_id"
                  value={form.assessment_id}
                  onChange={handleChange}
                  className="w-full bg-[#0d1b2a] text-white p-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                  required
                >
                  <option value="">Select an assessment</option>
                  {assessments.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title} (ID: {a.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Interviewee Email
                </label>
                <input
                  type="email"
                  name="interviewee_email"
                  value={form.interviewee_email}
                  onChange={handleChange}
                  placeholder="Enter candidate's email"
                  className="w-full bg-[#0d1b2a] text-white p-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="max-w-xs">
              <label className="block text-gray-300 mb-2">
                Expiration (Days)
              </label>
              <input
                type="number"
                name="expires_in_days"
                value={form.expires_in_days}
                onChange={handleChange}
                min="1"
                max="30"
                className="w-full bg-[#0d1b2a] text-white p-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Send Invitation
            </button>
          </form>
        </div>

        <div className="bg-[#112D44] rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            Sent Invitations
          </h2>

          {invites.length === 0 ? (
            <div className="text-center text-gray-400 py-6">
              No invites sent yet. Use the form above to invite candidates.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-300">
                      Assessment
                    </th>
                    <th className="px-4 py-3 text-left text-gray-300">
                      Candidate
                    </th>
                    <th className="px-4 py-3 text-left text-gray-300">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-gray-300">
                      Sent At
                    </th>
                    <th className="px-4 py-3 text-left text-gray-300">
                      Expires At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {invites.map((invite) => (
                    <tr key={invite.id} className="hover:bg-[#0d1b2a]">
                      <td className="px-4 py-3 text-gray-300">
                        {assessments.find((a) => a.id === invite.assessment_id)
                          ?.title || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {invite.interviewee?.email || invite.interviewee_email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invite.status === "accepted"
                              ? "bg-green-500 text-green-100"
                              : invite.status === "declined"
                              ? "bg-red-500 text-red-100"
                              : "bg-yellow-500 text-yellow-100"
                          }`}
                        >
                          {invite.status.charAt(0).toUpperCase() +
                            invite.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {formatDate(invite.sent_at)}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {formatDate(invite.expires_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
