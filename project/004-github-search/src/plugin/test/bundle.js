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

eval("var helper = __webpack_require__(/*! ../util/helper */ \"./util/helper.js\")\n    , store = __webpack_require__(/*! ../util/store */ \"./util/store.js\")\n    ;\n\nvar list = ['aaa','sss','xxx']\n    , el\n    , on_click\n    , on_delete\n    ;\n\n// 供外部使用接口\nvar output = {\n    init:init,\n    remove:remove,\n    add:add,\n}\n\n// 初始化，从外部传入参数，变量，函数\nfunction init(config) {\n    if(!config.el)\n        throw \"invail param config.el\"\n    el = document.querySelector(config.el)\n    on_click = config.on_click\n    on_delete = config.on_delete\n\n    sync_to_store(); //将初始记录传入localstore\n    render();\n}\n\n// =========render start======\n// 渲染历史记录\nfunction render() {\n    // 根元素清空\n    el.innerHTML = '';\n    // 给每个历史记录渲染\n    list.forEach(function (keyword) {\n        // 创建一个新元素\n        var el_keyword = document.createElement('div');\n        // 新元素添加内容\n        el_keyword.innerHTML = `\n        <div class=\"text\">${keyword}</div>\n            <div class=\"tool\">\n                <span class=\"delete\">删除</span>\n            </div>\n        `\n        ;\n        // 新元素添加类\n        el_keyword.classList.add('history')\n        // 添加序列数据\n        el_keyword.dataset.history = keyword;\n        // 追加到根元素\n        el.appendChild(el_keyword);\n        // 新元素添加点击事件\n        el_keyword.addEventListener('click',function(e){\n            if(on_click)\n                on_click(keyword,e);\n        });\n        // 新元素子元素添加点击事件\n        el_keyword.querySelector('.delete').addEventListener('click',function(e){\n            e.stopPropagation() // 停止冒泡\n            if(on_delete)\n                on_delete(keyword,e)\n\n            remove(keyword)\n        })\n\n        \n    })\n}\n// =========render end========\n\n// ==========data start=========\n// 增加历史记录\nfunction add(kwd) {\n    helper.find_and_delete(list, kwd);\n    list.unshift(kwd)\n    sync_to_store()\n    render()\n\n}\n// 删除历史记录\nfunction remove(kwd) {\n    helper.find_and_delete(list, kwd);\n    console.log(list)\n    sync_to_store()\n    render()\n}\n\n// 同步最新历史数据到localstore\nfunction sync_to_store() {\n    store.set('history_list',list)\n}\n// 同步localstore到炒瓢\nfunction sync_to_ladle() {\n    list = store.get('history_list') || []\n}\n// ========data end=============\n\nmodule.exports = output;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wbHVnaW4vaGlzdG9yeS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BsdWdpbi9oaXN0b3J5LmpzPzJkNTAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGhlbHBlciA9IHJlcXVpcmUoJy4uL3V0aWwvaGVscGVyJylcbiAgICAsIHN0b3JlID0gcmVxdWlyZSgnLi4vdXRpbC9zdG9yZScpXG4gICAgO1xuXG52YXIgbGlzdCA9IFsnYWFhJywnc3NzJywneHh4J11cbiAgICAsIGVsXG4gICAgLCBvbl9jbGlja1xuICAgICwgb25fZGVsZXRlXG4gICAgO1xuXG4vLyDkvpvlpJbpg6jkvb/nlKjmjqXlj6NcbnZhciBvdXRwdXQgPSB7XG4gICAgaW5pdDppbml0LFxuICAgIHJlbW92ZTpyZW1vdmUsXG4gICAgYWRkOmFkZCxcbn1cblxuLy8g5Yid5aeL5YyW77yM5LuO5aSW6YOo5Lyg5YWl5Y+C5pWw77yM5Y+Y6YeP77yM5Ye95pWwXG5mdW5jdGlvbiBpbml0KGNvbmZpZykge1xuICAgIGlmKCFjb25maWcuZWwpXG4gICAgICAgIHRocm93IFwiaW52YWlsIHBhcmFtIGNvbmZpZy5lbFwiXG4gICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5lbClcbiAgICBvbl9jbGljayA9IGNvbmZpZy5vbl9jbGlja1xuICAgIG9uX2RlbGV0ZSA9IGNvbmZpZy5vbl9kZWxldGVcblxuICAgIHN5bmNfdG9fc3RvcmUoKTsgLy/lsIbliJ3lp4vorrDlvZXkvKDlhaVsb2NhbHN0b3JlXG4gICAgcmVuZGVyKCk7XG59XG5cbi8vID09PT09PT09PXJlbmRlciBzdGFydD09PT09PVxuLy8g5riy5p+T5Y6G5Y+y6K6w5b2VXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgLy8g5qC55YWD57Sg5riF56m6XG4gICAgZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgLy8g57uZ5q+P5Liq5Y6G5Y+y6K6w5b2V5riy5p+TXG4gICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXl3b3JkKSB7XG4gICAgICAgIC8vIOWIm+W7uuS4gOS4quaWsOWFg+e0oFxuICAgICAgICB2YXIgZWxfa2V5d29yZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAvLyDmlrDlhYPntKDmt7vliqDlhoXlrrlcbiAgICAgICAgZWxfa2V5d29yZC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+JHtrZXl3b3JkfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvb2xcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiPuWIoOmZpDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgICAgIDtcbiAgICAgICAgLy8g5paw5YWD57Sg5re75Yqg57G7XG4gICAgICAgIGVsX2tleXdvcmQuY2xhc3NMaXN0LmFkZCgnaGlzdG9yeScpXG4gICAgICAgIC8vIOa3u+WKoOW6j+WIl+aVsOaNrlxuICAgICAgICBlbF9rZXl3b3JkLmRhdGFzZXQuaGlzdG9yeSA9IGtleXdvcmQ7XG4gICAgICAgIC8vIOi/veWKoOWIsOagueWFg+e0oFxuICAgICAgICBlbC5hcHBlbmRDaGlsZChlbF9rZXl3b3JkKTtcbiAgICAgICAgLy8g5paw5YWD57Sg5re75Yqg54K55Ye75LqL5Lu2XG4gICAgICAgIGVsX2tleXdvcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYob25fY2xpY2spXG4gICAgICAgICAgICAgICAgb25fY2xpY2soa2V5d29yZCxlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOaWsOWFg+e0oOWtkOWFg+e0oOa3u+WKoOeCueWHu+S6i+S7tlxuICAgICAgICBlbF9rZXl3b3JkLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpIC8vIOWBnOatouWGkuazoVxuICAgICAgICAgICAgaWYob25fZGVsZXRlKVxuICAgICAgICAgICAgICAgIG9uX2RlbGV0ZShrZXl3b3JkLGUpXG5cbiAgICAgICAgICAgIHJlbW92ZShrZXl3b3JkKVxuICAgICAgICB9KVxuXG4gICAgICAgIFxuICAgIH0pXG59XG4vLyA9PT09PT09PT1yZW5kZXIgZW5kPT09PT09PT1cblxuLy8gPT09PT09PT09PWRhdGEgc3RhcnQ9PT09PT09PT1cbi8vIOWinuWKoOWOhuWPsuiusOW9lVxuZnVuY3Rpb24gYWRkKGt3ZCkge1xuICAgIGhlbHBlci5maW5kX2FuZF9kZWxldGUobGlzdCwga3dkKTtcbiAgICBsaXN0LnVuc2hpZnQoa3dkKVxuICAgIHN5bmNfdG9fc3RvcmUoKVxuICAgIHJlbmRlcigpXG5cbn1cbi8vIOWIoOmZpOWOhuWPsuiusOW9lVxuZnVuY3Rpb24gcmVtb3ZlKGt3ZCkge1xuICAgIGhlbHBlci5maW5kX2FuZF9kZWxldGUobGlzdCwga3dkKTtcbiAgICBjb25zb2xlLmxvZyhsaXN0KVxuICAgIHN5bmNfdG9fc3RvcmUoKVxuICAgIHJlbmRlcigpXG59XG5cbi8vIOWQjOatpeacgOaWsOWOhuWPsuaVsOaNruWIsGxvY2Fsc3RvcmVcbmZ1bmN0aW9uIHN5bmNfdG9fc3RvcmUoKSB7XG4gICAgc3RvcmUuc2V0KCdoaXN0b3J5X2xpc3QnLGxpc3QpXG59XG4vLyDlkIzmraVsb2NhbHN0b3Jl5Yiw54KS55OiXG5mdW5jdGlvbiBzeW5jX3RvX2xhZGxlKCkge1xuICAgIGxpc3QgPSBzdG9yZS5nZXQoJ2hpc3RvcnlfbGlzdCcpIHx8IFtdXG59XG4vLyA9PT09PT09PWRhdGEgZW5kPT09PT09PT09PT09PVxuXG5tb2R1bGUuZXhwb3J0cyA9IG91dHB1dDsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./plugin/history.js\n");

/***/ }),

/***/ "./plugin/test/test.js":
/*!*****************************!*\
  !*** ./plugin/test/test.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var history = __webpack_require__(/*! ../history */ \"./plugin/history.js\")\n\nhistory.init({\n    el: '.history-list',\n    on_click: function(kwd,e){\n        console.log(kwd,e)\n    },\n    on_delete: function(kwd,e){\n        console.log(kwd,e)\n    }\n\n})\n\nhistory.add('yo1')\nhistory.add('yo2')\nhistory.add('yo3')\nhistory.add('yo4')\nhistory.remove('aaa')//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wbHVnaW4vdGVzdC90ZXN0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGx1Z2luL3Rlc3QvdGVzdC5qcz9mZDZlIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBoaXN0b3J5ID0gcmVxdWlyZSgnLi4vaGlzdG9yeScpXG5cbmhpc3RvcnkuaW5pdCh7XG4gICAgZWw6ICcuaGlzdG9yeS1saXN0JyxcbiAgICBvbl9jbGljazogZnVuY3Rpb24oa3dkLGUpe1xuICAgICAgICBjb25zb2xlLmxvZyhrd2QsZSlcbiAgICB9LFxuICAgIG9uX2RlbGV0ZTogZnVuY3Rpb24oa3dkLGUpe1xuICAgICAgICBjb25zb2xlLmxvZyhrd2QsZSlcbiAgICB9XG5cbn0pXG5cbmhpc3RvcnkuYWRkKCd5bzEnKVxuaGlzdG9yeS5hZGQoJ3lvMicpXG5oaXN0b3J5LmFkZCgneW8zJylcbmhpc3RvcnkuYWRkKCd5bzQnKVxuaGlzdG9yeS5yZW1vdmUoJ2FhYScpIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./plugin/test/test.js\n");

/***/ }),

/***/ "./util/helper.js":
/*!************************!*\
  !*** ./util/helper.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function find_and_delete(arr,kwd){\n    var index_shit = arr.indexOf(kwd);\n    if(index_shit == -1)\n        return false;\n    arr.splice(kwd,1);\n    return true;\n}\n\nmodule.exports = {\n    find_and_delete:find_and_delete\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlsL2hlbHBlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3V0aWwvaGVscGVyLmpzPzE1NDgiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmluZF9hbmRfZGVsZXRlKGFycixrd2Qpe1xuICAgIHZhciBpbmRleF9zaGl0ID0gYXJyLmluZGV4T2Yoa3dkKTtcbiAgICBpZihpbmRleF9zaGl0ID09IC0xKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgYXJyLnNwbGljZShrd2QsMSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZpbmRfYW5kX2RlbGV0ZTpmaW5kX2FuZF9kZWxldGVcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./util/helper.js\n");

/***/ }),

/***/ "./util/store.js":
/*!***********************!*\
  !*** ./util/store.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function set(key,val){\n    var json = JSON.stringify(val)\n    localStorage.setItem(key,json)\n}\n\nfunction get(key){\n    var data = localStorage.getItem(key)\n    return data = JSON.parse(data)\n}\n\nmodule.exports = {\n    set:set,\n    get:get,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlsL3N0b3JlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdXRpbC9zdG9yZS5qcz8xMjA2Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNldChrZXksdmFsKXtcbiAgICB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KHZhbClcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksanNvbilcbn1cblxuZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgdmFyIGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpXG4gICAgcmV0dXJuIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNldDpzZXQsXG4gICAgZ2V0OmdldCxcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./util/store.js\n");

/***/ })

/******/ });