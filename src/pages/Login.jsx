import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#0D1B2A] mb-6">
          Smart Recruiter Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-400 text-[#0D1B2A] font-semibold py-2 rounded-md hover:bg-cyan-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-cyan-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
