import { PureComponent } from "react";
import { bool, number, object, string } from "prop-types";
import { fabric } from "../FabricComponents";
import { createVideoElement } from "../utils/common";
import { WithContext } from "../utils/context";

class CanvasVideo extends PureComponent {
  constructor(props) {
    super(props);
    this.renderVideo = this.renderVideo.bind(this);
    this.renderPreviewVideo = this.renderPreviewVideo.bind(this);
  }

  renderVideo() {
    this.props.canvas.renderAll();
    fabric.util.requestAnimFrame(this.renderVideo);
  }

  // TODO maybe improve this in future
  async renderPreviewVideo() {
    const { canvas, capturer } = this.props;
    if (canvas && capturer) {
      async function* asyncAnimationFrame() {
        const h = {};
        h.promise = new Promise(r => (h.resolve = r));
        h.flipFrame = () => {
          h.resolve();
          h.promise = new Promise(r => (h.resolve = r));
        };
        try {
          while (true) {
            h.idAF = requestAnimationFrame(h.flipFrame);
            yield await h.promise;
          }
        } finally {
          h.resolve();
          cancelAnimationFrame(h.idAF);
        }
      }
      const flamer = asyncAnimationFrame();
      while (this.flag < 5 * 60) {
        await flamer.next();
        this.videoElement.currenTime = this.videoElement.currenTime + 0.016667;
        console.info(this.videoElement.currenTime);
        this.videoElement.pause();
        await canvas.renderAll();
        await capturer.addFrame(canvas);
        await this.videoElement.play();
        this.flag++;
      }
      capturer.render("example");
    }
  }

  async componentDidMount() {
    const { videoUrl, canvas, height, width, left, top, scale } = this.props;
    const videoEl = await createVideoElement({ height, width, videoUrl });
    if (videoEl) {
      const video = new fabric.Image(videoEl, {
        top,
        left,
        height,
        width,
        crossOrigin: "Anonymous",
        objectCaching: false,
        id: videoEl.id,
        originX: "left",
        originY: "top"
      });
      video.scale(scale);
      // Set custom attribute for video deserialization
      video.set("video_src", videoUrl);
      canvas.add(video);
      this.videoElement = video.getElement();
      const isPlaying =
        video.currentTime > 0 &&
        !video.paused &&
        !video.ended &&
        video.readyState > 2;
      if (!isPlaying) {
        await this.videoElement.play();
      }
      this.flag = 0;
      this.requestId = fabric.util.requestAnimFrame(this.renderVideo);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.requestId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { previewMode } = this.props;
    if (previewMode && previewMode !== prevProps.previewMode) {
      console.info("stop current video", this.requestId);
      if (this.requestId) {
        this.videoElement.pause();
        this.flag = 0;
        this.videoElement.currenTime = 0;
        this.videoElement.load();
        this.renderPreviewVideo();
      }
    }
  }

  render() {
    return null;
  }
}

CanvasVideo.defaultProps = {
  left: 0,
  top: 0,
  width: 1080,
  height: 1920
};
CanvasVideo.propTypes = {
  previewMode: bool,
  canvas: object,
  videoUrl: string.isRequired,
  poster: string,
  top: number,
  left: number
};

export default WithContext(CanvasVideo);
