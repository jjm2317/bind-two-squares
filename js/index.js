const $container = document.getElementById("container");
console.log($container);

const startPos = {
  x: 0,
  y: 0,
};
const offsets = [
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
];
const moveBox = (e, offset) => {
  offset.x = e.clientX - startPos.x;
  offset.y = e.clientY - startPos.y;

  e.target.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 1px )`;
};
$container.onmousedown = (e) => {
  if (!e.target.matches(".box")) return;
  e.target.style.zIndex = 99;
  console.log(e.target.id);
  const offset = offsets.find(({ id }) => id === e.target.id);
  console.log(111);
  startPos.x = e.clientX - offset.x;
  startPos.y = e.clientY - offset.y;
  e.target.onmousemove = (e) => moveBox(e, offset);
};
$container.onmouseup = (e) => {
  if (!e.target.matches(".box")) return;
  e.target.style.zIndex = 0;
  console.log(e.target.id);
  e.target.onmousemove = null;
  // document.removeEventListener("mousemove", moveBox);
};
