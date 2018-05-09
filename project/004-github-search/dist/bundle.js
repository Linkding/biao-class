/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./event.js":
/*!******************!*\
  !*** ./event.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var history = __webpack_require__(/*! ./src/plugin/history */ \"./src/plugin/history.js\")\n\nvar el_input = document.querySelector('#search-input')\n    , el_form = document.querySelector('#form-search')\n    ; \n\n    \nfunction detect_submit(){\n    el_form.addEventListener('submit',function(e){\n        var keyword = el_input.value;\n        console.log(keyword)\n        history.add(keyword)\n    })\n}\n\nfunction detect_input_click() {\n    el_input.addEventListener('click', function () {\n        history.init({\n            el: '.history-list'\n        })\n    })\n}\n\nfunction detect_document_click() {\n    document.documentElement.addEventListener('click', function (e) {\n        var target = e.target\n            , in_search = target.closest('#search-input')\n            , in_form = target.closest('#form-search')\n\n        if (!in_form || !in_search)\n            history.hide_history();\n    })\n}\n\nfunction add_event() {\n    detect_input_click();\n    detect_document_click();\n    detect_submit();\n}\n\nmodule.exports = {\n    add_event\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ldmVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2V2ZW50LmpzPzY3OGUiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGhpc3RvcnkgPSByZXF1aXJlKCcuL3NyYy9wbHVnaW4vaGlzdG9yeScpXG5cbnZhciBlbF9pbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKVxuICAgICwgZWxfZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLXNlYXJjaCcpXG4gICAgOyBcblxuICAgIFxuZnVuY3Rpb24gZGV0ZWN0X3N1Ym1pdCgpe1xuICAgIGVsX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIGtleXdvcmQgPSBlbF9pbnB1dC52YWx1ZTtcbiAgICAgICAgY29uc29sZS5sb2coa2V5d29yZClcbiAgICAgICAgaGlzdG9yeS5hZGQoa2V5d29yZClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBkZXRlY3RfaW5wdXRfY2xpY2soKSB7XG4gICAgZWxfaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGhpc3RvcnkuaW5pdCh7XG4gICAgICAgICAgICBlbDogJy5oaXN0b3J5LWxpc3QnXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZGV0ZWN0X2RvY3VtZW50X2NsaWNrKCkge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldFxuICAgICAgICAgICAgLCBpbl9zZWFyY2ggPSB0YXJnZXQuY2xvc2VzdCgnI3NlYXJjaC1pbnB1dCcpXG4gICAgICAgICAgICAsIGluX2Zvcm0gPSB0YXJnZXQuY2xvc2VzdCgnI2Zvcm0tc2VhcmNoJylcblxuICAgICAgICBpZiAoIWluX2Zvcm0gfHwgIWluX3NlYXJjaClcbiAgICAgICAgICAgIGhpc3RvcnkuaGlkZV9oaXN0b3J5KCk7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gYWRkX2V2ZW50KCkge1xuICAgIGRldGVjdF9pbnB1dF9jbGljaygpO1xuICAgIGRldGVjdF9kb2N1bWVudF9jbGljaygpO1xuICAgIGRldGVjdF9zdWJtaXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWRkX2V2ZW50XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./event.js\n");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var event = __webpack_require__(/*! ./event */ \"./event.js\")\n    ,history = __webpack_require__(/*! ./src/plugin/history */ \"./src/plugin/history.js\")\n\ninit();\n\nfunction init(){\n    event.add_event();\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2luZGV4LmpzPzQxZjUiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpXG4gICAgLGhpc3RvcnkgPSByZXF1aXJlKCcuL3NyYy9wbHVnaW4vaGlzdG9yeScpXG5cbmluaXQoKTtcblxuZnVuY3Rpb24gaW5pdCgpe1xuICAgIGV2ZW50LmFkZF9ldmVudCgpO1xufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./index.js\n");

/***/ }),

/***/ "./src/plugin/history.js":
/*!*******************************!*\
  !*** ./src/plugin/history.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var helper = __webpack_require__(/*! ../util/helper */ \"./src/util/helper.js\")\n    , store = __webpack_require__(/*! ../util/store */ \"./src/util/store.js\")\n    ;\n\nvar list = ['aaa', 'sss', 'xxx']\n    , el\n    , on_click\n    , on_delete\n    ;\n\n// 供外部使用接口\nvar output = {\n    init: init,\n    remove: remove,\n    add: add,\n    render: render,\n    hide_history: hide_history,\n    show_history: show_history,\n    sync_to_store:sync_to_store,\n}\n\n// 初始化，从外部传入参数，变量，函数\nfunction init(config) {\n    if (!config.el)\n        throw \"invail param config.el\"\n    el = document.querySelector(config.el)\n    on_click = config.on_click\n    on_delete = config.on_delete\n\n    // sync_to_store();\n    sync_to_ladle(); //将初始记录传入localstore\n    render();\n    show_history();\n}\n\n// =========render start======\n// 渲染历史记录\nfunction render() {\n    // 根元素清空\n    el.innerHTML = '';\n    // 给每个历史记录渲染\n    list.forEach(function (keyword) {\n        // 创建一个新元素\n        var el_keyword = document.createElement('div');\n        // 新元素添加内容\n        el_keyword.innerHTML = `\n        <div class=\"text\">${keyword}</div>\n            <div class=\"tool\">\n                <span class=\"delete\">删除</span>\n            </div>\n        `\n            ;\n        // 新元素添加类\n        el_keyword.classList.add('history')\n        // 添加序列数据\n        el_keyword.dataset.history = keyword;\n        // 追加到根元素\n        el.appendChild(el_keyword);\n        // 新元素添加点击事件\n        el_keyword.addEventListener('click', function (e) {\n            if (on_click)\n                on_click(keyword, e);\n        });\n        // 新元素子元素添加点击事件\n        el_keyword.querySelector('.delete').addEventListener('click', function (e) {\n            e.stopPropagation() // 停止冒泡\n            if (on_delete)\n                on_delete(keyword, e)\n\n            remove(keyword)\n        })\n\n    })\n}\n\nfunction show_history() {\n    el.hidden = false;\n}\n\nfunction hide_history() {\n    el.hidden = true;\n}\n// =========render end========\n\n// ==========data start=========\n// 增加历史记录\nfunction add(kwd) {\n    helper.find_and_delete(list, kwd);\n    list.unshift(kwd)\n    sync_to_store()\n    render()\n\n}\n// 删除历史记录\nfunction remove(kwd) {\n    helper.find_and_delete(list, kwd);\n    console.log(list)\n    if(!list.length)\n        hide_history();\n    sync_to_store()\n    render()    \n}\n\n// 同步最新历史数据到localstore\nfunction sync_to_store() {\n    store.set('history_list', list)\n}\n// 同步localstore到炒瓢\nfunction sync_to_ladle() {\n    list = store.get('history_list') || []\n}\n// ========data end=============\n\nmodule.exports = output;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGx1Z2luL2hpc3RvcnkuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGx1Z2luL2hpc3RvcnkuanM/OGFjNiJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaGVscGVyID0gcmVxdWlyZSgnLi4vdXRpbC9oZWxwZXInKVxuICAgICwgc3RvcmUgPSByZXF1aXJlKCcuLi91dGlsL3N0b3JlJylcbiAgICA7XG5cbnZhciBsaXN0ID0gWydhYWEnLCAnc3NzJywgJ3h4eCddXG4gICAgLCBlbFxuICAgICwgb25fY2xpY2tcbiAgICAsIG9uX2RlbGV0ZVxuICAgIDtcblxuLy8g5L6b5aSW6YOo5L2/55So5o6l5Y+jXG52YXIgb3V0cHV0ID0ge1xuICAgIGluaXQ6IGluaXQsXG4gICAgcmVtb3ZlOiByZW1vdmUsXG4gICAgYWRkOiBhZGQsXG4gICAgcmVuZGVyOiByZW5kZXIsXG4gICAgaGlkZV9oaXN0b3J5OiBoaWRlX2hpc3RvcnksXG4gICAgc2hvd19oaXN0b3J5OiBzaG93X2hpc3RvcnksXG4gICAgc3luY190b19zdG9yZTpzeW5jX3RvX3N0b3JlLFxufVxuXG4vLyDliJ3lp4vljJbvvIzku47lpJbpg6jkvKDlhaXlj4LmlbDvvIzlj5jph4/vvIzlh73mlbBcbmZ1bmN0aW9uIGluaXQoY29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcuZWwpXG4gICAgICAgIHRocm93IFwiaW52YWlsIHBhcmFtIGNvbmZpZy5lbFwiXG4gICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5lbClcbiAgICBvbl9jbGljayA9IGNvbmZpZy5vbl9jbGlja1xuICAgIG9uX2RlbGV0ZSA9IGNvbmZpZy5vbl9kZWxldGVcblxuICAgIC8vIHN5bmNfdG9fc3RvcmUoKTtcbiAgICBzeW5jX3RvX2xhZGxlKCk7IC8v5bCG5Yid5aeL6K6w5b2V5Lyg5YWlbG9jYWxzdG9yZVxuICAgIHJlbmRlcigpO1xuICAgIHNob3dfaGlzdG9yeSgpO1xufVxuXG4vLyA9PT09PT09PT1yZW5kZXIgc3RhcnQ9PT09PT1cbi8vIOa4suafk+WOhuWPsuiusOW9lVxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIC8vIOagueWFg+e0oOa4heepulxuICAgIGVsLmlubmVySFRNTCA9ICcnO1xuICAgIC8vIOe7meavj+S4quWOhuWPsuiusOW9lea4suafk1xuICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoa2V5d29yZCkge1xuICAgICAgICAvLyDliJvlu7rkuIDkuKrmlrDlhYPntKBcbiAgICAgICAgdmFyIGVsX2tleXdvcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgLy8g5paw5YWD57Sg5re75Yqg5YaF5a65XG4gICAgICAgIGVsX2tleXdvcmQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPiR7a2V5d29yZH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWxldGVcIj7liKDpmaQ8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgICAgICAgICAgO1xuICAgICAgICAvLyDmlrDlhYPntKDmt7vliqDnsbtcbiAgICAgICAgZWxfa2V5d29yZC5jbGFzc0xpc3QuYWRkKCdoaXN0b3J5JylcbiAgICAgICAgLy8g5re75Yqg5bqP5YiX5pWw5o2uXG4gICAgICAgIGVsX2tleXdvcmQuZGF0YXNldC5oaXN0b3J5ID0ga2V5d29yZDtcbiAgICAgICAgLy8g6L+95Yqg5Yiw5qC55YWD57SgXG4gICAgICAgIGVsLmFwcGVuZENoaWxkKGVsX2tleXdvcmQpO1xuICAgICAgICAvLyDmlrDlhYPntKDmt7vliqDngrnlh7vkuovku7ZcbiAgICAgICAgZWxfa2V5d29yZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAob25fY2xpY2spXG4gICAgICAgICAgICAgICAgb25fY2xpY2soa2V5d29yZCwgZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDmlrDlhYPntKDlrZDlhYPntKDmt7vliqDngrnlh7vkuovku7ZcbiAgICAgICAgZWxfa2V5d29yZC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKSAvLyDlgZzmraLlhpLms6FcbiAgICAgICAgICAgIGlmIChvbl9kZWxldGUpXG4gICAgICAgICAgICAgICAgb25fZGVsZXRlKGtleXdvcmQsIGUpXG5cbiAgICAgICAgICAgIHJlbW92ZShrZXl3b3JkKVxuICAgICAgICB9KVxuXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2hvd19oaXN0b3J5KCkge1xuICAgIGVsLmhpZGRlbiA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBoaWRlX2hpc3RvcnkoKSB7XG4gICAgZWwuaGlkZGVuID0gdHJ1ZTtcbn1cbi8vID09PT09PT09PXJlbmRlciBlbmQ9PT09PT09PVxuXG4vLyA9PT09PT09PT09ZGF0YSBzdGFydD09PT09PT09PVxuLy8g5aKe5Yqg5Y6G5Y+y6K6w5b2VXG5mdW5jdGlvbiBhZGQoa3dkKSB7XG4gICAgaGVscGVyLmZpbmRfYW5kX2RlbGV0ZShsaXN0LCBrd2QpO1xuICAgIGxpc3QudW5zaGlmdChrd2QpXG4gICAgc3luY190b19zdG9yZSgpXG4gICAgcmVuZGVyKClcblxufVxuLy8g5Yig6Zmk5Y6G5Y+y6K6w5b2VXG5mdW5jdGlvbiByZW1vdmUoa3dkKSB7XG4gICAgaGVscGVyLmZpbmRfYW5kX2RlbGV0ZShsaXN0LCBrd2QpO1xuICAgIGNvbnNvbGUubG9nKGxpc3QpXG4gICAgaWYoIWxpc3QubGVuZ3RoKVxuICAgICAgICBoaWRlX2hpc3RvcnkoKTtcbiAgICBzeW5jX3RvX3N0b3JlKClcbiAgICByZW5kZXIoKSAgICBcbn1cblxuLy8g5ZCM5q2l5pyA5paw5Y6G5Y+y5pWw5o2u5YiwbG9jYWxzdG9yZVxuZnVuY3Rpb24gc3luY190b19zdG9yZSgpIHtcbiAgICBzdG9yZS5zZXQoJ2hpc3RvcnlfbGlzdCcsIGxpc3QpXG59XG4vLyDlkIzmraVsb2NhbHN0b3Jl5Yiw54KS55OiXG5mdW5jdGlvbiBzeW5jX3RvX2xhZGxlKCkge1xuICAgIGxpc3QgPSBzdG9yZS5nZXQoJ2hpc3RvcnlfbGlzdCcpIHx8IFtdXG59XG4vLyA9PT09PT09PWRhdGEgZW5kPT09PT09PT09PT09PVxuXG5tb2R1bGUuZXhwb3J0cyA9IG91dHB1dDsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/plugin/history.js\n");

/***/ }),

/***/ "./src/util/helper.js":
/*!****************************!*\
  !*** ./src/util/helper.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function find_and_delete(arr,kwd){\n    var index_shit = arr.indexOf(kwd);\n    if(index_shit == -1)\n        return false;\n    arr.splice(kwd,1);\n    return true;\n}\n\nmodule.exports = {\n    find_and_delete:find_and_delete\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbC9oZWxwZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9oZWxwZXIuanM/YzY0OSJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmaW5kX2FuZF9kZWxldGUoYXJyLGt3ZCl7XG4gICAgdmFyIGluZGV4X3NoaXQgPSBhcnIuaW5kZXhPZihrd2QpO1xuICAgIGlmKGluZGV4X3NoaXQgPT0gLTEpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBhcnIuc3BsaWNlKGt3ZCwxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZmluZF9hbmRfZGVsZXRlOmZpbmRfYW5kX2RlbGV0ZVxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/util/helper.js\n");

/***/ }),

/***/ "./src/util/store.js":
/*!***************************!*\
  !*** ./src/util/store.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function set(key,val){\n    var json = JSON.stringify(val)\n    localStorage.setItem(key,json)\n}\n\nfunction get(key){\n    var data = localStorage.getItem(key)\n    return data = JSON.parse(data)\n}\n\nmodule.exports = {\n    set:set,\n    get:get,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbC9zdG9yZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy91dGlsL3N0b3JlLmpzP2UzYzQiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2V0KGtleSx2YWwpe1xuICAgIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkodmFsKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSxqc29uKVxufVxuXG5mdW5jdGlvbiBnZXQoa2V5KXtcbiAgICB2YXIgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSlcbiAgICByZXR1cm4gZGF0YSA9IEpTT04ucGFyc2UoZGF0YSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2V0OnNldCxcbiAgICBnZXQ6Z2V0LFxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/util/store.js\n");

/***/ })

/******/ });