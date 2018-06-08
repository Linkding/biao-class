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
/******/ 	return __webpack_require__(__webpack_require__.s = "./route.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./route.js":
/*!******************!*\
  !*** ./route.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _templater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templater */ \"./templater.js\");\n/* harmony import */ var _templater__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_templater__WEBPACK_IMPORTED_MODULE_0__);\n\n\n// 监听事件-->获取到hash--->渲染新之前保存目前的页面为历史记录-->\nclass route {\n    constructor(config) {\n        this.current = {};\n        this.state = Object.assign({}, config)\n        this.init_page();\n        this.detect_hash_change();\n    }\n    init_page() {\n        let route_name = location.hash;\n        if (!route_name)\n            route_name = this.state.default;\n        console.log(this.state.default)\n        this.go(route_name)\n    }\n    // 监听hashchange事件\n    detect_hash_change() {\n        window.addEventListener('hashchange', () => {\n            // console.log('hashchange')\n            this.current.hash = location.hash;\n            // console.log(this.current)\n            let route_name = this.parse_current_hash();\n            this.go(route_name);\n        })\n    }\n    // 切换路由\n    go(route_name) {\n        let route = this.state.route[route_name];\n        //保存为历史hash记录；\n        this.previous = this.current;\n        console.log(this.previous)\n        //保存当前路由,渲染时候需要调用\n        this.current = route;\n        console.log(this.current)\n\n        // 删除旧页面；\n        this.remove_previous_tpl();\n\n        //渲染新路由\n        this.render_current();\n\n    }\n    //删除前一页\n    remove_previous_tpl() {\n        //拿到前一页的模板床；\n        let el = document.querySelector(this.previous.el);\n        if (!el)\n            return;\n        //清空模板床\n        el.innerHTML = '';\n        console.log('删除旧页面')\n\n    }\n    //渲染最新当前页\n    render_current() {\n        console.log('渲染当前页')\n        this.render(this.current)\n    }\n    //渲染工厂函数\n    render(route) {\n        let el = document.querySelector(route.el)\n            , cache = route.$template\n            ;\n        console.log(cache)\n        if (cache) {\n            el.innerHTML = cache;\n            return\n        }\n\n        // 因为路由对象中配置了模板地址，所以可以根据地址取到真实的模板代码（HTML代码）\n        this.get_template(route.template, (tpl) => {\n            route.$template  = tpl;\n            this.compile(route);\n        });\n    }\n\n    compile(template_url,data){\n        let el = document.querySelector(route.el)\n        el.innerHTML = _templater__WEBPACK_IMPORTED_MODULE_0___default()(route.$template,route.data);       \n    }\n    //通过url获取模板（html）元素\n    get_template(url, on_succeed) {\n        console.log(url)\n        const http = new XMLHttpRequest();\n        http.open('get', url);\n        http.send();\n\n        http.addEventListener('load', function () {\n            on_succeed(http.responseText);  //从模板中获取到的html内容，返回responseText中，插入到对应的html模板位置；\n        })\n    }\n\n    parse_current_hash() {\n        return this.parse_hash(this.current.hash);\n    }\n\n    parse_hash(hash) {\n        hash = trim(hash, '#/');\n        let re = new RegExp('^#?\\/?' + hash + '\\/?$'); //定义好一个 判断的标准格式\n\n        for (let key in this.state.route) {  // key,route的键名\n            let item = this.state.route[key]; // 其中一个对象，例如：home{}；\n            if (re.test(item.path))\n                return key;\n        }\n    }\n\n}\n\nfunction trim(str, cap_base) {\n    let arr = cap_base.split(''); // ['#','/']\n    arr.forEach(function (item) {\n        if (str.startsWith(item)) {\n            str = str.substring(1);\n            str = trim(str, item);\n        }\n\n        if (str.endsWith(item)) {\n            str = str.substring(0, str.length - 1);\n            str = trim(str, item)\n\n        }\n    });\n    return str;\n}\n\nlet o = {\n    default: 'home',\n    route: {\n        home: {\n            path: '#/home',\n            el: \"#home\",\n            template: './tpl/home.html',\n            data: {\n                longin: {\n                    username: 'whh',\n                    password: '',\n                }\n            }\n        },\n        about: {\n            path: '#/about',\n            el: \"#about\",\n            template: './tpl/about.html',\n        }\n    }\n}\nnew route(o);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yb3V0ZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3JvdXRlLmpzP2RlZTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhcnNlIGZyb20gXCIuL3RlbXBsYXRlclwiO1xuXG4vLyDnm5HlkKzkuovku7YtLT7ojrflj5bliLBoYXNoLS0tPua4suafk+aWsOS5i+WJjeS/neWtmOebruWJjeeahOmhtemdouS4uuWOhuWPsuiusOW9lS0tPlxuY2xhc3Mgcm91dGUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB7fTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZylcbiAgICAgICAgdGhpcy5pbml0X3BhZ2UoKTtcbiAgICAgICAgdGhpcy5kZXRlY3RfaGFzaF9jaGFuZ2UoKTtcbiAgICB9XG4gICAgaW5pdF9wYWdlKCkge1xuICAgICAgICBsZXQgcm91dGVfbmFtZSA9IGxvY2F0aW9uLmhhc2g7XG4gICAgICAgIGlmICghcm91dGVfbmFtZSlcbiAgICAgICAgICAgIHJvdXRlX25hbWUgPSB0aGlzLnN0YXRlLmRlZmF1bHQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUuZGVmYXVsdClcbiAgICAgICAgdGhpcy5nbyhyb3V0ZV9uYW1lKVxuICAgIH1cbiAgICAvLyDnm5HlkKxoYXNoY2hhbmdl5LqL5Lu2XG4gICAgZGV0ZWN0X2hhc2hfY2hhbmdlKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoYXNoY2hhbmdlJylcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5oYXNoID0gbG9jYXRpb24uaGFzaDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudClcbiAgICAgICAgICAgIGxldCByb3V0ZV9uYW1lID0gdGhpcy5wYXJzZV9jdXJyZW50X2hhc2goKTtcbiAgICAgICAgICAgIHRoaXMuZ28ocm91dGVfbmFtZSk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vIOWIh+aNoui3r+eUsVxuICAgIGdvKHJvdXRlX25hbWUpIHtcbiAgICAgICAgbGV0IHJvdXRlID0gdGhpcy5zdGF0ZS5yb3V0ZVtyb3V0ZV9uYW1lXTtcbiAgICAgICAgLy/kv53lrZjkuLrljoblj7JoYXNo6K6w5b2V77ybXG4gICAgICAgIHRoaXMucHJldmlvdXMgPSB0aGlzLmN1cnJlbnQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJldmlvdXMpXG4gICAgICAgIC8v5L+d5a2Y5b2T5YmN6Lev55SxLOa4suafk+aXtuWAmemcgOimgeiwg+eUqFxuICAgICAgICB0aGlzLmN1cnJlbnQgPSByb3V0ZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50KVxuXG4gICAgICAgIC8vIOWIoOmZpOaXp+mhtemdou+8m1xuICAgICAgICB0aGlzLnJlbW92ZV9wcmV2aW91c190cGwoKTtcblxuICAgICAgICAvL+a4suafk+aWsOi3r+eUsVxuICAgICAgICB0aGlzLnJlbmRlcl9jdXJyZW50KCk7XG5cbiAgICB9XG4gICAgLy/liKDpmaTliY3kuIDpobVcbiAgICByZW1vdmVfcHJldmlvdXNfdHBsKCkge1xuICAgICAgICAvL+aLv+WIsOWJjeS4gOmhteeahOaooeadv+W6iu+8m1xuICAgICAgICBsZXQgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucHJldmlvdXMuZWwpO1xuICAgICAgICBpZiAoIWVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvL+a4heepuuaooeadv+W6ilxuICAgICAgICBlbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgY29uc29sZS5sb2coJ+WIoOmZpOaXp+mhtemdoicpXG5cbiAgICB9XG4gICAgLy/muLLmn5PmnIDmlrDlvZPliY3pobVcbiAgICByZW5kZXJfY3VycmVudCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+a4suafk+W9k+WJjemhtScpXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuY3VycmVudClcbiAgICB9XG4gICAgLy/muLLmn5Plt6XljoLlh73mlbBcbiAgICByZW5kZXIocm91dGUpIHtcbiAgICAgICAgbGV0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb3V0ZS5lbClcbiAgICAgICAgICAgICwgY2FjaGUgPSByb3V0ZS4kdGVtcGxhdGVcbiAgICAgICAgICAgIDtcbiAgICAgICAgY29uc29sZS5sb2coY2FjaGUpXG4gICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gY2FjaGU7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWboOS4uui3r+eUseWvueixoeS4remFjee9ruS6huaooeadv+WcsOWdgO+8jOaJgOS7peWPr+S7peagueaNruWcsOWdgOWPluWIsOecn+WunueahOaooeadv+S7o+egge+8iEhUTUzku6PnoIHvvIlcbiAgICAgICAgdGhpcy5nZXRfdGVtcGxhdGUocm91dGUudGVtcGxhdGUsICh0cGwpID0+IHtcbiAgICAgICAgICAgIHJvdXRlLiR0ZW1wbGF0ZSAgPSB0cGw7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGUocm91dGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21waWxlKHRlbXBsYXRlX3VybCxkYXRhKXtcbiAgICAgICAgbGV0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb3V0ZS5lbClcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gcGFyc2Uocm91dGUuJHRlbXBsYXRlLHJvdXRlLmRhdGEpOyAgICAgICBcbiAgICB9XG4gICAgLy/pgJrov4d1cmzojrflj5bmqKHmnb/vvIhodG1s77yJ5YWD57SgXG4gICAgZ2V0X3RlbXBsYXRlKHVybCwgb25fc3VjY2VlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyh1cmwpXG4gICAgICAgIGNvbnN0IGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgaHR0cC5vcGVuKCdnZXQnLCB1cmwpO1xuICAgICAgICBodHRwLnNlbmQoKTtcblxuICAgICAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvbl9zdWNjZWVkKGh0dHAucmVzcG9uc2VUZXh0KTsgIC8v5LuO5qih5p2/5Lit6I635Y+W5Yiw55qEaHRtbOWGheWuue+8jOi/lOWbnnJlc3BvbnNlVGV4dOS4re+8jOaPkuWFpeWIsOWvueW6lOeahGh0bWzmqKHmnb/kvY3nva7vvJtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwYXJzZV9jdXJyZW50X2hhc2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlX2hhc2godGhpcy5jdXJyZW50Lmhhc2gpO1xuICAgIH1cblxuICAgIHBhcnNlX2hhc2goaGFzaCkge1xuICAgICAgICBoYXNoID0gdHJpbShoYXNoLCAnIy8nKTtcbiAgICAgICAgbGV0IHJlID0gbmV3IFJlZ0V4cCgnXiM/XFwvPycgKyBoYXNoICsgJ1xcLz8kJyk7IC8v5a6a5LmJ5aW95LiA5LiqIOWIpOaWreeahOagh+WHhuagvOW8j1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnN0YXRlLnJvdXRlKSB7ICAvLyBrZXkscm91dGXnmoTplK7lkI1cbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zdGF0ZS5yb3V0ZVtrZXldOyAvLyDlhbbkuK3kuIDkuKrlr7nosaHvvIzkvovlpoLvvJpob21le33vvJtcbiAgICAgICAgICAgIGlmIChyZS50ZXN0KGl0ZW0ucGF0aCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5mdW5jdGlvbiB0cmltKHN0ciwgY2FwX2Jhc2UpIHtcbiAgICBsZXQgYXJyID0gY2FwX2Jhc2Uuc3BsaXQoJycpOyAvLyBbJyMnLCcvJ11cbiAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAoc3RyLnN0YXJ0c1dpdGgoaXRlbSkpIHtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICBzdHIgPSB0cmltKHN0ciwgaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RyLmVuZHNXaXRoKGl0ZW0pKSB7XG4gICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIHN0ci5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHN0ciA9IHRyaW0oc3RyLCBpdGVtKVxuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3RyO1xufVxuXG5sZXQgbyA9IHtcbiAgICBkZWZhdWx0OiAnaG9tZScsXG4gICAgcm91dGU6IHtcbiAgICAgICAgaG9tZToge1xuICAgICAgICAgICAgcGF0aDogJyMvaG9tZScsXG4gICAgICAgICAgICBlbDogXCIjaG9tZVwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICcuL3RwbC9ob21lLmh0bWwnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGxvbmdpbjoge1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogJ3doaCcsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFib3V0OiB7XG4gICAgICAgICAgICBwYXRoOiAnIy9hYm91dCcsXG4gICAgICAgICAgICBlbDogXCIjYWJvdXRcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnLi90cGwvYWJvdXQuaHRtbCcsXG4gICAgICAgIH1cbiAgICB9XG59XG5uZXcgcm91dGUobyk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./route.js\n");

/***/ }),

/***/ "./templater.js":
/*!**********************!*\
  !*** ./templater.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function get_obj(data, key) {\n    let result = Object.assign({}, data);\n\n    // 将键通过点分割成数组：'a.b' ==> ['a','b']\n    let layer = key.split('.');\n    \n    // 循环这个数组，每一次就是深入一级\n    // data\n    // |_user_\n    //        |_name:\n    //        |_age:\n    //        |_chile:\n    //          |_name:\n    //          |_age:\n    layer.forEach(function(key){\n        result = result[key];\n    });\n    return result;\n}\n\nfunction parse(tpl, data) {\n    const re = /{{([^{]+)}}/g;\n    let match;\n\n    let result = tpl;\n\n    while (match = re.exec(tpl)) {\n        //获取匹配到的第一部分 , {{user.name}}\n        let variable = match[0];\n        //获取匹配的第二部分(键名)， user.name\n        let key = match[1].trim();\n        //利用键名，从data中获取对应的值\n        let replacement = get_obj(data, key);\n        \n\n        //将获取到的值，对源数据进行替换\n        result = result.replace(variable, replacement)\n    }\n    return result;\n}\n\n\nlet tpl = '我叫{{ user.name }}，我今年{{user.age}}岁了。我娃叫{{user.child.name}}';\n\nlet data = {\n    user:\n        {\n            name: '王花花',\n            age: 18,\n            child: {\n                name: '赵可爽',\n            },\n        },\n};\n\n// let r = parse(tpl,data)\n// console.log('r',r);\n\nwindow.parse = parse;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90ZW1wbGF0ZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZXIuanM/YThiNiJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRfb2JqKGRhdGEsIGtleSkge1xuICAgIGxldCByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcblxuICAgIC8vIOWwhumUrumAmui/h+eCueWIhuWJsuaIkOaVsOe7hO+8midhLmInID09PiBbJ2EnLCdiJ11cbiAgICBsZXQgbGF5ZXIgPSBrZXkuc3BsaXQoJy4nKTtcbiAgICBcbiAgICAvLyDlvqrnjq/ov5nkuKrmlbDnu4TvvIzmr4/kuIDmrKHlsLHmmK/mt7HlhaXkuIDnuqdcbiAgICAvLyBkYXRhXG4gICAgLy8gfF91c2VyX1xuICAgIC8vICAgICAgICB8X25hbWU6XG4gICAgLy8gICAgICAgIHxfYWdlOlxuICAgIC8vICAgICAgICB8X2NoaWxlOlxuICAgIC8vICAgICAgICAgIHxfbmFtZTpcbiAgICAvLyAgICAgICAgICB8X2FnZTpcbiAgICBsYXllci5mb3JFYWNoKGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdFtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKHRwbCwgZGF0YSkge1xuICAgIGNvbnN0IHJlID0gL3t7KFtee10rKX19L2c7XG4gICAgbGV0IG1hdGNoO1xuXG4gICAgbGV0IHJlc3VsdCA9IHRwbDtcblxuICAgIHdoaWxlIChtYXRjaCA9IHJlLmV4ZWModHBsKSkge1xuICAgICAgICAvL+iOt+WPluWMuemFjeWIsOeahOesrOS4gOmDqOWIhiAsIHt7dXNlci5uYW1lfX1cbiAgICAgICAgbGV0IHZhcmlhYmxlID0gbWF0Y2hbMF07XG4gICAgICAgIC8v6I635Y+W5Yy56YWN55qE56ys5LqM6YOo5YiGKOmUruWQjSnvvIwgdXNlci5uYW1lXG4gICAgICAgIGxldCBrZXkgPSBtYXRjaFsxXS50cmltKCk7XG4gICAgICAgIC8v5Yip55So6ZSu5ZCN77yM5LuOZGF0YeS4reiOt+WPluWvueW6lOeahOWAvFxuICAgICAgICBsZXQgcmVwbGFjZW1lbnQgPSBnZXRfb2JqKGRhdGEsIGtleSk7XG4gICAgICAgIFxuXG4gICAgICAgIC8v5bCG6I635Y+W5Yiw55qE5YC877yM5a+55rqQ5pWw5o2u6L+b6KGM5pu/5o2iXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHZhcmlhYmxlLCByZXBsYWNlbWVudClcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5sZXQgdHBsID0gJ+aIkeWPq3t7IHVzZXIubmFtZSB9fe+8jOaIkeS7iuW5tHt7dXNlci5hZ2V9feWygeS6huOAguaIkeWog+WPq3t7dXNlci5jaGlsZC5uYW1lfX0nO1xuXG5sZXQgZGF0YSA9IHtcbiAgICB1c2VyOlxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAn546L6Iqx6IqxJyxcbiAgICAgICAgICAgIGFnZTogMTgsXG4gICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICfotbXlj6/niL0nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbn07XG5cbi8vIGxldCByID0gcGFyc2UodHBsLGRhdGEpXG4vLyBjb25zb2xlLmxvZygncicscik7XG5cbndpbmRvdy5wYXJzZSA9IHBhcnNlOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./templater.js\n");

/***/ })

/******/ });