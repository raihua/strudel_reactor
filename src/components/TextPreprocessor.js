import { stranger_tune } from "./../tunes";
import { ProcessStudelCode } from "../utils/preprocessors"; 
import { useEffect, useState } from "react";

export default function TextPreprocessor({ globalEditorRef, strudelCode, setStrudelCode }) {

  return (
    <div className="row">
      <div
        className="col-md-8"
        style={{ maxHeight: "50vh", overflowY: "auto" }}
      >
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Text to preprocess:
        </label>
        <textarea
          className="form-control"
          rows="15"
          value={strudelCode}
          onChange={(e) => setStrudelCode(e.target.value)}
        >
        </textarea>
      </div>
    </div>
  );
}
