import React from "react";
import { number, object, string } from "prop-types";
import { fabric } from "../FabricComponents";

class CanvasText extends React.Component {
  componentDidMount() {
    const { canvas, text, ...rest } = this.props;
    const textEl = new fabric.AnimatedTextbox(text, rest);
    canvas.add(textEl);
    canvas.bringForward(textEl);
  }

  render() {
    return null;
  }
}
CanvasText.defaultProps = {
  top: 0,
  left: 0,
  width: 50,
  height: 50
};
CanvasText.propTypes = {
  canvas: object,
  top: number.isRequired,
  left: number.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  text: string.isRequired,
  fontSize: number.isRequired
};

export default CanvasText;
