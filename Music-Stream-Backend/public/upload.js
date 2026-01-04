import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const supabase = createClient(
  "https://arwvjpfimdvvlxofrgvb.supabase.co",
  "sb_publishable_p7hRlzKblkQ1CIpBPG8P2w_kP-NkE0w"
);

const SONG_CDN =
  "https://arwvjpfimdvvlxofrgvb.supabase.co/storage/v1/object/public/songs/";

const IMAGE_CDN =
  "https://arwvjpfimdvvlxofrgvb.supabase.co/storage/v1/object/public/images/";

function App() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();

    if (!songFile || !imageFile) {
      alert("Please select song and image");
      return;
    }

    const songName = uuidv4() + ".mp3";
    const imageName = uuidv4() + ".jpg";

    // Upload song
    const { error: songError } = await supabase.storage
      .from("songs")
      .upload(songName, songFile);

    if (songError) {
      alert("Song upload failed");
      return;
    }

    // Upload image
    const { error: imageError } = await supabase.storage
      .from("images")
      .upload(imageName, imageFile);

    if (imageError) {
      alert("Image upload failed");
      return;
    }

    // Save in table
    const { error: dbError } = await supabase.from("songs").insert({
      title: title,
      artist: artist,
      audio_url: SONG_CDN + songName,
      image_url: IMAGE_CDN + imageName,
    });

    if (dbError) {
      alert("Database insert failed");
      console.log(dbError);
      return;
    }

    alert("✅ Song uploaded successfully!");
    setTitle("");
    setArtist("");
  }

  return (
    <Container className="mt-5" style={{ width: "600px" }}>
      <h2>Upload Song</h2>

      <Form onSubmit={handleUpload}>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Song File</Form.Label>
          <Form.Control
            type="file"
            accept="audio/*"
            onChange={(e) => setSongFile(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </Form.Group>

        <Button type="submit">Upload</Button>
      </Form>
    </Container>
  );
}

export default App;
