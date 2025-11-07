import { processStudelCode } from "../utils/preprocessors";
import SongSelector from "./SongSelector";

export default function MusicControls({ globalEditorRef, strudelCode, setStruedelCode }) {
  function procPlay() {
    processStudelCode(globalEditorRef, strudelCode);
    globalEditorRef.current.evaluate();
  }

 return (
    <div className="row">
      <div className="col-md-4">
        <nav>
          <SongSelector globalEditorRef={globalEditorRef} strudelCode={strudelCode} setStrudelCode={setStruedelCode}/>
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