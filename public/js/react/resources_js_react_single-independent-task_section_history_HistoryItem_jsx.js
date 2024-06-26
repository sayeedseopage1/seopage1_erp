"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-independent-task_section_history_HistoryItem_jsx"],{

/***/ "./resources/js/react/single-independent-task/section/history/HistoryItem.jsx":
/*!************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/history/HistoryItem.jsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var HistoryItem = function HistoryItem(_ref) {
  var history = _ref.history;
  var user = history ? new _utils_user_details__WEBPACK_IMPORTED_MODULE_1__.User(history.user) : null;
  var details = history === null || history === void 0 ? void 0 : history.lang;
  var _lang = details;

  // add user link
  if (details && user) {
    var name = user.getName();
    // const sub = 'sub task';
    // const task = 'Task';
    var nameLength = name.length;
    var userIndexStart = details.indexOf(name);
    var part1 = details.slice(0, userIndexStart);
    var userName = details.slice(userIndexStart, userIndexStart + nameLength);
    var lastPart = details.slice(userIndexStart + nameLength, details.length - 1);
    userName = "<a class=\"hover-underline\" style=\"color: var(--header_color)!important\" href=\"".concat(user.getUserLink(), "\">").concat(userName, "</a>");
    _lang = "".concat(part1).concat(userName).concat(lastPart);

    // let taskIndex = _lang.toLowerCase().indexOf(task);
    // let taskLen = task.length;

    // // find sub task
    // if(history?.sub_task_id){ 
    //   let subTaskIndex = _lang.toLowerCase().indexOf(sub);
    //   let subTaskLen = sub.length;

    //   let part1 = details.slice(0, userIndexStart);
    //   let userName = details.slice(userIndexStart, userIndexStart+nameLength);
    //   let lastPart = details.slice(userIndexStart+nameLength, details.length-1);

    // }
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "d-flex align-items-center justify-content-between sp1_tark_right_item py-2",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      dangerouslySetInnerHTML: {
        __html: _lang
      }
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HistoryItem);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-independent-task_section_history_HistoryItem_jsx.js.map