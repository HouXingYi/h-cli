(this["webpackJsonp@h-cli/ui-fe"]=this["webpackJsonp@h-cli/ui-fe"]||[]).push([[4],{360:function(e,t){var n=[{name:"React + TS + Redux \u6a21\u677f",npmName:"@h-cli-template/react-ts-redux",installCommand:"yarn",startCommand:"npm run start",type:"normal",version:"1.0.9"},{name:"Vue2 \u6807\u51c6\u6a21\u677f",npmName:"@h-cli-template/vue2-template",installCommand:"yarn",startCommand:"npm run serve",type:"normal",version:"1.0.9"},{name:"Vue3 \u6807\u51c6\u6a21\u677f",npmName:"@h-cli-template/vue3-template",installCommand:"yarn",startCommand:"npm run serve",type:"normal",version:"1.0.9"}];e.exports=function(){return n}},373:function(e,t){},383:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return Ce}));var a,r,l,c,o,i=n(41),m=n(0),u=n.n(m),s=n(119),p=n(8),d=n(42),f=n(382),b=n(52),h=n(290),E=n(388),v=n(54),y=n(53),j=n(74),g=n(57),O=function(){var e=Object(j.c)(g.b),t=Object(j.c)(g.d);function n(e,t){v.b.send("cwd","openFolder",{path:e})}return Object(y.b)((function(){v.b.send("cwd","getcwd")})),Object(m.useEffect)((function(){e.length>0&&v.b.send("cwd","getcurrentList")}),[e]),u.a.createElement(x,null,u.a.createElement(w,null,u.a.createElement(h.a,{type:"primary",shape:"circle",onClick:function(){v.b.send("cwd","openParent")},style:{margin:"0px 10px"},icon:u.a.createElement(E.a,null)}),e.map((function(e,t){return u.a.createElement("span",{key:t},u.a.createElement(h.a,{type:"dashed",value:e.name,style:{margin:"0px 5px"},onClick:function(t){n(e.path)}},e.name),"/")}))),u.a.createElement(k,null,t.map((function(e,t){return u.a.createElement(C,{key:t,onClick:function(t){n(e.path)}},e.name)}))))},x=d.a.div(a||(a=Object(i.a)(["\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n"]))),w=d.a.div(r||(r=Object(i.a)(["\n    flex: auto 0 0;\n"]))),k=d.a.div(l||(l=Object(i.a)(["\n    flex: 100% 1 1;\n    overflow-x: hidden;\n    overflow-y: auto;\n"]))),C=d.a.div(c||(c=Object(i.a)(["\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    user-select: none;\n    cursor: pointer;\n    position: relative;\n    :hover {\n        background: rgb(236, 248, 242);\n    }\n"]))),I=n(64),M=n(389),T=n(99),F=n.n(T),N=n(114),q=n(384),P=n(381),S=n(386),V=n(385),B=n(329),R=n.n(B),z=n(360),G=function(e){console.log("props.openModal",e.openModal);var t=Object(j.c)(g.c),n=e.openModal,a=e.setOpenModal,r=e.onFinish,l=z(),c=q.a.Option;var o=P.a.useForm(),i=Object(I.a)(o,1)[0];function m(){return(m=Object(N.a)(F.a.mark((function e(t,n){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("value",n),!R.a.valid(n)){e.next=6;break}return e.abrupt("return",!0);case 6:throw new Error("\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u7248\u672c\u53f7");case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return u.a.createElement(S.a,{forceRender:!0,onClose:function(){a(!1)},visible:n,width:"100%"},u.a.createElement(J,null,u.a.createElement("h1",null,"\u8bf7\u8f93\u5165\u9879\u76ee\u4fe1\u606f"),u.a.createElement(P.a,{form:i,layout:"vertical",style:{width:"80rem"},onFinish:r,initialValues:{projectPath:"",projectName:"",projectVersion:"1.0.0",projectTemplate:""}},u.a.createElement(P.a.Item,{label:"\u9879\u76ee\u5730\u5740",name:"projectPath",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9879\u76ee\u5730\u5740"}]},u.a.createElement(V.a,{addonBefore:"".concat(t,"\\"),placeholder:"\u8bf7\u8f93\u5165\u9879\u76ee\u5730\u5740"})),u.a.createElement(P.a.Item,{label:"\u9879\u76ee\u540d\u79f0",name:"projectName",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9879\u76ee\u540d\u79f0"}]},u.a.createElement(V.a,{placeholder:"\u8bf7\u8f93\u5165\u9879\u76ee\u540d\u79f0"})),u.a.createElement(P.a.Item,{label:"\u6a21\u677f\u540d\u79f0",name:"projectTemplate",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6a21\u677f\u540d\u79f0"}]},u.a.createElement(q.a,{allowClear:!0},l.map((function(e){return u.a.createElement(c,{key:e.npmName,value:e.npmName},e.name)})))),u.a.createElement(P.a.Item,{label:"\u7248\u672c",name:"projectVersion",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u7248\u672c\u53f7"},{validator:function(e,t){return m.apply(this,arguments)},message:"\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u7248\u672c\u53f7"}]},u.a.createElement(V.a,{placeholder:"\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u7248\u672c\u53f7"})),u.a.createElement(P.a.Item,{style:{textAlign:"right"}},u.a.createElement(h.a,{type:"primary",htmlType:"submit"},"\u63d0\u4ea4")))))},J=d.a.div(o||(o=Object(i.a)(["\n    height: 80vh;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n"]))),U=n(39),A=function(){var e=Object(m.useState)(!1),t=Object(I.a)(e,2),n=t[0],a=t[1],r=Object(j.b)();return u.a.createElement("div",null,u.a.createElement(h.a,{type:"primary",icon:u.a.createElement(M.a,null),size:"large",style:{width:"200px"},onClick:function(){a(!0)}},"\u5f00\u59cb\u521b\u5efa"),u.a.createElement(G,{openModal:n,setOpenModal:a,onFinish:function(e){console.log("values",e),a(!1),function(e){console.log("startInit"),console.log("\u8868\u5355\u6700\u540e\u83b7\u53d6\u7684\u503c",e),a(!1),r(Object(U.f)(!0)),v.b.send("init","start",{projectinfo:e})}(e)}}))};function D(){return u.a.createElement(b.g,null,u.a.createElement(b.c,null,u.a.createElement(O,null)),u.a.createElement(b.a,null,u.a.createElement(A,null)))}var K,L,H,Q,W=n(362),X=n.n(W),Y=n(40),Z=n(379),$=n(363),_=n.n($),ee=["data","token","headers"],te="http://localhost:3333",ne=function(){var e=Object(N.a)(F.a.mark((function e(t){var n,a,r,l,c=arguments;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>1&&void 0!==c[1]?c[1]:{},a=n.data,n.token,n.headers,r=Object(Z.a)(n,ee),"GET"===(l=Object(Y.a)({method:"GET",headers:{"Content-Type":a?"application/json":""}},r)).method.toUpperCase()?t+="?".concat(_.a.stringify(a)):l.body=JSON.stringify(a||{}),e.abrupt("return",window.fetch("".concat(te,"/").concat(t),l).then(function(){var e=Object(N.a)(F.a.mark((function e(t){var n,a;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(n=e.sent,!t.ok){e.next=12;break}if(a=n.data,0!==n.errno){e.next=9;break}return e.abrupt("return",a);case 9:return e.abrupt("return",Promise.reject(n));case 10:e.next=13;break;case 12:return e.abrupt("return",Promise.reject(n));case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ae=function(e){console.log("props.openModal",e.openModal);var t=e.openModal,n=e.setOpenModal,a=e.onFinish,r=q.a.Option,l=Object(m.useState)(!1),c=Object(I.a)(l,2),o=c[0],i=c[1],s=Object(m.useState)(!1),p=Object(I.a)(s,2),d=p[0],f=p[1];var b=P.a.useForm(),E=Object(I.a)(b,1)[0];function v(){return(v=Object(N.a)(F.a.mark((function e(){var t,n;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne("api/ui/checkIfCommit");case 2:t=e.sent,console.log("getData res",t),n=t.ifCommit,i(n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){return(y=Object(N.a)(F.a.mark((function e(){var t,n,a;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne("api/ui/checkIfBump");case 2:t=e.sent,console.log("getData res",t),n=t.ifPrompt,a=n.resBranch,f(!a);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(m.useEffect)((function(){t&&(console.log("\u88ab\u6253\u5f00\u4e86"),function(){v.apply(this,arguments)}(),function(){y.apply(this,arguments)}())}),[t]),u.a.createElement(S.a,{forceRender:!0,onClose:function(){n(!1)},visible:t,width:"100%"},u.a.createElement(re,null,u.a.createElement("h1",null,"\u8bf7\u8f93\u5165\u53d1\u5e03\u4fe1\u606f"),u.a.createElement(P.a,{form:E,layout:"vertical",style:{width:"80rem"},onFinish:a,initialValues:{prod:0}},u.a.createElement(P.a.Item,{label:"\u662f\u5426\u53d1\u5e03\u6b63\u5f0f",name:"prod",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u662f\u5426\u53d1\u5e03\u6b63\u5f0f"}]},u.a.createElement(q.a,{allowClear:!0},u.a.createElement(r,{key:1,value:1},"\u662f"),u.a.createElement(r,{key:0,value:0},"\u5426"))),o?u.a.createElement(P.a.Item,{label:"commit\u4fe1\u606f",name:"commit",rules:[{required:!0,message:"\u8bf7\u8f93\u5165commit\u4fe1\u606f"}]},u.a.createElement(V.a,{placeholder:"\u8bf7\u8f93\u5165commit\u4fe1\u606f"})):null,d?u.a.createElement(P.a.Item,{label:"\u7248\u672cbump\u65b9\u5f0f",name:"incType",rules:[{required:!0,message:"\u7248\u672cbump\u65b9\u5f0f"}]},u.a.createElement(q.a,{allowClear:!0},u.a.createElement(r,{key:2,value:"patch"},"patch\u5c0f\u7248\u672c\u5347\u7ea7"),u.a.createElement(r,{key:3,value:"minor"},"minor\u4e2d\u7248\u672c\u5347\u7ea7"),u.a.createElement(r,{key:4,value:"major"},"major\u5927\u7248\u672c\u5347\u7ea7"))):null,u.a.createElement(P.a.Item,{style:{textAlign:"right"}},u.a.createElement(h.a,{type:"primary",htmlType:"submit"},"\u63d0\u4ea4")))))},re=d.a.div(K||(K=Object(i.a)(["\n    height: 80vh;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n"]))),le=function(){var e=Object(m.useState)(!1),t=Object(I.a)(e,2),n=t[0],a=t[1],r=Object(j.b)();return u.a.createElement("div",null,u.a.createElement(h.a,{type:"primary",icon:u.a.createElement(M.a,null),size:"large",style:{width:"200px"},onClick:function(){a(!0)}},"\u5f00\u59cb\u53d1\u5e03"),u.a.createElement(ae,{openModal:n,setOpenModal:a,onFinish:function(e){console.log("\u5f00\u59cb\u53d1\u5e03\u53c2\u6570",e);var t=e.prod,n=e.commit,l=e.incType,c=X.a.omitBy({prod:t,commit:n,incType:l},X.a.isUndefined);console.log("info",c),function(e){a(!1),r(Object(U.f)(!0)),v.b.send("publish","start",{publishinfo:e})}(c)}}))};function ce(){return u.a.createElement(b.g,null,u.a.createElement(b.c,null,u.a.createElement(O,null)),u.a.createElement(b.a,null,u.a.createElement(le,null)))}function oe(){var e=function(){var e=Object(p.g)().pathname.split("/");return e[e.length-1]}();return u.a.createElement(ve,null,u.a.createElement(he,null,u.a.createElement(f.a,{mode:"inline",selectedKeys:[e]},u.a.createElement(f.a.Item,{key:"init"},u.a.createElement(s.b,{to:"init"},"\u9879\u76ee\u521b\u5efa")),u.a.createElement(f.a.Item,{key:"publish"},u.a.createElement(s.b,{to:"publish"},"\u9879\u76ee\u53d1\u5e03")))),u.a.createElement(Ee,null,u.a.createElement(p.d,null,u.a.createElement(p.b,{path:"/init",element:u.a.createElement(D,null)}),u.a.createElement(p.b,{path:"/publish",element:u.a.createElement(ce,null)}),u.a.createElement(p.a,{to:window.location.pathname+"/init",replace:!0}))))}var ie,me,ue,se,pe,de,fe,be,he=d.a.aside(L||(L=Object(i.a)(["\n    background-color: rgb(244, 245, 247);\n    display: flex;\n"]))),Ee=d.a.div(H||(H=Object(i.a)(["\n    box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);\n    display: flex;\n    overflow: hidden;\n"]))),ve=d.a.div(Q||(Q=Object(i.a)(["\n    display: grid;\n    grid-template-columns: 16rem 1fr;\n    width: 100%;\n"]))),ye=n(377),je=n(291),ge=n(387),Oe=function(){var e=Object(j.c)(U.b),t=Object(j.c)(U.c),n=Object(j.b)();return Object(m.useEffect)((function(){console.log("logs\u6539\u53d8\u4e86",e)}),[e]),u.a.createElement(S.a,{closable:!1,forceRender:!0,onClose:function(){console.log("\u89e6\u53d1close"),n(Object(U.f)(!1))},visible:t,width:"100%"},u.a.createElement(xe,null,u.a.createElement(we,null,u.a.createElement(je.a,{tip:"\u547d\u4ee4\u6267\u884c\u4e2d\uff0c\u8bf7\u7a0d\u7b49"})),u.a.createElement(ke,null,Object(ye.a)(e).reverse().map((function(e,t){return u.a.createElement(ge.a,{key:t,style:{width:"60rem",marginBottom:"1rem"},message:e,type:"info"})})))))},xe=d.a.div(ie||(ie=Object(i.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n    align-items: center;\n    height: 100%;\n"]))),we=d.a.div(me||(me=Object(i.a)(["\n    flex: 10% 0 0;\n    align-self: center;\n    display: flex;\n    align-items: center;\n"]))),ke=d.a.div(ue||(ue=Object(i.a)(["\n    flex: 70% 0 0;\n    overflow: auto;\n"])));function Ce(){return u.a.createElement(Me,null,u.a.createElement(Ie,null),u.a.createElement(qe,null,u.a.createElement(p.d,null,u.a.createElement(p.b,{path:"/index/*",element:u.a.createElement(oe,null)}),u.a.createElement(p.a,{to:"/index"}))),u.a.createElement(Oe,null))}var Ie=function(){return u.a.createElement(Te,{between:!0},u.a.createElement(Fe,{gap:!0},u.a.createElement(b.b,{type:"link",onClick:y.a},"h-cli \u811a\u624b\u67b6 GUI")),u.a.createElement(Ne,null))},Me=d.a.div(se||(se=Object(i.a)(["\n    display: grid;\n    grid-template-rows: 6rem 1fr;\n    height: 100vh;\n"]))),Te=Object(d.a)(b.f)(pe||(pe=Object(i.a)(["\n    padding: 3.2rem;\n    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);\n    z-index: 1;\n"]))),Fe=Object(d.a)(b.f)(de||(de=Object(i.a)([""]))),Ne=d.a.div(fe||(fe=Object(i.a)([""]))),qe=d.a.main(be||(be=Object(i.a)(["\n    display: flex;\n    overflow: hidden;\n"])))}}]);
//# sourceMappingURL=4.7406854b.chunk.js.map