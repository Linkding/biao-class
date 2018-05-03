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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/element.js":
/*!***********************!*\
  !*** ./js/element.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var form = document.querySelector('#form-search')\n    , input = document.querySelector('#search-input')\n    , user_list = document.querySelector('#user-list')\n    , load_more = document.querySelector('#load-more')\n\n\nfunction render_user(data) {\n    var html = ``\n    console.log(data)\n    data.items.forEach(function (user) {\n        html = html + `\n            <div class=\"user\">\n            <div class=\"logo\">\n                <img src=\"${user.avatar_url}\">\n            </div>\n            <div class=\"info\">\n                <div class=\"name\">${user.login}</div>\n                <a href=\"${user.html_url}\" class=\"link\">${user.html_url}</a>\n            </div>\n            </div>\n            `\n    });\n    // 将模板导入页面渲染位置\n    user_list.innerHTML = html;\n\n    //渲染搜索结果\n    // document.querySelector('#count').innerHTML = `共有${res.total_count}条结果`\n}\n\nfunction render_load_more() {\n\n}\n\nfunction hide_load_more() {\n    load_more.hidden = true;\n}\nfunction show_load_more() {\n    load_more.hidden = false;\n}\n\nmodule.exports = {\n    form: form,\n    input: input,\n    load_more: load_more,\n    render_user: render_user,\n    hide_load_more: hide_load_more,\n    show_load_more: show_load_more\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9lbGVtZW50LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvZWxlbWVudC5qcz8yODZkIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tc2VhcmNoJylcbiAgICAsIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1pbnB1dCcpXG4gICAgLCB1c2VyX2xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci1saXN0JylcbiAgICAsIGxvYWRfbW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkLW1vcmUnKVxuXG5cbmZ1bmN0aW9uIHJlbmRlcl91c2VyKGRhdGEpIHtcbiAgICB2YXIgaHRtbCA9IGBgXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgICBkYXRhLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgaHRtbCA9IGh0bWwgKyBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvZ29cIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7dXNlci5hdmF0YXJfdXJsfVwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mb1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+JHt1c2VyLmxvZ2lufTwvZGl2PlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3VzZXIuaHRtbF91cmx9XCIgY2xhc3M9XCJsaW5rXCI+JHt1c2VyLmh0bWxfdXJsfTwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgXG4gICAgfSk7XG4gICAgLy8g5bCG5qih5p2/5a+85YWl6aG16Z2i5riy5p+T5L2N572uXG4gICAgdXNlcl9saXN0LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICAvL+a4suafk+aQnOe0oue7k+aenFxuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb3VudCcpLmlubmVySFRNTCA9IGDlhbHmnIkke3Jlcy50b3RhbF9jb3VudH3mnaHnu5PmnpxgXG59XG5cbmZ1bmN0aW9uIHJlbmRlcl9sb2FkX21vcmUoKSB7XG5cbn1cblxuZnVuY3Rpb24gaGlkZV9sb2FkX21vcmUoKSB7XG4gICAgbG9hZF9tb3JlLmhpZGRlbiA9IHRydWU7XG59XG5mdW5jdGlvbiBzaG93X2xvYWRfbW9yZSgpIHtcbiAgICBsb2FkX21vcmUuaGlkZGVuID0gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm06IGZvcm0sXG4gICAgaW5wdXQ6IGlucHV0LFxuICAgIGxvYWRfbW9yZTogbG9hZF9tb3JlLFxuICAgIHJlbmRlcl91c2VyOiByZW5kZXJfdXNlcixcbiAgICBoaWRlX2xvYWRfbW9yZTogaGlkZV9sb2FkX21vcmUsXG4gICAgc2hvd19sb2FkX21vcmU6IHNob3dfbG9hZF9tb3JlXG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/element.js\n");

/***/ }),

/***/ "./js/event.js":
/*!*********************!*\
  !*** ./js/event.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var el = __webpack_require__(/*! ./element */ \"./js/element.js\")\n    , search = __webpack_require__(/*! ./search */ \"./js/search.js\")\n    , keyword\n    , page = 1\n    , limit = 5\n    ;\n\nfunction detect_submit() {\n    el.form.addEventListener('submit', function (e) {\n        e.preventDefault();\n        keyword = el.input.value;\n\n        search.user(keyword, function (data) {\n            el.render_user(data);\n        });\n    });\n};\n\nfunction detect_load_more(){\n    el.load_more.addEventListener('click',function(e){\n        // 准备配置\n        var config = {\n            page: page++,\n            limit: limit,\n        };\n\n        // 开始搜索\n        search.user(keyword,function(data){\n            el.render_user(data);\n        },config);\n    });\n}\n\nfunction add_events() {\n    detect_submit();\n    detect_load_more();\n}\n\nmodule.exports = {\n    add_events: add_events,\n    detect_load_more: detect_load_more,\n    detect_submit: detect_submit,\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9ldmVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2V2ZW50LmpzPzY4Y2EiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGVsID0gcmVxdWlyZSgnLi9lbGVtZW50JylcbiAgICAsIHNlYXJjaCA9IHJlcXVpcmUoJy4vc2VhcmNoJylcbiAgICAsIGtleXdvcmRcbiAgICAsIHBhZ2UgPSAxXG4gICAgLCBsaW1pdCA9IDVcbiAgICA7XG5cbmZ1bmN0aW9uIGRldGVjdF9zdWJtaXQoKSB7XG4gICAgZWwuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGtleXdvcmQgPSBlbC5pbnB1dC52YWx1ZTtcblxuICAgICAgICBzZWFyY2gudXNlcihrZXl3b3JkLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgZWwucmVuZGVyX3VzZXIoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gZGV0ZWN0X2xvYWRfbW9yZSgpe1xuICAgIGVsLmxvYWRfbW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSl7XG4gICAgICAgIC8vIOWHhuWkh+mFjee9rlxuICAgICAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICAgICAgcGFnZTogcGFnZSsrLFxuICAgICAgICAgICAgbGltaXQ6IGxpbWl0LFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOW8gOWni+aQnOe0olxuICAgICAgICBzZWFyY2gudXNlcihrZXl3b3JkLGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgZWwucmVuZGVyX3VzZXIoZGF0YSk7XG4gICAgICAgIH0sY29uZmlnKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkX2V2ZW50cygpIHtcbiAgICBkZXRlY3Rfc3VibWl0KCk7XG4gICAgZGV0ZWN0X2xvYWRfbW9yZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhZGRfZXZlbnRzOiBhZGRfZXZlbnRzLFxuICAgIGRldGVjdF9sb2FkX21vcmU6IGRldGVjdF9sb2FkX21vcmUsXG4gICAgZGV0ZWN0X3N1Ym1pdDogZGV0ZWN0X3N1Ym1pdCxcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/event.js\n");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var event = __webpack_require__(/*! ./event */ \"./js/event.js\");\n\ninit();\n\nfunction init(){\n    event.add_events();\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2luZGV4LmpzP2VlMWMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5pbml0KCk7XG5cbmZ1bmN0aW9uIGluaXQoKXtcbiAgICBldmVudC5hZGRfZXZlbnRzKCk7XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/index.js\n");

/***/ }),

/***/ "./js/search.js":
/*!**********************!*\
  !*** ./js/search.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 搜索模块\n// user: 获取github用户数据（具体这个数据使用场景，不在乎，调用者决定）\n\n// 搜用户\n// * @param String keyword 用户名关键词\n// * @param Function on_success 成功搜索到数据后（回调函数）\n// * @param Object config 配置项\nfunction user(keyword, on_success, config) {\n    // 默认配置\n    var def = {\n        page: 1,\n        limit: 10,\n        keyword: 'yo',\n    };\n\n    // 合并用户配置，使用对象合并功能\n    config = Object.assign({}, def, config);\n\n    var http = new XMLHttpRequest();\n    http.open('get', 'https://api.github.com/search/users?q=' + keyword + '&page=' + config.page + '&per_page=' + config.limit);\n    http.send();\n\n    http.addEventListener('load', function (e) {\n        var data = JSON.parse(this.responseText);\n        on_success(data)\n    })\n}\n\nmodule.exports = {\n    user: user\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zZWFyY2guanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2guanM/ODAxYiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyDmkJzntKLmqKHlnZdcbi8vIHVzZXI6IOiOt+WPlmdpdGh1YueUqOaIt+aVsOaNru+8iOWFt+S9k+i/meS4quaVsOaNruS9v+eUqOWcuuaZr++8jOS4jeWcqOS5ju+8jOiwg+eUqOiAheWGs+Wumu+8iVxuXG4vLyDmkJznlKjmiLdcbi8vICogQHBhcmFtIFN0cmluZyBrZXl3b3JkIOeUqOaIt+WQjeWFs+mUruivjVxuLy8gKiBAcGFyYW0gRnVuY3Rpb24gb25fc3VjY2VzcyDmiJDlip/mkJzntKLliLDmlbDmja7lkI7vvIjlm57osIPlh73mlbDvvIlcbi8vICogQHBhcmFtIE9iamVjdCBjb25maWcg6YWN572u6aG5XG5mdW5jdGlvbiB1c2VyKGtleXdvcmQsIG9uX3N1Y2Nlc3MsIGNvbmZpZykge1xuICAgIC8vIOm7mOiupOmFjee9rlxuICAgIHZhciBkZWYgPSB7XG4gICAgICAgIHBhZ2U6IDEsXG4gICAgICAgIGxpbWl0OiAxMCxcbiAgICAgICAga2V5d29yZDogJ3lvJyxcbiAgICB9O1xuXG4gICAgLy8g5ZCI5bm255So5oi36YWN572u77yM5L2/55So5a+56LGh5ZCI5bm25Yqf6IO9XG4gICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmLCBjb25maWcpO1xuXG4gICAgdmFyIGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBodHRwLm9wZW4oJ2dldCcsICdodHRwczovL2FwaS5naXRodWIuY29tL3NlYXJjaC91c2Vycz9xPScgKyBrZXl3b3JkICsgJyZwYWdlPScgKyBjb25maWcucGFnZSArICcmcGVyX3BhZ2U9JyArIGNvbmZpZy5saW1pdCk7XG4gICAgaHR0cC5zZW5kKCk7XG5cbiAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICBvbl9zdWNjZXNzKGRhdGEpXG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdXNlcjogdXNlclxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/search.js\n");

/***/ })

/******/ });