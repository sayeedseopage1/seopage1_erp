"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[41],{24041:(e,l,t)=>{t.r(l),t.d(l,{default:()=>x});var n=t(67294),s=t(60368),a=t(11002),i=t(9498),r=t(7285),o=t(96486),c=t.n(o),d=t(61076),u=t(85893);const m=function(e){var l,t=e.isOpen,s=e.close,o=e.submittedTask,m=e.user,h=e.isLoading,f=o;return(0,u.jsx)(n.Fragment,{children:(0,u.jsx)(a.Z,{className:"d-flex align-items-center justify-content-center",isOpen:t,children:(0,u.jsx)(n.Fragment,{children:(0,u.jsxs)("div",{className:"sp1-subtask-form --modal-panel --modal-submitted sp1-sumittion_task_modal-view",children:[(0,u.jsxs)("div",{className:"sp1-subtask-form --modal-panel-header",children:[(0,u.jsxs)("div",{className:"d-flex align-items-center",children:[(0,u.jsx)("h6",{children:"Submitted Task "}),h&&(0,u.jsx)("div",{className:"spinner-border text-dark ml-2",role:"status",style:{width:"16px",height:"16px",border:"0.14em solid rgba(0, 0, 0, .25)",borderRightColor:"transparent"}})]}),(0,u.jsx)(i.Z,{"aria-label":"close-modal",className:"_close-modal",onClick:s,children:(0,u.jsx)("i",{className:"fa-solid fa-xmark"})})]}),(0,u.jsx)("div",{className:"sp1-subtask-form --modal-panel-body --modal-submitted-body",children:(0,u.jsxs)("div",{className:"mt-3 d-flex flex-column",style:{gap:"10px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("span",{className:"fs-14 font-weight-bold d-block mb-3",style:{color:"#767581"},children:"Submitted By"}),(0,u.jsxs)("div",{className:"d-flex align-items-center",children:[(0,u.jsx)("div",{children:(0,u.jsx)(d.Z,{type:"circle",src:null==m?void 0:m.avatar,alt:null==m?void 0:m.name,name:null==m?void 0:m.name})}),(0,u.jsxs)("div",{className:"d-flex flex-column px-2",children:[(0,u.jsx)("a",{className:"text-underline text-primary",href:null==m?void 0:m.profile,style:{color:"#767581"},children:null==m?void 0:m.name}),(0,u.jsxs)("span",{className:"d-block",style:{color:"#767581"},children:[null==f?void 0:f.getSubmittionDate()," at"," ",null==f?void 0:f.getSubmittionDate("hh:mm a")]})]})]})]}),(0,u.jsxs)("div",{className:"d-flex flex-column mt-3",style:{gap:"10px"},children:[(0,u.jsx)("span",{className:"d-block fs-14 font-weight-bold",style:{color:"#767581"},children:"Links"}),(0,u.jsx)("ul",{style:{listStyle:"unset",marginLeft:"30px"},children:null==f||null===(l=f.submittedLinkes)||void 0===l?void 0:l.map((function(e,l){return(0,u.jsx)("li",{style:{listStyle:"unset"},children:(0,u.jsx)("a",{href:e,className:"hover-underline text-primary",target:"_blank",children:e})},"".concat(e,"-").concat(l))}))})]}),(0,u.jsxs)("div",{className:"mt-2 mt-3",children:[(0,u.jsx)("span",{className:"d-block fs-12 font-weight-bold mb-2",style:{color:"#767581"},children:"Description"}),null!=f&&f.explaination?(0,u.jsx)("div",{className:"sp1_ck_content",dangerouslySetInnerHTML:{__html:null==f?void 0:f.explaination}}):(0,u.jsx)("span",{style:{color:"rgb(180, 188, 196)"},children:"No description is available"})]}),(0,u.jsxs)("div",{className:"mt-3",children:[(0,u.jsx)("span",{className:"d-block fs-12 font-weight-bold mb-2",style:{color:"#767581"},children:"Attached Files"}),c().size(null==f?void 0:f.attaches)>0?(0,u.jsx)(r.Z,{children:c().map(null==f?void 0:f.attaches,(function(e,l){return(0,u.jsx)(r.Z.Preview,{fileName:e,downloadAble:!0,deleteAble:!1,downloadUrl:"/storage/TaskSubmission/".concat(e),previewUrl:"/storage/TaskSubmission/".concat(e),fileType:c().includes(["png","jpg","jpeg","gif","svg"],c().last(c().split(e,".")))?"images":"others",ext:""},"".concat(e,"_").concat(l))}))}):(0,u.jsx)("span",{className:"",style:{color:"rgb(180, 188, 196)"},children:"No Attachment is available"})]})]})})]})})})})};function h(e,l){return function(e){if(Array.isArray(e))return e}(e)||function(e,l){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,s,a,i,r=[],o=!0,c=!1;try{if(a=(t=t.call(e)).next,0===l){if(Object(t)!==t)return;o=!1}else for(;!(o=(n=a.call(t)).done)&&(r.push(n.value),r.length!==l);o=!0);}catch(e){c=!0,s=e}finally{try{if(!o&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(c)throw s}}return r}}(e,l)||function(e,l){if(!e)return;if("string"==typeof e)return f(e,l);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return f(e,l)}(e,l)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,l){(null==l||l>e.length)&&(l=e.length);for(var t=0,n=new Array(l);t<l;t++)n[t]=e[t];return n}const x=function(e){var l=e.data,t=e.isLoading,a=h((0,n.useState)(!1),2),i=a[0],r=a[1],o=new s.mc(l),c=null==o?void 0:o.user;return(0,u.jsxs)(n.Fragment,{children:[(0,u.jsxs)("div",{className:"d-flex align-items-center justify-content-between sp1_task_modal-view_item py-2",styte:{gap:"16px",fontSize:"14px"},onClick:function(){return r(!0)},children:[(0,u.jsxs)("div",{children:[(0,u.jsxs)("a",{href:"/account/tasks/".concat(null==o?void 0:o.id),onClick:function(e){return e.stopPropagation()},className:"hover-underline text-primary",children:["Task#",null==o?void 0:o.id]}),(0,u.jsxs)("span",{children:[" (",null==o?void 0:o.submittionNo,") submitted by "]}),(0,u.jsx)("a",{href:null==c?void 0:c.profile,onClick:function(e){return e.stopPropagation()},className:"hover-underline text-primary",children:null==c?void 0:c.name})]}),(0,u.jsxs)("div",{children:[null==o?void 0:o.getSubmittionDate()," at"," ",null==o?void 0:o.getSubmittionDate("hh:mm a")]}),(0,u.jsx)("div",{className:"d-flex align-items-center",children:(0,u.jsx)("a",{className:"mr-2 py-2 sp1_task_righ_action_btn",onClick:function(e){e.preventDefault(),r(!i)},children:(0,u.jsx)("i",{className:"fa-regular fa-eye"})})})]}),(0,u.jsx)(m,{isOpen:i,close:function(){return r(!1)},submittedTask:o,user:c,isLoading:t})]})}}}]);
//# sourceMappingURL=41.js.map