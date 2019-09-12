import React, { Component, Fragment } from "react";
import { number, string } from "prop-types";
import { fabric } from "../FabricComponents";
import { createVideoElement } from "../utils/common";
import api from "../utils/api";

class Canvas extends Component {
  state = {
    canvas: null,
    capturer: null,
    previewMode: false,
    rehydrated: false
  };

  saveCanvasState = e => {
    e.preventDefault();
    localStorage.setItem(
      "canvas",
      JSON.stringify(this.state.canvas.toJSON(["video_src", "animation"]))
    );
  };

  clearCanvasState = e => {
    e.preventDefault();
    localStorage.removeItem("canvas");
  };

  capture = async () => {
    this.setState({ previewMode: true });
  };

  componentDidMount() {
    const { backgroundColor } = this.props;
    const capturer = api();
    const prevState = JSON.parse(localStorage.getItem("canvas"));
    let canvas = new fabric.Canvas(this.c, {
      backgroundColor,
      preserveObjectStacking: false
    });
    if (prevState) {
      // Deserialize custom objects
      const canvasLoaded = async () => {
        const objs = prevState["objects"];
        for (let i = 0; i < objs.length; i++) {
          // handle restoring video
          console.info(objs[i].type);
          if (objs[i].hasOwnProperty("video_src")) {
            const {
              top,
              left,
              height,
              width,
              scaleX,
              scaleY,
              crossOrigin,
              originX,
              originY,
              video_src
            } = objs[i];
            const videoEl = await createVideoElement({
              height,
              width,
              videoUrl: video_src
            });
            const video = new fabric.Image(videoEl, {
              top,
              left,
              height,
              scaleX,
              scaleY,
              width,
              crossOrigin,
              originX,
              originY,
              objectCaching: false,
              id: videoEl.id
            });
            video.scale(Math.min(scaleX, scaleY));
            // Set custom attribute for video deserialization
            video.set("video_src", video_src);
            canvas.add(video);
            video.getElement().play();
            // eslint-disable-next-line
            fabric.util.requestAnimFrame(function render() {
              canvas.renderAll();
              fabric.util.requestAnimFrame(render);
            });
          }
          // handle restoring animations
        }
      };
      console.info("loading saved state...");
      try {
        canvas = canvas.loadFromJSON(prevState, canvasLoaded);

        this.setState({ canvas, capturer, rehydrated: true });
      } catch (e) {
        console.info("Loading state [ERROR]:", e);
        this.setState({ canvas, capturer });
      }
    } else {
      this.setState({ canvas, capturer });
    }
  }

  render() {
    const { canvas, capturer, previewMode, rehydrated } = this.state;
    const { width, height } = this.props;
    const children = React.Children.map(this.props.children, child => {
      const isVideo = child.props && child.props.videoUrl;
      return React.cloneElement(child, {
        canvas,
        capturer: isVideo && capturer,
        previewMode: isVideo && previewMode
      });
    });
    return (
      <Fragment>
        <canvas ref={c => (this.c = c)} width={width} height={height} />
        {canvas && !rehydrated && children}
        <button onClick={this.saveCanvasState}>Save state</button>
        <button onClick={this.clearCanvasState}>Clear state</button>
        <button onClick={this.capture}>Capture</button>
      </Fragment>
    );
  }
}

Canvas.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
  background: string
};

Canvas.defaultProps = {
  width: 600,
  height: 400,
  background: "#fff"
};

export default Canvas;
