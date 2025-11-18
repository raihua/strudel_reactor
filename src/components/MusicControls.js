import { useState } from "react";
import { changeGain } from "../utils/preprocessors";

export default function MusicControls({
  globalEditorRef,
  strudelCode,
  setStrudelCode,
}) {
  const [gain, setGain] = useState(1);

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
      <div class="btn-group" role="group" aria-label="Basic example">
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
        <label class="form-label">
          Gain: 
        </label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="3"
          value={gain}
          onChange={(e) =>
            updateGain(e.target.value)
          }
        ></input>
      </div>
    </div>
  );
}
