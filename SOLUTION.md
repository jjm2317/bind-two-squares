# Solution

**사용 기술**

- html
- css
- javascript

**외부 라이브러리**

- parcel bundler (소스코드 빌드용)

## 스타일

**마우스 오버시 점 활성화**

```css
.point {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 8px;
  border: 3px solid #fff;
  cursor: pointer;
}
마우스 오버시 배경색 활성화 .point:hover {
  background-color: #f00;
}
```

동작

- [ ] 두 개의 사각형을 이동시킬 수 있어야 합니다.
- [ ] 두 개의 사각형을 선으로 연결할 수 있어야 합니다.

스타일

- [x] 사각형 내부의 점은 마우스를 가져가기 전에 활성화되지 않아야 합니다.
- [ ] 두 사각형을 연결하기 전과 연결한 후의 선 색상과 스타일이 달라야 합니다.

**사각형 연결 전 후 색상, 스타일 변화**

```js
// 연결 전의 선을 그리는 함수
//색상 빨간색
ctx.strokeStyle = "#f00";
const draw = () => {
    ctx.clearRect(0, 0, 1000, 1000);
    //점선
    ctx.setLineDash([4, 16]);
    ctx.lineDashOffset = canvasInfo.lineOffset.value;
    ctx.beginPath();
    ctx.moveTo(canvasInfo.start.xRatio * 1000, canvasInfo.start.yRatio * 1000);
    ctx.lineTo((e.clientX / width) * 1000, (e.clientY / height) * 1000);
    ctx.stroke();
  };

// 연결 후의 선을 그리는 함수
updateLine() {
    /* some codes... */
      const ctx = node.getContext("2d");
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      // 색상 초록색, 실선
      ctx.strokeStyle = "#0f0";
      ctx.clearRect(0, 0, 1000, 1000);
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(srcPointX, srcPointY);
      ctx.lineTo(dstPointX, dstPointY);
      ctx.stroke();
    });
  },
};
```

동작

- [ ] 두 개의 사각형을 이동시킬 수 있어야 합니다.
- [ ] 두 개의 사각형을 선으로 연결할 수 있어야 합니다.

스타일

- [x] 사각형 내부의 점은 마우스를 가져가기 전에 활성화되지 않아야 합니다.
- [x] 두 사각형을 연결하기 전과 연결한 후의 선 색상과 스타일이 달라야 합니다.

## Box 드래그

**해결 과정 요약**

_요소의 **처음 위치(드래기 되기 전) 기준 드래그된 거리**를 알아내서 transform: translate3D적용_

드래그된 거리를 알기 위해서는 두가지 위치가 필요하다.

- 처음 위치(startPos)
  - 박스 요소가 드래그 되기 전의 x, y 좌표이다. (mousedown 기준)
- 처음 위치 기준 요소가 이동한 거리 (offset)

```js
const startPos = {
  x: 0,
  y: 0,
};
const offsets = {
  box: [
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
  ],
};
```

### startPos

startPos는 **마우스 포인터의 위치**와 **기존 이동거리**를 이용해 계산한다.

- **드래그를 처음하는 경우**

  - e.clientX,Y (마우스 포인터의 위치) 가 시작위치가 된다.

- **n번째 드래그 하는 경우**
  - n번째 드래그 하는 경우에는 e.clientX,Y에서 기존 이동거리(offset)를 뺀 값이 시작위치

handler.js

```js
const settingBoxMousedown = (e) => {
  e.target.style.zIndex = 99;
  /*다른 box 클릭시 기존 box에 mousemove이벤트가 남아있는 버그 수정*/
  removeEventInAllNodes(e.currentTarget.children, "onmousemove");

  const offset = offsets.box.find(({ id }) => id === e.target.id);
  //드래그를 처음하는 경우 e.clientX,Y (마우스 포인터의 위치) 가 시작 위치가 된다.
  //n번째 드래그 하는 경우 EcX,Y에서 기존 이동거리(offset)를 뺀 값이 시작 위치
  startPos.x = e.clientX - offset.x;
  startPos.y = e.clientY - offset.y;
  // mousedown 이벤트의 타깃이 되는 box에 mousemove 이벤트 핸들러 등록
  e.target.onmousemove = (e) => moveBox(e, offset);
};
```

### offset

offset은 요소의 처음 위치(드래그 되기 전) 기준 이동거리(드래그 된 후) 이다.

다음은 위 코드에서 mousemove에 대한 이벤트핸들러로 등록한 moveBox함수이다.

handler.js

```js
const moveBox = (e, offset) => {
  // 위에서 계산된 처음위치(startPos) 를 반영하여 이동거리(offset)계산
  offset.x = e.clientX - startPos.x;
  offset.y = e.clientY - startPos.y;
  // transform: translate3d 를 적용하여 offset만큼 요소 이동
  e.target.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0 )`;
  canvasInfo.updateLine();
};
```
css 속성 transform에 translate3d 값을 적용함으로서 드래그 기능을 구현할 수 있다. translate3d의 인수로는 offset의 x와 y 값이 전달된다.

동작

- [x] 두 개의 사각형을 이동시킬 수 있어야 합니다.
- [ ] 두 개의 사각형을 선으로 연결할 수 있어야 합니다.

스타일

- [x] 사각형 내부의 점은 마우스를 가져가기 전에 활성화되지 않아야 합니다.
- [x] 두 사각형을 연결하기 전과 연결한 후의 선 색상과 스타일이 달라야 합니다.

## **line 그리기**

**요구사항**

유의해야할 요구사항은 다음과 같다.

- 점에 mousedown 시 canvas요소를 생성하여 dom tree에 추가(**line 생성**)
- mouseup 되는 지점이 점이 아니면 line(canvas 요소) 제거
- mouseup 되는 지점이 다른 박스의 점이면 canvas 요소 
- line이 생성된 이후 박스를 움직일 시 line의 위치를 계산하여 다시 렌더링

**해결과정 요약**

**line 하나당 하나의 canvas 요소를 생성**하여 선 표현

1. canvas 요소는 시점과 종점을 알면 선을 그릴 수 있다. 시점, 종점 계산은element.getBoundingClientRect 을 이용한다.

2. mouseup 이벤트가 다른 박스의 점에서 일어날 때 선을 생성 및 canvas 요소데이터 저장

여기까지는 선의 생성이며, 선이 생성된 이후에는,

3. 박스에 mousemove이벤트가 일어날 때 canvas요소데이터의 id 값을 이용하여 점 요소들을 검색(점의 id 가 각각 box1_point1, box2_point2라면 canvas 요소의 id는 box1_point1-box2_point2) 후 시점과 종점 계산후 선 리렌더링_

### canvas 사용

- 시점과 종점으로 선을 연결할 수 있음
- 모든 방향에 대해 선을 동적으로 표현하기가 까다로움
- 여러 조건(동적 생성, 동적으로 변경, 레이아웃 영향 x )의 테스트 이후 도입하기로 결정

테스트 코드

```js
//동적으로 생성되어 추가될 수 있다.
const canvas = document.createElement("canvas");
canvas.setAttribute("id", "canvas3");
canvas.setAttribute("class", "line");
$container.appendChild(canvas);

const $canvas3 = document.getElementById("canvas3");

// 레이아웃 상에서 canvas끼리 독립적이다.
const ctx1 = $canvas1.getContext("2d");
const ctx2 = $canvas2.getContext("2d");
const ctx3 = $canvas3.getContext("2d");
console.log(ctx1, ctx2);
let plus = 0;
ctx1.fillRect(10, 10, 200, 30);
ctx2.fillRect(1, 10, 50, 50);

// 동적으로 변경될 수 있다.
// 특정 조건에 의해 삭제시킬 수 있다.
const intervalId = setInterval(() => {
  if (plus === 60) {
    clearInterval(intervalId);
    $container.removeChild($canvas3);
  }
  ctx3.clearRect(0, 0, $canvas3.width, $canvas3.height);
  ctx3.beginPath();
  ctx3.moveTo(80, 100);
  ctx3.lineTo(90, 120 + plus);
  ctx3.stroke();
  plus += 3;
}, 50);
```

- 해상도 이슈는 canvas 요소의 width, height attribute를 1000으로 변경하는 것으로 해결

다음은 line을 생성할 때 발생하는 이벤트 별 프로그램의 동작에 대한 설명이다. 

### mousedown

점에 mousedown이 일어나면 canvas 객체를 생성해서 container의 마지막 자식요소로 추가한다.

handler.js

```js
const settingPointMousedown = (e) => {
  canvasInfo.isDrawing = true;
  //canvas 객체 생성
  const canvas = makeMyCanvas(e);
  canvasInfo.currentNode = canvas;
  //container의 마지막 요소로 추가
  canvasInfo.initStartPos(e, $container);
  canvasInfo.currentCtx = canvasInfo.currentNode.getContext("2d");
  $container.onmousemove = (e) => movePoint(e);
};
```

### **mousemove**

line과 관련된 mousemove 이벤트가 일어나는 경우는 두 가지가 있다.

- 점을 클릭(mousedown)한 상태에서 mousemove
- line이 연결된 점을 포함한 box를 mousemove

#### **점을 mousedown 후 mousemove**

mousemove가 일어나면 canvas의 렌더링콘텍스트가 선을 계속해서 새로 렌더링한다.

canvas를 이용해 선을 그리기 위해서는 **시점**과 시점으로부터의 **width** , **height**가 필요하다.

**시점** : mousedown시의 이벤트 타깃(div.point) 위치를 계산하여 변수에 저장

- element.getBoundingClientRect 로 브라우저 상 위치 비율계
  - (left + right) / 2 / width , (top + bottom) / 2 / height
- 각 비율에 1000(임의로 정한 canvas의 해상도)을 곱해주면 시점 계산 완료

**width, height** : 시점으로부터 이동할 거리

- e.clientX, e.clientY 에서 시점(브라우저 기준)을 뺀값을 비율계산하여 canvas 해상도 1000으로 곱셈

```js
const drawLine = (e) => {
  const { width, height } = e.currentTarget.getBoundingClientRect();
  const ctx = canvasInfo.currentCtx;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#f00";
  const draw = () => {
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.setLineDash([4, 16]);
    ctx.lineDashOffset = canvasInfo.lineOffset.value;
    ctx.beginPath();
    //시점 계산하여 적용
    ctx.moveTo(canvasInfo.start.xRatio * 1000, canvasInfo.start.yRatio * 1000);
    // 종점 계산하여 적용
    ctx.lineTo((e.clientX / width) * 1000, (e.clientY / height) * 1000);
    ctx.stroke();
  };
  draw();
};
```
위 같은 방법으로 line을 생성한다. 다음은 line이 생성된 이후 box를 mousemove 할때의 동작과정이다.

#### line이 연결된 점을 포함한 box를 mousemove

위에서 언급했던 moveBox함수가 호출 될때 마다 선을 리렌더링한다.

박스 드래그시 호출되는 moveBox 함수

```js
const moveBox = (e, offset) => {
  offset.x = e.clientX - startPos.x;
  offset.y = e.clientY - startPos.y;

  e.target.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0 )`;
  //호출될 때마다 선을 리렌더링하는 함수를 호출한다.
  canvasInfo.updateLine();
};
```

선을 리렌더링하는 updateLine함수

```js
updateLine() {
    this.nodes.forEach((node) => {
      const srcRect = $container
        .querySelector(`#${node.id.split("-")[0]}`)
        .getBoundingClientRect();
      const dstRect = $container
        .querySelector(`#${node.id.split("-")[1]}`)
        .getBoundingClientRect();
      const { width, height } = $container.getBoundingClientRect();
      const srcPointX = ((srcRect.left + srcRect.right) / 2 / width) * 1000;
      const srcPointY = ((srcRect.top + srcRect.bottom) / 2 / height) * 1000;
      const dstPointX = ((dstRect.left + dstRect.right) / 2 / width) * 1000;
      const dstPointY = ((dstRect.top + dstRect.bottom) / 2 / height) * 1000;

      const ctx = node.getContext("2d");
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#0f0";
      ctx.clearRect(0, 0, 1000, 1000);
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(srcPointX, srcPointY);
      ctx.lineTo(dstPointX, dstPointY);
      ctx.stroke();
    });
  },
};
```
위 과정을 통해 box를 드래그 및 이동을 line에 반영할 수 있다.

동작

- [x] 두 개의 사각형을 이동시킬 수 있어야 합니다.
- [x] 두 개의 사각형을 선으로 연결할 수 있어야 합니다.

스타일

- [x] 사각형 내부의 점은 마우스를 가져가기 전에 활성화되지 않아야 합니다.
- [x] 두 사각형을 연결하기 전과 연결한 후의 선 색상과 스타일이 달라야 합니다.
