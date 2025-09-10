// mkl.js - Minimal jQuery-like library
(function(global) {
  function Mkl(selector) {
    if (!(this instanceof Mkl)) {
      return new Mkl(selector);
    }
    if (typeof selector === 'string') {
      this.elements = Array.from(document.querySelectorAll(selector));
    } else if (selector instanceof Node) {
      this.elements = [selector];
    } else if (selector instanceof NodeList || Array.isArray(selector)) {
      this.elements = Array.from(selector);
    } else {
      this.elements = [];
    }
  }

  // Add class
  Mkl.prototype.addClass = function(className) {
    this.elements.forEach(function(el) {
      el.classList.add(className);
    });
    return this;
  };

  // Remove class
  Mkl.prototype.removeClass = function(className) {
    this.elements.forEach(function(el) {
      el.classList.remove(className);
    });
    return this;
  };

  // Set or get HTML
  Mkl.prototype.html = function(html) {
    if (html === undefined) {
      return this.elements[0] ? this.elements[0].innerHTML : undefined;
    }
    this.elements.forEach(function(el) {
      el.innerHTML = html;
    });
    return this;
  };

  // Event handling
  Mkl.prototype.on = function(event, handler) {
    this.elements.forEach(function(el) {
      el.addEventListener(event, handler);
    });
    return this;
  };

  Mkl.prototype.off = function(event, handler) {
    this.elements.forEach(function(el) {
      el.removeEventListener(event, handler);
    });
    return this;
  };

  // Utility: each
  Mkl.prototype.each = function(callback) {
    this.elements.forEach(function(el, idx) {
      callback.call(el, idx, el);
    });
    return this;
  };

  // Expose to global
  global.mkl = global.$ = Mkl;
})(window);
