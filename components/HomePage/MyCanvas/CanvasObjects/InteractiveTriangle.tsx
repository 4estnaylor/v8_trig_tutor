import InteractivePoint from './InteractivePoint';
import NonInteractivePoint from './NonInteractivePoint';

type Point = InteractivePoint | NonInteractivePoint;
class InteractiveTriangle {
  listenFor: any[];

  constructor(
    public pointA: Point,
    public pointB: Point,
    public pointC: Point,
    public sideColor?: string
  ) {}

  intializeListenFor = () => {
    let points = [this.pointA, this.pointB, this.pointC];
    this.listenFor = [];
    points.forEach((point) => {
      if (point.constructor.name === InteractivePoint.name) {
        let interactivePoint = point as InteractivePoint;
        interactivePoint.listenFor = this.listenFor;
      }
    });
  };

  draw = () => {
    this.drawPoints();
    this.drawSides();
  };

  drawPoints = () => {
    this.pointA.draw();
    this.pointB.draw();
    this.pointC.draw();
  };

  drawSides = () => {
    this.drawSide(this.pointA);
    this.drawSide(this.pointB);
    this.drawSide(this.pointC);
  };

  drawSide = (point: Point) => {
    let allPoints = [this.pointA, this.pointB, this.pointC];
    let context = point.context;
    let endPoints = allPoints.filter((arrayPoint) => arrayPoint !== point);
    let point1 = endPoints[0];
    let point2 = endPoints[1];
    context.strokeStyle = this.sideColor || point.color;
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(point1.x, point1.y);
    context.lineTo(point2.x, point2.y);
    context.stroke();
    context.beginPath();
  };

  drawAngles = () => {};

  drawAngle = (point: Point) => {
    let radius = 60;
    let allPoints = [this.pointA, this.pointB, this.pointC];
    let otherPoints = allPoints.filter((arrayPoint) => arrayPoint !== point);
    let diffX0 = point.x - otherPoints[0].x; // related to point in question
    let diffY0 = point.y - otherPoints[0].y; // related to point in question
    let diffX1 = point.x - otherPoints[1].x; // related to point in question
    let diffY1 = point.y - otherPoints[1].y; // related to point in question
    let diffXz = otherPoints[0].x - otherPoints[1].x;
    let diffYz = otherPoints[0].y - otherPoints[1].y;

    let magnitudeSide0 = Math.sqrt(diffX0 ** 2 + diffY0 ** 2);
    let magnitudeSide1 = Math.sqrt(diffX1 ** 2 + diffY1 ** 2);
    let magnitudeSideZ = Math.sqrt(diffXz ** 2 + diffYz ** 2);

    let sideMagnitudes = [magnitudeSide0, magnitudeSide1, magnitudeSideZ];
  };
}

export default InteractiveTriangle;
