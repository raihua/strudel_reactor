import { processStudelCode } from "../utils/preprocessors";

export default function MusicControls({ globalEditorRef, strudelCodeRef }) {
  function procPlay() {
    processStudelCode(globalEditorRef, strudelCodeRef);
    globalEditorRef.current.evaluate();
  }

 return (
    <div className="row">
      <div className="col-md-4">
        <nav>
          <button
            className="btn btn-outline-primary"
            onClick={procPlay}
          >
            Process and Play
          </button>
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
  );
}