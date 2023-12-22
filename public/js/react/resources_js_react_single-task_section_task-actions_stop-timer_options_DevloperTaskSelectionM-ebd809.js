"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-task_section_task-actions_stop-timer_options_DevloperTaskSelectionM-ebd809"],{

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/DevloperTaskSelectionMenu.jsx":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/DevloperTaskSelectionMenu.jsx ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/combobox/combobox.js");
/* harmony import */ var react_icons_hi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-icons/hi */ "./node_modules/react-icons/hi/index.esm.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var DevloperTaskSelectionMenu = function DevloperTaskSelectionMenu(_ref) {
  var _window;
  var task = _ref.task,
    setTask = _ref.setTask;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    searchQuery = _useState2[0],
    setSearchQuery = _useState2[1];
  var user = new _utils_user_details__WEBPACK_IMPORTED_MODULE_2__.User((_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 ? void 0 : _window.user);

  //  Fetch user wise tasks list 
  var _useGetDeveloperTasks = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useGetDeveloperTasksQuery)(user === null || user === void 0 ? void 0 : user.getId()),
    developerTasks = _useGetDeveloperTasks.data,
    isFetching = _useGetDeveloperTasks.isFetching;

  // project filter
  var filteredDeveloperTask = searchQuery === "" ? developerTasks : developerTasks === null || developerTasks === void 0 ? void 0 : developerTasks.filter(function (task) {
    return lodash__WEBPACK_IMPORTED_MODULE_1___default().lowerCase(task.heading).includes(lodash__WEBPACK_IMPORTED_MODULE_1___default().lowerCase(searchQuery));
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    className: "position-relative w-100 mb-3",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox, {
      value: task,
      onChange: setTask,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Button, {
        className: "position-relative w-100",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Input, {
          className: "w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between",
          displayValue: function displayValue(task) {
            return task === null || task === void 0 ? void 0 : task.heading;
          },
          onChange: function onChange(e) {
            return setSearchQuery(e.target.value);
          },
          placeholder: "--"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
          style: {
            position: "absolute",
            top: "50%",
            right: "5px",
            transform: "translateY(-50%)"
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_icons_hi__WEBPACK_IMPORTED_MODULE_6__.HiOutlineSelector, {})
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Options, {
        className: "position-absolute bg-white p-2 shadow w-100",
        style: {
          zIndex: "1",
          maxHeight: "350px",
          overflowY: "auto"
        },
        children: filteredDeveloperTask && filteredDeveloperTask.length ? filteredDeveloperTask === null || filteredDeveloperTask === void 0 ? void 0 : filteredDeveloperTask.map(function (task) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Option, {
            value: task,
            tabIndex: -1,
            className: function className(_ref2) {
              var selected = _ref2.selected,
                active = _ref2.active;
              return selected ? "task-selection-list-option selected" : active ? "task-selection-list-option active" : "task-selection-list-option";
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
              children: [task === null || task === void 0 ? void 0 : task.heading, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                className: "badge badge-success",
                children: task === null || task === void 0 ? void 0 : task.client_name
              })]
            })
          }, task.id);
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "task-selection-list-option",
          children: isFetching ? "Loading..." : "Nothing found."
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DevloperTaskSelectionMenu);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-task_section_task-actions_stop-timer_options_DevloperTaskSelectionM-ebd809.js.map