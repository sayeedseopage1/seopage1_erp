"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[794],{53794:(e,n,r)=>{r.r(n),r.d(n,{default:()=>V});var t=r(67294),l=r(22569),i=r(11914),a=r(31287),o=r(14655),s=r(41248),c=r(42805),u=r(46018),d=r(29874),m=r(27484),v=r.n(m),f=r(33241),p=(r(92026),r(22695)),b=r(28645),h=r(75737),y=r(96486),_=r.n(y),g=r(50502),j=r(43347),x=r(411),w=r(60368),k=r(95595),N=r(653),S=r(85893);function Y(e){return Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Y(e)}function D(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function O(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?D(Object(r),!0).forEach((function(n){M(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function M(e,n,r){return(n=function(e){var n=function(e,n){if("object"!==Y(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var t=r.call(e,n||"default");if("object"!==Y(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"===Y(n)?n:String(n)}(n))in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function Z(e){return function(e){if(Array.isArray(e))return P(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||T(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var t,l,i,a,o=[],s=!0,c=!1;try{if(i=(r=r.call(e)).next,0===n){if(Object(r)!==r)return;s=!1}else for(;!(s=(t=i.call(r)).done)&&(o.push(t.value),o.length!==n);s=!0);}catch(e){c=!0,l=e}finally{try{if(!s&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw l}}return o}}(e,n)||T(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,n){if(e){if("string"==typeof e)return P(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?P(e,n):void 0}}function P(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}var C=t.lazy((function(){return Promise.resolve().then(r.bind(r,69927))})),I=new h.s,F=[{id:"expend",header:(0,S.jsx)("span",{className:"mx-2",children:(0,S.jsx)("strong",{children:"#"})}),cell:function(e){var n=e.row;return(0,S.jsx)("span",{className:"mx-2",children:(0,S.jsx)("strong",{children:n.index+1})})}},{id:"task",header:"Task",accessorFn:function(e){return"".concat(e.id).concat(e.heading)},cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)("abbr",{title:null==r?void 0:r.heading,style:{textDecoration:"none"},children:(0,S.jsx)("div",{className:"d-flex align-items-center",style:{gap:"10px"},children:(0,S.jsxs)("a",{href:"/account/tasks/".concat(null==r?void 0:r.id),className:"hover-underline multine-ellipsis",children:[" ",null==r?void 0:r.heading," "]})})})}},{id:"timer_status",header:"Timer Status",accessorKey:"subtasks_timer_active",cell:function(e){var n=e.row,r=null==n?void 0:n.original,t=null==r?void 0:r.subtasks_timer_active,l=_().size(null==r?void 0:r.subtasks_count),i=t>0,a=0,o=0;null!=r&&r.start_time&&_().isNull(null==r?void 0:r.end_time)&&(a=I.dayjs(null==r?void 0:r.start_time).unix(),o=I.dayjs().unix()-a);var s=(null==r?void 0:r.start_time)&&_().isNull(null==r?void 0:r.end_time),c=i||s?"#54B688":"#DCDEE1";return(0,S.jsxs)("div",{style:{color:c},className:"d-flex align-items-center",children:[(0,S.jsx)("i",{className:"fa-solid fa-stopwatch f-18"}),void 0===n.parentId&&0===l&&!s&&(0,S.jsx)("span",{className:"ml-2",children:(0,S.jsx)("strong",{children:t})}),s&&(0,S.jsx)("span",{className:"ml-1 badge badge-primary text-white",style:{fontSize:"11px"},children:(0,S.jsx)(g.Z,{time:o,run:s})})]})}},{id:"milestone",header:"Milestone",accessorKey:"milestone_title",cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)("abbr",{title:null==r?void 0:r.milestone_title,style:{textDecoration:"none"},children:(0,S.jsx)("span",{className:"multine-ellipsis word-break",children:null==r?void 0:r.milestone_title})})}},{id:"deliverable",header:"Deliverable",accessorKey:"deliverable_title",cell:function(e){var n,r=e.row,t=null==r?void 0:r.original;return(0,S.jsx)("abbr",{title:null==t?void 0:t.deliverable_title,style:{textDecoration:"none"},children:(0,S.jsx)("span",{className:"multine-ellipsis word-break",children:null!==(n=null==t?void 0:t.deliverable_title)&&void 0!==n?n:"--"})})}},{id:"project",header:"Project",accessorFn:function(e){return"".concat(null==e?void 0:e.project_id).concat(null==e?void 0:e.project_name)},cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)("abbr",{title:null==r?void 0:r.project_name,style:{textDecoration:"none"},children:(0,S.jsx)("a",{href:"/account/projects/".concat(null==r?void 0:r.project_id),className:"multine-ellipsis",children:null==r?void 0:r.project_name})})}},{id:"client",header:"Client",accessorKey:"client_name",cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)("div",{children:(0,S.jsx)(f.Z,{url:"/account/clients/".concat(null==r?void 0:r.client_id),avatar:null==r?void 0:r.client_avatar,name:null==r?void 0:r.client_name})})}},{id:"project_manager",header:"Project Manager",accessorKey:"pm_id_name",cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)(f.Z,{url:"/account/employees/".concat(null==r?void 0:r.project_manager_id),name:null==r?void 0:r.pm_id_name,avatar:null==r?void 0:r.pm_id_avatar})}},{id:"creation_date",header:"Creation Date",accessorKey:"creation_date",cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)("span",{children:null==r?void 0:r.creation_date})}},{id:"due_date",header:"Due Date",accessorFn:function(e){return null!=e&&e.due_date?v()(null==e?void 0:e.due_date).format("DD-MM-YYYY"):"--"},cell:function(e){var n,r=e.row,t=null==r?void 0:r.original,l=null==t?void 0:t.due_date,i=I.dayjs(),a="";return I.isSame(i,l)?(l="Today",a="red"):I.isAfter(i,l)&&(a="red"),l="Today"===l?l:v()(l).format("DD-MM-YYYY"),(0,S.jsx)("span",{style:{color:a},children:(0,S.jsx)("strong",{children:null!==(n=l)&&void 0!==n?n:"--"})})}},{id:"start_date",header:"Started Date",accessorFn:function(e){return"".concat(null!=e&&e.start_date?v()(null==e?void 0:e.start_date).format("DD-MM-YYYY"):"--")},cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)("strong",{children:null!=r&&r.start_date?(0,S.jsxs)(S.Fragment,{children:[v()(null==r?void 0:r.start_date).format("DD-MM-YYYY")," ",(0,S.jsx)("br",{})]}):"--"})}},{id:"completion_date",header:"Completion Date",accessorFn:function(e){return"".concat(null!=e&&e.completion_date?v()(null==e?void 0:e.completion_date).format("DD-MM-YYYY"):"--")},cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)("strong",{children:4===Number(null==r?void 0:r.board_column_id)?(null==r?void 0:r.completion_date)&&(0,S.jsxs)(S.Fragment,{children:[v()(null==r?void 0:r.completion_date).format("DD-MM-YYYY")," ",(0,S.jsx)("br",{})]}):"--"})}},{id:"approved_on",header:"Approved On",accessorFn:function(e){return"".concat(null!=e&&e.task_approval_date?v()(null==e?void 0:e.task_approval_date).format("DD-MM-YYYY"):"Not Completed Yet!")},cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)("strong",{children:null!=r&&r.task_approval_date?(0,S.jsx)(S.Fragment,{children:v()(null==r?void 0:r.task_approval_date).format("DD-MM-YYYY")}):(0,S.jsx)("span",{className:"badge text-white word-break",style:{background:"#f5c308"},children:"Not Completed Yet!"})})}},{id:"estimated_time",header:"Estimated Time",cell:function(e){var n,r,t=e.row,l=null==t?void 0:t.original;return(0,S.jsxs)("div",{children:[null!==(n=null==l?void 0:l.estimate_hours)&&void 0!==n?n:0," hrs ",(0,S.jsx)("br",{}),null!==(r=null==l?void 0:l.estimate_minutes)&&void 0!==r?r:0," mins"]})}},{id:"hours_logged",header:"Hours Logged",cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)("div",{children:(0,p.r)(null==r?void 0:r.subtasks_hours_logged)})}},{id:"assigned_by",header:"Assigned By",accessorKey:"added_by_name",cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)(f.Z,{url:"/account/employees/".concat(null==r?void 0:r.added_by),avatar:null==r?void 0:r.added_by_avatar,name:null==r?void 0:r.added_by_name})}},{id:"assigned_to",header:"Assigned To",accessorKey:"assigned_to_name",cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)(f.Z,{url:"/account/employees/".concat(null==r?void 0:r.assigned_to_id),avatar:null==r?void 0:r.assigned_to_avatar,name:null==r?void 0:r.assigned_to_name})}},{id:"status",header:"Task Status",accessorKey:"column_name",cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)("span",{className:"badge text-white",style:{background:null==r?void 0:r.label_color},children:null==r?void 0:r.column_name})}},{id:"progress",header:"Progress",cell:function(e){var n=e.row,r=null==n?void 0:n.original,t=Number(null==r?void 0:r.subtasks_count),l=Number(null==r?void 0:r.subtasks_completed_count),i="bg-transparent",a=0;return i=100===(a=t>0?l/t*100:4===Number(null==r?void 0:r.board_column_id)?100:0)?"bg-success":a<100&&a>=75?"bg-info":a<75&&a>=25?"bg-warning":"bg-danger",(0,S.jsx)("div",{children:(0,S.jsx)("div",{className:"progress",style:{height:"16px"},children:(0,S.jsxs)("div",{className:"progress-bar progress-bar-striped progress-bar-animated ".concat(i),role:"progressbar",style:{width:"".concat(a,"%")},"aria-valuenow":"10","aria-valuemin":"0","aria-valuemax":"100",children:[Math.floor(a),"%"]})})})}},{id:"report",header:"Report",cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)(b.Z,{row:r})}},{id:"action",header:"Action",cell:function(e){var n=e.row,r=null==n?void 0:n.original;return(0,S.jsx)(E,{row:r})}}],E=function(e){var n=e.row,r=A(t.useState(!1),2),l=r[0],i=r[1],a=new w.od(n),o=function(){return i(!1)},c=(0,s.v9)((function(e){return e.tasks})).subtasks,u=(0,s.I0)();return(0,S.jsxs)(t.Fragment,{children:[(0,S.jsxs)(j.Z,{children:[(0,S.jsx)(j.Z.Toggle,{icon:!1,children:(0,S.jsx)(x.Z,{variant:"tertiary",children:(0,S.jsx)("i",{className:"fa-solid fa-ellipsis-vertical"})})}),(0,S.jsx)(j.Z.Menu,{placement:"bottom-end",className:"py-2 sp1_tasks_tbl_action_dd_menu",children:(0,S.jsxs)(j.Z.Item,{onClick:function(){return i(!0)},className:"sp1_tasks_tbl_del",children:[(0,S.jsx)("i",{className:"fa-solid fa-bug mr-2"})," Report"]})})]}),(0,S.jsx)(k.Z,{isOpen:l,className:"sp1_single_task--modal",children:(0,S.jsx)("div",{className:"sp1_single_task--modal-panerl-wrapper",children:(0,S.jsxs)("div",{className:"sp1_single_task--modal-panel task-report-form--modal-panel",children:[(0,S.jsxs)("div",{className:"border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",children:[(0,S.jsxs)("div",{className:"font-weight-bold f-14",children:["Task#",null==n?void 0:n.id," : Report"]}),(0,S.jsx)(x.Z,{onClick:o,className:"",children:(0,S.jsx)("i",{className:"fa-solid fa-xmark"})})]}),(0,S.jsx)(t.Suspense,{fallback:(0,S.jsx)("div",{className:"py-3 d-flex align-items-center justify-content-center",children:(0,S.jsx)(N.Z,{})}),children:(0,S.jsx)(C,{task:a,close:o,onSuccess:function(){var e=_().findIndex(c,{id:null==n?void 0:n.id}),r=Z(c);r[e]=O(O({},n),{},{subtasks_reports_count:Number(n.subtasks_reports_count)+1}),u((0,d.ZS)({subtasks:Z(r)}))}})})]})})})]})},K=r(2108),B=r(23555);function R(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var t,l,i,a,o=[],s=!0,c=!1;try{if(i=(r=r.call(e)).next,0===n){if(Object(r)!==r)return;s=!1}else for(;!(s=(t=i.call(r)).done)&&(o.push(t.value),o.length!==n);s=!0);}catch(e){c=!0,l=e}finally{try{if(!s&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw l}}return o}}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return L(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return L(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function L(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}const V=function(){(0,s.v9)((function(e){return e.tasks})).tasks;var e=(0,s.I0)(),n=R(t.useState(null),2),r=n[0],m=n[1],v=R(t.useState(""),2),f=v[0],p=v[1],b=new K.n(window.Laravel.user),h=R(t.useState({}),2),y=h[0],g=h[1],j=R((0,u.bv)(),2),x=j[0],w=j[1].isFetching,k=F;return 5!==(null==b?void 0:b.getRoleId())&&(k=_().filter(F,(function(e){return"action"!==e.id}))),(0,S.jsxs)(t.Fragment,{children:[(0,S.jsx)(a.Z,{children:(0,S.jsx)(o.Z,{onFilter:function(n){var r=_().pickBy(n,Boolean),t=new URLSearchParams(r).toString();m(r),null!=n&&n.start_date&&null!=n&&n.end_date&&x("".concat(t)).unwrap().then((function(n){var r=_().orderBy(null==n?void 0:n.tasks,"due_date","desc");e((0,d.ZS)({subtasks:r}))})).catch((function(e){return console.log(e)}))},page:"subtasks"})}),(0,S.jsx)("div",{className:"sp1_tlr_container",children:(0,S.jsxs)("div",{className:"sp1_tlr_tbl_container",children:[(0,S.jsxs)("div",{className:"mb-3 d-flex align-items-center flex-wrap justify-content-between",children:[(0,S.jsx)(l.Z,{}),(0,S.jsx)("div",{className:"ml-auto",style:{maxWidth:"300px"},children:(0,S.jsx)(c.Z,{value:f,onChange:p})}),(0,S.jsx)("div",{className:"ml-2",style:{marginTop:"2px"},children:(0,S.jsx)(B.Z,{tableName:"subTaskTable",columns:_().filter(k,(function(e){return"expend"!==e.id})),columnVisibility:y,setColumnVisibility:g})})]}),(0,S.jsx)(i.Z,{isLoading:w,filter:r,tableName:"subTaskTable",search:f,reportPermission:[1,8,5],columnVisibility:y,setColumnVisibility:g,tableColumns:k})]})})]})}}}]);
//# sourceMappingURL=794.js.map