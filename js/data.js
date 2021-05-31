const $container = document.getElementById("container");

const canvZIndex = {
  value: 1,
  increase() {
    canvZIndex.value++;
  },
  decrease() {
    canvZIndex--;
  },
};

const canvasInfo = {
  isDrawing: false,
  get draw() {
    return this.isDrawing;
  },
  set draw(value) {
    this.isDrawing = value;
  },

  stack: [],
};
const startPos = {
  x: 0,
  y: 0,
};
const offsets = {
  box: [
    {
      id: "box1",
      x: 0,
      y: 0,
    },
    {
      id: "box2",
      x: 0,
      y: 0,
    },
  ],
  point: [
    {
      id: "box1-point1",
      x: 0,
      y: 0,
    },
  ],
};
export { startPos, offsets, $container, canvZIndex, canvasInfo };
