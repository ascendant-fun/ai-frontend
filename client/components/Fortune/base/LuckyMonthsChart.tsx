import { useRef, useEffect } from "react";
import {
  LuckyMonthValues,
  LuckyMonthsResponse,
} from "../../../../types/ApiClient";
import { MonthsInfo } from "../../../../utils/constants";

type LuckyMonthsChartProps = {
  luckyMonths: LuckyMonthsResponse;
};

type LuckyMonthData = {
  month: string;
  year: string;
  data: number;
};

const emojiImgSrc = "/images/report/party-face.png";

const GRAPH_TOP = 40;
const GRAPH_BOTTOM = 180;
const GRAPH_LEFT = 25;
const GRAPH_RIGHT = 865;
const LINE_GAP = 72.5;

// // original
// const GRAPH_HEIGHT = 120;
const GRAPH_HEIGHT = 170;

function drawGrid(
  context: CanvasRenderingContext2D,
  monthData: LuckyMonthData[],
  largest: number
) {
  context.clearRect(0, 0, 1200, 300);
  context.lineWidth = 1;
  context.shadowColor = "transparent";
  const arrayLen = monthData.length;

  for (let i = 0; i < arrayLen; i++) {
    const grad = context.createLinearGradient(50, 50, 150, 150);
    grad.addColorStop(0, "rgba(255,255,255,0.2)");
    grad.addColorStop(1, "rgba(255,255,255,0.5)");

    context.strokeStyle = grad;

    const xAxes = GRAPH_LEFT + i * LINE_GAP;
    // draw grid
    context.setLineDash([5, 3]);
    context.beginPath();
    context.moveTo(xAxes, GRAPH_TOP);
    context.lineTo(xAxes, GRAPH_BOTTOM);
    context.stroke();
    context.filter = "none";

    // add the circle
    context.beginPath();
    context.arc(xAxes, GRAPH_BOTTOM + 3, 3, 0, 2 * Math.PI, false);
    context.fillStyle = "#FFFFFF";
    context.fill();

    // add bottom text
    context.font = "10px ProductSans";
    context.fillStyle = "#FFFFFF";
    context.fillText(monthData[i].month, xAxes - 7, GRAPH_BOTTOM + 20);
    context.fillText(monthData[i].year, xAxes - 7, GRAPH_BOTTOM + 30);
    context.stroke();

    const score = monthData[i].data.toString();
    const fontsize = 11;
    const lineHeight = fontsize * 1.286;
    // const textWidth = context.measureText(score).width;
    const textWidth = 10;

    // add top label
    context.globalAlpha = 0.14;
    context.fillStyle = "black";
    const indent = score.length === 1 ? 4 : 7;

    context.strokeStyle = parseInt(score) === largest ? "#DDFE15" : "white";
    context.setLineDash([]);

    // @ts-ignore
    if ("roundRect" in context && typeof context?.roundRect === "function") {
      // @ts-ignore
      context.roundRect(
        xAxes - 7 - 8,
        GRAPH_TOP - 10 - lineHeight,
        textWidth + 20,
        lineHeight + 5,
        10
      );
    }

    context.fill();
    context.globalAlpha = 1;
    context.stroke();

    // add top text
    context.beginPath();
    context.font = "11px ProductSans";
    context.fillStyle = "#FFFFFF";
    context.fillText(score, xAxes - indent, GRAPH_TOP - 10);

    context.stroke();
  }
}

function drawData(
  context: CanvasRenderingContext2D,
  monthData: LuckyMonthData[],
  largest: number,
  largestIndices: number[]
) {
  const arrayLen = monthData.length;

  context.beginPath();
  context.lineJoin = "round";
  context.lineWidth = 5;

  const pointOneY =
    GRAPH_HEIGHT - (monthData[0].data / largest) * GRAPH_HEIGHT + GRAPH_TOP;
  context.moveTo(GRAPH_LEFT, pointOneY);

  // draw reference value for day of the week
  // context.fillText("1", 15, GRAPH_BOTTOM + 25);
  for (var i = 1; i < arrayLen; i++) {
    const gradientStroke = context.createLinearGradient(0, 0, 700, 0);
    gradientStroke.addColorStop(0, "#F40B62");
    gradientStroke.addColorStop(0.3, "#FF003A");
    gradientStroke.addColorStop(0.66, "#DDFE15");
    gradientStroke.addColorStop(1, "#2E2929");
    context.strokeStyle = gradientStroke;

    context.lineTo(
      (GRAPH_RIGHT / arrayLen) * i + GRAPH_LEFT + 5,
      GRAPH_HEIGHT - (monthData[i].data / largest) * GRAPH_HEIGHT + GRAPH_TOP
    );

    //shadow
    context.shadowColor = "rgba(0,0,0,0.1)";
    context.shadowBlur = 15;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 10;

    // draw reference value for day of the week
    // context.fillText((i + 1).toString(), GRAPH_RIGHT / arrayLen * i, GRAPH_BOTTOM + 25);
    context.stroke();
  }

  // draw circle if the highest if not the first point
  if (!largestIndices.includes(0)) {
    context.beginPath();
    context.arc(GRAPH_LEFT, pointOneY, 9, 0, 2 * Math.PI, false);
    context.fillStyle = "black";
    context.fill();
    context.strokeStyle = "white";
    context.stroke();
  }
}

function drawLargestEmoji(
  context: CanvasRenderingContext2D,
  monthData: LuckyMonthData[],
  largestIndices: number[]
) {
  // largest not found
  if (largestIndices.length === 0) return;
  const arrayLen = monthData.length;

  const largestIndex = largestIndices[0];

  const xAxes = (GRAPH_RIGHT / arrayLen) * largestIndex + GRAPH_LEFT + 5;

  const textXAxes = largestIndex === 0 ? xAxes - 30 : xAxes - 40;
  context.font = "bold 15px ProductSans";
  context.fillStyle = "#FFFFFF";
  context.fillText("Your luckiest", textXAxes, GRAPH_BOTTOM - 20);
  context.stroke();

  const emojiImg = new Image();
  emojiImg.src = emojiImgSrc;

  emojiImg.onload = function () {
    context.filter = "none";
    context.drawImage(emojiImg, xAxes - 10, GRAPH_BOTTOM - 60);
  };

  drawArrow(
    context,
    xAxes - 2,
    GRAPH_BOTTOM - 70,
    xAxes - 2,
    GRAPH_TOP + 15,
    1,
    "white"
  );

  // // highlight the point
  // context.beginPath();
  // context.arc(
  //     xAxes,
  //     GRAPH_TOP,
  //     15,
  //     0,
  //     2 * Math.PI,
  //     false
  // );
  // context.fillStyle = '#DDFE15';
  // context.filter = "blur(10px)";
  // context.fill();

  drawBlurryCircle(context, xAxes, GRAPH_TOP, 2 * Math.PI, 15);
}

function drawBlurryCircle(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  blur: number
) {
  context.shadowBlur = blur;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  context.fillStyle = "#DDFE15";
  context.shadowColor = "#DDFE15"; //set the shadow colour to that of the fill

  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, true);
  context.fill();
  context.stroke();
}

function getRandomValue(min = 21, max = 25) {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}

function getChartData(luckyMonths: LuckyMonthsResponse) {
  let finalData: LuckyMonthData[] = [];

  Object.entries(luckyMonths.monthScores).forEach((key) => {
    const month = parseInt(key[0]) as LuckyMonthValues;
    const value = key[1];
    const actualValue = value < 20 ? getRandomValue() : Math.floor(value);

    const foundMonthInfo = MonthsInfo?.[month] ?? null;

    if (foundMonthInfo) {
      finalData.push({
        month: foundMonthInfo.month,
        year: foundMonthInfo.year,
        data: actualValue,
      });
    }
  });

  return finalData;
}

function LuckyMonthsChart({ luckyMonths }: LuckyMonthsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chartData = getChartData(luckyMonths);

    let largest = 0;
    let largestIndices: number[] = [];
    for (let i = 0; i < chartData.length; i++) {
      if (chartData[i].data !== 0 && chartData[i].data >= largest) {
        if (chartData[i].data === largest) {
          largestIndices.push(i);
        } else if (chartData[i].data > largest) {
          largestIndices = [];
          // clear out the array
          largestIndices.push(i);
        }

        largest = chartData[i].data;
      }
    }

    canvasCtxRef.current = canvasRef.current.getContext("2d");
    let ctx = canvasCtxRef.current;

    if (ctx) {
      // // set max value is 100
      // drawGrid(ctx, chartData, 100);
      // drawData(ctx, chartData, 100);

      drawGrid(ctx, chartData, largest);
      drawData(ctx, chartData, largest, largestIndices);
      drawLargestEmoji(ctx, chartData, largestIndices);
    }
  }, []);

  return <canvas ref={canvasRef} width="900" height="220"></canvas>;
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  fromx: number,
  fromy: number,
  tox: number,
  toy: number,
  arrowWidth: number,
  color: string
) {
  //variables to be used when creating the arrow
  var headlen = 10;
  var angle = Math.atan2(toy - fromy, tox - fromx);

  ctx.save();
  ctx.strokeStyle = color;

  //starting path of the arrow from the start square to the end square
  //and drawing the stroke
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);
  ctx.lineWidth = arrowWidth;
  ctx.stroke();

  //starting a new path from the head of the arrow to one of the sides of
  //the point
  ctx.beginPath();
  ctx.moveTo(tox, toy);
  ctx.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 7),
    toy - headlen * Math.sin(angle - Math.PI / 7)
  );

  //path from the side point of the arrow, to the other side point
  ctx.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 7),
    toy - headlen * Math.sin(angle + Math.PI / 7)
  );

  //path from the side point back to the tip of the arrow, and then
  //again to the opposite side point
  ctx.lineTo(tox, toy);
  ctx.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 7),
    toy - headlen * Math.sin(angle - Math.PI / 7)
  );

  //draws the paths created above
  ctx.stroke();
  ctx.restore();
}

export default LuckyMonthsChart;
