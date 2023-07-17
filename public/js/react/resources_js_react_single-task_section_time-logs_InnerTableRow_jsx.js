"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-task_section_time-logs_InnerTableRow_jsx"],{

/***/ "./resources/js/react/single-task/section/time-logs/InnerTableRow.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/time-logs/InnerTableRow.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var TableRow = function TableRow(_ref) {
  var log = _ref.log;
  var user = log !== null && log !== void 0 && log.user ? new _utils_user_details__WEBPACK_IMPORTED_MODULE_0__.User(log.user) : null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("tr", {
    className: "__tbody_tr",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
      className: "__tbody_td _tbody_td_employee",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
        src: user === null || user === void 0 ? void 0 : user.getAvatar(),
        alt: user === null || user === void 0 ? void 0 : user.getName()
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "px-2",
        children: user === null || user === void 0 ? void 0 : user.getName()
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
      className: "__tbody_td _tbody_td_start_time",
      children: [dayjs__WEBPACK_IMPORTED_MODULE_1___default()(log === null || log === void 0 ? void 0 : log.start_time).format('MMM DD, YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_1___default()(log === null || log === void 0 ? void 0 : log.start_time).format('hh:mm a')]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
      className: "__tbody_td _tbody_td_start_time _tbody_td_start_end",
      children: [dayjs__WEBPACK_IMPORTED_MODULE_1___default()(log === null || log === void 0 ? void 0 : log.end_time).format('MMM DD, YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_1___default()(log === null || log === void 0 ? void 0 : log.end_time).format('hh:mm a')]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
      className: "__tbody_td _tbody_td_memo",
      children: log === null || log === void 0 ? void 0 : log.memo
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
      className: "__tbody_td _tbody_td_hour_logged",
      children: log === null || log === void 0 ? void 0 : log.hours_logged
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableRow);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-task_section_time-logs_InnerTableRow_jsx.js.map