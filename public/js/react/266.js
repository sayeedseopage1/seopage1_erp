"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[266],{32266:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var r=n(67294),i=n(96486),l=n.n(i),a=n(18607),o=n(5669),s=n(2108),u=n(10733),c=n(85893);function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,i,l=[],a=!0,o=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);a=!0);}catch(e){o=!0,i=e}finally{try{a||null==n.return||n.return()}finally{if(o)throw i}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const f=function(e){var t,n,i=e.task,h=e.setTask,f=d((0,r.useState)(""),2),p=f[0],v=f[1],g=new s.n(null===(t=window)||void 0===t||null===(n=t.Laravel)||void 0===n?void 0:n.user),m=(0,u.hy)(null==g?void 0:g.getId()),y=m.data,b=m.isFetching,w=""===p?y:null==y?void 0:y.filter((function(e){return l().lowerCase(e.heading).includes(l().lowerCase(p))}));return(0,c.jsx)("div",{className:"position-relative w-100 mb-3",children:(0,c.jsxs)(a.h,{value:i,onChange:h,children:[(0,c.jsxs)(a.h.Button,{className:"position-relative w-100",children:[(0,c.jsx)(a.h.Input,{className:"w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between",displayValue:function(e){return null==e?void 0:e.heading},onChange:function(e){return v(e.target.value)},placeholder:"--"}),(0,c.jsx)("span",{style:{position:"absolute",top:"50%",right:"5px",transform:"translateY(-50%)"},children:(0,c.jsx)(o.YZt,{})})]}),(0,c.jsx)(a.h.Options,{className:"position-absolute bg-white p-2 shadow w-100",style:{zIndex:"1",maxHeight:"350px",overflowY:"auto"},children:w&&w.length?null==w?void 0:w.map((function(e){return(0,c.jsx)(a.h.Option,{value:e,tabIndex:-1,className:function(e){var t=e.selected,n=e.active;return t?"task-selection-list-option selected":n?"task-selection-list-option active":"task-selection-list-option"},children:(0,c.jsxs)("span",{children:[null==e?void 0:e.heading," ",(0,c.jsx)("span",{className:"badge badge-success",children:null==e?void 0:e.client_name})]})},e.id)})):(0,c.jsx)("div",{className:"task-selection-list-option",children:b?"Loading...":"Nothing found."})})]})})}}}]);
//# sourceMappingURL=266.js.map