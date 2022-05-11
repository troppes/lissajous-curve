/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Mayo 5 2022
 * @desc A class for Lissajous
 *
 */

'use strict';

import {Grid} from './grid.js';

/** Class representing a Lissajous on Canvas
 *
 * @property {number} #FPS set the framerate for the animation
 * @property {boolean} #animate decides if the canvas should be redrawn
 * @property {number} #canvas The canvas to draw
 * @property {number} #ctx The context to draw
 * @property {number} #ratioX The current constant for x
 * @property {number} #ratioY The current constant for y
 * @property {number} #ampX The current amplitute for x
 * @property {number} #ampY The current amplitute for x
 * @property {number} #phaseShift The current phaseshift angle
 * @property {number} #lineWidth the current line width
 * @property {Grid} #grid grid for the background
 * @property {string} #dotColor the current color of the dot
 * @property {string} #lineColor the current color of the line
*/
export class Lissajous {
  /** @private */
  #animatePhi = true;
  #animateA = false;
  #animateB = false;
  #animatePoint = false;
  #angle = 0;
  #FPS = 30;
  #canvas = null;
  #ctx = null;
  #ratioX;
  #ratioY;
  #ampX;
  #ampY;
  #phaseShift = 0.0;
  #lineWidth;
  #grid;
  #dotColor;
  #lineColor;

  /**
    * Create a Lissajous
    * @constructor
    * @public
    * @param {string} canvasId - ID of the HTML Canvas Element
    */
  constructor(canvasId) {
    this.#canvas = document.getElementById(canvasId);
    this.#ctx = this.#canvas.getContext('2d');

    this.#canvas.width =
      document.getElementById('canvas-container').clientWidth;
    this.#canvas.height =
      document.getElementById('canvas-container').clientHeight;

    this.#grid = new Grid(canvasId, 20, 0, 0);

    // Get Default Values
    this.#ratioX = Number(document.getElementById('ratioX').value);
    this.#ratioY = Number(document.getElementById('ratioY').value);
    this.#ampX = Number(document.getElementById('ampX').value);
    this.#ampY = Number(document.getElementById('ampY').value);
    this.#lineWidth = Number(document.getElementById('lineWidth').value);
    this.#lineColor = document.getElementById('lineColor').value;
    this.#dotColor = document.getElementById('dotColor').value;

    this.#setupSliders();
    this.#setupTextBoxes();
    this.#setupCheckBoxes();
    this.#setupColorPickers();

    // Add listener for resizing
    window.addEventListener('resize', () => {
      this.#canvas.width =
        document.getElementById('canvas-container').clientWidth;
      this.#canvas.height =
        document.getElementById('canvas-container').clientHeight;

      this.#grid = new Grid(canvasId, 20, 0, 0);
    });

    this.#ctx.lineCap = 'round';
    this.#ctx.lineJoin = 'round';

    this.#update(this.#ctx);
  }

  /** Set up the event listener for the sliders
   * @function
  */
  #setupSliders() {
    document.getElementById('ratioX').addEventListener('input', (event) => {
      this.#ratioX = Number(event.target.value);
      document.getElementById('currRatioX').value = event.target.value;
    });

    document.getElementById('ratioY').addEventListener('input', (event) => {
      this.#ratioY = Number(event.target.value);
      document.getElementById('currRatioY').value = event.target.value;
    });

    document.getElementById('phaseShift').addEventListener('input', (event) => {
      this.#phaseShift = Number(event.target.value * Math.PI);
      document.getElementById('currPhaseShift').value = event.target.value;
    });

    document.getElementById('ampX').addEventListener('input', (event) => {
      this.#ampX = Number(event.target.value);
      document.getElementById('currAmpX').value = event.target.value;
    });

    document.getElementById('ampY').addEventListener('input', (event) => {
      this.#ampY = Number(event.target.value);
      document.getElementById('currAmpY').value = event.target.value;
    });

    document.getElementById('lineWidth').addEventListener('input', (event) => {
      this.#lineWidth = Number(event.target.value);
      document.getElementById('currLineWidth').value = event.target.value;
    });

    document.getElementById('dotPhaseShift').addEventListener('input', (event) => {
      this.#angle = Number(event.target.value);
      document.getElementById('currDotPhaseShift').value = event.target.value;
    });
  }


  /** Set up the events listeners for the text boxes
   * @function
  */
  #setupTextBoxes() {
    document.getElementById('currRatioX').addEventListener('input', (event) => {
      this.#ratioX = event.target.value;
      document.getElementById('ratioX').value = event.target.value;
    });

    document.getElementById('currRatioY').addEventListener('input', (event) => {
      this.#ratioY = event.target.value;
      document.getElementById('ratioY').value = event.target.value;
    });

    document.getElementById('currPhaseShift')
        .addEventListener('input', (event) => {
          this.#phaseShift = event.target.value * Math.PI;
          document.getElementById('phaseShift').value = event.target.value;
        });


    document.getElementById('currAmpX').addEventListener('input', (event) => {
      this.#ampX = event.target.value;
      document.getElementById('ampX').value = event.target.value;
    });

    document.getElementById('currAmpY').addEventListener('input', (event) => {
      this.#ampY = event.target.value;
      document.getElementById('ampY').value = event.target.value;
    });

    document.getElementById('currDotPhaseShift').addEventListener('input', (event) => {
      this.#angle = event.target.value;
      document.getElementById('dotPhaseShift').value = event.target.value;
    });

    document.getElementById('currLineWidth')
        .addEventListener('input', (event) => {
          this.#lineWidth = event.target.value;
          document.getElementById('lineWidth').value = event.target.value;
        });
  }

  /** Set up listener for checkbox
   * @function
  */
  #setupCheckBoxes() {
    document.getElementById('animatePhi').addEventListener('change',
        (event) => {
          this.#animatePhi = event.target.checked;
        });
    document.getElementById('animateX').addEventListener('change',
        (event) => {
          this.#animateA = event.target.checked;
        });
    document.getElementById('animateY').addEventListener('change',
        (event) => {
          this.#animateB = event.target.checked;
        });

    document.getElementById('animateDot').addEventListener('change',
        (event) => {
          this.#animatePoint = event.target.checked;
        });
  }

  /** Setup color pickers
   * @function
   */
  #setupColorPickers(){
    document.getElementById('lineColor').addEventListener('input', (event) => {
      this.#lineColor = event.target.value;
    });
    document.getElementById('dotColor').addEventListener('input', (event) => {
      this.#dotColor = event.target.value;
    });
  }
  

  /** Updates the interface for the phase shift
   * @function
   */
  #updatePhaseShift() {
    const phaseShiftInRad = (this.#phaseShift / Math.PI).toFixed(2);
    document.getElementById('phaseShift').value = phaseShiftInRad;
    document.getElementById('currPhaseShift').value = phaseShiftInRad;
  }

  /** Updates the interface for  ratio x
   * @function
   */
  #updateRatioX() {
    const ratioX = (this.#ratioX).toFixed(2);
    document.getElementById('ratioX').value = ratioX;
    document.getElementById('currRatioX').value = ratioX;
  }

  /** Updates the interface for ratio y
   * @function
   */
  #updateRatioY() {
    const ratioY = (this.#ratioY).toFixed(2);
    document.getElementById('ratioY').value = ratioY;
    document.getElementById('currRatioY').value = ratioY;
  }

  /** Updates the interface for the dot angle
   * @function
   */
  #updateDotPhaseShift() {
    const angle = (this.#angle / Math.PI).toFixed(2);
    document.getElementById('dotPhaseShift').value = angle;
    document.getElementById('currDotPhaseShift').value = angle;
  }
  

  /** Draws the Lissajous curves
   * @function
   * @param {object} ctx the context to draw to
   */
  #draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.#lineColor;
    ctx.translate(this.#canvas.width / 2, this.#canvas.height / 2);
    ctx.beginPath();

    for (let rotate = 0.0; rotate < Math.PI * 2; rotate += Math.PI / 180) {
      const coordX =
        this.#ampX *
          (Math.sin(this.#ratioX * rotate + this.#phaseShift));
      const coordY =
        this.#ampY * (Math.sin(this.#ratioY * rotate));
      ctx.lineTo(coordX, coordY);
    }

    ctx.stroke();
    ctx.restore();
  }

  /** Draws the Lissajous curves point
   * @function
   * @param {object} ctx the context to draw to
   */
  #drawPoint(ctx) {
    ctx.save();
    ctx.strokeStyle = this.#dotColor;
    ctx.fillStyle = this.#dotColor;

    ctx.translate(this.#canvas.width / 2, this.#canvas.height / 2);
    ctx.beginPath();
    const coordX =
        this.#ampX *
          (Math.sin(this.#ratioX * this.#angle + this.#phaseShift));
    const coordY =
        this.#ampY * (Math.sin(this.#ratioY * this.#angle));
    ctx.arc(coordX, coordY, 5, 0, 2 * Math.PI);

    ctx.fill();

    ctx.stroke();
    ctx.restore();
  }

  /**
   * Function to update the canvas
   * @function
   * @param {object} ctx the context to draw to
   */
  #update() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height );
    this.#ctx.lineWidth = this.#lineWidth;

    this.#ctx.save();
    this.#grid.drawGrid();
    this.#ctx.restore();

    this.#draw(this.#ctx);
    this.#drawPoint(this.#ctx);


    if (this.#animatePhi) {
      this.#phaseShift += Math.PI / 180;
      this.#updatePhaseShift();
      if (this.#phaseShift > Math.PI * 2) {
        this.#phaseShift = 0.000;
      }
    }

    if (this.#animateA) {
      this.#ratioX += 0.01;
      if (this.#ratioX >= 20) {
        this.#ratioX = 0;
      }
      this.#updateRatioX();
    }

    if (this.#animateB) {
      this.#ratioY += 0.01;
      if (this.#ratioY >= 20) {
        this.#ratioY = 0;
      }
      this.#updateRatioY();
    }

    if (this.#animatePoint) {
      this.#angle += Math.PI / 180;
      if (this.#angle > Math.PI * 2) {
        this.#angle = 0;
      }
      this.#updateDotPhaseShift();
    }

    // set tickrate to 30 fps
    setTimeout(() => {
      requestAnimationFrame(() => this.#update(this.#ctx));
    }, 1000 / this.#FPS);
  }
}
