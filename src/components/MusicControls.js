import SongSelector from "./SongSelector";

export default function MusicControls({ globalEditorRef, strudelCode, setStruedelCode }) {
  function procPlay() {
    globalEditorRef.current.setCode(strudelCode)
    globalEditorRef.current.evaluate();
  }

 return (
    <>
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
    </>
  );
}