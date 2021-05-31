import { startPos, offsets, $container } from "./data";
import { removeEventInAllNodes } from "./util";

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

const movePoint = (e) => {
  const context = e.target.getContext();
  console.log(context);
};

const settingBoxMousedown = (e) => {
  e.target.style.zIndex = 99;
  console.log(e.target.id);
  /*다른 box 클릭시 기존 box에 mousemove이벤트가 남아있는 버그 수정*/
  removeEventInAllNodes(e.currentTarget.children, "onmousemove");

  const offset = offsets.box.find(({ id }) => id === e.target.id);

  startPos.x = e.clientX - offset.x;
  startPos.y = e.clientY - offset.y;
  e.target.onmousemove = (e) => moveBox(e, offset);
};

const settingPointMousedown = (e) => {
  console.log(e.target);
  console.log(e.target.getContext);
  const offset = offsets.point.find(({ id }) => id === e.target.id);
  startPos.x = e.clientX - offset.x;
  startPos.y = e.clientY - offset.y;
  $container.onmousemove = (e) => e.target.matches("canvas") && movePoint(e);
};

const settingBoxMouseup = (e) => {
  e.target.style.zIndex = 0;
  console.log(e.target.id);
  e.target.onmousemove = null;
};
export { settingPointMousedown, settingBoxMousedown, settingBoxMouseup };
