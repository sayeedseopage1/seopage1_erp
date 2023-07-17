"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[846],{22846:(e,l,t)=>{t.r(l),t.d(l,{default:()=>m});var n=t(67294),s=t(79497),i=t(72702),a=t(50543),r=t(10106),o=t(85893);const d=function(e){var l,t,s,d=e.isOpen,c=e.close,u=e.submittedTask,m=e.user,h=e.isLoading,x=u;return(0,o.jsx)(n.Fragment,{children:(0,o.jsx)(i.Z,{className:"d-flex align-items-center justify-content-center",isOpen:d,children:(0,o.jsx)(n.Fragment,{children:(0,o.jsxs)("div",{className:"sp1-subtask-form --modal-panel --modal-submitted sp1-sumittion_task_modal-view",children:[(0,o.jsxs)("div",{className:"sp1-subtask-form --modal-panel-header",children:[(0,o.jsxs)("div",{className:"d-flex align-items-center",children:[(0,o.jsx)("h6",{children:"Submitted Task "}),h&&(0,o.jsx)("div",{className:"spinner-border text-dark ml-2",role:"status",style:{width:"16px",height:"16px",border:"0.14em solid rgba(0, 0, 0, .25)",borderRightColor:"transparent"}})]}),(0,o.jsx)(a.Z,{"aria-label":"close-modal",className:"_close-modal",onClick:c,children:(0,o.jsx)("i",{className:"fa-solid fa-xmark"})})]}),(0,o.jsx)("div",{className:"sp1-subtask-form --modal-panel-body --modal-submitted-body",children:(0,o.jsxs)("div",{className:"mt-3 d-flex flex-column",style:{gap:"10px"},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("span",{className:"fs-14 font-weight-bold d-block mb-3",style:{color:"#767581"},children:"Submitted By"}),(0,o.jsxs)("div",{className:"d-flex align-items-center",children:[(0,o.jsx)("div",{children:(0,o.jsx)("img",{src:null==m?void 0:m.getAvatar(),alt:null==m?void 0:m.getName(),width:32,height:32,className:"rounded-circle"})}),(0,o.jsxs)("div",{className:"d-flex flex-column px-2",children:[(0,o.jsx)("a",{className:"text-underline text-primary",href:null==m?void 0:m.getUserLink(),style:{color:"#767581"},children:null==m?void 0:m.getName()}),(0,o.jsxs)("span",{className:"d-block",style:{color:"#767581"},children:[null==x?void 0:x.getSubmittionDate()," at"," ",null==x?void 0:x.getSubmittionDate("hh:mm a")]})]})]})]}),(0,o.jsxs)("div",{className:"d-flex flex-column mt-3",style:{gap:"10px"},children:[(0,o.jsx)("span",{className:"d-block fs-14 font-weight-bold",style:{color:"#767581"},children:"Links"}),(0,o.jsx)("ul",{style:{listStyle:"unset",marginLeft:"30px"},children:null==x||null===(l=x.submittedLinkes)||void 0===l?void 0:l.map((function(e,l){return(0,o.jsx)("li",{style:{listStyle:"unset"},children:(0,o.jsx)("a",{href:e,className:"hover-underline text-primary",target:"_blank",children:e})},"".concat(e,"-").concat(l))}))})]}),(0,o.jsxs)("div",{className:"mt-2 mt-3",children:[(0,o.jsx)("span",{className:"d-block fs-12 font-weight-bold mb-2",style:{color:"#767581"},children:"Description"}),null!=x&&x.explaination?(0,o.jsx)("div",{className:"sp1_ck_content",dangerouslySetInnerHTML:{__html:null==x?void 0:x.explaination}}):(0,o.jsx)("span",{style:{color:"rgb(180, 188, 196)"},children:"No description is available"})]}),(0,o.jsxs)("div",{className:"mt-3",children:[(0,o.jsx)("span",{className:"d-block fs-12 font-weight-bold mb-2",style:{color:"#767581"},children:"Attached Files"}),(null==x||null===(t=x.attach)||void 0===t?void 0:t.length)>0?(0,o.jsx)(r.Z,{children:null==x||null===(s=x.attach)||void 0===s?void 0:s.map((function(e){return(0,o.jsx)(r.Z.Preview,{fileName:null==e?void 0:e.name,downloadAble:!0,deleteAble:!1,downloadUrl:null==e?void 0:e.url,previewUrl:null==e?void 0:e.url,fileType:null==e?void 0:e.type,ext:""},null==e?void 0:e.name)}))}):(0,o.jsx)("span",{style:{color:"rgb(180, 188, 196)"},children:"No Attachment is available"})]})]})})]})})})})};function c(e,l){return function(e){if(Array.isArray(e))return e}(e)||function(e,l){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var n,s,i=[],a=!0,r=!1;try{for(t=t.call(e);!(a=(n=t.next()).done)&&(i.push(n.value),!l||i.length!==l);a=!0);}catch(e){r=!0,s=e}finally{try{a||null==t.return||t.return()}finally{if(r)throw s}}return i}(e,l)||function(e,l){if(!e)return;if("string"==typeof e)return u(e,l);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(e,l)}(e,l)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,l){(null==l||l>e.length)&&(l=e.length);for(var t=0,n=new Array(l);t<l;t++)n[t]=e[t];return n}const m=function(e){var l=e.data,t=e.isLoading,i=c((0,n.useState)(!1),2),a=i[0],r=i[1],u=new s.mc(l),m=null==u?void 0:u.user;return(0,o.jsxs)(n.Fragment,{children:[(0,o.jsxs)("div",{className:"d-flex align-items-center justify-content-between sp1_task_modal-view_item py-2",styte:{gap:"16px",fontSize:"14px"},onClick:function(){return r(!0)},children:[(0,o.jsxs)("div",{children:[(0,o.jsxs)("a",{href:"/account/tasks/".concat(null==u?void 0:u.parentTaskId),onClick:function(e){return e.stopPropagation()},className:"hover-underline text-primary",children:["Task#",null==u?void 0:u.id]}),(0,o.jsxs)("span",{children:[" (",null==u?void 0:u.submittionNo,") submitted by "]}),(0,o.jsx)("a",{href:null==m?void 0:m.getUserLink(),onClick:function(e){return e.stopPropagation()},className:"hover-underline text-primary",children:null==m?void 0:m.getName()})]}),(0,o.jsxs)("div",{children:[null==u?void 0:u.getSubmittionDate()," at"," ",null==u?void 0:u.getSubmittionDate("hh:mm a")]}),(0,o.jsx)("div",{className:"d-flex align-items-center",children:(0,o.jsx)("a",{className:"mr-2 py-2 sp1_task_righ_action_btn",onClick:function(e){e.preventDefault(),r(!a)},children:(0,o.jsx)("i",{className:"fa-regular fa-eye"})})})]}),(0,o.jsx)(d,{isOpen:a,close:function(){return r(!1)},submittedTask:u,user:m,isLoading:t})]})}}}]);
//# sourceMappingURL=846.js.map