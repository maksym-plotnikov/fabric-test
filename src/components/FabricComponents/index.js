// Only one ORIGINAL fabric instance entry
import { fabric } from "fabric";

/****** EXTEND FABRIC CLASSES WITH OUR CUSTOM ONE ******/

/*** AnimatedTextbox ***/
// Extend fabric.Textbox to support serialization
fabric.AnimatedTextbox = fabric.util.createClass(fabric.Textbox, {
  type: "AnimatedTextbox",

  initialize: function(text, options) {
    options || (options = {});
    this.callSuper("initialize", text, options);
    this.set("animation", options.animation || "");
    if (Object.keys(this.animation).length) {
      const {
        property,
        value,
        options: { from, duration, easing }
      } = this.animation;
      this.animate(property, value, {
        from,
        duration,
        easing: fabric.util.ease[easing]
      });
    }
  }
});
fabric.AnimatedTextbox.fromObject = function(object, callback) {
  return fabric.Object._fromObject("AnimatedTextbox", object, callback, "text");
};

/*** AnimatedRect ***/
fabric.AnimatedRect = fabric.util.createClass(fabric.Rect, {
  type: "AnimatedRect",

  initialize: function(options) {
    options || (options = {});
    this.callSuper("initialize", options);
    this.set("animation", options.animation || {});
    if (Object.keys(this.animation).length) {
      const {
        property,
        value,
        options: { from, duration, easing }
      } = this.animation;

      this.animate(property, value, {
        from,
        duration,
        easing: fabric.util.ease[easing]
      });
    }
  }
});
fabric.AnimatedRect.fromObject = function(object, callback) {
  return fabric.Object._fromObject("AnimatedRect", object, callback);
};

/*** AnimatedImage ***/
// Extend fabric.Image to support serialization
fabric.AnimatedImage = fabric.util.createClass(fabric.Image, {
  type: "AnimatedImage",
  initialize: function(element, options) {
    options || (options = {});
    this.callSuper("initialize", element, options);
    this.set("animation", options.animation || {});
    if (Object.keys(this.animation).length) {
      const {
        property,
        value,
        options: { from, duration, easing = "easeOutSine" }
      } = this.animation;
      console.info(property, value, {
        from,
        duration,
        easing: fabric.util.ease[easing],
        onChange: options.onChange
      });
      this.animate(property, value, {
        from,
        duration,
        easing: fabric.util.ease[easing]
      });
    }
  }
});

fabric.AnimatedImage.fromURL = function(url, callback, imgOptions) {
  return fabric.util.loadImage(
    url,
    function(img) {
      callback && callback(new fabric.AnimatedImage(img, imgOptions));
    },
    null,
    imgOptions && imgOptions.crossOrigin
  );
};
fabric.AnimatedImage.fromObject = function(object, callback) {
  return fabric.util.loadImage(object.src, function(img) {
    const oImg = new fabric.AnimatedImage(img, object);
    oImg._initConfig(object);
    oImg._initFilters(object);
    callback(oImg);
  });
};

export { fabric };
