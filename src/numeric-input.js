const notNumRE = /[^-0-9\.]/g;
const numRE = /[-0-9\.]/;
const notMinusNumRE = /[^0-9\.]/g;
const intRE = /(\d)(?=(\d{3})+$)/g;
const decRE = /(\d)(?=(\d{3})+\.)/g;
const decimalRE = /\./g;
const endsWithDecRE = /\.$/;
const startsZeroRE = /^(0(?!\.))+/;

// TODO: configurable decimal and separators

export function number(v, dec) {
  v = v || '';
  if (dec === 0) v = v.replace(/\..*/, '');
  return v.replace(v.indexOf('.') === -1 ? intRE : decRE, '$1,');
}

export function numeric(options = {}) {
  return function(node, opts = {}) {
    if (typeof opts === 'string') opts = { bind: opts };
    const o = Object.assign({}, options, opts);
    const ctx = this.getContext(node);
    const cleanup = [];
    let lock = false;
    let leave = false;

    if (typeof o.bind !== 'string') delete o.bind;

    const type = node.getAttribute('type');
    node.setAttribute('type', 'tel');
    node.className += ' rn-numeric';

    function update() {
      if (lock) return;

      const cur = node.value;
      const num = [cur.substr(0, node.selectionStart).replace(notNumRE, '').length, cur.substr(0, node.selectionEnd).replace(notNumRE, '').length];
      const dir = node.selectionDirection;

      let next = cur.replace(notNumRE, '');
      // handle extra minus chars
      next = (next[0] || '') + next.substr(1).replace(notMinusNumRE, '');

      if (startsZeroRE.test(next)) {
        const len = next.length;
        next = next.replace(startsZeroRE, '');
        if (!next.length) next = '0';
        num[0] -= len - next.length;
        num[1] -= len - next.length;
      }

      const dec = next.indexOf('.');
      if (~dec) {
        let preDec = next.substr(0, dec);
        let postDec = next.substr(dec + 1).replace(decimalRE, '');
        if (typeof o.whole === 'number' && preDec.length > o.whole) {
          preDec = preDec.substr(0, o.whole);
        }
        if (typeof o.decimal === 'number') {
          if (postDec.length > o.decimal) {
            postDec = postDec.substr(0, o.decimal);
          } else if (postDec.length < o.decimal) {
            for (let i = postDec.length; i < o.decimal; i++) postDec += '0';
          }
        }
        if (leave && !preDec) preDec = '0';
        next = `${preDec}.${postDec}`;
      } else if (typeof o.whole === 'number' && next.length > o.whole) {
        next = next.substr(0, o.whole);
      }

      if (leave && !opts.optional && !next) next = '0';

      if (o.bind) {
        lock = true;
        ctx.set(o.bind, next.replace(endsWithDecRE, ''));
        lock = false;
      }

      next = `${o.prefix || ''}${number(next)}${o.suffix || ''}`;

      let target = 0;
      let offset = 0;
      const range = [];
      for (let i = 0; i < next.length && target < 2; i++) {
        if (numRE.test(next[i])) offset++;
        if (offset === num[target]) {
          range[target++] = i + 1;
          if (num[target] === offset) range[target++] = i + 1;
        }
      }

      if (range.length < 1) range.push(next.length);
      if (range.length < 2) range.push(next.length);

      node.value = next;
      range.push(dir);
      document.activeElement === node && typeof node.setSelectionRange === 'function' && node.setSelectionRange.apply(node, range);
    }

    cleanup.push(ctx.listen('input', update).cancel);

    cleanup.push(ctx.listen('blur', () => {
      const cur = node.value.replace(notNumRE, '');
      node.value = cur.replace(endsWithDecRE, '');
      if (o.bind) {
        lock = true;
        ctx.set(o.bind, node.value);
        lock = false;
      }
      document.activeElement === node && node.setSelectionRange(0, 0);
      leave = true;
      update();
      leave = false;
    }).cancel);

    cleanup.push(ctx.listen('focus', () => {
      if (node.selectionStart === 0 && node.selectionEnd === 0) {
        setTimeout(() => {
          const cur = node.value;
          let pos;
          if (!numRE.test(cur)) {
            pos = (o.prefix || '').length;
            node.setSelectionRange(pos, pos);
          } else if (decimalRE.test(cur)) {
            pos = cur.indexOf('.');
            node.setSelectionRange(pos, pos);
          } else if (numRE.test(cur)) {
            let i = cur.length;
            while (i--) {
              if (numRE.test(cur[i])) {
                pos = i + 1;
                node.setSelectionRange(pos, pos);
                break;
              }
            }
          } else {
            pos = cur.length - (o.suffix || '').length;
            node.setSelectionRange(pos, pos);
          }
        });
      }
    }).cancel);

    if (o.bind) {
      ctx.observe(o.bind, v => {
        if (lock) return;
        const cur = ctx.get(o.bind);
        node.value = cur;
        update();
      }, { defer: true });
    }

    return {
      teardown() {
        cleanup.forEach(fn => fn());
        node.setAttribute('type', type);
        node.className = node.className.replace(/ ?rn-numeric/, '');
      }
    }
  }
}

let styled = false;

export function plugin(opts = {}) {
  return function({ Ractive, instance }) {
    instance.decorators[opts.name || 'numeric'] = numeric(opts);
    if (!styled) {
      styled = true;
      Ractive.addCSS('rn-numeric', `input.rn-numeric { text-align: right; }`);
    }
  }
}

export default plugin;
