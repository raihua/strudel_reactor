import { useEffect, useState, useContext } from "react";
import { changeGain, toggleMute } from "../utils/preprocessors";
import { AppContext } from "../App";

export default function MusicControls({}) {
  const [gain, setGain] = useState(1);
  const [mute, setMute] = useState(false);
  const { globalEditorRef, strudelCode, setStrudelCode } =
    useContext(AppContext);

  function updateMute(value) {
    setMute(value);
    toggleMute(value, globalEditorRef, strudelCode, setStrudelCode);
  }

  function updateGain(amount) {
    setGain(amount);
    changeGain(amount, globalEditorRef, strudelCode, setStrudelCode);
  }

  function playMusic() {
    if (!strudelCode) {
      alert("No strudel code set.");
      return;
    }
    globalEditorRef.current.setCode(strudelCode);
    globalEditorRef.current.evaluate();
  }

  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      <h5>Music Controls</h5>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button className="btn btn-success" onClick={playMusic}>
          Play
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => globalEditorRef.current.stop()}
        >
          Stop
        </button>
      </div>
      <div>
        <label className="form-label">Gain:</label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="3"
          value={gain}
          onChange={(e) => updateGain(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          className="form-check-input mt-0"
          type="checkbox"
          value={mute}
          onClick={() => updateMute(!mute)}
        />
      </div>
      <div>
        <button className="btn btn-primary">Save</button>
        <button className="btn btn-primary">Load</button>
      </div>
      <div>
        <div className="form-check">
          <input className="form-check-input" type="radio" />
          <label className="form-check-label">Radio</label>
        </div>
        <div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" />
            <label className="form-check-label">
              Default switch checkbox input
            </label>
          </div>
        </div>
        {/* TODO: accordion */}
      </div>
    </div>
  );
}
