import { stranger_tune } from "../tunes";
import { ProcessStudelCode } from "../utils/preprocessors";
import { useEffect, useState } from "react";

export default function StrudelEditor({
  globalEditorRef,
  strudelCode,
  setStrudelCode,
}) {
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
      <div id="editor" />
      <div id="output" />
    </div>
  );
}
