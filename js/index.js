import {
  settingBoxMousedown,
  settingPointMousedown,
  settingBoxMouseup,
} from "./handler";
import { $container } from "./data";

// event handler
$container.onmousedown = (e) => {
  if (e.target.matches(".box")) settingBoxMousedown(e);
  if (e.target.matches(".point")) settingPointMousedown(e);
};

$container.onmouseup = (e) => {
  if (e.target.matches(".box")) settingBoxMouseup(e);
};
