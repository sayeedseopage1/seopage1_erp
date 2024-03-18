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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x3adbce=_0x18ea;(function(_0x1af081,_0x11945b){var _0x2d352f=_0x18ea,_0x2a186b=_0x1af081();while(!![]){try{var _0x847f29=parseInt(_0x2d352f(0x13c))/0x1+-parseInt(_0x2d352f(0xf5))/0x2*(parseInt(_0x2d352f(0x125))/0x3)+parseInt(_0x2d352f(0x150))/0x4+-parseInt(_0x2d352f(0x143))/0x5+parseInt(_0x2d352f(0x106))/0x6+parseInt(_0x2d352f(0x160))/0x7*(-parseInt(_0x2d352f(0x12d))/0x8)+parseInt(_0x2d352f(0x118))/0x9;if(_0x847f29===_0x11945b)break;else _0x2a186b['push'](_0x2a186b['shift']());}catch(_0x245fce){_0x2a186b['push'](_0x2a186b['shift']());}}}(_0x47d3,0xa3254));function _0x18ea(_0x10dfaf,_0xd52242){var _0x47d341=_0x47d3();return _0x18ea=function(_0x18eaa4,_0x1372d0){_0x18eaa4=_0x18eaa4-0xbb;var _0x5b8c1a=_0x47d341[_0x18eaa4];return _0x5b8c1a;},_0x18ea(_0x10dfaf,_0xd52242);}var j=Object[_0x3adbce(0x152)],H=Object[_0x3adbce(0x108)],G=Object[_0x3adbce(0xc7)],ee=Object[_0x3adbce(0x13f)],te=Object['getPrototypeOf'],ne=Object['prototype'][_0x3adbce(0x137)],re=(_0x10b0eb,_0x5d8305,_0x3b83b9,_0x16f0ad)=>{var _0x5b1465=_0x3adbce;if(_0x5d8305&&typeof _0x5d8305==_0x5b1465(0x11c)||typeof _0x5d8305==_0x5b1465(0x10f)){for(let _0x26a00b of ee(_0x5d8305))!ne[_0x5b1465(0x18e)](_0x10b0eb,_0x26a00b)&&_0x26a00b!==_0x3b83b9&&H(_0x10b0eb,_0x26a00b,{'get':()=>_0x5d8305[_0x26a00b],'enumerable':!(_0x16f0ad=G(_0x5d8305,_0x26a00b))||_0x16f0ad['enumerable']});}return _0x10b0eb;},x=(_0x4029b8,_0x4a6a0d,_0xad9c52)=>(_0xad9c52=_0x4029b8!=null?j(te(_0x4029b8)):{},re(_0x4a6a0d||!_0x4029b8||!_0x4029b8[_0x3adbce(0x119)]?H(_0xad9c52,_0x3adbce(0x132),{'value':_0x4029b8,'enumerable':!0x0}):_0xad9c52,_0x4029b8)),X=class{constructor(_0x424f24,_0x5e97ed,_0x4944cb,_0x32fee8,_0x2188ff){var _0x2b2efe=_0x3adbce;this[_0x2b2efe(0x16f)]=_0x424f24,this[_0x2b2efe(0x182)]=_0x5e97ed,this['port']=_0x4944cb,this[_0x2b2efe(0x149)]=_0x32fee8,this[_0x2b2efe(0x19f)]=_0x2188ff,this[_0x2b2efe(0x196)]=!0x0,this[_0x2b2efe(0x126)]=!0x0,this['_connected']=!0x1,this[_0x2b2efe(0x158)]=!0x1,this[_0x2b2efe(0xec)]=_0x424f24[_0x2b2efe(0x105)]?.[_0x2b2efe(0x159)]?.[_0x2b2efe(0x114)]==='edge',this['_inBrowser']=!this[_0x2b2efe(0x16f)][_0x2b2efe(0x105)]?.[_0x2b2efe(0x191)]?.['node']&&!this[_0x2b2efe(0xec)],this[_0x2b2efe(0xf6)]=null,this[_0x2b2efe(0xd2)]=0x0,this[_0x2b2efe(0x1a0)]=0x14,this['_webSocketErrorDocsLink']=_0x2b2efe(0x168),this[_0x2b2efe(0x186)]=(this[_0x2b2efe(0xf1)]?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x2b2efe(0x134))+this[_0x2b2efe(0x116)];}async['getWebSocketClass'](){var _0x4a501e=_0x3adbce;if(this[_0x4a501e(0xf6)])return this[_0x4a501e(0xf6)];let _0x551618;if(this[_0x4a501e(0xf1)]||this[_0x4a501e(0xec)])_0x551618=this['global']['WebSocket'];else{if(this['global'][_0x4a501e(0x105)]?.[_0x4a501e(0x15c)])_0x551618=this[_0x4a501e(0x16f)][_0x4a501e(0x105)]?.[_0x4a501e(0x15c)];else try{let _0x4c90bc=await import(_0x4a501e(0xe5));_0x551618=(await import((await import(_0x4a501e(0x174)))[_0x4a501e(0x120)](_0x4c90bc[_0x4a501e(0xce)](this[_0x4a501e(0x149)],_0x4a501e(0x11a)))[_0x4a501e(0xcb)]()))[_0x4a501e(0x132)];}catch{try{_0x551618=require(require(_0x4a501e(0xe5))[_0x4a501e(0xce)](this[_0x4a501e(0x149)],'ws'));}catch{throw new Error(_0x4a501e(0xf3));}}}return this['_WebSocketClass']=_0x551618,_0x551618;}['_connectToHostNow'](){var _0x165517=_0x3adbce;this[_0x165517(0x158)]||this[_0x165517(0xd7)]||this['_connectAttemptCount']>=this[_0x165517(0x1a0)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x165517(0x158)]=!0x0,this[_0x165517(0xd2)]++,this[_0x165517(0x145)]=new Promise((_0x4188d6,_0x5d0702)=>{var _0x4d83fa=_0x165517;this[_0x4d83fa(0xf4)]()[_0x4d83fa(0x153)](_0x4e6a83=>{var _0x2b7756=_0x4d83fa;let _0x3aa81a=new _0x4e6a83(_0x2b7756(0xe1)+(!this[_0x2b7756(0xf1)]&&this[_0x2b7756(0x19f)]?'gateway.docker.internal':this[_0x2b7756(0x182)])+':'+this['port']);_0x3aa81a['onerror']=()=>{var _0x1edf08=_0x2b7756;this[_0x1edf08(0x196)]=!0x1,this[_0x1edf08(0x19d)](_0x3aa81a),this[_0x1edf08(0x17b)](),_0x5d0702(new Error('logger\\x20websocket\\x20error'));},_0x3aa81a['onopen']=()=>{var _0x3b97b3=_0x2b7756;this['_inBrowser']||_0x3aa81a[_0x3b97b3(0x18b)]&&_0x3aa81a[_0x3b97b3(0x18b)][_0x3b97b3(0x19e)]&&_0x3aa81a['_socket'][_0x3b97b3(0x19e)](),_0x4188d6(_0x3aa81a);},_0x3aa81a['onclose']=()=>{var _0x198c5e=_0x2b7756;this['_allowedToConnectOnSend']=!0x0,this[_0x198c5e(0x19d)](_0x3aa81a),this['_attemptToReconnectShortly']();},_0x3aa81a['onmessage']=_0x1a5e0b=>{var _0x289ec5=_0x2b7756;try{_0x1a5e0b&&_0x1a5e0b[_0x289ec5(0x10c)]&&this[_0x289ec5(0xf1)]&&JSON[_0x289ec5(0x14f)](_0x1a5e0b[_0x289ec5(0x10c)])[_0x289ec5(0x109)]==='reload'&&this[_0x289ec5(0x16f)][_0x289ec5(0x13e)]['reload']();}catch{}};})[_0x4d83fa(0x153)](_0x3fc563=>(this['_connected']=!0x0,this['_connecting']=!0x1,this[_0x4d83fa(0x126)]=!0x1,this[_0x4d83fa(0x196)]=!0x0,this['_connectAttemptCount']=0x0,_0x3fc563))[_0x4d83fa(0x17e)](_0x1cc8de=>(this[_0x4d83fa(0xd7)]=!0x1,this['_connecting']=!0x1,console[_0x4d83fa(0x17a)](_0x4d83fa(0x169)+this[_0x4d83fa(0x116)]),_0x5d0702(new Error(_0x4d83fa(0xd9)+(_0x1cc8de&&_0x1cc8de[_0x4d83fa(0x13d)])))));}));}[_0x3adbce(0x19d)](_0x22ac53){var _0x51cd54=_0x3adbce;this[_0x51cd54(0xd7)]=!0x1,this['_connecting']=!0x1;try{_0x22ac53[_0x51cd54(0x11e)]=null,_0x22ac53[_0x51cd54(0xfe)]=null,_0x22ac53[_0x51cd54(0x124)]=null;}catch{}try{_0x22ac53[_0x51cd54(0x197)]<0x2&&_0x22ac53[_0x51cd54(0xf9)]();}catch{}}['_attemptToReconnectShortly'](){var _0x4312bb=_0x3adbce;clearTimeout(this['_reconnectTimeout']),!(this[_0x4312bb(0xd2)]>=this[_0x4312bb(0x1a0)])&&(this[_0x4312bb(0x141)]=setTimeout(()=>{var _0x4b7dfc=_0x4312bb;this['_connected']||this['_connecting']||(this[_0x4b7dfc(0xeb)](),this[_0x4b7dfc(0x145)]?.[_0x4b7dfc(0x17e)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this[_0x4312bb(0x141)][_0x4312bb(0x19e)]&&this[_0x4312bb(0x141)][_0x4312bb(0x19e)]());}async[_0x3adbce(0xdf)](_0x52cc52){var _0x89f50d=_0x3adbce;try{if(!this[_0x89f50d(0x196)])return;this['_allowedToConnectOnSend']&&this[_0x89f50d(0xeb)](),(await this['_ws'])[_0x89f50d(0xdf)](JSON[_0x89f50d(0x10a)](_0x52cc52));}catch(_0x102eff){console[_0x89f50d(0x17a)](this['_sendErrorMessage']+':\\x20'+(_0x102eff&&_0x102eff['message'])),this[_0x89f50d(0x196)]=!0x1,this['_attemptToReconnectShortly']();}}};function b(_0x19958f,_0x1383fa,_0x2139ce,_0x2c96a2,_0x5563de,_0x11dc65){var _0x2d53aa=_0x3adbce;let _0x330056=_0x2139ce[_0x2d53aa(0x100)](',')[_0x2d53aa(0xdb)](_0x1c1391=>{var _0x26f845=_0x2d53aa;try{_0x19958f[_0x26f845(0x19b)]||((_0x5563de===_0x26f845(0x18d)||_0x5563de===_0x26f845(0x111)||_0x5563de===_0x26f845(0xdd)||_0x5563de===_0x26f845(0x12a))&&(_0x5563de+=!_0x19958f['process']?.[_0x26f845(0x191)]?.[_0x26f845(0x176)]&&_0x19958f[_0x26f845(0x105)]?.[_0x26f845(0x159)]?.[_0x26f845(0x114)]!==_0x26f845(0xd1)?_0x26f845(0xc3):_0x26f845(0xed)),_0x19958f[_0x26f845(0x19b)]={'id':+new Date(),'tool':_0x5563de});let _0x4c7591=new X(_0x19958f,_0x1383fa,_0x1c1391,_0x2c96a2,_0x11dc65);return _0x4c7591['send'][_0x26f845(0xdc)](_0x4c7591);}catch(_0x45c50e){return console[_0x26f845(0x17a)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host',_0x45c50e&&_0x45c50e[_0x26f845(0x13d)]),()=>{};}});return _0x14febf=>_0x330056['forEach'](_0x44e5a6=>_0x44e5a6(_0x14febf));}function _0x47d3(){var _0x3ff0af=['toLowerCase','parent','number','process','6813168BGIesy','_p_name','defineProperty','method','stringify','[object\\x20Set]','data','null','_setNodeId','function','stack','remix','totalStrLength','getOwnPropertySymbols','NEXT_RUNTIME','expressionsToEvaluate','_webSocketErrorDocsLink','index','11718513vuZMsX','__es'+'Module','ws/index.js','now','object','hostname','onclose','symbol','pathToFileURL','funcName','_HTMLAllCollection','_cleanNode','onopen','3IvejuF','_allowedToConnectOnSend','_setNodeExpressionPath','_isMap','_consoleNinjaAllowedToStart','angular','perf_hooks','cappedElements','8WgVDSB','Buffer','nuxt','_setNodeExpandableState','substr','default','undefined','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_objectToString','_sortProps','hasOwnProperty','_hasSymbolPropertyOnItsPath','string','match','forEach','89479dYYREi','message','location','getOwnPropertyNames','rootExpression','_reconnectTimeout','POSITIVE_INFINITY','6616160Jlpeet','trace','_ws','length','indexOf','negativeInfinity','nodeModules','_regExpToString','_setNodeLabel','name','Set','...','parse','4234592QXeDrR','timeEnd','create','then','String','[object\\x20Map]','elements','error','_connecting','env','_numberRegExp','serialize','_WebSocket','level','hrtime','autoExpandLimit','4326623vYqljb','disabledLog','_setNodeQueryPath','push','unknown','array',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.291\\\\node_modules\",'hits','https://tinyurl.com/37x8b79t','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','_console_ninja','_dateToString','sortProps','_getOwnPropertyNames','capped','global','_addObjectProperty','autoExpandPropertyCount','props','constructor','url','_quotedRegExp','node','get','_keyStrRegExp','autoExpandMaxDepth','warn','_attemptToReconnectShortly','prototype','timeStamp','catch','_isPrimitiveWrapperType','set','_isNegativeZero','host','_capIfString','_addLoadNode','autoExpandPreviousObjects','_sendErrorMessage','_processTreeNodeResult','[object\\x20Array]','log','[object\\x20BigInt]','_socket','[object\\x20Date]','next.js','call','_additionalMetadata','reduceLimits','versions','_undefined','_treeNodePropertiesAfterFullValue','_propertyName','bigint','_allowedToSend','readyState','strLength','type','autoExpand','_console_ninja_session','_treeNodePropertiesBeforeFullValue','_disposeWebsocket','unref','dockerizedApp','_maxConnectAttemptCount','date','slice','HTMLAllCollection','_Symbol','boolean','Number','_type','','allStrLength','time','_hasSetOnItsPath','\\x20browser','root_exp','valueOf','NEGATIVE_INFINITY','getOwnPropertyDescriptor','1710737464163','_p_','current','toString','_setNodePermissions','positiveInfinity','join','_addFunctionsNode','nan','edge','_connectAttemptCount','_isArray','concat','noFunctions','_getOwnPropertySymbols','_connected','Symbol','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','_property','map','bind','astro','count','send','1.0.0','ws://','pop','console','_hasMapOnItsPath','path','Map','_isSet','_blacklistedProperty','performance','_addProperty','_connectToHostNow','_inNextEdge','\\x20server','127.0.0.1','test','getter','_inBrowser','isExpressionToEvaluate','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','getWebSocketClass','1952294zlksyd','_WebSocketClass','stackTraceLimit',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'close','unshift','_getOwnPropertyDescriptor','replace','depth','onerror','_isPrimitiveType','split','value'];_0x47d3=function(){return _0x3ff0af;};return _0x47d3();}function W(_0x7d8cf5){var _0x3ddcbb=_0x3adbce;let _0x5b8927=function(_0x4c86db,_0x2c2491){return _0x2c2491-_0x4c86db;},_0x231fcb;if(_0x7d8cf5[_0x3ddcbb(0xe9)])_0x231fcb=function(){var _0x5e70fe=_0x3ddcbb;return _0x7d8cf5[_0x5e70fe(0xe9)]['now']();};else{if(_0x7d8cf5['process']&&_0x7d8cf5['process'][_0x3ddcbb(0x15e)]&&_0x7d8cf5['process']?.['env']?.[_0x3ddcbb(0x114)]!==_0x3ddcbb(0xd1))_0x231fcb=function(){var _0x3132c0=_0x3ddcbb;return _0x7d8cf5[_0x3132c0(0x105)][_0x3132c0(0x15e)]();},_0x5b8927=function(_0x396977,_0x5523bd){return 0x3e8*(_0x5523bd[0x0]-_0x396977[0x0])+(_0x5523bd[0x1]-_0x396977[0x1])/0xf4240;};else try{let {performance:_0x369015}=require(_0x3ddcbb(0x12b));_0x231fcb=function(){var _0x51f9cf=_0x3ddcbb;return _0x369015[_0x51f9cf(0x11b)]();};}catch{_0x231fcb=function(){return+new Date();};}}return{'elapsed':_0x5b8927,'timeStamp':_0x231fcb,'now':()=>Date[_0x3ddcbb(0x11b)]()};}function J(_0x2c8506,_0x3da473,_0x4491fe){var _0xc50fda=_0x3adbce;if(_0x2c8506[_0xc50fda(0x129)]!==void 0x0)return _0x2c8506[_0xc50fda(0x129)];let _0x7056bc=_0x2c8506[_0xc50fda(0x105)]?.[_0xc50fda(0x191)]?.[_0xc50fda(0x176)]||_0x2c8506[_0xc50fda(0x105)]?.[_0xc50fda(0x159)]?.[_0xc50fda(0x114)]===_0xc50fda(0xd1);return _0x7056bc&&_0x4491fe===_0xc50fda(0x12f)?_0x2c8506[_0xc50fda(0x129)]=!0x1:_0x2c8506[_0xc50fda(0x129)]=_0x7056bc||!_0x3da473||_0x2c8506['location']?.[_0xc50fda(0x11d)]&&_0x3da473['includes'](_0x2c8506[_0xc50fda(0x13e)][_0xc50fda(0x11d)]),_0x2c8506[_0xc50fda(0x129)];}function Y(_0x4b90ac,_0x349713,_0x431a9d,_0xb758db){var _0x5b3689=_0x3adbce;_0x4b90ac=_0x4b90ac,_0x349713=_0x349713,_0x431a9d=_0x431a9d,_0xb758db=_0xb758db;let _0x409c1a=W(_0x4b90ac),_0x23cd32=_0x409c1a['elapsed'],_0x237f40=_0x409c1a[_0x5b3689(0x17d)];class _0x2d25a6{constructor(){var _0x52d473=_0x5b3689;this[_0x52d473(0x178)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x52d473(0x15a)]=/^(0|[1-9][0-9]*)$/,this[_0x52d473(0x175)]=/'([^\\\\']|\\\\')*'/,this[_0x52d473(0x192)]=_0x4b90ac[_0x52d473(0x133)],this[_0x52d473(0x122)]=_0x4b90ac[_0x52d473(0x1a3)],this[_0x52d473(0xfb)]=Object[_0x52d473(0xc7)],this[_0x52d473(0x16d)]=Object[_0x52d473(0x13f)],this[_0x52d473(0xbb)]=_0x4b90ac[_0x52d473(0xd8)],this[_0x52d473(0x14a)]=RegExp[_0x52d473(0x17c)]['toString'],this[_0x52d473(0x16b)]=Date[_0x52d473(0x17c)]['toString'];}['serialize'](_0x5d715e,_0x3d6a2a,_0x919c16,_0x1411da){var _0x29603a=_0x5b3689,_0x23ac3e=this,_0x445f0c=_0x919c16[_0x29603a(0x19a)];function _0x132384(_0x2a1422,_0x19061b,_0x338b94){var _0x2f5335=_0x29603a;_0x19061b[_0x2f5335(0x199)]=_0x2f5335(0x164),_0x19061b[_0x2f5335(0x157)]=_0x2a1422['message'],_0x41db49=_0x338b94[_0x2f5335(0x176)][_0x2f5335(0xca)],_0x338b94[_0x2f5335(0x176)]['current']=_0x19061b,_0x23ac3e[_0x2f5335(0x19c)](_0x19061b,_0x338b94);}try{_0x919c16[_0x29603a(0x15d)]++,_0x919c16[_0x29603a(0x19a)]&&_0x919c16[_0x29603a(0x185)]['push'](_0x3d6a2a);var _0x4cbbd2,_0x378408,_0x45794c,_0x1d0f2f,_0x5adfb8=[],_0x4adabf=[],_0x541102,_0x3e5ddd=this[_0x29603a(0xbe)](_0x3d6a2a),_0x2d745d=_0x3e5ddd===_0x29603a(0x165),_0x198a45=!0x1,_0x13deec=_0x3e5ddd===_0x29603a(0x10f),_0x332fbc=this[_0x29603a(0xff)](_0x3e5ddd),_0x540619=this[_0x29603a(0x17f)](_0x3e5ddd),_0x9c0b82=_0x332fbc||_0x540619,_0x5ba70a={},_0x4f309b=0x0,_0x4f89aa=!0x1,_0x41db49,_0x31f5dc=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x919c16['depth']){if(_0x2d745d){if(_0x378408=_0x3d6a2a[_0x29603a(0x146)],_0x378408>_0x919c16[_0x29603a(0x156)]){for(_0x45794c=0x0,_0x1d0f2f=_0x919c16['elements'],_0x4cbbd2=_0x45794c;_0x4cbbd2<_0x1d0f2f;_0x4cbbd2++)_0x4adabf[_0x29603a(0x163)](_0x23ac3e[_0x29603a(0xea)](_0x5adfb8,_0x3d6a2a,_0x3e5ddd,_0x4cbbd2,_0x919c16));_0x5d715e[_0x29603a(0x12c)]=!0x0;}else{for(_0x45794c=0x0,_0x1d0f2f=_0x378408,_0x4cbbd2=_0x45794c;_0x4cbbd2<_0x1d0f2f;_0x4cbbd2++)_0x4adabf[_0x29603a(0x163)](_0x23ac3e[_0x29603a(0xea)](_0x5adfb8,_0x3d6a2a,_0x3e5ddd,_0x4cbbd2,_0x919c16));}_0x919c16[_0x29603a(0x171)]+=_0x4adabf[_0x29603a(0x146)];}if(!(_0x3e5ddd===_0x29603a(0x10d)||_0x3e5ddd===_0x29603a(0x133))&&!_0x332fbc&&_0x3e5ddd!==_0x29603a(0x154)&&_0x3e5ddd!==_0x29603a(0x12e)&&_0x3e5ddd!==_0x29603a(0x195)){var _0x4820fc=_0x1411da['props']||_0x919c16[_0x29603a(0x172)];if(this[_0x29603a(0xe7)](_0x3d6a2a)?(_0x4cbbd2=0x0,_0x3d6a2a[_0x29603a(0x13b)](function(_0x12e29d){var _0x2fdd32=_0x29603a;if(_0x4f309b++,_0x919c16[_0x2fdd32(0x171)]++,_0x4f309b>_0x4820fc){_0x4f89aa=!0x0;return;}if(!_0x919c16[_0x2fdd32(0xf2)]&&_0x919c16[_0x2fdd32(0x19a)]&&_0x919c16[_0x2fdd32(0x171)]>_0x919c16[_0x2fdd32(0x15f)]){_0x4f89aa=!0x0;return;}_0x4adabf[_0x2fdd32(0x163)](_0x23ac3e['_addProperty'](_0x5adfb8,_0x3d6a2a,_0x2fdd32(0x14d),_0x4cbbd2++,_0x919c16,function(_0x2a269f){return function(){return _0x2a269f;};}(_0x12e29d)));})):this[_0x29603a(0x128)](_0x3d6a2a)&&_0x3d6a2a[_0x29603a(0x13b)](function(_0x4a0ebb,_0x1049dc){var _0x8c08c6=_0x29603a;if(_0x4f309b++,_0x919c16['autoExpandPropertyCount']++,_0x4f309b>_0x4820fc){_0x4f89aa=!0x0;return;}if(!_0x919c16[_0x8c08c6(0xf2)]&&_0x919c16[_0x8c08c6(0x19a)]&&_0x919c16[_0x8c08c6(0x171)]>_0x919c16['autoExpandLimit']){_0x4f89aa=!0x0;return;}var _0x4260d7=_0x1049dc['toString']();_0x4260d7[_0x8c08c6(0x146)]>0x64&&(_0x4260d7=_0x4260d7[_0x8c08c6(0x1a2)](0x0,0x64)+_0x8c08c6(0x14e)),_0x4adabf['push'](_0x23ac3e['_addProperty'](_0x5adfb8,_0x3d6a2a,_0x8c08c6(0xe6),_0x4260d7,_0x919c16,function(_0x57258c){return function(){return _0x57258c;};}(_0x4a0ebb)));}),!_0x198a45){try{for(_0x541102 in _0x3d6a2a)if(!(_0x2d745d&&_0x31f5dc['test'](_0x541102))&&!this['_blacklistedProperty'](_0x3d6a2a,_0x541102,_0x919c16)){if(_0x4f309b++,_0x919c16[_0x29603a(0x171)]++,_0x4f309b>_0x4820fc){_0x4f89aa=!0x0;break;}if(!_0x919c16['isExpressionToEvaluate']&&_0x919c16[_0x29603a(0x19a)]&&_0x919c16['autoExpandPropertyCount']>_0x919c16['autoExpandLimit']){_0x4f89aa=!0x0;break;}_0x4adabf[_0x29603a(0x163)](_0x23ac3e[_0x29603a(0x170)](_0x5adfb8,_0x5ba70a,_0x3d6a2a,_0x3e5ddd,_0x541102,_0x919c16));}}catch{}if(_0x5ba70a['_p_length']=!0x0,_0x13deec&&(_0x5ba70a[_0x29603a(0x107)]=!0x0),!_0x4f89aa){var _0x1e0c96=[][_0x29603a(0xd4)](this['_getOwnPropertyNames'](_0x3d6a2a))[_0x29603a(0xd4)](this[_0x29603a(0xd6)](_0x3d6a2a));for(_0x4cbbd2=0x0,_0x378408=_0x1e0c96[_0x29603a(0x146)];_0x4cbbd2<_0x378408;_0x4cbbd2++)if(_0x541102=_0x1e0c96[_0x4cbbd2],!(_0x2d745d&&_0x31f5dc[_0x29603a(0xef)](_0x541102[_0x29603a(0xcb)]()))&&!this[_0x29603a(0xe8)](_0x3d6a2a,_0x541102,_0x919c16)&&!_0x5ba70a[_0x29603a(0xc9)+_0x541102[_0x29603a(0xcb)]()]){if(_0x4f309b++,_0x919c16[_0x29603a(0x171)]++,_0x4f309b>_0x4820fc){_0x4f89aa=!0x0;break;}if(!_0x919c16[_0x29603a(0xf2)]&&_0x919c16['autoExpand']&&_0x919c16['autoExpandPropertyCount']>_0x919c16['autoExpandLimit']){_0x4f89aa=!0x0;break;}_0x4adabf[_0x29603a(0x163)](_0x23ac3e['_addObjectProperty'](_0x5adfb8,_0x5ba70a,_0x3d6a2a,_0x3e5ddd,_0x541102,_0x919c16));}}}}}if(_0x5d715e[_0x29603a(0x199)]=_0x3e5ddd,_0x9c0b82?(_0x5d715e[_0x29603a(0x101)]=_0x3d6a2a['valueOf'](),this['_capIfString'](_0x3e5ddd,_0x5d715e,_0x919c16,_0x1411da)):_0x3e5ddd===_0x29603a(0x1a1)?_0x5d715e['value']=this[_0x29603a(0x16b)][_0x29603a(0x18e)](_0x3d6a2a):_0x3e5ddd===_0x29603a(0x195)?_0x5d715e[_0x29603a(0x101)]=_0x3d6a2a['toString']():_0x3e5ddd==='RegExp'?_0x5d715e[_0x29603a(0x101)]=this[_0x29603a(0x14a)][_0x29603a(0x18e)](_0x3d6a2a):_0x3e5ddd===_0x29603a(0x11f)&&this[_0x29603a(0xbb)]?_0x5d715e[_0x29603a(0x101)]=this[_0x29603a(0xbb)][_0x29603a(0x17c)][_0x29603a(0xcb)][_0x29603a(0x18e)](_0x3d6a2a):!_0x919c16['depth']&&!(_0x3e5ddd==='null'||_0x3e5ddd===_0x29603a(0x133))&&(delete _0x5d715e[_0x29603a(0x101)],_0x5d715e['capped']=!0x0),_0x4f89aa&&(_0x5d715e['cappedProps']=!0x0),_0x41db49=_0x919c16[_0x29603a(0x176)][_0x29603a(0xca)],_0x919c16[_0x29603a(0x176)][_0x29603a(0xca)]=_0x5d715e,this[_0x29603a(0x19c)](_0x5d715e,_0x919c16),_0x4adabf[_0x29603a(0x146)]){for(_0x4cbbd2=0x0,_0x378408=_0x4adabf[_0x29603a(0x146)];_0x4cbbd2<_0x378408;_0x4cbbd2++)_0x4adabf[_0x4cbbd2](_0x4cbbd2);}_0x5adfb8['length']&&(_0x5d715e['props']=_0x5adfb8);}catch(_0x23e0ea){_0x132384(_0x23e0ea,_0x5d715e,_0x919c16);}return this[_0x29603a(0x18f)](_0x3d6a2a,_0x5d715e),this[_0x29603a(0x193)](_0x5d715e,_0x919c16),_0x919c16[_0x29603a(0x176)][_0x29603a(0xca)]=_0x41db49,_0x919c16[_0x29603a(0x15d)]--,_0x919c16[_0x29603a(0x19a)]=_0x445f0c,_0x919c16[_0x29603a(0x19a)]&&_0x919c16[_0x29603a(0x185)][_0x29603a(0xe2)](),_0x5d715e;}[_0x5b3689(0xd6)](_0x2072b6){var _0x45d66a=_0x5b3689;return Object[_0x45d66a(0x113)]?Object[_0x45d66a(0x113)](_0x2072b6):[];}[_0x5b3689(0xe7)](_0x25b176){var _0x4b7384=_0x5b3689;return!!(_0x25b176&&_0x4b90ac[_0x4b7384(0x14d)]&&this[_0x4b7384(0x135)](_0x25b176)===_0x4b7384(0x10b)&&_0x25b176[_0x4b7384(0x13b)]);}[_0x5b3689(0xe8)](_0x24dcaf,_0x5a04c7,_0x4582f5){var _0xdd1104=_0x5b3689;return _0x4582f5[_0xdd1104(0xd5)]?typeof _0x24dcaf[_0x5a04c7]=='function':!0x1;}['_type'](_0x5a5917){var _0x14259b=_0x5b3689,_0x3d64d2='';return _0x3d64d2=typeof _0x5a5917,_0x3d64d2===_0x14259b(0x11c)?this[_0x14259b(0x135)](_0x5a5917)===_0x14259b(0x188)?_0x3d64d2='array':this[_0x14259b(0x135)](_0x5a5917)===_0x14259b(0x18c)?_0x3d64d2=_0x14259b(0x1a1):this[_0x14259b(0x135)](_0x5a5917)===_0x14259b(0x18a)?_0x3d64d2=_0x14259b(0x195):_0x5a5917===null?_0x3d64d2=_0x14259b(0x10d):_0x5a5917[_0x14259b(0x173)]&&(_0x3d64d2=_0x5a5917[_0x14259b(0x173)]['name']||_0x3d64d2):_0x3d64d2==='undefined'&&this['_HTMLAllCollection']&&_0x5a5917 instanceof this[_0x14259b(0x122)]&&(_0x3d64d2='HTMLAllCollection'),_0x3d64d2;}[_0x5b3689(0x135)](_0x46f612){var _0x451863=_0x5b3689;return Object[_0x451863(0x17c)][_0x451863(0xcb)][_0x451863(0x18e)](_0x46f612);}['_isPrimitiveType'](_0x1cdb9c){var _0x230a77=_0x5b3689;return _0x1cdb9c===_0x230a77(0xbc)||_0x1cdb9c===_0x230a77(0x139)||_0x1cdb9c===_0x230a77(0x104);}['_isPrimitiveWrapperType'](_0x26b1d9){var _0x3a60ee=_0x5b3689;return _0x26b1d9==='Boolean'||_0x26b1d9==='String'||_0x26b1d9===_0x3a60ee(0xbd);}['_addProperty'](_0x3cd9ae,_0x5318d2,_0xe6b712,_0x2ce3b3,_0x459119,_0xbe7c3d){var _0x57e37e=this;return function(_0x322df8){var _0x1aed5b=_0x18ea,_0x1018e3=_0x459119[_0x1aed5b(0x176)][_0x1aed5b(0xca)],_0x2ba464=_0x459119['node']['index'],_0x1b524b=_0x459119[_0x1aed5b(0x176)]['parent'];_0x459119[_0x1aed5b(0x176)][_0x1aed5b(0x103)]=_0x1018e3,_0x459119[_0x1aed5b(0x176)][_0x1aed5b(0x117)]=typeof _0x2ce3b3==_0x1aed5b(0x104)?_0x2ce3b3:_0x322df8,_0x3cd9ae[_0x1aed5b(0x163)](_0x57e37e[_0x1aed5b(0xda)](_0x5318d2,_0xe6b712,_0x2ce3b3,_0x459119,_0xbe7c3d)),_0x459119[_0x1aed5b(0x176)][_0x1aed5b(0x103)]=_0x1b524b,_0x459119[_0x1aed5b(0x176)][_0x1aed5b(0x117)]=_0x2ba464;};}[_0x5b3689(0x170)](_0x35f02a,_0x4cf0ee,_0x55f71b,_0x406642,_0x5d88c4,_0x48d622,_0x466ff3){var _0x54834d=_0x5b3689,_0x4b3112=this;return _0x4cf0ee['_p_'+_0x5d88c4[_0x54834d(0xcb)]()]=!0x0,function(_0x148642){var _0x4204a5=_0x54834d,_0x764359=_0x48d622[_0x4204a5(0x176)][_0x4204a5(0xca)],_0x35ea55=_0x48d622[_0x4204a5(0x176)]['index'],_0x48e624=_0x48d622[_0x4204a5(0x176)][_0x4204a5(0x103)];_0x48d622[_0x4204a5(0x176)][_0x4204a5(0x103)]=_0x764359,_0x48d622['node'][_0x4204a5(0x117)]=_0x148642,_0x35f02a[_0x4204a5(0x163)](_0x4b3112['_property'](_0x55f71b,_0x406642,_0x5d88c4,_0x48d622,_0x466ff3)),_0x48d622[_0x4204a5(0x176)]['parent']=_0x48e624,_0x48d622['node']['index']=_0x35ea55;};}[_0x5b3689(0xda)](_0x4c8bf6,_0x36a219,_0x1bf195,_0x5383c4,_0x1c600d){var _0x364b08=_0x5b3689,_0x4ef484=this;_0x1c600d||(_0x1c600d=function(_0xafd4df,_0x24a4cc){return _0xafd4df[_0x24a4cc];});var _0x2c28db=_0x1bf195[_0x364b08(0xcb)](),_0x32e574=_0x5383c4['expressionsToEvaluate']||{},_0x51084d=_0x5383c4[_0x364b08(0xfd)],_0x1a24e5=_0x5383c4['isExpressionToEvaluate'];try{var _0x2b4a49=this[_0x364b08(0x128)](_0x4c8bf6),_0x3fc394=_0x2c28db;_0x2b4a49&&_0x3fc394[0x0]==='\\x27'&&(_0x3fc394=_0x3fc394[_0x364b08(0x131)](0x1,_0x3fc394['length']-0x2));var _0x5a4cc4=_0x5383c4[_0x364b08(0x115)]=_0x32e574[_0x364b08(0xc9)+_0x3fc394];_0x5a4cc4&&(_0x5383c4['depth']=_0x5383c4[_0x364b08(0xfd)]+0x1),_0x5383c4['isExpressionToEvaluate']=!!_0x5a4cc4;var _0xe3f9c5=typeof _0x1bf195==_0x364b08(0x11f),_0x21b560={'name':_0xe3f9c5||_0x2b4a49?_0x2c28db:this[_0x364b08(0x194)](_0x2c28db)};if(_0xe3f9c5&&(_0x21b560[_0x364b08(0x11f)]=!0x0),!(_0x36a219===_0x364b08(0x165)||_0x36a219==='Error')){var _0x446c7f=this['_getOwnPropertyDescriptor'](_0x4c8bf6,_0x1bf195);if(_0x446c7f&&(_0x446c7f[_0x364b08(0x180)]&&(_0x21b560['setter']=!0x0),_0x446c7f[_0x364b08(0x177)]&&!_0x5a4cc4&&!_0x5383c4['resolveGetters']))return _0x21b560[_0x364b08(0xf0)]=!0x0,this[_0x364b08(0x187)](_0x21b560,_0x5383c4),_0x21b560;}var _0x3cd06b;try{_0x3cd06b=_0x1c600d(_0x4c8bf6,_0x1bf195);}catch(_0x3bc074){return _0x21b560={'name':_0x2c28db,'type':_0x364b08(0x164),'error':_0x3bc074['message']},this['_processTreeNodeResult'](_0x21b560,_0x5383c4),_0x21b560;}var _0x537cde=this[_0x364b08(0xbe)](_0x3cd06b),_0x555043=this['_isPrimitiveType'](_0x537cde);if(_0x21b560[_0x364b08(0x199)]=_0x537cde,_0x555043)this['_processTreeNodeResult'](_0x21b560,_0x5383c4,_0x3cd06b,function(){var _0x331c6d=_0x364b08;_0x21b560[_0x331c6d(0x101)]=_0x3cd06b[_0x331c6d(0xc5)](),!_0x5a4cc4&&_0x4ef484[_0x331c6d(0x183)](_0x537cde,_0x21b560,_0x5383c4,{});});else{var _0x32e4bb=_0x5383c4['autoExpand']&&_0x5383c4[_0x364b08(0x15d)]<_0x5383c4[_0x364b08(0x179)]&&_0x5383c4[_0x364b08(0x185)][_0x364b08(0x147)](_0x3cd06b)<0x0&&_0x537cde!==_0x364b08(0x10f)&&_0x5383c4[_0x364b08(0x171)]<_0x5383c4['autoExpandLimit'];_0x32e4bb||_0x5383c4[_0x364b08(0x15d)]<_0x51084d||_0x5a4cc4?(this[_0x364b08(0x15b)](_0x21b560,_0x3cd06b,_0x5383c4,_0x5a4cc4||{}),this['_additionalMetadata'](_0x3cd06b,_0x21b560)):this['_processTreeNodeResult'](_0x21b560,_0x5383c4,_0x3cd06b,function(){var _0x5bf045=_0x364b08;_0x537cde===_0x5bf045(0x10d)||_0x537cde===_0x5bf045(0x133)||(delete _0x21b560['value'],_0x21b560[_0x5bf045(0x16e)]=!0x0);});}return _0x21b560;}finally{_0x5383c4[_0x364b08(0x115)]=_0x32e574,_0x5383c4['depth']=_0x51084d,_0x5383c4['isExpressionToEvaluate']=_0x1a24e5;}}['_capIfString'](_0x474d43,_0x4e651e,_0x16e1c0,_0x1547f6){var _0x140abb=_0x5b3689,_0x91e945=_0x1547f6[_0x140abb(0x198)]||_0x16e1c0[_0x140abb(0x198)];if((_0x474d43===_0x140abb(0x139)||_0x474d43===_0x140abb(0x154))&&_0x4e651e['value']){let _0x211a72=_0x4e651e[_0x140abb(0x101)][_0x140abb(0x146)];_0x16e1c0[_0x140abb(0xc0)]+=_0x211a72,_0x16e1c0[_0x140abb(0xc0)]>_0x16e1c0[_0x140abb(0x112)]?(_0x4e651e[_0x140abb(0x16e)]='',delete _0x4e651e[_0x140abb(0x101)]):_0x211a72>_0x91e945&&(_0x4e651e[_0x140abb(0x16e)]=_0x4e651e[_0x140abb(0x101)][_0x140abb(0x131)](0x0,_0x91e945),delete _0x4e651e[_0x140abb(0x101)]);}}[_0x5b3689(0x128)](_0x13055b){var _0xddaa88=_0x5b3689;return!!(_0x13055b&&_0x4b90ac[_0xddaa88(0xe6)]&&this[_0xddaa88(0x135)](_0x13055b)===_0xddaa88(0x155)&&_0x13055b[_0xddaa88(0x13b)]);}['_propertyName'](_0x4067c9){var _0x2809d6=_0x5b3689;if(_0x4067c9['match'](/^\\d+$/))return _0x4067c9;var _0x4530bd;try{_0x4530bd=JSON['stringify'](''+_0x4067c9);}catch{_0x4530bd='\\x22'+this[_0x2809d6(0x135)](_0x4067c9)+'\\x22';}return _0x4530bd[_0x2809d6(0x13a)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x4530bd=_0x4530bd[_0x2809d6(0x131)](0x1,_0x4530bd[_0x2809d6(0x146)]-0x2):_0x4530bd=_0x4530bd[_0x2809d6(0xfc)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x2809d6(0xfc)](/(^\"|\"$)/g,'\\x27'),_0x4530bd;}[_0x5b3689(0x187)](_0x2ffcd8,_0x246054,_0x480e8f,_0x13f4ed){var _0x29d520=_0x5b3689;this[_0x29d520(0x19c)](_0x2ffcd8,_0x246054),_0x13f4ed&&_0x13f4ed(),this[_0x29d520(0x18f)](_0x480e8f,_0x2ffcd8),this[_0x29d520(0x193)](_0x2ffcd8,_0x246054);}[_0x5b3689(0x19c)](_0x2505ad,_0x8a2857){var _0x2780f1=_0x5b3689;this[_0x2780f1(0x10e)](_0x2505ad,_0x8a2857),this[_0x2780f1(0x162)](_0x2505ad,_0x8a2857),this[_0x2780f1(0x127)](_0x2505ad,_0x8a2857),this['_setNodePermissions'](_0x2505ad,_0x8a2857);}['_setNodeId'](_0x5f204a,_0x36550c){}[_0x5b3689(0x162)](_0x3b49e5,_0x3bdb3f){}[_0x5b3689(0x14b)](_0x1749f7,_0x41b891){}['_isUndefined'](_0x517c1a){var _0x4f6102=_0x5b3689;return _0x517c1a===this[_0x4f6102(0x192)];}[_0x5b3689(0x193)](_0x21dfb3,_0x46cafd){var _0x8998dc=_0x5b3689;this['_setNodeLabel'](_0x21dfb3,_0x46cafd),this['_setNodeExpandableState'](_0x21dfb3),_0x46cafd[_0x8998dc(0x16c)]&&this[_0x8998dc(0x136)](_0x21dfb3),this[_0x8998dc(0xcf)](_0x21dfb3,_0x46cafd),this[_0x8998dc(0x184)](_0x21dfb3,_0x46cafd),this[_0x8998dc(0x123)](_0x21dfb3);}[_0x5b3689(0x18f)](_0x459323,_0x14f090){var _0x3b3899=_0x5b3689;let _0x381d7a;try{_0x4b90ac['console']&&(_0x381d7a=_0x4b90ac[_0x3b3899(0xe3)][_0x3b3899(0x157)],_0x4b90ac[_0x3b3899(0xe3)][_0x3b3899(0x157)]=function(){}),_0x459323&&typeof _0x459323['length']==_0x3b3899(0x104)&&(_0x14f090[_0x3b3899(0x146)]=_0x459323[_0x3b3899(0x146)]);}catch{}finally{_0x381d7a&&(_0x4b90ac[_0x3b3899(0xe3)][_0x3b3899(0x157)]=_0x381d7a);}if(_0x14f090[_0x3b3899(0x199)]===_0x3b3899(0x104)||_0x14f090[_0x3b3899(0x199)]===_0x3b3899(0xbd)){if(isNaN(_0x14f090['value']))_0x14f090[_0x3b3899(0xd0)]=!0x0,delete _0x14f090[_0x3b3899(0x101)];else switch(_0x14f090['value']){case Number[_0x3b3899(0x142)]:_0x14f090[_0x3b3899(0xcd)]=!0x0,delete _0x14f090[_0x3b3899(0x101)];break;case Number[_0x3b3899(0xc6)]:_0x14f090[_0x3b3899(0x148)]=!0x0,delete _0x14f090[_0x3b3899(0x101)];break;case 0x0:this['_isNegativeZero'](_0x14f090['value'])&&(_0x14f090['negativeZero']=!0x0);break;}}else _0x14f090['type']===_0x3b3899(0x10f)&&typeof _0x459323['name']==_0x3b3899(0x139)&&_0x459323['name']&&_0x14f090[_0x3b3899(0x14c)]&&_0x459323['name']!==_0x14f090['name']&&(_0x14f090[_0x3b3899(0x121)]=_0x459323[_0x3b3899(0x14c)]);}[_0x5b3689(0x181)](_0xa08d08){var _0x4f9f26=_0x5b3689;return 0x1/_0xa08d08===Number[_0x4f9f26(0xc6)];}[_0x5b3689(0x136)](_0x296dbe){var _0x447188=_0x5b3689;!_0x296dbe['props']||!_0x296dbe[_0x447188(0x172)]['length']||_0x296dbe[_0x447188(0x199)]==='array'||_0x296dbe[_0x447188(0x199)]==='Map'||_0x296dbe['type']===_0x447188(0x14d)||_0x296dbe['props']['sort'](function(_0x3e0cb5,_0x2328a8){var _0x5f767b=_0x447188,_0x4f8192=_0x3e0cb5['name']['toLowerCase'](),_0x1b4f78=_0x2328a8['name'][_0x5f767b(0x102)]();return _0x4f8192<_0x1b4f78?-0x1:_0x4f8192>_0x1b4f78?0x1:0x0;});}[_0x5b3689(0xcf)](_0xfb92d3,_0x5567b9){var _0x482600=_0x5b3689;if(!(_0x5567b9['noFunctions']||!_0xfb92d3[_0x482600(0x172)]||!_0xfb92d3[_0x482600(0x172)]['length'])){for(var _0xba5778=[],_0x202fe3=[],_0x2c1d7d=0x0,_0x30fbdc=_0xfb92d3['props']['length'];_0x2c1d7d<_0x30fbdc;_0x2c1d7d++){var _0x4c1f5d=_0xfb92d3[_0x482600(0x172)][_0x2c1d7d];_0x4c1f5d['type']==='function'?_0xba5778[_0x482600(0x163)](_0x4c1f5d):_0x202fe3[_0x482600(0x163)](_0x4c1f5d);}if(!(!_0x202fe3['length']||_0xba5778[_0x482600(0x146)]<=0x1)){_0xfb92d3[_0x482600(0x172)]=_0x202fe3;var _0x598351={'functionsNode':!0x0,'props':_0xba5778};this['_setNodeId'](_0x598351,_0x5567b9),this[_0x482600(0x14b)](_0x598351,_0x5567b9),this[_0x482600(0x130)](_0x598351),this[_0x482600(0xcc)](_0x598351,_0x5567b9),_0x598351['id']+='\\x20f',_0xfb92d3['props'][_0x482600(0xfa)](_0x598351);}}}[_0x5b3689(0x184)](_0x2a5097,_0x2b58cc){}['_setNodeExpandableState'](_0x233d7a){}[_0x5b3689(0xd3)](_0xe93e6a){var _0x335107=_0x5b3689;return Array['isArray'](_0xe93e6a)||typeof _0xe93e6a==_0x335107(0x11c)&&this[_0x335107(0x135)](_0xe93e6a)===_0x335107(0x188);}['_setNodePermissions'](_0x4d89aa,_0x3bc66c){}['_cleanNode'](_0x47daee){var _0x491a8e=_0x5b3689;delete _0x47daee[_0x491a8e(0x138)],delete _0x47daee[_0x491a8e(0xc2)],delete _0x47daee[_0x491a8e(0xe4)];}[_0x5b3689(0x127)](_0x67f87d,_0x10449f){}}let _0x2ee4a9=new _0x2d25a6(),_0x59b3b0={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x14db9b={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x14872c(_0x9737d5,_0x2b3165,_0xbf6e5d,_0x1803d9,_0x3a415d,_0x259077){var _0x3f483c=_0x5b3689;let _0x14244e,_0x44ad1b;try{_0x44ad1b=_0x237f40(),_0x14244e=_0x431a9d[_0x2b3165],!_0x14244e||_0x44ad1b-_0x14244e['ts']>0x1f4&&_0x14244e[_0x3f483c(0xde)]&&_0x14244e[_0x3f483c(0xc1)]/_0x14244e['count']<0x64?(_0x431a9d[_0x2b3165]=_0x14244e={'count':0x0,'time':0x0,'ts':_0x44ad1b},_0x431a9d[_0x3f483c(0x167)]={}):_0x44ad1b-_0x431a9d['hits']['ts']>0x32&&_0x431a9d['hits']['count']&&_0x431a9d[_0x3f483c(0x167)][_0x3f483c(0xc1)]/_0x431a9d['hits'][_0x3f483c(0xde)]<0x64&&(_0x431a9d[_0x3f483c(0x167)]={});let _0x174749=[],_0x2d57b5=_0x14244e[_0x3f483c(0x190)]||_0x431a9d['hits'][_0x3f483c(0x190)]?_0x14db9b:_0x59b3b0,_0x1efa1a=_0x20f478=>{var _0x1d8fe3=_0x3f483c;let _0x5714f5={};return _0x5714f5[_0x1d8fe3(0x172)]=_0x20f478['props'],_0x5714f5[_0x1d8fe3(0x156)]=_0x20f478['elements'],_0x5714f5['strLength']=_0x20f478[_0x1d8fe3(0x198)],_0x5714f5[_0x1d8fe3(0x112)]=_0x20f478[_0x1d8fe3(0x112)],_0x5714f5[_0x1d8fe3(0x15f)]=_0x20f478[_0x1d8fe3(0x15f)],_0x5714f5['autoExpandMaxDepth']=_0x20f478[_0x1d8fe3(0x179)],_0x5714f5[_0x1d8fe3(0x16c)]=!0x1,_0x5714f5[_0x1d8fe3(0xd5)]=!_0x349713,_0x5714f5[_0x1d8fe3(0xfd)]=0x1,_0x5714f5[_0x1d8fe3(0x15d)]=0x0,_0x5714f5['expId']='root_exp_id',_0x5714f5[_0x1d8fe3(0x140)]=_0x1d8fe3(0xc4),_0x5714f5[_0x1d8fe3(0x19a)]=!0x0,_0x5714f5[_0x1d8fe3(0x185)]=[],_0x5714f5['autoExpandPropertyCount']=0x0,_0x5714f5['resolveGetters']=!0x0,_0x5714f5['allStrLength']=0x0,_0x5714f5[_0x1d8fe3(0x176)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x5714f5;};for(var _0x3e622f=0x0;_0x3e622f<_0x3a415d[_0x3f483c(0x146)];_0x3e622f++)_0x174749['push'](_0x2ee4a9[_0x3f483c(0x15b)]({'timeNode':_0x9737d5==='time'||void 0x0},_0x3a415d[_0x3e622f],_0x1efa1a(_0x2d57b5),{}));if(_0x9737d5===_0x3f483c(0x144)){let _0x8cba79=Error[_0x3f483c(0xf7)];try{Error['stackTraceLimit']=0x1/0x0,_0x174749[_0x3f483c(0x163)](_0x2ee4a9['serialize']({'stackNode':!0x0},new Error()[_0x3f483c(0x110)],_0x1efa1a(_0x2d57b5),{'strLength':0x1/0x0}));}finally{Error[_0x3f483c(0xf7)]=_0x8cba79;}}return{'method':_0x3f483c(0x189),'version':_0xb758db,'args':[{'ts':_0xbf6e5d,'session':_0x1803d9,'args':_0x174749,'id':_0x2b3165,'context':_0x259077}]};}catch(_0x363a6f){return{'method':_0x3f483c(0x189),'version':_0xb758db,'args':[{'ts':_0xbf6e5d,'session':_0x1803d9,'args':[{'type':_0x3f483c(0x164),'error':_0x363a6f&&_0x363a6f[_0x3f483c(0x13d)]}],'id':_0x2b3165,'context':_0x259077}]};}finally{try{if(_0x14244e&&_0x44ad1b){let _0x9d4808=_0x237f40();_0x14244e[_0x3f483c(0xde)]++,_0x14244e[_0x3f483c(0xc1)]+=_0x23cd32(_0x44ad1b,_0x9d4808),_0x14244e['ts']=_0x9d4808,_0x431a9d[_0x3f483c(0x167)][_0x3f483c(0xde)]++,_0x431a9d[_0x3f483c(0x167)][_0x3f483c(0xc1)]+=_0x23cd32(_0x44ad1b,_0x9d4808),_0x431a9d[_0x3f483c(0x167)]['ts']=_0x9d4808,(_0x14244e[_0x3f483c(0xde)]>0x32||_0x14244e[_0x3f483c(0xc1)]>0x64)&&(_0x14244e[_0x3f483c(0x190)]=!0x0),(_0x431a9d['hits'][_0x3f483c(0xde)]>0x3e8||_0x431a9d[_0x3f483c(0x167)][_0x3f483c(0xc1)]>0x12c)&&(_0x431a9d[_0x3f483c(0x167)]['reduceLimits']=!0x0);}}catch{}}}return _0x14872c;}((_0x38690a,_0x4d0c78,_0x50afb1,_0x542116,_0x422ba5,_0x933f5b,_0x2fd8e5,_0x2f932e,_0x54c326,_0x131916)=>{var _0x30a896=_0x3adbce;if(_0x38690a[_0x30a896(0x16a)])return _0x38690a[_0x30a896(0x16a)];if(!J(_0x38690a,_0x2f932e,_0x422ba5))return _0x38690a[_0x30a896(0x16a)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x38690a['_console_ninja'];let _0xcb01f7=W(_0x38690a),_0x1bd385=_0xcb01f7['elapsed'],_0x2c2689=_0xcb01f7['timeStamp'],_0x11747b=_0xcb01f7['now'],_0x41e568={'hits':{},'ts':{}},_0x4073e2=Y(_0x38690a,_0x54c326,_0x41e568,_0x933f5b),_0xb8ccb0=_0x319dac=>{_0x41e568['ts'][_0x319dac]=_0x2c2689();},_0x266598=(_0x2a5bfb,_0x5e51f8)=>{let _0x1cc496=_0x41e568['ts'][_0x5e51f8];if(delete _0x41e568['ts'][_0x5e51f8],_0x1cc496){let _0x48a760=_0x1bd385(_0x1cc496,_0x2c2689());_0xd8dfc9(_0x4073e2('time',_0x2a5bfb,_0x11747b(),_0xb79d7e,[_0x48a760],_0x5e51f8));}},_0x57bf54=_0x5c27ec=>_0x86401e=>{var _0x3949ae=_0x30a896;try{_0xb8ccb0(_0x86401e),_0x5c27ec(_0x86401e);}finally{_0x38690a[_0x3949ae(0xe3)][_0x3949ae(0xc1)]=_0x5c27ec;}},_0x470600=_0x5b1fe3=>_0x42c90e=>{var _0x20375b=_0x30a896;try{let [_0x130171,_0x342700]=_0x42c90e[_0x20375b(0x100)](':logPointId:');_0x266598(_0x342700,_0x130171),_0x5b1fe3(_0x130171);}finally{_0x38690a[_0x20375b(0xe3)][_0x20375b(0x151)]=_0x5b1fe3;}};_0x38690a[_0x30a896(0x16a)]={'consoleLog':(_0x555329,_0x524a83)=>{var _0x25a9e1=_0x30a896;_0x38690a['console'][_0x25a9e1(0x189)]['name']!==_0x25a9e1(0x161)&&_0xd8dfc9(_0x4073e2(_0x25a9e1(0x189),_0x555329,_0x11747b(),_0xb79d7e,_0x524a83));},'consoleTrace':(_0x2a1775,_0x48eeda)=>{var _0x22f792=_0x30a896;_0x38690a[_0x22f792(0xe3)][_0x22f792(0x189)]['name']!=='disabledTrace'&&_0xd8dfc9(_0x4073e2(_0x22f792(0x144),_0x2a1775,_0x11747b(),_0xb79d7e,_0x48eeda));},'consoleTime':()=>{var _0x4f8251=_0x30a896;_0x38690a[_0x4f8251(0xe3)]['time']=_0x57bf54(_0x38690a[_0x4f8251(0xe3)][_0x4f8251(0xc1)]);},'consoleTimeEnd':()=>{var _0x12940d=_0x30a896;_0x38690a[_0x12940d(0xe3)]['timeEnd']=_0x470600(_0x38690a[_0x12940d(0xe3)][_0x12940d(0x151)]);},'autoLog':(_0x402232,_0x2c11fd)=>{var _0x3fcc5e=_0x30a896;_0xd8dfc9(_0x4073e2(_0x3fcc5e(0x189),_0x2c11fd,_0x11747b(),_0xb79d7e,[_0x402232]));},'autoLogMany':(_0x2f18a2,_0x5a1513)=>{var _0x1f194e=_0x30a896;_0xd8dfc9(_0x4073e2(_0x1f194e(0x189),_0x2f18a2,_0x11747b(),_0xb79d7e,_0x5a1513));},'autoTrace':(_0x415500,_0x122c93)=>{var _0x18e408=_0x30a896;_0xd8dfc9(_0x4073e2(_0x18e408(0x144),_0x122c93,_0x11747b(),_0xb79d7e,[_0x415500]));},'autoTraceMany':(_0x5f2d8d,_0x47226e)=>{var _0x3b17ff=_0x30a896;_0xd8dfc9(_0x4073e2(_0x3b17ff(0x144),_0x5f2d8d,_0x11747b(),_0xb79d7e,_0x47226e));},'autoTime':(_0x2054c4,_0x45b2d3,_0x53874e)=>{_0xb8ccb0(_0x53874e);},'autoTimeEnd':(_0x4cc89a,_0x5b6b67,_0x58213e)=>{_0x266598(_0x5b6b67,_0x58213e);},'coverage':_0x48ccb8=>{_0xd8dfc9({'method':'coverage','version':_0x933f5b,'args':[{'id':_0x48ccb8}]});}};let _0xd8dfc9=b(_0x38690a,_0x4d0c78,_0x50afb1,_0x542116,_0x422ba5,_0x131916),_0xb79d7e=_0x38690a[_0x30a896(0x19b)];return _0x38690a[_0x30a896(0x16a)];})(globalThis,_0x3adbce(0xee),'51691',_0x3adbce(0x166),'webpack',_0x3adbce(0xe0),_0x3adbce(0xc8),_0x3adbce(0xf8),_0x3adbce(0xbf),'');");
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
function oo_ts() {
  try {
    oo_cm().consoleTime();
  } catch (e) {}
}
; /* istanbul ignore next */
function oo_te() {
  try {
    oo_cm().consoleTimeEnd();
  } catch (e) {}
}
; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/

/***/ })

}]);
//# sourceMappingURL=resources_js_react_tasks_pages_Subtasks_jsx.js.map