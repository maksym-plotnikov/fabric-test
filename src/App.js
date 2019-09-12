import React from "react";
import Canvas from "./components/Canvas";
import CanvasRect from "./components/CanvasRect";
import CanvasText from "./components/CanvasText";
import CanvasImage from "./components/CanvasImage";
import CanvasVideo from "./components/CanvasVideo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Canvas width={1080} height={1920} background="#fff">
        <CanvasRect width={1000} height={80} fill="#eee" top={900} left={35} />
        <CanvasText
          text="Hello Unfold!"
          width={420}
          height={80}
          fill="red"
          top={900}
          left={-400}
          fontSize={70}
          animation={{
            property: "left",
            value: 320,
            options: { from: -400, duration: 2000, easing: "easeOutSine" }
          }}
        />
        <CanvasImage
          url="http://unfold-dev-api.uat.link/static/kv.jpg"
          scale={0.25}
          top={20}
          height={1920}
          width={1080}
          animation={{
            property: "left",
            value: 220,
            options: { from: 20, duration: 2000, easing: "easeOutSine" }
          }}
        />
        <CanvasVideo
          videoUrl="http://unfold-dev-api.uat.link/static/intro2.mp4"
          scale={0.45}
          top={20}
          left={275}
          height={1920}
          width={1080}
        />
        <CanvasVideo
          videoUrl="http://unfold-dev-api.uat.link/static/intro1.mp4"
          scale={0.45}
          top={1000}
          left={275}
          height={1920}
          width={1080}
        />
      </Canvas>
    </div>
  );
}

export default App;
