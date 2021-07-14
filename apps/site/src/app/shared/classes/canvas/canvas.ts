export interface CanvasConfig {
  backgroundColor: string;
  strokeColor: string;
  strokeWidth: number;
  fillColor: string;
}

export class Canvas {
  private ctx: CanvasRenderingContext2D;

  private config = {
    backgroundColor: '#ffffff',
    strokeColor: '#000000',
    strokeWidth: 1,
    fillColor: '#000000'
  } as CanvasConfig;

  constructor(private readonly host: HTMLCanvasElement) {
    this.ctx = this.host.getContext('2d');
  }

  public setConfig(config: Partial<CanvasConfig>) {
    for (const [key, value] of Object.entries(config)) {
      this.config[key] = value;
    }
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.host.width, this.host.height);
    this.rectangle(
      0,
      0,
      this.host.width,
      this.host.height,
      this.config.backgroundColor
    );
  }

  public rectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor = this.config.fillColor
  ): void {
    this.ctx.save();
    this.ctx.fillStyle = fillColor;
    this.ctx.fillRect(x, y, width, height);
    this.ctx.restore();
  }

  public circle(
    x: number,
    y: number,
    radius: number,
    fillColor = this.config.fillColor
  ): void {
    this.ctx.save();
    this.ctx.fillStyle = fillColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  }

  public line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeColor = this.config.strokeColor,
    strokeWidth = this.config.strokeWidth
  ) {
    this.ctx.save();
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = strokeWidth;
    this.ctx.moveTo(x1, y1);
    this.ctx.beginPath();
    this.ctx.moveTo(x2, y2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  public drawImage(
    image: CanvasImageSource,
    x: number,
    y: number,
    width?: number,
    height?: number
  ) {
    this.ctx.drawImage(image, x, y, width, height);
  }
}
