// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src\\math.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function lerp(a, b, alpha) {
    return a + (b - a) * alpha;
}
exports.lerp = lerp;
},{}],"src\\color.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./math");
var Color = /** @class */function () {
    function Color(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    Color.prototype.toString = function () {
        if (this.a == undefined) {
            return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        }
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    };
    Color.lerp = function (a, b, alpha) {
        return new Color(math_1.lerp(a.r, b.r, alpha), math_1.lerp(a.g, b.g, alpha), math_1.lerp(a.b, b.b, alpha), a.a != undefined && b.a != undefined ? math_1.lerp(a.a, b.a, alpha) : undefined);
    };
    Color.random = function (alpha) {
        if (alpha === void 0) {
            alpha = false;
        }
        return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, alpha ? Math.random() * 255 : undefined);
    };
    Color.White = new Color(255, 255, 255);
    Color.Black = new Color(0, 0, 0);
    return Color;
}();
exports.default = Color;
},{"./math":"src\\math.ts"}],"src\\constants.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = __importDefault(require("./color"));
var SQUARE_SIZE = 20; // Pixels
exports.SQUARE_SIZE = SQUARE_SIZE;
var GRID_WIDTH = 52;
exports.GRID_WIDTH = GRID_WIDTH;
var GRID_HEIGHT = 7;
exports.GRID_HEIGHT = GRID_HEIGHT;
var GRID_UNIT_MARGIN = 2;
exports.GRID_UNIT_MARGIN = GRID_UNIT_MARGIN;
var COLOR_OFF = new color_1.default(100, 100, 100);
exports.COLOR_OFF = COLOR_OFF;
var COLOR_ON = new color_1.default(200, 200, 200);
exports.COLOR_ON = COLOR_ON;
},{"./color":"src\\color.ts"}],"src\\grid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var Grid = /** @class */function () {
    function Grid() {
        this.units = [];
        for (var i = 0; i < constants_1.GRID_HEIGHT * constants_1.GRID_WIDTH; i++) {
            this.units[i] = {
                x: i % constants_1.GRID_WIDTH,
                y: Math.floor(i / constants_1.GRID_WIDTH),
                saturation: 0
            };
        }
    }
    Grid.prototype.getUnit = function (x, y) {
        return this.units[y * constants_1.GRID_WIDTH + x];
    };
    Grid.prototype.getUnits = function () {
        return this.units;
    };
    return Grid;
}();
var gridInstance = new Grid();
exports.grid = gridInstance;
},{"./constants":"src\\constants.ts"}],"src\\input.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mouse = {
    x: -1, y: -1,
    left: false,
    right: false
};
exports.mouse = mouse;
var keys = { shift: false };
exports.keys = keys;
function registerInputEvents(canvas) {
    window.addEventListener('mousemove', function (event) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        keys.shift = event.shiftKey;
    });
    window.addEventListener('mousedown', function (event) {
        if (event.button == 2) {
            mouse.right = true;
        } else {
            mouse.left = true;
        }
    });
    window.addEventListener('mouseup', function (event) {
        if (event.button == 2) {
            mouse.right = false;
        } else {
            mouse.left = false;
        }
    });
    canvas.addEventListener("contextmenu", function (event) {
        // Absorb secondary clicks on the canvas (since we use it for erasing)
        event.preventDefault();
    });
    window.addEventListener('keydown', function (event) {
        keys.shift = event.shiftKey;
    });
    window.addEventListener('keyup', function (event) {
        keys.shift = event.shiftKey;
    });
}
exports.registerInputEvents = registerInputEvents;
},{}],"src\\render.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var color_1 = __importDefault(require("./color"));
var grid_1 = require("./grid");
var input_1 = require("./input");
var context;
function drawGridSquare(x, y, color, margin) {
    if (margin === void 0) {
        margin = 0;
    }
    var xloc = x * constants_1.SQUARE_SIZE;
    var yloc = y * constants_1.SQUARE_SIZE;
    context.fillStyle = color.toString();
    context.fillRect(xloc + margin, yloc + margin, constants_1.SQUARE_SIZE - margin * 2, constants_1.SQUARE_SIZE - margin * 2);
}
var render = function render() {
    // Background color
    context.fillStyle = new color_1.default(0, 0, 0, 0.06).toString();
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    // Grid Selection
    var selectX = Math.floor(input_1.mouse.x / constants_1.SQUARE_SIZE);
    var selectY = Math.floor(input_1.mouse.y / constants_1.SQUARE_SIZE);
    if (selectX >= 0 && selectY >= 0 && selectX < constants_1.GRID_WIDTH && selectY < constants_1.GRID_HEIGHT) {
        drawGridSquare(selectX, selectY, color_1.default.White);
        var selectedUnit = grid_1.grid.getUnit(selectX, selectY);
        if (input_1.mouse.left) {
            selectedUnit.saturation = input_1.keys.shift ? 0 : 1;
        } else if (input_1.mouse.right) {
            selectedUnit.saturation = 0;
        }
    }
    // Grid cells
    for (var y = 0; y < constants_1.GRID_HEIGHT; y++) {
        for (var x = 0; x < constants_1.GRID_WIDTH; x++) {
            var unit = grid_1.grid.getUnit(x, y);
            drawGridSquare(x, y, color_1.default.lerp(constants_1.COLOR_OFF, constants_1.COLOR_ON, unit.saturation), constants_1.GRID_UNIT_MARGIN);
        }
    }
    window.requestAnimationFrame(render);
};
function beginRender(canvas) {
    var ctx = canvas.getContext("2d");
    if (ctx == null) {
        window.alert("The HTML5 canvas could not be initialized. :(");
        return;
    }
    context = ctx;
    window.requestAnimationFrame(render);
}
exports.beginRender = beginRender;
function clearGrid() {
    for (var _i = 0, _a = grid_1.grid.getUnits(); _i < _a.length; _i++) {
        var x = _a[_i];
        x.saturation = 0;
    }
    context.fillStyle = color_1.default.White.toString();
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}
exports.clearGrid = clearGrid;
},{"./constants":"src\\constants.ts","./color":"src\\color.ts","./grid":"src\\grid.ts","./input":"src\\input.ts"}],"src\\init.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var render_1 = require("./render");
var input_1 = require("./input");
function select(id) {
    return document.querySelector(id);
}
var init = function init() {
    var canvas = select('#gridcanvas');
    canvas.width = constants_1.SQUARE_SIZE * constants_1.GRID_WIDTH;
    canvas.height = constants_1.SQUARE_SIZE * constants_1.GRID_HEIGHT;
    var clearButton = select('#clearbutton');
    clearButton.onclick = function () {
        render_1.clearGrid();
    };
    input_1.registerInputEvents(canvas);
    render_1.beginRender(canvas);
};
exports.default = init;
},{"./constants":"src\\constants.ts","./render":"src\\render.ts","./input":"src\\input.ts"}],"src\\index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = __importDefault(require("./init"));
window.addEventListener('DOMContentLoaded', init_1.default);
},{"./init":"src\\init.ts"}],"node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55144' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","src\\index.ts"], null)
//# sourceMappingURL=/src.dcbced2c.map