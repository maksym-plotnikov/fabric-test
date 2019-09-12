import React, { createContext } from "react";
// Create Context
const { Provider, Consumer } = createContext({});
export const CanvasProvider = Provider;
export const CanvasConsumer = Consumer;

export const WithCanvasContext = Component => {
  return props => (
    <CanvasConsumer>
      {({ canvas }) => <Component {...props} canvas={canvas} />}
    </CanvasConsumer>
  );
};

export const WithContext = Component => {
  return props => (
    <CanvasConsumer>
      {state => <Component {...props} {...state} />}
    </CanvasConsumer>
  );
};
