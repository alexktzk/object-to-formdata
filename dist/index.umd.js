!(function (e, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? n(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], n)
    : n((e['object-to-formdata'] = {}));
})(this, function (e) {
  const n = (e) => void 0 === e,
    t = (e) => Array.isArray(e);
  const o =
    'undefined' != typeof Blob
      ? (e) => e instanceof Blob
      : (e) =>
          e &&
          'number' == typeof e.size &&
          'string' == typeof e.type &&
          'function' == typeof e.slice;
  const s = (e, i, a, r) => {
    i instanceof FormData && ((r = a), (a = i), (i = null)),
      ((i = i || {}).indices = !n(i.indices) && i.indices),
      (i.nullsAsUndefineds = !n(i.nullsAsUndefineds) && i.nullsAsUndefineds),
      (i.booleansAsIntegers = !n(i.booleansAsIntegers) && i.booleansAsIntegers),
      (i.allowEmptyArrays = !n(i.allowEmptyArrays) && i.allowEmptyArrays);
    const l = void 0 !== (a = a || new FormData()).getParts;
    return (
      n(e) ||
        (((e) => null === e)(e)
          ? i.nullsAsUndefineds || a.append(r, '')
          : ((e) => 'boolean' == typeof e)(e)
          ? i.booleansAsIntegers
            ? a.append(r, e ? 1 : 0)
            : a.append(r, e)
          : t(e)
          ? e.length
            ? e.forEach((e, n) => {
                const t = r + '[' + (i.indices ? n : '') + ']';
                s(e, i, a, t);
              })
            : i.allowEmptyArrays && a.append(r + '[]', '')
          : ((e) => e instanceof Date)(e)
          ? a.append(r, e.toISOString())
          : ((e) => e === Object(e))(e) &&
            !((e, n) =>
              o(e) ||
              (n &&
                (function (e) {
                  return e && void 0 !== e.uri;
                })(e)))(e, l)
          ? Object.keys(e).forEach((n) => {
              const o = e[n];
              if (t(o))
                for (; n.length > 2 && n.lastIndexOf('[]') === n.length - 2; )
                  n = n.substring(0, n.length - 2);
              s(o, i, a, r ? r + '[' + n + ']' : n);
            })
          : a.append(r, e)),
      a
    );
  };
  module.exports = { serialize: s };
});
