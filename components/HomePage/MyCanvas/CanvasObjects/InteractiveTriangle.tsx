import InteractivePoint from './InteractivePoint';
import NonInteractivePoint from './NonInteractivePoint';
import { Pi, Tau } from './UsefulConstants';

type Point = InteractivePoint | NonInteractivePoint;
class InteractiveTriangle {
  listenFor: any[];

  angleA: number;
  angleB: number;
  angleC: number;

  sideA: number;
  sideB: number;
  sideC: number;

  constructor(
    public pointA: Point,
    public pointB: Point,
    public pointC: Point,
    public sideColor?: string
  ) {
    this.calculateSideLengths();
  }

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

  update = () => {
    this.calculateSideLengths();
    this.calculateAngles();
  };

  draw = () => {
    this.update();
    this.drawSides();
    this.drawPoints();
    console.log(this.angleA);
    // this.drawAngle(this.pointA);
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

  getDistance = (x0: number, y0: number, x1: number, y1: number) => {
    let xDiff = x0 - x1;
    let yDiff = y0 - y1;
    let distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
    return distance;
  };

  get_dx_dy = (x0: number, y0: number, x1: number, y1: number) => {
    let xDiff = x1 - x0;
    let yDiff = y1 - y0;

    let distance = this.getDistance(x0, y0, x1, y1);

    let dx = xDiff / distance;
    let dy = yDiff / distance;

    return { dx, dy };
  };

  calculateSideLengths = () => {
    let [pointA, pointB, pointC] = [this.pointA, this.pointB, this.pointC];

    let magnitudeSideC = this.getDistance(
      pointA.x,
      pointA.y,
      pointB.x,
      pointB.y
    );
    let magnitudeSideB = this.getDistance(
      pointA.x,
      pointA.y,
      pointC.x,
      pointC.y
    );
    let magnitudeSideA = this.getDistance(
      pointB.x,
      pointB.y,
      pointC.x,
      pointC.y
    );

    this.sideA = magnitudeSideA;
    this.sideB = magnitudeSideB;
    this.sideC = magnitudeSideC;
    console.log(this.sideA);
  };

  getShortestSide = () => {
    let allLengths = [this.sideA, this.sideB, this.sideC].sort((a, b) => a - b);
    let shortestSide = allLengths[0];
    return shortestSide;
  };

  calculateAngles = () => {
    this.calculateSideLengths();
    this.angleA = this.calculateAngleWithLawOfCosines(
      this.sideA,
      this.sideB,
      this.sideC
    );
    this.angleB = this.calculateAngleWithLawOfCosines(
      this.sideB,
      this.sideA,
      this.sideC
    );
    this.angleC = this.calculateAngleWithLawOfCosines(
      this.sideC,
      this.sideA,
      this.sideB
    );
  };

  calculateAngleWithLawOfCosines = (
    oppositeSide: number,
    side1: number,
    side2: number
  ) => {
    let a = side1;
    let b = side2;
    let c = oppositeSide;

    let angleC;

    angleC = Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b));

    return angleC;
  };

  drawAngle = (point: Point) => {
    let context = point.context;
    let radius = this.getShortestSide() / 4;

    let allPoints = [this.pointA, this.pointB, this.pointC];

    let otherPoints = allPoints.filter((arrayPoint) => arrayPoint !== point);
    let [point1, point2] = otherPoints;

    let { dx: dx1, dy: dy1 } = this.get_dx_dy(
      point.x,
      point.y,
      point1.x,
      point1.y
    );

    let { dx: dx2, dy: dy2 } = this.get_dx_dy(
      point.x,
      point.y,
      point2.x,
      point2.y
    );

    let endpoint1 = { x: point.x + dx1 * radius, y: point.y + dy1 * radius };
    let endpoint2 = { x: point.x + dx2 * radius, y: point.y + dy2 * radius };

    // context.fillRect(endpoint1.x, endpoint1.y, 10, 10);
    // context.fillRect(endpoint2.x, endpoint2.y, 10, 10);

    context.strokeStyle = 'black';
    context.lineWidth = 5;

    context.beginPath();

    context.arcTo(endpoint1.x, endpoint1.y, endpoint2.x, endpoint2.y, radius);
    context.stroke();
  };
}

export default InteractiveTriangle;
