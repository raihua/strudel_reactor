export function processStudelCode(globalEditorRef, strudelCode) {
  if (strudelCode) {
    globalEditorRef.current.setCode(strudelCode);
  }
}

export function changeGain(
  amount,
  globalEditorRef,
  strudelCode,
  setStrudelCode
) {
  if (!strudelCode) {
    return;
  }
  console.log(amount);
  let code = strudelCode;
  console.log(code);
  let newCode = code.replace(/\.gain\(.*\)/g, `.gain(${amount})`);
  console.log(newCode);
  setStrudelCode(newCode);
  globalEditorRef.current.setCode(newCode);
  globalEditorRef.current.evaluate();
}

export function changePostGain(
  amount,
  globalEditorRef,
  strudelCode,
  setStrudelCode
) {
  if (!strudelCode) {
    return;
  }
  console.log(amount);
  let code = strudelCode;
  console.log(code);
  let newCode = code.replace(/\.postgain\(.*\)/g, `.postgain(${amount})`);
  console.log(newCode);
  setStrudelCode(newCode);
  globalEditorRef.current.setCode(newCode);
  globalEditorRef.current.evaluate();
}

export function toggleMute(
  value,
  globalEditorRef,
  strudelCode,
  setStrudelCode
) {
  if (!strudelCode) return;

  let code = strudelCode;
  let newCode = "";

  if (value) {
    // Prepend // to all lines
    newCode = code.replace(/^(.*)$/gm, "// $1");
  } else {
    // Remove the prepended //
    newCode = code.replace(/^\s*\/\/\s?(.*)$/gm, "$1");
  }

  setStrudelCode(newCode);
  globalEditorRef.current.setCode(newCode);
  globalEditorRef.current.evaluate();
}
