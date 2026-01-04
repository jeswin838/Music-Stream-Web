import React, { useState, useEffect } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Check for user session
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      alert("You must login first!");
      window.location.href = "http://localhost:4000"; // redirect to login
    } else {
      setUser(loggedInUser);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Select a song first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("song", file);

    try {
      const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user.token}`, // if you use token auth
        },
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) return alert(data.error || "Upload failed");

      alert("Song uploaded successfully!");
      setFile(null);

    } catch (err) {
      setLoading(false);
      alert("Network error or backend not running");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Upload Song</h2>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 text-black p-2 rounded"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 p-2 rounded font-semibold hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Upload Song"}
      </button>
    </div>
  );
};

export default Upload;
