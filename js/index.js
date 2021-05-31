import {
  settingBoxMousedown,
  settingPointMousedown,
  settingBoxMouseup,
} from "./handler";
import { $container } from "./data";

// const $canvas = document.getElementById("box1-point1");
// console.log($canvas);
// const ctx = $canvas.getContext("2d");
// console.log(ctx);
// let plus = 0;
// // ctx.fillRect(10, 10, 50, 50);

// // setInterval(() => {
// ctx.fillRect(10, 10, 50, 30 + plus);
// plus += 50;
// // }, 50);
// event handler
$container.onmousedown = (e) => {
  if (e.target.matches(".box")) settingBoxMousedown(e);
  // if (e.target.matches("canvas")) settingPointMousedown(e);
};

$container.onmouseup = (e) => {
  if (e.target.matches(".box")) settingBoxMouseup(e);
};
