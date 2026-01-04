import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState({
    file: songsData[0].file,
    title: songsData[0].name,
    id: songsData[0].id,
    isUploaded: false,
    image: songsData[0].image || "/music.png",
  });

  const [playStatus, setPlayStatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    audioRef.current?.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlayStatus(false);
  };

  // Static songs
  const playWithId = (id) => {
    const song = songsData.find((s) => s.id === id);
    if (!song) return;
    setTrack({
      ...song,
      isUploaded: false,
    });
    setTimeout(() => audioRef.current?.play(), 100);
    setPlayStatus(true);
  };

  // Uploaded songs
  const playWithFile = (file, title = "Uploaded Song", image = "/music.png") => {
    setTrack({
      id: Date.now(),
      title,
      file,
      image,
      isUploaded: true,
    });
    setTimeout(() => audioRef.current?.play(), 100);
    setPlayStatus(true);
  };

  const previous = () => {
    if (track.isUploaded) return;
    if (track.id > 0) playWithId(track.id - 1);
  };

  const next = () => {
    if (track.isUploaded) return;
    if (track.id < songsData.length - 1) playWithId(track.id + 1);
  };

  const seekSong = (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.ontimeupdate = () => {
      seekBar.current.style.width =
        (audio.currentTime / audio.duration) * 100 + "%";

      setTime({
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audio.duration % 60) || 0,
          minute: Math.floor(audio.duration / 60) || 0,
        },
      });
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBar,
        seekBg,
        track,
        playStatus,
        time,
        play,
        pause,
        playWithId,
        playWithFile,
        previous,
        next,
        seekSong,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
