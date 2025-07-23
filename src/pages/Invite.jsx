import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function InvitePage() {
  const [assessments, setAssessments] = useState([]);
  const [invites, setInvites] = useState([]);
  const [form, setForm] = useState({
    assessment_id: "",
    interviewee_email: "",
    expires_in_days: 7,
  });
  const [loading, setLoading] = useState({
    assessments: true,
    invites: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please log in first");
      return;
    }

    // Fetch assessments
    fetch(`${BASE_URL}/assessments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAssessments(data);
        setLoading((prev) => ({ ...prev, assessments: false }));
      })
      .catch(() => {
        toast.error("Failed to load assessments");
        setLoading((prev) => ({ ...prev, assessments: false }));
      });

    // Fetch invites
    fetch(`${BASE_URL}/invites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInvites(data);
        setLoading((prev) => ({ ...prev, invites: false }));
      })
      .catch(() => {
        toast.error("Failed to load invites");
        setLoading((prev) => ({ ...prev, invites: false }));
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    if (!form.assessment_id || !form.interviewee_email) {
      toast.error("Please select an assessment and enter an email");
      return;
    }

    try {
      toast.loading("Sending invitation...");
      const response = await fetch(`${BASE_URL}/invites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send invite");
      }

      toast.dismiss();
      toast.success("Invite sent successfully!");

      // Update invites list
      setInvites((prev) => [data.invite, ...prev]);

      // Reset form
      setForm({
        assessment_id: "",
        interviewee_email: "",
        expires_in_days: 7,
      });
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Error sending invitation");
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      declined: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusMap[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM dd, yyyy h:mm a");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Send Assessment Invite
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Assessment
              </label>
              <select
                name="assessment_id"
                value={form.assessment_id}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                required
                disabled={loading.assessments}
              >
                <option value="">Choose an assessment</option>
                {assessments.map((assessment) => (
                  <option key={assessment.id} value={assessment.id}>
                    {assessment.title} - {assessment.time_limit} mins
                  </option>
                ))}
              </select>
              {loading.assessments && (
                <p className="mt-1 text-sm text-gray-500">
                  Loading assessments...
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interviewee Email
              </label>
              <input
                type="email"
                name="interviewee_email"
                value={form.interviewee_email}
                onChange={handleChange}
                placeholder="Enter candidate's email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Days (default: 7)
            </label>
            <input
              type="number"
              name="expires_in_days"
              value={form.expires_in_days}
              onChange={handleChange}
              min="1"
              max="30"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
          >
            Send Invitation
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Sent Invitations</h2>
          <span className="text-sm text-gray-500">
            {invites.length} invitation(s)
          </span>
        </div>

        {loading.invites ? (
          <div className="text-center py-8">
            <p>Loading invitations...</p>
          </div>
        ) : invites.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No invitations sent yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assessment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invites.map((invite) => (
                  <tr key={invite.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {assessments.find((a) => a.id === invite.assessment_id)
                          ?.title || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {invite.interviewee?.email || form.interviewee_email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(invite.sent_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(invite.expires_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(invite.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
