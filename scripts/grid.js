/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Abril 26 2022
 * @desc A class for a canvas grid
 *
 */

'use strict';


/** Class representing a Grid on Canvas
  * @property {number} #canvas The canvas to draw
  * @property {number} #ctx The context to draw
  * @property {number} #canvasWidth The canvas width
  * @property {number} #canvasHeight The canvas height
  * @property {number} #size The size of the grid
  * @property {number} #steps The steps of the grid
 */
export class Grid {
  /** @private */
  #canvas = null;
  #ctx = null;
  #canvasWidth = 0;
  #canvasHeight = 0;
  #size = 0;
  #steps = 0;
  #offset = 40;
  #fontSize = 15;


  /**
     * Create a Grid
     * @constructor
     * @public
     * @param {string} canvasId - ID of the HTML Canvas Element
     * @param {number} size the size of the grid
     * @param {number} steps the steps of the axis
     * @param {number} offset the offset
     */
  constructor(canvasId, size, steps, offset) {
    this.#canvas = document.getElementById(canvasId);
    this.#ctx = this.#canvas.getContext('2d');

    // this.#canvas.width = window.innerWidth - 15;
    // this.#canvas.height = window.innerHeight - 15;

    this.#offset = offset;

    this.#canvasHeight = this.#canvas.height - this.#offset;
    this.#canvasWidth = this.#canvas.width - this.#offset;
    this.#steps = steps;
    this.#size = size;
  }


  /** Draws the grid
    * @function
    * @param {object} ctx the context to draw to
    * @param {number} size the size of the grid
    * @param {number} steps the steps of the axis
    */
  drawGrid() {
    if (this.#size > 0) {
      this.#ctx.strokeStyle = '#EBECF0';

      this.#drawVertical(this.#ctx, this.#size);
      this.#drawHorizontal(this.#ctx, this.#size);
    }

    if (this.#steps > 0) {
      this.#ctx.font = this.#fontSize +'px monospace';
      this.#ctx.fillStyle = 'black';
      this.#drawHorizontalAxes(this.#ctx, this.#steps);
      this.#drawVerticalAxes(this.#ctx, this.#steps);
    }
  }

  /** Draws the horizontal lines
    * @function
    * @param {object} ctx the context to draw to
    * @param {number} size the size of the grid
    */
  #drawHorizontal(ctx, size) {
    for (let y = this.#offset; y <= this.#canvasHeight; y += size) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      if (y % (size * 4) - this.#offset === 0) {
        ctx.lineWidth = 2;
      };
      ctx.moveTo(this.#offset, y);
      ctx.lineTo(this.#canvasWidth, y);
      ctx.stroke();
    }
  }

  /** Draws the horizontal axes
    * @function
    * @param {object} ctx the context to draw to
    * @param {number} steps the steps of the axis
    */
  #drawHorizontalAxes(ctx, steps) {
    for (let y = this.#offset; y < this.#canvasHeight; y += steps) {
      ctx.fillText(y - this.#offset, this.#offset, y + this.#fontSize);
    }
  }

  /** Draws the horizontal axes
    * @function
    * @param {object} ctx the context to draw to
    * @param {number} steps the steps of the axis
    */
  #drawVerticalAxes(ctx, steps) {
    for (let x = this.#offset; x < this.#canvasWidth; x += steps) {
      ctx.fillText(x - this.#offset, x, this.#offset + this.#fontSize);
    }
  }

  /** Draws the vertical lines
    *
    * @function
    * @param {object} ctx the context to draw to
    * @param {number} size the size of the grid
    */
  #drawVertical(ctx, size) {
    for (let x = this.#offset; x <= this.#canvasWidth; x += size) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      if (x % (size * 4) - this.#offset === 0) {
        ctx.lineWidth = 2;
      };
      ctx.moveTo(x, this.#offset);
      ctx.lineTo(x, this.#canvasHeight);
      ctx.stroke();
    }
  }
}
