export class Vector {
  constructor(public x: number, public y: number) {}

  public static add(v1: Vector, v2: Vector): Vector {
    return v1.add(v2);
  }

  public static minus(v1: Vector, v2: Vector): Vector {
    return v1.minus(v2);
  }

  public static times(v: Vector, n: number): Vector {
    return v.times(n);
  }

  public static divide(v: Vector, n: number): Vector {
    return v.divide(n);
  }

  public static dot(v1: Vector, v2: Vector): number {
    return v1.dot(v2);
  }

  public static magnitude(v: Vector): number {
    return v.magnitude();
  }

  public add(v: Vector): Vector {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  public minus(v: Vector): Vector {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  public times(n: number): Vector {
    this.x *= n;
    this.y *= n;
    return this;
  }

  public divide(n: number): Vector {
    this.x /= n;
    this.y /= n;
    return this;
  }

  public dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  public clone(): Vector {
    return new Vector(this.x, this.y);
  }

  public magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public rotate(rad: number): Vector {
    this.x = this.x * Math.cos(rad) - this.y * Math.sin(rad);
    this.y = this.x * Math.sin(rad) + this.y * Math.cos(rad);
    return this;
  }

  public rotateDeg(deg: number): Vector {
    return this.rotate((Math.PI * deg) / 180);
  }
}
