export function processStudelCode(globalEditorRef, strudelCode) {
  if (strudelCode) {
    globalEditorRef.current.setCode(strudelCode);
  }
}

export function changeGain(amount, globalEditorRef, strudelCode, setStrudelCode) {
  if (!strudelCode) {
    return;
  }
    console.log(amount);
    let code = strudelCode;
    console.log(code);
    let newCode = code.replace(/\.gain\([^)]*\)/g, `.gain(${amount})`);
    console.log(newCode);
    setStrudelCode(newCode);
    globalEditorRef.current.setCode(newCode);
    globalEditorRef.current.evaluate();
}
