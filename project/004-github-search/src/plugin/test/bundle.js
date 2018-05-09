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

eval("var help = __webpack_require__(/*! ../util/help */ \"./util/help.js\")\n    , store = __webpack_require__(/*! ../util/store */ \"./util/store.js\")\n    ;\n\nvar list = ['you','bbb','lxx']\n    , el\n    , on_click\n    , on_delete\n    ;\n\n\n// 提供外部使用接口\nvar output = {\n    init:init,\n    add:add,\n    remove:remove,\n}\n\nfunction init(config){\n    el = document.querySelector(config.el);\n    on_click = config.on_click;\n    on_delete = config.on_delete;\n\n    sync_to_store();\n    sync_to_ladle();\n    render();\n    \n}\n\n// =======render start===========\nfunction render(){\n    el.innerHTML = '';\n\n    list.forEach(function(keyword){\n        console.log(keyword)\n        // 创建元素\n        var el_keyword = document.createElement('div');\n        // 插入内容\n        el_keyword.innerHTML = `\n        <div class=\"text\">${keyword}</div>\n        <div class=\"tool\">\n            <span class=\"delete\">删除</span>\n        </div>\n        `\n        // 添加类\n        el_keyword.classList.add('history');\n        // 追加到根元素后面\n        el.appendChild(el_keyword);\n\n        // 为history类添加事件\n        el_keyword.addEventListener('click',function(e){\n            if(on_click)\n                on_click(keyword,e)\n        })\n        el_delete = el_keyword.querySelector('.delete');\n        el_delete.addEventListener('click',function(e){\n            e.stopPropagation();\n            if(on_delete)\n                on_delete(keyword,e);\n            \n            remove(keyword);\n                \n        })\n\n    })\n}\n// ========data start==========\nfunction add(kwd){\n    help.find_and_delete(list,kwd) //检查是否有重复\n    list.unshift(kwd) // 更新到炒瓢中\n    sync_to_store() // 更新到冰箱\n}\n\nfunction remove(kwd){\n    help.find_and_delete(list,kwd);\n    console.log(help.find_and_delete(list,kwd))\n    sync_to_store();\n    render();\n\n}\n\nfunction sync_to_store(){\n    store.set('history_list',list)\n}\n\nfunction sync_to_ladle(){\n    list = store.get('history_list') || [];\n}\nmodule.exports = output;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wbHVnaW4vaGlzdG9yeS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BsdWdpbi9oaXN0b3J5LmpzPzJkNTAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGhlbHAgPSByZXF1aXJlKCcuLi91dGlsL2hlbHAnKVxuICAgICwgc3RvcmUgPSByZXF1aXJlKCcuLi91dGlsL3N0b3JlJylcbiAgICA7XG5cbnZhciBsaXN0ID0gWyd5b3UnLCdiYmInLCdseHgnXVxuICAgICwgZWxcbiAgICAsIG9uX2NsaWNrXG4gICAgLCBvbl9kZWxldGVcbiAgICA7XG5cblxuLy8g5o+Q5L6b5aSW6YOo5L2/55So5o6l5Y+jXG52YXIgb3V0cHV0ID0ge1xuICAgIGluaXQ6aW5pdCxcbiAgICBhZGQ6YWRkLFxuICAgIHJlbW92ZTpyZW1vdmUsXG59XG5cbmZ1bmN0aW9uIGluaXQoY29uZmlnKXtcbiAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLmVsKTtcbiAgICBvbl9jbGljayA9IGNvbmZpZy5vbl9jbGljaztcbiAgICBvbl9kZWxldGUgPSBjb25maWcub25fZGVsZXRlO1xuXG4gICAgc3luY190b19zdG9yZSgpO1xuICAgIHN5bmNfdG9fbGFkbGUoKTtcbiAgICByZW5kZXIoKTtcbiAgICBcbn1cblxuLy8gPT09PT09PXJlbmRlciBzdGFydD09PT09PT09PT09XG5mdW5jdGlvbiByZW5kZXIoKXtcbiAgICBlbC5pbm5lckhUTUwgPSAnJztcblxuICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbihrZXl3b3JkKXtcbiAgICAgICAgY29uc29sZS5sb2coa2V5d29yZClcbiAgICAgICAgLy8g5Yib5bu65YWD57SgXG4gICAgICAgIHZhciBlbF9rZXl3b3JkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIC8vIOaPkuWFpeWGheWuuVxuICAgICAgICBlbF9rZXl3b3JkLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj4ke2tleXdvcmR9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiPuWIoOmZpDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICAgICAgLy8g5re75Yqg57G7XG4gICAgICAgIGVsX2tleXdvcmQuY2xhc3NMaXN0LmFkZCgnaGlzdG9yeScpO1xuICAgICAgICAvLyDov73liqDliLDmoLnlhYPntKDlkI7pnaJcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZWxfa2V5d29yZCk7XG5cbiAgICAgICAgLy8g5Li6aGlzdG9yeeexu+a3u+WKoOS6i+S7tlxuICAgICAgICBlbF9rZXl3b3JkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKG9uX2NsaWNrKVxuICAgICAgICAgICAgICAgIG9uX2NsaWNrKGtleXdvcmQsZSlcbiAgICAgICAgfSlcbiAgICAgICAgZWxfZGVsZXRlID0gZWxfa2V5d29yZC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlJyk7XG4gICAgICAgIGVsX2RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgaWYob25fZGVsZXRlKVxuICAgICAgICAgICAgICAgIG9uX2RlbGV0ZShrZXl3b3JkLGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZW1vdmUoa2V5d29yZCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH0pXG5cbiAgICB9KVxufVxuLy8gPT09PT09PT1kYXRhIHN0YXJ0PT09PT09PT09PVxuZnVuY3Rpb24gYWRkKGt3ZCl7XG4gICAgaGVscC5maW5kX2FuZF9kZWxldGUobGlzdCxrd2QpIC8v5qOA5p+l5piv5ZCm5pyJ6YeN5aSNXG4gICAgbGlzdC51bnNoaWZ0KGt3ZCkgLy8g5pu05paw5Yiw54KS55Oi5LitXG4gICAgc3luY190b19zdG9yZSgpIC8vIOabtOaWsOWIsOWGsOeusVxufVxuXG5mdW5jdGlvbiByZW1vdmUoa3dkKXtcbiAgICBoZWxwLmZpbmRfYW5kX2RlbGV0ZShsaXN0LGt3ZCk7XG4gICAgY29uc29sZS5sb2coaGVscC5maW5kX2FuZF9kZWxldGUobGlzdCxrd2QpKVxuICAgIHN5bmNfdG9fc3RvcmUoKTtcbiAgICByZW5kZXIoKTtcblxufVxuXG5mdW5jdGlvbiBzeW5jX3RvX3N0b3JlKCl7XG4gICAgc3RvcmUuc2V0KCdoaXN0b3J5X2xpc3QnLGxpc3QpXG59XG5cbmZ1bmN0aW9uIHN5bmNfdG9fbGFkbGUoKXtcbiAgICBsaXN0ID0gc3RvcmUuZ2V0KCdoaXN0b3J5X2xpc3QnKSB8fCBbXTtcbn1cbm1vZHVsZS5leHBvcnRzID0gb3V0cHV0OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./plugin/history.js\n");

/***/ }),

/***/ "./plugin/test/test.js":
/*!*****************************!*\
  !*** ./plugin/test/test.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var history = __webpack_require__(/*! ../history */ \"./plugin/history.js\");\n\nhistory.init({\n    el: '.history-list',\n    on_click: function(kwd,e){\n        console.log(kwd,e)\n    },\n    on_delete: function(kwd,e){\n        console.log('删除：'+ kwd,e)\n    }\n    \n})\n\n// history.add('you');\n// history.add('yo');\n// history.remove('u')\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wbHVnaW4vdGVzdC90ZXN0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGx1Z2luL3Rlc3QvdGVzdC5qcz9mZDZlIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBoaXN0b3J5ID0gcmVxdWlyZSgnLi4vaGlzdG9yeScpO1xuXG5oaXN0b3J5LmluaXQoe1xuICAgIGVsOiAnLmhpc3RvcnktbGlzdCcsXG4gICAgb25fY2xpY2s6IGZ1bmN0aW9uKGt3ZCxlKXtcbiAgICAgICAgY29uc29sZS5sb2coa3dkLGUpXG4gICAgfSxcbiAgICBvbl9kZWxldGU6IGZ1bmN0aW9uKGt3ZCxlKXtcbiAgICAgICAgY29uc29sZS5sb2coJ+WIoOmZpO+8micrIGt3ZCxlKVxuICAgIH1cbiAgICBcbn0pXG5cbi8vIGhpc3RvcnkuYWRkKCd5b3UnKTtcbi8vIGhpc3RvcnkuYWRkKCd5bycpO1xuLy8gaGlzdG9yeS5yZW1vdmUoJ3UnKVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./plugin/test/test.js\n");

/***/ }),

/***/ "./util/help.js":
/*!**********************!*\
  !*** ./util/help.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function find_and_delete(arr, kwd) {\n    var index_shit = arr.indexOf(kwd);\n\n    if (index_shit == -1)\n        return false;\n\n    arr.splice(kwd, 1);\n    return true;\n}\n\nmodule.exports = {\n    find_and_delete: find_and_delete\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlsL2hlbHAuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlsL2hlbHAuanM/N2Y2MCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmaW5kX2FuZF9kZWxldGUoYXJyLCBrd2QpIHtcbiAgICB2YXIgaW5kZXhfc2hpdCA9IGFyci5pbmRleE9mKGt3ZCk7XG5cbiAgICBpZiAoaW5kZXhfc2hpdCA9PSAtMSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgYXJyLnNwbGljZShrd2QsIDEpO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmaW5kX2FuZF9kZWxldGU6IGZpbmRfYW5kX2RlbGV0ZVxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./util/help.js\n");

/***/ }),

/***/ "./util/store.js":
/*!***********************!*\
  !*** ./util/store.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function set(name,data){\n    var json = JSON.stringify(data);\n    localStorage.setItem(name,json);\n}\n\nfunction get(name){\n    var data = localStorage.getItem(name);\n    return data = JSON.parse(data);\n\n}\n\nmodule.exports = {\n    get:get,\n    set:set,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlsL3N0b3JlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdXRpbC9zdG9yZS5qcz8xMjA2Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNldChuYW1lLGRhdGEpe1xuICAgIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSxqc29uKTtcbn1cblxuZnVuY3Rpb24gZ2V0KG5hbWUpe1xuICAgIHZhciBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSk7XG4gICAgcmV0dXJuIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldDpnZXQsXG4gICAgc2V0OnNldCxcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./util/store.js\n");

/***/ })

/******/ });