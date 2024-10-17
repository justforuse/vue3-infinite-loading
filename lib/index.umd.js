(function(t,p){typeof exports=="object"&&typeof module<"u"?module.exports=p(require("vue")):typeof define=="function"&&define.amd?define(["vue"],p):(t=typeof globalThis<"u"?globalThis:t||self,t.Vue3InfiniteLoading=p(t.vue))})(this,function(t){"use strict";const p={spinner:"default",distance:100,forceUseInfiniteWrapper:!1},$={throttleLimit:50,loopCheckTimeout:1e3,loopCheckMaxCalls:10},N={noResults:"No results :(",noMore:"No more data :)",error:"Opps, something went wrong :(",errorBtnText:"Retry",spinner:""},c=(()=>{let e=!1;try{const s=Object.defineProperty({},"passive",{get(){return e={passive:!0},!0}});window.addEventListener("testpassive",s,s),window.remove("testpassive",s,s)}catch{}return e})(),h={STATE_CHANGER:["emit `loaded` and `complete` event through component instance of `$refs` may cause error, so it will be deprecated soon, please use the `$state` argument instead (`$state` just the special `$event` variable):",`
template:`,'<infinite-loading @infinite="infiniteHandler"></infinite-loading>',`
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
...`,"","more details: https://github.com/PeachScript/vue-infinite-loading/issues/57#issuecomment-324370549"].join(`
`),INFINITE_EVENT:"`:on-infinite` property will be deprecated soon, please use `@infinite` event instead.",IDENTIFIER:"the `reset` event will be deprecated soon, please reset this component by change the `identifier` property."},L={INFINITE_LOOP:[`executed the callback function more than ${$.loopCheckMaxCalls} times for a short time, it looks like searched a wrong scroll wrapper that doest not has fixed height or maximum height, please check it. If you want to force to set a element as scroll wrapper ranther than automatic searching, you can do this:`,`
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
    `,"more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169"].join(`
`)},o={READY:0,LOADING:1,COMPLETE:2,ERROR:3},b={color:"#666",fontSize:"14px",padding:"10px 0"},n={mode:"development",props:p,system:$,slots:N,WARNINGS:h,ERRORS:L,STATUS:o},T=(e,s)=>{const i=e.__vccOpts||e;for(const[r,a]of s)i[r]=a;return i},y={BUBBLES:{render(){return t.h("span",{class:"loading-bubbles"},Array.apply(Array,Array(8)).map(()=>t.h("span",{class:"bubble-item"})))}},CIRCLES:{render(){return t.h("span",{class:"loading-circles"},Array.apply(Array,Array(8)).map(()=>t.h("span",{class:"circle-item"})))}},DEFAULT:{render(){return t.h("i",{class:"loading-default"})}},SPIRAL:{render(){return t.h("i",{class:"loading-spiral"})}},WAVEDOTS:{render(){return t.h("span",{attrs:{class:"loading-wave-dots"}},Array.apply(Array,Array(5)).map(()=>t.h("span",{class:"wave-item"})))}}},O={name:"Spinner",computed:{spinnerView(){return y[(this.$attrs.spinner||"").toUpperCase()]||this.spinnerInConfig},spinnerInConfig(){let e;return n.slots.spinner&&typeof n.slots.spinner=="string"?e={render(){return this._v(n.slots.spinner)}}:typeof n.slots.spinner=="object"?e=n.slots.spinner:e=y[n.props.spinner.toUpperCase()]||y.DEFAULT,e}}};function A(e,s,i,r,a,l){return t.openBlock(),t.createBlock(t.resolveDynamicComponent(l.spinnerView))}const R=T(O,[["render",A],["__scopeId","data-v-8f78e505"]]);function d(e){n.mode!=="production"&&console.warn(`[Vue-infinite-loading warn]: ${e}`)}function P(e){console.error(`[Vue-infinite-loading error]: ${e}`)}const f={timers:[],caches:[],throttle(e){this.caches.indexOf(e)===-1&&(this.caches.push(e),this.timers.push(setTimeout(()=>{e(),this.caches.splice(this.caches.indexOf(e),1),this.timers.shift()},n.system.throttleLimit)))},reset(){this.timers.forEach(e=>{clearTimeout(e)}),this.timers.length=0,this.caches=[]}},I={isChecked:!1,timer:null,times:0,track(){this.times+=1,clearTimeout(this.timer),this.timer=setTimeout(()=>{this.isChecked=!0},n.system.loopCheckTimeout),this.times>n.system.loopCheckMaxCalls&&(P(L.INFINITE_LOOP),this.isChecked=!0)}},m={key:"_infiniteScrollHeight",getScrollElm(e){return e===window?document.documentElement:e},save(e){const s=this.getScrollElm(e);s[this.key]=s.scrollHeight},restore(e){const s=this.getScrollElm(e);typeof s[this.key]=="number"&&(s.scrollTop=s.scrollHeight-s[this.key]+s.scrollTop),this.remove(s)},remove(e){e[this.key]!==void 0&&delete e[this.key]}};function D(e){return e.replace(/[A-Z]/g,s=>`-${s.toLowerCase()}`)}function C(e){return e.offsetWidth+e.offsetHeight>0}function B(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var E={exports:{}};function w(){}w.prototype={on:function(e,s,i){var r=this.e||(this.e={});return(r[e]||(r[e]=[])).push({fn:s,ctx:i}),this},once:function(e,s,i){var r=this;function a(){r.off(e,a),s.apply(i,arguments)}return a._=s,this.on(e,a,i)},emit:function(e){var s=[].slice.call(arguments,1),i=((this.e||(this.e={}))[e]||[]).slice(),r=0,a=i.length;for(r;r<a;r++)i[r].fn.apply(i[r].ctx,s);return this},off:function(e,s){var i=this.e||(this.e={}),r=i[e],a=[];if(r&&s)for(var l=0,S=r.length;l<S;l++)r[l].fn!==s&&r[l].fn._!==s&&a.push(r[l]);return a.length?i[e]=a:delete i[e],this}},E.exports=w,E.exports.TinyEmitter=w;var F=E.exports,V=F,v=new V;const u=B(v),H={$on:(...e)=>u.on(...e),$once:(...e)=>u.once(...e),$off:(...e)=>u.off(...e),$emit:(...e)=>u.emit(...e)},M=t.defineComponent({name:"InfiniteLoading",data(){return{scrollParent:null,scrollHandler:null,isFirstLoad:!0,status:o.READY,slots:n.slots}},components:{Spinner:R},computed:{isShowSpinner(){return this.status===o.LOADING},isShowError(){return this.status===o.ERROR},isShowNoResults(){return this.status===o.COMPLETE&&this.isFirstLoad},isShowNoMore(){return this.status===o.COMPLETE&&!this.isFirstLoad},slotStyles(){const e={};return Object.keys(n.slots).forEach(s=>{const i=D(s);(!this.$slots[i]&&!n.slots[s].render||this.$slots[i]&&!this.$slots[i][0].tag)&&(e[s]=b)}),e}},props:{distance:{type:Number,default:n.props.distance},spinner:String,direction:{type:String,default:"bottom"},forceUseInfiniteWrapper:{type:[Boolean,String],default:n.props.forceUseInfiniteWrapper},identifier:{default:+new Date},onInfinite:Function},watch:{identifier(){this.stateChanger.reset()}},created(){this.bus=H},mounted(){this.$watch("forceUseInfiniteWrapper",()=>{this.scrollParent=this.getScrollParent()},{immediate:!0}),this.scrollHandler=e=>{this.status===o.READY&&(e&&e.constructor===Event&&C(this.$el)?f.throttle(this.attemptLoad):this.attemptLoad())},setTimeout(()=>{this.scrollHandler(),this.scrollParent.addEventListener("scroll",this.scrollHandler,c)},1),this.bus.$on("$InfiniteLoading:loaded",e=>{this.isFirstLoad=!1,this.direction==="top"&&this.$nextTick(()=>{m.restore(this.scrollParent)}),this.status===o.LOADING&&this.$nextTick(this.attemptLoad.bind(null,!0)),(!e||e.target!==this)&&d(h.STATE_CHANGER)}),this.bus.$on("$InfiniteLoading:complete",e=>{this.status=o.COMPLETE,this.$nextTick(()=>{this.$forceUpdate()}),this.scrollParent.removeEventListener("scroll",this.scrollHandler,c),(!e||e.target!==this)&&d(h.STATE_CHANGER)}),this.bus.$on("$InfiniteLoading:reset",e=>{this.status=o.READY,this.isFirstLoad=!0,m.remove(this.scrollParent),this.scrollParent.addEventListener("scroll",this.scrollHandler,c),setTimeout(()=>{f.reset(),this.scrollHandler()},1),(!e||e.target!==this)&&d(h.IDENTIFIER)}),this.stateChanger={loaded:()=>{this.bus.$emit("$InfiniteLoading:loaded",{target:this})},complete:()=>{this.bus.$emit("$InfiniteLoading:complete",{target:this})},reset:()=>{this.bus.$emit("$InfiniteLoading:reset",{target:this})},error:()=>{this.status=o.ERROR,f.reset()}},this.onInfinite&&d(h.INFINITE_EVENT)},deactivated(){this.status===o.LOADING&&(this.status=o.READY),this.scrollParent.removeEventListener("scroll",this.scrollHandler,c)},activated(){this.scrollParent.addEventListener("scroll",this.scrollHandler,c)},methods:{attemptLoad(e){this.status!==o.COMPLETE&&C(this.$el)&&this.getCurrentDistance()<=this.distance?(this.status=o.LOADING,this.direction==="top"&&this.$nextTick(()=>{m.save(this.scrollParent)}),typeof this.onInfinite=="function"?this.onInfinite.call(null,this.stateChanger):this.$emit("infinite",this.stateChanger),e&&!this.forceUseInfiniteWrapper&&!I.isChecked&&I.track()):this.status===o.LOADING&&(this.status=o.READY)},getCurrentDistance(){let e;if(this.direction==="top")e=typeof this.scrollParent.scrollTop=="number"?this.scrollParent.scrollTop:this.scrollParent.pageYOffset;else{const s=this.$el.getBoundingClientRect().top,i=this.scrollParent===window?window.innerHeight:this.scrollParent.getBoundingClientRect().bottom;e=s-i}return e},getScrollParent(e=this.$el){let s;return typeof this.forceUseInfiniteWrapper=="string"&&(s=document.querySelector(this.forceUseInfiniteWrapper)),s||(e.tagName==="BODY"?s=window:(!this.forceUseInfiniteWrapper&&["scroll","auto"].indexOf(getComputedStyle(e).overflowY)>-1||e.hasAttribute("infinite-wrapper")||e.hasAttribute("data-infinite-wrapper"))&&(s=e)),s||this.getScrollParent(e.parentNode)}},destroyed(){!this.status!==o.COMPLETE&&(f.reset(),m.remove(this.scrollParent),this.scrollParent.removeEventListener("scroll",this.scrollHandler,c))}}),U={class:"infinite-loading-container"},j=["textContent"];function W(e,s,i,r,a,l){const S=t.resolveComponent("spinner");return t.openBlock(),t.createElementBlock("div",U,[t.withDirectives(t.createElementVNode("div",{class:"infinite-status-prompt",style:t.normalizeStyle(e.slotStyles.spinner)},[t.renderSlot(e.$slots,"spinner",t.normalizeProps(t.guardReactiveProps({isFirstLoad:e.isFirstLoad})),()=>[t.createVNode(S,{spinner:e.spinner},null,8,["spinner"])],!0)],4),[[t.vShow,e.isShowSpinner]]),t.withDirectives(t.createElementVNode("div",{class:"infinite-status-prompt",style:t.normalizeStyle(e.slotStyles.noResults)},[t.renderSlot(e.$slots,"no-results",{},()=>[e.slots.noResults.render?(t.openBlock(),t.createBlock(t.resolveDynamicComponent(e.slots.noResults),{key:0})):(t.openBlock(),t.createElementBlock(t.Fragment,{key:1},[t.createTextVNode(t.toDisplayString(e.slots.noResults),1)],64))],!0)],4),[[t.vShow,e.isShowNoResults]]),t.withDirectives(t.createElementVNode("div",{class:"infinite-status-prompt",style:t.normalizeStyle(e.slotStyles.noMore)},[t.renderSlot(e.$slots,"no-more",{},()=>[e.slots.noMore.render?(t.openBlock(),t.createBlock(t.resolveDynamicComponent(e.slots.noMore),{key:0})):(t.openBlock(),t.createElementBlock(t.Fragment,{key:1},[t.createTextVNode(t.toDisplayString(e.slots.noMore),1)],64))],!0)],4),[[t.vShow,e.isShowNoMore]]),t.withDirectives(t.createElementVNode("div",{class:"infinite-status-prompt",style:t.normalizeStyle(e.slotStyles.error)},[t.renderSlot(e.$slots,"error",{trigger:e.attemptLoad},()=>[e.slots.error.render?(t.openBlock(),t.createBlock(t.resolveDynamicComponent(e.slots.error),{key:0,trigger:e.attemptLoad},null,8,["trigger"])):(t.openBlock(),t.createElementBlock(t.Fragment,{key:1},[t.createTextVNode(t.toDisplayString(e.slots.error)+" ",1),s[1]||(s[1]=t.createElementVNode("br",null,null,-1)),t.createElementVNode("button",{class:"btn-try-infinite",onClick:s[0]||(s[0]=(...G)=>e.attemptLoad&&e.attemptLoad(...G)),textContent:t.toDisplayString(e.slots.errorBtnText)},null,8,j)],64))],!0)],4),[[t.vShow,e.isShowError]])])}const g=T(M,[["render",W],["__scopeId","data-v-af7f92c9"]]);function k(e){n.mode=e.config.productionTip?"development":"production"}return Object.defineProperty(g,"install",{configurable:!1,enumerable:!1,value(e,s){Object.assign(n.props,s&&s.props),Object.assign(n.slots,s&&s.slots),Object.assign(n.system,s&&s.system),e.component("infinite-loading",g),k(e)}}),typeof window<"u"&&window.Vue&&(window.Vue.component("infinite-loading",g),k(window.Vue)),g});