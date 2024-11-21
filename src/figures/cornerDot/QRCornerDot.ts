import cornerDotTypes from "../../constants/cornerDotTypes";
import { CornerDotType, RotateFigureArgs, BasicFigureDrawArgs, DrawArgs, Window } from "../../types";

export default class QRCornerDot {
  _element?: SVGElement;
  _svg: SVGElement;
  _type: CornerDotType;
  _window: Window;

  constructor({ svg, type, window }: { svg: SVGElement; type: CornerDotType; window: Window }) {
    this._svg = svg;
    this._type = type;
    this._window = window;
  }

  draw(x: number, y: number, size: number, rotation: number): void {
    const type = this._type;
    let drawFunction;

    switch (type) {
      case cornerDotTypes.classyRounded:
        drawFunction = this._drawClassyRounded;
        break;
      case cornerDotTypes.classy:
        drawFunction = this._drawClassy;
        break;
      case cornerDotTypes.circle:
        drawFunction = this._drawCircle;
        break;
      case cornerDotTypes.rounded:
        drawFunction = this._drawRounded;
        break;
      case cornerDotTypes.extraRounded:
        drawFunction = this._drawExtraRounded;
        break;
      case cornerDotTypes.star:
        drawFunction = this._drawStar;
        break;
      case cornerDotTypes.square:
      default:
        drawFunction = this._drawSquare;
    }

    drawFunction.call(this, { x, y, size, rotation });
  }

  _rotateFigure({ x, y, size, rotation = 0, draw }: RotateFigureArgs): void {
    const cx = x + size / 2;
    const cy = y + size / 2;

    draw();
    this._element?.setAttribute("transform", `rotate(${(180 * rotation) / Math.PI},${cx},${cy})`);
  }


  _basicCircle(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const cx = x + size / 2;
    const cy = y + size / 2;
    const r = size / 2;

    this._rotateFigure({
      ...{ size, x, y },
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${cx - r}, ${cy} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`
        );
      }
    });
  }

  _basicSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...{ size, x, y },
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("d", `M ${x} ${y} l 0 ${size} l ${size} 0 l 0 -${size} z`);
      }
    });
  }

  _basicRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 3;

    this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this._element.setAttribute(
      "d",
      `M ${x + dotSize / 2} ${y}` +
        `Q ${x} ${y} ${x} ${y + dotSize / 2}` +
        `V ${y + dotSize * 2.5}` +
        `Q ${x} ${y + size} ${x + dotSize / 2} ${y + size}` +
        `H ${x + dotSize * 2.5}` +
        `Q ${x + size} ${y + size} ${x + size} ${y + dotSize * 2.5}` +
        `V ${y + dotSize / 2}` +
        `Q ${x + size} ${y} ${x + dotSize * 2.5} ${y}` +
        `Z`
    );
  }

  _basicExtraRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 3;

    this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this._element.setAttribute(
      "d",
      `M ${x + dotSize} ${y}` +
        `Q ${x} ${y} ${x} ${y + dotSize}` +
        `V ${y + dotSize * 2}` +
        `Q ${x} ${y + size} ${x + dotSize} ${y + size}` +
        `H ${x + dotSize * 2}` +
        `Q ${x + size} ${y + size} ${x + size} ${y + dotSize * 2}` +
        `V ${y + dotSize}` +
        `Q ${x + size} ${y} ${x + dotSize * 2} ${y}` +
        `Z`
    );
  }

  _basicClassy(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 3;

    this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this._element.setAttribute(
      "d",
      `M ${x + dotSize / 2} ${y}` +
        `Q ${x} ${y} ${x} ${y + dotSize / 2}` +
        `V ${y + size}` +
        `Q ${x} ${y + size} ${x + dotSize / 2} ${y + size}` +
        `H ${x + dotSize * 2.5}` +
        `Q ${x + size} ${y + size} ${x + size} ${y + dotSize * 2.5}` +
        `V ${y}` +
        `Z`
    );
  }

  _basicStar(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this._element.setAttribute(
      "d",
      `M ${x} ${y}` +
        `Q ${x + size / 2} ${y + size / 2} ${x} ${y + size}` +
        `Q ${x + size / 2} ${y + size / 2} ${x + size} ${y + size}` +
        `Q ${x + size / 2} ${y + size / 2} ${x + size} ${y}` +
        `Q ${x + size / 2} ${y + size / 2} ${x} ${y}` +
        `Z`
    );
  }

  _basicClassyRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 3;

    this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this._element.setAttribute(
      "d",
      `M ${x + dotSize} ${y}` +
        `Q ${x} ${y} ${x} ${y + dotSize}` +
        `V ${y + size}` +
        `H ${x + dotSize * 2}` +
        `Q ${x + size} ${y + size} ${x + size} ${y + dotSize * 2}` +
        `V ${y}` +
        `Z`
    );
  }

  _drawCircle({ x, y, size, rotation }: DrawArgs): void {
    this._basicCircle({ x, y, size, rotation });
  }

  _drawSquare({ x, y, size, rotation }: DrawArgs): void {
    this._basicSquare({ x, y, size, rotation });
  }

  _drawRounded({ x, y, size, rotation }: DrawArgs): void {
    this._basicRounded({ x, y, size, rotation });
  }

  _drawExtraRounded({ x, y, size, rotation }: DrawArgs): void {
    this._basicExtraRounded({ x, y, size, rotation });
  }

  _drawClassy({ x, y, size, rotation }: DrawArgs): void {
    this._basicClassy({ x, y, size, rotation });
  }

  _drawClassyRounded({ x, y, size, rotation }: DrawArgs): void {
    this._basicClassyRounded({ x, y, size, rotation });
  }

  _drawStar({ x, y, size, rotation }: DrawArgs): void {
    this._basicStar({ x, y, size, rotation });
  }
}
