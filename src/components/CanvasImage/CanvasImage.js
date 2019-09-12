import { PureComponent } from "react";
import { bool, object, number, string } from "prop-types";
import { fabric } from "../FabricComponents";
import { WithCanvasContext } from "../utils/context";

class CanvasImage extends PureComponent {
  componentDidMount() {
    const { canvas, url, scale, isBg, ...rest } = this.props;
    const options = {
      ...rest,
      ...{ crossOrigin: "Anonymous" }
    };
    fabric.AnimatedImage.fromURL(
      url,
      img => {
        img.set({
          scaleX: scale,
          scaleY: scale
        });
        if (!isBg) {
          canvas.add(img);
        } else {
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        }
      },
      options
    );
  }

  render() {
    return null;
  }
}
CanvasImage.defaultProps = {
  scale: 1.0,
  isBg: false
};

CanvasImage.propTypes = {
  canvas: object.isRequired,
  url: string.isRequired,
  scale: number.isRequired,
  top: number.isRequired,
  isBg: bool
};

export default WithCanvasContext(CanvasImage);
