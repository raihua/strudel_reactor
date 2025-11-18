export default function MusicControls({
  globalEditorRef,
  strudelCode,
  setStrudelCode,
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
      <div class="btn-group" role="group" aria-label="Basic example">
        <button className="btn btn-success" onClick={playMusic}>
          Play
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => globalEditorRef.current.stop()}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
