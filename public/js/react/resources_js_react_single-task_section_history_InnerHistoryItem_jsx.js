"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-task_section_history_InnerHistoryItem_jsx"],{

/***/ "./resources/js/react/single-task/section/history/InnerHistoryItem.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/history/InnerHistoryItem.jsx ***!
  \*****************************************************************************/
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




var InnerHistoryItem = function InnerHistoryItem(_ref) {
  var _history$board_column, _history$board_column2, _history$board_column3;
  var history = _ref.history;
  var user = history ? new _utils_user_details__WEBPACK_IMPORTED_MODULE_1__.User(history.user) : null;
  var details = history === null || history === void 0 ? void 0 : history.lang;
  var _lang = details;

  // add user link
  if (details && user) {
    var name = user.getName();
    var nameLength = name.length;
    var userIndexStart = details.indexOf(name);
    var part1 = details.slice(0, userIndexStart);
    var userName = details.slice(userIndexStart, userIndexStart + nameLength);
    var lastPart = details.slice(userIndexStart + nameLength, details.length - 1);
    userName = "<a class=\"hover-underline\" style=\"color: var(--header_color)!important\" href=\"".concat(user.getUserLink(), "\">").concat(userName, "</a>");
    _lang = "".concat(part1).concat(userName).concat(lastPart);
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "d-flex align-items-center sp1_tark_right_item py-2",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
        src: user === null || user === void 0 ? void 0 : user.getAvatar(),
        alt: user === null || user === void 0 ? void 0 : user.getName(),
        width: 48,
        height: 48,
        style: {
          borderRadius: '4px'
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "px-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        dangerouslySetInnerHTML: {
          __html: _lang
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        children: [(history === null || history === void 0 ? void 0 : history.board_column) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "mr-2",
          style: {
            background: history === null || history === void 0 || (_history$board_column = history.board_column) === null || _history$board_column === void 0 ? void 0 : _history$board_column.label_color,
            color: (history === null || history === void 0 || (_history$board_column2 = history.board_column) === null || _history$board_column2 === void 0 ? void 0 : _history$board_column2.label_color) === '#FFE700' ? '#000000' : '#FFFFFF',
            width: 'fit-content',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '14px'
          },
          children: history === null || history === void 0 || (_history$board_column3 = history.board_column) === null || _history$board_column3 === void 0 ? void 0 : _history$board_column3.column_name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "",
          style: {
            color: '#868892'
          },
          children: dayjs__WEBPACK_IMPORTED_MODULE_2___default()(history === null || history === void 0 ? void 0 : history.formatted_created_at).format('MMM DD, YYYY hh:mm a')
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InnerHistoryItem);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-task_section_history_InnerHistoryItem_jsx.js.map