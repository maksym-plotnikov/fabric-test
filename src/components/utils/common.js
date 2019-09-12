import { generate } from "shortid";

export const createVideoElement = ({
  height = 1920,
  width = 1080,
  videoUrl
}) => {
  return new Promise(resolve => {
    const element = document.createElement("video");
    element.id = generate();
    element.width = width;
    element.height = height;
    element.muted = true;
    element.crossOrigin = "Anonymous";
    element.style.display = "none";
    element.autoplay = true;
    element.loop = true;
    element.src = videoUrl;
    resolve(element);
  });
};
