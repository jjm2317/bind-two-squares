import { startPos, offsets, $container, canvZIndex, canvasInfo } from './data';
import { removeEventInAllNodes } from './util';

// box 관련 함수
const moveBox = (e, offset) => {
  // const { top, left } = e.target.getBoundingClientRect();
  // if (top <= 0 || left <= 0) {
  //   if (top <= 0) offset.y -= top;
  //   if (left <= 0) offset.x -= left;
  //   e.target.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0 )`;
  //   return;
  // }

  offset.x = e.clientX - startPos.x;
  offset.y = e.clientY - startPos.y;

  e.target.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0 )`;
};

const settingBoxMousedown = e => {
  e.target.style.zIndex = 99;
  console.log(e.target.id);
  /*다른 box 클릭시 기존 box에 mousemove이벤트가 남아있는 버그 수정*/
  removeEventInAllNodes(e.currentTarget.children, 'onmousemove');

  const offset = offsets.box.find(({ id }) => id === e.target.id);

  startPos.x = e.clientX - offset.x;
  startPos.y = e.clientY - offset.y;
  e.target.onmousemove = e => moveBox(e, offset);
};

const settingBoxMouseup = e => {
  e.target.style.zIndex = 10;
  console.log(e.target.id);
  e.target.onmousemove = null;
};

// line 관련 함수
const drawLine = e => {
  const ctx = canvasInfo.currentCtx;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#ff0';
  ctx.clearRect(0, 0, 1000, 1000);
  ctx.beginPath();
  console.log(canvasInfo.start.yRatio);
  ctx.moveTo(canvasInfo.start.xRatio * 1000, canvasInfo.start.yRatio * 1000);
  ctx.lineTo(90, 120 + Math.random() * 10);
  ctx.stroke();
};

const movePoint = e => {
  if (!canvasInfo.draw) return;
  // console.log(canvasInfo.currentNode);

  drawLine(e);
  // console.log(e.target);
  // const context = e.target.getContext();
  // console.log(context);
};

const makeMyCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('class', 'line');
  canvas.setAttribute('width', '1000');
  canvas.setAttribute('height', '1000');
  canvas.style.zIndex = canvZIndex.value;
  canvZIndex.increase();
  $container.appendChild(canvas);
  return canvas;
};
const settingPointMousedown = e => {
  // const offset = offsets.point.find(({ id }) => id === e.target.id);
  // startPos.x = e.clientX - offset.x;
  // startPos.y = e.clientY - offset.y;
  const canvas = makeMyCanvas();
  canvasInfo.currentNode = canvas;
  canvasInfo.initStartPos(e, $container);
  canvasInfo.draw = true;
  canvasInfo.currentCtx = canvasInfo.currentNode.getContext('2d');
  console.log(canvasInfo.start);
  $container.onmousemove = e => movePoint(e);
};
const resolveLine = e => {};

export { settingPointMousedown, settingBoxMousedown, settingBoxMouseup };
