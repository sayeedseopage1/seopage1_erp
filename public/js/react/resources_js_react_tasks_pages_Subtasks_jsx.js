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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x3349(){var _0x5b1e55=['unref','set','_hasSetOnItsPath','1478090nErLhU','global','strLength','[object\\x20Date]','location','_getOwnPropertyNames','_attemptToReconnectShortly','autoExpandPropertyCount','_p_','serialize','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','_setNodeQueryPath','stringify','hrtime','logger\\x20websocket\\x20error','_isUndefined','NEXT_RUNTIME','expressionsToEvaluate','catch','dockerizedApp','_inBrowser','current','time','_sendErrorMessage','isArray','hostname','onclose','stackTraceLimit','call','negativeInfinity','_additionalMetadata','9624ejzwia','defineProperty','HTMLAllCollection','_type','valueOf','origin','_keyStrRegExp','14pJLLQA','_isPrimitiveWrapperType','_connectAttemptCount','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','cappedElements','Error','NEGATIVE_INFINITY','index','_HTMLAllCollection','_addLoadNode','_getOwnPropertyDescriptor','_isArray','_treeNodePropertiesAfterFullValue','capped','node','127.0.0.1','versions','cappedProps','parse','42KehWwy','type','next.js','length','...','_objectToString','map','_undefined','rootExpression','allStrLength','test','_isSet','9bMUgid','RegExp','1','astro','_connectToHostNow','_setNodeId','console','send','elapsed','name','unshift','port','data','Set','reduceLimits','178299oTxspT','_property','_connecting','','root_exp_id','elements','ws/index.js','warn','count','getWebSocketClass','parent','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','replace','[object\\x20Set]','onmessage','_hasSymbolPropertyOnItsPath','_allowedToSend','https://tinyurl.com/37x8b79t','onerror','Map','number','1183','_console_ninja_session','autoExpandLimit','string','ws://','unknown','charAt','match','_setNodeExpressionPath','_isMap','readyState','substr','_disposeWebsocket','_regExpToString','host','root_exp','_isPrimitiveType','_addProperty','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','44xFAaRs','funcName','resolveGetters','symbol','Number','__es'+'Module','_setNodeLabel','array','error','boolean','_maxConnectAttemptCount','3718jcdYHS','then','_Symbol','toUpperCase','getter','eventReceivedCallback','bigint','process','6181cezSQZ','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','log','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','path','_hasMapOnItsPath','indexOf','_isNegativeZero','_p_name','undefined','get','_addObjectProperty','value','_p_length','_addFunctionsNode','_webSocketErrorDocsLink','null','','onopen','getOwnPropertyNames','autoExpandMaxDepth','\\x20server','autoExpand','object','edge','bind','_treeNodePropertiesBeforeFullValue','message','nodeModules','performance','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','forEach','String','473624AuvuFR','autoExpandPreviousObjects','[object\\x20Array]','url','Buffer','trace','nan','totalStrLength','_ws','_allowedToConnectOnSend','stack','concat','push','_capIfString','enumerable','level','constructor','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_setNodeExpandableState','getOwnPropertyDescriptor','_propertyName','positiveInfinity','1716266799508','nuxt','toLowerCase','getOwnPropertySymbols','sortProps','props','40880bOSrZr','sort','_numberRegExp','_socket','coverage','env','hits','toString','_console_ninja','disabledTrace','prototype','_inNextEdge','_blacklistedProperty','join','_sortProps','args','[object\\x20BigInt]','WebSocket','pathToFileURL','154705eCNpQA','depth','date','isExpressionToEvaluate','default','reload','_WebSocketClass','now','_dateToString','timeStamp','Symbol','_consoleNinjaAllowedToStart','_reconnectTimeout','_setNodePermissions','pop','_WebSocket','getPrototypeOf','noFunctions','_processTreeNodeResult','_cleanNode','negativeZero','function','_getOwnPropertySymbols','_connected'];_0x3349=function(){return _0x5b1e55;};return _0x3349();}var _0x4626ea=_0x9226;(function(_0x1b9b78,_0x56b01c){var _0x52900b=_0x9226,_0x178b03=_0x1b9b78();while(!![]){try{var _0x49bc64=-parseInt(_0x52900b(0x14c))/0x1+parseInt(_0x52900b(0x1a0))/0x2*(parseInt(_0x52900b(0x1ce))/0x3)+-parseInt(_0x52900b(0x1f6))/0x4*(-parseInt(_0x52900b(0x15f))/0x5)+parseInt(_0x52900b(0x1b3))/0x6*(-parseInt(_0x52900b(0x209))/0x7)+-parseInt(_0x52900b(0x130))/0x8+parseInt(_0x52900b(0x1bf))/0x9*(-parseInt(_0x52900b(0x17a))/0xa)+-parseInt(_0x52900b(0x201))/0xb*(parseInt(_0x52900b(0x199))/0xc);if(_0x49bc64===_0x56b01c)break;else _0x178b03['push'](_0x178b03['shift']());}catch(_0x1e0ecd){_0x178b03['push'](_0x178b03['shift']());}}}(_0x3349,0x38741));function _0x9226(_0x38f77e,_0x58c5f7){var _0x334989=_0x3349();return _0x9226=function(_0x92266e,_0x2fe33a){_0x92266e=_0x92266e-0x110;var _0x228356=_0x334989[_0x92266e];return _0x228356;},_0x9226(_0x38f77e,_0x58c5f7);}var K=Object['create'],Q=Object[_0x4626ea(0x19a)],G=Object[_0x4626ea(0x143)],ee=Object['getOwnPropertyNames'],te=Object[_0x4626ea(0x16f)],ne=Object['prototype']['hasOwnProperty'],re=(_0x180195,_0x3e7da9,_0x595410,_0x45ea86)=>{var _0x434783=_0x4626ea;if(_0x3e7da9&&typeof _0x3e7da9==_0x434783(0x126)||typeof _0x3e7da9=='function'){for(let _0x3e923e of ee(_0x3e7da9))!ne[_0x434783(0x196)](_0x180195,_0x3e923e)&&_0x3e923e!==_0x595410&&Q(_0x180195,_0x3e923e,{'get':()=>_0x3e7da9[_0x3e923e],'enumerable':!(_0x45ea86=G(_0x3e7da9,_0x3e923e))||_0x45ea86[_0x434783(0x13e)]});}return _0x180195;},V=(_0x3190cc,_0x4f2f53,_0x467908)=>(_0x467908=_0x3190cc!=null?K(te(_0x3190cc)):{},re(_0x4f2f53||!_0x3190cc||!_0x3190cc[_0x4626ea(0x1fb)]?Q(_0x467908,'default',{'value':_0x3190cc,'enumerable':!0x0}):_0x467908,_0x3190cc)),x=class{constructor(_0x3d2130,_0xfa9df8,_0x4fc95f,_0x41783b,_0x2cbdbf,_0x46faa0){var _0x36ecf1=_0x4626ea,_0x1aaeea,_0x483bda,_0x4f2f8a,_0x116edb;this[_0x36ecf1(0x17b)]=_0x3d2130,this['host']=_0xfa9df8,this['port']=_0x4fc95f,this[_0x36ecf1(0x12b)]=_0x41783b,this[_0x36ecf1(0x18d)]=_0x2cbdbf,this[_0x36ecf1(0x206)]=_0x46faa0,this['_allowedToSend']=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x36ecf1(0x176)]=!0x1,this[_0x36ecf1(0x1d0)]=!0x1,this[_0x36ecf1(0x157)]=((_0x483bda=(_0x1aaeea=_0x3d2130[_0x36ecf1(0x208)])==null?void 0x0:_0x1aaeea['env'])==null?void 0x0:_0x483bda[_0x36ecf1(0x18a)])===_0x36ecf1(0x127),this[_0x36ecf1(0x18e)]=!((_0x116edb=(_0x4f2f8a=this[_0x36ecf1(0x17b)][_0x36ecf1(0x208)])==null?void 0x0:_0x4f2f8a[_0x36ecf1(0x1b0)])!=null&&_0x116edb[_0x36ecf1(0x1ae)])&&!this[_0x36ecf1(0x157)],this[_0x36ecf1(0x165)]=null,this[_0x36ecf1(0x1a2)]=0x0,this[_0x36ecf1(0x200)]=0x14,this['_webSocketErrorDocsLink']=_0x36ecf1(0x1df),this[_0x36ecf1(0x191)]=(this[_0x36ecf1(0x18e)]?_0x36ecf1(0x110):_0x36ecf1(0x1f5))+this[_0x36ecf1(0x11e)];}async['getWebSocketClass'](){var _0x46068b=_0x4626ea,_0xb4e591,_0x570dbb;if(this[_0x46068b(0x165)])return this['_WebSocketClass'];let _0x14235a;if(this[_0x46068b(0x18e)]||this[_0x46068b(0x157)])_0x14235a=this['global'][_0x46068b(0x15d)];else{if((_0xb4e591=this[_0x46068b(0x17b)][_0x46068b(0x208)])!=null&&_0xb4e591[_0x46068b(0x16e)])_0x14235a=(_0x570dbb=this[_0x46068b(0x17b)]['process'])==null?void 0x0:_0x570dbb[_0x46068b(0x16e)];else try{let _0x1fc366=await import(_0x46068b(0x113));_0x14235a=(await import((await import(_0x46068b(0x133)))[_0x46068b(0x15e)](_0x1fc366[_0x46068b(0x159)](this[_0x46068b(0x12b)],_0x46068b(0x1d4)))[_0x46068b(0x153)]()))[_0x46068b(0x163)];}catch{try{_0x14235a=require(require(_0x46068b(0x113))[_0x46068b(0x159)](this['nodeModules'],'ws'));}catch{throw new Error(_0x46068b(0x141));}}}return this[_0x46068b(0x165)]=_0x14235a,_0x14235a;}['_connectToHostNow'](){var _0x5e8c7d=_0x4626ea;this[_0x5e8c7d(0x1d0)]||this[_0x5e8c7d(0x176)]||this[_0x5e8c7d(0x1a2)]>=this[_0x5e8c7d(0x200)]||(this[_0x5e8c7d(0x139)]=!0x1,this[_0x5e8c7d(0x1d0)]=!0x0,this[_0x5e8c7d(0x1a2)]++,this[_0x5e8c7d(0x138)]=new Promise((_0x13021b,_0x3fd202)=>{var _0x1f0f27=_0x5e8c7d;this[_0x1f0f27(0x1d7)]()[_0x1f0f27(0x202)](_0x31566d=>{var _0x536e64=_0x1f0f27;let _0x52cfe0=new _0x31566d(_0x536e64(0x1e7)+(!this['_inBrowser']&&this[_0x536e64(0x18d)]?'gateway.docker.internal':this[_0x536e64(0x1f1)])+':'+this[_0x536e64(0x1ca)]);_0x52cfe0[_0x536e64(0x1e0)]=()=>{var _0x4700a0=_0x536e64;this[_0x4700a0(0x1de)]=!0x1,this[_0x4700a0(0x1ef)](_0x52cfe0),this[_0x4700a0(0x180)](),_0x3fd202(new Error(_0x4700a0(0x188)));},_0x52cfe0[_0x536e64(0x121)]=()=>{var _0x42dbbf=_0x536e64;this[_0x42dbbf(0x18e)]||_0x52cfe0[_0x42dbbf(0x14f)]&&_0x52cfe0[_0x42dbbf(0x14f)][_0x42dbbf(0x177)]&&_0x52cfe0[_0x42dbbf(0x14f)]['unref'](),_0x13021b(_0x52cfe0);},_0x52cfe0[_0x536e64(0x194)]=()=>{var _0x4466c7=_0x536e64;this[_0x4466c7(0x139)]=!0x0,this[_0x4466c7(0x1ef)](_0x52cfe0),this[_0x4466c7(0x180)]();},_0x52cfe0[_0x536e64(0x1dc)]=_0x5152b8=>{var _0x2eaf79=_0x536e64;try{if(!(_0x5152b8!=null&&_0x5152b8[_0x2eaf79(0x1cb)])||!this[_0x2eaf79(0x206)])return;let _0x2eda32=JSON[_0x2eaf79(0x1b2)](_0x5152b8['data']);this[_0x2eaf79(0x206)](_0x2eda32['method'],_0x2eda32['args'],this[_0x2eaf79(0x17b)],this[_0x2eaf79(0x18e)]);}catch{}};})[_0x1f0f27(0x202)](_0xe49ea5=>(this[_0x1f0f27(0x176)]=!0x0,this[_0x1f0f27(0x1d0)]=!0x1,this[_0x1f0f27(0x139)]=!0x1,this[_0x1f0f27(0x1de)]=!0x0,this[_0x1f0f27(0x1a2)]=0x0,_0xe49ea5))[_0x1f0f27(0x18c)](_0x516dfd=>(this['_connected']=!0x1,this[_0x1f0f27(0x1d0)]=!0x1,console[_0x1f0f27(0x1d5)](_0x1f0f27(0x112)+this[_0x1f0f27(0x11e)]),_0x3fd202(new Error(_0x1f0f27(0x12d)+(_0x516dfd&&_0x516dfd[_0x1f0f27(0x12a)])))));}));}[_0x4626ea(0x1ef)](_0x277ffa){var _0x1a06d6=_0x4626ea;this[_0x1a06d6(0x176)]=!0x1,this[_0x1a06d6(0x1d0)]=!0x1;try{_0x277ffa[_0x1a06d6(0x194)]=null,_0x277ffa['onerror']=null,_0x277ffa[_0x1a06d6(0x121)]=null;}catch{}try{_0x277ffa[_0x1a06d6(0x1ed)]<0x2&&_0x277ffa['close']();}catch{}}[_0x4626ea(0x180)](){var _0x486cb1=_0x4626ea;clearTimeout(this['_reconnectTimeout']),!(this[_0x486cb1(0x1a2)]>=this['_maxConnectAttemptCount'])&&(this[_0x486cb1(0x16b)]=setTimeout(()=>{var _0xbc7d0d=_0x486cb1,_0x3be647;this[_0xbc7d0d(0x176)]||this[_0xbc7d0d(0x1d0)]||(this['_connectToHostNow'](),(_0x3be647=this[_0xbc7d0d(0x138)])==null||_0x3be647[_0xbc7d0d(0x18c)](()=>this[_0xbc7d0d(0x180)]()));},0x1f4),this['_reconnectTimeout']['unref']&&this[_0x486cb1(0x16b)]['unref']());}async['send'](_0x186f46){var _0xcca76d=_0x4626ea;try{if(!this[_0xcca76d(0x1de)])return;this[_0xcca76d(0x139)]&&this[_0xcca76d(0x1c3)](),(await this[_0xcca76d(0x138)])[_0xcca76d(0x1c6)](JSON[_0xcca76d(0x186)](_0x186f46));}catch(_0x24acd6){console[_0xcca76d(0x1d5)](this[_0xcca76d(0x191)]+':\\x20'+(_0x24acd6&&_0x24acd6[_0xcca76d(0x12a)])),this[_0xcca76d(0x1de)]=!0x1,this[_0xcca76d(0x180)]();}}};function q(_0x2c0f6c,_0x40579d,_0x3c5848,_0x46731b,_0x2e2213,_0x588074,_0x382e94,_0x44549d=ie){var _0xcd0c31=_0x4626ea;let _0x5a69fc=_0x3c5848['split'](',')[_0xcd0c31(0x1b9)](_0x4c204a=>{var _0x441344=_0xcd0c31,_0x124fcf,_0x5e5a25,_0x5ba067,_0x5a400e;try{if(!_0x2c0f6c[_0x441344(0x1e4)]){let _0x3128e1=((_0x5e5a25=(_0x124fcf=_0x2c0f6c[_0x441344(0x208)])==null?void 0x0:_0x124fcf['versions'])==null?void 0x0:_0x5e5a25[_0x441344(0x1ae)])||((_0x5a400e=(_0x5ba067=_0x2c0f6c['process'])==null?void 0x0:_0x5ba067[_0x441344(0x151)])==null?void 0x0:_0x5a400e['NEXT_RUNTIME'])===_0x441344(0x127);(_0x2e2213==='next.js'||_0x2e2213==='remix'||_0x2e2213===_0x441344(0x1c2)||_0x2e2213==='angular')&&(_0x2e2213+=_0x3128e1?_0x441344(0x124):'\\x20browser'),_0x2c0f6c['_console_ninja_session']={'id':+new Date(),'tool':_0x2e2213},_0x382e94&&_0x2e2213&&!_0x3128e1&&console[_0x441344(0x111)](_0x441344(0x1d9)+(_0x2e2213[_0x441344(0x1e9)](0x0)[_0x441344(0x204)]()+_0x2e2213['substr'](0x1))+',',_0x441344(0x184),'see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.');}let _0x338f00=new x(_0x2c0f6c,_0x40579d,_0x4c204a,_0x46731b,_0x588074,_0x44549d);return _0x338f00[_0x441344(0x1c6)][_0x441344(0x128)](_0x338f00);}catch(_0x13925e){return console['warn'](_0x441344(0x1a3),_0x13925e&&_0x13925e[_0x441344(0x12a)]),()=>{};}});return _0x52d6fc=>_0x5a69fc[_0xcd0c31(0x12e)](_0x304222=>_0x304222(_0x52d6fc));}function ie(_0x248522,_0x22b47,_0x101d81,_0x49f9d5){var _0x2152db=_0x4626ea;_0x49f9d5&&_0x248522===_0x2152db(0x164)&&_0x101d81[_0x2152db(0x17e)]['reload']();}function b(_0x2f8a94){var _0x2c3352=_0x4626ea,_0x39dd14,_0x5cd825;let _0xff2cb3=function(_0x2707a5,_0x1f13e1){return _0x1f13e1-_0x2707a5;},_0x5714e8;if(_0x2f8a94['performance'])_0x5714e8=function(){var _0x6fee0f=_0x9226;return _0x2f8a94[_0x6fee0f(0x12c)]['now']();};else{if(_0x2f8a94[_0x2c3352(0x208)]&&_0x2f8a94['process'][_0x2c3352(0x187)]&&((_0x5cd825=(_0x39dd14=_0x2f8a94['process'])==null?void 0x0:_0x39dd14[_0x2c3352(0x151)])==null?void 0x0:_0x5cd825[_0x2c3352(0x18a)])!=='edge')_0x5714e8=function(){var _0x510a95=_0x2c3352;return _0x2f8a94['process'][_0x510a95(0x187)]();},_0xff2cb3=function(_0x1872da,_0xa7dc7d){return 0x3e8*(_0xa7dc7d[0x0]-_0x1872da[0x0])+(_0xa7dc7d[0x1]-_0x1872da[0x1])/0xf4240;};else try{let {performance:_0x46fdf0}=require('perf_hooks');_0x5714e8=function(){var _0x35a440=_0x2c3352;return _0x46fdf0[_0x35a440(0x166)]();};}catch{_0x5714e8=function(){return+new Date();};}}return{'elapsed':_0xff2cb3,'timeStamp':_0x5714e8,'now':()=>Date[_0x2c3352(0x166)]()};}function X(_0x11aedc,_0x1ca58d,_0x37c59b){var _0x2e4e28=_0x4626ea,_0x43e98c,_0x5da067,_0x37df21,_0x2f7d64,_0x541c33;if(_0x11aedc[_0x2e4e28(0x16a)]!==void 0x0)return _0x11aedc['_consoleNinjaAllowedToStart'];let _0x593073=((_0x5da067=(_0x43e98c=_0x11aedc[_0x2e4e28(0x208)])==null?void 0x0:_0x43e98c[_0x2e4e28(0x1b0)])==null?void 0x0:_0x5da067[_0x2e4e28(0x1ae)])||((_0x2f7d64=(_0x37df21=_0x11aedc[_0x2e4e28(0x208)])==null?void 0x0:_0x37df21[_0x2e4e28(0x151)])==null?void 0x0:_0x2f7d64[_0x2e4e28(0x18a)])===_0x2e4e28(0x127);return _0x593073&&_0x37c59b===_0x2e4e28(0x147)?_0x11aedc[_0x2e4e28(0x16a)]=!0x1:_0x11aedc['_consoleNinjaAllowedToStart']=_0x593073||!_0x1ca58d||((_0x541c33=_0x11aedc[_0x2e4e28(0x17e)])==null?void 0x0:_0x541c33[_0x2e4e28(0x193)])&&_0x1ca58d['includes'](_0x11aedc[_0x2e4e28(0x17e)]['hostname']),_0x11aedc[_0x2e4e28(0x16a)];}function H(_0x510064,_0x33a768,_0x5d605e,_0x2f5141){var _0x391961=_0x4626ea;_0x510064=_0x510064,_0x33a768=_0x33a768,_0x5d605e=_0x5d605e,_0x2f5141=_0x2f5141;let _0x187be4=b(_0x510064),_0x496f24=_0x187be4['elapsed'],_0x2c3d14=_0x187be4[_0x391961(0x168)];class _0x8237c4{constructor(){var _0xe23f1a=_0x391961;this[_0xe23f1a(0x19f)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0xe23f1a(0x14e)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0xe23f1a(0x1ba)]=_0x510064['undefined'],this[_0xe23f1a(0x1a8)]=_0x510064[_0xe23f1a(0x19b)],this[_0xe23f1a(0x1aa)]=Object[_0xe23f1a(0x143)],this[_0xe23f1a(0x17f)]=Object[_0xe23f1a(0x122)],this[_0xe23f1a(0x203)]=_0x510064[_0xe23f1a(0x169)],this[_0xe23f1a(0x1f0)]=RegExp[_0xe23f1a(0x156)][_0xe23f1a(0x153)],this[_0xe23f1a(0x167)]=Date[_0xe23f1a(0x156)][_0xe23f1a(0x153)];}['serialize'](_0x5d18a7,_0x2b1f18,_0x4b5a75,_0xc8f070){var _0x216aa1=_0x391961,_0x767bb1=this,_0xd96c8a=_0x4b5a75['autoExpand'];function _0x1d3adf(_0x598192,_0x1e7c16,_0x5ddf6e){var _0x50bd5a=_0x9226;_0x1e7c16['type']=_0x50bd5a(0x1e8),_0x1e7c16[_0x50bd5a(0x1fe)]=_0x598192[_0x50bd5a(0x12a)],_0x2a9e62=_0x5ddf6e[_0x50bd5a(0x1ae)][_0x50bd5a(0x18f)],_0x5ddf6e[_0x50bd5a(0x1ae)]['current']=_0x1e7c16,_0x767bb1['_treeNodePropertiesBeforeFullValue'](_0x1e7c16,_0x5ddf6e);}try{_0x4b5a75[_0x216aa1(0x13f)]++,_0x4b5a75[_0x216aa1(0x125)]&&_0x4b5a75[_0x216aa1(0x131)][_0x216aa1(0x13c)](_0x2b1f18);var _0xba12f2,_0x3d2ea1,_0x210bc5,_0x5c98a5,_0x540845=[],_0x4bc002=[],_0x852303,_0x4888d1=this['_type'](_0x2b1f18),_0x33ea32=_0x4888d1===_0x216aa1(0x1fd),_0xccd31a=!0x1,_0x5258d3=_0x4888d1===_0x216aa1(0x174),_0x743b81=this[_0x216aa1(0x1f3)](_0x4888d1),_0xfe0678=this[_0x216aa1(0x1a1)](_0x4888d1),_0x22d6ec=_0x743b81||_0xfe0678,_0x4f2440={},_0x3f9058=0x0,_0x18fb20=!0x1,_0x2a9e62,_0x3d1f2d=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x4b5a75['depth']){if(_0x33ea32){if(_0x3d2ea1=_0x2b1f18[_0x216aa1(0x1b6)],_0x3d2ea1>_0x4b5a75['elements']){for(_0x210bc5=0x0,_0x5c98a5=_0x4b5a75[_0x216aa1(0x1d3)],_0xba12f2=_0x210bc5;_0xba12f2<_0x5c98a5;_0xba12f2++)_0x4bc002['push'](_0x767bb1[_0x216aa1(0x1f4)](_0x540845,_0x2b1f18,_0x4888d1,_0xba12f2,_0x4b5a75));_0x5d18a7[_0x216aa1(0x1a4)]=!0x0;}else{for(_0x210bc5=0x0,_0x5c98a5=_0x3d2ea1,_0xba12f2=_0x210bc5;_0xba12f2<_0x5c98a5;_0xba12f2++)_0x4bc002[_0x216aa1(0x13c)](_0x767bb1[_0x216aa1(0x1f4)](_0x540845,_0x2b1f18,_0x4888d1,_0xba12f2,_0x4b5a75));}_0x4b5a75[_0x216aa1(0x181)]+=_0x4bc002[_0x216aa1(0x1b6)];}if(!(_0x4888d1===_0x216aa1(0x11f)||_0x4888d1===_0x216aa1(0x118))&&!_0x743b81&&_0x4888d1!==_0x216aa1(0x12f)&&_0x4888d1!==_0x216aa1(0x134)&&_0x4888d1!==_0x216aa1(0x207)){var _0x1971d5=_0xc8f070['props']||_0x4b5a75[_0x216aa1(0x14b)];if(this[_0x216aa1(0x1be)](_0x2b1f18)?(_0xba12f2=0x0,_0x2b1f18[_0x216aa1(0x12e)](function(_0x27ec34){var _0x1aafe2=_0x216aa1;if(_0x3f9058++,_0x4b5a75[_0x1aafe2(0x181)]++,_0x3f9058>_0x1971d5){_0x18fb20=!0x0;return;}if(!_0x4b5a75[_0x1aafe2(0x162)]&&_0x4b5a75['autoExpand']&&_0x4b5a75['autoExpandPropertyCount']>_0x4b5a75['autoExpandLimit']){_0x18fb20=!0x0;return;}_0x4bc002[_0x1aafe2(0x13c)](_0x767bb1[_0x1aafe2(0x1f4)](_0x540845,_0x2b1f18,_0x1aafe2(0x1cc),_0xba12f2++,_0x4b5a75,function(_0x729ea1){return function(){return _0x729ea1;};}(_0x27ec34)));})):this[_0x216aa1(0x1ec)](_0x2b1f18)&&_0x2b1f18[_0x216aa1(0x12e)](function(_0x518f09,_0x375058){var _0x57432c=_0x216aa1;if(_0x3f9058++,_0x4b5a75[_0x57432c(0x181)]++,_0x3f9058>_0x1971d5){_0x18fb20=!0x0;return;}if(!_0x4b5a75['isExpressionToEvaluate']&&_0x4b5a75[_0x57432c(0x125)]&&_0x4b5a75['autoExpandPropertyCount']>_0x4b5a75[_0x57432c(0x1e5)]){_0x18fb20=!0x0;return;}var _0x135ea4=_0x375058[_0x57432c(0x153)]();_0x135ea4[_0x57432c(0x1b6)]>0x64&&(_0x135ea4=_0x135ea4['slice'](0x0,0x64)+_0x57432c(0x1b7)),_0x4bc002[_0x57432c(0x13c)](_0x767bb1[_0x57432c(0x1f4)](_0x540845,_0x2b1f18,_0x57432c(0x1e1),_0x135ea4,_0x4b5a75,function(_0x1c99a5){return function(){return _0x1c99a5;};}(_0x518f09)));}),!_0xccd31a){try{for(_0x852303 in _0x2b1f18)if(!(_0x33ea32&&_0x3d1f2d['test'](_0x852303))&&!this[_0x216aa1(0x158)](_0x2b1f18,_0x852303,_0x4b5a75)){if(_0x3f9058++,_0x4b5a75['autoExpandPropertyCount']++,_0x3f9058>_0x1971d5){_0x18fb20=!0x0;break;}if(!_0x4b5a75[_0x216aa1(0x162)]&&_0x4b5a75[_0x216aa1(0x125)]&&_0x4b5a75[_0x216aa1(0x181)]>_0x4b5a75[_0x216aa1(0x1e5)]){_0x18fb20=!0x0;break;}_0x4bc002[_0x216aa1(0x13c)](_0x767bb1[_0x216aa1(0x11a)](_0x540845,_0x4f2440,_0x2b1f18,_0x4888d1,_0x852303,_0x4b5a75));}}catch{}if(_0x4f2440[_0x216aa1(0x11c)]=!0x0,_0x5258d3&&(_0x4f2440[_0x216aa1(0x117)]=!0x0),!_0x18fb20){var _0x484cfa=[][_0x216aa1(0x13b)](this['_getOwnPropertyNames'](_0x2b1f18))[_0x216aa1(0x13b)](this[_0x216aa1(0x175)](_0x2b1f18));for(_0xba12f2=0x0,_0x3d2ea1=_0x484cfa[_0x216aa1(0x1b6)];_0xba12f2<_0x3d2ea1;_0xba12f2++)if(_0x852303=_0x484cfa[_0xba12f2],!(_0x33ea32&&_0x3d1f2d[_0x216aa1(0x1bd)](_0x852303[_0x216aa1(0x153)]()))&&!this[_0x216aa1(0x158)](_0x2b1f18,_0x852303,_0x4b5a75)&&!_0x4f2440['_p_'+_0x852303[_0x216aa1(0x153)]()]){if(_0x3f9058++,_0x4b5a75[_0x216aa1(0x181)]++,_0x3f9058>_0x1971d5){_0x18fb20=!0x0;break;}if(!_0x4b5a75['isExpressionToEvaluate']&&_0x4b5a75[_0x216aa1(0x125)]&&_0x4b5a75['autoExpandPropertyCount']>_0x4b5a75[_0x216aa1(0x1e5)]){_0x18fb20=!0x0;break;}_0x4bc002[_0x216aa1(0x13c)](_0x767bb1[_0x216aa1(0x11a)](_0x540845,_0x4f2440,_0x2b1f18,_0x4888d1,_0x852303,_0x4b5a75));}}}}}if(_0x5d18a7['type']=_0x4888d1,_0x22d6ec?(_0x5d18a7[_0x216aa1(0x11b)]=_0x2b1f18[_0x216aa1(0x19d)](),this[_0x216aa1(0x13d)](_0x4888d1,_0x5d18a7,_0x4b5a75,_0xc8f070)):_0x4888d1==='date'?_0x5d18a7[_0x216aa1(0x11b)]=this[_0x216aa1(0x167)][_0x216aa1(0x196)](_0x2b1f18):_0x4888d1===_0x216aa1(0x207)?_0x5d18a7[_0x216aa1(0x11b)]=_0x2b1f18['toString']():_0x4888d1===_0x216aa1(0x1c0)?_0x5d18a7[_0x216aa1(0x11b)]=this['_regExpToString']['call'](_0x2b1f18):_0x4888d1==='symbol'&&this[_0x216aa1(0x203)]?_0x5d18a7[_0x216aa1(0x11b)]=this[_0x216aa1(0x203)][_0x216aa1(0x156)]['toString'][_0x216aa1(0x196)](_0x2b1f18):!_0x4b5a75[_0x216aa1(0x160)]&&!(_0x4888d1===_0x216aa1(0x11f)||_0x4888d1===_0x216aa1(0x118))&&(delete _0x5d18a7[_0x216aa1(0x11b)],_0x5d18a7[_0x216aa1(0x1ad)]=!0x0),_0x18fb20&&(_0x5d18a7[_0x216aa1(0x1b1)]=!0x0),_0x2a9e62=_0x4b5a75[_0x216aa1(0x1ae)][_0x216aa1(0x18f)],_0x4b5a75[_0x216aa1(0x1ae)][_0x216aa1(0x18f)]=_0x5d18a7,this['_treeNodePropertiesBeforeFullValue'](_0x5d18a7,_0x4b5a75),_0x4bc002[_0x216aa1(0x1b6)]){for(_0xba12f2=0x0,_0x3d2ea1=_0x4bc002[_0x216aa1(0x1b6)];_0xba12f2<_0x3d2ea1;_0xba12f2++)_0x4bc002[_0xba12f2](_0xba12f2);}_0x540845[_0x216aa1(0x1b6)]&&(_0x5d18a7['props']=_0x540845);}catch(_0xb4f8d5){_0x1d3adf(_0xb4f8d5,_0x5d18a7,_0x4b5a75);}return this[_0x216aa1(0x198)](_0x2b1f18,_0x5d18a7),this[_0x216aa1(0x1ac)](_0x5d18a7,_0x4b5a75),_0x4b5a75[_0x216aa1(0x1ae)][_0x216aa1(0x18f)]=_0x2a9e62,_0x4b5a75[_0x216aa1(0x13f)]--,_0x4b5a75[_0x216aa1(0x125)]=_0xd96c8a,_0x4b5a75[_0x216aa1(0x125)]&&_0x4b5a75[_0x216aa1(0x131)][_0x216aa1(0x16d)](),_0x5d18a7;}[_0x391961(0x175)](_0x1352b4){var _0x317466=_0x391961;return Object[_0x317466(0x149)]?Object[_0x317466(0x149)](_0x1352b4):[];}[_0x391961(0x1be)](_0x407d32){var _0x105bbc=_0x391961;return!!(_0x407d32&&_0x510064[_0x105bbc(0x1cc)]&&this[_0x105bbc(0x1b8)](_0x407d32)===_0x105bbc(0x1db)&&_0x407d32['forEach']);}[_0x391961(0x158)](_0x105e25,_0x40447,_0x1e1069){var _0x402cc6=_0x391961;return _0x1e1069[_0x402cc6(0x170)]?typeof _0x105e25[_0x40447]=='function':!0x1;}[_0x391961(0x19c)](_0x4e070f){var _0x38ce28=_0x391961,_0x13c348='';return _0x13c348=typeof _0x4e070f,_0x13c348===_0x38ce28(0x126)?this[_0x38ce28(0x1b8)](_0x4e070f)===_0x38ce28(0x132)?_0x13c348=_0x38ce28(0x1fd):this[_0x38ce28(0x1b8)](_0x4e070f)===_0x38ce28(0x17d)?_0x13c348=_0x38ce28(0x161):this[_0x38ce28(0x1b8)](_0x4e070f)===_0x38ce28(0x15c)?_0x13c348=_0x38ce28(0x207):_0x4e070f===null?_0x13c348='null':_0x4e070f[_0x38ce28(0x140)]&&(_0x13c348=_0x4e070f['constructor']['name']||_0x13c348):_0x13c348===_0x38ce28(0x118)&&this[_0x38ce28(0x1a8)]&&_0x4e070f instanceof this['_HTMLAllCollection']&&(_0x13c348='HTMLAllCollection'),_0x13c348;}['_objectToString'](_0xc97f51){var _0x176479=_0x391961;return Object[_0x176479(0x156)]['toString'][_0x176479(0x196)](_0xc97f51);}[_0x391961(0x1f3)](_0x53b2c5){var _0x17f551=_0x391961;return _0x53b2c5===_0x17f551(0x1ff)||_0x53b2c5==='string'||_0x53b2c5===_0x17f551(0x1e2);}[_0x391961(0x1a1)](_0x9f0f9a){var _0x457596=_0x391961;return _0x9f0f9a==='Boolean'||_0x9f0f9a===_0x457596(0x12f)||_0x9f0f9a===_0x457596(0x1fa);}[_0x391961(0x1f4)](_0x232d9b,_0xdc38d1,_0x58d536,_0x3ad627,_0x37f014,_0xb21601){var _0x2bffb6=this;return function(_0x2c7468){var _0x1a7116=_0x9226,_0x54a698=_0x37f014[_0x1a7116(0x1ae)][_0x1a7116(0x18f)],_0x465fad=_0x37f014[_0x1a7116(0x1ae)][_0x1a7116(0x1a7)],_0xafec7b=_0x37f014[_0x1a7116(0x1ae)][_0x1a7116(0x1d8)];_0x37f014['node'][_0x1a7116(0x1d8)]=_0x54a698,_0x37f014[_0x1a7116(0x1ae)]['index']=typeof _0x3ad627==_0x1a7116(0x1e2)?_0x3ad627:_0x2c7468,_0x232d9b[_0x1a7116(0x13c)](_0x2bffb6[_0x1a7116(0x1cf)](_0xdc38d1,_0x58d536,_0x3ad627,_0x37f014,_0xb21601)),_0x37f014['node'][_0x1a7116(0x1d8)]=_0xafec7b,_0x37f014[_0x1a7116(0x1ae)][_0x1a7116(0x1a7)]=_0x465fad;};}[_0x391961(0x11a)](_0x187213,_0x25b0f0,_0x319acf,_0xf744d3,_0x574c7e,_0x173630,_0x2ac11c){var _0x311022=_0x391961,_0x4bc3c4=this;return _0x25b0f0[_0x311022(0x182)+_0x574c7e[_0x311022(0x153)]()]=!0x0,function(_0x747146){var _0x5e5b41=_0x311022,_0x3b8e0b=_0x173630['node'][_0x5e5b41(0x18f)],_0x1554b2=_0x173630[_0x5e5b41(0x1ae)][_0x5e5b41(0x1a7)],_0x287b34=_0x173630[_0x5e5b41(0x1ae)]['parent'];_0x173630[_0x5e5b41(0x1ae)][_0x5e5b41(0x1d8)]=_0x3b8e0b,_0x173630['node']['index']=_0x747146,_0x187213['push'](_0x4bc3c4[_0x5e5b41(0x1cf)](_0x319acf,_0xf744d3,_0x574c7e,_0x173630,_0x2ac11c)),_0x173630[_0x5e5b41(0x1ae)][_0x5e5b41(0x1d8)]=_0x287b34,_0x173630['node'][_0x5e5b41(0x1a7)]=_0x1554b2;};}[_0x391961(0x1cf)](_0x3db910,_0x4e06af,_0x120900,_0xd2f9f5,_0x3e1e95){var _0x2d7627=_0x391961,_0x1c58f2=this;_0x3e1e95||(_0x3e1e95=function(_0x534986,_0x4def4b){return _0x534986[_0x4def4b];});var _0x28d910=_0x120900['toString'](),_0x3bdf47=_0xd2f9f5[_0x2d7627(0x18b)]||{},_0x41e3ce=_0xd2f9f5[_0x2d7627(0x160)],_0x64c7cf=_0xd2f9f5[_0x2d7627(0x162)];try{var _0x427ef3=this[_0x2d7627(0x1ec)](_0x3db910),_0x563948=_0x28d910;_0x427ef3&&_0x563948[0x0]==='\\x27'&&(_0x563948=_0x563948['substr'](0x1,_0x563948[_0x2d7627(0x1b6)]-0x2));var _0x2ce170=_0xd2f9f5[_0x2d7627(0x18b)]=_0x3bdf47[_0x2d7627(0x182)+_0x563948];_0x2ce170&&(_0xd2f9f5['depth']=_0xd2f9f5[_0x2d7627(0x160)]+0x1),_0xd2f9f5[_0x2d7627(0x162)]=!!_0x2ce170;var _0x3a303b=typeof _0x120900==_0x2d7627(0x1f9),_0x2b5081={'name':_0x3a303b||_0x427ef3?_0x28d910:this[_0x2d7627(0x144)](_0x28d910)};if(_0x3a303b&&(_0x2b5081[_0x2d7627(0x1f9)]=!0x0),!(_0x4e06af===_0x2d7627(0x1fd)||_0x4e06af===_0x2d7627(0x1a5))){var _0x30c000=this[_0x2d7627(0x1aa)](_0x3db910,_0x120900);if(_0x30c000&&(_0x30c000[_0x2d7627(0x178)]&&(_0x2b5081['setter']=!0x0),_0x30c000[_0x2d7627(0x119)]&&!_0x2ce170&&!_0xd2f9f5[_0x2d7627(0x1f8)]))return _0x2b5081[_0x2d7627(0x205)]=!0x0,this[_0x2d7627(0x171)](_0x2b5081,_0xd2f9f5),_0x2b5081;}var _0x31489d;try{_0x31489d=_0x3e1e95(_0x3db910,_0x120900);}catch(_0x110ec0){return _0x2b5081={'name':_0x28d910,'type':_0x2d7627(0x1e8),'error':_0x110ec0[_0x2d7627(0x12a)]},this['_processTreeNodeResult'](_0x2b5081,_0xd2f9f5),_0x2b5081;}var _0x41ba38=this['_type'](_0x31489d),_0x525062=this['_isPrimitiveType'](_0x41ba38);if(_0x2b5081['type']=_0x41ba38,_0x525062)this['_processTreeNodeResult'](_0x2b5081,_0xd2f9f5,_0x31489d,function(){var _0x2548fe=_0x2d7627;_0x2b5081['value']=_0x31489d['valueOf'](),!_0x2ce170&&_0x1c58f2[_0x2548fe(0x13d)](_0x41ba38,_0x2b5081,_0xd2f9f5,{});});else{var _0x307caf=_0xd2f9f5['autoExpand']&&_0xd2f9f5[_0x2d7627(0x13f)]<_0xd2f9f5['autoExpandMaxDepth']&&_0xd2f9f5['autoExpandPreviousObjects'][_0x2d7627(0x115)](_0x31489d)<0x0&&_0x41ba38!==_0x2d7627(0x174)&&_0xd2f9f5[_0x2d7627(0x181)]<_0xd2f9f5[_0x2d7627(0x1e5)];_0x307caf||_0xd2f9f5[_0x2d7627(0x13f)]<_0x41e3ce||_0x2ce170?(this[_0x2d7627(0x183)](_0x2b5081,_0x31489d,_0xd2f9f5,_0x2ce170||{}),this[_0x2d7627(0x198)](_0x31489d,_0x2b5081)):this[_0x2d7627(0x171)](_0x2b5081,_0xd2f9f5,_0x31489d,function(){var _0xfd0181=_0x2d7627;_0x41ba38==='null'||_0x41ba38==='undefined'||(delete _0x2b5081['value'],_0x2b5081[_0xfd0181(0x1ad)]=!0x0);});}return _0x2b5081;}finally{_0xd2f9f5[_0x2d7627(0x18b)]=_0x3bdf47,_0xd2f9f5[_0x2d7627(0x160)]=_0x41e3ce,_0xd2f9f5[_0x2d7627(0x162)]=_0x64c7cf;}}['_capIfString'](_0x541c7a,_0x18d80c,_0x1af37f,_0x3a12d7){var _0x3b4d9e=_0x391961,_0x1253d8=_0x3a12d7['strLength']||_0x1af37f['strLength'];if((_0x541c7a===_0x3b4d9e(0x1e6)||_0x541c7a===_0x3b4d9e(0x12f))&&_0x18d80c[_0x3b4d9e(0x11b)]){let _0x309e70=_0x18d80c[_0x3b4d9e(0x11b)][_0x3b4d9e(0x1b6)];_0x1af37f[_0x3b4d9e(0x1bc)]+=_0x309e70,_0x1af37f[_0x3b4d9e(0x1bc)]>_0x1af37f['totalStrLength']?(_0x18d80c[_0x3b4d9e(0x1ad)]='',delete _0x18d80c[_0x3b4d9e(0x11b)]):_0x309e70>_0x1253d8&&(_0x18d80c[_0x3b4d9e(0x1ad)]=_0x18d80c[_0x3b4d9e(0x11b)][_0x3b4d9e(0x1ee)](0x0,_0x1253d8),delete _0x18d80c[_0x3b4d9e(0x11b)]);}}[_0x391961(0x1ec)](_0x51064f){var _0x4e5228=_0x391961;return!!(_0x51064f&&_0x510064[_0x4e5228(0x1e1)]&&this[_0x4e5228(0x1b8)](_0x51064f)==='[object\\x20Map]'&&_0x51064f['forEach']);}[_0x391961(0x144)](_0x42b554){var _0x41991c=_0x391961;if(_0x42b554[_0x41991c(0x1ea)](/^\\d+$/))return _0x42b554;var _0xaeb2a7;try{_0xaeb2a7=JSON[_0x41991c(0x186)](''+_0x42b554);}catch{_0xaeb2a7='\\x22'+this[_0x41991c(0x1b8)](_0x42b554)+'\\x22';}return _0xaeb2a7[_0x41991c(0x1ea)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0xaeb2a7=_0xaeb2a7['substr'](0x1,_0xaeb2a7[_0x41991c(0x1b6)]-0x2):_0xaeb2a7=_0xaeb2a7[_0x41991c(0x1da)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x41991c(0x1da)](/(^\"|\"$)/g,'\\x27'),_0xaeb2a7;}['_processTreeNodeResult'](_0x32aee4,_0x590d37,_0x35d66e,_0x5ac389){var _0x35578e=_0x391961;this[_0x35578e(0x129)](_0x32aee4,_0x590d37),_0x5ac389&&_0x5ac389(),this[_0x35578e(0x198)](_0x35d66e,_0x32aee4),this['_treeNodePropertiesAfterFullValue'](_0x32aee4,_0x590d37);}[_0x391961(0x129)](_0x4edcdf,_0x3e4b5a){var _0x420f=_0x391961;this['_setNodeId'](_0x4edcdf,_0x3e4b5a),this[_0x420f(0x185)](_0x4edcdf,_0x3e4b5a),this[_0x420f(0x1eb)](_0x4edcdf,_0x3e4b5a),this[_0x420f(0x16c)](_0x4edcdf,_0x3e4b5a);}[_0x391961(0x1c4)](_0x2f8c11,_0x58fabb){}['_setNodeQueryPath'](_0x1ae224,_0x1e829c){}[_0x391961(0x1fc)](_0x4a1918,_0x20d9c2){}[_0x391961(0x189)](_0x31bed1){return _0x31bed1===this['_undefined'];}[_0x391961(0x1ac)](_0x4ecc24,_0x763395){var _0x51f0f0=_0x391961;this['_setNodeLabel'](_0x4ecc24,_0x763395),this[_0x51f0f0(0x142)](_0x4ecc24),_0x763395[_0x51f0f0(0x14a)]&&this[_0x51f0f0(0x15a)](_0x4ecc24),this['_addFunctionsNode'](_0x4ecc24,_0x763395),this['_addLoadNode'](_0x4ecc24,_0x763395),this[_0x51f0f0(0x172)](_0x4ecc24);}[_0x391961(0x198)](_0x3779ec,_0x43d9da){var _0x92d911=_0x391961;let _0x3351b5;try{_0x510064['console']&&(_0x3351b5=_0x510064[_0x92d911(0x1c5)][_0x92d911(0x1fe)],_0x510064['console'][_0x92d911(0x1fe)]=function(){}),_0x3779ec&&typeof _0x3779ec[_0x92d911(0x1b6)]==_0x92d911(0x1e2)&&(_0x43d9da[_0x92d911(0x1b6)]=_0x3779ec[_0x92d911(0x1b6)]);}catch{}finally{_0x3351b5&&(_0x510064[_0x92d911(0x1c5)]['error']=_0x3351b5);}if(_0x43d9da[_0x92d911(0x1b4)]===_0x92d911(0x1e2)||_0x43d9da[_0x92d911(0x1b4)]===_0x92d911(0x1fa)){if(isNaN(_0x43d9da[_0x92d911(0x11b)]))_0x43d9da[_0x92d911(0x136)]=!0x0,delete _0x43d9da[_0x92d911(0x11b)];else switch(_0x43d9da['value']){case Number['POSITIVE_INFINITY']:_0x43d9da[_0x92d911(0x145)]=!0x0,delete _0x43d9da[_0x92d911(0x11b)];break;case Number[_0x92d911(0x1a6)]:_0x43d9da[_0x92d911(0x197)]=!0x0,delete _0x43d9da[_0x92d911(0x11b)];break;case 0x0:this['_isNegativeZero'](_0x43d9da[_0x92d911(0x11b)])&&(_0x43d9da[_0x92d911(0x173)]=!0x0);break;}}else _0x43d9da['type']===_0x92d911(0x174)&&typeof _0x3779ec['name']==_0x92d911(0x1e6)&&_0x3779ec[_0x92d911(0x1c8)]&&_0x43d9da[_0x92d911(0x1c8)]&&_0x3779ec[_0x92d911(0x1c8)]!==_0x43d9da[_0x92d911(0x1c8)]&&(_0x43d9da[_0x92d911(0x1f7)]=_0x3779ec['name']);}[_0x391961(0x116)](_0x4db2dd){var _0xf7b3e2=_0x391961;return 0x1/_0x4db2dd===Number[_0xf7b3e2(0x1a6)];}['_sortProps'](_0xa48a70){var _0x5dce5f=_0x391961;!_0xa48a70[_0x5dce5f(0x14b)]||!_0xa48a70[_0x5dce5f(0x14b)][_0x5dce5f(0x1b6)]||_0xa48a70[_0x5dce5f(0x1b4)]===_0x5dce5f(0x1fd)||_0xa48a70[_0x5dce5f(0x1b4)]===_0x5dce5f(0x1e1)||_0xa48a70[_0x5dce5f(0x1b4)]===_0x5dce5f(0x1cc)||_0xa48a70[_0x5dce5f(0x14b)][_0x5dce5f(0x14d)](function(_0xd2b2c3,_0x29d5cd){var _0x92d94b=_0x5dce5f,_0x538cfa=_0xd2b2c3['name'][_0x92d94b(0x148)](),_0x6b9285=_0x29d5cd[_0x92d94b(0x1c8)][_0x92d94b(0x148)]();return _0x538cfa<_0x6b9285?-0x1:_0x538cfa>_0x6b9285?0x1:0x0;});}[_0x391961(0x11d)](_0x583623,_0x46e3e8){var _0x3ce46e=_0x391961;if(!(_0x46e3e8['noFunctions']||!_0x583623[_0x3ce46e(0x14b)]||!_0x583623['props'][_0x3ce46e(0x1b6)])){for(var _0x42d08a=[],_0x52dbe5=[],_0x4b8335=0x0,_0x450baf=_0x583623['props'][_0x3ce46e(0x1b6)];_0x4b8335<_0x450baf;_0x4b8335++){var _0x398f8c=_0x583623['props'][_0x4b8335];_0x398f8c[_0x3ce46e(0x1b4)]==='function'?_0x42d08a[_0x3ce46e(0x13c)](_0x398f8c):_0x52dbe5[_0x3ce46e(0x13c)](_0x398f8c);}if(!(!_0x52dbe5[_0x3ce46e(0x1b6)]||_0x42d08a[_0x3ce46e(0x1b6)]<=0x1)){_0x583623[_0x3ce46e(0x14b)]=_0x52dbe5;var _0x56bfbd={'functionsNode':!0x0,'props':_0x42d08a};this[_0x3ce46e(0x1c4)](_0x56bfbd,_0x46e3e8),this[_0x3ce46e(0x1fc)](_0x56bfbd,_0x46e3e8),this[_0x3ce46e(0x142)](_0x56bfbd),this[_0x3ce46e(0x16c)](_0x56bfbd,_0x46e3e8),_0x56bfbd['id']+='\\x20f',_0x583623[_0x3ce46e(0x14b)][_0x3ce46e(0x1c9)](_0x56bfbd);}}}[_0x391961(0x1a9)](_0x430e38,_0x1fa560){}['_setNodeExpandableState'](_0x2fd910){}[_0x391961(0x1ab)](_0x54e605){var _0x19641c=_0x391961;return Array[_0x19641c(0x192)](_0x54e605)||typeof _0x54e605==_0x19641c(0x126)&&this[_0x19641c(0x1b8)](_0x54e605)==='[object\\x20Array]';}[_0x391961(0x16c)](_0x54cd11,_0x472425){}['_cleanNode'](_0x98c2ca){var _0x428c79=_0x391961;delete _0x98c2ca[_0x428c79(0x1dd)],delete _0x98c2ca[_0x428c79(0x179)],delete _0x98c2ca[_0x428c79(0x114)];}['_setNodeExpressionPath'](_0x372a40,_0x5986da){}}let _0x30d0d1=new _0x8237c4(),_0x1e7343={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x21fae0={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x4bb77d(_0x284bbe,_0x113d13,_0x283f4b,_0x2585f4,_0xb7dbca,_0x4426e0){var _0x45c2c2=_0x391961;let _0x185714,_0x54555f;try{_0x54555f=_0x2c3d14(),_0x185714=_0x5d605e[_0x113d13],!_0x185714||_0x54555f-_0x185714['ts']>0x1f4&&_0x185714[_0x45c2c2(0x1d6)]&&_0x185714[_0x45c2c2(0x190)]/_0x185714['count']<0x64?(_0x5d605e[_0x113d13]=_0x185714={'count':0x0,'time':0x0,'ts':_0x54555f},_0x5d605e[_0x45c2c2(0x152)]={}):_0x54555f-_0x5d605e[_0x45c2c2(0x152)]['ts']>0x32&&_0x5d605e['hits'][_0x45c2c2(0x1d6)]&&_0x5d605e['hits'][_0x45c2c2(0x190)]/_0x5d605e[_0x45c2c2(0x152)][_0x45c2c2(0x1d6)]<0x64&&(_0x5d605e[_0x45c2c2(0x152)]={});let _0x297324=[],_0x3b32c9=_0x185714['reduceLimits']||_0x5d605e[_0x45c2c2(0x152)][_0x45c2c2(0x1cd)]?_0x21fae0:_0x1e7343,_0x292fa3=_0x4e1175=>{var _0x4c44eb=_0x45c2c2;let _0x2c5531={};return _0x2c5531[_0x4c44eb(0x14b)]=_0x4e1175[_0x4c44eb(0x14b)],_0x2c5531['elements']=_0x4e1175['elements'],_0x2c5531['strLength']=_0x4e1175[_0x4c44eb(0x17c)],_0x2c5531[_0x4c44eb(0x137)]=_0x4e1175[_0x4c44eb(0x137)],_0x2c5531['autoExpandLimit']=_0x4e1175[_0x4c44eb(0x1e5)],_0x2c5531[_0x4c44eb(0x123)]=_0x4e1175[_0x4c44eb(0x123)],_0x2c5531['sortProps']=!0x1,_0x2c5531[_0x4c44eb(0x170)]=!_0x33a768,_0x2c5531[_0x4c44eb(0x160)]=0x1,_0x2c5531[_0x4c44eb(0x13f)]=0x0,_0x2c5531['expId']=_0x4c44eb(0x1d2),_0x2c5531[_0x4c44eb(0x1bb)]=_0x4c44eb(0x1f2),_0x2c5531[_0x4c44eb(0x125)]=!0x0,_0x2c5531['autoExpandPreviousObjects']=[],_0x2c5531[_0x4c44eb(0x181)]=0x0,_0x2c5531[_0x4c44eb(0x1f8)]=!0x0,_0x2c5531[_0x4c44eb(0x1bc)]=0x0,_0x2c5531['node']={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x2c5531;};for(var _0x271d05=0x0;_0x271d05<_0xb7dbca[_0x45c2c2(0x1b6)];_0x271d05++)_0x297324[_0x45c2c2(0x13c)](_0x30d0d1['serialize']({'timeNode':_0x284bbe===_0x45c2c2(0x190)||void 0x0},_0xb7dbca[_0x271d05],_0x292fa3(_0x3b32c9),{}));if(_0x284bbe==='trace'){let _0x2542c2=Error[_0x45c2c2(0x195)];try{Error[_0x45c2c2(0x195)]=0x1/0x0,_0x297324[_0x45c2c2(0x13c)](_0x30d0d1[_0x45c2c2(0x183)]({'stackNode':!0x0},new Error()[_0x45c2c2(0x13a)],_0x292fa3(_0x3b32c9),{'strLength':0x1/0x0}));}finally{Error[_0x45c2c2(0x195)]=_0x2542c2;}}return{'method':'log','version':_0x2f5141,'args':[{'ts':_0x283f4b,'session':_0x2585f4,'args':_0x297324,'id':_0x113d13,'context':_0x4426e0}]};}catch(_0x1e8623){return{'method':_0x45c2c2(0x111),'version':_0x2f5141,'args':[{'ts':_0x283f4b,'session':_0x2585f4,'args':[{'type':_0x45c2c2(0x1e8),'error':_0x1e8623&&_0x1e8623[_0x45c2c2(0x12a)]}],'id':_0x113d13,'context':_0x4426e0}]};}finally{try{if(_0x185714&&_0x54555f){let _0x42b843=_0x2c3d14();_0x185714['count']++,_0x185714['time']+=_0x496f24(_0x54555f,_0x42b843),_0x185714['ts']=_0x42b843,_0x5d605e[_0x45c2c2(0x152)][_0x45c2c2(0x1d6)]++,_0x5d605e[_0x45c2c2(0x152)][_0x45c2c2(0x190)]+=_0x496f24(_0x54555f,_0x42b843),_0x5d605e[_0x45c2c2(0x152)]['ts']=_0x42b843,(_0x185714[_0x45c2c2(0x1d6)]>0x32||_0x185714[_0x45c2c2(0x190)]>0x64)&&(_0x185714[_0x45c2c2(0x1cd)]=!0x0),(_0x5d605e[_0x45c2c2(0x152)][_0x45c2c2(0x1d6)]>0x3e8||_0x5d605e[_0x45c2c2(0x152)][_0x45c2c2(0x190)]>0x12c)&&(_0x5d605e[_0x45c2c2(0x152)]['reduceLimits']=!0x0);}}catch{}}}return _0x4bb77d;}((_0x166570,_0x13c185,_0x50ce36,_0x4c8613,_0xc64222,_0x1e8974,_0x228dba,_0x28bbaf,_0x328698,_0x40a2ab,_0x310429)=>{var _0x1f92ab=_0x4626ea;if(_0x166570[_0x1f92ab(0x154)])return _0x166570['_console_ninja'];if(!X(_0x166570,_0x28bbaf,_0xc64222))return _0x166570['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x166570['_console_ninja'];let _0xdd87f3=b(_0x166570),_0x344045=_0xdd87f3[_0x1f92ab(0x1c7)],_0x23ac14=_0xdd87f3[_0x1f92ab(0x168)],_0x291990=_0xdd87f3[_0x1f92ab(0x166)],_0x4e4fa2={'hits':{},'ts':{}},_0x12dc4d=H(_0x166570,_0x328698,_0x4e4fa2,_0x1e8974),_0x31f310=_0xe6f4e=>{_0x4e4fa2['ts'][_0xe6f4e]=_0x23ac14();},_0x3614dd=(_0x9be044,_0x560c04)=>{var _0x323d35=_0x1f92ab;let _0x31fd9e=_0x4e4fa2['ts'][_0x560c04];if(delete _0x4e4fa2['ts'][_0x560c04],_0x31fd9e){let _0x1938e0=_0x344045(_0x31fd9e,_0x23ac14());_0x346395(_0x12dc4d(_0x323d35(0x190),_0x9be044,_0x291990(),_0x3a4102,[_0x1938e0],_0x560c04));}},_0x11e437=_0x545750=>{var _0xe1bfdf=_0x1f92ab,_0x5a609d;return _0xc64222===_0xe1bfdf(0x1b5)&&_0x166570[_0xe1bfdf(0x19e)]&&((_0x5a609d=_0x545750==null?void 0x0:_0x545750[_0xe1bfdf(0x15b)])==null?void 0x0:_0x5a609d[_0xe1bfdf(0x1b6)])&&(_0x545750[_0xe1bfdf(0x15b)][0x0][_0xe1bfdf(0x19e)]=_0x166570['origin']),_0x545750;};_0x166570['_console_ninja']={'consoleLog':(_0x21df8e,_0x23ebc6)=>{var _0x40def2=_0x1f92ab;_0x166570[_0x40def2(0x1c5)]['log'][_0x40def2(0x1c8)]!=='disabledLog'&&_0x346395(_0x12dc4d(_0x40def2(0x111),_0x21df8e,_0x291990(),_0x3a4102,_0x23ebc6));},'consoleTrace':(_0x398c73,_0x32b4fb)=>{var _0x1e52d8=_0x1f92ab;_0x166570['console'][_0x1e52d8(0x111)][_0x1e52d8(0x1c8)]!==_0x1e52d8(0x155)&&_0x346395(_0x11e437(_0x12dc4d(_0x1e52d8(0x135),_0x398c73,_0x291990(),_0x3a4102,_0x32b4fb)));},'consoleTime':_0x41442a=>{_0x31f310(_0x41442a);},'consoleTimeEnd':(_0x240419,_0x127bab)=>{_0x3614dd(_0x127bab,_0x240419);},'autoLog':(_0x5ea011,_0x4126e2)=>{var _0x30986a=_0x1f92ab;_0x346395(_0x12dc4d(_0x30986a(0x111),_0x4126e2,_0x291990(),_0x3a4102,[_0x5ea011]));},'autoLogMany':(_0x7e654b,_0x2fade8)=>{var _0x2b6440=_0x1f92ab;_0x346395(_0x12dc4d(_0x2b6440(0x111),_0x7e654b,_0x291990(),_0x3a4102,_0x2fade8));},'autoTrace':(_0x8aa6ee,_0x494eb2)=>{_0x346395(_0x11e437(_0x12dc4d('trace',_0x494eb2,_0x291990(),_0x3a4102,[_0x8aa6ee])));},'autoTraceMany':(_0x4b5ec1,_0x2bbad4)=>{var _0x545cf6=_0x1f92ab;_0x346395(_0x11e437(_0x12dc4d(_0x545cf6(0x135),_0x4b5ec1,_0x291990(),_0x3a4102,_0x2bbad4)));},'autoTime':(_0x50122b,_0x1430e7,_0x35bbd8)=>{_0x31f310(_0x35bbd8);},'autoTimeEnd':(_0xc3c915,_0x1478ec,_0x2151f3)=>{_0x3614dd(_0x1478ec,_0x2151f3);},'coverage':_0x4bb18d=>{var _0x1d9120=_0x1f92ab;_0x346395({'method':_0x1d9120(0x150),'version':_0x1e8974,'args':[{'id':_0x4bb18d}]});}};let _0x346395=q(_0x166570,_0x13c185,_0x50ce36,_0x4c8613,_0xc64222,_0x40a2ab,_0x310429),_0x3a4102=_0x166570[_0x1f92ab(0x1e4)];return _0x166570[_0x1f92ab(0x154)];})(globalThis,_0x4626ea(0x1af),_0x4626ea(0x1e3),\"c:\\\\Users\\\\User\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.322\\\\node_modules\",'webpack','1.0.0',_0x4626ea(0x146),[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-061\",\"172.27.27.79\"],_0x4626ea(0x1d1),_0x4626ea(0x120),_0x4626ea(0x1c1));");
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