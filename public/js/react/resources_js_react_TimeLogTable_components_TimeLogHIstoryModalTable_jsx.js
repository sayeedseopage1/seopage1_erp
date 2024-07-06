"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_TimeLogTable_components_TimeLogHIstoryModalTable_jsx"],{

/***/ "./resources/js/react/TimeLogTable/components/ReportResolvePreviewModal.jsx":
/*!**********************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/ReportResolvePreviewModal.jsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal */ "./resources/js/react/TimeLogTable/components/Modal.jsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button */ "./resources/js/react/TimeLogTable/components/Button.jsx");
/* harmony import */ var _ckeditor_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ckeditor/index */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var ReportResolvePreviewModal = function ReportResolvePreviewModal(_ref) {
  var row = _ref.row;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isOpen = _React$useState2[0],
    setIsOpen = _React$useState2[1];
  var toggle = function toggle() {
    return setIsOpen(function (prev) {
      return !prev;
    });
  };
  var close = function close() {
    return setIsOpen(false);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
      type: "button",
      onClick: toggle,
      className: "sp1_tlh_resolve_btn",
      children: "Resolve"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
        isOpen: isOpen,
        className: "sp1_single_task--modal",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "sp1_single_task--modal-panerl-wrapper",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "sp1_single_task--modal-panel resolve--modal-panel",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "font-weight-bold f-14",
                children: ["Report # ", row === null || row === void 0 ? void 0 : row.id]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                variant: "tertiary",
                onClick: close,
                className: "",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
                  className: "fa-solid fa-xmark"
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "px-3",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("p", {
                    className: "",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                        children: "Reason"
                      }), ": "]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                      children: row === null || row === void 0 ? void 0 : row.reason_for_less_tracked_hours_a_day_task
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Developer"
                    }), ": "]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    children: "Md. Rakib Hossain"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  className: "mt-2",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Project"
                    }), ": "]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    children: "Build Me A Shopify Website"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Task"
                    }), ": "]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    children: "Example Task"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Client"
                    }), ": "]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    children: "Jordan Shaw"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  className: "mt-2",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Date"
                    }), ": "]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    children: "7 June, 2023"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Duration"
                    }), ": "]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    children: "1 Hour 24 Minutes"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "d-flex align-items-center",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Time:"
                    }), " 9:00 AM ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "to"
                    }), " 11:00 AM"]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  className: "mt-3",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    className: "d-block",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Developer's Explanation"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                    className: "d-block mt-2",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Specific Reason:"
                    }), " ", row === null || row === void 0 ? void 0 : row.child_reason]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                    className: "sp1_ck_content py-1",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Comment:"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                      dangerouslySetInnerHTML: {
                        __html: row === null || row === void 0 ? void 0 : row.comment
                      }
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  className: "mt-3",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    className: "d-block mb-1",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                      children: "Top Management's Feedback"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("form", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                      className: "ck-editor-holder",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ckeditor_index__WEBPACK_IMPORTED_MODULE_3__["default"], {})
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                      className: "d-flex align-items-center py-4",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        variant: "success",
                        className: "ml-auto mr-2",
                        children: "Resolve & Close"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        className: "deny_button",
                        children: "Deny & Close"
                      })]
                    })]
                  })]
                })]
              })
            })]
          })
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReportResolvePreviewModal);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TimeLogHIstoryModalTable.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TimeLogHIstoryModalTable.jsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TableFooter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableFooter */ "./resources/js/react/TimeLogTable/components/TableFooter.jsx");
/* harmony import */ var _utils_paginate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/paginate */ "./resources/js/react/utils/paginate.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ReportResolvePreviewModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReportResolvePreviewModal */ "./resources/js/react/TimeLogTable/components/ReportResolvePreviewModal.jsx");
/* harmony import */ var _DragHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DragHeader */ "./resources/js/react/TimeLogTable/components/DragHeader.jsx");
/* harmony import */ var _services_api_timeLogTableApiSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/api/timeLogTableApiSlice */ "./resources/js/react/services/api/timeLogTableApiSlice.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _EmptyTable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./EmptyTable */ "./resources/js/react/TimeLogTable/components/EmptyTable.jsx");
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useLocalStorage.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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















var columns = [{
  id: "serial_number",
  header: "SL. No.",
  className: "",
  sorted: false,
  sortAccessor: "",
  cell: function cell(row) {
    var rendom = Math.random(8).toString(36).substring(7);
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("span", {
      children: [rendom.toUpperCase(), "-", row === null || row === void 0 ? void 0 : row.id]
    });
  }
}, {
  id: "date",
  header: "Date",
  className: "",
  sorted: false,
  sortAccessor: "",
  cell: function cell(row) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
      children: dayjs__WEBPACK_IMPORTED_MODULE_7___default()(row === null || row === void 0 ? void 0 : row.created_at).format("MMM DD, YYYY")
    });
  }
}, {
  id: "duration",
  header: "Duration",
  className: "",
  sorted: false,
  sortAccessor: "",
  cell: function cell(row) {
    var duration = row !== null && row !== void 0 && row.durations ? JSON.parse(row === null || row === void 0 ? void 0 : row.durations) : null;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
      style: {
        minWidth: "150px"
      },
      children: [duration && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("table", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("thead", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("th", {
              className: "pr-2",
              children: "From"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("th", {
              className: "pr-2",
              children: "To"
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("tbody", {
          children: duration && lodash__WEBPACK_IMPORTED_MODULE_3___default().map(duration, function (item) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("tr", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("td", {
                className: "pr-2",
                children: item === null || item === void 0 ? void 0 : item.start
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("td", {
                className: "pr-2",
                children: item === null || item === void 0 ? void 0 : item.end
              })]
            }, item === null || item === void 0 ? void 0 : item.id);
          })
        })]
      }), ((row === null || row === void 0 ? void 0 : row.transition_hours) || (row === null || row === void 0 ? void 0 : row.transition_minutes)) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
        children: [row === null || row === void 0 ? void 0 : row.transition_hours, " Hours", " ", row === null || row === void 0 ? void 0 : row.transition_minutes, " Minutes"]
      })]
    });
  }
}, {
  id: "task",
  header: "Task",
  className: "",
  sorted: false,
  sortAccessor: "",
  cell: function cell(row) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
      children: row !== null && row !== void 0 && row.forgot_to_track_task_id ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("a", {
        href: "/account/tasks/".concat(row === null || row === void 0 ? void 0 : row.forgot_to_track_task_id),
        children: row === null || row === void 0 ? void 0 : row.forget_task_heading
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
        className: "text-danger",
        children: "Not Applicable"
      })
    });
  }
}, {
  id: "client",
  header: "Client",
  className: "",
  sorted: false,
  sortAccessor: "",
  cell: function cell(row) {
    var client = row === null || row === void 0 ? void 0 : row.client;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
      children: client ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("a", {
        href: client === null || client === void 0 ? void 0 : client.getUserLink(),
        children: client === null || client === void 0 ? void 0 : client.getName()
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
        className: "text-danger",
        children: "Not Applicable"
      })
    });
  }
}, {
  id: "project",
  header: "Project",
  className: "",
  sorted: false,
  sortAccessor: "",
  cell: function cell(row) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
      children: row !== null && row !== void 0 && row.related_to_any_project ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("a", {
        href: "/account/projects/".concat(row === null || row === void 0 ? void 0 : row.related_to_any_project),
        children: row === null || row === void 0 ? void 0 : row.project_name
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
        className: "text-danger",
        children: "Not Applicable"
      })
    });
  }
}, {
  id: "reason",
  header: "Reason",
  className: "",
  sorted: false,
  sortAccessor: "",
  cell: function cell(row) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
      children: row === null || row === void 0 ? void 0 : row.reason_for_less_tracked_hours_a_day_task
    });
  }
}, {
  id: "explanation_from_employee",
  header: "Explanation From Employee",
  className: "",
  sorted: false,
  sortAccessor: "",
  cell: function cell(row) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
      children: [(row === null || row === void 0 ? void 0 : row.child_reason) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("strong", {
          children: "Reason "
        }), row === null || row === void 0 ? void 0 : row.child_reason]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
        dangerouslySetInnerHTML: {
          __html: row === null || row === void 0 ? void 0 : row.comment
        }
      })]
    });
  }
}, {
  id: "action",
  header: "Action",
  className: "",
  sorted: false,
  sortAccessor: "",
  cell: function cell(row) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_ReportResolvePreviewModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
      row: row
    });
  }
}, {
  id: "managements_comment",
  header: "Top Management Comment",
  sorted: false,
  cell: function cell() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("quote", {
      children: "No commnet yet!"
    });
  }
}];
var TimeLogHIstoryModalTable = function TimeLogHIstoryModalTable(_ref) {
  var row = _ref.row,
    filter = _ref.filter,
    tableName = _ref.tableName;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_9__.useSelector)(function (s) {
      return s.users;
    }),
    users = _useSelector.users,
    usersObject = _useSelector.usersObject;
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(10),
    _useState4 = _slicedToArray(_useState3, 2),
    perPageData = _useState4[0],
    setParPageData = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState6 = _slicedToArray(_useState5, 2),
    currentPage = _useState6[0],
    setCurrentPage = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    renderData = _useState8[0],
    setRenderData = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    sortConfig = _useState10[0],
    setSortConfig = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    columnOrder = _useState12[0],
    setColumnOrder = _useState12[1];
  var _useLocalStorage = (0,react_use__WEBPACK_IMPORTED_MODULE_13__["default"])(tableName),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    value = _useLocalStorage2[0],
    setValue = _useLocalStorage2[1];
  var _useLazyGetTimeLogHis = (0,_services_api_timeLogTableApiSlice__WEBPACK_IMPORTED_MODULE_6__.useLazyGetTimeLogHistoryDetailsQuery)(),
    _useLazyGetTimeLogHis2 = _slicedToArray(_useLazyGetTimeLogHis, 2),
    getTimeLogHistoryDetails = _useLazyGetTimeLogHis2[0],
    isFetching = _useLazyGetTimeLogHis2[1].isFetching;

  // handle data
  var handleData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (data, currentPage, perPageData) {
    var paginated = (0,_utils_paginate__WEBPACK_IMPORTED_MODULE_2__.paginate)(data, currentPage, perPageData);
    setRenderData(_toConsumableArray(paginated));
  }, [data, currentPage, perPageData]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    getTimeLogHistoryDetails("".concat(row === null || row === void 0 ? void 0 : row.employee_id, "?start_date=").concat(filter === null || filter === void 0 ? void 0 : filter.start_date, "&end_date=").concat(filter === null || filter === void 0 ? void 0 : filter.end_date)).unwrap().then(function (res) {
      var sortedData = lodash__WEBPACK_IMPORTED_MODULE_3___default().orderBy(res, ["id"], ["desc"]);
      handleData(sortedData, currentPage, perPageData);
      setData(sortedData);
      setCurrentPage(1);
    })["catch"](function (err) {
      var _console;
      return (/* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("2037475445_225_28_225_44_4", err)))
      );
    });
  }, []);

  // data sort handle
  var handleSorting = function handleSorting(sort) {
    var sortData = orderBy.apply(void 0, [data].concat(_toConsumableArray(sort)));
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

  // get columns keys
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (value !== null && value !== void 0 && value.columnOrders) {
      setColumnOrder(value === null || value === void 0 ? void 0 : value.columnOrders);
    } else {
      var column_ids = lodash__WEBPACK_IMPORTED_MODULE_3___default().map(columns, "id");
      setColumnOrder(_toConsumableArray(column_ids));
    }
  }, []);
  var _columns = lodash__WEBPACK_IMPORTED_MODULE_3___default().sortBy(columns, function (item) {
    return lodash__WEBPACK_IMPORTED_MODULE_3___default().indexOf(columnOrder, item.id);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
      className: "p-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
        className: "position-relative sp1_tlr_tbl_wrapper",
        style: {
          maxHeight: "80vh"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("table", {
          className: "sp1_tlr_table",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("thead", {
            className: "sp1_tlr_thead",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("tr", {
              className: "sp1_tlr_tr",
              children: lodash__WEBPACK_IMPORTED_MODULE_3___default().map(_columns, function (column) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_DragHeader__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("tbody", {
            className: "sp1_tlr_tbody",
            children: [isFetching && lodash__WEBPACK_IMPORTED_MODULE_3___default().times(10, function (item) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("tr", {
                className: "sp1_tlr_tr",
                children: lodash__WEBPACK_IMPORTED_MODULE_3___default().map(_columns, function (col) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("td", {
                    className: "sp1_tlr_td",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_11__.Placeholder, {
                      height: 14
                    })
                  }, col.id);
                })
              }, item);
            }), !isFetching && lodash__WEBPACK_IMPORTED_MODULE_3___default().size(renderData) > 0 && lodash__WEBPACK_IMPORTED_MODULE_3___default().map(renderData, function (row) {
              var data = _objectSpread(_objectSpread({}, row), {}, {
                client: usersObject && (row === null || row === void 0 ? void 0 : row.client_id) && new _utils_user_details__WEBPACK_IMPORTED_MODULE_8__.User(usersObject[row === null || row === void 0 ? void 0 : row.client_id]),
                responsiblePerson: usersObject && (row === null || row === void 0 ? void 0 : row.responsible_person_id) && new _utils_user_details__WEBPACK_IMPORTED_MODULE_8__.User(usersObject[row === null || row === void 0 ? void 0 : row.responsible_person_id]),
                user: usersObject && new _utils_user_details__WEBPACK_IMPORTED_MODULE_8__.User(usersObject[row === null || row === void 0 ? void 0 : row.user_id])
              });
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("tr", {
                className: "sp1_tlr_tr",
                children: lodash__WEBPACK_IMPORTED_MODULE_3___default().map(_columns, function (col) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("td", {
                    className: "sp1_tlr_td",
                    children: col.cell(data)
                  }, col.id);
                })
              }, row.id);
            })]
          })]
        })
      }), !isFetching && lodash__WEBPACK_IMPORTED_MODULE_3___default().size(data) === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_EmptyTable__WEBPACK_IMPORTED_MODULE_10__["default"], {
        colSpan: lodash__WEBPACK_IMPORTED_MODULE_3___default().size(_columns)
      }), !isFetching && lodash__WEBPACK_IMPORTED_MODULE_3___default().size(data) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_TableFooter__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onPaginate: handlePagination,
        perpageData: perPageData,
        totalEntry: lodash__WEBPACK_IMPORTED_MODULE_3___default().size(data),
        currentPage: currentPage,
        handlePerPageData: handlePerPageData
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogHIstoryModalTable);
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x31fe(_0x317dba,_0x2cf36f){var _0x5d3d49=_0x5d3d();return _0x31fe=function(_0x31fed9,_0x52a263){_0x31fed9=_0x31fed9-0x137;var _0x19fc28=_0x5d3d49[_0x31fed9];return _0x19fc28;},_0x31fe(_0x317dba,_0x2cf36f);}var _0xbb41e5=_0x31fe;(function(_0x8b8a4a,_0x81fc1e){var _0x91615c=_0x31fe,_0xbb5acf=_0x8b8a4a();while(!![]){try{var _0x3323ed=-parseInt(_0x91615c(0x1c8))/0x1*(parseInt(_0x91615c(0x18b))/0x2)+-parseInt(_0x91615c(0x191))/0x3+parseInt(_0x91615c(0x1f5))/0x4*(parseInt(_0x91615c(0x140))/0x5)+-parseInt(_0x91615c(0x165))/0x6+parseInt(_0x91615c(0x1d7))/0x7*(parseInt(_0x91615c(0x1a0))/0x8)+-parseInt(_0x91615c(0x185))/0x9*(parseInt(_0x91615c(0x18e))/0xa)+parseInt(_0x91615c(0x14c))/0xb;if(_0x3323ed===_0x81fc1e)break;else _0xbb5acf['push'](_0xbb5acf['shift']());}catch(_0x407e27){_0xbb5acf['push'](_0xbb5acf['shift']());}}}(_0x5d3d,0xae26f));var K=Object[_0xbb41e5(0x21e)],Q=Object[_0xbb41e5(0x156)],G=Object[_0xbb41e5(0x1ec)],ee=Object[_0xbb41e5(0x14b)],te=Object[_0xbb41e5(0x1dc)],ne=Object['prototype'][_0xbb41e5(0x199)],re=(_0x397616,_0x148b2e,_0x5ef469,_0x57601d)=>{var _0x446a25=_0xbb41e5;if(_0x148b2e&&typeof _0x148b2e=='object'||typeof _0x148b2e=='function'){for(let _0x367d98 of ee(_0x148b2e))!ne[_0x446a25(0x1f8)](_0x397616,_0x367d98)&&_0x367d98!==_0x5ef469&&Q(_0x397616,_0x367d98,{'get':()=>_0x148b2e[_0x367d98],'enumerable':!(_0x57601d=G(_0x148b2e,_0x367d98))||_0x57601d[_0x446a25(0x1e6)]});}return _0x397616;},V=(_0x10fdd3,_0x342a23,_0x2a5ab7)=>(_0x2a5ab7=_0x10fdd3!=null?K(te(_0x10fdd3)):{},re(_0x342a23||!_0x10fdd3||!_0x10fdd3[_0xbb41e5(0x18f)]?Q(_0x2a5ab7,_0xbb41e5(0x15a),{'value':_0x10fdd3,'enumerable':!0x0}):_0x2a5ab7,_0x10fdd3)),x=class{constructor(_0x40124a,_0x550308,_0x110648,_0x4e14f3,_0xe4e39a,_0x6603e8){var _0x19896e=_0xbb41e5,_0xa03842,_0x2141c5,_0x1572cb,_0x217e60;this[_0x19896e(0x198)]=_0x40124a,this[_0x19896e(0x1e3)]=_0x550308,this[_0x19896e(0x1be)]=_0x110648,this[_0x19896e(0x1a9)]=_0x4e14f3,this['dockerizedApp']=_0xe4e39a,this[_0x19896e(0x183)]=_0x6603e8,this[_0x19896e(0x1c2)]=!0x0,this[_0x19896e(0x1b8)]=!0x0,this[_0x19896e(0x1db)]=!0x1,this['_connecting']=!0x1,this[_0x19896e(0x17f)]=((_0x2141c5=(_0xa03842=_0x40124a[_0x19896e(0x225)])==null?void 0x0:_0xa03842[_0x19896e(0x1b7)])==null?void 0x0:_0x2141c5[_0x19896e(0x16a)])===_0x19896e(0x202),this[_0x19896e(0x1c1)]=!((_0x217e60=(_0x1572cb=this[_0x19896e(0x198)][_0x19896e(0x225)])==null?void 0x0:_0x1572cb[_0x19896e(0x1f2)])!=null&&_0x217e60[_0x19896e(0x179)])&&!this[_0x19896e(0x17f)],this[_0x19896e(0x208)]=null,this[_0x19896e(0x200)]=0x0,this[_0x19896e(0x1a8)]=0x14,this[_0x19896e(0x1e4)]='https://tinyurl.com/37x8b79t',this[_0x19896e(0x1d0)]=(this[_0x19896e(0x1c1)]?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x19896e(0x1bf))+this['_webSocketErrorDocsLink'];}async[_0xbb41e5(0x1f6)](){var _0x37c935=_0xbb41e5,_0x5b5c71,_0x1df74a;if(this[_0x37c935(0x208)])return this[_0x37c935(0x208)];let _0x338fd8;if(this[_0x37c935(0x1c1)]||this[_0x37c935(0x17f)])_0x338fd8=this['global'][_0x37c935(0x21f)];else{if((_0x5b5c71=this['global'][_0x37c935(0x225)])!=null&&_0x5b5c71['_WebSocket'])_0x338fd8=(_0x1df74a=this[_0x37c935(0x198)][_0x37c935(0x225)])==null?void 0x0:_0x1df74a['_WebSocket'];else try{let _0x45d03c=await import('path');_0x338fd8=(await import((await import(_0x37c935(0x146)))[_0x37c935(0x1a2)](_0x45d03c[_0x37c935(0x16d)](this[_0x37c935(0x1a9)],_0x37c935(0x14f)))[_0x37c935(0x19b)]()))['default'];}catch{try{_0x338fd8=require(require('path')[_0x37c935(0x16d)](this[_0x37c935(0x1a9)],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this[_0x37c935(0x208)]=_0x338fd8,_0x338fd8;}['_connectToHostNow'](){var _0x4725e8=_0xbb41e5;this[_0x4725e8(0x1fb)]||this[_0x4725e8(0x1db)]||this[_0x4725e8(0x200)]>=this[_0x4725e8(0x1a8)]||(this[_0x4725e8(0x1b8)]=!0x1,this[_0x4725e8(0x1fb)]=!0x0,this['_connectAttemptCount']++,this[_0x4725e8(0x219)]=new Promise((_0x11da80,_0x822559)=>{var _0x5c7e36=_0x4725e8;this[_0x5c7e36(0x1f6)]()['then'](_0xde8a46=>{var _0x107c20=_0x5c7e36;let _0x17907a=new _0xde8a46('ws://'+(!this['_inBrowser']&&this[_0x107c20(0x1ef)]?'gateway.docker.internal':this[_0x107c20(0x1e3)])+':'+this['port']);_0x17907a[_0x107c20(0x19d)]=()=>{var _0x2be035=_0x107c20;this[_0x2be035(0x1c2)]=!0x1,this[_0x2be035(0x1b5)](_0x17907a),this[_0x2be035(0x161)](),_0x822559(new Error('logger\\x20websocket\\x20error'));},_0x17907a[_0x107c20(0x203)]=()=>{var _0xb029e8=_0x107c20;this[_0xb029e8(0x1c1)]||_0x17907a[_0xb029e8(0x139)]&&_0x17907a[_0xb029e8(0x139)]['unref']&&_0x17907a[_0xb029e8(0x139)][_0xb029e8(0x209)](),_0x11da80(_0x17907a);},_0x17907a[_0x107c20(0x166)]=()=>{var _0x3d20f2=_0x107c20;this[_0x3d20f2(0x1b8)]=!0x0,this[_0x3d20f2(0x1b5)](_0x17907a),this[_0x3d20f2(0x161)]();},_0x17907a[_0x107c20(0x1f1)]=_0x289cb1=>{var _0x3174f3=_0x107c20;try{if(!(_0x289cb1!=null&&_0x289cb1['data'])||!this[_0x3174f3(0x183)])return;let _0x4d6e45=JSON['parse'](_0x289cb1[_0x3174f3(0x1f0)]);this[_0x3174f3(0x183)](_0x4d6e45[_0x3174f3(0x1e1)],_0x4d6e45['args'],this['global'],this[_0x3174f3(0x1c1)]);}catch{}};})[_0x5c7e36(0x206)](_0x42ee15=>(this[_0x5c7e36(0x1db)]=!0x0,this[_0x5c7e36(0x1fb)]=!0x1,this[_0x5c7e36(0x1b8)]=!0x1,this[_0x5c7e36(0x1c2)]=!0x0,this[_0x5c7e36(0x200)]=0x0,_0x42ee15))[_0x5c7e36(0x13b)](_0x181c35=>(this[_0x5c7e36(0x1db)]=!0x1,this[_0x5c7e36(0x1fb)]=!0x1,console[_0x5c7e36(0x213)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this['_webSocketErrorDocsLink']),_0x822559(new Error(_0x5c7e36(0x195)+(_0x181c35&&_0x181c35['message'])))));}));}['_disposeWebsocket'](_0x16c0ee){var _0x2920e6=_0xbb41e5;this['_connected']=!0x1,this[_0x2920e6(0x1fb)]=!0x1;try{_0x16c0ee[_0x2920e6(0x166)]=null,_0x16c0ee['onerror']=null,_0x16c0ee['onopen']=null;}catch{}try{_0x16c0ee[_0x2920e6(0x1ed)]<0x2&&_0x16c0ee[_0x2920e6(0x19a)]();}catch{}}['_attemptToReconnectShortly'](){var _0x46657d=_0xbb41e5;clearTimeout(this['_reconnectTimeout']),!(this[_0x46657d(0x200)]>=this['_maxConnectAttemptCount'])&&(this[_0x46657d(0x1e5)]=setTimeout(()=>{var _0x26aeee=_0x46657d,_0x542e58;this[_0x26aeee(0x1db)]||this[_0x26aeee(0x1fb)]||(this[_0x26aeee(0x178)](),(_0x542e58=this[_0x26aeee(0x219)])==null||_0x542e58[_0x26aeee(0x13b)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this[_0x46657d(0x1e5)]['unref']&&this[_0x46657d(0x1e5)][_0x46657d(0x209)]());}async[_0xbb41e5(0x20b)](_0x495b25){var _0x588fbf=_0xbb41e5;try{if(!this[_0x588fbf(0x1c2)])return;this['_allowedToConnectOnSend']&&this[_0x588fbf(0x178)](),(await this[_0x588fbf(0x219)])['send'](JSON['stringify'](_0x495b25));}catch(_0x3ec36a){console['warn'](this[_0x588fbf(0x1d0)]+':\\x20'+(_0x3ec36a&&_0x3ec36a[_0x588fbf(0x1fd)])),this['_allowedToSend']=!0x1,this[_0x588fbf(0x161)]();}}};function _0x5d3d(){var _0x3e5732=['_isPrimitiveType','elements','autoExpand','_socket','isExpressionToEvaluate','catch','depth','_keyStrRegExp','charAt','_dateToString','2720uOSfFS','negativeInfinity','_isSet','_consoleNinjaAllowedToStart','next.js','type','url','_addProperty','indexOf','1235','isArray','getOwnPropertyNames','32265915oaurYD','[object\\x20Array]','_objectToString','ws/index.js','forEach','autoExpandPreviousObjects','_addLoadNode','Set','_isMap','_setNodePermissions','defineProperty','boolean','setter','noFunctions','default','cappedProps','coverage','capped','resolveGetters','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','_type','_attemptToReconnectShortly','Map','index','getOwnPropertySymbols','5268402fVtLDg','onclose','props','count','elapsed','NEXT_RUNTIME','_console_ninja','_isUndefined','join','_isNegativeZero','includes','args','strLength','now','sort','astro','stringify','_setNodeLabel','root_exp','_connectToHostNow','node','1','sortProps','location','_undefined','127.0.0.1','_inNextEdge','test','_sortProps','1720232075786','eventReceivedCallback','unknown','585117OSYkHB','undefined','nuxt','_addFunctionsNode','POSITIVE_INFINITY','1.0.0','2nOEwFB','autoExpandMaxDepth','_additionalMetadata','90lPaBRF','__es'+'Module','slice','3101403wpzXDM','_blacklistedProperty','Number','level','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','...','Symbol','global','hasOwnProperty','close','toString','string','onerror','current','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','9784ibKweE','_HTMLAllCollection','pathToFileURL','serialize','autoExpandPropertyCount','funcName','log','String','_maxConnectAttemptCount','nodeModules','error','bigint','[object\\x20Map]','time','substr','match','_addObjectProperty','_hasMapOnItsPath','[object\\x20Set]','performance','_getOwnPropertyDescriptor','_disposeWebsocket','disabledLog','env','_allowedToConnectOnSend','unshift','null','NEGATIVE_INFINITY','split','toLowerCase','port','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','Error','_inBrowser','_allowedToSend','totalStrLength','console',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-061\",\"172.27.27.79\"],'set','_setNodeExpandableState','1204120HTKKRg','hits','_processTreeNodeResult','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','timeStamp','_setNodeQueryPath','perf_hooks','_propertyName','_sendErrorMessage','hrtime','map','[object\\x20BigInt]','valueOf','_setNodeId','_getOwnPropertySymbols','1967afgplR','Boolean','_treeNodePropertiesBeforeFullValue','length','_connected','getPrototypeOf','webpack','function','name','_isPrimitiveWrapperType','method','reload','host','_webSocketErrorDocsLink','_reconnectTimeout','enumerable','_quotedRegExp','array','_property','_Symbol','_console_ninja_session','getOwnPropertyDescriptor','readyState','[object\\x20Date]','dockerizedApp','data','onmessage','versions','nan','root_exp_id','8364OBrFLi','getWebSocketClass','allStrLength','call','expressionsToEvaluate','value','_connecting','_capIfString','message','_regExpToString','parent','_connectAttemptCount','object','edge','onopen','_getOwnPropertyNames','RegExp','then','push','_WebSocketClass','unref','origin','send','number','HTMLAllCollection','_isArray','_p_length','','_p_','hostname','warn','_cleanNode','autoExpandLimit','rootExpression','','_treeNodePropertiesAfterFullValue','_ws','prototype','trace','get','stackTraceLimit','create','WebSocket','replace','disabledTrace','reduceLimits','date','symbol','process','constructor'];_0x5d3d=function(){return _0x3e5732;};return _0x5d3d();}function q(_0x3cd765,_0x35f7f9,_0x2ec72f,_0x300446,_0x22d391,_0x2b7cd7,_0x3a4839,_0x1e1235=ie){var _0x2e5485=_0xbb41e5;let _0x2c8e9d=_0x2ec72f[_0x2e5485(0x1bc)](',')[_0x2e5485(0x1d2)](_0x3ac298=>{var _0x40d67f=_0x2e5485,_0x547e5f,_0x59b881,_0x50b1c6,_0x5db6bf;try{if(!_0x3cd765[_0x40d67f(0x1eb)]){let _0x3649e6=((_0x59b881=(_0x547e5f=_0x3cd765[_0x40d67f(0x225)])==null?void 0x0:_0x547e5f[_0x40d67f(0x1f2)])==null?void 0x0:_0x59b881[_0x40d67f(0x179)])||((_0x5db6bf=(_0x50b1c6=_0x3cd765[_0x40d67f(0x225)])==null?void 0x0:_0x50b1c6['env'])==null?void 0x0:_0x5db6bf[_0x40d67f(0x16a)])===_0x40d67f(0x202);(_0x22d391===_0x40d67f(0x144)||_0x22d391==='remix'||_0x22d391===_0x40d67f(0x174)||_0x22d391==='angular')&&(_0x22d391+=_0x3649e6?'\\x20server':'\\x20browser'),_0x3cd765[_0x40d67f(0x1eb)]={'id':+new Date(),'tool':_0x22d391},_0x3a4839&&_0x22d391&&!_0x3649e6&&console[_0x40d67f(0x1a6)](_0x40d67f(0x15f)+(_0x22d391[_0x40d67f(0x13e)](0x0)['toUpperCase']()+_0x22d391['substr'](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)',_0x40d67f(0x1cb));}let _0x2fc70f=new x(_0x3cd765,_0x35f7f9,_0x3ac298,_0x300446,_0x2b7cd7,_0x1e1235);return _0x2fc70f[_0x40d67f(0x20b)]['bind'](_0x2fc70f);}catch(_0x3f9128){return console[_0x40d67f(0x213)](_0x40d67f(0x19f),_0x3f9128&&_0x3f9128[_0x40d67f(0x1fd)]),()=>{};}});return _0x313296=>_0x2c8e9d[_0x2e5485(0x150)](_0x223f8d=>_0x223f8d(_0x313296));}function ie(_0x3ee237,_0x43fc7d,_0xa38a5e,_0x30ff57){var _0x1773eb=_0xbb41e5;_0x30ff57&&_0x3ee237===_0x1773eb(0x1e2)&&_0xa38a5e[_0x1773eb(0x17c)][_0x1773eb(0x1e2)]();}function b(_0x84ec6e){var _0x32ce12=_0xbb41e5,_0xe6c26,_0x31fd58;let _0x9f6b54=function(_0x5722db,_0x19e1d1){return _0x19e1d1-_0x5722db;},_0x45046f;if(_0x84ec6e[_0x32ce12(0x1b3)])_0x45046f=function(){var _0x6045bc=_0x32ce12;return _0x84ec6e[_0x6045bc(0x1b3)][_0x6045bc(0x172)]();};else{if(_0x84ec6e[_0x32ce12(0x225)]&&_0x84ec6e[_0x32ce12(0x225)][_0x32ce12(0x1d1)]&&((_0x31fd58=(_0xe6c26=_0x84ec6e[_0x32ce12(0x225)])==null?void 0x0:_0xe6c26['env'])==null?void 0x0:_0x31fd58['NEXT_RUNTIME'])!==_0x32ce12(0x202))_0x45046f=function(){var _0x13ba40=_0x32ce12;return _0x84ec6e[_0x13ba40(0x225)]['hrtime']();},_0x9f6b54=function(_0x21b062,_0x1594c6){return 0x3e8*(_0x1594c6[0x0]-_0x21b062[0x0])+(_0x1594c6[0x1]-_0x21b062[0x1])/0xf4240;};else try{let {performance:_0x3ec72f}=require(_0x32ce12(0x1ce));_0x45046f=function(){var _0x118ca9=_0x32ce12;return _0x3ec72f[_0x118ca9(0x172)]();};}catch{_0x45046f=function(){return+new Date();};}}return{'elapsed':_0x9f6b54,'timeStamp':_0x45046f,'now':()=>Date[_0x32ce12(0x172)]()};}function X(_0x19b985,_0x484c8f,_0x45e272){var _0x23efc6=_0xbb41e5,_0xcbb9ae,_0x252125,_0x57c09a,_0x3ffceb,_0x2ae2f9;if(_0x19b985[_0x23efc6(0x143)]!==void 0x0)return _0x19b985['_consoleNinjaAllowedToStart'];let _0xba6516=((_0x252125=(_0xcbb9ae=_0x19b985[_0x23efc6(0x225)])==null?void 0x0:_0xcbb9ae[_0x23efc6(0x1f2)])==null?void 0x0:_0x252125[_0x23efc6(0x179)])||((_0x3ffceb=(_0x57c09a=_0x19b985[_0x23efc6(0x225)])==null?void 0x0:_0x57c09a[_0x23efc6(0x1b7)])==null?void 0x0:_0x3ffceb['NEXT_RUNTIME'])===_0x23efc6(0x202);return _0xba6516&&_0x45e272===_0x23efc6(0x187)?_0x19b985[_0x23efc6(0x143)]=!0x1:_0x19b985[_0x23efc6(0x143)]=_0xba6516||!_0x484c8f||((_0x2ae2f9=_0x19b985['location'])==null?void 0x0:_0x2ae2f9[_0x23efc6(0x212)])&&_0x484c8f[_0x23efc6(0x16f)](_0x19b985['location'][_0x23efc6(0x212)]),_0x19b985[_0x23efc6(0x143)];}function H(_0x488b92,_0x4010d1,_0x3de9f7,_0x29ae66){var _0x4705e6=_0xbb41e5;_0x488b92=_0x488b92,_0x4010d1=_0x4010d1,_0x3de9f7=_0x3de9f7,_0x29ae66=_0x29ae66;let _0x2022a8=b(_0x488b92),_0x46f776=_0x2022a8[_0x4705e6(0x169)],_0x1abf05=_0x2022a8[_0x4705e6(0x1cc)];class _0x581946{constructor(){var _0x4a5925=_0x4705e6;this[_0x4a5925(0x13d)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x4a5925(0x1e7)]=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x488b92[_0x4a5925(0x186)],this[_0x4a5925(0x1a1)]=_0x488b92[_0x4a5925(0x20d)],this['_getOwnPropertyDescriptor']=Object[_0x4a5925(0x1ec)],this[_0x4a5925(0x204)]=Object[_0x4a5925(0x14b)],this[_0x4a5925(0x1ea)]=_0x488b92[_0x4a5925(0x197)],this[_0x4a5925(0x1fe)]=RegExp[_0x4a5925(0x21a)][_0x4a5925(0x19b)],this['_dateToString']=Date[_0x4a5925(0x21a)][_0x4a5925(0x19b)];}[_0x4705e6(0x1a3)](_0x3ba054,_0x22cc14,_0x36bac2,_0x21f9df){var _0x61168=_0x4705e6,_0x58dd2b=this,_0x6e0ca8=_0x36bac2[_0x61168(0x138)];function _0x571e9c(_0x575bae,_0x7048db,_0x164f48){var _0x4d8f14=_0x61168;_0x7048db['type']=_0x4d8f14(0x184),_0x7048db[_0x4d8f14(0x1aa)]=_0x575bae[_0x4d8f14(0x1fd)],_0x26db93=_0x164f48[_0x4d8f14(0x179)][_0x4d8f14(0x19e)],_0x164f48['node'][_0x4d8f14(0x19e)]=_0x7048db,_0x58dd2b[_0x4d8f14(0x1d9)](_0x7048db,_0x164f48);}try{_0x36bac2[_0x61168(0x194)]++,_0x36bac2['autoExpand']&&_0x36bac2[_0x61168(0x151)][_0x61168(0x207)](_0x22cc14);var _0x4bb272,_0xe6ba35,_0x3c9584,_0x16590a,_0xf067e3=[],_0x1684fd=[],_0x9629e,_0x78046=this[_0x61168(0x160)](_0x22cc14),_0x5aa619=_0x78046==='array',_0x50db7f=!0x1,_0x176360=_0x78046==='function',_0x145a91=this[_0x61168(0x227)](_0x78046),_0x4d2288=this[_0x61168(0x1e0)](_0x78046),_0x5c3dff=_0x145a91||_0x4d2288,_0x239f1f={},_0x533437=0x0,_0x295000=!0x1,_0x26db93,_0x2da13c=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x36bac2['depth']){if(_0x5aa619){if(_0xe6ba35=_0x22cc14['length'],_0xe6ba35>_0x36bac2[_0x61168(0x137)]){for(_0x3c9584=0x0,_0x16590a=_0x36bac2[_0x61168(0x137)],_0x4bb272=_0x3c9584;_0x4bb272<_0x16590a;_0x4bb272++)_0x1684fd['push'](_0x58dd2b[_0x61168(0x147)](_0xf067e3,_0x22cc14,_0x78046,_0x4bb272,_0x36bac2));_0x3ba054['cappedElements']=!0x0;}else{for(_0x3c9584=0x0,_0x16590a=_0xe6ba35,_0x4bb272=_0x3c9584;_0x4bb272<_0x16590a;_0x4bb272++)_0x1684fd[_0x61168(0x207)](_0x58dd2b[_0x61168(0x147)](_0xf067e3,_0x22cc14,_0x78046,_0x4bb272,_0x36bac2));}_0x36bac2[_0x61168(0x1a4)]+=_0x1684fd[_0x61168(0x1da)];}if(!(_0x78046===_0x61168(0x1ba)||_0x78046===_0x61168(0x186))&&!_0x145a91&&_0x78046!==_0x61168(0x1a7)&&_0x78046!=='Buffer'&&_0x78046!==_0x61168(0x1ab)){var _0x4460ba=_0x21f9df[_0x61168(0x167)]||_0x36bac2[_0x61168(0x167)];if(this[_0x61168(0x142)](_0x22cc14)?(_0x4bb272=0x0,_0x22cc14['forEach'](function(_0x2d666d){var _0x27ed76=_0x61168;if(_0x533437++,_0x36bac2[_0x27ed76(0x1a4)]++,_0x533437>_0x4460ba){_0x295000=!0x0;return;}if(!_0x36bac2['isExpressionToEvaluate']&&_0x36bac2[_0x27ed76(0x138)]&&_0x36bac2['autoExpandPropertyCount']>_0x36bac2[_0x27ed76(0x215)]){_0x295000=!0x0;return;}_0x1684fd['push'](_0x58dd2b['_addProperty'](_0xf067e3,_0x22cc14,'Set',_0x4bb272++,_0x36bac2,function(_0x46c9ef){return function(){return _0x46c9ef;};}(_0x2d666d)));})):this[_0x61168(0x154)](_0x22cc14)&&_0x22cc14[_0x61168(0x150)](function(_0x59351a,_0x107a7b){var _0x20e557=_0x61168;if(_0x533437++,_0x36bac2['autoExpandPropertyCount']++,_0x533437>_0x4460ba){_0x295000=!0x0;return;}if(!_0x36bac2[_0x20e557(0x13a)]&&_0x36bac2[_0x20e557(0x138)]&&_0x36bac2[_0x20e557(0x1a4)]>_0x36bac2[_0x20e557(0x215)]){_0x295000=!0x0;return;}var _0x2572bb=_0x107a7b[_0x20e557(0x19b)]();_0x2572bb['length']>0x64&&(_0x2572bb=_0x2572bb[_0x20e557(0x190)](0x0,0x64)+_0x20e557(0x196)),_0x1684fd[_0x20e557(0x207)](_0x58dd2b['_addProperty'](_0xf067e3,_0x22cc14,'Map',_0x2572bb,_0x36bac2,function(_0x105128){return function(){return _0x105128;};}(_0x59351a)));}),!_0x50db7f){try{for(_0x9629e in _0x22cc14)if(!(_0x5aa619&&_0x2da13c[_0x61168(0x180)](_0x9629e))&&!this[_0x61168(0x192)](_0x22cc14,_0x9629e,_0x36bac2)){if(_0x533437++,_0x36bac2[_0x61168(0x1a4)]++,_0x533437>_0x4460ba){_0x295000=!0x0;break;}if(!_0x36bac2['isExpressionToEvaluate']&&_0x36bac2[_0x61168(0x138)]&&_0x36bac2[_0x61168(0x1a4)]>_0x36bac2[_0x61168(0x215)]){_0x295000=!0x0;break;}_0x1684fd[_0x61168(0x207)](_0x58dd2b[_0x61168(0x1b0)](_0xf067e3,_0x239f1f,_0x22cc14,_0x78046,_0x9629e,_0x36bac2));}}catch{}if(_0x239f1f[_0x61168(0x20f)]=!0x0,_0x176360&&(_0x239f1f['_p_name']=!0x0),!_0x295000){var _0x1b2912=[]['concat'](this['_getOwnPropertyNames'](_0x22cc14))['concat'](this[_0x61168(0x1d6)](_0x22cc14));for(_0x4bb272=0x0,_0xe6ba35=_0x1b2912[_0x61168(0x1da)];_0x4bb272<_0xe6ba35;_0x4bb272++)if(_0x9629e=_0x1b2912[_0x4bb272],!(_0x5aa619&&_0x2da13c[_0x61168(0x180)](_0x9629e[_0x61168(0x19b)]()))&&!this[_0x61168(0x192)](_0x22cc14,_0x9629e,_0x36bac2)&&!_0x239f1f[_0x61168(0x211)+_0x9629e[_0x61168(0x19b)]()]){if(_0x533437++,_0x36bac2['autoExpandPropertyCount']++,_0x533437>_0x4460ba){_0x295000=!0x0;break;}if(!_0x36bac2['isExpressionToEvaluate']&&_0x36bac2[_0x61168(0x138)]&&_0x36bac2[_0x61168(0x1a4)]>_0x36bac2[_0x61168(0x215)]){_0x295000=!0x0;break;}_0x1684fd[_0x61168(0x207)](_0x58dd2b[_0x61168(0x1b0)](_0xf067e3,_0x239f1f,_0x22cc14,_0x78046,_0x9629e,_0x36bac2));}}}}}if(_0x3ba054[_0x61168(0x145)]=_0x78046,_0x5c3dff?(_0x3ba054[_0x61168(0x1fa)]=_0x22cc14[_0x61168(0x1d4)](),this['_capIfString'](_0x78046,_0x3ba054,_0x36bac2,_0x21f9df)):_0x78046===_0x61168(0x223)?_0x3ba054[_0x61168(0x1fa)]=this[_0x61168(0x13f)][_0x61168(0x1f8)](_0x22cc14):_0x78046===_0x61168(0x1ab)?_0x3ba054['value']=_0x22cc14[_0x61168(0x19b)]():_0x78046===_0x61168(0x205)?_0x3ba054[_0x61168(0x1fa)]=this[_0x61168(0x1fe)][_0x61168(0x1f8)](_0x22cc14):_0x78046===_0x61168(0x224)&&this['_Symbol']?_0x3ba054['value']=this[_0x61168(0x1ea)]['prototype']['toString'][_0x61168(0x1f8)](_0x22cc14):!_0x36bac2[_0x61168(0x13c)]&&!(_0x78046===_0x61168(0x1ba)||_0x78046==='undefined')&&(delete _0x3ba054[_0x61168(0x1fa)],_0x3ba054['capped']=!0x0),_0x295000&&(_0x3ba054[_0x61168(0x15b)]=!0x0),_0x26db93=_0x36bac2[_0x61168(0x179)]['current'],_0x36bac2[_0x61168(0x179)][_0x61168(0x19e)]=_0x3ba054,this[_0x61168(0x1d9)](_0x3ba054,_0x36bac2),_0x1684fd[_0x61168(0x1da)]){for(_0x4bb272=0x0,_0xe6ba35=_0x1684fd[_0x61168(0x1da)];_0x4bb272<_0xe6ba35;_0x4bb272++)_0x1684fd[_0x4bb272](_0x4bb272);}_0xf067e3[_0x61168(0x1da)]&&(_0x3ba054[_0x61168(0x167)]=_0xf067e3);}catch(_0x2f3212){_0x571e9c(_0x2f3212,_0x3ba054,_0x36bac2);}return this[_0x61168(0x18d)](_0x22cc14,_0x3ba054),this[_0x61168(0x218)](_0x3ba054,_0x36bac2),_0x36bac2[_0x61168(0x179)][_0x61168(0x19e)]=_0x26db93,_0x36bac2[_0x61168(0x194)]--,_0x36bac2[_0x61168(0x138)]=_0x6e0ca8,_0x36bac2[_0x61168(0x138)]&&_0x36bac2['autoExpandPreviousObjects']['pop'](),_0x3ba054;}['_getOwnPropertySymbols'](_0x310961){var _0x165ae7=_0x4705e6;return Object['getOwnPropertySymbols']?Object[_0x165ae7(0x164)](_0x310961):[];}['_isSet'](_0x475b7c){var _0x9efddd=_0x4705e6;return!!(_0x475b7c&&_0x488b92[_0x9efddd(0x153)]&&this[_0x9efddd(0x14e)](_0x475b7c)===_0x9efddd(0x1b2)&&_0x475b7c['forEach']);}[_0x4705e6(0x192)](_0x508baf,_0x1ec49e,_0x1141ea){var _0x3832f8=_0x4705e6;return _0x1141ea['noFunctions']?typeof _0x508baf[_0x1ec49e]==_0x3832f8(0x1de):!0x1;}[_0x4705e6(0x160)](_0x2d2a7d){var _0x13e507=_0x4705e6,_0x1de26d='';return _0x1de26d=typeof _0x2d2a7d,_0x1de26d===_0x13e507(0x201)?this['_objectToString'](_0x2d2a7d)===_0x13e507(0x14d)?_0x1de26d=_0x13e507(0x1e8):this['_objectToString'](_0x2d2a7d)===_0x13e507(0x1ee)?_0x1de26d=_0x13e507(0x223):this[_0x13e507(0x14e)](_0x2d2a7d)===_0x13e507(0x1d3)?_0x1de26d=_0x13e507(0x1ab):_0x2d2a7d===null?_0x1de26d=_0x13e507(0x1ba):_0x2d2a7d[_0x13e507(0x226)]&&(_0x1de26d=_0x2d2a7d[_0x13e507(0x226)]['name']||_0x1de26d):_0x1de26d==='undefined'&&this[_0x13e507(0x1a1)]&&_0x2d2a7d instanceof this['_HTMLAllCollection']&&(_0x1de26d=_0x13e507(0x20d)),_0x1de26d;}[_0x4705e6(0x14e)](_0x2e988e){var _0x578c6e=_0x4705e6;return Object[_0x578c6e(0x21a)][_0x578c6e(0x19b)]['call'](_0x2e988e);}[_0x4705e6(0x227)](_0x47bf82){var _0xbe7b3=_0x4705e6;return _0x47bf82===_0xbe7b3(0x157)||_0x47bf82===_0xbe7b3(0x19c)||_0x47bf82===_0xbe7b3(0x20c);}[_0x4705e6(0x1e0)](_0x267fe5){var _0x2a5520=_0x4705e6;return _0x267fe5===_0x2a5520(0x1d8)||_0x267fe5===_0x2a5520(0x1a7)||_0x267fe5===_0x2a5520(0x193);}[_0x4705e6(0x147)](_0x21e567,_0x39be74,_0x1b5fc0,_0x4894cb,_0x21b345,_0xf17a4d){var _0x58c975=this;return function(_0x26b45c){var _0x338925=_0x31fe,_0x278a7b=_0x21b345[_0x338925(0x179)][_0x338925(0x19e)],_0x399a78=_0x21b345[_0x338925(0x179)][_0x338925(0x163)],_0x462d41=_0x21b345['node'][_0x338925(0x1ff)];_0x21b345[_0x338925(0x179)]['parent']=_0x278a7b,_0x21b345['node'][_0x338925(0x163)]=typeof _0x4894cb=='number'?_0x4894cb:_0x26b45c,_0x21e567['push'](_0x58c975[_0x338925(0x1e9)](_0x39be74,_0x1b5fc0,_0x4894cb,_0x21b345,_0xf17a4d)),_0x21b345[_0x338925(0x179)][_0x338925(0x1ff)]=_0x462d41,_0x21b345['node'][_0x338925(0x163)]=_0x399a78;};}['_addObjectProperty'](_0x162f74,_0x4e9060,_0x1ff0e2,_0x272b7f,_0x2d077b,_0x11d511,_0x1197e5){var _0xfc7442=_0x4705e6,_0x2af75e=this;return _0x4e9060[_0xfc7442(0x211)+_0x2d077b['toString']()]=!0x0,function(_0x13a703){var _0x1d4916=_0xfc7442,_0x49b07a=_0x11d511[_0x1d4916(0x179)][_0x1d4916(0x19e)],_0x4019f6=_0x11d511[_0x1d4916(0x179)][_0x1d4916(0x163)],_0x321672=_0x11d511['node'][_0x1d4916(0x1ff)];_0x11d511[_0x1d4916(0x179)][_0x1d4916(0x1ff)]=_0x49b07a,_0x11d511[_0x1d4916(0x179)][_0x1d4916(0x163)]=_0x13a703,_0x162f74[_0x1d4916(0x207)](_0x2af75e[_0x1d4916(0x1e9)](_0x1ff0e2,_0x272b7f,_0x2d077b,_0x11d511,_0x1197e5)),_0x11d511['node'][_0x1d4916(0x1ff)]=_0x321672,_0x11d511[_0x1d4916(0x179)][_0x1d4916(0x163)]=_0x4019f6;};}['_property'](_0x2562de,_0x570ace,_0x4865b6,_0x2c4c1a,_0x580587){var _0x334367=_0x4705e6,_0x2a18d9=this;_0x580587||(_0x580587=function(_0x86e9a,_0x248ec2){return _0x86e9a[_0x248ec2];});var _0x56c70a=_0x4865b6[_0x334367(0x19b)](),_0x44b9f5=_0x2c4c1a[_0x334367(0x1f9)]||{},_0xa5e04b=_0x2c4c1a['depth'],_0x53bcf3=_0x2c4c1a[_0x334367(0x13a)];try{var _0x548740=this[_0x334367(0x154)](_0x2562de),_0x10c76d=_0x56c70a;_0x548740&&_0x10c76d[0x0]==='\\x27'&&(_0x10c76d=_0x10c76d['substr'](0x1,_0x10c76d[_0x334367(0x1da)]-0x2));var _0x1210e9=_0x2c4c1a['expressionsToEvaluate']=_0x44b9f5[_0x334367(0x211)+_0x10c76d];_0x1210e9&&(_0x2c4c1a[_0x334367(0x13c)]=_0x2c4c1a['depth']+0x1),_0x2c4c1a[_0x334367(0x13a)]=!!_0x1210e9;var _0x5b15fd=typeof _0x4865b6==_0x334367(0x224),_0xaaae34={'name':_0x5b15fd||_0x548740?_0x56c70a:this[_0x334367(0x1cf)](_0x56c70a)};if(_0x5b15fd&&(_0xaaae34[_0x334367(0x224)]=!0x0),!(_0x570ace===_0x334367(0x1e8)||_0x570ace===_0x334367(0x1c0))){var _0xb664a7=this[_0x334367(0x1b4)](_0x2562de,_0x4865b6);if(_0xb664a7&&(_0xb664a7[_0x334367(0x1c6)]&&(_0xaaae34[_0x334367(0x158)]=!0x0),_0xb664a7[_0x334367(0x21c)]&&!_0x1210e9&&!_0x2c4c1a['resolveGetters']))return _0xaaae34['getter']=!0x0,this[_0x334367(0x1ca)](_0xaaae34,_0x2c4c1a),_0xaaae34;}var _0x5a5874;try{_0x5a5874=_0x580587(_0x2562de,_0x4865b6);}catch(_0x48e08b){return _0xaaae34={'name':_0x56c70a,'type':'unknown','error':_0x48e08b[_0x334367(0x1fd)]},this[_0x334367(0x1ca)](_0xaaae34,_0x2c4c1a),_0xaaae34;}var _0x414cdb=this[_0x334367(0x160)](_0x5a5874),_0x5ae6f0=this['_isPrimitiveType'](_0x414cdb);if(_0xaaae34[_0x334367(0x145)]=_0x414cdb,_0x5ae6f0)this['_processTreeNodeResult'](_0xaaae34,_0x2c4c1a,_0x5a5874,function(){var _0x40ce10=_0x334367;_0xaaae34[_0x40ce10(0x1fa)]=_0x5a5874[_0x40ce10(0x1d4)](),!_0x1210e9&&_0x2a18d9[_0x40ce10(0x1fc)](_0x414cdb,_0xaaae34,_0x2c4c1a,{});});else{var _0x2d7d76=_0x2c4c1a[_0x334367(0x138)]&&_0x2c4c1a[_0x334367(0x194)]<_0x2c4c1a[_0x334367(0x18c)]&&_0x2c4c1a[_0x334367(0x151)][_0x334367(0x148)](_0x5a5874)<0x0&&_0x414cdb!==_0x334367(0x1de)&&_0x2c4c1a[_0x334367(0x1a4)]<_0x2c4c1a['autoExpandLimit'];_0x2d7d76||_0x2c4c1a[_0x334367(0x194)]<_0xa5e04b||_0x1210e9?(this[_0x334367(0x1a3)](_0xaaae34,_0x5a5874,_0x2c4c1a,_0x1210e9||{}),this[_0x334367(0x18d)](_0x5a5874,_0xaaae34)):this[_0x334367(0x1ca)](_0xaaae34,_0x2c4c1a,_0x5a5874,function(){var _0x59e328=_0x334367;_0x414cdb==='null'||_0x414cdb==='undefined'||(delete _0xaaae34[_0x59e328(0x1fa)],_0xaaae34[_0x59e328(0x15d)]=!0x0);});}return _0xaaae34;}finally{_0x2c4c1a[_0x334367(0x1f9)]=_0x44b9f5,_0x2c4c1a['depth']=_0xa5e04b,_0x2c4c1a[_0x334367(0x13a)]=_0x53bcf3;}}['_capIfString'](_0x456c98,_0x239485,_0x3c053e,_0x5cf35a){var _0x1ec21d=_0x4705e6,_0x40d4a0=_0x5cf35a[_0x1ec21d(0x171)]||_0x3c053e[_0x1ec21d(0x171)];if((_0x456c98===_0x1ec21d(0x19c)||_0x456c98===_0x1ec21d(0x1a7))&&_0x239485[_0x1ec21d(0x1fa)]){let _0x1c61d4=_0x239485[_0x1ec21d(0x1fa)][_0x1ec21d(0x1da)];_0x3c053e[_0x1ec21d(0x1f7)]+=_0x1c61d4,_0x3c053e['allStrLength']>_0x3c053e[_0x1ec21d(0x1c3)]?(_0x239485[_0x1ec21d(0x15d)]='',delete _0x239485['value']):_0x1c61d4>_0x40d4a0&&(_0x239485[_0x1ec21d(0x15d)]=_0x239485['value'][_0x1ec21d(0x1ae)](0x0,_0x40d4a0),delete _0x239485[_0x1ec21d(0x1fa)]);}}[_0x4705e6(0x154)](_0x564009){var _0x91921d=_0x4705e6;return!!(_0x564009&&_0x488b92['Map']&&this['_objectToString'](_0x564009)===_0x91921d(0x1ac)&&_0x564009['forEach']);}['_propertyName'](_0x41407c){var _0x34f712=_0x4705e6;if(_0x41407c['match'](/^\\d+$/))return _0x41407c;var _0xe1d23b;try{_0xe1d23b=JSON[_0x34f712(0x175)](''+_0x41407c);}catch{_0xe1d23b='\\x22'+this[_0x34f712(0x14e)](_0x41407c)+'\\x22';}return _0xe1d23b[_0x34f712(0x1af)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0xe1d23b=_0xe1d23b[_0x34f712(0x1ae)](0x1,_0xe1d23b[_0x34f712(0x1da)]-0x2):_0xe1d23b=_0xe1d23b[_0x34f712(0x220)](/'/g,'\\x5c\\x27')[_0x34f712(0x220)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0xe1d23b;}[_0x4705e6(0x1ca)](_0x1e3826,_0x2af515,_0x1c4216,_0x43e8bb){var _0x2c095b=_0x4705e6;this[_0x2c095b(0x1d9)](_0x1e3826,_0x2af515),_0x43e8bb&&_0x43e8bb(),this['_additionalMetadata'](_0x1c4216,_0x1e3826),this[_0x2c095b(0x218)](_0x1e3826,_0x2af515);}[_0x4705e6(0x1d9)](_0xe376cb,_0x36c890){var _0x32d0a=_0x4705e6;this[_0x32d0a(0x1d5)](_0xe376cb,_0x36c890),this[_0x32d0a(0x1cd)](_0xe376cb,_0x36c890),this['_setNodeExpressionPath'](_0xe376cb,_0x36c890),this[_0x32d0a(0x155)](_0xe376cb,_0x36c890);}[_0x4705e6(0x1d5)](_0x1d7cfb,_0x4f4ed3){}[_0x4705e6(0x1cd)](_0x3de197,_0x2085b7){}['_setNodeLabel'](_0x484d79,_0x429296){}[_0x4705e6(0x16c)](_0x17ab88){var _0x3257cc=_0x4705e6;return _0x17ab88===this[_0x3257cc(0x17d)];}[_0x4705e6(0x218)](_0x387460,_0x5b2b38){var _0x4e0eb4=_0x4705e6;this[_0x4e0eb4(0x176)](_0x387460,_0x5b2b38),this[_0x4e0eb4(0x1c7)](_0x387460),_0x5b2b38[_0x4e0eb4(0x17b)]&&this['_sortProps'](_0x387460),this[_0x4e0eb4(0x188)](_0x387460,_0x5b2b38),this[_0x4e0eb4(0x152)](_0x387460,_0x5b2b38),this[_0x4e0eb4(0x214)](_0x387460);}[_0x4705e6(0x18d)](_0x44bc70,_0x2373f9){var _0x5e85e4=_0x4705e6;let _0x2e9c3b;try{_0x488b92[_0x5e85e4(0x1c4)]&&(_0x2e9c3b=_0x488b92[_0x5e85e4(0x1c4)][_0x5e85e4(0x1aa)],_0x488b92[_0x5e85e4(0x1c4)][_0x5e85e4(0x1aa)]=function(){}),_0x44bc70&&typeof _0x44bc70[_0x5e85e4(0x1da)]=='number'&&(_0x2373f9['length']=_0x44bc70['length']);}catch{}finally{_0x2e9c3b&&(_0x488b92[_0x5e85e4(0x1c4)]['error']=_0x2e9c3b);}if(_0x2373f9['type']==='number'||_0x2373f9[_0x5e85e4(0x145)]===_0x5e85e4(0x193)){if(isNaN(_0x2373f9['value']))_0x2373f9[_0x5e85e4(0x1f3)]=!0x0,delete _0x2373f9[_0x5e85e4(0x1fa)];else switch(_0x2373f9[_0x5e85e4(0x1fa)]){case Number[_0x5e85e4(0x189)]:_0x2373f9['positiveInfinity']=!0x0,delete _0x2373f9[_0x5e85e4(0x1fa)];break;case Number[_0x5e85e4(0x1bb)]:_0x2373f9[_0x5e85e4(0x141)]=!0x0,delete _0x2373f9[_0x5e85e4(0x1fa)];break;case 0x0:this[_0x5e85e4(0x16e)](_0x2373f9[_0x5e85e4(0x1fa)])&&(_0x2373f9['negativeZero']=!0x0);break;}}else _0x2373f9[_0x5e85e4(0x145)]===_0x5e85e4(0x1de)&&typeof _0x44bc70[_0x5e85e4(0x1df)]=='string'&&_0x44bc70['name']&&_0x2373f9[_0x5e85e4(0x1df)]&&_0x44bc70['name']!==_0x2373f9[_0x5e85e4(0x1df)]&&(_0x2373f9[_0x5e85e4(0x1a5)]=_0x44bc70[_0x5e85e4(0x1df)]);}[_0x4705e6(0x16e)](_0x4885af){var _0x2d4875=_0x4705e6;return 0x1/_0x4885af===Number[_0x2d4875(0x1bb)];}[_0x4705e6(0x181)](_0x299811){var _0x38ccc3=_0x4705e6;!_0x299811['props']||!_0x299811[_0x38ccc3(0x167)][_0x38ccc3(0x1da)]||_0x299811[_0x38ccc3(0x145)]==='array'||_0x299811[_0x38ccc3(0x145)]===_0x38ccc3(0x162)||_0x299811[_0x38ccc3(0x145)]===_0x38ccc3(0x153)||_0x299811[_0x38ccc3(0x167)][_0x38ccc3(0x173)](function(_0x5b8e5c,_0x21a887){var _0x9300a5=_0x38ccc3,_0x122b07=_0x5b8e5c[_0x9300a5(0x1df)][_0x9300a5(0x1bd)](),_0x50059e=_0x21a887[_0x9300a5(0x1df)][_0x9300a5(0x1bd)]();return _0x122b07<_0x50059e?-0x1:_0x122b07>_0x50059e?0x1:0x0;});}['_addFunctionsNode'](_0x31586a,_0x306218){var _0x3d933d=_0x4705e6;if(!(_0x306218[_0x3d933d(0x159)]||!_0x31586a[_0x3d933d(0x167)]||!_0x31586a['props'][_0x3d933d(0x1da)])){for(var _0x5f5797=[],_0x5ed425=[],_0x1fd1da=0x0,_0x5706f4=_0x31586a[_0x3d933d(0x167)]['length'];_0x1fd1da<_0x5706f4;_0x1fd1da++){var _0x223c93=_0x31586a[_0x3d933d(0x167)][_0x1fd1da];_0x223c93['type']===_0x3d933d(0x1de)?_0x5f5797[_0x3d933d(0x207)](_0x223c93):_0x5ed425['push'](_0x223c93);}if(!(!_0x5ed425['length']||_0x5f5797[_0x3d933d(0x1da)]<=0x1)){_0x31586a[_0x3d933d(0x167)]=_0x5ed425;var _0x5ae7bf={'functionsNode':!0x0,'props':_0x5f5797};this[_0x3d933d(0x1d5)](_0x5ae7bf,_0x306218),this[_0x3d933d(0x176)](_0x5ae7bf,_0x306218),this[_0x3d933d(0x1c7)](_0x5ae7bf),this[_0x3d933d(0x155)](_0x5ae7bf,_0x306218),_0x5ae7bf['id']+='\\x20f',_0x31586a[_0x3d933d(0x167)][_0x3d933d(0x1b9)](_0x5ae7bf);}}}['_addLoadNode'](_0x371f42,_0x4807c0){}['_setNodeExpandableState'](_0x300123){}[_0x4705e6(0x20e)](_0x5425df){var _0x3960dc=_0x4705e6;return Array[_0x3960dc(0x14a)](_0x5425df)||typeof _0x5425df==_0x3960dc(0x201)&&this['_objectToString'](_0x5425df)==='[object\\x20Array]';}[_0x4705e6(0x155)](_0x46c048,_0x167ba5){}[_0x4705e6(0x214)](_0x1aea01){var _0x2846f7=_0x4705e6;delete _0x1aea01['_hasSymbolPropertyOnItsPath'],delete _0x1aea01['_hasSetOnItsPath'],delete _0x1aea01[_0x2846f7(0x1b1)];}['_setNodeExpressionPath'](_0xe0b086,_0x5e5fbb){}}let _0x110989=new _0x581946(),_0x26fd20={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x425eb4={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x313856(_0x578a5c,_0xa8fbb3,_0x214b92,_0x14cf06,_0x462600,_0x31e139){var _0x3fe31c=_0x4705e6;let _0x44f382,_0x13cb4f;try{_0x13cb4f=_0x1abf05(),_0x44f382=_0x3de9f7[_0xa8fbb3],!_0x44f382||_0x13cb4f-_0x44f382['ts']>0x1f4&&_0x44f382[_0x3fe31c(0x168)]&&_0x44f382[_0x3fe31c(0x1ad)]/_0x44f382[_0x3fe31c(0x168)]<0x64?(_0x3de9f7[_0xa8fbb3]=_0x44f382={'count':0x0,'time':0x0,'ts':_0x13cb4f},_0x3de9f7[_0x3fe31c(0x1c9)]={}):_0x13cb4f-_0x3de9f7[_0x3fe31c(0x1c9)]['ts']>0x32&&_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x168)]&&_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x1ad)]/_0x3de9f7['hits'][_0x3fe31c(0x168)]<0x64&&(_0x3de9f7[_0x3fe31c(0x1c9)]={});let _0x155b02=[],_0xe3dcb0=_0x44f382[_0x3fe31c(0x222)]||_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x222)]?_0x425eb4:_0x26fd20,_0x2e112c=_0x3943e7=>{var _0x2d86b7=_0x3fe31c;let _0x2669dd={};return _0x2669dd[_0x2d86b7(0x167)]=_0x3943e7[_0x2d86b7(0x167)],_0x2669dd[_0x2d86b7(0x137)]=_0x3943e7[_0x2d86b7(0x137)],_0x2669dd['strLength']=_0x3943e7[_0x2d86b7(0x171)],_0x2669dd[_0x2d86b7(0x1c3)]=_0x3943e7['totalStrLength'],_0x2669dd[_0x2d86b7(0x215)]=_0x3943e7['autoExpandLimit'],_0x2669dd['autoExpandMaxDepth']=_0x3943e7[_0x2d86b7(0x18c)],_0x2669dd[_0x2d86b7(0x17b)]=!0x1,_0x2669dd['noFunctions']=!_0x4010d1,_0x2669dd[_0x2d86b7(0x13c)]=0x1,_0x2669dd[_0x2d86b7(0x194)]=0x0,_0x2669dd['expId']=_0x2d86b7(0x1f4),_0x2669dd[_0x2d86b7(0x216)]=_0x2d86b7(0x177),_0x2669dd[_0x2d86b7(0x138)]=!0x0,_0x2669dd[_0x2d86b7(0x151)]=[],_0x2669dd['autoExpandPropertyCount']=0x0,_0x2669dd[_0x2d86b7(0x15e)]=!0x0,_0x2669dd[_0x2d86b7(0x1f7)]=0x0,_0x2669dd[_0x2d86b7(0x179)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x2669dd;};for(var _0x75017c=0x0;_0x75017c<_0x462600[_0x3fe31c(0x1da)];_0x75017c++)_0x155b02[_0x3fe31c(0x207)](_0x110989[_0x3fe31c(0x1a3)]({'timeNode':_0x578a5c==='time'||void 0x0},_0x462600[_0x75017c],_0x2e112c(_0xe3dcb0),{}));if(_0x578a5c===_0x3fe31c(0x21b)){let _0x3c12d5=Error[_0x3fe31c(0x21d)];try{Error[_0x3fe31c(0x21d)]=0x1/0x0,_0x155b02['push'](_0x110989[_0x3fe31c(0x1a3)]({'stackNode':!0x0},new Error()['stack'],_0x2e112c(_0xe3dcb0),{'strLength':0x1/0x0}));}finally{Error[_0x3fe31c(0x21d)]=_0x3c12d5;}}return{'method':_0x3fe31c(0x1a6),'version':_0x29ae66,'args':[{'ts':_0x214b92,'session':_0x14cf06,'args':_0x155b02,'id':_0xa8fbb3,'context':_0x31e139}]};}catch(_0x5876a3){return{'method':_0x3fe31c(0x1a6),'version':_0x29ae66,'args':[{'ts':_0x214b92,'session':_0x14cf06,'args':[{'type':'unknown','error':_0x5876a3&&_0x5876a3[_0x3fe31c(0x1fd)]}],'id':_0xa8fbb3,'context':_0x31e139}]};}finally{try{if(_0x44f382&&_0x13cb4f){let _0x4096a4=_0x1abf05();_0x44f382[_0x3fe31c(0x168)]++,_0x44f382[_0x3fe31c(0x1ad)]+=_0x46f776(_0x13cb4f,_0x4096a4),_0x44f382['ts']=_0x4096a4,_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x168)]++,_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x1ad)]+=_0x46f776(_0x13cb4f,_0x4096a4),_0x3de9f7[_0x3fe31c(0x1c9)]['ts']=_0x4096a4,(_0x44f382['count']>0x32||_0x44f382[_0x3fe31c(0x1ad)]>0x64)&&(_0x44f382[_0x3fe31c(0x222)]=!0x0),(_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x168)]>0x3e8||_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x1ad)]>0x12c)&&(_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x222)]=!0x0);}}catch{}}}return _0x313856;}((_0x26bcb3,_0x161a0f,_0x1243cc,_0x16727b,_0x2aef43,_0x4e3a18,_0x2adef1,_0x2097f7,_0x5d329d,_0x51d670,_0xda337d)=>{var _0x10059d=_0xbb41e5;if(_0x26bcb3[_0x10059d(0x16b)])return _0x26bcb3['_console_ninja'];if(!X(_0x26bcb3,_0x2097f7,_0x2aef43))return _0x26bcb3[_0x10059d(0x16b)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x26bcb3[_0x10059d(0x16b)];let _0x5f52d8=b(_0x26bcb3),_0x528b00=_0x5f52d8['elapsed'],_0x3fc8b6=_0x5f52d8['timeStamp'],_0x12bb08=_0x5f52d8['now'],_0x4b3199={'hits':{},'ts':{}},_0x49cd29=H(_0x26bcb3,_0x5d329d,_0x4b3199,_0x4e3a18),_0x3a9284=_0x1ebc21=>{_0x4b3199['ts'][_0x1ebc21]=_0x3fc8b6();},_0x1097a1=(_0x21f17e,_0x3c69df)=>{var _0x4d38a3=_0x10059d;let _0x1bd357=_0x4b3199['ts'][_0x3c69df];if(delete _0x4b3199['ts'][_0x3c69df],_0x1bd357){let _0x5065d2=_0x528b00(_0x1bd357,_0x3fc8b6());_0x11cddb(_0x49cd29(_0x4d38a3(0x1ad),_0x21f17e,_0x12bb08(),_0x47b6d8,[_0x5065d2],_0x3c69df));}},_0x44b79d=_0x4a0749=>{var _0x354034=_0x10059d,_0x19e489;return _0x2aef43===_0x354034(0x144)&&_0x26bcb3[_0x354034(0x20a)]&&((_0x19e489=_0x4a0749==null?void 0x0:_0x4a0749[_0x354034(0x170)])==null?void 0x0:_0x19e489[_0x354034(0x1da)])&&(_0x4a0749[_0x354034(0x170)][0x0][_0x354034(0x20a)]=_0x26bcb3[_0x354034(0x20a)]),_0x4a0749;};_0x26bcb3[_0x10059d(0x16b)]={'consoleLog':(_0x29be56,_0x59772b)=>{var _0x279194=_0x10059d;_0x26bcb3[_0x279194(0x1c4)][_0x279194(0x1a6)][_0x279194(0x1df)]!==_0x279194(0x1b6)&&_0x11cddb(_0x49cd29(_0x279194(0x1a6),_0x29be56,_0x12bb08(),_0x47b6d8,_0x59772b));},'consoleTrace':(_0x3d9ae8,_0x4640db)=>{var _0x43a2be=_0x10059d;_0x26bcb3['console'][_0x43a2be(0x1a6)]['name']!==_0x43a2be(0x221)&&_0x11cddb(_0x44b79d(_0x49cd29(_0x43a2be(0x21b),_0x3d9ae8,_0x12bb08(),_0x47b6d8,_0x4640db)));},'consoleTime':_0x1bc96b=>{_0x3a9284(_0x1bc96b);},'consoleTimeEnd':(_0x45eff4,_0x5a9be0)=>{_0x1097a1(_0x5a9be0,_0x45eff4);},'autoLog':(_0xbed555,_0xb307c0)=>{_0x11cddb(_0x49cd29('log',_0xb307c0,_0x12bb08(),_0x47b6d8,[_0xbed555]));},'autoLogMany':(_0x12339d,_0xb59196)=>{var _0x534726=_0x10059d;_0x11cddb(_0x49cd29(_0x534726(0x1a6),_0x12339d,_0x12bb08(),_0x47b6d8,_0xb59196));},'autoTrace':(_0x501019,_0x44cf83)=>{var _0x5378bd=_0x10059d;_0x11cddb(_0x44b79d(_0x49cd29(_0x5378bd(0x21b),_0x44cf83,_0x12bb08(),_0x47b6d8,[_0x501019])));},'autoTraceMany':(_0x1172e6,_0x270986)=>{_0x11cddb(_0x44b79d(_0x49cd29('trace',_0x1172e6,_0x12bb08(),_0x47b6d8,_0x270986)));},'autoTime':(_0x585b9f,_0x47e1f5,_0x564815)=>{_0x3a9284(_0x564815);},'autoTimeEnd':(_0x416ab0,_0x57beff,_0x1a95e8)=>{_0x1097a1(_0x57beff,_0x1a95e8);},'coverage':_0x5f2fcf=>{var _0x7c06bd=_0x10059d;_0x11cddb({'method':_0x7c06bd(0x15c),'version':_0x4e3a18,'args':[{'id':_0x5f2fcf}]});}};let _0x11cddb=q(_0x26bcb3,_0x161a0f,_0x1243cc,_0x16727b,_0x2aef43,_0x51d670,_0xda337d),_0x47b6d8=_0x26bcb3[_0x10059d(0x1eb)];return _0x26bcb3[_0x10059d(0x16b)];})(globalThis,_0xbb41e5(0x17e),_0xbb41e5(0x149),\"c:\\\\Users\\\\User\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.327\\\\node_modules\",_0xbb41e5(0x1dd),_0xbb41e5(0x18a),_0xbb41e5(0x182),_0xbb41e5(0x1c5),_0xbb41e5(0x217),_0xbb41e5(0x210),_0xbb41e5(0x17a));");
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

/***/ })

}]);
//# sourceMappingURL=resources_js_react_TimeLogTable_components_TimeLogHIstoryModalTable_jsx.js.map