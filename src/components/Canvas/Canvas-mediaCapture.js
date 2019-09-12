import React, { Component, Fragment } from "react";
import { number } from "prop-types";
import { fabric } from "../FabricComponents";

class CanvasMediaCapture extends Component {
  state = {
    canvas: null,
    mediaSource: null
  };
  sourceBuffer = null;
  mediaRecorder = null;

  stopRecording = () => {
    this.mediaRecorder.stop();
  };

  capture = () => {
    var options = { mimeType: "video/webm", bitsPerSecond: 100000 };
    const recordedBlobs = [];
    const canvasElt = document.querySelector("canvas");
    const stream = canvasElt.captureStream(30);

    function handleDataAvailable(event) {
      if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
      }
    }

    function handleStopAndDownload() {
      const blob = new Blob(recordedBlobs, { type: "video/webm" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "recording.webm";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    }

    try {
      this.mediaRecorder = new MediaRecorder(stream, options);
    } catch (e) {
      console.log("Unable to create MediaRecorder with options Object: ", e);
      try {
        options = { mimeType: "video/webm,codecs=vp9", bitsPerSecond: 100000 };
        this.mediaRecorder = new MediaRecorder(stream, options);
      } catch (e) {
        console.log("Unable to create MediaRecorder with options Object: ", e);
        try {
          options = "video/vp8"; // Chrome 47
          this.mediaRecorder = new MediaRecorder(stream, options);
        } catch (e) {
          alert(
            "MediaRecorder is not supported by this browser.\n\n" +
              "Try Firefox 29 or later, or Chrome 47 or later, " +
              "with Enable experimental Web Platform features enabled from chrome://flags."
          );
          console.error("Exception while creating MediaRecorder:", e);
          return;
        }
      }
    }
    this.mediaRecorder.onstop = handleStopAndDownload;
    this.mediaRecorder.ondataavailable = handleDataAvailable;
    this.mediaRecorder.start(100); // collect 100ms of data
  };

  componentDidMount() {
    const canvas = new fabric.Canvas(this.c);
    const mediaSource = new MediaSource();
    mediaSource.addEventListener(
      "sourceopen",
      event => {
        this.sourceBuffer = mediaSource.addSourceBuffer(
          'video/webm; codecs="vp9"'
        );
      },
      false
    );
    this.setState({ canvas, mediaSource });
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.state.canvas
      });
    });
    const { width, height } = this.props;
    return (
      <Fragment>
        <canvas ref={c => (this.c = c)} width={width} height={height} />
        {this.state.canvas && children}
        <button
          onClick={e => {
            e.preventDefault();
            console.log(this.state.canvas.toJSON());
          }}
        >
          To JSON
        </button>
        <button onClick={this.capture}>Capture</button>
        <button onClick={this.stopRecording}>Stop</button>
      </Fragment>
    );
  }
}

CanvasMediaCapture.propTypes = {
  width: number.isRequired,
  height: number.isRequired
};

CanvasMediaCapture.defaultProps = {
  width: 600,
  height: 400
};

export default CanvasMediaCapture;
