import axios from "axios";

export default function() {
  const self = {};

  const VIDEO_SERVER_URL = "http://localhost:3172";

  let frameCount = -1;

  self.addFrame = async function(canvas) {
    frameCount++;
    try {
      await axios({
        url: VIDEO_SERVER_URL + "/addFrame",
        method: "post",
        data: {
          png: canvas.toDataURL(),
          frame: frameCount
        },
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  self.render = async function(filename) {
    filename = filename || "untitled";
    try {
      await axios({
        url: VIDEO_SERVER_URL + "/render",
        method: "post",
        data: {
          filename: filename
        },
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  return self;
}
