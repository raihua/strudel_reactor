
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
    <>
      <button className="btn btn-outline-primary" onClick={playMusic}>
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
