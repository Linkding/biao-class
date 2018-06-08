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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Api/article.js":
/*!****************************!*\
  !*** ./src/Api/article.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Util_send__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/send */ \"./src/Util/send.js\");\n\n\nlet instance;\n\n\nclass Article {\n    read(page){\n        _Util_send__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get('/api/article/read',data =>{\n            console.log(data)\n        })\n    }\n}\n\nfunction init(){\n    if(!instance)\n        instance   = new Article();\n\n}\n\ninit();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (instance);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQXBpL2FydGljbGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBpL2FydGljbGUuanM/MGU0OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VuZCBmcm9tICcuLi9VdGlsL3NlbmQnXG5cbmxldCBpbnN0YW5jZTtcblxuXG5jbGFzcyBBcnRpY2xlIHtcbiAgICByZWFkKHBhZ2Upe1xuICAgICAgICBzZW5kLmdldCgnL2FwaS9hcnRpY2xlL3JlYWQnLGRhdGEgPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpe1xuICAgIGlmKCFpbnN0YW5jZSlcbiAgICAgICAgaW5zdGFuY2UgICA9IG5ldyBBcnRpY2xlKCk7XG5cbn1cblxuaW5pdCgpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Api/article.js\n");

/***/ }),

/***/ "./src/Route/route.js":
/*!****************************!*\
  !*** ./src/Route/route.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"../Util/heler\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\nlet instance;\n\nclass Route{\n    constructor (config){\n        this.param = {};\n\n        this.load_config(config);\n        this.detect_click();\n    }\n    //加载所有配置\n    load_config(config){\n\n    }\n    //监听hash事件\n    detect_hash_change(){\n        window.addEventListener('hashchange',()=>{\n            // 如果url路由发生改变就去对应页面\n            this.go(window.location.hash);\n        });\n    }\n    //监听点击事件\n    detect_click(){\n        document.addEventListener('click',e =>{\n            var target = e.target;\n\n            switch (target.nodeName){\n                //如果是<a>元素\n                case 'A':\n                    //如果存在外链\n                    if (target.host)\n                        return;\n                    this.go(target.hash);\n                    break;\n            }\n        });\n    }\n    // 更改路由\n    // * @param {string} hash 原始hash路径，如：#/about\n    // * @param {object} opt 配置项，如：{force:false}\n    go(hash,opt = null){\n\n        this.hide('#not-found');\n\n        // 钩子\n        // 如果存在外部函数（hook）,执行\n        if(this.config.hook.before)\n            //将hook函数执行，并对执行结果进行判断\n            if(!this.config.hook.before()) \n                return;\n\n        hash = hash || 'home';\n\n        //通过原始hash解析真正的页面名称 #/home => home\n        \n        let old_state = this.current;//当前hash状态\n\n        let new_state = this.parse_hash(hash); //需要跳转到的页面状态\n\n        this.previous = old_state;\n\n        if(!new_state){\n            \n        }\n    }\n\n    // 从数据仓库中获取到对应的hash对应的渲染数据\n    parse_hash(hash){\n        hash = !(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"../Util/heler\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).trim(hash,'#/'); \n        let hash_arr = hash.split('/'); \n        let routes = this.config.routes; //{}\n\n        for (var name in routes){ // name => home,about,article,article_list\n            let route = routes[name];\n            let $segment =route.$segment;\n            let matched = true;\n        }\n        \n        \n\n    }\n\n    hide(el){\n        var el = document.querySelector(el);\n        if(!el);\n            return;\n        el.hidden = true;\n    }\n}\n\nfunction init(config){\n    if(!instance)\n        instance = new Route(config);\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({init});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUm91dGUvcm91dGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUm91dGUvcm91dGUuanM/MGVhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGVscGVyIGZyb20gJy4uL1V0aWwvaGVsZXInXG5cbmxldCBpbnN0YW5jZTtcblxuY2xhc3MgUm91dGV7XG4gICAgY29uc3RydWN0b3IgKGNvbmZpZyl7XG4gICAgICAgIHRoaXMucGFyYW0gPSB7fTtcblxuICAgICAgICB0aGlzLmxvYWRfY29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuZGV0ZWN0X2NsaWNrKCk7XG4gICAgfVxuICAgIC8v5Yqg6L295omA5pyJ6YWN572uXG4gICAgbG9hZF9jb25maWcoY29uZmlnKXtcblxuICAgIH1cbiAgICAvL+ebkeWQrGhhc2jkuovku7ZcbiAgICBkZXRlY3RfaGFzaF9jaGFuZ2UoKXtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCgpPT57XG4gICAgICAgICAgICAvLyDlpoLmnpx1cmzot6/nlLHlj5HnlJ/mlLnlj5jlsLHljrvlr7nlupTpobXpnaJcbiAgICAgICAgICAgIHRoaXMuZ28od2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy/nm5HlkKzngrnlh7vkuovku7ZcbiAgICBkZXRlY3RfY2xpY2soKXtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGUgPT57XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodGFyZ2V0Lm5vZGVOYW1lKXtcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYrzxhPuWFg+e0oFxuICAgICAgICAgICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOWtmOWcqOWklumTvlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lmhvc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ28odGFyZ2V0Lmhhc2gpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIOabtOaUuei3r+eUsVxuICAgIC8vICogQHBhcmFtIHtzdHJpbmd9IGhhc2gg5Y6f5aeLaGFzaOi3r+W+hO+8jOWmgu+8miMvYWJvdXRcbiAgICAvLyAqIEBwYXJhbSB7b2JqZWN0fSBvcHQg6YWN572u6aG577yM5aaC77yae2ZvcmNlOmZhbHNlfVxuICAgIGdvKGhhc2gsb3B0ID0gbnVsbCl7XG5cbiAgICAgICAgdGhpcy5oaWRlKCcjbm90LWZvdW5kJyk7XG5cbiAgICAgICAgLy8g6ZKp5a2QXG4gICAgICAgIC8vIOWmguaenOWtmOWcqOWklumDqOWHveaVsO+8iGhvb2vvvIks5omn6KGMXG4gICAgICAgIGlmKHRoaXMuY29uZmlnLmhvb2suYmVmb3JlKVxuICAgICAgICAgICAgLy/lsIZob29r5Ye95pWw5omn6KGM77yM5bm25a+55omn6KGM57uT5p6c6L+b6KGM5Yik5patXG4gICAgICAgICAgICBpZighdGhpcy5jb25maWcuaG9vay5iZWZvcmUoKSkgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGhhc2ggPSBoYXNoIHx8ICdob21lJztcblxuICAgICAgICAvL+mAmui/h+WOn+Wni2hhc2jop6PmnpDnnJ/mraPnmoTpobXpnaLlkI3np7AgIy9ob21lID0+IGhvbWVcbiAgICAgICAgXG4gICAgICAgIGxldCBvbGRfc3RhdGUgPSB0aGlzLmN1cnJlbnQ7Ly/lvZPliY1oYXNo54q25oCBXG5cbiAgICAgICAgbGV0IG5ld19zdGF0ZSA9IHRoaXMucGFyc2VfaGFzaChoYXNoKTsgLy/pnIDopoHot7PovazliLDnmoTpobXpnaLnirbmgIFcblxuICAgICAgICB0aGlzLnByZXZpb3VzID0gb2xkX3N0YXRlO1xuXG4gICAgICAgIGlmKCFuZXdfc3RhdGUpe1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDku47mlbDmja7ku5PlupPkuK3ojrflj5bliLDlr7nlupTnmoRoYXNo5a+55bqU55qE5riy5p+T5pWw5o2uXG4gICAgcGFyc2VfaGFzaChoYXNoKXtcbiAgICAgICAgaGFzaCA9IGhlbHBlci50cmltKGhhc2gsJyMvJyk7IFxuICAgICAgICBsZXQgaGFzaF9hcnIgPSBoYXNoLnNwbGl0KCcvJyk7IFxuICAgICAgICBsZXQgcm91dGVzID0gdGhpcy5jb25maWcucm91dGVzOyAvL3t9XG5cbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiByb3V0ZXMpeyAvLyBuYW1lID0+IGhvbWUsYWJvdXQsYXJ0aWNsZSxhcnRpY2xlX2xpc3RcbiAgICAgICAgICAgIGxldCByb3V0ZSA9IHJvdXRlc1tuYW1lXTtcbiAgICAgICAgICAgIGxldCAkc2VnbWVudCA9cm91dGUuJHNlZ21lbnQ7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgaGlkZShlbCl7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgICAgICBpZighZWwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBlbC5oaWRkZW4gPSB0cnVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdChjb25maWcpe1xuICAgIGlmKCFpbnN0YW5jZSlcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgUm91dGUoY29uZmlnKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7aW5pdH0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Route/route.js\n");

/***/ }),

/***/ "./src/Ui/article.js":
/*!***************************!*\
  !*** ./src/Ui/article.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet instance;\n\nfunction init(){\n    if(!instance)\n        instance = new Article();\n    return instance;\n}\n\nclass Article {\n    constructor (data){\n        this.el = document.querySelector('#article  .list');\n    }\n\n    render(data){\n        this.el.innerHTML = '';\n        data.forEach((row,index) => {\n            let el_article = document.createElement('div');\n            el_article.innerHTML = `\n            <h3>${row.title}</h3>\n            <div>${row.content}</div>\n            `;\n            this.el.appendChild(el_article);\n        });\n    }\n}\n\ninit();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (instance);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVWkvYXJ0aWNsZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9VaS9hcnRpY2xlLmpzP2U0MzgiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGluc3RhbmNlO1xuXG5mdW5jdGlvbiBpbml0KCl7XG4gICAgaWYoIWluc3RhbmNlKVxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBBcnRpY2xlKCk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5jbGFzcyBBcnRpY2xlIHtcbiAgICBjb25zdHJ1Y3RvciAoZGF0YSl7XG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXJ0aWNsZSAgLmxpc3QnKTtcbiAgICB9XG5cbiAgICByZW5kZXIoZGF0YSl7XG4gICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGRhdGEuZm9yRWFjaCgocm93LGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxfYXJ0aWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZWxfYXJ0aWNsZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8aDM+JHtyb3cudGl0bGV9PC9oMz5cbiAgICAgICAgICAgIDxkaXY+JHtyb3cuY29udGVudH08L2Rpdj5cbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGVsX2FydGljbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmluaXQoKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Ui/article.js\n");

/***/ }),

/***/ "./src/Util/send.js":
/*!**************************!*\
  !*** ./src/Util/send.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst ok   = true;\nconst data = {\n  list : {\n    article : [\n      {\n        'id'      : 1,\n        'title'   : '叫我王花花',\n        'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\\n',\n      },\n      {\n        'id'      : 2,\n        'title'   : '叫我李拴蛋',\n        'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\\n',\n      },\n      {\n        'id'      : 3,\n        'title'   : '叫我刘备备',\n        'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse odio sed vitae! Architecto odio placeat quasi. Accusamus asperiores aspernatur delectus dolorum, ea enim ex expedita facere fugiat, molestias perferendis?\\n',\n      },\n    ],\n    tag     : [\n      {\n        'id'   : 1,\n        'name' : 'HTML',\n      },\n      {\n        'id'   : 2,\n        'name' : '生活',\n      },\n      {\n        'id'   : 3,\n        'name' : 'CSS',\n      },\n    ],\n  },\n}\n\nconst output = {\n    get,\n    post,\n}\n\nfunction get(url,succeed,error){\n    var model  = url.split('/')[2];\n\n    if(ok)\n        if(succeed)\n            succeed(data.list[model]);\n        else {\n            if(error)\n                error({\n                    ok: false,\n                    message: 'invaild page'\n                })\n        }\n}\n\nfunction post(){\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (output);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVXRpbC9zZW5kLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWwvc2VuZC5qcz9jNGU5Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG9rICAgPSB0cnVlO1xuY29uc3QgZGF0YSA9IHtcbiAgbGlzdCA6IHtcbiAgICBhcnRpY2xlIDogW1xuICAgICAge1xuICAgICAgICAnaWQnICAgICAgOiAxLFxuICAgICAgICAndGl0bGUnICAgOiAn5Y+r5oiR546L6Iqx6IqxJyxcbiAgICAgICAgJ2NvbnRlbnQnIDogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBc3BlcmlvcmVzIGVzc2Ugb2RpbyBzZWQgdml0YWUhIEFyY2hpdGVjdG8gb2RpbyBwbGFjZWF0IHF1YXNpLiBBY2N1c2FtdXMgYXNwZXJpb3JlcyBhc3Blcm5hdHVyIGRlbGVjdHVzIGRvbG9ydW0sIGVhIGVuaW0gZXggZXhwZWRpdGEgZmFjZXJlIGZ1Z2lhdCwgbW9sZXN0aWFzIHBlcmZlcmVuZGlzP1xcbkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBc3BlcmlvcmVzIGVzc2Ugb2RpbyBzZWQgdml0YWUhIEFyY2hpdGVjdG8gb2RpbyBwbGFjZWF0IHF1YXNpLiBBY2N1c2FtdXMgYXNwZXJpb3JlcyBhc3Blcm5hdHVyIGRlbGVjdHVzIGRvbG9ydW0sIGVhIGVuaW0gZXggZXhwZWRpdGEgZmFjZXJlIGZ1Z2lhdCwgbW9sZXN0aWFzIHBlcmZlcmVuZGlzP1xcbkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBc3BlcmlvcmVzIGVzc2Ugb2RpbyBzZWQgdml0YWUhIEFyY2hpdGVjdG8gb2RpbyBwbGFjZWF0IHF1YXNpLiBBY2N1c2FtdXMgYXNwZXJpb3JlcyBhc3Blcm5hdHVyIGRlbGVjdHVzIGRvbG9ydW0sIGVhIGVuaW0gZXggZXhwZWRpdGEgZmFjZXJlIGZ1Z2lhdCwgbW9sZXN0aWFzIHBlcmZlcmVuZGlzP1xcbicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnaWQnICAgICAgOiAyLFxuICAgICAgICAndGl0bGUnICAgOiAn5Y+r5oiR5p2O5ou06JuLJyxcbiAgICAgICAgJ2NvbnRlbnQnIDogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBc3BlcmlvcmVzIGVzc2Ugb2RpbyBzZWQgdml0YWUhIEFyY2hpdGVjdG8gb2RpbyBwbGFjZWF0IHF1YXNpLiBBY2N1c2FtdXMgYXNwZXJpb3JlcyBhc3Blcm5hdHVyIGRlbGVjdHVzIGRvbG9ydW0sIGVhIGVuaW0gZXggZXhwZWRpdGEgZmFjZXJlIGZ1Z2lhdCwgbW9sZXN0aWFzIHBlcmZlcmVuZGlzP1xcbkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBc3BlcmlvcmVzIGVzc2Ugb2RpbyBzZWQgdml0YWUhIEFyY2hpdGVjdG8gb2RpbyBwbGFjZWF0IHF1YXNpLiBBY2N1c2FtdXMgYXNwZXJpb3JlcyBhc3Blcm5hdHVyIGRlbGVjdHVzIGRvbG9ydW0sIGVhIGVuaW0gZXggZXhwZWRpdGEgZmFjZXJlIGZ1Z2lhdCwgbW9sZXN0aWFzIHBlcmZlcmVuZGlzP1xcbkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBc3BlcmlvcmVzIGVzc2Ugb2RpbyBzZWQgdml0YWUhIEFyY2hpdGVjdG8gb2RpbyBwbGFjZWF0IHF1YXNpLiBBY2N1c2FtdXMgYXNwZXJpb3JlcyBhc3Blcm5hdHVyIGRlbGVjdHVzIGRvbG9ydW0sIGVhIGVuaW0gZXggZXhwZWRpdGEgZmFjZXJlIGZ1Z2lhdCwgbW9sZXN0aWFzIHBlcmZlcmVuZGlzP1xcbicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnaWQnICAgICAgOiAzLFxuICAgICAgICAndGl0bGUnICAgOiAn5Y+r5oiR5YiY5aSH5aSHJyxcbiAgICAgICAgJ2NvbnRlbnQnIDogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBc3BlcmlvcmVzIGVzc2Ugb2RpbyBzZWQgdml0YWUhIEFyY2hpdGVjdG8gb2RpbyBwbGFjZWF0IHF1YXNpLiBBY2N1c2FtdXMgYXNwZXJpb3JlcyBhc3Blcm5hdHVyIGRlbGVjdHVzIGRvbG9ydW0sIGVhIGVuaW0gZXggZXhwZWRpdGEgZmFjZXJlIGZ1Z2lhdCwgbW9sZXN0aWFzIHBlcmZlcmVuZGlzP1xcbkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBc3BlcmlvcmVzIGVzc2Ugb2RpbyBzZWQgdml0YWUhIEFyY2hpdGVjdG8gb2RpbyBwbGFjZWF0IHF1YXNpLiBBY2N1c2FtdXMgYXNwZXJpb3JlcyBhc3Blcm5hdHVyIGRlbGVjdHVzIGRvbG9ydW0sIGVhIGVuaW0gZXggZXhwZWRpdGEgZmFjZXJlIGZ1Z2lhdCwgbW9sZXN0aWFzIHBlcmZlcmVuZGlzP1xcbkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBBc3BlcmlvcmVzIGVzc2Ugb2RpbyBzZWQgdml0YWUhIEFyY2hpdGVjdG8gb2RpbyBwbGFjZWF0IHF1YXNpLiBBY2N1c2FtdXMgYXNwZXJpb3JlcyBhc3Blcm5hdHVyIGRlbGVjdHVzIGRvbG9ydW0sIGVhIGVuaW0gZXggZXhwZWRpdGEgZmFjZXJlIGZ1Z2lhdCwgbW9sZXN0aWFzIHBlcmZlcmVuZGlzP1xcbicsXG4gICAgICB9LFxuICAgIF0sXG4gICAgdGFnICAgICA6IFtcbiAgICAgIHtcbiAgICAgICAgJ2lkJyAgIDogMSxcbiAgICAgICAgJ25hbWUnIDogJ0hUTUwnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2lkJyAgIDogMixcbiAgICAgICAgJ25hbWUnIDogJ+eUn+a0uycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnaWQnICAgOiAzLFxuICAgICAgICAnbmFtZScgOiAnQ1NTJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn1cblxuY29uc3Qgb3V0cHV0ID0ge1xuICAgIGdldCxcbiAgICBwb3N0LFxufVxuXG5mdW5jdGlvbiBnZXQodXJsLHN1Y2NlZWQsZXJyb3Ipe1xuICAgIHZhciBtb2RlbCAgPSB1cmwuc3BsaXQoJy8nKVsyXTtcblxuICAgIGlmKG9rKVxuICAgICAgICBpZihzdWNjZWVkKVxuICAgICAgICAgICAgc3VjY2VlZChkYXRhLmxpc3RbbW9kZWxdKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZihlcnJvcilcbiAgICAgICAgICAgICAgICBlcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2ludmFpbGQgcGFnZSdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG59XG5cbmZ1bmN0aW9uIHBvc3QoKXtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBvdXRwdXQ7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Util/send.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Api_article__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Api/article */ \"./src/Api/article.js\");\n/* harmony import */ var _Ui_article__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ui/article */ \"./src/Ui/article.js\");\n/* harmony import */ var _Route_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route/route */ \"./src/Route/route.js\");\n\n\n\n\nlet route_config = {\n    routes: {\n        home: {\n            path: '/home',\n            el: '#home',\n            template_url: '',\n\n        },\n        about: {\n            path: '/about',\n            el: '#about',\n            template_url: '',\n\n        },\n        article: {\n            path: '/article',\n            el: '#article',\n            template_url: '',\n\n        },\n        article_list: {\n            path: '/article_list',\n            el: '#article_list',\n            template_url: '',\n\n        },\n    },\n    hook: {\n        before: function(){\n            return true;\n        }\n    }\n\n}\n\n_Route_route__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init(route_config);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXJ0aWNsZV9hcGkgZnJvbSAnLi9BcGkvYXJ0aWNsZSc7XG5pbXBvcnQgYXJ0aWNsZV91aSBmcm9tICcuL1VpL2FydGljbGUnO1xuaW1wb3J0IHJvdXRlIGZyb20gJy4vUm91dGUvcm91dGUnO1xuXG5sZXQgcm91dGVfY29uZmlnID0ge1xuICAgIHJvdXRlczoge1xuICAgICAgICBob21lOiB7XG4gICAgICAgICAgICBwYXRoOiAnL2hvbWUnLFxuICAgICAgICAgICAgZWw6ICcjaG9tZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZV91cmw6ICcnLFxuXG4gICAgICAgIH0sXG4gICAgICAgIGFib3V0OiB7XG4gICAgICAgICAgICBwYXRoOiAnL2Fib3V0JyxcbiAgICAgICAgICAgIGVsOiAnI2Fib3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlX3VybDogJycsXG5cbiAgICAgICAgfSxcbiAgICAgICAgYXJ0aWNsZToge1xuICAgICAgICAgICAgcGF0aDogJy9hcnRpY2xlJyxcbiAgICAgICAgICAgIGVsOiAnI2FydGljbGUnLFxuICAgICAgICAgICAgdGVtcGxhdGVfdXJsOiAnJyxcblxuICAgICAgICB9LFxuICAgICAgICBhcnRpY2xlX2xpc3Q6IHtcbiAgICAgICAgICAgIHBhdGg6ICcvYXJ0aWNsZV9saXN0JyxcbiAgICAgICAgICAgIGVsOiAnI2FydGljbGVfbGlzdCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZV91cmw6ICcnLFxuXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBob29rOiB7XG4gICAgICAgIGJlZm9yZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbnJvdXRlLmluaXQocm91dGVfY29uZmlnKTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });