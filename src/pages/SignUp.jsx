import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [role] = useState("interviewee");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      password,
      role,
    });
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          contact_info: contactInfo,
          role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-[#12283f] px-4">
        <div className="max-w-md w-full p-10 bg-[#112D44] text-white rounded-xl shadow-xl space-y-6 mt-5">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-cyan-400 mb-2">
              Create Your Account
            </h2>
            <p className="text-sm text-gray-300">
              Join Smart Recruiter and begin your career journey.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3 border border-cyan-400 bg-[#0D1B2A] text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 border border-cyan-400 bg-[#0D1B2A] text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-cyan-400 bg-[#0D1B2A] text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Contact number"
              className="w-full px-4 py-3 border border-cyan-400 bg-[#0D1B2A] text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-cyan-400 bg-[#0D1B2A] text-white rounded-lg"
                required
              >
                <option value="">-- Select Role --</option>{" "}
                <option value="interviewee">Interviewee</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div> */}

            <button
              type="submit"
              className="w-full py-3 bg-cyan-400 hover:bg-cyan-500 text-[#0D1B2A] font-semibold rounded-lg transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Signup;
