import {
  settingBoxMousedown,
  settingPointMousedown,
  settingBoxMouseup,
} from "./handler";
import { $container } from "./data";

const canvas = document.createElement("canvas");
canvas.setAttribute("id", "canvas3");
canvas.setAttribute("class", "line");
canvas.setAttribute("width", "1000");
canvas.setAttribute("height", "1000");
$container.appendChild(canvas);
const $canvas1 = document.getElementById("box1-point1");
const $canvas2 = document.getElementById("box1-point2");
const $canvas3 = document.getElementById("canvas3");

// console.log($canvas);
const ctx1 = $canvas1.getContext("2d");
const ctx2 = $canvas2.getContext("2d");
const ctx3 = $canvas3.getContext("2d");
const ctx4 = $canvas3.getContext("2d");
console.log(ctx1, ctx2);
let plus = 0;
ctx1.fillRect(10, 10, 200, 50);
ctx2.fillRect(1, 10, 50, 50);
// ctx3.moveTo(80, 100);
// ctx3.lineTo(90, 120 + plus);
// ctx3.stroke();
// ctx3.clearRect(0, 0, $canvas3.width, $canvas3.height);
// console.log(ctx4);
const intervalId = setInterval(() => {
  if (plus === 70) {
    clearInterval(intervalId);
    // $container.removeChild($canvas3);
    ctx3.clearRect(0, 0, $canvas3.width, $canvas3.height);
    ctx3.strokeStyle = "#f00";
    ctx3.beginPath();
    ctx3.moveTo(80, 100);
    ctx3.lineTo(500, 500);
    ctx3.stroke();
    return;
  }
  ctx3.lineWidth = 5;
  ctx3.lineCap = "round";
  ctx3.strokeStyle = "#ff0";
  ctx3.clearRect(0, 0, $canvas3.width, $canvas3.height);
  ctx3.beginPath();
  ctx3.moveTo(80, 100);
  ctx3.lineTo(90, 120 + plus);
  ctx3.stroke();
  plus += 3;
}, 10);
// event handler
$container.onmousedown = (e) => {
  if (e.target.matches(".box")) settingBoxMousedown(e);
  // if (e.target.matches("canvas")) settingPointMousedown(e);
};

$container.onmouseup = (e) => {
  if (e.target.matches(".box")) settingBoxMouseup(e);
};
