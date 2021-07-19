import { Vector } from '../vector/vector';

export interface GameObject {
  /**
   * Draw the object on the canvas
   * @Param {CanvasRenderingContext2D} context - the canvas context
   */
  draw(context: CanvasRenderingContext2D); //

  /**
   *  Update the object (e.g. move, rotate, etc.)
   */
  update();

  /**
   * A vector representing the position of the object
   */
  position: Vector;

  /**
   * A vector representing the velocity of the object
   */
  velocity: Vector;
}
