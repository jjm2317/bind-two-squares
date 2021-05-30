import {
  settingBoxMousedown,
  settingPointMousedown,
  settingBoxMouseup,
} from "./handler";

const $container = document.getElementById("container");

// event handler
$container.onmousedown = (e) => {
  if (e.target.matches(".box")) settingBoxMousedown(e);
  if (e.target.matches(".point")) settingPointMousedown(e);
};

$container.onmouseup = (e) => {
  if (e.target.matches(".box")) settingBoxMouseup(e);
};
