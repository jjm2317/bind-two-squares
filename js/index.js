import {
  settingBoxMousedown,
  settingPointMousedown,
  settingBoxMouseup,
  resolveLine,
} from "./handler";
import { $container, canvasInfo } from "./data";

// event handler
$container.onmousedown = (e) => {
  if (e.target.matches(".box")) settingBoxMousedown(e);
  if (e.target.matches(".point")) settingPointMousedown(e);
};

$container.onmouseup = (e) => {
  if (!canvasInfo.isDrawing && e.target.matches(".box")) settingBoxMouseup(e);

  if (canvasInfo.isDrawing) resolveLine(e);
};
