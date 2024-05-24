"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-independent-task_section_task-actions_report_ReportForm_jsx"],{

/***/ "./resources/js/react/single-independent-task/section/task-actions/report/ReportForm.jsx":
/*!***********************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/report/ReportForm.jsx ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/listbox/listbox.js");
/* harmony import */ var react_icons_hi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/hi */ "./node_modules/react-icons/hi/index.esm.js");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-independent-task/components/SubmitButton.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _stop_timer_options_UserSelectionList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../stop-timer/options/UserSelectionList */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/UserSelectionList.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var ReportForm = function ReportForm(_ref) {
  var _reason$name;
  var close = _ref.close,
    task = _ref.task,
    onSuccess = _ref.onSuccess;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    reason = _useState2[0],
    setReason = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    person = _useState4[0],
    setPerson = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    comment = _useState6[0],
    setComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    previousNotedIssue = _useState8[0],
    setPreviousNotedIssue = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    error = _useState10[0],
    setError = _useState10[1];
  var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_6__.User(window.Laravel.user);
  var _useCreateReportMutat = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__.useCreateReportMutation)(),
    _useCreateReportMutat2 = _slicedToArray(_useCreateReportMutat, 2),
    createReport = _useCreateReportMutat2[0],
    isLoading = _useCreateReportMutat2[1].isLoading;
  var Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true
  });
  var isValid = function isValid() {
    var err = new Object();
    var errCount = 0;
    if (!reason) {
      errCount++;
      err.reason = 'Please select a reason for report!';
    }
    if (!person) {
      errCount++;
      err.person = 'Select the responsible person!';
    }
    if (comment === '') {
      errCount++;
      err.comment = 'Please write a briefly describe about this report!';
    }
    if (previousNotedIssue === '') {
      errCount++;
      err.previousReport = 'You have to select an option.';
    }
    setError(err);
    return !errCount;
  };
  var onSubmit = function onSubmit(e) {
    var _window;
    e.preventDefault();
    var data = {
      reason: reason === null || reason === void 0 ? void 0 : reason.name,
      person: person === null || person === void 0 ? void 0 : person.id,
      comment: comment,
      previousNotedIssue: previousNotedIssue,
      user_id: (_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 || (_window = _window.user) === null || _window === void 0 ? void 0 : _window.id,
      task_id: task === null || task === void 0 ? void 0 : task.id
    };
    if (isValid()) {
      createReport(data).unwrap().then(function (res) {
        Toast.fire({
          icon: 'success',
          title: "Report Issued Successfully!"
        });
        close();
        onSuccess();
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fillup the all required fields!",
        showConfirmButton: true
      });
    }
  };

  // get user 
  var users = (auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 6 ? [4, 8] : [4, 6];
  var reports = [{
    id: 1,
    name: "Project Manager /Team Lead ".concat((auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 6 ? '' : '/ Lead Developer', " Is Making Me Do Their Work Without Top Managements\u2019 Authorization"),
    info: "Your report will be kept private and management won't disclose your name to anyone including the project manager and lead developer!"
  }, {
    id: 2,
    name: "Need Further Clarification From ".concat((auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 6 ? 'Team Lead' : 'Lead Developer', " / Project Manager"),
    info: ''
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("form", {
      className: "px-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [(reason === null || reason === void 0 ? void 0 : reason.info) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "f-12 alert alert-info py-1",
          children: reason === null || reason === void 0 ? void 0 : reason.info
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: "Select Reason for report"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "position-relative w-100 mb-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_8__.Listbox, {
            value: reason,
            onChange: setReason,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_8__.Listbox.Button, {
              className: "w-100 bg-white py-2 pl-2 pr-1 border text-left d-flex align-items-center justify-content-between",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
                className: "mr-auto",
                children: (_reason$name = reason === null || reason === void 0 ? void 0 : reason.name) !== null && _reason$name !== void 0 ? _reason$name : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
                  style: {
                    color: '#aaa'
                  },
                  children: " -- "
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_icons_hi__WEBPACK_IMPORTED_MODULE_9__.HiOutlineSelector, {
                className: "f-16"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_8__.Listbox.Options, {
              className: "position-absolute bg-white p-2 shadow w-100",
              style: {
                zIndex: 10,
                maxHeight: "350px",
                overflowY: "auto"
              },
              children: reports === null || reports === void 0 ? void 0 : reports.map(function (report) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_8__.Listbox.Option, {
                  value: report,
                  className: function className(_ref2) {
                    var selected = _ref2.selected,
                      active = _ref2.active;
                    return selected ? "task-selection-list-option selected" : active ? "task-selection-list-option active" : "task-selection-list-option";
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                      children: report === null || report === void 0 ? void 0 : report.name
                    })
                  })
                }, report.id);
              })
            })]
          })
        }), (error === null || error === void 0 ? void 0 : error.reason) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "f-14",
          style: {
            color: 'red'
          },
          children: error === null || error === void 0 ? void 0 : error.reason
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: "Responsible Person"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "position-relative w-100 mb-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_stop_timer_options_UserSelectionList__WEBPACK_IMPORTED_MODULE_4__["default"], {
            person: person,
            setPerson: setPerson,
            roles: users
          })
        }), (error === null || error === void 0 ? void 0 : error.person) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "f-14",
          style: {
            color: 'red'
          },
          children: error === null || error === void 0 ? void 0 : error.person
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
          htmlFor: "editor",
          className: "font-weight-bold",
          children: "Briefly describe the problem here..."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "ck-editor-holder",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_3__["default"], {
            onChange: function onChange(e, editor) {
              var data = editor.getData();
              setComment(data);
            }
          })
        }), (error === null || error === void 0 ? void 0 : error.comment) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "f-14",
          style: {
            color: 'red'
          },
          children: error === null || error === void 0 ? void 0 : error.comment
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: "Did you report the same issue previously?"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "form-check form-check-inline",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
              className: "form-check-input",
              type: "radio",
              name: "inlineRadioOptions",
              id: "inlineRadio1",
              value: "yes",
              onChange: function onChange(e) {
                return setPreviousNotedIssue(e.target.value);
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
              className: "form-check-label",
              htmlFor: "inlineRadio1",
              children: "Yes"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "form-check form-check-inline",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
              className: "form-check-input",
              type: "radio",
              name: "inlineRadioOptions",
              id: "inlineRadio2",
              value: "no",
              onChange: function onChange(e) {
                return setPreviousNotedIssue(e.target.value);
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
              className: "form-check-label",
              htmlFor: "inlineRadio2",
              children: "No"
            })]
          })]
        }), (error === null || error === void 0 ? void 0 : error.previousReport) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "f-14",
          style: {
            color: 'red'
          },
          children: error === null || error === void 0 ? void 0 : error.previousReport
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "my-3 d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          variant: "tertiary",
          onClick: close,
          className: "ml-auto mr-2",
          children: "Close"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
          onClick: onSubmit,
          isLoading: isLoading,
          title: "Report"
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReportForm);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/UserSelectionList.jsx":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/UserSelectionList.jsx ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useUsers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../hooks/useUsers */ "./resources/js/react/hooks/useUsers.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/combobox/combobox.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_hi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-icons/hi */ "./node_modules/react-icons/hi/index.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var UserSelectionList = function UserSelectionList(_ref) {
  var _user2;
  var person = _ref.person,
    setPerson = _ref.setPerson,
    filter = _ref.filter,
    _ref$roles = _ref.roles,
    roles = _ref$roles === void 0 ? [] : _ref$roles;
  var _useUsers = (0,_hooks_useUsers__WEBPACK_IMPORTED_MODULE_1__.useUsers)(),
    users = _useUsers.users,
    usersIsFetching = _useUsers.usersIsFetching;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var _user = lodash__WEBPACK_IMPORTED_MODULE_3___default().filter(users, function (user) {
    return !lodash__WEBPACK_IMPORTED_MODULE_3___default().isNull(user.role_id);
  });
  if (roles && lodash__WEBPACK_IMPORTED_MODULE_3___default().size(roles) > 0) {
    _user = lodash__WEBPACK_IMPORTED_MODULE_3___default().filter(users, function (user) {
      return lodash__WEBPACK_IMPORTED_MODULE_3___default().includes(roles, Number(user.role_id));
    });
  } else if (filter) {
    switch (filter) {
      case 'client':
        _user = lodash__WEBPACK_IMPORTED_MODULE_3___default().filter(users, function (user) {
          return lodash__WEBPACK_IMPORTED_MODULE_3___default().isNull(user.role_id);
        });
        break;
      case 'developer':
        _user = lodash__WEBPACK_IMPORTED_MODULE_3___default().filter(users, function (user) {
          return lodash__WEBPACK_IMPORTED_MODULE_3___default().includes([5, 8, 10], Number(user.role_id));
        });
        break;
      default:
        break;
    }
  }
  var filteredUsers = search === "" ? _user : (_user2 = _user) === null || _user2 === void 0 ? void 0 : _user2.filter(function (user) {
    return lodash__WEBPACK_IMPORTED_MODULE_3___default().lowerCase(user.name).includes(lodash__WEBPACK_IMPORTED_MODULE_3___default().lowerCase(search));
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    className: "position-relative w-100 mb-3",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox, {
      value: person,
      onChange: setPerson,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Button, {
        className: "position-relative w-100",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Input, {
          className: "w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between",
          displayValue: function displayValue(person) {
            return person === null || person === void 0 ? void 0 : person.name;
          },
          onChange: function onChange(e) {
            return setSearch(e.target.value);
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
          zIndex: 10,
          maxHeight: "350px",
          overflowY: "auto"
        },
        children: filteredUsers && filteredUsers.length ? filteredUsers.map(function (user) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Combobox.Option, {
            value: user,
            className: function className(_ref2) {
              var selected = _ref2.selected,
                active = _ref2.active;
              return selected ? "task-selection-list-option selected" : active ? "task-selection-list-option active" : "task-selection-list-option";
            },
            children: function children(_ref3) {
              var _user$employee_detail;
              var selected = _ref3.selected;
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "d-flex align-items-center bg-transparent f-14",
                style: {
                  gap: "10px"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                  src: user === null || user === void 0 ? void 0 : user.image_url,
                  alt: user === null || user === void 0 ? void 0 : user.name,
                  width: 24,
                  height: 24,
                  className: "rounded-circle"
                }), selected, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                  className: "w-100",
                  children: [user === null || user === void 0 ? void 0 : user.name, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    className: "badge badge-success",
                    children: user === null || user === void 0 || (_user$employee_detail = user.employee_detail) === null || _user$employee_detail === void 0 || (_user$employee_detail = _user$employee_detail.designation) === null || _user$employee_detail === void 0 ? void 0 : _user$employee_detail.name
                  })]
                }), selected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                  className: "ml-auto",
                  children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
                    className: "fa-solid fa-check text-white"
                  }), " "]
                })]
              });
            }
          }, user.id);
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "task-selection-list-option",
          children: usersIsFetching ? "Loading..." : "Nothing found."
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserSelectionList);

// const UserList = (props) => {
//     const user = new User(props.user);

//     if (!user?.getRoleId()) return null;
//     return (

//     );
// };

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-independent-task_section_task-actions_report_ReportForm_jsx.js.map