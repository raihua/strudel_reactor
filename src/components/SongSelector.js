import { useState, useEffect, useRef } from "react";
import { stranger_tune } from "../tunes";

export default function SongSelector({ globalEditorRef, strudelCodeRef }) {
  const songsList = useRef(new Map([["stranger_tune", stranger_tune]]))
  const [selectedSong, setSelectedSong] = useState([]);

  useEffect(() => {
    console.log(songsList.current.get("stranger_tune"));
  }, [selectedSong])


  return (
    <>
    <p>Selected song: {selectedSong}</p>
    <select class="form-select" multiple aria-label="multiple select example" onChange={(e) => setSelectedSong(e.target.value)}>
      {songsList ? (
        songsList.current.entries().map(([songName, songCode]) => <option value={[songName]}>{songName}</option>)
      ) : (
        <></>
      )}
    </select>
    </>
  );
}
