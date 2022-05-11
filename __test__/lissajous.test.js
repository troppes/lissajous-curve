/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Abril 19 2022
 * @desc Tests for the Lissajous class
 * @jest-environment jsdom
 *
 */

import {Lissajous} from '../scripts/lissajous.js';
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
    test('create Lissajous', () => {
      const LISSAJOUS = new Lissajous('canvas');
      expect(LISSAJOUS).toBeTruthy();
    });
  });
});
