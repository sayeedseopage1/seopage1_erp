"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_tasks_pages_Subtasks_jsx"],{

/***/ "./resources/js/react/tasks/components/SubtaskTableColumns.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/react/tasks/components/SubtaskTableColumns.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubTasksTableColumns: () => (/* binding */ SubTasksTableColumns)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Person__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Person */ "./resources/js/react/tasks/components/Person.jsx");
/* harmony import */ var _table_ExpandTask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./table/ExpandTask */ "./resources/js/react/tasks/components/table/ExpandTask.jsx");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var _ReportButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ReportButton */ "./resources/js/react/tasks/components/ReportButton.jsx");
/* harmony import */ var _utils_dateController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/dateController */ "./resources/js/react/utils/dateController.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Timer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Timer */ "./resources/js/react/tasks/components/Timer.jsx");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Dropdown */ "./resources/js/react/tasks/components/Dropdown.jsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Button */ "./resources/js/react/tasks/components/Button.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Modal */ "./resources/js/react/tasks/components/Modal.jsx");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Loader */ "./resources/js/react/tasks/components/Loader.jsx");
/* harmony import */ var _services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../services/features/tasksSlice */ "./resources/js/react/services/features/tasksSlice.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _global_Switch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../global/Switch */ "./resources/js/react/global/Switch.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }












var ReportForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.lazy(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../../single-task/section/task-actions/report/ReportForm */ "./resources/js/react/single-task/section/task-actions/report/ReportForm.jsx"));
});









var compareDate = new _utils_dateController__WEBPACK_IMPORTED_MODULE_6__.CompareDate();
var SubTasksTableColumns = [{
  id: 'expend',
  header: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
    className: "mx-2",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
      children: "#"
    })
  }),
  cell: function cell(_ref) {
    var row = _ref.row;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
      className: "mx-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
        children: row.index + 1
      })
    });
  }
}, {
  id: 'task',
  header: 'Task',
  accessorFn: function accessorFn(row) {
    return "".concat(row.id).concat(row.heading);
  },
  cell: function cell(_ref2) {
    var row = _ref2.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.heading,
      style: {
        textDecoration: 'none'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: '10px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("a", {
          href: "/account/tasks/".concat(data === null || data === void 0 ? void 0 : data.id),
          className: "hover-underline multine-ellipsis",
          children: [" ", data === null || data === void 0 ? void 0 : data.heading, " "]
        })
      })
    });
  }
}, {
  id: 'timer_status',
  header: 'Timer Status',
  accessorKey: 'subtasks_timer_active',
  cell: function cell(_ref3) {
    var row = _ref3.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    var count = data === null || data === void 0 ? void 0 : data.subtasks_timer_active;
    var subtaskCount = lodash__WEBPACK_IMPORTED_MODULE_7___default().size(data === null || data === void 0 ? void 0 : data.subtasks_count);
    var isActive = count > 0;
    var serverTime = 0;
    var localTime = 0;
    var timer = 0;
    if (data !== null && data !== void 0 && data.start_time && lodash__WEBPACK_IMPORTED_MODULE_7___default().isNull(data === null || data === void 0 ? void 0 : data.end_time)) {
      serverTime = compareDate.dayjs(data === null || data === void 0 ? void 0 : data.start_time).unix();
      localTime = compareDate.dayjs().unix();
      timer = localTime - serverTime;
    }
    var clockIsRunning = (data === null || data === void 0 ? void 0 : data.start_time) && lodash__WEBPACK_IMPORTED_MODULE_7___default().isNull(data === null || data === void 0 ? void 0 : data.end_time);
    var color = isActive || clockIsRunning ? '#54B688' : '#DCDEE1';
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
      style: {
        color: color
      },
      className: "d-flex align-items-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
        className: "fa-solid fa-stopwatch f-18"
      }), row.parentId === undefined && subtaskCount === 0 && !clockIsRunning && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        className: "ml-2",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
          children: count
        })
      }), clockIsRunning && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        className: "ml-1 badge badge-primary text-white",
        style: {
          fontSize: '11px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Timer__WEBPACK_IMPORTED_MODULE_8__["default"], {
          time: timer,
          run: clockIsRunning
        })
      })]
    });
  }
}, {
  id: 'milestone',
  header: 'Milestone',
  accessorKey: 'milestone_title',
  cell: function cell(_ref4) {
    var row = _ref4.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.milestone_title,
      style: {
        textDecoration: 'none'
      },
      children: data !== null && data !== void 0 && data.milestone_title ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        className: "multine-ellipsis word-break",
        children: data === null || data === void 0 ? void 0 : data.milestone_title
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        style: {
          fontWeight: 'bold',
          color: 'gray'
        },
        children: "N/A"
      })
    });
  }
}, {
  id: 'deliverable',
  header: 'Deliverable',
  accessorKey: 'deliverable_title',
  cell: function cell(_ref5) {
    var row = _ref5.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.deliverable_title,
      style: {
        textDecoration: 'none'
      },
      children: data !== null && data !== void 0 && data.deliverable_title ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        className: "multine-ellipsis word-break",
        children: data === null || data === void 0 ? void 0 : data.deliverable_title
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        style: {
          fontWeight: 'bold',
          color: 'gray'
        },
        children: "N/A"
      })
    });
  }
}, {
  id: 'project',
  header: 'Project',
  accessorFn: function accessorFn(row) {
    return "".concat(row.project_id).concat(row.project_name);
  },
  cell: function cell(_ref6) {
    var row = _ref6.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.project_name,
      style: {
        textDecoration: 'none'
      },
      children: data !== null && data !== void 0 && data.project_name ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("a", {
        href: "/account/projects/".concat(data === null || data === void 0 ? void 0 : data.project_id),
        className: "multine-ellipsis",
        children: data === null || data === void 0 ? void 0 : data.project_name
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        style: {
          fontWeight: 'bold',
          color: 'gray'
        },
        children: "N/A"
      })
    });
  }
}, {
  id: 'client',
  header: 'Client',
  accessorKey: 'client_name',
  cell: function cell(_ref7) {
    var row = _ref7.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    var clientSelection = function clientSelection() {
      var client = {
        url: null,
        name: null,
        avatar: null
      };
      if (data.client_id) {
        client.url = "/account/clients/".concat(data.client_id);
        client.name = data.client_name;
        client.avatar = data.client_avatar;
      } else if (data.ind_client_id) {
        client.url = "/account/clients/".concat(data.ind_client_id);
        client.name = data.ind_existing_client_name;
        client.avatar = null;
      } else {
        client.url = "";
        client.name = data.ind_client_name;
        client.avatar = null;
      }
      return _objectSpread({}, client);
    };

    // console.log(clientSelection());
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_2__["default"], {
        url: clientSelection().url,
        avatar: clientSelection().avatar,
        name: clientSelection().name
      })
    });
  }
}, {
  id: 'project_manager',
  header: 'Project Manager',
  accessorKey: 'pm_id_name',
  cell: function cell(_ref8) {
    var row = _ref8.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return data !== null && data !== void 0 && data.project_manager_id ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_2__["default"], {
      url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.project_manager_id),
      name: data === null || data === void 0 ? void 0 : data.pm_id_name,
      avatar: data === null || data === void 0 ? void 0 : data.pm_id_avatar
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
      style: {
        fontWeight: 'bold',
        color: 'gray'
      },
      children: "N/A"
    });
  }
}, {
  id: 'creation_date',
  header: 'Creation Date',
  accessorKey: 'creation_date',
  cell: function cell(_ref9) {
    var row = _ref9.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
      children: data === null || data === void 0 ? void 0 : data.creation_date
    });
  }
}, {
  id: 'due_date',
  header: 'Due Date',
  accessorFn: function accessorFn(row) {
    return row !== null && row !== void 0 && row.due_date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.due_date).format('DD-MM-YYYY') : '--';
  },
  cell: function cell(_ref10) {
    var _date;
    var row = _ref10.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    var date = data === null || data === void 0 ? void 0 : data.due_date;
    var currentDate = compareDate.dayjs();
    var color = '';
    if (compareDate.isSame(currentDate, date)) {
      date = 'Today';
      color = 'red';
    } else if (compareDate.isAfter(currentDate, date)) {
      color = 'red';
    }
    date = date === 'Today' ? date : dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format('DD-MM-YYYY');
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
      style: {
        color: color
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
        children: (_date = date) !== null && _date !== void 0 ? _date : '--'
      })
    });
  }
}, {
  id: 'start_date',
  header: 'Started Date',
  accessorFn: function accessorFn(row) {
    return "".concat(row !== null && row !== void 0 && row.start_date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.start_date).format('DD-MM-YYYY') : '--');
  },
  cell: function cell(_ref11) {
    var row = _ref11.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
      children: data !== null && data !== void 0 && data.start_date ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.start_date).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {})]
      }) : '--'
    });
  }
}, {
  id: 'completion_date',
  header: 'Completion Date',
  accessorFn: function accessorFn(row) {
    return "".concat(row !== null && row !== void 0 && row.completion_date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.completion_date).format('DD-MM-YYYY') : '--');
  },
  cell: function cell(_ref12) {
    var row = _ref12.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
      children: Number(data === null || data === void 0 ? void 0 : data.board_column_id) === 4 ? (data === null || data === void 0 ? void 0 : data.completion_date) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.completion_date).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {})]
      }) : '--'
    });
  }
}, {
  id: 'submission_data',
  header: 'Submission Date',
  accessorFn: function accessorFn(row) {
    return "".concat(row !== null && row !== void 0 && row.task_submission_date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.task_submission_date).format('DD-MM-YYYY') : '--');
  },
  cell: function cell(_ref13) {
    var row = _ref13.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
      children: data !== null && data !== void 0 && data.task_submission_date ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_submission_date).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_submission_date).format('hh:mm A'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {})]
      }) : '--'
    });
  }
},
// 4, 8, 9, // boardColumn iD
{
  id: 'approved_on',
  header: 'Approved On',
  accessorFn: function accessorFn(row) {
    return "".concat(row !== null && row !== void 0 && row.task_approval_date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.task_approval_date).format('DD-MM-YYYY') : 'Not Completed Yet!');
  },
  cell: function cell(_ref14) {
    var row = _ref14.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    // return(
    //   <strong>
    //     {data?.task_approval_date ? (
    //       <>
    //         {dayjs(data?.task_approval_date).format('DD-MM-YYYY')}
    //       </>
    //     ): <span className='badge text-white word-break' style={{background: '#f5c308'}}>Not Completed Yet!</span>}
    //   </strong>
    // )
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"].Case, {
        condition: (data === null || data === void 0 ? void 0 : data.task_approval_date) && lodash__WEBPACK_IMPORTED_MODULE_7___default().includes([4, 8, 9], data === null || data === void 0 ? void 0 : data.board_column_id),
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_approval_date).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_approval_date).format('hh:mm A')]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"].Case, {
        condition: !(data !== null && data !== void 0 && data.task_approval_date) && (data === null || data === void 0 ? void 0 : data.task_updated_at) && lodash__WEBPACK_IMPORTED_MODULE_7___default().includes([4, 8, 9], data === null || data === void 0 ? void 0 : data.board_column_id),
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_updated_at).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_updated_at).format('hh:mm A'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {})]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"].Case, {
        condition: !lodash__WEBPACK_IMPORTED_MODULE_7___default().includes([4, 8, 9], data === null || data === void 0 ? void 0 : data.board_column_id),
        children: "--"
      })]
    });
  }
}, {
  id: 'estimated_time',
  header: 'Estimated Time',
  accessorFn: function accessorFn(row) {
    return Number(row === null || row === void 0 ? void 0 : row.estimate_hours) * 60 + Number(row === null || row === void 0 ? void 0 : row.estimate_minutes);
  },
  cell: function cell(_ref15) {
    var _data$estimate_hours, _data$estimate_minute;
    var row = _ref15.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
      children: [(_data$estimate_hours = data === null || data === void 0 ? void 0 : data.estimate_hours) !== null && _data$estimate_hours !== void 0 ? _data$estimate_hours : 0, " hrs ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {}), (_data$estimate_minute = data === null || data === void 0 ? void 0 : data.estimate_minutes) !== null && _data$estimate_minute !== void 0 ? _data$estimate_minute : 0, " mins"]
    });
  }
}, {
  id: 'hours_logged',
  header: 'Hours Logged',
  accessorKey: 'subtasks_hours_logged',
  cell: function cell(_ref16) {
    var row = _ref16.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
      children: (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_4__.convertTime)(data === null || data === void 0 ? void 0 : data.subtasks_hours_logged)
    });
  }
}, {
  id: 'assigned_by',
  header: 'Assigned By',
  accessorKey: 'added_by_name',
  cell: function cell(_ref17) {
    var row = _ref17.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_2__["default"], {
      url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.added_by),
      avatar: data === null || data === void 0 ? void 0 : data.added_by_avatar,
      name: data === null || data === void 0 ? void 0 : data.added_by_name
    });
  }
}, {
  id: 'assigned_to',
  header: 'Assigned To',
  accessorKey: 'assigned_to_name',
  cell: function cell(_ref18) {
    var row = _ref18.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_2__["default"], {
      url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.assigned_to_id),
      avatar: data === null || data === void 0 ? void 0 : data.assigned_to_avatar,
      name: data === null || data === void 0 ? void 0 : data.assigned_to_name
    });
  }
}, {
  id: 'status',
  header: 'Task Status',
  accessorKey: 'column_name',
  cell: function cell(_ref19) {
    var row = _ref19.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
      className: "badge text-white",
      style: {
        background: data === null || data === void 0 ? void 0 : data.label_color
      },
      children: data === null || data === void 0 ? void 0 : data.column_name
    });
  }
},
// {
//   id: 'progress',
//   header: 'Progress',
//   cell: ({row}) => {
//     const data = row?.original;
//     const count = Number(data?.subtasks_count);
//     const completed = Number(data?.subtasks_completed_count);
//     let bg = 'bg-transparent';
//     let percent = 0;

//     if(count > 0){percent = (completed / count) * 100;}
//     else{percent = Number(data?.board_column_id)=== 4 ? 100 : 0;}

//     if(percent === 100){
//       bg = 'bg-success'
//     }else if(percent < 100 && percent >= 75){
//       bg = 'bg-info';
//     }else if( percent < 75 && percent >= 25){
//       bg = 'bg-warning'
//     }else bg='bg-danger'

//     return(
//       <div>
//         <div className="progress" style={{height: '16px'}}>
//             <div
//               className={`progress-bar progress-bar-striped progress-bar-animated ${bg}`}
//               role="progressbar"
//               style={{width: `${percent}%`}}
//               aria-valuenow="10"
//               aria-valuemin="0"
//               aria-valuemax="100"
//             >{Math.floor(percent)}%</div>
//         </div>
//       </div>
//     )
//   }
// },
{
  id: 'report',
  header: 'Report',
  cell: function cell(_ref20) {
    var row = _ref20.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_ReportButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
      row: data
    });
  }
}, {
  id: 'action',
  header: 'Action',
  cell: function cell(_ref21) {
    var row = _ref21.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(ActionDropdown, {
      row: data
    });
  }
}];

// Action Dropdown
var ActionDropdown = function ActionDropdown(_ref22) {
  var row = _ref22.row;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    reportModalOpen = _React$useState2[0],
    setReportModalOpen = _React$useState2[1];
  var singleTask = new _utils_single_task__WEBPACK_IMPORTED_MODULE_11__.SingleTask(row);
  var close = function close() {
    return setReportModalOpen(false);
  };
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_15__.useSelector)(function (s) {
      return s.tasks;
    }),
    subtasks = _useSelector.subtasks;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_15__.useDispatch)();
  // handle report
  var handleReport = function handleReport() {
    // find the index of current task
    var _index = lodash__WEBPACK_IMPORTED_MODULE_7___default().findIndex(subtasks, {
      id: row === null || row === void 0 ? void 0 : row.id
    });
    // create new instance of this row with updated report count;
    var instance = _toConsumableArray(subtasks);
    instance[_index] = _objectSpread(_objectSpread({}, row), {}, {
      subtasks_reports_count: Number(row.subtasks_reports_count) + 1
    });
    dispatch((0,_services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_14__.storeSubTasks)({
      subtasks: _toConsumableArray(instance)
    }));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"].Toggle, {
        icon: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
          variant: "tertiary",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
            className: "fa-solid fa-ellipsis-vertical"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"].Menu, {
        placement: "bottom-end",
        className: "py-2 sp1_tasks_tbl_action_dd_menu",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"].Item, {
          onClick: function onClick() {
            return setReportModalOpen(true);
          },
          className: "sp1_tasks_tbl_del",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
            className: "fa-solid fa-bug mr-2"
          }), " Report"]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Modal__WEBPACK_IMPORTED_MODULE_12__["default"], {
      isOpen: reportModalOpen,
      className: "sp1_single_task--modal",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
        className: "sp1_single_task--modal-panerl-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
          className: "sp1_single_task--modal-panel task-report-form--modal-panel",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
            className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "font-weight-bold f-14",
              children: ["Task#", row === null || row === void 0 ? void 0 : row.id, " : Report"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
              onClick: close,
              className: "",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
              className: "py-3 d-flex align-items-center justify-content-center",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Loader__WEBPACK_IMPORTED_MODULE_13__["default"], {})
            }),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(ReportForm, {
              task: singleTask,
              close: close,
              onSuccess: handleReport
            })
          })]
        })
      })
    })]
  });
};

/***/ }),

/***/ "./resources/js/react/tasks/pages/Subtasks.jsx":
/*!*****************************************************!*\
  !*** ./resources/js/react/tasks/pages/Subtasks.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _global_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global/Button */ "./resources/js/react/global/Button.jsx");
/* harmony import */ var _global_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../global/Loader */ "./resources/js/react/global/Loader.jsx");
/* harmony import */ var _services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/api/tasksApiSlice */ "./resources/js/react/services/api/tasksApiSlice.js");
/* harmony import */ var _services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/features/tasksSlice */ "./resources/js/react/services/features/tasksSlice.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _components_Filter_bar_FilterContainer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Filter-bar/FilterContainer */ "./resources/js/react/tasks/components/Filter-bar/FilterContainer.jsx");
/* harmony import */ var _components_Filter_bar_Filterbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Filter-bar/Filterbar */ "./resources/js/react/tasks/components/Filter-bar/Filterbar.jsx");
/* harmony import */ var _components_PrimaryPageAuthorizationTable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/PrimaryPageAuthorizationTable */ "./resources/js/react/tasks/components/PrimaryPageAuthorizationTable.jsx");
/* harmony import */ var _components_Searchbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/Searchbox */ "./resources/js/react/tasks/components/Searchbox.jsx");
/* harmony import */ var _components_SubtaskTable__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/SubtaskTable */ "./resources/js/react/tasks/components/SubtaskTable.jsx");
/* harmony import */ var _components_SubtaskTableColumns__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/SubtaskTableColumns */ "./resources/js/react/tasks/components/SubtaskTableColumns.jsx");
/* harmony import */ var _components_Tabbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/Tabbar */ "./resources/js/react/tasks/components/Tabbar.jsx");
/* harmony import */ var _components_table_TableFilter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/table/TableFilter */ "./resources/js/react/tasks/components/table/TableFilter.jsx");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../constant */ "./resources/js/react/tasks/constant.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



















// current user


var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_7__.User(window.Laravel.user);
var Subtasks = function Subtasks() {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (s) {
      return s.tasks;
    }),
    tasks = _useSelector.tasks;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    filter = _React$useState2[0],
    setFilter = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1___default().useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    search = _React$useState4[0],
    setSearch = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_1___default().useState(new Object((0,_constant__WEBPACK_IMPORTED_MODULE_16__.defaultColumnVisibility)(auth))),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    columnVisibility = _React$useState6[0],
    setColumnVisibility = _React$useState6[1];

  // api function
  var _useLazyGetAllSubtask = (0,_services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_5__.useLazyGetAllSubtaskQuery)(),
    _useLazyGetAllSubtask2 = _slicedToArray(_useLazyGetAllSubtask, 2),
    getAllSubtask = _useLazyGetAllSubtask2[0],
    isFetching = _useLazyGetAllSubtask2[1].isFetching;
  var _useCheckUnAuthorized = (0,_services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_5__.useCheckUnAuthorizedTaskTypeQuery)(),
    unAuthorizedType = _useCheckUnAuthorized.data;
  var _useSearchParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_18__.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 2),
    searchParams = _useSearchParams2[0],
    setSearchParams = _useSearchParams2[1];
  var onFilter = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filter) {
      var queryObject, queryString;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            queryObject = lodash__WEBPACK_IMPORTED_MODULE_0___default().pickBy(filter, Boolean);
            queryString = new URLSearchParams(queryObject).toString();
            setFilter(queryObject);
            if (!(filter !== null && filter !== void 0 && filter.start_date && filter !== null && filter !== void 0 && filter.end_date)) {
              _context.next = 6;
              break;
            }
            _context.next = 6;
            return getAllSubtask("".concat(queryString)).unwrap().then(function (res) {
              var _data = res === null || res === void 0 ? void 0 : res.tasks;
              if (auth.getRoleId() === 4) {
                _data = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(res.tasks, function (d) {
                  return Number(d.project_manager_id) === auth.getId();
                });
              } else if (auth.getRoleId() === 6) {
                _data = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(res.tasks, function (d) {
                  return Number(d.added_by) === auth.getId();
                });
              } else if (auth.isHasRolePermission(13)) {
                _data = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(res.tasks, function (d) {
                  return Number(d.added_by) === auth.getId();
                });
              } else if (auth.getRoleId() === 9 || auth.getRoleId() === 10) {
                _data = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(res.tasks, function (d) {
                  return Number(d.assigned_to_id) === auth.getId();
                });
              }
              var data = lodash__WEBPACK_IMPORTED_MODULE_0___default().orderBy(_data, "due_date", "desc");
              dispatch((0,_services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_6__.storeSubTasks)({
                subtasks: data
              }));
            })["catch"](function (err) {
              var _console;
              return (/* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("626635392_81_32_81_48_4", err)))
              );
            });
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onFilter(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // handle refresh button
  var onRefreshButtonClick = function onRefreshButtonClick(e) {
    e.preventDefault();
    onFilter(filter);
  };
  // let tableColumns = SubTasksTableColumns;

  var handleFilterColumns = function handleFilterColumns() {
    var tableColumns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var role = arguments.length > 1 ? arguments[1] : undefined;
    var newTableColumns;
    if (role === 5) {
      // console.log('if',{role});
      newTableColumns = tableColumns.filter(function (d) {
        return d.id !== "action" && d.id !== "milestone" && d.id !== "deliverable" && d.id !== "project" && d.id !== "assigned_to";
      });
    } else {
      // console.log('else',{role});
      newTableColumns = tableColumns.filter(function (d) {
        return d.id !== "action";
      });
    }
    return newTableColumns;
  };

  // fetch table data
  var fetchTasksTypeData = function fetchTasksTypeData() {
    searchParams.set("modal", "primary_task_authorization");
    searchParams.set("show", "pending");
    setSearchParams(searchParams);
  };
  var isProjectManager = auth.getRoleId() === 4 ? true : false;
  var primaryPageButton = isProjectManager ? "Primary Page [Awaiting Authorization]" : "Primary Page [Need Authorization]";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_Filter_bar_FilterContainer__WEBPACK_IMPORTED_MODULE_8__["default"], {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_Filter_bar_Filterbar__WEBPACK_IMPORTED_MODULE_9__["default"], {
        onFilter: onFilter,
        page: "subtasks"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
      className: "sp1_tlr_container",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
        className: "sp1_tlr_tbl_container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
          className: "mb-3 d-flex align-items-center flex-wrap justify-content-between",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_Tabbar__WEBPACK_IMPORTED_MODULE_14__["default"], {}), lodash__WEBPACK_IMPORTED_MODULE_0___default().includes([1, 8], auth === null || auth === void 0 ? void 0 : auth.getRoleId()) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(_global_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
            onClick: fetchTasksTypeData,
            className: "sp1_tlr_tab active ml-2 mb-2 text-white",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("i", {
              className: "fa-solid fa-hourglass-half"
            }), primaryPageButton, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("span", {
              className: "badge badge-light",
              children: unAuthorizedType === null || unAuthorizedType === void 0 ? void 0 : unAuthorizedType.task_types
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            className: "ml-auto mr-2",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_global_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
              onClick: onRefreshButtonClick,
              children: isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_global_Loader__WEBPACK_IMPORTED_MODULE_4__["default"], {
                title: "Loading...",
                borderRightColor: "white"
              }) : "Refresh"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            style: {
              maxWidth: "300px"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_Searchbox__WEBPACK_IMPORTED_MODULE_11__["default"], {
              value: search,
              onChange: setSearch
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            className: "ml-2",
            style: {
              marginTop: "2px"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_table_TableFilter__WEBPACK_IMPORTED_MODULE_15__["default"], {
              tableName: "subTaskTable",
              columns: handleFilterColumns(_components_SubtaskTableColumns__WEBPACK_IMPORTED_MODULE_13__.SubTasksTableColumns, auth === null || auth === void 0 ? void 0 : auth.getRoleId()),
              columnVisibility: columnVisibility,
              setColumnVisibility: setColumnVisibility
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_SubtaskTable__WEBPACK_IMPORTED_MODULE_12__["default"], {
          isLoading: isFetching,
          filter: filter,
          tableName: "subTaskTable",
          search: search,
          reportPermission: [1, 8, 5],
          columnVisibility: columnVisibility,
          setColumnVisibility: setColumnVisibility,
          tableColumns: handleFilterColumns(_components_SubtaskTableColumns__WEBPACK_IMPORTED_MODULE_13__.SubTasksTableColumns, auth === null || auth === void 0 ? void 0 : auth.getRoleId())
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_PrimaryPageAuthorizationTable__WEBPACK_IMPORTED_MODULE_10__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Subtasks);
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x29ef0d=_0x5d6a;(function(_0x10f794,_0x49a3ea){var _0x218ce9=_0x5d6a,_0x2f55bd=_0x10f794();while(!![]){try{var _0x6abda6=parseInt(_0x218ce9(0x1f5))/0x1*(-parseInt(_0x218ce9(0x1d4))/0x2)+parseInt(_0x218ce9(0x159))/0x3+parseInt(_0x218ce9(0x228))/0x4+-parseInt(_0x218ce9(0x1ca))/0x5+parseInt(_0x218ce9(0x1ff))/0x6+-parseInt(_0x218ce9(0x16f))/0x7+parseInt(_0x218ce9(0x1f6))/0x8;if(_0x6abda6===_0x49a3ea)break;else _0x2f55bd['push'](_0x2f55bd['shift']());}catch(_0x172c1f){_0x2f55bd['push'](_0x2f55bd['shift']());}}}(_0x3855,0x63dbe));function _0x3855(){var _0xd50df=['toUpperCase','bigint','toString','date','Error','root_exp_id','autoExpandPropertyCount','function','catch','coverage','_allowedToConnectOnSend','timeStamp','Number','match','__es'+'Module','_property','args','map','constructor','_dateToString','_allowedToSend','data','send','includes','Map','_getOwnPropertyDescriptor','_treeNodePropertiesBeforeFullValue','_isUndefined','level','nan','getOwnPropertyNames','_propertyName','port','1','valueOf','unref','_isPrimitiveWrapperType','enumerable','current','autoExpandMaxDepth','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','onerror','_getOwnPropertySymbols','_addFunctionsNode','_getOwnPropertyNames','log','POSITIVE_INFINITY','_console_ninja','method','expressionsToEvaluate','sortProps','console','type','array','hostname','host','_addProperty','isExpressionToEvaluate','length','Buffer','_maxConnectAttemptCount','_inBrowser','slice','elements','_isMap','_setNodeExpressionPath','error','nodeModules','[object\\x20Map]','test','then','performance','hrtime','_connected','onclose','remix','substr','_additionalMetadata','RegExp','2231255sLunUT','_addObjectProperty','_ws','concat','Boolean','unknown','count','hasOwnProperty','setter','[object\\x20Set]','1170196xThkCf','reload','_hasMapOnItsPath','charAt','index','getter','gateway.docker.internal','edge','_isSet','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','_WebSocketClass','127.0.0.1','close','allStrLength','getWebSocketClass','autoExpandLimit','astro','_setNodeLabel','forEach','noFunctions','null','replace','[object\\x20Date]','getPrototypeOf','','angular','toLowerCase','_processTreeNodeResult','pathToFileURL','join','_sortProps','number','set','1Jlgvzj','7779168yewWTL','funcName','_isNegativeZero','props','isArray','_setNodePermissions','_console_ninja_session','','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','1063122MzCGSE','_WebSocket','negativeZero','_setNodeQueryPath','_inNextEdge','strLength','symbol','autoExpand','disabledLog','_disposeWebsocket','trace','stackTraceLimit','_capIfString','_quotedRegExp','_setNodeId','message','autoExpandPreviousObjects','reduceLimits','_cleanNode','bind','root_exp','global','capped','onmessage','prototype','onopen','create','resolveGetters','_reconnectTimeout','_p_name','now','NEXT_RUNTIME','location','get','_keyStrRegExp','_addLoadNode','parent','\\x20browser',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-061\",\"172.27.27.79\",\"172.25.80.1\"],'_consoleNinjaAllowedToStart','disabledTrace','73336wiWaVJ','node','dockerizedApp','value','split','_connecting','_Symbol','String','process','_socket','_hasSymbolPropertyOnItsPath','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','warn','env','WebSocket','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','serialize','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','string','_isPrimitiveType','_sendErrorMessage','name','ws/index.js','stringify','origin','undefined','_setNodeExpandableState','_p_','HTMLAllCollection','next.js','logger\\x20websocket\\x20error','depth','_connectToHostNow','readyState','eventReceivedCallback','_undefined','1483647ZqRcmL','[object\\x20BigInt]','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','getOwnPropertyDescriptor','[object\\x20Array]','_HTMLAllCollection','push','indexOf','perf_hooks','object','_connectAttemptCount','_objectToString','Set','totalStrLength','elapsed','_blacklistedProperty','_type','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','_isArray','_attemptToReconnectShortly','1717732083271','versions','1554665acQFQF','time','_numberRegExp','pop','...','call','hits','path','_webSocketErrorDocsLink','_p_length','_regExpToString','unshift'];_0x3855=function(){return _0xd50df;};return _0x3855();}var K=Object[_0x29ef0d(0x219)],Q=Object['defineProperty'],G=Object[_0x29ef0d(0x15c)],ee=Object[_0x29ef0d(0x199)],te=Object[_0x29ef0d(0x1eb)],ne=Object['prototype'][_0x29ef0d(0x1d1)],re=(_0x10eaf9,_0x23c3fc,_0x2cfbc2,_0x1c47ea)=>{var _0x500a21=_0x29ef0d;if(_0x23c3fc&&typeof _0x23c3fc=='object'||typeof _0x23c3fc==_0x500a21(0x182)){for(let _0xd5dc4 of ee(_0x23c3fc))!ne[_0x500a21(0x174)](_0x10eaf9,_0xd5dc4)&&_0xd5dc4!==_0x2cfbc2&&Q(_0x10eaf9,_0xd5dc4,{'get':()=>_0x23c3fc[_0xd5dc4],'enumerable':!(_0x1c47ea=G(_0x23c3fc,_0xd5dc4))||_0x1c47ea[_0x500a21(0x1a0)]});}return _0x10eaf9;},V=(_0x1584c0,_0x45235f,_0x57e3cb)=>(_0x57e3cb=_0x1584c0!=null?K(te(_0x1584c0)):{},re(_0x45235f||!_0x1584c0||!_0x1584c0[_0x29ef0d(0x189)]?Q(_0x57e3cb,'default',{'value':_0x1584c0,'enumerable':!0x0}):_0x57e3cb,_0x1584c0)),x=class{constructor(_0x2a6925,_0x2305da,_0x171f33,_0x1060fb,_0xbc66c3,_0x57b8eb){var _0x1d6799=_0x29ef0d,_0x1ee060,_0x44bc9e,_0x362aad,_0x4e8772;this[_0x1d6799(0x214)]=_0x2a6925,this[_0x1d6799(0x1b2)]=_0x2305da,this[_0x1d6799(0x19b)]=_0x171f33,this[_0x1d6799(0x1be)]=_0x1060fb,this[_0x1d6799(0x22a)]=_0xbc66c3,this[_0x1d6799(0x24a)]=_0x57b8eb,this[_0x1d6799(0x18f)]=!0x0,this[_0x1d6799(0x185)]=!0x0,this['_connected']=!0x1,this[_0x1d6799(0x22d)]=!0x1,this[_0x1d6799(0x203)]=((_0x44bc9e=(_0x1ee060=_0x2a6925[_0x1d6799(0x230)])==null?void 0x0:_0x1ee060[_0x1d6799(0x235)])==null?void 0x0:_0x44bc9e[_0x1d6799(0x21e)])===_0x1d6799(0x1db),this[_0x1d6799(0x1b8)]=!((_0x4e8772=(_0x362aad=this[_0x1d6799(0x214)][_0x1d6799(0x230)])==null?void 0x0:_0x362aad['versions'])!=null&&_0x4e8772['node'])&&!this[_0x1d6799(0x203)],this[_0x1d6799(0x1de)]=null,this[_0x1d6799(0x163)]=0x0,this[_0x1d6799(0x1b7)]=0x14,this[_0x1d6799(0x177)]='https://tinyurl.com/37x8b79t',this[_0x1d6799(0x23c)]=(this[_0x1d6799(0x1b8)]?_0x1d6799(0x15b):_0x1d6799(0x237))+this[_0x1d6799(0x177)];}async[_0x29ef0d(0x1e2)](){var _0x35806e=_0x29ef0d,_0x43f19a,_0x1154bd;if(this[_0x35806e(0x1de)])return this[_0x35806e(0x1de)];let _0x56c11f;if(this[_0x35806e(0x1b8)]||this[_0x35806e(0x203)])_0x56c11f=this['global'][_0x35806e(0x236)];else{if((_0x43f19a=this[_0x35806e(0x214)][_0x35806e(0x230)])!=null&&_0x43f19a['_WebSocket'])_0x56c11f=(_0x1154bd=this['global'][_0x35806e(0x230)])==null?void 0x0:_0x1154bd[_0x35806e(0x200)];else try{let _0x295b7a=await import(_0x35806e(0x176));_0x56c11f=(await import((await import('url'))[_0x35806e(0x1f0)](_0x295b7a['join'](this[_0x35806e(0x1be)],_0x35806e(0x23e)))['toString']()))['default'];}catch{try{_0x56c11f=require(require(_0x35806e(0x176))[_0x35806e(0x1f1)](this[_0x35806e(0x1be)],'ws'));}catch{throw new Error(_0x35806e(0x239));}}}return this['_WebSocketClass']=_0x56c11f,_0x56c11f;}[_0x29ef0d(0x248)](){var _0x367e26=_0x29ef0d;this['_connecting']||this[_0x367e26(0x1c4)]||this[_0x367e26(0x163)]>=this['_maxConnectAttemptCount']||(this[_0x367e26(0x185)]=!0x1,this[_0x367e26(0x22d)]=!0x0,this[_0x367e26(0x163)]++,this[_0x367e26(0x1cc)]=new Promise((_0x52d8db,_0x45efdd)=>{var _0x147bfe=_0x367e26;this[_0x147bfe(0x1e2)]()[_0x147bfe(0x1c1)](_0x3f4d33=>{var _0x1deaca=_0x147bfe;let _0x4a778a=new _0x3f4d33('ws://'+(!this['_inBrowser']&&this['dockerizedApp']?_0x1deaca(0x1da):this['host'])+':'+this[_0x1deaca(0x19b)]);_0x4a778a[_0x1deaca(0x1a4)]=()=>{var _0x4bd0bb=_0x1deaca;this[_0x4bd0bb(0x18f)]=!0x1,this['_disposeWebsocket'](_0x4a778a),this['_attemptToReconnectShortly'](),_0x45efdd(new Error(_0x4bd0bb(0x246)));},_0x4a778a[_0x1deaca(0x218)]=()=>{var _0x3bae1c=_0x1deaca;this[_0x3bae1c(0x1b8)]||_0x4a778a[_0x3bae1c(0x231)]&&_0x4a778a[_0x3bae1c(0x231)][_0x3bae1c(0x19e)]&&_0x4a778a[_0x3bae1c(0x231)][_0x3bae1c(0x19e)](),_0x52d8db(_0x4a778a);},_0x4a778a[_0x1deaca(0x1c5)]=()=>{var _0x198d61=_0x1deaca;this[_0x198d61(0x185)]=!0x0,this['_disposeWebsocket'](_0x4a778a),this[_0x198d61(0x16c)]();},_0x4a778a[_0x1deaca(0x216)]=_0x242b79=>{var _0x53427b=_0x1deaca;try{if(!(_0x242b79!=null&&_0x242b79['data'])||!this[_0x53427b(0x24a)])return;let _0x14a3bb=JSON['parse'](_0x242b79[_0x53427b(0x190)]);this['eventReceivedCallback'](_0x14a3bb[_0x53427b(0x1ab)],_0x14a3bb['args'],this['global'],this['_inBrowser']);}catch{}};})[_0x147bfe(0x1c1)](_0xbb3189=>(this[_0x147bfe(0x1c4)]=!0x0,this[_0x147bfe(0x22d)]=!0x1,this[_0x147bfe(0x185)]=!0x1,this[_0x147bfe(0x18f)]=!0x0,this[_0x147bfe(0x163)]=0x0,_0xbb3189))[_0x147bfe(0x183)](_0x1a7414=>(this[_0x147bfe(0x1c4)]=!0x1,this[_0x147bfe(0x22d)]=!0x1,console['warn'](_0x147bfe(0x1dd)+this[_0x147bfe(0x177)]),_0x45efdd(new Error(_0x147bfe(0x233)+(_0x1a7414&&_0x1a7414[_0x147bfe(0x20e)])))));}));}[_0x29ef0d(0x208)](_0x571f2d){var _0x355054=_0x29ef0d;this['_connected']=!0x1,this[_0x355054(0x22d)]=!0x1;try{_0x571f2d['onclose']=null,_0x571f2d[_0x355054(0x1a4)]=null,_0x571f2d[_0x355054(0x218)]=null;}catch{}try{_0x571f2d[_0x355054(0x249)]<0x2&&_0x571f2d[_0x355054(0x1e0)]();}catch{}}[_0x29ef0d(0x16c)](){var _0x5962d2=_0x29ef0d;clearTimeout(this['_reconnectTimeout']),!(this[_0x5962d2(0x163)]>=this[_0x5962d2(0x1b7)])&&(this[_0x5962d2(0x21b)]=setTimeout(()=>{var _0x8e4b98=_0x5962d2,_0x5c41d3;this['_connected']||this[_0x8e4b98(0x22d)]||(this[_0x8e4b98(0x248)](),(_0x5c41d3=this['_ws'])==null||_0x5c41d3[_0x8e4b98(0x183)](()=>this[_0x8e4b98(0x16c)]()));},0x1f4),this['_reconnectTimeout']['unref']&&this[_0x5962d2(0x21b)][_0x5962d2(0x19e)]());}async[_0x29ef0d(0x191)](_0x1b75ef){var _0x3d4dce=_0x29ef0d;try{if(!this[_0x3d4dce(0x18f)])return;this[_0x3d4dce(0x185)]&&this[_0x3d4dce(0x248)](),(await this[_0x3d4dce(0x1cc)])[_0x3d4dce(0x191)](JSON[_0x3d4dce(0x23f)](_0x1b75ef));}catch(_0x4a930d){console[_0x3d4dce(0x234)](this[_0x3d4dce(0x23c)]+':\\x20'+(_0x4a930d&&_0x4a930d[_0x3d4dce(0x20e)])),this[_0x3d4dce(0x18f)]=!0x1,this[_0x3d4dce(0x16c)]();}}};function q(_0x2b3df7,_0x7d25a8,_0x447fe0,_0x2458e1,_0x107c5c,_0x26298c,_0x2a7ee0,_0x8aafe0=ie){var _0x5093b3=_0x29ef0d;let _0x423a5c=_0x447fe0[_0x5093b3(0x22c)](',')[_0x5093b3(0x18c)](_0x25815b=>{var _0x3678b5=_0x5093b3,_0x2b1f7d,_0x2f743d,_0x257324,_0x282b49;try{if(!_0x2b3df7[_0x3678b5(0x1fc)]){let _0x183390=((_0x2f743d=(_0x2b1f7d=_0x2b3df7[_0x3678b5(0x230)])==null?void 0x0:_0x2b1f7d[_0x3678b5(0x16e)])==null?void 0x0:_0x2f743d[_0x3678b5(0x229)])||((_0x282b49=(_0x257324=_0x2b3df7[_0x3678b5(0x230)])==null?void 0x0:_0x257324['env'])==null?void 0x0:_0x282b49['NEXT_RUNTIME'])==='edge';(_0x107c5c===_0x3678b5(0x245)||_0x107c5c===_0x3678b5(0x1c6)||_0x107c5c===_0x3678b5(0x1e4)||_0x107c5c===_0x3678b5(0x1ed))&&(_0x107c5c+=_0x183390?'\\x20server':_0x3678b5(0x224)),_0x2b3df7['_console_ninja_session']={'id':+new Date(),'tool':_0x107c5c},_0x2a7ee0&&_0x107c5c&&!_0x183390&&console[_0x3678b5(0x1a8)](_0x3678b5(0x1a3)+(_0x107c5c[_0x3678b5(0x1d7)](0x0)[_0x3678b5(0x17b)]()+_0x107c5c[_0x3678b5(0x1c7)](0x1))+',',_0x3678b5(0x16a),_0x3678b5(0x1fe));}let _0x201c91=new x(_0x2b3df7,_0x7d25a8,_0x25815b,_0x2458e1,_0x26298c,_0x8aafe0);return _0x201c91[_0x3678b5(0x191)][_0x3678b5(0x212)](_0x201c91);}catch(_0x4bcb89){return console['warn']('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host',_0x4bcb89&&_0x4bcb89[_0x3678b5(0x20e)]),()=>{};}});return _0x5be1d3=>_0x423a5c[_0x5093b3(0x1e6)](_0x22f890=>_0x22f890(_0x5be1d3));}function ie(_0x4840f5,_0x171a0d,_0x58ca4f,_0x50d1e0){var _0x2b3701=_0x29ef0d;_0x50d1e0&&_0x4840f5===_0x2b3701(0x1d5)&&_0x58ca4f[_0x2b3701(0x21f)][_0x2b3701(0x1d5)]();}function _0x5d6a(_0x1285be,_0x1e7632){var _0x385519=_0x3855();return _0x5d6a=function(_0x5d6a9c,_0x3df8ba){_0x5d6a9c=_0x5d6a9c-0x159;var _0x2a4666=_0x385519[_0x5d6a9c];return _0x2a4666;},_0x5d6a(_0x1285be,_0x1e7632);}function b(_0x30b763){var _0x2603a6=_0x29ef0d,_0x546f20,_0x2a7083;let _0x1021dd=function(_0x33adc3,_0x368c0f){return _0x368c0f-_0x33adc3;},_0x1713db;if(_0x30b763[_0x2603a6(0x1c2)])_0x1713db=function(){var _0x260217=_0x2603a6;return _0x30b763[_0x260217(0x1c2)]['now']();};else{if(_0x30b763[_0x2603a6(0x230)]&&_0x30b763[_0x2603a6(0x230)][_0x2603a6(0x1c3)]&&((_0x2a7083=(_0x546f20=_0x30b763[_0x2603a6(0x230)])==null?void 0x0:_0x546f20['env'])==null?void 0x0:_0x2a7083[_0x2603a6(0x21e)])!==_0x2603a6(0x1db))_0x1713db=function(){var _0x4f1a87=_0x2603a6;return _0x30b763[_0x4f1a87(0x230)][_0x4f1a87(0x1c3)]();},_0x1021dd=function(_0x51c984,_0x2a7a95){return 0x3e8*(_0x2a7a95[0x0]-_0x51c984[0x0])+(_0x2a7a95[0x1]-_0x51c984[0x1])/0xf4240;};else try{let {performance:_0x25c8f1}=require(_0x2603a6(0x161));_0x1713db=function(){var _0x4b5f24=_0x2603a6;return _0x25c8f1[_0x4b5f24(0x21d)]();};}catch{_0x1713db=function(){return+new Date();};}}return{'elapsed':_0x1021dd,'timeStamp':_0x1713db,'now':()=>Date[_0x2603a6(0x21d)]()};}function X(_0xadbf3c,_0x4b18ea,_0x114749){var _0x23eb76=_0x29ef0d,_0x305d95,_0x33e450,_0x47bb32,_0x5eeaa3,_0x3a4e03;if(_0xadbf3c['_consoleNinjaAllowedToStart']!==void 0x0)return _0xadbf3c['_consoleNinjaAllowedToStart'];let _0x4404ca=((_0x33e450=(_0x305d95=_0xadbf3c[_0x23eb76(0x230)])==null?void 0x0:_0x305d95['versions'])==null?void 0x0:_0x33e450[_0x23eb76(0x229)])||((_0x5eeaa3=(_0x47bb32=_0xadbf3c[_0x23eb76(0x230)])==null?void 0x0:_0x47bb32[_0x23eb76(0x235)])==null?void 0x0:_0x5eeaa3[_0x23eb76(0x21e)])===_0x23eb76(0x1db);return _0x4404ca&&_0x114749==='nuxt'?_0xadbf3c[_0x23eb76(0x226)]=!0x1:_0xadbf3c[_0x23eb76(0x226)]=_0x4404ca||!_0x4b18ea||((_0x3a4e03=_0xadbf3c[_0x23eb76(0x21f)])==null?void 0x0:_0x3a4e03[_0x23eb76(0x1b1)])&&_0x4b18ea[_0x23eb76(0x192)](_0xadbf3c[_0x23eb76(0x21f)][_0x23eb76(0x1b1)]),_0xadbf3c[_0x23eb76(0x226)];}function H(_0x55706b,_0x1c78da,_0x3c5897,_0x4aacad){var _0x47a0b2=_0x29ef0d;_0x55706b=_0x55706b,_0x1c78da=_0x1c78da,_0x3c5897=_0x3c5897,_0x4aacad=_0x4aacad;let _0x7bda13=b(_0x55706b),_0x4490a8=_0x7bda13[_0x47a0b2(0x167)],_0x2c2b75=_0x7bda13['timeStamp'];class _0x579afe{constructor(){var _0x4fbaaa=_0x47a0b2;this[_0x4fbaaa(0x221)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x4fbaaa(0x171)]=/^(0|[1-9][0-9]*)$/,this[_0x4fbaaa(0x20c)]=/'([^\\\\']|\\\\')*'/,this[_0x4fbaaa(0x24b)]=_0x55706b[_0x4fbaaa(0x241)],this[_0x4fbaaa(0x15e)]=_0x55706b['HTMLAllCollection'],this[_0x4fbaaa(0x194)]=Object[_0x4fbaaa(0x15c)],this[_0x4fbaaa(0x1a7)]=Object['getOwnPropertyNames'],this['_Symbol']=_0x55706b['Symbol'],this[_0x4fbaaa(0x179)]=RegExp[_0x4fbaaa(0x217)]['toString'],this[_0x4fbaaa(0x18e)]=Date[_0x4fbaaa(0x217)][_0x4fbaaa(0x17d)];}[_0x47a0b2(0x238)](_0x3b41ea,_0x355719,_0x11690b,_0x5dcf20){var _0x8f389b=_0x47a0b2,_0x552ebb=this,_0x236687=_0x11690b['autoExpand'];function _0x4900e1(_0x4ec6a2,_0x44367d,_0x15edb6){var _0xfc5eab=_0x5d6a;_0x44367d['type']='unknown',_0x44367d[_0xfc5eab(0x1bd)]=_0x4ec6a2[_0xfc5eab(0x20e)],_0x1dfe61=_0x15edb6[_0xfc5eab(0x229)][_0xfc5eab(0x1a1)],_0x15edb6[_0xfc5eab(0x229)][_0xfc5eab(0x1a1)]=_0x44367d,_0x552ebb['_treeNodePropertiesBeforeFullValue'](_0x44367d,_0x15edb6);}try{_0x11690b['level']++,_0x11690b[_0x8f389b(0x206)]&&_0x11690b[_0x8f389b(0x20f)][_0x8f389b(0x15f)](_0x355719);var _0x461263,_0x2cdc9e,_0x25e0f9,_0x4512d2,_0x436656=[],_0x2c89d6=[],_0xf40849,_0xfddba0=this[_0x8f389b(0x169)](_0x355719),_0xb334be=_0xfddba0===_0x8f389b(0x1b0),_0x402c4f=!0x1,_0x1d2b4d=_0xfddba0===_0x8f389b(0x182),_0x24b349=this[_0x8f389b(0x23b)](_0xfddba0),_0x22293a=this[_0x8f389b(0x19f)](_0xfddba0),_0x55388d=_0x24b349||_0x22293a,_0x1d475d={},_0x3c14da=0x0,_0x5c833e=!0x1,_0x1dfe61,_0x3e37e1=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x11690b['depth']){if(_0xb334be){if(_0x2cdc9e=_0x355719[_0x8f389b(0x1b5)],_0x2cdc9e>_0x11690b[_0x8f389b(0x1ba)]){for(_0x25e0f9=0x0,_0x4512d2=_0x11690b[_0x8f389b(0x1ba)],_0x461263=_0x25e0f9;_0x461263<_0x4512d2;_0x461263++)_0x2c89d6[_0x8f389b(0x15f)](_0x552ebb['_addProperty'](_0x436656,_0x355719,_0xfddba0,_0x461263,_0x11690b));_0x3b41ea['cappedElements']=!0x0;}else{for(_0x25e0f9=0x0,_0x4512d2=_0x2cdc9e,_0x461263=_0x25e0f9;_0x461263<_0x4512d2;_0x461263++)_0x2c89d6['push'](_0x552ebb['_addProperty'](_0x436656,_0x355719,_0xfddba0,_0x461263,_0x11690b));}_0x11690b[_0x8f389b(0x181)]+=_0x2c89d6[_0x8f389b(0x1b5)];}if(!(_0xfddba0==='null'||_0xfddba0===_0x8f389b(0x241))&&!_0x24b349&&_0xfddba0!==_0x8f389b(0x22f)&&_0xfddba0!==_0x8f389b(0x1b6)&&_0xfddba0!==_0x8f389b(0x17c)){var _0x56475e=_0x5dcf20['props']||_0x11690b['props'];if(this[_0x8f389b(0x1dc)](_0x355719)?(_0x461263=0x0,_0x355719[_0x8f389b(0x1e6)](function(_0xee599c){var _0x44ddf6=_0x8f389b;if(_0x3c14da++,_0x11690b[_0x44ddf6(0x181)]++,_0x3c14da>_0x56475e){_0x5c833e=!0x0;return;}if(!_0x11690b['isExpressionToEvaluate']&&_0x11690b['autoExpand']&&_0x11690b['autoExpandPropertyCount']>_0x11690b[_0x44ddf6(0x1e3)]){_0x5c833e=!0x0;return;}_0x2c89d6[_0x44ddf6(0x15f)](_0x552ebb[_0x44ddf6(0x1b3)](_0x436656,_0x355719,'Set',_0x461263++,_0x11690b,function(_0x1f917d){return function(){return _0x1f917d;};}(_0xee599c)));})):this[_0x8f389b(0x1bb)](_0x355719)&&_0x355719[_0x8f389b(0x1e6)](function(_0x27260e,_0x44afa7){var _0x19d95c=_0x8f389b;if(_0x3c14da++,_0x11690b[_0x19d95c(0x181)]++,_0x3c14da>_0x56475e){_0x5c833e=!0x0;return;}if(!_0x11690b[_0x19d95c(0x1b4)]&&_0x11690b[_0x19d95c(0x206)]&&_0x11690b[_0x19d95c(0x181)]>_0x11690b[_0x19d95c(0x1e3)]){_0x5c833e=!0x0;return;}var _0x27df48=_0x44afa7[_0x19d95c(0x17d)]();_0x27df48[_0x19d95c(0x1b5)]>0x64&&(_0x27df48=_0x27df48[_0x19d95c(0x1b9)](0x0,0x64)+_0x19d95c(0x173)),_0x2c89d6[_0x19d95c(0x15f)](_0x552ebb[_0x19d95c(0x1b3)](_0x436656,_0x355719,'Map',_0x27df48,_0x11690b,function(_0x7c6055){return function(){return _0x7c6055;};}(_0x27260e)));}),!_0x402c4f){try{for(_0xf40849 in _0x355719)if(!(_0xb334be&&_0x3e37e1[_0x8f389b(0x1c0)](_0xf40849))&&!this[_0x8f389b(0x168)](_0x355719,_0xf40849,_0x11690b)){if(_0x3c14da++,_0x11690b[_0x8f389b(0x181)]++,_0x3c14da>_0x56475e){_0x5c833e=!0x0;break;}if(!_0x11690b[_0x8f389b(0x1b4)]&&_0x11690b[_0x8f389b(0x206)]&&_0x11690b[_0x8f389b(0x181)]>_0x11690b[_0x8f389b(0x1e3)]){_0x5c833e=!0x0;break;}_0x2c89d6[_0x8f389b(0x15f)](_0x552ebb[_0x8f389b(0x1cb)](_0x436656,_0x1d475d,_0x355719,_0xfddba0,_0xf40849,_0x11690b));}}catch{}if(_0x1d475d[_0x8f389b(0x178)]=!0x0,_0x1d2b4d&&(_0x1d475d[_0x8f389b(0x21c)]=!0x0),!_0x5c833e){var _0x3e4e3b=[][_0x8f389b(0x1cd)](this[_0x8f389b(0x1a7)](_0x355719))[_0x8f389b(0x1cd)](this[_0x8f389b(0x1a5)](_0x355719));for(_0x461263=0x0,_0x2cdc9e=_0x3e4e3b[_0x8f389b(0x1b5)];_0x461263<_0x2cdc9e;_0x461263++)if(_0xf40849=_0x3e4e3b[_0x461263],!(_0xb334be&&_0x3e37e1[_0x8f389b(0x1c0)](_0xf40849[_0x8f389b(0x17d)]()))&&!this[_0x8f389b(0x168)](_0x355719,_0xf40849,_0x11690b)&&!_0x1d475d[_0x8f389b(0x243)+_0xf40849[_0x8f389b(0x17d)]()]){if(_0x3c14da++,_0x11690b[_0x8f389b(0x181)]++,_0x3c14da>_0x56475e){_0x5c833e=!0x0;break;}if(!_0x11690b[_0x8f389b(0x1b4)]&&_0x11690b[_0x8f389b(0x206)]&&_0x11690b[_0x8f389b(0x181)]>_0x11690b[_0x8f389b(0x1e3)]){_0x5c833e=!0x0;break;}_0x2c89d6[_0x8f389b(0x15f)](_0x552ebb[_0x8f389b(0x1cb)](_0x436656,_0x1d475d,_0x355719,_0xfddba0,_0xf40849,_0x11690b));}}}}}if(_0x3b41ea[_0x8f389b(0x1af)]=_0xfddba0,_0x55388d?(_0x3b41ea[_0x8f389b(0x22b)]=_0x355719[_0x8f389b(0x19d)](),this[_0x8f389b(0x20b)](_0xfddba0,_0x3b41ea,_0x11690b,_0x5dcf20)):_0xfddba0===_0x8f389b(0x17e)?_0x3b41ea[_0x8f389b(0x22b)]=this[_0x8f389b(0x18e)]['call'](_0x355719):_0xfddba0===_0x8f389b(0x17c)?_0x3b41ea[_0x8f389b(0x22b)]=_0x355719['toString']():_0xfddba0===_0x8f389b(0x1c9)?_0x3b41ea[_0x8f389b(0x22b)]=this[_0x8f389b(0x179)]['call'](_0x355719):_0xfddba0===_0x8f389b(0x205)&&this[_0x8f389b(0x22e)]?_0x3b41ea['value']=this[_0x8f389b(0x22e)][_0x8f389b(0x217)][_0x8f389b(0x17d)][_0x8f389b(0x174)](_0x355719):!_0x11690b[_0x8f389b(0x247)]&&!(_0xfddba0===_0x8f389b(0x1e8)||_0xfddba0==='undefined')&&(delete _0x3b41ea[_0x8f389b(0x22b)],_0x3b41ea[_0x8f389b(0x215)]=!0x0),_0x5c833e&&(_0x3b41ea['cappedProps']=!0x0),_0x1dfe61=_0x11690b[_0x8f389b(0x229)][_0x8f389b(0x1a1)],_0x11690b[_0x8f389b(0x229)][_0x8f389b(0x1a1)]=_0x3b41ea,this[_0x8f389b(0x195)](_0x3b41ea,_0x11690b),_0x2c89d6[_0x8f389b(0x1b5)]){for(_0x461263=0x0,_0x2cdc9e=_0x2c89d6['length'];_0x461263<_0x2cdc9e;_0x461263++)_0x2c89d6[_0x461263](_0x461263);}_0x436656[_0x8f389b(0x1b5)]&&(_0x3b41ea[_0x8f389b(0x1f9)]=_0x436656);}catch(_0x23ea81){_0x4900e1(_0x23ea81,_0x3b41ea,_0x11690b);}return this['_additionalMetadata'](_0x355719,_0x3b41ea),this['_treeNodePropertiesAfterFullValue'](_0x3b41ea,_0x11690b),_0x11690b[_0x8f389b(0x229)][_0x8f389b(0x1a1)]=_0x1dfe61,_0x11690b[_0x8f389b(0x197)]--,_0x11690b[_0x8f389b(0x206)]=_0x236687,_0x11690b[_0x8f389b(0x206)]&&_0x11690b[_0x8f389b(0x20f)][_0x8f389b(0x172)](),_0x3b41ea;}[_0x47a0b2(0x1a5)](_0x1df297){return Object['getOwnPropertySymbols']?Object['getOwnPropertySymbols'](_0x1df297):[];}[_0x47a0b2(0x1dc)](_0xe328fa){var _0xc71172=_0x47a0b2;return!!(_0xe328fa&&_0x55706b['Set']&&this[_0xc71172(0x164)](_0xe328fa)===_0xc71172(0x1d3)&&_0xe328fa[_0xc71172(0x1e6)]);}['_blacklistedProperty'](_0x27c689,_0x49a238,_0x3a7a1c){var _0x47e669=_0x47a0b2;return _0x3a7a1c[_0x47e669(0x1e7)]?typeof _0x27c689[_0x49a238]==_0x47e669(0x182):!0x1;}[_0x47a0b2(0x169)](_0x28a592){var _0x47f751=_0x47a0b2,_0x180e49='';return _0x180e49=typeof _0x28a592,_0x180e49===_0x47f751(0x162)?this[_0x47f751(0x164)](_0x28a592)===_0x47f751(0x15d)?_0x180e49=_0x47f751(0x1b0):this[_0x47f751(0x164)](_0x28a592)===_0x47f751(0x1ea)?_0x180e49=_0x47f751(0x17e):this[_0x47f751(0x164)](_0x28a592)===_0x47f751(0x15a)?_0x180e49=_0x47f751(0x17c):_0x28a592===null?_0x180e49=_0x47f751(0x1e8):_0x28a592['constructor']&&(_0x180e49=_0x28a592[_0x47f751(0x18d)][_0x47f751(0x23d)]||_0x180e49):_0x180e49==='undefined'&&this[_0x47f751(0x15e)]&&_0x28a592 instanceof this[_0x47f751(0x15e)]&&(_0x180e49=_0x47f751(0x244)),_0x180e49;}[_0x47a0b2(0x164)](_0x2fcd7b){var _0x1fcd42=_0x47a0b2;return Object[_0x1fcd42(0x217)][_0x1fcd42(0x17d)][_0x1fcd42(0x174)](_0x2fcd7b);}['_isPrimitiveType'](_0x44e5b5){var _0x556962=_0x47a0b2;return _0x44e5b5==='boolean'||_0x44e5b5===_0x556962(0x23a)||_0x44e5b5===_0x556962(0x1f3);}[_0x47a0b2(0x19f)](_0x25dc08){var _0x1b66e9=_0x47a0b2;return _0x25dc08===_0x1b66e9(0x1ce)||_0x25dc08===_0x1b66e9(0x22f)||_0x25dc08===_0x1b66e9(0x187);}[_0x47a0b2(0x1b3)](_0x133410,_0xe3d199,_0x36eaca,_0x3ae903,_0x310148,_0xd2268){var _0xceeda1=this;return function(_0x39264e){var _0x3380ba=_0x5d6a,_0x9875f4=_0x310148['node'][_0x3380ba(0x1a1)],_0x104af8=_0x310148[_0x3380ba(0x229)][_0x3380ba(0x1d8)],_0x2f412a=_0x310148['node'][_0x3380ba(0x223)];_0x310148[_0x3380ba(0x229)][_0x3380ba(0x223)]=_0x9875f4,_0x310148[_0x3380ba(0x229)][_0x3380ba(0x1d8)]=typeof _0x3ae903==_0x3380ba(0x1f3)?_0x3ae903:_0x39264e,_0x133410[_0x3380ba(0x15f)](_0xceeda1['_property'](_0xe3d199,_0x36eaca,_0x3ae903,_0x310148,_0xd2268)),_0x310148[_0x3380ba(0x229)]['parent']=_0x2f412a,_0x310148[_0x3380ba(0x229)]['index']=_0x104af8;};}[_0x47a0b2(0x1cb)](_0x5d3084,_0x541edd,_0x57c233,_0xebce12,_0x414960,_0x375230,_0x53d46b){var _0x19d958=_0x47a0b2,_0x13f36a=this;return _0x541edd[_0x19d958(0x243)+_0x414960['toString']()]=!0x0,function(_0x1335af){var _0x4470b3=_0x19d958,_0x7413fe=_0x375230['node'][_0x4470b3(0x1a1)],_0x354496=_0x375230[_0x4470b3(0x229)][_0x4470b3(0x1d8)],_0x4c2dcb=_0x375230[_0x4470b3(0x229)][_0x4470b3(0x223)];_0x375230[_0x4470b3(0x229)][_0x4470b3(0x223)]=_0x7413fe,_0x375230['node'][_0x4470b3(0x1d8)]=_0x1335af,_0x5d3084[_0x4470b3(0x15f)](_0x13f36a[_0x4470b3(0x18a)](_0x57c233,_0xebce12,_0x414960,_0x375230,_0x53d46b)),_0x375230[_0x4470b3(0x229)][_0x4470b3(0x223)]=_0x4c2dcb,_0x375230[_0x4470b3(0x229)][_0x4470b3(0x1d8)]=_0x354496;};}[_0x47a0b2(0x18a)](_0x2637e2,_0x414106,_0x2368f3,_0x3dd70e,_0xb04b6f){var _0x2c00c8=_0x47a0b2,_0x1619e5=this;_0xb04b6f||(_0xb04b6f=function(_0x26680a,_0x1e7dd1){return _0x26680a[_0x1e7dd1];});var _0xa76935=_0x2368f3[_0x2c00c8(0x17d)](),_0x4452e9=_0x3dd70e['expressionsToEvaluate']||{},_0x128e56=_0x3dd70e[_0x2c00c8(0x247)],_0x367daf=_0x3dd70e['isExpressionToEvaluate'];try{var _0x32b3c4=this[_0x2c00c8(0x1bb)](_0x2637e2),_0x3f3022=_0xa76935;_0x32b3c4&&_0x3f3022[0x0]==='\\x27'&&(_0x3f3022=_0x3f3022[_0x2c00c8(0x1c7)](0x1,_0x3f3022['length']-0x2));var _0x3fe7ed=_0x3dd70e[_0x2c00c8(0x1ac)]=_0x4452e9[_0x2c00c8(0x243)+_0x3f3022];_0x3fe7ed&&(_0x3dd70e['depth']=_0x3dd70e[_0x2c00c8(0x247)]+0x1),_0x3dd70e[_0x2c00c8(0x1b4)]=!!_0x3fe7ed;var _0x50e270=typeof _0x2368f3==_0x2c00c8(0x205),_0x2570fd={'name':_0x50e270||_0x32b3c4?_0xa76935:this[_0x2c00c8(0x19a)](_0xa76935)};if(_0x50e270&&(_0x2570fd['symbol']=!0x0),!(_0x414106===_0x2c00c8(0x1b0)||_0x414106===_0x2c00c8(0x17f))){var _0x5d0ca8=this[_0x2c00c8(0x194)](_0x2637e2,_0x2368f3);if(_0x5d0ca8&&(_0x5d0ca8[_0x2c00c8(0x1f4)]&&(_0x2570fd[_0x2c00c8(0x1d2)]=!0x0),_0x5d0ca8[_0x2c00c8(0x220)]&&!_0x3fe7ed&&!_0x3dd70e[_0x2c00c8(0x21a)]))return _0x2570fd[_0x2c00c8(0x1d9)]=!0x0,this[_0x2c00c8(0x1ef)](_0x2570fd,_0x3dd70e),_0x2570fd;}var _0x23501f;try{_0x23501f=_0xb04b6f(_0x2637e2,_0x2368f3);}catch(_0x58a116){return _0x2570fd={'name':_0xa76935,'type':_0x2c00c8(0x1cf),'error':_0x58a116['message']},this[_0x2c00c8(0x1ef)](_0x2570fd,_0x3dd70e),_0x2570fd;}var _0x25e7bd=this[_0x2c00c8(0x169)](_0x23501f),_0x4d1b0a=this[_0x2c00c8(0x23b)](_0x25e7bd);if(_0x2570fd[_0x2c00c8(0x1af)]=_0x25e7bd,_0x4d1b0a)this[_0x2c00c8(0x1ef)](_0x2570fd,_0x3dd70e,_0x23501f,function(){var _0x471d69=_0x2c00c8;_0x2570fd['value']=_0x23501f['valueOf'](),!_0x3fe7ed&&_0x1619e5[_0x471d69(0x20b)](_0x25e7bd,_0x2570fd,_0x3dd70e,{});});else{var _0x590ad9=_0x3dd70e[_0x2c00c8(0x206)]&&_0x3dd70e[_0x2c00c8(0x197)]<_0x3dd70e[_0x2c00c8(0x1a2)]&&_0x3dd70e['autoExpandPreviousObjects'][_0x2c00c8(0x160)](_0x23501f)<0x0&&_0x25e7bd!=='function'&&_0x3dd70e[_0x2c00c8(0x181)]<_0x3dd70e[_0x2c00c8(0x1e3)];_0x590ad9||_0x3dd70e[_0x2c00c8(0x197)]<_0x128e56||_0x3fe7ed?(this['serialize'](_0x2570fd,_0x23501f,_0x3dd70e,_0x3fe7ed||{}),this[_0x2c00c8(0x1c8)](_0x23501f,_0x2570fd)):this[_0x2c00c8(0x1ef)](_0x2570fd,_0x3dd70e,_0x23501f,function(){var _0x1e4055=_0x2c00c8;_0x25e7bd===_0x1e4055(0x1e8)||_0x25e7bd===_0x1e4055(0x241)||(delete _0x2570fd[_0x1e4055(0x22b)],_0x2570fd['capped']=!0x0);});}return _0x2570fd;}finally{_0x3dd70e[_0x2c00c8(0x1ac)]=_0x4452e9,_0x3dd70e[_0x2c00c8(0x247)]=_0x128e56,_0x3dd70e[_0x2c00c8(0x1b4)]=_0x367daf;}}[_0x47a0b2(0x20b)](_0x4e451c,_0x23df6f,_0x406341,_0x39492b){var _0x1f7aa3=_0x47a0b2,_0x149066=_0x39492b[_0x1f7aa3(0x204)]||_0x406341[_0x1f7aa3(0x204)];if((_0x4e451c===_0x1f7aa3(0x23a)||_0x4e451c===_0x1f7aa3(0x22f))&&_0x23df6f['value']){let _0x7e7895=_0x23df6f[_0x1f7aa3(0x22b)][_0x1f7aa3(0x1b5)];_0x406341[_0x1f7aa3(0x1e1)]+=_0x7e7895,_0x406341['allStrLength']>_0x406341[_0x1f7aa3(0x166)]?(_0x23df6f[_0x1f7aa3(0x215)]='',delete _0x23df6f[_0x1f7aa3(0x22b)]):_0x7e7895>_0x149066&&(_0x23df6f[_0x1f7aa3(0x215)]=_0x23df6f[_0x1f7aa3(0x22b)][_0x1f7aa3(0x1c7)](0x0,_0x149066),delete _0x23df6f[_0x1f7aa3(0x22b)]);}}[_0x47a0b2(0x1bb)](_0x23cdcc){var _0x256062=_0x47a0b2;return!!(_0x23cdcc&&_0x55706b[_0x256062(0x193)]&&this[_0x256062(0x164)](_0x23cdcc)===_0x256062(0x1bf)&&_0x23cdcc[_0x256062(0x1e6)]);}[_0x47a0b2(0x19a)](_0x3c2079){var _0x246e5f=_0x47a0b2;if(_0x3c2079[_0x246e5f(0x188)](/^\\d+$/))return _0x3c2079;var _0x9c3b7c;try{_0x9c3b7c=JSON[_0x246e5f(0x23f)](''+_0x3c2079);}catch{_0x9c3b7c='\\x22'+this['_objectToString'](_0x3c2079)+'\\x22';}return _0x9c3b7c[_0x246e5f(0x188)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x9c3b7c=_0x9c3b7c[_0x246e5f(0x1c7)](0x1,_0x9c3b7c[_0x246e5f(0x1b5)]-0x2):_0x9c3b7c=_0x9c3b7c['replace'](/'/g,'\\x5c\\x27')[_0x246e5f(0x1e9)](/\\\\\"/g,'\\x22')[_0x246e5f(0x1e9)](/(^\"|\"$)/g,'\\x27'),_0x9c3b7c;}[_0x47a0b2(0x1ef)](_0x35bd33,_0x4d9463,_0x3fc71f,_0xddd4eb){var _0x4e6cde=_0x47a0b2;this[_0x4e6cde(0x195)](_0x35bd33,_0x4d9463),_0xddd4eb&&_0xddd4eb(),this[_0x4e6cde(0x1c8)](_0x3fc71f,_0x35bd33),this['_treeNodePropertiesAfterFullValue'](_0x35bd33,_0x4d9463);}[_0x47a0b2(0x195)](_0x4ac2ef,_0x590213){var _0x43b32a=_0x47a0b2;this[_0x43b32a(0x20d)](_0x4ac2ef,_0x590213),this[_0x43b32a(0x202)](_0x4ac2ef,_0x590213),this['_setNodeExpressionPath'](_0x4ac2ef,_0x590213),this[_0x43b32a(0x1fb)](_0x4ac2ef,_0x590213);}[_0x47a0b2(0x20d)](_0x44e2cf,_0x75d4fd){}[_0x47a0b2(0x202)](_0x205d60,_0x3b6509){}[_0x47a0b2(0x1e5)](_0x3ff3ad,_0x22b8f8){}[_0x47a0b2(0x196)](_0x36cbf9){var _0x95bfd2=_0x47a0b2;return _0x36cbf9===this[_0x95bfd2(0x24b)];}['_treeNodePropertiesAfterFullValue'](_0x5468d3,_0x5a6192){var _0x4d99f6=_0x47a0b2;this[_0x4d99f6(0x1e5)](_0x5468d3,_0x5a6192),this[_0x4d99f6(0x242)](_0x5468d3),_0x5a6192[_0x4d99f6(0x1ad)]&&this[_0x4d99f6(0x1f2)](_0x5468d3),this[_0x4d99f6(0x1a6)](_0x5468d3,_0x5a6192),this[_0x4d99f6(0x222)](_0x5468d3,_0x5a6192),this[_0x4d99f6(0x211)](_0x5468d3);}[_0x47a0b2(0x1c8)](_0x31bef7,_0xca3dfa){var _0x4bb0cb=_0x47a0b2;let _0x38ab33;try{_0x55706b['console']&&(_0x38ab33=_0x55706b[_0x4bb0cb(0x1ae)][_0x4bb0cb(0x1bd)],_0x55706b[_0x4bb0cb(0x1ae)][_0x4bb0cb(0x1bd)]=function(){}),_0x31bef7&&typeof _0x31bef7[_0x4bb0cb(0x1b5)]==_0x4bb0cb(0x1f3)&&(_0xca3dfa[_0x4bb0cb(0x1b5)]=_0x31bef7[_0x4bb0cb(0x1b5)]);}catch{}finally{_0x38ab33&&(_0x55706b[_0x4bb0cb(0x1ae)][_0x4bb0cb(0x1bd)]=_0x38ab33);}if(_0xca3dfa[_0x4bb0cb(0x1af)]===_0x4bb0cb(0x1f3)||_0xca3dfa[_0x4bb0cb(0x1af)]===_0x4bb0cb(0x187)){if(isNaN(_0xca3dfa[_0x4bb0cb(0x22b)]))_0xca3dfa[_0x4bb0cb(0x198)]=!0x0,delete _0xca3dfa['value'];else switch(_0xca3dfa['value']){case Number[_0x4bb0cb(0x1a9)]:_0xca3dfa['positiveInfinity']=!0x0,delete _0xca3dfa[_0x4bb0cb(0x22b)];break;case Number['NEGATIVE_INFINITY']:_0xca3dfa['negativeInfinity']=!0x0,delete _0xca3dfa[_0x4bb0cb(0x22b)];break;case 0x0:this[_0x4bb0cb(0x1f8)](_0xca3dfa[_0x4bb0cb(0x22b)])&&(_0xca3dfa[_0x4bb0cb(0x201)]=!0x0);break;}}else _0xca3dfa[_0x4bb0cb(0x1af)]===_0x4bb0cb(0x182)&&typeof _0x31bef7[_0x4bb0cb(0x23d)]=='string'&&_0x31bef7[_0x4bb0cb(0x23d)]&&_0xca3dfa[_0x4bb0cb(0x23d)]&&_0x31bef7[_0x4bb0cb(0x23d)]!==_0xca3dfa[_0x4bb0cb(0x23d)]&&(_0xca3dfa[_0x4bb0cb(0x1f7)]=_0x31bef7[_0x4bb0cb(0x23d)]);}[_0x47a0b2(0x1f8)](_0x53e7ab){return 0x1/_0x53e7ab===Number['NEGATIVE_INFINITY'];}[_0x47a0b2(0x1f2)](_0xc0b002){var _0xedc6a3=_0x47a0b2;!_0xc0b002['props']||!_0xc0b002[_0xedc6a3(0x1f9)]['length']||_0xc0b002[_0xedc6a3(0x1af)]===_0xedc6a3(0x1b0)||_0xc0b002[_0xedc6a3(0x1af)]===_0xedc6a3(0x193)||_0xc0b002[_0xedc6a3(0x1af)]===_0xedc6a3(0x165)||_0xc0b002[_0xedc6a3(0x1f9)]['sort'](function(_0x1708fa,_0x5f500b){var _0x160fb6=_0xedc6a3,_0x47c3f7=_0x1708fa['name'][_0x160fb6(0x1ee)](),_0x3eba78=_0x5f500b['name'][_0x160fb6(0x1ee)]();return _0x47c3f7<_0x3eba78?-0x1:_0x47c3f7>_0x3eba78?0x1:0x0;});}['_addFunctionsNode'](_0x38ed93,_0xc52bd8){var _0x5f5c32=_0x47a0b2;if(!(_0xc52bd8['noFunctions']||!_0x38ed93[_0x5f5c32(0x1f9)]||!_0x38ed93[_0x5f5c32(0x1f9)]['length'])){for(var _0x1f842a=[],_0x3c42af=[],_0x2f2dcf=0x0,_0x429b2c=_0x38ed93[_0x5f5c32(0x1f9)][_0x5f5c32(0x1b5)];_0x2f2dcf<_0x429b2c;_0x2f2dcf++){var _0x39c475=_0x38ed93[_0x5f5c32(0x1f9)][_0x2f2dcf];_0x39c475[_0x5f5c32(0x1af)]===_0x5f5c32(0x182)?_0x1f842a[_0x5f5c32(0x15f)](_0x39c475):_0x3c42af[_0x5f5c32(0x15f)](_0x39c475);}if(!(!_0x3c42af[_0x5f5c32(0x1b5)]||_0x1f842a[_0x5f5c32(0x1b5)]<=0x1)){_0x38ed93[_0x5f5c32(0x1f9)]=_0x3c42af;var _0x28a189={'functionsNode':!0x0,'props':_0x1f842a};this[_0x5f5c32(0x20d)](_0x28a189,_0xc52bd8),this[_0x5f5c32(0x1e5)](_0x28a189,_0xc52bd8),this[_0x5f5c32(0x242)](_0x28a189),this[_0x5f5c32(0x1fb)](_0x28a189,_0xc52bd8),_0x28a189['id']+='\\x20f',_0x38ed93['props'][_0x5f5c32(0x17a)](_0x28a189);}}}[_0x47a0b2(0x222)](_0x36de79,_0x4554f4){}[_0x47a0b2(0x242)](_0x48af8c){}[_0x47a0b2(0x16b)](_0x4d8ed5){var _0x2f5c0b=_0x47a0b2;return Array[_0x2f5c0b(0x1fa)](_0x4d8ed5)||typeof _0x4d8ed5=='object'&&this['_objectToString'](_0x4d8ed5)==='[object\\x20Array]';}['_setNodePermissions'](_0x2e6424,_0x2e0467){}['_cleanNode'](_0x5ec349){var _0x315d63=_0x47a0b2;delete _0x5ec349[_0x315d63(0x232)],delete _0x5ec349['_hasSetOnItsPath'],delete _0x5ec349[_0x315d63(0x1d6)];}[_0x47a0b2(0x1bc)](_0x5d5654,_0x3e7605){}}let _0x23fb49=new _0x579afe(),_0x3870df={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x293e67={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x1da4fa(_0x6c245c,_0x8223f4,_0x41c6d3,_0xe75f6f,_0x5212d1,_0x4f3ab2){var _0x4b6b36=_0x47a0b2;let _0x5b0918,_0x5104a5;try{_0x5104a5=_0x2c2b75(),_0x5b0918=_0x3c5897[_0x8223f4],!_0x5b0918||_0x5104a5-_0x5b0918['ts']>0x1f4&&_0x5b0918['count']&&_0x5b0918['time']/_0x5b0918['count']<0x64?(_0x3c5897[_0x8223f4]=_0x5b0918={'count':0x0,'time':0x0,'ts':_0x5104a5},_0x3c5897[_0x4b6b36(0x175)]={}):_0x5104a5-_0x3c5897[_0x4b6b36(0x175)]['ts']>0x32&&_0x3c5897['hits'][_0x4b6b36(0x1d0)]&&_0x3c5897[_0x4b6b36(0x175)][_0x4b6b36(0x170)]/_0x3c5897[_0x4b6b36(0x175)]['count']<0x64&&(_0x3c5897[_0x4b6b36(0x175)]={});let _0x34cbe3=[],_0x406a4a=_0x5b0918[_0x4b6b36(0x210)]||_0x3c5897[_0x4b6b36(0x175)][_0x4b6b36(0x210)]?_0x293e67:_0x3870df,_0x42f538=_0x2ab881=>{var _0x20601f=_0x4b6b36;let _0x5d8074={};return _0x5d8074[_0x20601f(0x1f9)]=_0x2ab881[_0x20601f(0x1f9)],_0x5d8074[_0x20601f(0x1ba)]=_0x2ab881[_0x20601f(0x1ba)],_0x5d8074['strLength']=_0x2ab881[_0x20601f(0x204)],_0x5d8074[_0x20601f(0x166)]=_0x2ab881[_0x20601f(0x166)],_0x5d8074[_0x20601f(0x1e3)]=_0x2ab881['autoExpandLimit'],_0x5d8074[_0x20601f(0x1a2)]=_0x2ab881[_0x20601f(0x1a2)],_0x5d8074[_0x20601f(0x1ad)]=!0x1,_0x5d8074[_0x20601f(0x1e7)]=!_0x1c78da,_0x5d8074[_0x20601f(0x247)]=0x1,_0x5d8074[_0x20601f(0x197)]=0x0,_0x5d8074['expId']=_0x20601f(0x180),_0x5d8074['rootExpression']=_0x20601f(0x213),_0x5d8074['autoExpand']=!0x0,_0x5d8074[_0x20601f(0x20f)]=[],_0x5d8074[_0x20601f(0x181)]=0x0,_0x5d8074[_0x20601f(0x21a)]=!0x0,_0x5d8074[_0x20601f(0x1e1)]=0x0,_0x5d8074[_0x20601f(0x229)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x5d8074;};for(var _0x3df8ae=0x0;_0x3df8ae<_0x5212d1[_0x4b6b36(0x1b5)];_0x3df8ae++)_0x34cbe3[_0x4b6b36(0x15f)](_0x23fb49[_0x4b6b36(0x238)]({'timeNode':_0x6c245c===_0x4b6b36(0x170)||void 0x0},_0x5212d1[_0x3df8ae],_0x42f538(_0x406a4a),{}));if(_0x6c245c==='trace'){let _0x38d794=Error[_0x4b6b36(0x20a)];try{Error['stackTraceLimit']=0x1/0x0,_0x34cbe3[_0x4b6b36(0x15f)](_0x23fb49[_0x4b6b36(0x238)]({'stackNode':!0x0},new Error()['stack'],_0x42f538(_0x406a4a),{'strLength':0x1/0x0}));}finally{Error[_0x4b6b36(0x20a)]=_0x38d794;}}return{'method':'log','version':_0x4aacad,'args':[{'ts':_0x41c6d3,'session':_0xe75f6f,'args':_0x34cbe3,'id':_0x8223f4,'context':_0x4f3ab2}]};}catch(_0x7fb702){return{'method':'log','version':_0x4aacad,'args':[{'ts':_0x41c6d3,'session':_0xe75f6f,'args':[{'type':_0x4b6b36(0x1cf),'error':_0x7fb702&&_0x7fb702[_0x4b6b36(0x20e)]}],'id':_0x8223f4,'context':_0x4f3ab2}]};}finally{try{if(_0x5b0918&&_0x5104a5){let _0x65e00f=_0x2c2b75();_0x5b0918[_0x4b6b36(0x1d0)]++,_0x5b0918[_0x4b6b36(0x170)]+=_0x4490a8(_0x5104a5,_0x65e00f),_0x5b0918['ts']=_0x65e00f,_0x3c5897['hits']['count']++,_0x3c5897['hits'][_0x4b6b36(0x170)]+=_0x4490a8(_0x5104a5,_0x65e00f),_0x3c5897[_0x4b6b36(0x175)]['ts']=_0x65e00f,(_0x5b0918[_0x4b6b36(0x1d0)]>0x32||_0x5b0918[_0x4b6b36(0x170)]>0x64)&&(_0x5b0918[_0x4b6b36(0x210)]=!0x0),(_0x3c5897[_0x4b6b36(0x175)]['count']>0x3e8||_0x3c5897[_0x4b6b36(0x175)][_0x4b6b36(0x170)]>0x12c)&&(_0x3c5897[_0x4b6b36(0x175)][_0x4b6b36(0x210)]=!0x0);}}catch{}}}return _0x1da4fa;}((_0x3be010,_0x1c6083,_0x1c7318,_0x4acc8b,_0x4a0935,_0x44dd85,_0x2fc444,_0x9060b8,_0x49911f,_0x462ba4,_0x3b3d5c)=>{var _0x11fbd2=_0x29ef0d;if(_0x3be010[_0x11fbd2(0x1aa)])return _0x3be010['_console_ninja'];if(!X(_0x3be010,_0x9060b8,_0x4a0935))return _0x3be010[_0x11fbd2(0x1aa)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x3be010[_0x11fbd2(0x1aa)];let _0x50a784=b(_0x3be010),_0x40f429=_0x50a784[_0x11fbd2(0x167)],_0x36b757=_0x50a784[_0x11fbd2(0x186)],_0x43295d=_0x50a784['now'],_0x25708c={'hits':{},'ts':{}},_0x2b9c69=H(_0x3be010,_0x49911f,_0x25708c,_0x44dd85),_0x1c8945=_0x2a3a63=>{_0x25708c['ts'][_0x2a3a63]=_0x36b757();},_0x22f50a=(_0x5ddb14,_0x238007)=>{var _0x54cf06=_0x11fbd2;let _0x5a1ef7=_0x25708c['ts'][_0x238007];if(delete _0x25708c['ts'][_0x238007],_0x5a1ef7){let _0x109dbe=_0x40f429(_0x5a1ef7,_0x36b757());_0x4be584(_0x2b9c69(_0x54cf06(0x170),_0x5ddb14,_0x43295d(),_0x34c91e,[_0x109dbe],_0x238007));}},_0x385606=_0x3b7983=>{var _0x4105cb=_0x11fbd2,_0x927eed;return _0x4a0935===_0x4105cb(0x245)&&_0x3be010[_0x4105cb(0x240)]&&((_0x927eed=_0x3b7983==null?void 0x0:_0x3b7983['args'])==null?void 0x0:_0x927eed[_0x4105cb(0x1b5)])&&(_0x3b7983[_0x4105cb(0x18b)][0x0][_0x4105cb(0x240)]=_0x3be010[_0x4105cb(0x240)]),_0x3b7983;};_0x3be010[_0x11fbd2(0x1aa)]={'consoleLog':(_0x2aa544,_0x2ff27a)=>{var _0x2a9c07=_0x11fbd2;_0x3be010[_0x2a9c07(0x1ae)][_0x2a9c07(0x1a8)]['name']!==_0x2a9c07(0x207)&&_0x4be584(_0x2b9c69(_0x2a9c07(0x1a8),_0x2aa544,_0x43295d(),_0x34c91e,_0x2ff27a));},'consoleTrace':(_0x286a1f,_0x5cf0b5)=>{var _0x290f4c=_0x11fbd2;_0x3be010[_0x290f4c(0x1ae)][_0x290f4c(0x1a8)][_0x290f4c(0x23d)]!==_0x290f4c(0x227)&&_0x4be584(_0x385606(_0x2b9c69('trace',_0x286a1f,_0x43295d(),_0x34c91e,_0x5cf0b5)));},'consoleTime':_0x4f2cd8=>{_0x1c8945(_0x4f2cd8);},'consoleTimeEnd':(_0x16ebcf,_0x1ac98d)=>{_0x22f50a(_0x1ac98d,_0x16ebcf);},'autoLog':(_0x2fdc4b,_0x14c834)=>{var _0x3fd871=_0x11fbd2;_0x4be584(_0x2b9c69(_0x3fd871(0x1a8),_0x14c834,_0x43295d(),_0x34c91e,[_0x2fdc4b]));},'autoLogMany':(_0x51451c,_0x917f4e)=>{var _0x34e450=_0x11fbd2;_0x4be584(_0x2b9c69(_0x34e450(0x1a8),_0x51451c,_0x43295d(),_0x34c91e,_0x917f4e));},'autoTrace':(_0x1854e5,_0x464b23)=>{var _0x580941=_0x11fbd2;_0x4be584(_0x385606(_0x2b9c69(_0x580941(0x209),_0x464b23,_0x43295d(),_0x34c91e,[_0x1854e5])));},'autoTraceMany':(_0x1a33de,_0x14b400)=>{var _0x5134fb=_0x11fbd2;_0x4be584(_0x385606(_0x2b9c69(_0x5134fb(0x209),_0x1a33de,_0x43295d(),_0x34c91e,_0x14b400)));},'autoTime':(_0x47c325,_0x1c77d2,_0x5535e7)=>{_0x1c8945(_0x5535e7);},'autoTimeEnd':(_0x5b7f59,_0x3aad56,_0x31d876)=>{_0x22f50a(_0x3aad56,_0x31d876);},'coverage':_0x5b4371=>{var _0x56eed4=_0x11fbd2;_0x4be584({'method':_0x56eed4(0x184),'version':_0x44dd85,'args':[{'id':_0x5b4371}]});}};let _0x4be584=q(_0x3be010,_0x1c6083,_0x1c7318,_0x4acc8b,_0x4a0935,_0x462ba4,_0x3b3d5c),_0x34c91e=_0x3be010[_0x11fbd2(0x1fc)];return _0x3be010['_console_ninja'];})(globalThis,_0x29ef0d(0x1df),'9959',\"c:\\\\Users\\\\User\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.323\\\\node_modules\",'webpack','1.0.0',_0x29ef0d(0x16d),_0x29ef0d(0x225),_0x29ef0d(0x1ec),_0x29ef0d(0x1fd),_0x29ef0d(0x19c));");
  } catch (e) {}
}
; /* istanbul ignore next */
function oo_oo(i) {
  for (var _len = arguments.length, v = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    v[_key - 1] = arguments[_key];
  }
  try {
    oo_cm().consoleLog(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_tr(i) {
  for (var _len2 = arguments.length, v = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    v[_key2 - 1] = arguments[_key2];
  }
  try {
    oo_cm().consoleTrace(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_ts(v) {
  try {
    oo_cm().consoleTime(v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_te(v, i) {
  try {
    oo_cm().consoleTimeEnd(v, i);
  } catch (e) {}
  return v;
}
; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/

/***/ })

}]);
//# sourceMappingURL=resources_js_react_tasks_pages_Subtasks_jsx.js.map