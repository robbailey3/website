import { Vector } from '../vector/vector';

export interface GameObject {
  draw(context: CanvasRenderingContext2D);
  update();
  position: Vector;
  velocity: Vector;
}
