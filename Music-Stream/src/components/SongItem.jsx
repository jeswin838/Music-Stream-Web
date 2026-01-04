import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ image, name, desc, id, file, index, small }) => {
  const { playWithIndex, playWithFile } = useContext(PlayerContext);

  const handlePlay = () => {
    if (file) {
      // Uploaded song
      playWithFile(file, name, image);
    } else {
      // Static song
      playWithIndex(index);
    }
  };

  return (
    <div
      onClick={handlePlay}
      className={`cursor-pointer rounded-md hover:bg-[#ffffff26] transition
        ${small ? "p-2" : "p-3 min-w-[180px]"}`}
    >
      <img
        src={image}
        alt={name}
        className={`rounded-md object-cover w-full
          ${small ? "h-[140px]" : "h-[180px]"}`}
      />

      <p
        className={`mt-2 truncate
          ${small ? "text-sm font-semibold" : "text-base font-bold"}`}
      >
        {name}
      </p>

      <p className="text-xs text-gray-400 truncate">{desc}</p>
    </div>
  );
};

export default SongItem;
