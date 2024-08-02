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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x560e48=_0x3e50;(function(_0x4c3edb,_0x303b7c){var _0x254e84=_0x3e50,_0x252939=_0x4c3edb();while(!![]){try{var _0x1ed8a8=parseInt(_0x254e84(0x154))/0x1*(parseInt(_0x254e84(0x10c))/0x2)+parseInt(_0x254e84(0x17d))/0x3+-parseInt(_0x254e84(0x118))/0x4*(parseInt(_0x254e84(0x111))/0x5)+-parseInt(_0x254e84(0x131))/0x6*(-parseInt(_0x254e84(0x107))/0x7)+-parseInt(_0x254e84(0x177))/0x8*(parseInt(_0x254e84(0xc4))/0x9)+-parseInt(_0x254e84(0xe3))/0xa+parseInt(_0x254e84(0x13d))/0xb;if(_0x1ed8a8===_0x303b7c)break;else _0x252939['push'](_0x252939['shift']());}catch(_0xab0594){_0x252939['push'](_0x252939['shift']());}}}(_0x1ab9,0xe3b41));function _0x3e50(_0x51ed47,_0x4fee35){var _0x1ab987=_0x1ab9();return _0x3e50=function(_0x3e50ac,_0x39aa38){_0x3e50ac=_0x3e50ac-0xc3;var _0x8bae4b=_0x1ab987[_0x3e50ac];return _0x8bae4b;},_0x3e50(_0x51ed47,_0x4fee35);}var j=Object[_0x560e48(0x192)],Q=Object['defineProperty'],G=Object['getOwnPropertyDescriptor'],ee=Object[_0x560e48(0x15e)],te=Object[_0x560e48(0x13f)],ne=Object[_0x560e48(0xcd)][_0x560e48(0x150)],re=(_0x1960a8,_0x212190,_0x28d2d2,_0x48d409)=>{var _0xd0254b=_0x560e48;if(_0x212190&&typeof _0x212190==_0xd0254b(0x11c)||typeof _0x212190==_0xd0254b(0x105)){for(let _0x22917b of ee(_0x212190))!ne[_0xd0254b(0x172)](_0x1960a8,_0x22917b)&&_0x22917b!==_0x28d2d2&&Q(_0x1960a8,_0x22917b,{'get':()=>_0x212190[_0x22917b],'enumerable':!(_0x48d409=G(_0x212190,_0x22917b))||_0x48d409[_0xd0254b(0x1b7)]});}return _0x1960a8;},V=(_0x4edc0b,_0x1c24d5,_0x2d3107)=>(_0x2d3107=_0x4edc0b!=null?j(te(_0x4edc0b)):{},re(_0x1c24d5||!_0x4edc0b||!_0x4edc0b['__es'+'Module']?Q(_0x2d3107,_0x560e48(0x16c),{'value':_0x4edc0b,'enumerable':!0x0}):_0x2d3107,_0x4edc0b)),q=class{constructor(_0x3ad5f8,_0x2e3bd5,_0x4ff34d,_0x9acdaa,_0x543cb8,_0xd1f97){var _0x4ec040=_0x560e48,_0x3a1831,_0x29e2a1,_0xa43b23,_0x1799ed;this[_0x4ec040(0x195)]=_0x3ad5f8,this[_0x4ec040(0x109)]=_0x2e3bd5,this['port']=_0x4ff34d,this[_0x4ec040(0x16f)]=_0x9acdaa,this[_0x4ec040(0x14e)]=_0x543cb8,this[_0x4ec040(0x126)]=_0xd1f97,this[_0x4ec040(0x161)]=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x4ec040(0x141)]=!0x1,this[_0x4ec040(0x139)]=!0x1,this[_0x4ec040(0xcc)]=((_0x29e2a1=(_0x3a1831=_0x3ad5f8[_0x4ec040(0xc6)])==null?void 0x0:_0x3a1831[_0x4ec040(0x11d)])==null?void 0x0:_0x29e2a1['NEXT_RUNTIME'])===_0x4ec040(0x17a),this[_0x4ec040(0x17b)]=!((_0x1799ed=(_0xa43b23=this[_0x4ec040(0x195)][_0x4ec040(0xc6)])==null?void 0x0:_0xa43b23[_0x4ec040(0x167)])!=null&&_0x1799ed[_0x4ec040(0x185)])&&!this['_inNextEdge'],this[_0x4ec040(0x14b)]=null,this['_connectAttemptCount']=0x0,this[_0x4ec040(0x18e)]=0x14,this[_0x4ec040(0xed)]=_0x4ec040(0x125),this[_0x4ec040(0xc8)]=(this['_inBrowser']?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x4ec040(0xd5))+this[_0x4ec040(0xed)];}async['getWebSocketClass'](){var _0x3d52ce=_0x560e48,_0x4c24d3,_0x28ac2c;if(this['_WebSocketClass'])return this[_0x3d52ce(0x14b)];let _0x12e07b;if(this['_inBrowser']||this[_0x3d52ce(0xcc)])_0x12e07b=this['global'][_0x3d52ce(0x188)];else{if((_0x4c24d3=this['global']['process'])!=null&&_0x4c24d3[_0x3d52ce(0x14d)])_0x12e07b=(_0x28ac2c=this[_0x3d52ce(0x195)][_0x3d52ce(0xc6)])==null?void 0x0:_0x28ac2c[_0x3d52ce(0x14d)];else try{let _0x11a4f7=await import('path');_0x12e07b=(await import((await import(_0x3d52ce(0xce)))[_0x3d52ce(0x101)](_0x11a4f7[_0x3d52ce(0xca)](this[_0x3d52ce(0x16f)],_0x3d52ce(0x19b)))[_0x3d52ce(0xc7)]()))['default'];}catch{try{_0x12e07b=require(require(_0x3d52ce(0x159))[_0x3d52ce(0xca)](this[_0x3d52ce(0x16f)],'ws'));}catch{throw new Error(_0x3d52ce(0x11b));}}}return this[_0x3d52ce(0x14b)]=_0x12e07b,_0x12e07b;}[_0x560e48(0xef)](){var _0x4616bf=_0x560e48;this[_0x4616bf(0x139)]||this[_0x4616bf(0x141)]||this[_0x4616bf(0x103)]>=this['_maxConnectAttemptCount']||(this[_0x4616bf(0x14a)]=!0x1,this['_connecting']=!0x0,this['_connectAttemptCount']++,this['_ws']=new Promise((_0x4c5d90,_0x5cdb4b)=>{var _0x3f0b2=_0x4616bf;this[_0x3f0b2(0x176)]()['then'](_0x3a59d7=>{var _0xe7cbdc=_0x3f0b2;let _0x45086f=new _0x3a59d7(_0xe7cbdc(0x134)+(!this[_0xe7cbdc(0x17b)]&&this[_0xe7cbdc(0x14e)]?_0xe7cbdc(0xe4):this[_0xe7cbdc(0x109)])+':'+this[_0xe7cbdc(0x187)]);_0x45086f[_0xe7cbdc(0x138)]=()=>{var _0x5e0b4c=_0xe7cbdc;this[_0x5e0b4c(0x161)]=!0x1,this[_0x5e0b4c(0x12e)](_0x45086f),this['_attemptToReconnectShortly'](),_0x5cdb4b(new Error('logger\\x20websocket\\x20error'));},_0x45086f[_0xe7cbdc(0x166)]=()=>{var _0x8ce0a1=_0xe7cbdc;this[_0x8ce0a1(0x17b)]||_0x45086f['_socket']&&_0x45086f[_0x8ce0a1(0x175)][_0x8ce0a1(0x155)]&&_0x45086f[_0x8ce0a1(0x175)]['unref'](),_0x4c5d90(_0x45086f);},_0x45086f[_0xe7cbdc(0x1ab)]=()=>{var _0x2f9650=_0xe7cbdc;this[_0x2f9650(0x14a)]=!0x0,this['_disposeWebsocket'](_0x45086f),this[_0x2f9650(0xe2)]();},_0x45086f['onmessage']=_0x57dcba=>{var _0x435ae=_0xe7cbdc;try{if(!(_0x57dcba!=null&&_0x57dcba[_0x435ae(0x127)])||!this['eventReceivedCallback'])return;let _0x354032=JSON[_0x435ae(0x153)](_0x57dcba[_0x435ae(0x127)]);this[_0x435ae(0x126)](_0x354032['method'],_0x354032[_0x435ae(0x130)],this[_0x435ae(0x195)],this[_0x435ae(0x17b)]);}catch{}};})[_0x3f0b2(0x171)](_0x280a0e=>(this[_0x3f0b2(0x141)]=!0x0,this[_0x3f0b2(0x139)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this[_0x3f0b2(0x161)]=!0x0,this[_0x3f0b2(0x103)]=0x0,_0x280a0e))['catch'](_0x279b12=>(this[_0x3f0b2(0x141)]=!0x1,this[_0x3f0b2(0x139)]=!0x1,console[_0x3f0b2(0xd3)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x3f0b2(0xed)]),_0x5cdb4b(new Error(_0x3f0b2(0x160)+(_0x279b12&&_0x279b12[_0x3f0b2(0x10e)])))));}));}[_0x560e48(0x12e)](_0x159e29){var _0x3413ae=_0x560e48;this[_0x3413ae(0x141)]=!0x1,this[_0x3413ae(0x139)]=!0x1;try{_0x159e29[_0x3413ae(0x1ab)]=null,_0x159e29['onerror']=null,_0x159e29['onopen']=null;}catch{}try{_0x159e29[_0x3413ae(0x10b)]<0x2&&_0x159e29[_0x3413ae(0xee)]();}catch{}}[_0x560e48(0xe2)](){var _0x564a20=_0x560e48;clearTimeout(this[_0x564a20(0xfc)]),!(this['_connectAttemptCount']>=this[_0x564a20(0x18e)])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0x160291=_0x564a20,_0x458afe;this[_0x160291(0x141)]||this['_connecting']||(this[_0x160291(0xef)](),(_0x458afe=this[_0x160291(0x1b5)])==null||_0x458afe[_0x160291(0x163)](()=>this[_0x160291(0xe2)]()));},0x1f4),this[_0x564a20(0xfc)][_0x564a20(0x155)]&&this[_0x564a20(0xfc)][_0x564a20(0x155)]());}async[_0x560e48(0x112)](_0x54af77){var _0x245065=_0x560e48;try{if(!this[_0x245065(0x161)])return;this['_allowedToConnectOnSend']&&this[_0x245065(0xef)](),(await this[_0x245065(0x1b5)])[_0x245065(0x112)](JSON[_0x245065(0x1ad)](_0x54af77));}catch(_0x434153){console['warn'](this[_0x245065(0xc8)]+':\\x20'+(_0x434153&&_0x434153[_0x245065(0x10e)])),this[_0x245065(0x161)]=!0x1,this[_0x245065(0xe2)]();}}};function X(_0x5dfd3e,_0x34c650,_0x3db16a,_0x438c45,_0x3b9221,_0x548b25,_0x336a96,_0x397c6c=ie){var _0x232886=_0x560e48;let _0x1ee862=_0x3db16a['split'](',')[_0x232886(0xdf)](_0xe0385b=>{var _0x16d128=_0x232886,_0x13c7ab,_0x2536a7,_0x210eee,_0x43cb20;try{if(!_0x5dfd3e[_0x16d128(0xd9)]){let _0xce0d80=((_0x2536a7=(_0x13c7ab=_0x5dfd3e[_0x16d128(0xc6)])==null?void 0x0:_0x13c7ab['versions'])==null?void 0x0:_0x2536a7[_0x16d128(0x185)])||((_0x43cb20=(_0x210eee=_0x5dfd3e['process'])==null?void 0x0:_0x210eee[_0x16d128(0x11d)])==null?void 0x0:_0x43cb20[_0x16d128(0x181)])==='edge';(_0x3b9221===_0x16d128(0x1ae)||_0x3b9221===_0x16d128(0x1a2)||_0x3b9221===_0x16d128(0xf4)||_0x3b9221===_0x16d128(0x149))&&(_0x3b9221+=_0xce0d80?_0x16d128(0x169):_0x16d128(0x18b)),_0x5dfd3e[_0x16d128(0xd9)]={'id':+new Date(),'tool':_0x3b9221},_0x336a96&&_0x3b9221&&!_0xce0d80&&console[_0x16d128(0x18a)](_0x16d128(0x110)+(_0x3b9221[_0x16d128(0xfb)](0x0)[_0x16d128(0x162)]()+_0x3b9221[_0x16d128(0x102)](0x1))+',',_0x16d128(0x164),_0x16d128(0x135));}let _0x15dfd7=new q(_0x5dfd3e,_0x34c650,_0xe0385b,_0x438c45,_0x548b25,_0x397c6c);return _0x15dfd7[_0x16d128(0x112)][_0x16d128(0x12f)](_0x15dfd7);}catch(_0x1392c4){return console['warn'](_0x16d128(0xe0),_0x1392c4&&_0x1392c4[_0x16d128(0x10e)]),()=>{};}});return _0x3501c6=>_0x1ee862[_0x232886(0x106)](_0x3cc136=>_0x3cc136(_0x3501c6));}function ie(_0x5530c4,_0x5cb592,_0x48126d,_0x7a126e){var _0x1dec67=_0x560e48;_0x7a126e&&_0x5530c4===_0x1dec67(0x113)&&_0x48126d['location'][_0x1dec67(0x113)]();}function b(_0x5d31c7){var _0x38912f=_0x560e48,_0x49ac37,_0x169d74;let _0x5083d2=function(_0x2b5d7c,_0x22ea03){return _0x22ea03-_0x2b5d7c;},_0x145017;if(_0x5d31c7[_0x38912f(0x183)])_0x145017=function(){var _0x2d29bc=_0x38912f;return _0x5d31c7['performance'][_0x2d29bc(0xcf)]();};else{if(_0x5d31c7[_0x38912f(0xc6)]&&_0x5d31c7[_0x38912f(0xc6)][_0x38912f(0x19f)]&&((_0x169d74=(_0x49ac37=_0x5d31c7[_0x38912f(0xc6)])==null?void 0x0:_0x49ac37['env'])==null?void 0x0:_0x169d74[_0x38912f(0x181)])!==_0x38912f(0x17a))_0x145017=function(){var _0x5182f2=_0x38912f;return _0x5d31c7[_0x5182f2(0xc6)]['hrtime']();},_0x5083d2=function(_0x5377d,_0x100755){return 0x3e8*(_0x100755[0x0]-_0x5377d[0x0])+(_0x100755[0x1]-_0x5377d[0x1])/0xf4240;};else try{let {performance:_0x10e649}=require('perf_hooks');_0x145017=function(){var _0x239ef3=_0x38912f;return _0x10e649[_0x239ef3(0xcf)]();};}catch{_0x145017=function(){return+new Date();};}}return{'elapsed':_0x5083d2,'timeStamp':_0x145017,'now':()=>Date[_0x38912f(0xcf)]()};}function H(_0x15edd7,_0xf5c8ef,_0x36c7b3){var _0x3c1ecb=_0x560e48,_0x49a07e,_0x3cecdc,_0x3ecf62,_0x332c32,_0x7783f3;if(_0x15edd7[_0x3c1ecb(0x170)]!==void 0x0)return _0x15edd7[_0x3c1ecb(0x170)];let _0x1b2bc7=((_0x3cecdc=(_0x49a07e=_0x15edd7[_0x3c1ecb(0xc6)])==null?void 0x0:_0x49a07e[_0x3c1ecb(0x167)])==null?void 0x0:_0x3cecdc[_0x3c1ecb(0x185)])||((_0x332c32=(_0x3ecf62=_0x15edd7[_0x3c1ecb(0xc6)])==null?void 0x0:_0x3ecf62[_0x3c1ecb(0x11d)])==null?void 0x0:_0x332c32[_0x3c1ecb(0x181)])===_0x3c1ecb(0x17a);return _0x15edd7[_0x3c1ecb(0x170)]=_0x1b2bc7||!_0xf5c8ef||((_0x7783f3=_0x15edd7[_0x3c1ecb(0x174)])==null?void 0x0:_0x7783f3[_0x3c1ecb(0x100)])&&_0xf5c8ef['includes'](_0x15edd7['location']['hostname']),_0x15edd7[_0x3c1ecb(0x170)];}function J(_0x2557aa,_0x423880,_0x36d8ce,_0x35a679){var _0x3322d9=_0x560e48;_0x2557aa=_0x2557aa,_0x423880=_0x423880,_0x36d8ce=_0x36d8ce,_0x35a679=_0x35a679;let _0x2907e7=b(_0x2557aa),_0x1eaaf7=_0x2907e7[_0x3322d9(0x1a4)],_0x31f43a=_0x2907e7['timeStamp'];class _0x1f0266{constructor(){var _0x6c1b68=_0x3322d9;this[_0x6c1b68(0x145)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x2557aa[_0x6c1b68(0xdb)],this[_0x6c1b68(0x18c)]=_0x2557aa[_0x6c1b68(0x15a)],this[_0x6c1b68(0x1b0)]=Object[_0x6c1b68(0xc5)],this[_0x6c1b68(0xd6)]=Object[_0x6c1b68(0x15e)],this[_0x6c1b68(0x1a6)]=_0x2557aa[_0x6c1b68(0x108)],this[_0x6c1b68(0x10d)]=RegExp[_0x6c1b68(0xcd)][_0x6c1b68(0xc7)],this[_0x6c1b68(0xdc)]=Date['prototype']['toString'];}[_0x3322d9(0x147)](_0x1ad5fd,_0x1811d0,_0x186db8,_0x1dcb01){var _0xbd3b34=_0x3322d9,_0xb8d452=this,_0x274c9d=_0x186db8['autoExpand'];function _0x542f3f(_0xbf517c,_0xc8a4e,_0x21e1fc){var _0x3c63a6=_0x3e50;_0xc8a4e[_0x3c63a6(0xf9)]=_0x3c63a6(0x12a),_0xc8a4e['error']=_0xbf517c[_0x3c63a6(0x10e)],_0x4b8390=_0x21e1fc['node'][_0x3c63a6(0x119)],_0x21e1fc[_0x3c63a6(0x185)][_0x3c63a6(0x119)]=_0xc8a4e,_0xb8d452[_0x3c63a6(0x132)](_0xc8a4e,_0x21e1fc);}try{_0x186db8[_0xbd3b34(0x137)]++,_0x186db8[_0xbd3b34(0xc3)]&&_0x186db8['autoExpandPreviousObjects'][_0xbd3b34(0x191)](_0x1811d0);var _0x354573,_0x267679,_0x23ea9a,_0x4e5e2f,_0x57079d=[],_0x47737b=[],_0x4b72aa,_0x595c53=this[_0xbd3b34(0x18f)](_0x1811d0),_0x4b8043=_0x595c53===_0xbd3b34(0x152),_0x38398f=!0x1,_0x4ab2f3=_0x595c53===_0xbd3b34(0x105),_0x5cc20e=this[_0xbd3b34(0x1a5)](_0x595c53),_0xb0b990=this['_isPrimitiveWrapperType'](_0x595c53),_0x381031=_0x5cc20e||_0xb0b990,_0x777bd0={},_0x2aca55=0x0,_0x471aec=!0x1,_0x4b8390,_0x11b1e9=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x186db8['depth']){if(_0x4b8043){if(_0x267679=_0x1811d0['length'],_0x267679>_0x186db8['elements']){for(_0x23ea9a=0x0,_0x4e5e2f=_0x186db8['elements'],_0x354573=_0x23ea9a;_0x354573<_0x4e5e2f;_0x354573++)_0x47737b[_0xbd3b34(0x191)](_0xb8d452[_0xbd3b34(0x18d)](_0x57079d,_0x1811d0,_0x595c53,_0x354573,_0x186db8));_0x1ad5fd['cappedElements']=!0x0;}else{for(_0x23ea9a=0x0,_0x4e5e2f=_0x267679,_0x354573=_0x23ea9a;_0x354573<_0x4e5e2f;_0x354573++)_0x47737b['push'](_0xb8d452[_0xbd3b34(0x18d)](_0x57079d,_0x1811d0,_0x595c53,_0x354573,_0x186db8));}_0x186db8[_0xbd3b34(0xe7)]+=_0x47737b[_0xbd3b34(0x168)];}if(!(_0x595c53===_0xbd3b34(0x136)||_0x595c53==='undefined')&&!_0x5cc20e&&_0x595c53!==_0xbd3b34(0x180)&&_0x595c53!==_0xbd3b34(0x1a7)&&_0x595c53!==_0xbd3b34(0xfa)){var _0x374945=_0x1dcb01['props']||_0x186db8[_0xbd3b34(0xe9)];if(this[_0xbd3b34(0xd8)](_0x1811d0)?(_0x354573=0x0,_0x1811d0['forEach'](function(_0x2baef4){var _0x10dc5f=_0xbd3b34;if(_0x2aca55++,_0x186db8[_0x10dc5f(0xe7)]++,_0x2aca55>_0x374945){_0x471aec=!0x0;return;}if(!_0x186db8['isExpressionToEvaluate']&&_0x186db8[_0x10dc5f(0xc3)]&&_0x186db8['autoExpandPropertyCount']>_0x186db8['autoExpandLimit']){_0x471aec=!0x0;return;}_0x47737b[_0x10dc5f(0x191)](_0xb8d452[_0x10dc5f(0x18d)](_0x57079d,_0x1811d0,_0x10dc5f(0xe8),_0x354573++,_0x186db8,function(_0x410572){return function(){return _0x410572;};}(_0x2baef4)));})):this[_0xbd3b34(0x19e)](_0x1811d0)&&_0x1811d0[_0xbd3b34(0x106)](function(_0xd216a,_0x28c16c){var _0x56cb11=_0xbd3b34;if(_0x2aca55++,_0x186db8['autoExpandPropertyCount']++,_0x2aca55>_0x374945){_0x471aec=!0x0;return;}if(!_0x186db8[_0x56cb11(0x151)]&&_0x186db8[_0x56cb11(0xc3)]&&_0x186db8['autoExpandPropertyCount']>_0x186db8[_0x56cb11(0xec)]){_0x471aec=!0x0;return;}var _0x38dc34=_0x28c16c[_0x56cb11(0xc7)]();_0x38dc34[_0x56cb11(0x168)]>0x64&&(_0x38dc34=_0x38dc34[_0x56cb11(0x1af)](0x0,0x64)+_0x56cb11(0x128)),_0x47737b[_0x56cb11(0x191)](_0xb8d452[_0x56cb11(0x18d)](_0x57079d,_0x1811d0,'Map',_0x38dc34,_0x186db8,function(_0x726c88){return function(){return _0x726c88;};}(_0xd216a)));}),!_0x38398f){try{for(_0x4b72aa in _0x1811d0)if(!(_0x4b8043&&_0x11b1e9[_0xbd3b34(0xf6)](_0x4b72aa))&&!this[_0xbd3b34(0x1ac)](_0x1811d0,_0x4b72aa,_0x186db8)){if(_0x2aca55++,_0x186db8[_0xbd3b34(0xe7)]++,_0x2aca55>_0x374945){_0x471aec=!0x0;break;}if(!_0x186db8['isExpressionToEvaluate']&&_0x186db8[_0xbd3b34(0xc3)]&&_0x186db8[_0xbd3b34(0xe7)]>_0x186db8[_0xbd3b34(0xec)]){_0x471aec=!0x0;break;}_0x47737b[_0xbd3b34(0x191)](_0xb8d452[_0xbd3b34(0x117)](_0x57079d,_0x777bd0,_0x1811d0,_0x595c53,_0x4b72aa,_0x186db8));}}catch{}if(_0x777bd0[_0xbd3b34(0xf2)]=!0x0,_0x4ab2f3&&(_0x777bd0[_0xbd3b34(0x178)]=!0x0),!_0x471aec){var _0x30a48f=[][_0xbd3b34(0xd2)](this[_0xbd3b34(0xd6)](_0x1811d0))[_0xbd3b34(0xd2)](this[_0xbd3b34(0x120)](_0x1811d0));for(_0x354573=0x0,_0x267679=_0x30a48f['length'];_0x354573<_0x267679;_0x354573++)if(_0x4b72aa=_0x30a48f[_0x354573],!(_0x4b8043&&_0x11b1e9['test'](_0x4b72aa[_0xbd3b34(0xc7)]()))&&!this[_0xbd3b34(0x1ac)](_0x1811d0,_0x4b72aa,_0x186db8)&&!_0x777bd0[_0xbd3b34(0x143)+_0x4b72aa['toString']()]){if(_0x2aca55++,_0x186db8['autoExpandPropertyCount']++,_0x2aca55>_0x374945){_0x471aec=!0x0;break;}if(!_0x186db8[_0xbd3b34(0x151)]&&_0x186db8[_0xbd3b34(0xc3)]&&_0x186db8[_0xbd3b34(0xe7)]>_0x186db8[_0xbd3b34(0xec)]){_0x471aec=!0x0;break;}_0x47737b['push'](_0xb8d452[_0xbd3b34(0x117)](_0x57079d,_0x777bd0,_0x1811d0,_0x595c53,_0x4b72aa,_0x186db8));}}}}}if(_0x1ad5fd[_0xbd3b34(0xf9)]=_0x595c53,_0x381031?(_0x1ad5fd[_0xbd3b34(0x186)]=_0x1811d0['valueOf'](),this['_capIfString'](_0x595c53,_0x1ad5fd,_0x186db8,_0x1dcb01)):_0x595c53===_0xbd3b34(0x115)?_0x1ad5fd['value']=this[_0xbd3b34(0xdc)][_0xbd3b34(0x172)](_0x1811d0):_0x595c53===_0xbd3b34(0xfa)?_0x1ad5fd[_0xbd3b34(0x186)]=_0x1811d0[_0xbd3b34(0xc7)]():_0x595c53===_0xbd3b34(0x15d)?_0x1ad5fd['value']=this[_0xbd3b34(0x10d)][_0xbd3b34(0x172)](_0x1811d0):_0x595c53===_0xbd3b34(0x17e)&&this[_0xbd3b34(0x1a6)]?_0x1ad5fd[_0xbd3b34(0x186)]=this['_Symbol'][_0xbd3b34(0xcd)][_0xbd3b34(0xc7)][_0xbd3b34(0x172)](_0x1811d0):!_0x186db8[_0xbd3b34(0x165)]&&!(_0x595c53===_0xbd3b34(0x136)||_0x595c53===_0xbd3b34(0xdb))&&(delete _0x1ad5fd[_0xbd3b34(0x186)],_0x1ad5fd[_0xbd3b34(0x1b4)]=!0x0),_0x471aec&&(_0x1ad5fd[_0xbd3b34(0x19c)]=!0x0),_0x4b8390=_0x186db8[_0xbd3b34(0x185)][_0xbd3b34(0x119)],_0x186db8[_0xbd3b34(0x185)][_0xbd3b34(0x119)]=_0x1ad5fd,this[_0xbd3b34(0x132)](_0x1ad5fd,_0x186db8),_0x47737b[_0xbd3b34(0x168)]){for(_0x354573=0x0,_0x267679=_0x47737b['length'];_0x354573<_0x267679;_0x354573++)_0x47737b[_0x354573](_0x354573);}_0x57079d[_0xbd3b34(0x168)]&&(_0x1ad5fd['props']=_0x57079d);}catch(_0x2da7b6){_0x542f3f(_0x2da7b6,_0x1ad5fd,_0x186db8);}return this['_additionalMetadata'](_0x1811d0,_0x1ad5fd),this[_0xbd3b34(0xdd)](_0x1ad5fd,_0x186db8),_0x186db8[_0xbd3b34(0x185)][_0xbd3b34(0x119)]=_0x4b8390,_0x186db8[_0xbd3b34(0x137)]--,_0x186db8[_0xbd3b34(0xc3)]=_0x274c9d,_0x186db8[_0xbd3b34(0xc3)]&&_0x186db8[_0xbd3b34(0x10a)][_0xbd3b34(0x104)](),_0x1ad5fd;}[_0x3322d9(0x120)](_0x5551be){var _0x43d62d=_0x3322d9;return Object[_0x43d62d(0xf8)]?Object[_0x43d62d(0xf8)](_0x5551be):[];}['_isSet'](_0x32c753){var _0x59a7f2=_0x3322d9;return!!(_0x32c753&&_0x2557aa[_0x59a7f2(0xe8)]&&this[_0x59a7f2(0x140)](_0x32c753)==='[object\\x20Set]'&&_0x32c753['forEach']);}[_0x3322d9(0x1ac)](_0xa5f916,_0x2bd029,_0x36ae63){var _0x5864c7=_0x3322d9;return _0x36ae63[_0x5864c7(0xfd)]?typeof _0xa5f916[_0x2bd029]==_0x5864c7(0x105):!0x1;}[_0x3322d9(0x18f)](_0x4e8a97){var _0x2c97e4=_0x3322d9,_0x2bcba5='';return _0x2bcba5=typeof _0x4e8a97,_0x2bcba5===_0x2c97e4(0x11c)?this[_0x2c97e4(0x140)](_0x4e8a97)===_0x2c97e4(0x17f)?_0x2bcba5=_0x2c97e4(0x152):this[_0x2c97e4(0x140)](_0x4e8a97)===_0x2c97e4(0x196)?_0x2bcba5='date':this['_objectToString'](_0x4e8a97)===_0x2c97e4(0x1a1)?_0x2bcba5=_0x2c97e4(0xfa):_0x4e8a97===null?_0x2bcba5=_0x2c97e4(0x136):_0x4e8a97[_0x2c97e4(0x19d)]&&(_0x2bcba5=_0x4e8a97[_0x2c97e4(0x19d)][_0x2c97e4(0x133)]||_0x2bcba5):_0x2bcba5===_0x2c97e4(0xdb)&&this[_0x2c97e4(0x18c)]&&_0x4e8a97 instanceof this[_0x2c97e4(0x18c)]&&(_0x2bcba5=_0x2c97e4(0x15a)),_0x2bcba5;}[_0x3322d9(0x140)](_0x198720){var _0xf1ebd7=_0x3322d9;return Object[_0xf1ebd7(0xcd)][_0xf1ebd7(0xc7)][_0xf1ebd7(0x172)](_0x198720);}[_0x3322d9(0x1a5)](_0x47c265){var _0x372c8f=_0x3322d9;return _0x47c265==='boolean'||_0x47c265==='string'||_0x47c265===_0x372c8f(0x1a9);}[_0x3322d9(0x198)](_0x10391c){var _0x40db72=_0x3322d9;return _0x10391c===_0x40db72(0xc9)||_0x10391c===_0x40db72(0x180)||_0x10391c==='Number';}[_0x3322d9(0x18d)](_0x5ed974,_0x3d8ae0,_0x6fa3e4,_0x33d53d,_0x1699a6,_0x30ba47){var _0x14614a=this;return function(_0x4ab9df){var _0xd05e04=_0x3e50,_0x21b092=_0x1699a6[_0xd05e04(0x185)]['current'],_0x5003ee=_0x1699a6['node'][_0xd05e04(0x14f)],_0x247234=_0x1699a6[_0xd05e04(0x185)][_0xd05e04(0x182)];_0x1699a6[_0xd05e04(0x185)]['parent']=_0x21b092,_0x1699a6[_0xd05e04(0x185)][_0xd05e04(0x14f)]=typeof _0x33d53d==_0xd05e04(0x1a9)?_0x33d53d:_0x4ab9df,_0x5ed974[_0xd05e04(0x191)](_0x14614a[_0xd05e04(0xe5)](_0x3d8ae0,_0x6fa3e4,_0x33d53d,_0x1699a6,_0x30ba47)),_0x1699a6[_0xd05e04(0x185)][_0xd05e04(0x182)]=_0x247234,_0x1699a6[_0xd05e04(0x185)][_0xd05e04(0x14f)]=_0x5003ee;};}[_0x3322d9(0x117)](_0x43a33f,_0xe6b268,_0x18d113,_0x1d7c1f,_0x1645d7,_0x5677eb,_0x3d8948){var _0x4468fe=_0x3322d9,_0x4a2d7d=this;return _0xe6b268[_0x4468fe(0x143)+_0x1645d7[_0x4468fe(0xc7)]()]=!0x0,function(_0xc663a4){var _0x132773=_0x4468fe,_0x5049fa=_0x5677eb[_0x132773(0x185)][_0x132773(0x119)],_0x27765e=_0x5677eb['node']['index'],_0x5a136e=_0x5677eb[_0x132773(0x185)][_0x132773(0x182)];_0x5677eb[_0x132773(0x185)]['parent']=_0x5049fa,_0x5677eb[_0x132773(0x185)][_0x132773(0x14f)]=_0xc663a4,_0x43a33f['push'](_0x4a2d7d[_0x132773(0xe5)](_0x18d113,_0x1d7c1f,_0x1645d7,_0x5677eb,_0x3d8948)),_0x5677eb[_0x132773(0x185)][_0x132773(0x182)]=_0x5a136e,_0x5677eb[_0x132773(0x185)][_0x132773(0x14f)]=_0x27765e;};}[_0x3322d9(0xe5)](_0x72abe4,_0x121395,_0x11d0b0,_0x596223,_0x373716){var _0x56537d=_0x3322d9,_0x3bc013=this;_0x373716||(_0x373716=function(_0x254313,_0x54008c){return _0x254313[_0x54008c];});var _0x5c82b0=_0x11d0b0[_0x56537d(0xc7)](),_0x243d4d=_0x596223['expressionsToEvaluate']||{},_0xaec68e=_0x596223[_0x56537d(0x165)],_0x3d4fab=_0x596223[_0x56537d(0x151)];try{var _0x4aa2bc=this[_0x56537d(0x19e)](_0x72abe4),_0x43593a=_0x5c82b0;_0x4aa2bc&&_0x43593a[0x0]==='\\x27'&&(_0x43593a=_0x43593a['substr'](0x1,_0x43593a[_0x56537d(0x168)]-0x2));var _0x446fc8=_0x596223['expressionsToEvaluate']=_0x243d4d[_0x56537d(0x143)+_0x43593a];_0x446fc8&&(_0x596223[_0x56537d(0x165)]=_0x596223[_0x56537d(0x165)]+0x1),_0x596223[_0x56537d(0x151)]=!!_0x446fc8;var _0x54b66d=typeof _0x11d0b0==_0x56537d(0x17e),_0x49d138={'name':_0x54b66d||_0x4aa2bc?_0x5c82b0:this[_0x56537d(0x13c)](_0x5c82b0)};if(_0x54b66d&&(_0x49d138['symbol']=!0x0),!(_0x121395===_0x56537d(0x152)||_0x121395===_0x56537d(0x14c))){var _0x9a0207=this[_0x56537d(0x1b0)](_0x72abe4,_0x11d0b0);if(_0x9a0207&&(_0x9a0207['set']&&(_0x49d138['setter']=!0x0),_0x9a0207[_0x56537d(0x116)]&&!_0x446fc8&&!_0x596223['resolveGetters']))return _0x49d138[_0x56537d(0xf0)]=!0x0,this['_processTreeNodeResult'](_0x49d138,_0x596223),_0x49d138;}var _0x6fa2cc;try{_0x6fa2cc=_0x373716(_0x72abe4,_0x11d0b0);}catch(_0x3f2874){return _0x49d138={'name':_0x5c82b0,'type':'unknown','error':_0x3f2874[_0x56537d(0x10e)]},this[_0x56537d(0x1aa)](_0x49d138,_0x596223),_0x49d138;}var _0x442004=this['_type'](_0x6fa2cc),_0x382d00=this['_isPrimitiveType'](_0x442004);if(_0x49d138[_0x56537d(0xf9)]=_0x442004,_0x382d00)this['_processTreeNodeResult'](_0x49d138,_0x596223,_0x6fa2cc,function(){var _0x4a811c=_0x56537d;_0x49d138['value']=_0x6fa2cc['valueOf'](),!_0x446fc8&&_0x3bc013[_0x4a811c(0xcb)](_0x442004,_0x49d138,_0x596223,{});});else{var _0x55c7e1=_0x596223['autoExpand']&&_0x596223['level']<_0x596223[_0x56537d(0x16a)]&&_0x596223[_0x56537d(0x10a)][_0x56537d(0x1b6)](_0x6fa2cc)<0x0&&_0x442004!==_0x56537d(0x105)&&_0x596223['autoExpandPropertyCount']<_0x596223[_0x56537d(0xec)];_0x55c7e1||_0x596223[_0x56537d(0x137)]<_0xaec68e||_0x446fc8?(this[_0x56537d(0x147)](_0x49d138,_0x6fa2cc,_0x596223,_0x446fc8||{}),this[_0x56537d(0x17c)](_0x6fa2cc,_0x49d138)):this[_0x56537d(0x1aa)](_0x49d138,_0x596223,_0x6fa2cc,function(){var _0x3ea64a=_0x56537d;_0x442004===_0x3ea64a(0x136)||_0x442004===_0x3ea64a(0xdb)||(delete _0x49d138[_0x3ea64a(0x186)],_0x49d138[_0x3ea64a(0x1b4)]=!0x0);});}return _0x49d138;}finally{_0x596223[_0x56537d(0x144)]=_0x243d4d,_0x596223[_0x56537d(0x165)]=_0xaec68e,_0x596223[_0x56537d(0x151)]=_0x3d4fab;}}[_0x3322d9(0xcb)](_0x237fd3,_0x4cadd6,_0xfacc8c,_0x476f61){var _0x2dd2da=_0x3322d9,_0x22f539=_0x476f61[_0x2dd2da(0x173)]||_0xfacc8c[_0x2dd2da(0x173)];if((_0x237fd3===_0x2dd2da(0x124)||_0x237fd3==='String')&&_0x4cadd6[_0x2dd2da(0x186)]){let _0x271b9f=_0x4cadd6[_0x2dd2da(0x186)][_0x2dd2da(0x168)];_0xfacc8c[_0x2dd2da(0x10f)]+=_0x271b9f,_0xfacc8c[_0x2dd2da(0x10f)]>_0xfacc8c[_0x2dd2da(0xf5)]?(_0x4cadd6['capped']='',delete _0x4cadd6[_0x2dd2da(0x186)]):_0x271b9f>_0x22f539&&(_0x4cadd6['capped']=_0x4cadd6[_0x2dd2da(0x186)]['substr'](0x0,_0x22f539),delete _0x4cadd6[_0x2dd2da(0x186)]);}}[_0x3322d9(0x19e)](_0x326065){var _0x580524=_0x3322d9;return!!(_0x326065&&_0x2557aa['Map']&&this[_0x580524(0x140)](_0x326065)===_0x580524(0xda)&&_0x326065[_0x580524(0x106)]);}[_0x3322d9(0x13c)](_0x5c85eb){var _0x5a75f7=_0x3322d9;if(_0x5c85eb[_0x5a75f7(0x122)](/^\\d+$/))return _0x5c85eb;var _0x4721af;try{_0x4721af=JSON['stringify'](''+_0x5c85eb);}catch{_0x4721af='\\x22'+this[_0x5a75f7(0x140)](_0x5c85eb)+'\\x22';}return _0x4721af[_0x5a75f7(0x122)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x4721af=_0x4721af[_0x5a75f7(0x102)](0x1,_0x4721af[_0x5a75f7(0x168)]-0x2):_0x4721af=_0x4721af[_0x5a75f7(0x16e)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x4721af;}[_0x3322d9(0x1aa)](_0x3ba276,_0x48e9ec,_0x281862,_0xaa021e){var _0x421a4d=_0x3322d9;this[_0x421a4d(0x132)](_0x3ba276,_0x48e9ec),_0xaa021e&&_0xaa021e(),this['_additionalMetadata'](_0x281862,_0x3ba276),this['_treeNodePropertiesAfterFullValue'](_0x3ba276,_0x48e9ec);}['_treeNodePropertiesBeforeFullValue'](_0x77343a,_0x2a9bd1){var _0x363175=_0x3322d9;this['_setNodeId'](_0x77343a,_0x2a9bd1),this[_0x363175(0xf3)](_0x77343a,_0x2a9bd1),this[_0x363175(0x142)](_0x77343a,_0x2a9bd1),this[_0x363175(0x1a8)](_0x77343a,_0x2a9bd1);}[_0x3322d9(0x189)](_0x22a9de,_0x16da7c){}[_0x3322d9(0xf3)](_0x6b28ae,_0x585244){}[_0x3322d9(0x12c)](_0x452603,_0x44ed08){}[_0x3322d9(0x15c)](_0x27883d){return _0x27883d===this['_undefined'];}[_0x3322d9(0xdd)](_0x419abf,_0xd7433f){var _0x11ec97=_0x3322d9;this[_0x11ec97(0x12c)](_0x419abf,_0xd7433f),this[_0x11ec97(0x11f)](_0x419abf),_0xd7433f['sortProps']&&this[_0x11ec97(0x1a0)](_0x419abf),this[_0x11ec97(0x15f)](_0x419abf,_0xd7433f),this[_0x11ec97(0x19a)](_0x419abf,_0xd7433f),this[_0x11ec97(0xe6)](_0x419abf);}[_0x3322d9(0x17c)](_0x46c65f,_0x4f5e05){var _0x4470b8=_0x3322d9;let _0x21f292;try{_0x2557aa['console']&&(_0x21f292=_0x2557aa[_0x4470b8(0x148)][_0x4470b8(0x16b)],_0x2557aa[_0x4470b8(0x148)]['error']=function(){}),_0x46c65f&&typeof _0x46c65f[_0x4470b8(0x168)]=='number'&&(_0x4f5e05['length']=_0x46c65f[_0x4470b8(0x168)]);}catch{}finally{_0x21f292&&(_0x2557aa[_0x4470b8(0x148)]['error']=_0x21f292);}if(_0x4f5e05[_0x4470b8(0xf9)]===_0x4470b8(0x1a9)||_0x4f5e05[_0x4470b8(0xf9)]==='Number'){if(isNaN(_0x4f5e05[_0x4470b8(0x186)]))_0x4f5e05[_0x4470b8(0x146)]=!0x0,delete _0x4f5e05[_0x4470b8(0x186)];else switch(_0x4f5e05[_0x4470b8(0x186)]){case Number[_0x4470b8(0x1b3)]:_0x4f5e05[_0x4470b8(0xd1)]=!0x0,delete _0x4f5e05['value'];break;case Number[_0x4470b8(0xd7)]:_0x4f5e05[_0x4470b8(0x199)]=!0x0,delete _0x4f5e05['value'];break;case 0x0:this[_0x4470b8(0xd4)](_0x4f5e05[_0x4470b8(0x186)])&&(_0x4f5e05[_0x4470b8(0x197)]=!0x0);break;}}else _0x4f5e05[_0x4470b8(0xf9)]===_0x4470b8(0x105)&&typeof _0x46c65f[_0x4470b8(0x133)]==_0x4470b8(0x124)&&_0x46c65f['name']&&_0x4f5e05[_0x4470b8(0x133)]&&_0x46c65f[_0x4470b8(0x133)]!==_0x4f5e05[_0x4470b8(0x133)]&&(_0x4f5e05[_0x4470b8(0x158)]=_0x46c65f['name']);}['_isNegativeZero'](_0x10f796){return 0x1/_0x10f796===Number['NEGATIVE_INFINITY'];}[_0x3322d9(0x1a0)](_0x18584f){var _0x2db066=_0x3322d9;!_0x18584f[_0x2db066(0xe9)]||!_0x18584f[_0x2db066(0xe9)]['length']||_0x18584f[_0x2db066(0xf9)]===_0x2db066(0x152)||_0x18584f[_0x2db066(0xf9)]==='Map'||_0x18584f[_0x2db066(0xf9)]==='Set'||_0x18584f[_0x2db066(0xe9)][_0x2db066(0xf7)](function(_0x26371f,_0x37047c){var _0x3aa159=_0x2db066,_0x28caac=_0x26371f['name'][_0x3aa159(0x1a3)](),_0x52b72d=_0x37047c['name'][_0x3aa159(0x1a3)]();return _0x28caac<_0x52b72d?-0x1:_0x28caac>_0x52b72d?0x1:0x0;});}[_0x3322d9(0x15f)](_0x4c8c1d,_0x261ebb){var _0x3733b8=_0x3322d9;if(!(_0x261ebb[_0x3733b8(0xfd)]||!_0x4c8c1d[_0x3733b8(0xe9)]||!_0x4c8c1d[_0x3733b8(0xe9)][_0x3733b8(0x168)])){for(var _0x2a0025=[],_0x1108fe=[],_0x440c8e=0x0,_0x11edd7=_0x4c8c1d[_0x3733b8(0xe9)][_0x3733b8(0x168)];_0x440c8e<_0x11edd7;_0x440c8e++){var _0x393f45=_0x4c8c1d[_0x3733b8(0xe9)][_0x440c8e];_0x393f45[_0x3733b8(0xf9)]===_0x3733b8(0x105)?_0x2a0025[_0x3733b8(0x191)](_0x393f45):_0x1108fe[_0x3733b8(0x191)](_0x393f45);}if(!(!_0x1108fe[_0x3733b8(0x168)]||_0x2a0025[_0x3733b8(0x168)]<=0x1)){_0x4c8c1d[_0x3733b8(0xe9)]=_0x1108fe;var _0xb665b9={'functionsNode':!0x0,'props':_0x2a0025};this[_0x3733b8(0x189)](_0xb665b9,_0x261ebb),this[_0x3733b8(0x12c)](_0xb665b9,_0x261ebb),this[_0x3733b8(0x11f)](_0xb665b9),this[_0x3733b8(0x1a8)](_0xb665b9,_0x261ebb),_0xb665b9['id']+='\\x20f',_0x4c8c1d['props'][_0x3733b8(0x12b)](_0xb665b9);}}}[_0x3322d9(0x19a)](_0x434a50,_0x20b75c){}[_0x3322d9(0x11f)](_0x49ed27){}['_isArray'](_0x283e53){var _0x533973=_0x3322d9;return Array[_0x533973(0x1b1)](_0x283e53)||typeof _0x283e53=='object'&&this[_0x533973(0x140)](_0x283e53)==='[object\\x20Array]';}[_0x3322d9(0x1a8)](_0x1e4743,_0x3f2a10){}['_cleanNode'](_0xa872d0){var _0x3da817=_0x3322d9;delete _0xa872d0[_0x3da817(0xd0)],delete _0xa872d0['_hasSetOnItsPath'],delete _0xa872d0[_0x3da817(0x16d)];}[_0x3322d9(0x142)](_0x418778,_0x480d13){}}let _0xd45b36=new _0x1f0266(),_0x4612d4={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x19dd3f={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x244439(_0xed4e1c,_0x3b9707,_0x2af5e7,_0x27eda3,_0x2cd531,_0x1fedb8){var _0x3aca99=_0x3322d9;let _0x1474df,_0x52e619;try{_0x52e619=_0x31f43a(),_0x1474df=_0x36d8ce[_0x3b9707],!_0x1474df||_0x52e619-_0x1474df['ts']>0x1f4&&_0x1474df[_0x3aca99(0x15b)]&&_0x1474df[_0x3aca99(0x114)]/_0x1474df['count']<0x64?(_0x36d8ce[_0x3b9707]=_0x1474df={'count':0x0,'time':0x0,'ts':_0x52e619},_0x36d8ce[_0x3aca99(0x11e)]={}):_0x52e619-_0x36d8ce[_0x3aca99(0x11e)]['ts']>0x32&&_0x36d8ce[_0x3aca99(0x11e)][_0x3aca99(0x15b)]&&_0x36d8ce['hits']['time']/_0x36d8ce[_0x3aca99(0x11e)][_0x3aca99(0x15b)]<0x64&&(_0x36d8ce[_0x3aca99(0x11e)]={});let _0x38013c=[],_0x15ddde=_0x1474df['reduceLimits']||_0x36d8ce['hits'][_0x3aca99(0x12d)]?_0x19dd3f:_0x4612d4,_0x3a6068=_0xc0b1b3=>{var _0x5e740a=_0x3aca99;let _0x47b75e={};return _0x47b75e[_0x5e740a(0xe9)]=_0xc0b1b3[_0x5e740a(0xe9)],_0x47b75e[_0x5e740a(0x13a)]=_0xc0b1b3[_0x5e740a(0x13a)],_0x47b75e['strLength']=_0xc0b1b3['strLength'],_0x47b75e[_0x5e740a(0xf5)]=_0xc0b1b3[_0x5e740a(0xf5)],_0x47b75e[_0x5e740a(0xec)]=_0xc0b1b3[_0x5e740a(0xec)],_0x47b75e[_0x5e740a(0x16a)]=_0xc0b1b3['autoExpandMaxDepth'],_0x47b75e[_0x5e740a(0xeb)]=!0x1,_0x47b75e['noFunctions']=!_0x423880,_0x47b75e[_0x5e740a(0x165)]=0x1,_0x47b75e['level']=0x0,_0x47b75e[_0x5e740a(0x156)]=_0x5e740a(0x1b2),_0x47b75e['rootExpression']=_0x5e740a(0xe1),_0x47b75e[_0x5e740a(0xc3)]=!0x0,_0x47b75e[_0x5e740a(0x10a)]=[],_0x47b75e[_0x5e740a(0xe7)]=0x0,_0x47b75e[_0x5e740a(0x194)]=!0x0,_0x47b75e[_0x5e740a(0x10f)]=0x0,_0x47b75e[_0x5e740a(0x185)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x47b75e;};for(var _0x3ed975=0x0;_0x3ed975<_0x2cd531[_0x3aca99(0x168)];_0x3ed975++)_0x38013c['push'](_0xd45b36['serialize']({'timeNode':_0xed4e1c===_0x3aca99(0x114)||void 0x0},_0x2cd531[_0x3ed975],_0x3a6068(_0x15ddde),{}));if(_0xed4e1c===_0x3aca99(0xde)){let _0x193af7=Error[_0x3aca99(0xfe)];try{Error[_0x3aca99(0xfe)]=0x1/0x0,_0x38013c[_0x3aca99(0x191)](_0xd45b36['serialize']({'stackNode':!0x0},new Error()[_0x3aca99(0x13b)],_0x3a6068(_0x15ddde),{'strLength':0x1/0x0}));}finally{Error[_0x3aca99(0xfe)]=_0x193af7;}}return{'method':'log','version':_0x35a679,'args':[{'ts':_0x2af5e7,'session':_0x27eda3,'args':_0x38013c,'id':_0x3b9707,'context':_0x1fedb8}]};}catch(_0x38b9ef){return{'method':_0x3aca99(0x18a),'version':_0x35a679,'args':[{'ts':_0x2af5e7,'session':_0x27eda3,'args':[{'type':_0x3aca99(0x12a),'error':_0x38b9ef&&_0x38b9ef[_0x3aca99(0x10e)]}],'id':_0x3b9707,'context':_0x1fedb8}]};}finally{try{if(_0x1474df&&_0x52e619){let _0x1b70d4=_0x31f43a();_0x1474df[_0x3aca99(0x15b)]++,_0x1474df[_0x3aca99(0x114)]+=_0x1eaaf7(_0x52e619,_0x1b70d4),_0x1474df['ts']=_0x1b70d4,_0x36d8ce[_0x3aca99(0x11e)][_0x3aca99(0x15b)]++,_0x36d8ce[_0x3aca99(0x11e)]['time']+=_0x1eaaf7(_0x52e619,_0x1b70d4),_0x36d8ce['hits']['ts']=_0x1b70d4,(_0x1474df[_0x3aca99(0x15b)]>0x32||_0x1474df['time']>0x64)&&(_0x1474df['reduceLimits']=!0x0),(_0x36d8ce[_0x3aca99(0x11e)][_0x3aca99(0x15b)]>0x3e8||_0x36d8ce[_0x3aca99(0x11e)][_0x3aca99(0x114)]>0x12c)&&(_0x36d8ce[_0x3aca99(0x11e)][_0x3aca99(0x12d)]=!0x0);}}catch{}}}return _0x244439;}((_0x4cb770,_0x27ce62,_0x52a35c,_0x2360f4,_0x2cfe02,_0x2f1dc2,_0x1e5b0a,_0x1f0afd,_0x54ae84,_0x3a78e7,_0x50752c)=>{var _0x3cdb51=_0x560e48;if(_0x4cb770[_0x3cdb51(0x129)])return _0x4cb770[_0x3cdb51(0x129)];if(!H(_0x4cb770,_0x1f0afd,_0x2cfe02))return _0x4cb770[_0x3cdb51(0x129)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x4cb770[_0x3cdb51(0x129)];let _0x1fae43=b(_0x4cb770),_0x5dd878=_0x1fae43[_0x3cdb51(0x1a4)],_0xc0e73e=_0x1fae43[_0x3cdb51(0x123)],_0x1a35ea=_0x1fae43[_0x3cdb51(0xcf)],_0x2ae52e={'hits':{},'ts':{}},_0x280fea=J(_0x4cb770,_0x54ae84,_0x2ae52e,_0x2f1dc2),_0x1e0001=_0xb6871b=>{_0x2ae52e['ts'][_0xb6871b]=_0xc0e73e();},_0x538398=(_0x1f1838,_0x2b4d78)=>{var _0x53897f=_0x3cdb51;let _0x145a55=_0x2ae52e['ts'][_0x2b4d78];if(delete _0x2ae52e['ts'][_0x2b4d78],_0x145a55){let _0x31e200=_0x5dd878(_0x145a55,_0xc0e73e());_0x39a35e(_0x280fea(_0x53897f(0x114),_0x1f1838,_0x1a35ea(),_0x528950,[_0x31e200],_0x2b4d78));}},_0x14c314=_0x1f6788=>{var _0x57f013=_0x3cdb51,_0xa4efeb;return _0x2cfe02===_0x57f013(0x1ae)&&_0x4cb770[_0x57f013(0xff)]&&((_0xa4efeb=_0x1f6788==null?void 0x0:_0x1f6788[_0x57f013(0x130)])==null?void 0x0:_0xa4efeb[_0x57f013(0x168)])&&(_0x1f6788[_0x57f013(0x130)][0x0][_0x57f013(0xff)]=_0x4cb770[_0x57f013(0xff)]),_0x1f6788;};_0x4cb770[_0x3cdb51(0x129)]={'consoleLog':(_0x5dcea3,_0x3267af)=>{var _0xdac30a=_0x3cdb51;_0x4cb770[_0xdac30a(0x148)][_0xdac30a(0x18a)]['name']!==_0xdac30a(0x121)&&_0x39a35e(_0x280fea(_0xdac30a(0x18a),_0x5dcea3,_0x1a35ea(),_0x528950,_0x3267af));},'consoleTrace':(_0x1e0e11,_0x27059f)=>{var _0x5b54a0=_0x3cdb51;_0x4cb770[_0x5b54a0(0x148)][_0x5b54a0(0x18a)]['name']!==_0x5b54a0(0xf1)&&_0x39a35e(_0x14c314(_0x280fea(_0x5b54a0(0xde),_0x1e0e11,_0x1a35ea(),_0x528950,_0x27059f)));},'consoleTime':_0x1dc273=>{_0x1e0001(_0x1dc273);},'consoleTimeEnd':(_0x1437eb,_0x510218)=>{_0x538398(_0x510218,_0x1437eb);},'autoLog':(_0x50b548,_0x9f71a2)=>{var _0x4f1ba2=_0x3cdb51;_0x39a35e(_0x280fea(_0x4f1ba2(0x18a),_0x9f71a2,_0x1a35ea(),_0x528950,[_0x50b548]));},'autoLogMany':(_0xd5fcfa,_0x2a6d29)=>{var _0x55f01a=_0x3cdb51;_0x39a35e(_0x280fea(_0x55f01a(0x18a),_0xd5fcfa,_0x1a35ea(),_0x528950,_0x2a6d29));},'autoTrace':(_0x33a72a,_0xba7f3)=>{var _0x28cade=_0x3cdb51;_0x39a35e(_0x14c314(_0x280fea(_0x28cade(0xde),_0xba7f3,_0x1a35ea(),_0x528950,[_0x33a72a])));},'autoTraceMany':(_0x579272,_0x263f3a)=>{_0x39a35e(_0x14c314(_0x280fea('trace',_0x579272,_0x1a35ea(),_0x528950,_0x263f3a)));},'autoTime':(_0x2286c0,_0x595e47,_0x5b5a52)=>{_0x1e0001(_0x5b5a52);},'autoTimeEnd':(_0x4e8072,_0x1c1eba,_0x257a76)=>{_0x538398(_0x1c1eba,_0x257a76);},'coverage':_0x20dfb3=>{_0x39a35e({'method':'coverage','version':_0x2f1dc2,'args':[{'id':_0x20dfb3}]});}};let _0x39a35e=X(_0x4cb770,_0x27ce62,_0x52a35c,_0x2360f4,_0x2cfe02,_0x3a78e7,_0x50752c),_0x528950=_0x4cb770[_0x3cdb51(0xd9)];return _0x4cb770['_console_ninja'];})(globalThis,_0x560e48(0x190),_0x560e48(0x11a),_0x560e48(0x157),'webpack',_0x560e48(0x193),_0x560e48(0x179),_0x560e48(0x184),_0x560e48(0xea),'',_0x560e48(0x13e));function _0x1ab9(){var _0x12a1f0=['get','_addObjectProperty','12EvYyYu','current','49864','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','object','env','hits','_setNodeExpandableState','_getOwnPropertySymbols','disabledLog','match','timeStamp','string','https://tinyurl.com/37x8b79t','eventReceivedCallback','data','...','_console_ninja','unknown','unshift','_setNodeLabel','reduceLimits','_disposeWebsocket','bind','args','24euybJj','_treeNodePropertiesBeforeFullValue','name','ws://','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','null','level','onerror','_connecting','elements','stack','_propertyName','1320264jZmoAV','1','getPrototypeOf','_objectToString','_connected','_setNodeExpressionPath','_p_','expressionsToEvaluate','_keyStrRegExp','nan','serialize','console','angular','_allowedToConnectOnSend','_WebSocketClass','Error','_WebSocket','dockerizedApp','index','hasOwnProperty','isExpressionToEvaluate','array','parse','772BllCQX','unref','expId',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.336\\\\node_modules\",'funcName','path','HTMLAllCollection','count','_isUndefined','RegExp','getOwnPropertyNames','_addFunctionsNode','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','_allowedToSend','toUpperCase','catch','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','depth','onopen','versions','length','\\x20server','autoExpandMaxDepth','error','default','_hasMapOnItsPath','replace','nodeModules','_consoleNinjaAllowedToStart','then','call','strLength','location','_socket','getWebSocketClass','535576oiaMIp','_p_name','1722595622064','edge','_inBrowser','_additionalMetadata','2833590soaqzg','symbol','[object\\x20Array]','String','NEXT_RUNTIME','parent','performance',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'node','value','port','WebSocket','_setNodeId','log','\\x20browser','_HTMLAllCollection','_addProperty','_maxConnectAttemptCount','_type','127.0.0.1','push','create','1.0.0','resolveGetters','global','[object\\x20Date]','negativeZero','_isPrimitiveWrapperType','negativeInfinity','_addLoadNode','ws/index.js','cappedProps','constructor','_isMap','hrtime','_sortProps','[object\\x20BigInt]','remix','toLowerCase','elapsed','_isPrimitiveType','_Symbol','Buffer','_setNodePermissions','number','_processTreeNodeResult','onclose','_blacklistedProperty','stringify','next.js','slice','_getOwnPropertyDescriptor','isArray','root_exp_id','POSITIVE_INFINITY','capped','_ws','indexOf','enumerable','autoExpand','198kdzMbF','getOwnPropertyDescriptor','process','toString','_sendErrorMessage','Boolean','join','_capIfString','_inNextEdge','prototype','url','now','_hasSymbolPropertyOnItsPath','positiveInfinity','concat','warn','_isNegativeZero','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_getOwnPropertyNames','NEGATIVE_INFINITY','_isSet','_console_ninja_session','[object\\x20Map]','undefined','_dateToString','_treeNodePropertiesAfterFullValue','trace','map','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','root_exp','_attemptToReconnectShortly','3124580sESvSX','gateway.docker.internal','_property','_cleanNode','autoExpandPropertyCount','Set','props','','sortProps','autoExpandLimit','_webSocketErrorDocsLink','close','_connectToHostNow','getter','disabledTrace','_p_length','_setNodeQueryPath','astro','totalStrLength','test','sort','getOwnPropertySymbols','type','bigint','charAt','_reconnectTimeout','noFunctions','stackTraceLimit','origin','hostname','pathToFileURL','substr','_connectAttemptCount','pop','function','forEach','331933EglBwq','Symbol','host','autoExpandPreviousObjects','readyState','4492FLRyLI','_regExpToString','message','allStrLength','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','450295aJEDZJ','send','reload','time','date'];_0x1ab9=function(){return _0x12a1f0;};return _0x1ab9();}");
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