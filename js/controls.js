class Controls {
  constructor() {
    this.keys = {
      q: false, w: false, e: false, r: false, t: false, y: false, u: false, i: false, o: false, p: false,
      a: false, s: false, d: false, f: false, g: false, h: false, j: false, k: false, l: false, 
      enter: false, z: false, x: false, c: false, v: false, b: false, n: false, m: false, backspace: false
    };

    this.#addKeyboardListeners();
  }

  #addKeyboardListeners() {
    document.onkeydown = (evt) => {
      const key = evt.key.toLowerCase();
      if (this.keys.hasOwnProperty(key)) {
        this.keys[key] = true;
      }
    };
    document.onkeyup = (evt) => {
      const key = evt.key.toLowerCase();
      if (this.keys.hasOwnProperty(key)) {
        this.keys[key] = false;
      }
    };
  }
}