import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard"); 
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // };

  return (
  <>
    <div>
      <Header/>
    </div>
    <div className="min-h-screen flex items-center justify-center bg-[#12283f] px-4">
      <div className="max-w-md w-full p-10 bg-[#112D44] text-white rounded-xl shadow-xl space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-cyan-400 mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-300">
            Login to continue using Smart Recruiter
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-cyan-400 bg-[#0D1B2A] text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-cyan-400 bg-[#0D1B2A] text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-400 hover:bg-cyan-500 text-[#0D1B2A] font-semibold rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-cyan-400 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
    <div>
      <Footer/>
    </div>
  </>
  );
}

export default Login;
