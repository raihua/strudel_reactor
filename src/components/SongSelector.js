import { useState, useEffect, useRef } from "react";
import { stranger_tune } from "../tunes";

export default function SongSelector({ globalEditorRef, strudelCodeRef }) {
  const songsList = useRef(new Map([["stranger_tune", stranger_tune]]))
  const [selectedSong, setSelectedSong] = useState("stranger_tune");

  useEffect(() => {
    let songCode = songsList.current?.get(selectedSong);
    strudelCodeRef.current = songCode;
    globalEditorRef.current?.setCode(songCode);
  }, [selectedSong])


  return (
    <>
    <p>Selected song: {selectedSong}</p>
    <select className="form-select" multiple aria-label="multiple select example" onChange={(e) => setSelectedSong(e.target.value)}>
      {songsList ? (
        songsList.current.entries().map(([songName, songCode]) => <option value={[songName]}>{songName}</option>)
      ) : (
        <></>
      )}
    </select>
    </>
  );
}
