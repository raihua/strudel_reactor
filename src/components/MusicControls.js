import { useEffect, useState, useContext, createElement } from "react";
import { changeGain, changePostGain, toggleMute } from "../utils/preprocessors";
import { AppContext } from "../App";
import { set } from "@strudel/core";

export default function MusicControls({}) {
  const [gain, setGain] = useState(1);
  const [postGain, setPostGain] = useState(1);
  const [waveForm, setWaveForm] = useState("");
  const [mute, setMute] = useState(false);
  const { globalEditorRef, strudelCode, setStrudelCode, previousStrudelCode } =
    useContext(AppContext);

  function saveJSONState() {
    const state = {
      gain: gain,
      postGain: postGain,
      waveForm: waveForm,
      mute: mute,
    };

    const jsonString = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "settings.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  function loadJSONState(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const state = JSON.parse(reader.result);

      setGain(state.gain);
      setPostGain(state.postGain);
      setWaveForm(state.waveForm);
      setMute(state.mute);

      alert("Loaded settings json file")
    };

    reader.readAsText(file);
  }

  function updateMute(value) {
    setMute(value);
    toggleMute(value, globalEditorRef, strudelCode, setStrudelCode);
  }

  function updateGain(amount) {
    setGain(amount);
    changeGain(amount, globalEditorRef, strudelCode, setStrudelCode);
  }

  function updatePostGain(amount) {
    setPostGain(amount);
    changePostGain(amount, globalEditorRef, strudelCode, setStrudelCode);
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
      <h5 className="text-center">Music Controls</h5>
      <div
        className="btn-group d-flex justify-content-center my-3"
        role="group"
        aria-label="Basic example"
      >
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
      <div className="d-flex justify-content-center flex-column">
        <label className="text-center ">Gain</label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="3"
          value={gain}
          onChange={(e) => updateGain(e.target.value)}
        ></input>
        <label className="text-center">Post Gain</label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="3"
          value={postGain}
          onChange={(e) => updatePostGain(e.target.value)}
        ></input>
      </div>
      <div>
        <label className="d-flex align-items-center">Post Gain</label>
        <input
          className="form-check-input mt-0"
          type="checkbox"
          value={mute}
          onClick={() => updateMute(!mute)}
        />
      </div>
      <div className="d-flex justify-content-evenly">
        <fieldset className="form-check">
          <h5>Selected a waveform:</h5>
          <div>
            <input
              type="radio"
              name="waveform"
              value="sawtooth"
              onClick={() => setWaveForm("sawtooth")}
            />
            <label>Sawtooth</label>
          </div>
          <div>
            <input
              type="radio"
              name="waveform"
              value="square"
              onClick={() => setWaveForm("square")}
            />
            <label>Square</label>
          </div>
          <div>
            <input
              type="radio"
              name="waveform"
              value="triangle"
              onClick={() => setWaveForm("triangle")}
            />
            <label>Triangle</label>
          </div>
          <div>
            <input
              type="radio"
              name="waveform"
              value="sine"
              onClick={() => setWaveForm("sine")}
            />
            <label>Sine</label>
          </div>
        </fieldset>
      </div>
      <div className="d-flex justify-content-center m-3">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" onChange={(e) => toggleMute(e.target.checked, globalEditorRef, strudelCode, setStrudelCode)}/>
          <label className="form-check-label">
            Mute
          </label>
        </div>
      </div>
      {/* TODO: accordion */}
      <div>
        <h5 className="text-center mb-3">Settings</h5>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary me-2" onClick={saveJSONState}>
            Save
          </button>
          <input
            type="file"
            onChange={loadJSONState}
            accept=".json"
            className="btn btn-primary ms-2"
          ></input>
        </div>
      </div>
    </div>
  );
}
