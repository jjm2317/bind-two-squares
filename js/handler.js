import { startPos, offsets, $container, canvZIndex, canvasInfo } from "./data";
import { removeEventInAllNodes } from "./util";

// box 관련 함수
const moveBox = (e, offset) => {
  offset.x = e.clientX - startPos.x;
  offset.y = e.clientY - startPos.y;

  e.target.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0 )`;
  canvasInfo.updateLine();
};

const settingBoxMousedown = (e) => {
  e.target.style.zIndex = 99;
  /*다른 box 클릭시 기존 box에 mousemove이벤트가 남아있는 버그 수정*/
  removeEventInAllNodes(e.currentTarget.children, "onmousemove");

  const offset = offsets.box.find(({ id }) => id === e.target.id);

  startPos.x = e.clientX - offset.x;
  startPos.y = e.clientY - offset.y;
  e.target.onmousemove = (e) => moveBox(e, offset);
};

const settingBoxMouseup = (e) => {
  e.target.style.zIndex = 10;
  e.target.onmousemove = null;
};

// line 관련 함수
const drawLine = (e) => {
  const { width, height } = e.currentTarget.getBoundingClientRect();
  const ctx = canvasInfo.currentCtx;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#f00";
  const draw = () => {
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.setLineDash([4, 16]);
    ctx.lineDashOffset -= canvasInfo.lineOffset.value;
    ctx.beginPath();
    ctx.moveTo(canvasInfo.start.xRatio * 1000, canvasInfo.start.yRatio * 1000);
    ctx.lineTo((e.clientX / width) * 1000, (e.clientY / height) * 1000);
    ctx.stroke();
  };
  // const id = setInterval(() => {
  //   canvasInfo.lineOffset.increase();
  draw();
  // }, 100);
};

const movePoint = (e) => {
  if (!canvasInfo.isDrawing) return;

  drawLine(e);
};

const makeMyCanvas = (e) => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", e.target.id);
  canvas.setAttribute("class", "line");
  canvas.setAttribute("width", "1000");
  canvas.setAttribute("height", "1000");
  canvas.style.zIndex = canvZIndex.value;
  canvZIndex.increase();
  $container.appendChild(canvas);
  return canvas;
};
const settingPointMousedown = (e) => {
  // const offset = offsets.point.find(({ id }) => id === e.target.id);
  // startPos.x = e.clientX - offset.x;
  // startPos.y = e.clientY - offset.y;
  canvasInfo.isDrawing = true;
  const canvas = makeMyCanvas(e);
  canvasInfo.currentNode = canvas;
  canvasInfo.initStartPos(e, $container);
  canvasInfo.currentCtx = canvasInfo.currentNode.getContext("2d");
  $container.onmousemove = (e) => movePoint(e);
};
const resolveLine = (e) => {
  if (
    !e.target.matches(".point") ||
    //같은 박스 안에 있어도 return;
    e.target.id.split("__")[0] === canvasInfo.currentNode.id.split("__")[0]
  ) {
    $container.removeChild(canvasInfo.currentNode);
    canvasInfo.clearCurrentDrawing();
    $container.onmousemove = null;
    canvZIndex.decrease();
    return;
  }
  canvasInfo.currentNode.setAttribute(
    "id",
    canvasInfo.currentNode.id + "-" + e.target.id
  );
  if (canvasInfo.nodes.some((node) => node.id === canvasInfo.currentNode.id)) {
    console.log(111);
    $container.removeChild(canvasInfo.currentNode);
    canvasInfo.clearCurrentDrawing();
    $container.onmousemove = null;
    canvZIndex.decrease();
    alert("이미 연결된 선입니다.");
    return;
  }
  canvasInfo.nodes.push(canvasInfo.currentNode);
  canvasInfo.clearCurrentDrawing();
  canvasInfo.updateLine();
  $container.onmousemove = null;
};

export {
  settingPointMousedown,
  settingBoxMousedown,
  settingBoxMouseup,
  resolveLine,
};
