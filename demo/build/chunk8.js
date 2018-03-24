System.register(['ractive', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, globalRegister;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      globalRegister = module.default;
    }],
    execute: function () {

      function isArray(it) { return !!it && Object.prototype.toString.call(it) === '[object Array]'; }
      function getType(it) {
        if (it === null) { return 'null'; }
        else if (typeof it === 'string') { return 'string'; }
        else if (typeof it === 'number') { return 'number'; }
        else if (typeof it === 'boolean') { return 'boolean'; }
        else if (typeof it === 'function') { return 'function'; }
        else if (typeof it === 'object' && isArray(it)) { return 'array'; }
        else if (typeof it === 'object') { return 'object'; }
        else { return 'wat'; }
      }
      function join(arr) {
        return Ractive$1.joinKeys.apply(Ractive$1, arr);
      }

      var clipEl = (function() {
        var el;
        return function clipEl() {
          if (!el) {
            el = document.querySelector('.ractive-json-editor-clipboard-el');
            if (!el) {
              el = document.createElement('span');
              el.style.display = 'block';
              el.style.left = '-10000px';
              el.style.position = 'absolute';
              el.setAttribute('class', 'ractive-json-editor-clipboard-el');
              document.body.appendChild(el);
            }
          }
          return el;
        }
      })();

      var JSONEditor = (function (Ractive) {
        function JSONEditor(opts) { Ractive.call(this, opts); }

        if ( Ractive ) JSONEditor.__proto__ = Ractive;
        JSONEditor.prototype = Object.create( Ractive && Ractive.prototype );
        JSONEditor.prototype.constructor = JSONEditor;

        JSONEditor.prototype.renameKey = function renameKey (path, name) {
          var then = path;
          var value = this.get(then);
          path = Ractive.splitKeypath(path);
          var thenKey = path.pop();
          var base = this.get(join(path));
          path.push(name);
          var now = join(path);
          var edit = 'keys.' + Ractive.escapeKey(then);

          if (name !== thenKey) {
            delete base[thenKey];
            this.update(then);
            this.set(now, value);
          }
          this.set(edit, false);
          return false;
        };

        JSONEditor.prototype.removeKey = function removeKey (path) {
          path = Ractive.splitKeypath(path);
          var key = path.pop();
          var now = join(path);
          var base = this.get(now);
          delete base[key];
          this.update(now);
          return false;
        };

        JSONEditor.prototype.addKey = function addKey (path) {
          var namePath = "values." + (Ractive.escapeKey(path)) + ".name";
          var name = this.get(namePath);
          if (!name) { return; }
          path = Ractive.splitKeypath(path);
          path.push(name);
          this.set(join(path), '');
          this.set(namePath, '');
          return false;
        };

        JSONEditor.prototype.startEdit = function startEdit (path, node) {
          path = "edits." + (Ractive.escapeKey(path));
          if (this.get(path)) { return; } // already editing
          this.set(path, true);
          if (node) { setTimeout(function () { return node.querySelector('textarea,input').focus(); }, 1); }
          return false;
        };

        JSONEditor.prototype.stopEdit = function stopEdit (path, key) {
          this.toggle(((key || 'edits') + "." + (Ractive.escapeKey(path))));
          return false;
        };

        JSONEditor.prototype.changeType = function changeType (path) {
          var val = getType(this.get(path));
          var next = this.event.original.target.value;
          if (val !== next) {
            switch (next) {
              case 'wat': val = undefined; break;
              case 'null': val = null; break;
              case 'string': val = ''; break;
              case 'number': val = 0; break;
              case 'boolean': val = false; break;
              case 'array': val = []; break;
              default: val = {}; break;
            }
            this.set(path, val);
          }
          return false;
        };

        JSONEditor.prototype.deferFocus = function deferFocus (node) {
          setTimeout(function () { return node.querySelector('textarea,input').focus(); }, 1);
          return false;
        };

        JSONEditor.prototype.toClipboard = function toClipboard (str) {
          setTimeout(function () {
            window.getSelection().removeAllRanges();
            var el = clipEl();
            el.innerText = str;
            var range = document.createRange();
            range.selectNodeContents(el);
            window.getSelection().addRange(range);

            try {
              document.execCommand('copy');
            } catch (e) {
              console.log(e);
            }

            window.getSelection().removeAllRanges();
          }, 1);

          return false;
        };

        return JSONEditor;
      }(Ractive$1));

      Ractive$1.extendWith(JSONEditor, {
        template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rje-wrapper",t:13},{t:16,r:"extra-attributes"}],f:[{t:4,f:[{t:8,r:"open"}," ",{t:7,e:"div",m:[{n:"class-rje-root",t:13},{n:"class-rje-value-expanded",t:13,f:[{t:2,r:"~/toggles.root"}]}],f:[{t:8,r:"value"}]}],n:54,r:"root"}]}],p:{changeType:[{t:7,e:"select",m:[{n:["change"],t:70,f:{r:["@this","@keypath"],s:"[_0.changeType(_1)]"}},{t:73,v:"t",f:"false"},{n:"value",f:[{t:2,x:{r:["~/getType","."],s:"_0(_1)"}}],t:13}],f:[{t:7,e:"option",f:["string"]}," ",{t:7,e:"option",f:["number"]}," ",{t:7,e:"option",f:["boolean"]}," ",{t:7,e:"option",f:["object"]}," ",{t:7,e:"option",f:["array"]}," ",{t:7,e:"option",f:["null"]}]}],editorEnd:[{t:7,e:"button",m:[{n:"title",f:"close editor",t:13},{n:"class",f:"rje-ok rje-icon",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.stopEdit(_1)]"}}],f:["✓"]},{t:8,r:"changeType"}],wat:[{t:7,e:"span",m:[{n:"class-rje-wat",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.startEdit(_1)]"}}],f:["???"]},{t:7,e:"span",m:[{n:"class-rje-close",t:13}]},{t:4,f:[{t:8,r:"editorEnd"}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}}],function:[{t:7,e:"span",m:[{n:"class-rje-fn",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.startEdit(_1)]"}}],f:["function() {...}"]},{t:7,e:"span",m:[{n:"class-rje-close",t:13}]}],null:[{t:7,e:"span",m:[{n:"class-rje-null",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.startEdit(_1)]"}}],f:["null"]},{t:7,e:"span",m:[{n:"class-rje-close",t:13}]},{t:4,f:[{t:8,r:"editorEnd"}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}}],boolean:[{t:7,e:"span",m:[{n:"class-rje-bool",t:13},{n:["click"],t:70,f:{r:["@this","@keypath","@node"],s:"[_0.startEdit(_1,_2)]"}}],f:[{t:4,f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:"."}],t:13},{n:["keyup"],t:70,f:{r:["@event.which","@this","@keypath"],s:"[_0===27&&_1.stopEdit(_2)]"}}]}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}},{t:4,f:[{t:2,r:"."}],n:51,l:1}]},{t:7,e:"span",m:[{n:"class-rje-close",t:13}]},{t:4,f:[{t:8,r:"editorEnd"}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}}],number:[{t:7,e:"span",m:[{n:"class-rje-num",t:13},{n:["click"],t:70,f:{r:["@this","@keypath","@node"],s:"[_0.startEdit(_1,_2)]"}}],f:[{t:4,f:[{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:"."}],t:13},{n:["keyup"],t:70,f:{r:["@event.which","@this","@keypath"],s:"[_0===27&&_1.stopEdit(_2)]"}}]}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}},{t:4,f:[{t:2,r:"."}],n:51,l:1}]},{t:7,e:"span",m:[{n:"class-rje-close",t:13}]},{t:4,f:[{t:8,r:"editorEnd"}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}}],string:[{t:7,e:"span",m:[{n:"class-rje-str",t:13},{n:["click"],t:70,f:{r:["@this","@keypath","@node"],s:"[_0.startEdit(_1,_2)]"}}],f:[{t:4,f:[{t:7,e:"textarea",m:[{n:"rows",f:[{t:4,f:["5"],n:50,x:{r:["."],s:"_0.indexOf(\"\\n\")!==-1"}},{t:4,f:["1"],n:51,l:1}],t:13},{n:["keyup"],t:70,f:{r:["@event.which","@this","@keypath"],s:"[_0===27&&_1.stopEdit(_2)]"}}],f:[{t:2,r:"."}]}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}},{t:4,f:[{t:7,e:"pre",f:[{t:2,r:"."}]}],n:51,l:1}]},{t:7,e:"span",m:[{n:"class-rje-close",t:13}]},{t:4,f:[{t:8,r:"editorEnd"}],n:50,x:{r:["~/editable","@keypath","~/edits"],s:"_0&&_2[_1]"}}],array:[{t:7,e:"div",m:[{n:"class-rje-array",t:13}],f:[{t:4,f:[{t:7,e:"span",m:[{n:"class-rje-ellipsis",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"toggles.\"+_1(_2)),false]"}}],f:["…"]}],n:50,x:{r:["@keypath","~/toggles"],s:"!_1[_0]"}},{t:4,f:[{t:19,f:[{t:4,f:[{t:7,e:"div",m:[{n:"class-rje-entry",t:13}],f:[{t:7,e:"span",m:[{n:"class-rje-idx",t:13}],f:[{t:7,e:"span",m:[{n:["click"],t:70,f:{r:["@this","~/escapeKey","array"],s:"[_0.toggle(\"indexes.\"+_1(_2)),false]"}}],f:[{t:2,r:"@index"}]}," ",{t:4,f:[{t:7,e:"button",m:[{n:"class-rje-icon",t:13},{n:"title",f:"remove",t:13},{n:["click"],t:70,f:{r:["@this","array","@index"],s:"[_0.splice(_1,_2,1),false]"}}],f:["−"]}," ",{t:7,e:"button",m:[{n:"class-rje-icon",t:13},{n:"title",f:"move up",t:13},{n:["click"],t:70,f:{r:["@this","array","@index"],s:"[_0.splice(_1,_2-1,0,_0.splice(_1,_2,1).result[0]),false]"}},{t:4,f:[{n:"disabled",f:0,t:13}],n:50,x:{r:["@index"],s:"!_0"}}],f:["^"]}," ",{t:7,e:"button",m:[{n:"class-rje-icon",t:13},{n:"title",f:"move down",t:13},{n:["click"],t:70,f:{r:["@this","array","@index"],s:"[_0.splice(_1,_2+1,0,_0.splice(_1,_2,1).result[0]),false]"}},{t:4,f:[{n:"disabled",f:0,t:13}],n:50,x:{r:["@index","../length"],s:"_0===_1-1"}}],f:["v"]}," ",{t:7,e:"button",m:[{n:"title",f:"copy keypath",t:13},{n:"class",f:"rje-icon rje-copy",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.toClipboard(_1.substr(5))]"}}],f:["⧉"]}],n:50,x:{r:["~/editable","array","~/indexes"],s:"_0&&_2[_1]"}}]}," ",{t:8,r:"open"}," ",{t:7,e:"div",m:[{n:"class-rje-value",t:13},{n:"class-rje-value-expanded",t:13,f:[{t:2,rx:{r:"~/toggles",m:[{t:30,n:"@keypath"}]}}]}],f:[{t:8,r:"value"}]}]}],n:52,r:"."}],n:54,z:[{n:"array",x:{r:"@keypath"}}]}],n:51,l:1},{t:7,e:"span",m:[{n:"class-rje-close",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"toggles.\"+_1(_2)),false]"}}],f:["]"]},{t:4,f:[" ",{t:7,e:"div",m:[{n:"class-rje-buttons",t:13}],f:[{t:7,e:"button",m:[{n:"title",f:"more actions",t:13},{n:"class-rje-icon",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"extras.\"+_1(_2)),false]"}}],f:["⋯"]}," ",{t:4,f:[{t:7,e:"button",m:[{n:"title",f:"push",t:13},{n:"class-rje-icon",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.push(_1,\"\"),false]"}}],f:["˃+"]}," ",{t:7,e:"button",m:[{n:"title",f:"unshift",t:13},{n:"class-rje-icon",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.unshift(_1,\"\"),false]"}}],f:["+˂"]}," ",{t:7,e:"button",m:[{n:"title",f:"pop",t:13},{n:"class-rje-icon",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.pop(_1),false]"}}],f:["˃-"]}," ",{t:7,e:"button",m:[{n:"title",f:"shift",t:13},{n:"class-rje-icon",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.shift(_1),false]"}}],f:["-˂"]}," ",{t:8,r:"changeType"}],n:50,rx:{r:"~/extras",m:[{t:30,n:"@keypath"}]}}]}],n:50,x:{r:["~/editable","@keypath","~/toggles"],s:"_0&&_2[_1]"}}]}],object:[{t:7,e:"div",m:[{n:"class-rje-obj",t:13}],f:[{t:4,f:[{t:7,e:"span",m:[{n:"class-rje-ellipsis",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"toggles.\"+_1(_2)),false]"}}],f:["…"]}],n:50,x:{r:["@keypath","~/toggles"],s:"!_1[_0]"}},{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{n:"class-rje-entry",t:13}],f:[{t:7,e:"span",m:[{n:"class-rje-key",t:13},{t:4,f:[{n:["click"],t:70,f:{r:["~/escapeKey","@keypath","@key","@this","@node"],s:"[_3.set(\"keys.\"+_0(_1),_2),_3.deferFocus(_4)]"}}],n:50,r:"~/editable"},{t:4,f:[{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.toClipboard(_1.substr(5))]"}}],n:51,l:1}],f:[{t:7,e:"span",m:[{n:"class-rje-str",t:13}],f:[{t:4,f:[{t:7,e:"textarea",m:[{n:"rows",f:[{t:4,f:["5"],n:50,x:{r:["@key","@keypath","~/keys"],s:"_0.indexOf(\"\\n\")!==-1||_2[_1].indexOf(\"\\n\")!==-1"}},{t:4,f:["1"],n:51,l:1}],t:13},{n:["keyup"],t:70,f:{r:["@event.which","@this","@keypath","~/keys"],s:"[_0===27&&_1.renameKey(_2,_3[_2])]"}}],f:[{t:2,rx:{r:"~/keys",m:[{t:30,n:"@keypath"}]}}]}],n:50,x:{r:["@keypath","~/keys"],s:"typeof _1[_0]===\"string\""}},{t:4,f:[{t:7,e:"pre",f:[{t:2,r:"@key"}]}],n:51,l:1}]}," ",{t:4,f:[{t:7,e:"button",m:[{n:"title",f:"apply",t:13},{n:"class",f:"rje-icon rje-ok",t:13},{n:["click"],t:70,f:{r:["@this","@keypath","~/keys"],s:"[_0.renameKey(_1,_2[_1])]"}}],f:["✓"]}," ",{t:7,e:"button",m:[{n:"title",f:"cancel",t:13},{n:"class",f:"rje-icon rje-cancel",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.stopEdit(_1,\"keys\")]"}}],f:["✕"]}," ",{t:7,e:"button",m:[{n:"title",f:"remove key",t:13},{n:"class",f:"rje-icon rje-cancel",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.removeKey(_1)]"}}],f:["−"]}," ",{t:7,e:"button",m:[{n:"title",f:"copy keypath",t:13},{n:"class",f:"rje-icon rje-copy",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.toClipboard(_1.substr(5))]"}}],f:["⧉"]}],n:50,x:{r:["@keypath","~/keys"],s:"typeof _1[_0]===\"string\""}}]}," ",{t:8,r:"open"}," ",{t:7,e:"div",m:[{n:"class-rje-value",t:13},{n:"class-rje-value-expanded",t:13,f:[{t:2,rx:{r:"~/toggles",m:[{t:30,n:"@keypath"}]}}]}],f:[{t:8,r:"value"}]}]}],n:52,r:"."}],n:51,l:1},{t:7,e:"span",m:[{n:"class-rje-close",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"toggles.\"+_1(_2)),false]"}}],f:["}"]},{t:4,f:[" ",{t:7,e:"div",m:[{n:"class-rje-buttons",t:13}],f:[{t:7,e:"button",m:[{n:"title",f:"more actions",t:13},{n:"class-rje-icon",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"extras.\"+_1(_2)),false]"}}],f:["⋯"]}," ",{t:4,f:[{t:7,e:"input",m:[{n:"value",f:[{t:2,rx:{r:"~/values",m:[{t:30,n:"@keypath"},"name"]}}],t:13},{n:["keyup"],t:70,f:{r:["@event.which","@this","@keypath"],s:"[_0===13&&_1.addKey(_2)]"}}]},{t:7,e:"button",m:[{n:"title",f:"add key",t:13},{n:"class",f:"rje-icon rje-ok",t:13},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.addKey(_1)]"}}],f:["+"]}," ",{t:8,r:"changeType"}],n:50,rx:{r:"~/extras",m:[{t:30,n:"@keypath"}]}}]}],n:50,x:{r:["~/editable","@keypath","~/toggles"],s:"_0&&_2[_1]"}}]}],open:[{t:4,f:[{t:7,e:"span",m:[{n:"class-rje-open",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"toggles.\"+_1(_2)),false]"}}],f:["{"]}],n:50,x:{r:["~/getType","."],s:"_0(_1)===\"object\""}},{t:4,f:[{t:7,e:"span",m:[{n:"class-rje-open",t:13},{n:["click"],t:70,f:{r:["@this","~/escapeKey","@keypath"],s:"[_0.toggle(\"toggles.\"+_1(_2)),false]"}}],f:["["]}],n:50,x:{r:["~/getType","."],s:"_0(_1)===\"array\""},l:1}],value:[{t:8,x:{r:["~/getType","."],s:"_0(_1)"}}]},e:{"[_0.changeType(_1)]":function (_0,_1){return([_0.changeType(_1)]);},"_0(_1)":function (_0,_1){return(_0(_1));},"[_0.stopEdit(_1)]":function (_0,_1){return([_0.stopEdit(_1)]);},"[_0.startEdit(_1)]":function (_0,_1){return([_0.startEdit(_1)]);},"_0&&_2[_1]":function (_0,_1,_2){return(_0&&_2[_1]);},"[_0.startEdit(_1,_2)]":function (_0,_1,_2){return([_0.startEdit(_1,_2)]);},"[_0===27&&_1.stopEdit(_2)]":function (_0,_1,_2){return([_0===27&&_1.stopEdit(_2)]);},"_0.indexOf(\"\\n\")!==-1":function (_0){return(_0.indexOf("\n")!==-1);},"[_0.toggle(\"toggles.\"+_1(_2)),false]":function (_0,_1,_2){return([_0.toggle("toggles."+_1(_2)),false]);},"!_1[_0]":function (_0,_1){return(!_1[_0]);},"[_0.toggle(\"indexes.\"+_1(_2)),false]":function (_0,_1,_2){return([_0.toggle("indexes."+_1(_2)),false]);},"[_0.splice(_1,_2,1),false]":function (_0,_1,_2){return([_0.splice(_1,_2,1),false]);},"[_0.splice(_1,_2-1,0,_0.splice(_1,_2,1).result[0]),false]":function (_0,_1,_2){return([_0.splice(_1,_2-1,0,_0.splice(_1,_2,1).result[0]),false]);},"!_0":function (_0){return(!_0);},"[_0.splice(_1,_2+1,0,_0.splice(_1,_2,1).result[0]),false]":function (_0,_1,_2){return([_0.splice(_1,_2+1,0,_0.splice(_1,_2,1).result[0]),false]);},"_0===_1-1":function (_0,_1){return(_0===_1-1);},"[_0.toClipboard(_1.substr(5))]":function (_0,_1){return([_0.toClipboard(_1.substr(5))]);},"[_0.toggle(\"extras.\"+_1(_2)),false]":function (_0,_1,_2){return([_0.toggle("extras."+_1(_2)),false]);},"[_0.push(_1,\"\"),false]":function (_0,_1){return([_0.push(_1,""),false]);},"[_0.unshift(_1,\"\"),false]":function (_0,_1){return([_0.unshift(_1,""),false]);},"[_0.pop(_1),false]":function (_0,_1){return([_0.pop(_1),false]);},"[_0.shift(_1),false]":function (_0,_1){return([_0.shift(_1),false]);},"[_3.set(\"keys.\"+_0(_1),_2),_3.deferFocus(_4)]":function (_0,_1,_2,_3,_4){return([_3.set("keys."+_0(_1),_2),_3.deferFocus(_4)]);},"_0.indexOf(\"\\n\")!==-1||_2[_1].indexOf(\"\\n\")!==-1":function (_0,_1,_2){return(_0.indexOf("\n")!==-1||_2[_1].indexOf("\n")!==-1);},"[_0===27&&_1.renameKey(_2,_3[_2])]":function (_0,_1,_2,_3){return([_0===27&&_1.renameKey(_2,_3[_2])]);},"typeof _1[_0]===\"string\"":function (_0,_1){return(typeof _1[_0]==="string");},"[_0.renameKey(_1,_2[_1])]":function (_0,_1,_2){return([_0.renameKey(_1,_2[_1])]);},"[_0.stopEdit(_1,\"keys\")]":function (_0,_1){return([_0.stopEdit(_1,"keys")]);},"[_0.removeKey(_1)]":function (_0,_1){return([_0.removeKey(_1)]);},"[_0===13&&_1.addKey(_2)]":function (_0,_1,_2){return([_0===13&&_1.addKey(_2)]);},"[_0.addKey(_1)]":function (_0,_1){return([_0.addKey(_1)]);},"_0(_1)===\"object\"":function (_0,_1){return(_0(_1)==="object");},"_0(_1)===\"array\"":function (_0,_1){return(_0(_1)==="array");}}},
        css: " .rje-wrapper { font-family: monospace; line-height: 1.5em; } .rje-root { display: inline-block; } .rje-wrapper select, .rje-wrapper input { height: 1.6em; border: 1px solid; color: #222; border-radius: 0.2em; background-color: transparent; padding: 0; box-sizing: border-box; opacity: 0.3; transition: opacity 0.3s ease-in-out; } .rje-wrapper select:hover, .rje-wrapper input:hover { opacity: 1; } .rje-wrapper input[type=checkbox] { width: 1.4em; height: 1.4em; margin: 0.1em; vertical-align: top; outline: 0; } .rje-wrapper textarea { border: 1px solid; color: #222; border-radius: 0.2em; } .rje-value { display: inline-block; position: relative; } .rje-value > * { vertical-align: top; } .rje-value-expanded { display: block; } .rje-value-expanded > .rje-obj, .rje-value-expanded > .rje-array { border-left: 1px dotted transparent; transition: border-left-color 0.2s ease-in-out; margin: 0 0 1.5em 0.25em; position: relative; display: block; padding-bottom: 0.6em; } .rje-value-expanded > .rje-obj:hover, .rje-value-expanded > .rje-array:hover { border-left-color: #ccc; } .rje-value-expanded > .rje-obj > .rje-close, .rje-value-expanded > .rje-array > .rje-close { position: absolute; bottom: -1.5em; left: -0.25em; width: 2em; } .rje-open, .rje-close, .rje-ellipsis { cursor: pointer; } .rje-value-expanded > .rje-obj > .rje-buttons, .rje-value-expanded > .rje-array > .rje-buttons { position: absolute; bottom: -1.6em; left: 1.5em; } .rje-entry { margin-left: 0.75em; line-height: 2em; } .rje-entry:nth-last-of-type(n+3) > .rje-value > .rje-close:after, .rje-entry:nth-last-of-type(n+3) > .rje-value > * > .rje-close:after { content: ','; position: absolute; top: 0; } .rje-idx { cursor: pointer; } .rje-key, .rje-idx { margin-right: 0.5em; position: relative; display: inline-block; vertical-align: top; } .rje-key:after, .rje-idx:after { content: ':'; position: absolute; right: -0.5em; display: inline-block; top: 0; } .rje-str > pre { font-family: monospace; display: inline-block; margin: 0; vertical-align: top; } .rje-str { position: relative; margin: 0 0.6em; display: inline-block; cursor: text; } .rje-str:before, .rje-str:after { content: '\"'; position: absolute; } .rje-str:before { left: -0.6em; width: 0.6em; text-align: right; } .rje-str:after { right: -0.6em; width: 0.6em; text-align: left; top: 0; } .rje-obj { display: inline-block; } .rje-icon { width: 1.6em; height: 1.6em; box-sizing: border-box; padding: 0; margin: 0 0.25em; display: inline-block; vertical-align: top; background-color: transparent; color: #222; border: 1px solid; border-radius: 0.2em; opacity: 0.3; transition: opacity 0.2s ease-in-out; outline: 0; cursor: pointer; } .rje-icon:hover { opacity: 1; } .rje-key .rje-str { color: #005a00; } .rje-num { color: #0000e6; font-weight: 500; } .rje-bool { color: #cc8400; font-weight: 500; } .rje-wat { color: #e60000; font-weight: 500; } .rje-null { color: #737373; font-weight: 500; } .rje-fn { color: #005a00; } .rje-str { color: #753bb0; }",
        cssId: "json-editor",
        noCssTransform: true,
        attributes: ['editable', 'root'],
        data: function data() {
          return {
            getType: getType,
            toggles: { root: true },
            edits: {},
            keys: {},
            extras: {},
            indexes: {},
            values: {},
            escapeKey: Ractive$1.escapeKey,
            editable: true
          };
        },
        observe: {
          root: {
            strict: true,
            init: false,
            handler: function handler() {
              this.set({
                toggles: { root: true },
                keys: {},
                values: {},
                extras: {}
              });
            }
          }
        }
      });

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'json-editor'] = JSONEditor;
        }
      }

      globalRegister('RMJSONEditor', 'components', JSONEditor);
      exports('default', plugin);

    }
  };
});
