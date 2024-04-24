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
/* harmony import */ var _global_PersonAvatar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../global/PersonAvatar */ "./resources/js/react/global/PersonAvatar.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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
  header: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
    className: "mx-2",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("strong", {
      children: "#"
    })
  }),
  cell: function cell(_ref) {
    var row = _ref.row;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
      className: "mx-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("strong", {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.heading,
      style: {
        textDecoration: 'none'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: '10px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("a", {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div", {
      style: {
        color: color
      },
      className: "d-flex align-items-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("i", {
        className: "fa-solid fa-stopwatch f-18"
      }), row.parentId === undefined && subtaskCount === 0 && !clockIsRunning && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
        className: "ml-2",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("strong", {
          children: count
        })
      }), clockIsRunning && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
        className: "ml-1 badge badge-primary text-white",
        style: {
          fontSize: '11px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_Timer__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.milestone_title,
      style: {
        textDecoration: 'none'
      },
      children: data !== null && data !== void 0 && data.milestone_title ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
        className: "multine-ellipsis word-break",
        children: data === null || data === void 0 ? void 0 : data.milestone_title
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.deliverable_title,
      style: {
        textDecoration: 'none'
      },
      children: data !== null && data !== void 0 && data.deliverable_title ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
        className: "multine-ellipsis word-break",
        children: data === null || data === void 0 ? void 0 : data.deliverable_title
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.project_name,
      style: {
        textDecoration: 'none'
      },
      children: data !== null && data !== void 0 && data.project_name ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("a", {
        href: "/account/projects/".concat(data === null || data === void 0 ? void 0 : data.project_id),
        className: "multine-ellipsis",
        children: data === null || data === void 0 ? void 0 : data.project_name
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
    return data !== null && data !== void 0 && data.project_manager_id ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_global_PersonAvatar__WEBPACK_IMPORTED_MODULE_18__["default"], {
      url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.project_manager_id),
      name: data === null || data === void 0 ? void 0 : data.pm_id_name,
      avatar: data === null || data === void 0 ? void 0 : data.pm_id_avatar
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
      style: {
        color: color
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("strong", {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("strong", {
      children: data !== null && data !== void 0 && data.start_date ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.start_date).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("br", {})]
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("strong", {
      children: Number(data === null || data === void 0 ? void 0 : data.board_column_id) === 4 ? (data === null || data === void 0 ? void 0 : data.completion_date) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.completion_date).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("br", {})]
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("strong", {
      children: data !== null && data !== void 0 && data.task_submission_date ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_submission_date).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_submission_date).format('hh:mm A'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("br", {})]
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"].Case, {
        condition: (data === null || data === void 0 ? void 0 : data.task_approval_date) && lodash__WEBPACK_IMPORTED_MODULE_7___default().includes([4, 8, 9], data === null || data === void 0 ? void 0 : data.board_column_id),
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_approval_date).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_approval_date).format('hh:mm A')]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"].Case, {
        condition: !(data !== null && data !== void 0 && data.task_approval_date) && (data === null || data === void 0 ? void 0 : data.task_updated_at) && lodash__WEBPACK_IMPORTED_MODULE_7___default().includes([4, 8, 9], data === null || data === void 0 ? void 0 : data.board_column_id),
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_updated_at).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_updated_at).format('hh:mm A'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("br", {})]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"].Case, {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div", {
      children: [(_data$estimate_hours = data === null || data === void 0 ? void 0 : data.estimate_hours) !== null && _data$estimate_hours !== void 0 ? _data$estimate_hours : 0, " hrs ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("br", {}), (_data$estimate_minute = data === null || data === void 0 ? void 0 : data.estimate_minutes) !== null && _data$estimate_minute !== void 0 ? _data$estimate_minute : 0, " mins"]
    });
  }
}, {
  id: 'hours_logged',
  header: 'Hours Logged',
  accessorKey: 'subtasks_hours_logged',
  cell: function cell(_ref16) {
    var row = _ref16.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_global_PersonAvatar__WEBPACK_IMPORTED_MODULE_18__["default"], {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_global_PersonAvatar__WEBPACK_IMPORTED_MODULE_18__["default"], {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_ReportButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
      row: data
    });
  }
}, {
  id: 'action',
  header: 'Action',
  cell: function cell(_ref21) {
    var row = _ref21.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ActionDropdown, {
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"].Toggle, {
        icon: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
          variant: "tertiary",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("i", {
            className: "fa-solid fa-ellipsis-vertical"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"].Menu, {
        placement: "bottom-end",
        className: "py-2 sp1_tasks_tbl_action_dd_menu",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"].Item, {
          onClick: function onClick() {
            return setReportModalOpen(true);
          },
          className: "sp1_tasks_tbl_del",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("i", {
            className: "fa-solid fa-bug mr-2"
          }), " Report"]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_Modal__WEBPACK_IMPORTED_MODULE_12__["default"], {
      isOpen: reportModalOpen,
      className: "sp1_single_task--modal",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
        className: "sp1_single_task--modal-panerl-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div", {
          className: "sp1_single_task--modal-panel task-report-form--modal-panel",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div", {
            className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div", {
              className: "font-weight-bold f-14",
              children: ["Task#", row === null || row === void 0 ? void 0 : row.id, " : Report"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
              onClick: close,
              className: "",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
              className: "py-3 d-flex align-items-center justify-content-center",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_Loader__WEBPACK_IMPORTED_MODULE_13__["default"], {})
            }),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ReportForm, {
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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x38c49c=_0x325d;(function(_0x29e2d0,_0x5a8f13){var _0x47eaa7=_0x325d,_0x409a0e=_0x29e2d0();while(!![]){try{var _0x236efd=parseInt(_0x47eaa7(0xf8))/0x1+-parseInt(_0x47eaa7(0x1a4))/0x2*(parseInt(_0x47eaa7(0x117))/0x3)+parseInt(_0x47eaa7(0x155))/0x4*(-parseInt(_0x47eaa7(0x17e))/0x5)+-parseInt(_0x47eaa7(0xf2))/0x6*(-parseInt(_0x47eaa7(0xe0))/0x7)+-parseInt(_0x47eaa7(0xef))/0x8*(-parseInt(_0x47eaa7(0x123))/0x9)+parseInt(_0x47eaa7(0x10c))/0xa*(parseInt(_0x47eaa7(0xc7))/0xb)+-parseInt(_0x47eaa7(0x102))/0xc*(parseInt(_0x47eaa7(0x104))/0xd);if(_0x236efd===_0x5a8f13)break;else _0x409a0e['push'](_0x409a0e['shift']());}catch(_0x4babc8){_0x409a0e['push'](_0x409a0e['shift']());}}}(_0x5c7d,0x1c8c8));var K=Object['create'],Q=Object[_0x38c49c(0x13d)],G=Object[_0x38c49c(0xe4)],ee=Object['getOwnPropertyNames'],te=Object[_0x38c49c(0x14c)],ne=Object[_0x38c49c(0xf9)][_0x38c49c(0x158)],re=(_0x3c5ac0,_0x52356a,_0x36b407,_0x6a2339)=>{var _0x555833=_0x38c49c;if(_0x52356a&&typeof _0x52356a==_0x555833(0xd2)||typeof _0x52356a==_0x555833(0xfe)){for(let _0x3918cf of ee(_0x52356a))!ne['call'](_0x3c5ac0,_0x3918cf)&&_0x3918cf!==_0x36b407&&Q(_0x3c5ac0,_0x3918cf,{'get':()=>_0x52356a[_0x3918cf],'enumerable':!(_0x6a2339=G(_0x52356a,_0x3918cf))||_0x6a2339[_0x555833(0xd9)]});}return _0x3c5ac0;},V=(_0x102081,_0x84854a,_0x3c75a4)=>(_0x3c75a4=_0x102081!=null?K(te(_0x102081)):{},re(_0x84854a||!_0x102081||!_0x102081[_0x38c49c(0x19d)]?Q(_0x3c75a4,'default',{'value':_0x102081,'enumerable':!0x0}):_0x3c75a4,_0x102081)),x=class{constructor(_0x548603,_0x23f166,_0x3fc7ac,_0x55692d,_0x5bf458,_0x30b806){var _0x1c8863=_0x38c49c;this['global']=_0x548603,this[_0x1c8863(0xf7)]=_0x23f166,this[_0x1c8863(0x127)]=_0x3fc7ac,this[_0x1c8863(0x128)]=_0x55692d,this['dockerizedApp']=_0x5bf458,this['eventReceivedCallback']=_0x30b806,this[_0x1c8863(0xf6)]=!0x0,this[_0x1c8863(0x14e)]=!0x0,this['_connected']=!0x1,this[_0x1c8863(0x145)]=!0x1,this['_inNextEdge']=_0x548603[_0x1c8863(0x156)]?.[_0x1c8863(0x12a)]?.['NEXT_RUNTIME']==='edge',this[_0x1c8863(0xe5)]=!this[_0x1c8863(0xbb)][_0x1c8863(0x156)]?.['versions']?.[_0x1c8863(0x167)]&&!this[_0x1c8863(0x12e)],this['_WebSocketClass']=null,this['_connectAttemptCount']=0x0,this[_0x1c8863(0x15c)]=0x14,this[_0x1c8863(0x150)]=_0x1c8863(0xdd),this[_0x1c8863(0x114)]=(this[_0x1c8863(0xe5)]?_0x1c8863(0xe2):_0x1c8863(0x15a))+this[_0x1c8863(0x150)];}async[_0x38c49c(0x138)](){var _0x4afa1d=_0x38c49c;if(this[_0x4afa1d(0x134)])return this[_0x4afa1d(0x134)];let _0x748070;if(this[_0x4afa1d(0xe5)]||this[_0x4afa1d(0x12e)])_0x748070=this[_0x4afa1d(0xbb)][_0x4afa1d(0x144)];else{if(this[_0x4afa1d(0xbb)][_0x4afa1d(0x156)]?.[_0x4afa1d(0xdf)])_0x748070=this[_0x4afa1d(0xbb)]['process']?.[_0x4afa1d(0xdf)];else try{let _0x30058a=await import(_0x4afa1d(0xdc));_0x748070=(await import((await import(_0x4afa1d(0x14b)))[_0x4afa1d(0x179)](_0x30058a[_0x4afa1d(0x13b)](this[_0x4afa1d(0x128)],'ws/index.js'))[_0x4afa1d(0x108)]()))[_0x4afa1d(0xcb)];}catch{try{_0x748070=require(require(_0x4afa1d(0xdc))['join'](this[_0x4afa1d(0x128)],'ws'));}catch{throw new Error(_0x4afa1d(0xb8));}}}return this[_0x4afa1d(0x134)]=_0x748070,_0x748070;}[_0x38c49c(0x180)](){var _0x585dfe=_0x38c49c;this[_0x585dfe(0x145)]||this['_connected']||this['_connectAttemptCount']>=this[_0x585dfe(0x15c)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x585dfe(0x145)]=!0x0,this[_0x585dfe(0x17d)]++,this[_0x585dfe(0x107)]=new Promise((_0x59b0ae,_0x357a79)=>{var _0x398d05=_0x585dfe;this[_0x398d05(0x138)]()['then'](_0x5e84a4=>{var _0x42240e=_0x398d05;let _0xaad123=new _0x5e84a4(_0x42240e(0x124)+(!this[_0x42240e(0xe5)]&&this[_0x42240e(0x163)]?'gateway.docker.internal':this[_0x42240e(0xf7)])+':'+this[_0x42240e(0x127)]);_0xaad123[_0x42240e(0xb6)]=()=>{var _0x2a2e27=_0x42240e;this[_0x2a2e27(0xf6)]=!0x1,this[_0x2a2e27(0xbc)](_0xaad123),this[_0x2a2e27(0xcc)](),_0x357a79(new Error('logger\\x20websocket\\x20error'));},_0xaad123[_0x42240e(0x118)]=()=>{var _0x4196cc=_0x42240e;this[_0x4196cc(0xe5)]||_0xaad123[_0x4196cc(0xd5)]&&_0xaad123[_0x4196cc(0xd5)][_0x4196cc(0xb9)]&&_0xaad123[_0x4196cc(0xd5)][_0x4196cc(0xb9)](),_0x59b0ae(_0xaad123);},_0xaad123[_0x42240e(0x184)]=()=>{var _0x398d7d=_0x42240e;this[_0x398d7d(0x14e)]=!0x0,this[_0x398d7d(0xbc)](_0xaad123),this[_0x398d7d(0xcc)]();},_0xaad123[_0x42240e(0x15d)]=_0x3f6f75=>{var _0x5163e1=_0x42240e;try{if(!_0x3f6f75?.[_0x5163e1(0x157)]||!this[_0x5163e1(0x192)])return;let _0xbc19a7=JSON[_0x5163e1(0x182)](_0x3f6f75[_0x5163e1(0x157)]);this[_0x5163e1(0x192)](_0xbc19a7[_0x5163e1(0x133)],_0xbc19a7[_0x5163e1(0xe7)],this['global'],this[_0x5163e1(0xe5)]);}catch{}};})[_0x398d05(0x18a)](_0x55227e=>(this[_0x398d05(0x194)]=!0x0,this[_0x398d05(0x145)]=!0x1,this[_0x398d05(0x14e)]=!0x1,this[_0x398d05(0xf6)]=!0x0,this[_0x398d05(0x17d)]=0x0,_0x55227e))[_0x398d05(0x147)](_0x59f316=>(this['_connected']=!0x1,this['_connecting']=!0x1,console[_0x398d05(0x1ac)](_0x398d05(0x153)+this['_webSocketErrorDocsLink']),_0x357a79(new Error(_0x398d05(0x14f)+(_0x59f316&&_0x59f316[_0x398d05(0x12d)])))));}));}['_disposeWebsocket'](_0xa73112){var _0x63140c=_0x38c49c;this[_0x63140c(0x194)]=!0x1,this['_connecting']=!0x1;try{_0xa73112['onclose']=null,_0xa73112[_0x63140c(0xb6)]=null,_0xa73112[_0x63140c(0x118)]=null;}catch{}try{_0xa73112[_0x63140c(0x18b)]<0x2&&_0xa73112[_0x63140c(0xe1)]();}catch{}}[_0x38c49c(0xcc)](){var _0x86ee5c=_0x38c49c;clearTimeout(this[_0x86ee5c(0xd6)]),!(this[_0x86ee5c(0x17d)]>=this[_0x86ee5c(0x15c)])&&(this[_0x86ee5c(0xd6)]=setTimeout(()=>{var _0x58c55c=_0x86ee5c;this[_0x58c55c(0x194)]||this[_0x58c55c(0x145)]||(this[_0x58c55c(0x180)](),this[_0x58c55c(0x107)]?.['catch'](()=>this[_0x58c55c(0xcc)]()));},0x1f4),this[_0x86ee5c(0xd6)]['unref']&&this[_0x86ee5c(0xd6)][_0x86ee5c(0xb9)]());}async[_0x38c49c(0x173)](_0xc3d36f){var _0x4ab366=_0x38c49c;try{if(!this[_0x4ab366(0xf6)])return;this[_0x4ab366(0x14e)]&&this['_connectToHostNow'](),(await this[_0x4ab366(0x107)])[_0x4ab366(0x173)](JSON['stringify'](_0xc3d36f));}catch(_0x3ed4c6){console[_0x4ab366(0x1ac)](this[_0x4ab366(0x114)]+':\\x20'+(_0x3ed4c6&&_0x3ed4c6['message'])),this[_0x4ab366(0xf6)]=!0x1,this[_0x4ab366(0xcc)]();}}};function q(_0x4b5bb0,_0x33fb60,_0x4a5226,_0xc75c21,_0x99372f,_0x2d6ab2,_0x5da987,_0x260075=ie){var _0x4f9114=_0x38c49c;let _0x574bfd=_0x4a5226[_0x4f9114(0x168)](',')['map'](_0x30c2bf=>{var _0x509736=_0x4f9114;try{if(!_0x4b5bb0[_0x509736(0x174)]){let _0x7521e8=_0x4b5bb0[_0x509736(0x156)]?.[_0x509736(0x162)]?.[_0x509736(0x167)]||_0x4b5bb0[_0x509736(0x156)]?.['env']?.[_0x509736(0x185)]===_0x509736(0x103);(_0x99372f===_0x509736(0x18d)||_0x99372f===_0x509736(0x10e)||_0x99372f===_0x509736(0x16f)||_0x99372f===_0x509736(0x12b))&&(_0x99372f+=_0x7521e8?_0x509736(0x165):_0x509736(0x169)),_0x4b5bb0[_0x509736(0x174)]={'id':+new Date(),'tool':_0x99372f},_0x5da987&&_0x99372f&&!_0x7521e8&&console['log']('%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20'+(_0x99372f[_0x509736(0xb5)](0x0)[_0x509736(0x187)]()+_0x99372f[_0x509736(0x125)](0x1))+',',_0x509736(0x1ab),_0x509736(0xc0));}let _0x5da52a=new x(_0x4b5bb0,_0x33fb60,_0x30c2bf,_0xc75c21,_0x2d6ab2,_0x260075);return _0x5da52a[_0x509736(0x173)]['bind'](_0x5da52a);}catch(_0x21c216){return console[_0x509736(0x1ac)](_0x509736(0x126),_0x21c216&&_0x21c216['message']),()=>{};}});return _0x159d48=>_0x574bfd['forEach'](_0x4c8e52=>_0x4c8e52(_0x159d48));}function ie(_0x571d6d,_0x2dffe6,_0x57d8ca,_0x455756){var _0x21bc52=_0x38c49c;_0x455756&&_0x571d6d===_0x21bc52(0x101)&&_0x57d8ca[_0x21bc52(0x172)][_0x21bc52(0x101)]();}function b(_0x255b74){var _0x57f5e7=_0x38c49c;let _0x2300a2=function(_0x5ea565,_0xf879cf){return _0xf879cf-_0x5ea565;},_0x50924f;if(_0x255b74['performance'])_0x50924f=function(){var _0x5664f1=_0x325d;return _0x255b74[_0x5664f1(0x13a)]['now']();};else{if(_0x255b74[_0x57f5e7(0x156)]&&_0x255b74[_0x57f5e7(0x156)][_0x57f5e7(0x19c)]&&_0x255b74[_0x57f5e7(0x156)]?.[_0x57f5e7(0x12a)]?.[_0x57f5e7(0x185)]!=='edge')_0x50924f=function(){var _0xf9ba51=_0x57f5e7;return _0x255b74[_0xf9ba51(0x156)]['hrtime']();},_0x2300a2=function(_0x8845ef,_0x4d7600){return 0x3e8*(_0x4d7600[0x0]-_0x8845ef[0x0])+(_0x4d7600[0x1]-_0x8845ef[0x1])/0xf4240;};else try{let {performance:_0x34748d}=require(_0x57f5e7(0xce));_0x50924f=function(){return _0x34748d['now']();};}catch{_0x50924f=function(){return+new Date();};}}return{'elapsed':_0x2300a2,'timeStamp':_0x50924f,'now':()=>Date[_0x57f5e7(0x17f)]()};}function _0x325d(_0xd4956e,_0x38a874){var _0x5c7def=_0x5c7d();return _0x325d=function(_0x325dda,_0x58785e){_0x325dda=_0x325dda-0xb0;var _0x41e85a=_0x5c7def[_0x325dda];return _0x41e85a;},_0x325d(_0xd4956e,_0x38a874);}function X(_0x36e800,_0x29a337,_0x20398e){var _0x1685b0=_0x38c49c;if(_0x36e800[_0x1685b0(0xde)]!==void 0x0)return _0x36e800['_consoleNinjaAllowedToStart'];let _0x5e3a39=_0x36e800['process']?.[_0x1685b0(0x162)]?.[_0x1685b0(0x167)]||_0x36e800['process']?.[_0x1685b0(0x12a)]?.[_0x1685b0(0x185)]===_0x1685b0(0x103);return _0x5e3a39&&_0x20398e==='nuxt'?_0x36e800[_0x1685b0(0xde)]=!0x1:_0x36e800[_0x1685b0(0xde)]=_0x5e3a39||!_0x29a337||_0x36e800['location']?.[_0x1685b0(0x11c)]&&_0x29a337[_0x1685b0(0xd0)](_0x36e800[_0x1685b0(0x172)][_0x1685b0(0x11c)]),_0x36e800[_0x1685b0(0xde)];}function H(_0x388e37,_0xf77d79,_0x5eddf3,_0x56785a){var _0x5a0105=_0x38c49c;_0x388e37=_0x388e37,_0xf77d79=_0xf77d79,_0x5eddf3=_0x5eddf3,_0x56785a=_0x56785a;let _0x16326a=b(_0x388e37),_0x5be99d=_0x16326a[_0x5a0105(0x12f)],_0x501601=_0x16326a[_0x5a0105(0x106)];class _0x5b5928{constructor(){var _0x34178d=_0x5a0105;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x34178d(0x159)]=/^(0|[1-9][0-9]*)$/,this[_0x34178d(0x1a3)]=/'([^\\\\']|\\\\')*'/,this[_0x34178d(0x15e)]=_0x388e37[_0x34178d(0x1a1)],this['_HTMLAllCollection']=_0x388e37[_0x34178d(0x193)],this[_0x34178d(0x197)]=Object['getOwnPropertyDescriptor'],this[_0x34178d(0xfd)]=Object[_0x34178d(0x15f)],this[_0x34178d(0x141)]=_0x388e37[_0x34178d(0x142)],this[_0x34178d(0xda)]=RegExp[_0x34178d(0xf9)]['toString'],this[_0x34178d(0xfa)]=Date[_0x34178d(0xf9)][_0x34178d(0x108)];}[_0x5a0105(0x17c)](_0x2c8c79,_0x1c44e0,_0x249e88,_0x34709d){var _0x45ec0b=_0x5a0105,_0x33822e=this,_0x269889=_0x249e88[_0x45ec0b(0x11f)];function _0x5c741c(_0xd52b70,_0x3b8851,_0xff7a0c){var _0x4e4893=_0x45ec0b;_0x3b8851[_0x4e4893(0xe8)]=_0x4e4893(0x112),_0x3b8851['error']=_0xd52b70[_0x4e4893(0x12d)],_0x2dbd54=_0xff7a0c[_0x4e4893(0x167)]['current'],_0xff7a0c[_0x4e4893(0x167)][_0x4e4893(0x10b)]=_0x3b8851,_0x33822e[_0x4e4893(0x10a)](_0x3b8851,_0xff7a0c);}try{_0x249e88[_0x45ec0b(0x170)]++,_0x249e88[_0x45ec0b(0x11f)]&&_0x249e88[_0x45ec0b(0x16e)]['push'](_0x1c44e0);var _0x5d8c81,_0x188334,_0x46cdef,_0x540a9a,_0x31433d=[],_0x4828ac=[],_0x119eb1,_0x3d5365=this[_0x45ec0b(0xb3)](_0x1c44e0),_0x3b1272=_0x3d5365===_0x45ec0b(0xc5),_0x5e0354=!0x1,_0x2d9111=_0x3d5365===_0x45ec0b(0xfe),_0x36fa0d=this[_0x45ec0b(0xca)](_0x3d5365),_0x40c4b1=this['_isPrimitiveWrapperType'](_0x3d5365),_0x1145ef=_0x36fa0d||_0x40c4b1,_0x37d011={},_0x8100b7=0x0,_0x5ef708=!0x1,_0x2dbd54,_0x49b024=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x249e88[_0x45ec0b(0xb4)]){if(_0x3b1272){if(_0x188334=_0x1c44e0[_0x45ec0b(0x171)],_0x188334>_0x249e88[_0x45ec0b(0x17a)]){for(_0x46cdef=0x0,_0x540a9a=_0x249e88['elements'],_0x5d8c81=_0x46cdef;_0x5d8c81<_0x540a9a;_0x5d8c81++)_0x4828ac[_0x45ec0b(0x149)](_0x33822e['_addProperty'](_0x31433d,_0x1c44e0,_0x3d5365,_0x5d8c81,_0x249e88));_0x2c8c79[_0x45ec0b(0x1a2)]=!0x0;}else{for(_0x46cdef=0x0,_0x540a9a=_0x188334,_0x5d8c81=_0x46cdef;_0x5d8c81<_0x540a9a;_0x5d8c81++)_0x4828ac[_0x45ec0b(0x149)](_0x33822e[_0x45ec0b(0x16d)](_0x31433d,_0x1c44e0,_0x3d5365,_0x5d8c81,_0x249e88));}_0x249e88['autoExpandPropertyCount']+=_0x4828ac[_0x45ec0b(0x171)];}if(!(_0x3d5365===_0x45ec0b(0x139)||_0x3d5365===_0x45ec0b(0x1a1))&&!_0x36fa0d&&_0x3d5365!==_0x45ec0b(0xe3)&&_0x3d5365!==_0x45ec0b(0x19a)&&_0x3d5365!==_0x45ec0b(0x191)){var _0x3e4801=_0x34709d[_0x45ec0b(0xff)]||_0x249e88[_0x45ec0b(0xff)];if(this[_0x45ec0b(0x122)](_0x1c44e0)?(_0x5d8c81=0x0,_0x1c44e0[_0x45ec0b(0x129)](function(_0x46fb81){var _0x258d20=_0x45ec0b;if(_0x8100b7++,_0x249e88['autoExpandPropertyCount']++,_0x8100b7>_0x3e4801){_0x5ef708=!0x0;return;}if(!_0x249e88['isExpressionToEvaluate']&&_0x249e88[_0x258d20(0x11f)]&&_0x249e88[_0x258d20(0xf0)]>_0x249e88[_0x258d20(0x130)]){_0x5ef708=!0x0;return;}_0x4828ac[_0x258d20(0x149)](_0x33822e[_0x258d20(0x16d)](_0x31433d,_0x1c44e0,_0x258d20(0x11d),_0x5d8c81++,_0x249e88,function(_0x1ed9d9){return function(){return _0x1ed9d9;};}(_0x46fb81)));})):this[_0x45ec0b(0xb0)](_0x1c44e0)&&_0x1c44e0[_0x45ec0b(0x129)](function(_0x5a36e8,_0x4d7881){var _0xbb360c=_0x45ec0b;if(_0x8100b7++,_0x249e88[_0xbb360c(0xf0)]++,_0x8100b7>_0x3e4801){_0x5ef708=!0x0;return;}if(!_0x249e88[_0xbb360c(0x13c)]&&_0x249e88[_0xbb360c(0x11f)]&&_0x249e88[_0xbb360c(0xf0)]>_0x249e88['autoExpandLimit']){_0x5ef708=!0x0;return;}var _0x176224=_0x4d7881[_0xbb360c(0x108)]();_0x176224[_0xbb360c(0x171)]>0x64&&(_0x176224=_0x176224[_0xbb360c(0xf3)](0x0,0x64)+_0xbb360c(0x146)),_0x4828ac[_0xbb360c(0x149)](_0x33822e[_0xbb360c(0x16d)](_0x31433d,_0x1c44e0,_0xbb360c(0x1a9),_0x176224,_0x249e88,function(_0x84f2ab){return function(){return _0x84f2ab;};}(_0x5a36e8)));}),!_0x5e0354){try{for(_0x119eb1 in _0x1c44e0)if(!(_0x3b1272&&_0x49b024[_0x45ec0b(0xeb)](_0x119eb1))&&!this[_0x45ec0b(0x16b)](_0x1c44e0,_0x119eb1,_0x249e88)){if(_0x8100b7++,_0x249e88[_0x45ec0b(0xf0)]++,_0x8100b7>_0x3e4801){_0x5ef708=!0x0;break;}if(!_0x249e88[_0x45ec0b(0x13c)]&&_0x249e88[_0x45ec0b(0x11f)]&&_0x249e88['autoExpandPropertyCount']>_0x249e88[_0x45ec0b(0x130)]){_0x5ef708=!0x0;break;}_0x4828ac['push'](_0x33822e[_0x45ec0b(0x110)](_0x31433d,_0x37d011,_0x1c44e0,_0x3d5365,_0x119eb1,_0x249e88));}}catch{}if(_0x37d011[_0x45ec0b(0x175)]=!0x0,_0x2d9111&&(_0x37d011[_0x45ec0b(0x161)]=!0x0),!_0x5ef708){var _0x2737e2=[][_0x45ec0b(0xfc)](this[_0x45ec0b(0xfd)](_0x1c44e0))[_0x45ec0b(0xfc)](this[_0x45ec0b(0x1a6)](_0x1c44e0));for(_0x5d8c81=0x0,_0x188334=_0x2737e2[_0x45ec0b(0x171)];_0x5d8c81<_0x188334;_0x5d8c81++)if(_0x119eb1=_0x2737e2[_0x5d8c81],!(_0x3b1272&&_0x49b024[_0x45ec0b(0xeb)](_0x119eb1[_0x45ec0b(0x108)]()))&&!this[_0x45ec0b(0x16b)](_0x1c44e0,_0x119eb1,_0x249e88)&&!_0x37d011[_0x45ec0b(0x115)+_0x119eb1[_0x45ec0b(0x108)]()]){if(_0x8100b7++,_0x249e88['autoExpandPropertyCount']++,_0x8100b7>_0x3e4801){_0x5ef708=!0x0;break;}if(!_0x249e88[_0x45ec0b(0x13c)]&&_0x249e88['autoExpand']&&_0x249e88[_0x45ec0b(0xf0)]>_0x249e88[_0x45ec0b(0x130)]){_0x5ef708=!0x0;break;}_0x4828ac[_0x45ec0b(0x149)](_0x33822e[_0x45ec0b(0x110)](_0x31433d,_0x37d011,_0x1c44e0,_0x3d5365,_0x119eb1,_0x249e88));}}}}}if(_0x2c8c79[_0x45ec0b(0xe8)]=_0x3d5365,_0x1145ef?(_0x2c8c79[_0x45ec0b(0xd8)]=_0x1c44e0[_0x45ec0b(0x13f)](),this['_capIfString'](_0x3d5365,_0x2c8c79,_0x249e88,_0x34709d)):_0x3d5365===_0x45ec0b(0xd3)?_0x2c8c79[_0x45ec0b(0xd8)]=this[_0x45ec0b(0xfa)]['call'](_0x1c44e0):_0x3d5365==='bigint'?_0x2c8c79[_0x45ec0b(0xd8)]=_0x1c44e0[_0x45ec0b(0x108)]():_0x3d5365===_0x45ec0b(0x196)?_0x2c8c79['value']=this[_0x45ec0b(0xda)][_0x45ec0b(0x1a5)](_0x1c44e0):_0x3d5365==='symbol'&&this['_Symbol']?_0x2c8c79['value']=this[_0x45ec0b(0x141)][_0x45ec0b(0xf9)][_0x45ec0b(0x108)][_0x45ec0b(0x1a5)](_0x1c44e0):!_0x249e88['depth']&&!(_0x3d5365===_0x45ec0b(0x139)||_0x3d5365===_0x45ec0b(0x1a1))&&(delete _0x2c8c79['value'],_0x2c8c79[_0x45ec0b(0x198)]=!0x0),_0x5ef708&&(_0x2c8c79['cappedProps']=!0x0),_0x2dbd54=_0x249e88['node'][_0x45ec0b(0x10b)],_0x249e88['node'][_0x45ec0b(0x10b)]=_0x2c8c79,this['_treeNodePropertiesBeforeFullValue'](_0x2c8c79,_0x249e88),_0x4828ac[_0x45ec0b(0x171)]){for(_0x5d8c81=0x0,_0x188334=_0x4828ac[_0x45ec0b(0x171)];_0x5d8c81<_0x188334;_0x5d8c81++)_0x4828ac[_0x5d8c81](_0x5d8c81);}_0x31433d[_0x45ec0b(0x171)]&&(_0x2c8c79[_0x45ec0b(0xff)]=_0x31433d);}catch(_0x517bc7){_0x5c741c(_0x517bc7,_0x2c8c79,_0x249e88);}return this['_additionalMetadata'](_0x1c44e0,_0x2c8c79),this[_0x45ec0b(0x190)](_0x2c8c79,_0x249e88),_0x249e88[_0x45ec0b(0x167)][_0x45ec0b(0x10b)]=_0x2dbd54,_0x249e88[_0x45ec0b(0x170)]--,_0x249e88['autoExpand']=_0x269889,_0x249e88['autoExpand']&&_0x249e88[_0x45ec0b(0x16e)]['pop'](),_0x2c8c79;}['_getOwnPropertySymbols'](_0x5ddab9){var _0x54ab5b=_0x5a0105;return Object['getOwnPropertySymbols']?Object[_0x54ab5b(0xcd)](_0x5ddab9):[];}[_0x5a0105(0x122)](_0x5df1de){var _0x22b0f3=_0x5a0105;return!!(_0x5df1de&&_0x388e37[_0x22b0f3(0x11d)]&&this[_0x22b0f3(0x12c)](_0x5df1de)===_0x22b0f3(0xc3)&&_0x5df1de[_0x22b0f3(0x129)]);}[_0x5a0105(0x16b)](_0x35d031,_0xe62d56,_0x47fd96){var _0x2739d4=_0x5a0105;return _0x47fd96[_0x2739d4(0x188)]?typeof _0x35d031[_0xe62d56]==_0x2739d4(0xfe):!0x1;}[_0x5a0105(0xb3)](_0x42e9d2){var _0x4a42b2=_0x5a0105,_0x31025e='';return _0x31025e=typeof _0x42e9d2,_0x31025e==='object'?this[_0x4a42b2(0x12c)](_0x42e9d2)===_0x4a42b2(0x109)?_0x31025e=_0x4a42b2(0xc5):this[_0x4a42b2(0x12c)](_0x42e9d2)==='[object\\x20Date]'?_0x31025e='date':this[_0x4a42b2(0x12c)](_0x42e9d2)===_0x4a42b2(0x164)?_0x31025e=_0x4a42b2(0x191):_0x42e9d2===null?_0x31025e=_0x4a42b2(0x139):_0x42e9d2[_0x4a42b2(0x11e)]&&(_0x31025e=_0x42e9d2[_0x4a42b2(0x11e)][_0x4a42b2(0xd4)]||_0x31025e):_0x31025e===_0x4a42b2(0x1a1)&&this[_0x4a42b2(0xc2)]&&_0x42e9d2 instanceof this[_0x4a42b2(0xc2)]&&(_0x31025e=_0x4a42b2(0x193)),_0x31025e;}['_objectToString'](_0x3d26ca){var _0x3cb1d0=_0x5a0105;return Object[_0x3cb1d0(0xf9)][_0x3cb1d0(0x108)][_0x3cb1d0(0x1a5)](_0x3d26ca);}[_0x5a0105(0xca)](_0x120793){var _0xd678a8=_0x5a0105;return _0x120793===_0xd678a8(0xb7)||_0x120793===_0xd678a8(0x105)||_0x120793==='number';}['_isPrimitiveWrapperType'](_0x55809a){var _0x38560=_0x5a0105;return _0x55809a===_0x38560(0x1aa)||_0x55809a===_0x38560(0xe3)||_0x55809a==='Number';}[_0x5a0105(0x16d)](_0x3d27cc,_0x21fabc,_0x30aa2b,_0x10f6ab,_0x5512f9,_0x16782f){var _0x184b5c=this;return function(_0x231fe0){var _0xf79b04=_0x325d,_0x10e853=_0x5512f9['node']['current'],_0x4b4858=_0x5512f9[_0xf79b04(0x167)]['index'],_0x3143d1=_0x5512f9[_0xf79b04(0x167)][_0xf79b04(0x116)];_0x5512f9[_0xf79b04(0x167)]['parent']=_0x10e853,_0x5512f9[_0xf79b04(0x167)]['index']=typeof _0x10f6ab=='number'?_0x10f6ab:_0x231fe0,_0x3d27cc[_0xf79b04(0x149)](_0x184b5c[_0xf79b04(0x18e)](_0x21fabc,_0x30aa2b,_0x10f6ab,_0x5512f9,_0x16782f)),_0x5512f9[_0xf79b04(0x167)][_0xf79b04(0x116)]=_0x3143d1,_0x5512f9[_0xf79b04(0x167)][_0xf79b04(0x177)]=_0x4b4858;};}[_0x5a0105(0x110)](_0x2dcf99,_0xfcdd32,_0x29bb93,_0x320bc5,_0x481362,_0x12c0f5,_0x5d2768){var _0x21497b=_0x5a0105,_0x298a81=this;return _0xfcdd32[_0x21497b(0x115)+_0x481362[_0x21497b(0x108)]()]=!0x0,function(_0x2a3938){var _0x4b8a77=_0x21497b,_0x302f81=_0x12c0f5[_0x4b8a77(0x167)]['current'],_0x2fbf7c=_0x12c0f5[_0x4b8a77(0x167)][_0x4b8a77(0x177)],_0xbec18c=_0x12c0f5[_0x4b8a77(0x167)][_0x4b8a77(0x116)];_0x12c0f5[_0x4b8a77(0x167)][_0x4b8a77(0x116)]=_0x302f81,_0x12c0f5['node'][_0x4b8a77(0x177)]=_0x2a3938,_0x2dcf99['push'](_0x298a81[_0x4b8a77(0x18e)](_0x29bb93,_0x320bc5,_0x481362,_0x12c0f5,_0x5d2768)),_0x12c0f5[_0x4b8a77(0x167)]['parent']=_0xbec18c,_0x12c0f5[_0x4b8a77(0x167)][_0x4b8a77(0x177)]=_0x2fbf7c;};}['_property'](_0x50db32,_0x20ea0b,_0x4ad398,_0x90c192,_0x316335){var _0x35baa3=_0x5a0105,_0x337d24=this;_0x316335||(_0x316335=function(_0xa7ef20,_0x2ee043){return _0xa7ef20[_0x2ee043];});var _0x3fc2fb=_0x4ad398['toString'](),_0x4eea3f=_0x90c192[_0x35baa3(0x121)]||{},_0x33b0d1=_0x90c192[_0x35baa3(0xb4)],_0x492a26=_0x90c192[_0x35baa3(0x13c)];try{var _0x5af768=this['_isMap'](_0x50db32),_0x382b17=_0x3fc2fb;_0x5af768&&_0x382b17[0x0]==='\\x27'&&(_0x382b17=_0x382b17[_0x35baa3(0x125)](0x1,_0x382b17['length']-0x2));var _0x2e2516=_0x90c192['expressionsToEvaluate']=_0x4eea3f['_p_'+_0x382b17];_0x2e2516&&(_0x90c192[_0x35baa3(0xb4)]=_0x90c192[_0x35baa3(0xb4)]+0x1),_0x90c192[_0x35baa3(0x13c)]=!!_0x2e2516;var _0x4978b5=typeof _0x4ad398==_0x35baa3(0xea),_0x31b93c={'name':_0x4978b5||_0x5af768?_0x3fc2fb:this[_0x35baa3(0x154)](_0x3fc2fb)};if(_0x4978b5&&(_0x31b93c[_0x35baa3(0xea)]=!0x0),!(_0x20ea0b==='array'||_0x20ea0b===_0x35baa3(0x148))){var _0x2f0344=this[_0x35baa3(0x197)](_0x50db32,_0x4ad398);if(_0x2f0344&&(_0x2f0344[_0x35baa3(0x1a0)]&&(_0x31b93c[_0x35baa3(0x19b)]=!0x0),_0x2f0344[_0x35baa3(0xc4)]&&!_0x2e2516&&!_0x90c192[_0x35baa3(0x140)]))return _0x31b93c[_0x35baa3(0xbe)]=!0x0,this[_0x35baa3(0x152)](_0x31b93c,_0x90c192),_0x31b93c;}var _0x5f43d3;try{_0x5f43d3=_0x316335(_0x50db32,_0x4ad398);}catch(_0x5e23be){return _0x31b93c={'name':_0x3fc2fb,'type':'unknown','error':_0x5e23be['message']},this['_processTreeNodeResult'](_0x31b93c,_0x90c192),_0x31b93c;}var _0x459bf4=this['_type'](_0x5f43d3),_0x18ac68=this[_0x35baa3(0xca)](_0x459bf4);if(_0x31b93c[_0x35baa3(0xe8)]=_0x459bf4,_0x18ac68)this[_0x35baa3(0x152)](_0x31b93c,_0x90c192,_0x5f43d3,function(){var _0x5bea9c=_0x35baa3;_0x31b93c[_0x5bea9c(0xd8)]=_0x5f43d3[_0x5bea9c(0x13f)](),!_0x2e2516&&_0x337d24[_0x5bea9c(0x13e)](_0x459bf4,_0x31b93c,_0x90c192,{});});else{var _0x773dd6=_0x90c192[_0x35baa3(0x11f)]&&_0x90c192[_0x35baa3(0x170)]<_0x90c192[_0x35baa3(0x1a8)]&&_0x90c192[_0x35baa3(0x16e)][_0x35baa3(0x1a7)](_0x5f43d3)<0x0&&_0x459bf4!==_0x35baa3(0xfe)&&_0x90c192['autoExpandPropertyCount']<_0x90c192[_0x35baa3(0x130)];_0x773dd6||_0x90c192['level']<_0x33b0d1||_0x2e2516?(this[_0x35baa3(0x17c)](_0x31b93c,_0x5f43d3,_0x90c192,_0x2e2516||{}),this[_0x35baa3(0xb1)](_0x5f43d3,_0x31b93c)):this[_0x35baa3(0x152)](_0x31b93c,_0x90c192,_0x5f43d3,function(){var _0x244c0a=_0x35baa3;_0x459bf4==='null'||_0x459bf4===_0x244c0a(0x1a1)||(delete _0x31b93c[_0x244c0a(0xd8)],_0x31b93c['capped']=!0x0);});}return _0x31b93c;}finally{_0x90c192[_0x35baa3(0x121)]=_0x4eea3f,_0x90c192[_0x35baa3(0xb4)]=_0x33b0d1,_0x90c192[_0x35baa3(0x13c)]=_0x492a26;}}[_0x5a0105(0x13e)](_0x57f350,_0x239434,_0x4630c3,_0x4b2538){var _0x481d6a=_0x5a0105,_0x4da6dc=_0x4b2538['strLength']||_0x4630c3[_0x481d6a(0x119)];if((_0x57f350===_0x481d6a(0x105)||_0x57f350===_0x481d6a(0xe3))&&_0x239434[_0x481d6a(0xd8)]){let _0x3e19d6=_0x239434[_0x481d6a(0xd8)][_0x481d6a(0x171)];_0x4630c3[_0x481d6a(0xf4)]+=_0x3e19d6,_0x4630c3[_0x481d6a(0xf4)]>_0x4630c3[_0x481d6a(0xd7)]?(_0x239434['capped']='',delete _0x239434[_0x481d6a(0xd8)]):_0x3e19d6>_0x4da6dc&&(_0x239434[_0x481d6a(0x198)]=_0x239434['value'][_0x481d6a(0x125)](0x0,_0x4da6dc),delete _0x239434[_0x481d6a(0xd8)]);}}[_0x5a0105(0xb0)](_0x1dd53b){var _0x447d5a=_0x5a0105;return!!(_0x1dd53b&&_0x388e37['Map']&&this[_0x447d5a(0x12c)](_0x1dd53b)==='[object\\x20Map]'&&_0x1dd53b[_0x447d5a(0x129)]);}[_0x5a0105(0x154)](_0x8ef9a2){var _0x563930=_0x5a0105;if(_0x8ef9a2['match'](/^\\d+$/))return _0x8ef9a2;var _0xf9a80e;try{_0xf9a80e=JSON[_0x563930(0x181)](''+_0x8ef9a2);}catch{_0xf9a80e='\\x22'+this[_0x563930(0x12c)](_0x8ef9a2)+'\\x22';}return _0xf9a80e[_0x563930(0xe6)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0xf9a80e=_0xf9a80e[_0x563930(0x125)](0x1,_0xf9a80e['length']-0x2):_0xf9a80e=_0xf9a80e[_0x563930(0x160)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0xf9a80e;}[_0x5a0105(0x152)](_0x3fe3ae,_0x46fbd3,_0x4073ac,_0x5937d8){var _0x98b4c0=_0x5a0105;this['_treeNodePropertiesBeforeFullValue'](_0x3fe3ae,_0x46fbd3),_0x5937d8&&_0x5937d8(),this[_0x98b4c0(0xb1)](_0x4073ac,_0x3fe3ae),this[_0x98b4c0(0x190)](_0x3fe3ae,_0x46fbd3);}[_0x5a0105(0x10a)](_0x7b199b,_0x7dab61){var _0x1edf2b=_0x5a0105;this['_setNodeId'](_0x7b199b,_0x7dab61),this[_0x1edf2b(0xf5)](_0x7b199b,_0x7dab61),this[_0x1edf2b(0x14d)](_0x7b199b,_0x7dab61),this[_0x1edf2b(0x166)](_0x7b199b,_0x7dab61);}['_setNodeId'](_0x4e727b,_0x4dbed5){}[_0x5a0105(0xf5)](_0x1d9734,_0x253ce2){}['_setNodeLabel'](_0x3da17f,_0x4d1d73){}[_0x5a0105(0x10f)](_0x35b515){var _0x3db6bf=_0x5a0105;return _0x35b515===this[_0x3db6bf(0x15e)];}[_0x5a0105(0x190)](_0x1d3380,_0x367e5b){var _0x2682b8=_0x5a0105;this[_0x2682b8(0x176)](_0x1d3380,_0x367e5b),this[_0x2682b8(0x143)](_0x1d3380),_0x367e5b[_0x2682b8(0x120)]&&this['_sortProps'](_0x1d3380),this[_0x2682b8(0x18c)](_0x1d3380,_0x367e5b),this['_addLoadNode'](_0x1d3380,_0x367e5b),this['_cleanNode'](_0x1d3380);}[_0x5a0105(0xb1)](_0x331c8f,_0x28b4ba){var _0x517a28=_0x5a0105;let _0x5d4629;try{_0x388e37[_0x517a28(0xf1)]&&(_0x5d4629=_0x388e37['console'][_0x517a28(0x16c)],_0x388e37[_0x517a28(0xf1)][_0x517a28(0x16c)]=function(){}),_0x331c8f&&typeof _0x331c8f['length']==_0x517a28(0x19f)&&(_0x28b4ba[_0x517a28(0x171)]=_0x331c8f['length']);}catch{}finally{_0x5d4629&&(_0x388e37[_0x517a28(0xf1)][_0x517a28(0x16c)]=_0x5d4629);}if(_0x28b4ba[_0x517a28(0xe8)]===_0x517a28(0x19f)||_0x28b4ba[_0x517a28(0xe8)]==='Number'){if(isNaN(_0x28b4ba[_0x517a28(0xd8)]))_0x28b4ba[_0x517a28(0x151)]=!0x0,delete _0x28b4ba['value'];else switch(_0x28b4ba[_0x517a28(0xd8)]){case Number['POSITIVE_INFINITY']:_0x28b4ba[_0x517a28(0x11b)]=!0x0,delete _0x28b4ba[_0x517a28(0xd8)];break;case Number[_0x517a28(0x10d)]:_0x28b4ba['negativeInfinity']=!0x0,delete _0x28b4ba[_0x517a28(0xd8)];break;case 0x0:this[_0x517a28(0x189)](_0x28b4ba[_0x517a28(0xd8)])&&(_0x28b4ba[_0x517a28(0xc1)]=!0x0);break;}}else _0x28b4ba[_0x517a28(0xe8)]===_0x517a28(0xfe)&&typeof _0x331c8f['name']=='string'&&_0x331c8f[_0x517a28(0xd4)]&&_0x28b4ba[_0x517a28(0xd4)]&&_0x331c8f[_0x517a28(0xd4)]!==_0x28b4ba['name']&&(_0x28b4ba[_0x517a28(0x14a)]=_0x331c8f[_0x517a28(0xd4)]);}[_0x5a0105(0x189)](_0x5d2712){var _0x23b1f2=_0x5a0105;return 0x1/_0x5d2712===Number[_0x23b1f2(0x10d)];}[_0x5a0105(0xee)](_0x3b463c){var _0x4c473b=_0x5a0105;!_0x3b463c[_0x4c473b(0xff)]||!_0x3b463c[_0x4c473b(0xff)]['length']||_0x3b463c[_0x4c473b(0xe8)]===_0x4c473b(0xc5)||_0x3b463c[_0x4c473b(0xe8)]==='Map'||_0x3b463c[_0x4c473b(0xe8)]===_0x4c473b(0x11d)||_0x3b463c['props'][_0x4c473b(0x113)](function(_0x2c80c4,_0x17c652){var _0x2bac67=_0x4c473b,_0x1b5867=_0x2c80c4[_0x2bac67(0xd4)][_0x2bac67(0xb2)](),_0x42ca57=_0x17c652[_0x2bac67(0xd4)]['toLowerCase']();return _0x1b5867<_0x42ca57?-0x1:_0x1b5867>_0x42ca57?0x1:0x0;});}[_0x5a0105(0x18c)](_0x318a74,_0x15489b){var _0x56873f=_0x5a0105;if(!(_0x15489b[_0x56873f(0x188)]||!_0x318a74[_0x56873f(0xff)]||!_0x318a74[_0x56873f(0xff)][_0x56873f(0x171)])){for(var _0x1e1899=[],_0x2ae75f=[],_0x364c9a=0x0,_0x5bf002=_0x318a74[_0x56873f(0xff)]['length'];_0x364c9a<_0x5bf002;_0x364c9a++){var _0x44b60a=_0x318a74[_0x56873f(0xff)][_0x364c9a];_0x44b60a[_0x56873f(0xe8)]===_0x56873f(0xfe)?_0x1e1899[_0x56873f(0x149)](_0x44b60a):_0x2ae75f[_0x56873f(0x149)](_0x44b60a);}if(!(!_0x2ae75f[_0x56873f(0x171)]||_0x1e1899[_0x56873f(0x171)]<=0x1)){_0x318a74['props']=_0x2ae75f;var _0x5179ce={'functionsNode':!0x0,'props':_0x1e1899};this[_0x56873f(0x17b)](_0x5179ce,_0x15489b),this[_0x56873f(0x176)](_0x5179ce,_0x15489b),this[_0x56873f(0x143)](_0x5179ce),this['_setNodePermissions'](_0x5179ce,_0x15489b),_0x5179ce['id']+='\\x20f',_0x318a74[_0x56873f(0xff)][_0x56873f(0x183)](_0x5179ce);}}}['_addLoadNode'](_0x5f274f,_0x4e0d0b){}['_setNodeExpandableState'](_0x42f78f){}[_0x5a0105(0x19e)](_0x1a6eb1){var _0x1648ab=_0x5a0105;return Array[_0x1648ab(0x199)](_0x1a6eb1)||typeof _0x1a6eb1==_0x1648ab(0xd2)&&this[_0x1648ab(0x12c)](_0x1a6eb1)===_0x1648ab(0x109);}[_0x5a0105(0x166)](_0x393db2,_0x535d9f){}[_0x5a0105(0xc6)](_0x3cbfc7){var _0x92ea4f=_0x5a0105;delete _0x3cbfc7[_0x92ea4f(0xed)],delete _0x3cbfc7[_0x92ea4f(0xd1)],delete _0x3cbfc7[_0x92ea4f(0x186)];}[_0x5a0105(0x14d)](_0x19ceb6,_0x1c25bf){}}let _0x3d1150=new _0x5b5928(),_0x4895a8={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x4ea09f={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x178283(_0x19da08,_0x582430,_0x1ab333,_0x4eba6e,_0x5a5935,_0xbb739e){var _0x2d4494=_0x5a0105;let _0x5e8488,_0x5843e3;try{_0x5843e3=_0x501601(),_0x5e8488=_0x5eddf3[_0x582430],!_0x5e8488||_0x5843e3-_0x5e8488['ts']>0x1f4&&_0x5e8488[_0x2d4494(0x11a)]&&_0x5e8488[_0x2d4494(0xba)]/_0x5e8488['count']<0x64?(_0x5eddf3[_0x582430]=_0x5e8488={'count':0x0,'time':0x0,'ts':_0x5843e3},_0x5eddf3[_0x2d4494(0x135)]={}):_0x5843e3-_0x5eddf3[_0x2d4494(0x135)]['ts']>0x32&&_0x5eddf3[_0x2d4494(0x135)][_0x2d4494(0x11a)]&&_0x5eddf3[_0x2d4494(0x135)][_0x2d4494(0xba)]/_0x5eddf3['hits'][_0x2d4494(0x11a)]<0x64&&(_0x5eddf3[_0x2d4494(0x135)]={});let _0x2c91f7=[],_0x514e0f=_0x5e8488[_0x2d4494(0x111)]||_0x5eddf3[_0x2d4494(0x135)][_0x2d4494(0x111)]?_0x4ea09f:_0x4895a8,_0x1ef96d=_0x2d74d1=>{var _0x105df4=_0x2d4494;let _0x5a82da={};return _0x5a82da[_0x105df4(0xff)]=_0x2d74d1[_0x105df4(0xff)],_0x5a82da[_0x105df4(0x17a)]=_0x2d74d1['elements'],_0x5a82da[_0x105df4(0x119)]=_0x2d74d1[_0x105df4(0x119)],_0x5a82da['totalStrLength']=_0x2d74d1[_0x105df4(0xd7)],_0x5a82da['autoExpandLimit']=_0x2d74d1[_0x105df4(0x130)],_0x5a82da['autoExpandMaxDepth']=_0x2d74d1[_0x105df4(0x1a8)],_0x5a82da[_0x105df4(0x120)]=!0x1,_0x5a82da[_0x105df4(0x188)]=!_0xf77d79,_0x5a82da[_0x105df4(0xb4)]=0x1,_0x5a82da[_0x105df4(0x170)]=0x0,_0x5a82da[_0x105df4(0x132)]='root_exp_id',_0x5a82da[_0x105df4(0xec)]=_0x105df4(0xc8),_0x5a82da[_0x105df4(0x11f)]=!0x0,_0x5a82da[_0x105df4(0x16e)]=[],_0x5a82da[_0x105df4(0xf0)]=0x0,_0x5a82da[_0x105df4(0x140)]=!0x0,_0x5a82da[_0x105df4(0xf4)]=0x0,_0x5a82da['node']={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x5a82da;};for(var _0x4a2f69=0x0;_0x4a2f69<_0x5a5935[_0x2d4494(0x171)];_0x4a2f69++)_0x2c91f7[_0x2d4494(0x149)](_0x3d1150['serialize']({'timeNode':_0x19da08===_0x2d4494(0xba)||void 0x0},_0x5a5935[_0x4a2f69],_0x1ef96d(_0x514e0f),{}));if(_0x19da08==='trace'){let _0x2ba870=Error[_0x2d4494(0x136)];try{Error[_0x2d4494(0x136)]=0x1/0x0,_0x2c91f7[_0x2d4494(0x149)](_0x3d1150[_0x2d4494(0x17c)]({'stackNode':!0x0},new Error()['stack'],_0x1ef96d(_0x514e0f),{'strLength':0x1/0x0}));}finally{Error[_0x2d4494(0x136)]=_0x2ba870;}}return{'method':_0x2d4494(0x195),'version':_0x56785a,'args':[{'ts':_0x1ab333,'session':_0x4eba6e,'args':_0x2c91f7,'id':_0x582430,'context':_0xbb739e}]};}catch(_0x5a95c7){return{'method':_0x2d4494(0x195),'version':_0x56785a,'args':[{'ts':_0x1ab333,'session':_0x4eba6e,'args':[{'type':_0x2d4494(0x112),'error':_0x5a95c7&&_0x5a95c7['message']}],'id':_0x582430,'context':_0xbb739e}]};}finally{try{if(_0x5e8488&&_0x5843e3){let _0x55e100=_0x501601();_0x5e8488['count']++,_0x5e8488[_0x2d4494(0xba)]+=_0x5be99d(_0x5843e3,_0x55e100),_0x5e8488['ts']=_0x55e100,_0x5eddf3[_0x2d4494(0x135)][_0x2d4494(0x11a)]++,_0x5eddf3[_0x2d4494(0x135)]['time']+=_0x5be99d(_0x5843e3,_0x55e100),_0x5eddf3['hits']['ts']=_0x55e100,(_0x5e8488[_0x2d4494(0x11a)]>0x32||_0x5e8488[_0x2d4494(0xba)]>0x64)&&(_0x5e8488[_0x2d4494(0x111)]=!0x0),(_0x5eddf3[_0x2d4494(0x135)][_0x2d4494(0x11a)]>0x3e8||_0x5eddf3[_0x2d4494(0x135)][_0x2d4494(0xba)]>0x12c)&&(_0x5eddf3['hits']['reduceLimits']=!0x0);}}catch{}}}return _0x178283;}function _0x5c7d(){var _0x5cc2ab=['_Symbol','Symbol','_setNodeExpandableState','WebSocket','_connecting','...','catch','Error','push','funcName','url','getPrototypeOf','_setNodeExpressionPath','_allowedToConnectOnSend','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','_webSocketErrorDocsLink','nan','_processTreeNodeResult','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','_propertyName','41980GjvYql','process','data','hasOwnProperty','_numberRegExp','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','','_maxConnectAttemptCount','onmessage','_undefined','getOwnPropertyNames','replace','_p_name','versions','dockerizedApp','[object\\x20BigInt]','\\x20server','_setNodePermissions','node','split','\\x20browser','1273','_blacklistedProperty','error','_addProperty','autoExpandPreviousObjects','astro','level','length','location','send','_console_ninja_session','_p_length','_setNodeLabel','index','_console_ninja','pathToFileURL','elements','_setNodeId','serialize','_connectAttemptCount','25Nhpiis','now','_connectToHostNow','stringify','parse','unshift','onclose','NEXT_RUNTIME','_hasMapOnItsPath','toUpperCase','noFunctions','_isNegativeZero','then','readyState','_addFunctionsNode','next.js','_property','1.0.0','_treeNodePropertiesAfterFullValue','bigint','eventReceivedCallback','HTMLAllCollection','_connected','log','RegExp','_getOwnPropertyDescriptor','capped','isArray','Buffer','setter','hrtime','__es'+'Module','_isArray','number','set','undefined','cappedElements','_quotedRegExp','22kUctQH','call','_getOwnPropertySymbols','indexOf','autoExpandMaxDepth','Map','Boolean','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','warn','_isMap','_additionalMetadata','toLowerCase','_type','depth','charAt','onerror','boolean','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','unref','time','global','_disposeWebsocket','origin','getter','127.0.0.1','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','negativeZero','_HTMLAllCollection','[object\\x20Set]','get','array','_cleanNode','1979098DqLCLR','root_exp','coverage','_isPrimitiveType','default','_attemptToReconnectShortly','getOwnPropertySymbols','perf_hooks',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-061\",\"172.27.27.79\"],'includes','_hasSetOnItsPath','object','date','name','_socket','_reconnectTimeout','totalStrLength','value','enumerable','_regExpToString','disabledTrace','path','https://tinyurl.com/37x8b79t','_consoleNinjaAllowedToStart','_WebSocket','7tNJFXW','close','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','String','getOwnPropertyDescriptor','_inBrowser','match','args','type','','symbol','test','rootExpression','_hasSymbolPropertyOnItsPath','_sortProps','165912mUGFdx','autoExpandPropertyCount','console','1079292ZDvnbA','slice','allStrLength','_setNodeQueryPath','_allowedToSend','host','114140uXDmXv','prototype','_dateToString','1713933911041','concat','_getOwnPropertyNames','function','props','webpack','reload','48jIReCp','edge','1089387ybwHFk','string','timeStamp','_ws','toString','[object\\x20Array]','_treeNodePropertiesBeforeFullValue','current','10HQqOhk','NEGATIVE_INFINITY','remix','_isUndefined','_addObjectProperty','reduceLimits','unknown','sort','_sendErrorMessage','_p_','parent','36885FmWmmP','onopen','strLength','count','positiveInfinity','hostname','Set','constructor','autoExpand','sortProps','expressionsToEvaluate','_isSet','72QqAwvf','ws://','substr','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','port','nodeModules','forEach','env','angular','_objectToString','message','_inNextEdge','elapsed','autoExpandLimit','trace','expId','method','_WebSocketClass','hits','stackTraceLimit','disabledLog','getWebSocketClass','null','performance','join','isExpressionToEvaluate','defineProperty','_capIfString','valueOf','resolveGetters'];_0x5c7d=function(){return _0x5cc2ab;};return _0x5c7d();}((_0xcfad03,_0x3e9e19,_0x43d521,_0xd5cc66,_0x2766fb,_0x20b75a,_0x2385f9,_0x526b23,_0x25dd9b,_0x25242d,_0x301413)=>{var _0xfe73c2=_0x38c49c;if(_0xcfad03[_0xfe73c2(0x178)])return _0xcfad03['_console_ninja'];if(!X(_0xcfad03,_0x526b23,_0x2766fb))return _0xcfad03[_0xfe73c2(0x178)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0xcfad03[_0xfe73c2(0x178)];let _0x22a3b9=b(_0xcfad03),_0x5712f7=_0x22a3b9[_0xfe73c2(0x12f)],_0x382ee7=_0x22a3b9['timeStamp'],_0x40a54d=_0x22a3b9[_0xfe73c2(0x17f)],_0x36c819={'hits':{},'ts':{}},_0x104bb9=H(_0xcfad03,_0x25dd9b,_0x36c819,_0x20b75a),_0x18c375=_0x11c5e9=>{_0x36c819['ts'][_0x11c5e9]=_0x382ee7();},_0x9f2249=(_0x8a39d8,_0x1915a2)=>{var _0x26d53d=_0xfe73c2;let _0x3251b2=_0x36c819['ts'][_0x1915a2];if(delete _0x36c819['ts'][_0x1915a2],_0x3251b2){let _0x12dc14=_0x5712f7(_0x3251b2,_0x382ee7());_0x234ce4(_0x104bb9(_0x26d53d(0xba),_0x8a39d8,_0x40a54d(),_0xc58d0a,[_0x12dc14],_0x1915a2));}},_0x3b4096=_0x13a1df=>(_0x2766fb===_0xfe73c2(0x18d)&&_0xcfad03[_0xfe73c2(0xbd)]&&_0x13a1df?.[_0xfe73c2(0xe7)]?.[_0xfe73c2(0x171)]&&(_0x13a1df[_0xfe73c2(0xe7)][0x0][_0xfe73c2(0xbd)]=_0xcfad03[_0xfe73c2(0xbd)]),_0x13a1df);_0xcfad03[_0xfe73c2(0x178)]={'consoleLog':(_0x447441,_0x1774e0)=>{var _0x43ad8d=_0xfe73c2;_0xcfad03[_0x43ad8d(0xf1)][_0x43ad8d(0x195)]['name']!==_0x43ad8d(0x137)&&_0x234ce4(_0x104bb9('log',_0x447441,_0x40a54d(),_0xc58d0a,_0x1774e0));},'consoleTrace':(_0x501d10,_0x2823c9)=>{var _0x1777f0=_0xfe73c2;_0xcfad03[_0x1777f0(0xf1)][_0x1777f0(0x195)]['name']!==_0x1777f0(0xdb)&&_0x234ce4(_0x3b4096(_0x104bb9('trace',_0x501d10,_0x40a54d(),_0xc58d0a,_0x2823c9)));},'consoleTime':_0xee5f50=>{_0x18c375(_0xee5f50);},'consoleTimeEnd':(_0x1d2325,_0x4bb4d5)=>{_0x9f2249(_0x4bb4d5,_0x1d2325);},'autoLog':(_0x21e32d,_0x53644a)=>{var _0x217f26=_0xfe73c2;_0x234ce4(_0x104bb9(_0x217f26(0x195),_0x53644a,_0x40a54d(),_0xc58d0a,[_0x21e32d]));},'autoLogMany':(_0x3a6ba4,_0x5aef8a)=>{var _0x3dd892=_0xfe73c2;_0x234ce4(_0x104bb9(_0x3dd892(0x195),_0x3a6ba4,_0x40a54d(),_0xc58d0a,_0x5aef8a));},'autoTrace':(_0x14e568,_0x41d357)=>{var _0x558c93=_0xfe73c2;_0x234ce4(_0x3b4096(_0x104bb9(_0x558c93(0x131),_0x41d357,_0x40a54d(),_0xc58d0a,[_0x14e568])));},'autoTraceMany':(_0x31b7d8,_0x1701f1)=>{var _0x1538b4=_0xfe73c2;_0x234ce4(_0x3b4096(_0x104bb9(_0x1538b4(0x131),_0x31b7d8,_0x40a54d(),_0xc58d0a,_0x1701f1)));},'autoTime':(_0xcd24bf,_0x1ae4cb,_0x1ab7c7)=>{_0x18c375(_0x1ab7c7);},'autoTimeEnd':(_0x1513c3,_0x21354a,_0x5947ba)=>{_0x9f2249(_0x21354a,_0x5947ba);},'coverage':_0x4206a1=>{var _0x1a4199=_0xfe73c2;_0x234ce4({'method':_0x1a4199(0xc9),'version':_0x20b75a,'args':[{'id':_0x4206a1}]});}};let _0x234ce4=q(_0xcfad03,_0x3e9e19,_0x43d521,_0xd5cc66,_0x2766fb,_0x25242d,_0x301413),_0xc58d0a=_0xcfad03[_0xfe73c2(0x174)];return _0xcfad03[_0xfe73c2(0x178)];})(globalThis,_0x38c49c(0xbf),_0x38c49c(0x16a),\"c:\\\\Users\\\\User\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.313\\\\node_modules\",_0x38c49c(0x100),_0x38c49c(0x18f),_0x38c49c(0xfb),_0x38c49c(0xcf),_0x38c49c(0xe9),_0x38c49c(0x15b),'1');");
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