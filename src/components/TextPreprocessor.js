import { stranger_tune } from "./../tunes";

export default function TextPreprocessor({ globalEditorRef }) {
return (
          <div className="row">
            <div
              className="col-md-8"
              style={{ maxHeight: "50vh", overflowY: "auto" }}
            >
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Text to preprocess:
              </label>
              <textarea
                className="form-control"
                rows="15"
                id="proc"
                defaultValue={stranger_tune}
              ></textarea>
            </div>
            <div className="col-md-4">
              <nav>
                <button id="process" className="btn btn-outline-primary">
                  Preprocess
                </button>
                <button id="process_play" className="btn btn-outline-primary">
                  Proc & Play
                </button>
                <br />
                <button
                  className="btn btn-outline-primary"
                  onClick={() => globalEditorRef.current.evaluate()}
                >
                  Play
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => globalEditorRef.current.stop()}
                >
                  Stop
                </button>
              </nav>
            </div>
          </div>
)
}