const script = document.createElement("script");
script.src =
  "https://rawgit.com/spite/ccapture.js/master/build/CCapture.all.min.js";
script.addEventListener("load", function() {
  // Create a capturer that exports a WebM video.
  const capturer = new window.CCapture({
    format: "png",
    verbose: true,
    autoSaveTime: 2
  });
  capturer.start();
  const capture = (window.capture = function(canvas) {
    const render = function() {
      requestAnimationFrame(render);
      // Rendering stuff…
      capturer.capture(canvas);
    };
    render();
  });
});
document.body.appendChild(script);
