import { useState, useEffect, useRef } from "react";
import { stranger_tune } from "../tunes";

export default function SongSelector({
  globalEditorRef,
  strudelCode,
  setStrudelCode,
}) {
  const songsList = useRef(new Map([["stranger_tune", stranger_tune]]));
  const [selectedSong, setSelectedSong] = useState("stranger_tune");
  const [addSongMode, setAddSongMode] = useState(false);
  const newSongCode = useRef("");
  const newSongName = useRef("");

  useEffect(() => {
    let songCode = songsList.current?.get(selectedSong);
    setStrudelCode(songCode);
    globalEditorRef.current?.setCode(songCode);
  }, [selectedSong]);

  function saveNewSong() {
    songsList.current.set(newSongName.current, newSongCode.current);
    console.log("saved " + newSongName.current);
  }

  return (
    <div className="row border border-dark p-3 rounded m-2">
      <div className="col">
        <div className="row">
          <p>Selected song: {selectedSong}</p>
        </div>
        <div className="row mb-3">
          <select
            className="form-select"
            onChange={(e) => setSelectedSong(e.target.value)}
          >
            {songsList ? (
              songsList.current
                .entries()
                .map(([songName, songCode]) => (
                  <option value={[songName]}>{songName}</option>
                ))
            ) : (
              <></>
            )}
          </select>
        </div>
        <div className="row">
          <button
            className="btn btn-outline-primary mb-3"
            onClick={() => setAddSongMode(!addSongMode)}
          >
            {addSongMode ? "Close and load add song mod" : "Open add song mode"}
          </button>
        </div>
        {addSongMode ? (
          <div className="row">
            <div className="col">
              <label>New song name:</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => (newSongName.current = e.target.value)}
              ></input>
              <label>Strudel song code:</label>
              <textarea
                className="form-control"
                onChange={(e) => (newSongCode.current = e.target.value)}
              ></textarea>
              <button
                className="btn btn-outline-success mt-3"
                onClick={() => saveNewSong()}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
