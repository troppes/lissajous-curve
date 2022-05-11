/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Abril 19 2022
 * @desc Tests for the Grid class
 * @jest-environment jsdom
 *
 */

import {Grid} from '../scripts/grid.js';
import {JSDOM} from 'jsdom';

describe('Lissajous', () => {
  beforeEach(function(done) {
    JSDOM.fromFile('src/reitz-florian-lissajous.html')
        .then((dom) => {
          document.body.innerHTML +=
            dom.window.document.documentElement.innerHTML;
        })
        .then(done, done);
    console.log(document.body.innerHTML);
  });

  describe('Check if object is created correctly', () => {
    test('create GRID', () => {
      const GRID = new Grid('canvas', 24, 20, 0);
      expect(GRID).toBeTruthy();
    });
  });
});
