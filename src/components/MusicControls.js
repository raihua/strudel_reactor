
export default function MusicControls({
  globalEditorRef,
  strudelCode,
  setStruedelCode,
}) {
  function playMusic() {
    if (!strudelCode) {
      alert("No strudel code set.");
      return;
    }
    globalEditorRef.current.setCode(strudelCode);
    globalEditorRef.current.evaluate();
  }

  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      <h5>Music Controls</h5>
      <button className="btn btn-outline-primary" onClick={playMusic}>
        Play
      </button>
      <button
        className="btn btn-outline-primary"
        onClick={() => globalEditorRef.current.stop()}
      >
        Stop
      </button>
    </div>
  );
}
