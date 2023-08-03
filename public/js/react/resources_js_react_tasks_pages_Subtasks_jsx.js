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
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/hooks/useDrop/useDrop.js");
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/hooks/useDrag/useDrag.js");
/* harmony import */ var react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-dnd-html5-backend */ "./node_modules/react-dnd-html5-backend/dist/getEmptyImage.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loader */ "./resources/js/react/tasks/components/Loader.jsx");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/react-table/build/lib/index.mjs");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/table-core/build/lib/index.mjs");
/* harmony import */ var _table_IndeterminateCheckbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table/IndeterminateCheckbox */ "./resources/js/react/tasks/components/table/IndeterminateCheckbox.jsx");
/* harmony import */ var _demo_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./demo.json */ "./resources/js/react/tasks/components/demo.json");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _TasksTablePagination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TasksTablePagination */ "./resources/js/react/tasks/components/TasksTablePagination.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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
  var _useDrop = (0,react_dnd__WEBPACK_IMPORTED_MODULE_7__.useDrop)({
      accept: 'column',
      drop: function drop(draggedColumn) {
        if (column.id === "expend") return;
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
  var _useDrag = (0,react_dnd__WEBPACK_IMPORTED_MODULE_8__.useDrag)({
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging()
        };
      },
      item: function item() {
        return column;
      },
      type: 'column'
    }),
    _useDrag2 = _slicedToArray(_useDrag, 3),
    isDragging = _useDrag2[0].isDragging,
    drag = _useDrag2[1],
    preview = _useDrag2[2];

  //   
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    preview((0,react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_9__.getEmptyImage)(), {
      captureDraggingState: true
    });
  }, []);
  drag(drop(dropRef));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("th", {
      ref: dropRef,
      colSpan: header.colSpan,
      style: {
        opacity: isDragging ? 0.5 : 1,
        background: isOver && column.id !== "expend" ? '#f3f3f3' : ''
      },
      className: "sp1_tasks_th sp1_tasks_th--".concat(column.id),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "d-flex align-items-start",
        children: [column.id !== 'expend' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
          onClick: header.column.getToggleSortingHandler(),
          className: 'sp1_tasks_column_sort_btn',
          children: header.column.getIsSorted() ? (_asc$desc$header$colu = {
            asc: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "table_asc_dec asc"
            }),
            desc: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "table_asc_dec dec"
            })
          }[header.column.getIsSorted()]) !== null && _asc$desc$header$colu !== void 0 ? _asc$desc$header$colu : null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            className: "table_asc_dec"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "w-100",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            children: header.isPlaceholder ? null : (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.flexRender)(header.column.columnDef.header, header.getContext())
          })
        })]
      })
    })
  });
};
function SubTasksTable() {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(_toConsumableArray(_demo_json__WEBPACK_IMPORTED_MODULE_3__)),
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
      pageSize: 3
    }),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    _React$useState8$ = _React$useState8[0],
    pageIndex = _React$useState8$.pageIndex,
    pageSize = _React$useState8$.pageSize,
    setPagination = _React$useState8[1];

  // column
  var defaultColumns = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return [{
      id: 'task',
      header: 'Task',
      accessorKey: 'id',
      cell: function cell(_ref2) {
        var row = _ref2.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "d-flex align-items-center",
          style: {
            gap: '10px'
          },
          children: "Products Page"
        });
      }
    }, {
      id: 'timer_status',
      header: 'Timer Active/Inactive',
      cell: function cell(_ref3) {
        var row = _ref3.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.timer_action
            }
          })
        });
      }
    }, {
      id: 'milestone',
      header: 'Milestone',
      cell: function cell(_ref4) {
        var row = _ref4.row;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: "Milestone"
        });
      }
    }, {
      id: 'deliverable',
      header: 'Deliverable',
      cell: function cell(_ref5) {
        var row = _ref5.row;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: "Milestone"
        });
      }
    }, {
      id: 'project',
      header: 'Project',
      cell: function cell(_ref6) {
        var row = _ref6.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.project_name
            }
          })
        });
      }
    }, {
      id: 'client',
      header: 'Client',
      cell: function cell(_ref7) {
        var row = _ref7.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.client_name
            }
          })
        });
      }
    }, {
      id: 'start_date',
      header: 'Start Date',
      cell: function cell(_ref8) {
        var row = _ref8.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.due_date
            }
          })
        });
      }
    }, {
      id: 'due_date',
      header: 'Due Date',
      cell: function cell(_ref9) {
        var row = _ref9.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.due_date
            }
          })
        });
      }
    }, {
      id: 'actual_completion_date',
      header: 'Actual Completion Date',
      cell: function cell(_ref10) {
        var row = _ref10.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.due_date
            }
          })
        });
      }
    }, {
      id: 'estimated_time',
      header: 'Estimated Time',
      cell: function cell(_ref11) {
        var row = _ref11.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.estimate_time
            }
          })
        });
      }
    }, {
      id: 'hours_logged',
      header: 'Hours Logged',
      cell: function cell(_ref12) {
        var row = _ref12.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.timeLogged
            }
          })
        });
      }
    }, {
      id: 'assigned_by',
      header: 'Assigned By',
      cell: function cell(_ref13) {
        var row = _ref13.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.users
            }
          })
        });
      }
    }, {
      id: 'assigned_to',
      header: 'Assigned To',
      cell: function cell(_ref14) {
        var row = _ref14.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.users
            }
          })
        });
      }
    }, {
      id: 'creation_date',
      header: 'Creation Date',
      cell: function cell(_ref15) {
        var row = _ref15.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.created_at
            }
          })
        });
      }
    }, {
      id: 'status',
      header: 'Task Status',
      cell: function cell(_ref16) {
        var row = _ref16.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.board_column
            }
          })
        });
      }
    }, {
      id: 'report',
      header: 'Report',
      cell: function cell(_ref17) {
        var row = _ref17.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "alert alert-danger",
            children: "Report"
          })
        });
      }
    }, {
      id: 'progress',
      header: 'Progress',
      cell: function cell(_ref18) {
        var row = _ref18.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.progress
            }
          })
        });
      }
    }, {
      id: 'action',
      header: 'Action',
      cell: function cell(_ref19) {
        var row = _ref19.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: data === null || data === void 0 ? void 0 : data.action
            }
          })
        });
      }
    }];
  });

  // columns
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_0__.useState(_toConsumableArray(defaultColumns)),
    _React$useState10 = _slicedToArray(_React$useState9, 1),
    columns = _React$useState10[0];
  var _React$useState11 = react__WEBPACK_IMPORTED_MODULE_0__.useState(lodash__WEBPACK_IMPORTED_MODULE_4___default().map(columns, 'id')),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    columnOrder = _React$useState12[0],
    setColumnOrder = _React$useState12[1];

  // reset columns
  var resetColumnsOrder = function resetColumnsOrder() {
    return setColumnOrder(lodash__WEBPACK_IMPORTED_MODULE_4___default().map(columns, 'id'));
  };
  var pagination = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
  }, [pageIndex, pageSize]);

  // table instance...
  var table = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.useReactTable)({
    data: data,
    columns: columns,
    state: {
      sorting: sorting,
      columnOrder: columnOrder,
      pagination: pagination
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getCoreRowModel)(),
    getPaginationRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getPaginationRowModel)(),
    getFilteredRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getFilteredRowModel)(),
    getSortedRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getSortedRowModel)(),
    debugTable: true,
    debugColumns: true,
    debugHeaders: true
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "sp1_tasks_table_wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("table", {
        className: "sp1_tasks_table",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("thead", {
          className: "sp1_tasks_thead",
          children: table.getHeaderGroups().map(function (headerGroup) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tr", {
              className: "sp1_tasks_tr",
              children: headerGroup.headers.map(function (header) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(DragableColumnHeader, {
                  header: header,
                  table: table
                }, header.id);
              })
            }, headerGroup.id);
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tbody", {
          className: "sp1_tasks_tbody",
          children: table.getRowModel().rows.map(function (row) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tr", {
              className: "sp1_tasks_tr ".concat(row.parentId !== undefined ? 'expended_row' : '', " ").concat(row.getIsExpanded() ? 'expended_parent_row' : ''),
              children: row.getVisibleCells().map(function (cell) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  className: "px-2 sp1_tasks_td",
                  children: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.flexRender)(cell.column.columnDef.cell, cell.getContext())
                }, cell.id);
              })
            }, row.id);
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_TasksTablePagination__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var Subtasks = function Subtasks() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Filter_bar_FilterContainer__WEBPACK_IMPORTED_MODULE_3__["default"], {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Filter_bar_Filterbar__WEBPACK_IMPORTED_MODULE_4__["default"], {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "sp1_tlr_container",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "sp1_tlr_tbl_container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "mb-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Tabbar__WEBPACK_IMPORTED_MODULE_1__["default"], {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_SubtaskTable__WEBPACK_IMPORTED_MODULE_2__["default"], {})]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Subtasks);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_tasks_pages_Subtasks_jsx.js.map