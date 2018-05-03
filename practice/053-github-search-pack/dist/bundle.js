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

eval("var form = document.getElementById('form-search')\n    , input = document.getElementById('search-input')\n    , user_list = document.getElementById('user-list')\n    , load_more = document.getElementById('load-more')\n    ;\n\nfunction render_user_list(data) {\n    var html = user_list.innerHTML\n\n    data.items.forEach(function (user) {\n        html = html + `\n                <div class=\"user\">\n                <div class=\"logo\">\n                    <img src=\"${user.avatar_url}\">\n                </div>\n                <div class=\"info\">\n                    <div class=\"name\">${user.login}</div>\n                    <a href=\"${user.html_url}\" class=\"link\">${user.html_url}</a>\n                </div>\n                </div>\n                `\n    });\n    // 将模板导入页面渲染位置\n    user_list.innerHTML = html;\n\n    //渲染搜索结果\n    document.querySelector('#count').innerHTML = `共有${data.total_count}条结果`\n\n}\n\n\nfunction show_load_more() {\n    load_more.hidden = false;\n}\nfunction hide_load_more() {\n    load_more.hidden = true;\n}\nmodule.exports = {\n    form: form,\n    input: input,\n    load_more: load_more,\n    render_user_list: render_user_list,\n    show_load_more: show_load_more,\n    hide_load_more: hide_load_more,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9lbGVtZW50LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvZWxlbWVudC5qcz8yODZkIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tc2VhcmNoJylcbiAgICAsIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1pbnB1dCcpXG4gICAgLCB1c2VyX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1saXN0JylcbiAgICAsIGxvYWRfbW9yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLW1vcmUnKVxuICAgIDtcblxuZnVuY3Rpb24gcmVuZGVyX3VzZXJfbGlzdChkYXRhKSB7XG4gICAgdmFyIGh0bWwgPSB1c2VyX2xpc3QuaW5uZXJIVE1MXG5cbiAgICBkYXRhLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgaHRtbCA9IGh0bWwgKyBgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVzZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9nb1wiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7dXNlci5hdmF0YXJfdXJsfVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+JHt1c2VyLmxvZ2lufTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHt1c2VyLmh0bWxfdXJsfVwiIGNsYXNzPVwibGlua1wiPiR7dXNlci5odG1sX3VybH08L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYFxuICAgIH0pO1xuICAgIC8vIOWwhuaooeadv+WvvOWFpemhtemdoua4suafk+S9jee9rlxuICAgIHVzZXJfbGlzdC5pbm5lckhUTUwgPSBodG1sO1xuXG4gICAgLy/muLLmn5PmkJzntKLnu5PmnpxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY291bnQnKS5pbm5lckhUTUwgPSBg5YWx5pyJJHtkYXRhLnRvdGFsX2NvdW50feadoee7k+aenGBcblxufVxuXG5cbmZ1bmN0aW9uIHNob3dfbG9hZF9tb3JlKCkge1xuICAgIGxvYWRfbW9yZS5oaWRkZW4gPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGhpZGVfbG9hZF9tb3JlKCkge1xuICAgIGxvYWRfbW9yZS5oaWRkZW4gPSB0cnVlO1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybTogZm9ybSxcbiAgICBpbnB1dDogaW5wdXQsXG4gICAgbG9hZF9tb3JlOiBsb2FkX21vcmUsXG4gICAgcmVuZGVyX3VzZXJfbGlzdDogcmVuZGVyX3VzZXJfbGlzdCxcbiAgICBzaG93X2xvYWRfbW9yZTogc2hvd19sb2FkX21vcmUsXG4gICAgaGlkZV9sb2FkX21vcmU6IGhpZGVfbG9hZF9tb3JlLFxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/element.js\n");

/***/ }),

/***/ "./js/event.js":
/*!*********************!*\
  !*** ./js/event.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var el = __webpack_require__(/*! ./element */ \"./js/element.js\")\n    , search = __webpack_require__(/*! ./search */ \"./js/search.js\")\n    , keyword\n    , page = 1\n    , limit = 4\n    ;\n\nfunction detect_submit(){\n    el.form.addEventListener('submit',function(e){\n        e.preventDefault();\n        keyword = el.input.value;\n        search.user(keyword,function(data){\n            console.log(data);\n            el.render_user_list(data);\n            el.show_load_more();\n            console.log('show more')\n        });\n\n    });\n}\n\nfunction detect_load_more(){\n    el.load_more.addEventListener('click',function(){\n        console.log('click load more')\n        console.log('发射之前page='+ page)\n        var config = {\n            page : ++page,\n            limit: limit,\n        }\n        console.log('准备发射page=' + page)\n        search.user(keyword,function(data){\n            el.render_user_list(data);\n        },config)\n    })\n}\n\nfunction add_event(){\n    detect_submit();\n    detect_load_more();\n\n}\n\nmodule.exports = {\n    add_event:add_event,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9ldmVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2V2ZW50LmpzPzY4Y2EiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGVsID0gcmVxdWlyZSgnLi9lbGVtZW50JylcbiAgICAsIHNlYXJjaCA9IHJlcXVpcmUoJy4vc2VhcmNoJylcbiAgICAsIGtleXdvcmRcbiAgICAsIHBhZ2UgPSAxXG4gICAgLCBsaW1pdCA9IDRcbiAgICA7XG5cbmZ1bmN0aW9uIGRldGVjdF9zdWJtaXQoKXtcbiAgICBlbC5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAga2V5d29yZCA9IGVsLmlucHV0LnZhbHVlO1xuICAgICAgICBzZWFyY2gudXNlcihrZXl3b3JkLGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBlbC5yZW5kZXJfdXNlcl9saXN0KGRhdGEpO1xuICAgICAgICAgICAgZWwuc2hvd19sb2FkX21vcmUoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaG93IG1vcmUnKVxuICAgICAgICB9KTtcblxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZXRlY3RfbG9hZF9tb3JlKCl7XG4gICAgZWwubG9hZF9tb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnY2xpY2sgbG9hZCBtb3JlJylcbiAgICAgICAgY29uc29sZS5sb2coJ+WPkeWwhOS5i+WJjXBhZ2U9JysgcGFnZSlcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIHBhZ2UgOiArK3BhZ2UsXG4gICAgICAgICAgICBsaW1pdDogbGltaXQsXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ+WHhuWkh+WPkeWwhHBhZ2U9JyArIHBhZ2UpXG4gICAgICAgIHNlYXJjaC51c2VyKGtleXdvcmQsZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBlbC5yZW5kZXJfdXNlcl9saXN0KGRhdGEpO1xuICAgICAgICB9LGNvbmZpZylcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBhZGRfZXZlbnQoKXtcbiAgICBkZXRlY3Rfc3VibWl0KCk7XG4gICAgZGV0ZWN0X2xvYWRfbW9yZSgpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFkZF9ldmVudDphZGRfZXZlbnQsXG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/event.js\n");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var event = __webpack_require__(/*! ./event */ \"./js/event.js\");\n\ninit();\nfunction init(){\n    event.add_event();\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2luZGV4LmpzP2VlMWMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5pbml0KCk7XG5mdW5jdGlvbiBpbml0KCl7XG4gICAgZXZlbnQuYWRkX2V2ZW50KCk7XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/index.js\n");

/***/ }),

/***/ "./js/search.js":
/*!**********************!*\
  !*** ./js/search.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function user(keyword,on_succeed,config) {\n    var def = {\n        page : 1,\n        limit : 2,\n        keyword : 'yo',\n    };\n\n    config = Object.assign({},def,config);\n    console.log('发射出去的page=' + config.page+  '  limit='+config.limit)\n    var http = new XMLHttpRequest();\n    http.open('get', 'https://api.github.com/search/users?q=' + keyword + '&page=' + config.page + '&per_page=' + config.limit);\n    http.send();\n\n    http.addEventListener('load', function (data) {\n        var data = JSON.parse(this.responseText);\n        on_succeed(data);\n    });\n}\n\nmodule.exports = {\n    user:user,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zZWFyY2guanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2guanM/ODAxYiJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB1c2VyKGtleXdvcmQsb25fc3VjY2VlZCxjb25maWcpIHtcbiAgICB2YXIgZGVmID0ge1xuICAgICAgICBwYWdlIDogMSxcbiAgICAgICAgbGltaXQgOiAyLFxuICAgICAgICBrZXl3b3JkIDogJ3lvJyxcbiAgICB9O1xuXG4gICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSxkZWYsY29uZmlnKTtcbiAgICBjb25zb2xlLmxvZygn5Y+R5bCE5Ye65Y6755qEcGFnZT0nICsgY29uZmlnLnBhZ2UrICAnICBsaW1pdD0nK2NvbmZpZy5saW1pdClcbiAgICB2YXIgaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGh0dHAub3BlbignZ2V0JywgJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vc2VhcmNoL3VzZXJzP3E9JyArIGtleXdvcmQgKyAnJnBhZ2U9JyArIGNvbmZpZy5wYWdlICsgJyZwZXJfcGFnZT0nICsgY29uZmlnLmxpbWl0KTtcbiAgICBodHRwLnNlbmQoKTtcblxuICAgIGh0dHAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIG9uX3N1Y2NlZWQoZGF0YSk7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVzZXI6dXNlcixcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/search.js\n");

/***/ })

/******/ });