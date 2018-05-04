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
/***/ (function(module, exports, __webpack_require__) {

eval("var localstore = __webpack_require__(/*! ./localstore */ \"./js/localstore.js\")\n    , pub_param = __webpack_require__(/*! ./pub_param */ \"./js/pub_param.js\")\n\nvar form = document.getElementById('form-search')\n    , input = document.getElementById('search-input')\n    , user_list = document.getElementById('user-list')\n    , load_more = document.getElementById('load-more')\n    , history_list = document.querySelector('.history-list')\n    , history_list_store = pub_param.get_history_list()//这个变量在这里有点尴尬，再想想\n    ;\n\nfunction render_user_list(data) {\n    var html = user_list.innerHTML\n\n    data.items.forEach(function (user) {\n        html = html + `\n                <div class=\"user\">\n                <div class=\"logo\">\n                    <img src=\"${user.avatar_url}\">\n                </div>\n                <div class=\"info\">\n                    <div class=\"name\">${user.login}</div>\n                    <a href=\"${user.html_url}\" class=\"link\">${user.html_url}</a>\n                </div>\n                </div>\n                `\n    });\n    // 将模板导入页面渲染位置\n    user_list.innerHTML = html;\n\n    //渲染搜索结果\n    document.querySelector('#count').innerHTML = `共有${data.total_count}条结果`\n\n}\n\n\n\nfunction render_history_list() {\n    history_list.innerHTML = '';\n\n    // console.log(typeof history_list)\n    history_list_store.forEach(function (history) {\n        var el_delete\n            , el_history = document.createElement('div')\n\n        el_history.classList.add('history')\n        el_history.dataset.history = history\n        el_history.innerHTML = `\n        <div class=\"text\">${history}</div>\n        <div class=\"tool\">\n            <span class=\"delete\">删除</span>\n        </div>\n        `\n        history_list.appendChild(el_history)\n        el_delete = el_history.querySelector('.delete')\n\n        // 渲染后，对历史记录列表添加监听事件\n        //当点击历史记录时\n        el_history.addEventListener('click', function (e) {\n            //如果点击的区域是删除按钮，则关键字不搜索，也不上屏，直接返回\n            if (e.target.classList.contains('delete'))\n                return;\n\n            //上屏\n            pub_param.set_keyword(this.dataset.history)\n            // set_keyword(this.dataset.history);\n            //搜索\n            search();\n        })\n\n        //当点击删除历史记录时\n        el_delete.addEventListener('click', function (e) {\n            //先找到history的元素，获取存放的关键词\n            var el_history = this.closest('.history')\n                , kwd = el_history.dataset.history\n\n            \n            //如果删除失败，即不存在这个关键字在列表，则返回\n            if (!localstore.find_and_delete(localstore.get_history_list_store(), kwd))\n                return;\n\n            //否则用（删减过）新数据覆盖关键字列表\n            // console.log('history_list:' + history_list_store)\n           localstore.over_write_history(history_list)\n            //重新渲染历史记录\n            setTimeout(function () {\n                render_history();\n            }, 0);\n\n            //如果历史记录没有，或者删除光了，就隐藏历史列表\n            if (!history_list_store.length)\n                history_list.hidden = true;\n        })\n    })\n}\n\nfunction show_history_list() {\n    history_list.hidden = false;\n}\n\nfunction hide_history_list() {\n    history_list.hidden = true;\n}\n\nfunction show_load_more() {\n    load_more.hidden = false;\n}\nfunction hide_load_more() {\n    load_more.hidden = true;\n}\nmodule.exports = {\n    form: form,\n    input: input,\n    load_more: load_more,\n    render_user_list: render_user_list,\n    render_history_list: render_history_list,\n    show_history_list: show_history_list,\n    hide_history_list: hide_history_list,\n    show_load_more: show_load_more,\n    hide_load_more: hide_load_more,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9lbGVtZW50LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvZWxlbWVudC5qcz8yODZkIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBsb2NhbHN0b3JlID0gcmVxdWlyZSgnLi9sb2NhbHN0b3JlJylcbiAgICAsIHB1Yl9wYXJhbSA9IHJlcXVpcmUoJy4vcHViX3BhcmFtJylcblxudmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybS1zZWFyY2gnKVxuICAgICwgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0JylcbiAgICAsIHVzZXJfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLWxpc3QnKVxuICAgICwgbG9hZF9tb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtbW9yZScpXG4gICAgLCBoaXN0b3J5X2xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlzdG9yeS1saXN0JylcbiAgICAsIGhpc3RvcnlfbGlzdF9zdG9yZSA9IHB1Yl9wYXJhbS5nZXRfaGlzdG9yeV9saXN0KCkvL+i/meS4quWPmOmHj+WcqOi/memHjOacieeCueWwtOWwrO+8jOWGjeaDs+aDs1xuICAgIDtcblxuZnVuY3Rpb24gcmVuZGVyX3VzZXJfbGlzdChkYXRhKSB7XG4gICAgdmFyIGh0bWwgPSB1c2VyX2xpc3QuaW5uZXJIVE1MXG5cbiAgICBkYXRhLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgaHRtbCA9IGh0bWwgKyBgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVzZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9nb1wiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7dXNlci5hdmF0YXJfdXJsfVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+JHt1c2VyLmxvZ2lufTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHt1c2VyLmh0bWxfdXJsfVwiIGNsYXNzPVwibGlua1wiPiR7dXNlci5odG1sX3VybH08L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYFxuICAgIH0pO1xuICAgIC8vIOWwhuaooeadv+WvvOWFpemhtemdoua4suafk+S9jee9rlxuICAgIHVzZXJfbGlzdC5pbm5lckhUTUwgPSBodG1sO1xuXG4gICAgLy/muLLmn5PmkJzntKLnu5PmnpxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY291bnQnKS5pbm5lckhUTUwgPSBg5YWx5pyJJHtkYXRhLnRvdGFsX2NvdW50feadoee7k+aenGBcblxufVxuXG5cblxuZnVuY3Rpb24gcmVuZGVyX2hpc3RvcnlfbGlzdCgpIHtcbiAgICBoaXN0b3J5X2xpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh0eXBlb2YgaGlzdG9yeV9saXN0KVxuICAgIGhpc3RvcnlfbGlzdF9zdG9yZS5mb3JFYWNoKGZ1bmN0aW9uIChoaXN0b3J5KSB7XG4gICAgICAgIHZhciBlbF9kZWxldGVcbiAgICAgICAgICAgICwgZWxfaGlzdG9yeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICAgICAgZWxfaGlzdG9yeS5jbGFzc0xpc3QuYWRkKCdoaXN0b3J5JylcbiAgICAgICAgZWxfaGlzdG9yeS5kYXRhc2V0Lmhpc3RvcnkgPSBoaXN0b3J5XG4gICAgICAgIGVsX2hpc3RvcnkuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPiR7aGlzdG9yeX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRvb2xcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVsZXRlXCI+5Yig6ZmkPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgICAgICBoaXN0b3J5X2xpc3QuYXBwZW5kQ2hpbGQoZWxfaGlzdG9yeSlcbiAgICAgICAgZWxfZGVsZXRlID0gZWxfaGlzdG9yeS5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlJylcblxuICAgICAgICAvLyDmuLLmn5PlkI7vvIzlr7nljoblj7LorrDlvZXliJfooajmt7vliqDnm5HlkKzkuovku7ZcbiAgICAgICAgLy/lvZPngrnlh7vljoblj7LorrDlvZXml7ZcbiAgICAgICAgZWxfaGlzdG9yeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvL+WmguaenOeCueWHu+eahOWMuuWfn+aYr+WIoOmZpOaMiemSru+8jOWImeWFs+mUruWtl+S4jeaQnOe0ou+8jOS5n+S4jeS4iuWxj++8jOebtOaOpei/lOWbnlxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlJykpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAvL+S4iuWxj1xuICAgICAgICAgICAgcHViX3BhcmFtLnNldF9rZXl3b3JkKHRoaXMuZGF0YXNldC5oaXN0b3J5KVxuICAgICAgICAgICAgLy8gc2V0X2tleXdvcmQodGhpcy5kYXRhc2V0Lmhpc3RvcnkpO1xuICAgICAgICAgICAgLy/mkJzntKJcbiAgICAgICAgICAgIHNlYXJjaCgpO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8v5b2T54K55Ye75Yig6Zmk5Y6G5Y+y6K6w5b2V5pe2XG4gICAgICAgIGVsX2RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvL+WFiOaJvuWIsGhpc3RvcnnnmoTlhYPntKDvvIzojrflj5blrZjmlL7nmoTlhbPplK7or41cbiAgICAgICAgICAgIHZhciBlbF9oaXN0b3J5ID0gdGhpcy5jbG9zZXN0KCcuaGlzdG9yeScpXG4gICAgICAgICAgICAgICAgLCBrd2QgPSBlbF9oaXN0b3J5LmRhdGFzZXQuaGlzdG9yeVxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8v5aaC5p6c5Yig6Zmk5aSx6LSl77yM5Y2z5LiN5a2Y5Zyo6L+Z5Liq5YWz6ZSu5a2X5Zyo5YiX6KGo77yM5YiZ6L+U5ZueXG4gICAgICAgICAgICBpZiAoIWxvY2Fsc3RvcmUuZmluZF9hbmRfZGVsZXRlKGxvY2Fsc3RvcmUuZ2V0X2hpc3RvcnlfbGlzdF9zdG9yZSgpLCBrd2QpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgLy/lkKbliJnnlKjvvIjliKDlh4/ov4fvvInmlrDmlbDmja7opobnm5blhbPplK7lrZfliJfooahcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXN0b3J5X2xpc3Q6JyArIGhpc3RvcnlfbGlzdF9zdG9yZSlcbiAgICAgICAgICAgbG9jYWxzdG9yZS5vdmVyX3dyaXRlX2hpc3RvcnkoaGlzdG9yeV9saXN0KVxuICAgICAgICAgICAgLy/ph43mlrDmuLLmn5Pljoblj7LorrDlvZVcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlbmRlcl9oaXN0b3J5KCk7XG4gICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICAgICAgLy/lpoLmnpzljoblj7LorrDlvZXmsqHmnInvvIzmiJbogIXliKDpmaTlhYnkuobvvIzlsLHpmpDol4/ljoblj7LliJfooahcbiAgICAgICAgICAgIGlmICghaGlzdG9yeV9saXN0X3N0b3JlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBoaXN0b3J5X2xpc3QuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzaG93X2hpc3RvcnlfbGlzdCgpIHtcbiAgICBoaXN0b3J5X2xpc3QuaGlkZGVuID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGhpZGVfaGlzdG9yeV9saXN0KCkge1xuICAgIGhpc3RvcnlfbGlzdC5oaWRkZW4gPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBzaG93X2xvYWRfbW9yZSgpIHtcbiAgICBsb2FkX21vcmUuaGlkZGVuID0gZmFsc2U7XG59XG5mdW5jdGlvbiBoaWRlX2xvYWRfbW9yZSgpIHtcbiAgICBsb2FkX21vcmUuaGlkZGVuID0gdHJ1ZTtcbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm06IGZvcm0sXG4gICAgaW5wdXQ6IGlucHV0LFxuICAgIGxvYWRfbW9yZTogbG9hZF9tb3JlLFxuICAgIHJlbmRlcl91c2VyX2xpc3Q6IHJlbmRlcl91c2VyX2xpc3QsXG4gICAgcmVuZGVyX2hpc3RvcnlfbGlzdDogcmVuZGVyX2hpc3RvcnlfbGlzdCxcbiAgICBzaG93X2hpc3RvcnlfbGlzdDogc2hvd19oaXN0b3J5X2xpc3QsXG4gICAgaGlkZV9oaXN0b3J5X2xpc3Q6IGhpZGVfaGlzdG9yeV9saXN0LFxuICAgIHNob3dfbG9hZF9tb3JlOiBzaG93X2xvYWRfbW9yZSxcbiAgICBoaWRlX2xvYWRfbW9yZTogaGlkZV9sb2FkX21vcmUsXG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/element.js\n");

/***/ }),

/***/ "./js/event.js":
/*!*********************!*\
  !*** ./js/event.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var el = __webpack_require__(/*! ./element */ \"./js/element.js\")\n    , search = __webpack_require__(/*! ./search */ \"./js/search.js\")\n    , localstore = __webpack_require__(/*! ./localstore */ \"./js/localstore.js\")\n    , pub_param = __webpack_require__(/*! ./pub_param */ \"./js/pub_param.js\")\n    , page = 1\n    , limit = 4\n    ;\n\nfunction detect_submit(){\n    el.form.addEventListener('submit',function(e){\n        e.preventDefault();\n        keyword = pub_param.set_keyword(el.input.value);\n        if(!keyword)\n            return;\n\n        // 按关键字搜索用户\n        search.user(keyword,function(data){\n            console.log(data);\n            el.render_user_list(data);\n            el.show_load_more();\n            console.log('show more')\n        });\n        // 记录关键字\n        localstore.append_history(keyword);\n\n    });\n}\n\nfunction detect_load_more(){\n    el.load_more.addEventListener('click',function(){\n        console.log('click load more')\n        console.log('发射之前page='+ page)\n        var config = {\n            page : ++page,\n            limit: limit,\n        }\n        console.log('准备发射page=' + page)\n        search.user(keyword,function(data){\n            el.render_user_list(data);\n        },config)\n    })\n}\n\nfunction detect_click_input(){\n    el.input.addEventListener('click',function(e){\n        el.render_history_list();\n        el.show_history_list();\n    })\n}\n\nfunction add_event(){\n    detect_submit();\n    detect_load_more();\n    detect_click_input();\n\n}\n\nmodule.exports = {\n    add_event:add_event,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9ldmVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2V2ZW50LmpzPzY4Y2EiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGVsID0gcmVxdWlyZSgnLi9lbGVtZW50JylcbiAgICAsIHNlYXJjaCA9IHJlcXVpcmUoJy4vc2VhcmNoJylcbiAgICAsIGxvY2Fsc3RvcmUgPSByZXF1aXJlKCcuL2xvY2Fsc3RvcmUnKVxuICAgICwgcHViX3BhcmFtID0gcmVxdWlyZSgnLi9wdWJfcGFyYW0nKVxuICAgICwgcGFnZSA9IDFcbiAgICAsIGxpbWl0ID0gNFxuICAgIDtcblxuZnVuY3Rpb24gZGV0ZWN0X3N1Ym1pdCgpe1xuICAgIGVsLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBrZXl3b3JkID0gcHViX3BhcmFtLnNldF9rZXl3b3JkKGVsLmlucHV0LnZhbHVlKTtcbiAgICAgICAgaWYoIWtleXdvcmQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgLy8g5oyJ5YWz6ZSu5a2X5pCc57Si55So5oi3XG4gICAgICAgIHNlYXJjaC51c2VyKGtleXdvcmQsZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGVsLnJlbmRlcl91c2VyX2xpc3QoZGF0YSk7XG4gICAgICAgICAgICBlbC5zaG93X2xvYWRfbW9yZSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Nob3cgbW9yZScpXG4gICAgICAgIH0pO1xuICAgICAgICAvLyDorrDlvZXlhbPplK7lrZdcbiAgICAgICAgbG9jYWxzdG9yZS5hcHBlbmRfaGlzdG9yeShrZXl3b3JkKTtcblxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZXRlY3RfbG9hZF9tb3JlKCl7XG4gICAgZWwubG9hZF9tb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnY2xpY2sgbG9hZCBtb3JlJylcbiAgICAgICAgY29uc29sZS5sb2coJ+WPkeWwhOS5i+WJjXBhZ2U9JysgcGFnZSlcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIHBhZ2UgOiArK3BhZ2UsXG4gICAgICAgICAgICBsaW1pdDogbGltaXQsXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ+WHhuWkh+WPkeWwhHBhZ2U9JyArIHBhZ2UpXG4gICAgICAgIHNlYXJjaC51c2VyKGtleXdvcmQsZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBlbC5yZW5kZXJfdXNlcl9saXN0KGRhdGEpO1xuICAgICAgICB9LGNvbmZpZylcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBkZXRlY3RfY2xpY2tfaW5wdXQoKXtcbiAgICBlbC5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSl7XG4gICAgICAgIGVsLnJlbmRlcl9oaXN0b3J5X2xpc3QoKTtcbiAgICAgICAgZWwuc2hvd19oaXN0b3J5X2xpc3QoKTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBhZGRfZXZlbnQoKXtcbiAgICBkZXRlY3Rfc3VibWl0KCk7XG4gICAgZGV0ZWN0X2xvYWRfbW9yZSgpO1xuICAgIGRldGVjdF9jbGlja19pbnB1dCgpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFkZF9ldmVudDphZGRfZXZlbnQsXG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/event.js\n");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var event = __webpack_require__(/*! ./event */ \"./js/event.js\");\n\ninit();\nfunction init(){\n    event.add_event();\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2luZGV4LmpzP2VlMWMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpO1xuXG5pbml0KCk7XG5mdW5jdGlvbiBpbml0KCl7XG4gICAgZXZlbnQuYWRkX2V2ZW50KCk7XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/index.js\n");

/***/ }),

/***/ "./js/localstore.js":
/*!**************************!*\
  !*** ./js/localstore.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 设关键字变量\nvar history_list_store\n\n// 获取关键字列表\nfunction get_history_list_store(){\n    return history_list_store\n}\n\n// 更改关键字列表\nfunction set_history_list_store(val){\n    // 可以对数据进行逻辑判断\n\n    return history_list_store = val;\n}\n\n// 增加历史记录\nfunction append_history(){\n    // 先不管是否存在，删除后在存入；\n    find_and_delete(history_list_store,kwd);\n    // 更新炒瓢，插入到前面\n    history_list_store.unshift(kwd);\n    // 重新更新到“冰箱中”\n    over_write_history(history_list_store);\n}\n\n// 判断关键字是否已存在，返回布尔值\nfunction find_and_delete(arr,ele){\n    var shit_index = arr.indexOf(ele);\n\n    if(shit_index == -1)\n        return false;\n    \n    arr.splice(shit_index,1);\n    return true;\n\n}\n\n// 重写历史记录 \nfunction over_write_history(data){\n    set_store(history_list_store,data)\n}\n\n// 插入localstore数据\nfunction set_store(key,val){\n    var json = JSON.stringify(val);\n    localStorage.setItem(key,json);\n}\n\n// 获取localstore数据\nfunction get_store(key){\n    var data = localStorage.getItem(key);\n    data = JSON.parse(data);\n    return data;\n}\n\nmodule.exports = {\n    set_store:set_store,\n    get_store:get_store,\n    set_history_list_store:set_history_list_store,\n    get_history_list_store:get_history_list_store,\n    append_history:append_history,\n    find_and_delete:find_and_delete,\n    over_write_history:over_write_history,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9sb2NhbHN0b3JlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvbG9jYWxzdG9yZS5qcz9iMWZhIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIOiuvuWFs+mUruWtl+WPmOmHj1xudmFyIGhpc3RvcnlfbGlzdF9zdG9yZVxuXG4vLyDojrflj5blhbPplK7lrZfliJfooahcbmZ1bmN0aW9uIGdldF9oaXN0b3J5X2xpc3Rfc3RvcmUoKXtcbiAgICByZXR1cm4gaGlzdG9yeV9saXN0X3N0b3JlXG59XG5cbi8vIOabtOaUueWFs+mUruWtl+WIl+ihqFxuZnVuY3Rpb24gc2V0X2hpc3RvcnlfbGlzdF9zdG9yZSh2YWwpe1xuICAgIC8vIOWPr+S7peWvueaVsOaNrui/m+ihjOmAu+i+keWIpOaWrVxuXG4gICAgcmV0dXJuIGhpc3RvcnlfbGlzdF9zdG9yZSA9IHZhbDtcbn1cblxuLy8g5aKe5Yqg5Y6G5Y+y6K6w5b2VXG5mdW5jdGlvbiBhcHBlbmRfaGlzdG9yeSgpe1xuICAgIC8vIOWFiOS4jeeuoeaYr+WQpuWtmOWcqO+8jOWIoOmZpOWQjuWcqOWtmOWFpe+8m1xuICAgIGZpbmRfYW5kX2RlbGV0ZShoaXN0b3J5X2xpc3Rfc3RvcmUsa3dkKTtcbiAgICAvLyDmm7TmlrDngpLnk6LvvIzmj5LlhaXliLDliY3pnaJcbiAgICBoaXN0b3J5X2xpc3Rfc3RvcmUudW5zaGlmdChrd2QpO1xuICAgIC8vIOmHjeaWsOabtOaWsOWIsOKAnOWGsOeuseS4reKAnVxuICAgIG92ZXJfd3JpdGVfaGlzdG9yeShoaXN0b3J5X2xpc3Rfc3RvcmUpO1xufVxuXG4vLyDliKTmlq3lhbPplK7lrZfmmK/lkKblt7LlrZjlnKjvvIzov5Tlm57luIPlsJTlgLxcbmZ1bmN0aW9uIGZpbmRfYW5kX2RlbGV0ZShhcnIsZWxlKXtcbiAgICB2YXIgc2hpdF9pbmRleCA9IGFyci5pbmRleE9mKGVsZSk7XG5cbiAgICBpZihzaGl0X2luZGV4ID09IC0xKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgXG4gICAgYXJyLnNwbGljZShzaGl0X2luZGV4LDEpO1xuICAgIHJldHVybiB0cnVlO1xuXG59XG5cbi8vIOmHjeWGmeWOhuWPsuiusOW9lSBcbmZ1bmN0aW9uIG92ZXJfd3JpdGVfaGlzdG9yeShkYXRhKXtcbiAgICBzZXRfc3RvcmUoaGlzdG9yeV9saXN0X3N0b3JlLGRhdGEpXG59XG5cbi8vIOaPkuWFpWxvY2Fsc3RvcmXmlbDmja5cbmZ1bmN0aW9uIHNldF9zdG9yZShrZXksdmFsKXtcbiAgICB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LGpzb24pO1xufVxuXG4vLyDojrflj5Zsb2NhbHN0b3Jl5pWw5o2uXG5mdW5jdGlvbiBnZXRfc3RvcmUoa2V5KXtcbiAgICB2YXIgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNldF9zdG9yZTpzZXRfc3RvcmUsXG4gICAgZ2V0X3N0b3JlOmdldF9zdG9yZSxcbiAgICBzZXRfaGlzdG9yeV9saXN0X3N0b3JlOnNldF9oaXN0b3J5X2xpc3Rfc3RvcmUsXG4gICAgZ2V0X2hpc3RvcnlfbGlzdF9zdG9yZTpnZXRfaGlzdG9yeV9saXN0X3N0b3JlLFxuICAgIGFwcGVuZF9oaXN0b3J5OmFwcGVuZF9oaXN0b3J5LFxuICAgIGZpbmRfYW5kX2RlbGV0ZTpmaW5kX2FuZF9kZWxldGUsXG4gICAgb3Zlcl93cml0ZV9oaXN0b3J5Om92ZXJfd3JpdGVfaGlzdG9yeSxcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/localstore.js\n");

/***/ }),

/***/ "./js/pub_param.js":
/*!*************************!*\
  !*** ./js/pub_param.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var keyword = 'yo'\n    ,history_list\n    , localstore = __webpack_require__(/*! ./localstore */ \"./js/localstore.js\")\n\nfunction get_history_list(){\n    return history_list;\n}\nfunction set_history_list(data){\n    return history_list = data;\n}\n\nfunction reload_history_list(){\n    history_list = localstore.get_history_list_store() || [];\n}\n\nfunction get_keyword() {\n    return keyword;\n}\n\nfunction set_keyword(kwd){\n    return keyword = kwd;\n}\n\nmodule.exports = {\n    get_keyword:get_keyword,\n    set_keyword:set_keyword,\n    get_history_list:get_history_list,\n    set_history_list:set_history_list,\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9wdWJfcGFyYW0uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9wdWJfcGFyYW0uanM/ZWY3OSJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIga2V5d29yZCA9ICd5bydcbiAgICAsaGlzdG9yeV9saXN0XG4gICAgLCBsb2NhbHN0b3JlID0gcmVxdWlyZSgnLi9sb2NhbHN0b3JlJylcblxuZnVuY3Rpb24gZ2V0X2hpc3RvcnlfbGlzdCgpe1xuICAgIHJldHVybiBoaXN0b3J5X2xpc3Q7XG59XG5mdW5jdGlvbiBzZXRfaGlzdG9yeV9saXN0KGRhdGEpe1xuICAgIHJldHVybiBoaXN0b3J5X2xpc3QgPSBkYXRhO1xufVxuXG5mdW5jdGlvbiByZWxvYWRfaGlzdG9yeV9saXN0KCl7XG4gICAgaGlzdG9yeV9saXN0ID0gbG9jYWxzdG9yZS5nZXRfaGlzdG9yeV9saXN0X3N0b3JlKCkgfHwgW107XG59XG5cbmZ1bmN0aW9uIGdldF9rZXl3b3JkKCkge1xuICAgIHJldHVybiBrZXl3b3JkO1xufVxuXG5mdW5jdGlvbiBzZXRfa2V5d29yZChrd2Qpe1xuICAgIHJldHVybiBrZXl3b3JkID0ga3dkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRfa2V5d29yZDpnZXRfa2V5d29yZCxcbiAgICBzZXRfa2V5d29yZDpzZXRfa2V5d29yZCxcbiAgICBnZXRfaGlzdG9yeV9saXN0OmdldF9oaXN0b3J5X2xpc3QsXG4gICAgc2V0X2hpc3RvcnlfbGlzdDpzZXRfaGlzdG9yeV9saXN0LFxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/pub_param.js\n");

/***/ }),

/***/ "./js/search.js":
/*!**********************!*\
  !*** ./js/search.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var kwd = __webpack_require__(/*! ./pub_param */ \"./js/pub_param.js\");\n\nfunction user(keyword,on_succeed,config) {\n    var def = {\n        page : 1,\n        limit : 2,\n        keyword : kwd.get_keyword(),\n    };\n\n    config = Object.assign({},def,config);\n    console.log('发射出去的page=' + config.page+  '  limit='+config.limit)\n    var http = new XMLHttpRequest();\n    http.open('get', 'https://api.github.com/search/users?q=' + keyword + '&page=' + config.page + '&per_page=' + config.limit);\n    http.send();\n\n    http.addEventListener('load', function (data) {\n        var data = JSON.parse(this.responseText);\n        on_succeed(data);\n    });\n}\n\nmodule.exports = {\n    user:user,\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zZWFyY2guanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2guanM/ODAxYiJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIga3dkID0gcmVxdWlyZSgnLi9wdWJfcGFyYW0nKTtcblxuZnVuY3Rpb24gdXNlcihrZXl3b3JkLG9uX3N1Y2NlZWQsY29uZmlnKSB7XG4gICAgdmFyIGRlZiA9IHtcbiAgICAgICAgcGFnZSA6IDEsXG4gICAgICAgIGxpbWl0IDogMixcbiAgICAgICAga2V5d29yZCA6IGt3ZC5nZXRfa2V5d29yZCgpLFxuICAgIH07XG5cbiAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LGRlZixjb25maWcpO1xuICAgIGNvbnNvbGUubG9nKCflj5HlsITlh7rljrvnmoRwYWdlPScgKyBjb25maWcucGFnZSsgICcgIGxpbWl0PScrY29uZmlnLmxpbWl0KVxuICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgaHR0cC5vcGVuKCdnZXQnLCAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9zZWFyY2gvdXNlcnM/cT0nICsga2V5d29yZCArICcmcGFnZT0nICsgY29uZmlnLnBhZ2UgKyAnJnBlcl9wYWdlPScgKyBjb25maWcubGltaXQpO1xuICAgIGh0dHAuc2VuZCgpO1xuXG4gICAgaHR0cC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgb25fc3VjY2VlZChkYXRhKTtcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdXNlcjp1c2VyLFxufVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/search.js\n");

/***/ })

/******/ });