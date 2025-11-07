import { useState, useEffect, useRef } from "react";
import { stranger_tune } from "../tunes";

export default function SongSelector({ globalEditorRef, strudelCodeRef }) {
  const songsList = useRef(new Map([["stranger_tune", stranger_tune]]))
  const [selectedSong, setSelectedSong] = useState("stranger_tune");
  const [addSongMode, setAddSongMode] = useState(false);
  const newSongCode = useRef("");
  const newSongName = useRef("");

  useEffect(() => {
    let songCode = songsList.current?.get(selectedSong);
    strudelCodeRef.current = songCode;
    globalEditorRef.current?.setCode(songCode);
  }, [selectedSong])

  function saveNewSong() {
    songsList.current.set(newSongName.current, newSongCode.current);
    console.log("saved " + newSongName.current);
  }


  return (
    <>
    <p>Selected song: {selectedSong}</p>
    <select className="form-select" onChange={(e) => setSelectedSong(e.target.value)}>
      {songsList ? (
        songsList.current.entries().map(([songName, songCode]) => <option value={[songName]}>{songName}</option>)
      ) : (
        <></>
      )}
    </select>
    <button className="btn btn-outline-primary" onClick={() => setAddSongMode(!addSongMode)}>{addSongMode ? "Close and load add song mod" : "Open add song mode"}</button>
    {addSongMode ? <div className="row">
      <div className="col">
      <label>New song name:</label>
      <input type="text" className="form-control" onChange={(e) => newSongName.current = e.target.value}></input>
      <label>Strudel song code:</label>
      <textarea className="form-control" onChange={(e) => newSongCode.current = e.target.value}></textarea>
      <button className="btn btn-outline-success" onClick={() => saveNewSong()}>Save</button>
      </div>
    </div> : ""}
    </>
  );
}
