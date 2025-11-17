import { useEffect, useState } from "react";

export default function StrudelEditor({
  globalEditorRef,
  strudelCode,
  setStrudelCode,
}) {
  const [showOutput, setShowOutput] = useState(true);

  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      <h5>Strudel Code Editor:</h5>
      <button
        className="btn btn-outline-primary"
        onClick={() => setShowOutput(true)}
      >
        Open Output
      </button>
      <button
        className="btn btn-outline-primary"
        onClick={() => setShowOutput(false)}
      >
        Close Output
      </button>
      <textarea
        className="form-control"
        rows="15"
        value={strudelCode}
        onChange={(e) => setStrudelCode(e.target.value)}
      ></textarea>
      <div
        id="editor"
        className="h-50 overflow-y-scroll"
        hidden={!showOutput}
        display={!showOutput ? "none" : "block"}
      />
      <canvas
        id="roll"
        className="bg-black"
        hidden={!showOutput}
        display={!showOutput ? "none" : "inline"}
        style={{
          width: "100%",
          display: showOutput ? "block" : "none",
          backgroundColor: "#eee",
        }}
      ></canvas>
    </div>
  );
}
