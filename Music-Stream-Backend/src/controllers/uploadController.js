import { supabase } from "../config/supabase.js";

export const uploadSongFiles = async (req, res) => {
  try {
    if (!req.files?.image || !req.files?.audio) {
      return res.status(400).json({ error: "Files missing" });
    }

    const { title, artist, album } = req.body;
    const { image, audio } = req.files;

    const imageUrl = image.name;
    const audioUrl = audio.name;

    const { data, error } = await supabase
      .from("songs")
      .insert([
        {
          title,
          artist,
          album,
          image_url: imageUrl,
          audio_url: audioUrl,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "Song saved to Supabase",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
