import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { stranger_tune } from "../tunes";

export default function SongSelector({
  globalEditorRef,
  strudelCode,
  setStrudelCode,
}) {
  const songsList = useRef(new Map([["stranger_tune", stranger_tune]]));
  const [selectedSong, setSelectedSong] = useState(
    localStorage.getItem("SelectedSong")
  );
  const [addSongMode, setAddSongMode] = useState(false);
  const newSongCode = useRef("");
  const newSongName = useRef("");

  useEffect(() => {
    let songCode = songsList.current?.get(selectedSong);
    setStrudelCode(songCode);
    globalEditorRef.current?.setCode(songCode);
    localStorage.setItem("SelectedSong", selectedSong);
  }, [selectedSong]);

  useEffect(() => {
    const stored = localStorage.getItem("SongsList");
    if (stored) {
      songsList.current = new Map(JSON.parse(stored));
    }
  }, []);

  function saveNewSong() {
    const name = newSongName.current;
    const code = newSongCode.current;

    if (!name || !code) {
      alert("Failed to save. Song name or Strudel song code was empty.");
    } else {
      songsList.current.set(name, code);

      const serialised = JSON.stringify(
        Array.from(songsList.current.entries())
      );

      localStorage.setItem("SongsList", serialised);
      alert(`Song ${name} has been saved successfully`);
      setAddSongMode(false);
    }
  }

  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      <div className="d-flex flex-row align-items-baseline">
        <h5 className="me-2">Selected song:</h5>
        <p>{selectedSong}</p>
      </div>
      <select
        className="form-select"
        onChange={(e) => setSelectedSong(e.target.value)}
        value={selectedSong}
      >
        <option value="">None</option>
        {songsList
          ? songsList.current.entries().map(([songName, songCode]) => (
              <option key={songName} value={songName}>
                {songName}
              </option>
            ))
          : ""}
      </select>
      <div className="d-flex flex-wrap gap-2 mt-3">
        <button
          className="btn btn-primary"
          onClick={() => setAddSongMode(true)}
        >
          Add Song
        </button>
      </div>

      {addSongMode &&
        createPortal(
          <div className="popup-modal">
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
            <div className="d-flex flex-wrap gap-2 mt-3">
              <button className="btn btn-success" onClick={() => saveNewSong()}>
                Save
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => setAddSongMode(false)}
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
