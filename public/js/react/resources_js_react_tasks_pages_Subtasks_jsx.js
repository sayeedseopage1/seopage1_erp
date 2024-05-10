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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x390ccb=_0x198f;(function(_0x225c4f,_0x40ca16){var _0x497242=_0x198f,_0x43d27d=_0x225c4f();while(!![]){try{var _0x4facf3=parseInt(_0x497242(0x177))/0x1+parseInt(_0x497242(0x20d))/0x2+-parseInt(_0x497242(0x179))/0x3*(parseInt(_0x497242(0x15f))/0x4)+parseInt(_0x497242(0x1aa))/0x5+parseInt(_0x497242(0x1bb))/0x6*(parseInt(_0x497242(0x1cc))/0x7)+parseInt(_0x497242(0x1da))/0x8*(-parseInt(_0x497242(0x17b))/0x9)+-parseInt(_0x497242(0x13a))/0xa;if(_0x4facf3===_0x40ca16)break;else _0x43d27d['push'](_0x43d27d['shift']());}catch(_0x1d8de6){_0x43d27d['push'](_0x43d27d['shift']());}}}(_0x4725,0x569a1));var K=Object['create'],Q=Object[_0x390ccb(0x16d)],G=Object[_0x390ccb(0x1bf)],ee=Object['getOwnPropertyNames'],te=Object[_0x390ccb(0x13d)],ne=Object['prototype'][_0x390ccb(0x1c7)],re=(_0x5602d3,_0x2ed3b9,_0x415c00,_0x328e60)=>{var _0x4cf343=_0x390ccb;if(_0x2ed3b9&&typeof _0x2ed3b9==_0x4cf343(0x1f5)||typeof _0x2ed3b9==_0x4cf343(0x1a9)){for(let _0x32b58a of ee(_0x2ed3b9))!ne[_0x4cf343(0x206)](_0x5602d3,_0x32b58a)&&_0x32b58a!==_0x415c00&&Q(_0x5602d3,_0x32b58a,{'get':()=>_0x2ed3b9[_0x32b58a],'enumerable':!(_0x328e60=G(_0x2ed3b9,_0x32b58a))||_0x328e60['enumerable']});}return _0x5602d3;},V=(_0x1a7549,_0x17cd82,_0x2c2d5c)=>(_0x2c2d5c=_0x1a7549!=null?K(te(_0x1a7549)):{},re(_0x17cd82||!_0x1a7549||!_0x1a7549[_0x390ccb(0x149)]?Q(_0x2c2d5c,_0x390ccb(0x189),{'value':_0x1a7549,'enumerable':!0x0}):_0x2c2d5c,_0x1a7549)),x=class{constructor(_0x321136,_0x5ed961,_0x245114,_0x1c4682,_0x68e674,_0x4a62d2){var _0x3ed998=_0x390ccb;this[_0x3ed998(0x16f)]=_0x321136,this[_0x3ed998(0x14b)]=_0x5ed961,this[_0x3ed998(0x165)]=_0x245114,this[_0x3ed998(0x217)]=_0x1c4682,this[_0x3ed998(0x1df)]=_0x68e674,this[_0x3ed998(0x150)]=_0x4a62d2,this[_0x3ed998(0x1f3)]=!0x0,this[_0x3ed998(0x1f7)]=!0x0,this[_0x3ed998(0x172)]=!0x1,this['_connecting']=!0x1,this[_0x3ed998(0x20a)]=_0x321136[_0x3ed998(0x1c3)]?.[_0x3ed998(0x218)]?.[_0x3ed998(0x17a)]===_0x3ed998(0x1a5),this[_0x3ed998(0x17e)]=!this[_0x3ed998(0x16f)][_0x3ed998(0x1c3)]?.[_0x3ed998(0x154)]?.[_0x3ed998(0x174)]&&!this[_0x3ed998(0x20a)],this[_0x3ed998(0x1a3)]=null,this[_0x3ed998(0x1ea)]=0x0,this[_0x3ed998(0x1f9)]=0x14,this[_0x3ed998(0x1a1)]=_0x3ed998(0x15d),this['_sendErrorMessage']=(this[_0x3ed998(0x17e)]?_0x3ed998(0x1ba):'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20')+this['_webSocketErrorDocsLink'];}async['getWebSocketClass'](){var _0x5ce666=_0x390ccb;if(this[_0x5ce666(0x1a3)])return this[_0x5ce666(0x1a3)];let _0x3ed7a1;if(this[_0x5ce666(0x17e)]||this[_0x5ce666(0x20a)])_0x3ed7a1=this[_0x5ce666(0x16f)][_0x5ce666(0x1be)];else{if(this[_0x5ce666(0x16f)][_0x5ce666(0x1c3)]?.[_0x5ce666(0x1f2)])_0x3ed7a1=this[_0x5ce666(0x16f)][_0x5ce666(0x1c3)]?.[_0x5ce666(0x1f2)];else try{let _0x12c6b8=await import(_0x5ce666(0x1de));_0x3ed7a1=(await import((await import('url'))[_0x5ce666(0x1d6)](_0x12c6b8[_0x5ce666(0x1eb)](this[_0x5ce666(0x217)],'ws/index.js'))[_0x5ce666(0x170)]()))[_0x5ce666(0x189)];}catch{try{_0x3ed7a1=require(require(_0x5ce666(0x1de))[_0x5ce666(0x1eb)](this[_0x5ce666(0x217)],'ws'));}catch{throw new Error(_0x5ce666(0x1b4));}}}return this[_0x5ce666(0x1a3)]=_0x3ed7a1,_0x3ed7a1;}[_0x390ccb(0x16a)](){var _0x1d5565=_0x390ccb;this[_0x1d5565(0x1fd)]||this[_0x1d5565(0x172)]||this['_connectAttemptCount']>=this[_0x1d5565(0x1f9)]||(this[_0x1d5565(0x1f7)]=!0x1,this[_0x1d5565(0x1fd)]=!0x0,this[_0x1d5565(0x1ea)]++,this[_0x1d5565(0x15a)]=new Promise((_0x2e2694,_0x53c53d)=>{var _0x1959ec=_0x1d5565;this['getWebSocketClass']()['then'](_0x3aeb70=>{var _0xbf201e=_0x198f;let _0x5e2fd8=new _0x3aeb70('ws://'+(!this[_0xbf201e(0x17e)]&&this[_0xbf201e(0x1df)]?_0xbf201e(0x1f8):this[_0xbf201e(0x14b)])+':'+this[_0xbf201e(0x165)]);_0x5e2fd8[_0xbf201e(0x135)]=()=>{var _0xe625e8=_0xbf201e;this[_0xe625e8(0x1f3)]=!0x1,this[_0xe625e8(0x133)](_0x5e2fd8),this[_0xe625e8(0x16e)](),_0x53c53d(new Error('logger\\x20websocket\\x20error'));},_0x5e2fd8[_0xbf201e(0x14f)]=()=>{var _0x342580=_0xbf201e;this[_0x342580(0x17e)]||_0x5e2fd8['_socket']&&_0x5e2fd8[_0x342580(0x1e4)][_0x342580(0x1fb)]&&_0x5e2fd8['_socket'][_0x342580(0x1fb)](),_0x2e2694(_0x5e2fd8);},_0x5e2fd8[_0xbf201e(0x169)]=()=>{var _0x28d046=_0xbf201e;this['_allowedToConnectOnSend']=!0x0,this[_0x28d046(0x133)](_0x5e2fd8),this[_0x28d046(0x16e)]();},_0x5e2fd8['onmessage']=_0x574ccb=>{var _0x5d7428=_0xbf201e;try{if(!_0x574ccb?.['data']||!this['eventReceivedCallback'])return;let _0x1698be=JSON['parse'](_0x574ccb[_0x5d7428(0x1dc)]);this[_0x5d7428(0x150)](_0x1698be[_0x5d7428(0x210)],_0x1698be[_0x5d7428(0x17c)],this[_0x5d7428(0x16f)],this[_0x5d7428(0x17e)]);}catch{}};})[_0x1959ec(0x158)](_0x455a48=>(this[_0x1959ec(0x172)]=!0x0,this[_0x1959ec(0x1fd)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this['_connectAttemptCount']=0x0,_0x455a48))[_0x1959ec(0x1c1)](_0x3434ab=>(this[_0x1959ec(0x172)]=!0x1,this[_0x1959ec(0x1fd)]=!0x1,console[_0x1959ec(0x18e)](_0x1959ec(0x15e)+this['_webSocketErrorDocsLink']),_0x53c53d(new Error(_0x1959ec(0x17f)+(_0x3434ab&&_0x3434ab['message'])))));}));}[_0x390ccb(0x133)](_0x477a3f){var _0x22d703=_0x390ccb;this[_0x22d703(0x172)]=!0x1,this[_0x22d703(0x1fd)]=!0x1;try{_0x477a3f[_0x22d703(0x169)]=null,_0x477a3f[_0x22d703(0x135)]=null,_0x477a3f[_0x22d703(0x14f)]=null;}catch{}try{_0x477a3f[_0x22d703(0x1d3)]<0x2&&_0x477a3f[_0x22d703(0x1d4)]();}catch{}}[_0x390ccb(0x16e)](){var _0x4a31d2=_0x390ccb;clearTimeout(this['_reconnectTimeout']),!(this['_connectAttemptCount']>=this[_0x4a31d2(0x1f9)])&&(this[_0x4a31d2(0x137)]=setTimeout(()=>{var _0x5d0b70=_0x4a31d2;this[_0x5d0b70(0x172)]||this[_0x5d0b70(0x1fd)]||(this[_0x5d0b70(0x16a)](),this[_0x5d0b70(0x15a)]?.[_0x5d0b70(0x1c1)](()=>this[_0x5d0b70(0x16e)]()));},0x1f4),this['_reconnectTimeout'][_0x4a31d2(0x1fb)]&&this[_0x4a31d2(0x137)]['unref']());}async[_0x390ccb(0x18a)](_0xa8873b){var _0xea7cf0=_0x390ccb;try{if(!this[_0xea7cf0(0x1f3)])return;this[_0xea7cf0(0x1f7)]&&this[_0xea7cf0(0x16a)](),(await this[_0xea7cf0(0x15a)])['send'](JSON[_0xea7cf0(0x21f)](_0xa8873b));}catch(_0x4687d8){console[_0xea7cf0(0x18e)](this['_sendErrorMessage']+':\\x20'+(_0x4687d8&&_0x4687d8[_0xea7cf0(0x216)])),this['_allowedToSend']=!0x1,this[_0xea7cf0(0x16e)]();}}};function q(_0x358dbc,_0x37b556,_0x5b7af4,_0x136910,_0x29bf77,_0x18ef5e,_0x460eb4,_0x44306f=ie){var _0x54fe52=_0x390ccb;let _0x11028e=_0x5b7af4[_0x54fe52(0x219)](',')[_0x54fe52(0x181)](_0x532bce=>{var _0x2fc132=_0x54fe52;try{if(!_0x358dbc['_console_ninja_session']){let _0x2316b4=_0x358dbc[_0x2fc132(0x1c3)]?.[_0x2fc132(0x154)]?.['node']||_0x358dbc['process']?.[_0x2fc132(0x218)]?.[_0x2fc132(0x17a)]===_0x2fc132(0x1a5);(_0x29bf77===_0x2fc132(0x1d7)||_0x29bf77===_0x2fc132(0x19a)||_0x29bf77==='astro'||_0x29bf77==='angular')&&(_0x29bf77+=_0x2316b4?_0x2fc132(0x187):_0x2fc132(0x1e1)),_0x358dbc[_0x2fc132(0x202)]={'id':+new Date(),'tool':_0x29bf77},_0x460eb4&&_0x29bf77&&!_0x2316b4&&console['log'](_0x2fc132(0x1c8)+(_0x29bf77[_0x2fc132(0x1bd)](0x0)['toUpperCase']()+_0x29bf77['substr'](0x1))+',',_0x2fc132(0x1e8),_0x2fc132(0x161));}let _0x97a987=new x(_0x358dbc,_0x37b556,_0x532bce,_0x136910,_0x18ef5e,_0x44306f);return _0x97a987[_0x2fc132(0x18a)][_0x2fc132(0x19f)](_0x97a987);}catch(_0x13a02b){return console[_0x2fc132(0x18e)](_0x2fc132(0x184),_0x13a02b&&_0x13a02b[_0x2fc132(0x216)]),()=>{};}});return _0x1020f7=>_0x11028e[_0x54fe52(0x136)](_0x101c1b=>_0x101c1b(_0x1020f7));}function ie(_0x3785ec,_0x77bd2b,_0x110f8d,_0x1fc422){var _0x1f58e7=_0x390ccb;_0x1fc422&&_0x3785ec===_0x1f58e7(0x15b)&&_0x110f8d['location']['reload']();}function _0x4725(){var _0x254036=['__es'+'Module','string','host','origin','[object\\x20Set]','String','onopen','eventReceivedCallback','[object\\x20Date]','parent','_isMap','versions','_cleanNode','isExpressionToEvaluate','trace','then','count','_ws','reload','_p_','https://tinyurl.com/37x8b79t','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','36604OEfWnd','boolean','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','_capIfString','Boolean','_getOwnPropertyNames','port','level','_HTMLAllCollection','hostname','onclose','_connectToHostNow','...','valueOf','defineProperty','_attemptToReconnectShortly','global','toString','coverage','_connected','now','node','capped','_dateToString','494585nZuXyn','getOwnPropertyNames','195URQPuG','NEXT_RUNTIME','1043109QDEyjr','args','performance','_inBrowser','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','stack','map','POSITIVE_INFINITY','_setNodeExpandableState','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','_addFunctionsNode','webpack','\\x20server','_objectToString','default','send','_setNodePermissions','totalStrLength','push','warn','Number','log','[object\\x20Map]','index','number','_isUndefined','hits','prototype','negativeZero','_addLoadNode','_regExpToString','remix','_isArray','autoExpandMaxDepth','cappedElements','bigint','bind','expId','_webSocketErrorDocsLink','_consoleNinjaAllowedToStart','_WebSocketClass','perf_hooks','edge','expressionsToEvaluate','_undefined','nuxt','function','2539350AGwnaJ','indexOf','symbol','undefined','RegExp','toLowerCase','current','error','_p_name','root_exp','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_isPrimitiveType','nan','autoExpand','allStrLength','_getOwnPropertyDescriptor','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','6iHHcQU','127.0.0.1','charAt','WebSocket','getOwnPropertyDescriptor','_blacklistedProperty','catch','test','process','substr','concat','Map','hasOwnProperty','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','root_exp_id','replace','','2236283cFkDPS','_isNegativeZero','_property','_setNodeExpressionPath','noFunctions','HTMLAllCollection','_treeNodePropertiesAfterFullValue','readyState','close','match','pathToFileURL','next.js','sort','strLength','40AJjXfp','_isSet','data','positiveInfinity','path','dockerizedApp','_addObjectProperty','\\x20browser','getOwnPropertySymbols','_propertyName','_socket','type','_hasMapOnItsPath','_Symbol','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','Buffer','_connectAttemptCount','join','_setNodeId',\"c:\\\\Users\\\\User\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.320\\\\node_modules\",'1','time','array','_console_ninja','_WebSocket','_allowedToSend','_additionalMetadata','object','[object\\x20Array]','_allowedToConnectOnSend','gateway.docker.internal','_maxConnectAttemptCount','negativeInfinity','unref','_addProperty','_connecting','disabledLog','pop','serialize','elapsed','_console_ninja_session','elements','unknown','console','call','_setNodeQueryPath','isArray','props','_inNextEdge','_p_length','constructor','1358422AsPOlO','_setNodeLabel','stackTraceLimit','method','Error','setter','name','autoExpandPropertyCount','_type','message','nodeModules','env','split','autoExpandLimit','Symbol','date','_treeNodePropertiesBeforeFullValue','','stringify','_numberRegExp','_isPrimitiveWrapperType','_disposeWebsocket','autoExpandPreviousObjects','onerror','forEach','_reconnectTimeout','_processTreeNodeResult','1715338676152','4720940dgNyhx','_sortProps','resolveGetters','getPrototypeOf','depth','length','null','reduceLimits','rootExpression','NEGATIVE_INFINITY','Set','get','value','location','funcName'];_0x4725=function(){return _0x254036;};return _0x4725();}function _0x198f(_0x37b721,_0x21ab71){var _0x47255c=_0x4725();return _0x198f=function(_0x198f6f,_0x37c605){_0x198f6f=_0x198f6f-0x133;var _0x27d7d8=_0x47255c[_0x198f6f];return _0x27d7d8;},_0x198f(_0x37b721,_0x21ab71);}function b(_0x59a048){var _0x3a8817=_0x390ccb;let _0x9bd6bc=function(_0x4bf676,_0x30661f){return _0x30661f-_0x4bf676;},_0xdc93d2;if(_0x59a048[_0x3a8817(0x17d)])_0xdc93d2=function(){var _0x3a0436=_0x3a8817;return _0x59a048[_0x3a0436(0x17d)][_0x3a0436(0x173)]();};else{if(_0x59a048[_0x3a8817(0x1c3)]&&_0x59a048[_0x3a8817(0x1c3)]['hrtime']&&_0x59a048[_0x3a8817(0x1c3)]?.['env']?.['NEXT_RUNTIME']!==_0x3a8817(0x1a5))_0xdc93d2=function(){var _0x33221c=_0x3a8817;return _0x59a048[_0x33221c(0x1c3)]['hrtime']();},_0x9bd6bc=function(_0x22d019,_0x2f76aa){return 0x3e8*(_0x2f76aa[0x0]-_0x22d019[0x0])+(_0x2f76aa[0x1]-_0x22d019[0x1])/0xf4240;};else try{let {performance:_0x527e3e}=require(_0x3a8817(0x1a4));_0xdc93d2=function(){var _0x1c6b5e=_0x3a8817;return _0x527e3e[_0x1c6b5e(0x173)]();};}catch{_0xdc93d2=function(){return+new Date();};}}return{'elapsed':_0x9bd6bc,'timeStamp':_0xdc93d2,'now':()=>Date[_0x3a8817(0x173)]()};}function X(_0x3c57a3,_0x2d2274,_0x5f4838){var _0x328012=_0x390ccb;if(_0x3c57a3['_consoleNinjaAllowedToStart']!==void 0x0)return _0x3c57a3[_0x328012(0x1a2)];let _0x342f21=_0x3c57a3[_0x328012(0x1c3)]?.[_0x328012(0x154)]?.[_0x328012(0x174)]||_0x3c57a3[_0x328012(0x1c3)]?.['env']?.[_0x328012(0x17a)]==='edge';return _0x342f21&&_0x5f4838===_0x328012(0x1a8)?_0x3c57a3['_consoleNinjaAllowedToStart']=!0x1:_0x3c57a3[_0x328012(0x1a2)]=_0x342f21||!_0x2d2274||_0x3c57a3['location']?.[_0x328012(0x168)]&&_0x2d2274['includes'](_0x3c57a3[_0x328012(0x147)][_0x328012(0x168)]),_0x3c57a3[_0x328012(0x1a2)];}function H(_0x4db8e9,_0x1e1711,_0x3c5f73,_0x126849){var _0x4fd2ef=_0x390ccb;_0x4db8e9=_0x4db8e9,_0x1e1711=_0x1e1711,_0x3c5f73=_0x3c5f73,_0x126849=_0x126849;let _0x389fd4=b(_0x4db8e9),_0x26db12=_0x389fd4[_0x4fd2ef(0x201)],_0x18a205=_0x389fd4['timeStamp'];class _0x1aa9dd{constructor(){var _0x229148=_0x4fd2ef;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x229148(0x220)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x4db8e9[_0x229148(0x1ad)],this[_0x229148(0x167)]=_0x4db8e9[_0x229148(0x1d1)],this[_0x229148(0x1b9)]=Object[_0x229148(0x1bf)],this[_0x229148(0x164)]=Object[_0x229148(0x178)],this['_Symbol']=_0x4db8e9[_0x229148(0x21b)],this['_regExpToString']=RegExp[_0x229148(0x196)][_0x229148(0x170)],this['_dateToString']=Date['prototype']['toString'];}[_0x4fd2ef(0x200)](_0x4b87d0,_0x63772e,_0xc41685,_0x536268){var _0x1c32ee=_0x4fd2ef,_0x2ed9fb=this,_0x1e43da=_0xc41685[_0x1c32ee(0x1b7)];function _0x33b4cc(_0x110086,_0x5ed81a,_0x194a7f){var _0x1b2ae8=_0x1c32ee;_0x5ed81a[_0x1b2ae8(0x1e5)]=_0x1b2ae8(0x204),_0x5ed81a[_0x1b2ae8(0x1b1)]=_0x110086[_0x1b2ae8(0x216)],_0x429a94=_0x194a7f[_0x1b2ae8(0x174)][_0x1b2ae8(0x1b0)],_0x194a7f[_0x1b2ae8(0x174)][_0x1b2ae8(0x1b0)]=_0x5ed81a,_0x2ed9fb[_0x1b2ae8(0x21d)](_0x5ed81a,_0x194a7f);}try{_0xc41685[_0x1c32ee(0x166)]++,_0xc41685[_0x1c32ee(0x1b7)]&&_0xc41685['autoExpandPreviousObjects'][_0x1c32ee(0x18d)](_0x63772e);var _0x1b726a,_0x1f2fd5,_0x2e6ac2,_0x23d837,_0xaa51c3=[],_0x52a77b=[],_0x4fa316,_0x2ce2fe=this[_0x1c32ee(0x215)](_0x63772e),_0x2cffa7=_0x2ce2fe==='array',_0x8030f1=!0x1,_0xb33313=_0x2ce2fe===_0x1c32ee(0x1a9),_0x732eb3=this[_0x1c32ee(0x1b5)](_0x2ce2fe),_0x59ca02=this[_0x1c32ee(0x221)](_0x2ce2fe),_0x2cbcc8=_0x732eb3||_0x59ca02,_0x50eca7={},_0x547ab7=0x0,_0x5b256b=!0x1,_0x429a94,_0x222c5c=/^(([1-9]{1}[0-9]*)|0)$/;if(_0xc41685[_0x1c32ee(0x13e)]){if(_0x2cffa7){if(_0x1f2fd5=_0x63772e[_0x1c32ee(0x13f)],_0x1f2fd5>_0xc41685['elements']){for(_0x2e6ac2=0x0,_0x23d837=_0xc41685[_0x1c32ee(0x203)],_0x1b726a=_0x2e6ac2;_0x1b726a<_0x23d837;_0x1b726a++)_0x52a77b[_0x1c32ee(0x18d)](_0x2ed9fb[_0x1c32ee(0x1fc)](_0xaa51c3,_0x63772e,_0x2ce2fe,_0x1b726a,_0xc41685));_0x4b87d0[_0x1c32ee(0x19d)]=!0x0;}else{for(_0x2e6ac2=0x0,_0x23d837=_0x1f2fd5,_0x1b726a=_0x2e6ac2;_0x1b726a<_0x23d837;_0x1b726a++)_0x52a77b[_0x1c32ee(0x18d)](_0x2ed9fb['_addProperty'](_0xaa51c3,_0x63772e,_0x2ce2fe,_0x1b726a,_0xc41685));}_0xc41685[_0x1c32ee(0x214)]+=_0x52a77b['length'];}if(!(_0x2ce2fe===_0x1c32ee(0x140)||_0x2ce2fe==='undefined')&&!_0x732eb3&&_0x2ce2fe!==_0x1c32ee(0x14e)&&_0x2ce2fe!==_0x1c32ee(0x1e9)&&_0x2ce2fe!==_0x1c32ee(0x19e)){var _0x314a0b=_0x536268['props']||_0xc41685[_0x1c32ee(0x209)];if(this[_0x1c32ee(0x1db)](_0x63772e)?(_0x1b726a=0x0,_0x63772e[_0x1c32ee(0x136)](function(_0x224af9){var _0x56a2eb=_0x1c32ee;if(_0x547ab7++,_0xc41685[_0x56a2eb(0x214)]++,_0x547ab7>_0x314a0b){_0x5b256b=!0x0;return;}if(!_0xc41685[_0x56a2eb(0x156)]&&_0xc41685[_0x56a2eb(0x1b7)]&&_0xc41685[_0x56a2eb(0x214)]>_0xc41685[_0x56a2eb(0x21a)]){_0x5b256b=!0x0;return;}_0x52a77b[_0x56a2eb(0x18d)](_0x2ed9fb[_0x56a2eb(0x1fc)](_0xaa51c3,_0x63772e,'Set',_0x1b726a++,_0xc41685,function(_0x3cac23){return function(){return _0x3cac23;};}(_0x224af9)));})):this[_0x1c32ee(0x153)](_0x63772e)&&_0x63772e['forEach'](function(_0xb000a4,_0x1e77eb){var _0x557d64=_0x1c32ee;if(_0x547ab7++,_0xc41685['autoExpandPropertyCount']++,_0x547ab7>_0x314a0b){_0x5b256b=!0x0;return;}if(!_0xc41685[_0x557d64(0x156)]&&_0xc41685[_0x557d64(0x1b7)]&&_0xc41685[_0x557d64(0x214)]>_0xc41685[_0x557d64(0x21a)]){_0x5b256b=!0x0;return;}var _0x21e225=_0x1e77eb[_0x557d64(0x170)]();_0x21e225['length']>0x64&&(_0x21e225=_0x21e225['slice'](0x0,0x64)+_0x557d64(0x16b)),_0x52a77b[_0x557d64(0x18d)](_0x2ed9fb[_0x557d64(0x1fc)](_0xaa51c3,_0x63772e,_0x557d64(0x1c6),_0x21e225,_0xc41685,function(_0x470fb1){return function(){return _0x470fb1;};}(_0xb000a4)));}),!_0x8030f1){try{for(_0x4fa316 in _0x63772e)if(!(_0x2cffa7&&_0x222c5c[_0x1c32ee(0x1c2)](_0x4fa316))&&!this[_0x1c32ee(0x1c0)](_0x63772e,_0x4fa316,_0xc41685)){if(_0x547ab7++,_0xc41685[_0x1c32ee(0x214)]++,_0x547ab7>_0x314a0b){_0x5b256b=!0x0;break;}if(!_0xc41685[_0x1c32ee(0x156)]&&_0xc41685['autoExpand']&&_0xc41685[_0x1c32ee(0x214)]>_0xc41685[_0x1c32ee(0x21a)]){_0x5b256b=!0x0;break;}_0x52a77b[_0x1c32ee(0x18d)](_0x2ed9fb[_0x1c32ee(0x1e0)](_0xaa51c3,_0x50eca7,_0x63772e,_0x2ce2fe,_0x4fa316,_0xc41685));}}catch{}if(_0x50eca7[_0x1c32ee(0x20b)]=!0x0,_0xb33313&&(_0x50eca7[_0x1c32ee(0x1b2)]=!0x0),!_0x5b256b){var _0x5164bd=[][_0x1c32ee(0x1c5)](this['_getOwnPropertyNames'](_0x63772e))[_0x1c32ee(0x1c5)](this['_getOwnPropertySymbols'](_0x63772e));for(_0x1b726a=0x0,_0x1f2fd5=_0x5164bd[_0x1c32ee(0x13f)];_0x1b726a<_0x1f2fd5;_0x1b726a++)if(_0x4fa316=_0x5164bd[_0x1b726a],!(_0x2cffa7&&_0x222c5c['test'](_0x4fa316[_0x1c32ee(0x170)]()))&&!this[_0x1c32ee(0x1c0)](_0x63772e,_0x4fa316,_0xc41685)&&!_0x50eca7[_0x1c32ee(0x15c)+_0x4fa316[_0x1c32ee(0x170)]()]){if(_0x547ab7++,_0xc41685[_0x1c32ee(0x214)]++,_0x547ab7>_0x314a0b){_0x5b256b=!0x0;break;}if(!_0xc41685[_0x1c32ee(0x156)]&&_0xc41685[_0x1c32ee(0x1b7)]&&_0xc41685[_0x1c32ee(0x214)]>_0xc41685[_0x1c32ee(0x21a)]){_0x5b256b=!0x0;break;}_0x52a77b[_0x1c32ee(0x18d)](_0x2ed9fb['_addObjectProperty'](_0xaa51c3,_0x50eca7,_0x63772e,_0x2ce2fe,_0x4fa316,_0xc41685));}}}}}if(_0x4b87d0[_0x1c32ee(0x1e5)]=_0x2ce2fe,_0x2cbcc8?(_0x4b87d0[_0x1c32ee(0x146)]=_0x63772e[_0x1c32ee(0x16c)](),this[_0x1c32ee(0x162)](_0x2ce2fe,_0x4b87d0,_0xc41685,_0x536268)):_0x2ce2fe===_0x1c32ee(0x21c)?_0x4b87d0[_0x1c32ee(0x146)]=this[_0x1c32ee(0x176)][_0x1c32ee(0x206)](_0x63772e):_0x2ce2fe===_0x1c32ee(0x19e)?_0x4b87d0[_0x1c32ee(0x146)]=_0x63772e[_0x1c32ee(0x170)]():_0x2ce2fe===_0x1c32ee(0x1ae)?_0x4b87d0[_0x1c32ee(0x146)]=this[_0x1c32ee(0x199)][_0x1c32ee(0x206)](_0x63772e):_0x2ce2fe===_0x1c32ee(0x1ac)&&this[_0x1c32ee(0x1e7)]?_0x4b87d0[_0x1c32ee(0x146)]=this[_0x1c32ee(0x1e7)][_0x1c32ee(0x196)][_0x1c32ee(0x170)][_0x1c32ee(0x206)](_0x63772e):!_0xc41685[_0x1c32ee(0x13e)]&&!(_0x2ce2fe===_0x1c32ee(0x140)||_0x2ce2fe==='undefined')&&(delete _0x4b87d0[_0x1c32ee(0x146)],_0x4b87d0['capped']=!0x0),_0x5b256b&&(_0x4b87d0['cappedProps']=!0x0),_0x429a94=_0xc41685[_0x1c32ee(0x174)][_0x1c32ee(0x1b0)],_0xc41685[_0x1c32ee(0x174)][_0x1c32ee(0x1b0)]=_0x4b87d0,this[_0x1c32ee(0x21d)](_0x4b87d0,_0xc41685),_0x52a77b[_0x1c32ee(0x13f)]){for(_0x1b726a=0x0,_0x1f2fd5=_0x52a77b[_0x1c32ee(0x13f)];_0x1b726a<_0x1f2fd5;_0x1b726a++)_0x52a77b[_0x1b726a](_0x1b726a);}_0xaa51c3[_0x1c32ee(0x13f)]&&(_0x4b87d0['props']=_0xaa51c3);}catch(_0x2c8622){_0x33b4cc(_0x2c8622,_0x4b87d0,_0xc41685);}return this[_0x1c32ee(0x1f4)](_0x63772e,_0x4b87d0),this[_0x1c32ee(0x1d2)](_0x4b87d0,_0xc41685),_0xc41685['node']['current']=_0x429a94,_0xc41685[_0x1c32ee(0x166)]--,_0xc41685[_0x1c32ee(0x1b7)]=_0x1e43da,_0xc41685[_0x1c32ee(0x1b7)]&&_0xc41685['autoExpandPreviousObjects'][_0x1c32ee(0x1ff)](),_0x4b87d0;}['_getOwnPropertySymbols'](_0x11db4e){var _0x516e9e=_0x4fd2ef;return Object[_0x516e9e(0x1e2)]?Object[_0x516e9e(0x1e2)](_0x11db4e):[];}[_0x4fd2ef(0x1db)](_0x565401){var _0x1a69b0=_0x4fd2ef;return!!(_0x565401&&_0x4db8e9[_0x1a69b0(0x144)]&&this['_objectToString'](_0x565401)===_0x1a69b0(0x14d)&&_0x565401[_0x1a69b0(0x136)]);}[_0x4fd2ef(0x1c0)](_0x293b19,_0x3ff291,_0x213797){var _0x259846=_0x4fd2ef;return _0x213797[_0x259846(0x1d0)]?typeof _0x293b19[_0x3ff291]==_0x259846(0x1a9):!0x1;}['_type'](_0x28b76e){var _0xc6d98a=_0x4fd2ef,_0x3ca41a='';return _0x3ca41a=typeof _0x28b76e,_0x3ca41a===_0xc6d98a(0x1f5)?this[_0xc6d98a(0x188)](_0x28b76e)===_0xc6d98a(0x1f6)?_0x3ca41a=_0xc6d98a(0x1f0):this[_0xc6d98a(0x188)](_0x28b76e)===_0xc6d98a(0x151)?_0x3ca41a='date':this['_objectToString'](_0x28b76e)==='[object\\x20BigInt]'?_0x3ca41a='bigint':_0x28b76e===null?_0x3ca41a='null':_0x28b76e[_0xc6d98a(0x20c)]&&(_0x3ca41a=_0x28b76e['constructor'][_0xc6d98a(0x213)]||_0x3ca41a):_0x3ca41a===_0xc6d98a(0x1ad)&&this[_0xc6d98a(0x167)]&&_0x28b76e instanceof this[_0xc6d98a(0x167)]&&(_0x3ca41a=_0xc6d98a(0x1d1)),_0x3ca41a;}['_objectToString'](_0x456055){var _0x438171=_0x4fd2ef;return Object[_0x438171(0x196)][_0x438171(0x170)][_0x438171(0x206)](_0x456055);}[_0x4fd2ef(0x1b5)](_0x262197){var _0x59ca30=_0x4fd2ef;return _0x262197===_0x59ca30(0x160)||_0x262197==='string'||_0x262197===_0x59ca30(0x193);}[_0x4fd2ef(0x221)](_0x538378){var _0xf8ec41=_0x4fd2ef;return _0x538378===_0xf8ec41(0x163)||_0x538378===_0xf8ec41(0x14e)||_0x538378==='Number';}[_0x4fd2ef(0x1fc)](_0x362760,_0x109ed5,_0x153737,_0x3af8a9,_0x27fbff,_0xb27f91){var _0x4b9cf8=this;return function(_0x2e1464){var _0x4bf36c=_0x198f,_0x37d841=_0x27fbff[_0x4bf36c(0x174)][_0x4bf36c(0x1b0)],_0x513682=_0x27fbff[_0x4bf36c(0x174)][_0x4bf36c(0x192)],_0x4ea71f=_0x27fbff[_0x4bf36c(0x174)]['parent'];_0x27fbff[_0x4bf36c(0x174)][_0x4bf36c(0x152)]=_0x37d841,_0x27fbff['node'][_0x4bf36c(0x192)]=typeof _0x3af8a9=='number'?_0x3af8a9:_0x2e1464,_0x362760[_0x4bf36c(0x18d)](_0x4b9cf8[_0x4bf36c(0x1ce)](_0x109ed5,_0x153737,_0x3af8a9,_0x27fbff,_0xb27f91)),_0x27fbff[_0x4bf36c(0x174)][_0x4bf36c(0x152)]=_0x4ea71f,_0x27fbff[_0x4bf36c(0x174)][_0x4bf36c(0x192)]=_0x513682;};}[_0x4fd2ef(0x1e0)](_0x7de60f,_0x12129e,_0x1d6428,_0x5d3180,_0x33b23c,_0x5655e5,_0x5b29b6){var _0x48b9a5=_0x4fd2ef,_0x3f53d7=this;return _0x12129e[_0x48b9a5(0x15c)+_0x33b23c[_0x48b9a5(0x170)]()]=!0x0,function(_0x2fc5a2){var _0x3b88d8=_0x48b9a5,_0x54538f=_0x5655e5[_0x3b88d8(0x174)]['current'],_0x15673d=_0x5655e5['node'][_0x3b88d8(0x192)],_0x4611ed=_0x5655e5[_0x3b88d8(0x174)][_0x3b88d8(0x152)];_0x5655e5[_0x3b88d8(0x174)][_0x3b88d8(0x152)]=_0x54538f,_0x5655e5[_0x3b88d8(0x174)]['index']=_0x2fc5a2,_0x7de60f[_0x3b88d8(0x18d)](_0x3f53d7[_0x3b88d8(0x1ce)](_0x1d6428,_0x5d3180,_0x33b23c,_0x5655e5,_0x5b29b6)),_0x5655e5['node'][_0x3b88d8(0x152)]=_0x4611ed,_0x5655e5[_0x3b88d8(0x174)]['index']=_0x15673d;};}[_0x4fd2ef(0x1ce)](_0x580ee4,_0x27ebe9,_0x99b880,_0xc87a37,_0x923133){var _0x52af88=_0x4fd2ef,_0x7e6f6f=this;_0x923133||(_0x923133=function(_0x2baa9e,_0x759518){return _0x2baa9e[_0x759518];});var _0x21dfc=_0x99b880[_0x52af88(0x170)](),_0x2cc8f2=_0xc87a37[_0x52af88(0x1a6)]||{},_0x1f9102=_0xc87a37[_0x52af88(0x13e)],_0x3a67e6=_0xc87a37[_0x52af88(0x156)];try{var _0x1ddcaf=this['_isMap'](_0x580ee4),_0x165cfd=_0x21dfc;_0x1ddcaf&&_0x165cfd[0x0]==='\\x27'&&(_0x165cfd=_0x165cfd[_0x52af88(0x1c4)](0x1,_0x165cfd[_0x52af88(0x13f)]-0x2));var _0x587039=_0xc87a37[_0x52af88(0x1a6)]=_0x2cc8f2[_0x52af88(0x15c)+_0x165cfd];_0x587039&&(_0xc87a37[_0x52af88(0x13e)]=_0xc87a37[_0x52af88(0x13e)]+0x1),_0xc87a37[_0x52af88(0x156)]=!!_0x587039;var _0x3a4cfa=typeof _0x99b880=='symbol',_0x1a5603={'name':_0x3a4cfa||_0x1ddcaf?_0x21dfc:this[_0x52af88(0x1e3)](_0x21dfc)};if(_0x3a4cfa&&(_0x1a5603[_0x52af88(0x1ac)]=!0x0),!(_0x27ebe9===_0x52af88(0x1f0)||_0x27ebe9===_0x52af88(0x211))){var _0x30cbb0=this[_0x52af88(0x1b9)](_0x580ee4,_0x99b880);if(_0x30cbb0&&(_0x30cbb0['set']&&(_0x1a5603[_0x52af88(0x212)]=!0x0),_0x30cbb0[_0x52af88(0x145)]&&!_0x587039&&!_0xc87a37[_0x52af88(0x13c)]))return _0x1a5603['getter']=!0x0,this[_0x52af88(0x138)](_0x1a5603,_0xc87a37),_0x1a5603;}var _0x22d209;try{_0x22d209=_0x923133(_0x580ee4,_0x99b880);}catch(_0x200477){return _0x1a5603={'name':_0x21dfc,'type':_0x52af88(0x204),'error':_0x200477[_0x52af88(0x216)]},this[_0x52af88(0x138)](_0x1a5603,_0xc87a37),_0x1a5603;}var _0x521a77=this[_0x52af88(0x215)](_0x22d209),_0x55ed5f=this[_0x52af88(0x1b5)](_0x521a77);if(_0x1a5603[_0x52af88(0x1e5)]=_0x521a77,_0x55ed5f)this[_0x52af88(0x138)](_0x1a5603,_0xc87a37,_0x22d209,function(){var _0x556786=_0x52af88;_0x1a5603['value']=_0x22d209['valueOf'](),!_0x587039&&_0x7e6f6f[_0x556786(0x162)](_0x521a77,_0x1a5603,_0xc87a37,{});});else{var _0x3b99b0=_0xc87a37[_0x52af88(0x1b7)]&&_0xc87a37[_0x52af88(0x166)]<_0xc87a37[_0x52af88(0x19c)]&&_0xc87a37[_0x52af88(0x134)][_0x52af88(0x1ab)](_0x22d209)<0x0&&_0x521a77!==_0x52af88(0x1a9)&&_0xc87a37[_0x52af88(0x214)]<_0xc87a37['autoExpandLimit'];_0x3b99b0||_0xc87a37[_0x52af88(0x166)]<_0x1f9102||_0x587039?(this[_0x52af88(0x200)](_0x1a5603,_0x22d209,_0xc87a37,_0x587039||{}),this['_additionalMetadata'](_0x22d209,_0x1a5603)):this[_0x52af88(0x138)](_0x1a5603,_0xc87a37,_0x22d209,function(){var _0x968ac3=_0x52af88;_0x521a77===_0x968ac3(0x140)||_0x521a77===_0x968ac3(0x1ad)||(delete _0x1a5603['value'],_0x1a5603[_0x968ac3(0x175)]=!0x0);});}return _0x1a5603;}finally{_0xc87a37[_0x52af88(0x1a6)]=_0x2cc8f2,_0xc87a37['depth']=_0x1f9102,_0xc87a37['isExpressionToEvaluate']=_0x3a67e6;}}[_0x4fd2ef(0x162)](_0x472320,_0x264d59,_0x594fcd,_0x3757a7){var _0x2d0dac=_0x4fd2ef,_0x583bd5=_0x3757a7[_0x2d0dac(0x1d9)]||_0x594fcd[_0x2d0dac(0x1d9)];if((_0x472320===_0x2d0dac(0x14a)||_0x472320==='String')&&_0x264d59['value']){let _0x2f10bc=_0x264d59[_0x2d0dac(0x146)][_0x2d0dac(0x13f)];_0x594fcd[_0x2d0dac(0x1b8)]+=_0x2f10bc,_0x594fcd['allStrLength']>_0x594fcd[_0x2d0dac(0x18c)]?(_0x264d59[_0x2d0dac(0x175)]='',delete _0x264d59[_0x2d0dac(0x146)]):_0x2f10bc>_0x583bd5&&(_0x264d59[_0x2d0dac(0x175)]=_0x264d59[_0x2d0dac(0x146)]['substr'](0x0,_0x583bd5),delete _0x264d59[_0x2d0dac(0x146)]);}}[_0x4fd2ef(0x153)](_0xe37d00){var _0x482ae3=_0x4fd2ef;return!!(_0xe37d00&&_0x4db8e9[_0x482ae3(0x1c6)]&&this[_0x482ae3(0x188)](_0xe37d00)===_0x482ae3(0x191)&&_0xe37d00[_0x482ae3(0x136)]);}['_propertyName'](_0x35e225){var _0x264b73=_0x4fd2ef;if(_0x35e225[_0x264b73(0x1d5)](/^\\d+$/))return _0x35e225;var _0x18bc3d;try{_0x18bc3d=JSON['stringify'](''+_0x35e225);}catch{_0x18bc3d='\\x22'+this[_0x264b73(0x188)](_0x35e225)+'\\x22';}return _0x18bc3d['match'](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x18bc3d=_0x18bc3d[_0x264b73(0x1c4)](0x1,_0x18bc3d['length']-0x2):_0x18bc3d=_0x18bc3d[_0x264b73(0x1ca)](/'/g,'\\x5c\\x27')[_0x264b73(0x1ca)](/\\\\\"/g,'\\x22')[_0x264b73(0x1ca)](/(^\"|\"$)/g,'\\x27'),_0x18bc3d;}[_0x4fd2ef(0x138)](_0xfe95d1,_0x3267ea,_0x363937,_0x4ed0bd){var _0x372acd=_0x4fd2ef;this[_0x372acd(0x21d)](_0xfe95d1,_0x3267ea),_0x4ed0bd&&_0x4ed0bd(),this[_0x372acd(0x1f4)](_0x363937,_0xfe95d1),this['_treeNodePropertiesAfterFullValue'](_0xfe95d1,_0x3267ea);}[_0x4fd2ef(0x21d)](_0x21d164,_0x3df420){var _0x3ab214=_0x4fd2ef;this[_0x3ab214(0x1ec)](_0x21d164,_0x3df420),this[_0x3ab214(0x207)](_0x21d164,_0x3df420),this[_0x3ab214(0x1cf)](_0x21d164,_0x3df420),this[_0x3ab214(0x18b)](_0x21d164,_0x3df420);}[_0x4fd2ef(0x1ec)](_0x47d7cc,_0x2a4173){}[_0x4fd2ef(0x207)](_0x45bfc4,_0x178867){}['_setNodeLabel'](_0x3eb430,_0x4e6489){}[_0x4fd2ef(0x194)](_0x1ed85f){var _0x530db5=_0x4fd2ef;return _0x1ed85f===this[_0x530db5(0x1a7)];}[_0x4fd2ef(0x1d2)](_0x48c844,_0x4d7a1d){var _0x164048=_0x4fd2ef;this[_0x164048(0x20e)](_0x48c844,_0x4d7a1d),this[_0x164048(0x183)](_0x48c844),_0x4d7a1d['sortProps']&&this[_0x164048(0x13b)](_0x48c844),this[_0x164048(0x185)](_0x48c844,_0x4d7a1d),this[_0x164048(0x198)](_0x48c844,_0x4d7a1d),this['_cleanNode'](_0x48c844);}[_0x4fd2ef(0x1f4)](_0x578db9,_0x458cdc){var _0x5054bb=_0x4fd2ef;let _0x2098ca;try{_0x4db8e9['console']&&(_0x2098ca=_0x4db8e9['console'][_0x5054bb(0x1b1)],_0x4db8e9[_0x5054bb(0x205)][_0x5054bb(0x1b1)]=function(){}),_0x578db9&&typeof _0x578db9[_0x5054bb(0x13f)]==_0x5054bb(0x193)&&(_0x458cdc['length']=_0x578db9['length']);}catch{}finally{_0x2098ca&&(_0x4db8e9['console'][_0x5054bb(0x1b1)]=_0x2098ca);}if(_0x458cdc[_0x5054bb(0x1e5)]===_0x5054bb(0x193)||_0x458cdc[_0x5054bb(0x1e5)]===_0x5054bb(0x18f)){if(isNaN(_0x458cdc[_0x5054bb(0x146)]))_0x458cdc[_0x5054bb(0x1b6)]=!0x0,delete _0x458cdc[_0x5054bb(0x146)];else switch(_0x458cdc[_0x5054bb(0x146)]){case Number[_0x5054bb(0x182)]:_0x458cdc[_0x5054bb(0x1dd)]=!0x0,delete _0x458cdc[_0x5054bb(0x146)];break;case Number[_0x5054bb(0x143)]:_0x458cdc[_0x5054bb(0x1fa)]=!0x0,delete _0x458cdc['value'];break;case 0x0:this[_0x5054bb(0x1cd)](_0x458cdc[_0x5054bb(0x146)])&&(_0x458cdc[_0x5054bb(0x197)]=!0x0);break;}}else _0x458cdc[_0x5054bb(0x1e5)]==='function'&&typeof _0x578db9['name']=='string'&&_0x578db9[_0x5054bb(0x213)]&&_0x458cdc[_0x5054bb(0x213)]&&_0x578db9[_0x5054bb(0x213)]!==_0x458cdc[_0x5054bb(0x213)]&&(_0x458cdc[_0x5054bb(0x148)]=_0x578db9[_0x5054bb(0x213)]);}[_0x4fd2ef(0x1cd)](_0x26b708){var _0x81c014=_0x4fd2ef;return 0x1/_0x26b708===Number[_0x81c014(0x143)];}[_0x4fd2ef(0x13b)](_0x31635d){var _0x4b741f=_0x4fd2ef;!_0x31635d['props']||!_0x31635d['props'][_0x4b741f(0x13f)]||_0x31635d['type']==='array'||_0x31635d[_0x4b741f(0x1e5)]===_0x4b741f(0x1c6)||_0x31635d[_0x4b741f(0x1e5)]===_0x4b741f(0x144)||_0x31635d['props'][_0x4b741f(0x1d8)](function(_0x43781c,_0x743bff){var _0x4976a7=_0x4b741f,_0x5c64c9=_0x43781c[_0x4976a7(0x213)][_0x4976a7(0x1af)](),_0x27fc0a=_0x743bff[_0x4976a7(0x213)]['toLowerCase']();return _0x5c64c9<_0x27fc0a?-0x1:_0x5c64c9>_0x27fc0a?0x1:0x0;});}[_0x4fd2ef(0x185)](_0x36dbbf,_0x9d7c12){var _0x35a728=_0x4fd2ef;if(!(_0x9d7c12[_0x35a728(0x1d0)]||!_0x36dbbf[_0x35a728(0x209)]||!_0x36dbbf[_0x35a728(0x209)]['length'])){for(var _0x3d0031=[],_0x69c78e=[],_0x591174=0x0,_0x4a6740=_0x36dbbf[_0x35a728(0x209)][_0x35a728(0x13f)];_0x591174<_0x4a6740;_0x591174++){var _0x50bc7f=_0x36dbbf[_0x35a728(0x209)][_0x591174];_0x50bc7f[_0x35a728(0x1e5)]===_0x35a728(0x1a9)?_0x3d0031[_0x35a728(0x18d)](_0x50bc7f):_0x69c78e[_0x35a728(0x18d)](_0x50bc7f);}if(!(!_0x69c78e[_0x35a728(0x13f)]||_0x3d0031[_0x35a728(0x13f)]<=0x1)){_0x36dbbf[_0x35a728(0x209)]=_0x69c78e;var _0x47052a={'functionsNode':!0x0,'props':_0x3d0031};this['_setNodeId'](_0x47052a,_0x9d7c12),this[_0x35a728(0x20e)](_0x47052a,_0x9d7c12),this[_0x35a728(0x183)](_0x47052a),this['_setNodePermissions'](_0x47052a,_0x9d7c12),_0x47052a['id']+='\\x20f',_0x36dbbf[_0x35a728(0x209)]['unshift'](_0x47052a);}}}[_0x4fd2ef(0x198)](_0x3361f0,_0x27a07d){}[_0x4fd2ef(0x183)](_0x297eae){}[_0x4fd2ef(0x19b)](_0x1fd3e6){var _0xc48067=_0x4fd2ef;return Array[_0xc48067(0x208)](_0x1fd3e6)||typeof _0x1fd3e6==_0xc48067(0x1f5)&&this[_0xc48067(0x188)](_0x1fd3e6)===_0xc48067(0x1f6);}['_setNodePermissions'](_0x5f1c95,_0x582807){}[_0x4fd2ef(0x155)](_0x29e777){var _0xc6eba=_0x4fd2ef;delete _0x29e777['_hasSymbolPropertyOnItsPath'],delete _0x29e777['_hasSetOnItsPath'],delete _0x29e777[_0xc6eba(0x1e6)];}['_setNodeExpressionPath'](_0x293476,_0x478d51){}}let _0x1185d3=new _0x1aa9dd(),_0x371528={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x33d98d={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x147eac(_0x29e8ba,_0x4f0677,_0x939d1c,_0x15e0de,_0x2389a6,_0x47b901){var _0x42821e=_0x4fd2ef;let _0x3bccce,_0x3c3174;try{_0x3c3174=_0x18a205(),_0x3bccce=_0x3c5f73[_0x4f0677],!_0x3bccce||_0x3c3174-_0x3bccce['ts']>0x1f4&&_0x3bccce[_0x42821e(0x159)]&&_0x3bccce[_0x42821e(0x1ef)]/_0x3bccce[_0x42821e(0x159)]<0x64?(_0x3c5f73[_0x4f0677]=_0x3bccce={'count':0x0,'time':0x0,'ts':_0x3c3174},_0x3c5f73['hits']={}):_0x3c3174-_0x3c5f73[_0x42821e(0x195)]['ts']>0x32&&_0x3c5f73[_0x42821e(0x195)][_0x42821e(0x159)]&&_0x3c5f73[_0x42821e(0x195)][_0x42821e(0x1ef)]/_0x3c5f73['hits'][_0x42821e(0x159)]<0x64&&(_0x3c5f73[_0x42821e(0x195)]={});let _0x5528f8=[],_0xc08f8f=_0x3bccce[_0x42821e(0x141)]||_0x3c5f73[_0x42821e(0x195)][_0x42821e(0x141)]?_0x33d98d:_0x371528,_0x41397b=_0x31e969=>{var _0x168009=_0x42821e;let _0x31c24c={};return _0x31c24c[_0x168009(0x209)]=_0x31e969[_0x168009(0x209)],_0x31c24c[_0x168009(0x203)]=_0x31e969['elements'],_0x31c24c['strLength']=_0x31e969['strLength'],_0x31c24c['totalStrLength']=_0x31e969[_0x168009(0x18c)],_0x31c24c[_0x168009(0x21a)]=_0x31e969[_0x168009(0x21a)],_0x31c24c[_0x168009(0x19c)]=_0x31e969[_0x168009(0x19c)],_0x31c24c['sortProps']=!0x1,_0x31c24c[_0x168009(0x1d0)]=!_0x1e1711,_0x31c24c['depth']=0x1,_0x31c24c[_0x168009(0x166)]=0x0,_0x31c24c[_0x168009(0x1a0)]=_0x168009(0x1c9),_0x31c24c[_0x168009(0x142)]=_0x168009(0x1b3),_0x31c24c[_0x168009(0x1b7)]=!0x0,_0x31c24c[_0x168009(0x134)]=[],_0x31c24c[_0x168009(0x214)]=0x0,_0x31c24c[_0x168009(0x13c)]=!0x0,_0x31c24c['allStrLength']=0x0,_0x31c24c[_0x168009(0x174)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x31c24c;};for(var _0x92dba7=0x0;_0x92dba7<_0x2389a6[_0x42821e(0x13f)];_0x92dba7++)_0x5528f8[_0x42821e(0x18d)](_0x1185d3[_0x42821e(0x200)]({'timeNode':_0x29e8ba===_0x42821e(0x1ef)||void 0x0},_0x2389a6[_0x92dba7],_0x41397b(_0xc08f8f),{}));if(_0x29e8ba===_0x42821e(0x157)){let _0x2ca9fe=Error[_0x42821e(0x20f)];try{Error[_0x42821e(0x20f)]=0x1/0x0,_0x5528f8[_0x42821e(0x18d)](_0x1185d3['serialize']({'stackNode':!0x0},new Error()[_0x42821e(0x180)],_0x41397b(_0xc08f8f),{'strLength':0x1/0x0}));}finally{Error[_0x42821e(0x20f)]=_0x2ca9fe;}}return{'method':_0x42821e(0x190),'version':_0x126849,'args':[{'ts':_0x939d1c,'session':_0x15e0de,'args':_0x5528f8,'id':_0x4f0677,'context':_0x47b901}]};}catch(_0x10778e){return{'method':_0x42821e(0x190),'version':_0x126849,'args':[{'ts':_0x939d1c,'session':_0x15e0de,'args':[{'type':_0x42821e(0x204),'error':_0x10778e&&_0x10778e[_0x42821e(0x216)]}],'id':_0x4f0677,'context':_0x47b901}]};}finally{try{if(_0x3bccce&&_0x3c3174){let _0x55dc18=_0x18a205();_0x3bccce[_0x42821e(0x159)]++,_0x3bccce[_0x42821e(0x1ef)]+=_0x26db12(_0x3c3174,_0x55dc18),_0x3bccce['ts']=_0x55dc18,_0x3c5f73[_0x42821e(0x195)][_0x42821e(0x159)]++,_0x3c5f73[_0x42821e(0x195)][_0x42821e(0x1ef)]+=_0x26db12(_0x3c3174,_0x55dc18),_0x3c5f73[_0x42821e(0x195)]['ts']=_0x55dc18,(_0x3bccce['count']>0x32||_0x3bccce[_0x42821e(0x1ef)]>0x64)&&(_0x3bccce[_0x42821e(0x141)]=!0x0),(_0x3c5f73[_0x42821e(0x195)]['count']>0x3e8||_0x3c5f73[_0x42821e(0x195)][_0x42821e(0x1ef)]>0x12c)&&(_0x3c5f73[_0x42821e(0x195)]['reduceLimits']=!0x0);}}catch{}}}return _0x147eac;}((_0x317c4b,_0x3cc9db,_0x255fb0,_0x47498f,_0x45659c,_0x325109,_0x54785d,_0x486ae0,_0x3ac04a,_0x1cdb60,_0x1f724c)=>{var _0x27c79f=_0x390ccb;if(_0x317c4b['_console_ninja'])return _0x317c4b[_0x27c79f(0x1f1)];if(!X(_0x317c4b,_0x486ae0,_0x45659c))return _0x317c4b[_0x27c79f(0x1f1)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x317c4b[_0x27c79f(0x1f1)];let _0x4fe3fd=b(_0x317c4b),_0x521c85=_0x4fe3fd[_0x27c79f(0x201)],_0x4f0b5f=_0x4fe3fd['timeStamp'],_0x38f873=_0x4fe3fd['now'],_0x4ec8e1={'hits':{},'ts':{}},_0x438bbd=H(_0x317c4b,_0x3ac04a,_0x4ec8e1,_0x325109),_0x3a167c=_0x4969f1=>{_0x4ec8e1['ts'][_0x4969f1]=_0x4f0b5f();},_0x58cb4a=(_0x3ecb91,_0x18ff4b)=>{var _0x3b34b2=_0x27c79f;let _0x5f4af6=_0x4ec8e1['ts'][_0x18ff4b];if(delete _0x4ec8e1['ts'][_0x18ff4b],_0x5f4af6){let _0x14250f=_0x521c85(_0x5f4af6,_0x4f0b5f());_0x5ab60e(_0x438bbd(_0x3b34b2(0x1ef),_0x3ecb91,_0x38f873(),_0x505601,[_0x14250f],_0x18ff4b));}},_0x4668fa=_0x210fc1=>(_0x45659c==='next.js'&&_0x317c4b['origin']&&_0x210fc1?.[_0x27c79f(0x17c)]?.[_0x27c79f(0x13f)]&&(_0x210fc1[_0x27c79f(0x17c)][0x0][_0x27c79f(0x14c)]=_0x317c4b[_0x27c79f(0x14c)]),_0x210fc1);_0x317c4b['_console_ninja']={'consoleLog':(_0x564fad,_0x732f24)=>{var _0x46b2ab=_0x27c79f;_0x317c4b['console']['log'][_0x46b2ab(0x213)]!==_0x46b2ab(0x1fe)&&_0x5ab60e(_0x438bbd(_0x46b2ab(0x190),_0x564fad,_0x38f873(),_0x505601,_0x732f24));},'consoleTrace':(_0x408893,_0x35b9aa)=>{var _0x23c6fc=_0x27c79f;_0x317c4b[_0x23c6fc(0x205)]['log'][_0x23c6fc(0x213)]!=='disabledTrace'&&_0x5ab60e(_0x4668fa(_0x438bbd(_0x23c6fc(0x157),_0x408893,_0x38f873(),_0x505601,_0x35b9aa)));},'consoleTime':_0x2781da=>{_0x3a167c(_0x2781da);},'consoleTimeEnd':(_0x28827f,_0x5da654)=>{_0x58cb4a(_0x5da654,_0x28827f);},'autoLog':(_0x2f42ea,_0x3b94a4)=>{var _0x4d2e21=_0x27c79f;_0x5ab60e(_0x438bbd(_0x4d2e21(0x190),_0x3b94a4,_0x38f873(),_0x505601,[_0x2f42ea]));},'autoLogMany':(_0x3ecf64,_0x51ac65)=>{_0x5ab60e(_0x438bbd('log',_0x3ecf64,_0x38f873(),_0x505601,_0x51ac65));},'autoTrace':(_0x4fd7e8,_0xc14742)=>{var _0x488736=_0x27c79f;_0x5ab60e(_0x4668fa(_0x438bbd(_0x488736(0x157),_0xc14742,_0x38f873(),_0x505601,[_0x4fd7e8])));},'autoTraceMany':(_0x518c4a,_0x31793b)=>{var _0x3c90e4=_0x27c79f;_0x5ab60e(_0x4668fa(_0x438bbd(_0x3c90e4(0x157),_0x518c4a,_0x38f873(),_0x505601,_0x31793b)));},'autoTime':(_0x260bf6,_0x712798,_0x3ae369)=>{_0x3a167c(_0x3ae369);},'autoTimeEnd':(_0x4b8db5,_0x1d2905,_0x1eea37)=>{_0x58cb4a(_0x1d2905,_0x1eea37);},'coverage':_0x13f097=>{var _0x6a82d0=_0x27c79f;_0x5ab60e({'method':_0x6a82d0(0x171),'version':_0x325109,'args':[{'id':_0x13f097}]});}};let _0x5ab60e=q(_0x317c4b,_0x3cc9db,_0x255fb0,_0x47498f,_0x45659c,_0x1cdb60,_0x1f724c),_0x505601=_0x317c4b[_0x27c79f(0x202)];return _0x317c4b[_0x27c79f(0x1f1)];})(globalThis,_0x390ccb(0x1bc),'1255',_0x390ccb(0x1ed),_0x390ccb(0x186),'1.0.0',_0x390ccb(0x139),[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-061\",\"172.27.27.79\"],_0x390ccb(0x21e),_0x390ccb(0x1cb),_0x390ccb(0x1ee));");
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