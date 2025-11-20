import { useEffect, useState, useContext, createElement } from "react";
import { changeGain, changePostGain, toggleMute } from "../utils/preprocessors";
import { AppContext } from "../App";
import { set } from "@strudel/core";

export default function MusicControls({}) {
  const [gain, setGain] = useState(1);
  const [postGain, setPostGain] = useState(1);
  const [waveForm, setWaveForm] = useState("");
  const [mute, setMute] = useState(false);
  const [showAccordion1, setShowAccordion1] = useState(true);
  const [showAccordion2, setShowAccordion2] = useState(false);
  const [showAccordion3, setShowAccordion3] = useState(false);
  const { globalEditorRef, strudelCode, setStrudelCode, previousStrudelCode } =
    useContext(AppContext);

  function saveJSONState() {
    // Binding the state to on obj
    const state = {
      gain: gain,
      postGain: postGain,
      waveForm: waveForm,
      mute: mute,
    };

    // Create downloadble json
    const jsonString = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create link to activate click
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

    // Runs after the file is loaded. Sets the components state
    reader.onload = () => {
      const state = JSON.parse(reader.result);

      setGain(state.gain);
      setPostGain(state.postGain);
      setWaveForm(state.waveForm);
      setMute(state.mute);

      alert("Loaded settings json file");
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
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            onChange={(e) =>
              toggleMute(
                e.target.checked,
                globalEditorRef,
                strudelCode,
                setStrudelCode
              )
            }
          />
          <label className="form-check-label">Mute</label>
        </div>
      </div>
      <div className="mb-4">
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
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              onClick={() => {
                setShowAccordion1(!showAccordion1);
              }}
              className="accordion-button"
              type="button"
            >
              Help
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse${
              showAccordion1 ? ".show" : ""
            }`}
          >
            <div className="accordion-body">
              <p>
                Shrudel editor allows you to edit the code then run via the
                process and play button. Open output and close output show the
                editors out of the box features.
              </p>
              <p>
                Song Selector allows you to select prexisting songs. These are
                saved to your local storage.
              </p>
              <p>
                Music Controls have a global gain and postgain setter. Mute
                comments out the code and the settings can be saved and loaded
                via the save and load buttons.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              onClick={() => {
                setShowAccordion2(!showAccordion2);
              }}
              className="accordion-button"
              type="button"
            >
              Quicks
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse${
              showAccordion2 ? ".show" : ""
            }`}
          >
            <div className="accordion-body">
              <p>
                Depending on some songs, gain and postgain values changes arent
                reflected unless you stop and play (rare scenarios)
              </p>
              <p>Waveform doesn't currently work.</p>
              <p>
                Post gain checkbox is just mutes. It is still a work in
                progress.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              onClick={() => {
                setShowAccordion3(!showAccordion3);
              }}
              className="accordion-button"
              type="button"
            >
              Sample Song Links
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse${
              showAccordion3 ? ".show" : ""
            }`}
          >
            <div className="accordion-body">
              <p>
                The below links provide Strudel.cc song code so you can add and
                test the features.
              </p>
              <a href="https://strudel.cc/examples/">
                https://strudel.cc/examples/
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
