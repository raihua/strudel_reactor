import { useState } from "react";
import console_monkey_patch, { getD3Data } from "../console-monkey-patch";

export function D3Graph() {
  const [d3Data, setD3Data] = useState(null);

  function updateD3Data() {
    let data = getD3Data();
    setD3Data(data);
    console.log(data)
  }

  

  return (
    <div>
    <h1>D3</h1>
    <button onClick={() => updateD3Data()}>Yes</button>
    </div>
  )
}