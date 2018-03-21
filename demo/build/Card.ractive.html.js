System.register(['ractive', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, globalRegister, Window;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      globalRegister = module.default;
      Window = module.Window;
    }],
    execute: function () {

      var template = {v:4,t:[{t:7,e:"div",m:[{n:"class-rcard",t:13},{t:8,r:"extra-attributes"},{n:"class-rcard-no-pad",t:13,f:[{t:2,r:"_card.noPad"}]}],f:["\n",{t:4,f:["    ",{t:7,e:"div",m:[{n:"class-rcard-header",t:13}],f:["\n      ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rcard-avatar",t:13}],f:["\n        ",{t:7,e:"div",m:[{n:"class-rcard-avatar-inner",t:13},{n:"style-background-image",f:["url(",{t:2,r:"_card.avatar"},")"],t:13},{n:"class-rcard-avatar-round",t:13,f:[{t:2,r:"_card.round"}]}]},"\n      "]},"\n"],n:50,x:{r:["_card.avatar"],s:"_0&&typeof _0===\"string\""}},{t:4,f:[{t:7,e:"div",m:[{n:"class-rcard-avatar",t:13},{t:4,f:[{t:8,r:"_card.avatarA"}],n:50,r:"_card.avatarA"}],f:[{t:8,r:"_card.avatarP"}]}],n:50,r:"_card.avatarP",l:1},"      ",{t:7,e:"div",m:[{n:"class-rcard-titles",t:13},{n:"class-rcard-with-sub",t:13,f:[{t:2,x:{r:["_card.subtitle","_card.subtitleP"],s:"_0||_1"}}]}],f:["\n        ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rcard-title",t:13}],f:[{t:2,r:"_card.title"}]},"\n"],n:50,r:"_card.title"},{t:4,f:[{t:7,e:"div",m:[{n:"class-rcard-title",t:13},{t:4,f:[{t:8,r:"_card.titleA"}],n:50,r:"_card.titleA"}],f:[{t:8,r:"_card.titleP"}]}],n:51,l:1},"        ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rcard-subtitle",t:13}],f:[{t:2,r:"_card.subtitle"}]},"\n"],n:50,r:"_card.subtitle"},{t:4,f:[{t:7,e:"div",m:[{n:"class-rcard-subtitle",t:13},{t:4,f:[{t:8,r:"_card.subtitleA"}],n:50,r:"_card.subtitleA"}],f:[{t:8,r:"_card.subtitleP"}]}],n:50,r:"_card.subtitleP",l:1},"      "]},"\n    "]},"\n"],n:50,x:{r:["_card.titleP","_card.subtitleP","_card.avatarP","_card.title","_card.subtitle","_card.avatar"],s:"_0||_1||_2||_3||_4||(_5&&typeof _5===\"string\")"}},"  ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rcard-image",t:13}],f:[{t:7,e:"img",m:[{n:"src",f:[{t:2,r:"_card.image"}],t:13},{n:"alt",f:[{t:2,r:"_card.alt"}],t:13}]}]},"\n"],n:50,r:"_card.image"},{t:4,f:[{t:7,e:"div",m:[{n:"class-rcard-image",t:13},{t:4,f:[{t:8,r:"_card.imageA"}],n:50,r:"_card.imageA"}],f:[{t:8,r:"_card.imageP"}]}],n:50,r:"_card.imageP",l:1},"  ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rcard-content",t:13}],f:[{t:8,r:"_card.contentP"}]}],n:50,r:"_card.contentP"},"\n  ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rcard-footer",t:13},{t:4,f:[{t:8,r:"_card.footerA"}],n:50,r:"_card.footerA"}],f:[{t:8,r:"_card.footerP"}]}],n:50,r:"_card.footerP"},"\n",{t:4,f:["    ",{t:7,e:"div",m:[{n:"class-rcard-actions",t:13}],f:["\n      ",{t:4,f:[{t:4,f:[{t:8,r:".P"}],n:50,r:".P"},{t:4,f:[{t:7,e:"button",m:[{t:8,r:".attrs"}],f:[{t:8,r:".content"}]}],n:51,l:1}],n:52,r:"_card.actions"},"\n    "]},"\n"],n:50,r:"_card.actions.length"}]}],e:{"_0&&typeof _0===\"string\"":function (_0){return(_0&&typeof _0==="string");},"_0||_1":function (_0,_1){return(_0||_1);},"_0||_1||_2||_3||_4||(_5&&typeof _5===\"string\")":function (_0,_1,_2,_3,_4,_5){return(_0||_1||_2||_3||_4||(_5&&typeof _5==="string"));}}};

        var Card = Ractive$1.macro(
          function (handle) {
            init(handle);
            handle.setTemplate(template);

            return {
              update: function update() {
                updateAttrs(handle);
              }
            }
          }, {
            cssId: 'rm-card',
            css: function(data) { return [(function(data) {



        return ("\n\n  .rcard {\n\n    display: block;\n\n    color: " + (data('card.fg') || data('fg1') || '#222') + ";\n\n    background-color: " + (data('card.bg') || data('bg1') || '#fff') + ";\n\n    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);\n\n    border-radius: 2px;\n\n  }\n\n\n\n  .rcard-no-pad > .rcard-content {\n\n    padding: 0;\n\n  }\n\n\n\n  .rcard > div:nth-last-of-type(n + 2) {\n\n    padding-bottom: 0;\n\n  }\n\n\n\n  .rcard-header, .rcard-content {\n\n    padding: 1em;\n\n  }\n\n\n\n  .rcard-header {\n\n    display: flex;\n\n    height: 3em;\n\n  }\n\n\n\n  .rcard-avatar {\n\n    width: 3em;\n\n    margin-right: 1em;\n\n  }\n\n\n\n  .rcard-avatar-inner {\n\n    height: 100%;\n\n    background-size: cover;\n\n  }\n\n\n\n  .rcard-avatar-round {\n\n    border-radius: 100%;\n\n  }\n\n\n\n  .rcard-titles {\n\n    flex-grow: 1;\n\n    display: flex;\n\n    flex-direction: column;\n\n    justify-content: center;\n\n    line-height: 1em;\n\n  }\n\n\n\n  .rcard-with-sub {\n\n    justify-content: space-evenly;\n\n  }\n\n\n\n  .rcard-with-sub > .rcard-title {\n\n    font-size: 1.2em;\n\n  }\n\n\n\n  .rcard-title {\n\n    font-size: 1.5em;\n\n  }\n\n\n\n  .rcard-subtitle {\n\n    opacity: 0.7;\n\n    font-size: 1em;\n\n  }\n\n\n\n  .rcard > div:first-of-type.rcard-image {\n\n    margin-top: 0;\n\n  }\n\n\n\n  .rcard-image {\n\n    margin-top: 1em;\n\n  }\n\n\n\n  .rcard-image > img {\n\n    width: 100%;\n\n  }\n\n\n\n  .rcard-actions {\n\n    padding: 0.5em;\n\n  }\n\n\n\n  .rcard-actions > button {\n\n    text-decoration: none;\n\n    text-align: center;\n\n    letter-spacing: 0.5px;\n\n    cursor: pointer;\n\n    user-select: none;\n\n    border: none;\n\n    border-radius: 2px;\n\n    padding: 0 2rem;\n\n    transition: 0.2s ease-in-out;\n\n    transition-property: box-shadow, opacity, background-color;\n\n    font-size: 1em;\n\n    line-height: 1.5em;\n\n    background-color: " + (data('button.flat.bg') || data('bg1') || '#fefefe') + ";\n\n    color: " + (data('button.flat.fg') || data('fg1') || '#222') + ";\n\n    vertical-align: middle;\n\n    min-height: 2.25em;\n\n    outline: 0;\n\n    margin: 0.25em;\n\n    position: relative;\n\n    overflow: hidden;\n\n    font-weight: 500;\n\n    -webkit-tap-highlight-color: transparent;\n\n  }\n\n\n\n  .rcard-actions > button[disabled], .btn.disabled {\n\n    opacity: 0.7;\n\n    cursor: not-allowed;\n\n  }\n\n\n\n  .rcard-actions > button[disabled]:hover {\n\n    opacity: 0.7;\n\n  }\n\n\n\n  .rcard-actions > button.flat:hover {\n\n    box-shadow: none;\n\n  }\n\n\n\n  .rcard-actions > button:after {\n\n    content: ' ';\n\n    position: absolute;\n\n    top: 0;\n\n    left: 0;\n\n    height: 100%;\n\n    width: 100%;\n\n    background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1.5em, transparent 1.6em);\n\n    opacity: 0;\n\n    transform: scale(5, 5);\n\n    transition: opacity 0.6s ease-out, transform 0.5s ease-in;\n\n  }\n\n\n\n  .rcard-actions > button:before {\n\n    content: ' ';\n\n    position: absolute;\n\n    height: 100%;\n\n    width: 100%;\n\n    background-color: rgba(0, 0, 0, 0.075);\n\n    opacity: 0;\n\n    top: 0;\n\n    left: 0;\n\n    transition: opacity 0.4s ease-in-out;\n\n  }\n\n\n\n  .rcard-actions > button:focus:before {\n\n    opacity: 1;\n\n  }\n\n  .rcard-actions > button:hover:before {\n\n    opacity: 0.5;\n\n  }\n\n  \n\n  .rcard-actions > button:active:after {\n\n    transform: scale(1, 1);\n\n    opacity: 1;\n\n    transition: none;\n\n  }\n\n  ");


      }).call(this, data)].join(' '); },
            attributes: ['title', 'subtitle', 'image', 'avatar', 'avatar-round', 'no-pad', 'image-alt']
          }
        );

        function init(h) {
          var data = h.get('@local');
          h.aliasLocal('_card');

          updateAttrs(h);
          
          var tpl = h.partials.content;
          var content = [];

          tpl.forEach(function (n) {
            if (n.e === 'title') {
              data.titleA = n.m;
              data.titleP = n.f;
            }
            else if (n.e === 'subtitle') {
              data.subtitleA = n.m;
              data.subtitleP = n.f;
            }
            else if (n.e === 'avatar') {
              if (n.m) {
                data.avatarA = n.m.filter(function (a) { return a.n !== 'round'; });
                if (n.m.find(function (a) { return a.n === 'round'; })) { data.avatarA.push({ t: 13, n: 'class-rcard-avatar-round' }); }
              }
              data.avatarP = n.f;
            }
            else if (n.e === 'footer') {
              data.footerA = n.m;
              data.footerP = n.f;
            }
            else if (n.e === 'action') {
              (data.actions || (data.actions = [])).push({
                attrs: n.m,
                content: n.f
              });
            }
            else if (n.t === 4 && n.n === 50 && n.f && n.f.filter(function (n) { return typeof n !== 'string'; }).length === 1 && n.f.find(function (e) { return e.e === 'action'; })) { // if action
              var section = Object.assign({}, n);
              var b = section.f.find(function (e) { return e.e === 'action'; });
              section.f = [{ t: 7, e: 'button', m: b.m, f: b.f }];
              (data.actions || (data.actions = [])).push({ P: [section] });
            }
            else { content.push(n); }
          });

          data.contentP = content;
        }

        var keys = ['title', 'subtitle', 'image'];
        function updateAttrs(h) {
          keys.forEach(function (k) { return h.set(("@local." + k), h.attributes[k]); });
          h.set('@local.round', h.attributes['avatar-round']);
          h.set('@local.avatar', h.attributes.avatar || h.attributes['avatar-round']);
          h.set('@local.alt', h.attributes['image-alt']);
          h.set('@local.noPad', h.attributes['no-pad']);
        }

        function plugin(opts) {
          if ( opts === void 0 ) opts = {};

          return function(ref) {
            var instance = ref.instance;

            instance.partials[opts.name || 'card'] = Card;
          };
        }

        globalRegister('RMCard', 'partials', Card);

      var Card_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    This is your fairly standard Material card de-boilerplated a bit as a macro. It has sections for an avatar, title, subtitle, image, content, footer, and actions. It tries to adapt pleasantly to any elements being absent, so it's useful for everything from a box around some text, to a section wrapper in forms, to full-fledged cards displaying an image with actions.\n\n    Most of the items within the card also try to be smart about when they render. If you use the attribute shortcut forms, then an empty string in, for instance, the subtitle, will remove the subtitle from the DOM and cause the title to use a larger font and become fully centered in its allocated space.\n\n    Cards play well with the grid decorator.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n    ### Plugin Options\n\n    * `name: string = 'card'` - the name to use when registering the plugin as a macro\n\n    ### Attributes\n\n    All attributes are optional.\n\n    * `title: string` - The title to display on the card\n    * `subtitle: string` - The subtitle to display on the card\n    * `avatar: string` - The URL to an avatar to display on the card\n    * `avatar-round: string | boolean` - The URL to an avatar to display on the card as rounded, or if a boolean, whether to display the `avatar` as rounded. This appears next to the title.\n    * `image: string` - The URL to an image to display on the card. This appears between the title and the content, taking up the full width of the card.\n    * `image-alt: string` - An `alt` string for the image.\n    `no-pad: boolean` - Whether to pad the content of the card. This is useful for using other containers, like tabs, as the content of the card.\n\n    ### Children\n\n    For greater control over the render process, you can also specify most of the portions of the card as child elements. These will also pass their attributes through to their containing element.\n\n    Additionally, card actions are specified as `<action>` tags that are rendered as flat Material buttons. An action may be enclosed in an `{{#if}}` section to conditionally render it. The only thing to watch out for in conditional sections is that there will be an additional `{{#each}}` wrapped around your content, so use `^^/` rather than `.` as a prefix to get at the context surrounding the card.\n\n    * `title`\n    * `subtitle`\n    * `avatar` - Bring your own `<img>` or `style=\"background-image: url(...)\"`.\n      * `round` - attribute - When present will add the `rcard-avatar-round` class to the avatar container.\n    * `image` - Bring your own `<img>`\n    * `footer` - appears below content\n    * `action` - zero or more actions to add to the bottom of the card. Handle activation by supplying an `on-click` event listener.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"div",m:[{n:"grid",t:71}],f:["\n      ",{t:7,e:"div",m:[{n:"class",f:"row row-s1-2 row-m1-4",t:13}],f:["\n        ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n            Title",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".title"}],t:13}]},"\n          "]},"\n          ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n            Subtitle",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".subtitle"}],t:13}]},"\n          "]},"\n          ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n            Avatar",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".avatar"}],t:13}]},"\n          "]},"\n          ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n            ",{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".round"}],t:13}]}," Round avatar?\n          "]},"\n          ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n            Image",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".image"}],t:13}]},"\n          "]},"\n          ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n            Image Alt",{t:7,e:"input",m:[{n:"value",f:[{t:2,r:".alt"}],t:13}]},"\n          "]},"\n          ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n            ",{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".share"}],t:13}]}," Share button?\n          "]},"\n          ",{t:7,e:"label",m:[{n:"field",t:71},{n:"class-t1",t:13}],f:["\n            Content",{t:7,e:"textarea",f:[{t:2,r:".content"}]},"\n          "]},"\n      "]},"\n    "]},"\n    \n    ",{t:7,e:"marked",f:["\n      ### Template:\n      ```handlebars\n      <card title=\"{{.title}}\" subtitle=\"{{.subtitle}}\" avatar=\"{{.avatar}}\" avatar-round=\"{{.round}}\" image=\"{{.image}}\" image-alt=\"{{.alt}}\" style-max-width=\"30em\">\n        {{{.content}}}\n        <action on-click=\"console.log('Liked!')\" title=\"Like this breed on FriendFace\">Like</action>\n        {{#if ^^/share}}<action on-click=\"console.log('Shared!')\" title=\"Share this breed on FriendFace\">Share</action>{{/if}}\n      </card>\n      ```\n      ### Result:\n    "]},"\n    ",{t:7,e:"card",m:[{n:"title",f:[{t:2,r:".title"}],t:13},{n:"subtitle",f:[{t:2,r:".subtitle"}],t:13},{n:"avatar",f:[{t:2,r:".avatar"}],t:13},{n:"avatar-round",f:[{t:2,r:".round"}],t:13},{n:"image",f:[{t:2,r:".image"}],t:13},{n:"image-alt",f:[{t:2,r:".alt"}],t:13},{n:"style-max-width",f:"30em",t:13}],f:["\n      ",{t:3,r:".content"},"\n      ",{t:7,e:"action",m:[{n:["click"],t:70,f:{r:[],s:"[console.log(\"Liked!\")]"}},{n:"title",f:"Like this breed on FriendFace",t:13}],f:["Like"]},"\n      ",{t:4,f:[{t:7,e:"action",m:[{n:["click"],t:70,f:{r:[],s:"[console.log(\"Shared!\")]"}},{n:"title",f:"Share this breed on FriendFace",t:13}],f:["Share"]}],n:50,r:"^^/share"},"\n    "]},"\n  "]},"\n"]}],e:{"[console.log(\"Liked!\")]":function (){return([console.log("Liked!")]);},"[console.log(\"Shared!\")]":function (){return([console.log("Shared!")]);}}},
          use: [plugin()],
          options: {
            title: 'Component :: Card',
            resizable: true, flex: true,
            width: '48em', height: '30em'
          },
          data: function data() {
            return {
              title: 'Shiba Inu',
              subtitle: 'Dog Breed',
              round: true,
              avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
              image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
              alt: 'Shiba Inu',
              content: '<p>The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.</p>',
              share: true
            };
          }
        }));

    }
  };
});