import cornerSquareTypes from "../../constants/cornerSquareTypes";
import { CornerSquareType, DrawArgs, BasicFigureDrawArgs, RotateFigureArgs, Window } from "../../types";

export default class QRCornerSquare {
  _element?: SVGElement;
  _svg: SVGElement;
  _type: CornerSquareType;
  _window: Window;

  constructor({ svg, type, window }: { svg: SVGElement; type: CornerSquareType; window: Window }) {
    this._svg = svg;
    this._type = type;
    this._window = window;
  }

  draw(x: number, y: number, size: number, rotation: number): void {
    const type = this._type;
    let drawFunction;

    switch (type) {
      case cornerSquareTypes.dotsLight:
        drawFunction = this._drawDotsLight;
        break;
      case cornerSquareTypes.classy:
        drawFunction = this._drawClassy;
        break;
      case cornerSquareTypes.classyRounded:
        drawFunction = this._drawClassyRounded;
        break;
      case cornerSquareTypes.rounded:
        drawFunction = this._drawRounded;
        break;
      case cornerSquareTypes.extraRounded:
        drawFunction = this._drawExtraRounded;
        break;
      case cornerSquareTypes.squareThin:
        drawFunction = this._drawSquareThin;
        break;
      case cornerSquareTypes.circle:
        drawFunction = this._drawCircle;
        break;
      case cornerSquareTypes.square:
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

  _basicDot(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x + size / 2} ${y}` + // M cx, y //  Move to top of ring
            `a ${size / 2} ${size / 2} 0 1 0 0.1 0` + // a outerRadius, outerRadius, 0, 1, 0, 1, 0 // Draw outer arc, but don't close it
            `z` + // Z // Close the outer shape
            `m 0 ${dotSize}` + // m -1 outerRadius-innerRadius // Move to top point of inner radius
            `a ${size / 2 - dotSize} ${size / 2 - dotSize} 0 1 1 -0.1 0` + // a innerRadius, innerRadius, 0, 1, 1, -1, 0 // Draw inner arc, but don't close it
            `Z` // Z // Close the inner ring. Actually will still work without, but inner ring will have one unit missing in stroke
        );
      }
    });
  }

  _basicSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` +
            `v ${size}` +
            `h ${size}` +
            `v ${-size}` +
            `z` +
            `M ${x + dotSize} ${y + dotSize}` +
            `h ${size - 2 * dotSize}` +
            `v ${size - 2 * dotSize}` +
            `h ${-size + 2 * dotSize}` +
            `z`
        );
      }
    });
  }

  _basicExtraRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x} ${y + 2.5 * dotSize}` +
            `v ${2 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${dotSize * 2.5} ${dotSize * 2.5}` +
            `h ${2 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${dotSize * 2.5} ${-dotSize * 2.5}` +
            `v ${-2 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${-dotSize * 2.5}` +
            `h ${-2 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${dotSize * 2.5}` +
            `M ${x + 2.5 * dotSize} ${y + dotSize}` +
            `h ${2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${dotSize * 1.5} ${dotSize * 1.5}` +
            `v ${2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${-dotSize * 1.5} ${dotSize * 1.5}` +
            `h ${-2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${-dotSize * 1.5} ${-dotSize * 1.5}` +
            `v ${-2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${dotSize * 1.5} ${-dotSize * 1.5}`
        );
      }
    });
  }

  _drawDot({ x, y, size, rotation }: DrawArgs): void {
    this._basicDot({ x, y, size, rotation });
  }

  _drawSquare({ x, y, size, rotation }: DrawArgs): void {
    this._basicSquare({ x, y, size, rotation });
  }

  _drawExtraRounded({ x, y, size, rotation }: DrawArgs): void {
    this._basicExtraRounded({ x, y, size, rotation });
  }

  _drawDotsLight({ x, y, size }: DrawArgs): void {
    const dot = size / 24;

    function drawMiniDot(mx: number, my: number, a1x: number, a1y: number, a2x: number, a2y: number) {
      return `M ${mx} ${my}` + `A 1 1 0 0 0 ${a1x} ${a1y}` + `A 1 1 0 0 0 ${a2x} ${a2y}` + "Z";
    }

    this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this._element.setAttribute(
      "d",
      drawMiniDot(x + dot, y, x + dot, y + dot * 2, x + dot, y) +
        drawMiniDot(x + size / 2, y, x + size / 2, y + dot * 2, x + size / 2, y) +
        drawMiniDot(x + size - dot, y, x + size - dot, y + dot * 2, x + size - dot, y) +
        drawMiniDot(
          x + size - dot,
          y + (size / 2 - dot),
          x + size - dot,
          y + (size / 2 + dot),
          x + size - dot,
          y + (size / 2 - dot)
        ) +
        drawMiniDot(
          x + size - dot,
          y + size - dot * 2,
          x + size - dot,
          y + size,
          x + size - dot,
          y + (size - dot * 2)
        ) +
        drawMiniDot(x + size / 2, y + size - dot * 2, x + size / 2, y + size, x + size / 2, y + (size - dot * 2)) +
        drawMiniDot(x + dot, y + size - dot * 2, x + dot, y + size, x + dot, y + (size - dot * 2)) +
        drawMiniDot(x + dot, y + size / 2 - dot, x + dot, y + size / 2 + dot, x + dot, y + (size / 2 - dot))
    );
  }

  _drawClassy({ x, y, size }: DrawArgs): void {
    const dotSize = size / 7;

    this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this._element.setAttribute("clip-rule", "evenodd");
    this._element.setAttribute(
      "d",
      `M ${x + dotSize / 2} ${y}` +
        `Q ${x} ${y} ${x} ${y + dotSize / 2}` +
        `L ${x} ${y + size}` +
        `L ${x + (size - dotSize / 2)} ${y + size}` +
        `Q ${x + size} ${y + size} ${x + size} ${y + (size - dotSize / 2)}` +
        `L ${x + size} ${y}` +
        `M ${x + (size - dotSize)} ${y + (size - dotSize)}` +
        `H ${x + dotSize}` +
        `V ${y + dotSize}` +
        `H ${x + (size - dotSize)}` +
        `Z`
    );
  }

  _drawClassyRounded({ x, y, size }: DrawArgs): void {
    const dotSize = size / 7;

    this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this._element.setAttribute("clip-rule", "evenodd");
    this._element.setAttribute(
      "d",
      `M ${x + dotSize} ${y}` +
        `Q ${x} ${y} ${x} ${y + dotSize}` +
        `L ${x} ${y + size}` +
        `L ${x + (size - dotSize)} ${y + size}` +
        `Q ${x + size} ${y + size} ${x + size} ${y + (size - dotSize)}` +
        `L ${x + size} ${y}` +
        `M ${x + (size - dotSize)} ${y + (size - dotSize)}` +
        `H ${x + dotSize}` +
        `V ${y + dotSize}` +
        `H ${x + (size - dotSize)}` +
        `Z`
    );
  }

  _drawRounded({ x, y, size, rotation }: DrawArgs): void {
    const dotSize = size / 7;

    this._rotateFigure({
      ...{ x, y, size, rotation },
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x + dotSize} ${y}` +
            `Q ${x} ${y} ${x} ${y + dotSize}` +
            `L ${x} ${y + size - dotSize}` +
            `Q ${x} ${y + size} ${x + dotSize} ${y + size}` +
            `L ${x + (size - dotSize)} ${y + size}` +
            `Q ${x + size} ${y + size} ${x + size} ${y + (size - dotSize)}` +
            `L ${x + size} ${y + dotSize}` +
            `Q ${x + size} ${y} ${x + (size - dotSize)} ${y}` +
            `Z` +
            `M ${x + (size - dotSize)} ${y + (size - dotSize) - 4}` +
            `Q ${x + (size - dotSize)} ${y + (size - dotSize)} ${x + (size - dotSize - 4)} ${y + (size - dotSize)}` +
            `L ${x + dotSize + 4} ${y + (size - dotSize)}` +
            `Q ${x + dotSize} ${y + (size - dotSize)} ${x + dotSize} ${y + (size - dotSize - 4)}` +
            `L ${x + dotSize} ${y + dotSize + 4}` +
            `Q ${x + dotSize} ${y + dotSize} ${x + dotSize + 4} ${y + dotSize}` +
            `L ${x + (size - dotSize - 4)} ${y + dotSize}` +
            `Q ${x + (size - dotSize)} ${y + dotSize} ${x + (size - dotSize)} ${y + dotSize + 4}` +
            `Z`
        );
      }
    });
  }

  _drawSquareThin({ x, y, size }: DrawArgs): void {
    const dotSize = size / 10;

    this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this._element.setAttribute("clip-rule", "evenodd");
    this._element.setAttribute(
      "d",
      `M ${x} ${y}` +
        `v ${size}` +
        `h ${size}` +
        `v ${-size}` +
        `z` +
        `M ${x + dotSize} ${y + dotSize}` +
        `h ${size - 2 * dotSize}` +
        `v ${size - 2 * dotSize}` +
        `h ${-size + 2 * dotSize}` +
        `z`
    );
  }

  _drawCircle({ x, y, size, rotation }: DrawArgs): void {
    const dotSize = size / 8;

    this._rotateFigure({
      ...{ x, y, size, rotation},
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x + size / 2} ${y}` + // M cx, y //  Move to top of ring
            `a ${size / 2} ${size / 2} 0 1 0 0.1 0` + // a outerRadius, outerRadius, 0, 1, 0, 1, 0 // Draw outer arc, but don't close it
            `z` + // Z // Close the outer shape
            `m 0 ${dotSize}` + // m -1 outerRadius-innerRadius // Move to top point of inner radius
            `a ${size / 2 - dotSize} ${size / 2 - dotSize} 0 1 1 -0.1 0` + // a innerRadius, innerRadius, 0, 1, 1, -1, 0 // Draw inner arc, but don't close it
            `Z` // Z // Close the inner ring. Actually will still work without, but inner ring will have one unit missing in stroke
        );
      }
    });
  }
}
