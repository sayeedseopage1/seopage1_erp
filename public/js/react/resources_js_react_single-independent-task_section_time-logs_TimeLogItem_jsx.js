"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-independent-task_section_time-logs_TimeLogItem_jsx"],{

/***/ "./resources/js/react/single-independent-task/section/time-logs/TimeLogItem.jsx":
/*!**************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/time-logs/TimeLogItem.jsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var TimeLogItem = function TimeLogItem(_ref) {
  var log = _ref.log;
  var user = log !== null && log !== void 0 && log.user ? new _utils_user_details__WEBPACK_IMPORTED_MODULE_1__.User(log.user) : null;
  var time = log === null || log === void 0 ? void 0 : log.hours_logged.split(' ');
  var h = time[0] + ' ' + time[1];
  var m = time[2] + ' ' + time[3];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "d-flex align-items-center justify-content-between sp1_tark_right_item py-2",
    style: {
      gap: '10px'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "d-flex align-items-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
        src: user === null || user === void 0 ? void 0 : user.getAvatar(),
        alt: user === null || user === void 0 ? void 0 : user.getName(),
        width: "24px",
        height: "24px",
        className: "rounded-circle mr-2"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "sp1_time_log_emplyee_name",
        children: user === null || user === void 0 ? void 0 : user.getName()
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      children: [dayjs__WEBPACK_IMPORTED_MODULE_2___default()(log === null || log === void 0 ? void 0 : log.start_time).format('MMM DD, YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_2___default()(log === null || log === void 0 ? void 0 : log.start_time).format('hh:mm a')]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      children: log !== null && log !== void 0 && log.end_time ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_2___default()(log === null || log === void 0 ? void 0 : log.end_time).format('MMM DD, YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_2___default()(log === null || log === void 0 ? void 0 : log.end_time).format('hh:mm a')]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "text-success font-weight-bold",
        children: "Active"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      children: [h, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), " ", m]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogItem);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-independent-task_section_time-logs_TimeLogItem_jsx.js.map