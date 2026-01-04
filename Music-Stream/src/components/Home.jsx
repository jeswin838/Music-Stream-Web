import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

const Home = () => {
  const [songs, setSongs] = useState([]);

  // fetch all songs
  const fetchSongs = async () => {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setSongs(data || []);
    }
  };

  useEffect(() => {
    // load existing songs
    fetchSongs();

    // realtime listener (auto appear)
    const channel = supabase
      .channel("songs-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "songs" },
        (payload) => {
          setSongs((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">All Songs</h2>

      {songs.length === 0 && <p>No songs uploaded yet</p>}

      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-gray-800 p-4 rounded mb-4"
        >
          <h3 className="font-semibold">{song.title || "Untitled"}</h3>

          <audio
            controls
            src={song.file_url}
            className="w-full mt-2"
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
