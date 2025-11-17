import "./App.css";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from "@strudel/codemirror";
import { evalScope, set } from "@strudel/core";
import { drawPianoroll } from "@strudel/draw";
import { initAudioOnFirstClick } from "@strudel/webaudio";
import { transpiler } from "@strudel/transpiler";
import {
  getAudioContext,
  webaudioOutput,
  registerSynthSounds,
} from "@strudel/webaudio";
import { registerSoundfonts } from "@strudel/soundfonts";
import StrudelEditor from "./components/StrudelEditor";
import MusicControls from "./components/MusicControls";
import SongSelector from "./components/SongSelector";

export default function StrudelDemo() {
  const globalEditorRef = useRef(null);
  const [strudelCode, setStrudelCode] = useState();
  const hasRun = useRef(false);

  function initStrudelMirrorCanvas() {
    //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
    //init canvas
    const canvas = document.getElementById("roll");
    canvas.width = canvas.width * 2;
    canvas.height = canvas.height * 2;
    const drawContext = canvas.getContext("2d");
    const drawTime = [-2, 2]; // time window of drawn haps
    globalEditorRef.current = new StrudelMirror({
      defaultOutput: webaudioOutput,
      getTime: () => getAudioContext().currentTime,
      transpiler,
      root: document.getElementById("editor"),
      drawTime,
      onDraw: (haps, time) =>
        drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
      prebake: async () => {
        initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
        const loadModules = evalScope(
          import("@strudel/core"),
          import("@strudel/draw"),
          import("@strudel/mini"),
          import("@strudel/tonal"),
          import("@strudel/webaudio")
        );
        await Promise.all([
          loadModules,
          registerSynthSounds(),
          registerSoundfonts(),
        ]);
      },
    });

    globalEditorRef.current.setCode(strudelCode);
  }

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      initStrudelMirrorCanvas();
    }
  }, []);

  return (
    <main>
      <h1 className="text-center p-3 mb-4 shadow">Strudel Demo</h1>
      <div className="row">
        <div className="col-6">
          <StrudelEditor
            globalEditorRef={globalEditorRef}
            strudelCode={strudelCode}
            setStrudelCode={setStrudelCode}
          />
        </div>
        <div className="col-6">
          <SongSelector
            globalEditorRef={globalEditorRef}
            strudelCode={strudelCode}
            setStrudelCode={setStrudelCode}
          />
          <MusicControls
            globalEditorRef={globalEditorRef}
            strudelCode={strudelCode}
            setStruedelCode={setStrudelCode}
          />
        </div>
      </div>
    </main>
  );
}
