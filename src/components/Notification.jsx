import { useState, useEffect } from "react";
import { BellIcon } from "@heroicons/react/outline";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NotificationIcon() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    fetch(`${BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch(() => toast.error("Unable to load notifications"));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full bg-[#0d1b2a] hover:bg-cyan-700 transition"
      >
        <BellIcon className="h-6 w-6 text-cyan-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-[#112D44] rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-cyan-400 font-semibold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-300 text-sm">No notifications</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  onClick={() => navigate(`/assessments/${n.assessmentId}`)}
                  className="cursor-pointer bg-[#0d1b2a] text-gray-300 p-2 rounded hover:bg-[#1a2c42] transition"
                >
                  <div>{n.text}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(n.timestamp).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
