import { openBlock as c, createBlock as I, resolveDynamicComponent as S, h as l, defineComponent as U, resolveComponent as V, createElementBlock as f, withDirectives as u, createElementVNode as p, normalizeStyle as m, renderSlot as g, normalizeProps as j, guardReactiveProps as W, createVNode as G, vShow as y, Fragment as C, createTextVNode as b, toDisplayString as E } from "vue";
const Y = {
  // the default spinner type
  spinner: "default",
  // the default critical distance
  distance: 100,
  // the default force use infinite wrapper flag
  forceUseInfiniteWrapper: !1
}, D = {
  // the default throttle space of time
  throttleLimit: 50,
  // the timeout for check infinite loop, unit: ms
  loopCheckTimeout: 1e3,
  // the max allowed number of continuous calls, unit: ms
  loopCheckMaxCalls: 10
}, _ = {
  noResults: "No results :(",
  noMore: "No more data :)",
  error: "Opps, something went wrong :(",
  errorBtnText: "Retry",
  spinner: ""
}, h = (() => {
  let e = !1;
  try {
    const t = Object.defineProperty({}, "passive", {
      get() {
        return e = { passive: !0 }, !0;
      }
    });
    window.addEventListener("testpassive", t, t), window.remove("testpassive", t, t);
  } catch {
  }
  return e;
})(), d = {
  STATE_CHANGER: [
    "emit `loaded` and `complete` event through component instance of `$refs` may cause error, so it will be deprecated soon, please use the `$state` argument instead (`$state` just the special `$event` variable):",
    `
template:`,
    '<infinite-loading @infinite="infiniteHandler"></infinite-loading>',
    `
script:
...
infiniteHandler($state) {
  ajax('https://www.example.com/api/news')
    .then((res) => {
      if (res.data.length) {
        $state.loaded();
      } else {
        $state.complete();
      }
    });
}
...`,
    "",
    "more details: https://github.com/PeachScript/vue-infinite-loading/issues/57#issuecomment-324370549"
  ].join(`
`),
  INFINITE_EVENT: "`:on-infinite` property will be deprecated soon, please use `@infinite` event instead.",
  IDENTIFIER: "the `reset` event will be deprecated soon, please reset this component by change the `identifier` property."
}, F = {
  INFINITE_LOOP: [
    `executed the callback function more than ${D.loopCheckMaxCalls} times for a short time, it looks like searched a wrong scroll wrapper that doest not has fixed height or maximum height, please check it. If you want to force to set a element as scroll wrapper ranther than automatic searching, you can do this:`,
    `
<!-- add a special attribute for the real scroll wrapper -->
<div infinite-wrapper>
  ...
  <!-- set force-use-infinite-wrapper -->
  <infinite-loading force-use-infinite-wrapper></infinite-loading>
</div>
or
<div class="infinite-wrapper">
  ...
  <!-- set force-use-infinite-wrapper as css selector of the real scroll wrapper -->
  <infinite-loading force-use-infinite-wrapper=".infinite-wrapper"></infinite-loading>
</div>
    `,
    "more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169"
  ].join(`
`)
}, n = {
  READY: 0,
  LOADING: 1,
  COMPLETE: 2,
  ERROR: 3
}, z = {
  color: "#666",
  fontSize: "14px",
  padding: "10px 0"
}, r = {
  mode: "development",
  props: Y,
  system: D,
  slots: _,
  WARNINGS: d,
  ERRORS: F,
  STATUS: n
}, H = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, o] of t)
    s[i] = o;
  return s;
}, O = {
  BUBBLES: {
    render() {
      return l("span", {
        class: "loading-bubbles"
      }, Array.apply(Array, Array(8)).map(() => l("span", {
        class: "bubble-item"
      })));
    }
  },
  CIRCLES: {
    render() {
      return l("span", {
        class: "loading-circles"
      }, Array.apply(Array, Array(8)).map(() => l("span", {
        class: "circle-item"
      })));
    }
  },
  DEFAULT: {
    render() {
      return l("i", {
        class: "loading-default"
      });
    }
  },
  SPIRAL: {
    render() {
      return l("i", {
        class: "loading-spiral"
      });
    }
  },
  WAVEDOTS: {
    render() {
      return l("span", {
        attrs: {
          class: "loading-wave-dots"
        }
      }, Array.apply(Array, Array(5)).map(() => l("span", {
        class: "wave-item"
      })));
    }
  }
}, q = {
  name: "Spinner",
  computed: {
    spinnerView() {
      return O[(this.$attrs.spinner || "").toUpperCase()] || this.spinnerInConfig;
    },
    spinnerInConfig() {
      let e;
      return r.slots.spinner && typeof r.slots.spinner == "string" ? e = {
        render() {
          return this._v(r.slots.spinner);
        }
      } : typeof r.slots.spinner == "object" ? e = r.slots.spinner : e = O[r.props.spinner.toUpperCase()] || O.DEFAULT, e;
    }
  }
};
function x(e, t, s, i, o, a) {
  return c(), I(S(a.spinnerView));
}
const Z = /* @__PURE__ */ H(q, [["render", x], ["__scopeId", "data-v-8f78e505"]]);
function v(e) {
  r.mode !== "production" && console.warn(`[Vue-infinite-loading warn]: ${e}`);
}
function J(e) {
  console.error(`[Vue-infinite-loading error]: ${e}`);
}
const w = {
  timers: [],
  caches: [],
  throttle(e) {
    this.caches.indexOf(e) === -1 && (this.caches.push(e), this.timers.push(setTimeout(() => {
      e(), this.caches.splice(this.caches.indexOf(e), 1), this.timers.shift();
    }, r.system.throttleLimit)));
  },
  reset() {
    this.timers.forEach((e) => {
      clearTimeout(e);
    }), this.timers.length = 0, this.caches = [];
  }
}, P = {
  isChecked: !1,
  timer: null,
  times: 0,
  track() {
    this.times += 1, clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.isChecked = !0;
    }, r.system.loopCheckTimeout), this.times > r.system.loopCheckMaxCalls && (J(F.INFINITE_LOOP), this.isChecked = !0);
  }
}, $ = {
  key: "_infiniteScrollHeight",
  getScrollElm(e) {
    return e === window ? document.documentElement : e;
  },
  save(e) {
    const t = this.getScrollElm(e);
    t[this.key] = t.scrollHeight;
  },
  restore(e) {
    const t = this.getScrollElm(e);
    typeof t[this.key] == "number" && (t.scrollTop = t.scrollHeight - t[this.key] + t.scrollTop), this.remove(t);
  },
  remove(e) {
    e[this.key] !== void 0 && delete e[this.key];
  }
};
function K(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function k(e) {
  return e.offsetWidth + e.offsetHeight > 0;
}
function Q(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var R = { exports: {} };
function N() {
}
N.prototype = {
  on: function(e, t, s) {
    var i = this.e || (this.e = {});
    return (i[e] || (i[e] = [])).push({
      fn: t,
      ctx: s
    }), this;
  },
  once: function(e, t, s) {
    var i = this;
    function o() {
      i.off(e, o), t.apply(s, arguments);
    }
    return o._ = t, this.on(e, o, s);
  },
  emit: function(e) {
    var t = [].slice.call(arguments, 1), s = ((this.e || (this.e = {}))[e] || []).slice(), i = 0, o = s.length;
    for (i; i < o; i++)
      s[i].fn.apply(s[i].ctx, t);
    return this;
  },
  off: function(e, t) {
    var s = this.e || (this.e = {}), i = s[e], o = [];
    if (i && t)
      for (var a = 0, T = i.length; a < T; a++)
        i[a].fn !== t && i[a].fn._ !== t && o.push(i[a]);
    return o.length ? s[e] = o : delete s[e], this;
  }
};
R.exports = N;
R.exports.TinyEmitter = N;
var X = R.exports, ee = X, te = new ee();
const L = /* @__PURE__ */ Q(te), se = {
  $on: (...e) => L.on(...e),
  $once: (...e) => L.once(...e),
  $off: (...e) => L.off(...e),
  $emit: (...e) => L.emit(...e)
}, ie = U({
  name: "InfiniteLoading",
  data() {
    return {
      scrollParent: null,
      scrollHandler: null,
      isFirstLoad: !0,
      // save the current loading whether it is the first loading
      status: n.READY,
      slots: r.slots
    };
  },
  components: {
    Spinner: Z
  },
  computed: {
    isShowSpinner() {
      return this.status === n.LOADING;
    },
    isShowError() {
      return this.status === n.ERROR;
    },
    isShowNoResults() {
      return this.status === n.COMPLETE && this.isFirstLoad;
    },
    isShowNoMore() {
      return this.status === n.COMPLETE && !this.isFirstLoad;
    },
    slotStyles() {
      const e = {};
      return Object.keys(r.slots).forEach((t) => {
        const s = K(t);
        // no slot and the configured default slot is not a Vue component
        (!this.$slots[s] && !r.slots[t].render || this.$slots[s] && !this.$slots[s][0].tag) && (e[t] = z);
      }), e;
    }
  },
  props: {
    distance: {
      type: Number,
      default: r.props.distance
    },
    spinner: String,
    direction: {
      type: String,
      default: "bottom"
    },
    forceUseInfiniteWrapper: {
      type: [Boolean, String],
      default: r.props.forceUseInfiniteWrapper
    },
    identifier: {
      default: +/* @__PURE__ */ new Date()
    },
    onInfinite: Function
  },
  watch: {
    identifier() {
      this.stateChanger.reset();
    }
  },
  created() {
    this.bus = se;
  },
  mounted() {
    this.$watch("forceUseInfiniteWrapper", () => {
      this.scrollParent = this.getScrollParent();
    }, { immediate: !0 }), this.scrollHandler = (e) => {
      this.status === n.READY && (e && e.constructor === Event && k(this.$el) ? w.throttle(this.attemptLoad) : this.attemptLoad());
    }, setTimeout(() => {
      this.scrollHandler(), this.scrollParent.addEventListener("scroll", this.scrollHandler, h);
    }, 1), this.bus.$on("$InfiniteLoading:loaded", (e) => {
      this.isFirstLoad = !1, this.direction === "top" && this.$nextTick(() => {
        $.restore(this.scrollParent);
      }), this.status === n.LOADING && this.$nextTick(this.attemptLoad.bind(null, !0)), (!e || e.target !== this) && v(d.STATE_CHANGER);
    }), this.bus.$on("$InfiniteLoading:complete", (e) => {
      this.status = n.COMPLETE, this.$nextTick(() => {
        this.$forceUpdate();
      }), this.scrollParent.removeEventListener("scroll", this.scrollHandler, h), (!e || e.target !== this) && v(d.STATE_CHANGER);
    }), this.bus.$on("$InfiniteLoading:reset", (e) => {
      this.status = n.READY, this.isFirstLoad = !0, $.remove(this.scrollParent), this.scrollParent.addEventListener("scroll", this.scrollHandler, h), setTimeout(() => {
        w.reset(), this.scrollHandler();
      }, 1), (!e || e.target !== this) && v(d.IDENTIFIER);
    }), this.stateChanger = {
      loaded: () => {
        this.bus.$emit("$InfiniteLoading:loaded", { target: this });
      },
      complete: () => {
        this.bus.$emit("$InfiniteLoading:complete", { target: this });
      },
      reset: () => {
        this.bus.$emit("$InfiniteLoading:reset", { target: this });
      },
      error: () => {
        this.status = n.ERROR, w.reset();
      }
    }, this.onInfinite && v(d.INFINITE_EVENT);
  },
  /**
   * To adapt to keep-alive feature, but only work on Vue 2.2.0 and above, see: https://vuejs.org/v2/api/#keep-alive
   */
  deactivated() {
    this.status === n.LOADING && (this.status = n.READY), this.scrollParent.removeEventListener("scroll", this.scrollHandler, h);
  },
  activated() {
    this.scrollParent.addEventListener("scroll", this.scrollHandler, h);
  },
  methods: {
    /**
    * attempt trigger load
    * @param {Boolean} isContinuousCall  the flag of continuous call, it will be true
    *                                    if this method be called in the `loaded`
    *                                    event handler
    */
    attemptLoad(e) {
      this.status !== n.COMPLETE && k(this.$el) && this.getCurrentDistance() <= this.distance ? (this.status = n.LOADING, this.direction === "top" && this.$nextTick(() => {
        $.save(this.scrollParent);
      }), typeof this.onInfinite == "function" ? this.onInfinite.call(null, this.stateChanger) : this.$emit("infinite", this.stateChanger), e && !this.forceUseInfiniteWrapper && !P.isChecked && P.track()) : this.status === n.LOADING && (this.status = n.READY);
    },
    /**
    * get current distance from the specified direction
    * @return {Number}     distance
    */
    getCurrentDistance() {
      let e;
      if (this.direction === "top")
        e = typeof this.scrollParent.scrollTop == "number" ? this.scrollParent.scrollTop : this.scrollParent.pageYOffset;
      else {
        const t = this.$el.getBoundingClientRect().top, s = this.scrollParent === window ? window.innerHeight : this.scrollParent.getBoundingClientRect().bottom;
        e = t - s;
      }
      return e;
    },
    /**
    * get the first scroll parent of an element
    * @param  {DOM} elm    cache element for recursive search
    * @return {DOM}        the first scroll parent
    */
    getScrollParent(e = this.$el) {
      let t;
      return typeof this.forceUseInfiniteWrapper == "string" && (t = document.querySelector(this.forceUseInfiniteWrapper)), t || (e.tagName === "BODY" ? t = window : (!this.forceUseInfiniteWrapper && ["scroll", "auto"].indexOf(getComputedStyle(e).overflowY) > -1 || e.hasAttribute("infinite-wrapper") || e.hasAttribute("data-infinite-wrapper")) && (t = e)), t || this.getScrollParent(e.parentNode);
    }
  },
  destroyed() {
    !this.status !== n.COMPLETE && (w.reset(), $.remove(this.scrollParent), this.scrollParent.removeEventListener("scroll", this.scrollHandler, h));
  }
}), re = { class: "infinite-loading-container" }, ne = ["textContent"];
function oe(e, t, s, i, o, a) {
  const T = V("spinner");
  return c(), f("div", re, [
    u(p("div", {
      class: "infinite-status-prompt",
      style: m(e.slotStyles.spinner)
    }, [
      g(e.$slots, "spinner", j(W({ isFirstLoad: e.isFirstLoad })), () => [
        G(T, { spinner: e.spinner }, null, 8, ["spinner"])
      ], !0)
    ], 4), [
      [y, e.isShowSpinner]
    ]),
    u(p("div", {
      class: "infinite-status-prompt",
      style: m(e.slotStyles.noResults)
    }, [
      g(e.$slots, "no-results", {}, () => [
        e.slots.noResults.render ? (c(), I(S(e.slots.noResults), { key: 0 })) : (c(), f(C, { key: 1 }, [
          b(E(e.slots.noResults), 1)
        ], 64))
      ], !0)
    ], 4), [
      [y, e.isShowNoResults]
    ]),
    u(p("div", {
      class: "infinite-status-prompt",
      style: m(e.slotStyles.noMore)
    }, [
      g(e.$slots, "no-more", {}, () => [
        e.slots.noMore.render ? (c(), I(S(e.slots.noMore), { key: 0 })) : (c(), f(C, { key: 1 }, [
          b(E(e.slots.noMore), 1)
        ], 64))
      ], !0)
    ], 4), [
      [y, e.isShowNoMore]
    ]),
    u(p("div", {
      class: "infinite-status-prompt",
      style: m(e.slotStyles.error)
    }, [
      g(e.$slots, "error", { trigger: e.attemptLoad }, () => [
        e.slots.error.render ? (c(), I(S(e.slots.error), {
          key: 0,
          trigger: e.attemptLoad
        }, null, 8, ["trigger"])) : (c(), f(C, { key: 1 }, [
          b(E(e.slots.error) + " ", 1),
          t[1] || (t[1] = p("br", null, null, -1)),
          p("button", {
            class: "btn-try-infinite",
            onClick: t[0] || (t[0] = (...B) => e.attemptLoad && e.attemptLoad(...B)),
            textContent: E(e.slots.errorBtnText)
          }, null, 8, ne)
        ], 64))
      ], !0)
    ], 4), [
      [y, e.isShowError]
    ])
  ]);
}
const A = /* @__PURE__ */ H(ie, [["render", oe], ["__scopeId", "data-v-af7f92c9"]]);
function M(e) {
  r.mode = e.config.productionTip ? "development" : "production";
}
Object.defineProperty(A, "install", {
  configurable: !1,
  enumerable: !1,
  value(e, t) {
    Object.assign(r.props, t && t.props), Object.assign(r.slots, t && t.slots), Object.assign(r.system, t && t.system), e.component("infinite-loading", A), M(e);
  }
});
typeof window < "u" && window.Vue && (window.Vue.component("infinite-loading", A), M(window.Vue));
export {
  A as default
};
