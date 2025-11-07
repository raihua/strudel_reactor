import { useState, useEffect, useRef } from "react";
import { stranger_tune } from "../tunes";

export default function SongSelector({ globalEditorRef, strudelCodeRef }) {
  const songsList = useRef(new Map([["stranger_tune", stranger_tune]]))
  const [selectedSong, setSelectedSong] = useState("stranger_tune");
  const [addSongMode, setAddSongMode] = useState(false);

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
    <button className="btn btn-outline-primary" onClick={() => setAddSongMode(!addSongMode)}>{addSongMode ? "Close add song mode" : "Open add song mode"}</button>
    {addSongMode ? <div className="row">
      <div className="col">
      <label>New song name:</label>
      <input type="text" className="form-control"></input>
      <label>Strudel song code:</label>
      <textarea className="form-control"></textarea>
      <button className="btn btn-outline-success">Save</button>
      </div>
    </div> : ""}
    </>
  );
}
