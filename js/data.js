const $container = document.getElementById("container");

const canvZIndex = {
  value: 1,
  increase() {
    canvZIndex.value++;
  },
  decrease() {
    canvZIndex.value--;
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
  lineOffset: {
    value: 5,
    //   increase() {
    //     this.value++;
    //     if (this.value > 100) {
    //       this.value = 0;
    //     }
    //   },
    //   id: null,
    //   set intervalId(id) {
    //     this.id = id;
    //   },
    //   get intervalId() {
    //     return this.id;
    //   },
  },
  updateLine() {
    this.nodes.forEach((node) => {
      const srcRect = $container
        .querySelector(`#${node.id.split("-")[0]}`)
        .getBoundingClientRect();
      const dstRect = $container
        .querySelector(`#${node.id.split("-")[1]}`)
        .getBoundingClientRect();
      const { width, height } = $container.getBoundingClientRect();
      const srcPointX = ((srcRect.left + srcRect.right) / 2 / width) * 1000;
      const srcPointY = ((srcRect.top + srcRect.bottom) / 2 / height) * 1000;
      const dstPointX = ((dstRect.left + dstRect.right) / 2 / width) * 1000;
      const dstPointY = ((dstRect.top + dstRect.bottom) / 2 / height) * 1000;

      const ctx = node.getContext("2d");
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#0f0";
      ctx.clearRect(0, 0, 1000, 1000);
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(srcPointX, srcPointY);
      ctx.lineTo(dstPointX, dstPointY);
      ctx.stroke();
    });
  },
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
