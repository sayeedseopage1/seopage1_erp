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
              return (/* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("4037401443_59_26_59_42_4", err)))
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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x52d0ab=_0x4288;(function(_0x64e502,_0x3b3f03){var _0x388be8=_0x4288,_0x2ffa3e=_0x64e502();while(!![]){try{var _0x3edc43=-parseInt(_0x388be8(0x1a6))/0x1+-parseInt(_0x388be8(0x10e))/0x2+parseInt(_0x388be8(0x14b))/0x3*(parseInt(_0x388be8(0x18d))/0x4)+-parseInt(_0x388be8(0x182))/0x5+-parseInt(_0x388be8(0x107))/0x6*(-parseInt(_0x388be8(0x117))/0x7)+parseInt(_0x388be8(0x1a3))/0x8*(parseInt(_0x388be8(0x1ad))/0x9)+-parseInt(_0x388be8(0x15d))/0xa*(-parseInt(_0x388be8(0xfa))/0xb);if(_0x3edc43===_0x3b3f03)break;else _0x2ffa3e['push'](_0x2ffa3e['shift']());}catch(_0x5e405f){_0x2ffa3e['push'](_0x2ffa3e['shift']());}}}(_0x5670,0xdd2aa));function _0x4288(_0x1a545d,_0x45d1d8){var _0x5670e5=_0x5670();return _0x4288=function(_0x428817,_0x95adf3){_0x428817=_0x428817-0xe7;var _0x40c87b=_0x5670e5[_0x428817];return _0x40c87b;},_0x4288(_0x1a545d,_0x45d1d8);}var j=Object[_0x52d0ab(0x149)],H=Object['defineProperty'],G=Object[_0x52d0ab(0x1a2)],ee=Object[_0x52d0ab(0x14e)],te=Object['getPrototypeOf'],ne=Object[_0x52d0ab(0x1af)]['hasOwnProperty'],re=(_0xb1f753,_0x3ddefb,_0x18c1d8,_0x541689)=>{var _0x37ebff=_0x52d0ab;if(_0x3ddefb&&typeof _0x3ddefb==_0x37ebff(0xfd)||typeof _0x3ddefb=='function'){for(let _0x4decdc of ee(_0x3ddefb))!ne[_0x37ebff(0x199)](_0xb1f753,_0x4decdc)&&_0x4decdc!==_0x18c1d8&&H(_0xb1f753,_0x4decdc,{'get':()=>_0x3ddefb[_0x4decdc],'enumerable':!(_0x541689=G(_0x3ddefb,_0x4decdc))||_0x541689[_0x37ebff(0x190)]});}return _0xb1f753;},x=(_0x1850ad,_0x33ba97,_0x49037b)=>(_0x49037b=_0x1850ad!=null?j(te(_0x1850ad)):{},re(_0x33ba97||!_0x1850ad||!_0x1850ad[_0x52d0ab(0x17f)]?H(_0x49037b,_0x52d0ab(0x101),{'value':_0x1850ad,'enumerable':!0x0}):_0x49037b,_0x1850ad)),X=class{constructor(_0x25822c,_0x2d6837,_0x203127,_0x53f673,_0x5f075f){var _0x4fef75=_0x52d0ab;this[_0x4fef75(0x127)]=_0x25822c,this['host']=_0x2d6837,this[_0x4fef75(0x12e)]=_0x203127,this[_0x4fef75(0x1b1)]=_0x53f673,this[_0x4fef75(0x1ae)]=_0x5f075f,this[_0x4fef75(0x17c)]=!0x0,this[_0x4fef75(0x172)]=!0x0,this[_0x4fef75(0x159)]=!0x1,this[_0x4fef75(0x10f)]=!0x1,this['_inNextEdge']=_0x25822c[_0x4fef75(0xf5)]?.[_0x4fef75(0x106)]?.[_0x4fef75(0x143)]===_0x4fef75(0x14f),this[_0x4fef75(0x183)]=!this[_0x4fef75(0x127)]['process']?.[_0x4fef75(0x171)]?.[_0x4fef75(0x197)]&&!this[_0x4fef75(0xe8)],this[_0x4fef75(0x19b)]=null,this[_0x4fef75(0x110)]=0x0,this[_0x4fef75(0xf4)]=0x14,this[_0x4fef75(0x17a)]='https://tinyurl.com/37x8b79t',this['_sendErrorMessage']=(this[_0x4fef75(0x183)]?_0x4fef75(0x1ba):_0x4fef75(0x102))+this['_webSocketErrorDocsLink'];}async[_0x52d0ab(0x1ab)](){var _0x22b66d=_0x52d0ab;if(this[_0x22b66d(0x19b)])return this[_0x22b66d(0x19b)];let _0x331bc0;if(this['_inBrowser']||this[_0x22b66d(0xe8)])_0x331bc0=this[_0x22b66d(0x127)][_0x22b66d(0x19d)];else{if(this['global'][_0x22b66d(0xf5)]?.[_0x22b66d(0x114)])_0x331bc0=this[_0x22b66d(0x127)][_0x22b66d(0xf5)]?.[_0x22b66d(0x114)];else try{let _0x3331aa=await import(_0x22b66d(0x135));_0x331bc0=(await import((await import('url'))['pathToFileURL'](_0x3331aa[_0x22b66d(0x11f)](this[_0x22b66d(0x1b1)],'ws/index.js'))[_0x22b66d(0x15c)]()))[_0x22b66d(0x101)];}catch{try{_0x331bc0=require(require('path')[_0x22b66d(0x11f)](this[_0x22b66d(0x1b1)],'ws'));}catch{throw new Error(_0x22b66d(0x113));}}}return this['_WebSocketClass']=_0x331bc0,_0x331bc0;}[_0x52d0ab(0x193)](){var _0x1eac2a=_0x52d0ab;this['_connecting']||this['_connected']||this[_0x1eac2a(0x110)]>=this[_0x1eac2a(0xf4)]||(this[_0x1eac2a(0x172)]=!0x1,this[_0x1eac2a(0x10f)]=!0x0,this[_0x1eac2a(0x110)]++,this[_0x1eac2a(0x154)]=new Promise((_0x3c5eac,_0x1fe573)=>{var _0x5d5bf2=_0x1eac2a;this['getWebSocketClass']()[_0x5d5bf2(0x19c)](_0x48fc6c=>{var _0x4c1d7c=_0x5d5bf2;let _0x4a4d0f=new _0x48fc6c(_0x4c1d7c(0x10c)+(!this[_0x4c1d7c(0x183)]&&this[_0x4c1d7c(0x1ae)]?'gateway.docker.internal':this[_0x4c1d7c(0xfb)])+':'+this[_0x4c1d7c(0x12e)]);_0x4a4d0f[_0x4c1d7c(0x164)]=()=>{var _0x17bf47=_0x4c1d7c;this[_0x17bf47(0x17c)]=!0x1,this[_0x17bf47(0xfc)](_0x4a4d0f),this[_0x17bf47(0x151)](),_0x1fe573(new Error(_0x17bf47(0x119)));},_0x4a4d0f['onopen']=()=>{var _0x111a35=_0x4c1d7c;this[_0x111a35(0x183)]||_0x4a4d0f[_0x111a35(0x1c4)]&&_0x4a4d0f[_0x111a35(0x1c4)][_0x111a35(0x1b9)]&&_0x4a4d0f['_socket'][_0x111a35(0x1b9)](),_0x3c5eac(_0x4a4d0f);},_0x4a4d0f[_0x4c1d7c(0x1cb)]=()=>{var _0x24705c=_0x4c1d7c;this[_0x24705c(0x172)]=!0x0,this['_disposeWebsocket'](_0x4a4d0f),this[_0x24705c(0x151)]();},_0x4a4d0f[_0x4c1d7c(0xed)]=_0x312a9b=>{var _0x3ad0a3=_0x4c1d7c;try{_0x312a9b&&_0x312a9b[_0x3ad0a3(0x140)]&&this[_0x3ad0a3(0x183)]&&JSON['parse'](_0x312a9b[_0x3ad0a3(0x140)])['method']===_0x3ad0a3(0x123)&&this['global'][_0x3ad0a3(0xee)][_0x3ad0a3(0x123)]();}catch{}};})['then'](_0xfe4a45=>(this[_0x5d5bf2(0x159)]=!0x0,this[_0x5d5bf2(0x10f)]=!0x1,this[_0x5d5bf2(0x172)]=!0x1,this[_0x5d5bf2(0x17c)]=!0x0,this[_0x5d5bf2(0x110)]=0x0,_0xfe4a45))[_0x5d5bf2(0x11c)](_0x557c22=>(this[_0x5d5bf2(0x159)]=!0x1,this['_connecting']=!0x1,console[_0x5d5bf2(0x11d)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x5d5bf2(0x17a)]),_0x1fe573(new Error(_0x5d5bf2(0x16f)+(_0x557c22&&_0x557c22[_0x5d5bf2(0x176)])))));}));}[_0x52d0ab(0xfc)](_0x4690f9){var _0x313762=_0x52d0ab;this[_0x313762(0x159)]=!0x1,this[_0x313762(0x10f)]=!0x1;try{_0x4690f9[_0x313762(0x1cb)]=null,_0x4690f9[_0x313762(0x164)]=null,_0x4690f9[_0x313762(0x1c0)]=null;}catch{}try{_0x4690f9[_0x313762(0x120)]<0x2&&_0x4690f9[_0x313762(0x15e)]();}catch{}}[_0x52d0ab(0x151)](){var _0x4b8d85=_0x52d0ab;clearTimeout(this[_0x4b8d85(0x1a4)]),!(this[_0x4b8d85(0x110)]>=this['_maxConnectAttemptCount'])&&(this[_0x4b8d85(0x1a4)]=setTimeout(()=>{var _0x4d0a3f=_0x4b8d85;this['_connected']||this[_0x4d0a3f(0x10f)]||(this[_0x4d0a3f(0x193)](),this[_0x4d0a3f(0x154)]?.[_0x4d0a3f(0x11c)](()=>this[_0x4d0a3f(0x151)]()));},0x1f4),this[_0x4b8d85(0x1a4)]['unref']&&this[_0x4b8d85(0x1a4)][_0x4b8d85(0x1b9)]());}async[_0x52d0ab(0x17b)](_0x5033eb){var _0xae2431=_0x52d0ab;try{if(!this[_0xae2431(0x17c)])return;this['_allowedToConnectOnSend']&&this[_0xae2431(0x193)](),(await this[_0xae2431(0x154)])[_0xae2431(0x17b)](JSON['stringify'](_0x5033eb));}catch(_0x3f9633){console[_0xae2431(0x11d)](this[_0xae2431(0x111)]+':\\x20'+(_0x3f9633&&_0x3f9633[_0xae2431(0x176)])),this['_allowedToSend']=!0x1,this['_attemptToReconnectShortly']();}}};function b(_0x519b1a,_0x33d3d0,_0x40991c,_0x5743ef,_0x34d18b,_0x1b82c8){var _0x4f2fd3=_0x52d0ab;let _0x30a8ce=_0x40991c[_0x4f2fd3(0x1a1)](',')[_0x4f2fd3(0x103)](_0x5a9a89=>{var _0x4cd862=_0x4f2fd3;try{_0x519b1a[_0x4cd862(0x1cd)]||((_0x34d18b===_0x4cd862(0x165)||_0x34d18b===_0x4cd862(0x14d)||_0x34d18b==='astro'||_0x34d18b==='angular')&&(_0x34d18b+=!_0x519b1a[_0x4cd862(0xf5)]?.[_0x4cd862(0x171)]?.[_0x4cd862(0x197)]&&_0x519b1a[_0x4cd862(0xf5)]?.[_0x4cd862(0x106)]?.[_0x4cd862(0x143)]!==_0x4cd862(0x14f)?_0x4cd862(0x1cc):'\\x20server'),_0x519b1a['_console_ninja_session']={'id':+new Date(),'tool':_0x34d18b});let _0x4b070a=new X(_0x519b1a,_0x33d3d0,_0x5a9a89,_0x5743ef,_0x1b82c8);return _0x4b070a[_0x4cd862(0x17b)]['bind'](_0x4b070a);}catch(_0x5d6d59){return console[_0x4cd862(0x11d)](_0x4cd862(0x1bd),_0x5d6d59&&_0x5d6d59[_0x4cd862(0x176)]),()=>{};}});return _0x3994f0=>_0x30a8ce[_0x4f2fd3(0x155)](_0x5ad773=>_0x5ad773(_0x3994f0));}function W(_0x38f1d1){var _0x54d2c4=_0x52d0ab;let _0x4da481=function(_0x158b62,_0xa636da){return _0xa636da-_0x158b62;},_0x5f32be;if(_0x38f1d1[_0x54d2c4(0xf8)])_0x5f32be=function(){var _0x77bb4f=_0x54d2c4;return _0x38f1d1[_0x77bb4f(0xf8)][_0x77bb4f(0x100)]();};else{if(_0x38f1d1[_0x54d2c4(0xf5)]&&_0x38f1d1[_0x54d2c4(0xf5)][_0x54d2c4(0x11e)]&&_0x38f1d1[_0x54d2c4(0xf5)]?.['env']?.[_0x54d2c4(0x143)]!==_0x54d2c4(0x14f))_0x5f32be=function(){var _0x4bfdad=_0x54d2c4;return _0x38f1d1['process'][_0x4bfdad(0x11e)]();},_0x4da481=function(_0x3bdbe7,_0x4115a3){return 0x3e8*(_0x4115a3[0x0]-_0x3bdbe7[0x0])+(_0x4115a3[0x1]-_0x3bdbe7[0x1])/0xf4240;};else try{let {performance:_0x121bd8}=require(_0x54d2c4(0x1b2));_0x5f32be=function(){var _0x12c687=_0x54d2c4;return _0x121bd8[_0x12c687(0x100)]();};}catch{_0x5f32be=function(){return+new Date();};}}return{'elapsed':_0x4da481,'timeStamp':_0x5f32be,'now':()=>Date[_0x54d2c4(0x100)]()};}function J(_0x4b351e,_0x11dccf,_0x329cb5){var _0x360280=_0x52d0ab;if(_0x4b351e['_consoleNinjaAllowedToStart']!==void 0x0)return _0x4b351e[_0x360280(0xf3)];let _0x4606d0=_0x4b351e['process']?.[_0x360280(0x171)]?.[_0x360280(0x197)]||_0x4b351e[_0x360280(0xf5)]?.[_0x360280(0x106)]?.[_0x360280(0x143)]===_0x360280(0x14f);return _0x4606d0&&_0x329cb5==='nuxt'?_0x4b351e[_0x360280(0xf3)]=!0x1:_0x4b351e[_0x360280(0xf3)]=_0x4606d0||!_0x11dccf||_0x4b351e[_0x360280(0xee)]?.[_0x360280(0x1a0)]&&_0x11dccf[_0x360280(0x160)](_0x4b351e[_0x360280(0xee)][_0x360280(0x1a0)]),_0x4b351e['_consoleNinjaAllowedToStart'];}function _0x5670(){var _0x49ac46=['replace','array','_propertyName','set','_addObjectProperty','152ZyKKGk','push','elements','enumerable','negativeInfinity','concat','_connectToHostNow','_hasMapOnItsPath','cappedProps','autoExpandPreviousObjects','node','pop','call','_keyStrRegExp','_WebSocketClass','then','WebSocket','console','allStrLength','hostname','split','getOwnPropertyDescriptor','10376NDppBH','_reconnectTimeout','date','394441xrYOUM','[object\\x20BigInt]','timeStamp','stack','depth','getWebSocketClass','_capIfString','10197ZoCAyJ','dockerizedApp','prototype','_Symbol','nodeModules','perf_hooks','autoExpandMaxDepth','capped','name','serialize','substr','getOwnPropertySymbols','unref','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','_getOwnPropertyDescriptor','time','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','_undefined','_blacklistedProperty','onopen','Error','[object\\x20Date]','_setNodeExpressionPath','_socket','_p_name','current','Boolean','null','autoExpand','_dateToString','onclose','\\x20browser','_console_ninja_session','_processTreeNodeResult','1708416645770','_inNextEdge','_sortProps','toLowerCase','parent','stackTraceLimit','onmessage','location','_treeNodePropertiesAfterFullValue',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'hits','_setNodeQueryPath','_consoleNinjaAllowedToStart','_maxConnectAttemptCount','process','_isNegativeZero','_setNodePermissions','performance','_isArray','33seXLAt','host','_disposeWebsocket','object','bigint','expressionsToEvaluate','now','default','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','map','_isPrimitiveWrapperType','cappedElements','env','103746ZNkeWI','_addLoadNode','_console_ninja','RegExp','negativeZero','ws://','boolean','3199228BfBnGu','_connecting','_connectAttemptCount','_sendErrorMessage','nan','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_WebSocket','isArray','NEGATIVE_INFINITY','14AGwjBX','error','logger\\x20websocket\\x20error','HTMLAllCollection','_objectToString','catch','warn','hrtime','join','readyState','timeEnd','log','reload','trace','elapsed','get','global','Number','autoExpandPropertyCount','_property','_addProperty','Set','autoExpandLimit','port','...','totalStrLength','_quotedRegExp','_treeNodePropertiesBeforeFullValue','_p_','_isUndefined','path','value','_getOwnPropertySymbols','POSITIVE_INFINITY','count','disabledTrace','_isMap','indexOf','strLength','function','valueOf','data','type','noFunctions','NEXT_RUNTIME','string','_isPrimitiveType','unknown','slice','funcName','create','symbol','84894IMDPJL','index','remix','getOwnPropertyNames','edge','isExpressionToEvaluate','_attemptToReconnectShortly','Buffer','_type','_ws','forEach','undefined','expId','[object\\x20Array]','_connected','resolveGetters','_setNodeId','toString','6693770TLpOTU','close','length','includes','rootExpression','setter','sort','onerror','next.js','props','level','52608','_additionalMetadata','127.0.0.1','webpack','String','reduceLimits','_regExpToString','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','_addFunctionsNode','versions','_allowedToConnectOnSend','stringify','_HTMLAllCollection','match','message','_getOwnPropertyNames','sortProps','root_exp_id','_webSocketErrorDocsLink','send','_allowedToSend','_setNodeExpandableState','_cleanNode','__es'+'Module','Map','_setNodeLabel','8437925JwfEwg','_inBrowser','_p_length','1.0.0','_isSet','[object\\x20Map]'];_0x5670=function(){return _0x49ac46;};return _0x5670();}function Y(_0x550b2c,_0x557863,_0x1fd817,_0x2ecc08){var _0x2bc7fc=_0x52d0ab;_0x550b2c=_0x550b2c,_0x557863=_0x557863,_0x1fd817=_0x1fd817,_0x2ecc08=_0x2ecc08;let _0x5a1546=W(_0x550b2c),_0x4ebf65=_0x5a1546[_0x2bc7fc(0x125)],_0x59255b=_0x5a1546[_0x2bc7fc(0x1a8)];class _0x4d447f{constructor(){var _0x4232a6=_0x2bc7fc;this[_0x4232a6(0x19a)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x4232a6(0x131)]=/'([^\\\\']|\\\\')*'/,this[_0x4232a6(0x1be)]=_0x550b2c[_0x4232a6(0x156)],this['_HTMLAllCollection']=_0x550b2c[_0x4232a6(0x11a)],this[_0x4232a6(0x1bb)]=Object[_0x4232a6(0x1a2)],this[_0x4232a6(0x177)]=Object[_0x4232a6(0x14e)],this[_0x4232a6(0x1b0)]=_0x550b2c['Symbol'],this[_0x4232a6(0x16e)]=RegExp[_0x4232a6(0x1af)][_0x4232a6(0x15c)],this['_dateToString']=Date[_0x4232a6(0x1af)][_0x4232a6(0x15c)];}[_0x2bc7fc(0x1b6)](_0x558961,_0xcb537c,_0x14aafb,_0x2d3613){var _0x5e3954=_0x2bc7fc,_0x3a9fbb=this,_0x23993a=_0x14aafb[_0x5e3954(0x1c9)];function _0x2fec3e(_0x5c45ee,_0x5cfaa1,_0x494242){var _0x25bc53=_0x5e3954;_0x5cfaa1[_0x25bc53(0x141)]='unknown',_0x5cfaa1[_0x25bc53(0x118)]=_0x5c45ee[_0x25bc53(0x176)],_0x5f26f4=_0x494242[_0x25bc53(0x197)]['current'],_0x494242[_0x25bc53(0x197)][_0x25bc53(0x1c6)]=_0x5cfaa1,_0x3a9fbb[_0x25bc53(0x132)](_0x5cfaa1,_0x494242);}try{_0x14aafb[_0x5e3954(0x167)]++,_0x14aafb['autoExpand']&&_0x14aafb[_0x5e3954(0x196)][_0x5e3954(0x18e)](_0xcb537c);var _0xa1adff,_0x271f42,_0x1591bc,_0x18838c,_0x33f099=[],_0x405ef1=[],_0x547d7a,_0x23dbaa=this['_type'](_0xcb537c),_0xc6d1f1=_0x23dbaa===_0x5e3954(0x189),_0x1d8652=!0x1,_0x5ef645=_0x23dbaa===_0x5e3954(0x13e),_0x1d228a=this[_0x5e3954(0x145)](_0x23dbaa),_0x43f4f5=this[_0x5e3954(0x104)](_0x23dbaa),_0x525933=_0x1d228a||_0x43f4f5,_0x23d71b={},_0x2258a5=0x0,_0x928434=!0x1,_0x5f26f4,_0x1c561f=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x14aafb[_0x5e3954(0x1aa)]){if(_0xc6d1f1){if(_0x271f42=_0xcb537c['length'],_0x271f42>_0x14aafb[_0x5e3954(0x18f)]){for(_0x1591bc=0x0,_0x18838c=_0x14aafb[_0x5e3954(0x18f)],_0xa1adff=_0x1591bc;_0xa1adff<_0x18838c;_0xa1adff++)_0x405ef1['push'](_0x3a9fbb[_0x5e3954(0x12b)](_0x33f099,_0xcb537c,_0x23dbaa,_0xa1adff,_0x14aafb));_0x558961[_0x5e3954(0x105)]=!0x0;}else{for(_0x1591bc=0x0,_0x18838c=_0x271f42,_0xa1adff=_0x1591bc;_0xa1adff<_0x18838c;_0xa1adff++)_0x405ef1[_0x5e3954(0x18e)](_0x3a9fbb[_0x5e3954(0x12b)](_0x33f099,_0xcb537c,_0x23dbaa,_0xa1adff,_0x14aafb));}_0x14aafb[_0x5e3954(0x129)]+=_0x405ef1['length'];}if(!(_0x23dbaa==='null'||_0x23dbaa===_0x5e3954(0x156))&&!_0x1d228a&&_0x23dbaa!==_0x5e3954(0x16c)&&_0x23dbaa!==_0x5e3954(0x152)&&_0x23dbaa!==_0x5e3954(0xfe)){var _0x1791ce=_0x2d3613[_0x5e3954(0x166)]||_0x14aafb[_0x5e3954(0x166)];if(this[_0x5e3954(0x186)](_0xcb537c)?(_0xa1adff=0x0,_0xcb537c[_0x5e3954(0x155)](function(_0x966d44){var _0x5cccba=_0x5e3954;if(_0x2258a5++,_0x14aafb['autoExpandPropertyCount']++,_0x2258a5>_0x1791ce){_0x928434=!0x0;return;}if(!_0x14aafb['isExpressionToEvaluate']&&_0x14aafb[_0x5cccba(0x1c9)]&&_0x14aafb[_0x5cccba(0x129)]>_0x14aafb[_0x5cccba(0x12d)]){_0x928434=!0x0;return;}_0x405ef1[_0x5cccba(0x18e)](_0x3a9fbb[_0x5cccba(0x12b)](_0x33f099,_0xcb537c,'Set',_0xa1adff++,_0x14aafb,function(_0xd1de09){return function(){return _0xd1de09;};}(_0x966d44)));})):this['_isMap'](_0xcb537c)&&_0xcb537c[_0x5e3954(0x155)](function(_0x5a3571,_0xa0f5a2){var _0x1ff4f1=_0x5e3954;if(_0x2258a5++,_0x14aafb[_0x1ff4f1(0x129)]++,_0x2258a5>_0x1791ce){_0x928434=!0x0;return;}if(!_0x14aafb['isExpressionToEvaluate']&&_0x14aafb[_0x1ff4f1(0x1c9)]&&_0x14aafb[_0x1ff4f1(0x129)]>_0x14aafb[_0x1ff4f1(0x12d)]){_0x928434=!0x0;return;}var _0x5f2246=_0xa0f5a2[_0x1ff4f1(0x15c)]();_0x5f2246[_0x1ff4f1(0x15f)]>0x64&&(_0x5f2246=_0x5f2246[_0x1ff4f1(0x147)](0x0,0x64)+_0x1ff4f1(0x12f)),_0x405ef1[_0x1ff4f1(0x18e)](_0x3a9fbb[_0x1ff4f1(0x12b)](_0x33f099,_0xcb537c,_0x1ff4f1(0x180),_0x5f2246,_0x14aafb,function(_0x2da3cf){return function(){return _0x2da3cf;};}(_0x5a3571)));}),!_0x1d8652){try{for(_0x547d7a in _0xcb537c)if(!(_0xc6d1f1&&_0x1c561f['test'](_0x547d7a))&&!this['_blacklistedProperty'](_0xcb537c,_0x547d7a,_0x14aafb)){if(_0x2258a5++,_0x14aafb[_0x5e3954(0x129)]++,_0x2258a5>_0x1791ce){_0x928434=!0x0;break;}if(!_0x14aafb[_0x5e3954(0x150)]&&_0x14aafb[_0x5e3954(0x1c9)]&&_0x14aafb['autoExpandPropertyCount']>_0x14aafb[_0x5e3954(0x12d)]){_0x928434=!0x0;break;}_0x405ef1[_0x5e3954(0x18e)](_0x3a9fbb[_0x5e3954(0x18c)](_0x33f099,_0x23d71b,_0xcb537c,_0x23dbaa,_0x547d7a,_0x14aafb));}}catch{}if(_0x23d71b[_0x5e3954(0x184)]=!0x0,_0x5ef645&&(_0x23d71b[_0x5e3954(0x1c5)]=!0x0),!_0x928434){var _0x336a3d=[][_0x5e3954(0x192)](this[_0x5e3954(0x177)](_0xcb537c))['concat'](this[_0x5e3954(0x137)](_0xcb537c));for(_0xa1adff=0x0,_0x271f42=_0x336a3d['length'];_0xa1adff<_0x271f42;_0xa1adff++)if(_0x547d7a=_0x336a3d[_0xa1adff],!(_0xc6d1f1&&_0x1c561f['test'](_0x547d7a[_0x5e3954(0x15c)]()))&&!this[_0x5e3954(0x1bf)](_0xcb537c,_0x547d7a,_0x14aafb)&&!_0x23d71b[_0x5e3954(0x133)+_0x547d7a[_0x5e3954(0x15c)]()]){if(_0x2258a5++,_0x14aafb['autoExpandPropertyCount']++,_0x2258a5>_0x1791ce){_0x928434=!0x0;break;}if(!_0x14aafb[_0x5e3954(0x150)]&&_0x14aafb['autoExpand']&&_0x14aafb[_0x5e3954(0x129)]>_0x14aafb[_0x5e3954(0x12d)]){_0x928434=!0x0;break;}_0x405ef1[_0x5e3954(0x18e)](_0x3a9fbb[_0x5e3954(0x18c)](_0x33f099,_0x23d71b,_0xcb537c,_0x23dbaa,_0x547d7a,_0x14aafb));}}}}}if(_0x558961[_0x5e3954(0x141)]=_0x23dbaa,_0x525933?(_0x558961['value']=_0xcb537c[_0x5e3954(0x13f)](),this[_0x5e3954(0x1ac)](_0x23dbaa,_0x558961,_0x14aafb,_0x2d3613)):_0x23dbaa===_0x5e3954(0x1a5)?_0x558961[_0x5e3954(0x136)]=this[_0x5e3954(0x1ca)][_0x5e3954(0x199)](_0xcb537c):_0x23dbaa===_0x5e3954(0xfe)?_0x558961[_0x5e3954(0x136)]=_0xcb537c['toString']():_0x23dbaa===_0x5e3954(0x10a)?_0x558961[_0x5e3954(0x136)]=this['_regExpToString'][_0x5e3954(0x199)](_0xcb537c):_0x23dbaa===_0x5e3954(0x14a)&&this[_0x5e3954(0x1b0)]?_0x558961[_0x5e3954(0x136)]=this[_0x5e3954(0x1b0)]['prototype']['toString'][_0x5e3954(0x199)](_0xcb537c):!_0x14aafb[_0x5e3954(0x1aa)]&&!(_0x23dbaa===_0x5e3954(0x1c8)||_0x23dbaa===_0x5e3954(0x156))&&(delete _0x558961[_0x5e3954(0x136)],_0x558961[_0x5e3954(0x1b4)]=!0x0),_0x928434&&(_0x558961[_0x5e3954(0x195)]=!0x0),_0x5f26f4=_0x14aafb[_0x5e3954(0x197)][_0x5e3954(0x1c6)],_0x14aafb[_0x5e3954(0x197)][_0x5e3954(0x1c6)]=_0x558961,this[_0x5e3954(0x132)](_0x558961,_0x14aafb),_0x405ef1[_0x5e3954(0x15f)]){for(_0xa1adff=0x0,_0x271f42=_0x405ef1[_0x5e3954(0x15f)];_0xa1adff<_0x271f42;_0xa1adff++)_0x405ef1[_0xa1adff](_0xa1adff);}_0x33f099[_0x5e3954(0x15f)]&&(_0x558961[_0x5e3954(0x166)]=_0x33f099);}catch(_0x4f7c5a){_0x2fec3e(_0x4f7c5a,_0x558961,_0x14aafb);}return this[_0x5e3954(0x169)](_0xcb537c,_0x558961),this['_treeNodePropertiesAfterFullValue'](_0x558961,_0x14aafb),_0x14aafb['node']['current']=_0x5f26f4,_0x14aafb[_0x5e3954(0x167)]--,_0x14aafb[_0x5e3954(0x1c9)]=_0x23993a,_0x14aafb['autoExpand']&&_0x14aafb['autoExpandPreviousObjects'][_0x5e3954(0x198)](),_0x558961;}[_0x2bc7fc(0x137)](_0x4db132){var _0x1f612b=_0x2bc7fc;return Object[_0x1f612b(0x1b8)]?Object['getOwnPropertySymbols'](_0x4db132):[];}[_0x2bc7fc(0x186)](_0x45023d){var _0x25da4f=_0x2bc7fc;return!!(_0x45023d&&_0x550b2c[_0x25da4f(0x12c)]&&this[_0x25da4f(0x11b)](_0x45023d)==='[object\\x20Set]'&&_0x45023d['forEach']);}[_0x2bc7fc(0x1bf)](_0x2acb0a,_0xbc83c3,_0x2719fa){var _0x3f816e=_0x2bc7fc;return _0x2719fa[_0x3f816e(0x142)]?typeof _0x2acb0a[_0xbc83c3]==_0x3f816e(0x13e):!0x1;}[_0x2bc7fc(0x153)](_0x58f201){var _0x4b774d=_0x2bc7fc,_0x4225ae='';return _0x4225ae=typeof _0x58f201,_0x4225ae===_0x4b774d(0xfd)?this['_objectToString'](_0x58f201)===_0x4b774d(0x158)?_0x4225ae=_0x4b774d(0x189):this['_objectToString'](_0x58f201)===_0x4b774d(0x1c2)?_0x4225ae=_0x4b774d(0x1a5):this['_objectToString'](_0x58f201)===_0x4b774d(0x1a7)?_0x4225ae=_0x4b774d(0xfe):_0x58f201===null?_0x4225ae=_0x4b774d(0x1c8):_0x58f201['constructor']&&(_0x4225ae=_0x58f201['constructor']['name']||_0x4225ae):_0x4225ae===_0x4b774d(0x156)&&this[_0x4b774d(0x174)]&&_0x58f201 instanceof this[_0x4b774d(0x174)]&&(_0x4225ae=_0x4b774d(0x11a)),_0x4225ae;}[_0x2bc7fc(0x11b)](_0x3cb00f){var _0x373504=_0x2bc7fc;return Object['prototype'][_0x373504(0x15c)][_0x373504(0x199)](_0x3cb00f);}['_isPrimitiveType'](_0x82601c){var _0x55a009=_0x2bc7fc;return _0x82601c===_0x55a009(0x10d)||_0x82601c==='string'||_0x82601c==='number';}[_0x2bc7fc(0x104)](_0x83440d){var _0x5a4d69=_0x2bc7fc;return _0x83440d===_0x5a4d69(0x1c7)||_0x83440d===_0x5a4d69(0x16c)||_0x83440d===_0x5a4d69(0x128);}[_0x2bc7fc(0x12b)](_0x302436,_0x17db08,_0x2225d8,_0x2f37eb,_0x5cdaa0,_0x1066f6){var _0x12593f=this;return function(_0x3f1880){var _0x4cfc99=_0x4288,_0x69831a=_0x5cdaa0[_0x4cfc99(0x197)]['current'],_0x431d48=_0x5cdaa0[_0x4cfc99(0x197)][_0x4cfc99(0x14c)],_0x46d5a7=_0x5cdaa0[_0x4cfc99(0x197)][_0x4cfc99(0xeb)];_0x5cdaa0[_0x4cfc99(0x197)][_0x4cfc99(0xeb)]=_0x69831a,_0x5cdaa0[_0x4cfc99(0x197)][_0x4cfc99(0x14c)]=typeof _0x2f37eb=='number'?_0x2f37eb:_0x3f1880,_0x302436[_0x4cfc99(0x18e)](_0x12593f['_property'](_0x17db08,_0x2225d8,_0x2f37eb,_0x5cdaa0,_0x1066f6)),_0x5cdaa0['node'][_0x4cfc99(0xeb)]=_0x46d5a7,_0x5cdaa0['node'][_0x4cfc99(0x14c)]=_0x431d48;};}[_0x2bc7fc(0x18c)](_0x30b949,_0x23dfa1,_0x3bc014,_0x30684f,_0x779dbc,_0x2f3f1e,_0x306238){var _0x77e67d=_0x2bc7fc,_0x22e679=this;return _0x23dfa1['_p_'+_0x779dbc[_0x77e67d(0x15c)]()]=!0x0,function(_0x446936){var _0x119821=_0x77e67d,_0x295eaa=_0x2f3f1e[_0x119821(0x197)][_0x119821(0x1c6)],_0x19149f=_0x2f3f1e[_0x119821(0x197)]['index'],_0x462dad=_0x2f3f1e['node'][_0x119821(0xeb)];_0x2f3f1e['node']['parent']=_0x295eaa,_0x2f3f1e[_0x119821(0x197)][_0x119821(0x14c)]=_0x446936,_0x30b949[_0x119821(0x18e)](_0x22e679['_property'](_0x3bc014,_0x30684f,_0x779dbc,_0x2f3f1e,_0x306238)),_0x2f3f1e[_0x119821(0x197)]['parent']=_0x462dad,_0x2f3f1e[_0x119821(0x197)]['index']=_0x19149f;};}[_0x2bc7fc(0x12a)](_0x49c406,_0x579cfa,_0x5ecf21,_0x59f33c,_0x5870f){var _0x24baa9=_0x2bc7fc,_0x39c13d=this;_0x5870f||(_0x5870f=function(_0x4e9722,_0x27833c){return _0x4e9722[_0x27833c];});var _0x2160e9=_0x5ecf21[_0x24baa9(0x15c)](),_0xe2dbaa=_0x59f33c[_0x24baa9(0xff)]||{},_0x184724=_0x59f33c[_0x24baa9(0x1aa)],_0xdf578b=_0x59f33c[_0x24baa9(0x150)];try{var _0x24e674=this[_0x24baa9(0x13b)](_0x49c406),_0x54077f=_0x2160e9;_0x24e674&&_0x54077f[0x0]==='\\x27'&&(_0x54077f=_0x54077f[_0x24baa9(0x1b7)](0x1,_0x54077f[_0x24baa9(0x15f)]-0x2));var _0x5c5e90=_0x59f33c[_0x24baa9(0xff)]=_0xe2dbaa[_0x24baa9(0x133)+_0x54077f];_0x5c5e90&&(_0x59f33c['depth']=_0x59f33c['depth']+0x1),_0x59f33c['isExpressionToEvaluate']=!!_0x5c5e90;var _0x5a8cb3=typeof _0x5ecf21==_0x24baa9(0x14a),_0x80b55={'name':_0x5a8cb3||_0x24e674?_0x2160e9:this[_0x24baa9(0x18a)](_0x2160e9)};if(_0x5a8cb3&&(_0x80b55[_0x24baa9(0x14a)]=!0x0),!(_0x579cfa===_0x24baa9(0x189)||_0x579cfa===_0x24baa9(0x1c1))){var _0x5a5c03=this[_0x24baa9(0x1bb)](_0x49c406,_0x5ecf21);if(_0x5a5c03&&(_0x5a5c03[_0x24baa9(0x18b)]&&(_0x80b55[_0x24baa9(0x162)]=!0x0),_0x5a5c03[_0x24baa9(0x126)]&&!_0x5c5e90&&!_0x59f33c[_0x24baa9(0x15a)]))return _0x80b55['getter']=!0x0,this['_processTreeNodeResult'](_0x80b55,_0x59f33c),_0x80b55;}var _0x4d4730;try{_0x4d4730=_0x5870f(_0x49c406,_0x5ecf21);}catch(_0x456b72){return _0x80b55={'name':_0x2160e9,'type':_0x24baa9(0x146),'error':_0x456b72[_0x24baa9(0x176)]},this['_processTreeNodeResult'](_0x80b55,_0x59f33c),_0x80b55;}var _0x30bf7b=this['_type'](_0x4d4730),_0x2cc470=this[_0x24baa9(0x145)](_0x30bf7b);if(_0x80b55[_0x24baa9(0x141)]=_0x30bf7b,_0x2cc470)this['_processTreeNodeResult'](_0x80b55,_0x59f33c,_0x4d4730,function(){var _0x16b4a0=_0x24baa9;_0x80b55[_0x16b4a0(0x136)]=_0x4d4730['valueOf'](),!_0x5c5e90&&_0x39c13d[_0x16b4a0(0x1ac)](_0x30bf7b,_0x80b55,_0x59f33c,{});});else{var _0x558c19=_0x59f33c[_0x24baa9(0x1c9)]&&_0x59f33c[_0x24baa9(0x167)]<_0x59f33c[_0x24baa9(0x1b3)]&&_0x59f33c[_0x24baa9(0x196)][_0x24baa9(0x13c)](_0x4d4730)<0x0&&_0x30bf7b!=='function'&&_0x59f33c[_0x24baa9(0x129)]<_0x59f33c[_0x24baa9(0x12d)];_0x558c19||_0x59f33c[_0x24baa9(0x167)]<_0x184724||_0x5c5e90?(this[_0x24baa9(0x1b6)](_0x80b55,_0x4d4730,_0x59f33c,_0x5c5e90||{}),this[_0x24baa9(0x169)](_0x4d4730,_0x80b55)):this[_0x24baa9(0x1ce)](_0x80b55,_0x59f33c,_0x4d4730,function(){var _0x300a88=_0x24baa9;_0x30bf7b==='null'||_0x30bf7b==='undefined'||(delete _0x80b55[_0x300a88(0x136)],_0x80b55[_0x300a88(0x1b4)]=!0x0);});}return _0x80b55;}finally{_0x59f33c[_0x24baa9(0xff)]=_0xe2dbaa,_0x59f33c[_0x24baa9(0x1aa)]=_0x184724,_0x59f33c[_0x24baa9(0x150)]=_0xdf578b;}}[_0x2bc7fc(0x1ac)](_0x4eb0d5,_0x3ea3a2,_0x108eb7,_0x2b5204){var _0x48621a=_0x2bc7fc,_0x2d61b6=_0x2b5204[_0x48621a(0x13d)]||_0x108eb7[_0x48621a(0x13d)];if((_0x4eb0d5===_0x48621a(0x144)||_0x4eb0d5===_0x48621a(0x16c))&&_0x3ea3a2[_0x48621a(0x136)]){let _0x18181a=_0x3ea3a2[_0x48621a(0x136)]['length'];_0x108eb7[_0x48621a(0x19f)]+=_0x18181a,_0x108eb7['allStrLength']>_0x108eb7[_0x48621a(0x130)]?(_0x3ea3a2[_0x48621a(0x1b4)]='',delete _0x3ea3a2['value']):_0x18181a>_0x2d61b6&&(_0x3ea3a2['capped']=_0x3ea3a2['value'][_0x48621a(0x1b7)](0x0,_0x2d61b6),delete _0x3ea3a2[_0x48621a(0x136)]);}}[_0x2bc7fc(0x13b)](_0x5cc512){var _0x5686c2=_0x2bc7fc;return!!(_0x5cc512&&_0x550b2c[_0x5686c2(0x180)]&&this[_0x5686c2(0x11b)](_0x5cc512)===_0x5686c2(0x187)&&_0x5cc512[_0x5686c2(0x155)]);}['_propertyName'](_0x1517e8){var _0x54ee9c=_0x2bc7fc;if(_0x1517e8[_0x54ee9c(0x175)](/^\\d+$/))return _0x1517e8;var _0x329b48;try{_0x329b48=JSON[_0x54ee9c(0x173)](''+_0x1517e8);}catch{_0x329b48='\\x22'+this[_0x54ee9c(0x11b)](_0x1517e8)+'\\x22';}return _0x329b48[_0x54ee9c(0x175)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x329b48=_0x329b48[_0x54ee9c(0x1b7)](0x1,_0x329b48[_0x54ee9c(0x15f)]-0x2):_0x329b48=_0x329b48[_0x54ee9c(0x188)](/'/g,'\\x5c\\x27')[_0x54ee9c(0x188)](/\\\\\"/g,'\\x22')[_0x54ee9c(0x188)](/(^\"|\"$)/g,'\\x27'),_0x329b48;}[_0x2bc7fc(0x1ce)](_0x3491b6,_0x3e8589,_0x57afe6,_0x1d7127){var _0x1318c4=_0x2bc7fc;this[_0x1318c4(0x132)](_0x3491b6,_0x3e8589),_0x1d7127&&_0x1d7127(),this[_0x1318c4(0x169)](_0x57afe6,_0x3491b6),this[_0x1318c4(0xef)](_0x3491b6,_0x3e8589);}[_0x2bc7fc(0x132)](_0x49d01e,_0x4e88b4){var _0x3d04d5=_0x2bc7fc;this[_0x3d04d5(0x15b)](_0x49d01e,_0x4e88b4),this['_setNodeQueryPath'](_0x49d01e,_0x4e88b4),this['_setNodeExpressionPath'](_0x49d01e,_0x4e88b4),this['_setNodePermissions'](_0x49d01e,_0x4e88b4);}[_0x2bc7fc(0x15b)](_0x2da94d,_0x1b77fc){}[_0x2bc7fc(0xf2)](_0x2fdf17,_0x1c2430){}[_0x2bc7fc(0x181)](_0x4f6667,_0x4e76b3){}[_0x2bc7fc(0x134)](_0x450710){var _0x322393=_0x2bc7fc;return _0x450710===this[_0x322393(0x1be)];}[_0x2bc7fc(0xef)](_0xf82776,_0x459132){var _0x52b57c=_0x2bc7fc;this['_setNodeLabel'](_0xf82776,_0x459132),this[_0x52b57c(0x17d)](_0xf82776),_0x459132['sortProps']&&this[_0x52b57c(0xe9)](_0xf82776),this['_addFunctionsNode'](_0xf82776,_0x459132),this[_0x52b57c(0x108)](_0xf82776,_0x459132),this[_0x52b57c(0x17e)](_0xf82776);}[_0x2bc7fc(0x169)](_0x1a813e,_0x431783){var _0x3adbc0=_0x2bc7fc;let _0x54fc58;try{_0x550b2c[_0x3adbc0(0x19e)]&&(_0x54fc58=_0x550b2c[_0x3adbc0(0x19e)]['error'],_0x550b2c[_0x3adbc0(0x19e)][_0x3adbc0(0x118)]=function(){}),_0x1a813e&&typeof _0x1a813e[_0x3adbc0(0x15f)]=='number'&&(_0x431783[_0x3adbc0(0x15f)]=_0x1a813e[_0x3adbc0(0x15f)]);}catch{}finally{_0x54fc58&&(_0x550b2c[_0x3adbc0(0x19e)]['error']=_0x54fc58);}if(_0x431783[_0x3adbc0(0x141)]==='number'||_0x431783['type']===_0x3adbc0(0x128)){if(isNaN(_0x431783[_0x3adbc0(0x136)]))_0x431783[_0x3adbc0(0x112)]=!0x0,delete _0x431783['value'];else switch(_0x431783[_0x3adbc0(0x136)]){case Number[_0x3adbc0(0x138)]:_0x431783['positiveInfinity']=!0x0,delete _0x431783[_0x3adbc0(0x136)];break;case Number[_0x3adbc0(0x116)]:_0x431783[_0x3adbc0(0x191)]=!0x0,delete _0x431783[_0x3adbc0(0x136)];break;case 0x0:this['_isNegativeZero'](_0x431783[_0x3adbc0(0x136)])&&(_0x431783[_0x3adbc0(0x10b)]=!0x0);break;}}else _0x431783['type']===_0x3adbc0(0x13e)&&typeof _0x1a813e[_0x3adbc0(0x1b5)]==_0x3adbc0(0x144)&&_0x1a813e[_0x3adbc0(0x1b5)]&&_0x431783[_0x3adbc0(0x1b5)]&&_0x1a813e[_0x3adbc0(0x1b5)]!==_0x431783[_0x3adbc0(0x1b5)]&&(_0x431783[_0x3adbc0(0x148)]=_0x1a813e[_0x3adbc0(0x1b5)]);}[_0x2bc7fc(0xf6)](_0x170fc0){var _0x4bc002=_0x2bc7fc;return 0x1/_0x170fc0===Number[_0x4bc002(0x116)];}[_0x2bc7fc(0xe9)](_0x21c0d4){var _0x2e26ec=_0x2bc7fc;!_0x21c0d4['props']||!_0x21c0d4[_0x2e26ec(0x166)][_0x2e26ec(0x15f)]||_0x21c0d4[_0x2e26ec(0x141)]===_0x2e26ec(0x189)||_0x21c0d4[_0x2e26ec(0x141)]===_0x2e26ec(0x180)||_0x21c0d4[_0x2e26ec(0x141)]===_0x2e26ec(0x12c)||_0x21c0d4[_0x2e26ec(0x166)][_0x2e26ec(0x163)](function(_0x8f83b,_0x46cdef){var _0x26c4f6=_0x2e26ec,_0x5c2205=_0x8f83b[_0x26c4f6(0x1b5)][_0x26c4f6(0xea)](),_0x2bf56b=_0x46cdef[_0x26c4f6(0x1b5)][_0x26c4f6(0xea)]();return _0x5c2205<_0x2bf56b?-0x1:_0x5c2205>_0x2bf56b?0x1:0x0;});}[_0x2bc7fc(0x170)](_0x3553e9,_0x1abcdd){var _0x2dbce5=_0x2bc7fc;if(!(_0x1abcdd[_0x2dbce5(0x142)]||!_0x3553e9['props']||!_0x3553e9[_0x2dbce5(0x166)]['length'])){for(var _0x403aa7=[],_0x12a51b=[],_0x41ee4b=0x0,_0x3c28d5=_0x3553e9['props'][_0x2dbce5(0x15f)];_0x41ee4b<_0x3c28d5;_0x41ee4b++){var _0x5793e1=_0x3553e9[_0x2dbce5(0x166)][_0x41ee4b];_0x5793e1[_0x2dbce5(0x141)]===_0x2dbce5(0x13e)?_0x403aa7['push'](_0x5793e1):_0x12a51b[_0x2dbce5(0x18e)](_0x5793e1);}if(!(!_0x12a51b[_0x2dbce5(0x15f)]||_0x403aa7[_0x2dbce5(0x15f)]<=0x1)){_0x3553e9[_0x2dbce5(0x166)]=_0x12a51b;var _0x9742ea={'functionsNode':!0x0,'props':_0x403aa7};this['_setNodeId'](_0x9742ea,_0x1abcdd),this[_0x2dbce5(0x181)](_0x9742ea,_0x1abcdd),this[_0x2dbce5(0x17d)](_0x9742ea),this[_0x2dbce5(0xf7)](_0x9742ea,_0x1abcdd),_0x9742ea['id']+='\\x20f',_0x3553e9[_0x2dbce5(0x166)]['unshift'](_0x9742ea);}}}[_0x2bc7fc(0x108)](_0x147312,_0x139a47){}['_setNodeExpandableState'](_0xd99018){}[_0x2bc7fc(0xf9)](_0x42c0be){var _0x26cc7d=_0x2bc7fc;return Array[_0x26cc7d(0x115)](_0x42c0be)||typeof _0x42c0be==_0x26cc7d(0xfd)&&this['_objectToString'](_0x42c0be)===_0x26cc7d(0x158);}[_0x2bc7fc(0xf7)](_0xe82969,_0x419119){}[_0x2bc7fc(0x17e)](_0x3ebfe6){var _0x2ea58f=_0x2bc7fc;delete _0x3ebfe6['_hasSymbolPropertyOnItsPath'],delete _0x3ebfe6['_hasSetOnItsPath'],delete _0x3ebfe6[_0x2ea58f(0x194)];}[_0x2bc7fc(0x1c3)](_0x272ea3,_0x470b7f){}}let _0x52e1a8=new _0x4d447f(),_0x579f7c={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x3aec00={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x4ce598(_0x5d1caf,_0xf14bd1,_0x4c72cc,_0x22b6d6,_0x42e5c8,_0x2ea4a7){var _0x15daef=_0x2bc7fc;let _0x160c7f,_0x2de1ab;try{_0x2de1ab=_0x59255b(),_0x160c7f=_0x1fd817[_0xf14bd1],!_0x160c7f||_0x2de1ab-_0x160c7f['ts']>0x1f4&&_0x160c7f[_0x15daef(0x139)]&&_0x160c7f[_0x15daef(0x1bc)]/_0x160c7f[_0x15daef(0x139)]<0x64?(_0x1fd817[_0xf14bd1]=_0x160c7f={'count':0x0,'time':0x0,'ts':_0x2de1ab},_0x1fd817[_0x15daef(0xf1)]={}):_0x2de1ab-_0x1fd817[_0x15daef(0xf1)]['ts']>0x32&&_0x1fd817[_0x15daef(0xf1)]['count']&&_0x1fd817[_0x15daef(0xf1)][_0x15daef(0x1bc)]/_0x1fd817[_0x15daef(0xf1)][_0x15daef(0x139)]<0x64&&(_0x1fd817[_0x15daef(0xf1)]={});let _0x3f7941=[],_0x5cb221=_0x160c7f[_0x15daef(0x16d)]||_0x1fd817[_0x15daef(0xf1)][_0x15daef(0x16d)]?_0x3aec00:_0x579f7c,_0x4ed45c=_0xd57519=>{var _0x16c9d4=_0x15daef;let _0xedd3a0={};return _0xedd3a0[_0x16c9d4(0x166)]=_0xd57519[_0x16c9d4(0x166)],_0xedd3a0['elements']=_0xd57519[_0x16c9d4(0x18f)],_0xedd3a0[_0x16c9d4(0x13d)]=_0xd57519[_0x16c9d4(0x13d)],_0xedd3a0[_0x16c9d4(0x130)]=_0xd57519[_0x16c9d4(0x130)],_0xedd3a0[_0x16c9d4(0x12d)]=_0xd57519[_0x16c9d4(0x12d)],_0xedd3a0[_0x16c9d4(0x1b3)]=_0xd57519[_0x16c9d4(0x1b3)],_0xedd3a0[_0x16c9d4(0x178)]=!0x1,_0xedd3a0[_0x16c9d4(0x142)]=!_0x557863,_0xedd3a0[_0x16c9d4(0x1aa)]=0x1,_0xedd3a0[_0x16c9d4(0x167)]=0x0,_0xedd3a0[_0x16c9d4(0x157)]=_0x16c9d4(0x179),_0xedd3a0[_0x16c9d4(0x161)]='root_exp',_0xedd3a0[_0x16c9d4(0x1c9)]=!0x0,_0xedd3a0[_0x16c9d4(0x196)]=[],_0xedd3a0['autoExpandPropertyCount']=0x0,_0xedd3a0[_0x16c9d4(0x15a)]=!0x0,_0xedd3a0['allStrLength']=0x0,_0xedd3a0[_0x16c9d4(0x197)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0xedd3a0;};for(var _0xa4690f=0x0;_0xa4690f<_0x42e5c8[_0x15daef(0x15f)];_0xa4690f++)_0x3f7941[_0x15daef(0x18e)](_0x52e1a8['serialize']({'timeNode':_0x5d1caf===_0x15daef(0x1bc)||void 0x0},_0x42e5c8[_0xa4690f],_0x4ed45c(_0x5cb221),{}));if(_0x5d1caf===_0x15daef(0x124)){let _0x42795e=Error[_0x15daef(0xec)];try{Error[_0x15daef(0xec)]=0x1/0x0,_0x3f7941[_0x15daef(0x18e)](_0x52e1a8[_0x15daef(0x1b6)]({'stackNode':!0x0},new Error()[_0x15daef(0x1a9)],_0x4ed45c(_0x5cb221),{'strLength':0x1/0x0}));}finally{Error[_0x15daef(0xec)]=_0x42795e;}}return{'method':_0x15daef(0x122),'version':_0x2ecc08,'args':[{'ts':_0x4c72cc,'session':_0x22b6d6,'args':_0x3f7941,'id':_0xf14bd1,'context':_0x2ea4a7}]};}catch(_0x206e7e){return{'method':'log','version':_0x2ecc08,'args':[{'ts':_0x4c72cc,'session':_0x22b6d6,'args':[{'type':_0x15daef(0x146),'error':_0x206e7e&&_0x206e7e['message']}],'id':_0xf14bd1,'context':_0x2ea4a7}]};}finally{try{if(_0x160c7f&&_0x2de1ab){let _0x1bfc46=_0x59255b();_0x160c7f[_0x15daef(0x139)]++,_0x160c7f[_0x15daef(0x1bc)]+=_0x4ebf65(_0x2de1ab,_0x1bfc46),_0x160c7f['ts']=_0x1bfc46,_0x1fd817[_0x15daef(0xf1)][_0x15daef(0x139)]++,_0x1fd817[_0x15daef(0xf1)]['time']+=_0x4ebf65(_0x2de1ab,_0x1bfc46),_0x1fd817[_0x15daef(0xf1)]['ts']=_0x1bfc46,(_0x160c7f[_0x15daef(0x139)]>0x32||_0x160c7f[_0x15daef(0x1bc)]>0x64)&&(_0x160c7f[_0x15daef(0x16d)]=!0x0),(_0x1fd817['hits'][_0x15daef(0x139)]>0x3e8||_0x1fd817[_0x15daef(0xf1)]['time']>0x12c)&&(_0x1fd817[_0x15daef(0xf1)][_0x15daef(0x16d)]=!0x0);}}catch{}}}return _0x4ce598;}((_0x13d48b,_0x2cf451,_0x1b6291,_0x45e143,_0x5a930b,_0x319010,_0x5d109a,_0x837f94,_0x3e1aeb,_0x4d7cf1)=>{var _0x23e2c8=_0x52d0ab;if(_0x13d48b[_0x23e2c8(0x109)])return _0x13d48b[_0x23e2c8(0x109)];if(!J(_0x13d48b,_0x837f94,_0x5a930b))return _0x13d48b[_0x23e2c8(0x109)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x13d48b['_console_ninja'];let _0x160de8=W(_0x13d48b),_0xf16b7d=_0x160de8[_0x23e2c8(0x125)],_0x1cba90=_0x160de8['timeStamp'],_0x87ba49=_0x160de8[_0x23e2c8(0x100)],_0x585f28={'hits':{},'ts':{}},_0x5b7f6d=Y(_0x13d48b,_0x3e1aeb,_0x585f28,_0x319010),_0x1b62da=_0x2e75b0=>{_0x585f28['ts'][_0x2e75b0]=_0x1cba90();},_0xbde5bb=(_0x3e4b17,_0x26dfba)=>{var _0x470ccc=_0x23e2c8;let _0x2aa21a=_0x585f28['ts'][_0x26dfba];if(delete _0x585f28['ts'][_0x26dfba],_0x2aa21a){let _0x11f2ef=_0xf16b7d(_0x2aa21a,_0x1cba90());_0x13cf15(_0x5b7f6d(_0x470ccc(0x1bc),_0x3e4b17,_0x87ba49(),_0x4bc8d7,[_0x11f2ef],_0x26dfba));}},_0x352c6f=_0x2bb6d5=>_0x5b37a=>{var _0x1c8ff4=_0x23e2c8;try{_0x1b62da(_0x5b37a),_0x2bb6d5(_0x5b37a);}finally{_0x13d48b[_0x1c8ff4(0x19e)][_0x1c8ff4(0x1bc)]=_0x2bb6d5;}},_0xf3e1db=_0x2fa109=>_0x38aef5=>{var _0x4fd96a=_0x23e2c8;try{let [_0x13b632,_0x804915]=_0x38aef5[_0x4fd96a(0x1a1)](':logPointId:');_0xbde5bb(_0x804915,_0x13b632),_0x2fa109(_0x13b632);}finally{_0x13d48b[_0x4fd96a(0x19e)]['timeEnd']=_0x2fa109;}};_0x13d48b[_0x23e2c8(0x109)]={'consoleLog':(_0xfdd16b,_0x13eba7)=>{var _0x5b2b54=_0x23e2c8;_0x13d48b[_0x5b2b54(0x19e)][_0x5b2b54(0x122)][_0x5b2b54(0x1b5)]!=='disabledLog'&&_0x13cf15(_0x5b7f6d(_0x5b2b54(0x122),_0xfdd16b,_0x87ba49(),_0x4bc8d7,_0x13eba7));},'consoleTrace':(_0x3ca0e4,_0x352fda)=>{var _0x414fa1=_0x23e2c8;_0x13d48b[_0x414fa1(0x19e)]['log'][_0x414fa1(0x1b5)]!==_0x414fa1(0x13a)&&_0x13cf15(_0x5b7f6d(_0x414fa1(0x124),_0x3ca0e4,_0x87ba49(),_0x4bc8d7,_0x352fda));},'consoleTime':()=>{var _0x591834=_0x23e2c8;_0x13d48b[_0x591834(0x19e)][_0x591834(0x1bc)]=_0x352c6f(_0x13d48b['console'][_0x591834(0x1bc)]);},'consoleTimeEnd':()=>{var _0x1f5f38=_0x23e2c8;_0x13d48b[_0x1f5f38(0x19e)]['timeEnd']=_0xf3e1db(_0x13d48b[_0x1f5f38(0x19e)][_0x1f5f38(0x121)]);},'autoLog':(_0x566339,_0x406e24)=>{var _0x1d9c8e=_0x23e2c8;_0x13cf15(_0x5b7f6d(_0x1d9c8e(0x122),_0x406e24,_0x87ba49(),_0x4bc8d7,[_0x566339]));},'autoLogMany':(_0x75caec,_0x3c3268)=>{var _0x557a87=_0x23e2c8;_0x13cf15(_0x5b7f6d(_0x557a87(0x122),_0x75caec,_0x87ba49(),_0x4bc8d7,_0x3c3268));},'autoTrace':(_0x118467,_0x616aa8)=>{var _0xe70349=_0x23e2c8;_0x13cf15(_0x5b7f6d(_0xe70349(0x124),_0x616aa8,_0x87ba49(),_0x4bc8d7,[_0x118467]));},'autoTraceMany':(_0x5b27d9,_0xc98a4e)=>{_0x13cf15(_0x5b7f6d('trace',_0x5b27d9,_0x87ba49(),_0x4bc8d7,_0xc98a4e));},'autoTime':(_0x29944c,_0x2e6acb,_0x2d70f7)=>{_0x1b62da(_0x2d70f7);},'autoTimeEnd':(_0x4f9e0c,_0x4c7386,_0x4e20b4)=>{_0xbde5bb(_0x4c7386,_0x4e20b4);},'coverage':_0x4def18=>{_0x13cf15({'method':'coverage','version':_0x319010,'args':[{'id':_0x4def18}]});}};let _0x13cf15=b(_0x13d48b,_0x2cf451,_0x1b6291,_0x45e143,_0x5a930b,_0x4d7cf1),_0x4bc8d7=_0x13d48b['_console_ninja_session'];return _0x13d48b[_0x23e2c8(0x109)];})(globalThis,_0x52d0ab(0x16a),_0x52d0ab(0x168),\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.287\\\\node_modules\",_0x52d0ab(0x16b),_0x52d0ab(0x185),_0x52d0ab(0xe7),_0x52d0ab(0xf0),'','');");
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