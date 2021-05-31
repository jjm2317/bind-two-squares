const $container = document.getElementById('container');

const canvZIndex = {
  value: 1,
  increase() {
    canvZIndex.value++;
  },
  decrease() {
    canvZIndex--;
  }
};

const canvasInfo = {
  isDrawing: false,
  get draw() {
    return this.isDrawing;
  },
  set draw(value) {
    this.isDrawing = value;
  },

  startPos: {
    x: 0,
    y: 0
  },
  offsets: {
    x: 0,
    y: 0
  },
  initStartPos(e) {
    const { left, right, top, bottom } = e.target.getBoundingClientRect();
    this.startPos = {
      x: (left + right) / 2 - this.offsets.x,
      y: (top + bottom) / 2 - this.offsets.y
    };
  },
  get start() {
    return this.startPos;
  },
  stack: []
};

const startPos = {
  x: 0,
  y: 0
};
const offsets = {
  box: [
    {
      id: 'box1',
      x: 0,
      y: 0
    },
    {
      id: 'box2',
      x: 0,
      y: 0
    }
  ],
  point: [
    {
      id: 'box1-point1',
      x: 0,
      y: 0
    }
  ]
};
export { startPos, offsets, $container, canvZIndex, canvasInfo };
