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
      <Canvas width={1080} height={1920} stateful>
        <CanvasRect width={1080} height={100} fill="#fff" top={900} left={0} />
        <CanvasText
          text="Hello Unfold"
          fontStyle="bold"
          textAlign="center"
          width={1080}
          height={90}
          fill="#000"
          left={0}
          fontSize={70}
          animation={{
            property: "top",
            value: 910,
            options: { from: 2200, duration: 2000, easing: "easeOutCirc" }
          }}
        />
        <CanvasImage
          url="http://unfold-dev-api.uat.link/static/kv.jpg"
          scale={1.0}
          top={0}
          left={0}
          height={1920}
          width={1080}
          opacity={0}
          animation={{
            property: "opacity",
            value: 1.0,
            options: { from: 0.0, duration: 3000, easing: "easeOutSine" }
          }}
          isBg
        />
        <CanvasVideo
          videoUrl="http://unfold-dev-api.uat.link/static/intro2.mp4"
          scale={0.25}
          top={0}
          left={0}
          height={1920}
          width={1080}
        />
        <CanvasVideo
          videoUrl="http://unfold-dev-api.uat.link/static/intro1.mp4"
          scale={0.25}
          top={1444}
          left={814}
          height={1920}
          width={1080}
        />
      </Canvas>
    </div>
  );
}

export default App;
