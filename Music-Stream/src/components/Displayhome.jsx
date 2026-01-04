import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { supabase } from "../config/supabase";

const Displayhome = () => {
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setSongs(data || []);
  };

  useEffect(() => {
    fetchSongs();

    // Realtime listener for new uploads
    const channel = supabase
      .channel("home-songs-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "songs" },
        (payload) => {
          setSongs((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <>
      <Navbar />

      {/* Albums */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* Songs */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Uploaded Songs</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {songs.map((song, index) => (
    <SongItem
      key={song.id}
      index={index}
      name={song.title}
      desc={song.artist || "Unknown Artist"}
      image={song.image_url || "/music.png"}
      file={song.audio_url}
      small
    />
  ))}
</div>

      </div>
    </>
  );
};

export default Displayhome;
