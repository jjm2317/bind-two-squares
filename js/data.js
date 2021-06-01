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
  drawing: false,
  get isDrawing() {
    return this.drawing;
  },
  set isDrawing(value) {
    this.drawing = value;
  },

  node: null,
  set currentNode(node) {
    this.node = node;
  },
  get currentNode() {
    return this.node;
  },
  ctx: null,
  set currentCtx(ctx) {
    this.ctx = ctx;
  },
  get currentCtx() {
    return this.ctx;
  },

  clearCurrentDrawing() {
    (this.isDrawing = false), (this.currentCtx = null);
    this.currentNode = null;
  },

  startPos: {
    x: 0,
    y: 0,
  },
  offsets: {
    x: 0,
    y: 0,
  },
  initStartPos(e, container) {
    const { left, right, top, bottom } = e.target.getBoundingClientRect();
    const { width, height } = container.getBoundingClientRect();
    this.startPos = {
      x: (left + right) / 2,
      // - this.offsets.x
      y: (top + bottom) / 2, // - this.offsets.ym
      xRatio: (left + right) / 2 / width,
      yRatio: (top + bottom) / 2 / height,
    };
  },
  get start() {
    return this.startPos;
  },
  nodes: [],
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
