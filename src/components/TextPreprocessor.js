import { stranger_tune } from "./../tunes";

export default function TextPreprocessor({ globalEditorRef }) {
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
          id="proc"
          defaultValue={stranger_tune}
        ></textarea>
      </div>
    </div>
  );
}
