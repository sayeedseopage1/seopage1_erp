"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[57],{35057:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var r=n(67294),a=n(96486),i=n.n(a),o=n(1988),l=n(94789),s=n(53854),c=n(85893);function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,i,o,l=[],s=!0,c=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=i.call(n)).done)&&(l.push(r.value),l.length!==t);s=!0);}catch(e){c=!0,a=e}finally{try{if(!s&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(c)throw a}}return l}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const f=function(e){var t=e.project,n=e.setProject,a=u((0,r.useState)(""),2),p=a[0],f=a[1],d=(0,o.a4)(""),h=d.data,m=d.isFetching,b=""===p?h:h.filter((function(e){return i().lowerCase(e.project_name).includes(i().lowerCase(p))}));return(0,c.jsx)("div",{className:"position-relative w-100 mb-3",children:(0,c.jsxs)(l.h,{value:t,onChange:n,children:[(0,c.jsxs)(l.h.Button,{className:"position-relative w-100",children:[(0,c.jsx)(l.h.Input,{className:"w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between",displayValue:function(e){return null==e?void 0:e.project_name},onChange:function(e){return f(e.target.value)},placeholder:"--"}),(0,c.jsx)("span",{style:{position:"absolute",top:"50%",right:"5px",transform:"translateY(-50%)"},children:(0,c.jsx)(s.YZt,{})})]}),(0,c.jsx)(l.h.Options,{className:"position-absolute bg-white p-2 shadow w-100",style:{zIndex:"1",maxHeight:"350px",overflowY:"auto"},children:b?b.map((function(e){return(0,c.jsx)(l.h.Option,{value:e,tabIndex:-1,className:function(e){var t=e.selected,n=e.active;return t?"task-selection-list-option selected":n?"task-selection-list-option active":"task-selection-list-option"},children:(0,c.jsxs)("span",{children:[e.project_name," ",(0,c.jsx)("span",{className:"badge badge-success ml-2",children:e.client_name})]})},e.id)})):(0,c.jsx)("div",{className:"task-selection-list-option",children:m?"Loading...":"Nothing found."})})]})})}}}]);
//# sourceMappingURL=57.js.map