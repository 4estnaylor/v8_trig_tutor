import cl from '../../../../colors';
import { Tau } from './UsefulConstants';

class NonInteractivePoint {
  constructor(
    public context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public color: string = cl.getHSL(cl.black),
    public radius = 10,
    public isUnderCursor = null
  ) {}

  draw = () => {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Tau);
    this.context.fill();
    this.context.beginPath();
  };
}

export default NonInteractivePoint;
