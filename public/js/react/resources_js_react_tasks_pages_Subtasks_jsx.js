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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x305561=_0x2bb1;(function(_0x54efd3,_0x3771dd){var _0x552333=_0x2bb1,_0x54dee5=_0x54efd3();while(!![]){try{var _0x410cd3=parseInt(_0x552333(0x175))/0x1*(-parseInt(_0x552333(0x1aa))/0x2)+parseInt(_0x552333(0x1f8))/0x3+-parseInt(_0x552333(0x17f))/0x4*(-parseInt(_0x552333(0x1ae))/0x5)+parseInt(_0x552333(0x196))/0x6+-parseInt(_0x552333(0x1a3))/0x7*(parseInt(_0x552333(0x157))/0x8)+-parseInt(_0x552333(0x164))/0x9*(parseInt(_0x552333(0x1c8))/0xa)+parseInt(_0x552333(0x15d))/0xb*(parseInt(_0x552333(0x1c2))/0xc);if(_0x410cd3===_0x3771dd)break;else _0x54dee5['push'](_0x54dee5['shift']());}catch(_0x9865a7){_0x54dee5['push'](_0x54dee5['shift']());}}}(_0x3345,0x91a77));function _0x2bb1(_0x2cad2d,_0x382960){var _0x3345d8=_0x3345();return _0x2bb1=function(_0x2bb1d0,_0x4ad7e3){_0x2bb1d0=_0x2bb1d0-0x145;var _0x2087f5=_0x3345d8[_0x2bb1d0];return _0x2087f5;},_0x2bb1(_0x2cad2d,_0x382960);}function _0x3345(){var _0x233538=['host','args','127.0.0.1','NEXT_RUNTIME','time','location','_treeNodePropertiesBeforeFullValue','eventReceivedCallback','data','rootExpression','setter','coverage','_WebSocketClass','_getOwnPropertySymbols','nodeModules','trace','160RayLgC','env','reload','expressionsToEvaluate','edge','Map','6919891PbxHJa','versions','_blacklistedProperty','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','[object\\x20Array]','hrtime','[object\\x20Date]','9cwguEU','url','_allowedToConnectOnSend','next.js','astro','function','error','substr','number','_treeNodePropertiesAfterFullValue','current','_objectToString','_disposeWebsocket','_cleanNode','negativeZero','match','_connectAttemptCount','722366vBoGXZ','valueOf','Number','reduceLimits','count','Boolean','now','stringify','concat','autoExpandPreviousObjects','1330036asjggn','disabledTrace','Buffer','elements','49887','onerror','create','getOwnPropertyNames','stackTraceLimit','_isArray','_inBrowser','_regExpToString','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','_attemptToReconnectShortly','props','readyState','autoExpand','_WebSocket','length','POSITIVE_INFINITY','[object\\x20BigInt]','serialize','_type','229704OkofFT','_additionalMetadata','Symbol','_sendErrorMessage','capped','_connecting','_reconnectTimeout','','root_exp','depth','getOwnPropertySymbols','onmessage','join','376565gdAYcS','_hasSetOnItsPath','[object\\x20Set]','_Symbol','_addProperty','isExpressionToEvaluate','symbol','2pzkTPp','value','_isNegativeZero','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','15omapWK','ws://','1','_numberRegExp','_isPrimitiveWrapperType','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','HTMLAllCollection','path','_isPrimitiveType','String','level','_quotedRegExp','process','unknown','send','expId','set','_p_name','_isSet','undefined','24YHhoIs','close','_socket','sortProps','autoExpandPropertyCount','array','9106270dKBDTC','allStrLength','\\x20browser','_connected','https://tinyurl.com/37x8b79t','_setNodeExpandableState','getOwnPropertyDescriptor','getWebSocketClass','_capIfString','getPrototypeOf','push','toString','_hasSymbolPropertyOnItsPath','_dateToString','toLowerCase','disabledLog','timeStamp','stack','_sortProps','split','ws/index.js','map','_propertyName','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','includes','slice','hasOwnProperty','_processTreeNodeResult','nan','totalStrLength','Set','_webSocketErrorDocsLink','defineProperty','_allowedToSend','perf_hooks','_undefined','autoExpandMaxDepth','_maxConnectAttemptCount','_consoleNinjaAllowedToStart','call','strLength','_HTMLAllCollection','object','method','node','index','pathToFileURL','_setNodeLabel','3034557HCyOLe','_keyStrRegExp','hostname','funcName','date','warn','_setNodePermissions','string','type','hits','_addFunctionsNode','replace','angular','gateway.docker.internal','name','forEach','_getOwnPropertyDescriptor','RegExp','_getOwnPropertyNames','_ws','1.0.0','_connectToHostNow','__es'+'Module','noFunctions','constructor','sort','NEGATIVE_INFINITY','console','_setNodeQueryPath','_setNodeId','pop','global','then','_isMap','_p_length','get','_addLoadNode','default','log','dockerizedApp','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','elapsed','negativeInfinity','port','autoExpandLimit','performance','catch','parent','charAt','_inNextEdge','message','_setNodeExpressionPath','unref','prototype','enumerable',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.316\\\\node_modules\",'bigint','Error','_console_ninja_session','null','_p_','test','_console_ninja'];_0x3345=function(){return _0x233538;};return _0x3345();}var K=Object[_0x305561(0x185)],Q=Object[_0x305561(0x1e8)],G=Object[_0x305561(0x1ce)],ee=Object['getOwnPropertyNames'],te=Object[_0x305561(0x1d1)],ne=Object[_0x305561(0x22d)][_0x305561(0x1e2)],re=(_0x49031e,_0x115546,_0x2abd76,_0x2b1a54)=>{var _0x26d404=_0x305561;if(_0x115546&&typeof _0x115546=='object'||typeof _0x115546==_0x26d404(0x169)){for(let _0x5703be of ee(_0x115546))!ne[_0x26d404(0x1ef)](_0x49031e,_0x5703be)&&_0x5703be!==_0x2abd76&&Q(_0x49031e,_0x5703be,{'get':()=>_0x115546[_0x5703be],'enumerable':!(_0x2b1a54=G(_0x115546,_0x5703be))||_0x2b1a54[_0x26d404(0x22e)]});}return _0x49031e;},V=(_0x715228,_0x220f9f,_0x4b592a)=>(_0x4b592a=_0x715228!=null?K(te(_0x715228)):{},re(_0x220f9f||!_0x715228||!_0x715228[_0x305561(0x20e)]?Q(_0x4b592a,_0x305561(0x21d),{'value':_0x715228,'enumerable':!0x0}):_0x4b592a,_0x715228)),x=class{constructor(_0x504e74,_0x2a77cf,_0x5209c5,_0x4a505c,_0x5e35e8,_0x2e54cc){var _0x331ffd=_0x305561;this['global']=_0x504e74,this[_0x331ffd(0x147)]=_0x2a77cf,this['port']=_0x5209c5,this[_0x331ffd(0x155)]=_0x4a505c,this[_0x331ffd(0x21f)]=_0x5e35e8,this[_0x331ffd(0x14e)]=_0x2e54cc,this[_0x331ffd(0x1e9)]=!0x0,this[_0x331ffd(0x166)]=!0x0,this[_0x331ffd(0x1cb)]=!0x1,this[_0x331ffd(0x19b)]=!0x1,this['_inNextEdge']=_0x504e74[_0x331ffd(0x1ba)]?.[_0x331ffd(0x158)]?.[_0x331ffd(0x14a)]===_0x331ffd(0x15b),this[_0x331ffd(0x189)]=!this[_0x331ffd(0x217)][_0x331ffd(0x1ba)]?.[_0x331ffd(0x15e)]?.[_0x331ffd(0x1f4)]&&!this[_0x331ffd(0x229)],this[_0x331ffd(0x153)]=null,this[_0x331ffd(0x174)]=0x0,this[_0x331ffd(0x1ed)]=0x14,this[_0x331ffd(0x1e7)]=_0x331ffd(0x1cc),this[_0x331ffd(0x199)]=(this['_inBrowser']?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x331ffd(0x1df))+this[_0x331ffd(0x1e7)];}async['getWebSocketClass'](){var _0xff0a7d=_0x305561;if(this['_WebSocketClass'])return this[_0xff0a7d(0x153)];let _0x2fc27c;if(this[_0xff0a7d(0x189)]||this[_0xff0a7d(0x229)])_0x2fc27c=this[_0xff0a7d(0x217)]['WebSocket'];else{if(this[_0xff0a7d(0x217)][_0xff0a7d(0x1ba)]?.[_0xff0a7d(0x190)])_0x2fc27c=this['global'][_0xff0a7d(0x1ba)]?.[_0xff0a7d(0x190)];else try{let _0x4eda83=await import(_0xff0a7d(0x1b5));_0x2fc27c=(await import((await import(_0xff0a7d(0x165)))[_0xff0a7d(0x1f6)](_0x4eda83['join'](this[_0xff0a7d(0x155)],_0xff0a7d(0x1dc)))['toString']()))[_0xff0a7d(0x21d)];}catch{try{_0x2fc27c=require(require(_0xff0a7d(0x1b5))[_0xff0a7d(0x1a2)](this[_0xff0a7d(0x155)],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this[_0xff0a7d(0x153)]=_0x2fc27c,_0x2fc27c;}[_0x305561(0x20d)](){var _0x34e426=_0x305561;this[_0x34e426(0x19b)]||this[_0x34e426(0x1cb)]||this[_0x34e426(0x174)]>=this[_0x34e426(0x1ed)]||(this[_0x34e426(0x166)]=!0x1,this['_connecting']=!0x0,this[_0x34e426(0x174)]++,this[_0x34e426(0x20b)]=new Promise((_0x413056,_0x4ce13d)=>{var _0x537cbf=_0x34e426;this[_0x537cbf(0x1cf)]()[_0x537cbf(0x218)](_0x24eb06=>{var _0x4fa408=_0x537cbf;let _0x5df197=new _0x24eb06(_0x4fa408(0x1af)+(!this[_0x4fa408(0x189)]&&this[_0x4fa408(0x21f)]?_0x4fa408(0x205):this[_0x4fa408(0x147)])+':'+this[_0x4fa408(0x223)]);_0x5df197[_0x4fa408(0x184)]=()=>{var _0x19d57d=_0x4fa408;this[_0x19d57d(0x1e9)]=!0x1,this['_disposeWebsocket'](_0x5df197),this[_0x19d57d(0x18c)](),_0x4ce13d(new Error('logger\\x20websocket\\x20error'));},_0x5df197['onopen']=()=>{var _0x373c50=_0x4fa408;this[_0x373c50(0x189)]||_0x5df197['_socket']&&_0x5df197[_0x373c50(0x1c4)]['unref']&&_0x5df197[_0x373c50(0x1c4)][_0x373c50(0x22c)](),_0x413056(_0x5df197);},_0x5df197['onclose']=()=>{var _0x4d50a5=_0x4fa408;this[_0x4d50a5(0x166)]=!0x0,this[_0x4d50a5(0x170)](_0x5df197),this[_0x4d50a5(0x18c)]();},_0x5df197[_0x4fa408(0x1a1)]=_0x1b75bc=>{var _0x41e6cf=_0x4fa408;try{if(!_0x1b75bc?.[_0x41e6cf(0x14f)]||!this[_0x41e6cf(0x14e)])return;let _0xdd062b=JSON['parse'](_0x1b75bc[_0x41e6cf(0x14f)]);this[_0x41e6cf(0x14e)](_0xdd062b[_0x41e6cf(0x1f3)],_0xdd062b[_0x41e6cf(0x148)],this[_0x41e6cf(0x217)],this['_inBrowser']);}catch{}};})[_0x537cbf(0x218)](_0x11d18f=>(this['_connected']=!0x0,this[_0x537cbf(0x19b)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this[_0x537cbf(0x1e9)]=!0x0,this[_0x537cbf(0x174)]=0x0,_0x11d18f))[_0x537cbf(0x226)](_0x4ef697=>(this[_0x537cbf(0x1cb)]=!0x1,this[_0x537cbf(0x19b)]=!0x1,console[_0x537cbf(0x1fd)](_0x537cbf(0x220)+this[_0x537cbf(0x1e7)]),_0x4ce13d(new Error(_0x537cbf(0x18b)+(_0x4ef697&&_0x4ef697[_0x537cbf(0x22a)])))));}));}[_0x305561(0x170)](_0x1c25d3){var _0x113fc1=_0x305561;this['_connected']=!0x1,this[_0x113fc1(0x19b)]=!0x1;try{_0x1c25d3['onclose']=null,_0x1c25d3[_0x113fc1(0x184)]=null,_0x1c25d3['onopen']=null;}catch{}try{_0x1c25d3[_0x113fc1(0x18e)]<0x2&&_0x1c25d3[_0x113fc1(0x1c3)]();}catch{}}[_0x305561(0x18c)](){var _0x547ed9=_0x305561;clearTimeout(this[_0x547ed9(0x19c)]),!(this[_0x547ed9(0x174)]>=this['_maxConnectAttemptCount'])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0x550bed=_0x547ed9;this[_0x550bed(0x1cb)]||this[_0x550bed(0x19b)]||(this[_0x550bed(0x20d)](),this['_ws']?.[_0x550bed(0x226)](()=>this[_0x550bed(0x18c)]()));},0x1f4),this[_0x547ed9(0x19c)][_0x547ed9(0x22c)]&&this[_0x547ed9(0x19c)][_0x547ed9(0x22c)]());}async['send'](_0x1c92d2){var _0x51cd6c=_0x305561;try{if(!this[_0x51cd6c(0x1e9)])return;this[_0x51cd6c(0x166)]&&this[_0x51cd6c(0x20d)](),(await this[_0x51cd6c(0x20b)])[_0x51cd6c(0x1bc)](JSON[_0x51cd6c(0x17c)](_0x1c92d2));}catch(_0x312f7c){console['warn'](this[_0x51cd6c(0x199)]+':\\x20'+(_0x312f7c&&_0x312f7c[_0x51cd6c(0x22a)])),this['_allowedToSend']=!0x1,this['_attemptToReconnectShortly']();}}};function q(_0x4c34a4,_0x31d015,_0x56c00f,_0xea1b7f,_0x4dd52d,_0x2cc1d4,_0x210ea0,_0x367554=ie){var _0x422179=_0x305561;let _0x35c3f7=_0x56c00f[_0x422179(0x1db)](',')[_0x422179(0x1dd)](_0x441633=>{var _0x32f4de=_0x422179;try{if(!_0x4c34a4[_0x32f4de(0x232)]){let _0x5195b7=_0x4c34a4[_0x32f4de(0x1ba)]?.['versions']?.['node']||_0x4c34a4[_0x32f4de(0x1ba)]?.['env']?.[_0x32f4de(0x14a)]===_0x32f4de(0x15b);(_0x4dd52d===_0x32f4de(0x167)||_0x4dd52d==='remix'||_0x4dd52d===_0x32f4de(0x168)||_0x4dd52d===_0x32f4de(0x204))&&(_0x4dd52d+=_0x5195b7?'\\x20server':_0x32f4de(0x1ca)),_0x4c34a4[_0x32f4de(0x232)]={'id':+new Date(),'tool':_0x4dd52d},_0x210ea0&&_0x4dd52d&&!_0x5195b7&&console[_0x32f4de(0x21e)](_0x32f4de(0x160)+(_0x4dd52d[_0x32f4de(0x228)](0x0)['toUpperCase']()+_0x4dd52d[_0x32f4de(0x16b)](0x1))+',',_0x32f4de(0x1ad),_0x32f4de(0x1b3));}let _0x5b841d=new x(_0x4c34a4,_0x31d015,_0x441633,_0xea1b7f,_0x2cc1d4,_0x367554);return _0x5b841d[_0x32f4de(0x1bc)]['bind'](_0x5b841d);}catch(_0x3edb7e){return console[_0x32f4de(0x1fd)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host',_0x3edb7e&&_0x3edb7e['message']),()=>{};}});return _0x27ddcd=>_0x35c3f7[_0x422179(0x207)](_0x4a11bc=>_0x4a11bc(_0x27ddcd));}function ie(_0x404312,_0x48e079,_0xeb127b,_0x13f49e){var _0x36e423=_0x305561;_0x13f49e&&_0x404312===_0x36e423(0x159)&&_0xeb127b[_0x36e423(0x14c)][_0x36e423(0x159)]();}function b(_0x3564b2){var _0x38f9d4=_0x305561;let _0x429098=function(_0xeb0b4,_0xbc78ad){return _0xbc78ad-_0xeb0b4;},_0x53cf80;if(_0x3564b2[_0x38f9d4(0x225)])_0x53cf80=function(){var _0x38250b=_0x38f9d4;return _0x3564b2[_0x38250b(0x225)][_0x38250b(0x17b)]();};else{if(_0x3564b2[_0x38f9d4(0x1ba)]&&_0x3564b2[_0x38f9d4(0x1ba)][_0x38f9d4(0x162)]&&_0x3564b2[_0x38f9d4(0x1ba)]?.[_0x38f9d4(0x158)]?.[_0x38f9d4(0x14a)]!==_0x38f9d4(0x15b))_0x53cf80=function(){var _0x471dbd=_0x38f9d4;return _0x3564b2[_0x471dbd(0x1ba)]['hrtime']();},_0x429098=function(_0x3b503b,_0x4a48cd){return 0x3e8*(_0x4a48cd[0x0]-_0x3b503b[0x0])+(_0x4a48cd[0x1]-_0x3b503b[0x1])/0xf4240;};else try{let {performance:_0x474c77}=require(_0x38f9d4(0x1ea));_0x53cf80=function(){var _0x250441=_0x38f9d4;return _0x474c77[_0x250441(0x17b)]();};}catch{_0x53cf80=function(){return+new Date();};}}return{'elapsed':_0x429098,'timeStamp':_0x53cf80,'now':()=>Date['now']()};}function X(_0xa83fe2,_0x572b2e,_0x2b2e60){var _0x1914fc=_0x305561;if(_0xa83fe2[_0x1914fc(0x1ee)]!==void 0x0)return _0xa83fe2[_0x1914fc(0x1ee)];let _0x4c9ca0=_0xa83fe2[_0x1914fc(0x1ba)]?.[_0x1914fc(0x15e)]?.[_0x1914fc(0x1f4)]||_0xa83fe2[_0x1914fc(0x1ba)]?.[_0x1914fc(0x158)]?.[_0x1914fc(0x14a)]===_0x1914fc(0x15b);return _0x4c9ca0&&_0x2b2e60==='nuxt'?_0xa83fe2['_consoleNinjaAllowedToStart']=!0x1:_0xa83fe2[_0x1914fc(0x1ee)]=_0x4c9ca0||!_0x572b2e||_0xa83fe2[_0x1914fc(0x14c)]?.[_0x1914fc(0x1fa)]&&_0x572b2e[_0x1914fc(0x1e0)](_0xa83fe2[_0x1914fc(0x14c)][_0x1914fc(0x1fa)]),_0xa83fe2[_0x1914fc(0x1ee)];}function H(_0x4fa39d,_0x5536a9,_0x4b2ca2,_0x300c3e){var _0x81c1f4=_0x305561;_0x4fa39d=_0x4fa39d,_0x5536a9=_0x5536a9,_0x4b2ca2=_0x4b2ca2,_0x300c3e=_0x300c3e;let _0x2501ee=b(_0x4fa39d),_0x3c7eb1=_0x2501ee[_0x81c1f4(0x221)],_0x5c2c54=_0x2501ee['timeStamp'];class _0x530322{constructor(){var _0x52ed4a=_0x81c1f4;this[_0x52ed4a(0x1f9)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x52ed4a(0x1b1)]=/^(0|[1-9][0-9]*)$/,this[_0x52ed4a(0x1b9)]=/'([^\\\\']|\\\\')*'/,this[_0x52ed4a(0x1eb)]=_0x4fa39d[_0x52ed4a(0x1c1)],this[_0x52ed4a(0x1f1)]=_0x4fa39d['HTMLAllCollection'],this['_getOwnPropertyDescriptor']=Object[_0x52ed4a(0x1ce)],this[_0x52ed4a(0x20a)]=Object[_0x52ed4a(0x186)],this[_0x52ed4a(0x1a6)]=_0x4fa39d[_0x52ed4a(0x198)],this[_0x52ed4a(0x18a)]=RegExp[_0x52ed4a(0x22d)][_0x52ed4a(0x1d3)],this[_0x52ed4a(0x1d5)]=Date[_0x52ed4a(0x22d)]['toString'];}[_0x81c1f4(0x194)](_0x571be4,_0x32ea60,_0x9aa1fc,_0x4359e3){var _0x1d68b6=_0x81c1f4,_0x4549ee=this,_0x4bace5=_0x9aa1fc['autoExpand'];function _0x218f3c(_0x8ababd,_0x273779,_0x4d4aef){var _0x3b1b3e=_0x2bb1;_0x273779[_0x3b1b3e(0x200)]='unknown',_0x273779[_0x3b1b3e(0x16a)]=_0x8ababd[_0x3b1b3e(0x22a)],_0x445397=_0x4d4aef[_0x3b1b3e(0x1f4)]['current'],_0x4d4aef['node'][_0x3b1b3e(0x16e)]=_0x273779,_0x4549ee[_0x3b1b3e(0x14d)](_0x273779,_0x4d4aef);}try{_0x9aa1fc[_0x1d68b6(0x1b8)]++,_0x9aa1fc['autoExpand']&&_0x9aa1fc[_0x1d68b6(0x17e)][_0x1d68b6(0x1d2)](_0x32ea60);var _0x2dc25c,_0x184e79,_0x140cb9,_0x2da295,_0x85b577=[],_0xd4db4f=[],_0x58e7af,_0x21ea0e=this[_0x1d68b6(0x195)](_0x32ea60),_0x31c51f=_0x21ea0e===_0x1d68b6(0x1c7),_0xa478f8=!0x1,_0x4a0a07=_0x21ea0e==='function',_0x472505=this[_0x1d68b6(0x1b6)](_0x21ea0e),_0x344f89=this[_0x1d68b6(0x1b2)](_0x21ea0e),_0x53dbd6=_0x472505||_0x344f89,_0x2ec43d={},_0x2fab62=0x0,_0xe46250=!0x1,_0x445397,_0x28a421=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x9aa1fc[_0x1d68b6(0x19f)]){if(_0x31c51f){if(_0x184e79=_0x32ea60[_0x1d68b6(0x191)],_0x184e79>_0x9aa1fc[_0x1d68b6(0x182)]){for(_0x140cb9=0x0,_0x2da295=_0x9aa1fc['elements'],_0x2dc25c=_0x140cb9;_0x2dc25c<_0x2da295;_0x2dc25c++)_0xd4db4f[_0x1d68b6(0x1d2)](_0x4549ee[_0x1d68b6(0x1a7)](_0x85b577,_0x32ea60,_0x21ea0e,_0x2dc25c,_0x9aa1fc));_0x571be4['cappedElements']=!0x0;}else{for(_0x140cb9=0x0,_0x2da295=_0x184e79,_0x2dc25c=_0x140cb9;_0x2dc25c<_0x2da295;_0x2dc25c++)_0xd4db4f[_0x1d68b6(0x1d2)](_0x4549ee[_0x1d68b6(0x1a7)](_0x85b577,_0x32ea60,_0x21ea0e,_0x2dc25c,_0x9aa1fc));}_0x9aa1fc[_0x1d68b6(0x1c6)]+=_0xd4db4f['length'];}if(!(_0x21ea0e===_0x1d68b6(0x233)||_0x21ea0e===_0x1d68b6(0x1c1))&&!_0x472505&&_0x21ea0e!=='String'&&_0x21ea0e!==_0x1d68b6(0x181)&&_0x21ea0e!==_0x1d68b6(0x230)){var _0x5991bf=_0x4359e3[_0x1d68b6(0x18d)]||_0x9aa1fc[_0x1d68b6(0x18d)];if(this['_isSet'](_0x32ea60)?(_0x2dc25c=0x0,_0x32ea60[_0x1d68b6(0x207)](function(_0x5e746b){var _0x5d7145=_0x1d68b6;if(_0x2fab62++,_0x9aa1fc['autoExpandPropertyCount']++,_0x2fab62>_0x5991bf){_0xe46250=!0x0;return;}if(!_0x9aa1fc['isExpressionToEvaluate']&&_0x9aa1fc[_0x5d7145(0x18f)]&&_0x9aa1fc[_0x5d7145(0x1c6)]>_0x9aa1fc[_0x5d7145(0x224)]){_0xe46250=!0x0;return;}_0xd4db4f['push'](_0x4549ee[_0x5d7145(0x1a7)](_0x85b577,_0x32ea60,_0x5d7145(0x1e6),_0x2dc25c++,_0x9aa1fc,function(_0x51f42c){return function(){return _0x51f42c;};}(_0x5e746b)));})):this[_0x1d68b6(0x219)](_0x32ea60)&&_0x32ea60['forEach'](function(_0x12df1f,_0x45762a){var _0x48f790=_0x1d68b6;if(_0x2fab62++,_0x9aa1fc[_0x48f790(0x1c6)]++,_0x2fab62>_0x5991bf){_0xe46250=!0x0;return;}if(!_0x9aa1fc[_0x48f790(0x1a8)]&&_0x9aa1fc[_0x48f790(0x18f)]&&_0x9aa1fc[_0x48f790(0x1c6)]>_0x9aa1fc[_0x48f790(0x224)]){_0xe46250=!0x0;return;}var _0x23aa24=_0x45762a[_0x48f790(0x1d3)]();_0x23aa24['length']>0x64&&(_0x23aa24=_0x23aa24[_0x48f790(0x1e1)](0x0,0x64)+'...'),_0xd4db4f[_0x48f790(0x1d2)](_0x4549ee[_0x48f790(0x1a7)](_0x85b577,_0x32ea60,'Map',_0x23aa24,_0x9aa1fc,function(_0x41625a){return function(){return _0x41625a;};}(_0x12df1f)));}),!_0xa478f8){try{for(_0x58e7af in _0x32ea60)if(!(_0x31c51f&&_0x28a421['test'](_0x58e7af))&&!this[_0x1d68b6(0x15f)](_0x32ea60,_0x58e7af,_0x9aa1fc)){if(_0x2fab62++,_0x9aa1fc[_0x1d68b6(0x1c6)]++,_0x2fab62>_0x5991bf){_0xe46250=!0x0;break;}if(!_0x9aa1fc[_0x1d68b6(0x1a8)]&&_0x9aa1fc[_0x1d68b6(0x18f)]&&_0x9aa1fc[_0x1d68b6(0x1c6)]>_0x9aa1fc['autoExpandLimit']){_0xe46250=!0x0;break;}_0xd4db4f[_0x1d68b6(0x1d2)](_0x4549ee['_addObjectProperty'](_0x85b577,_0x2ec43d,_0x32ea60,_0x21ea0e,_0x58e7af,_0x9aa1fc));}}catch{}if(_0x2ec43d[_0x1d68b6(0x21a)]=!0x0,_0x4a0a07&&(_0x2ec43d[_0x1d68b6(0x1bf)]=!0x0),!_0xe46250){var _0x4ba654=[][_0x1d68b6(0x17d)](this[_0x1d68b6(0x20a)](_0x32ea60))[_0x1d68b6(0x17d)](this[_0x1d68b6(0x154)](_0x32ea60));for(_0x2dc25c=0x0,_0x184e79=_0x4ba654[_0x1d68b6(0x191)];_0x2dc25c<_0x184e79;_0x2dc25c++)if(_0x58e7af=_0x4ba654[_0x2dc25c],!(_0x31c51f&&_0x28a421[_0x1d68b6(0x145)](_0x58e7af['toString']()))&&!this[_0x1d68b6(0x15f)](_0x32ea60,_0x58e7af,_0x9aa1fc)&&!_0x2ec43d[_0x1d68b6(0x234)+_0x58e7af[_0x1d68b6(0x1d3)]()]){if(_0x2fab62++,_0x9aa1fc[_0x1d68b6(0x1c6)]++,_0x2fab62>_0x5991bf){_0xe46250=!0x0;break;}if(!_0x9aa1fc['isExpressionToEvaluate']&&_0x9aa1fc[_0x1d68b6(0x18f)]&&_0x9aa1fc[_0x1d68b6(0x1c6)]>_0x9aa1fc[_0x1d68b6(0x224)]){_0xe46250=!0x0;break;}_0xd4db4f[_0x1d68b6(0x1d2)](_0x4549ee['_addObjectProperty'](_0x85b577,_0x2ec43d,_0x32ea60,_0x21ea0e,_0x58e7af,_0x9aa1fc));}}}}}if(_0x571be4[_0x1d68b6(0x200)]=_0x21ea0e,_0x53dbd6?(_0x571be4[_0x1d68b6(0x1ab)]=_0x32ea60[_0x1d68b6(0x176)](),this[_0x1d68b6(0x1d0)](_0x21ea0e,_0x571be4,_0x9aa1fc,_0x4359e3)):_0x21ea0e===_0x1d68b6(0x1fc)?_0x571be4[_0x1d68b6(0x1ab)]=this['_dateToString'][_0x1d68b6(0x1ef)](_0x32ea60):_0x21ea0e==='bigint'?_0x571be4['value']=_0x32ea60[_0x1d68b6(0x1d3)]():_0x21ea0e===_0x1d68b6(0x209)?_0x571be4[_0x1d68b6(0x1ab)]=this[_0x1d68b6(0x18a)][_0x1d68b6(0x1ef)](_0x32ea60):_0x21ea0e===_0x1d68b6(0x1a9)&&this[_0x1d68b6(0x1a6)]?_0x571be4[_0x1d68b6(0x1ab)]=this['_Symbol']['prototype'][_0x1d68b6(0x1d3)][_0x1d68b6(0x1ef)](_0x32ea60):!_0x9aa1fc[_0x1d68b6(0x19f)]&&!(_0x21ea0e===_0x1d68b6(0x233)||_0x21ea0e===_0x1d68b6(0x1c1))&&(delete _0x571be4['value'],_0x571be4['capped']=!0x0),_0xe46250&&(_0x571be4['cappedProps']=!0x0),_0x445397=_0x9aa1fc[_0x1d68b6(0x1f4)][_0x1d68b6(0x16e)],_0x9aa1fc[_0x1d68b6(0x1f4)][_0x1d68b6(0x16e)]=_0x571be4,this[_0x1d68b6(0x14d)](_0x571be4,_0x9aa1fc),_0xd4db4f[_0x1d68b6(0x191)]){for(_0x2dc25c=0x0,_0x184e79=_0xd4db4f['length'];_0x2dc25c<_0x184e79;_0x2dc25c++)_0xd4db4f[_0x2dc25c](_0x2dc25c);}_0x85b577[_0x1d68b6(0x191)]&&(_0x571be4[_0x1d68b6(0x18d)]=_0x85b577);}catch(_0x556d78){_0x218f3c(_0x556d78,_0x571be4,_0x9aa1fc);}return this[_0x1d68b6(0x197)](_0x32ea60,_0x571be4),this[_0x1d68b6(0x16d)](_0x571be4,_0x9aa1fc),_0x9aa1fc[_0x1d68b6(0x1f4)]['current']=_0x445397,_0x9aa1fc[_0x1d68b6(0x1b8)]--,_0x9aa1fc['autoExpand']=_0x4bace5,_0x9aa1fc['autoExpand']&&_0x9aa1fc[_0x1d68b6(0x17e)][_0x1d68b6(0x216)](),_0x571be4;}[_0x81c1f4(0x154)](_0x50ea83){var _0x3e4076=_0x81c1f4;return Object[_0x3e4076(0x1a0)]?Object[_0x3e4076(0x1a0)](_0x50ea83):[];}[_0x81c1f4(0x1c0)](_0x45be33){var _0x2ca65d=_0x81c1f4;return!!(_0x45be33&&_0x4fa39d[_0x2ca65d(0x1e6)]&&this[_0x2ca65d(0x16f)](_0x45be33)===_0x2ca65d(0x1a5)&&_0x45be33[_0x2ca65d(0x207)]);}[_0x81c1f4(0x15f)](_0x2fa3c7,_0x1012a6,_0x55ccff){var _0x5074e7=_0x81c1f4;return _0x55ccff[_0x5074e7(0x20f)]?typeof _0x2fa3c7[_0x1012a6]==_0x5074e7(0x169):!0x1;}['_type'](_0x291592){var _0x41f6a2=_0x81c1f4,_0x5be599='';return _0x5be599=typeof _0x291592,_0x5be599===_0x41f6a2(0x1f2)?this[_0x41f6a2(0x16f)](_0x291592)===_0x41f6a2(0x161)?_0x5be599=_0x41f6a2(0x1c7):this[_0x41f6a2(0x16f)](_0x291592)===_0x41f6a2(0x163)?_0x5be599=_0x41f6a2(0x1fc):this[_0x41f6a2(0x16f)](_0x291592)===_0x41f6a2(0x193)?_0x5be599=_0x41f6a2(0x230):_0x291592===null?_0x5be599=_0x41f6a2(0x233):_0x291592[_0x41f6a2(0x210)]&&(_0x5be599=_0x291592[_0x41f6a2(0x210)][_0x41f6a2(0x206)]||_0x5be599):_0x5be599===_0x41f6a2(0x1c1)&&this[_0x41f6a2(0x1f1)]&&_0x291592 instanceof this[_0x41f6a2(0x1f1)]&&(_0x5be599=_0x41f6a2(0x1b4)),_0x5be599;}[_0x81c1f4(0x16f)](_0x4a63b7){var _0x52703c=_0x81c1f4;return Object['prototype'][_0x52703c(0x1d3)][_0x52703c(0x1ef)](_0x4a63b7);}['_isPrimitiveType'](_0x567457){var _0xc6d766=_0x81c1f4;return _0x567457==='boolean'||_0x567457===_0xc6d766(0x1ff)||_0x567457===_0xc6d766(0x16c);}[_0x81c1f4(0x1b2)](_0x105518){var _0x1c9c27=_0x81c1f4;return _0x105518===_0x1c9c27(0x17a)||_0x105518==='String'||_0x105518==='Number';}[_0x81c1f4(0x1a7)](_0x409651,_0x5527a6,_0x262175,_0x3e4210,_0xfb7cff,_0x47779f){var _0x2ada95=this;return function(_0x1e0d9b){var _0x282c81=_0x2bb1,_0x31e274=_0xfb7cff[_0x282c81(0x1f4)][_0x282c81(0x16e)],_0x336fb1=_0xfb7cff[_0x282c81(0x1f4)][_0x282c81(0x1f5)],_0x32e956=_0xfb7cff[_0x282c81(0x1f4)][_0x282c81(0x227)];_0xfb7cff[_0x282c81(0x1f4)]['parent']=_0x31e274,_0xfb7cff[_0x282c81(0x1f4)][_0x282c81(0x1f5)]=typeof _0x3e4210==_0x282c81(0x16c)?_0x3e4210:_0x1e0d9b,_0x409651[_0x282c81(0x1d2)](_0x2ada95['_property'](_0x5527a6,_0x262175,_0x3e4210,_0xfb7cff,_0x47779f)),_0xfb7cff[_0x282c81(0x1f4)][_0x282c81(0x227)]=_0x32e956,_0xfb7cff[_0x282c81(0x1f4)][_0x282c81(0x1f5)]=_0x336fb1;};}['_addObjectProperty'](_0x155496,_0x4c42ac,_0x488483,_0x3832c2,_0xa5c7ce,_0x19d73a,_0x414a50){var _0x5abcd0=_0x81c1f4,_0x17be4a=this;return _0x4c42ac[_0x5abcd0(0x234)+_0xa5c7ce['toString']()]=!0x0,function(_0x296c48){var _0x57cde0=_0x5abcd0,_0xc84a97=_0x19d73a[_0x57cde0(0x1f4)][_0x57cde0(0x16e)],_0x3e215c=_0x19d73a[_0x57cde0(0x1f4)][_0x57cde0(0x1f5)],_0x38118a=_0x19d73a[_0x57cde0(0x1f4)]['parent'];_0x19d73a[_0x57cde0(0x1f4)][_0x57cde0(0x227)]=_0xc84a97,_0x19d73a[_0x57cde0(0x1f4)][_0x57cde0(0x1f5)]=_0x296c48,_0x155496[_0x57cde0(0x1d2)](_0x17be4a['_property'](_0x488483,_0x3832c2,_0xa5c7ce,_0x19d73a,_0x414a50)),_0x19d73a[_0x57cde0(0x1f4)][_0x57cde0(0x227)]=_0x38118a,_0x19d73a[_0x57cde0(0x1f4)][_0x57cde0(0x1f5)]=_0x3e215c;};}['_property'](_0x1f3d20,_0x21b3b8,_0x1bcfeb,_0x1007ec,_0x536c45){var _0x1b2f99=_0x81c1f4,_0x1b5cc8=this;_0x536c45||(_0x536c45=function(_0x22cb88,_0x7647e1){return _0x22cb88[_0x7647e1];});var _0x8117b3=_0x1bcfeb[_0x1b2f99(0x1d3)](),_0x4f3ce3=_0x1007ec[_0x1b2f99(0x15a)]||{},_0x10f67b=_0x1007ec[_0x1b2f99(0x19f)],_0x45978a=_0x1007ec[_0x1b2f99(0x1a8)];try{var _0x2d0d61=this[_0x1b2f99(0x219)](_0x1f3d20),_0x2de7b2=_0x8117b3;_0x2d0d61&&_0x2de7b2[0x0]==='\\x27'&&(_0x2de7b2=_0x2de7b2[_0x1b2f99(0x16b)](0x1,_0x2de7b2[_0x1b2f99(0x191)]-0x2));var _0x30f9eb=_0x1007ec['expressionsToEvaluate']=_0x4f3ce3['_p_'+_0x2de7b2];_0x30f9eb&&(_0x1007ec['depth']=_0x1007ec[_0x1b2f99(0x19f)]+0x1),_0x1007ec['isExpressionToEvaluate']=!!_0x30f9eb;var _0x1c257e=typeof _0x1bcfeb==_0x1b2f99(0x1a9),_0x52374c={'name':_0x1c257e||_0x2d0d61?_0x8117b3:this[_0x1b2f99(0x1de)](_0x8117b3)};if(_0x1c257e&&(_0x52374c['symbol']=!0x0),!(_0x21b3b8===_0x1b2f99(0x1c7)||_0x21b3b8===_0x1b2f99(0x231))){var _0x36e265=this[_0x1b2f99(0x208)](_0x1f3d20,_0x1bcfeb);if(_0x36e265&&(_0x36e265[_0x1b2f99(0x1be)]&&(_0x52374c[_0x1b2f99(0x151)]=!0x0),_0x36e265[_0x1b2f99(0x21b)]&&!_0x30f9eb&&!_0x1007ec['resolveGetters']))return _0x52374c['getter']=!0x0,this[_0x1b2f99(0x1e3)](_0x52374c,_0x1007ec),_0x52374c;}var _0x3b3b1c;try{_0x3b3b1c=_0x536c45(_0x1f3d20,_0x1bcfeb);}catch(_0x1eb619){return _0x52374c={'name':_0x8117b3,'type':_0x1b2f99(0x1bb),'error':_0x1eb619[_0x1b2f99(0x22a)]},this['_processTreeNodeResult'](_0x52374c,_0x1007ec),_0x52374c;}var _0x3b34a8=this[_0x1b2f99(0x195)](_0x3b3b1c),_0x48b401=this[_0x1b2f99(0x1b6)](_0x3b34a8);if(_0x52374c[_0x1b2f99(0x200)]=_0x3b34a8,_0x48b401)this[_0x1b2f99(0x1e3)](_0x52374c,_0x1007ec,_0x3b3b1c,function(){var _0x5c7e2d=_0x1b2f99;_0x52374c[_0x5c7e2d(0x1ab)]=_0x3b3b1c[_0x5c7e2d(0x176)](),!_0x30f9eb&&_0x1b5cc8[_0x5c7e2d(0x1d0)](_0x3b34a8,_0x52374c,_0x1007ec,{});});else{var _0x569ff4=_0x1007ec[_0x1b2f99(0x18f)]&&_0x1007ec['level']<_0x1007ec[_0x1b2f99(0x1ec)]&&_0x1007ec[_0x1b2f99(0x17e)]['indexOf'](_0x3b3b1c)<0x0&&_0x3b34a8!=='function'&&_0x1007ec[_0x1b2f99(0x1c6)]<_0x1007ec[_0x1b2f99(0x224)];_0x569ff4||_0x1007ec['level']<_0x10f67b||_0x30f9eb?(this[_0x1b2f99(0x194)](_0x52374c,_0x3b3b1c,_0x1007ec,_0x30f9eb||{}),this[_0x1b2f99(0x197)](_0x3b3b1c,_0x52374c)):this[_0x1b2f99(0x1e3)](_0x52374c,_0x1007ec,_0x3b3b1c,function(){var _0x10ff7a=_0x1b2f99;_0x3b34a8==='null'||_0x3b34a8==='undefined'||(delete _0x52374c[_0x10ff7a(0x1ab)],_0x52374c[_0x10ff7a(0x19a)]=!0x0);});}return _0x52374c;}finally{_0x1007ec[_0x1b2f99(0x15a)]=_0x4f3ce3,_0x1007ec[_0x1b2f99(0x19f)]=_0x10f67b,_0x1007ec[_0x1b2f99(0x1a8)]=_0x45978a;}}['_capIfString'](_0xb25b81,_0x150418,_0x28085f,_0x4bb33c){var _0x3df714=_0x81c1f4,_0x5bbdde=_0x4bb33c[_0x3df714(0x1f0)]||_0x28085f[_0x3df714(0x1f0)];if((_0xb25b81===_0x3df714(0x1ff)||_0xb25b81===_0x3df714(0x1b7))&&_0x150418['value']){let _0x507319=_0x150418[_0x3df714(0x1ab)][_0x3df714(0x191)];_0x28085f[_0x3df714(0x1c9)]+=_0x507319,_0x28085f[_0x3df714(0x1c9)]>_0x28085f[_0x3df714(0x1e5)]?(_0x150418[_0x3df714(0x19a)]='',delete _0x150418[_0x3df714(0x1ab)]):_0x507319>_0x5bbdde&&(_0x150418[_0x3df714(0x19a)]=_0x150418['value']['substr'](0x0,_0x5bbdde),delete _0x150418[_0x3df714(0x1ab)]);}}[_0x81c1f4(0x219)](_0x29f3be){var _0x9d318b=_0x81c1f4;return!!(_0x29f3be&&_0x4fa39d[_0x9d318b(0x15c)]&&this[_0x9d318b(0x16f)](_0x29f3be)==='[object\\x20Map]'&&_0x29f3be['forEach']);}[_0x81c1f4(0x1de)](_0x2b27f3){var _0x473adf=_0x81c1f4;if(_0x2b27f3[_0x473adf(0x173)](/^\\d+$/))return _0x2b27f3;var _0x3274af;try{_0x3274af=JSON['stringify'](''+_0x2b27f3);}catch{_0x3274af='\\x22'+this[_0x473adf(0x16f)](_0x2b27f3)+'\\x22';}return _0x3274af[_0x473adf(0x173)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x3274af=_0x3274af[_0x473adf(0x16b)](0x1,_0x3274af['length']-0x2):_0x3274af=_0x3274af[_0x473adf(0x203)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x473adf(0x203)](/(^\"|\"$)/g,'\\x27'),_0x3274af;}[_0x81c1f4(0x1e3)](_0x2112ac,_0x29d67a,_0x2829b0,_0x469d7b){var _0x288dfc=_0x81c1f4;this[_0x288dfc(0x14d)](_0x2112ac,_0x29d67a),_0x469d7b&&_0x469d7b(),this['_additionalMetadata'](_0x2829b0,_0x2112ac),this['_treeNodePropertiesAfterFullValue'](_0x2112ac,_0x29d67a);}[_0x81c1f4(0x14d)](_0x5dcfb1,_0x10725c){var _0x5b45e0=_0x81c1f4;this[_0x5b45e0(0x215)](_0x5dcfb1,_0x10725c),this['_setNodeQueryPath'](_0x5dcfb1,_0x10725c),this[_0x5b45e0(0x22b)](_0x5dcfb1,_0x10725c),this[_0x5b45e0(0x1fe)](_0x5dcfb1,_0x10725c);}['_setNodeId'](_0x2e1b83,_0x47bbff){}[_0x81c1f4(0x214)](_0x5b10cb,_0x318068){}[_0x81c1f4(0x1f7)](_0x28538f,_0x7df4ce){}['_isUndefined'](_0x3d48f0){var _0x4b322b=_0x81c1f4;return _0x3d48f0===this[_0x4b322b(0x1eb)];}[_0x81c1f4(0x16d)](_0x44e37c,_0x1ef9c7){var _0x104b04=_0x81c1f4;this[_0x104b04(0x1f7)](_0x44e37c,_0x1ef9c7),this[_0x104b04(0x1cd)](_0x44e37c),_0x1ef9c7[_0x104b04(0x1c5)]&&this[_0x104b04(0x1da)](_0x44e37c),this[_0x104b04(0x202)](_0x44e37c,_0x1ef9c7),this[_0x104b04(0x21c)](_0x44e37c,_0x1ef9c7),this['_cleanNode'](_0x44e37c);}[_0x81c1f4(0x197)](_0x25acc4,_0x2a21e6){var _0x2810c4=_0x81c1f4;let _0x2bda1d;try{_0x4fa39d['console']&&(_0x2bda1d=_0x4fa39d[_0x2810c4(0x213)][_0x2810c4(0x16a)],_0x4fa39d[_0x2810c4(0x213)][_0x2810c4(0x16a)]=function(){}),_0x25acc4&&typeof _0x25acc4[_0x2810c4(0x191)]=='number'&&(_0x2a21e6[_0x2810c4(0x191)]=_0x25acc4[_0x2810c4(0x191)]);}catch{}finally{_0x2bda1d&&(_0x4fa39d[_0x2810c4(0x213)][_0x2810c4(0x16a)]=_0x2bda1d);}if(_0x2a21e6[_0x2810c4(0x200)]==='number'||_0x2a21e6[_0x2810c4(0x200)]===_0x2810c4(0x177)){if(isNaN(_0x2a21e6[_0x2810c4(0x1ab)]))_0x2a21e6[_0x2810c4(0x1e4)]=!0x0,delete _0x2a21e6[_0x2810c4(0x1ab)];else switch(_0x2a21e6[_0x2810c4(0x1ab)]){case Number[_0x2810c4(0x192)]:_0x2a21e6['positiveInfinity']=!0x0,delete _0x2a21e6['value'];break;case Number['NEGATIVE_INFINITY']:_0x2a21e6[_0x2810c4(0x222)]=!0x0,delete _0x2a21e6[_0x2810c4(0x1ab)];break;case 0x0:this[_0x2810c4(0x1ac)](_0x2a21e6[_0x2810c4(0x1ab)])&&(_0x2a21e6[_0x2810c4(0x172)]=!0x0);break;}}else _0x2a21e6[_0x2810c4(0x200)]===_0x2810c4(0x169)&&typeof _0x25acc4[_0x2810c4(0x206)]==_0x2810c4(0x1ff)&&_0x25acc4[_0x2810c4(0x206)]&&_0x2a21e6[_0x2810c4(0x206)]&&_0x25acc4[_0x2810c4(0x206)]!==_0x2a21e6[_0x2810c4(0x206)]&&(_0x2a21e6[_0x2810c4(0x1fb)]=_0x25acc4[_0x2810c4(0x206)]);}[_0x81c1f4(0x1ac)](_0xf3b42e){var _0xaca8f3=_0x81c1f4;return 0x1/_0xf3b42e===Number[_0xaca8f3(0x212)];}[_0x81c1f4(0x1da)](_0x10690e){var _0xe025d8=_0x81c1f4;!_0x10690e[_0xe025d8(0x18d)]||!_0x10690e[_0xe025d8(0x18d)][_0xe025d8(0x191)]||_0x10690e[_0xe025d8(0x200)]==='array'||_0x10690e[_0xe025d8(0x200)]==='Map'||_0x10690e[_0xe025d8(0x200)]===_0xe025d8(0x1e6)||_0x10690e[_0xe025d8(0x18d)][_0xe025d8(0x211)](function(_0x5eb8fa,_0x331cd2){var _0x2ef577=_0xe025d8,_0x16f5b6=_0x5eb8fa[_0x2ef577(0x206)][_0x2ef577(0x1d6)](),_0x537a06=_0x331cd2[_0x2ef577(0x206)][_0x2ef577(0x1d6)]();return _0x16f5b6<_0x537a06?-0x1:_0x16f5b6>_0x537a06?0x1:0x0;});}['_addFunctionsNode'](_0x447d5b,_0x2cdb82){var _0x165d60=_0x81c1f4;if(!(_0x2cdb82['noFunctions']||!_0x447d5b[_0x165d60(0x18d)]||!_0x447d5b[_0x165d60(0x18d)][_0x165d60(0x191)])){for(var _0x479467=[],_0x50ef25=[],_0x5668c0=0x0,_0x4ba6de=_0x447d5b[_0x165d60(0x18d)][_0x165d60(0x191)];_0x5668c0<_0x4ba6de;_0x5668c0++){var _0x1e6688=_0x447d5b['props'][_0x5668c0];_0x1e6688[_0x165d60(0x200)]==='function'?_0x479467[_0x165d60(0x1d2)](_0x1e6688):_0x50ef25[_0x165d60(0x1d2)](_0x1e6688);}if(!(!_0x50ef25[_0x165d60(0x191)]||_0x479467[_0x165d60(0x191)]<=0x1)){_0x447d5b[_0x165d60(0x18d)]=_0x50ef25;var _0x4e4718={'functionsNode':!0x0,'props':_0x479467};this[_0x165d60(0x215)](_0x4e4718,_0x2cdb82),this[_0x165d60(0x1f7)](_0x4e4718,_0x2cdb82),this[_0x165d60(0x1cd)](_0x4e4718),this[_0x165d60(0x1fe)](_0x4e4718,_0x2cdb82),_0x4e4718['id']+='\\x20f',_0x447d5b[_0x165d60(0x18d)]['unshift'](_0x4e4718);}}}[_0x81c1f4(0x21c)](_0x4a34ed,_0x47178b){}[_0x81c1f4(0x1cd)](_0x4f2967){}[_0x81c1f4(0x188)](_0x194934){var _0x2a6093=_0x81c1f4;return Array['isArray'](_0x194934)||typeof _0x194934==_0x2a6093(0x1f2)&&this[_0x2a6093(0x16f)](_0x194934)===_0x2a6093(0x161);}['_setNodePermissions'](_0x2316a0,_0x885bbb){}[_0x81c1f4(0x171)](_0x232b7c){var _0x1c48d3=_0x81c1f4;delete _0x232b7c[_0x1c48d3(0x1d4)],delete _0x232b7c[_0x1c48d3(0x1a4)],delete _0x232b7c['_hasMapOnItsPath'];}[_0x81c1f4(0x22b)](_0x5f072c,_0x466b9e){}}let _0x5d088b=new _0x530322(),_0x1938f9={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x2c77ee={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x500cd8(_0x4dd8c6,_0x98d367,_0x4f9734,_0x40f9d7,_0x304e2c,_0x4d1d3c){var _0x32e8d4=_0x81c1f4;let _0xcff033,_0x5ce033;try{_0x5ce033=_0x5c2c54(),_0xcff033=_0x4b2ca2[_0x98d367],!_0xcff033||_0x5ce033-_0xcff033['ts']>0x1f4&&_0xcff033['count']&&_0xcff033[_0x32e8d4(0x14b)]/_0xcff033[_0x32e8d4(0x179)]<0x64?(_0x4b2ca2[_0x98d367]=_0xcff033={'count':0x0,'time':0x0,'ts':_0x5ce033},_0x4b2ca2[_0x32e8d4(0x201)]={}):_0x5ce033-_0x4b2ca2['hits']['ts']>0x32&&_0x4b2ca2['hits']['count']&&_0x4b2ca2[_0x32e8d4(0x201)]['time']/_0x4b2ca2[_0x32e8d4(0x201)][_0x32e8d4(0x179)]<0x64&&(_0x4b2ca2[_0x32e8d4(0x201)]={});let _0x92f69c=[],_0x31e715=_0xcff033['reduceLimits']||_0x4b2ca2[_0x32e8d4(0x201)][_0x32e8d4(0x178)]?_0x2c77ee:_0x1938f9,_0x261c05=_0xe59fb3=>{var _0x15358d=_0x32e8d4;let _0xc9e66c={};return _0xc9e66c['props']=_0xe59fb3['props'],_0xc9e66c[_0x15358d(0x182)]=_0xe59fb3[_0x15358d(0x182)],_0xc9e66c[_0x15358d(0x1f0)]=_0xe59fb3[_0x15358d(0x1f0)],_0xc9e66c[_0x15358d(0x1e5)]=_0xe59fb3[_0x15358d(0x1e5)],_0xc9e66c['autoExpandLimit']=_0xe59fb3[_0x15358d(0x224)],_0xc9e66c['autoExpandMaxDepth']=_0xe59fb3[_0x15358d(0x1ec)],_0xc9e66c[_0x15358d(0x1c5)]=!0x1,_0xc9e66c[_0x15358d(0x20f)]=!_0x5536a9,_0xc9e66c[_0x15358d(0x19f)]=0x1,_0xc9e66c['level']=0x0,_0xc9e66c[_0x15358d(0x1bd)]='root_exp_id',_0xc9e66c[_0x15358d(0x150)]=_0x15358d(0x19e),_0xc9e66c[_0x15358d(0x18f)]=!0x0,_0xc9e66c[_0x15358d(0x17e)]=[],_0xc9e66c[_0x15358d(0x1c6)]=0x0,_0xc9e66c['resolveGetters']=!0x0,_0xc9e66c[_0x15358d(0x1c9)]=0x0,_0xc9e66c[_0x15358d(0x1f4)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0xc9e66c;};for(var _0x5e1749=0x0;_0x5e1749<_0x304e2c['length'];_0x5e1749++)_0x92f69c[_0x32e8d4(0x1d2)](_0x5d088b[_0x32e8d4(0x194)]({'timeNode':_0x4dd8c6===_0x32e8d4(0x14b)||void 0x0},_0x304e2c[_0x5e1749],_0x261c05(_0x31e715),{}));if(_0x4dd8c6===_0x32e8d4(0x156)){let _0x455f02=Error[_0x32e8d4(0x187)];try{Error['stackTraceLimit']=0x1/0x0,_0x92f69c[_0x32e8d4(0x1d2)](_0x5d088b[_0x32e8d4(0x194)]({'stackNode':!0x0},new Error()[_0x32e8d4(0x1d9)],_0x261c05(_0x31e715),{'strLength':0x1/0x0}));}finally{Error[_0x32e8d4(0x187)]=_0x455f02;}}return{'method':_0x32e8d4(0x21e),'version':_0x300c3e,'args':[{'ts':_0x4f9734,'session':_0x40f9d7,'args':_0x92f69c,'id':_0x98d367,'context':_0x4d1d3c}]};}catch(_0x241259){return{'method':_0x32e8d4(0x21e),'version':_0x300c3e,'args':[{'ts':_0x4f9734,'session':_0x40f9d7,'args':[{'type':_0x32e8d4(0x1bb),'error':_0x241259&&_0x241259['message']}],'id':_0x98d367,'context':_0x4d1d3c}]};}finally{try{if(_0xcff033&&_0x5ce033){let _0x441863=_0x5c2c54();_0xcff033[_0x32e8d4(0x179)]++,_0xcff033[_0x32e8d4(0x14b)]+=_0x3c7eb1(_0x5ce033,_0x441863),_0xcff033['ts']=_0x441863,_0x4b2ca2['hits'][_0x32e8d4(0x179)]++,_0x4b2ca2[_0x32e8d4(0x201)][_0x32e8d4(0x14b)]+=_0x3c7eb1(_0x5ce033,_0x441863),_0x4b2ca2[_0x32e8d4(0x201)]['ts']=_0x441863,(_0xcff033[_0x32e8d4(0x179)]>0x32||_0xcff033['time']>0x64)&&(_0xcff033[_0x32e8d4(0x178)]=!0x0),(_0x4b2ca2['hits'][_0x32e8d4(0x179)]>0x3e8||_0x4b2ca2[_0x32e8d4(0x201)]['time']>0x12c)&&(_0x4b2ca2[_0x32e8d4(0x201)]['reduceLimits']=!0x0);}}catch{}}}return _0x500cd8;}((_0x444e5b,_0x2393f1,_0x32449a,_0xdbd908,_0x46132a,_0x18a8dc,_0x190294,_0x3512d4,_0x4e3518,_0x320979,_0x57ce60)=>{var _0x5a6cb2=_0x305561;if(_0x444e5b['_console_ninja'])return _0x444e5b['_console_ninja'];if(!X(_0x444e5b,_0x3512d4,_0x46132a))return _0x444e5b['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x444e5b[_0x5a6cb2(0x146)];let _0x1939e4=b(_0x444e5b),_0x5a39bd=_0x1939e4['elapsed'],_0x113075=_0x1939e4[_0x5a6cb2(0x1d8)],_0x5d410d=_0x1939e4[_0x5a6cb2(0x17b)],_0x37e74a={'hits':{},'ts':{}},_0x44cdfc=H(_0x444e5b,_0x4e3518,_0x37e74a,_0x18a8dc),_0x4d0e09=_0x5f1595=>{_0x37e74a['ts'][_0x5f1595]=_0x113075();},_0x409c29=(_0x5badde,_0x2c57cb)=>{let _0x1c4710=_0x37e74a['ts'][_0x2c57cb];if(delete _0x37e74a['ts'][_0x2c57cb],_0x1c4710){let _0x45ba17=_0x5a39bd(_0x1c4710,_0x113075());_0x4aa1e7(_0x44cdfc('time',_0x5badde,_0x5d410d(),_0x3e17a7,[_0x45ba17],_0x2c57cb));}},_0xc7e1e=_0xb9cbfa=>(_0x46132a===_0x5a6cb2(0x167)&&_0x444e5b['origin']&&_0xb9cbfa?.[_0x5a6cb2(0x148)]?.[_0x5a6cb2(0x191)]&&(_0xb9cbfa[_0x5a6cb2(0x148)][0x0]['origin']=_0x444e5b['origin']),_0xb9cbfa);_0x444e5b[_0x5a6cb2(0x146)]={'consoleLog':(_0x244751,_0x3db239)=>{var _0x17bac8=_0x5a6cb2;_0x444e5b[_0x17bac8(0x213)]['log'][_0x17bac8(0x206)]!==_0x17bac8(0x1d7)&&_0x4aa1e7(_0x44cdfc(_0x17bac8(0x21e),_0x244751,_0x5d410d(),_0x3e17a7,_0x3db239));},'consoleTrace':(_0x5d0e12,_0x5436f9)=>{var _0xac15e9=_0x5a6cb2;_0x444e5b[_0xac15e9(0x213)][_0xac15e9(0x21e)][_0xac15e9(0x206)]!==_0xac15e9(0x180)&&_0x4aa1e7(_0xc7e1e(_0x44cdfc(_0xac15e9(0x156),_0x5d0e12,_0x5d410d(),_0x3e17a7,_0x5436f9)));},'consoleTime':_0x458739=>{_0x4d0e09(_0x458739);},'consoleTimeEnd':(_0x461cfc,_0x56175e)=>{_0x409c29(_0x56175e,_0x461cfc);},'autoLog':(_0x486dee,_0xba8894)=>{var _0x408621=_0x5a6cb2;_0x4aa1e7(_0x44cdfc(_0x408621(0x21e),_0xba8894,_0x5d410d(),_0x3e17a7,[_0x486dee]));},'autoLogMany':(_0x181144,_0x155a01)=>{var _0x3a5460=_0x5a6cb2;_0x4aa1e7(_0x44cdfc(_0x3a5460(0x21e),_0x181144,_0x5d410d(),_0x3e17a7,_0x155a01));},'autoTrace':(_0x2d23b9,_0x2d8146)=>{_0x4aa1e7(_0xc7e1e(_0x44cdfc('trace',_0x2d8146,_0x5d410d(),_0x3e17a7,[_0x2d23b9])));},'autoTraceMany':(_0x32ec77,_0x1d87c1)=>{var _0x16606f=_0x5a6cb2;_0x4aa1e7(_0xc7e1e(_0x44cdfc(_0x16606f(0x156),_0x32ec77,_0x5d410d(),_0x3e17a7,_0x1d87c1)));},'autoTime':(_0x2d6af8,_0x381136,_0x334e90)=>{_0x4d0e09(_0x334e90);},'autoTimeEnd':(_0x1f57c6,_0x16e755,_0x5cb5aa)=>{_0x409c29(_0x16e755,_0x5cb5aa);},'coverage':_0x365e4e=>{var _0xffb82=_0x5a6cb2;_0x4aa1e7({'method':_0xffb82(0x152),'version':_0x18a8dc,'args':[{'id':_0x365e4e}]});}};let _0x4aa1e7=q(_0x444e5b,_0x2393f1,_0x32449a,_0xdbd908,_0x46132a,_0x320979,_0x57ce60),_0x3e17a7=_0x444e5b[_0x5a6cb2(0x232)];return _0x444e5b[_0x5a6cb2(0x146)];})(globalThis,_0x305561(0x149),_0x305561(0x183),_0x305561(0x22f),'webpack',_0x305561(0x20c),'1714379724943',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],_0x305561(0x19d),'',_0x305561(0x1b0));");
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