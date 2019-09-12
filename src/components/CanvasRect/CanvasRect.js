import { Component } from "react";
import { number, object, string } from "prop-types";
import { fabric } from "../FabricComponents";
import { WithCanvasContext } from "../utils/context";

class CanvasRect extends Component {
  componentDidMount() {
    const rect = new fabric.AnimatedRect(this.props);
    this.props.canvas.add(rect);
  }

  render() {
    return null;
  }
}

CanvasRect.defaultProps = {
  top: 0,
  left: 0,
  width: 50,
  height: 50,
  fill: "red"
};

CanvasRect.propTypes = {
  canvas: object,
  top: number.isRequired,
  left: number.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  fill: string.isRequired
};

export default WithCanvasContext(CanvasRect);
