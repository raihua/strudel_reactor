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
import { stranger_tune } from "./tunes";
import TextPreprocessor from "./components/TextPreprocessor";
import MusicControls from "./components/MusicControls";

export default function StrudelDemo() {
  const globalEditorRef = useRef(null);
  const [strudelCode, setStrudelCode] = useState(stranger_tune);
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

      globalEditorRef.current.setCode(strudelCode);
    }
  }, [strudelCode]);

  return (
    <div>
      <main>
        <h1 className="text-center mt-3 mb-3 text-white">Strudel Demo</h1>
        <div className="container-fluid">
          <div className="d-flex flex-row row">
            <div className="col-6">
              <MusicControls
                globalEditorRef={globalEditorRef}
                strudelCode={strudelCode}
                setStruedelCode={setStrudelCode} />
            </div>
            <div className="col-6">
        <div className="row border rounded border-light border-4 m-2">
          <canvas id="roll" className="d-inline bg-black"></canvas>
        </div>
            </div>
          </div>
          <div className="row-12 d-flex flex-row">
            <TextPreprocessor globalEditorRef={globalEditorRef}  strudelCode={strudelCode} setStrudelCode={setStrudelCode}/>
            <div
              className="border border-dark rounded col-6 mt-2 p-2 bg-white"
              style={{ maxHeight: "50vh", overflowY: "auto" }}
            >
              <div id="editor" />
              <div id="output" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
