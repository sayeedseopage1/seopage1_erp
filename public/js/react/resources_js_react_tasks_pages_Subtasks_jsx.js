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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x2e3452=_0x344f;function _0x3c9b(){var _0x3a2536=['current','3TYqXFb','_getOwnPropertyNames','Symbol','_setNodeId','time','prototype','noFunctions','703886XmrgHR','bind','constructor','replace','performance','catch','pathToFileURL','url','Number','_isUndefined','boolean','call','_socket','level','toString','gateway.docker.internal','enumerable','value','561082HMwFMK','_isMap','_webSocketErrorDocsLink','_property','','_addProperty','allStrLength','substr','symbol','reload','_p_','isArray','Error','hits','onerror','_console_ninja_session','dockerizedApp','undefined','autoExpand','https://tinyurl.com/37x8b79t','_numberRegExp','rootExpression','length','process','concat','disabledTrace','root_exp','next.js','127.0.0.1','reduceLimits','_WebSocket','getter','toLowerCase','capped','stackTraceLimit','env','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','setter','_reconnectTimeout','defineProperty','isExpressionToEvaluate','method','_connectAttemptCount','cappedProps',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'_p_name','1.0.0','9308430OzobzV','elements','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','_inBrowser','_undefined','_addObjectProperty','NEXT_RUNTIME','split','root_exp_id','timeStamp','56046IycCPa','trace','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','origin','_treeNodePropertiesBeforeFullValue','serialize','default','_connected','autoExpandPropertyCount','_keyStrRegExp','global','_isSet','_allowedToConnectOnSend','onclose','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','_hasMapOnItsPath','_console_ninja','negativeZero','_setNodeLabel','message','_HTMLAllCollection','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','astro','unknown','stringify','759LkybEj','type','sortProps','Buffer','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','date','nan','_setNodeExpressionPath','positiveInfinity','totalStrLength','getOwnPropertySymbols','_disposeWebsocket','parent','includes','index','location','edge','_sortProps','onopen','_sendErrorMessage','Set','valueOf','strLength','depth','test','autoExpandPreviousObjects','count','number','HTMLAllCollection','data','hasOwnProperty','cappedElements','match',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.308\\\\node_modules\",'elapsed','[object\\x20Array]','_maxConnectAttemptCount','_addLoadNode','nodeModules','ws://','resolveGetters','413yWtnvy','_Symbol','22808xoxSlF','versions','WebSocket','props','_additionalMetadata','get','_blacklistedProperty','args','_hasSymbolPropertyOnItsPath','log','_isNegativeZero','_getOwnPropertyDescriptor','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','sort','__es'+'Module','_WebSocketClass','_ws','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_type','now','join','_capIfString','_treeNodePropertiesAfterFullValue','coverage','expressionsToEvaluate','98052Kordix','_getOwnPropertySymbols','map','console','[object\\x20BigInt]','node','logger\\x20websocket\\x20error','_setNodeExpandableState','2223AHeEvU','_allowedToSend','name','nuxt','','[object\\x20Date]','then','Map','_isArray','hostname','warn','_connectToHostNow','close','getOwnPropertyDescriptor','autoExpandLimit','POSITIVE_INFINITY','_processTreeNodeResult','bigint','object','_setNodeQueryPath','_dateToString','toUpperCase','expId','forEach','_isPrimitiveType','readyState','string','set','host','356ldnEPg','49824','_cleanNode','getOwnPropertyNames','error','_connecting','push','function','hrtime','_propertyName','null','port','[object\\x20Set]','_consoleNinjaAllowedToStart','autoExpandMaxDepth','52810dMNwQp','unref','_inNextEdge','_attemptToReconnectShortly','array','_objectToString','send','String'];_0x3c9b=function(){return _0x3a2536;};return _0x3c9b();}(function(_0x4a7c11,_0x909c3){var _0xbd26fb=_0x344f,_0x34fee2=_0x4a7c11();while(!![]){try{var _0x5bde7e=parseInt(_0xbd26fb(0x1f9))/0x1+-parseInt(_0xbd26fb(0x1e7))/0x2*(-parseInt(_0xbd26fb(0x1e0))/0x3)+parseInt(_0xbd26fb(0x1c8))/0x4*(parseInt(_0xbd26fb(0x1d7))/0x5)+-parseInt(_0xbd26fb(0x232))/0x6*(parseInt(_0xbd26fb(0x274))/0x7)+-parseInt(_0xbd26fb(0x276))/0x8*(-parseInt(_0xbd26fb(0x1ab))/0x9)+-parseInt(_0xbd26fb(0x228))/0xa+-parseInt(_0xbd26fb(0x24b))/0xb*(parseInt(_0xbd26fb(0x1a3))/0xc);if(_0x5bde7e===_0x909c3)break;else _0x34fee2['push'](_0x34fee2['shift']());}catch(_0x5a5e3c){_0x34fee2['push'](_0x34fee2['shift']());}}}(_0x3c9b,0x7cdf7));function _0x344f(_0x3e2d71,_0x217049){var _0x3c9b26=_0x3c9b();return _0x344f=function(_0x344f6d,_0x25d537){_0x344f6d=_0x344f6d-0x19b;var _0x154d17=_0x3c9b26[_0x344f6d];return _0x154d17;},_0x344f(_0x3e2d71,_0x217049);}var K=Object['create'],V=Object[_0x2e3452(0x220)],G=Object[_0x2e3452(0x1b8)],ee=Object[_0x2e3452(0x1cb)],te=Object['getPrototypeOf'],ne=Object['prototype'][_0x2e3452(0x269)],re=(_0x59ef9d,_0x1b76db,_0x529eb0,_0xdf1f47)=>{var _0x53d78b=_0x2e3452;if(_0x1b76db&&typeof _0x1b76db=='object'||typeof _0x1b76db=='function'){for(let _0x293786 of ee(_0x1b76db))!ne[_0x53d78b(0x1f2)](_0x59ef9d,_0x293786)&&_0x293786!==_0x529eb0&&V(_0x59ef9d,_0x293786,{'get':()=>_0x1b76db[_0x293786],'enumerable':!(_0xdf1f47=G(_0x1b76db,_0x293786))||_0xdf1f47[_0x53d78b(0x1f7)]});}return _0x59ef9d;},H=(_0x47bcdf,_0x40a5a4,_0x1b4e07)=>(_0x1b4e07=_0x47bcdf!=null?K(te(_0x47bcdf)):{},re(_0x40a5a4||!_0x47bcdf||!_0x47bcdf[_0x2e3452(0x284)]?V(_0x1b4e07,_0x2e3452(0x238),{'value':_0x47bcdf,'enumerable':!0x0}):_0x1b4e07,_0x47bcdf)),q=class{constructor(_0x4db56b,_0x47af5e,_0x29efa5,_0x356740,_0xf12166){var _0x1eaa75=_0x2e3452;this['global']=_0x4db56b,this['host']=_0x47af5e,this[_0x1eaa75(0x1d3)]=_0x29efa5,this['nodeModules']=_0x356740,this[_0x1eaa75(0x209)]=_0xf12166,this[_0x1eaa75(0x1ac)]=!0x0,this[_0x1eaa75(0x23e)]=!0x0,this[_0x1eaa75(0x239)]=!0x1,this[_0x1eaa75(0x1cd)]=!0x1,this[_0x1eaa75(0x1d9)]=_0x4db56b['process']?.['env']?.['NEXT_RUNTIME']===_0x1eaa75(0x25b),this[_0x1eaa75(0x22b)]=!this[_0x1eaa75(0x23c)][_0x1eaa75(0x210)]?.[_0x1eaa75(0x277)]?.[_0x1eaa75(0x1a8)]&&!this[_0x1eaa75(0x1d9)],this[_0x1eaa75(0x285)]=null,this['_connectAttemptCount']=0x0,this['_maxConnectAttemptCount']=0x14,this[_0x1eaa75(0x1fb)]=_0x1eaa75(0x20c),this[_0x1eaa75(0x25e)]=(this['_inBrowser']?_0x1eaa75(0x234):_0x1eaa75(0x19b))+this[_0x1eaa75(0x1fb)];}async['getWebSocketClass'](){var _0x17a5d5=_0x2e3452;if(this[_0x17a5d5(0x285)])return this['_WebSocketClass'];let _0x37eef1;if(this[_0x17a5d5(0x22b)]||this[_0x17a5d5(0x1d9)])_0x37eef1=this[_0x17a5d5(0x23c)][_0x17a5d5(0x278)];else{if(this[_0x17a5d5(0x23c)]['process']?.[_0x17a5d5(0x217)])_0x37eef1=this[_0x17a5d5(0x23c)][_0x17a5d5(0x210)]?.['_WebSocket'];else try{let _0x2b1b81=await import('path');_0x37eef1=(await import((await import(_0x17a5d5(0x1ee)))[_0x17a5d5(0x1ed)](_0x2b1b81[_0x17a5d5(0x19e)](this['nodeModules'],'ws/index.js'))['toString']()))[_0x17a5d5(0x238)];}catch{try{_0x37eef1=require(require('path')[_0x17a5d5(0x19e)](this[_0x17a5d5(0x271)],'ws'));}catch{throw new Error(_0x17a5d5(0x247));}}}return this[_0x17a5d5(0x285)]=_0x37eef1,_0x37eef1;}[_0x2e3452(0x1b6)](){var _0x1b1efa=_0x2e3452;this[_0x1b1efa(0x1cd)]||this[_0x1b1efa(0x239)]||this[_0x1b1efa(0x223)]>=this[_0x1b1efa(0x26f)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x1b1efa(0x1cd)]=!0x0,this[_0x1b1efa(0x223)]++,this[_0x1b1efa(0x286)]=new Promise((_0x475f52,_0x47621b)=>{var _0xeced32=_0x1b1efa;this['getWebSocketClass']()[_0xeced32(0x1b1)](_0x323ff2=>{var _0x5c1c5a=_0xeced32;let _0x35905f=new _0x323ff2(_0x5c1c5a(0x272)+(!this[_0x5c1c5a(0x22b)]&&this['dockerizedApp']?_0x5c1c5a(0x1f6):this[_0x5c1c5a(0x1c7)])+':'+this['port']);_0x35905f[_0x5c1c5a(0x207)]=()=>{var _0x440467=_0x5c1c5a;this[_0x440467(0x1ac)]=!0x1,this[_0x440467(0x256)](_0x35905f),this[_0x440467(0x1da)](),_0x47621b(new Error(_0x440467(0x1a9)));},_0x35905f[_0x5c1c5a(0x25d)]=()=>{var _0xa873d8=_0x5c1c5a;this[_0xa873d8(0x22b)]||_0x35905f['_socket']&&_0x35905f['_socket']['unref']&&_0x35905f[_0xa873d8(0x1f3)][_0xa873d8(0x1d8)](),_0x475f52(_0x35905f);},_0x35905f[_0x5c1c5a(0x23f)]=()=>{var _0x4d6854=_0x5c1c5a;this[_0x4d6854(0x23e)]=!0x0,this['_disposeWebsocket'](_0x35905f),this[_0x4d6854(0x1da)]();},_0x35905f['onmessage']=_0x3e7a03=>{var _0x2ed189=_0x5c1c5a;try{_0x3e7a03&&_0x3e7a03[_0x2ed189(0x268)]&&this[_0x2ed189(0x22b)]&&JSON['parse'](_0x3e7a03[_0x2ed189(0x268)])[_0x2ed189(0x222)]===_0x2ed189(0x202)&&this['global'][_0x2ed189(0x25a)]['reload']();}catch{}};})[_0xeced32(0x1b1)](_0x178c60=>(this['_connected']=!0x0,this[_0xeced32(0x1cd)]=!0x1,this[_0xeced32(0x23e)]=!0x1,this[_0xeced32(0x1ac)]=!0x0,this[_0xeced32(0x223)]=0x0,_0x178c60))[_0xeced32(0x1ec)](_0x1ef5a5=>(this['_connected']=!0x1,this[_0xeced32(0x1cd)]=!0x1,console[_0xeced32(0x1b5)](_0xeced32(0x22a)+this['_webSocketErrorDocsLink']),_0x47621b(new Error(_0xeced32(0x24f)+(_0x1ef5a5&&_0x1ef5a5[_0xeced32(0x245)])))));}));}['_disposeWebsocket'](_0x57e5a1){var _0x169aae=_0x2e3452;this['_connected']=!0x1,this['_connecting']=!0x1;try{_0x57e5a1[_0x169aae(0x23f)]=null,_0x57e5a1[_0x169aae(0x207)]=null,_0x57e5a1[_0x169aae(0x25d)]=null;}catch{}try{_0x57e5a1[_0x169aae(0x1c4)]<0x2&&_0x57e5a1[_0x169aae(0x1b7)]();}catch{}}[_0x2e3452(0x1da)](){var _0x2e91aa=_0x2e3452;clearTimeout(this[_0x2e91aa(0x21f)]),!(this['_connectAttemptCount']>=this[_0x2e91aa(0x26f)])&&(this[_0x2e91aa(0x21f)]=setTimeout(()=>{var _0x7f225a=_0x2e91aa;this['_connected']||this[_0x7f225a(0x1cd)]||(this[_0x7f225a(0x1b6)](),this['_ws']?.[_0x7f225a(0x1ec)](()=>this[_0x7f225a(0x1da)]()));},0x1f4),this[_0x2e91aa(0x21f)][_0x2e91aa(0x1d8)]&&this[_0x2e91aa(0x21f)][_0x2e91aa(0x1d8)]());}async['send'](_0x11571e){var _0x20d27b=_0x2e3452;try{if(!this['_allowedToSend'])return;this[_0x20d27b(0x23e)]&&this[_0x20d27b(0x1b6)](),(await this[_0x20d27b(0x286)])[_0x20d27b(0x1dd)](JSON[_0x20d27b(0x24a)](_0x11571e));}catch(_0x352b4b){console['warn'](this[_0x20d27b(0x25e)]+':\\x20'+(_0x352b4b&&_0x352b4b[_0x20d27b(0x245)])),this[_0x20d27b(0x1ac)]=!0x1,this[_0x20d27b(0x1da)]();}}};function x(_0x282ebd,_0xe16a71,_0x3c5b01,_0x170aa1,_0x13b86b,_0x4f2820){var _0xc1563=_0x2e3452;let _0x4025cb=_0x3c5b01[_0xc1563(0x22f)](',')[_0xc1563(0x1a5)](_0x144026=>{var _0x4f4814=_0xc1563;try{if(!_0x282ebd['_console_ninja_session']){let _0x5d6e1f=_0x282ebd[_0x4f4814(0x210)]?.[_0x4f4814(0x277)]?.['node']||_0x282ebd[_0x4f4814(0x210)]?.[_0x4f4814(0x21c)]?.[_0x4f4814(0x22e)]===_0x4f4814(0x25b);(_0x13b86b===_0x4f4814(0x214)||_0x13b86b==='remix'||_0x13b86b===_0x4f4814(0x248)||_0x13b86b==='angular')&&(_0x13b86b+=_0x5d6e1f?'\\x20server':'\\x20browser'),_0x282ebd[_0x4f4814(0x208)]={'id':+new Date(),'tool':_0x13b86b},_0x13b86b&&!_0x5d6e1f&&console[_0x4f4814(0x27f)](_0x4f4814(0x282)+(_0x13b86b['charAt'](0x0)[_0x4f4814(0x1c0)]()+_0x13b86b[_0x4f4814(0x200)](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)',_0x4f4814(0x240));}let _0x3c83f7=new q(_0x282ebd,_0xe16a71,_0x144026,_0x170aa1,_0x4f2820);return _0x3c83f7['send'][_0x4f4814(0x1e8)](_0x3c83f7);}catch(_0x424573){return console[_0x4f4814(0x1b5)](_0x4f4814(0x21d),_0x424573&&_0x424573['message']),()=>{};}});return _0x22b427=>_0x4025cb[_0xc1563(0x1c2)](_0x4bd000=>_0x4bd000(_0x22b427));}function W(_0x4a8ea4){var _0x289811=_0x2e3452;let _0x2eda36=function(_0x2c9310,_0x3fd49e){return _0x3fd49e-_0x2c9310;},_0x4f718b;if(_0x4a8ea4['performance'])_0x4f718b=function(){var _0x571076=_0x344f;return _0x4a8ea4[_0x571076(0x1eb)][_0x571076(0x19d)]();};else{if(_0x4a8ea4['process']&&_0x4a8ea4[_0x289811(0x210)][_0x289811(0x1d0)]&&_0x4a8ea4[_0x289811(0x210)]?.['env']?.[_0x289811(0x22e)]!==_0x289811(0x25b))_0x4f718b=function(){var _0x41468b=_0x289811;return _0x4a8ea4['process'][_0x41468b(0x1d0)]();},_0x2eda36=function(_0x217b92,_0x531fbd){return 0x3e8*(_0x531fbd[0x0]-_0x217b92[0x0])+(_0x531fbd[0x1]-_0x217b92[0x1])/0xf4240;};else try{let {performance:_0x554ee3}=require('perf_hooks');_0x4f718b=function(){var _0x102d0c=_0x289811;return _0x554ee3[_0x102d0c(0x19d)]();};}catch{_0x4f718b=function(){return+new Date();};}}return{'elapsed':_0x2eda36,'timeStamp':_0x4f718b,'now':()=>Date['now']()};}function X(_0x270218,_0x1c38a6,_0x31f550){var _0x4324a0=_0x2e3452;if(_0x270218['_consoleNinjaAllowedToStart']!==void 0x0)return _0x270218[_0x4324a0(0x1d5)];let _0x42e4f7=_0x270218[_0x4324a0(0x210)]?.[_0x4324a0(0x277)]?.[_0x4324a0(0x1a8)]||_0x270218[_0x4324a0(0x210)]?.['env']?.[_0x4324a0(0x22e)]===_0x4324a0(0x25b);return _0x42e4f7&&_0x31f550===_0x4324a0(0x1ae)?_0x270218[_0x4324a0(0x1d5)]=!0x1:_0x270218[_0x4324a0(0x1d5)]=_0x42e4f7||!_0x1c38a6||_0x270218[_0x4324a0(0x25a)]?.['hostname']&&_0x1c38a6[_0x4324a0(0x258)](_0x270218[_0x4324a0(0x25a)][_0x4324a0(0x1b4)]),_0x270218['_consoleNinjaAllowedToStart'];}function J(_0x5cbe19,_0x5ef8be,_0x4f3a12,_0x28823a){var _0x25e4aa=_0x2e3452;_0x5cbe19=_0x5cbe19,_0x5ef8be=_0x5ef8be,_0x4f3a12=_0x4f3a12,_0x28823a=_0x28823a;let _0x194d6f=W(_0x5cbe19),_0x14bcbd=_0x194d6f[_0x25e4aa(0x26d)],_0x1a564f=_0x194d6f[_0x25e4aa(0x231)];class _0x4178d1{constructor(){var _0x990011=_0x25e4aa;this[_0x990011(0x23b)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x990011(0x20d)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x990011(0x22c)]=_0x5cbe19[_0x990011(0x20a)],this[_0x990011(0x246)]=_0x5cbe19[_0x990011(0x267)],this['_getOwnPropertyDescriptor']=Object[_0x990011(0x1b8)],this['_getOwnPropertyNames']=Object[_0x990011(0x1cb)],this['_Symbol']=_0x5cbe19[_0x990011(0x1e2)],this['_regExpToString']=RegExp['prototype'][_0x990011(0x1f5)],this[_0x990011(0x1bf)]=Date[_0x990011(0x1e5)]['toString'];}['serialize'](_0x12c162,_0x434c84,_0x3c16b4,_0x423ce4){var _0x281068=_0x25e4aa,_0x12effe=this,_0x3af224=_0x3c16b4['autoExpand'];function _0x1c325b(_0x542c7d,_0x15303f,_0x55d73e){var _0x3f283b=_0x344f;_0x15303f['type']=_0x3f283b(0x249),_0x15303f['error']=_0x542c7d[_0x3f283b(0x245)],_0x8716d4=_0x55d73e['node'][_0x3f283b(0x1df)],_0x55d73e[_0x3f283b(0x1a8)][_0x3f283b(0x1df)]=_0x15303f,_0x12effe['_treeNodePropertiesBeforeFullValue'](_0x15303f,_0x55d73e);}try{_0x3c16b4['level']++,_0x3c16b4[_0x281068(0x20b)]&&_0x3c16b4[_0x281068(0x264)][_0x281068(0x1ce)](_0x434c84);var _0x320d2c,_0x495b4b,_0x10e0d1,_0x91251b,_0x44f8d1=[],_0x3441b3=[],_0x4c9e16,_0x3cd885=this[_0x281068(0x19c)](_0x434c84),_0xc91792=_0x3cd885===_0x281068(0x1db),_0x52ff59=!0x1,_0x1c3037=_0x3cd885===_0x281068(0x1cf),_0x2cd677=this[_0x281068(0x1c3)](_0x3cd885),_0x55444d=this['_isPrimitiveWrapperType'](_0x3cd885),_0x255bc2=_0x2cd677||_0x55444d,_0x7380cf={},_0x44631a=0x0,_0xcffe6e=!0x1,_0x8716d4,_0x23825b=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x3c16b4[_0x281068(0x262)]){if(_0xc91792){if(_0x495b4b=_0x434c84[_0x281068(0x20f)],_0x495b4b>_0x3c16b4[_0x281068(0x229)]){for(_0x10e0d1=0x0,_0x91251b=_0x3c16b4[_0x281068(0x229)],_0x320d2c=_0x10e0d1;_0x320d2c<_0x91251b;_0x320d2c++)_0x3441b3['push'](_0x12effe[_0x281068(0x1fe)](_0x44f8d1,_0x434c84,_0x3cd885,_0x320d2c,_0x3c16b4));_0x12c162[_0x281068(0x26a)]=!0x0;}else{for(_0x10e0d1=0x0,_0x91251b=_0x495b4b,_0x320d2c=_0x10e0d1;_0x320d2c<_0x91251b;_0x320d2c++)_0x3441b3[_0x281068(0x1ce)](_0x12effe['_addProperty'](_0x44f8d1,_0x434c84,_0x3cd885,_0x320d2c,_0x3c16b4));}_0x3c16b4[_0x281068(0x23a)]+=_0x3441b3[_0x281068(0x20f)];}if(!(_0x3cd885==='null'||_0x3cd885==='undefined')&&!_0x2cd677&&_0x3cd885!==_0x281068(0x1de)&&_0x3cd885!==_0x281068(0x24e)&&_0x3cd885!==_0x281068(0x1bc)){var _0x4a4be1=_0x423ce4['props']||_0x3c16b4[_0x281068(0x279)];if(this[_0x281068(0x23d)](_0x434c84)?(_0x320d2c=0x0,_0x434c84[_0x281068(0x1c2)](function(_0x1fdddc){var _0x1222ba=_0x281068;if(_0x44631a++,_0x3c16b4[_0x1222ba(0x23a)]++,_0x44631a>_0x4a4be1){_0xcffe6e=!0x0;return;}if(!_0x3c16b4[_0x1222ba(0x221)]&&_0x3c16b4[_0x1222ba(0x20b)]&&_0x3c16b4[_0x1222ba(0x23a)]>_0x3c16b4[_0x1222ba(0x1b9)]){_0xcffe6e=!0x0;return;}_0x3441b3[_0x1222ba(0x1ce)](_0x12effe['_addProperty'](_0x44f8d1,_0x434c84,_0x1222ba(0x25f),_0x320d2c++,_0x3c16b4,function(_0x2c23a3){return function(){return _0x2c23a3;};}(_0x1fdddc)));})):this[_0x281068(0x1fa)](_0x434c84)&&_0x434c84[_0x281068(0x1c2)](function(_0x28eeab,_0x364bcb){var _0xf231f3=_0x281068;if(_0x44631a++,_0x3c16b4['autoExpandPropertyCount']++,_0x44631a>_0x4a4be1){_0xcffe6e=!0x0;return;}if(!_0x3c16b4[_0xf231f3(0x221)]&&_0x3c16b4[_0xf231f3(0x20b)]&&_0x3c16b4[_0xf231f3(0x23a)]>_0x3c16b4[_0xf231f3(0x1b9)]){_0xcffe6e=!0x0;return;}var _0x50c5bc=_0x364bcb[_0xf231f3(0x1f5)]();_0x50c5bc[_0xf231f3(0x20f)]>0x64&&(_0x50c5bc=_0x50c5bc['slice'](0x0,0x64)+'...'),_0x3441b3[_0xf231f3(0x1ce)](_0x12effe[_0xf231f3(0x1fe)](_0x44f8d1,_0x434c84,_0xf231f3(0x1b2),_0x50c5bc,_0x3c16b4,function(_0x4929fd){return function(){return _0x4929fd;};}(_0x28eeab)));}),!_0x52ff59){try{for(_0x4c9e16 in _0x434c84)if(!(_0xc91792&&_0x23825b[_0x281068(0x263)](_0x4c9e16))&&!this[_0x281068(0x27c)](_0x434c84,_0x4c9e16,_0x3c16b4)){if(_0x44631a++,_0x3c16b4[_0x281068(0x23a)]++,_0x44631a>_0x4a4be1){_0xcffe6e=!0x0;break;}if(!_0x3c16b4[_0x281068(0x221)]&&_0x3c16b4[_0x281068(0x20b)]&&_0x3c16b4[_0x281068(0x23a)]>_0x3c16b4['autoExpandLimit']){_0xcffe6e=!0x0;break;}_0x3441b3[_0x281068(0x1ce)](_0x12effe[_0x281068(0x22d)](_0x44f8d1,_0x7380cf,_0x434c84,_0x3cd885,_0x4c9e16,_0x3c16b4));}}catch{}if(_0x7380cf['_p_length']=!0x0,_0x1c3037&&(_0x7380cf[_0x281068(0x226)]=!0x0),!_0xcffe6e){var _0x48aaab=[][_0x281068(0x211)](this[_0x281068(0x1e1)](_0x434c84))[_0x281068(0x211)](this[_0x281068(0x1a4)](_0x434c84));for(_0x320d2c=0x0,_0x495b4b=_0x48aaab[_0x281068(0x20f)];_0x320d2c<_0x495b4b;_0x320d2c++)if(_0x4c9e16=_0x48aaab[_0x320d2c],!(_0xc91792&&_0x23825b[_0x281068(0x263)](_0x4c9e16[_0x281068(0x1f5)]()))&&!this[_0x281068(0x27c)](_0x434c84,_0x4c9e16,_0x3c16b4)&&!_0x7380cf[_0x281068(0x203)+_0x4c9e16[_0x281068(0x1f5)]()]){if(_0x44631a++,_0x3c16b4[_0x281068(0x23a)]++,_0x44631a>_0x4a4be1){_0xcffe6e=!0x0;break;}if(!_0x3c16b4[_0x281068(0x221)]&&_0x3c16b4['autoExpand']&&_0x3c16b4[_0x281068(0x23a)]>_0x3c16b4[_0x281068(0x1b9)]){_0xcffe6e=!0x0;break;}_0x3441b3[_0x281068(0x1ce)](_0x12effe['_addObjectProperty'](_0x44f8d1,_0x7380cf,_0x434c84,_0x3cd885,_0x4c9e16,_0x3c16b4));}}}}}if(_0x12c162[_0x281068(0x24c)]=_0x3cd885,_0x255bc2?(_0x12c162[_0x281068(0x1f8)]=_0x434c84[_0x281068(0x260)](),this[_0x281068(0x19f)](_0x3cd885,_0x12c162,_0x3c16b4,_0x423ce4)):_0x3cd885===_0x281068(0x250)?_0x12c162['value']=this[_0x281068(0x1bf)][_0x281068(0x1f2)](_0x434c84):_0x3cd885===_0x281068(0x1bc)?_0x12c162['value']=_0x434c84[_0x281068(0x1f5)]():_0x3cd885==='RegExp'?_0x12c162[_0x281068(0x1f8)]=this['_regExpToString'][_0x281068(0x1f2)](_0x434c84):_0x3cd885==='symbol'&&this[_0x281068(0x275)]?_0x12c162[_0x281068(0x1f8)]=this[_0x281068(0x275)][_0x281068(0x1e5)]['toString']['call'](_0x434c84):!_0x3c16b4[_0x281068(0x262)]&&!(_0x3cd885===_0x281068(0x1d2)||_0x3cd885===_0x281068(0x20a))&&(delete _0x12c162[_0x281068(0x1f8)],_0x12c162[_0x281068(0x21a)]=!0x0),_0xcffe6e&&(_0x12c162[_0x281068(0x224)]=!0x0),_0x8716d4=_0x3c16b4['node']['current'],_0x3c16b4[_0x281068(0x1a8)][_0x281068(0x1df)]=_0x12c162,this[_0x281068(0x236)](_0x12c162,_0x3c16b4),_0x3441b3['length']){for(_0x320d2c=0x0,_0x495b4b=_0x3441b3[_0x281068(0x20f)];_0x320d2c<_0x495b4b;_0x320d2c++)_0x3441b3[_0x320d2c](_0x320d2c);}_0x44f8d1[_0x281068(0x20f)]&&(_0x12c162[_0x281068(0x279)]=_0x44f8d1);}catch(_0x3d7418){_0x1c325b(_0x3d7418,_0x12c162,_0x3c16b4);}return this[_0x281068(0x27a)](_0x434c84,_0x12c162),this[_0x281068(0x1a0)](_0x12c162,_0x3c16b4),_0x3c16b4[_0x281068(0x1a8)]['current']=_0x8716d4,_0x3c16b4[_0x281068(0x1f4)]--,_0x3c16b4[_0x281068(0x20b)]=_0x3af224,_0x3c16b4[_0x281068(0x20b)]&&_0x3c16b4[_0x281068(0x264)]['pop'](),_0x12c162;}[_0x25e4aa(0x1a4)](_0x1bbe00){var _0xfd50f6=_0x25e4aa;return Object[_0xfd50f6(0x255)]?Object['getOwnPropertySymbols'](_0x1bbe00):[];}[_0x25e4aa(0x23d)](_0x3719d0){var _0x22d2c4=_0x25e4aa;return!!(_0x3719d0&&_0x5cbe19[_0x22d2c4(0x25f)]&&this[_0x22d2c4(0x1dc)](_0x3719d0)===_0x22d2c4(0x1d4)&&_0x3719d0[_0x22d2c4(0x1c2)]);}[_0x25e4aa(0x27c)](_0x5f4381,_0x298aca,_0x24c076){var _0x4f242a=_0x25e4aa;return _0x24c076[_0x4f242a(0x1e6)]?typeof _0x5f4381[_0x298aca]=='function':!0x1;}[_0x25e4aa(0x19c)](_0x3763ce){var _0x26029e=_0x25e4aa,_0x5f9659='';return _0x5f9659=typeof _0x3763ce,_0x5f9659===_0x26029e(0x1bd)?this[_0x26029e(0x1dc)](_0x3763ce)===_0x26029e(0x26e)?_0x5f9659=_0x26029e(0x1db):this[_0x26029e(0x1dc)](_0x3763ce)===_0x26029e(0x1b0)?_0x5f9659='date':this[_0x26029e(0x1dc)](_0x3763ce)===_0x26029e(0x1a7)?_0x5f9659='bigint':_0x3763ce===null?_0x5f9659='null':_0x3763ce[_0x26029e(0x1e9)]&&(_0x5f9659=_0x3763ce[_0x26029e(0x1e9)][_0x26029e(0x1ad)]||_0x5f9659):_0x5f9659==='undefined'&&this[_0x26029e(0x246)]&&_0x3763ce instanceof this[_0x26029e(0x246)]&&(_0x5f9659=_0x26029e(0x267)),_0x5f9659;}['_objectToString'](_0x194d21){var _0x53cc88=_0x25e4aa;return Object[_0x53cc88(0x1e5)][_0x53cc88(0x1f5)][_0x53cc88(0x1f2)](_0x194d21);}[_0x25e4aa(0x1c3)](_0x2deffc){var _0x205cf9=_0x25e4aa;return _0x2deffc===_0x205cf9(0x1f1)||_0x2deffc===_0x205cf9(0x1c5)||_0x2deffc===_0x205cf9(0x266);}['_isPrimitiveWrapperType'](_0x3421e0){var _0x533a90=_0x25e4aa;return _0x3421e0==='Boolean'||_0x3421e0===_0x533a90(0x1de)||_0x3421e0===_0x533a90(0x1ef);}[_0x25e4aa(0x1fe)](_0x425bcc,_0x4a4103,_0x3c3d34,_0x1cb629,_0x41c6fb,_0x40c80d){var _0x5275b7=this;return function(_0x323531){var _0x3354b1=_0x344f,_0x585e90=_0x41c6fb['node'][_0x3354b1(0x1df)],_0x19a804=_0x41c6fb[_0x3354b1(0x1a8)][_0x3354b1(0x259)],_0x297089=_0x41c6fb[_0x3354b1(0x1a8)][_0x3354b1(0x257)];_0x41c6fb['node']['parent']=_0x585e90,_0x41c6fb[_0x3354b1(0x1a8)][_0x3354b1(0x259)]=typeof _0x1cb629==_0x3354b1(0x266)?_0x1cb629:_0x323531,_0x425bcc[_0x3354b1(0x1ce)](_0x5275b7['_property'](_0x4a4103,_0x3c3d34,_0x1cb629,_0x41c6fb,_0x40c80d)),_0x41c6fb[_0x3354b1(0x1a8)][_0x3354b1(0x257)]=_0x297089,_0x41c6fb[_0x3354b1(0x1a8)]['index']=_0x19a804;};}[_0x25e4aa(0x22d)](_0x55e26c,_0x2f43a8,_0x4638b0,_0x500b8c,_0x3c8c9a,_0x178b2a,_0xf9080d){var _0x1ebedf=_0x25e4aa,_0xc05349=this;return _0x2f43a8[_0x1ebedf(0x203)+_0x3c8c9a[_0x1ebedf(0x1f5)]()]=!0x0,function(_0x30f7d2){var _0x245445=_0x1ebedf,_0x52972b=_0x178b2a[_0x245445(0x1a8)][_0x245445(0x1df)],_0x440c48=_0x178b2a[_0x245445(0x1a8)][_0x245445(0x259)],_0xd795ed=_0x178b2a['node'][_0x245445(0x257)];_0x178b2a[_0x245445(0x1a8)][_0x245445(0x257)]=_0x52972b,_0x178b2a[_0x245445(0x1a8)][_0x245445(0x259)]=_0x30f7d2,_0x55e26c[_0x245445(0x1ce)](_0xc05349['_property'](_0x4638b0,_0x500b8c,_0x3c8c9a,_0x178b2a,_0xf9080d)),_0x178b2a['node'][_0x245445(0x257)]=_0xd795ed,_0x178b2a[_0x245445(0x1a8)][_0x245445(0x259)]=_0x440c48;};}[_0x25e4aa(0x1fc)](_0x3de7ca,_0x2fd43c,_0x5451b9,_0x1af577,_0x46d2d1){var _0x58bae6=_0x25e4aa,_0xce23ea=this;_0x46d2d1||(_0x46d2d1=function(_0x1aab7a,_0x671577){return _0x1aab7a[_0x671577];});var _0x1132ec=_0x5451b9[_0x58bae6(0x1f5)](),_0x18d832=_0x1af577[_0x58bae6(0x1a2)]||{},_0x518c77=_0x1af577[_0x58bae6(0x262)],_0x118319=_0x1af577[_0x58bae6(0x221)];try{var _0x5c8fab=this[_0x58bae6(0x1fa)](_0x3de7ca),_0x921a85=_0x1132ec;_0x5c8fab&&_0x921a85[0x0]==='\\x27'&&(_0x921a85=_0x921a85[_0x58bae6(0x200)](0x1,_0x921a85['length']-0x2));var _0x57235d=_0x1af577['expressionsToEvaluate']=_0x18d832[_0x58bae6(0x203)+_0x921a85];_0x57235d&&(_0x1af577[_0x58bae6(0x262)]=_0x1af577[_0x58bae6(0x262)]+0x1),_0x1af577['isExpressionToEvaluate']=!!_0x57235d;var _0x21842f=typeof _0x5451b9==_0x58bae6(0x201),_0x205035={'name':_0x21842f||_0x5c8fab?_0x1132ec:this[_0x58bae6(0x1d1)](_0x1132ec)};if(_0x21842f&&(_0x205035[_0x58bae6(0x201)]=!0x0),!(_0x2fd43c===_0x58bae6(0x1db)||_0x2fd43c===_0x58bae6(0x205))){var _0x5b996c=this[_0x58bae6(0x281)](_0x3de7ca,_0x5451b9);if(_0x5b996c&&(_0x5b996c[_0x58bae6(0x1c6)]&&(_0x205035[_0x58bae6(0x21e)]=!0x0),_0x5b996c[_0x58bae6(0x27b)]&&!_0x57235d&&!_0x1af577[_0x58bae6(0x273)]))return _0x205035[_0x58bae6(0x218)]=!0x0,this[_0x58bae6(0x1bb)](_0x205035,_0x1af577),_0x205035;}var _0x2aaea4;try{_0x2aaea4=_0x46d2d1(_0x3de7ca,_0x5451b9);}catch(_0x5cd8aa){return _0x205035={'name':_0x1132ec,'type':_0x58bae6(0x249),'error':_0x5cd8aa[_0x58bae6(0x245)]},this[_0x58bae6(0x1bb)](_0x205035,_0x1af577),_0x205035;}var _0x327a13=this[_0x58bae6(0x19c)](_0x2aaea4),_0x218ba0=this[_0x58bae6(0x1c3)](_0x327a13);if(_0x205035['type']=_0x327a13,_0x218ba0)this[_0x58bae6(0x1bb)](_0x205035,_0x1af577,_0x2aaea4,function(){var _0x3ef286=_0x58bae6;_0x205035[_0x3ef286(0x1f8)]=_0x2aaea4[_0x3ef286(0x260)](),!_0x57235d&&_0xce23ea[_0x3ef286(0x19f)](_0x327a13,_0x205035,_0x1af577,{});});else{var _0x111b8d=_0x1af577[_0x58bae6(0x20b)]&&_0x1af577['level']<_0x1af577[_0x58bae6(0x1d6)]&&_0x1af577[_0x58bae6(0x264)]['indexOf'](_0x2aaea4)<0x0&&_0x327a13!==_0x58bae6(0x1cf)&&_0x1af577[_0x58bae6(0x23a)]<_0x1af577['autoExpandLimit'];_0x111b8d||_0x1af577[_0x58bae6(0x1f4)]<_0x518c77||_0x57235d?(this[_0x58bae6(0x237)](_0x205035,_0x2aaea4,_0x1af577,_0x57235d||{}),this[_0x58bae6(0x27a)](_0x2aaea4,_0x205035)):this['_processTreeNodeResult'](_0x205035,_0x1af577,_0x2aaea4,function(){var _0x2b1855=_0x58bae6;_0x327a13===_0x2b1855(0x1d2)||_0x327a13===_0x2b1855(0x20a)||(delete _0x205035[_0x2b1855(0x1f8)],_0x205035[_0x2b1855(0x21a)]=!0x0);});}return _0x205035;}finally{_0x1af577['expressionsToEvaluate']=_0x18d832,_0x1af577[_0x58bae6(0x262)]=_0x518c77,_0x1af577['isExpressionToEvaluate']=_0x118319;}}[_0x25e4aa(0x19f)](_0x3fe6b8,_0x647b0b,_0x2bf5c0,_0x559df4){var _0x5eff47=_0x25e4aa,_0x1204fe=_0x559df4['strLength']||_0x2bf5c0[_0x5eff47(0x261)];if((_0x3fe6b8===_0x5eff47(0x1c5)||_0x3fe6b8===_0x5eff47(0x1de))&&_0x647b0b[_0x5eff47(0x1f8)]){let _0xbf5ebb=_0x647b0b['value'][_0x5eff47(0x20f)];_0x2bf5c0['allStrLength']+=_0xbf5ebb,_0x2bf5c0[_0x5eff47(0x1ff)]>_0x2bf5c0['totalStrLength']?(_0x647b0b['capped']='',delete _0x647b0b[_0x5eff47(0x1f8)]):_0xbf5ebb>_0x1204fe&&(_0x647b0b[_0x5eff47(0x21a)]=_0x647b0b[_0x5eff47(0x1f8)][_0x5eff47(0x200)](0x0,_0x1204fe),delete _0x647b0b['value']);}}[_0x25e4aa(0x1fa)](_0x1a9102){var _0x54be5=_0x25e4aa;return!!(_0x1a9102&&_0x5cbe19['Map']&&this[_0x54be5(0x1dc)](_0x1a9102)==='[object\\x20Map]'&&_0x1a9102[_0x54be5(0x1c2)]);}[_0x25e4aa(0x1d1)](_0xcf34cd){var _0x16216e=_0x25e4aa;if(_0xcf34cd[_0x16216e(0x26b)](/^\\d+$/))return _0xcf34cd;var _0x1ae732;try{_0x1ae732=JSON['stringify'](''+_0xcf34cd);}catch{_0x1ae732='\\x22'+this['_objectToString'](_0xcf34cd)+'\\x22';}return _0x1ae732['match'](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x1ae732=_0x1ae732['substr'](0x1,_0x1ae732[_0x16216e(0x20f)]-0x2):_0x1ae732=_0x1ae732[_0x16216e(0x1ea)](/'/g,'\\x5c\\x27')[_0x16216e(0x1ea)](/\\\\\"/g,'\\x22')[_0x16216e(0x1ea)](/(^\"|\"$)/g,'\\x27'),_0x1ae732;}[_0x25e4aa(0x1bb)](_0x59872f,_0x1cbb3a,_0x2f5198,_0x151011){var _0x1ee18f=_0x25e4aa;this[_0x1ee18f(0x236)](_0x59872f,_0x1cbb3a),_0x151011&&_0x151011(),this['_additionalMetadata'](_0x2f5198,_0x59872f),this[_0x1ee18f(0x1a0)](_0x59872f,_0x1cbb3a);}[_0x25e4aa(0x236)](_0x3338a2,_0x57709c){var _0x4bcbfc=_0x25e4aa;this[_0x4bcbfc(0x1e3)](_0x3338a2,_0x57709c),this[_0x4bcbfc(0x1be)](_0x3338a2,_0x57709c),this[_0x4bcbfc(0x252)](_0x3338a2,_0x57709c),this['_setNodePermissions'](_0x3338a2,_0x57709c);}[_0x25e4aa(0x1e3)](_0x2ee9e0,_0x90b1ee){}[_0x25e4aa(0x1be)](_0x1d77a6,_0x315ce3){}[_0x25e4aa(0x244)](_0x17f934,_0xc312a0){}[_0x25e4aa(0x1f0)](_0x72b61b){return _0x72b61b===this['_undefined'];}[_0x25e4aa(0x1a0)](_0x11d636,_0x55125f){var _0x1b84d9=_0x25e4aa;this[_0x1b84d9(0x244)](_0x11d636,_0x55125f),this['_setNodeExpandableState'](_0x11d636),_0x55125f[_0x1b84d9(0x24d)]&&this[_0x1b84d9(0x25c)](_0x11d636),this['_addFunctionsNode'](_0x11d636,_0x55125f),this[_0x1b84d9(0x270)](_0x11d636,_0x55125f),this[_0x1b84d9(0x1ca)](_0x11d636);}[_0x25e4aa(0x27a)](_0x459d84,_0x476ab2){var _0x4001f2=_0x25e4aa;let _0x44c869;try{_0x5cbe19['console']&&(_0x44c869=_0x5cbe19['console'][_0x4001f2(0x1cc)],_0x5cbe19[_0x4001f2(0x1a6)]['error']=function(){}),_0x459d84&&typeof _0x459d84[_0x4001f2(0x20f)]==_0x4001f2(0x266)&&(_0x476ab2[_0x4001f2(0x20f)]=_0x459d84[_0x4001f2(0x20f)]);}catch{}finally{_0x44c869&&(_0x5cbe19['console']['error']=_0x44c869);}if(_0x476ab2['type']===_0x4001f2(0x266)||_0x476ab2[_0x4001f2(0x24c)]==='Number'){if(isNaN(_0x476ab2[_0x4001f2(0x1f8)]))_0x476ab2[_0x4001f2(0x251)]=!0x0,delete _0x476ab2[_0x4001f2(0x1f8)];else switch(_0x476ab2[_0x4001f2(0x1f8)]){case Number[_0x4001f2(0x1ba)]:_0x476ab2[_0x4001f2(0x253)]=!0x0,delete _0x476ab2['value'];break;case Number['NEGATIVE_INFINITY']:_0x476ab2['negativeInfinity']=!0x0,delete _0x476ab2[_0x4001f2(0x1f8)];break;case 0x0:this[_0x4001f2(0x280)](_0x476ab2[_0x4001f2(0x1f8)])&&(_0x476ab2[_0x4001f2(0x243)]=!0x0);break;}}else _0x476ab2[_0x4001f2(0x24c)]===_0x4001f2(0x1cf)&&typeof _0x459d84[_0x4001f2(0x1ad)]==_0x4001f2(0x1c5)&&_0x459d84[_0x4001f2(0x1ad)]&&_0x476ab2[_0x4001f2(0x1ad)]&&_0x459d84[_0x4001f2(0x1ad)]!==_0x476ab2['name']&&(_0x476ab2['funcName']=_0x459d84[_0x4001f2(0x1ad)]);}[_0x25e4aa(0x280)](_0x2fa0b9){return 0x1/_0x2fa0b9===Number['NEGATIVE_INFINITY'];}[_0x25e4aa(0x25c)](_0x204956){var _0x191d5a=_0x25e4aa;!_0x204956[_0x191d5a(0x279)]||!_0x204956[_0x191d5a(0x279)]['length']||_0x204956[_0x191d5a(0x24c)]===_0x191d5a(0x1db)||_0x204956[_0x191d5a(0x24c)]===_0x191d5a(0x1b2)||_0x204956[_0x191d5a(0x24c)]==='Set'||_0x204956['props'][_0x191d5a(0x283)](function(_0x2bcf39,_0x5d7dd1){var _0x18d794=_0x191d5a,_0x206352=_0x2bcf39['name'][_0x18d794(0x219)](),_0x59a4bb=_0x5d7dd1[_0x18d794(0x1ad)][_0x18d794(0x219)]();return _0x206352<_0x59a4bb?-0x1:_0x206352>_0x59a4bb?0x1:0x0;});}['_addFunctionsNode'](_0x3f5a0e,_0x2510fe){var _0x1327a=_0x25e4aa;if(!(_0x2510fe[_0x1327a(0x1e6)]||!_0x3f5a0e['props']||!_0x3f5a0e['props'][_0x1327a(0x20f)])){for(var _0x594342=[],_0x344bd2=[],_0x5d0b07=0x0,_0x121d86=_0x3f5a0e[_0x1327a(0x279)][_0x1327a(0x20f)];_0x5d0b07<_0x121d86;_0x5d0b07++){var _0x11770d=_0x3f5a0e[_0x1327a(0x279)][_0x5d0b07];_0x11770d[_0x1327a(0x24c)]===_0x1327a(0x1cf)?_0x594342[_0x1327a(0x1ce)](_0x11770d):_0x344bd2['push'](_0x11770d);}if(!(!_0x344bd2['length']||_0x594342['length']<=0x1)){_0x3f5a0e[_0x1327a(0x279)]=_0x344bd2;var _0x894ad7={'functionsNode':!0x0,'props':_0x594342};this['_setNodeId'](_0x894ad7,_0x2510fe),this[_0x1327a(0x244)](_0x894ad7,_0x2510fe),this[_0x1327a(0x1aa)](_0x894ad7),this['_setNodePermissions'](_0x894ad7,_0x2510fe),_0x894ad7['id']+='\\x20f',_0x3f5a0e[_0x1327a(0x279)]['unshift'](_0x894ad7);}}}[_0x25e4aa(0x270)](_0x140f49,_0x4c8d61){}[_0x25e4aa(0x1aa)](_0x23693d){}[_0x25e4aa(0x1b3)](_0x2343d1){var _0x59294c=_0x25e4aa;return Array[_0x59294c(0x204)](_0x2343d1)||typeof _0x2343d1==_0x59294c(0x1bd)&&this[_0x59294c(0x1dc)](_0x2343d1)===_0x59294c(0x26e);}['_setNodePermissions'](_0x5cf449,_0x25104f){}[_0x25e4aa(0x1ca)](_0x1ff5cf){var _0x267dd1=_0x25e4aa;delete _0x1ff5cf[_0x267dd1(0x27e)],delete _0x1ff5cf['_hasSetOnItsPath'],delete _0x1ff5cf[_0x267dd1(0x241)];}[_0x25e4aa(0x252)](_0x3a0fa3,_0xd63908){}}let _0xe01930=new _0x4178d1(),_0x5605bc={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x9b5173={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x385e7e(_0x39cd5f,_0x2e3d14,_0x19c337,_0xaf7b9b,_0x4868e4,_0x3a2aed){var _0x471d37=_0x25e4aa;let _0x4ea12f,_0x47750a;try{_0x47750a=_0x1a564f(),_0x4ea12f=_0x4f3a12[_0x2e3d14],!_0x4ea12f||_0x47750a-_0x4ea12f['ts']>0x1f4&&_0x4ea12f[_0x471d37(0x265)]&&_0x4ea12f[_0x471d37(0x1e4)]/_0x4ea12f[_0x471d37(0x265)]<0x64?(_0x4f3a12[_0x2e3d14]=_0x4ea12f={'count':0x0,'time':0x0,'ts':_0x47750a},_0x4f3a12[_0x471d37(0x206)]={}):_0x47750a-_0x4f3a12[_0x471d37(0x206)]['ts']>0x32&&_0x4f3a12[_0x471d37(0x206)][_0x471d37(0x265)]&&_0x4f3a12[_0x471d37(0x206)][_0x471d37(0x1e4)]/_0x4f3a12[_0x471d37(0x206)][_0x471d37(0x265)]<0x64&&(_0x4f3a12['hits']={});let _0x152b75=[],_0x457cc2=_0x4ea12f[_0x471d37(0x216)]||_0x4f3a12[_0x471d37(0x206)][_0x471d37(0x216)]?_0x9b5173:_0x5605bc,_0x33535c=_0x31dbba=>{var _0x11c457=_0x471d37;let _0x232278={};return _0x232278['props']=_0x31dbba[_0x11c457(0x279)],_0x232278['elements']=_0x31dbba[_0x11c457(0x229)],_0x232278['strLength']=_0x31dbba[_0x11c457(0x261)],_0x232278['totalStrLength']=_0x31dbba[_0x11c457(0x254)],_0x232278[_0x11c457(0x1b9)]=_0x31dbba[_0x11c457(0x1b9)],_0x232278[_0x11c457(0x1d6)]=_0x31dbba['autoExpandMaxDepth'],_0x232278[_0x11c457(0x24d)]=!0x1,_0x232278['noFunctions']=!_0x5ef8be,_0x232278[_0x11c457(0x262)]=0x1,_0x232278['level']=0x0,_0x232278[_0x11c457(0x1c1)]=_0x11c457(0x230),_0x232278[_0x11c457(0x20e)]=_0x11c457(0x213),_0x232278[_0x11c457(0x20b)]=!0x0,_0x232278[_0x11c457(0x264)]=[],_0x232278[_0x11c457(0x23a)]=0x0,_0x232278['resolveGetters']=!0x0,_0x232278[_0x11c457(0x1ff)]=0x0,_0x232278[_0x11c457(0x1a8)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x232278;};for(var _0x2ba214=0x0;_0x2ba214<_0x4868e4[_0x471d37(0x20f)];_0x2ba214++)_0x152b75[_0x471d37(0x1ce)](_0xe01930[_0x471d37(0x237)]({'timeNode':_0x39cd5f==='time'||void 0x0},_0x4868e4[_0x2ba214],_0x33535c(_0x457cc2),{}));if(_0x39cd5f===_0x471d37(0x233)){let _0x2c7910=Error[_0x471d37(0x21b)];try{Error[_0x471d37(0x21b)]=0x1/0x0,_0x152b75[_0x471d37(0x1ce)](_0xe01930[_0x471d37(0x237)]({'stackNode':!0x0},new Error()['stack'],_0x33535c(_0x457cc2),{'strLength':0x1/0x0}));}finally{Error[_0x471d37(0x21b)]=_0x2c7910;}}return{'method':'log','version':_0x28823a,'args':[{'ts':_0x19c337,'session':_0xaf7b9b,'args':_0x152b75,'id':_0x2e3d14,'context':_0x3a2aed}]};}catch(_0x435a38){return{'method':_0x471d37(0x27f),'version':_0x28823a,'args':[{'ts':_0x19c337,'session':_0xaf7b9b,'args':[{'type':_0x471d37(0x249),'error':_0x435a38&&_0x435a38[_0x471d37(0x245)]}],'id':_0x2e3d14,'context':_0x3a2aed}]};}finally{try{if(_0x4ea12f&&_0x47750a){let _0x98a556=_0x1a564f();_0x4ea12f[_0x471d37(0x265)]++,_0x4ea12f[_0x471d37(0x1e4)]+=_0x14bcbd(_0x47750a,_0x98a556),_0x4ea12f['ts']=_0x98a556,_0x4f3a12[_0x471d37(0x206)][_0x471d37(0x265)]++,_0x4f3a12['hits'][_0x471d37(0x1e4)]+=_0x14bcbd(_0x47750a,_0x98a556),_0x4f3a12[_0x471d37(0x206)]['ts']=_0x98a556,(_0x4ea12f['count']>0x32||_0x4ea12f[_0x471d37(0x1e4)]>0x64)&&(_0x4ea12f[_0x471d37(0x216)]=!0x0),(_0x4f3a12[_0x471d37(0x206)][_0x471d37(0x265)]>0x3e8||_0x4f3a12['hits'][_0x471d37(0x1e4)]>0x12c)&&(_0x4f3a12[_0x471d37(0x206)][_0x471d37(0x216)]=!0x0);}}catch{}}}return _0x385e7e;}((_0x5a6926,_0x568863,_0x271894,_0x45c134,_0x39e125,_0x52a697,_0x2b91d1,_0x3c2b59,_0x2bc2d6,_0x5cc865)=>{var _0x17e301=_0x2e3452;if(_0x5a6926[_0x17e301(0x242)])return _0x5a6926[_0x17e301(0x242)];if(!X(_0x5a6926,_0x3c2b59,_0x39e125))return _0x5a6926[_0x17e301(0x242)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x5a6926[_0x17e301(0x242)];let _0x56e051=W(_0x5a6926),_0x3a664e=_0x56e051['elapsed'],_0x5f18e4=_0x56e051[_0x17e301(0x231)],_0x426dbe=_0x56e051['now'],_0x4f3a64={'hits':{},'ts':{}},_0x3fa53f=J(_0x5a6926,_0x2bc2d6,_0x4f3a64,_0x52a697),_0xa5174c=_0xabdfde=>{_0x4f3a64['ts'][_0xabdfde]=_0x5f18e4();},_0x15fc82=(_0x2e6ec7,_0x51b5b3)=>{var _0x4498ef=_0x17e301;let _0x5b0c65=_0x4f3a64['ts'][_0x51b5b3];if(delete _0x4f3a64['ts'][_0x51b5b3],_0x5b0c65){let _0x475af3=_0x3a664e(_0x5b0c65,_0x5f18e4());_0x23e244(_0x3fa53f(_0x4498ef(0x1e4),_0x2e6ec7,_0x426dbe(),_0x516bb4,[_0x475af3],_0x51b5b3));}},_0x11ab71=_0xf752f7=>(_0x39e125==='next.js'&&_0x5a6926[_0x17e301(0x235)]&&_0xf752f7?.[_0x17e301(0x27d)]?.['length']&&(_0xf752f7[_0x17e301(0x27d)][0x0]['origin']=_0x5a6926[_0x17e301(0x235)]),_0xf752f7);_0x5a6926[_0x17e301(0x242)]={'consoleLog':(_0x2c3628,_0x13e21c)=>{var _0x436f82=_0x17e301;_0x5a6926[_0x436f82(0x1a6)][_0x436f82(0x27f)][_0x436f82(0x1ad)]!=='disabledLog'&&_0x23e244(_0x3fa53f(_0x436f82(0x27f),_0x2c3628,_0x426dbe(),_0x516bb4,_0x13e21c));},'consoleTrace':(_0x202040,_0x4b3ac6)=>{var _0x5a2618=_0x17e301;_0x5a6926[_0x5a2618(0x1a6)][_0x5a2618(0x27f)]['name']!==_0x5a2618(0x212)&&_0x23e244(_0x11ab71(_0x3fa53f(_0x5a2618(0x233),_0x202040,_0x426dbe(),_0x516bb4,_0x4b3ac6)));},'consoleTime':_0x279aae=>{_0xa5174c(_0x279aae);},'consoleTimeEnd':(_0x3fdce4,_0x4a4783)=>{_0x15fc82(_0x4a4783,_0x3fdce4);},'autoLog':(_0x3f3cbd,_0x4b0176)=>{var _0x134ef4=_0x17e301;_0x23e244(_0x3fa53f(_0x134ef4(0x27f),_0x4b0176,_0x426dbe(),_0x516bb4,[_0x3f3cbd]));},'autoLogMany':(_0x7c994d,_0x21c977)=>{_0x23e244(_0x3fa53f('log',_0x7c994d,_0x426dbe(),_0x516bb4,_0x21c977));},'autoTrace':(_0x271ad3,_0x1e8a3b)=>{_0x23e244(_0x11ab71(_0x3fa53f('trace',_0x1e8a3b,_0x426dbe(),_0x516bb4,[_0x271ad3])));},'autoTraceMany':(_0x34e8bc,_0x4909be)=>{var _0x22646=_0x17e301;_0x23e244(_0x11ab71(_0x3fa53f(_0x22646(0x233),_0x34e8bc,_0x426dbe(),_0x516bb4,_0x4909be)));},'autoTime':(_0x1c3d37,_0x8009a6,_0x15ca51)=>{_0xa5174c(_0x15ca51);},'autoTimeEnd':(_0x19f0fe,_0x419821,_0x40c936)=>{_0x15fc82(_0x419821,_0x40c936);},'coverage':_0x35d42e=>{var _0x5527a6=_0x17e301;_0x23e244({'method':_0x5527a6(0x1a1),'version':_0x52a697,'args':[{'id':_0x35d42e}]});}};let _0x23e244=x(_0x5a6926,_0x568863,_0x271894,_0x45c134,_0x39e125,_0x5cc865),_0x516bb4=_0x5a6926[_0x17e301(0x208)];return _0x5a6926[_0x17e301(0x242)];})(globalThis,_0x2e3452(0x215),_0x2e3452(0x1c9),_0x2e3452(0x26c),'webpack',_0x2e3452(0x227),'1713330662625',_0x2e3452(0x225),_0x2e3452(0x1fd),_0x2e3452(0x1af));");
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