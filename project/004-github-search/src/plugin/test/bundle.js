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
/******/ 	return __webpack_require__(__webpack_require__.s = "./plugin/test/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./plugin/history.js":
/*!***************************!*\
  !*** ./plugin/history.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var store = __webpack_require__(/*! ../util/store */ \"./util/store.js\")\n    , helper = __webpack_require__(/*! ../util/helper */ \"./util/helper.js\")\n    ;\n\nvar list = ['lxb', 'xxx', 'bbb']\n    , el\n    , on_click\n    , on_delete\n    ;\n\nvar output = {\n    init: init,\n    remove: remove,\n    add: add,\n\n}\nfunction init(config) {\n    el = document.querySelector(config.el);\n    on_click = config.on_click;\n    on_delete = config.on_delete;\n\n    sync_to_store(list);\n\n    render();\n}\n\n// =========render start=======\nfunction render() {\n    // 清空根元素\n    el.innerHTML = '';\n    // 将历史记录逐个渲染\n    list.forEach(function (keyword) {\n        // 添加新元素\n        var el_keyword = document.createElement('div');\n        // 为新元素添加内容\n        el_keyword.innerHTML = `\n        <div class=\"text\">${keyword}</div>\n            <div class=\"tool\">\n                <span class=\"delete\">删除</span>\n            </div>\n        `\n        // 添加类\n        el_keyword.classList.add('history')\n        // 根元素追加新内容\n        el.appendChild(el_keyword);\n        // 新元素添加监听事件\n        el_keyword.addEventListener('click', function (e) {\n            on_click(keyword, e)\n        })\n        // 子元素添加监听事件\n        var el_delete = el_keyword.querySelector('.delete')\n        el_delete.addEventListener('click', function (e) {\n            e.stopPropagation() //避免冒泡\n            on_delete(keyword, e)\n\n            remove(keyword)\n        })\n    })\n}\n\n// ===========data start=========\n// 添加一条记录\nfunction add(kwd) {\n    helper.find_and_delete(list, kwd);\n    list.unshift(kwd)\n    sync_to_store(list)\n    render();\n}\n// 删除记录\nfunction remove(kwd) {\n    helper.find_and_delete(list, kwd);\n    sync_to_store(list);\n    render();\n}\n// 同步炒瓢数据到localstore\nfunction sync_to_store(kwd) {\n    store.set('history_list', kwd)\n}\n// 更新炒瓢\nfunction sync_to_ladle() {\n    list = store.get('history_list') || []\n}\n// ============data end=========\nmodule.exports = output//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wbHVnaW4vaGlzdG9yeS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BsdWdpbi9oaXN0b3J5LmpzPzJkNTAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vdXRpbC9zdG9yZScpXG4gICAgLCBoZWxwZXIgPSByZXF1aXJlKCcuLi91dGlsL2hlbHBlcicpXG4gICAgO1xuXG52YXIgbGlzdCA9IFsnbHhiJywgJ3h4eCcsICdiYmInXVxuICAgICwgZWxcbiAgICAsIG9uX2NsaWNrXG4gICAgLCBvbl9kZWxldGVcbiAgICA7XG5cbnZhciBvdXRwdXQgPSB7XG4gICAgaW5pdDogaW5pdCxcbiAgICByZW1vdmU6IHJlbW92ZSxcbiAgICBhZGQ6IGFkZCxcblxufVxuZnVuY3Rpb24gaW5pdChjb25maWcpIHtcbiAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLmVsKTtcbiAgICBvbl9jbGljayA9IGNvbmZpZy5vbl9jbGljaztcbiAgICBvbl9kZWxldGUgPSBjb25maWcub25fZGVsZXRlO1xuXG4gICAgc3luY190b19zdG9yZShsaXN0KTtcblxuICAgIHJlbmRlcigpO1xufVxuXG4vLyA9PT09PT09PT1yZW5kZXIgc3RhcnQ9PT09PT09XG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgLy8g5riF56m65qC55YWD57SgXG4gICAgZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgLy8g5bCG5Y6G5Y+y6K6w5b2V6YCQ5Liq5riy5p+TXG4gICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXl3b3JkKSB7XG4gICAgICAgIC8vIOa3u+WKoOaWsOWFg+e0oFxuICAgICAgICB2YXIgZWxfa2V5d29yZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAvLyDkuLrmlrDlhYPntKDmt7vliqDlhoXlrrlcbiAgICAgICAgZWxfa2V5d29yZC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+JHtrZXl3b3JkfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvb2xcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiPuWIoOmZpDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgICAgIC8vIOa3u+WKoOexu1xuICAgICAgICBlbF9rZXl3b3JkLmNsYXNzTGlzdC5hZGQoJ2hpc3RvcnknKVxuICAgICAgICAvLyDmoLnlhYPntKDov73liqDmlrDlhoXlrrlcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZWxfa2V5d29yZCk7XG4gICAgICAgIC8vIOaWsOWFg+e0oOa3u+WKoOebkeWQrOS6i+S7tlxuICAgICAgICBlbF9rZXl3b3JkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIG9uX2NsaWNrKGtleXdvcmQsIGUpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIOWtkOWFg+e0oOa3u+WKoOebkeWQrOS6i+S7tlxuICAgICAgICB2YXIgZWxfZGVsZXRlID0gZWxfa2V5d29yZC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlJylcbiAgICAgICAgZWxfZGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCkgLy/pgb/lhY3lhpLms6FcbiAgICAgICAgICAgIG9uX2RlbGV0ZShrZXl3b3JkLCBlKVxuXG4gICAgICAgICAgICByZW1vdmUoa2V5d29yZClcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG4vLyA9PT09PT09PT09PWRhdGEgc3RhcnQ9PT09PT09PT1cbi8vIOa3u+WKoOS4gOadoeiusOW9lVxuZnVuY3Rpb24gYWRkKGt3ZCkge1xuICAgIGhlbHBlci5maW5kX2FuZF9kZWxldGUobGlzdCwga3dkKTtcbiAgICBsaXN0LnVuc2hpZnQoa3dkKVxuICAgIHN5bmNfdG9fc3RvcmUobGlzdClcbiAgICByZW5kZXIoKTtcbn1cbi8vIOWIoOmZpOiusOW9lVxuZnVuY3Rpb24gcmVtb3ZlKGt3ZCkge1xuICAgIGhlbHBlci5maW5kX2FuZF9kZWxldGUobGlzdCwga3dkKTtcbiAgICBzeW5jX3RvX3N0b3JlKGxpc3QpO1xuICAgIHJlbmRlcigpO1xufVxuLy8g5ZCM5q2l54KS55Oi5pWw5o2u5YiwbG9jYWxzdG9yZVxuZnVuY3Rpb24gc3luY190b19zdG9yZShrd2QpIHtcbiAgICBzdG9yZS5zZXQoJ2hpc3RvcnlfbGlzdCcsIGt3ZClcbn1cbi8vIOabtOaWsOeCkueTolxuZnVuY3Rpb24gc3luY190b19sYWRsZSgpIHtcbiAgICBsaXN0ID0gc3RvcmUuZ2V0KCdoaXN0b3J5X2xpc3QnKSB8fCBbXVxufVxuLy8gPT09PT09PT09PT09ZGF0YSBlbmQ9PT09PT09PT1cbm1vZHVsZS5leHBvcnRzID0gb3V0cHV0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./plugin/history.js\n");

/***/ }),

/***/ "./plugin/test/test.js":
/*!*****************************!*\
  !*** ./plugin/test/test.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var history = __webpack_require__(/*! ../history */ \"./plugin/history.js\")\n\nhistory.init({\n    el:'.history-list',\n    on_click: function(kwd,e){\n        console.log(kwd,e)\n    },\n    on_delete: function(kwd,e){\n        console.log(kwd,e)\n    }\n\n\n});\n\nhistory.add('yo')\n// history.remove('yo')//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wbHVnaW4vdGVzdC90ZXN0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGx1Z2luL3Rlc3QvdGVzdC5qcz9mZDZlIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBoaXN0b3J5ID0gcmVxdWlyZSgnLi4vaGlzdG9yeScpXG5cbmhpc3RvcnkuaW5pdCh7XG4gICAgZWw6Jy5oaXN0b3J5LWxpc3QnLFxuICAgIG9uX2NsaWNrOiBmdW5jdGlvbihrd2QsZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGt3ZCxlKVxuICAgIH0sXG4gICAgb25fZGVsZXRlOiBmdW5jdGlvbihrd2QsZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGt3ZCxlKVxuICAgIH1cblxuXG59KTtcblxuaGlzdG9yeS5hZGQoJ3lvJylcbi8vIGhpc3RvcnkucmVtb3ZlKCd5bycpIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./plugin/test/test.js\n");

/***/ }),

/***/ "./util/helper.js":
/*!************************!*\
  !*** ./util/helper.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function find_and_delete(arr, kwd) {\n    var index_shit = arr.indexOf(kwd);\n    if (index_shit == -1)\n        return false;\n    arr.splice(kwd,1);\n    return true;\n}\n\nmodule.exports = {\n    find_and_delete:find_and_delete\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlsL2hlbHBlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3V0aWwvaGVscGVyLmpzPzE1NDgiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmluZF9hbmRfZGVsZXRlKGFyciwga3dkKSB7XG4gICAgdmFyIGluZGV4X3NoaXQgPSBhcnIuaW5kZXhPZihrd2QpO1xuICAgIGlmIChpbmRleF9zaGl0ID09IC0xKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgYXJyLnNwbGljZShrd2QsMSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZpbmRfYW5kX2RlbGV0ZTpmaW5kX2FuZF9kZWxldGVcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./util/helper.js\n");

/***/ }),

/***/ "./util/store.js":
/*!***********************!*\
  !*** ./util/store.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// * @param String key 保存localstore中的键名\n// * @param list val 保存的数据\nfunction set(key,val){\n    var json = JSON.stringify(val);\n    localStorage.setItem(key,json)\n}\n\nfunction get(key){\n    var data = localStorage.getItem(key);\n    return data = JSON.parse(data);\n}\n\nmodule.exports = {\n    set:set,\n    get:get,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlsL3N0b3JlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdXRpbC9zdG9yZS5qcz8xMjA2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vICogQHBhcmFtIFN0cmluZyBrZXkg5L+d5a2YbG9jYWxzdG9yZeS4reeahOmUruWQjVxuLy8gKiBAcGFyYW0gbGlzdCB2YWwg5L+d5a2Y55qE5pWw5o2uXG5mdW5jdGlvbiBzZXQoa2V5LHZhbCl7XG4gICAgdmFyIGpzb24gPSBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSxqc29uKVxufVxuXG5mdW5jdGlvbiBnZXQoa2V5KXtcbiAgICB2YXIgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgcmV0dXJuIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzZXQ6c2V0LFxuICAgIGdldDpnZXQsXG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./util/store.js\n");

/***/ })

/******/ });