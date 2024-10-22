import kt, { useRef as Re, useEffect as yt, createElement as Ke, useState as Ae, useMemo as De, useCallback as pe } from "react";
const g = {
  elClassPrefix: "acrool-react-datepicker"
}, u = {
  root: `${g.elClassPrefix}__root`,
  dateYearMonthRow: `${g.elClassPrefix}__date-year-month-row`,
  dateYearMonth: `${g.elClassPrefix}__date-year-month`,
  dateYearGroup: `${g.elClassPrefix}__date-year-group`,
  dateYear: `${g.elClassPrefix}__date-year`,
  dateMonthGroup: `${g.elClassPrefix}__date-month-group`,
  dateMonth: `${g.elClassPrefix}__date-month`,
  dateMonthSelect: `${g.elClassPrefix}__date-month-select`,
  dateYearSelect: `${g.elClassPrefix}__date-year-select`,
  dateChangeControl: `${g.elClassPrefix}__date-change-control`,
  dateMonthButton: `${g.elClassPrefix}__date-month-button`,
  dateDayContent: `${g.elClassPrefix}__date-day-content`,
  dateDayRow: `${g.elClassPrefix}__date-day-row`,
  datePreDay: `${g.elClassPrefix}__date-pre-day`,
  dateDay: `${g.elClassPrefix}__date-day`,
  dateWeek: `${g.elClassPrefix}__date-week`,
  dateWeekRow: `${g.elClassPrefix}__date-week-row`,
  dateWeekMask: `${g.elClassPrefix}__date-week-mask`,
  dateLabelCheckCardCreate: `${g.elClassPrefix}__date-label-check-card-create`,
  dateTodayButton: `${g.elClassPrefix}__date-today-button`,
  dateRoot: `${g.elClassPrefix}__date-root`,
  dateRangeRoot: `${g.elClassPrefix}__date-range-root`,
  dateRangeButton: `${g.elClassPrefix}__date-range-button`,
  dateRangeLabelCheckCardCreate: `${g.elClassPrefix}__date-range-label-check-card-create`,
  dateTimeRoot: `${g.elClassPrefix}__date-time-root`,
  dateTimeGroup: `${g.elClassPrefix}__date-time-group`,
  dateTime2Root: `${g.elClassPrefix}__date-time2-root`,
  dateTime2Group: `${g.elClassPrefix}__date-time2-group`,
  timeRoot: `${g.elClassPrefix}__time-root`,
  timeHeader: `${g.elClassPrefix}__time-header`,
  timeHeaderText: `${g.elClassPrefix}__time-header-text`,
  timePickContainer: `${g.elClassPrefix}__time-pick-container`,
  timeFakeSelectContainer: `${g.elClassPrefix}__time-fake-select-container`,
  timeSelectBox: `${g.elClassPrefix}__time-select-box`,
  timeFakeOption: `${g.elClassPrefix}__time-fake-option`,
  timeButtonContainer: `${g.elClassPrefix}__time-button-container`,
  timeConfirmButton: `${g.elClassPrefix}__time-confirm-button`,
  timeNowButton: `${g.elClassPrefix}__time-now-button`,
  time2Root: `${g.elClassPrefix}__time2-root`,
  time2Header: `${g.elClassPrefix}__time2-header`,
  time2HeaderText: `${g.elClassPrefix}__time2-header-text`,
  time2HeaderTimeStr: `${g.elClassPrefix}__time2-header-time-str`,
  time2InputGroup: `${g.elClassPrefix}__time2-input-group`,
  time2PickContainer: `${g.elClassPrefix}__time2-pick-container`,
  time2FakeSelectContainer: `${g.elClassPrefix}__time2-fake-select-container`,
  time2SelectBox: `${g.elClassPrefix}__time2-select-box`,
  time2FakeOption: `${g.elClassPrefix}__time2-fake-option`,
  time2ButtonContainer: `${g.elClassPrefix}__time2-button-container`,
  time2ConfirmButton: `${g.elClassPrefix}__time2-confirm-button`,
  time2NowButton: `${g.elClassPrefix}__time2-now-button`
};
var Lt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, r = {}, It = {
  get exports() {
    return r;
  },
  set exports(t) {
    r = t;
  }
}, Ne = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ut;
function Vt() {
  if (ut)
    return Ne;
  ut = 1;
  var t = kt, m = Symbol.for("react.element"), n = Symbol.for("react.fragment"), l = Object.prototype.hasOwnProperty, y = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, O = { key: !0, ref: !0, __self: !0, __source: !0 };
  function V(M, w, P) {
    var b, _ = {}, S = null, x = null;
    P !== void 0 && (S = "" + P), w.key !== void 0 && (S = "" + w.key), w.ref !== void 0 && (x = w.ref);
    for (b in w)
      l.call(w, b) && !O.hasOwnProperty(b) && (_[b] = w[b]);
    if (M && M.defaultProps)
      for (b in w = M.defaultProps, w)
        _[b] === void 0 && (_[b] = w[b]);
    return { $$typeof: m, type: M, key: S, ref: x, props: _, _owner: y.current };
  }
  return Ne.Fragment = n, Ne.jsx = V, Ne.jsxs = V, Ne;
}
var Se = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lt;
function Ut() {
  return lt || (lt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = kt, m = Symbol.for("react.element"), n = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), V = Symbol.for("react.provider"), M = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), R = Symbol.iterator, j = "@@iterator";
    function $(e) {
      if (e === null || typeof e != "object")
        return null;
      var s = R && e[R] || e[j];
      return typeof s == "function" ? s : null;
    }
    var D = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Y(e) {
      {
        for (var s = arguments.length, f = new Array(s > 1 ? s - 1 : 0), N = 1; N < s; N++)
          f[N - 1] = arguments[N];
        U("error", e, f);
      }
    }
    function U(e, s, f) {
      {
        var N = D.ReactDebugCurrentFrame, G = N.getStackAddendum();
        G !== "" && (s += "%s", f = f.concat([G]));
        var z = f.map(function(I) {
          return String(I);
        });
        z.unshift("Warning: " + s), Function.prototype.apply.call(console[e], console, z);
      }
    }
    var q = !1, Z = !1, E = !1, ee = !1, H = !1, X;
    X = Symbol.for("react.module.reference");
    function T(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === l || e === O || H || e === y || e === P || e === b || ee || e === x || q || Z || E || typeof e == "object" && e !== null && (e.$$typeof === S || e.$$typeof === _ || e.$$typeof === V || e.$$typeof === M || e.$$typeof === w || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === X || e.getModuleId !== void 0));
    }
    function p(e, s, f) {
      var N = e.displayName;
      if (N)
        return N;
      var G = s.displayName || s.name || "";
      return G !== "" ? f + "(" + G + ")" : f;
    }
    function F(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && Y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case l:
          return "Fragment";
        case n:
          return "Portal";
        case O:
          return "Profiler";
        case y:
          return "StrictMode";
        case P:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case M:
            var s = e;
            return F(s) + ".Consumer";
          case V:
            var f = e;
            return F(f._context) + ".Provider";
          case w:
            return p(e, e.render, "ForwardRef");
          case _:
            var N = e.displayName || null;
            return N !== null ? N : k(e.type) || "Memo";
          case S: {
            var G = e, z = G._payload, I = G._init;
            try {
              return k(I(z));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var c = Object.assign, a = 0, o, d, i, h, v, W, A;
    function C() {
    }
    C.__reactDisabledLog = !0;
    function L() {
      {
        if (a === 0) {
          o = console.log, d = console.info, i = console.warn, h = console.error, v = console.group, W = console.groupCollapsed, A = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: C,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        a++;
      }
    }
    function J() {
      {
        if (a--, a === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: c({}, e, {
              value: o
            }),
            info: c({}, e, {
              value: d
            }),
            warn: c({}, e, {
              value: i
            }),
            error: c({}, e, {
              value: h
            }),
            group: c({}, e, {
              value: v
            }),
            groupCollapsed: c({}, e, {
              value: W
            }),
            groupEnd: c({}, e, {
              value: A
            })
          });
        }
        a < 0 && Y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var oe = D.ReactCurrentDispatcher, ce;
    function le(e, s, f) {
      {
        if (ce === void 0)
          try {
            throw Error();
          } catch (G) {
            var N = G.stack.trim().match(/\n( *(at )?)/);
            ce = N && N[1] || "";
          }
        return `
` + ce + e;
      }
    }
    var de = !1, re;
    {
      var me = typeof WeakMap == "function" ? WeakMap : Map;
      re = new me();
    }
    function ye(e, s) {
      if (!e || de)
        return "";
      {
        var f = re.get(e);
        if (f !== void 0)
          return f;
      }
      var N;
      de = !0;
      var G = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var z;
      z = oe.current, oe.current = null, L();
      try {
        if (s) {
          var I = function() {
            throw Error();
          };
          if (Object.defineProperty(I.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(I, []);
            } catch (he) {
              N = he;
            }
            Reflect.construct(e, [], I);
          } else {
            try {
              I.call();
            } catch (he) {
              N = he;
            }
            e.call(I.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (he) {
            N = he;
          }
          e();
        }
      } catch (he) {
        if (he && N && typeof he.stack == "string") {
          for (var B = he.stack.split(`
`), ae = N.stack.split(`
`), Q = B.length - 1, te = ae.length - 1; Q >= 1 && te >= 0 && B[Q] !== ae[te]; )
            te--;
          for (; Q >= 1 && te >= 0; Q--, te--)
            if (B[Q] !== ae[te]) {
              if (Q !== 1 || te !== 1)
                do
                  if (Q--, te--, te < 0 || B[Q] !== ae[te]) {
                    var ie = `
` + B[Q].replace(" at new ", " at ");
                    return e.displayName && ie.includes("<anonymous>") && (ie = ie.replace("<anonymous>", e.displayName)), typeof e == "function" && re.set(e, ie), ie;
                  }
                while (Q >= 1 && te >= 0);
              break;
            }
        }
      } finally {
        de = !1, oe.current = z, J(), Error.prepareStackTrace = G;
      }
      var we = e ? e.displayName || e.name : "", dt = we ? le(we) : "";
      return typeof e == "function" && re.set(e, dt), dt;
    }
    function xe(e, s, f) {
      return ye(e, !1);
    }
    function gt(e) {
      var s = e.prototype;
      return !!(s && s.isReactComponent);
    }
    function Pe(e, s, f) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ye(e, gt(e));
      if (typeof e == "string")
        return le(e);
      switch (e) {
        case P:
          return le("Suspense");
        case b:
          return le("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case w:
            return xe(e.render);
          case _:
            return Pe(e.type, s, f);
          case S: {
            var N = e, G = N._payload, z = N._init;
            try {
              return Pe(z(G), s, f);
            } catch {
            }
          }
        }
      return "";
    }
    var Ye = Object.prototype.hasOwnProperty, Ze = {}, Xe = D.ReactDebugCurrentFrame;
    function Ee(e) {
      if (e) {
        var s = e._owner, f = Pe(e.type, e._source, s ? s.type : null);
        Xe.setExtraStackFrame(f);
      } else
        Xe.setExtraStackFrame(null);
    }
    function wt(e, s, f, N, G) {
      {
        var z = Function.call.bind(Ye);
        for (var I in e)
          if (z(e, I)) {
            var B = void 0;
            try {
              if (typeof e[I] != "function") {
                var ae = Error((N || "React class") + ": " + f + " type `" + I + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[I] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ae.name = "Invariant Violation", ae;
              }
              B = e[I](s, I, N, f, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Q) {
              B = Q;
            }
            B && !(B instanceof Error) && (Ee(G), Y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", N || "React class", f, I, typeof B), Ee(null)), B instanceof Error && !(B.message in Ze) && (Ze[B.message] = !0, Ee(G), Y("Failed %s type: %s", f, B.message), Ee(null));
          }
      }
    }
    var Dt = Array.isArray;
    function Fe(e) {
      return Dt(e);
    }
    function bt(e) {
      {
        var s = typeof Symbol == "function" && Symbol.toStringTag, f = s && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return f;
      }
    }
    function $t(e) {
      try {
        return Qe(e), !1;
      } catch {
        return !0;
      }
    }
    function Qe(e) {
      return "" + e;
    }
    function et(e) {
      if ($t(e))
        return Y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", bt(e)), Qe(e);
    }
    var Te = D.ReactCurrentOwner, Ct = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, tt, rt, Le;
    Le = {};
    function Tt(e) {
      if (Ye.call(e, "ref")) {
        var s = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Nt(e) {
      if (Ye.call(e, "key")) {
        var s = Object.getOwnPropertyDescriptor(e, "key").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function St(e, s) {
      if (typeof e.ref == "string" && Te.current && s && Te.current.stateNode !== s) {
        var f = k(Te.current.type);
        Le[f] || (Y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', k(Te.current.type), e.ref), Le[f] = !0);
      }
    }
    function jt(e, s) {
      {
        var f = function() {
          tt || (tt = !0, Y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        f.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: f,
          configurable: !0
        });
      }
    }
    function Mt(e, s) {
      {
        var f = function() {
          rt || (rt = !0, Y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        f.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: f,
          configurable: !0
        });
      }
    }
    var Rt = function(e, s, f, N, G, z, I) {
      var B = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: m,
        // Built-in properties that belong on the element
        type: e,
        key: s,
        ref: f,
        props: I,
        // Record the component responsible for creating this element.
        _owner: z
      };
      return B._store = {}, Object.defineProperty(B._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(B, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: N
      }), Object.defineProperty(B, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: G
      }), Object.freeze && (Object.freeze(B.props), Object.freeze(B)), B;
    };
    function Pt(e, s, f, N, G) {
      {
        var z, I = {}, B = null, ae = null;
        f !== void 0 && (et(f), B = "" + f), Nt(s) && (et(s.key), B = "" + s.key), Tt(s) && (ae = s.ref, St(s, G));
        for (z in s)
          Ye.call(s, z) && !Ct.hasOwnProperty(z) && (I[z] = s[z]);
        if (e && e.defaultProps) {
          var Q = e.defaultProps;
          for (z in Q)
            I[z] === void 0 && (I[z] = Q[z]);
        }
        if (B || ae) {
          var te = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          B && jt(I, te), ae && Mt(I, te);
        }
        return Rt(e, B, ae, G, N, Te.current, I);
      }
    }
    var Ie = D.ReactCurrentOwner, nt = D.ReactDebugCurrentFrame;
    function ge(e) {
      if (e) {
        var s = e._owner, f = Pe(e.type, e._source, s ? s.type : null);
        nt.setExtraStackFrame(f);
      } else
        nt.setExtraStackFrame(null);
    }
    var Ve;
    Ve = !1;
    function Ue(e) {
      return typeof e == "object" && e !== null && e.$$typeof === m;
    }
    function at() {
      {
        if (Ie.current) {
          var e = k(Ie.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function Yt(e) {
      {
        if (e !== void 0) {
          var s = e.fileName.replace(/^.*[\\\/]/, ""), f = e.lineNumber;
          return `

Check your code at ` + s + ":" + f + ".";
        }
        return "";
      }
    }
    var ot = {};
    function Et(e) {
      {
        var s = at();
        if (!s) {
          var f = typeof e == "string" ? e : e.displayName || e.name;
          f && (s = `

Check the top-level render call using <` + f + ">.");
        }
        return s;
      }
    }
    function it(e, s) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var f = Et(s);
        if (ot[f])
          return;
        ot[f] = !0;
        var N = "";
        e && e._owner && e._owner !== Ie.current && (N = " It was passed a child from " + k(e._owner.type) + "."), ge(e), Y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', f, N), ge(null);
      }
    }
    function st(e, s) {
      {
        if (typeof e != "object")
          return;
        if (Fe(e))
          for (var f = 0; f < e.length; f++) {
            var N = e[f];
            Ue(N) && it(N, s);
          }
        else if (Ue(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var G = $(e);
          if (typeof G == "function" && G !== e.entries)
            for (var z = G.call(e), I; !(I = z.next()).done; )
              Ue(I.value) && it(I.value, s);
        }
      }
    }
    function Ot(e) {
      {
        var s = e.type;
        if (s == null || typeof s == "string")
          return;
        var f;
        if (typeof s == "function")
          f = s.propTypes;
        else if (typeof s == "object" && (s.$$typeof === w || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        s.$$typeof === _))
          f = s.propTypes;
        else
          return;
        if (f) {
          var N = k(s);
          wt(f, e.props, "prop", N, e);
        } else if (s.PropTypes !== void 0 && !Ve) {
          Ve = !0;
          var G = k(s);
          Y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", G || "Unknown");
        }
        typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && Y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ht(e) {
      {
        for (var s = Object.keys(e.props), f = 0; f < s.length; f++) {
          var N = s[f];
          if (N !== "children" && N !== "key") {
            ge(e), Y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", N), ge(null);
            break;
          }
        }
        e.ref !== null && (ge(e), Y("Invalid attribute `ref` supplied to `React.Fragment`."), ge(null));
      }
    }
    function ct(e, s, f, N, G, z) {
      {
        var I = T(e);
        if (!I) {
          var B = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (B += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ae = Yt(G);
          ae ? B += ae : B += at();
          var Q;
          e === null ? Q = "null" : Fe(e) ? Q = "array" : e !== void 0 && e.$$typeof === m ? (Q = "<" + (k(e.type) || "Unknown") + " />", B = " Did you accidentally export a JSX literal instead of a component?") : Q = typeof e, Y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Q, B);
        }
        var te = Pt(e, s, f, G, z);
        if (te == null)
          return te;
        if (I) {
          var ie = s.children;
          if (ie !== void 0)
            if (N)
              if (Fe(ie)) {
                for (var we = 0; we < ie.length; we++)
                  st(ie[we], e);
                Object.freeze && Object.freeze(ie);
              } else
                Y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              st(ie, e);
        }
        return e === l ? Ht(te) : Ot(te), te;
      }
    }
    function Wt(e, s, f) {
      return ct(e, s, f, !0);
    }
    function At(e, s, f) {
      return ct(e, s, f, !1);
    }
    var Bt = At, Ft = Wt;
    Se.Fragment = l, Se.jsx = Bt, Se.jsxs = Ft;
  }()), Se;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = Vt() : t.exports = Ut();
})(It);
var qe = {}, Gt = {
  get exports() {
    return qe;
  },
  set exports(t) {
    qe = t;
  }
};
(function(t, m) {
  (function(n, l) {
    t.exports = l();
  })(Lt, function() {
    var n = 1e3, l = 6e4, y = 36e5, O = "millisecond", V = "second", M = "minute", w = "hour", P = "day", b = "week", _ = "month", S = "quarter", x = "year", R = "date", j = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, D = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Y = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var a = ["th", "st", "nd", "rd"], o = c % 100;
      return "[" + c + (a[(o - 20) % 10] || a[o] || a[0]) + "]";
    } }, U = function(c, a, o) {
      var d = String(c);
      return !d || d.length >= a ? c : "" + Array(a + 1 - d.length).join(o) + c;
    }, q = { s: U, z: function(c) {
      var a = -c.utcOffset(), o = Math.abs(a), d = Math.floor(o / 60), i = o % 60;
      return (a <= 0 ? "+" : "-") + U(d, 2, "0") + ":" + U(i, 2, "0");
    }, m: function c(a, o) {
      if (a.date() < o.date())
        return -c(o, a);
      var d = 12 * (o.year() - a.year()) + (o.month() - a.month()), i = a.clone().add(d, _), h = o - i < 0, v = a.clone().add(d + (h ? -1 : 1), _);
      return +(-(d + (o - i) / (h ? i - v : v - i)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: _, y: x, w: b, d: P, D: R, h: w, m: M, s: V, ms: O, Q: S }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, Z = "en", E = {};
    E[Z] = Y;
    var ee = "$isDayjsObject", H = function(c) {
      return c instanceof F || !(!c || !c[ee]);
    }, X = function c(a, o, d) {
      var i;
      if (!a)
        return Z;
      if (typeof a == "string") {
        var h = a.toLowerCase();
        E[h] && (i = h), o && (E[h] = o, i = h);
        var v = a.split("-");
        if (!i && v.length > 1)
          return c(v[0]);
      } else {
        var W = a.name;
        E[W] = a, i = W;
      }
      return !d && i && (Z = i), i || !d && Z;
    }, T = function(c, a) {
      if (H(c))
        return c.clone();
      var o = typeof a == "object" ? a : {};
      return o.date = c, o.args = arguments, new F(o);
    }, p = q;
    p.l = X, p.i = H, p.w = function(c, a) {
      return T(c, { locale: a.$L, utc: a.$u, x: a.$x, $offset: a.$offset });
    };
    var F = function() {
      function c(o) {
        this.$L = X(o.locale, null, !0), this.parse(o), this.$x = this.$x || o.x || {}, this[ee] = !0;
      }
      var a = c.prototype;
      return a.parse = function(o) {
        this.$d = function(d) {
          var i = d.date, h = d.utc;
          if (i === null)
            return /* @__PURE__ */ new Date(NaN);
          if (p.u(i))
            return /* @__PURE__ */ new Date();
          if (i instanceof Date)
            return new Date(i);
          if (typeof i == "string" && !/Z$/i.test(i)) {
            var v = i.match($);
            if (v) {
              var W = v[2] - 1 || 0, A = (v[7] || "0").substring(0, 3);
              return h ? new Date(Date.UTC(v[1], W, v[3] || 1, v[4] || 0, v[5] || 0, v[6] || 0, A)) : new Date(v[1], W, v[3] || 1, v[4] || 0, v[5] || 0, v[6] || 0, A);
            }
          }
          return new Date(i);
        }(o), this.init();
      }, a.init = function() {
        var o = this.$d;
        this.$y = o.getFullYear(), this.$M = o.getMonth(), this.$D = o.getDate(), this.$W = o.getDay(), this.$H = o.getHours(), this.$m = o.getMinutes(), this.$s = o.getSeconds(), this.$ms = o.getMilliseconds();
      }, a.$utils = function() {
        return p;
      }, a.isValid = function() {
        return this.$d.toString() !== j;
      }, a.isSame = function(o, d) {
        var i = T(o);
        return this.startOf(d) <= i && i <= this.endOf(d);
      }, a.isAfter = function(o, d) {
        return T(o) < this.startOf(d);
      }, a.isBefore = function(o, d) {
        return this.endOf(d) < T(o);
      }, a.$g = function(o, d, i) {
        return p.u(o) ? this[d] : this.set(i, o);
      }, a.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, a.valueOf = function() {
        return this.$d.getTime();
      }, a.startOf = function(o, d) {
        var i = this, h = !!p.u(d) || d, v = p.p(o), W = function(de, re) {
          var me = p.w(i.$u ? Date.UTC(i.$y, re, de) : new Date(i.$y, re, de), i);
          return h ? me : me.endOf(P);
        }, A = function(de, re) {
          return p.w(i.toDate()[de].apply(i.toDate("s"), (h ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(re)), i);
        }, C = this.$W, L = this.$M, J = this.$D, oe = "set" + (this.$u ? "UTC" : "");
        switch (v) {
          case x:
            return h ? W(1, 0) : W(31, 11);
          case _:
            return h ? W(1, L) : W(0, L + 1);
          case b:
            var ce = this.$locale().weekStart || 0, le = (C < ce ? C + 7 : C) - ce;
            return W(h ? J - le : J + (6 - le), L);
          case P:
          case R:
            return A(oe + "Hours", 0);
          case w:
            return A(oe + "Minutes", 1);
          case M:
            return A(oe + "Seconds", 2);
          case V:
            return A(oe + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, a.endOf = function(o) {
        return this.startOf(o, !1);
      }, a.$set = function(o, d) {
        var i, h = p.p(o), v = "set" + (this.$u ? "UTC" : ""), W = (i = {}, i[P] = v + "Date", i[R] = v + "Date", i[_] = v + "Month", i[x] = v + "FullYear", i[w] = v + "Hours", i[M] = v + "Minutes", i[V] = v + "Seconds", i[O] = v + "Milliseconds", i)[h], A = h === P ? this.$D + (d - this.$W) : d;
        if (h === _ || h === x) {
          var C = this.clone().set(R, 1);
          C.$d[W](A), C.init(), this.$d = C.set(R, Math.min(this.$D, C.daysInMonth())).$d;
        } else
          W && this.$d[W](A);
        return this.init(), this;
      }, a.set = function(o, d) {
        return this.clone().$set(o, d);
      }, a.get = function(o) {
        return this[p.p(o)]();
      }, a.add = function(o, d) {
        var i, h = this;
        o = Number(o);
        var v = p.p(d), W = function(L) {
          var J = T(h);
          return p.w(J.date(J.date() + Math.round(L * o)), h);
        };
        if (v === _)
          return this.set(_, this.$M + o);
        if (v === x)
          return this.set(x, this.$y + o);
        if (v === P)
          return W(1);
        if (v === b)
          return W(7);
        var A = (i = {}, i[M] = l, i[w] = y, i[V] = n, i)[v] || 1, C = this.$d.getTime() + o * A;
        return p.w(C, this);
      }, a.subtract = function(o, d) {
        return this.add(-1 * o, d);
      }, a.format = function(o) {
        var d = this, i = this.$locale();
        if (!this.isValid())
          return i.invalidDate || j;
        var h = o || "YYYY-MM-DDTHH:mm:ssZ", v = p.z(this), W = this.$H, A = this.$m, C = this.$M, L = i.weekdays, J = i.months, oe = i.meridiem, ce = function(re, me, ye, xe) {
          return re && (re[me] || re(d, h)) || ye[me].slice(0, xe);
        }, le = function(re) {
          return p.s(W % 12 || 12, re, "0");
        }, de = oe || function(re, me, ye) {
          var xe = re < 12 ? "AM" : "PM";
          return ye ? xe.toLowerCase() : xe;
        };
        return h.replace(D, function(re, me) {
          return me || function(ye) {
            switch (ye) {
              case "YY":
                return String(d.$y).slice(-2);
              case "YYYY":
                return p.s(d.$y, 4, "0");
              case "M":
                return C + 1;
              case "MM":
                return p.s(C + 1, 2, "0");
              case "MMM":
                return ce(i.monthsShort, C, J, 3);
              case "MMMM":
                return ce(J, C);
              case "D":
                return d.$D;
              case "DD":
                return p.s(d.$D, 2, "0");
              case "d":
                return String(d.$W);
              case "dd":
                return ce(i.weekdaysMin, d.$W, L, 2);
              case "ddd":
                return ce(i.weekdaysShort, d.$W, L, 3);
              case "dddd":
                return L[d.$W];
              case "H":
                return String(W);
              case "HH":
                return p.s(W, 2, "0");
              case "h":
                return le(1);
              case "hh":
                return le(2);
              case "a":
                return de(W, A, !0);
              case "A":
                return de(W, A, !1);
              case "m":
                return String(A);
              case "mm":
                return p.s(A, 2, "0");
              case "s":
                return String(d.$s);
              case "ss":
                return p.s(d.$s, 2, "0");
              case "SSS":
                return p.s(d.$ms, 3, "0");
              case "Z":
                return v;
            }
            return null;
          }(re) || v.replace(":", "");
        });
      }, a.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, a.diff = function(o, d, i) {
        var h, v = this, W = p.p(d), A = T(o), C = (A.utcOffset() - this.utcOffset()) * l, L = this - A, J = function() {
          return p.m(v, A);
        };
        switch (W) {
          case x:
            h = J() / 12;
            break;
          case _:
            h = J();
            break;
          case S:
            h = J() / 3;
            break;
          case b:
            h = (L - C) / 6048e5;
            break;
          case P:
            h = (L - C) / 864e5;
            break;
          case w:
            h = L / y;
            break;
          case M:
            h = L / l;
            break;
          case V:
            h = L / n;
            break;
          default:
            h = L;
        }
        return i ? h : p.a(h);
      }, a.daysInMonth = function() {
        return this.endOf(_).$D;
      }, a.$locale = function() {
        return E[this.$L];
      }, a.locale = function(o, d) {
        if (!o)
          return this.$L;
        var i = this.clone(), h = X(o, d, !0);
        return h && (i.$L = h), i;
      }, a.clone = function() {
        return p.w(this.$d, this);
      }, a.toDate = function() {
        return new Date(this.valueOf());
      }, a.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, a.toISOString = function() {
        return this.$d.toISOString();
      }, a.toString = function() {
        return this.$d.toUTCString();
      }, c;
    }(), k = F.prototype;
    return T.prototype = k, [["$ms", O], ["$s", V], ["$m", M], ["$H", w], ["$W", P], ["$M", _], ["$y", x], ["$D", R]].forEach(function(c) {
      k[c[1]] = function(a) {
        return this.$g(a, c[0], c[1]);
      };
    }), T.extend = function(c, a) {
      return c.$i || (c(a, F, T), c.$i = !0), T;
    }, T.locale = X, T.isDayjs = H, T.unix = function(c) {
      return T(1e3 * c);
    }, T.en = E[Z], T.Ls = E, T.p = {}, T;
  });
})(Gt);
const K = qe, Oe = () => /* @__PURE__ */ r.jsx("svg", { viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", children: /* @__PURE__ */ r.jsx(
  "path",
  {
    d: "M723.882667 895.701333c-9.6 0-19.285333-3.2-27.39199999-9.6l-423.808-340.906666a43.733333 43.733333 0 0 1-1e-8-68.096L694.698667 137.984A43.690667 43.690667 0 0 1 749.397333 206.08l-379.605333 305.109333 381.525333 306.77333401a43.690667 43.690667 0 0 1-27.434666 77.73866599z"
  }
) });
function vt(t) {
  var m, n, l = "";
  if (typeof t == "string" || typeof t == "number")
    l += t;
  else if (typeof t == "object")
    if (Array.isArray(t))
      for (m = 0; m < t.length; m++)
        t[m] && (n = vt(t[m])) && (l && (l += " "), l += n);
    else
      for (m in t)
        t[m] && (l && (l += " "), l += m);
  return l;
}
function ne() {
  for (var t, m, n = 0, l = ""; n < arguments.length; )
    (t = arguments[n++]) && (m = vt(t)) && (l && (l += " "), l += m);
  return l;
}
const Be = (t, m) => {
  const n = Re(!1);
  yt(() => {
    n.current ? t() : n.current = !0;
  }, m);
}, Ce = () => Re(K()).current, Ge = {
  "en-US": {
    "com.datepicker.month.1": "January",
    "com.datepicker.month.2": "February",
    "com.datepicker.month.3": "March",
    "com.datepicker.month.4": "April",
    "com.datepicker.month.5": "May",
    "com.datepicker.month.6": "June",
    "com.datepicker.month.7": "July",
    "com.datepicker.month.8": "August",
    "com.datepicker.month.9": "September",
    "com.datepicker.month.10": "October",
    "com.datepicker.month.11": "November",
    "com.datepicker.month.12": "December",
    "com.datepicker.weekDay.1": "Mo",
    "com.datepicker.weekDay.2": "Tu",
    "com.datepicker.weekDay.3": "We",
    "com.datepicker.weekDay.4": "Th",
    "com.datepicker.weekDay.5": "Fr",
    "com.datepicker.weekDay.6": "Sa",
    "com.datepicker.weekDay.7": "Su",
    "com.datepicker.unit.year": " ",
    "com.datepicker.pleaseInputYear": "Please enter the first year",
    "com.datepicker.setToday": "Set to today",
    "com.datepicker.today": "Today",
    "com.datepicker.tomorrow": "Tomorrow",
    "com.datepicker.twoDay": "Two day",
    "com.datepicker.thisWeek": "This Week",
    "com.datepicker.nextWeek": "Next Week",
    "com.timepicker.time": "Time",
    "com.timepicker.setNow": "Now",
    "com.timepicker.ok": "OK",
    "com.timepicker.start": "Start",
    "com.timepicker.end": "End",
    "com.timepicker.hour": "H",
    "com.timepicker.minute": "M",
    "com.timepicker.second": "S",
    "com.rangeTimeDatepicker.now": "Now",
    "com.rangeTimeDatepicker.oneHour": "1 hour",
    "com.rangeTimeDatepicker.twoHour": "2 Hour",
    "com.rangeTimeDatepicker.fourHour": "4 Hour"
  },
  "zh-TW": {
    "com.datepicker.month.1": "1月",
    "com.datepicker.month.2": "2月",
    "com.datepicker.month.3": "3月",
    "com.datepicker.month.4": "4月",
    "com.datepicker.month.5": "5月",
    "com.datepicker.month.6": "6月",
    "com.datepicker.month.7": "7月",
    "com.datepicker.month.8": "8月",
    "com.datepicker.month.9": "9月",
    "com.datepicker.month.10": "10月",
    "com.datepicker.month.11": "11月",
    "com.datepicker.month.12": "12月",
    "com.datepicker.weekDay.1": "週一",
    "com.datepicker.weekDay.2": "週二",
    "com.datepicker.weekDay.3": "週三",
    "com.datepicker.weekDay.4": "週四",
    "com.datepicker.weekDay.5": "週五",
    "com.datepicker.weekDay.6": "週六",
    "com.datepicker.weekDay.7": "週日",
    "com.datepicker.unit.year": "年",
    "com.datepicker.pleaseInputYear": "請輸入西元年",
    "com.datepicker.setToday": "設定為今天",
    "com.datepicker.today": "今天",
    "com.datepicker.twoDay": "兩天",
    "com.datepicker.tomorrow": "明天",
    "com.datepicker.thisWeek": "這週",
    "com.datepicker.nextWeek": "下週",
    "com.timepicker.time": "時間",
    "com.timepicker.setNow": "現在",
    "com.timepicker.ok": "確定",
    "com.timepicker.start": "開始",
    "com.timepicker.end": "結束",
    "com.timepicker.hour": "時",
    "com.timepicker.minute": "分",
    "com.timepicker.second": "秒",
    "com.rangeTimeDatepicker.now": "現在",
    "com.rangeTimeDatepicker.oneHour": "1小時",
    "com.rangeTimeDatepicker.twoHour": "2小時",
    "com.rangeTimeDatepicker.fourHour": "4小時"
  },
  "zh-CN": {
    "com.datepicker.month.1": "1月",
    "com.datepicker.month.2": "2月",
    "com.datepicker.month.3": "3月",
    "com.datepicker.month.4": "4月",
    "com.datepicker.month.5": "5月",
    "com.datepicker.month.6": "6月",
    "com.datepicker.month.7": "7月",
    "com.datepicker.month.8": "8月",
    "com.datepicker.month.9": "9月",
    "com.datepicker.month.10": "10月",
    "com.datepicker.month.11": "11月",
    "com.datepicker.month.12": "12月",
    "com.datepicker.weekDay.1": "週一",
    "com.datepicker.weekDay.2": "週二",
    "com.datepicker.weekDay.3": "週三",
    "com.datepicker.weekDay.4": "週四",
    "com.datepicker.weekDay.5": "週五",
    "com.datepicker.weekDay.6": "週六",
    "com.datepicker.weekDay.7": "週日",
    "com.datepicker.unit.year": "年",
    "com.datepicker.pleaseInputYear": "请输入西元年",
    "com.datepicker.setToToday": "设定为今天",
    "com.datepicker.setToday": "设定为今天",
    "com.datepicker.today": "今天",
    "com.datepicker.tomorrow": "明天",
    "com.datepicker.twoDay": "两天",
    "com.datepicker.thisWeek": "这周",
    "com.datepicker.nextWeek": "下周",
    "com.timepicker.time": "时间",
    "com.timepicker.setNow": "此刻",
    "com.timepicker.ok": "确定",
    "com.timepicker.start": "开始",
    "com.timepicker.end": "结束",
    "com.timepicker.hour": "时",
    "com.timepicker.minute": "分",
    "com.timepicker.second": "秒",
    "com.rangeTimeDatepicker.now": "现在",
    "com.rangeTimeDatepicker.oneHour": "1小时",
    "com.rangeTimeDatepicker.twoHour": "2小时",
    "com.rangeTimeDatepicker.fourHour": "4小时"
  },
  "ja-JP": {
    "com.datepicker.month.1": "1月",
    "com.datepicker.month.2": "2月",
    "com.datepicker.month.3": "3月",
    "com.datepicker.month.4": "4月",
    "com.datepicker.month.5": "5月",
    "com.datepicker.month.6": "6月",
    "com.datepicker.month.7": "7月",
    "com.datepicker.month.8": "8月",
    "com.datepicker.month.9": "9月",
    "com.datepicker.month.10": "10月",
    "com.datepicker.month.11": "11月",
    "com.datepicker.month.12": "12月",
    "com.datepicker.weekDay.1": "週一",
    "com.datepicker.weekDay.2": "週二",
    "com.datepicker.weekDay.3": "週三",
    "com.datepicker.weekDay.4": "週四",
    "com.datepicker.weekDay.5": "週五",
    "com.datepicker.weekDay.6": "週六",
    "com.datepicker.weekDay.7": "週日",
    "com.datepicker.unit.year": "年",
    "com.datepicker.pleaseInputYear": "西暦年を入力してください",
    "com.datepicker.setToToday": "今日に設定",
    "com.datepicker.setToday": "今日に設定",
    "com.datepicker.today": "今日",
    "com.datepicker.tomorrow": "明日",
    "com.datepicker.twoDay": "二日",
    "com.datepicker.thisWeek": "今週",
    "com.datepicker.nextWeek": "来週",
    "com.timepicker.time": "時間",
    "com.timepicker.setNow": "現在",
    "com.timepicker.ok": "確定",
    "com.timepicker.start": "開始",
    "com.timepicker.end": "終了",
    "com.timepicker.hour": "時",
    "com.timepicker.minute": "分",
    "com.timepicker.second": "秒",
    "com.rangeTimeDatepicker.now": "現在",
    "com.rangeTimeDatepicker.oneHour": "1時間",
    "com.rangeTimeDatepicker.twoHour": "2時間",
    "com.rangeTimeDatepicker.fourHour": "4時間"
  }
}, ve = (t) => ({ i18n: (n, l) => {
  const y = typeof t < "u" ? t : "en-US", O = Ge[y] ? Ge[y] : Ge["en-US"];
  return typeof O < "u" && typeof O[n] < "u" ? O[n] : typeof (l == null ? void 0 : l.def) < "u" ? l == null ? void 0 : l.def : n;
} }), Jt = (t, m) => {
  const n = K(m);
  return n.isValid() ? n : t;
}, mt = {
  weekDay: [1, 2, 3, 4, 5, 6, 7],
  month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}, $e = ({
  className: t,
  style: m,
  value: n,
  format: l = "YYYY-MM-DD",
  onChange: y,
  onChangeYearMonthPanel: O,
  isVisibleSetToday: V = !1,
  locale: M = "en-US",
  minYear: w = 1911,
  maxYear: P,
  isDark: b = !1,
  minDate: _,
  maxDate: S,
  tagDate: x = []
}) => {
  const R = Ce(), { i18n: j } = ve(M), [$, D] = Ae(Jt(R, n)), Y = typeof P < "u" ? P : Number(R.add(1, "year").year());
  Be(() => {
    const a = K(n), o = K(), d = a.isValid() ? a.get("year") : o.get("year"), i = a.isValid() ? K(n).get("month") : o.get("month");
    E(d, i);
  }, [n]);
  const U = De(() => mt.weekDay.map((a) => j(`com.datepicker.weekDay.${a}`, { def: String(a) })), [M]), q = De(() => mt.month.map((a) => ({ text: j(`com.datepicker.month.${a}`), value: a - 1 })), [M]), Z = De(() => {
    const a = Y - w + 1, o = Array.from({ length: a }).map((i) => Y), d = j("com.datepicker.unit.year", { def: "Year" });
    return o.map((i, h) => {
      const v = i - h;
      return { text: `${v}${d}`, value: v };
    });
  }, [M]), E = pe((a, o) => {
    let d = $;
    typeof a < "u" && (d = d.set("year", a)), typeof o < "u" && (d = d.set("month", o)), O && O({ year: d.year(), month: d.month() + 1 }), D(d);
  }, [$]), ee = (a, o, d) => {
    let i = $;
    a && (i = i.set("year", a)), o && (i = i.set("month", o)), d && (i = i.set("date", d));
    const h = i.format(l);
    y(h);
  }, H = () => {
    const a = R.format(l);
    D(R), y(a);
  }, X = () => {
    const a = $.subtract(1, "month"), o = $.add(1, "month"), d = Z.find((h) => String(h.value) === String($.year())), i = q.find((h) => h.value === $.month());
    return /* @__PURE__ */ r.jsx("div", { className: u.dateYearMonthRow, children: /* @__PURE__ */ r.jsxs("div", { className: u.dateChangeControl, children: [
      /* @__PURE__ */ r.jsxs("div", { className: u.dateYearMonth, children: [
        /* @__PURE__ */ r.jsxs("div", { className: u.dateYearGroup, children: [
          /* @__PURE__ */ r.jsx("span", { className: u.dateYear, children: d == null ? void 0 : d.text }),
          /* @__PURE__ */ r.jsx(
            "select",
            {
              className: u.dateYearSelect,
              onChange: (h) => E($.set("year", Number(h.target.value)).year()),
              value: $.year(),
              children: Z.map((h) => /* @__PURE__ */ r.jsx("option", { value: h.value, children: h.text }, h.value))
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: u.dateMonthGroup, children: [
          /* @__PURE__ */ r.jsx("span", { className: u.dateMonth, children: i == null ? void 0 : i.text }),
          /* @__PURE__ */ r.jsx(
            "select",
            {
              className: u.dateMonthSelect,
              onChange: (h) => E(void 0, $.set("month", Number(h.target.value)).month()),
              value: $.month(),
              children: q.map((h) => /* @__PURE__ */ r.jsx("option", { value: h.value, children: h.text }, h.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: ne(u.dateMonthButton, "pre-month"),
          type: "button",
          onClick: () => E(
            a.year(),
            a.month()
          ),
          children: /* @__PURE__ */ r.jsx(Oe, {})
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: ne(u.dateMonthButton, "next-month"),
          type: "button",
          onClick: () => E(
            o.year(),
            o.month()
          ),
          children: /* @__PURE__ */ r.jsx(Oe, {})
        }
      )
    ] }) });
  }, T = pe(() => /* @__PURE__ */ r.jsx("div", { className: u.dateWeekRow, children: U.map((a, o) => /* @__PURE__ */ r.jsx("div", { className: u.dateWeek, children: a }, `localeWeekDay-${o}-${a}`)) }), []), p = pe(() => {
    const a = K(n), o = $.set("date", 1).day(), d = o === 0 ? 6 : o - 1, i = $.subtract(1, "month"), v = Number(i.endOf("month").get("date")) - d, W = Array.from({ length: d });
    for (let A = 0; A < d; A++) {
      const C = v + A + 1, L = i.set("date", C), J = !!(_ && L.isBefore(_, "date") || S && L.isAfter(S, "date"));
      W[A] = {
        isActive: a.isSame(i.set("date", C), "date"),
        isToday: R.isSame(L, "date"),
        isTag: x == null ? void 0 : x.includes(L.format("YYYY-MM-DD")),
        isDisable: J,
        className: u.datePreDay,
        date: L,
        dayNumber: C,
        onClick: () => J ? {} : ee(i.year(), i.month(), C)
      };
    }
    return W;
  }, [$, n, _, S, x]), F = pe(() => {
    const a = K(n), o = $.set("date", 1).day(), d = o === 0 ? 6 : o - 1, i = $.endOf("month").get("date"), h = $.add(1, "month"), v = 7 * 6 % (d + i), W = Array.from({ length: v });
    for (let A = 0; A < v; A++) {
      const C = A + 1, L = h.set("date", C), J = !!(_ && L.isBefore(_, "date") || S && L.isAfter(S, "date"));
      W[A] = {
        isActive: a.isSame(h.set("date", C), "date"),
        isToday: R.isSame(L, "date"),
        isTag: x == null ? void 0 : x.includes(L.format("YYYY-MM-DD")),
        isDisable: J,
        className: u.datePreDay,
        date: L,
        dayNumber: C,
        onClick: () => J ? {} : ee(h.year(), h.month(), C)
      };
    }
    return W;
  }, [$, n, _, S, x]), k = () => {
    const a = K(n), o = $.endOf("month").get("date"), d = Array.from({ length: o });
    for (let C = 0; C < o; C++) {
      const L = C + 1, J = $.set("date", L), oe = !!(_ && J.isBefore(_, "date") || S && J.isAfter(S, "date"));
      d[C] = {
        isActive: a.isSame(J, "date"),
        isToday: R.isSame(J, "date"),
        isTag: x == null ? void 0 : x.includes(J.format("YYYY-MM-DD")),
        isDisable: oe,
        className: u.dateDay,
        date: J,
        dayNumber: L,
        onClick: () => oe ? {} : ee($.year(), $.month(), L)
      };
    }
    const i = p(), h = F(), v = [...i, ...d, ...h], W = v.findIndex((C) => C.isActive), A = Math.floor(W / 7);
    return /* @__PURE__ */ r.jsxs("div", { className: u.dateDayRow, children: [
      T(),
      /* @__PURE__ */ r.jsxs("div", { className: u.dateDayContent, children: [
        A >= 0 && /* @__PURE__ */ r.jsx("div", { className: u.dateWeekMask, style: { top: A * 30 } }),
        v.map((C) => /* @__PURE__ */ r.jsx(
          "div",
          {
            className: C.className,
            "data-active": C.isActive,
            "data-today": C.isToday,
            "data-tag": C.isTag,
            "data-disable": C.isDisable,
            onClick: C.onClick,
            children: /* @__PURE__ */ r.jsx("span", { children: C.dayNumber })
          },
          `currentDay-${C.date}`
        ))
      ] })
    ] });
  }, c = () => /* @__PURE__ */ r.jsx("div", { className: u.dateLabelCheckCardCreate, children: /* @__PURE__ */ r.jsx("button", { className: u.dateTodayButton, type: "button", onClick: H, children: /* @__PURE__ */ r.jsx("span", { children: j("com.datepicker.setToday", { def: "Set to today" }) }) }) });
  return /* @__PURE__ */ r.jsxs("div", { className: ne(
    u.dateRoot,
    t,
    { "dark-theme": b }
  ), style: m, children: [
    X(),
    k(),
    V && c()
  ] });
}, mr = (t) => Ke($e, { ...t, className: ne(t.className, u.root) });
var ue = /* @__PURE__ */ ((t) => (t.today = "today", t.tomorrow = "tomorrow", t.twoDay = "twoDay", t.thisWeek = "thisWeek", t.nextWeek = "nextWeek", t))(ue || {}), ke = /* @__PURE__ */ ((t) => (t.now = "now", t.oneHour = "oneHour", t.twoHour = "twoHour", t.fourHour = "fourHour", t))(ke || {});
const be = {
  date: "YYYY-MM-DD",
  time: "HH:mm:ss",
  timeNoSec: "HH:mm",
  dateTime: "YYYY-MM-DD HH:mm:ss"
}, se = (t, m) => m ? `${_e((t == null ? void 0 : t.hour) ?? "00", 2)}:${_e((t == null ? void 0 : t.minute) ?? "00", 2)}:${_e((t == null ? void 0 : t.second) ?? "00", 2)}` : `${_e((t == null ? void 0 : t.hour) ?? "00", 2)}:${_e((t == null ? void 0 : t.minute) ?? "00", 2)}`;
function zt(t) {
  return t == null || typeof t == "string" && t.trim().length === 0 || !(t instanceof Date) && typeof t == "object" && Object.keys(t).length === 0;
}
function _e(t, m) {
  const n = String(t);
  return n.length < m ? _e(`0${n}`, m) : n;
}
const He = (t) => {
  const m = K(`1989-01-01 ${t ?? "00:00:00"}`);
  return {
    hour: m.hour(),
    minute: m.minute(),
    second: m.second()
  };
};
function qt() {
  let t = new Array(24).fill(0), m = new Array(60).fill(0), n = new Array(60).fill(0);
  return t = t.map((l, y) => l + y), m = m.map((l, y) => l + y), n = n.map((l, y) => l + y), { hourList: t, minuteList: m, secondList: n };
}
const _t = (t) => K(zt(t) ? void 0 : t), Kt = (t, m) => {
  const n = K();
  switch (t) {
    case ue.today:
      return {
        startDate: n.format(m),
        endDate: n.format(m)
      };
    case ue.tomorrow:
      return {
        startDate: n.add(1, "day").format(m),
        endDate: n.add(1, "day").format(m)
      };
    case ue.twoDay:
      return {
        startDate: n.format(m),
        endDate: n.add(1, "day").format(m)
      };
    case ue.thisWeek:
      return {
        startDate: n.format(m),
        endDate: n.add(1, "week").format(m)
      };
    case ue.nextWeek:
      return {
        startDate: n.add(1, "week").format(m),
        endDate: n.add(2, "week").format(m)
      };
  }
}, Zt = (t, m, n) => {
  const l = K(), y = {
    hour: l.get("hour"),
    minute: l.get("minute"),
    second: l.get("second")
  };
  switch (t) {
    case ke.now:
      return {
        date: l.format(m),
        startTime: se(y, n),
        endTime: se(y, n)
      };
    case ke.oneHour:
      const O = l.add(1, "hour"), V = {
        hour: O.get("hour"),
        minute: O.get("minute"),
        second: O.get("second")
      };
      return {
        date: l.format(m),
        startTime: se(y, n),
        endTime: se(V, n)
      };
    case ke.twoHour:
      const M = l.add(2, "hour"), w = {
        hour: M.get("hour"),
        minute: M.get("minute"),
        second: M.get("second")
      };
      return {
        date: l.format(m),
        startTime: se(y, n),
        endTime: se(w, n)
      };
    case ke.fourHour:
      const P = l.add(4, "hour"), b = {
        hour: P.get("hour"),
        minute: P.get("minute"),
        second: P.get("second")
      };
      return {
        date: l.format(m),
        startTime: se(y, n),
        endTime: se(b, n)
      };
  }
}, Je = () => K().format("YYYY-MM-DD"), fr = ({
  className: t,
  style: m,
  value: n = { startDate: Je(), endDate: Je() },
  onChange: l,
  format: y = "YYYY-MM-DD",
  maxYear: O,
  minYear: V,
  locale: M,
  isVisibleFastPicker: w = !1,
  minDate: P,
  maxDate: b,
  isDark: _
}) => {
  const { i18n: S } = ve(M), x = Je(), R = { isDark: _, format: y, minYear: V, maxYear: O, locale: M }, j = (D) => {
    const Y = Kt(D, y);
    Y && l && l(Y);
  }, $ = () => /* @__PURE__ */ r.jsxs("div", { className: u.dateRangeLabelCheckCardCreate, children: [
    /* @__PURE__ */ r.jsx("button", { className: u.dateRangeButton, type: "button", onClick: () => j(ue.today), children: /* @__PURE__ */ r.jsx("span", { children: S("com.datepicker.today", { def: "today" }) }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.dateRangeButton, type: "button", onClick: () => j(ue.tomorrow), children: /* @__PURE__ */ r.jsx("span", { children: S("com.datepicker.tomorrow", { def: "tomorrow" }) }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.dateRangeButton, type: "button", onClick: () => j(ue.twoDay), children: /* @__PURE__ */ r.jsx("span", { children: S("com.datepicker.twoDay", { def: "two day" }) }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.dateRangeButton, type: "button", onClick: () => j(ue.thisWeek), children: /* @__PURE__ */ r.jsx("span", { children: S("com.datepicker.thisWeek", { def: "this week" }) }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.dateRangeButton, type: "button", onClick: () => j(ue.nextWeek), children: /* @__PURE__ */ r.jsx("span", { children: S("com.datepicker.nextWeek", { def: "next week" }) }) })
  ] });
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      "data-fast": w ? "" : void 0,
      className: ne(
        u.root,
        u.dateRangeRoot,
        t,
        { "dark-theme": _ }
      ),
      style: m,
      children: [
        w && $(),
        /* @__PURE__ */ r.jsx(
          $e,
          {
            ...R,
            value: n.startDate,
            onChange: (D) => {
              l && l({
                startDate: D,
                endDate: n != null && n.endDate ? n.endDate : x
              });
            },
            minDate: P,
            maxDate: n != null && n.endDate ? n == null ? void 0 : n.endDate : b
          }
        ),
        /* @__PURE__ */ r.jsx(
          $e,
          {
            ...R,
            value: n.endDate,
            onChange: (D) => {
              l && l({
                startDate: n != null && n.startDate ? n.startDate : x,
                endDate: D
              });
            },
            minDate: n != null && n.startDate ? n == null ? void 0 : n.startDate : P,
            maxDate: b
          }
        )
      ]
    }
  );
};
const ze = 30, { hourList: Xt, minuteList: Qt, secondList: er } = qt(), We = ({
  className: t,
  style: m,
  onChange: n,
  onClickOk: l,
  value: y,
  locale: O = "en-US",
  isDark: V = !1,
  title: M,
  isVisibleSecond: w = !0,
  isVisibleNow: P = !0
}) => {
  const { i18n: b } = ve(O), _ = Ce(), S = Re(null), x = Re(null), R = Re(null), [j, $] = Ae(He(y)), D = se(j, w);
  Be(() => {
    U(He(y), !0);
  }, [y]), yt(() => {
    E(j, !1);
  }, []);
  const Y = (p, F = !0) => {
    U(p, F), n && n(se(p, w));
  }, U = (p, F = !0) => {
    E(p, F), $(p);
  }, q = () => {
    l && l(D);
  }, Z = pe(() => {
    const p = {
      hour: _.hour(),
      minute: _.minute(),
      second: _ ? _.second() : void 0
    };
    Y(p, !0);
  }, []), E = (p, F = !0) => {
    var c, a, o;
    const k = F ? "smooth" : "auto";
    p.hour && S.current && ((c = S.current) == null || c.scrollTo({ behavior: k, top: p.hour * ze })), p.minute && x.current && ((a = x.current) == null || a.scrollTo({ behavior: k, top: p.minute * ze })), p.second && R.current && ((o = R.current) == null || o.scrollTo({ behavior: k, top: p.second * ze }));
  }, ee = pe((p, F) => F.map((k) => {
    const c = j[p] === k;
    return /* @__PURE__ */ r.jsx(
      "span",
      {
        className: ne(u.timeFakeOption, { "is-active": c }),
        onClick: () => {
          Y({ ...j, [p]: k }, !0);
        },
        children: _e(k, 2)
      },
      `unit-${p}-${k}`
    );
  }), [D, n]), H = () => /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx("div", { className: u.timeHeader, children: /* @__PURE__ */ r.jsx("span", { className: u.timeHeaderText, children: M ?? b("com.timepicker.time", { def: "Time" }) }) }),
    /* @__PURE__ */ r.jsxs("div", { className: "acrool-react-datepicker__date-week-row", children: [
      /* @__PURE__ */ r.jsx("div", { className: "acrool-react-datepicker__date-week", children: b("com.timepicker.hour", { def: "H" }) }),
      /* @__PURE__ */ r.jsx("div", { className: "acrool-react-datepicker__date-week", children: b("com.timepicker.minute", { def: "M" }) }),
      w && /* @__PURE__ */ r.jsx("div", { className: "acrool-react-datepicker__date-week", children: b("com.timepicker.second", { def: "S" }) })
    ] })
  ] }), X = () => /* @__PURE__ */ r.jsxs("div", { className: u.timePickContainer, children: [
    /* @__PURE__ */ r.jsx("div", { className: u.timeSelectBox, ref: S, children: ee("hour", Xt) }),
    /* @__PURE__ */ r.jsx("div", { className: u.timeSelectBox, ref: x, children: ee("minute", Qt) }),
    w && /* @__PURE__ */ r.jsx("div", { className: u.timeSelectBox, ref: R, children: ee("second", er) })
  ] }), T = () => /* @__PURE__ */ r.jsxs("div", { className: u.timeButtonContainer, children: [
    /* @__PURE__ */ r.jsx("button", { className: u.timeNowButton, type: "button", onClick: Z, children: b("com.timepicker.setNow", { def: "Set now" }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.timeConfirmButton, type: "button", onClick: q, children: b("com.timepicker.ok", { def: "OK" }) })
  ] });
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: ne(
        u.timeRoot,
        t,
        { "dark-theme": V, "is-enable-sec": w }
      ),
      style: m,
      children: [
        H(),
        X(),
        P && T()
      ]
    }
  );
}, hr = (t) => Ke(We, { ...t, className: ne(t.className, u.root) });
const xt = ({
  className: t,
  style: m,
  onChange: n,
  onClickOk: l,
  value: y,
  locale: O = "en-US",
  isDark: V = !1,
  title: M,
  isVisibleSecond: w = !0,
  isVisibleNow: P = !0
}) => {
  const { i18n: b } = ve(O), _ = Ce(), [S, x] = Ae(He(y)), R = se(S, w);
  Be(() => {
    $(He(y), !0);
  }, [y]);
  const j = (E, ee = !0) => {
    const H = {
      ...S,
      ...E
    };
    x(H), n && n(se(H, w));
  }, $ = (E, ee = !0) => {
    x((H) => ({
      ...H,
      ...E
    }));
  }, D = () => {
    l && l(R);
  }, Y = pe(() => {
    const E = {
      hour: _.hour(),
      minute: _.minute(),
      second: _ ? _.second() : void 0
    };
    j(E, !0);
  }, []), U = () => /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsxs("div", { className: u.time2Header, children: [
    /* @__PURE__ */ r.jsx("span", { className: u.time2HeaderText, children: M ?? b("com.timepicker.time", { def: "Time" }) }),
    /* @__PURE__ */ r.jsx("span", { className: u.time2HeaderTimeStr, children: R })
  ] }) }), q = pe(() => /* @__PURE__ */ r.jsxs("div", { className: u.time2PickContainer, children: [
    /* @__PURE__ */ r.jsxs("div", { className: u.time2InputGroup, children: [
      /* @__PURE__ */ r.jsx("div", { className: "acrool-react-datepicker__date-week", children: b("com.timepicker.hour", { def: "H" }) }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          className: u.time2SelectBox,
          type: "range",
          min: "0",
          max: "23",
          value: S.hour,
          onChange: (E) => {
            j({ hour: parseInt(E.target.value) }, !0);
          }
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: u.time2InputGroup, children: [
      /* @__PURE__ */ r.jsx("div", { className: "acrool-react-datepicker__date-week", children: b("com.timepicker.minute", { def: "M" }) }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          className: u.time2SelectBox,
          type: "range",
          min: "0",
          max: "59",
          value: S.minute,
          onChange: (E) => {
            j({ minute: parseInt(E.target.value) }, !0);
          }
        }
      )
    ] }),
    w && /* @__PURE__ */ r.jsxs("div", { className: u.time2InputGroup, children: [
      /* @__PURE__ */ r.jsx("div", { className: "acrool-react-datepicker__date-week", children: b("com.timepicker.second", { def: "S" }) }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          className: u.time2SelectBox,
          type: "range",
          min: "0",
          max: "59",
          value: S.second,
          onChange: (E) => {
            j({ second: parseInt(E.target.value) }, !0);
          }
        }
      )
    ] })
  ] }), [S, n]), Z = () => /* @__PURE__ */ r.jsxs("div", { className: u.time2ButtonContainer, children: [
    /* @__PURE__ */ r.jsx("button", { className: u.time2NowButton, type: "button", onClick: Y, children: b("com.timepicker.setNow", { def: "Set now" }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.time2ConfirmButton, type: "button", onClick: D, children: b("com.timepicker.ok", { def: "OK" }) })
  ] });
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: ne(
        u.time2Root,
        t,
        { "dark-theme": V, "is-enable-sec": w }
      ),
      style: m,
      children: [
        U(),
        q(),
        P && Z()
      ]
    }
  );
}, pr = (t) => Ke(xt, { ...t, className: ne(t.className, u.root) });
var je = /* @__PURE__ */ ((t) => (t[t.date = 0] = "date", t[t.time = 1] = "time", t[t.dateTime = 2] = "dateTime", t))(je || {});
const kr = ({
  className: t,
  style: m,
  value: n,
  dateFormat: l = be.date,
  onChange: y,
  onClickOk: O,
  locale: V = "en-US",
  minYear: M = 1911,
  maxYear: w,
  isDark: P = !1,
  minDate: b,
  maxDate: _,
  isVisibleSecond: S = !0
}) => {
  const { i18n: x } = ve(V), R = Ce(), j = _t(n), $ = { dateFormat: l, minDate: b, maxDate: _, minYear: M, maxYear: w, locale: V, isDark: P }, D = { locale: V, isDark: P, onClickOk: O, isVisibleSecond: S }, Y = (H) => (H.isValid() ? H : K()).format(D.isVisibleSecond ? be.time : be.timeNoSec), U = (H) => (H.isValid() ? H : K()).format(l), q = (H) => H === je.date ? (X) => {
    y(`${X} ${Y(j)}`);
  } : H === je.time ? (X) => {
    y(`${U(j)} ${X}`);
  } : y, Z = () => {
    const H = `${U(j)} ${Y(j)}`;
    O && O(H);
  }, E = () => {
    q()(`${U(R)} ${Y(R)}`);
  }, ee = () => /* @__PURE__ */ r.jsxs("div", { className: u.timeButtonContainer, children: [
    /* @__PURE__ */ r.jsx("button", { className: u.timeNowButton, type: "button", onClick: E, children: x("com.timepicker.setNow", { def: "Set now" }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.timeConfirmButton, type: "button", onClick: Z, children: x("com.timepicker.ok", { def: "OK" }) })
  ] });
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: ne(
        u.root,
        u.dateTimeRoot,
        { "dark-theme": P },
        t
      ),
      style: m,
      children: [
        /* @__PURE__ */ r.jsxs("div", { className: u.dateTimeGroup, children: [
          /* @__PURE__ */ r.jsx($e, { ...$, value: U(j), onChange: q(je.date) }),
          /* @__PURE__ */ r.jsx(
            We,
            {
              ...D,
              value: Y(j),
              onChange: q(je.time),
              isVisibleSecond: D.isVisibleSecond,
              title: x("com.timepicker.time", { def: "Time" }),
              isVisibleNow: !1
            }
          )
        ] }),
        ee()
      ]
    }
  );
};
var Me = /* @__PURE__ */ ((t) => (t[t.date = 0] = "date", t[t.time = 1] = "time", t[t.dateTime = 2] = "dateTime", t))(Me || {});
const yr = ({
  className: t,
  style: m,
  value: n,
  dateFormat: l = be.date,
  onChange: y,
  onClickOk: O,
  locale: V = "en-US",
  minYear: M = 1911,
  maxYear: w,
  isDark: P = !1,
  minDate: b,
  maxDate: _,
  isVisibleSecond: S = !0
}) => {
  const { i18n: x } = ve(V), R = Ce(), j = _t(n), $ = { dateFormat: l, minDate: b, maxDate: _, minYear: M, maxYear: w, locale: V, isDark: P }, D = { locale: V, isDark: P, onClickOk: O, isVisibleSecond: S }, Y = (H) => (H.isValid() ? H : K()).format(D.isVisibleSecond ? be.time : be.timeNoSec), U = (H) => (H.isValid() ? H : K()).format(l), q = (H) => H === Me.date ? (X) => {
    y(`${X} ${Y(j)}`);
  } : H === Me.time ? (X) => {
    y(`${U(j)} ${X}`);
  } : y, Z = () => {
    const H = `${U(j)} ${Y(j)}`;
    O && O(H);
  }, E = () => {
    q()(`${U(R)} ${Y(R)}`);
  }, ee = () => /* @__PURE__ */ r.jsxs("div", { className: u.timeButtonContainer, children: [
    /* @__PURE__ */ r.jsx("button", { className: u.timeNowButton, type: "button", onClick: E, children: x("com.timepicker.setNow", { def: "Set now" }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.timeConfirmButton, type: "button", onClick: Z, children: x("com.timepicker.ok", { def: "OK" }) })
  ] });
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: ne(
        u.root,
        u.dateTime2Root,
        { "dark-theme": P },
        t
      ),
      style: m,
      children: [
        /* @__PURE__ */ r.jsxs("div", { className: u.dateTime2Group, children: [
          /* @__PURE__ */ r.jsx($e, { ...$, value: U(j), onChange: q(Me.date) }),
          /* @__PURE__ */ r.jsx(
            xt,
            {
              ...D,
              value: Y(j),
              onChange: q(Me.time),
              isVisibleSecond: D.isVisibleSecond,
              title: x("com.timepicker.time", { def: "Time" }),
              isVisibleNow: !1
            }
          )
        ] }),
        ee()
      ]
    }
  );
}, tr = () => K().format("YYYY-MM-DD"), vr = ({
  className: t,
  style: m,
  value: n = { date: tr(), startTime: "00:00:00", endTime: "00:00:00" },
  dateFormat: l = "YYYY-MM-DD",
  onChange: y,
  maxYear: O,
  minYear: V,
  locale: M,
  isVisibleFastPicker: w = !1,
  isVisibleSecond: P = !0,
  onClickOk: b,
  minDate: _,
  maxDate: S,
  isDark: x
}) => {
  const { i18n: R } = ve(M), j = { minYear: V, maxYear: O, minDate: _, maxDate: S, dateFormat: l, locale: M, isDark: x }, $ = { locale: M, isDark: x, onClickOk: b, isVisibleSecond: P }, D = (U) => {
    const q = Zt(U, l, $.isVisibleSecond);
    q && y && y(q);
  }, Y = () => /* @__PURE__ */ r.jsxs("div", { className: u.dateRangeLabelCheckCardCreate, children: [
    /* @__PURE__ */ r.jsx("button", { className: u.dateRangeButton, type: "button", onClick: () => D(ke.now), children: /* @__PURE__ */ r.jsx("span", { children: R("com.rangeTimeDatepicker.now", { def: "Now" }) }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.dateRangeButton, type: "button", onClick: () => D(ke.oneHour), children: /* @__PURE__ */ r.jsx("span", { children: R("com.rangeTimeDatepicker.oneHour", { def: "1 Hour" }) }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.dateRangeButton, type: "button", onClick: () => D(ke.twoHour), children: /* @__PURE__ */ r.jsx("span", { children: R("com.rangeTimeDatepicker.twoHour", { def: "2 Hour" }) }) }),
    /* @__PURE__ */ r.jsx("button", { className: u.dateRangeButton, type: "button", onClick: () => D(ke.fourHour), children: /* @__PURE__ */ r.jsx("span", { children: R("com.rangeTimeDatepicker.fourHour", { def: "4 Hour" }) }) })
  ] });
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      "data-fast": w ? "" : void 0,
      className: ne(
        u.root,
        u.dateRangeRoot,
        t,
        { "dark-theme": x }
      ),
      style: m,
      children: [
        Y(),
        /* @__PURE__ */ r.jsx(
          $e,
          {
            ...j,
            value: n.date,
            onChange: (U) => {
              y && y({
                ...n,
                date: U
              });
            }
          }
        ),
        /* @__PURE__ */ r.jsx(
          We,
          {
            ...$,
            title: R("com.timepicker.start", { def: "Start" }),
            value: n.startTime,
            onChange: (U) => {
              y && y({
                ...n,
                startTime: U
              });
            },
            isVisibleSecond: $.isVisibleSecond,
            isVisibleNow: !1
          }
        ),
        /* @__PURE__ */ r.jsx(
          We,
          {
            ...$,
            title: R("com.timepicker.end", { def: "End" }),
            value: n.endTime,
            onChange: (U) => {
              y && y({
                ...n,
                endTime: U
              });
            },
            isVisibleSecond: $.isVisibleSecond,
            isVisibleNow: !1
          }
        )
      ]
    }
  );
}, ft = (t, m, n) => {
  const l = K(n);
  return l.isValid() ? ht(K(m), l) : ht(K(m), t);
}, ht = (t, m) => {
  const n = m.diff(t, "day"), l = Math.floor(n / 7), y = t.add(l * 7, "day");
  return y.add(6, "day"), y;
}, pt = {
  weekDay: [1, 2, 3, 4, 5, 6, 7],
  month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}, rr = "acrool-react-datepicker__week-datepicker-module__root", nr = "acrool-react-datepicker__week-datepicker-module__theme-dark", ar = "acrool-react-datepicker__week-datepicker-module__date-year-month-wrapper", or = "acrool-react-datepicker__week-datepicker-module__date-year-month", ir = "acrool-react-datepicker__week-datepicker-module__date-year-month-select", sr = "acrool-react-datepicker__week-datepicker-module__week-wrapper", cr = "acrool-react-datepicker__week-datepicker-module__current-day", dr = "acrool-react-datepicker__week-datepicker-module__date-day", ur = "acrool-react-datepicker__week-datepicker-module__date-day-text", fe = {
  root: rr,
  "theme-dark": "acrool-react-datepicker__week-datepicker-module__theme-dark",
  themeDark: nr,
  "date-year-month-wrapper": "acrool-react-datepicker__week-datepicker-module__date-year-month-wrapper",
  dateYearMonthWrapper: ar,
  "date-year-month": "acrool-react-datepicker__week-datepicker-module__date-year-month",
  dateYearMonth: or,
  "date-year-month-select": "acrool-react-datepicker__week-datepicker-module__date-year-month-select",
  dateYearMonthSelect: ir,
  "week-wrapper": "acrool-react-datepicker__week-datepicker-module__week-wrapper",
  weekWrapper: sr,
  "current-day": "acrool-react-datepicker__week-datepicker-module__current-day",
  currentDay: cr,
  "date-day": "acrool-react-datepicker__week-datepicker-module__date-day",
  dateDay: dr,
  "date-day-text": "acrool-react-datepicker__week-datepicker-module__date-day-text",
  dateDayText: ur
}, _r = ({
  className: t,
  style: m,
  value: n,
  format: l = "YYYY-MM-DD",
  onChange: y,
  onChangeYearMonthPanel: O,
  isVisibleSetToday: V = !1,
  locale: M = "en-US",
  minYear: w = 1911,
  maxYear: P,
  isDark: b = !1,
  minDate: _,
  maxDate: S,
  tagDate: x = [],
  startWeekDate: R
}) => {
  const j = Ce(), { i18n: $ } = ve(M), [D, Y] = Ae(ft(j, R, n)), U = typeof P < "u" ? P : Number(j.add(1, "year").year());
  Be(() => {
    const T = K(), p = ft(T, R, n), F = p.get("year"), k = p.get("month"), c = p.get("date");
    E(F, k, c);
  }, [n]), De(() => pt.weekDay.map((T) => $(`com.datepicker.weekDay.${T}`, { def: String(T) })), [M]);
  const q = De(() => pt.month.map((T) => ({ text: $(`com.datepicker.month.${T}`), value: T - 1 })), [M]), Z = De(() => {
    const T = U - w + 1, p = Array.from({ length: T }).map((k) => U), F = $("com.datepicker.unit.year", { def: "Year" });
    return p.map((k, c) => {
      const a = k - c;
      return { text: `${a}${F}`, value: a };
    });
  }, [M]), E = pe((T, p, F) => {
    let k = D;
    typeof T < "u" && (k = k.set("year", T)), typeof p < "u" && (k = k.set("month", p)), typeof F < "u" && (k = k.set("date", F)), O && O({ year: k.year(), month: k.month() + 1 }), Y(k);
  }, [D]), ee = (T, p, F) => {
    let k = D;
    T && (k = k.set("year", T)), p && (k = k.set("month", p)), F && (k = k.set("date", F));
    const c = k.format(l);
    y(c);
  }, H = () => {
    const T = D.subtract(7, "day"), p = D.add(7, "day"), F = Z.find((c) => String(c.value) === String(D.year())), k = q.find((c) => c.value === D.month());
    return /* @__PURE__ */ r.jsx("div", { className: u.dateYearMonthRow, children: /* @__PURE__ */ r.jsxs("div", { className: u.dateChangeControl, children: [
      /* @__PURE__ */ r.jsxs("div", { className: u.dateYearMonth, children: [
        /* @__PURE__ */ r.jsxs("div", { className: fe.dateYearMonthWrapper, children: [
          /* @__PURE__ */ r.jsx("span", { className: fe.dateYearMonth, children: F == null ? void 0 : F.text }),
          /* @__PURE__ */ r.jsx(
            "select",
            {
              className: fe.dateYearMonthSelect,
              onChange: (c) => E(D.set("year", Number(c.target.value)).year()),
              value: D.year(),
              children: Z.map((c) => /* @__PURE__ */ r.jsx("option", { value: c.value, children: c.text }, c.value))
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: fe.dateYearMonthWrapper, children: [
          /* @__PURE__ */ r.jsx("span", { className: fe.dateYearMonth, children: k == null ? void 0 : k.text }),
          /* @__PURE__ */ r.jsx(
            "select",
            {
              className: fe.dateYearMonthSelect,
              onChange: (c) => E(void 0, D.set("month", Number(c.target.value)).month()),
              value: D.month(),
              children: q.map((c) => /* @__PURE__ */ r.jsx("option", { value: c.value, children: c.text }, c.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: ne(u.dateMonthButton, "pre-month"),
          type: "button",
          onClick: () => E(
            T.year(),
            T.month(),
            T.date()
          ),
          children: /* @__PURE__ */ r.jsx(Oe, {})
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: ne(u.dateMonthButton, "next-month"),
          type: "button",
          onClick: () => E(
            p.year(),
            p.month(),
            p.date()
          ),
          children: /* @__PURE__ */ r.jsx(Oe, {})
        }
      )
    ] }) });
  }, X = () => {
    const T = K(n), p = 7, F = Array.from({ length: p });
    for (let k = 0; k < p; k++) {
      const c = D.add(k, "day"), a = c.date(), o = c.day() + 1, d = !!(_ && c.isBefore(_, "date") || S && c.isAfter(S, "date"));
      F[k] = {
        isActive: T.isSame(c, "date"),
        isToday: j.isSame(c, "date"),
        isTag: x == null ? void 0 : x.includes(c.format("YYYY-MM-DD")),
        isDisable: d,
        className: u.dateDay,
        date: c,
        dayInWeek: o,
        dayNumber: a,
        onClick: () => d ? {} : ee(c.year(), c.month(), a)
      };
    }
    return /* @__PURE__ */ r.jsx("div", { className: u.dateDayRow, children: /* @__PURE__ */ r.jsx("div", { className: fe.weekWrapper, children: F.map((k) => /* @__PURE__ */ r.jsx(
      "div",
      {
        className: fe.dateDay,
        "data-active": k.isActive ? "" : void 0,
        "data-today": k.isToday ? "" : void 0,
        "data-tag": k.isTag ? "" : void 0,
        "data-disable": k.isDisable ? "" : void 0,
        onClick: k.onClick,
        children: /* @__PURE__ */ r.jsx("div", { className: fe.dateDayText, "data-week-date": $(`com.datepicker.weekDay.${k.dayInWeek}`, { def: String(k.dayInWeek) }), children: k.dayNumber })
      },
      `currentDay-${k.date}`
    )) }) });
  };
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: ne(
        t,
        { "theme-dark": b },
        fe.root
      ),
      style: m,
      children: [
        H(),
        X()
      ]
    }
  );
};
export {
  kr as DateTimepicker,
  yr as DateTimepicker2,
  mr as Datepicker,
  fr as RangeDatepicker,
  vr as RangeTimeDatepicker,
  hr as Timepicker,
  pr as Timepicker2,
  _r as WeekDatepicker,
  u as datepickerElClassNames,
  ft as getValueInWeekStartDate
};
