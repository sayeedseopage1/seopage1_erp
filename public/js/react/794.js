"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[794],{53794:(e,n,t)=>{t.r(n),t.d(n,{default:()=>U});var r=t(67294),l=t(22569),i=t(11914),a=t(31287),o=t(14655),s=t(41248),c=t(42805),d=t(46018),u=t(29874),m=t(27484),v=t.n(m),f=t(33241),_=(t(92026),t(22695)),b=t(28645),p=t(75737),h=t(96486),j=t.n(h),y=t(50502),g=t(43347),x=t(411),w=t(60368),k=t(95595),Y=t(653),N=t(95250),D=t(85893);function S(e){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(e)}function O(e){return function(e){if(Array.isArray(e))return Z(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||M(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,l,i,a,o=[],s=!0,c=!1;try{if(i=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;s=!1}else for(;!(s=(r=i.call(t)).done)&&(o.push(r.value),o.length!==n);s=!0);}catch(e){c=!0,l=e}finally{try{if(!s&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(c)throw l}}return o}}(e,n)||M(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,n){if(e){if("string"==typeof e)return Z(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Z(e,n):void 0}}function Z(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function I(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function C(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?I(Object(t),!0).forEach((function(n){T(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):I(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function T(e,n,t){return(n=function(e){var n=function(e,n){if("object"!==S(e)||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,n||"default");if("object"!==S(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"===S(n)?n:String(n)}(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var P=r.lazy((function(){return Promise.resolve().then(t.bind(t,69927))})),F=new p.s,R=[{id:"expend",header:(0,D.jsx)("span",{className:"mx-2",children:(0,D.jsx)("strong",{children:"#"})}),cell:function(e){var n=e.row;return(0,D.jsx)("span",{className:"mx-2",children:(0,D.jsx)("strong",{children:n.index+1})})}},{id:"task",header:"Task",accessorFn:function(e){return"".concat(e.id).concat(e.heading)},cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)("abbr",{title:null==t?void 0:t.heading,style:{textDecoration:"none"},children:(0,D.jsx)("div",{className:"d-flex align-items-center",style:{gap:"10px"},children:(0,D.jsxs)("a",{href:"/account/tasks/".concat(null==t?void 0:t.id),className:"hover-underline multine-ellipsis",children:[" ",null==t?void 0:t.heading," "]})})})}},{id:"timer_status",header:"Timer Status",accessorKey:"subtasks_timer_active",cell:function(e){var n=e.row,t=null==n?void 0:n.original,r=null==t?void 0:t.subtasks_timer_active,l=j().size(null==t?void 0:t.subtasks_count),i=r>0,a=0,o=0;null!=t&&t.start_time&&j().isNull(null==t?void 0:t.end_time)&&(a=F.dayjs(null==t?void 0:t.start_time).unix(),o=F.dayjs().unix()-a);var s=(null==t?void 0:t.start_time)&&j().isNull(null==t?void 0:t.end_time),c=i||s?"#54B688":"#DCDEE1";return(0,D.jsxs)("div",{style:{color:c},className:"d-flex align-items-center",children:[(0,D.jsx)("i",{className:"fa-solid fa-stopwatch f-18"}),void 0===n.parentId&&0===l&&!s&&(0,D.jsx)("span",{className:"ml-2",children:(0,D.jsx)("strong",{children:r})}),s&&(0,D.jsx)("span",{className:"ml-1 badge badge-primary text-white",style:{fontSize:"11px"},children:(0,D.jsx)(y.Z,{time:o,run:s})})]})}},{id:"milestone",header:"Milestone",accessorKey:"milestone_title",cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)("abbr",{title:null==t?void 0:t.milestone_title,style:{textDecoration:"none"},children:null!=t&&t.milestone_title?(0,D.jsx)("span",{className:"multine-ellipsis word-break",children:null==t?void 0:t.milestone_title}):(0,D.jsx)("span",{style:{fontWeight:"bold",color:"gray"},children:"N/A"})})}},{id:"deliverable",header:"Deliverable",accessorKey:"deliverable_title",cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)("abbr",{title:null==t?void 0:t.deliverable_title,style:{textDecoration:"none"},children:null!=t&&t.deliverable_title?(0,D.jsx)("span",{className:"multine-ellipsis word-break",children:null==t?void 0:t.deliverable_title}):(0,D.jsx)("span",{style:{fontWeight:"bold",color:"gray"},children:"N/A"})})}},{id:"project",header:"Project",accessorFn:function(e){return"".concat(e.project_id).concat(e.project_name)},cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)("abbr",{title:null==t?void 0:t.project_name,style:{textDecoration:"none"},children:null!=t&&t.project_name?(0,D.jsx)("a",{href:"/account/projects/".concat(null==t?void 0:t.project_id),className:"multine-ellipsis",children:null==t?void 0:t.project_name}):(0,D.jsx)("span",{style:{fontWeight:"bold",color:"gray"},children:"N/A"})})}},{id:"client",header:"Client",accessorKey:"client_name",cell:function(e){var n=e.row,t=null==n?void 0:n.original,r=function(){var e={url:null,name:null,avatar:null};return t.client_id?(e.url="/account/clients/".concat(t.client_id),e.name=t.client_name,e.avatar=t.client_avatar):t.ind_client_id?(e.url="/account/clients/".concat(t.ind_client_id),e.name=t.ind_existing_client_name,e.avatar=null):(e.url="",e.name=t.ind_client_name,e.avatar=null),C({},e)};return(0,D.jsx)("div",{children:(0,D.jsx)(f.Z,{url:r().url,avatar:r().avatar,name:r().name})})}},{id:"project_manager",header:"Project Manager",accessorKey:"pm_id_name",cell:function(e){var n=e.row,t=null==n?void 0:n.original;return null!=t&&t.project_manager_id?(0,D.jsx)(f.Z,{url:"/account/employees/".concat(null==t?void 0:t.project_manager_id),name:null==t?void 0:t.pm_id_name,avatar:null==t?void 0:t.pm_id_avatar}):(0,D.jsx)("span",{style:{fontWeight:"bold",color:"gray"},children:"N/A"})}},{id:"creation_date",header:"Creation Date",accessorKey:"creation_date",cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)("span",{children:null==t?void 0:t.creation_date})}},{id:"due_date",header:"Due Date",accessorFn:function(e){return null!=e&&e.due_date?v()(null==e?void 0:e.due_date).format("DD-MM-YYYY"):"--"},cell:function(e){var n,t=e.row,r=null==t?void 0:t.original,l=null==r?void 0:r.due_date,i=F.dayjs(),a="";return F.isSame(i,l)?(l="Today",a="red"):F.isAfter(i,l)&&(a="red"),l="Today"===l?l:v()(l).format("DD-MM-YYYY"),(0,D.jsx)("span",{style:{color:a},children:(0,D.jsx)("strong",{children:null!==(n=l)&&void 0!==n?n:"--"})})}},{id:"start_date",header:"Started Date",accessorFn:function(e){return"".concat(null!=e&&e.start_date?v()(null==e?void 0:e.start_date).format("DD-MM-YYYY"):"--")},cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)("strong",{children:null!=t&&t.start_date?(0,D.jsxs)(D.Fragment,{children:[v()(null==t?void 0:t.start_date).format("DD-MM-YYYY")," ",(0,D.jsx)("br",{})]}):"--"})}},{id:"completion_date",header:"Completion Date",accessorFn:function(e){return"".concat(null!=e&&e.completion_date?v()(null==e?void 0:e.completion_date).format("DD-MM-YYYY"):"--")},cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)("strong",{children:4===Number(null==t?void 0:t.board_column_id)?(null==t?void 0:t.completion_date)&&(0,D.jsxs)(D.Fragment,{children:[v()(null==t?void 0:t.completion_date).format("DD-MM-YYYY")," ",(0,D.jsx)("br",{})]}):"--"})}},{id:"submission_data",header:"Submission Date",accessorFn:function(e){return"".concat(null!=e&&e.task_submission_date?v()(null==e?void 0:e.task_submission_date).format("DD-MM-YYYY"):"--")},cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)("strong",{children:null!=t&&t.task_submission_date?(0,D.jsxs)(D.Fragment,{children:[v()(null==t?void 0:t.task_submission_date).format("DD-MM-YYYY")," ",(0,D.jsx)("br",{}),v()(null==t?void 0:t.task_submission_date).format("hh:mm A")," ",(0,D.jsx)("br",{})]}):"--"})}},{id:"approved_on",header:"Approved On",accessorFn:function(e){return"".concat(null!=e&&e.task_approval_date?v()(null==e?void 0:e.task_approval_date).format("DD-MM-YYYY"):"Not Completed Yet!")},cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsxs)(N.Z,{children:[(0,D.jsxs)(N.Z.Case,{condition:(null==t?void 0:t.task_approval_date)&&j().includes([4,8,9],null==t?void 0:t.board_column_id),children:[v()(null==t?void 0:t.task_approval_date).format("DD-MM-YYYY")," ",(0,D.jsx)("br",{}),v()(null==t?void 0:t.task_approval_date).format("hh:mm A")]}),(0,D.jsxs)(N.Z.Case,{condition:!(null!=t&&t.task_approval_date)&&(null==t?void 0:t.task_updated_at)&&j().includes([4,8,9],null==t?void 0:t.board_column_id),children:[v()(null==t?void 0:t.task_updated_at).format("DD-MM-YYYY")," ",(0,D.jsx)("br",{}),v()(null==t?void 0:t.task_updated_at).format("hh:mm A")," ",(0,D.jsx)("br",{})]}),(0,D.jsx)(N.Z.Case,{condition:!j().includes([4,8,9],null==t?void 0:t.board_column_id),children:"--"})]})}},{id:"estimated_time",header:"Estimated Time",cell:function(e){var n,t,r=e.row,l=null==r?void 0:r.original;return(0,D.jsxs)("div",{children:[null!==(n=null==l?void 0:l.estimate_hours)&&void 0!==n?n:0," hrs ",(0,D.jsx)("br",{}),null!==(t=null==l?void 0:l.estimate_minutes)&&void 0!==t?t:0," mins"]})}},{id:"hours_logged",header:"Hours Logged",cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)("div",{children:(0,_.r)(null==t?void 0:t.subtasks_hours_logged)})}},{id:"assigned_by",header:"Assigned By",accessorKey:"added_by_name",cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)(f.Z,{url:"/account/employees/".concat(null==t?void 0:t.added_by),avatar:null==t?void 0:t.added_by_avatar,name:null==t?void 0:t.added_by_name})}},{id:"assigned_to",header:"Assigned To",accessorKey:"assigned_to_name",cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)(f.Z,{url:"/account/employees/".concat(null==t?void 0:t.assigned_to_id),avatar:null==t?void 0:t.assigned_to_avatar,name:null==t?void 0:t.assigned_to_name})}},{id:"status",header:"Task Status",accessorKey:"column_name",cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)("span",{className:"badge text-white",style:{background:null==t?void 0:t.label_color},children:null==t?void 0:t.column_name})}},{id:"report",header:"Report",cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)(b.Z,{row:t})}},{id:"action",header:"Action",cell:function(e){var n=e.row,t=null==n?void 0:n.original;return(0,D.jsx)(E,{row:t})}}],E=function(e){var n=e.row,t=A(r.useState(!1),2),l=t[0],i=t[1],a=new w.od(n),o=function(){return i(!1)},c=(0,s.v9)((function(e){return e.tasks})).subtasks,d=(0,s.I0)();return(0,D.jsxs)(r.Fragment,{children:[(0,D.jsxs)(g.Z,{children:[(0,D.jsx)(g.Z.Toggle,{icon:!1,children:(0,D.jsx)(x.Z,{variant:"tertiary",children:(0,D.jsx)("i",{className:"fa-solid fa-ellipsis-vertical"})})}),(0,D.jsx)(g.Z.Menu,{placement:"bottom-end",className:"py-2 sp1_tasks_tbl_action_dd_menu",children:(0,D.jsxs)(g.Z.Item,{onClick:function(){return i(!0)},className:"sp1_tasks_tbl_del",children:[(0,D.jsx)("i",{className:"fa-solid fa-bug mr-2"})," Report"]})})]}),(0,D.jsx)(k.Z,{isOpen:l,className:"sp1_single_task--modal",children:(0,D.jsx)("div",{className:"sp1_single_task--modal-panerl-wrapper",children:(0,D.jsxs)("div",{className:"sp1_single_task--modal-panel task-report-form--modal-panel",children:[(0,D.jsxs)("div",{className:"border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",children:[(0,D.jsxs)("div",{className:"font-weight-bold f-14",children:["Task#",null==n?void 0:n.id," : Report"]}),(0,D.jsx)(x.Z,{onClick:o,className:"",children:(0,D.jsx)("i",{className:"fa-solid fa-xmark"})})]}),(0,D.jsx)(r.Suspense,{fallback:(0,D.jsx)("div",{className:"py-3 d-flex align-items-center justify-content-center",children:(0,D.jsx)(Y.Z,{})}),children:(0,D.jsx)(P,{task:a,close:o,onSuccess:function(){var e=j().findIndex(c,{id:null==n?void 0:n.id}),t=O(c);t[e]=C(C({},n),{},{subtasks_reports_count:Number(n.subtasks_reports_count)+1}),d((0,u.ZS)({subtasks:O(t)}))}})})]})})})]})},K=t(2108),B=t(23555),W=t(99262);function L(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,l,i,a,o=[],s=!0,c=!1;try{if(i=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;s=!1}else for(;!(s=(r=i.call(t)).done)&&(o.push(r.value),o.length!==n);s=!0);}catch(e){c=!0,l=e}finally{try{if(!s&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(c)throw l}}return o}}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return V(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return V(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var z=new K.n(window.Laravel.user);const U=function(){(0,s.v9)((function(e){return e.tasks})).tasks;var e=(0,s.I0)(),n=L(r.useState(null),2),t=n[0],m=n[1],v=L(r.useState(""),2),f=v[0],_=v[1],b=L(r.useState(new Object((0,W.F)(z))),2),p=b[0],h=b[1],y=L((0,d.bv)(),2),g=y[0],x=y[1].isFetching,w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return 5===(arguments.length>1?arguments[1]:void 0)?e.filter((function(e){return"action"!==e.id&&"milestone"!==e.id&&"deliverable"!==e.id&&"project"!==e.id&&"assigned_to"!==e.id})):e.filter((function(e){return"action"!==e.id}))};return(0,D.jsxs)(r.Fragment,{children:[(0,D.jsx)(a.Z,{children:(0,D.jsx)(o.Z,{onFilter:function(n){var t=j().pickBy(n,Boolean),r=new URLSearchParams(t).toString();m(t),null!=n&&n.start_date&&null!=n&&n.end_date&&g("".concat(r)).unwrap().then((function(n){var t=null==n?void 0:n.tasks;4===z.getRoleId()?t=j().filter(n.tasks,(function(e){return Number(e.project_manager_id)===z.getId()})):6===z.getRoleId()?t=j().filter(n.tasks,(function(e){return Number(e.added_by)===z.getId()})):9!==z.getRoleId()&&10!==z.getRoleId()||(t=j().filter(n.tasks,(function(e){return Number(e.assigned_to_id)===z.getId()})));var r=j().orderBy(t,"due_date","desc");e((0,u.ZS)({subtasks:r}))})).catch((function(e){return console.log(e)}))},page:"subtasks"})}),(0,D.jsx)("div",{className:"sp1_tlr_container",children:(0,D.jsxs)("div",{className:"sp1_tlr_tbl_container",children:[(0,D.jsxs)("div",{className:"mb-3 d-flex align-items-center flex-wrap justify-content-between",children:[(0,D.jsx)(l.Z,{}),(0,D.jsx)("div",{className:"ml-auto",style:{maxWidth:"300px"},children:(0,D.jsx)(c.Z,{value:f,onChange:_})}),(0,D.jsx)("div",{className:"ml-2",style:{marginTop:"2px"},children:(0,D.jsx)(B.Z,{tableName:"subTaskTable",columns:w(R,null==z?void 0:z.getRoleId()),columnVisibility:p,setColumnVisibility:h})})]}),(0,D.jsx)(i.Z,{isLoading:x,filter:t,tableName:"subTaskTable",search:f,reportPermission:[1,8,5],columnVisibility:p,setColumnVisibility:h,tableColumns:w(R,null==z?void 0:z.getRoleId())})]})})]})}}}]);
//# sourceMappingURL=794.js.map