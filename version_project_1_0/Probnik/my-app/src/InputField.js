import {Button} from "react-bootstrap";
import React from "react";
//import './InputField.css';

const InputField = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Поиск'}) => {
    return <div className="inputField" class="u-align-center u-form u-form-1">
        <input className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1" value={value} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
        <Button className="button1" disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
    </div>
}

export default InputField


//
//
// const InputField = _ref => {
//     let {
//         value,
//         setValue,
//         onSubmit,
//         loading,
//         placeholder,
//         buttonTitle = 'Поиск'
//     } = _ref;
//     return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
//         className: "InputField",
//         class: "u-align-center u-form u-form-1",
//         children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("input", {
//             value: value,
//             placeholder: placeholder,
//             onChange: event => setValue(event.target.value),
//             className: "u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1"
//         }, void 0, false, {
//             fileName: _jsxFileName,
//             lineNumber: 8,
//             columnNumber: 9
//         }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], {
//             className: "button1",
//             disabled: loading,
//             onClick: onSubmit,
//             children: buttonTitle
//         }, void 0, false, {
//             fileName: _jsxFileName,
//             lineNumber: 13,
//             columnNumber: 9
//         }, undefined)]
//     }, void 0, true, {
//         fileName: _jsxFileName,
//         lineNumber: 6,
//         columnNumber: 12
//     }, undefined);
// };
// _c = InputField;
// /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputField);
// var _c;
// __webpack_require__.$Refresh$.register(_c, "InputField");
//
// const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
// const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
//     $ReactRefreshModuleId$
// );
//
// function $ReactRefreshModuleRuntime$(exports) {
//     if (true) {
//         let errorOverlay;
//         if (true) {
//             errorOverlay = false;
//         }
//         let testMode;
//         if (typeof __react_refresh_test__ !== 'undefined') {
//             testMode = __react_refresh_test__;
//         }
//         return __react_refresh_utils__.executeRuntime(
//             exports,
//             $ReactRefreshModuleId$,
//             module.hot,
//             errorOverlay,
//             testMode
//         );
//     }
// }
//
// if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
//     $ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
// } else {
//     $ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
// }
//
// /***/ }),
