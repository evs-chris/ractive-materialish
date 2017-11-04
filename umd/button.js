(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.RM_button = factory());
}(this, (function () { 'use strict';

function button(data) {
  return ("\n    button, .btn {\n      text-decoration: none;\n      text-align: center;\n      letter-spacing: 0.5px;\n      cursor: pointer;\n      user-select: none;\n      border: none;\n      border-radius: 2px;\n      padding: 0 2rem;\n      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n        0 1px 5px 0 rgba(0, 0, 0, 0.12),\n        0 3px 1px -2px rgba(0, 0, 0, 0.2);\n      transition: 0.2s ease-in-out;\n      transition-property: box-shadow, opacity;\n      font-size: 1em;\n      line-height: 1.5em;\n      background-color: " + (data('button.bg') || data('bg2') || '#ddd') + ";\n      color: " + (data('button.fg') || data('fg2') || '#222') + ";\n      vertical-align: middle;\n      min-height: 2.25em;\n    }\n\n    button[disabled], .btn.disabled {\n      opacity: 0.7;\n      cursor: not-allowed;\n    }\n\n    button.round {\n      width: 2.2em;\n      height: 2.2em;\n      border-radius: 1.1em;\n      line-height: 2.2em;\n      text-align: center;\n      padding: 0;\n    }\n\n    button.flat, .btn.flat {\n      background-color: " + (data('button.flat.bg') || data('bg1') || '#fefefe') + ";\n      color: " + (data('button.flat.fg') || data('fg1') || '#222') + ";\n      box-shadow: none;\n    }\n\n    button.alt1, .btn.alt1 {\n      bakcground-color: " + (data('alt1.bg2') || '#ddd') + ";\n      color: " + (data('alt1.fg2') || '#222') + ";\n    }\n\n    button.alt1.flat, .btn.alt1.flat {\n      background-color: " + (data('alt1.bg1') || '#fefefe') + ";\n      color: " + (data('alt1.fg1') || '#222') + ";\n    }\n\n    button.alt2, .btn.alt2 {\n      bakcground-color: " + (data('alt2.bg2') || '#ddd') + ";\n      color: " + (data('alt2.fg2') || '#222') + ";\n    }\n\n    button.alt2.flat, .btn.alt2.flat {\n      background-color: " + (data('alt2.bg1') || '#fefefe') + ";\n      color: " + (data('alt2.fg1') || '#222') + ";\n    }\n\n    button:hover, .btn:hover {\n      opacity: 0.9;\n      box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14),\n      0 1px 7px 0 rgba(0,0,0,0.12),\n      0 3px 1px -1px rgba(0,0,0,0.2);\n    }\n\n    button[disabled]:hover, .btn.disabled:hover {\n      opacity: 0.7;\n    }\n\n    button.flat:hover, .btn.flat:hover {\n      box-shadow: none;\n    }\n  ");
}

return button;

})));
