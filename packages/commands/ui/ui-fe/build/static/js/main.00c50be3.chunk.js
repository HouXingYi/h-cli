(this["webpackJsonp@h-cli/ui-fe"]=this["webpackJsonp@h-cli/ui-fe"]||[]).push([[0],{177:function(n,t,e){},289:function(n,t,e){"use strict";e.r(t);var r=e(0),c=e.n(r),o=e(14),a=e.n(o),i=(e(177),e(88)),u=e(89),s=e(169),l=e(166),d=function(n){Object(s.a)(e,n);var t=Object(l.a)(e);function e(){var n;Object(i.a)(this,e);for(var r=arguments.length,c=new Array(r),o=0;o<r;o++)c[o]=arguments[o];return(n=t.call.apply(t,[this].concat(c))).state={error:null},n}return Object(u.a)(e,[{key:"render",value:function(){var n=this.state.error,t=this.props,e=t.fallbackRender,r=t.children;return n?e({error:n}):r}}],[{key:"getDerivedStateFromError",value:function(n){return{error:n}}}]),e}(c.a.Component),f=e(52),b=e(53),g=e(54);var v=e(57),O=e(39),m=e(170),p=e(290);function h(n,t,e){if("start"===n){var r=t.progress;e(Object(O.d)(r))}else if("startEnd"===n){var o="open".concat(Date.now()),a=c.a.createElement(p.a,{type:"primary",size:"small",onClick:function(){m.a.close(o),e(Object(O.f)(!1)),e(Object(O.e)())}},"\u7acb\u5373\u5173\u95ed");m.a.open({message:"\u901a\u77e5",description:"\u547d\u4ee4\u6267\u884c\u5b8c\u6210 \u5f39\u7a97\u5c06\u572830\u79d2\u540e\u5173\u95ed",duration:30,key:o,btn:a,onClose:function(){e(Object(O.f)(!1)),e(Object(O.e)())}})}}var j=function(n){g.b.subscribeIO("cwd",(function(t,e){!function(n,t,e){function r(n){var t=n.cwd,r=function(n){for(var t=[],e=0,r=0,c=function(r){var c=n.substring(e,r),o=n.substring(0,r+1);t.push({name:c,path:o})};-1===(r=n.indexOf("/",e))&&(r=n.indexOf("\\",e)),-1!==r;)c(r),e=r+1;return e<n.length&&c(n.length),t}(t);e(Object(v.e)(r)),e(Object(v.f)(t))}function c(n){var t=n.list;e(Object(v.g)(t))}"getcwd"===n||"openParent"===n?r(t):"getcurrentList"===n?c(t):"openFolder"===n&&r(t)}(t,e,n)})),g.b.subscribeIO("init",(function(t,e){!function(n,t,e){h(n,t,e)}(t,e,n)})),g.b.subscribeIO("publish",(function(t,e){!function(n,t,e){h(n,t,e)}(t,e,n)}))},w=e(74),y=c.a.lazy((function(){return Promise.all([e.e(3),e.e(4)]).then(e.bind(null,383))}));var E=function(){var n=Object(w.b)();return Object(b.b)((function(){j(n)})),c.a.createElement("div",{className:"App"},c.a.createElement(d,{fallbackRender:f.d},c.a.createElement(c.a.Suspense,{fallback:c.a.createElement(f.e,null)},c.a.createElement(y,null))))},k=function(n){n&&n instanceof Function&&e.e(5).then(e.bind(null,380)).then((function(t){var e=t.getCLS,r=t.getFID,c=t.getFCP,o=t.getLCP,a=t.getTTFB;e(n),r(n),c(n),o(n),a(n)}))},C=(e(288),e(119)),L=e(62),x={cwd:v.a.reducer,logs:O.a.reducer},I=Object(L.a)({reducer:x}),F=function(n){var t=n.children;return c.a.createElement(w.a,{store:I},c.a.createElement(C.a,null,c.a.createElement(g.a,null,t)))};a.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(F,null,c.a.createElement(E,null))),document.getElementById("root")),k()},39:function(n,t,e){"use strict";e.d(t,"a",(function(){return c})),e.d(t,"d",(function(){return a})),e.d(t,"f",(function(){return i})),e.d(t,"e",(function(){return u})),e.d(t,"b",(function(){return s})),e.d(t,"c",(function(){return l}));var r=e(62),c=Object(r.b)({name:"logs",initialState:{logs:[],logsModal:!1},reducers:{setLogs:function(n,t){n.logs.push(t.payload)},setLogsModal:function(n,t){n.logsModal=t.payload},setLogsClean:function(n){n.logs=[]}}}),o=c.actions,a=o.setLogs,i=o.setLogsModal,u=o.setLogsClean,s=function(n){return n.logs.logs},l=function(n){return n.logs.logsModal}},52:function(n,t,e){"use strict";e.d(t,"f",(function(){return O})),e.d(t,"e",(function(){return p})),e.d(t,"d",(function(){return h})),e.d(t,"b",(function(){return j})),e.d(t,"g",(function(){return w})),e.d(t,"c",(function(){return y})),e.d(t,"a",(function(){return E}));var r,c,o,a,i,u,s=e(41),l=e(42),d=e(0),f=e.n(d),b=e(291),g=e(292),v=e(290),O=l.a.div(r||(r=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: ",";\n    margin-bottom: ",";\n    > * {\n        margin-top: 0 !important;\n        margin-bottom: 0 !important;\n        margin-right: ",";\n    }\n"])),(function(n){return n.between?"space-between":void 0}),(function(n){return n.marginBottom+"rem"}),(function(n){return"number"===typeof n.gap?n.gap+"rem":n.gap?"2rem":void 0})),m=l.a.div(c||(c=Object(s.a)(["\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n"]))),p=function(){return f.a.createElement(m,null,f.a.createElement(b.a,{size:"large"}))},h=function(n){var t=n.error;return f.a.createElement(m,null,f.a.createElement(g.a.Text,{type:"danger"},null===t||void 0===t?void 0:t.message))},j=Object(l.a)(v.a)(o||(o=Object(s.a)(["\n    padding: 0;\n"]))),w=l.a.div(a||(a=Object(s.a)(["\n    padding: 3.2rem;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n"]))),y=l.a.div(i||(i=Object(s.a)(["\n    flex: 100% 1 1;\n    height: 100%;\n    overflow: hidden;\n"]))),E=l.a.div(u||(u=Object(s.a)(["\n    flex: auto 0 0;\n    padding: 1rem;\n    text-align: center;\n"])))},53:function(n,t,e){"use strict";e.d(t,"b",(function(){return c})),e.d(t,"a",(function(){return o})),e.d(t,"c",(function(){return a}));e(64);var r=e(0),c=function(n){Object(r.useEffect)((function(){n()}),[])},o=function(){return window.location.href=window.location.origin},a=function(){var n=Object(r.useRef)(!1);return Object(r.useEffect)((function(){return n.current=!0,function(){n.current=!1}})),n}},54:function(n,t,e){"use strict";e.d(t,"b",(function(){return h})),e.d(t,"a",(function(){return w}));var r=e(99),c=e.n(r),o=e(114),a=e(0),i=e.n(a),u=e(53),s=e(64),l=e(40),d={stat:"idle",data:null,error:null},f={throwOnError:!1},b=function(n,t){var e=Object(l.a)(Object(l.a)({},f),t),r=Object(a.useReducer)((function(n,t){return Object(l.a)(Object(l.a)({},n),t)}),Object(l.a)(Object(l.a)({},d),n)),c=Object(s.a)(r,2),o=c[0],i=function(n){var t=Object(u.c)();return Object(a.useCallback)((function(){return t.current?n.apply(void 0,arguments):void 0}),[n,t])}(c[1]),b=Object(a.useState)((function(){return function(){}})),g=Object(s.a)(b,2),v=g[0],O=g[1],m=Object(a.useCallback)((function(n){return i({data:n,stat:"success",error:null})}),[i]),p=Object(a.useCallback)((function(n){return i({error:n,stat:"error",data:null})}),[i]),h=Object(a.useCallback)((function(n,t){if(!n||!n.then)throw new Error("\u8bf7\u4f20\u5165 Promise \u7c7b\u578b\u6570\u636e");return O((function(){return function(){(null===t||void 0===t?void 0:t.retry)&&h(null===t||void 0===t?void 0:t.retry(),t)}})),i({stat:"loading"}),n.then((function(n){return m(n),n})).catch((function(n){return p(n),e.throwOnError?Promise.reject(n):n}))}),[e.throwOnError,m,p,i]);return Object(l.a)({isIdle:"idle"===o.stat,isLoading:"loading"===o.stat,isError:"error"===o.stat,isSuccess:"success"===o.stat,run:h,setData:m,setError:p,retry:v},o)},g=e(52),v=e(88),O=e(89),m=e(165),p=e.n(m),h=new(function(){function n(){Object(v.a)(this,n),this.socket=void 0,this.id=void 0,console.log("\u521d\u59cb\u5316ws"),this.socket=null,this.id=null}return Object(O.a)(n,[{key:"connectIO",value:function(){var n=this;return new Promise((function(t,e){n.socket=p()("ws://localhost:3333"),console.log("socket",n.socket),n.socket.on("connect",(function(){n.socket&&(n.id=n.socket.id,t(n.id))}))}))}},{key:"subscribeIO",value:function(n,t){this.socket&&this.socket.on(n,(function(n){var e=n.action,r=n.payload;t(e,r)}))}},{key:"send",value:function(n,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(this.socket){var r={action:t,payload:e};this.socket.emit(n,r)}}}]),n}()),j=function(){var n=Object(o.a)(c.a.mark((function n(){return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,h.connectIO();case 2:return n.abrupt("return",h);case 3:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),w=function(n){var t=n.children,e=b(),r=e.error,c=e.isLoading,o=e.isIdle,a=e.isError,s=e.run;return Object(u.b)((function(){console.log("WsProvider"),s(j())})),o||c?i.a.createElement(g.e,null):a?i.a.createElement(g.d,{error:r}):i.a.createElement("div",null,t)}},57:function(n,t,e){"use strict";e.d(t,"a",(function(){return c})),e.d(t,"e",(function(){return a})),e.d(t,"g",(function(){return i})),e.d(t,"f",(function(){return u})),e.d(t,"b",(function(){return s})),e.d(t,"d",(function(){return l})),e.d(t,"c",(function(){return d}));var r=e(62),c=Object(r.b)({name:"cwd",initialState:{addressArr:[],folderList:[],cwd:""},reducers:{setCwd:function(n,t){n.cwd=t.payload},setAddress:function(n,t){n.addressArr=t.payload},setFolder:function(n,t){n.folderList=t.payload}}}),o=c.actions,a=o.setAddress,i=o.setFolder,u=o.setCwd,s=function(n){return n.cwd.addressArr},l=function(n){return n.cwd.folderList},d=function(n){return n.cwd.cwd}}},[[289,1,2]]]);
//# sourceMappingURL=main.00c50be3.chunk.js.map