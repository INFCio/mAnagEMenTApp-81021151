!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.AwesomeQR = e())
    : (t.AwesomeQR = e());
})(this, function () {
  return (() => {
    var t = {
        154: (t, e, r) => {
          const o = r(342);
          (e.parseFont = o),
            (e.createCanvas = function (t, e) {
              return Object.assign(document.createElement("canvas"), {
                width: t,
                height: e,
              });
            }),
            (e.createImageData = function (t, e, r) {
              switch (arguments.length) {
                case 0:
                  return new ImageData();
                case 1:
                  return new ImageData(t);
                case 2:
                  return new ImageData(t, e);
                default:
                  return new ImageData(t, e, r);
              }
            }),
            (e.loadImage = function (t, e) {
              return new Promise(function (r, o) {
                const n = Object.assign(document.createElement("img"), e);
                function i() {
                  (n.onload = null), (n.onerror = null);
                }
                (n.onload = function () {
                  i(), r(n);
                }),
                  (n.onerror = function () {
                    i(), o(new Error('Failed to load the image "' + t + '"'));
                  }),
                  (n.src = t);
              });
            });
        },
        342: (t) => {
          "use strict";
          const e = "'([^']+)'|\"([^\"]+)\"|[\\w\\s-]+",
            r = new RegExp("(bold|bolder|lighter|[1-9]00) +", "i"),
            o = new RegExp("(italic|oblique) +", "i"),
            n = new RegExp("(small-caps) +", "i"),
            i = new RegExp(
              "(ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded) +",
              "i"
            ),
            a = new RegExp(
              "([\\d\\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q) *((?:" +
                e +
                ")( *, *(?:" +
                e +
                "))*)"
            ),
            s = {};
          t.exports = function (t) {
            if (s[t]) return s[t];
            const e = a.exec(t);
            if (!e) return;
            const l = {
              weight: "normal",
              style: "normal",
              stretch: "normal",
              variant: "normal",
              size: parseFloat(e[1]),
              unit: e[2],
              family: e[3].replace(/["']/g, "").replace(/ *, */g, ","),
            };
            let u,
              h,
              c,
              f,
              d = t.substring(0, e.index);
            switch (
              ((u = r.exec(d)) && (l.weight = u[1]),
              (h = o.exec(d)) && (l.style = h[1]),
              (c = n.exec(d)) && (l.variant = c[1]),
              (f = i.exec(d)) && (l.stretch = f[1]),
              l.unit)
            ) {
              case "pt":
                l.size /= 0.75;
                break;
              case "pc":
                l.size *= 16;
                break;
              case "in":
                l.size *= 96;
                break;
              case "cm":
                l.size *= 96 / 2.54;
                break;
              case "mm":
                l.size *= 96 / 25.4;
                break;
              case "%":
                break;
              case "em":
              case "rem":
                l.size *= 16 / 0.75;
                break;
              case "q":
                l.size *= 96 / 25.4 / 4;
            }
            return (s[t] = l);
          };
        },
        662: (t, e) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.loop = e.conditional = e.parse = void 0),
            (e.parse = function t(e, r) {
              var o =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {},
                n =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : o;
              if (Array.isArray(r))
                r.forEach(function (r) {
                  return t(e, r, o, n);
                });
              else if ("function" == typeof r) r(e, o, n, t);
              else {
                var i = Object.keys(r)[0];
                Array.isArray(r[i])
                  ? ((n[i] = {}), t(e, r[i], o, n[i]))
                  : (n[i] = r[i](e, o, n, t));
              }
              return o;
            }),
            (e.conditional = function (t, e) {
              return function (r, o, n, i) {
                e(r, o, n) && i(r, t, o, n);
              };
            }),
            (e.loop = function (t, e) {
              return function (r, o, n, i) {
                for (var a = []; e(r, o, n); ) {
                  var s = {};
                  i(r, t, o, s), a.push(s);
                }
                return a;
              };
            });
        },
        58: (t, e) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.readBits =
              e.readArray =
              e.readUnsigned =
              e.readString =
              e.peekBytes =
              e.readBytes =
              e.peekByte =
              e.readByte =
              e.buildStream =
                void 0),
            (e.buildStream = function (t) {
              return { data: t, pos: 0 };
            });
          (e.readByte = function () {
            return function (t) {
              return t.data[t.pos++];
            };
          }),
            (e.peekByte = function () {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 0;
              return function (e) {
                return e.data[e.pos + t];
              };
            });
          var r = function (t) {
            return function (e) {
              return e.data.subarray(e.pos, (e.pos += t));
            };
          };
          (e.readBytes = r),
            (e.peekBytes = function (t) {
              return function (e) {
                return e.data.subarray(e.pos, e.pos + t);
              };
            }),
            (e.readString = function (t) {
              return function (e) {
                return Array.from(r(t)(e))
                  .map(function (t) {
                    return String.fromCharCode(t);
                  })
                  .join("");
              };
            }),
            (e.readUnsigned = function (t) {
              return function (e) {
                var o = r(2)(e);
                return t ? (o[1] << 8) + o[0] : (o[0] << 8) + o[1];
              };
            }),
            (e.readArray = function (t, e) {
              return function (o, n, i) {
                for (
                  var a = "function" == typeof e ? e(o, n, i) : e,
                    s = r(t),
                    l = new Array(a),
                    u = 0;
                  u < a;
                  u++
                )
                  l[u] = s(o);
                return l;
              };
            }),
            (e.readBits = function (t) {
              return function (e) {
                for (
                  var r = (function (t) {
                      return t.data[t.pos++];
                    })(e),
                    o = new Array(8),
                    n = 0;
                  n < 8;
                  n++
                )
                  o[7 - n] = !!(r & (1 << n));
                return Object.keys(t).reduce(function (e, r) {
                  var n = t[r];
                  return (
                    n.length
                      ? (e[r] = (function (t, e, r) {
                          for (var o = 0, n = 0; n < r; n++)
                            o += t[e + n] && Math.pow(2, r - n - 1);
                          return o;
                        })(o, n.index, n.length))
                      : (e[r] = o[n.index]),
                    e
                  );
                }, {});
              };
            });
        },
        323: (t, e, r) => {
          "use strict";
          e.Z = void 0;
          var o = r(662),
            n = r(58),
            i = {
              blocks: function (t) {
                for (
                  var e = [],
                    r = t.data.length,
                    o = 0,
                    i = (0, n.readByte)()(t);
                  0 !== i;
                  i = (0, n.readByte)()(t)
                ) {
                  if (t.pos + i >= r) {
                    var a = r - t.pos;
                    e.push((0, n.readBytes)(a)(t)), (o += a);
                    break;
                  }
                  e.push((0, n.readBytes)(i)(t)), (o += i);
                }
                for (var s = new Uint8Array(o), l = 0, u = 0; u < e.length; u++)
                  s.set(e[u], l), (l += e[u].length);
                return s;
              },
            },
            a = (0, o.conditional)(
              {
                gce: [
                  { codes: (0, n.readBytes)(2) },
                  { byteSize: (0, n.readByte)() },
                  {
                    extras: (0, n.readBits)({
                      future: { index: 0, length: 3 },
                      disposal: { index: 3, length: 3 },
                      userInput: { index: 6 },
                      transparentColorGiven: { index: 7 },
                    }),
                  },
                  { delay: (0, n.readUnsigned)(!0) },
                  { transparentColorIndex: (0, n.readByte)() },
                  { terminator: (0, n.readByte)() },
                ],
              },
              function (t) {
                var e = (0, n.peekBytes)(2)(t);
                return 33 === e[0] && 249 === e[1];
              }
            ),
            s = (0, o.conditional)(
              {
                image: [
                  { code: (0, n.readByte)() },
                  {
                    descriptor: [
                      { left: (0, n.readUnsigned)(!0) },
                      { top: (0, n.readUnsigned)(!0) },
                      { width: (0, n.readUnsigned)(!0) },
                      { height: (0, n.readUnsigned)(!0) },
                      {
                        lct: (0, n.readBits)({
                          exists: { index: 0 },
                          interlaced: { index: 1 },
                          sort: { index: 2 },
                          future: { index: 3, length: 2 },
                          size: { index: 5, length: 3 },
                        }),
                      },
                    ],
                  },
                  (0, o.conditional)(
                    {
                      lct: (0, n.readArray)(3, function (t, e, r) {
                        return Math.pow(2, r.descriptor.lct.size + 1);
                      }),
                    },
                    function (t, e, r) {
                      return r.descriptor.lct.exists;
                    }
                  ),
                  { data: [{ minCodeSize: (0, n.readByte)() }, i] },
                ],
              },
              function (t) {
                return 44 === (0, n.peekByte)()(t);
              }
            ),
            l = (0, o.conditional)(
              {
                text: [
                  { codes: (0, n.readBytes)(2) },
                  { blockSize: (0, n.readByte)() },
                  {
                    preData: function (t, e, r) {
                      return (0, n.readBytes)(r.text.blockSize)(t);
                    },
                  },
                  i,
                ],
              },
              function (t) {
                var e = (0, n.peekBytes)(2)(t);
                return 33 === e[0] && 1 === e[1];
              }
            ),
            u = (0, o.conditional)(
              {
                application: [
                  { codes: (0, n.readBytes)(2) },
                  { blockSize: (0, n.readByte)() },
                  {
                    id: function (t, e, r) {
                      return (0, n.readString)(r.blockSize)(t);
                    },
                  },
                  i,
                ],
              },
              function (t) {
                var e = (0, n.peekBytes)(2)(t);
                return 33 === e[0] && 255 === e[1];
              }
            ),
            h = (0, o.conditional)(
              { comment: [{ codes: (0, n.readBytes)(2) }, i] },
              function (t) {
                var e = (0, n.peekBytes)(2)(t);
                return 33 === e[0] && 254 === e[1];
              }
            ),
            c = [
              {
                header: [
                  { signature: (0, n.readString)(3) },
                  { version: (0, n.readString)(3) },
                ],
              },
              {
                lsd: [
                  { width: (0, n.readUnsigned)(!0) },
                  { height: (0, n.readUnsigned)(!0) },
                  {
                    gct: (0, n.readBits)({
                      exists: { index: 0 },
                      resolution: { index: 1, length: 3 },
                      sort: { index: 4 },
                      size: { index: 5, length: 3 },
                    }),
                  },
                  { backgroundColorIndex: (0, n.readByte)() },
                  { pixelAspectRatio: (0, n.readByte)() },
                ],
              },
              (0, o.conditional)(
                {
                  gct: (0, n.readArray)(3, function (t, e) {
                    return Math.pow(2, e.lsd.gct.size + 1);
                  }),
                },
                function (t, e) {
                  return e.lsd.gct.exists;
                }
              ),
              {
                frames: (0, o.loop)([a, u, h, s, l], function (t) {
                  var e = (0, n.peekByte)()(t);
                  return 33 === e || 44 === e;
                }),
              },
            ];
          e.Z = c;
        },
        294: function (t, e, r) {
          "use strict";
          var o =
              (this && this.__assign) ||
              function () {
                return (
                  (o =
                    Object.assign ||
                    function (t) {
                      for (var e, r = 1, o = arguments.length; r < o; r++)
                        for (var n in (e = arguments[r]))
                          Object.prototype.hasOwnProperty.call(e, n) &&
                            (t[n] = e[n]);
                      return t;
                    }),
                  o.apply(this, arguments)
                );
              },
            n =
              (this && this.__awaiter) ||
              function (t, e, r, o) {
                return new (r || (r = Promise))(function (n, i) {
                  function a(t) {
                    try {
                      l(o.next(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function s(t) {
                    try {
                      l(o.throw(t));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function l(t) {
                    var e;
                    t.done
                      ? n(t.value)
                      : ((e = t.value),
                        e instanceof r
                          ? e
                          : new r(function (t) {
                              t(e);
                            })).then(a, s);
                  }
                  l((o = o.apply(t, e || [])).next());
                });
              },
            i =
              (this && this.__generator) ||
              function (t, e) {
                var r,
                  o,
                  n,
                  i,
                  a = {
                    label: 0,
                    sent: function () {
                      if (1 & n[0]) throw n[1];
                      return n[1];
                    },
                    trys: [],
                    ops: [],
                  };
                return (
                  (i = { next: s(0), throw: s(1), return: s(2) }),
                  "function" == typeof Symbol &&
                    (i[Symbol.iterator] = function () {
                      return this;
                    }),
                  i
                );
                function s(i) {
                  return function (s) {
                    return (function (i) {
                      if (r)
                        throw new TypeError("Generator is already executing.");
                      for (; a; )
                        try {
                          if (
                            ((r = 1),
                            o &&
                              (n =
                                2 & i[0]
                                  ? o.return
                                  : i[0]
                                  ? o.throw || ((n = o.return) && n.call(o), 0)
                                  : o.next) &&
                              !(n = n.call(o, i[1])).done)
                          )
                            return n;
                          switch (
                            ((o = 0), n && (i = [2 & i[0], n.value]), i[0])
                          ) {
                            case 0:
                            case 1:
                              n = i;
                              break;
                            case 4:
                              return a.label++, { value: i[1], done: !1 };
                            case 5:
                              a.label++, (o = i[1]), (i = [0]);
                              continue;
                            case 7:
                              (i = a.ops.pop()), a.trys.pop();
                              continue;
                            default:
                              if (
                                !(
                                  (n =
                                    (n = a.trys).length > 0 &&
                                    n[n.length - 1]) ||
                                  (6 !== i[0] && 2 !== i[0])
                                )
                              ) {
                                a = 0;
                                continue;
                              }
                              if (
                                3 === i[0] &&
                                (!n || (i[1] > n[0] && i[1] < n[3]))
                              ) {
                                a.label = i[1];
                                break;
                              }
                              if (6 === i[0] && a.label < n[1]) {
                                (a.label = n[1]), (n = i);
                                break;
                              }
                              if (n && a.label < n[2]) {
                                (a.label = n[2]), a.ops.push(i);
                                break;
                              }
                              n[2] && a.ops.pop(), a.trys.pop();
                              continue;
                          }
                          i = e.call(t, a);
                        } catch (t) {
                          (i = [6, t]), (o = 0);
                        } finally {
                          r = n = 0;
                        }
                      if (5 & i[0]) throw i[1];
                      return { value: i[0] ? i[1] : void 0, done: !0 };
                    })([i, s]);
                  };
                }
              },
            a =
              (this && this.__importDefault) ||
              function (t) {
                return t && t.__esModule ? t : { default: t };
              };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.AwesomeQR = void 0);
          var s = r(154),
            l = r(952),
            u = r(937),
            h = a(r(137)),
            c = 0.4,
            f = (function () {
              function t(e) {
                var r = Object.assign({}, e);
                if (
                  (Object.keys(t.defaultOptions).forEach(function (e) {
                    e in r ||
                      Object.defineProperty(r, e, {
                        value: t.defaultOptions[e],
                        enumerable: !0,
                        writable: !0,
                      });
                  }),
                  r.components
                    ? "object" == typeof r.components &&
                      Object.keys(t.defaultComponentOptions).forEach(function (
                        e
                      ) {
                        e in r.components
                          ? Object.defineProperty(r.components, e, {
                              value: o(
                                o({}, t.defaultComponentOptions[e]),
                                r.components[e]
                              ),
                              enumerable: !0,
                              writable: !0,
                            })
                          : Object.defineProperty(r.components, e, {
                              value: t.defaultComponentOptions[e],
                              enumerable: !0,
                              writable: !0,
                            });
                      })
                    : (r.components = t.defaultComponentOptions),
                  null !== r.dotScale && void 0 !== r.dotScale)
                ) {
                  if (r.dotScale <= 0 || r.dotScale > 1)
                    throw new Error("dotScale should be in range (0, 1].");
                  (r.components.data.scale = r.dotScale),
                    (r.components.timing.scale = r.dotScale),
                    (r.components.alignment.scale = r.dotScale);
                }
                (this.options = r),
                  (this.canvas = s.createCanvas(e.size, e.size)),
                  (this.canvasContext = this.canvas.getContext("2d")),
                  (this.qrCode = new u.QRCodeModel(
                    -1,
                    this.options.correctLevel
                  )),
                  Number.isInteger(this.options.maskPattern) &&
                    (this.qrCode.maskPattern = this.options.maskPattern),
                  Number.isInteger(this.options.version) &&
                    (this.qrCode.typeNumber = this.options.version),
                  this.qrCode.addData(this.options.text),
                  this.qrCode.make();
              }
              return (
                (t.prototype.draw = function () {
                  var t = this;
                  return new Promise(function (e) {
                    return t._draw().then(e);
                  });
                }),
                (t.prototype._clear = function () {
                  this.canvasContext.clearRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                  );
                }),
                (t._prepareRoundedCornerClip = function (t, e, r, o, n, i) {
                  t.beginPath(),
                    t.moveTo(e, r),
                    t.arcTo(e + o, r, e + o, r + n, i),
                    t.arcTo(e + o, r + n, e, r + n, i),
                    t.arcTo(e, r + n, e, r, i),
                    t.arcTo(e, r, e + o, r, i),
                    t.closePath();
                }),
                (t._getAverageRGB = function (t) {
                  var e,
                    r,
                    o = { r: 0, g: 0, b: 0 },
                    n = -4,
                    i = { r: 0, g: 0, b: 0 },
                    a = 0;
                  (r = t.naturalHeight || t.height),
                    (e = t.naturalWidth || t.width);
                  var l,
                    u = s.createCanvas(e, r).getContext("2d");
                  if (!u) return o;
                  u.drawImage(t, 0, 0);
                  try {
                    l = u.getImageData(0, 0, e, r);
                  } catch (t) {
                    return o;
                  }
                  for (; (n += 20) < l.data.length; )
                    l.data[n] > 200 ||
                      l.data[n + 1] > 200 ||
                      l.data[n + 2] > 200 ||
                      (++a,
                      (i.r += l.data[n]),
                      (i.g += l.data[n + 1]),
                      (i.b += l.data[n + 2]));
                  return (
                    (i.r = ~~(i.r / a)),
                    (i.g = ~~(i.g / a)),
                    (i.b = ~~(i.b / a)),
                    i
                  );
                }),
                (t._drawDot = function (t, e, r, o, n, i) {
                  void 0 === n && (n = 0),
                    void 0 === i && (i = 1),
                    t.fillRect((e + n) * o, (r + n) * o, i * o, i * o);
                }),
                (t._drawAlignProtector = function (t, e, r, o) {
                  t.clearRect((e - 2) * o, (r - 2) * o, 5 * o, 5 * o),
                    t.fillRect((e - 2) * o, (r - 2) * o, 5 * o, 5 * o);
                }),
                (t._drawAlign = function (e, r, o, n, i, a, s, l) {
                  void 0 === i && (i = 0), void 0 === a && (a = 1);
                  var u = e.fillStyle;
                  (e.fillStyle = s),
                    new Array(4).fill(0).map(function (s, l) {
                      t._drawDot(e, r - 2 + l, o - 2, n, i, a),
                        t._drawDot(e, r + 2, o - 2 + l, n, i, a),
                        t._drawDot(e, r + 2 - l, o + 2, n, i, a),
                        t._drawDot(e, r - 2, o + 2 - l, n, i, a);
                    }),
                    t._drawDot(e, r, o, n, i, a),
                    l ||
                      ((e.fillStyle = "rgba(255, 255, 255, 0.6)"),
                      new Array(2).fill(0).map(function (s, l) {
                        t._drawDot(e, r - 1 + l, o - 1, n, i, a),
                          t._drawDot(e, r + 1, o - 1 + l, n, i, a),
                          t._drawDot(e, r + 1 - l, o + 1, n, i, a),
                          t._drawDot(e, r - 1, o + 1 - l, n, i, a);
                      })),
                    (e.fillStyle = u);
                }),
                (t.prototype._draw = function () {
                  var e, r, o, a, f, p, g, m, v, y, w, b, C, B, P, x, A, E, R;
                  return n(this, void 0, void 0, function () {
                    var n,
                      k,
                      D,
                      T,
                      _,
                      L,
                      M,
                      S,
                      I,
                      O,
                      N,
                      Q,
                      F,
                      U,
                      j,
                      z,
                      G,
                      H,
                      q,
                      K,
                      X,
                      Y,
                      J,
                      Z,
                      W,
                      V,
                      $,
                      tt,
                      et,
                      rt,
                      ot,
                      nt,
                      it,
                      at,
                      st,
                      lt,
                      ut,
                      ht,
                      ct,
                      ft,
                      dt,
                      pt,
                      gt,
                      mt,
                      vt,
                      yt,
                      wt,
                      bt,
                      Ct,
                      Bt,
                      Pt,
                      xt,
                      At,
                      Et,
                      Rt,
                      kt,
                      Dt,
                      Tt,
                      _t,
                      Lt,
                      Mt,
                      St,
                      It;
                    return i(this, function (i) {
                      switch (i.label) {
                        case 0:
                          if (
                            ((n =
                              null === (e = this.qrCode) || void 0 === e
                                ? void 0
                                : e.moduleCount),
                            (k = this.options.size),
                            ((D = this.options.margin) < 0 || 2 * D >= k) &&
                              (D = 0),
                            (T = Math.ceil(D)),
                            (_ = k - 2 * D),
                            (L = this.options.whiteMargin),
                            (M = this.options.backgroundDimming),
                            (S = Math.ceil(_ / n)),
                            (O = (I = S * n) + 2 * T),
                            (N = s.createCanvas(O, O)),
                            (Q = N.getContext("2d")),
                            this._clear(),
                            Q.save(),
                            Q.translate(T, T),
                            (F = s.createCanvas(O, O)),
                            (U = F.getContext("2d")),
                            (j = null),
                            (z = []),
                            !this.options.gifBackground)
                          )
                            return [3, 1];
                          if (
                            ((G = l.parseGIF(this.options.gifBackground)),
                            (j = G),
                            (z = l.decompressFrames(G, !0)),
                            this.options.autoColor)
                          ) {
                            for (
                              H = 0, q = 0, K = 0, X = 0, gt = 0;
                              gt < z[0].colorTable.length;
                              gt++
                            )
                              (Y = z[0].colorTable[gt])[0] > 200 ||
                                Y[1] > 200 ||
                                Y[2] > 200 ||
                                (0 === Y[0] && 0 === Y[1] && 0 === Y[2]) ||
                                (X++, (H += Y[0]), (q += Y[1]), (K += Y[2]));
                            (H = ~~(H / X)),
                              (q = ~~(q / X)),
                              (K = ~~(K / X)),
                              (this.options.colorDark =
                                "rgb(" + H + "," + q + "," + K + ")");
                          }
                          return [3, 4];
                        case 1:
                          return this.options.backgroundImage
                            ? [4, s.loadImage(this.options.backgroundImage)]
                            : [3, 3];
                        case 2:
                          return (
                            (J = i.sent()),
                            this.options.autoColor &&
                              ((Z = t._getAverageRGB(J)),
                              (this.options.colorDark =
                                "rgb(" + Z.r + "," + Z.g + "," + Z.b + ")")),
                            U.drawImage(J, 0, 0, J.width, J.height, 0, 0, O, O),
                            U.rect(0, 0, O, O),
                            (U.fillStyle = M),
                            U.fill(),
                            [3, 4]
                          );
                        case 3:
                          U.rect(0, 0, O, O),
                            (U.fillStyle = this.options.colorLight),
                            U.fill(),
                            (i.label = 4);
                        case 4:
                          for (
                            W = u.QRUtil.getPatternPosition(
                              this.qrCode.typeNumber
                            ),
                              V =
                                (null ===
                                  (o =
                                    null === (r = this.options.components) ||
                                    void 0 === r
                                      ? void 0
                                      : r.data) || void 0 === o
                                  ? void 0
                                  : o.scale) || c,
                              $ = 0.5 * (1 - V),
                              tt = 0;
                            tt < n;
                            tt++
                          )
                            for (et = 0; et < n; et++) {
                              for (
                                rt = this.qrCode.isDark(tt, et),
                                  ot =
                                    (6 == tt && et >= 8 && et <= n - 8) ||
                                    (6 == et && tt >= 8 && tt <= n - 8),
                                  nt =
                                    (et < 8 && (tt < 8 || tt >= n - 8)) ||
                                    (et >= n - 8 && tt < 8) ||
                                    ot,
                                  gt = 1;
                                gt < W.length - 1;
                                gt++
                              )
                                nt =
                                  nt ||
                                  (tt >= W[gt] - 2 &&
                                    tt <= W[gt] + 2 &&
                                    et >= W[gt] - 2 &&
                                    et <= W[gt] + 2);
                              (it = et * S + (nt ? 0 : $ * S)),
                                (at = tt * S + (nt ? 0 : $ * S)),
                                (Q.strokeStyle = rt
                                  ? this.options.colorDark
                                  : this.options.colorLight),
                                (Q.lineWidth = 0.5),
                                (Q.fillStyle = rt
                                  ? this.options.colorDark
                                  : "rgba(255, 255, 255, 0.6)"),
                                0 === W.length
                                  ? nt ||
                                    Q.fillRect(
                                      it,
                                      at,
                                      (nt ? 1 : V) * S,
                                      (nt ? 1 : V) * S
                                    )
                                  : ((st =
                                      et < n - 4 &&
                                      et >= n - 4 - 5 &&
                                      tt < n - 4 &&
                                      tt >= n - 4 - 5),
                                    nt ||
                                      st ||
                                      Q.fillRect(
                                        it,
                                        at,
                                        (nt ? 1 : V) * S,
                                        (nt ? 1 : V) * S
                                      ));
                            }
                          if (
                            ((lt = W[W.length - 1]),
                            (Q.fillStyle = "rgba(255, 255, 255, 0.6)"),
                            Q.fillRect(0, 0, 8 * S, 8 * S),
                            Q.fillRect(0, (n - 8) * S, 8 * S, 8 * S),
                            Q.fillRect((n - 8) * S, 0, 8 * S, 8 * S),
                            (null ===
                              (f =
                                null === (a = this.options.components) ||
                                void 0 === a
                                  ? void 0
                                  : a.timing) || void 0 === f
                              ? void 0
                              : f.protectors) &&
                              (Q.fillRect(8 * S, 6 * S, (n - 8 - 8) * S, S),
                              Q.fillRect(6 * S, 8 * S, S, (n - 8 - 8) * S)),
                            (null ===
                              (g =
                                null === (p = this.options.components) ||
                                void 0 === p
                                  ? void 0
                                  : p.cornerAlignment) || void 0 === g
                              ? void 0
                              : g.protectors) &&
                              t._drawAlignProtector(Q, lt, lt, S),
                            null ===
                              (v =
                                null === (m = this.options.components) ||
                                void 0 === m
                                  ? void 0
                                  : m.alignment) || void 0 === v
                              ? void 0
                              : v.protectors)
                          )
                            for (gt = 0; gt < W.length; gt++)
                              for (mt = 0; mt < W.length; mt++)
                                (vt = W[mt]),
                                  (yt = W[gt]),
                                  (6 !== vt || (6 !== yt && yt !== lt)) &&
                                    (6 !== yt || (6 !== vt && vt !== lt)) &&
                                    ((vt === lt && yt === lt) ||
                                      t._drawAlignProtector(Q, vt, yt, S));
                          for (
                            Q.fillStyle = this.options.colorDark,
                              Q.fillRect(0, 0, 7 * S, S),
                              Q.fillRect((n - 7) * S, 0, 7 * S, S),
                              Q.fillRect(0, 6 * S, 7 * S, S),
                              Q.fillRect((n - 7) * S, 6 * S, 7 * S, S),
                              Q.fillRect(0, (n - 7) * S, 7 * S, S),
                              Q.fillRect(0, (n - 7 + 6) * S, 7 * S, S),
                              Q.fillRect(0, 0, S, 7 * S),
                              Q.fillRect(6 * S, 0, S, 7 * S),
                              Q.fillRect((n - 7) * S, 0, S, 7 * S),
                              Q.fillRect((n - 7 + 6) * S, 0, S, 7 * S),
                              Q.fillRect(0, (n - 7) * S, S, 7 * S),
                              Q.fillRect(6 * S, (n - 7) * S, S, 7 * S),
                              Q.fillRect(2 * S, 2 * S, 3 * S, 3 * S),
                              Q.fillRect((n - 7 + 2) * S, 2 * S, 3 * S, 3 * S),
                              Q.fillRect(2 * S, (n - 7 + 2) * S, 3 * S, 3 * S),
                              ut =
                                (null ===
                                  (w =
                                    null === (y = this.options.components) ||
                                    void 0 === y
                                      ? void 0
                                      : y.timing) || void 0 === w
                                  ? void 0
                                  : w.scale) || c,
                              ht = 0.5 * (1 - ut),
                              gt = 0;
                            gt < n - 8;
                            gt += 2
                          )
                            t._drawDot(Q, 8 + gt, 6, S, ht, ut),
                              t._drawDot(Q, 6, 8 + gt, S, ht, ut);
                          for (
                            ct =
                              (null ===
                                (C =
                                  null === (b = this.options.components) ||
                                  void 0 === b
                                    ? void 0
                                    : b.cornerAlignment) || void 0 === C
                                ? void 0
                                : C.scale) || c,
                              ft = 0.5 * (1 - ct),
                              t._drawAlign(
                                Q,
                                lt,
                                lt,
                                S,
                                ft,
                                ct,
                                this.options.colorDark,
                                (null ===
                                  (P =
                                    null === (B = this.options.components) ||
                                    void 0 === B
                                      ? void 0
                                      : B.cornerAlignment) || void 0 === P
                                  ? void 0
                                  : P.protectors) || !1
                              ),
                              dt =
                                (null ===
                                  (A =
                                    null === (x = this.options.components) ||
                                    void 0 === x
                                      ? void 0
                                      : x.alignment) || void 0 === A
                                  ? void 0
                                  : A.scale) || c,
                              pt = 0.5 * (1 - dt),
                              gt = 0;
                            gt < W.length;
                            gt++
                          )
                            for (mt = 0; mt < W.length; mt++)
                              (vt = W[mt]),
                                (yt = W[gt]),
                                (6 !== vt || (6 !== yt && yt !== lt)) &&
                                  (6 !== yt || (6 !== vt && vt !== lt)) &&
                                  ((vt === lt && yt === lt) ||
                                    t._drawAlign(
                                      Q,
                                      vt,
                                      yt,
                                      S,
                                      pt,
                                      dt,
                                      this.options.colorDark,
                                      (null ===
                                        (R =
                                          null ===
                                            (E = this.options.components) ||
                                          void 0 === E
                                            ? void 0
                                            : E.alignment) || void 0 === R
                                        ? void 0
                                        : R.protectors) || !1
                                    ));
                          return (
                            L &&
                              ((Q.fillStyle = "#FFFFFF"),
                              Q.fillRect(-T, -T, O, T),
                              Q.fillRect(-T, I, O, T),
                              Q.fillRect(I, -T, T, O),
                              Q.fillRect(-T, -T, T, O)),
                            this.options.logoImage
                              ? [4, s.loadImage(this.options.logoImage)]
                              : [3, 6]
                          );
                        case 5:
                          (wt = i.sent()),
                            (bt = this.options.logoScale),
                            (Ct = this.options.logoMargin),
                            (Bt = this.options.logoCornerRadius),
                            (bt <= 0 || bt >= 1) && (bt = 0.2),
                            Ct < 0 && (Ct = 0),
                            Bt < 0 && (Bt = 0),
                            (At = xt = 0.5 * (O - (Pt = I * bt))),
                            Q.restore(),
                            (Q.fillStyle = "#FFFFFF"),
                            Q.save(),
                            t._prepareRoundedCornerClip(
                              Q,
                              xt - Ct,
                              At - Ct,
                              Pt + 2 * Ct,
                              Pt + 2 * Ct,
                              Bt + Ct
                            ),
                            Q.clip(),
                            (Et = Q.globalCompositeOperation),
                            (Q.globalCompositeOperation = "destination-out"),
                            Q.fill(),
                            (Q.globalCompositeOperation = Et),
                            Q.restore(),
                            Q.save(),
                            t._prepareRoundedCornerClip(Q, xt, At, Pt, Pt, Bt),
                            Q.clip(),
                            Q.drawImage(wt, xt, At, Pt, Pt),
                            Q.restore(),
                            Q.save(),
                            Q.translate(T, T),
                            (i.label = 6);
                        case 6:
                          if (j) {
                            if (
                              (z.forEach(function (t) {
                                Rt ||
                                  ((Rt = new h.default(k, k)).setDelay(t.delay),
                                  Rt.setRepeat(0));
                                var e = t.dims,
                                  r = e.width,
                                  o = e.height;
                                kt ||
                                  ((kt = s.createCanvas(r, o)),
                                  (Dt = kt.getContext("2d")).rect(
                                    0,
                                    0,
                                    kt.width,
                                    kt.height
                                  ),
                                  (Dt.fillStyle = "#ffffff"),
                                  Dt.fill()),
                                  (Tt &&
                                    Lt &&
                                    r === Tt.width &&
                                    o === Tt.height) ||
                                    ((Tt = s.createCanvas(r, o)),
                                    (_t = Tt.getContext("2d")),
                                    (Lt = _t.createImageData(r, o))),
                                  Lt.data.set(t.patch),
                                  _t.putImageData(Lt, 0, 0),
                                  Dt.drawImage(Tt, t.dims.left, t.dims.top);
                                var n = s.createCanvas(O, O),
                                  i = n.getContext("2d");
                                i.drawImage(kt, 0, 0, O, O),
                                  i.rect(0, 0, O, O),
                                  (i.fillStyle = M),
                                  i.fill(),
                                  i.drawImage(N, 0, 0, O, O);
                                var a = s.createCanvas(k, k),
                                  l = a.getContext("2d");
                                l.drawImage(n, 0, 0, k, k),
                                  Rt.addFrame(
                                    l.getImageData(0, 0, a.width, a.height).data
                                  );
                              }),
                              !Rt)
                            )
                              throw new Error("No frames.");
                            return (
                              Rt.finish(),
                              d(this.canvas)
                                ? ((Mt = Rt.stream().toFlattenUint8Array()),
                                  (St = Mt.reduce(function (t, e) {
                                    return t + String.fromCharCode(e);
                                  }, "")),
                                  [
                                    2,
                                    Promise.resolve(
                                      "data:image/gif;base64," + window.btoa(St)
                                    ),
                                  ])
                                : [
                                    2,
                                    Promise.resolve(
                                      Buffer.from(
                                        Rt.stream().toFlattenUint8Array()
                                      )
                                    ),
                                  ]
                            );
                          }
                          return (
                            U.drawImage(N, 0, 0, O, O),
                            Q.drawImage(F, -T, -T, O, O),
                            (It = s.createCanvas(k, k))
                              .getContext("2d")
                              .drawImage(N, 0, 0, k, k),
                            (this.canvas = It),
                            d(this.canvas)
                              ? [2, Promise.resolve(this.canvas.toDataURL())]
                              : [2, Promise.resolve(this.canvas.toBuffer())]
                          );
                      }
                    });
                  });
                }),
                (t.CorrectLevel = u.QRErrorCorrectLevel),
                (t.defaultComponentOptions = {
                  data: { scale: 1 },
                  timing: { scale: 1, protectors: !1 },
                  alignment: { scale: 1, protectors: !1 },
                  cornerAlignment: { scale: 1, protectors: !0 },
                }),
                (t.defaultOptions = {
                  text: "",
                  size: 400,
                  margin: 20,
                  colorDark: "#000000",
                  colorLight: "#ffffff",
                  correctLevel: u.QRErrorCorrectLevel.M,
                  backgroundImage: void 0,
                  backgroundDimming: "rgba(0,0,0,0)",
                  logoImage: void 0,
                  logoScale: 0.2,
                  logoMargin: 4,
                  logoCornerRadius: 8,
                  whiteMargin: !0,
                  components: t.defaultComponentOptions,
                  autoColor: !0,
                }),
                t
              );
            })();
          function d(t) {
            try {
              return t instanceof HTMLElement;
            } catch (e) {
              return (
                "object" == typeof t &&
                1 === t.nodeType &&
                "object" == typeof t.style &&
                "object" == typeof t.ownerDocument
              );
            }
          }
          e.AwesomeQR = f;
        },
        642: function (t, e, r) {
          "use strict";
          var o =
              (this && this.__createBinding) ||
              (Object.create
                ? function (t, e, r, o) {
                    void 0 === o && (o = r),
                      Object.defineProperty(t, o, {
                        enumerable: !0,
                        get: function () {
                          return e[r];
                        },
                      });
                  }
                : function (t, e, r, o) {
                    void 0 === o && (o = r), (t[o] = e[r]);
                  }),
            n =
              (this && this.__exportStar) ||
              function (t, e) {
                for (var r in t)
                  "default" === r || e.hasOwnProperty(r) || o(e, t, r);
              };
          Object.defineProperty(e, "__esModule", { value: !0 }), n(r(937), e);
          var i = r(294);
          Object.defineProperty(e, "AwesomeQR", {
            enumerable: !0,
            get: function () {
              return i.AwesomeQR;
            },
          });
        },
        937: (t, e) => {
          "use strict";
          function r(t) {
            var e = encodeURI(t)
              .toString()
              .replace(/\%[0-9a-fA-F]{2}/g, "a");
            return e.length + (e.length != Number(t) ? 3 : 0);
          }
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.QRMath =
              e.QRUtil =
              e.QRMaskPattern =
              e.QRErrorCorrectLevel =
              e.QRCodeModel =
                void 0);
          var o = (function () {
              function t(t) {
                (this.mode = i.MODE_8BIT_BYTE),
                  (this.parsedData = []),
                  (this.data = t);
                for (var e = [], r = 0, o = this.data.length; r < o; r++) {
                  var n = [],
                    a = this.data.charCodeAt(r);
                  a > 65536
                    ? ((n[0] = 240 | ((1835008 & a) >>> 18)),
                      (n[1] = 128 | ((258048 & a) >>> 12)),
                      (n[2] = 128 | ((4032 & a) >>> 6)),
                      (n[3] = 128 | (63 & a)))
                    : a > 2048
                    ? ((n[0] = 224 | ((61440 & a) >>> 12)),
                      (n[1] = 128 | ((4032 & a) >>> 6)),
                      (n[2] = 128 | (63 & a)))
                    : a > 128
                    ? ((n[0] = 192 | ((1984 & a) >>> 6)),
                      (n[1] = 128 | (63 & a)))
                    : (n[0] = a),
                    e.push(n);
                }
                (this.parsedData = Array.prototype.concat.apply([], e)),
                  this.parsedData.length != this.data.length &&
                    (this.parsedData.unshift(191),
                    this.parsedData.unshift(187),
                    this.parsedData.unshift(239));
              }
              return (
                (t.prototype.getLength = function () {
                  return this.parsedData.length;
                }),
                (t.prototype.write = function (t) {
                  for (var e = 0, r = this.parsedData.length; e < r; e++)
                    t.put(this.parsedData[e], 8);
                }),
                t
              );
            })(),
            n = (function () {
              function t(t, r) {
                void 0 === t && (t = -1),
                  void 0 === r && (r = e.QRErrorCorrectLevel.L),
                  (this.moduleCount = 0),
                  (this.dataList = []),
                  (this.typeNumber = t),
                  (this.errorCorrectLevel = r),
                  (this.moduleCount = 0),
                  (this.dataList = []);
              }
              return (
                (t.prototype.addData = function (t) {
                  if (this.typeNumber <= 0)
                    this.typeNumber = (function (t, o) {
                      for (
                        var n = 1, i = r(t), a = 0, s = c.length;
                        a < s;
                        a++
                      ) {
                        var l = 0;
                        switch (o) {
                          case e.QRErrorCorrectLevel.L:
                            l = c[a][0];
                            break;
                          case e.QRErrorCorrectLevel.M:
                            l = c[a][1];
                            break;
                          case e.QRErrorCorrectLevel.Q:
                            l = c[a][2];
                            break;
                          case e.QRErrorCorrectLevel.H:
                            l = c[a][3];
                        }
                        if (i <= l) break;
                        n++;
                      }
                      if (n > c.length) throw new Error("Too long data");
                      return n;
                    })(t, this.errorCorrectLevel);
                  else {
                    if (this.typeNumber > 40)
                      throw new Error("Invalid QR version: " + this.typeNumber);
                    if (
                      !(function (t, o, n) {
                        var i = r(o),
                          a = t - 1,
                          s = 0;
                        switch (n) {
                          case e.QRErrorCorrectLevel.L:
                            s = c[a][0];
                            break;
                          case e.QRErrorCorrectLevel.M:
                            s = c[a][1];
                            break;
                          case e.QRErrorCorrectLevel.Q:
                            s = c[a][2];
                            break;
                          case e.QRErrorCorrectLevel.H:
                            s = c[a][3];
                        }
                        return i <= s;
                      })(this.typeNumber, t, this.errorCorrectLevel)
                    )
                      throw new Error(
                        "Data is too long for QR version: " + this.typeNumber
                      );
                  }
                  var n = new o(t);
                  this.dataList.push(n), (this.dataCache = void 0);
                }),
                (t.prototype.isDark = function (t, e) {
                  if (
                    t < 0 ||
                    this.moduleCount <= t ||
                    e < 0 ||
                    this.moduleCount <= e
                  )
                    throw new Error(t + "," + e);
                  return this.modules[t][e];
                }),
                (t.prototype.getModuleCount = function () {
                  return this.moduleCount;
                }),
                (t.prototype.make = function () {
                  this.makeImpl(!1, this.getBestMaskPattern());
                }),
                (t.prototype.makeImpl = function (e, r) {
                  (this.moduleCount = 4 * this.typeNumber + 17),
                    (this.modules = new Array(this.moduleCount));
                  for (var o = 0; o < this.moduleCount; o++) {
                    this.modules[o] = new Array(this.moduleCount);
                    for (var n = 0; n < this.moduleCount; n++)
                      this.modules[o][n] = null;
                  }
                  this.setupPositionProbePattern(0, 0),
                    this.setupPositionProbePattern(this.moduleCount - 7, 0),
                    this.setupPositionProbePattern(0, this.moduleCount - 7),
                    this.setupPositionAdjustPattern(),
                    this.setupTimingPattern(),
                    this.setupTypeInfo(e, r),
                    this.typeNumber >= 7 && this.setupTypeNumber(e),
                    null == this.dataCache &&
                      (this.dataCache = t.createData(
                        this.typeNumber,
                        this.errorCorrectLevel,
                        this.dataList
                      )),
                    this.mapData(this.dataCache, r);
                }),
                (t.prototype.setupPositionProbePattern = function (t, e) {
                  for (var r = -1; r <= 7; r++)
                    if (!(t + r <= -1 || this.moduleCount <= t + r))
                      for (var o = -1; o <= 7; o++)
                        e + o <= -1 ||
                          this.moduleCount <= e + o ||
                          (this.modules[t + r][e + o] =
                            (0 <= r && r <= 6 && (0 == o || 6 == o)) ||
                            (0 <= o && o <= 6 && (0 == r || 6 == r)) ||
                            (2 <= r && r <= 4 && 2 <= o && o <= 4));
                }),
                (t.prototype.getBestMaskPattern = function () {
                  if (
                    Number.isInteger(this.maskPattern) &&
                    Object.values(e.QRMaskPattern).includes(this.maskPattern)
                  )
                    return this.maskPattern;
                  for (var t = 0, r = 0, o = 0; o < 8; o++) {
                    this.makeImpl(!0, o);
                    var n = a.getLostPoint(this);
                    (0 == o || t > n) && ((t = n), (r = o));
                  }
                  return r;
                }),
                (t.prototype.setupTimingPattern = function () {
                  for (var t = 8; t < this.moduleCount - 8; t++)
                    null == this.modules[t][6] &&
                      (this.modules[t][6] = t % 2 == 0);
                  for (var e = 8; e < this.moduleCount - 8; e++)
                    null == this.modules[6][e] &&
                      (this.modules[6][e] = e % 2 == 0);
                }),
                (t.prototype.setupPositionAdjustPattern = function () {
                  for (
                    var t = a.getPatternPosition(this.typeNumber), e = 0;
                    e < t.length;
                    e++
                  )
                    for (var r = 0; r < t.length; r++) {
                      var o = t[e],
                        n = t[r];
                      if (null == this.modules[o][n])
                        for (var i = -2; i <= 2; i++)
                          for (var s = -2; s <= 2; s++)
                            this.modules[o + i][n + s] =
                              -2 == i ||
                              2 == i ||
                              -2 == s ||
                              2 == s ||
                              (0 == i && 0 == s);
                    }
                }),
                (t.prototype.setupTypeNumber = function (t) {
                  for (
                    var e = a.getBCHTypeNumber(this.typeNumber), r = 0;
                    r < 18;
                    r++
                  ) {
                    var o = !t && 1 == ((e >> r) & 1);
                    this.modules[Math.floor(r / 3)][
                      (r % 3) + this.moduleCount - 8 - 3
                    ] = o;
                  }
                  for (r = 0; r < 18; r++)
                    (o = !t && 1 == ((e >> r) & 1)),
                      (this.modules[(r % 3) + this.moduleCount - 8 - 3][
                        Math.floor(r / 3)
                      ] = o);
                }),
                (t.prototype.setupTypeInfo = function (t, e) {
                  for (
                    var r = (this.errorCorrectLevel << 3) | e,
                      o = a.getBCHTypeInfo(r),
                      n = 0;
                    n < 15;
                    n++
                  ) {
                    var i = !t && 1 == ((o >> n) & 1);
                    n < 6
                      ? (this.modules[n][8] = i)
                      : n < 8
                      ? (this.modules[n + 1][8] = i)
                      : (this.modules[this.moduleCount - 15 + n][8] = i);
                  }
                  for (n = 0; n < 15; n++)
                    (i = !t && 1 == ((o >> n) & 1)),
                      n < 8
                        ? (this.modules[8][this.moduleCount - n - 1] = i)
                        : n < 9
                        ? (this.modules[8][15 - n - 1 + 1] = i)
                        : (this.modules[8][15 - n - 1] = i);
                  this.modules[this.moduleCount - 8][8] = !t;
                }),
                (t.prototype.mapData = function (t, e) {
                  for (
                    var r = -1,
                      o = this.moduleCount - 1,
                      n = 7,
                      i = 0,
                      s = this.moduleCount - 1;
                    s > 0;
                    s -= 2
                  )
                    for (6 == s && s--; ; ) {
                      for (var l = 0; l < 2; l++)
                        if (null == this.modules[o][s - l]) {
                          var u = !1;
                          i < t.length && (u = 1 == ((t[i] >>> n) & 1)),
                            a.getMask(e, o, s - l) && (u = !u),
                            (this.modules[o][s - l] = u),
                            -1 == --n && (i++, (n = 7));
                        }
                      if ((o += r) < 0 || this.moduleCount <= o) {
                        (o -= r), (r = -r);
                        break;
                      }
                    }
                }),
                (t.createData = function (e, r, o) {
                  for (
                    var n = u.getRSBlocks(e, r), i = new h(), s = 0;
                    s < o.length;
                    s++
                  ) {
                    var l = o[s];
                    i.put(l.mode, 4),
                      i.put(l.getLength(), a.getLengthInBits(l.mode, e)),
                      l.write(i);
                  }
                  var c = 0;
                  for (s = 0; s < n.length; s++) c += n[s].dataCount;
                  if (i.getLengthInBits() > 8 * c)
                    throw new Error(
                      "code length overflow. (" +
                        i.getLengthInBits() +
                        ">" +
                        8 * c +
                        ")"
                    );
                  for (
                    i.getLengthInBits() + 4 <= 8 * c && i.put(0, 4);
                    i.getLengthInBits() % 8 != 0;

                  )
                    i.putBit(!1);
                  for (
                    ;
                    !(
                      i.getLengthInBits() >= 8 * c ||
                      (i.put(t.PAD0, 8), i.getLengthInBits() >= 8 * c)
                    );

                  )
                    i.put(t.PAD1, 8);
                  return t.createBytes(i, n);
                }),
                (t.createBytes = function (t, e) {
                  for (
                    var r = 0,
                      o = 0,
                      n = 0,
                      i = new Array(e.length),
                      s = new Array(e.length),
                      u = 0;
                    u < e.length;
                    u++
                  ) {
                    var h = e[u].dataCount,
                      c = e[u].totalCount - h;
                    (o = Math.max(o, h)),
                      (n = Math.max(n, c)),
                      (i[u] = new Array(h));
                    for (var f = 0; f < i[u].length; f++)
                      i[u][f] = 255 & t.buffer[f + r];
                    r += h;
                    var d = a.getErrorCorrectPolynomial(c),
                      p = new l(i[u], d.getLength() - 1).mod(d);
                    for (
                      s[u] = new Array(d.getLength() - 1), f = 0;
                      f < s[u].length;
                      f++
                    ) {
                      var g = f + p.getLength() - s[u].length;
                      s[u][f] = g >= 0 ? p.get(g) : 0;
                    }
                  }
                  var m = 0;
                  for (f = 0; f < e.length; f++) m += e[f].totalCount;
                  var v = new Array(m),
                    y = 0;
                  for (f = 0; f < o; f++)
                    for (u = 0; u < e.length; u++)
                      f < i[u].length && (v[y++] = i[u][f]);
                  for (f = 0; f < n; f++)
                    for (u = 0; u < e.length; u++)
                      f < s[u].length && (v[y++] = s[u][f]);
                  return v;
                }),
                (t.PAD0 = 236),
                (t.PAD1 = 17),
                t
              );
            })();
          (e.QRCodeModel = n),
            (e.QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 });
          var i = {
            MODE_NUMBER: 1,
            MODE_ALPHA_NUM: 2,
            MODE_8BIT_BYTE: 4,
            MODE_KANJI: 8,
          };
          e.QRMaskPattern = {
            PATTERN000: 0,
            PATTERN001: 1,
            PATTERN010: 2,
            PATTERN011: 3,
            PATTERN100: 4,
            PATTERN101: 5,
            PATTERN110: 6,
            PATTERN111: 7,
          };
          var a = (function () {
            function t() {}
            return (
              (t.getBCHTypeInfo = function (e) {
                for (
                  var r = e << 10;
                  t.getBCHDigit(r) - t.getBCHDigit(t.G15) >= 0;

                )
                  r ^= t.G15 << (t.getBCHDigit(r) - t.getBCHDigit(t.G15));
                return ((e << 10) | r) ^ t.G15_MASK;
              }),
              (t.getBCHTypeNumber = function (e) {
                for (
                  var r = e << 12;
                  t.getBCHDigit(r) - t.getBCHDigit(t.G18) >= 0;

                )
                  r ^= t.G18 << (t.getBCHDigit(r) - t.getBCHDigit(t.G18));
                return (e << 12) | r;
              }),
              (t.getBCHDigit = function (t) {
                for (var e = 0; 0 != t; ) e++, (t >>>= 1);
                return e;
              }),
              (t.getPatternPosition = function (e) {
                return t.PATTERN_POSITION_TABLE[e - 1];
              }),
              (t.getMask = function (t, r, o) {
                switch (t) {
                  case e.QRMaskPattern.PATTERN000:
                    return (r + o) % 2 == 0;
                  case e.QRMaskPattern.PATTERN001:
                    return r % 2 == 0;
                  case e.QRMaskPattern.PATTERN010:
                    return o % 3 == 0;
                  case e.QRMaskPattern.PATTERN011:
                    return (r + o) % 3 == 0;
                  case e.QRMaskPattern.PATTERN100:
                    return (Math.floor(r / 2) + Math.floor(o / 3)) % 2 == 0;
                  case e.QRMaskPattern.PATTERN101:
                    return ((r * o) % 2) + ((r * o) % 3) == 0;
                  case e.QRMaskPattern.PATTERN110:
                    return (((r * o) % 2) + ((r * o) % 3)) % 2 == 0;
                  case e.QRMaskPattern.PATTERN111:
                    return (((r * o) % 3) + ((r + o) % 2)) % 2 == 0;
                  default:
                    throw new Error("bad maskPattern:" + t);
                }
              }),
              (t.getErrorCorrectPolynomial = function (t) {
                for (var e = new l([1], 0), r = 0; r < t; r++)
                  e = e.multiply(new l([1, s.gexp(r)], 0));
                return e;
              }),
              (t.getLengthInBits = function (t, e) {
                if (1 <= e && e < 10)
                  switch (t) {
                    case i.MODE_NUMBER:
                      return 10;
                    case i.MODE_ALPHA_NUM:
                      return 9;
                    case i.MODE_8BIT_BYTE:
                    case i.MODE_KANJI:
                      return 8;
                    default:
                      throw new Error("mode:" + t);
                  }
                else if (e < 27)
                  switch (t) {
                    case i.MODE_NUMBER:
                      return 12;
                    case i.MODE_ALPHA_NUM:
                      return 11;
                    case i.MODE_8BIT_BYTE:
                      return 16;
                    case i.MODE_KANJI:
                      return 10;
                    default:
                      throw new Error("mode:" + t);
                  }
                else {
                  if (!(e < 41)) throw new Error("type:" + e);
                  switch (t) {
                    case i.MODE_NUMBER:
                      return 14;
                    case i.MODE_ALPHA_NUM:
                      return 13;
                    case i.MODE_8BIT_BYTE:
                      return 16;
                    case i.MODE_KANJI:
                      return 12;
                    default:
                      throw new Error("mode:" + t);
                  }
                }
              }),
              (t.getLostPoint = function (t) {
                for (var e = t.getModuleCount(), r = 0, o = 0; o < e; o++)
                  for (var n = 0; n < e; n++) {
                    for (var i = 0, a = t.isDark(o, n), s = -1; s <= 1; s++)
                      if (!(o + s < 0 || e <= o + s))
                        for (var l = -1; l <= 1; l++)
                          n + l < 0 ||
                            e <= n + l ||
                            (0 == s && 0 == l) ||
                            (a == t.isDark(o + s, n + l) && i++);
                    i > 5 && (r += 3 + i - 5);
                  }
                for (o = 0; o < e - 1; o++)
                  for (n = 0; n < e - 1; n++) {
                    var u = 0;
                    t.isDark(o, n) && u++,
                      t.isDark(o + 1, n) && u++,
                      t.isDark(o, n + 1) && u++,
                      t.isDark(o + 1, n + 1) && u++,
                      (0 != u && 4 != u) || (r += 3);
                  }
                for (o = 0; o < e; o++)
                  for (n = 0; n < e - 6; n++)
                    t.isDark(o, n) &&
                      !t.isDark(o, n + 1) &&
                      t.isDark(o, n + 2) &&
                      t.isDark(o, n + 3) &&
                      t.isDark(o, n + 4) &&
                      !t.isDark(o, n + 5) &&
                      t.isDark(o, n + 6) &&
                      (r += 40);
                for (n = 0; n < e; n++)
                  for (o = 0; o < e - 6; o++)
                    t.isDark(o, n) &&
                      !t.isDark(o + 1, n) &&
                      t.isDark(o + 2, n) &&
                      t.isDark(o + 3, n) &&
                      t.isDark(o + 4, n) &&
                      !t.isDark(o + 5, n) &&
                      t.isDark(o + 6, n) &&
                      (r += 40);
                var h = 0;
                for (n = 0; n < e; n++)
                  for (o = 0; o < e; o++) t.isDark(o, n) && h++;
                return r + (Math.abs((100 * h) / e / e - 50) / 5) * 10;
              }),
              (t.PATTERN_POSITION_TABLE = [
                [],
                [6, 18],
                [6, 22],
                [6, 26],
                [6, 30],
                [6, 34],
                [6, 22, 38],
                [6, 24, 42],
                [6, 26, 46],
                [6, 28, 50],
                [6, 30, 54],
                [6, 32, 58],
                [6, 34, 62],
                [6, 26, 46, 66],
                [6, 26, 48, 70],
                [6, 26, 50, 74],
                [6, 30, 54, 78],
                [6, 30, 56, 82],
                [6, 30, 58, 86],
                [6, 34, 62, 90],
                [6, 28, 50, 72, 94],
                [6, 26, 50, 74, 98],
                [6, 30, 54, 78, 102],
                [6, 28, 54, 80, 106],
                [6, 32, 58, 84, 110],
                [6, 30, 58, 86, 114],
                [6, 34, 62, 90, 118],
                [6, 26, 50, 74, 98, 122],
                [6, 30, 54, 78, 102, 126],
                [6, 26, 52, 78, 104, 130],
                [6, 30, 56, 82, 108, 134],
                [6, 34, 60, 86, 112, 138],
                [6, 30, 58, 86, 114, 142],
                [6, 34, 62, 90, 118, 146],
                [6, 30, 54, 78, 102, 126, 150],
                [6, 24, 50, 76, 102, 128, 154],
                [6, 28, 54, 80, 106, 132, 158],
                [6, 32, 58, 84, 110, 136, 162],
                [6, 26, 54, 82, 110, 138, 166],
                [6, 30, 58, 86, 114, 142, 170],
              ]),
              (t.G15 = 1335),
              (t.G18 = 7973),
              (t.G15_MASK = 21522),
              t
            );
          })();
          e.QRUtil = a;
          var s = (function () {
            function t() {}
            return (
              (t.glog = function (e) {
                if (e < 1) throw new Error("glog(" + e + ")");
                return t.LOG_TABLE[e];
              }),
              (t.gexp = function (e) {
                for (; e < 0; ) e += 255;
                for (; e >= 256; ) e -= 255;
                return t.EXP_TABLE[e];
              }),
              (t.EXP_TABLE = new Array(256)),
              (t.LOG_TABLE = new Array(256)),
              (t._constructor = (function () {
                for (var e = 0; e < 8; e++) t.EXP_TABLE[e] = 1 << e;
                for (e = 8; e < 256; e++)
                  t.EXP_TABLE[e] =
                    t.EXP_TABLE[e - 4] ^
                    t.EXP_TABLE[e - 5] ^
                    t.EXP_TABLE[e - 6] ^
                    t.EXP_TABLE[e - 8];
                for (e = 0; e < 255; e++) t.LOG_TABLE[t.EXP_TABLE[e]] = e;
              })()),
              t
            );
          })();
          e.QRMath = s;
          var l = (function () {
              function t(t, e) {
                if (null == t.length) throw new Error(t.length + "/" + e);
                for (var r = 0; r < t.length && 0 == t[r]; ) r++;
                this.num = new Array(t.length - r + e);
                for (var o = 0; o < t.length - r; o++) this.num[o] = t[o + r];
              }
              return (
                (t.prototype.get = function (t) {
                  return this.num[t];
                }),
                (t.prototype.getLength = function () {
                  return this.num.length;
                }),
                (t.prototype.multiply = function (e) {
                  for (
                    var r = new Array(this.getLength() + e.getLength() - 1),
                      o = 0;
                    o < this.getLength();
                    o++
                  )
                    for (var n = 0; n < e.getLength(); n++)
                      r[o + n] ^= s.gexp(
                        s.glog(this.get(o)) + s.glog(e.get(n))
                      );
                  return new t(r, 0);
                }),
                (t.prototype.mod = function (e) {
                  if (this.getLength() - e.getLength() < 0) return this;
                  for (
                    var r = s.glog(this.get(0)) - s.glog(e.get(0)),
                      o = new Array(this.getLength()),
                      n = 0;
                    n < this.getLength();
                    n++
                  )
                    o[n] = this.get(n);
                  for (n = 0; n < e.getLength(); n++)
                    o[n] ^= s.gexp(s.glog(e.get(n)) + r);
                  return new t(o, 0).mod(e);
                }),
                t
              );
            })(),
            u = (function () {
              function t(t, e) {
                (this.totalCount = t), (this.dataCount = e);
              }
              return (
                (t.getRSBlocks = function (e, r) {
                  var o = t.getRsBlockTable(e, r);
                  if (null == o)
                    throw new Error(
                      "bad rs block @ typeNumber:" +
                        e +
                        "/errorCorrectLevel:" +
                        r
                    );
                  for (var n = o.length / 3, i = [], a = 0; a < n; a++)
                    for (
                      var s = o[3 * a + 0],
                        l = o[3 * a + 1],
                        u = o[3 * a + 2],
                        h = 0;
                      h < s;
                      h++
                    )
                      i.push(new t(l, u));
                  return i;
                }),
                (t.getRsBlockTable = function (r, o) {
                  switch (o) {
                    case e.QRErrorCorrectLevel.L:
                      return t.RS_BLOCK_TABLE[4 * (r - 1) + 0];
                    case e.QRErrorCorrectLevel.M:
                      return t.RS_BLOCK_TABLE[4 * (r - 1) + 1];
                    case e.QRErrorCorrectLevel.Q:
                      return t.RS_BLOCK_TABLE[4 * (r - 1) + 2];
                    case e.QRErrorCorrectLevel.H:
                      return t.RS_BLOCK_TABLE[4 * (r - 1) + 3];
                    default:
                      return;
                  }
                }),
                (t.RS_BLOCK_TABLE = [
                  [1, 26, 19],
                  [1, 26, 16],
                  [1, 26, 13],
                  [1, 26, 9],
                  [1, 44, 34],
                  [1, 44, 28],
                  [1, 44, 22],
                  [1, 44, 16],
                  [1, 70, 55],
                  [1, 70, 44],
                  [2, 35, 17],
                  [2, 35, 13],
                  [1, 100, 80],
                  [2, 50, 32],
                  [2, 50, 24],
                  [4, 25, 9],
                  [1, 134, 108],
                  [2, 67, 43],
                  [2, 33, 15, 2, 34, 16],
                  [2, 33, 11, 2, 34, 12],
                  [2, 86, 68],
                  [4, 43, 27],
                  [4, 43, 19],
                  [4, 43, 15],
                  [2, 98, 78],
                  [4, 49, 31],
                  [2, 32, 14, 4, 33, 15],
                  [4, 39, 13, 1, 40, 14],
                  [2, 121, 97],
                  [2, 60, 38, 2, 61, 39],
                  [4, 40, 18, 2, 41, 19],
                  [4, 40, 14, 2, 41, 15],
                  [2, 146, 116],
                  [3, 58, 36, 2, 59, 37],
                  [4, 36, 16, 4, 37, 17],
                  [4, 36, 12, 4, 37, 13],
                  [2, 86, 68, 2, 87, 69],
                  [4, 69, 43, 1, 70, 44],
                  [6, 43, 19, 2, 44, 20],
                  [6, 43, 15, 2, 44, 16],
                  [4, 101, 81],
                  [1, 80, 50, 4, 81, 51],
                  [4, 50, 22, 4, 51, 23],
                  [3, 36, 12, 8, 37, 13],
                  [2, 116, 92, 2, 117, 93],
                  [6, 58, 36, 2, 59, 37],
                  [4, 46, 20, 6, 47, 21],
                  [7, 42, 14, 4, 43, 15],
                  [4, 133, 107],
                  [8, 59, 37, 1, 60, 38],
                  [8, 44, 20, 4, 45, 21],
                  [12, 33, 11, 4, 34, 12],
                  [3, 145, 115, 1, 146, 116],
                  [4, 64, 40, 5, 65, 41],
                  [11, 36, 16, 5, 37, 17],
                  [11, 36, 12, 5, 37, 13],
                  [5, 109, 87, 1, 110, 88],
                  [5, 65, 41, 5, 66, 42],
                  [5, 54, 24, 7, 55, 25],
                  [11, 36, 12],
                  [5, 122, 98, 1, 123, 99],
                  [7, 73, 45, 3, 74, 46],
                  [15, 43, 19, 2, 44, 20],
                  [3, 45, 15, 13, 46, 16],
                  [1, 135, 107, 5, 136, 108],
                  [10, 74, 46, 1, 75, 47],
                  [1, 50, 22, 15, 51, 23],
                  [2, 42, 14, 17, 43, 15],
                  [5, 150, 120, 1, 151, 121],
                  [9, 69, 43, 4, 70, 44],
                  [17, 50, 22, 1, 51, 23],
                  [2, 42, 14, 19, 43, 15],
                  [3, 141, 113, 4, 142, 114],
                  [3, 70, 44, 11, 71, 45],
                  [17, 47, 21, 4, 48, 22],
                  [9, 39, 13, 16, 40, 14],
                  [3, 135, 107, 5, 136, 108],
                  [3, 67, 41, 13, 68, 42],
                  [15, 54, 24, 5, 55, 25],
                  [15, 43, 15, 10, 44, 16],
                  [4, 144, 116, 4, 145, 117],
                  [17, 68, 42],
                  [17, 50, 22, 6, 51, 23],
                  [19, 46, 16, 6, 47, 17],
                  [2, 139, 111, 7, 140, 112],
                  [17, 74, 46],
                  [7, 54, 24, 16, 55, 25],
                  [34, 37, 13],
                  [4, 151, 121, 5, 152, 122],
                  [4, 75, 47, 14, 76, 48],
                  [11, 54, 24, 14, 55, 25],
                  [16, 45, 15, 14, 46, 16],
                  [6, 147, 117, 4, 148, 118],
                  [6, 73, 45, 14, 74, 46],
                  [11, 54, 24, 16, 55, 25],
                  [30, 46, 16, 2, 47, 17],
                  [8, 132, 106, 4, 133, 107],
                  [8, 75, 47, 13, 76, 48],
                  [7, 54, 24, 22, 55, 25],
                  [22, 45, 15, 13, 46, 16],
                  [10, 142, 114, 2, 143, 115],
                  [19, 74, 46, 4, 75, 47],
                  [28, 50, 22, 6, 51, 23],
                  [33, 46, 16, 4, 47, 17],
                  [8, 152, 122, 4, 153, 123],
                  [22, 73, 45, 3, 74, 46],
                  [8, 53, 23, 26, 54, 24],
                  [12, 45, 15, 28, 46, 16],
                  [3, 147, 117, 10, 148, 118],
                  [3, 73, 45, 23, 74, 46],
                  [4, 54, 24, 31, 55, 25],
                  [11, 45, 15, 31, 46, 16],
                  [7, 146, 116, 7, 147, 117],
                  [21, 73, 45, 7, 74, 46],
                  [1, 53, 23, 37, 54, 24],
                  [19, 45, 15, 26, 46, 16],
                  [5, 145, 115, 10, 146, 116],
                  [19, 75, 47, 10, 76, 48],
                  [15, 54, 24, 25, 55, 25],
                  [23, 45, 15, 25, 46, 16],
                  [13, 145, 115, 3, 146, 116],
                  [2, 74, 46, 29, 75, 47],
                  [42, 54, 24, 1, 55, 25],
                  [23, 45, 15, 28, 46, 16],
                  [17, 145, 115],
                  [10, 74, 46, 23, 75, 47],
                  [10, 54, 24, 35, 55, 25],
                  [19, 45, 15, 35, 46, 16],
                  [17, 145, 115, 1, 146, 116],
                  [14, 74, 46, 21, 75, 47],
                  [29, 54, 24, 19, 55, 25],
                  [11, 45, 15, 46, 46, 16],
                  [13, 145, 115, 6, 146, 116],
                  [14, 74, 46, 23, 75, 47],
                  [44, 54, 24, 7, 55, 25],
                  [59, 46, 16, 1, 47, 17],
                  [12, 151, 121, 7, 152, 122],
                  [12, 75, 47, 26, 76, 48],
                  [39, 54, 24, 14, 55, 25],
                  [22, 45, 15, 41, 46, 16],
                  [6, 151, 121, 14, 152, 122],
                  [6, 75, 47, 34, 76, 48],
                  [46, 54, 24, 10, 55, 25],
                  [2, 45, 15, 64, 46, 16],
                  [17, 152, 122, 4, 153, 123],
                  [29, 74, 46, 14, 75, 47],
                  [49, 54, 24, 10, 55, 25],
                  [24, 45, 15, 46, 46, 16],
                  [4, 152, 122, 18, 153, 123],
                  [13, 74, 46, 32, 75, 47],
                  [48, 54, 24, 14, 55, 25],
                  [42, 45, 15, 32, 46, 16],
                  [20, 147, 117, 4, 148, 118],
                  [40, 75, 47, 7, 76, 48],
                  [43, 54, 24, 22, 55, 25],
                  [10, 45, 15, 67, 46, 16],
                  [19, 148, 118, 6, 149, 119],
                  [18, 75, 47, 31, 76, 48],
                  [34, 54, 24, 34, 55, 25],
                  [20, 45, 15, 61, 46, 16],
                ]),
                t
              );
            })(),
            h = (function () {
              function t() {
                (this.buffer = []), (this.length = 0);
              }
              return (
                (t.prototype.get = function (t) {
                  var e = Math.floor(t / 8);
                  return 1 == ((this.buffer[e] >>> (7 - (t % 8))) & 1);
                }),
                (t.prototype.put = function (t, e) {
                  for (var r = 0; r < e; r++)
                    this.putBit(1 == ((t >>> (e - r - 1)) & 1));
                }),
                (t.prototype.getLengthInBits = function () {
                  return this.length;
                }),
                (t.prototype.putBit = function (t) {
                  var e = Math.floor(this.length / 8);
                  this.buffer.length <= e && this.buffer.push(0),
                    t && (this.buffer[e] |= 128 >>> this.length % 8),
                    this.length++;
                }),
                t
              );
            })(),
            c = [
              [17, 14, 11, 7],
              [32, 26, 20, 14],
              [53, 42, 32, 24],
              [78, 62, 46, 34],
              [106, 84, 60, 44],
              [134, 106, 74, 58],
              [154, 122, 86, 64],
              [192, 152, 108, 84],
              [230, 180, 130, 98],
              [271, 213, 151, 119],
              [321, 251, 177, 137],
              [367, 287, 203, 155],
              [425, 331, 241, 177],
              [458, 362, 258, 194],
              [520, 412, 292, 220],
              [586, 450, 322, 250],
              [644, 504, 364, 280],
              [718, 560, 394, 310],
              [792, 624, 442, 338],
              [858, 666, 482, 382],
              [929, 711, 509, 403],
              [1003, 779, 565, 439],
              [1091, 857, 611, 461],
              [1171, 911, 661, 511],
              [1273, 997, 715, 535],
              [1367, 1059, 751, 593],
              [1465, 1125, 805, 625],
              [1528, 1190, 868, 658],
              [1628, 1264, 908, 698],
              [1732, 1370, 982, 742],
              [1840, 1452, 1030, 790],
              [1952, 1538, 1112, 842],
              [2068, 1628, 1168, 898],
              [2188, 1722, 1228, 958],
              [2303, 1809, 1283, 983],
              [2431, 1911, 1351, 1051],
              [2563, 1989, 1423, 1093],
              [2699, 2099, 1499, 1139],
              [2809, 2213, 1579, 1219],
              [2953, 2331, 1663, 1273],
            ];
        },
        137: (t, e, r) => {
          var o = r(110),
            n = r(970);
          function i() {
            (this.page = -1), (this.pages = []), this.newPage();
          }
          (i.pageSize = 4096), (i.charMap = {});
          for (var a = 0; a < 256; a++) i.charMap[a] = String.fromCharCode(a);
          function s(t, e) {
            (this.width = ~~t),
              (this.height = ~~e),
              (this.transparent = null),
              (this.transIndex = 0),
              (this.repeat = -1),
              (this.delay = 0),
              (this.image = null),
              (this.pixels = null),
              (this.indexedPixels = null),
              (this.colorDepth = null),
              (this.colorTab = null),
              (this.neuQuant = null),
              (this.usedEntry = new Array()),
              (this.palSize = 7),
              (this.dispose = -1),
              (this.firstFrame = !0),
              (this.sample = 10),
              (this.dither = !1),
              (this.globalPalette = !1),
              (this.out = new i());
          }
          (i.prototype.newPage = function () {
            (this.pages[++this.page] = new Uint8Array(i.pageSize)),
              (this.cursor = 0);
          }),
            (i.prototype.getData = function () {
              for (var t = "", e = 0; e < this.pages.length; e++)
                for (var r = 0; r < i.pageSize; r++)
                  t += i.charMap[this.pages[e][r]];
              return t;
            }),
            (i.prototype.toFlattenUint8Array = function () {
              const t = [];
              for (var e = 0; e < this.pages.length; e++)
                if (e === this.pages.length - 1) {
                  const r = Uint8Array.from(
                    this.pages[e].slice(0, this.cursor)
                  );
                  t.push(r);
                } else t.push(this.pages[e]);
              const r = new Uint8Array(t.reduce((t, e) => t + e.length, 0));
              return t.reduce((t, e) => (r.set(e, t), t + e.length), 0), r;
            }),
            (i.prototype.writeByte = function (t) {
              this.cursor >= i.pageSize && this.newPage(),
                (this.pages[this.page][this.cursor++] = t);
            }),
            (i.prototype.writeUTFBytes = function (t) {
              for (var e = t.length, r = 0; r < e; r++)
                this.writeByte(t.charCodeAt(r));
            }),
            (i.prototype.writeBytes = function (t, e, r) {
              for (var o = r || t.length, n = e || 0; n < o; n++)
                this.writeByte(t[n]);
            }),
            (s.prototype.setDelay = function (t) {
              this.delay = Math.round(t / 10);
            }),
            (s.prototype.setFrameRate = function (t) {
              this.delay = Math.round(100 / t);
            }),
            (s.prototype.setDispose = function (t) {
              t >= 0 && (this.dispose = t);
            }),
            (s.prototype.setRepeat = function (t) {
              this.repeat = t;
            }),
            (s.prototype.setTransparent = function (t) {
              this.transparent = t;
            }),
            (s.prototype.addFrame = function (t) {
              (this.image = t),
                (this.colorTab =
                  this.globalPalette && this.globalPalette.slice
                    ? this.globalPalette
                    : null),
                this.getImagePixels(),
                this.analyzePixels(),
                !0 === this.globalPalette &&
                  (this.globalPalette = this.colorTab),
                this.firstFrame &&
                  (this.writeHeader(),
                  this.writeLSD(),
                  this.writePalette(),
                  this.repeat >= 0 && this.writeNetscapeExt()),
                this.writeGraphicCtrlExt(),
                this.writeImageDesc(),
                this.firstFrame || this.globalPalette || this.writePalette(),
                this.writePixels(),
                (this.firstFrame = !1);
            }),
            (s.prototype.finish = function () {
              this.out.writeByte(59);
            }),
            (s.prototype.setQuality = function (t) {
              t < 1 && (t = 1), (this.sample = t);
            }),
            (s.prototype.setDither = function (t) {
              !0 === t && (t = "FloydSteinberg"), (this.dither = t);
            }),
            (s.prototype.setGlobalPalette = function (t) {
              this.globalPalette = t;
            }),
            (s.prototype.getGlobalPalette = function () {
              return (
                (this.globalPalette &&
                  this.globalPalette.slice &&
                  this.globalPalette.slice(0)) ||
                this.globalPalette
              );
            }),
            (s.prototype.writeHeader = function () {
              this.out.writeUTFBytes("GIF89a");
            }),
            (s.prototype.analyzePixels = function () {
              this.colorTab ||
                ((this.neuQuant = new o(this.pixels, this.sample)),
                this.neuQuant.buildColormap(),
                (this.colorTab = this.neuQuant.getColormap())),
                this.dither
                  ? this.ditherPixels(
                      this.dither.replace("-serpentine", ""),
                      null !== this.dither.match(/-serpentine/)
                    )
                  : this.indexPixels(),
                (this.pixels = null),
                (this.colorDepth = 8),
                (this.palSize = 7),
                null !== this.transparent &&
                  (this.transIndex = this.findClosest(this.transparent, !0));
            }),
            (s.prototype.indexPixels = function (t) {
              var e = this.pixels.length / 3;
              this.indexedPixels = new Uint8Array(e);
              for (var r = 0, o = 0; o < e; o++) {
                var n = this.findClosestRGB(
                  255 & this.pixels[r++],
                  255 & this.pixels[r++],
                  255 & this.pixels[r++]
                );
                (this.usedEntry[n] = !0), (this.indexedPixels[o] = n);
              }
            }),
            (s.prototype.ditherPixels = function (t, e) {
              var r = {
                FalseFloydSteinberg: [
                  [3 / 8, 1, 0],
                  [3 / 8, 0, 1],
                  [2 / 8, 1, 1],
                ],
                FloydSteinberg: [
                  [7 / 16, 1, 0],
                  [3 / 16, -1, 1],
                  [5 / 16, 0, 1],
                  [1 / 16, 1, 1],
                ],
                Stucki: [
                  [8 / 42, 1, 0],
                  [4 / 42, 2, 0],
                  [2 / 42, -2, 1],
                  [4 / 42, -1, 1],
                  [8 / 42, 0, 1],
                  [4 / 42, 1, 1],
                  [2 / 42, 2, 1],
                  [1 / 42, -2, 2],
                  [2 / 42, -1, 2],
                  [4 / 42, 0, 2],
                  [2 / 42, 1, 2],
                  [1 / 42, 2, 2],
                ],
                Atkinson: [
                  [1 / 8, 1, 0],
                  [1 / 8, 2, 0],
                  [1 / 8, -1, 1],
                  [1 / 8, 0, 1],
                  [1 / 8, 1, 1],
                  [1 / 8, 0, 2],
                ],
              };
              if (!t || !r[t]) throw "Unknown dithering kernel: " + t;
              var o = r[t],
                n = 0,
                i = this.height,
                a = this.width,
                s = this.pixels,
                l = e ? -1 : 1;
              this.indexedPixels = new Uint8Array(this.pixels.length / 3);
              for (var u = 0; u < i; u++) {
                e && (l *= -1);
                for (
                  var h = 1 == l ? 0 : a - 1, c = 1 == l ? a : 0;
                  h !== c;
                  h += l
                ) {
                  var f = 3 * (n = u * a + h),
                    d = s[f],
                    p = s[f + 1],
                    g = s[f + 2];
                  (f = this.findClosestRGB(d, p, g)),
                    (this.usedEntry[f] = !0),
                    (this.indexedPixels[n] = f),
                    (f *= 3);
                  for (
                    var m = d - this.colorTab[f],
                      v = p - this.colorTab[f + 1],
                      y = g - this.colorTab[f + 2],
                      w = 1 == l ? 0 : o.length - 1,
                      b = 1 == l ? o.length : 0;
                    w !== b;
                    w += l
                  ) {
                    var C = o[w][1],
                      B = o[w][2];
                    if (C + h >= 0 && C + h < a && B + u >= 0 && B + u < i) {
                      var P = o[w][0];
                      (f = n + C + B * a),
                        (s[(f *= 3)] = Math.max(
                          0,
                          Math.min(255, s[f] + m * P)
                        )),
                        (s[f + 1] = Math.max(
                          0,
                          Math.min(255, s[f + 1] + v * P)
                        )),
                        (s[f + 2] = Math.max(
                          0,
                          Math.min(255, s[f + 2] + y * P)
                        ));
                    }
                  }
                }
              }
            }),
            (s.prototype.findClosest = function (t, e) {
              return this.findClosestRGB(
                (16711680 & t) >> 16,
                (65280 & t) >> 8,
                255 & t,
                e
              );
            }),
            (s.prototype.findClosestRGB = function (t, e, r, o) {
              if (null === this.colorTab) return -1;
              if (this.neuQuant && !o) return this.neuQuant.lookupRGB(t, e, r);
              for (
                var n = 0, i = 16777216, a = this.colorTab.length, s = 0, l = 0;
                s < a;
                l++
              ) {
                var u = t - (255 & this.colorTab[s++]),
                  h = e - (255 & this.colorTab[s++]),
                  c = r - (255 & this.colorTab[s++]),
                  f = u * u + h * h + c * c;
                (!o || this.usedEntry[l]) && f < i && ((i = f), (n = l));
              }
              return n;
            }),
            (s.prototype.getImagePixels = function () {
              var t = this.width,
                e = this.height;
              this.pixels = new Uint8Array(t * e * 3);
              for (var r = this.image, o = 0, n = 0, i = 0; i < e; i++)
                for (var a = 0; a < t; a++)
                  (this.pixels[n++] = r[o++]),
                    (this.pixels[n++] = r[o++]),
                    (this.pixels[n++] = r[o++]),
                    o++;
            }),
            (s.prototype.writeGraphicCtrlExt = function () {
              var t, e;
              this.out.writeByte(33),
                this.out.writeByte(249),
                this.out.writeByte(4),
                null === this.transparent
                  ? ((t = 0), (e = 0))
                  : ((t = 1), (e = 2)),
                this.dispose >= 0 && (e = 7 & this.dispose),
                (e <<= 2),
                this.out.writeByte(0 | e | t),
                this.writeShort(this.delay),
                this.out.writeByte(this.transIndex),
                this.out.writeByte(0);
            }),
            (s.prototype.writeImageDesc = function () {
              this.out.writeByte(44),
                this.writeShort(0),
                this.writeShort(0),
                this.writeShort(this.width),
                this.writeShort(this.height),
                this.firstFrame || this.globalPalette
                  ? this.out.writeByte(0)
                  : this.out.writeByte(128 | this.palSize);
            }),
            (s.prototype.writeLSD = function () {
              this.writeShort(this.width),
                this.writeShort(this.height),
                this.out.writeByte(240 | this.palSize),
                this.out.writeByte(0),
                this.out.writeByte(0);
            }),
            (s.prototype.writeNetscapeExt = function () {
              this.out.writeByte(33),
                this.out.writeByte(255),
                this.out.writeByte(11),
                this.out.writeUTFBytes("NETSCAPE2.0"),
                this.out.writeByte(3),
                this.out.writeByte(1),
                this.writeShort(this.repeat),
                this.out.writeByte(0);
            }),
            (s.prototype.writePalette = function () {
              this.out.writeBytes(this.colorTab);
              for (var t = 768 - this.colorTab.length, e = 0; e < t; e++)
                this.out.writeByte(0);
            }),
            (s.prototype.writeShort = function (t) {
              this.out.writeByte(255 & t), this.out.writeByte((t >> 8) & 255);
            }),
            (s.prototype.writePixels = function () {
              new n(
                this.width,
                this.height,
                this.indexedPixels,
                this.colorDepth
              ).encode(this.out);
            }),
            (s.prototype.stream = function () {
              return this.out;
            }),
            (t.exports = s);
        },
        970: (t) => {
          var e = 5003,
            r = [
              0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191,
              16383, 32767, 65535,
            ];
          t.exports = function (t, o, n, i) {
            var a,
              s,
              l,
              u,
              h,
              c,
              f,
              d,
              p,
              g = Math.max(2, i),
              m = new Uint8Array(256),
              v = new Int32Array(e),
              y = new Int32Array(e),
              w = 0,
              b = 0,
              C = !1;
            function B(t, e) {
              (m[s++] = t), s >= 254 && A(e);
            }
            function P(t) {
              x(e), (b = h + 2), (C = !0), k(h, t);
            }
            function x(t) {
              for (var e = 0; e < t; ++e) v[e] = -1;
            }
            function A(t) {
              s > 0 && (t.writeByte(s), t.writeBytes(m, 0, s), (s = 0));
            }
            function E(t) {
              return (1 << t) - 1;
            }
            function R() {
              return 0 === f ? -1 : (--f, 255 & n[d++]);
            }
            function k(t, e) {
              for (a &= r[w], w > 0 ? (a |= t << w) : (a = t), w += p; w >= 8; )
                B(255 & a, e), (a >>= 8), (w -= 8);
              if (
                ((b > l || C) &&
                  (C
                    ? ((l = E((p = u))), (C = !1))
                    : (++p, (l = 12 == p ? 4096 : E(p)))),
                t == c)
              ) {
                for (; w > 0; ) B(255 & a, e), (a >>= 8), (w -= 8);
                A(e);
              }
            }
            this.encode = function (r) {
              r.writeByte(g),
                (f = t * o),
                (d = 0),
                (function (t, r) {
                  var o, n, i, a, f, d;
                  for (
                    C = !1,
                      l = E((p = u = t)),
                      c = 1 + (h = 1 << (t - 1)),
                      b = h + 2,
                      s = 0,
                      a = R(),
                      d = 0,
                      o = e;
                    o < 65536;
                    o *= 2
                  )
                    ++d;
                  (d = 8 - d), x(e), k(h, r);
                  t: for (; -1 != (n = R()); )
                    if (((o = (n << 12) + a), v[(i = (n << d) ^ a)] !== o)) {
                      if (v[i] >= 0) {
                        (f = 5003 - i), 0 === i && (f = 1);
                        do {
                          if (((i -= f) < 0 && (i += 5003), v[i] === o)) {
                            a = y[i];
                            continue t;
                          }
                        } while (v[i] >= 0);
                      }
                      k(a, r),
                        (a = n),
                        b < 4096 ? ((y[i] = b++), (v[i] = o)) : P(r);
                    } else a = y[i];
                  k(a, r), k(c, r);
                })(g + 1, r),
                r.writeByte(0);
            };
          };
        },
        110: (t) => {
          var e = 256,
            r = 1024,
            o = 1 << 18;
          t.exports = function (t, n) {
            var i, a, s, l, u;
            function h(t, e, o, n, a) {
              (i[e][0] -= (t * (i[e][0] - o)) / r),
                (i[e][1] -= (t * (i[e][1] - n)) / r),
                (i[e][2] -= (t * (i[e][2] - a)) / r);
            }
            function c(t, r, n, a, s) {
              for (
                var l,
                  h,
                  c = Math.abs(r - t),
                  f = Math.min(r + t, e),
                  d = r + 1,
                  p = r - 1,
                  g = 1;
                d < f || p > c;

              )
                (h = u[g++]),
                  d < f &&
                    (((l = i[d++])[0] -= (h * (l[0] - n)) / o),
                    (l[1] -= (h * (l[1] - a)) / o),
                    (l[2] -= (h * (l[2] - s)) / o)),
                  p > c &&
                    (((l = i[p--])[0] -= (h * (l[0] - n)) / o),
                    (l[1] -= (h * (l[1] - a)) / o),
                    (l[2] -= (h * (l[2] - s)) / o));
            }
            function f(t, r, o) {
              var n,
                a,
                u,
                h,
                c,
                f = ~(1 << 31),
                d = f,
                p = -1,
                g = p;
              for (n = 0; n < e; n++)
                (a = i[n]),
                  (u =
                    Math.abs(a[0] - t) +
                    Math.abs(a[1] - r) +
                    Math.abs(a[2] - o)) < f && ((f = u), (p = n)),
                  (h = u - (s[n] >> 12)) < d && ((d = h), (g = n)),
                  (c = l[n] >> 10),
                  (l[n] -= c),
                  (s[n] += c << 10);
              return (l[p] += 64), (s[p] -= 65536), g;
            }
            (this.buildColormap = function () {
              !(function () {
                var t, r;
                for (
                  i = [],
                    a = new Int32Array(256),
                    s = new Int32Array(e),
                    l = new Int32Array(e),
                    u = new Int32Array(32),
                    t = 0;
                  t < e;
                  t++
                )
                  (r = (t << 12) / e),
                    (i[t] = new Float64Array([r, r, r, 0])),
                    (l[t] = 256),
                    (s[t] = 0);
              })(),
                (function () {
                  var e,
                    o,
                    i,
                    a,
                    s,
                    l,
                    d = t.length,
                    p = 30 + (n - 1) / 3,
                    g = d / (3 * n),
                    m = ~~(g / 100),
                    v = r,
                    y = 2048,
                    w = y >> 6;
                  for (w <= 1 && (w = 0), e = 0; e < w; e++)
                    u[e] = v * ((256 * (w * w - e * e)) / (w * w));
                  d < 1509
                    ? ((n = 1), (o = 3))
                    : (o =
                        d % 499 != 0
                          ? 1497
                          : d % 491 != 0
                          ? 1473
                          : d % 487 != 0
                          ? 1461
                          : 1509);
                  var b = 0;
                  for (e = 0; e < g; )
                    if (
                      (h(
                        v,
                        (l = f(
                          (i = (255 & t[b]) << 4),
                          (a = (255 & t[b + 1]) << 4),
                          (s = (255 & t[b + 2]) << 4)
                        )),
                        i,
                        a,
                        s
                      ),
                      0 !== w && c(w, l, i, a, s),
                      (b += o) >= d && (b -= d),
                      0 === m && (m = 1),
                      ++e % m == 0)
                    )
                      for (
                        v -= v / p,
                          (w = (y -= y / 30) >> 6) <= 1 && (w = 0),
                          l = 0;
                        l < w;
                        l++
                      )
                        u[l] = v * ((256 * (w * w - l * l)) / (w * w));
                })(),
                (function () {
                  for (var t = 0; t < e; t++)
                    (i[t][0] >>= 4),
                      (i[t][1] >>= 4),
                      (i[t][2] >>= 4),
                      (i[t][3] = t);
                })(),
                (function () {
                  var t,
                    r,
                    o,
                    n,
                    s,
                    l,
                    u = 0,
                    h = 0;
                  for (t = 0; t < e; t++) {
                    for (s = t, l = (o = i[t])[1], r = t + 1; r < e; r++)
                      (n = i[r])[1] < l && ((s = r), (l = n[1]));
                    if (
                      ((n = i[s]),
                      t != s &&
                        ((r = n[0]),
                        (n[0] = o[0]),
                        (o[0] = r),
                        (r = n[1]),
                        (n[1] = o[1]),
                        (o[1] = r),
                        (r = n[2]),
                        (n[2] = o[2]),
                        (o[2] = r),
                        (r = n[3]),
                        (n[3] = o[3]),
                        (o[3] = r)),
                      l != u)
                    ) {
                      for (a[u] = (h + t) >> 1, r = u + 1; r < l; r++) a[r] = t;
                      (u = l), (h = t);
                    }
                  }
                  for (a[u] = (h + 255) >> 1, r = u + 1; r < 256; r++)
                    a[r] = 255;
                })();
            }),
              (this.getColormap = function () {
                for (var t = [], r = [], o = 0; o < e; o++) r[i[o][3]] = o;
                for (var n = 0, a = 0; a < e; a++) {
                  var s = r[a];
                  (t[n++] = i[s][0]), (t[n++] = i[s][1]), (t[n++] = i[s][2]);
                }
                return t;
              }),
              (this.lookupRGB = function (t, r, o) {
                for (
                  var n, s, l, u = 1e3, h = -1, c = a[r], f = c - 1;
                  c < e || f >= 0;

                )
                  c < e &&
                    ((l = (s = i[c])[1] - r) >= u
                      ? (c = e)
                      : (c++,
                        l < 0 && (l = -l),
                        (n = s[0] - t) < 0 && (n = -n),
                        (l += n) < u &&
                          ((n = s[2] - o) < 0 && (n = -n),
                          (l += n) < u && ((u = l), (h = s[3]))))),
                    f >= 0 &&
                      ((l = r - (s = i[f])[1]) >= u
                        ? (f = -1)
                        : (f--,
                          l < 0 && (l = -l),
                          (n = s[0] - t) < 0 && (n = -n),
                          (l += n) < u &&
                            ((n = s[2] - o) < 0 && (n = -n),
                            (l += n) < u && ((u = l), (h = s[3])))));
                return h;
              });
          };
        },
        952: (t, e, r) => {
          "use strict";
          r.r(e),
            r.d(e, {
              decompressFrame: () => s,
              decompressFrames: () => l,
              parseGIF: () => a,
            });
          var o = r(323),
            n = r(662),
            i = r(58);
          const a = (t) => {
              const e = new Uint8Array(t);
              return (0, n.parse)((0, i.buildStream)(e), o.Z);
            },
            s = (t, e, r) => {
              if (!t.image)
                return void console.warn(
                  "gif frame does not have associated image."
                );
              const { image: o } = t,
                n = o.descriptor.width * o.descriptor.height;
              var i = ((t, e, r) => {
                const o = 4096,
                  n = r;
                var i, a, s, l, u, h, c, f, d, p;
                const g = new Array(r),
                  m = new Array(o),
                  v = new Array(o),
                  y = new Array(4097);
                for (
                  u = 1 + (a = 1 << (p = t)),
                    i = a + 2,
                    c = -1,
                    s = (1 << (l = p + 1)) - 1,
                    f = 0;
                  f < a;
                  f++
                )
                  (m[f] = 0), (v[f] = f);
                var w, b, C, B, P, x;
                for (w = b = C = B = P = x = 0, d = 0; d < n; ) {
                  if (0 === B) {
                    if (b < l) {
                      (w += e[x] << b), (b += 8), x++;
                      continue;
                    }
                    if (((f = w & s), (w >>= l), (b -= l), f > i || f == u))
                      break;
                    if (f == a) {
                      (s = (1 << (l = p + 1)) - 1), (i = a + 2), (c = -1);
                      continue;
                    }
                    if (-1 == c) {
                      (y[B++] = v[f]), (c = f), (C = f);
                      continue;
                    }
                    for (h = f, f == i && ((y[B++] = C), (f = c)); f > a; )
                      (y[B++] = v[f]), (f = m[f]);
                    (C = 255 & v[f]),
                      (y[B++] = C),
                      i < o &&
                        ((m[i] = c),
                        (v[i] = C),
                        0 == (++i & s) && i < o && (l++, (s += i))),
                      (c = h);
                  }
                  B--, (g[P++] = y[B]), d++;
                }
                for (d = P; d < n; d++) g[d] = 0;
                return g;
              })(o.data.minCodeSize, o.data.blocks, n);
              o.descriptor.lct.interlaced &&
                (i = ((t, e) => {
                  const r = new Array(t.length),
                    o = t.length / e,
                    n = function (o, n) {
                      const i = t.slice(n * e, (n + 1) * e);
                      r.splice.apply(r, [o * e, e].concat(i));
                    },
                    i = [0, 4, 2, 1],
                    a = [8, 8, 4, 2];
                  for (var s = 0, l = 0; l < 4; l++)
                    for (var u = i[l]; u < o; u += a[l]) n(u, s), s++;
                  return r;
                })(i, o.descriptor.width));
              const a = {
                pixels: i,
                dims: {
                  top: t.image.descriptor.top,
                  left: t.image.descriptor.left,
                  width: t.image.descriptor.width,
                  height: t.image.descriptor.height,
                },
              };
              return (
                o.descriptor.lct && o.descriptor.lct.exists
                  ? (a.colorTable = o.lct)
                  : (a.colorTable = e),
                t.gce &&
                  ((a.delay = 10 * (t.gce.delay || 10)),
                  (a.disposalType = t.gce.extras.disposal),
                  t.gce.extras.transparentColorGiven &&
                    (a.transparentIndex = t.gce.transparentColorIndex)),
                r &&
                  (a.patch = ((t) => {
                    const e = t.pixels.length,
                      r = new Uint8ClampedArray(4 * e);
                    for (var o = 0; o < e; o++) {
                      const e = 4 * o,
                        n = t.pixels[o],
                        i = t.colorTable[n];
                      (r[e] = i[0]),
                        (r[e + 1] = i[1]),
                        (r[e + 2] = i[2]),
                        (r[e + 3] = n !== t.transparentIndex ? 255 : 0);
                    }
                    return r;
                  })(a)),
                a
              );
            },
            l = (t, e) =>
              t.frames.filter((t) => t.image).map((r) => s(r, t.gct, e));
        },
      },
      e = {};
    function r(o) {
      var n = e[o];
      if (void 0 !== n) return n.exports;
      var i = (e[o] = { exports: {} });
      return t[o].call(i.exports, i, i.exports, r), i.exports;
    }
    return (
      (r.d = (t, e) => {
        for (var o in e)
          r.o(e, o) &&
            !r.o(t, o) &&
            Object.defineProperty(t, o, { enumerable: !0, get: e[o] });
      }),
      (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (r.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      r(642)
    );
  })();
});

window.AwesomeQR = window.AwesomeQR.AwesomeQR;
