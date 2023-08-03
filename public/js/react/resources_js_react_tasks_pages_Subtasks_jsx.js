"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_tasks_pages_Subtasks_jsx"],{

/***/ "./resources/js/react/tasks/components/SubtaskTable.jsx":
/*!**************************************************************!*\
  !*** ./resources/js/react/tasks/components/SubtaskTable.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SubTasksTable)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-dnd-html5-backend */ "./node_modules/react-dnd-html5-backend/dist/getEmptyImage.js");
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/hooks/useDrop/useDrop.js");
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/hooks/useDrag/useDrag.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loader */ "./resources/js/react/tasks/components/Loader.jsx");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var _utils_dateController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/dateController */ "./resources/js/react/utils/dateController.js");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/react-table/build/lib/index.mjs");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/table-core/build/lib/index.mjs");
/* harmony import */ var _table_IndeterminateCheckbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./table/IndeterminateCheckbox */ "./resources/js/react/tasks/components/table/IndeterminateCheckbox.jsx");
/* harmony import */ var _demo_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./demo.json */ "./resources/js/react/tasks/components/demo.json");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _TasksTablePagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TasksTablePagination */ "./resources/js/react/tasks/components/TasksTablePagination.jsx");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _loader_TaskTableLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./loader/TaskTableLoader */ "./resources/js/react/tasks/components/loader/TaskTableLoader.jsx");
/* harmony import */ var _services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/api/tasksApiSlice */ "./resources/js/react/services/api/tasksApiSlice.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/features/tasksSlice */ "./resources/js/react/services/features/tasksSlice.js");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Dropdown */ "./resources/js/react/tasks/components/Dropdown.jsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Button */ "./resources/js/react/tasks/components/Button.jsx");
/* harmony import */ var _Timer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Timer */ "./resources/js/react/tasks/components/Timer.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






var compareDate = new _utils_dateController__WEBPACK_IMPORTED_MODULE_3__.CompareDate();















// reorder column



var reorderColumn = function reorderColumn(draggedColumnId, targetColumnId, columnOrder) {
  columnOrder.splice(columnOrder.indexOf(targetColumnId), 0, columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]);
  return _toConsumableArray(columnOrder);
};

// dragable columns
var DragableColumnHeader = function DragableColumnHeader(_ref) {
  var _asc$desc$header$colu;
  var header = _ref.header,
    table = _ref.table;
  var getState = table.getState,
    setColumnOrder = table.setColumnOrder;
  var _getState = getState(),
    columnOrder = _getState.columnOrder;
  var column = header.column;
  var dropRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  var _useDrop = (0,react_dnd__WEBPACK_IMPORTED_MODULE_17__.useDrop)({
      accept: 'column',
      drop: function drop(draggedColumn) {
        if (column.id === "expend" || column.id === 'action') return;
        var newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder);
        setColumnOrder(newColumnOrder);
      },
      collect: function collect(monitor) {
        return {
          isOver: monitor.isOver()
        };
      }
    }),
    _useDrop2 = _slicedToArray(_useDrop, 2),
    isOver = _useDrop2[0].isOver,
    drop = _useDrop2[1];
  var _useDrag = (0,react_dnd__WEBPACK_IMPORTED_MODULE_18__.useDrag)({
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging()
        };
      },
      item: function item() {
        return column.id === "expend" || column.id === 'action' ? null : column;
      },
      type: 'column'
    }),
    _useDrag2 = _slicedToArray(_useDrag, 3),
    isDragging = _useDrag2[0].isDragging,
    drag = _useDrag2[1],
    preview = _useDrag2[2];

  //   
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    preview((0,react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_19__.getEmptyImage)(), {
      captureDraggingState: true
    });
  }, []);
  drag(drop(dropRef));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("th", {
      ref: dropRef,
      colSpan: header.colSpan,
      style: {
        opacity: isDragging ? 0.5 : 1,
        background: isOver && (column.id !== "expend" || column.id === 'action') ? '#f3f3f3' : ''
      },
      className: "sp1_tasks_th sp1_tasks_th--".concat(column.id),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
        className: "d-flex align-items-start",
        children: [column.id !== 'expend' && column.id !== 'action' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("button", {
          onClick: header.column.getToggleSortingHandler(),
          className: 'sp1_tasks_column_sort_btn',
          children: header.column.getIsSorted() ? (_asc$desc$header$colu = {
            asc: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
              className: "table_asc_dec asc"
            }),
            desc: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
              className: "table_asc_dec dec"
            })
          }[header.column.getIsSorted()]) !== null && _asc$desc$header$colu !== void 0 ? _asc$desc$header$colu : null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
            className: "table_asc_dec"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
            children: header.isPlaceholder ? null : (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_20__.flexRender)(header.column.columnDef.header, header.getContext())
          })
        })]
      })
    })
  });
};
var Person = function Person(_ref2) {
  var avatar = _ref2.avatar,
    url = _ref2.url,
    name = _ref2.name;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
    className: "d-flex align-items-center",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      className: "",
      style: {
        width: '28px'
      },
      children: avatar ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
        style: {
          width: '32px',
          height: '28px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("img", {
          src: "/user-uploads/avatar/".concat(avatar),
          alt: name,
          width: 24,
          height: 24,
          style: {
            width: '28px',
            height: '28px'
          },
          className: "rounded-circle"
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
        className: "sp1-item-center border rounded-circle",
        style: {
          width: "28px",
          height: "28px"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          style: {
            fontSize: "1rem",
            fontWeight: "bold"
          },
          children: name === null || name === void 0 ? void 0 : name.slice(0, 1).toUpperCase()
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("a", {
      href: url,
      className: "pl-2 ",
      children: name
    })]
  });
};
function SubTasksTable(_ref3) {
  var isLoading = _ref3.isLoading,
    filter = _ref3.filter,
    tableName = _ref3.tableName,
    search = _ref3.search;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_11__.useSelector)(function (s) {
      return s.tasks;
    }),
    subtasks = _useSelector.subtasks;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    data = _React$useState2[0],
    setData = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState({}),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    expanded = _React$useState4[0],
    setExpanded = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    sorting = _React$useState6[0],
    setSorting = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState({
      pageIndex: 0,
      pageSize: 10
    }),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    _React$useState8$ = _React$useState8[0],
    pageIndex = _React$useState8$.pageIndex,
    pageSize = _React$useState8$.pageSize,
    setPagination = _React$useState8[1];
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    skipPageReset = _React$useState10[0],
    setSkipPageReset = _React$useState10[1];
  var _React$useState11 = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    globalFilter = _React$useState12[0],
    setGlobalFilter = _React$useState12[1];
  var _tasks = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return subtasks;
  }, [subtasks]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (lodash__WEBPACK_IMPORTED_MODULE_6___default().size(_tasks) === lodash__WEBPACK_IMPORTED_MODULE_6___default().size(data)) {
      setSkipPageReset(true);
      _tasks && setData(_tasks);
    } else {
      _tasks && setData(_tasks);
    }
  }, [_tasks]);

  // clear skipPageReset 
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (skipPageReset) {
      setSkipPageReset(false);
    }
  }, [data]);

  // column
  var defaultColumns = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return [{
      id: 'task',
      header: 'Task',
      accessorKey: 'id',
      cell: function cell(_ref4) {
        var row = _ref4.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("abbr", {
          title: data === null || data === void 0 ? void 0 : data.heading,
          style: {
            textDecoration: 'none'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
            className: "d-flex align-items-center",
            style: {
              gap: '10px'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("a", {
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
      cell: function cell(_ref5) {
        var row = _ref5.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        var count = data === null || data === void 0 ? void 0 : data.subtasks_timer_active;
        var subtaskCount = lodash__WEBPACK_IMPORTED_MODULE_6___default().size(data === null || data === void 0 ? void 0 : data.subtasks_count);
        var isActive = count > 0;
        var serverTime = 0;
        var localTime = 0;
        var timer = 0;
        if (data !== null && data !== void 0 && data.start_time && lodash__WEBPACK_IMPORTED_MODULE_6___default().isNull(data === null || data === void 0 ? void 0 : data.end_time)) {
          serverTime = compareDate.dayjs(data === null || data === void 0 ? void 0 : data.start_time).unix();
          localTime = compareDate.dayjs().unix();
          timer = localTime - serverTime;
        }
        var clockIsRunning = (data === null || data === void 0 ? void 0 : data.start_time) && lodash__WEBPACK_IMPORTED_MODULE_6___default().isNull(data === null || data === void 0 ? void 0 : data.end_time);
        var color = isActive || clockIsRunning ? '#54B688' : '#DCDEE1';
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
          style: {
            color: color
          },
          className: "d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("i", {
            className: "fa-solid fa-stopwatch f-18"
          }), row.parentId === undefined && subtaskCount === 0 && !clockIsRunning && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
            className: "ml-2",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("strong", {
              children: count
            })
          }), clockIsRunning && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
            className: "ml-1 badge badge-primary text-white",
            style: {
              fontSize: '11px'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Timer__WEBPACK_IMPORTED_MODULE_15__["default"], {
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
      cell: function cell(_ref6) {
        var row = _ref6.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("abbr", {
          title: data === null || data === void 0 ? void 0 : data.milestone_title,
          style: {
            textDecoration: 'none'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
            className: "multine-ellipsis word-break",
            children: data === null || data === void 0 ? void 0 : data.milestone_title
          })
        });
      }
    }, {
      id: 'deliverable',
      header: 'Deliverable',
      accessorKey: 'deliverable_title',
      cell: function cell(_ref7) {
        var _data$deliverable_tit;
        var row = _ref7.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("abbr", {
          title: data === null || data === void 0 ? void 0 : data.deliverable_title,
          style: {
            textDecoration: 'none'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
            className: "multine-ellipsis word-break",
            children: (_data$deliverable_tit = data === null || data === void 0 ? void 0 : data.deliverable_title) !== null && _data$deliverable_tit !== void 0 ? _data$deliverable_tit : '--'
          })
        });
      }
    }, {
      id: 'project',
      header: 'Project',
      accessorKey: 'project_name',
      cell: function cell(_ref8) {
        var row = _ref8.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("abbr", {
          title: data === null || data === void 0 ? void 0 : data.project_name,
          style: {
            textDecoration: 'none'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("a", {
            href: "/account/projects/".concat(data === null || data === void 0 ? void 0 : data.project_id),
            className: "multine-ellipsis",
            children: data === null || data === void 0 ? void 0 : data.project_name
          })
        });
      }
    }, {
      id: 'client',
      header: 'Client',
      accessorKey: 'client_name',
      cell: function cell(_ref9) {
        var row = _ref9.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(Person, {
            url: "/account/clients/".concat(data === null || data === void 0 ? void 0 : data.client_id),
            avatar: data === null || data === void 0 ? void 0 : data.client_avatar,
            name: data === null || data === void 0 ? void 0 : data.client_name
          })
        });
      }
    }, {
      id: 'project_manager',
      header: 'Project Manager',
      accessorKey: 'pm_id_name',
      cell: function cell(_ref10) {
        var row = _ref10.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(Person, {
          url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.project_manager_id),
          name: data === null || data === void 0 ? void 0 : data.pm_id_name,
          avatar: data === null || data === void 0 ? void 0 : data.pm_id_avatar
        });
      }
    }, {
      id: 'creation_date',
      header: 'Creation Date',
      accessorKey: 'creation_date',
      cell: function cell(_ref11) {
        var row = _ref11.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
          children: data === null || data === void 0 ? void 0 : data.creation_date
        });
      }
    }, {
      id: 'due_date',
      header: 'Due Date',
      accessorKey: "due_date",
      cell: function cell(_ref12) {
        var _date;
        var row = _ref12.row;
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
        date = date === 'Today' ? date : dayjs__WEBPACK_IMPORTED_MODULE_8___default()(date).format('DD-MM-YYYY');
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
          style: {
            color: color
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("strong", {
            children: (_date = date) !== null && _date !== void 0 ? _date : '--'
          })
        });
      }
    }, {
      id: 'start_date',
      header: 'Started Date',
      accessorKey: 'start_date',
      cell: function cell(_ref13) {
        var row = _ref13.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("strong", {
          children: data !== null && data !== void 0 && data.start_date ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.Fragment, {
            children: [dayjs__WEBPACK_IMPORTED_MODULE_8___default()(data === null || data === void 0 ? void 0 : data.start_date).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("br", {})]
          }) : '--'
        });
      }
    }, {
      id: 'completion_date',
      header: 'Completion Date',
      accessorKey: 'completion_date',
      cell: function cell(_ref14) {
        var row = _ref14.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("strong", {
          children: Number(data === null || data === void 0 ? void 0 : data.board_column_id) === 4 ? (data === null || data === void 0 ? void 0 : data.completion_date) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.Fragment, {
            children: [dayjs__WEBPACK_IMPORTED_MODULE_8___default()(data === null || data === void 0 ? void 0 : data.completion_date).format('DD-MM-YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("br", {})]
          }) : '--'
        });
      }
    }, {
      id: 'approved_on',
      header: 'Approved On',
      cell: function cell(_ref15) {
        var row = _ref15.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("strong", {
          children: data !== null && data !== void 0 && data.task_approval_date ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.Fragment, {
            children: dayjs__WEBPACK_IMPORTED_MODULE_8___default()(data === null || data === void 0 ? void 0 : data.task_approval_date).format('DD-MM-YYYY')
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
            className: "badge text-white word-break",
            style: {
              background: '#f5c308'
            },
            children: "Not Completed Yet!"
          })
        });
      }
    }, {
      id: 'estimated_time',
      header: 'Estimated Time',
      cell: function cell(_ref16) {
        var _data$estimate_hours, _data$estimate_minute;
        var row = _ref16.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
          children: [(_data$estimate_hours = data === null || data === void 0 ? void 0 : data.estimate_hours) !== null && _data$estimate_hours !== void 0 ? _data$estimate_hours : 0, " hrs ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("br", {}), (_data$estimate_minute = data === null || data === void 0 ? void 0 : data.estimate_minutes) !== null && _data$estimate_minute !== void 0 ? _data$estimate_minute : 0, " mins"]
        });
      }
    }, {
      id: 'hours_logged',
      header: 'Hours Logged',
      cell: function cell(_ref17) {
        var row = _ref17.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          children: (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_2__.convertTime)(data === null || data === void 0 ? void 0 : data.subtasks_hours_logged)
        });
      }
    }, {
      id: 'assigned_by',
      header: 'Assigned By',
      cell: function cell(_ref18) {
        var row = _ref18.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(Person, {
          url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.added_by),
          avatar: data === null || data === void 0 ? void 0 : data.added_by_avatar,
          name: data === null || data === void 0 ? void 0 : data.added_by_name
        });
      }
    }, {
      id: 'assigned_to',
      header: 'Assigned To',
      cell: function cell(_ref19) {
        var row = _ref19.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(Person, {
          url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.assigned_to_id),
          avatar: data === null || data === void 0 ? void 0 : data.assigned_to_avatar,
          name: data === null || data === void 0 ? void 0 : data.assigned_to_name
        });
      }
    }, {
      id: 'status',
      header: 'Task Status',
      cell: function cell(_ref20) {
        var row = _ref20.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
          className: "badge text-white",
          style: {
            background: data === null || data === void 0 ? void 0 : data.label_color
          },
          children: data === null || data === void 0 ? void 0 : data.column_name
        });
      }
    }, {
      id: 'progress',
      header: 'Progress',
      cell: function cell(_ref21) {
        var row = _ref21.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        var count = Number(data === null || data === void 0 ? void 0 : data.subtasks_count);
        var completed = Number(data === null || data === void 0 ? void 0 : data.subtasks_completed_count);
        var bg = 'bg-transparent';
        var percent = 0;
        if (count > 0) {
          percent = completed / count * 100;
        } else {
          percent = (data === null || data === void 0 ? void 0 : data.board_column_id) === 4 ? 100 : 0;
        }
        if (percent === 100) {
          bg = 'bg-success';
        } else if (percent < 100 && percent >= 75) {
          bg = 'bg-info';
        } else if (percent < 75 && percent >= 25) {
          bg = 'bg-warning';
        } else bg = 'bg-danger';
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
            className: "progress",
            style: {
              height: '16px'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
              className: "progress-bar progress-bar-striped ".concat(bg),
              role: "progressbar",
              style: {
                width: "".concat(percent, "%")
              },
              "aria-valuenow": "10",
              "aria-valuemin": "0",
              "aria-valuemax": "100"
            })
          })
        });
      }
    }, {
      id: 'report',
      header: 'Report',
      cell: function cell(_ref22) {
        var row = _ref22.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
            className: "badge badge-danger",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("strong", {
              children: "3"
            }), " Reports"]
          })
        });
      }
    }, {
      id: 'action',
      header: 'Action',
      cell: function cell(_ref23) {
        var row = _ref23.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_13__["default"], {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_13__["default"].Toggle, {
              icon: false,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_14__["default"], {
                variant: "tertiary",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("i", {
                  className: "fa-solid fa-ellipsis-vertical"
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_13__["default"].Menu, {
              className: "p-1",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_13__["default"].Item, {
                className: "sp1_tasks_tbl_action",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("i", {
                  className: "fa-regular fa-pen-to-square mr-2"
                }), "Edit"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_13__["default"].Item, {
                className: "sp1_tasks_tbl_del",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("i", {
                  className: "fa-solid fa-trash-can mr-2"
                }), "Delete"]
              })]
            })]
          })
        });
      }
    }];
  });

  // columns
  var _React$useState13 = react__WEBPACK_IMPORTED_MODULE_0__.useState(_toConsumableArray(defaultColumns)),
    _React$useState14 = _slicedToArray(_React$useState13, 1),
    columns = _React$useState14[0];
  var _React$useState15 = react__WEBPACK_IMPORTED_MODULE_0__.useState(lodash__WEBPACK_IMPORTED_MODULE_6___default().map(columns, 'id')),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    columnOrder = _React$useState16[0],
    setColumnOrder = _React$useState16[1];

  // reset columns
  var resetColumnsOrder = function resetColumnsOrder() {
    return setColumnOrder(lodash__WEBPACK_IMPORTED_MODULE_6___default().map(columns, 'id'));
  };
  var pagination = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
  }, [pageIndex, pageSize]);

  // table instance...
  var table = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_20__.useReactTable)({
    data: data,
    columns: columns,
    state: {
      sorting: sorting,
      expanded: expanded,
      columnOrder: columnOrder,
      pagination: pagination,
      tableName: tableName,
      filter: filter,
      globalFilter: search
    },
    onGlobalFilterChange: setGlobalFilter,
    autoResetPageIndex: !skipPageReset,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getSubRows: function getSubRows(row) {
      return row.subtasks;
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_21__.getCoreRowModel)(),
    getPaginationRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_21__.getPaginationRowModel)(),
    getFilteredRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_21__.getFilteredRowModel)(),
    getExpandedRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_21__.getExpandedRowModel)(),
    getSortedRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_21__.getSortedRowModel)(),
    paginateExpandedRows: false,
    debugTable: true,
    debugColumns: true,
    debugHeaders: true
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      className: "sp1_tasks_table_wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("table", {
        className: "sp1_tasks_table",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("thead", {
          className: "sp1_tasks_thead",
          children: table.getHeaderGroups().map(function (headerGroup) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("tr", {
              className: "sp1_tasks_tr",
              children: headerGroup.headers.map(function (header) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(DragableColumnHeader, {
                  header: header,
                  table: table
                }, header.id);
              })
            }, headerGroup.id);
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("tbody", {
          className: "sp1_tasks_tbody",
          children: [!isLoading && table.getRowModel().rows.map(function (row) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("tr", {
              className: "sp1_tasks_tr ".concat(row.parentId !== undefined ? 'expended_row' : '', " ").concat(row.getIsExpanded() ? 'expended_parent_row' : ''),
              children: row.getVisibleCells().map(function (cell) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("td", {
                  className: "px-2 sp1_tasks_td",
                  children: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_20__.flexRender)(cell.column.columnDef.cell, cell.getContext())
                }, cell.id);
              })
            }, row.id);
          }), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_loader_TaskTableLoader__WEBPACK_IMPORTED_MODULE_9__["default"], {})]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_TasksTablePagination__WEBPACK_IMPORTED_MODULE_7__["default"], {
      currentPage: pageIndex + 1,
      perpageRow: pageSize,
      onPageSize: function onPageSize(size) {
        return table.setPageSize(size);
      },
      onPaginate: function onPaginate(page) {
        return table.setPageIndex(page - 1);
      },
      totalEntry: table.getPageCount() * pageSize,
      onNext: function onNext() {
        return table.getCanNextPage() && table.nextPage();
      },
      disableNext: !table.getCanNextPage(),
      onPrevious: function onPrevious() {
        return table.getCanPreviousPage() && table.previousPage();
      },
      disablePrevious: !table.getCanPreviousPage(),
      totalPages: table.getPageCount()
    })]
  });
}

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Tabbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Tabbar */ "./resources/js/react/tasks/components/Tabbar.jsx");
/* harmony import */ var _components_SubtaskTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/SubtaskTable */ "./resources/js/react/tasks/components/SubtaskTable.jsx");
/* harmony import */ var _components_Filter_bar_FilterContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Filter-bar/FilterContainer */ "./resources/js/react/tasks/components/Filter-bar/FilterContainer.jsx");
/* harmony import */ var _components_Filter_bar_Filterbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Filter-bar/Filterbar */ "./resources/js/react/tasks/components/Filter-bar/Filterbar.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_Searchbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Searchbox */ "./resources/js/react/tasks/components/Searchbox.jsx");
/* harmony import */ var _services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/api/tasksApiSlice */ "./resources/js/react/services/api/tasksApiSlice.js");
/* harmony import */ var _services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/features/tasksSlice */ "./resources/js/react/services/features/tasksSlice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var Subtasks = function Subtasks() {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(function (s) {
      return s.tasks;
    }),
    tasks = _useSelector.tasks;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    filter = _React$useState2[0],
    setFilter = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    search = _React$useState4[0],
    setSearch = _React$useState4[1];
  var _useLazyGetAllSubtask = (0,_services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_7__.useLazyGetAllSubtaskQuery)(),
    _useLazyGetAllSubtask2 = _slicedToArray(_useLazyGetAllSubtask, 2),
    getAllSubtask = _useLazyGetAllSubtask2[0],
    isFetching = _useLazyGetAllSubtask2[1].isFetching;
  var onFilter = function onFilter(filter) {
    var queryObject = _.pickBy(filter, Boolean);
    var queryString = new URLSearchParams(queryObject).toString();
    setFilter(queryObject);
    if (filter !== null && filter !== void 0 && filter.start_date && filter !== null && filter !== void 0 && filter.end_date) {
      getAllSubtask("".concat(queryString)).unwrap().then(function (res) {
        var data = _.orderBy(res === null || res === void 0 ? void 0 : res.tasks, 'due_date', 'desc');
        dispatch((0,_services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_8__.storeSubTasks)({
          subtasks: data
        }));
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Filter_bar_FilterContainer__WEBPACK_IMPORTED_MODULE_3__["default"], {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Filter_bar_Filterbar__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onFilter: onFilter
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      className: "sp1_tlr_container",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "sp1_tlr_tbl_container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "mb-3 d-flex align-items-center flex-wrap justify-content-between",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Tabbar__WEBPACK_IMPORTED_MODULE_1__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
            style: {
              maxWidth: '300px'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Searchbox__WEBPACK_IMPORTED_MODULE_6__["default"], {
              value: search,
              onChange: setSearch
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_SubtaskTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isLoading: isFetching,
          filter: filter,
          tableName: "tasksTable",
          search: search
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Subtasks);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_tasks_pages_Subtasks_jsx.js.map