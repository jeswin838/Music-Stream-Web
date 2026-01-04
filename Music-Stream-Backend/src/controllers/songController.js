import { supabase } from "../config/supabase.js";

// GET all songs
export const getSongs = async (req, res) => {
  const { data, error } = await supabase
    .from("songs")
    .select("*");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

// ADD new song
export const addSong = async (req, res) => {
  const { title, artist } = req.body;

  const { error } = await supabase
    .from("songs")
    .insert([{ title, artist }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Song added successfully" });
};
