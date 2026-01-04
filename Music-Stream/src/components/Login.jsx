import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please enter email and password");
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) return alert(data.error || "Login failed");

      // Save user session
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to upload page
      window.location.href = "http://localhost:3000";

    } catch (err) {
      setLoading(false);
      alert("Backend not running or network error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-700 p-8 rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded text-black"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 p-2 rounded font-semibold hover:bg-green-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
