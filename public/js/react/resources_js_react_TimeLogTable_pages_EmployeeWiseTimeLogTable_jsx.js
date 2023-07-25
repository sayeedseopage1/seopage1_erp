"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_TimeLogTable_pages_EmployeeWiseTimeLogTable_jsx"],{

/***/ "./resources/js/react/TimeLogTable-backup/utils/converTime.js":
/*!********************************************************************!*\
  !*** ./resources/js/react/TimeLogTable-backup/utils/converTime.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertTime": () => (/* binding */ convertTime)
/* harmony export */ });
var convertTime = function convertTime(time) {
  if (time) {
    var hours = Math.floor(time / 60) || 0;
    var min = Math.floor(time % 60) || 0;
    var h = hours ? "".concat(hours < 10 ? "0".concat(hours) : hours, " hours") : "";
    return "".concat(h, " ").concat(min < 10 ? "0".concat(min) : min, " min");
  }
  return "0 min";
};

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/Button.jsx":
/*!***************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/Button.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _excluded = ["children", "type", "disabled", "className", "variant", "size", "onClick"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


var Button = function Button(_ref) {
  var children = _ref.children,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "button" : _ref$type,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'primary' : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "sm" : _ref$size,
    onClick = _ref.onClick,
    props = _objectWithoutProperties(_ref, _excluded);
  var classes = "cnx__btn cnx__btn_".concat(variant, " ").concat(disabled ? 'cnx__btn_disabled' : '', " cnx__btn_").concat(size, " ").concat(className);
  var handleOnClick = function handleOnClick(e) {
    onClick && onClick(e);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", _objectSpread(_objectSpread({
    type: "button",
    className: classes,
    disabled: disabled,
    onClick: handleOnClick
  }, props), {}, {
    children: children
  }));
};
Button.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node.isRequired) || (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string.isRequired) || (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array.isRequired),
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  variant: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf(['primary', 'secondary', 'tertiary', 'success']),
  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf(['sm', 'md', 'lg']),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  href: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/DragHeader.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/DragHeader.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/hooks/useDrag/useDrag.js");
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dnd */ "./node_modules/react-dnd/dist/hooks/useDrop/useDrop.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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




var TableDragAbleHeader = function TableDragAbleHeader(_ref) {
  var onSort = _ref.onSort,
    column = _ref.column,
    columns = _ref.columns,
    order = _ref.order,
    onDrop = _ref.onDrop,
    tableName = _ref.tableName,
    className = _ref.className;
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var reOrder = function reOrder(curr, target) {
    order.splice(order.indexOf(target === null || target === void 0 ? void 0 : target.id), 0, order.splice(order.indexOf(curr === null || curr === void 0 ? void 0 : curr.id), 1)[0]);
    return _toConsumableArray(order);
  };
  var _useDrag = (0,react_dnd__WEBPACK_IMPORTED_MODULE_3__.useDrag)({
      type: "column",
      item: {
        column: column
      },
      collect: function collect(monitor) {
        return {
          isDragging: !!monitor.isDragging()
        };
      }
    }),
    _useDrag2 = _slicedToArray(_useDrag, 2),
    isDragging = _useDrag2[0].isDragging,
    drag = _useDrag2[1];

  // drop
  var _useDrop = (0,react_dnd__WEBPACK_IMPORTED_MODULE_4__.useDrop)({
      accept: "column",
      hover: function hover(item, monitor) {
        var dragIndex = order.indexOf(item.column);
        var hoverIndex = order.indexOf(column);
      },
      drop: function drop(item, monitor) {
        if (item.column !== column) {
          var reOrderColumn = reOrder(item.column, column);
          onDrop(reOrderColumn);
          localStorage.setItem("projectWiseTableorder", JSON.stringify(reOrderColumn));
        }
      },
      collect: function collect(monitor) {
        return {
          isOver: !!monitor.isOver()
        };
      }
    }),
    _useDrop2 = _slicedToArray(_useDrop, 2),
    isOver = _useDrop2[0].isOver,
    drop = _useDrop2[1];
  drag(drop(ref));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
    ref: ref,
    className: "".concat(className, " sp1_drag_th sp1_drag_col_").concat(column === null || column === void 0 ? void 0 : column.id, " ").concat(isDragging ? '__dragging' : '', " ").concat(isOver ? '__drop-area' : ''),
    children: column.header
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableDragAbleHeader);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/EmployeeSessionTableColumn.jsx":
/*!***********************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/EmployeeSessionTableColumn.jsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeeSessionTableColumn": () => (/* binding */ EmployeeSessionTableColumn)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TimeLogTable_backup_utils_converTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../TimeLogTable-backup/utils/converTime */ "./resources/js/react/TimeLogTable-backup/utils/converTime.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var EmployeeSessionTableColumn = [{
  id: 'task_id',
  header: 'Task Name',
  className: '',
  group: true,
  sorted: false,
  cell: function cell(_ref) {
    var row = _ref.row,
      rowSpan = _ref.rowSpan,
      className = _ref.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border ".concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        href: "/account/tasks/".concat(row === null || row === void 0 ? void 0 : row.task_id),
        children: row === null || row === void 0 ? void 0 : row.task_name
      })
    });
  }
}, {
  id: 'task_details',
  header: 'Session Details',
  className: '',
  group: true,
  sorted: false,
  cell: function cell(_ref2) {
    var row = _ref2.row,
      data = _ref2.data,
      rowSpan = _ref2.rowSpan,
      className = _ref2.className;
    var totalSession = lodash__WEBPACK_IMPORTED_MODULE_0___default().size(data);
    var totalLogTime = lodash__WEBPACK_IMPORTED_MODULE_0___default().sumBy(data, function (d) {
      return Number(d['total_minutes']);
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border ".concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: ["Total Session: ", totalSession, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), "Total Session Duration: ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), " ", (0,_TimeLogTable_backup_utils_converTime__WEBPACK_IMPORTED_MODULE_1__.convertTime)(totalLogTime)]
    });
  }
}, {
  id: 'session_duration',
  header: 'Session Duration',
  className: '',
  group: false,
  sorted: false,
  cell: function cell(_ref3) {
    var row = _ref3.row,
      className = _ref3.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: (0,_TimeLogTable_backup_utils_converTime__WEBPACK_IMPORTED_MODULE_1__.convertTime)(row === null || row === void 0 ? void 0 : row.total_minutes)
    });
  }
}, {
  id: 'ttw_on_this_project',
  header: '(TTW) On This Project',
  className: '',
  group: true,
  sorted: false,
  cell: function cell(_ref4) {
    var row = _ref4.row,
      rowSpan = _ref4.rowSpan,
      className = _ref4.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border ".concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: (0,_TimeLogTable_backup_utils_converTime__WEBPACK_IMPORTED_MODULE_1__.convertTime)(row === null || row === void 0 ? void 0 : row.project_total_time_log)
    });
  }
}, {
  id: 'total_tracked_time_td',
  header: 'Total Tracked Time (TD)',
  className: '',
  group: false,
  sorted: false,
  cell: function cell(_ref5) {
    var row = _ref5.row,
      data = _ref5.data,
      index = _ref5.index,
      className = _ref5.className;
    var sum = lodash__WEBPACK_IMPORTED_MODULE_0___default().sumBy(lodash__WEBPACK_IMPORTED_MODULE_0___default().slice(data, 0, index + 1), function (d) {
      return Number(d['total_minutes']);
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: (0,_TimeLogTable_backup_utils_converTime__WEBPACK_IMPORTED_MODULE_1__.convertTime)(sum)
    });
  }
}, {
  id: 'start_time',
  header: 'Start Time',
  className: '',
  group: false,
  sorted: false,
  cell: function cell(_ref6) {
    var row = _ref6.row,
      className = _ref6.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
      className: className,
      children: [dayjs__WEBPACK_IMPORTED_MODULE_2___default()(row === null || row === void 0 ? void 0 : row.start_time).format('MMM DD, YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_2___default()(row === null || row === void 0 ? void 0 : row.start_time).format('hh:mm A')]
    });
  }
}, {
  id: 'end_time',
  header: 'End Time',
  className: '',
  group: false,
  sorted: false,
  cell: function cell(_ref7) {
    var row = _ref7.row,
      className = _ref7.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
      className: className,
      children: [dayjs__WEBPACK_IMPORTED_MODULE_2___default()(row === null || row === void 0 ? void 0 : row.end_time).format('MMM DD, YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_2___default()(row === null || row === void 0 ? void 0 : row.end_time).format('hh:mm A')]
    });
  }
}, {
  id: 'task_status',
  header: 'Task Status',
  className: '',
  group: false,
  sorted: false,
  cell: function cell(_ref8) {
    var row = _ref8.row,
      className = _ref8.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "badge text-white",
        style: {
          background: row === null || row === void 0 ? void 0 : row.tasks_color_code
        },
        children: row === null || row === void 0 ? void 0 : row.tasks_status
      })
    });
  }
}];

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/EmployeeTableColumn.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/EmployeeTableColumn.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeeTableColumn": () => (/* binding */ EmployeeTableColumn)
/* harmony export */ });
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var _EmployeeTrackTimeButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmployeeTrackTimeButton */ "./resources/js/react/TimeLogTable/components/EmployeeTrackTimeButton.jsx");
/* harmony import */ var _UserRender__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserRender */ "./resources/js/react/TimeLogTable/components/UserRender.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var EmployeeTableColumn = [{
  id: 'employee_id',
  header: 'Employee Name',
  className: '',
  sorted: false,
  group: true,
  sortAccessor: '',
  cell: function cell(_ref) {
    var row = _ref.row,
      col = _ref.col,
      className = _ref.className,
      rowSpan = _ref.rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border ".concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UserRender__WEBPACK_IMPORTED_MODULE_2__["default"], {
        name: row === null || row === void 0 ? void 0 : row.employee_name,
        profileUrl: "/account/employees/".concat(row === null || row === void 0 ? void 0 : row.employee_id),
        image: row === null || row === void 0 ? void 0 : row.employee_image,
        role: row === null || row === void 0 ? void 0 : row.employee_designation,
        id: row === null || row === void 0 ? void 0 : row.employee_id
      })
    });
  }
}, {
  id: 'project_id',
  header: 'Project Name',
  className: '',
  sorted: false,
  cell: function cell(_ref2) {
    var row = _ref2.row,
      className = _ref2.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        href: "/account/projects/".concat(row === null || row === void 0 ? void 0 : row.project_id),
        children: row === null || row === void 0 ? void 0 : row.project_name
      })
    });
  }
}, {
  id: 'client_id',
  header: 'Client Name',
  className: '',
  sorted: false,
  sortAccessor: 'employee_id',
  cell: function cell(_ref3) {
    var row = _ref3.row,
      className = _ref3.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UserRender__WEBPACK_IMPORTED_MODULE_2__["default"], {
        name: row === null || row === void 0 ? void 0 : row.client_name,
        profileUrl: "/account/clients/".concat(row === null || row === void 0 ? void 0 : row.client_id),
        image: row === null || row === void 0 ? void 0 : row.client_image,
        role: "Freelancer.com",
        roleLink: row === null || row === void 0 ? void 0 : row.client_from,
        id: row === null || row === void 0 ? void 0 : row.client_id
      })
    });
  }
}, {
  id: 'pm_id',
  header: 'Project Manager',
  className: '',
  sorted: false,
  cell: function cell(_ref4) {
    var row = _ref4.row,
      className = _ref4.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UserRender__WEBPACK_IMPORTED_MODULE_2__["default"], {
        name: row === null || row === void 0 ? void 0 : row.pm_name,
        profileUrl: "/account/employees/".concat(row === null || row === void 0 ? void 0 : row.pm_id),
        image: row === null || row === void 0 ? void 0 : row.pm_image,
        role: row === null || row === void 0 ? void 0 : row.pm_roles,
        id: row === null || row === void 0 ? void 0 : row.pm_id
      })
    });
  }
}, {
  id: 'number_of_session',
  header: 'Number Of Session',
  className: '',
  sorted: false,
  cell: function cell(_ref5) {
    var row = _ref5.row,
      className = _ref5.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_EmployeeTrackTimeButton__WEBPACK_IMPORTED_MODULE_1__["default"], {
        row: row,
        children: row === null || row === void 0 ? void 0 : row.number_of_session
      })
    });
  }
}, {
  id: 'total_track_time',
  header: 'Total Track Time',
  className: '',
  sorted: false,
  cell: function cell(_ref6) {
    var row = _ref6.row,
      className = _ref6.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: row !== null && row !== void 0 && row.total_minutes ? (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_0__.convertTime)(row === null || row === void 0 ? void 0 : row.total_minutes) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
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

/***/ "./resources/js/react/TimeLogTable/components/EmployeeTimeLogDataTable.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/EmployeeTimeLogDataTable.jsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_table_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-table.css */ "./resources/js/react/TimeLogTable/components/data-table.css");
/* harmony import */ var _UserRender__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserRender */ "./resources/js/react/TimeLogTable/components/UserRender.jsx");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var _TableFooter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TableFooter */ "./resources/js/react/TimeLogTable/components/TableFooter.jsx");
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var _TimeLogTableLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TimeLogTableLoader */ "./resources/js/react/TimeLogTable/components/TimeLogTableLoader.jsx");
/* harmony import */ var _DragHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DragHeader */ "./resources/js/react/TimeLogTable/components/DragHeader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
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

  // get columns keys
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var column_ids = _.map(columns, "id");
    setColumnOrder(_toConsumableArray(column_ids));
  }, []);
  var _columns = _.sortBy(columns, function (item) {
    return _.indexOf(columnOrder, item.id);
  });
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
          {
            value === null || value === void 0 ? void 0 : value.map(function (item, index) {
              var className = value.length === index + 1 ? "sp1_tlr_td f-14 sp1_tlr_td_border" : "sp1_tlr_td f-14";
              rows.push( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("tr", {
                  className: "sp1_tlr_tr",
                  children: _.map(_columns, function (col) {
                    if (col.group) {
                      return index === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
                        children: col.cell({
                          row: item,
                          data: value,
                          rowSpan: _.size(value)
                        })
                      }, col.id);
                    } else {
                      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
                        children: col.cell({
                          row: item,
                          data: value,
                          className: "".concat(className, " sp1_drag_col_").concat(col === null || col === void 0 ? void 0 : col.id)
                        })
                      }, col.id);
                    }
                  })
                })
              }, item.time_log_start_time));
            });
          }
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "p-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "position-relative sp1_tlr_tbl_wrapper",
        style: {
          height: height
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("table", {
          className: "sp1_tlr_table",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("thead", {
            className: "sp1_tlr_thead",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("tr", {
              className: "sp1_tlr_tr",
              children: _.map(_columns, function (column) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_DragHeader__WEBPACK_IMPORTED_MODULE_7__["default"], {
                  className: "sp1_tlr_th",
                  column: column,
                  columns: _columns,
                  onSort: function onSort() {},
                  onDrop: setColumnOrder,
                  order: columnOrder,
                  tableName: tableName
                }, column.id);
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tbody", {
            className: "sp1_tlr_tbody",
            children: [!isLoading && renderRow(data), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_TimeLogTableLoader__WEBPACK_IMPORTED_MODULE_6__["default"], {})]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_TableFooter__WEBPACK_IMPORTED_MODULE_4__["default"], {
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

/***/ "./resources/js/react/TimeLogTable/components/EmployeeTrackTimeButton.jsx":
/*!********************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/EmployeeTrackTimeButton.jsx ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal */ "./resources/js/react/TimeLogTable/components/Modal.jsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button */ "./resources/js/react/TimeLogTable/components/Button.jsx");
/* harmony import */ var _services_api_timeLogTableSessionDetails__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api/timeLogTableSessionDetails */ "./resources/js/react/services/api/timeLogTableSessionDetails.js");
/* harmony import */ var _context_EmployeeTableContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../context/EmployeeTableContext */ "./resources/js/react/TimeLogTable/context/EmployeeTableContext.jsx");
/* harmony import */ var _EmployeeSessionTableColumn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EmployeeSessionTableColumn */ "./resources/js/react/TimeLogTable/components/EmployeeSessionTableColumn.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_paginate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/paginate */ "./resources/js/react/utils/paginate.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var EmployeeSessionTable = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_TimeLogTable_components_EmployeeSessionTable_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./EmployeeSessionTable */ "./resources/js/react/TimeLogTable/components/EmployeeSessionTable.jsx"));
});
var EmployeeTrackTimeButton = function EmployeeTrackTimeButton(_ref) {
  var row = _ref.row,
    children = _ref.children;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_EmployeeTableContext__WEBPACK_IMPORTED_MODULE_4__.EmployeeTableCtx),
    filter = _useContext.filter;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    data = _useState4[0],
    setData = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(10),
    _useState6 = _slicedToArray(_useState5, 2),
    perPageData = _useState6[0],
    setParPageData = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState8 = _slicedToArray(_useState7, 2),
    currentPage = _useState8[0],
    setCurrentPage = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    renderData = _useState10[0],
    setRenderData = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    sortConfig = _useState12[0],
    setSortConfig = _useState12[1];
  var _useLazyGetSessionDet = (0,_services_api_timeLogTableSessionDetails__WEBPACK_IMPORTED_MODULE_3__.useLazyGetSessionDetailsQuery)(""),
    _useLazyGetSessionDet2 = _slicedToArray(_useLazyGetSessionDet, 2),
    getSessionDetails = _useLazyGetSessionDet2[0],
    isFetching = _useLazyGetSessionDet2[1].isFetching;
  var toggle = function toggle() {
    return setIsOpen(function (prev) {
      return !prev;
    });
  };
  var close = function close() {
    return setIsOpen(false);
  };

  // handle data
  var handleData = function handleData(data, currentPage, perPageData) {
    var paginated = (0,_utils_paginate__WEBPACK_IMPORTED_MODULE_7__.paginate)(data, currentPage, perPageData);
    var grouped = (0,lodash__WEBPACK_IMPORTED_MODULE_6__.groupBy)(paginated, 'task_id');
    var sorted = Object.entries(grouped).sort(function (_ref2, _ref3) {
      var _ref4 = _slicedToArray(_ref2, 1),
        keyA = _ref4[0];
      var _ref5 = _slicedToArray(_ref3, 1),
        keyB = _ref5[0];
      return keyB - keyA;
    });
    setRenderData(_toConsumableArray(sorted));
  };

  // data sort handle
  var handleSorting = function handleSorting(sort) {
    var sortData = lodash__WEBPACK_IMPORTED_MODULE_6__.orderBy.apply(void 0, [data].concat(_toConsumableArray(sort)));
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
  var handleClick = function handleClick(e) {
    e.preventDefault();
    toggle();
    getSessionDetails({
      projectID: row === null || row === void 0 ? void 0 : row.project_id,
      employeeID: row === null || row === void 0 ? void 0 : row.employee_id,
      startDate: filter === null || filter === void 0 ? void 0 : filter.start_date,
      endDate: filter === null || filter === void 0 ? void 0 : filter.end_date
    }).unwrap().then(function (res) {
      var sortedData = (0,lodash__WEBPACK_IMPORTED_MODULE_6__.orderBy)(res, ["task_id"], ["desc"]);
      handleData(sortedData, currentPage, perPageData);
      setData(sortedData);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
      onClick: handleClick,
      type: "button",
      className: "px-2 py-1",
      children: children
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
        isOpen: isOpen,
        className: "sp1_mark-as--modal",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "sp1_single_task--modal-panerl-wrapper",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "sp1_mark-as--modal-panel",
            style: {
              maxWidth: "80vw"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sp1_mark-as--modal-heading",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h6", {
                className: "mb-0",
                children: "Employee Wise Session"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                variant: "tertiary",
                "aria-label": "closeModal",
                onClick: close,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("i", {
                  className: "fa-solid fa-xmark"
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "sp1_mark-as--modal-body px-3",
              style: {
                overflow: "unset"
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
                fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
                  children: " Loading ..."
                }),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(EmployeeSessionTable, {
                  data: renderData,
                  columns: _EmployeeSessionTableColumn__WEBPACK_IMPORTED_MODULE_5__.EmployeeSessionTableColumn,
                  height: "70vh",
                  tableName: "employee_timelog_sesson_report",
                  onSort: handleSorting,
                  onPaginate: handlePagination,
                  perpageData: perPageData,
                  handlePerPageData: handlePerPageData,
                  currentPage: currentPage,
                  totalEntry: data === null || data === void 0 ? void 0 : data.length,
                  isLoading: isFetching
                })
              })
            })]
          })
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmployeeTrackTimeButton);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/FilterBarItem.jsx":
/*!**********************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/FilterBarItem.jsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Insights/ui/Dropdown */ "./resources/js/react/Insights/ui/Dropdown.jsx");
/* harmony import */ var _Insights_ui_Searchbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Insights/ui/Searchbox */ "./resources/js/react/Insights/ui/Searchbox.jsx");
/* harmony import */ var _services_api_FilterBarOptionsApiSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api/FilterBarOptionsApiSlice */ "./resources/js/react/services/api/FilterBarOptionsApiSlice.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Insights_components_TextHighlighter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Insights/components/TextHighlighter */ "./resources/js/react/Insights/components/TextHighlighter.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








function FilterItem(_ref) {
  var _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    title = _ref.title,
    selected = _ref.selected,
    onSelect = _ref.onSelect,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? true : _ref$isLoading;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    search = _React$useState2[0],
    setSearch = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(720),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    maxHeight = _React$useState4[0],
    setMaxHeight = _React$useState4[1];

  // set max height
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (window) {
      if (window.innerHeight < 720) {
        setMaxHeight(window.innerHeight - 150);
      }
    }
  }, [maxHeight]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "d-flex align-items-center px-3 py-2 border-right",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
      className: "mr-2",
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Toggle, {
        className: "sp1__pp_filter_dd_toggle",
        children: !selected ? 'All' : lodash__WEBPACK_IMPORTED_MODULE_4___default().startCase(selected)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Menu, {
        className: "sp1__pp_filter_dd",
        children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "mt-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "spinner-border",
              role: "status",
              style: {
                width: '1rem',
                height: '1rem',
                borderWidth: '0.15rem',
                borderColor: "#777",
                borderRightColor: 'transparent'
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "d-inline ml-2",
              style: {
                color: '#777'
              },
              children: "Loading..."
            })]
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "sp1__pp_menu_items",
            style: {
              maxHeight: maxHeight
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Item, {
              onClick: function onClick(e) {
                return onSelect(null);
              },
              className: "sp1__pp_filter_dd_item mb-1 ".concat(!selected && 'active'),
              children: "Select All"
            }), items === null || items === void 0 ? void 0 : items.filter(function (item) {
              return lodash__WEBPACK_IMPORTED_MODULE_4___default().lowerCase(item === null || item === void 0 ? void 0 : item.name).includes(lodash__WEBPACK_IMPORTED_MODULE_4___default().lowerCase(search));
            }).map(function (item) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Item, {
                onClick: function onClick(e) {
                  return onSelect(item);
                },
                className: "sp1__pp_filter_dd_item mb-1 ".concat(selected === item ? 'active' : ''),
                children: lodash__WEBPACK_IMPORTED_MODULE_4___default().startCase(item)
              }, item);
            })]
          })
        })
      })]
    })]
  });
}

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/JqueryDateRangePicker.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/JqueryDateRangePicker.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* eslint-disable react/prop-types */




var JqueryDateRangePicker = function JqueryDateRangePicker(_ref) {
  var startDate = _ref.startDate,
    endDate = _ref.endDate,
    setStartDate = _ref.setStartDate,
    setEndDate = _ref.setEndDate,
    _ref$onApply = _ref.onApply,
    onApply = _ref$onApply === void 0 ? function () {} : _ref$onApply;
  var handleTimePicker = function handleTimePicker() {
    if (window.$) {
      var $ = window.$;
      var moment = window.moment;
      // let today = moment().format('D'); 

      $(function () {
        var start = moment().startOf('day');
        var end = moment().endOf('day');

        // if(today > 20){
        //     end = moment().add(1, 'months').date(20);
        // }else {
        //     end = moment().date(20);
        // }

        setStartDate(start.format());
        setEndDate(end.format());
        function cb(start, end) {
          setStartDate(start.format('YYYY-MM-DD'));
          setEndDate(end.format('YYYY-MM-DD'));
          onApply && onApply(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
          $('#jqueryDatePicker div.sp1__jquery_date_text').html(start.format('MMMM D, YYYY') + ' to ' + end.format('MMMM D, YYYY'));
        }
        $('#jqueryDatePicker').daterangepicker({
          locale: {
            format: 'MMMM D, YYYY',
            customRangeLabel: "Custom Range",
            separator: " To ",
            applyLabel: "Apply",
            cancelLabel: "Cancel",
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            firstDay: parseInt("1")
          },
          startDate: start,
          endDate: end,
          datePicker: true,
          ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          }
        }, cb);
        cb(start, end);
      });
    }
  };
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(function () {
    handleTimePicker();
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    id: "jqueryDatePicker",
    className: "sp1__jquery_date_picker",
    style: {
      position: 'relative'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "sp1__jquery_date_btn",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
        className: "fa-solid fa-calendar-days"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "sp1__jquery_date_text"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JqueryDateRangePicker);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/Modal.jsx":
/*!**************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/Modal.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var Modal = function Modal(_ref) {
  var children = _ref.children,
    isOpen = _ref.isOpen,
    className = _ref.className;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isBrowser = _React$useState2[0],
    setIsBrowser = _React$useState2[1];
  // generate random id for dropdown menu
  var id = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return Math.random().toString(36).substr(2, 9);
  }, []);
  var DOM = document.getElementById(id);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    setIsBrowser(true);
    var el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
    return function () {
      document.body.removeChild(el);
    };
  }, []);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (isOpen) {
      document.body.classList.add('cnx_body-overflow-hidden');
    } else {
      document.body.classList.remove('cnx_body-overflow-hidden');
    }
  }, [isOpen]);
  if (!DOM) return;
  var modalContent = isOpen ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "cnx_modal ".concat(className),
    children: children
  }) : null;
  if (isBrowser) {
    return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(modalContent, DOM);
  } else {
    return null;
  }
};
Modal.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node.isRequired),
  isOpen: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool.isRequired),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/Pagination.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/Pagination.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Insights_ui_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Insights/ui/Button */ "./resources/js/react/Insights/ui/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var Pagination = function Pagination(_ref) {
  var _ref$currentPage = _ref.currentPage,
    currentPage = _ref$currentPage === void 0 ? 1 : _ref$currentPage,
    _ref$perpageRow = _ref.perpageRow,
    perpageRow = _ref$perpageRow === void 0 ? 10 : _ref$perpageRow,
    onPaginate = _ref.onPaginate,
    _ref$totalEntry = _ref.totalEntry,
    totalEntry = _ref$totalEntry === void 0 ? 0 : _ref$totalEntry;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    renderButtons = _React$useState2[0],
    setRenderButtons = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(1),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    totalPages = _React$useState4[0],
    setTotalPages = _React$useState4[1];
  var entryChagne = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return totalEntry;
  }, [totalEntry]);
  var isTotalPagesChange = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return totalPages;
  }, [totalPages]);
  var rowNumber = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return perpageRow;
  }, [perpageRow]);

  // count total pages
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    var tPages = Math.ceil(entryChagne / rowNumber);
    setTotalPages(tPages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryChagne, rowNumber]);

  // create render buttons
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    var buttons = [];
    if (totalPages <= 7) {
      for (var i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (var _i2 = 1; _i2 < 5; _i2++) {
          buttons.push(_i2);
        }
      } else if (currentPage >= totalPages - 3) {
        for (var _i3 = totalPages - 4; _i3 <= totalPages; _i3++) {
          buttons.push(_i3);
        }
      } else if (currentPage > 3 && currentPage < totalPages - 3) {
        for (var _i4 = currentPage - 2; _i4 <= currentPage + 2; _i4++) {
          buttons.push(_i4);
        }
      }
    }
    setRenderButtons([].concat(buttons));
  }, [totalPages, currentPage, isTotalPagesChange]);

  // next 
  var nextPage = function nextPage() {
    if (currentPage < totalPages) {
      onPaginate(currentPage + 1);
    }
  };

  // previous 
  var prevPage = function prevPage() {
    if (currentPage > 1) {
      onPaginate(currentPage - 1);
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "cnx__table_pagination",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Insights_ui_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      onClick: prevPage,
      className: "cnx__table_pagination_btn cnx__table_pagination_btn_prev",
      children: " Previous "
    }), totalPages > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [renderButtons[0] > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Insights_ui_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          onClick: function onClick() {
            return onPaginate(1);
          },
          className: "cnx__table_pagination_btn ".concat(currentPage === 1 ? 'active' : ''),
          children: "1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Insights_ui_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          className: "cnx__table_pagination_btn",
          children: "..."
        })]
      }), renderButtons === null || renderButtons === void 0 ? void 0 : renderButtons.map(function (number) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Insights_ui_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
            onClick: function onClick() {
              return onPaginate(number);
            },
            className: "cnx__table_pagination_btn ".concat(currentPage === number ? 'active' : ''),
            children: number
          })
        }, number);
      }),
      // render dots
      renderButtons[renderButtons.length - 1] < totalPages - 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Insights_ui_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          className: "cnx__table_pagination_btn",
          children: "..."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Insights_ui_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          onClick: function onClick() {
            return onPaginate(totalPages);
          },
          className: "cnx__table_pagination_btn ".concat(currentPage === totalPages ? 'active' : ''),
          children: totalPages
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Insights_ui_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      onClick: nextPage,
      className: "cnx__table_pagination_btn cnx__table_pagination_btn_next",
      children: " Next  "
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/PersonFilter.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/PersonFilter.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PersonFilterItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Insights/ui/Dropdown */ "./resources/js/react/Insights/ui/Dropdown.jsx");
/* harmony import */ var _Insights_ui_Searchbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Insights/ui/Searchbox */ "./resources/js/react/Insights/ui/Searchbox.jsx");
/* harmony import */ var _services_api_FilterBarOptionsApiSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api/FilterBarOptionsApiSlice */ "./resources/js/react/services/api/FilterBarOptionsApiSlice.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Insights_components_TextHighlighter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Insights/components/TextHighlighter */ "./resources/js/react/Insights/components/TextHighlighter.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








function PersonFilterItem(_ref) {
  var _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    title = _ref.title,
    selected = _ref.selected,
    onSelect = _ref.onSelect,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? true : _ref$isLoading,
    _ref$selectedAllButto = _ref.selectedAllButton,
    selectedAllButton = _ref$selectedAllButto === void 0 ? true : _ref$selectedAllButto;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    search = _React$useState2[0],
    setSearch = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(720),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    maxHeight = _React$useState4[0],
    setMaxHeight = _React$useState4[1];

  // set max height
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (window) {
      if (window.innerHeight < 720) {
        setMaxHeight(window.innerHeight - 150);
      }
    }
  }, [maxHeight]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "d-flex align-items-center px-3 py-2 border-right",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
      className: "mr-2",
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Toggle, {
        className: "sp1__pp_filter_dd_toggle",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          children: !selected ? 'All' : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            "data-toggle": "tooltip",
            "data-placement": "bottom",
            title: selected === null || selected === void 0 ? void 0 : selected.name,
            children: selected === null || selected === void 0 ? void 0 : selected.name
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Menu, {
        className: "sp1__pp_filter_dd",
        children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "mt-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "spinner-border",
              role: "status",
              style: {
                width: '1rem',
                height: '1rem',
                borderWidth: '0.15rem',
                borderColor: "#777",
                borderRightColor: 'transparent'
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "d-inline ml-2",
              style: {
                color: '#777'
              },
              children: "Loading..."
            })]
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(items === null || items === void 0 ? void 0 : items.length) > 15 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "sp1__pp_filter_dd_search",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Searchbox__WEBPACK_IMPORTED_MODULE_2__["default"], {
                value: search,
                onChange: setSearch,
                autoFocus: true
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "cnx_divider"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "sp1__pp_menu_items",
            style: {
              maxHeight: maxHeight
            },
            children: [selectedAllButton && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Item, {
              onClick: function onClick(e) {
                return onSelect(e, null);
              },
              className: "sp1__pp_filter_dd_item mb-1 ".concat(!selected && 'active'),
              children: "Select All"
            }), items === null || items === void 0 ? void 0 : items.filter(function (item) {
              return lodash__WEBPACK_IMPORTED_MODULE_4___default().lowerCase(item === null || item === void 0 ? void 0 : item.name).includes(lodash__WEBPACK_IMPORTED_MODULE_4___default().lowerCase(search));
            }).map(function (item) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Item, {
                onClick: function onClick(e) {
                  return onSelect(e, item);
                },
                className: "sp1__pp_filter_dd_item mb-1 ".concat((selected === null || selected === void 0 ? void 0 : selected.id) === (item === null || item === void 0 ? void 0 : item.id) ? 'active' : ''),
                children: [item.image_url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
                  src: item.image_url,
                  alt: item.name,
                  style: {
                    width: 26,
                    height: 26,
                    borderRadius: '50%'
                  }
                }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_components_TextHighlighter__WEBPACK_IMPORTED_MODULE_5__["default"], {
                  textToHighlight: item === null || item === void 0 ? void 0 : item.name,
                  searchWords: search
                })]
              }, item === null || item === void 0 ? void 0 : item.id);
            })]
          })]
        })
      })]
    })]
  });
}

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/ProjectFilter.jsx":
/*!**********************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/ProjectFilter.jsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectFilterItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Insights/ui/Dropdown */ "./resources/js/react/Insights/ui/Dropdown.jsx");
/* harmony import */ var _Insights_ui_Searchbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Insights/ui/Searchbox */ "./resources/js/react/Insights/ui/Searchbox.jsx");
/* harmony import */ var _services_api_FilterBarOptionsApiSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api/FilterBarOptionsApiSlice */ "./resources/js/react/services/api/FilterBarOptionsApiSlice.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Insights_components_TextHighlighter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Insights/components/TextHighlighter */ "./resources/js/react/Insights/components/TextHighlighter.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








function ProjectFilterItem(_ref) {
  var _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    title = _ref.title,
    selected = _ref.selected,
    onSelect = _ref.onSelect,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? true : _ref$isLoading;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    search = _React$useState2[0],
    setSearch = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(720),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    maxHeight = _React$useState4[0],
    setMaxHeight = _React$useState4[1];

  // set max height
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (window) {
      if (window.innerHeight < 720) {
        setMaxHeight(window.innerHeight - 150);
      }
    }
  }, [maxHeight]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "d-flex align-items-center px-3 py-2 border-right",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
      className: "mr-2",
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Toggle, {
        className: "sp1__pp_filter_dd_toggle",
        children: !selected ? 'All' : selected === null || selected === void 0 ? void 0 : selected.project_name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Menu, {
        className: "sp1__pp_filter_dd",
        children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "mt-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "spinner-border",
              role: "status",
              style: {
                width: '1rem',
                height: '1rem',
                borderWidth: '0.15rem',
                borderColor: "#777",
                borderRightColor: 'transparent'
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "d-inline ml-2",
              style: {
                color: '#777'
              },
              children: "Loading..."
            })]
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(items === null || items === void 0 ? void 0 : items.length) > 15 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "sp1__pp_filter_dd_search",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Searchbox__WEBPACK_IMPORTED_MODULE_2__["default"], {
                value: search,
                onChange: setSearch,
                autoFocus: true
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "cnx_divider"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "sp1__pp_menu_items",
            style: {
              maxHeight: maxHeight
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Item, {
              onClick: function onClick(e) {
                return onSelect(e, null);
              },
              className: "sp1__pp_filter_dd_item mb-1 ".concat(!selected && 'active'),
              children: "Select All"
            }), items === null || items === void 0 ? void 0 : items.filter(function (item) {
              return lodash__WEBPACK_IMPORTED_MODULE_4___default().lowerCase(item === null || item === void 0 ? void 0 : item.project_name).includes(lodash__WEBPACK_IMPORTED_MODULE_4___default().lowerCase(search));
            }).map(function (item) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_ui_Dropdown__WEBPACK_IMPORTED_MODULE_1__["default"].Item, {
                onClick: function onClick(e) {
                  return onSelect(e, item);
                },
                className: "sp1__pp_filter_dd_item mb-1 ".concat((selected === null || selected === void 0 ? void 0 : selected.id) === (item === null || item === void 0 ? void 0 : item.id) ? 'active' : ''),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Insights_components_TextHighlighter__WEBPACK_IMPORTED_MODULE_5__["default"], {
                  textToHighlight: item === null || item === void 0 ? void 0 : item.project_name,
                  searchWords: search
                })
              }, item === null || item === void 0 ? void 0 : item.id);
            })]
          })]
        })
      })]
    })]
  });
}

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/Tabbar.jsx":
/*!***************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/Tabbar.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var Tabbar = function Tabbar() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "d-flex flex-wrap align-items-center px-3 mb-2",
    style: {
      gap: '10px'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.NavLink, {
      to: "/employee-wise",
      className: function className(_ref) {
        var isActive = _ref.isActive;
        return isActive ? "sp1_tlr_tab active" : "sp1_tlr_tab";
      },
      children: "Employee Wise"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.NavLink, {
      to: "/project-wise",
      className: function className(_ref2) {
        var isActive = _ref2.isActive;
        return isActive ? "sp1_tlr_tab active" : "sp1_tlr_tab";
      },
      children: " Project Wise "
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.NavLink, {
      to: "/task-wise",
      className: function className(_ref3) {
        var isActive = _ref3.isActive;
        return isActive ? "sp1_tlr_tab active" : "sp1_tlr_tab";
      },
      children: " Task Wise "
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.NavLink, {
      to: "/time-log-history",
      className: function className(_ref4) {
        var isActive = _ref4.isActive;
        return isActive ? "sp1_tlr_tab active" : "sp1_tlr_tab";
      },
      children: " Time Log History "
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tabbar);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TableFooter.jsx":
/*!********************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TableFooter.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination */ "./resources/js/react/TimeLogTable/components/Pagination.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var TableFooter = function TableFooter(_ref) {
  var onPaginate = _ref.onPaginate,
    perpageData = _ref.perpageData,
    currentPage = _ref.currentPage,
    handlePerPageData = _ref.handlePerPageData,
    totalEntry = _ref.totalEntry;
  var showingFrom = (currentPage - 1) * perpageData;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "cnx__table_footer mt-3",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "__show_entries",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        children: "Show"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("select", {
        className: "py-1 border rounded-sm",
        onChange: function onChange(e) {
          return handlePerPageData(Number(e.target.value));
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
          value: "10",
          children: "10"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
          value: "20",
          children: "20"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
          value: "30",
          children: "30"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
          value: "50",
          children: "50"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        children: "entries"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "__total_entries",
      children: ["Showing ", showingFrom + 1, " to ", showingFrom + perpageData, " of ", totalEntry, " entries"]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Pagination__WEBPACK_IMPORTED_MODULE_1__["default"], {
      onPaginate: onPaginate,
      currentPage: currentPage,
      perpageRow: perpageData,
      totalEntry: totalEntry
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableFooter);

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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










// import PersonFilterItem from './ProjectFilter';



function TimeLogTableFilterBar(_ref) {
  var _window, _window$Laravel;
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
  var logged_user = (_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user;
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
          while (1) {
            switch (_context.prev = _context.next) {
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

/***/ "./resources/js/react/TimeLogTable/components/TimeLogTableLoader.jsx":
/*!***************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TimeLogTableLoader.jsx ***!
  \***************************************************************************/
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
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }





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
var TimeLogTableLoader = function TimeLogTableLoader(_ref) {
  _objectDestructuringEmpty(_ref);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
      className: "sp1_tlr_tr",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
        className: "sp1_tlr_td",
        rowSpan: 6,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {})
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: ["  ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "250px"
        }), " "]
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
      })]
    }), lodash__WEBPACK_IMPORTED_MODULE_2___default().times(5, function (index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: ["  ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "250px"
          }), " "]
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
        })]
      }, index);
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
      className: "sp1_tlr_tr",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
        className: "sp1_tlr_td",
        rowSpan: 3,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {})
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: ["  ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "250px"
        }), " "]
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
      })]
    }), lodash__WEBPACK_IMPORTED_MODULE_2___default().times(2, function (index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: ["  ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "250px"
          }), " "]
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
        })]
      }, index);
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
      className: "sp1_tlr_tr",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: ["  ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "180px"
        }), " "]
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
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogTableLoader);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/UserRender.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/UserRender.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var UserRender = function UserRender(_ref) {
  var image = _ref.image,
    name = _ref.name,
    role = _ref.role,
    id = _ref.id,
    profileUrl = _ref.profileUrl,
    roleLink = _ref.roleLink;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "d-flex align-items-center",
    style: {
      gap: "10px"
    },
    children: [image ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
      src: "/user-uploads/avatar/".concat(image),
      alt: name,
      className: "rounded-circle ",
      style: {
        width: 32,
        height: 32
      }
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "sp1-item-center border rounded-circle",
      style: {
        width: "36px",
        height: "36px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        style: {
          fontSize: "1.3rem",
          fontWeight: "bold"
        },
        children: name === null || name === void 0 ? void 0 : name.slice(0, 1).toUpperCase()
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h6", {
        className: "mb-0 f-14",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
          href: profileUrl,
          children: name
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        className: "f-12 text-hover-underline",
        children: roleLink ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
          href: roleLink,
          className: "text-dark ",
          children: role
        }) : role
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserRender);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/pages/EmployeeWiseTimeLogTable.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/pages/EmployeeWiseTimeLogTable.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_EmployeeTableColumn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/EmployeeTableColumn */ "./resources/js/react/TimeLogTable/components/EmployeeTableColumn.jsx");
/* harmony import */ var _components_EmployeeTimeLogDataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/EmployeeTimeLogDataTable */ "./resources/js/react/TimeLogTable/components/EmployeeTimeLogDataTable.jsx");
/* harmony import */ var _services_api_timeLogTableApiSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api/timeLogTableApiSlice */ "./resources/js/react/services/api/timeLogTableApiSlice.js");
/* harmony import */ var _utils_paginate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/paginate */ "./resources/js/react/utils/paginate.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Tabbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Tabbar */ "./resources/js/react/TimeLogTable/components/Tabbar.jsx");
/* harmony import */ var _context_EmployeeTableContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../context/EmployeeTableContext */ "./resources/js/react/TimeLogTable/context/EmployeeTableContext.jsx");
/* harmony import */ var _components_TimeLogTableFilterBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/TimeLogTableFilterBar */ "./resources/js/react/TimeLogTable/components/TimeLogTableFilterBar.jsx");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var EmployeeWiseTimeLogTable = function EmployeeWiseTimeLogTable() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(10),
    _useState4 = _slicedToArray(_useState3, 2),
    perPageData = _useState4[0],
    setParPageData = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState6 = _slicedToArray(_useState5, 2),
    currentPage = _useState6[0],
    setCurrentPage = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    renderData = _useState8[0],
    setRenderData = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    sortConfig = _useState10[0],
    setSortConfig = _useState10[1];
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_EmployeeTableContext__WEBPACK_IMPORTED_MODULE_7__.EmployeeTableCtx),
    setFilter = _useContext.setFilter;
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState12 = _slicedToArray(_useState11, 2),
    nSession = _useState12[0],
    setNSession = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState14 = _slicedToArray(_useState13, 2),
    trackedTime = _useState14[0],
    setTractedTime = _useState14[1];
  var _useGetEmployeeWiseDa = (0,_services_api_timeLogTableApiSlice__WEBPACK_IMPORTED_MODULE_3__.useGetEmployeeWiseDataMutation)(),
    _useGetEmployeeWiseDa2 = _slicedToArray(_useGetEmployeeWiseDa, 2),
    getEmployeeWiseData = _useGetEmployeeWiseDa2[0],
    isLoading = _useGetEmployeeWiseDa2[1].isLoading;

  // handle data
  var handleData = function handleData(data, currentPage, perPageData) {
    var paginated = (0,_utils_paginate__WEBPACK_IMPORTED_MODULE_4__.paginate)(data, currentPage, perPageData);
    var grouped = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.groupBy)(paginated, 'employee_id');
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
  var handleFetchData = function handleFetchData(filter) {
    setFilter(filter);
    getEmployeeWiseData(filter).unwrap().then(function (res) {
      setCurrentPage(1);
      var sortedData = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.orderBy)(res === null || res === void 0 ? void 0 : res.data, ["employee_id"], ["desc"]);
      var totalSession = lodash__WEBPACK_IMPORTED_MODULE_5___default().sumBy(sortedData, 'number_of_session');
      var totalTrackTime = lodash__WEBPACK_IMPORTED_MODULE_5___default().sumBy(sortedData, 'total_minutes');
      handleData(sortedData, currentPage, perPageData);
      setData(sortedData);
      setNSession(totalSession);
      setTractedTime(totalTrackTime);
    });
  };

  // data sort handle 
  var handleSorting = function handleSorting(sort) {
    var sortData = lodash__WEBPACK_IMPORTED_MODULE_5__.orderBy.apply(void 0, [data].concat(_toConsumableArray(sort)));
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
    className: "sp1_tlr_container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_TimeLogTableFilterBar__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onFilter: handleFetchData
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      className: "sp1_tlr_tbl_container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "mb-3",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_Tabbar__WEBPACK_IMPORTED_MODULE_6__["default"], {})
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: " w-100 d-flex flex-wrap justify-center align-items-center",
        style: {
          gap: '10px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("span", {
          className: "mx-auto",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("span", {
            children: ["Total No. of Session: ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("strong", {
              children: [" ", nSession, " "]
            }), " "]
          }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
            className: "mx-2",
            children: "||"
          }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("span", {
            children: ["Total Tracked Time: ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("strong", {
              children: (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_9__.convertTime)(trackedTime)
            })]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_EmployeeTimeLogDataTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
        data: renderData,
        columns: _components_EmployeeTableColumn__WEBPACK_IMPORTED_MODULE_1__.EmployeeTableColumn,
        tableName: "employee_timelog_report",
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmployeeWiseTimeLogTable);

/***/ }),

/***/ "./resources/js/react/global/Placeholder.jsx":
/*!***************************************************!*\
  !*** ./resources/js/react/global/Placeholder.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Placeholder": () => (/* binding */ Placeholder)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

var Placeholder = function Placeholder(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? '100%' : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 16 : _ref$height,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "square" : _ref$type;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "skeleton-loading ".concat(className),
    style: {
      width: width,
      height: height,
      borderRadius: type === 'circle' ? '50%' : '4px'
    }
  });
};

/***/ }),

/***/ "./resources/js/react/services/api/timeLogTableApiSlice.js":
/*!*****************************************************************!*\
  !*** ./resources/js/react/services/api/timeLogTableApiSlice.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useGetEmployeeWiseDataMutation": () => (/* binding */ useGetEmployeeWiseDataMutation),
/* harmony export */   "useGetProjectWiseDataMutation": () => (/* binding */ useGetProjectWiseDataMutation),
/* harmony export */   "useGetTaskWiseDataMutation": () => (/* binding */ useGetTaskWiseDataMutation),
/* harmony export */   "useGetTimeLogHistoryMutation": () => (/* binding */ useGetTimeLogHistoryMutation)
/* harmony export */ });
/* harmony import */ var _apiSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiSlice */ "./resources/js/react/services/api/apiSlice.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      })
    };
  }
});
var useGetEmployeeWiseDataMutation = timeLogTableApiSlice.useGetEmployeeWiseDataMutation,
  useGetTaskWiseDataMutation = timeLogTableApiSlice.useGetTaskWiseDataMutation,
  useGetProjectWiseDataMutation = timeLogTableApiSlice.useGetProjectWiseDataMutation,
  useGetTimeLogHistoryMutation = timeLogTableApiSlice.useGetTimeLogHistoryMutation;


/***/ }),

/***/ "./resources/js/react/services/api/timeLogTableSessionDetails.js":
/*!***********************************************************************!*\
  !*** ./resources/js/react/services/api/timeLogTableSessionDetails.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useGetSessionDetailsQuery": () => (/* binding */ useGetSessionDetailsQuery),
/* harmony export */   "useLazyGetSessionDetailsQuery": () => (/* binding */ useLazyGetSessionDetailsQuery)
/* harmony export */ });
/* harmony import */ var _apiSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiSlice */ "./resources/js/react/services/api/apiSlice.js");

var timeLogTableApiSlice = _apiSlice__WEBPACK_IMPORTED_MODULE_0__.apiSlice.injectEndpoints({
  endpoints: function endpoints(build) {
    return {
      getSessionDetails: build.query({
        query: function query(_ref) {
          var projectID = _ref.projectID,
            employeeID = _ref.employeeID,
            startDate = _ref.startDate,
            endDate = _ref.endDate;
          return {
            url: "/account/time-log-report/".concat(projectID, "/").concat(employeeID, "?start_date=").concat(startDate, "&end_date=").concat(endDate),
            method: "GET"
          };
        }
      })
    };
  }
});
var useGetSessionDetailsQuery = timeLogTableApiSlice.useGetSessionDetailsQuery,
  useLazyGetSessionDetailsQuery = timeLogTableApiSlice.useLazyGetSessionDetailsQuery;


/***/ }),

/***/ "./resources/js/react/utils/converTime.js":
/*!************************************************!*\
  !*** ./resources/js/react/utils/converTime.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertTime": () => (/* binding */ convertTime)
/* harmony export */ });
var convertTime = function convertTime(time) {
  if (time) {
    var hours = Math.floor(time / 60) || 0;
    var min = Math.floor(time % 60) || 0;
    var h = hours ? "".concat(hours < 10 ? "0".concat(hours) : hours, " hours") : "";
    return "".concat(h, " ").concat(min < 10 ? "0".concat(min) : min, " min");
  }
  return "0 min";
};

/***/ }),

/***/ "./resources/js/react/utils/paginate.js":
/*!**********************************************!*\
  !*** ./resources/js/react/utils/paginate.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "paginate": () => (/* binding */ paginate)
/* harmony export */ });
// paginate
function paginate(data, currentPage, nPaginate) {
  if (data.length <= nPaginate) return data;
  var startIndex = (currentPage - 1) * nPaginate;
  return data.slice(startIndex, startIndex + nPaginate);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/TimeLogTable/components/data-table.css":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/TimeLogTable/components/data-table.css ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".sp1_tlr_tbl_wrapper{\r\n    overflow-y: auto;\r\n}\r\n\r\n.sp1_tlr_table{\r\n    width: 100%; \r\n}\r\n\r\n.sp1_tlr_th {\r\n    height: 36px;\r\n    padding: 3px 10px;\r\n    background-color: rgb(255, 255, 255);\r\n    border-bottom: 2px solid rgb(219, 228, 255);\r\n    position: sticky;\r\n    z-index: 10;\r\n    top: 0;\r\n}\r\n\r\n.sp1_tlr_td{\r\n    padding: 10px;\r\n    max-width: 350px;\r\n    min-width: 150px;\r\n    border-bottom: 1px solid rgb(219, 228, 255);\r\n}\r\n\r\n.sp1_tlr_tbody > .sp1_tlr_tr:hover .sp1_tlr_td{\r\n    background-color:rgba(233, 235, 240, 0.349);\r\n}\r\n\r\n.sp1_tlr_td_border{\r\n    border-bottom: 2px solid rgb(219, 228, 255);\r\n}\r\n\r\n.sp1_tlr_tbody > .sp1_tlr_tr:hover .sp1_tlr_td_hover-disable{\r\n   background-color: #fff !important; \r\n}\r\n\r\n\r\n\r\n.sp1_drag_th.__dragging {\r\n    background-color: rgba(170, 173, 180, 0.222);\r\n}\r\n\r\n.sp1_drag_th.__drop-area {\r\n    background-color: rgba(34, 45, 71, 0.349);\r\n}", "",{"version":3,"sources":["webpack://./resources/js/react/TimeLogTable/components/data-table.css"],"names":[],"mappings":"AAAA;IACI,gBAAgB;AACpB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,iBAAiB;IACjB,oCAAoC;IACpC,2CAA2C;IAC3C,gBAAgB;IAChB,WAAW;IACX,MAAM;AACV;;AAEA;IACI,aAAa;IACb,gBAAgB;IAChB,gBAAgB;IAChB,2CAA2C;AAC/C;;AAEA;IACI,2CAA2C;AAC/C;;AAEA;IACI,2CAA2C;AAC/C;;AAEA;GACG,iCAAiC;AACpC;;;;AAIA;IACI,4CAA4C;AAChD;;AAEA;IACI,yCAAyC;AAC7C","sourcesContent":[".sp1_tlr_tbl_wrapper{\r\n    overflow-y: auto;\r\n}\r\n\r\n.sp1_tlr_table{\r\n    width: 100%; \r\n}\r\n\r\n.sp1_tlr_th {\r\n    height: 36px;\r\n    padding: 3px 10px;\r\n    background-color: rgb(255, 255, 255);\r\n    border-bottom: 2px solid rgb(219, 228, 255);\r\n    position: sticky;\r\n    z-index: 10;\r\n    top: 0;\r\n}\r\n\r\n.sp1_tlr_td{\r\n    padding: 10px;\r\n    max-width: 350px;\r\n    min-width: 150px;\r\n    border-bottom: 1px solid rgb(219, 228, 255);\r\n}\r\n\r\n.sp1_tlr_tbody > .sp1_tlr_tr:hover .sp1_tlr_td{\r\n    background-color:rgba(233, 235, 240, 0.349);\r\n}\r\n\r\n.sp1_tlr_td_border{\r\n    border-bottom: 2px solid rgb(219, 228, 255);\r\n}\r\n\r\n.sp1_tlr_tbody > .sp1_tlr_tr:hover .sp1_tlr_td_hover-disable{\r\n   background-color: #fff !important; \r\n}\r\n\r\n\r\n\r\n.sp1_drag_th.__dragging {\r\n    background-color: rgba(170, 173, 180, 0.222);\r\n}\r\n\r\n.sp1_drag_th.__drop-area {\r\n    background-color: rgba(34, 45, 71, 0.349);\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/data-table.css":
/*!*******************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/data-table.css ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_data_table_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./data-table.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/TimeLogTable/components/data-table.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_data_table_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_data_table_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);
//# sourceMappingURL=resources_js_react_TimeLogTable_pages_EmployeeWiseTimeLogTable_jsx.js.map