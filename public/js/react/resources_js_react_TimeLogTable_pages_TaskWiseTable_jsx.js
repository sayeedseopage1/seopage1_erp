"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_TimeLogTable_pages_TaskWiseTable_jsx"],{

/***/ "./resources/js/react/TimeLogTable/components/TaskWiseLogTable.jsx":
/*!*************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TaskWiseLogTable.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useLocalStorage.js");
/* harmony import */ var _DragHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DragHeader */ "./resources/js/react/TimeLogTable/components/DragHeader.jsx");
/* harmony import */ var _TableFooter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TableFooter */ "./resources/js/react/TimeLogTable/components/TableFooter.jsx");
/* harmony import */ var _TaskWiseTableLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TaskWiseTableLoader */ "./resources/js/react/TimeLogTable/components/TaskWiseTableLoader.jsx");
/* harmony import */ var _data_table_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data-table.css */ "./resources/js/react/TimeLogTable/components/data-table.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
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








var DataTable = function DataTable(_ref) {
  var data = _ref.data,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    _ref$tableName = _ref.tableName,
    tableName = _ref$tableName === void 0 ? "data-table" : _ref$tableName,
    _ref$sortBy = _ref.sortBy,
    sortBy = _ref$sortBy === void 0 ? "" : _ref$sortBy,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "calc(100vh - 100px)" : _ref$height,
    onPaginate = _ref.onPaginate,
    perpageData = _ref.perpageData,
    handlePerPageData = _ref.handlePerPageData,
    totalEntry = _ref.totalEntry,
    currentPage = _ref.currentPage,
    isLoading = _ref.isLoading;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    columnOrder = _useState2[0],
    setColumnOrder = _useState2[1];
  var _useLocalStorage = (0,react_use__WEBPACK_IMPORTED_MODULE_6__["default"])(tableName),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    value = _useLocalStorage2[0],
    setValue = _useLocalStorage2[1];

  // get columns keys
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (value !== null && value !== void 0 && value.columnOrders) {
      setColumnOrder(value === null || value === void 0 ? void 0 : value.columnOrders);
    } else {
      var column_ids = _.map(columns, "id");
      setColumnOrder(_toConsumableArray(column_ids));
    }
  }, []);
  var _columns = _.sortBy(columns, function (item) {
    return _.indexOf(columnOrder, item.id);
  });

  // render row
  var renderRow = function renderRow(data) {
    var rows = [];
    if (data) {
      var _iterator = _createForOfIteratorHelper(data),
        _step;
      try {
        var _loop = function _loop() {
          var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];
          value === null || value === void 0 || value.map(function (item, index) {
            var className = value.length === index + 1 ? "sp1_tlr_td f-14 sp1_tlr_td_border" : "sp1_tlr_td f-14";
            rows.push( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("tr", {
                className: "sp1_tlr_tr",
                children: _.map(_columns, function (col) {
                  if (col.group) {
                    return index === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
                      children: col.cell({
                        row: item,
                        rowSpan: _.size(value)
                      })
                    }, col.id);
                  } else {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
                      children: col.cell({
                        row: item,
                        className: "".concat(className, " sp1_drag_col_").concat(col === null || col === void 0 ? void 0 : col.id)
                      })
                    }, col.id);
                  }
                })
              })
            }, item.uuid));
          });
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return rows;
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "p-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "position-relative sp1_tlr_tbl_wrapper",
        style: {
          height: height
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("table", {
          className: "sp1_tlr_table",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("thead", {
            className: "sp1_tlr_thead",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("tr", {
              className: "sp1_tlr_tr",
              children: _.map(_columns, function (column) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_DragHeader__WEBPACK_IMPORTED_MODULE_1__["default"], {
                  className: "sp1_tlr_th",
                  column: column,
                  columns: _columns,
                  onSort: function onSort() {},
                  onDrop: setColumnOrder,
                  order: columnOrder,
                  tableName: tableName,
                  storeOnLocalStore: function storeOnLocalStore(columns) {
                    return setValue(_objectSpread(_objectSpread({}, value), {}, {
                      columnOrders: columns
                    }));
                  }
                }, column.id);
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tbody", {
            className: "sp1_tlr_tbody",
            children: [!isLoading && renderRow(data), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_TaskWiseTableLoader__WEBPACK_IMPORTED_MODULE_3__["default"], {})]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_TableFooter__WEBPACK_IMPORTED_MODULE_2__["default"], {
        onPaginate: onPaginate,
        perpageData: perpageData,
        totalEntry: totalEntry,
        currentPage: currentPage,
        handlePerPageData: handlePerPageData
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataTable);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TaskWiseLogTableColumn.jsx":
/*!*******************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TaskWiseLogTableColumn.jsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskWiseTableColumn: () => (/* binding */ TaskWiseTableColumn)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserRender */ "./resources/js/react/TimeLogTable/components/UserRender.jsx");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var TaskWiseTableColumn = [{
  id: 'task_id',
  header: 'Task',
  className: '',
  group: true,
  sorted: false,
  cell: function cell(_ref) {
    var row = _ref.row,
      col = _ref.col,
      _ref$rowSpan = _ref.rowSpan,
      rowSpan = _ref$rowSpan === void 0 ? 1 : _ref$rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border sp1_drag_col_".concat(col === null || col === void 0 ? void 0 : col.id, " sp1_tlr_td_marged ").concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        href: "/account/tasks/".concat(row === null || row === void 0 ? void 0 : row.task_id),
        children: row === null || row === void 0 ? void 0 : row.task_name
      })
    });
  }
}, {
  id: 'project_id',
  header: 'Project Name',
  className: '',
  group: true,
  sorted: false,
  sortAccessor: 'project_id',
  cell: function cell(_ref2) {
    var row = _ref2.row,
      col = _ref2.col,
      _ref2$rowSpan = _ref2.rowSpan,
      rowSpan = _ref2$rowSpan === void 0 ? 1 : _ref2$rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border sp1_drag_col_".concat(col === null || col === void 0 ? void 0 : col.id, " sp1_tlr_td_marged ").concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: row !== null && row !== void 0 && row.is_independent ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        children: row === null || row === void 0 ? void 0 : row.project_name
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        href: "/account/tasks/".concat(row === null || row === void 0 ? void 0 : row.task_id),
        children: row === null || row === void 0 ? void 0 : row.project_name
      })
    });
  }
}, {
  id: 'pm_id',
  header: 'Project Manager',
  className: '',
  group: true,
  sorted: false,
  sortAccessor: 'pm_id',
  cell: function cell(_ref3) {
    var row = _ref3.row,
      col = _ref3.col,
      _ref3$rowSpan = _ref3.rowSpan,
      rowSpan = _ref3$rowSpan === void 0 ? 1 : _ref3$rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border sp1_drag_col_".concat(col === null || col === void 0 ? void 0 : col.id, " sp1_tlr_td_marged ").concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UserRender__WEBPACK_IMPORTED_MODULE_1__["default"], {
        name: row === null || row === void 0 ? void 0 : row.pm_name,
        profileUrl: "/account/employees/".concat(row === null || row === void 0 ? void 0 : row.pm_id),
        image: row === null || row === void 0 ? void 0 : row.pm_image,
        role: row === null || row === void 0 ? void 0 : row.pm_roles,
        id: row === null || row === void 0 ? void 0 : row.pm_id
      })
    });
  }
}, {
  id: 'client_id',
  header: 'Client Name',
  className: '',
  group: true,
  sorted: false,
  sortAccessor: 'client_id',
  cell: function cell(_ref4) {
    var row = _ref4.row,
      col = _ref4.col,
      _ref4$rowSpan = _ref4.rowSpan,
      rowSpan = _ref4$rowSpan === void 0 ? 1 : _ref4$rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border  sp1_drag_col_".concat(col === null || col === void 0 ? void 0 : col.id, " sp1_tlr_td_marged ").concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UserRender__WEBPACK_IMPORTED_MODULE_1__["default"], {
        name: row === null || row === void 0 ? void 0 : row.client_name,
        profileUrl: "/account/clients/".concat(row === null || row === void 0 ? void 0 : row.client_id),
        image: row === null || row === void 0 ? void 0 : row.client_image,
        role: row !== null && row !== void 0 && row.is_independent ? "" : "Freelancer.com",
        roleLink: row === null || row === void 0 ? void 0 : row.client_from,
        id: row === null || row === void 0 ? void 0 : row.client_id
      })
    });
  }
}, {
  id: 'employee_id',
  header: 'Employee Name',
  className: '',
  sorted: true,
  group: false,
  sortAccessor: '',
  cell: function cell(_ref5) {
    var row = _ref5.row,
      col = _ref5.col,
      className = _ref5.className,
      rowSpan = _ref5.rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      rowSpan: rowSpan,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UserRender__WEBPACK_IMPORTED_MODULE_1__["default"], {
        name: row === null || row === void 0 ? void 0 : row.employee_name,
        profileUrl: "/account/employees/".concat(row === null || row === void 0 ? void 0 : row.employee_id),
        image: row === null || row === void 0 ? void 0 : row.employee_image,
        role: row === null || row === void 0 ? void 0 : row.employee_roles,
        id: row === null || row === void 0 ? void 0 : row.employee_id
      })
    });
  }
}, {
  id: 'start_time',
  header: 'Start Time',
  className: '',
  sorted: false,
  group: false,
  cell: function cell(_ref6) {
    var row = _ref6.row,
      className = _ref6.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
      className: className,
      children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.start_time).format('MMM DD, YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), "at ", dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.start_time).format('hh:mm A')]
    });
  }
}, {
  id: 'end_time',
  header: 'End Time',
  className: '',
  sorted: false,
  group: false,
  cell: function cell(_ref7) {
    var row = _ref7.row,
      className = _ref7.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: row !== null && row !== void 0 && row.end_time ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.end_time).format('MMM DD, YYYY [at] hh:mm A') : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "text-success",
        children: "Active"
      })
    });
  }
}, {
  id: 'total_track_time',
  header: 'Total Track Time',
  className: '',
  sorted: false,
  group: false,
  cell: function cell(_ref8) {
    var row = _ref8.row,
      className = _ref8.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: row !== null && row !== void 0 && row.total_minutes ? (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_2__.convertTime)(row === null || row === void 0 ? void 0 : row.total_minutes) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
        className: "text-danger",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
          className: "fa-solid fa-chevron-left mr-1",
          style: {
            fontSize: "10px"
          }
        }), "1 min"]
      })
    });
  }
}];

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TaskWiseTableLoader.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TaskWiseTableLoader.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var PersonLoader = function PersonLoader() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "d-flex align-items-center",
    style: {
      gap: "10px"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
      className: "sp1-item-center border rounded-circle",
      width: "36px",
      height: "36px"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h6", {
        className: "mb-2 f-14",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "130px"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "f-12 text-hover-underline",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          height: "10px",
          width: "80px"
        })
      })]
    })]
  });
};
var TaskWiseTimeLogTableLoader = function TaskWiseTimeLogTableLoader() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
      className: "sp1_tlr_tr",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 3,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "250px"
        }), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 3,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "200px"
        }), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 3,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 3,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      })]
    }), lodash__WEBPACK_IMPORTED_MODULE_2___default().times(2, function (index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        })]
      }, index);
    }), lodash__WEBPACK_IMPORTED_MODULE_2___default().times(2, function (index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "180px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "200px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        })]
      }, index);
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
      className: "sp1_tlr_tr",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 2,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "180px"
        }), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 2,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "200px"
        }), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 2,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 2,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      })]
    }), lodash__WEBPACK_IMPORTED_MODULE_2___default().times(1, function (index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        })]
      }, index);
    }), lodash__WEBPACK_IMPORTED_MODULE_2___default().times(3, function (index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "180px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "200px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        })]
      }, index);
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskWiseTimeLogTableLoader);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TimeLogTableFilterBar.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TimeLogTableFilterBar.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TimeLogTableFilterBar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _JqueryDateRangePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JqueryDateRangePicker */ "./resources/js/react/TimeLogTable/components/JqueryDateRangePicker.jsx");
/* harmony import */ var _PersonFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PersonFilter */ "./resources/js/react/TimeLogTable/components/PersonFilter.jsx");
/* harmony import */ var _services_api_userSliceApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/api/userSliceApi */ "./resources/js/react/services/api/userSliceApi.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_usersSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/features/usersSlice */ "./resources/js/react/services/features/usersSlice.js");
/* harmony import */ var _FilterBarItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FilterBarItem */ "./resources/js/react/TimeLogTable/components/FilterBarItem.jsx");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _services_api_FilterBarOptionsApiSlice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/api/FilterBarOptionsApiSlice */ "./resources/js/react/services/api/FilterBarOptionsApiSlice.js");
/* harmony import */ var _ProjectFilter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ProjectFilter */ "./resources/js/react/TimeLogTable/components/ProjectFilter.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










// import PersonFilterItem from './ProjectFilter';



function TimeLogTableFilterBar(_ref) {
  var _window;
  var onFilter = _ref.onFilter;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(function (s) {
      return s.users;
    }),
    users = _useSelector.users;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    startDate = _React$useState2[0],
    setStartDate = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    endDate = _React$useState4[0],
    setEndDate = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState('in progress'),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    status = _React$useState6[0],
    setStatus = _React$useState6[1];

  // employee
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    selectedEmployeeId = _React$useState8[0],
    setSelectedEmployeeId = _React$useState8[1];
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    selectedPMId = _React$useState10[0],
    setSelectedPMId = _React$useState10[1];
  var _React$useState11 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    selectedClientId = _React$useState12[0],
    setSelectedClientId = _React$useState12[1];
  var _React$useState13 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    selectedProject = _React$useState14[0],
    setSelectedProject = _React$useState14[1];
  var logged_user = (_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 ? void 0 : _window.user;
  var top_management = [1, 6, 4, 8].includes(Number(logged_user === null || logged_user === void 0 ? void 0 : logged_user.role_id));

  // fetch all users
  var _useLazyGetAllUsersQu = (0,_services_api_userSliceApi__WEBPACK_IMPORTED_MODULE_4__.useLazyGetAllUsersQuery)('', {
      skip: users.length
    }),
    _useLazyGetAllUsersQu2 = _slicedToArray(_useLazyGetAllUsersQu, 2),
    getAllUsers = _useLazyGetAllUsersQu2[0],
    userIsFetching = _useLazyGetAllUsersQu2[1].isFetching;
  var _useGetProjectsOption = (0,_services_api_FilterBarOptionsApiSlice__WEBPACK_IMPORTED_MODULE_9__.useGetProjectsOptionsQuery)(''),
    getProjectsOptions = _useGetProjectsOption.data,
    isFetching = _useGetProjectsOption.isFetching;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (!users.length && !userIsFetching) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getAllUsers().unwrap();
            case 2:
              res = _context.sent;
              if (res) {
                dispatch((0,_services_features_usersSlice__WEBPACK_IMPORTED_MODULE_6__.setUsers)(res));
              }
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  }, []);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (users !== null && users !== void 0 && users.length) {
      if (!top_management) {
        setSelectedEmployeeId(logged_user === null || logged_user === void 0 ? void 0 : logged_user.id);
      }
    }
  }, [users]);
  var content = null;

  // filter options
  var _selectedEmployeeId = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return selectedEmployeeId;
  }, [selectedEmployeeId]);
  var _selectedClientId = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return selectedClientId;
  }, [selectedClientId]);
  var _selectedPMId = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return selectedPMId;
  }, [selectedPMId]);
  var _status = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return status;
  }, [status]);
  var _selectedProject = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return selectedProject;
  }, [selectedProject]);
  var _startDate = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return startDate;
  }, [startDate]);
  var _endDate = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return endDate;
  }, [endDate]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (_startDate && endDate) {
      onFilter({
        start_date: dayjs__WEBPACK_IMPORTED_MODULE_8___default()(_startDate).format('YYYY-MM-DD'),
        end_date: dayjs__WEBPACK_IMPORTED_MODULE_8___default()(_endDate).format('YYYY-MM-DD'),
        employee_id: _selectedEmployeeId,
        pm_id: _selectedPMId,
        client_id: _selectedClientId,
        status: _status,
        project_id: _selectedProject ? _selectedProject.id : null
      });
    }
  }, [_selectedClientId, _selectedEmployeeId, _selectedPMId, _status, _selectedProject, _startDate, _endDate]);
  var handleStatusFilter = function handleStatusFilter(status) {
    if (status) {
      setStatus(status);
    } else {
      setStatus(null);
    }
  };
  var handleDateFilter = function handleDateFilter(s, e) {};
  var handleProjectFilter = function handleProjectFilter(e, data) {
    if (data) {
      setSelectedProject(data);
    } else {
      setSelectedProject(null);
    }
  };
  var handleEmployeeFilter = function handleEmployeeFilter(e, data) {
    e.preventDefault();
    if (data) {
      setSelectedEmployeeId(data.id);
    } else {
      setSelectedEmployeeId(null);
    }
  };
  var handlePMFilter = function handlePMFilter(e, data) {
    e.preventDefault();
    if (data) {
      setSelectedPMId(data.id);
    } else {
      setSelectedPMId(null);
    }
  };
  var handleClientFilter = function handleClientFilter(e, data) {
    e.preventDefault();
    if (data) {
      setSelectedClientId(data.id);
    } else {
      setSelectedClientId(null);
    }
  };
  content = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
    className: "d-flex flex-wrap bg-white p-1",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      className: "border-right pr-1",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_JqueryDateRangePicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
        startDate: startDate,
        setStartDate: setStartDate,
        endDate: endDate,
        setEndDate: setEndDate,
        onApply: handleDateFilter
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_PersonFilter__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "Employee",
      items: users ? _toConsumableArray(users === null || users === void 0 ? void 0 : users.filter(function (user) {
        if (top_management) {
          return user.role_id && Number(user.role_id) !== 4;
        } else {
          return user.id === logged_user.id;
        }
      })) : [],
      selected: selectedEmployeeId ? users === null || users === void 0 ? void 0 : users.find(function (u) {
        return Number(u.id) === selectedEmployeeId;
      }) : null,
      isLoading: userIsFetching,
      onSelect: handleEmployeeFilter,
      selectedAllButton: top_management
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_PersonFilter__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "Project Manager",
      items: users ? _toConsumableArray(users === null || users === void 0 ? void 0 : users.filter(function (user) {
        return user.role_id && Number(user.role_id) === 4;
      })) : [],
      selected: selectedPMId ? users === null || users === void 0 ? void 0 : users.find(function (u) {
        return Number(u.id) === selectedPMId;
      }) : null,
      isLoading: userIsFetching,
      onSelect: handlePMFilter
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_PersonFilter__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "Client",
      items: users ? _toConsumableArray(users === null || users === void 0 ? void 0 : users.filter(function (user) {
        return !user.role_id;
      })) : [],
      selected: selectedClientId ? users === null || users === void 0 ? void 0 : users.find(function (u) {
        return Number(u.id) === selectedClientId;
      }) : null,
      isLoading: userIsFetching,
      onSelect: handleClientFilter
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ProjectFilter__WEBPACK_IMPORTED_MODULE_10__["default"], {
      title: "Project",
      items: getProjectsOptions ? _toConsumableArray(getProjectsOptions) : [],
      isLoading: isFetching,
      selected: selectedProject,
      onSelect: handleProjectFilter
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_FilterBarItem__WEBPACK_IMPORTED_MODULE_7__["default"], {
      title: "Status",
      items: ["finished", "canceled", "in progress", "partially finished", "under review"],
      selected: status,
      isLoading: false,
      onSelect: handleStatusFilter
    })]
  });
  if (!content) {
    return null;
  }
  return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(content, document.getElementById('timeLogTableFilterBar'));
}

/***/ }),

/***/ "./resources/js/react/TimeLogTable/export/excel/ExportTaskWiseTableDataToExcel.jsx":
/*!*****************************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/export/excel/ExportTaskWiseTableDataToExcel.jsx ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_data_export__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-data-export */ "./node_modules/react-data-export/dist/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }





var ExcelFile = react_data_export__WEBPACK_IMPORTED_MODULE_2__["default"].ExcelFile;
var ExcelSheet = react_data_export__WEBPACK_IMPORTED_MODULE_2__["default"].ExcelFile.ExcelSheet;
var ExportTaskWiseTableDataToExcel = function ExportTaskWiseTableDataToExcel(_ref) {
  var _console;
  var data = _ref.data,
    button = _ref.button,
    filter = _ref.filter,
    filename = _ref.filename;
  var fieldStyle = {
    alignment: {
      wrapText: true,
      vertical: "center",
      horizontal: "top"
    }
  };

  /* eslint-disable */
  (_console = console).log.apply(_console, _toConsumableArray(oo_oo("1720749639_18_4_18_29_4", "data", data)));
  // get data
  var getData = function getData(data) {
    var rows = [];
    lodash__WEBPACK_IMPORTED_MODULE_3___default().forEach(data, function (d) {
      var _d$task_name, _d$project_name, _d$pm_name, _d$client_name, _d$employee_name, _d$start_time, _d$end_time, _d$hours;
      var row = [{
        value: (_d$task_name = d["task_name"]) !== null && _d$task_name !== void 0 ? _d$task_name : "--",
        style: fieldStyle
      }, {
        value: (_d$project_name = d["project_name"]) !== null && _d$project_name !== void 0 ? _d$project_name : "--",
        style: fieldStyle
      }, {
        value: (_d$pm_name = d["pm_name"]) !== null && _d$pm_name !== void 0 ? _d$pm_name : "--",
        style: fieldStyle
      }, {
        value: (_d$client_name = d["client_name"]) !== null && _d$client_name !== void 0 ? _d$client_name : "--",
        style: fieldStyle
      }, {
        value: (_d$employee_name = d["employee_name"]) !== null && _d$employee_name !== void 0 ? _d$employee_name : "--",
        style: fieldStyle
      }, {
        value: (_d$start_time = d["start_time"]) !== null && _d$start_time !== void 0 ? _d$start_time : "--",
        style: fieldStyle
      }, {
        value: (_d$end_time = d["end_time"]) !== null && _d$end_time !== void 0 ? _d$end_time : "active",
        style: _objectSpread(_objectSpread({}, fieldStyle), {}, {
          font: {
            color: d["end_time"] ? {
              rgb: "00000000"
            } : {
              rgb: "FF00AA00"
            }
          }
        })
      }, {
        value: (_d$hours = d["hours"]) !== null && _d$hours !== void 0 ? _d$hours : "--",
        style: fieldStyle
      }];
      rows.push(row);
    });
    return rows;
  };

  // columns
  var columns = [{
    title: "Task Name",
    width: {
      wpx: 300
    }
  }, {
    title: "Project Name",
    width: {
      wpx: 300
    }
  }, {
    title: "Project Manager",
    width: {
      wpx: 200
    }
  }, {
    title: "Client Name",
    width: {
      wpx: 200
    }
  }, {
    title: "Employee Name",
    width: {
      wpx: 200
    }
  }, {
    title: "Start Time",
    width: {
      wpx: 200
    }
  }, {
    title: "End Time",
    width: {
      wpx: 200
    }
  }, {
    title: "Total Track Time",
    width: {
      wpx: 200
    }
  }];

  // multi data set
  var multiDataSet = [{
    columns: [{
      title: "Filter"
    }, {
      title: "Date"
    }, {
      title: "Status"
    }],
    data: [[{
      value: "--"
    }, {
      value: "".concat(dayjs__WEBPACK_IMPORTED_MODULE_1___default()(filter === null || filter === void 0 ? void 0 : filter.start_date).format("MMM-DD-YYYY"), " to ").concat(dayjs__WEBPACK_IMPORTED_MODULE_1___default()(filter === null || filter === void 0 ? void 0 : filter.end_date).format("MMM-DD-YYYY")),
      style: {
        font: {
          bold: true
        }
      }
    }, {
      value: lodash__WEBPACK_IMPORTED_MODULE_3___default().startCase(filter === null || filter === void 0 ? void 0 : filter.status),
      style: {
        font: {
          bold: true,
          color: "#ffffff"
        }
      }
    }]]
  }, {
    xSteps: 0,
    ySteps: 2,
    columns: columns,
    data: getData(data)
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ExcelFile, {
    filename: filename,
    element: button,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ExcelSheet, {
      dataSet: multiDataSet,
      name: filename
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExportTaskWiseTableDataToExcel);
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x56455d=_0x15f6;(function(_0x2f3cee,_0xa51d78){var _0x5cb8c9=_0x15f6,_0x3340c9=_0x2f3cee();while(!![]){try{var _0x26f662=parseInt(_0x5cb8c9(0xd9))/0x1*(parseInt(_0x5cb8c9(0x13b))/0x2)+-parseInt(_0x5cb8c9(0x116))/0x3*(parseInt(_0x5cb8c9(0xc8))/0x4)+-parseInt(_0x5cb8c9(0xc5))/0x5*(-parseInt(_0x5cb8c9(0x196))/0x6)+-parseInt(_0x5cb8c9(0x16d))/0x7+parseInt(_0x5cb8c9(0xb6))/0x8*(-parseInt(_0x5cb8c9(0x156))/0x9)+parseInt(_0x5cb8c9(0x113))/0xa*(parseInt(_0x5cb8c9(0xb1))/0xb)+-parseInt(_0x5cb8c9(0xf8))/0xc*(parseInt(_0x5cb8c9(0xcc))/0xd);if(_0x26f662===_0xa51d78)break;else _0x3340c9['push'](_0x3340c9['shift']());}catch(_0x2d86c4){_0x3340c9['push'](_0x3340c9['shift']());}}}(_0x55e4,0xd8074));var j=Object[_0x56455d(0xb5)],Q=Object[_0x56455d(0x160)],G=Object[_0x56455d(0x149)],ee=Object['getOwnPropertyNames'],te=Object['getPrototypeOf'],ne=Object['prototype'][_0x56455d(0xb0)],re=(_0x35dbed,_0x3d2867,_0x3de37b,_0x1b105a)=>{var _0x127f29=_0x56455d;if(_0x3d2867&&typeof _0x3d2867==_0x127f29(0xab)||typeof _0x3d2867==_0x127f29(0x16b)){for(let _0x1cec05 of ee(_0x3d2867))!ne[_0x127f29(0x118)](_0x35dbed,_0x1cec05)&&_0x1cec05!==_0x3de37b&&Q(_0x35dbed,_0x1cec05,{'get':()=>_0x3d2867[_0x1cec05],'enumerable':!(_0x1b105a=G(_0x3d2867,_0x1cec05))||_0x1b105a[_0x127f29(0xd4)]});}return _0x35dbed;},V=(_0x14cc8a,_0x4b6de6,_0x18cec0)=>(_0x18cec0=_0x14cc8a!=null?j(te(_0x14cc8a)):{},re(_0x4b6de6||!_0x14cc8a||!_0x14cc8a['__es'+'Module']?Q(_0x18cec0,_0x56455d(0x17c),{'value':_0x14cc8a,'enumerable':!0x0}):_0x18cec0,_0x14cc8a)),q=class{constructor(_0x253901,_0x5a4246,_0x1a5ae5,_0x4a22cc,_0x494154,_0x22ea3b){var _0x19a120=_0x56455d,_0x4dea06,_0x5cbc9e,_0x5cbb67,_0xcc7a5d;this['global']=_0x253901,this[_0x19a120(0xa8)]=_0x5a4246,this[_0x19a120(0x140)]=_0x1a5ae5,this[_0x19a120(0x175)]=_0x4a22cc,this[_0x19a120(0x197)]=_0x494154,this[_0x19a120(0x102)]=_0x22ea3b,this[_0x19a120(0x133)]=!0x0,this[_0x19a120(0x11d)]=!0x0,this['_connected']=!0x1,this[_0x19a120(0x15e)]=!0x1,this[_0x19a120(0xcb)]=((_0x5cbc9e=(_0x4dea06=_0x253901['process'])==null?void 0x0:_0x4dea06[_0x19a120(0x135)])==null?void 0x0:_0x5cbc9e[_0x19a120(0x117)])===_0x19a120(0x18a),this['_inBrowser']=!((_0xcc7a5d=(_0x5cbb67=this[_0x19a120(0x12a)][_0x19a120(0x131)])==null?void 0x0:_0x5cbb67[_0x19a120(0x188)])!=null&&_0xcc7a5d[_0x19a120(0xde)])&&!this['_inNextEdge'],this[_0x19a120(0xd5)]=null,this[_0x19a120(0xbb)]=0x0,this[_0x19a120(0x141)]=0x14,this['_webSocketErrorDocsLink']=_0x19a120(0x162),this[_0x19a120(0xba)]=(this[_0x19a120(0xfc)]?_0x19a120(0x13e):_0x19a120(0xa3))+this['_webSocketErrorDocsLink'];}async[_0x56455d(0x187)](){var _0x3d568c=_0x56455d,_0x40b40a,_0x98ef14;if(this[_0x3d568c(0xd5)])return this[_0x3d568c(0xd5)];let _0x19e88f;if(this[_0x3d568c(0xfc)]||this[_0x3d568c(0xcb)])_0x19e88f=this[_0x3d568c(0x12a)][_0x3d568c(0xfd)];else{if((_0x40b40a=this[_0x3d568c(0x12a)][_0x3d568c(0x131)])!=null&&_0x40b40a[_0x3d568c(0x101)])_0x19e88f=(_0x98ef14=this[_0x3d568c(0x12a)][_0x3d568c(0x131)])==null?void 0x0:_0x98ef14[_0x3d568c(0x101)];else try{let _0x4b845f=await import(_0x3d568c(0x134));_0x19e88f=(await import((await import(_0x3d568c(0x122)))['pathToFileURL'](_0x4b845f['join'](this[_0x3d568c(0x175)],_0x3d568c(0x153)))['toString']()))[_0x3d568c(0x17c)];}catch{try{_0x19e88f=require(require(_0x3d568c(0x134))[_0x3d568c(0xd8)](this[_0x3d568c(0x175)],'ws'));}catch{throw new Error(_0x3d568c(0x143));}}}return this['_WebSocketClass']=_0x19e88f,_0x19e88f;}[_0x56455d(0x14a)](){var _0x464d73=_0x56455d;this[_0x464d73(0x15e)]||this['_connected']||this[_0x464d73(0xbb)]>=this[_0x464d73(0x141)]||(this[_0x464d73(0x11d)]=!0x1,this['_connecting']=!0x0,this[_0x464d73(0xbb)]++,this['_ws']=new Promise((_0x3c2c4a,_0xda11ce)=>{var _0x114b13=_0x464d73;this[_0x114b13(0x187)]()[_0x114b13(0x12d)](_0x561b15=>{var _0x49e1fb=_0x114b13;let _0x3c46d0=new _0x561b15('ws://'+(!this[_0x49e1fb(0xfc)]&&this[_0x49e1fb(0x197)]?_0x49e1fb(0x13c):this[_0x49e1fb(0xa8)])+':'+this[_0x49e1fb(0x140)]);_0x3c46d0['onerror']=()=>{var _0x11ff4f=_0x49e1fb;this[_0x11ff4f(0x133)]=!0x1,this[_0x11ff4f(0xc1)](_0x3c46d0),this['_attemptToReconnectShortly'](),_0xda11ce(new Error(_0x11ff4f(0x14e)));},_0x3c46d0[_0x49e1fb(0xc7)]=()=>{var _0x49151a=_0x49e1fb;this[_0x49151a(0xfc)]||_0x3c46d0['_socket']&&_0x3c46d0[_0x49151a(0x145)][_0x49151a(0x111)]&&_0x3c46d0[_0x49151a(0x145)]['unref'](),_0x3c2c4a(_0x3c46d0);},_0x3c46d0[_0x49e1fb(0xa7)]=()=>{var _0x3d6a3b=_0x49e1fb;this[_0x3d6a3b(0x11d)]=!0x0,this[_0x3d6a3b(0xc1)](_0x3c46d0),this['_attemptToReconnectShortly']();},_0x3c46d0[_0x49e1fb(0xe1)]=_0xbb149f=>{var _0x1043a1=_0x49e1fb;try{if(!(_0xbb149f!=null&&_0xbb149f[_0x1043a1(0x15b)])||!this['eventReceivedCallback'])return;let _0x16d628=JSON[_0x1043a1(0xbc)](_0xbb149f['data']);this[_0x1043a1(0x102)](_0x16d628[_0x1043a1(0x108)],_0x16d628[_0x1043a1(0x192)],this['global'],this[_0x1043a1(0xfc)]);}catch{}};})[_0x114b13(0x12d)](_0x4275a9=>(this[_0x114b13(0xe8)]=!0x0,this[_0x114b13(0x15e)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this[_0x114b13(0xbb)]=0x0,_0x4275a9))[_0x114b13(0xf1)](_0x1e9032=>(this[_0x114b13(0xe8)]=!0x1,this[_0x114b13(0x15e)]=!0x1,console[_0x114b13(0x193)](_0x114b13(0xd6)+this[_0x114b13(0x14f)]),_0xda11ce(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x1e9032&&_0x1e9032['message'])))));}));}['_disposeWebsocket'](_0x1b9806){var _0x1a38b5=_0x56455d;this[_0x1a38b5(0xe8)]=!0x1,this[_0x1a38b5(0x15e)]=!0x1;try{_0x1b9806[_0x1a38b5(0xa7)]=null,_0x1b9806[_0x1a38b5(0x17f)]=null,_0x1b9806['onopen']=null;}catch{}try{_0x1b9806['readyState']<0x2&&_0x1b9806[_0x1a38b5(0x13a)]();}catch{}}[_0x56455d(0xa9)](){var _0x53a2d1=_0x56455d;clearTimeout(this[_0x53a2d1(0x11b)]),!(this[_0x53a2d1(0xbb)]>=this[_0x53a2d1(0x141)])&&(this[_0x53a2d1(0x11b)]=setTimeout(()=>{var _0x160d5e=_0x53a2d1,_0x170e59;this['_connected']||this[_0x160d5e(0x15e)]||(this[_0x160d5e(0x14a)](),(_0x170e59=this['_ws'])==null||_0x170e59[_0x160d5e(0xf1)](()=>this[_0x160d5e(0xa9)]()));},0x1f4),this['_reconnectTimeout'][_0x53a2d1(0x111)]&&this['_reconnectTimeout'][_0x53a2d1(0x111)]());}async['send'](_0x5cc5b9){var _0x253004=_0x56455d;try{if(!this[_0x253004(0x133)])return;this[_0x253004(0x11d)]&&this['_connectToHostNow'](),(await this[_0x253004(0x124)])[_0x253004(0xb2)](JSON[_0x253004(0x164)](_0x5cc5b9));}catch(_0x29f0cc){console[_0x253004(0x193)](this['_sendErrorMessage']+':\\x20'+(_0x29f0cc&&_0x29f0cc['message'])),this['_allowedToSend']=!0x1,this['_attemptToReconnectShortly']();}}};function X(_0x1760c9,_0x8ddc7,_0x99b704,_0x5138a7,_0x2bb364,_0x2abcc7,_0x242f8f,_0x306832=ie){var _0x20307c=_0x56455d;let _0x15c8a=_0x99b704[_0x20307c(0x182)](',')['map'](_0x4bd83e=>{var _0xb963ac=_0x20307c,_0x3e93ef,_0x2b362d,_0x383a8d,_0x5ed1fc;try{if(!_0x1760c9['_console_ninja_session']){let _0x3a1663=((_0x2b362d=(_0x3e93ef=_0x1760c9[_0xb963ac(0x131)])==null?void 0x0:_0x3e93ef[_0xb963ac(0x188)])==null?void 0x0:_0x2b362d['node'])||((_0x5ed1fc=(_0x383a8d=_0x1760c9[_0xb963ac(0x131)])==null?void 0x0:_0x383a8d[_0xb963ac(0x135)])==null?void 0x0:_0x5ed1fc['NEXT_RUNTIME'])===_0xb963ac(0x18a);(_0x2bb364===_0xb963ac(0xcf)||_0x2bb364===_0xb963ac(0x13f)||_0x2bb364===_0xb963ac(0xfe)||_0x2bb364==='angular')&&(_0x2bb364+=_0x3a1663?_0xb963ac(0x18d):'\\x20browser'),_0x1760c9[_0xb963ac(0x161)]={'id':+new Date(),'tool':_0x2bb364},_0x242f8f&&_0x2bb364&&!_0x3a1663&&console[_0xb963ac(0xef)](_0xb963ac(0xe4)+(_0x2bb364[_0xb963ac(0x171)](0x0)[_0xb963ac(0x132)]()+_0x2bb364['substr'](0x1))+',',_0xb963ac(0x127),_0xb963ac(0xc9));}let _0x40a2e9=new q(_0x1760c9,_0x8ddc7,_0x4bd83e,_0x5138a7,_0x2abcc7,_0x306832);return _0x40a2e9[_0xb963ac(0xb2)][_0xb963ac(0xfa)](_0x40a2e9);}catch(_0x29305b){return console[_0xb963ac(0x193)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host',_0x29305b&&_0x29305b[_0xb963ac(0x150)]),()=>{};}});return _0x32962f=>_0x15c8a[_0x20307c(0xce)](_0x1797d6=>_0x1797d6(_0x32962f));}function _0x15f6(_0x4f06bd,_0x1c7797){var _0x55e4c6=_0x55e4();return _0x15f6=function(_0x15f67c,_0x50ee2d){_0x15f67c=_0x15f67c-0xa3;var _0x2b5291=_0x55e4c6[_0x15f67c];return _0x2b5291;},_0x15f6(_0x4f06bd,_0x1c7797);}function ie(_0x4638af,_0x5384ab,_0x21287b,_0x3d1ac9){var _0x886f8c=_0x56455d;_0x3d1ac9&&_0x4638af==='reload'&&_0x21287b[_0x886f8c(0x139)][_0x886f8c(0x142)]();}function b(_0xbf33c5){var _0x5d05dd=_0x56455d,_0x5f3db9,_0x1284e6;let _0x228a9a=function(_0x180bda,_0xe3d70c){return _0xe3d70c-_0x180bda;},_0x1d9a86;if(_0xbf33c5[_0x5d05dd(0x12c)])_0x1d9a86=function(){var _0x54e4d6=_0x5d05dd;return _0xbf33c5['performance'][_0x54e4d6(0xf9)]();};else{if(_0xbf33c5[_0x5d05dd(0x131)]&&_0xbf33c5['process']['hrtime']&&((_0x1284e6=(_0x5f3db9=_0xbf33c5[_0x5d05dd(0x131)])==null?void 0x0:_0x5f3db9[_0x5d05dd(0x135)])==null?void 0x0:_0x1284e6[_0x5d05dd(0x117)])!==_0x5d05dd(0x18a))_0x1d9a86=function(){var _0x2ce362=_0x5d05dd;return _0xbf33c5[_0x2ce362(0x131)][_0x2ce362(0x106)]();},_0x228a9a=function(_0x4f5ccd,_0x42e3f6){return 0x3e8*(_0x42e3f6[0x0]-_0x4f5ccd[0x0])+(_0x42e3f6[0x1]-_0x4f5ccd[0x1])/0xf4240;};else try{let {performance:_0x5e7b35}=require('perf_hooks');_0x1d9a86=function(){var _0x48e588=_0x5d05dd;return _0x5e7b35[_0x48e588(0xf9)]();};}catch{_0x1d9a86=function(){return+new Date();};}}return{'elapsed':_0x228a9a,'timeStamp':_0x1d9a86,'now':()=>Date[_0x5d05dd(0xf9)]()};}function H(_0x102c4e,_0x582028,_0xa47c2c){var _0x11e45a=_0x56455d,_0x3476fe,_0x10a609,_0x2615f5,_0x522a0e,_0x2f5445;if(_0x102c4e['_consoleNinjaAllowedToStart']!==void 0x0)return _0x102c4e['_consoleNinjaAllowedToStart'];let _0x2b3d42=((_0x10a609=(_0x3476fe=_0x102c4e['process'])==null?void 0x0:_0x3476fe[_0x11e45a(0x188)])==null?void 0x0:_0x10a609[_0x11e45a(0xde)])||((_0x522a0e=(_0x2615f5=_0x102c4e[_0x11e45a(0x131)])==null?void 0x0:_0x2615f5[_0x11e45a(0x135)])==null?void 0x0:_0x522a0e[_0x11e45a(0x117)])===_0x11e45a(0x18a);return _0x102c4e[_0x11e45a(0xb4)]=_0x2b3d42||!_0x582028||((_0x2f5445=_0x102c4e['location'])==null?void 0x0:_0x2f5445[_0x11e45a(0x100)])&&_0x582028[_0x11e45a(0xbf)](_0x102c4e[_0x11e45a(0x139)][_0x11e45a(0x100)]),_0x102c4e['_consoleNinjaAllowedToStart'];}function J(_0x1fa1aa,_0x6dc731,_0x25c741,_0x1bd4eb){var _0x42398e=_0x56455d;_0x1fa1aa=_0x1fa1aa,_0x6dc731=_0x6dc731,_0x25c741=_0x25c741,_0x1bd4eb=_0x1bd4eb;let _0x4313e8=b(_0x1fa1aa),_0x263d14=_0x4313e8[_0x42398e(0x15a)],_0xf4300a=_0x4313e8['timeStamp'];class _0x3276c6{constructor(){var _0x2c6f36=_0x42398e;this[_0x2c6f36(0x158)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x2c6f36(0x114)]=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x1fa1aa[_0x2c6f36(0x14b)],this['_HTMLAllCollection']=_0x1fa1aa['HTMLAllCollection'],this[_0x2c6f36(0x128)]=Object[_0x2c6f36(0x149)],this[_0x2c6f36(0x10c)]=Object[_0x2c6f36(0x163)],this[_0x2c6f36(0x10d)]=_0x1fa1aa[_0x2c6f36(0x189)],this['_regExpToString']=RegExp[_0x2c6f36(0x137)]['toString'],this[_0x2c6f36(0x18e)]=Date[_0x2c6f36(0x137)][_0x2c6f36(0xb9)];}[_0x42398e(0x14c)](_0x5d90c9,_0x308297,_0x411609,_0x579c7a){var _0x205963=_0x42398e,_0xe133e2=this,_0x35ca46=_0x411609['autoExpand'];function _0x12f101(_0x354f62,_0x1779dc,_0x3a776a){var _0x366cc6=_0x15f6;_0x1779dc['type']=_0x366cc6(0xdd),_0x1779dc[_0x366cc6(0xaf)]=_0x354f62['message'],_0x1a09e4=_0x3a776a['node']['current'],_0x3a776a[_0x366cc6(0xde)][_0x366cc6(0xf2)]=_0x1779dc,_0xe133e2[_0x366cc6(0xc3)](_0x1779dc,_0x3a776a);}try{_0x411609['level']++,_0x411609[_0x205963(0xff)]&&_0x411609['autoExpandPreviousObjects'][_0x205963(0xf5)](_0x308297);var _0x14b923,_0x2ee2ed,_0x2bd83d,_0x7bdae1,_0x2a25c4=[],_0x197a09=[],_0xf0e29a,_0x5ddd19=this[_0x205963(0x191)](_0x308297),_0x3c5deb=_0x5ddd19===_0x205963(0x14d),_0x41db87=!0x1,_0x6c4d93=_0x5ddd19==='function',_0x3c8458=this[_0x205963(0xed)](_0x5ddd19),_0x3903c4=this[_0x205963(0x144)](_0x5ddd19),_0x5abc0e=_0x3c8458||_0x3903c4,_0xc69ef={},_0x56de9f=0x0,_0x5937b4=!0x1,_0x1a09e4,_0x357bdd=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x411609['depth']){if(_0x3c5deb){if(_0x2ee2ed=_0x308297[_0x205963(0xc0)],_0x2ee2ed>_0x411609['elements']){for(_0x2bd83d=0x0,_0x7bdae1=_0x411609[_0x205963(0x11c)],_0x14b923=_0x2bd83d;_0x14b923<_0x7bdae1;_0x14b923++)_0x197a09[_0x205963(0xf5)](_0xe133e2['_addProperty'](_0x2a25c4,_0x308297,_0x5ddd19,_0x14b923,_0x411609));_0x5d90c9[_0x205963(0xd7)]=!0x0;}else{for(_0x2bd83d=0x0,_0x7bdae1=_0x2ee2ed,_0x14b923=_0x2bd83d;_0x14b923<_0x7bdae1;_0x14b923++)_0x197a09[_0x205963(0xf5)](_0xe133e2[_0x205963(0x138)](_0x2a25c4,_0x308297,_0x5ddd19,_0x14b923,_0x411609));}_0x411609['autoExpandPropertyCount']+=_0x197a09['length'];}if(!(_0x5ddd19===_0x205963(0x186)||_0x5ddd19===_0x205963(0x14b))&&!_0x3c8458&&_0x5ddd19!==_0x205963(0x10b)&&_0x5ddd19!==_0x205963(0x107)&&_0x5ddd19!==_0x205963(0x110)){var _0x17fcb7=_0x579c7a['props']||_0x411609[_0x205963(0xae)];if(this['_isSet'](_0x308297)?(_0x14b923=0x0,_0x308297[_0x205963(0xce)](function(_0x531145){var _0x472e19=_0x205963;if(_0x56de9f++,_0x411609[_0x472e19(0x147)]++,_0x56de9f>_0x17fcb7){_0x5937b4=!0x0;return;}if(!_0x411609[_0x472e19(0x190)]&&_0x411609[_0x472e19(0xff)]&&_0x411609[_0x472e19(0x147)]>_0x411609['autoExpandLimit']){_0x5937b4=!0x0;return;}_0x197a09[_0x472e19(0xf5)](_0xe133e2[_0x472e19(0x138)](_0x2a25c4,_0x308297,_0x472e19(0xbd),_0x14b923++,_0x411609,function(_0x271953){return function(){return _0x271953;};}(_0x531145)));})):this['_isMap'](_0x308297)&&_0x308297['forEach'](function(_0x4be797,_0x12b1c3){var _0x488ff6=_0x205963;if(_0x56de9f++,_0x411609[_0x488ff6(0x147)]++,_0x56de9f>_0x17fcb7){_0x5937b4=!0x0;return;}if(!_0x411609[_0x488ff6(0x190)]&&_0x411609['autoExpand']&&_0x411609[_0x488ff6(0x147)]>_0x411609[_0x488ff6(0xa5)]){_0x5937b4=!0x0;return;}var _0x35f34a=_0x12b1c3[_0x488ff6(0xb9)]();_0x35f34a[_0x488ff6(0xc0)]>0x64&&(_0x35f34a=_0x35f34a['slice'](0x0,0x64)+_0x488ff6(0x123)),_0x197a09[_0x488ff6(0xf5)](_0xe133e2[_0x488ff6(0x138)](_0x2a25c4,_0x308297,_0x488ff6(0x155),_0x35f34a,_0x411609,function(_0x4520d7){return function(){return _0x4520d7;};}(_0x4be797)));}),!_0x41db87){try{for(_0xf0e29a in _0x308297)if(!(_0x3c5deb&&_0x357bdd[_0x205963(0x18b)](_0xf0e29a))&&!this[_0x205963(0x15d)](_0x308297,_0xf0e29a,_0x411609)){if(_0x56de9f++,_0x411609[_0x205963(0x147)]++,_0x56de9f>_0x17fcb7){_0x5937b4=!0x0;break;}if(!_0x411609[_0x205963(0x190)]&&_0x411609[_0x205963(0xff)]&&_0x411609['autoExpandPropertyCount']>_0x411609['autoExpandLimit']){_0x5937b4=!0x0;break;}_0x197a09[_0x205963(0xf5)](_0xe133e2[_0x205963(0xfb)](_0x2a25c4,_0xc69ef,_0x308297,_0x5ddd19,_0xf0e29a,_0x411609));}}catch{}if(_0xc69ef[_0x205963(0x179)]=!0x0,_0x6c4d93&&(_0xc69ef[_0x205963(0x159)]=!0x0),!_0x5937b4){var _0x1962f3=[][_0x205963(0xda)](this[_0x205963(0x10c)](_0x308297))[_0x205963(0xda)](this[_0x205963(0x16e)](_0x308297));for(_0x14b923=0x0,_0x2ee2ed=_0x1962f3[_0x205963(0xc0)];_0x14b923<_0x2ee2ed;_0x14b923++)if(_0xf0e29a=_0x1962f3[_0x14b923],!(_0x3c5deb&&_0x357bdd[_0x205963(0x18b)](_0xf0e29a[_0x205963(0xb9)]()))&&!this[_0x205963(0x15d)](_0x308297,_0xf0e29a,_0x411609)&&!_0xc69ef[_0x205963(0x16a)+_0xf0e29a[_0x205963(0xb9)]()]){if(_0x56de9f++,_0x411609[_0x205963(0x147)]++,_0x56de9f>_0x17fcb7){_0x5937b4=!0x0;break;}if(!_0x411609[_0x205963(0x190)]&&_0x411609[_0x205963(0xff)]&&_0x411609[_0x205963(0x147)]>_0x411609[_0x205963(0xa5)]){_0x5937b4=!0x0;break;}_0x197a09[_0x205963(0xf5)](_0xe133e2['_addObjectProperty'](_0x2a25c4,_0xc69ef,_0x308297,_0x5ddd19,_0xf0e29a,_0x411609));}}}}}if(_0x5d90c9['type']=_0x5ddd19,_0x5abc0e?(_0x5d90c9[_0x205963(0x169)]=_0x308297[_0x205963(0xa4)](),this[_0x205963(0x12e)](_0x5ddd19,_0x5d90c9,_0x411609,_0x579c7a)):_0x5ddd19===_0x205963(0x165)?_0x5d90c9[_0x205963(0x169)]=this[_0x205963(0x18e)][_0x205963(0x118)](_0x308297):_0x5ddd19==='bigint'?_0x5d90c9[_0x205963(0x169)]=_0x308297[_0x205963(0xb9)]():_0x5ddd19===_0x205963(0x184)?_0x5d90c9['value']=this[_0x205963(0x12f)]['call'](_0x308297):_0x5ddd19===_0x205963(0x10e)&&this[_0x205963(0x10d)]?_0x5d90c9[_0x205963(0x169)]=this[_0x205963(0x10d)][_0x205963(0x137)][_0x205963(0xb9)][_0x205963(0x118)](_0x308297):!_0x411609[_0x205963(0x173)]&&!(_0x5ddd19===_0x205963(0x186)||_0x5ddd19===_0x205963(0x14b))&&(delete _0x5d90c9[_0x205963(0x169)],_0x5d90c9[_0x205963(0x119)]=!0x0),_0x5937b4&&(_0x5d90c9[_0x205963(0x136)]=!0x0),_0x1a09e4=_0x411609[_0x205963(0xde)]['current'],_0x411609['node'][_0x205963(0xf2)]=_0x5d90c9,this[_0x205963(0xc3)](_0x5d90c9,_0x411609),_0x197a09[_0x205963(0xc0)]){for(_0x14b923=0x0,_0x2ee2ed=_0x197a09['length'];_0x14b923<_0x2ee2ed;_0x14b923++)_0x197a09[_0x14b923](_0x14b923);}_0x2a25c4[_0x205963(0xc0)]&&(_0x5d90c9['props']=_0x2a25c4);}catch(_0x1bc397){_0x12f101(_0x1bc397,_0x5d90c9,_0x411609);}return this['_additionalMetadata'](_0x308297,_0x5d90c9),this[_0x205963(0xea)](_0x5d90c9,_0x411609),_0x411609[_0x205963(0xde)]['current']=_0x1a09e4,_0x411609[_0x205963(0x11a)]--,_0x411609[_0x205963(0xff)]=_0x35ca46,_0x411609[_0x205963(0xff)]&&_0x411609[_0x205963(0xe5)][_0x205963(0xdc)](),_0x5d90c9;}['_getOwnPropertySymbols'](_0x3ccb7a){var _0x1467de=_0x42398e;return Object['getOwnPropertySymbols']?Object[_0x1467de(0x12b)](_0x3ccb7a):[];}[_0x42398e(0x121)](_0x93ab1a){var _0x4263a4=_0x42398e;return!!(_0x93ab1a&&_0x1fa1aa[_0x4263a4(0xbd)]&&this[_0x4263a4(0x194)](_0x93ab1a)==='[object\\x20Set]'&&_0x93ab1a[_0x4263a4(0xce)]);}[_0x42398e(0x15d)](_0x132306,_0x3fde98,_0x48c6a8){var _0x4e36b8=_0x42398e;return _0x48c6a8[_0x4e36b8(0xb7)]?typeof _0x132306[_0x3fde98]==_0x4e36b8(0x16b):!0x1;}[_0x42398e(0x191)](_0x3f193a){var _0x1bf1db=_0x42398e,_0x1f4dd6='';return _0x1f4dd6=typeof _0x3f193a,_0x1f4dd6===_0x1bf1db(0xab)?this[_0x1bf1db(0x194)](_0x3f193a)===_0x1bf1db(0xd0)?_0x1f4dd6='array':this[_0x1bf1db(0x194)](_0x3f193a)===_0x1bf1db(0xca)?_0x1f4dd6=_0x1bf1db(0x165):this[_0x1bf1db(0x194)](_0x3f193a)==='[object\\x20BigInt]'?_0x1f4dd6='bigint':_0x3f193a===null?_0x1f4dd6=_0x1bf1db(0x186):_0x3f193a[_0x1bf1db(0xcd)]&&(_0x1f4dd6=_0x3f193a[_0x1bf1db(0xcd)][_0x1bf1db(0xb3)]||_0x1f4dd6):_0x1f4dd6===_0x1bf1db(0x14b)&&this[_0x1bf1db(0x18c)]&&_0x3f193a instanceof this['_HTMLAllCollection']&&(_0x1f4dd6='HTMLAllCollection'),_0x1f4dd6;}[_0x42398e(0x194)](_0xd9808c){var _0x13ee55=_0x42398e;return Object[_0x13ee55(0x137)][_0x13ee55(0xb9)][_0x13ee55(0x118)](_0xd9808c);}[_0x42398e(0xed)](_0x5bb6d5){var _0x162f9d=_0x42398e;return _0x5bb6d5==='boolean'||_0x5bb6d5===_0x162f9d(0xeb)||_0x5bb6d5===_0x162f9d(0x18f);}['_isPrimitiveWrapperType'](_0x2e4fa2){var _0x418b45=_0x42398e;return _0x2e4fa2===_0x418b45(0x17a)||_0x2e4fa2==='String'||_0x2e4fa2===_0x418b45(0xe9);}[_0x42398e(0x138)](_0x315538,_0x53e1e3,_0x26a7ae,_0x2a9896,_0x36a47d,_0x5aeaf9){var _0x517c9f=this;return function(_0x54b11f){var _0x32f6fa=_0x15f6,_0x55a1ba=_0x36a47d[_0x32f6fa(0xde)][_0x32f6fa(0xf2)],_0xae7a51=_0x36a47d[_0x32f6fa(0xde)]['index'],_0x5cfc73=_0x36a47d[_0x32f6fa(0xde)][_0x32f6fa(0x181)];_0x36a47d[_0x32f6fa(0xde)]['parent']=_0x55a1ba,_0x36a47d[_0x32f6fa(0xde)][_0x32f6fa(0x168)]=typeof _0x2a9896==_0x32f6fa(0x18f)?_0x2a9896:_0x54b11f,_0x315538['push'](_0x517c9f[_0x32f6fa(0xd1)](_0x53e1e3,_0x26a7ae,_0x2a9896,_0x36a47d,_0x5aeaf9)),_0x36a47d[_0x32f6fa(0xde)]['parent']=_0x5cfc73,_0x36a47d[_0x32f6fa(0xde)][_0x32f6fa(0x168)]=_0xae7a51;};}[_0x42398e(0xfb)](_0x102540,_0x28b951,_0x37b0d2,_0x1f43da,_0x4c16b9,_0x43a32c,_0x33fd6d){var _0x848e81=this;return _0x28b951['_p_'+_0x4c16b9['toString']()]=!0x0,function(_0x5d0f41){var _0x3446a1=_0x15f6,_0x37915c=_0x43a32c[_0x3446a1(0xde)][_0x3446a1(0xf2)],_0x491f6f=_0x43a32c[_0x3446a1(0xde)][_0x3446a1(0x168)],_0x49f445=_0x43a32c[_0x3446a1(0xde)][_0x3446a1(0x181)];_0x43a32c[_0x3446a1(0xde)]['parent']=_0x37915c,_0x43a32c[_0x3446a1(0xde)][_0x3446a1(0x168)]=_0x5d0f41,_0x102540[_0x3446a1(0xf5)](_0x848e81[_0x3446a1(0xd1)](_0x37b0d2,_0x1f43da,_0x4c16b9,_0x43a32c,_0x33fd6d)),_0x43a32c[_0x3446a1(0xde)][_0x3446a1(0x181)]=_0x49f445,_0x43a32c['node'][_0x3446a1(0x168)]=_0x491f6f;};}[_0x42398e(0xd1)](_0x3ecc34,_0x164e9b,_0x5853f4,_0x5021cc,_0x29aa4f){var _0x1c8cca=_0x42398e,_0x4bcb30=this;_0x29aa4f||(_0x29aa4f=function(_0x40face,_0x52de5c){return _0x40face[_0x52de5c];});var _0x15dc6a=_0x5853f4[_0x1c8cca(0xb9)](),_0x43cf2f=_0x5021cc[_0x1c8cca(0xd2)]||{},_0x288c5d=_0x5021cc[_0x1c8cca(0x173)],_0x3aa860=_0x5021cc['isExpressionToEvaluate'];try{var _0x4ddca7=this[_0x1c8cca(0xe6)](_0x3ecc34),_0x57d48d=_0x15dc6a;_0x4ddca7&&_0x57d48d[0x0]==='\\x27'&&(_0x57d48d=_0x57d48d[_0x1c8cca(0x170)](0x1,_0x57d48d[_0x1c8cca(0xc0)]-0x2));var _0x34aa5d=_0x5021cc[_0x1c8cca(0xd2)]=_0x43cf2f[_0x1c8cca(0x16a)+_0x57d48d];_0x34aa5d&&(_0x5021cc[_0x1c8cca(0x173)]=_0x5021cc['depth']+0x1),_0x5021cc[_0x1c8cca(0x190)]=!!_0x34aa5d;var _0x57e6e5=typeof _0x5853f4=='symbol',_0x320fd2={'name':_0x57e6e5||_0x4ddca7?_0x15dc6a:this[_0x1c8cca(0xdb)](_0x15dc6a)};if(_0x57e6e5&&(_0x320fd2[_0x1c8cca(0x10e)]=!0x0),!(_0x164e9b===_0x1c8cca(0x14d)||_0x164e9b==='Error')){var _0x452736=this['_getOwnPropertyDescriptor'](_0x3ecc34,_0x5853f4);if(_0x452736&&(_0x452736[_0x1c8cca(0x180)]&&(_0x320fd2[_0x1c8cca(0x151)]=!0x0),_0x452736[_0x1c8cca(0x129)]&&!_0x34aa5d&&!_0x5021cc[_0x1c8cca(0x176)]))return _0x320fd2[_0x1c8cca(0x130)]=!0x0,this['_processTreeNodeResult'](_0x320fd2,_0x5021cc),_0x320fd2;}var _0x29a3a2;try{_0x29a3a2=_0x29aa4f(_0x3ecc34,_0x5853f4);}catch(_0x323a9e){return _0x320fd2={'name':_0x15dc6a,'type':_0x1c8cca(0xdd),'error':_0x323a9e[_0x1c8cca(0x150)]},this['_processTreeNodeResult'](_0x320fd2,_0x5021cc),_0x320fd2;}var _0x331d64=this[_0x1c8cca(0x191)](_0x29a3a2),_0x4c472a=this[_0x1c8cca(0xed)](_0x331d64);if(_0x320fd2[_0x1c8cca(0x16c)]=_0x331d64,_0x4c472a)this[_0x1c8cca(0x10a)](_0x320fd2,_0x5021cc,_0x29a3a2,function(){var _0x1e62ef=_0x1c8cca;_0x320fd2[_0x1e62ef(0x169)]=_0x29a3a2[_0x1e62ef(0xa4)](),!_0x34aa5d&&_0x4bcb30[_0x1e62ef(0x12e)](_0x331d64,_0x320fd2,_0x5021cc,{});});else{var _0x3ef656=_0x5021cc[_0x1c8cca(0xff)]&&_0x5021cc[_0x1c8cca(0x11a)]<_0x5021cc[_0x1c8cca(0x112)]&&_0x5021cc[_0x1c8cca(0xe5)]['indexOf'](_0x29a3a2)<0x0&&_0x331d64!=='function'&&_0x5021cc[_0x1c8cca(0x147)]<_0x5021cc[_0x1c8cca(0xa5)];_0x3ef656||_0x5021cc[_0x1c8cca(0x11a)]<_0x288c5d||_0x34aa5d?(this[_0x1c8cca(0x14c)](_0x320fd2,_0x29a3a2,_0x5021cc,_0x34aa5d||{}),this['_additionalMetadata'](_0x29a3a2,_0x320fd2)):this[_0x1c8cca(0x10a)](_0x320fd2,_0x5021cc,_0x29a3a2,function(){var _0x360af2=_0x1c8cca;_0x331d64===_0x360af2(0x186)||_0x331d64===_0x360af2(0x14b)||(delete _0x320fd2[_0x360af2(0x169)],_0x320fd2[_0x360af2(0x119)]=!0x0);});}return _0x320fd2;}finally{_0x5021cc['expressionsToEvaluate']=_0x43cf2f,_0x5021cc['depth']=_0x288c5d,_0x5021cc[_0x1c8cca(0x190)]=_0x3aa860;}}[_0x42398e(0x12e)](_0x4dbd9c,_0x22ef58,_0x2e67fe,_0x59e98f){var _0x3bf59c=_0x42398e,_0x5cdbf3=_0x59e98f['strLength']||_0x2e67fe[_0x3bf59c(0x195)];if((_0x4dbd9c==='string'||_0x4dbd9c===_0x3bf59c(0x10b))&&_0x22ef58['value']){let _0x4facd7=_0x22ef58[_0x3bf59c(0x169)][_0x3bf59c(0xc0)];_0x2e67fe[_0x3bf59c(0x10f)]+=_0x4facd7,_0x2e67fe['allStrLength']>_0x2e67fe['totalStrLength']?(_0x22ef58[_0x3bf59c(0x119)]='',delete _0x22ef58[_0x3bf59c(0x169)]):_0x4facd7>_0x5cdbf3&&(_0x22ef58['capped']=_0x22ef58[_0x3bf59c(0x169)]['substr'](0x0,_0x5cdbf3),delete _0x22ef58['value']);}}[_0x42398e(0xe6)](_0x39c338){var _0x5b0ed6=_0x42398e;return!!(_0x39c338&&_0x1fa1aa[_0x5b0ed6(0x155)]&&this[_0x5b0ed6(0x194)](_0x39c338)===_0x5b0ed6(0x126)&&_0x39c338[_0x5b0ed6(0xce)]);}[_0x42398e(0xdb)](_0x379fc7){var _0x541cc9=_0x42398e;if(_0x379fc7[_0x541cc9(0xf7)](/^\\d+$/))return _0x379fc7;var _0x3040b9;try{_0x3040b9=JSON[_0x541cc9(0x164)](''+_0x379fc7);}catch{_0x3040b9='\\x22'+this[_0x541cc9(0x194)](_0x379fc7)+'\\x22';}return _0x3040b9[_0x541cc9(0xf7)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x3040b9=_0x3040b9[_0x541cc9(0x170)](0x1,_0x3040b9['length']-0x2):_0x3040b9=_0x3040b9[_0x541cc9(0x172)](/'/g,'\\x5c\\x27')[_0x541cc9(0x172)](/\\\\\"/g,'\\x22')[_0x541cc9(0x172)](/(^\"|\"$)/g,'\\x27'),_0x3040b9;}[_0x42398e(0x10a)](_0x4602a3,_0x2102be,_0x32ea79,_0x1ef98f){var _0x257f96=_0x42398e;this[_0x257f96(0xc3)](_0x4602a3,_0x2102be),_0x1ef98f&&_0x1ef98f(),this[_0x257f96(0xe3)](_0x32ea79,_0x4602a3),this[_0x257f96(0xea)](_0x4602a3,_0x2102be);}[_0x42398e(0xc3)](_0xcb63a4,_0x4f5d89){var _0x229660=_0x42398e;this[_0x229660(0x17b)](_0xcb63a4,_0x4f5d89),this['_setNodeQueryPath'](_0xcb63a4,_0x4f5d89),this[_0x229660(0x166)](_0xcb63a4,_0x4f5d89),this[_0x229660(0x103)](_0xcb63a4,_0x4f5d89);}[_0x42398e(0x17b)](_0x163355,_0x565bf5){}[_0x42398e(0x174)](_0x1a6919,_0x600e3a){}[_0x42398e(0xa6)](_0x3564f5,_0xa86bc4){}[_0x42398e(0x11f)](_0x3eb71a){var _0x40e6e7=_0x42398e;return _0x3eb71a===this[_0x40e6e7(0x185)];}[_0x42398e(0xea)](_0xadd117,_0xcbad20){var _0x444e60=_0x42398e;this['_setNodeLabel'](_0xadd117,_0xcbad20),this[_0x444e60(0x115)](_0xadd117),_0xcbad20[_0x444e60(0xdf)]&&this[_0x444e60(0xac)](_0xadd117),this[_0x444e60(0xf0)](_0xadd117,_0xcbad20),this[_0x444e60(0x177)](_0xadd117,_0xcbad20),this[_0x444e60(0xee)](_0xadd117);}[_0x42398e(0xe3)](_0x3d23ae,_0x113eec){var _0x1810ad=_0x42398e;let _0x1746da;try{_0x1fa1aa[_0x1810ad(0x109)]&&(_0x1746da=_0x1fa1aa[_0x1810ad(0x109)][_0x1810ad(0xaf)],_0x1fa1aa['console']['error']=function(){}),_0x3d23ae&&typeof _0x3d23ae[_0x1810ad(0xc0)]=='number'&&(_0x113eec['length']=_0x3d23ae[_0x1810ad(0xc0)]);}catch{}finally{_0x1746da&&(_0x1fa1aa[_0x1810ad(0x109)][_0x1810ad(0xaf)]=_0x1746da);}if(_0x113eec[_0x1810ad(0x16c)]===_0x1810ad(0x18f)||_0x113eec['type']===_0x1810ad(0xe9)){if(isNaN(_0x113eec[_0x1810ad(0x169)]))_0x113eec[_0x1810ad(0xd3)]=!0x0,delete _0x113eec[_0x1810ad(0x169)];else switch(_0x113eec[_0x1810ad(0x169)]){case Number[_0x1810ad(0xbe)]:_0x113eec['positiveInfinity']=!0x0,delete _0x113eec[_0x1810ad(0x169)];break;case Number[_0x1810ad(0x105)]:_0x113eec[_0x1810ad(0x17e)]=!0x0,delete _0x113eec[_0x1810ad(0x169)];break;case 0x0:this[_0x1810ad(0xc6)](_0x113eec['value'])&&(_0x113eec['negativeZero']=!0x0);break;}}else _0x113eec[_0x1810ad(0x16c)]==='function'&&typeof _0x3d23ae[_0x1810ad(0xb3)]==_0x1810ad(0xeb)&&_0x3d23ae[_0x1810ad(0xb3)]&&_0x113eec[_0x1810ad(0xb3)]&&_0x3d23ae[_0x1810ad(0xb3)]!==_0x113eec[_0x1810ad(0xb3)]&&(_0x113eec[_0x1810ad(0xe2)]=_0x3d23ae[_0x1810ad(0xb3)]);}['_isNegativeZero'](_0x4be0a5){return 0x1/_0x4be0a5===Number['NEGATIVE_INFINITY'];}[_0x42398e(0xac)](_0x2afc6f){var _0x218be8=_0x42398e;!_0x2afc6f[_0x218be8(0xae)]||!_0x2afc6f['props'][_0x218be8(0xc0)]||_0x2afc6f[_0x218be8(0x16c)]==='array'||_0x2afc6f['type']===_0x218be8(0x155)||_0x2afc6f[_0x218be8(0x16c)]===_0x218be8(0xbd)||_0x2afc6f[_0x218be8(0xae)][_0x218be8(0x154)](function(_0x270618,_0x56ff62){var _0x6c3871=_0x218be8,_0x346599=_0x270618['name']['toLowerCase'](),_0x308534=_0x56ff62[_0x6c3871(0xb3)][_0x6c3871(0xb8)]();return _0x346599<_0x308534?-0x1:_0x346599>_0x308534?0x1:0x0;});}[_0x42398e(0xf0)](_0x4817a0,_0x511b51){var _0x73c91a=_0x42398e;if(!(_0x511b51[_0x73c91a(0xb7)]||!_0x4817a0[_0x73c91a(0xae)]||!_0x4817a0[_0x73c91a(0xae)][_0x73c91a(0xc0)])){for(var _0x579f3a=[],_0x216629=[],_0x483a70=0x0,_0x1077d2=_0x4817a0['props'][_0x73c91a(0xc0)];_0x483a70<_0x1077d2;_0x483a70++){var _0x5aafce=_0x4817a0['props'][_0x483a70];_0x5aafce['type']==='function'?_0x579f3a[_0x73c91a(0xf5)](_0x5aafce):_0x216629[_0x73c91a(0xf5)](_0x5aafce);}if(!(!_0x216629[_0x73c91a(0xc0)]||_0x579f3a['length']<=0x1)){_0x4817a0[_0x73c91a(0xae)]=_0x216629;var _0x56a001={'functionsNode':!0x0,'props':_0x579f3a};this[_0x73c91a(0x17b)](_0x56a001,_0x511b51),this[_0x73c91a(0xa6)](_0x56a001,_0x511b51),this['_setNodeExpandableState'](_0x56a001),this[_0x73c91a(0x103)](_0x56a001,_0x511b51),_0x56a001['id']+='\\x20f',_0x4817a0[_0x73c91a(0xae)][_0x73c91a(0x146)](_0x56a001);}}}[_0x42398e(0x177)](_0x52ec54,_0x1b03c8){}[_0x42398e(0x115)](_0x373f4b){}[_0x42398e(0x120)](_0x494ae3){var _0x21dd10=_0x42398e;return Array[_0x21dd10(0x152)](_0x494ae3)||typeof _0x494ae3==_0x21dd10(0xab)&&this['_objectToString'](_0x494ae3)===_0x21dd10(0xd0);}[_0x42398e(0x103)](_0x40053e,_0x5ed3d6){}['_cleanNode'](_0x3a1b5c){var _0x2f9dd2=_0x42398e;delete _0x3a1b5c[_0x2f9dd2(0x13d)],delete _0x3a1b5c[_0x2f9dd2(0x148)],delete _0x3a1b5c['_hasMapOnItsPath'];}[_0x42398e(0x166)](_0x798f23,_0x3efada){}}let _0x4c7a63=new _0x3276c6(),_0x19cf1b={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x3b151c={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x463c5b(_0xbd2986,_0x160277,_0x57abd3,_0x133479,_0x2a9121,_0x49d7af){var _0x20fba2=_0x42398e;let _0x7e007b,_0xafcbf9;try{_0xafcbf9=_0xf4300a(),_0x7e007b=_0x25c741[_0x160277],!_0x7e007b||_0xafcbf9-_0x7e007b['ts']>0x1f4&&_0x7e007b['count']&&_0x7e007b['time']/_0x7e007b['count']<0x64?(_0x25c741[_0x160277]=_0x7e007b={'count':0x0,'time':0x0,'ts':_0xafcbf9},_0x25c741[_0x20fba2(0x178)]={}):_0xafcbf9-_0x25c741['hits']['ts']>0x32&&_0x25c741[_0x20fba2(0x178)][_0x20fba2(0xad)]&&_0x25c741[_0x20fba2(0x178)][_0x20fba2(0x17d)]/_0x25c741[_0x20fba2(0x178)][_0x20fba2(0xad)]<0x64&&(_0x25c741[_0x20fba2(0x178)]={});let _0x1a0767=[],_0x301137=_0x7e007b[_0x20fba2(0xe0)]||_0x25c741[_0x20fba2(0x178)][_0x20fba2(0xe0)]?_0x3b151c:_0x19cf1b,_0xabddb=_0x129e7e=>{var _0x1e8e78=_0x20fba2;let _0x4eae92={};return _0x4eae92[_0x1e8e78(0xae)]=_0x129e7e[_0x1e8e78(0xae)],_0x4eae92[_0x1e8e78(0x11c)]=_0x129e7e[_0x1e8e78(0x11c)],_0x4eae92[_0x1e8e78(0x195)]=_0x129e7e[_0x1e8e78(0x195)],_0x4eae92['totalStrLength']=_0x129e7e['totalStrLength'],_0x4eae92[_0x1e8e78(0xa5)]=_0x129e7e[_0x1e8e78(0xa5)],_0x4eae92[_0x1e8e78(0x112)]=_0x129e7e[_0x1e8e78(0x112)],_0x4eae92[_0x1e8e78(0xdf)]=!0x1,_0x4eae92[_0x1e8e78(0xb7)]=!_0x6dc731,_0x4eae92[_0x1e8e78(0x173)]=0x1,_0x4eae92[_0x1e8e78(0x11a)]=0x0,_0x4eae92[_0x1e8e78(0x11e)]=_0x1e8e78(0x104),_0x4eae92['rootExpression']=_0x1e8e78(0x15f),_0x4eae92[_0x1e8e78(0xff)]=!0x0,_0x4eae92['autoExpandPreviousObjects']=[],_0x4eae92[_0x1e8e78(0x147)]=0x0,_0x4eae92[_0x1e8e78(0x176)]=!0x0,_0x4eae92[_0x1e8e78(0x10f)]=0x0,_0x4eae92[_0x1e8e78(0xde)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x4eae92;};for(var _0x2077f5=0x0;_0x2077f5<_0x2a9121[_0x20fba2(0xc0)];_0x2077f5++)_0x1a0767[_0x20fba2(0xf5)](_0x4c7a63[_0x20fba2(0x14c)]({'timeNode':_0xbd2986===_0x20fba2(0x17d)||void 0x0},_0x2a9121[_0x2077f5],_0xabddb(_0x301137),{}));if(_0xbd2986==='trace'){let _0x2cfcd4=Error[_0x20fba2(0xc2)];try{Error[_0x20fba2(0xc2)]=0x1/0x0,_0x1a0767[_0x20fba2(0xf5)](_0x4c7a63['serialize']({'stackNode':!0x0},new Error()[_0x20fba2(0xec)],_0xabddb(_0x301137),{'strLength':0x1/0x0}));}finally{Error['stackTraceLimit']=_0x2cfcd4;}}return{'method':_0x20fba2(0xef),'version':_0x1bd4eb,'args':[{'ts':_0x57abd3,'session':_0x133479,'args':_0x1a0767,'id':_0x160277,'context':_0x49d7af}]};}catch(_0x178591){return{'method':'log','version':_0x1bd4eb,'args':[{'ts':_0x57abd3,'session':_0x133479,'args':[{'type':_0x20fba2(0xdd),'error':_0x178591&&_0x178591['message']}],'id':_0x160277,'context':_0x49d7af}]};}finally{try{if(_0x7e007b&&_0xafcbf9){let _0x4a34f4=_0xf4300a();_0x7e007b[_0x20fba2(0xad)]++,_0x7e007b[_0x20fba2(0x17d)]+=_0x263d14(_0xafcbf9,_0x4a34f4),_0x7e007b['ts']=_0x4a34f4,_0x25c741[_0x20fba2(0x178)][_0x20fba2(0xad)]++,_0x25c741[_0x20fba2(0x178)][_0x20fba2(0x17d)]+=_0x263d14(_0xafcbf9,_0x4a34f4),_0x25c741[_0x20fba2(0x178)]['ts']=_0x4a34f4,(_0x7e007b[_0x20fba2(0xad)]>0x32||_0x7e007b[_0x20fba2(0x17d)]>0x64)&&(_0x7e007b[_0x20fba2(0xe0)]=!0x0),(_0x25c741[_0x20fba2(0x178)]['count']>0x3e8||_0x25c741[_0x20fba2(0x178)][_0x20fba2(0x17d)]>0x12c)&&(_0x25c741[_0x20fba2(0x178)][_0x20fba2(0xe0)]=!0x0);}}catch{}}}return _0x463c5b;}function _0x55e4(){var _0x3749cd=['_getOwnPropertyDescriptor','get','global','getOwnPropertySymbols','performance','then','_capIfString','_regExpToString','getter','process','toUpperCase','_allowedToSend','path','env','cappedProps','prototype','_addProperty','location','close','2VuKCBo','gateway.docker.internal','_hasSymbolPropertyOnItsPath','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','remix','port','_maxConnectAttemptCount','reload','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_isPrimitiveWrapperType','_socket','unshift','autoExpandPropertyCount','_hasSetOnItsPath','getOwnPropertyDescriptor','_connectToHostNow','undefined','serialize','array','logger\\x20websocket\\x20error','_webSocketErrorDocsLink','message','setter','isArray','ws/index.js','sort','Map','18LRgzAM','','_keyStrRegExp','_p_name','elapsed','data','origin','_blacklistedProperty','_connecting','root_exp','defineProperty','_console_ninja_session','https://tinyurl.com/37x8b79t','getOwnPropertyNames','stringify','date','_setNodeExpressionPath','webpack','index','value','_p_','function','type','9360351zOghSB','_getOwnPropertySymbols','trace','substr','charAt','replace','depth','_setNodeQueryPath','nodeModules','resolveGetters','_addLoadNode','hits','_p_length','Boolean','_setNodeId','default','time','negativeInfinity','onerror','set','parent','split',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.337\\\\node_modules\",'RegExp','_undefined','null','getWebSocketClass','versions','Symbol','edge','test','_HTMLAllCollection','\\x20server','_dateToString','number','isExpressionToEvaluate','_type','args','warn','_objectToString','strLength','6sgXWng','dockerizedApp','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','valueOf','autoExpandLimit','_setNodeLabel','onclose','host','_attemptToReconnectShortly','1.0.0','object','_sortProps','count','props','error','hasOwnProperty','9196bYiyiB','send','name','_consoleNinjaAllowedToStart','create','1396160wbqKve','noFunctions','toLowerCase','toString','_sendErrorMessage','_connectAttemptCount','parse','Set','POSITIVE_INFINITY','includes','length','_disposeWebsocket','stackTraceLimit','_treeNodePropertiesBeforeFullValue','_console_ninja','6923195mprhDB','_isNegativeZero','onopen','4iquURE','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','[object\\x20Date]','_inNextEdge','143oOEdhK','constructor','forEach','next.js','[object\\x20Array]','_property','expressionsToEvaluate','nan','enumerable','_WebSocketClass','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','cappedElements','join','1664859lGBvlL','concat','_propertyName','pop','unknown','node','sortProps','reduceLimits','onmessage','funcName','_additionalMetadata','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','autoExpandPreviousObjects','_isMap','1','_connected','Number','_treeNodePropertiesAfterFullValue','string','stack','_isPrimitiveType','_cleanNode','log','_addFunctionsNode','catch','current','49717','disabledTrace','push','coverage','match','1377072llktZt','now','bind','_addObjectProperty','_inBrowser','WebSocket','astro','autoExpand','hostname','_WebSocket','eventReceivedCallback','_setNodePermissions','root_exp_id','NEGATIVE_INFINITY','hrtime','Buffer','method','console','_processTreeNodeResult','String','_getOwnPropertyNames','_Symbol','symbol','allStrLength','bigint','unref','autoExpandMaxDepth','20990tSacgM','_quotedRegExp','_setNodeExpandableState','2912583ZSZJTv','NEXT_RUNTIME','call','capped','level','_reconnectTimeout','elements','_allowedToConnectOnSend','expId','_isUndefined','_isArray','_isSet','url','...','_ws','timeStamp','[object\\x20Map]','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)'];_0x55e4=function(){return _0x3749cd;};return _0x55e4();}((_0x315bef,_0x51fcc7,_0x3f2f9c,_0x747322,_0x2fa032,_0xa528c2,_0x2545d3,_0x54b223,_0x26dcd8,_0xacbbdf,_0x136c7b)=>{var _0x2b35cd=_0x56455d;if(_0x315bef[_0x2b35cd(0xc4)])return _0x315bef[_0x2b35cd(0xc4)];if(!H(_0x315bef,_0x54b223,_0x2fa032))return _0x315bef[_0x2b35cd(0xc4)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x315bef['_console_ninja'];let _0x593cd7=b(_0x315bef),_0xcc02d4=_0x593cd7['elapsed'],_0x481ec1=_0x593cd7[_0x2b35cd(0x125)],_0x321a00=_0x593cd7[_0x2b35cd(0xf9)],_0x4d73c6={'hits':{},'ts':{}},_0x2ae46d=J(_0x315bef,_0x26dcd8,_0x4d73c6,_0xa528c2),_0x40145a=_0x521d13=>{_0x4d73c6['ts'][_0x521d13]=_0x481ec1();},_0x141c60=(_0x36839e,_0x3a1c0c)=>{var _0x32a500=_0x2b35cd;let _0xcdfe24=_0x4d73c6['ts'][_0x3a1c0c];if(delete _0x4d73c6['ts'][_0x3a1c0c],_0xcdfe24){let _0x51f486=_0xcc02d4(_0xcdfe24,_0x481ec1());_0x1d4b78(_0x2ae46d(_0x32a500(0x17d),_0x36839e,_0x321a00(),_0x2bca30,[_0x51f486],_0x3a1c0c));}},_0x26e774=_0x387b4e=>{var _0x17661f=_0x2b35cd,_0x1709e9;return _0x2fa032===_0x17661f(0xcf)&&_0x315bef[_0x17661f(0x15c)]&&((_0x1709e9=_0x387b4e==null?void 0x0:_0x387b4e['args'])==null?void 0x0:_0x1709e9[_0x17661f(0xc0)])&&(_0x387b4e[_0x17661f(0x192)][0x0][_0x17661f(0x15c)]=_0x315bef['origin']),_0x387b4e;};_0x315bef[_0x2b35cd(0xc4)]={'consoleLog':(_0x485bf4,_0x553fd3)=>{var _0x5c0eaa=_0x2b35cd;_0x315bef[_0x5c0eaa(0x109)][_0x5c0eaa(0xef)][_0x5c0eaa(0xb3)]!=='disabledLog'&&_0x1d4b78(_0x2ae46d(_0x5c0eaa(0xef),_0x485bf4,_0x321a00(),_0x2bca30,_0x553fd3));},'consoleTrace':(_0x57af1b,_0x57b66e)=>{var _0x1dd540=_0x2b35cd;_0x315bef[_0x1dd540(0x109)][_0x1dd540(0xef)][_0x1dd540(0xb3)]!==_0x1dd540(0xf4)&&_0x1d4b78(_0x26e774(_0x2ae46d(_0x1dd540(0x16f),_0x57af1b,_0x321a00(),_0x2bca30,_0x57b66e)));},'consoleTime':_0xea0884=>{_0x40145a(_0xea0884);},'consoleTimeEnd':(_0x205f45,_0x504d14)=>{_0x141c60(_0x504d14,_0x205f45);},'autoLog':(_0x21e259,_0x35d417)=>{_0x1d4b78(_0x2ae46d('log',_0x35d417,_0x321a00(),_0x2bca30,[_0x21e259]));},'autoLogMany':(_0x285da4,_0x282146)=>{_0x1d4b78(_0x2ae46d('log',_0x285da4,_0x321a00(),_0x2bca30,_0x282146));},'autoTrace':(_0x178c0a,_0x38958e)=>{var _0x215e47=_0x2b35cd;_0x1d4b78(_0x26e774(_0x2ae46d(_0x215e47(0x16f),_0x38958e,_0x321a00(),_0x2bca30,[_0x178c0a])));},'autoTraceMany':(_0x81cf2d,_0x7c5a01)=>{var _0x4852e0=_0x2b35cd;_0x1d4b78(_0x26e774(_0x2ae46d(_0x4852e0(0x16f),_0x81cf2d,_0x321a00(),_0x2bca30,_0x7c5a01)));},'autoTime':(_0x1208ea,_0x4462bb,_0x2ca64b)=>{_0x40145a(_0x2ca64b);},'autoTimeEnd':(_0x2aa671,_0x5efa9c,_0x565d2f)=>{_0x141c60(_0x5efa9c,_0x565d2f);},'coverage':_0x4c0afc=>{var _0x6374b1=_0x2b35cd;_0x1d4b78({'method':_0x6374b1(0xf6),'version':_0xa528c2,'args':[{'id':_0x4c0afc}]});}};let _0x1d4b78=X(_0x315bef,_0x51fcc7,_0x3f2f9c,_0x747322,_0x2fa032,_0xacbbdf,_0x136c7b),_0x2bca30=_0x315bef[_0x2b35cd(0x161)];return _0x315bef['_console_ninja'];})(globalThis,'127.0.0.1',_0x56455d(0xf3),_0x56455d(0x183),_0x56455d(0x167),_0x56455d(0xaa),'1722661551229',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\",\"172.30.224.1\"],'',_0x56455d(0x157),_0x56455d(0xe7));");
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

/***/ }),

/***/ "./resources/js/react/TimeLogTable/pages/TaskWiseTable.jsx":
/*!*****************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/pages/TaskWiseTable.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global/Loader */ "./resources/js/react/global/Loader.jsx");
/* harmony import */ var _services_api_timeLogTableApiSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api/timeLogTableApiSlice */ "./resources/js/react/services/api/timeLogTableApiSlice.js");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var _utils_paginate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/paginate */ "./resources/js/react/utils/paginate.js");
/* harmony import */ var _components_RefreshButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/RefreshButton */ "./resources/js/react/TimeLogTable/components/RefreshButton.jsx");
/* harmony import */ var _components_Tabbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Tabbar */ "./resources/js/react/TimeLogTable/components/Tabbar.jsx");
/* harmony import */ var _components_TaskWiseLogTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/TaskWiseLogTable */ "./resources/js/react/TimeLogTable/components/TaskWiseLogTable.jsx");
/* harmony import */ var _components_TaskWiseLogTableColumn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/TaskWiseLogTableColumn */ "./resources/js/react/TimeLogTable/components/TaskWiseLogTableColumn.jsx");
/* harmony import */ var _components_TimeLogTableFilterBar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/TimeLogTableFilterBar */ "./resources/js/react/TimeLogTable/components/TimeLogTableFilterBar.jsx");
/* harmony import */ var _components_ExportToExcel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/ExportToExcel */ "./resources/js/react/TimeLogTable/components/ExportToExcel.jsx");
/* harmony import */ var _export_excel_ExportTaskWiseTableDataToExcel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../export/excel/ExportTaskWiseTableDataToExcel */ "./resources/js/react/TimeLogTable/export/excel/ExportTaskWiseTableDataToExcel.jsx");
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../hooks/useAuth */ "./resources/js/react/hooks/useAuth.jsx");
/* harmony import */ var _global_Switch__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../global/Switch */ "./resources/js/react/global/Switch.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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

















var TaskWiseLogReport = function TaskWiseLogReport() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10),
    _useState4 = _slicedToArray(_useState3, 2),
    perPageData = _useState4[0],
    setParPageData = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1),
    _useState6 = _slicedToArray(_useState5, 2),
    currentPage = _useState6[0],
    setCurrentPage = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    renderData = _useState8[0],
    setRenderData = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    sortConfig = _useState10[0],
    setSortConfig = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState12 = _slicedToArray(_useState11, 2),
    trackedTime = _useState12[0],
    setTrackedTime = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    filter = _useState14[0],
    setFilter = _useState14[1];
  var _useGetTaskWiseDataMu = (0,_services_api_timeLogTableApiSlice__WEBPACK_IMPORTED_MODULE_3__.useGetTaskWiseDataMutation)(),
    _useGetTaskWiseDataMu2 = _slicedToArray(_useGetTaskWiseDataMu, 2),
    getTaskWiseData = _useGetTaskWiseDataMu2[0],
    isLoading = _useGetTaskWiseDataMu2[1].isLoading;

  // current user
  var auth = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_13__.useAuth)();

  // handle data
  var handleData = function handleData(data, currentPage, perPageData) {
    var paginated = (0,_utils_paginate__WEBPACK_IMPORTED_MODULE_5__.paginate)(data, currentPage, perPageData);
    var grouped = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.groupBy)(paginated, 'task_id');
    var sorted = Object.entries(grouped).sort(function (_ref, _ref2) {
      var _ref3 = _slicedToArray(_ref, 1),
        keyA = _ref3[0];
      var _ref4 = _slicedToArray(_ref2, 1),
        keyB = _ref4[0];
      return keyB - keyA;
    });
    setRenderData(_toConsumableArray(sorted));
  };

  // handle fetch data
  var handleFetchData = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filter) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setFilter(filter);
            _context.next = 3;
            return getTaskWiseData(filter).unwrap().then(function (res) {
              setCurrentPage(1);
              var sortedData = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.orderBy)(res === null || res === void 0 ? void 0 : res.data, ["task_id"], ["desc"]);
              handleData(sortedData, 1, perPageData);
              setData(sortedData);
              var totalTrackTime = _.sumBy(sortedData, function (d) {
                return Number(d.total_minutes);
              });
              setTrackedTime(totalTrackTime);
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleFetchData(_x) {
      return _ref5.apply(this, arguments);
    };
  }();

  // data sort handle
  var handleSorting = function handleSorting(sort) {
    var sortData = lodash__WEBPACK_IMPORTED_MODULE_0__.orderBy.apply(void 0, [data].concat(_toConsumableArray(sort)));
    handleData(sortData, currentPage, perPageData);
  };

  // handle pagination
  var handlePagination = function handlePagination(page) {
    setCurrentPage(page);
    handleData(data, page, perPageData);
  };

  // handle par page data change
  var handlePerPageData = function handlePerPageData(number) {
    setParPageData(number);
    handleData(data, currentPage, number);
  };

  // handle refresh button
  var handleRefresh = function handleRefresh() {
    handleFetchData(filter);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
    className: "sp1_tlr_container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_TimeLogTableFilterBar__WEBPACK_IMPORTED_MODULE_10__["default"], {
      onFilter: handleFetchData
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
      className: "sp1_tlr_tbl_container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "d-flex align-items-center justify-content-between mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_Tabbar__WEBPACK_IMPORTED_MODULE_7__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "d-flex align-items-center",
          style: {
            gap: '10px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_RefreshButton__WEBPACK_IMPORTED_MODULE_6__.RefreshButton, {
            onClick: handleRefresh,
            isLoading: isLoading,
            children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_global_Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
              title: "Refreshing...",
              borderRightColor: "white"
            }) : 'Refresh'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_14__["default"], {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_14__["default"].Case, {
              condition: auth.getRoleId() === 1,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_export_excel_ExportTaskWiseTableDataToExcel__WEBPACK_IMPORTED_MODULE_12__["default"], {
                data: data,
                filter: filter,
                button: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(_components_ExportToExcel__WEBPACK_IMPORTED_MODULE_11__.ExportToExcel, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("i", {
                    className: "fa-solid fa-download"
                  }), "Export to Excel"]
                }),
                filename: "task_wise_table_".concat(filter === null || filter === void 0 ? void 0 : filter.start_date, "_to_").concat(filter === null || filter === void 0 ? void 0 : filter.end_date)
              })
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: " w-100 d-flex flex-wrap justify-center align-items-center",
        style: {
          gap: '10px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("span", {
          className: "mx-auto",
          children: ["Total Tracked Time: ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
            children: (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_4__.convertTime)(trackedTime)
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_TaskWiseLogTable__WEBPACK_IMPORTED_MODULE_8__["default"], {
        data: renderData,
        columns: _components_TaskWiseLogTableColumn__WEBPACK_IMPORTED_MODULE_9__.TaskWiseTableColumn,
        tableName: "task_timelog_report",
        onSort: handleSorting,
        height: "calc(100vh - 370px)",
        onPaginate: handlePagination,
        perpageData: perPageData,
        handlePerPageData: handlePerPageData,
        currentPage: currentPage,
        totalEntry: data.length,
        isLoading: isLoading
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskWiseLogReport);

/***/ }),

/***/ "./resources/js/react/services/api/timeLogTableApiSlice.js":
/*!*****************************************************************!*\
  !*** ./resources/js/react/services/api/timeLogTableApiSlice.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useGetEmployeeWiseDataMutation: () => (/* binding */ useGetEmployeeWiseDataMutation),
/* harmony export */   useGetProjectWiseDataMutation: () => (/* binding */ useGetProjectWiseDataMutation),
/* harmony export */   useGetTaskWiseDataMutation: () => (/* binding */ useGetTaskWiseDataMutation),
/* harmony export */   useGetTimeLogHistoryMutation: () => (/* binding */ useGetTimeLogHistoryMutation),
/* harmony export */   useLazyGetTimeLogHistoryDetailsQuery: () => (/* binding */ useLazyGetTimeLogHistoryDetailsQuery)
/* harmony export */ });
/* harmony import */ var _apiSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiSlice */ "./resources/js/react/services/api/apiSlice.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var timeLogTableApiSlice = _apiSlice__WEBPACK_IMPORTED_MODULE_0__.apiSlice.injectEndpoints({
  endpoints: function endpoints(build) {
    return {
      getEmployeeWiseData: build.mutation({
        query: function query(data) {
          return {
            url: "/get-timelogs/employees",
            method: "POST",
            body: _objectSpread(_objectSpread({}, data), {}, {
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            })
          };
        }
      }),
      getProjectWiseData: build.mutation({
        query: function query(data) {
          return {
            url: "/get-timelogs/projects",
            method: "POST",
            body: _objectSpread(_objectSpread({}, data), {}, {
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            })
          };
        }
      }),
      getTaskWiseData: build.mutation({
        query: function query(data) {
          return {
            url: "/get-timelogs/tasks",
            method: "POST",
            body: _objectSpread(_objectSpread({}, data), {}, {
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            })
          };
        }
      }),
      getTimeLogHistory: build.mutation({
        query: function query(data) {
          return {
            url: "/get-timelogs/time_log_history",
            method: "POST",
            body: _objectSpread(_objectSpread({}, data), {}, {
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            })
          };
        }
      }),
      getTimeLogHistoryDetails: build.query({
        query: function query(userId) {
          return "/account/tasks/developer-task-history/".concat(userId);
        }
      })
    };
  }
});
var useGetEmployeeWiseDataMutation = timeLogTableApiSlice.useGetEmployeeWiseDataMutation,
  useGetTaskWiseDataMutation = timeLogTableApiSlice.useGetTaskWiseDataMutation,
  useGetProjectWiseDataMutation = timeLogTableApiSlice.useGetProjectWiseDataMutation,
  useGetTimeLogHistoryMutation = timeLogTableApiSlice.useGetTimeLogHistoryMutation,
  useLazyGetTimeLogHistoryDetailsQuery = timeLogTableApiSlice.useLazyGetTimeLogHistoryDetailsQuery;


/***/ })

}]);
//# sourceMappingURL=resources_js_react_TimeLogTable_pages_TaskWiseTable_jsx.js.map