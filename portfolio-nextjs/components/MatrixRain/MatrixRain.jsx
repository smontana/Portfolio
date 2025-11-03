'use client'

import { useEffect, useRef } from 'react';
import './MatrixRain.scss';

// Utility functions
function random(from, to) {
  return ~~(Math.random() * (to - from + 1) + from);
}

// Authentic Matrix characters (as seen in the movie)
const MATRIX_CHARS = [
  'ラ', 'ド', 'ク', 'リ', 'フ', 'マ', 'ラ', 'ソ', 'ン',
  'わ', 'た', 'し', 'ワ', 'タ', 'シ', 'ん', 'ょ', 'ン', 'ョ',
  'た', 'ば', 'こ', 'タ', 'バ', 'コ',
  'と', 'う', 'き', 'ょ', 'う', 'ト', 'ウ', 'キ', 'ョ', 'ウ'
];

function getChar() {
  return MATRIX_CHARS[random(0, MATRIX_CHARS.length - 1)];
}

function loop(fn, delay) {
  let stamp = Date.now();
  let rafId;

  function _loop() {
    if (Date.now() - stamp >= delay) {
      fn();
      stamp = Date.now();
    }
    rafId = requestAnimationFrame(_loop);
  }

  rafId = requestAnimationFrame(_loop);
  return () => cancelAnimationFrame(rafId);
}

// Character class
class Char {
  constructor() {
    this.element = document.createElement('span');
    this.mutate();
  }

  mutate() {
    this.element.textContent = getChar();
  }
}

// Trail class for animated falling effect
class Trail {
  constructor(list = [], options) {
    this.list = list;
    this.options = Object.assign(
      { size: 10, offset: 0 },
      options
    );
    this.body = [];
    this.move();
  }

  traverse(fn) {
    this.body.forEach((n, i) => {
      const last = (i === this.body.length - 1);
      if (n) fn(n, i, last);
    });
  }

  move() {
    this.body = [];
    const { offset, size } = this.options;

    for (let i = 0; i < size; ++i) {
      const item = this.list[offset + i - size + 1];
      this.body.push(item);
    }

    this.options.offset =
      (offset + 1) % (this.list.length + size - 1);
  }
}

// Rain column class
class Rain {
  constructor({ target, row }) {
    this.element = document.createElement('p');
    this.cleanupFns = [];
    this.build(row);

    if (target) {
      target.appendChild(this.element);
    }

    this.drop();
  }

  build(row = 20) {
    const root = document.createDocumentFragment();
    const chars = [];

    for (let i = 0; i < row; ++i) {
      const c = new Char();
      root.appendChild(c.element);
      chars.push(c);

      if (Math.random() < 0.5) {
        const cleanup = loop(() => c.mutate(), random(1e3, 5e3));
        this.cleanupFns.push(cleanup);
      }
    }

    this.trail = new Trail(chars, {
      size: random(10, 30),
      offset: random(0, 100)
    });

    this.element.appendChild(root);
  }

  drop() {
    const trail = this.trail;
    const len = trail.body.length;
    const delay = random(10, 100);

    const cleanup = loop(() => {
      trail.move();
      trail.traverse((c, i, last) => {
        c.element.style.cssText = `
          color: hsl(136, 100%, ${85 / len * (i + 1)}%)
        `;

        if (last) {
          c.mutate();
          c.element.style.cssText = `
            color: hsl(136, 100%, 85%);
            text-shadow:
              0 0 .5em #fff,
              0 0 .5em currentColor;
          `;
        }
      });
    }, delay);

    this.cleanupFns.push(cleanup);
  }

  destroy() {
    this.cleanupFns.forEach(fn => fn());
    this.element.remove();
  }
}

export function MatrixRain({ columns = 50, rowsPerColumn = 50 }) {
  const containerRef = useRef(null);
  const rainsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create rain columns
    const container = containerRef.current;

    for (let i = 0; i < columns; ++i) {
      const rain = new Rain({
        target: container,
        row: rowsPerColumn
      });
      rainsRef.current.push(rain);
    }

    // Cleanup function
    return () => {
      rainsRef.current.forEach(rain => rain.destroy());
      rainsRef.current = [];
    };
  }, [columns, rowsPerColumn]);

  return (
    <div
      ref={containerRef}
      className="matrix-rain-container"
      aria-hidden="true"
    />
  );
}
