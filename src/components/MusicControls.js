import SongSelector from "./SongSelector";

export default function MusicControls({ globalEditorRef, strudelCode, setStruedelCode }) {
  function procPlay() {
    globalEditorRef.current.setCode(strudelCode)
    globalEditorRef.current.evaluate();
  }

 return (
    <div className="row-12 m-2 p-1 border border-dark">
      <div className="col-md-4 mb-3">
        <SongSelector globalEditorRef={globalEditorRef} strudelCode={strudelCode} setStrudelCode={setStruedelCode}/>
        <nav className="mt-3 border border-dark p-3 rounded d-flex justify-content-evenly">
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