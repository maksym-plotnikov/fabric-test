import { Component } from "react";
import { object, number, string } from "prop-types";
import { fabric } from "../FabricComponents";

class CanvasImage extends Component {
  componentDidMount() {
    const { canvas, url, ...rest } = this.props;
    const options = {
      ...rest,
      ...{ crossOrigin: "Anonymous" }
    };
    fabric.AnimatedImage.fromURL(
      url,
      img => {
        canvas.add(img);
      },
      options
    );
  }

  render() {
    return null;
  }
}
CanvasImage.defaultProps = {
  scale: 1.0
};
CanvasImage.propTypes = {
  canvas: object,
  url: string.isRequired,
  scale: number.isRequired,
  top: number.isRequired
};

export default CanvasImage;
