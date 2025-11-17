import { flash } from "@strudel/codemirror";
import { stranger_tune } from "../tunes";
import { ProcessStudelCode } from "../utils/preprocessors";
import { useEffect, useState } from "react";

export default function StrudelEditor({
  globalEditorRef,
  strudelCode,
  setStrudelCode,
}) {
  const [showOutput, setShowOutput] = useState(true);

  return (
    <div>
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        Strudel Code Editor:
      </label>
      <textarea
        className="form-control"
        rows="15"
        value={strudelCode}
        onChange={(e) => setStrudelCode(e.target.value)}
      ></textarea>
      <button className="btn btn-outline-primary" onClick={() => setShowOutput(true)}>Open Output</button>
      <button  className="btn btn-outline-primary" onClick={() => setShowOutput(false)}>Close Output</button>
      <div id="editor" hidden={!showOutput} />
      <div id="output" hidden={!showOutput} />
    </div>
  );
}
