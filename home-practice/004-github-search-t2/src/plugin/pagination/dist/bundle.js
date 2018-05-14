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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pagination.js":
/*!***********************!*\
  !*** ./pagination.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var config\n    , el\n    , page_amount //通过amount/limit计算所得\n    , el_pagination_list\n    , el_pagination_fieldset\n    , default_config = {\n        amount: null,\n        limit: null, // @?\n        range: 5,\n        current: 1\n    }\n    , output = {\n        init: init,\n    }\n\nfunction init(user_config) {\n    el = document.querySelector(user_config.el);\n\n    if (!el)\n        throw \"Invalid root element\"\n    // 合并默认配置和用户配置\n    config = Object.assign({}, default_config, user_config)\n    console.log(config)\n    // 渲染插件基础HTML结构\n    render_init();\n\n    //amount和limit为必填参数\n    if (!user_config.amount || !user_config.limit)\n        return;\n    // 计算总页数\n    cal_page_amount();\n\n    change_page(config.current, true);\n    // 通已知的页面总数渲染所有的数字按钮\n    render_list();\n}\n\nfunction render_init() {\n    el.classList.add('pagination')\n\n    el.innerHTML = `\n    <fieldset class=\"pagination-fieldset\">\n    <div class=\"pagination-pre\">\n      <button class=\"pagination-first\">First</button>\n      <button class=\"pagination-prev\">Prev</button>\n    </div>\n    <div class=\"pagination-list\"></div>\n    <div class=\"pagination-post\">\n      <button class=\"pagination-next\">Next</button>\n      <button class=\"pagination-last\">Last</button>\n    </div>\n  </fieldset>\n    `;\n\n    el_pagination_list = document.querySelector('.pagination-list');\n    el_pagination_fieldset = document.querySelector('.pagination-fieldset');\n\n    el.addEventListener('click', function (e) {\n        var target = e.target //哪个在冒泡\n            , is_numeric_btn = target.classList.contains('pagination-item') //contains方法返回布尔值\n            , first = target.classList.contains('pagination-first')\n            , last = target.classList.contains('pagination-last')\n            , prev = target.classList.contains('pagination-prev')\n            , next = target.classList.contains('pagination-next')\n            ;\n        if (is_numeric_btn) { //如果是数字按钮\n            var page = parseInt(target.dataset.page);\n            console.log('点击了：' + page)\n            change_page(page);//切换当前页码为点击页码\n        } else if (first) {\n            change_page(1);\n        } else if (last) {\n            change_page(page_amount);\n        } else if (prev) {\n            change_page(config.current - 1);\n        } else if (next) {\n            change_page(config.current + 1);\n        } else {\n\n        }\n\n        render_list();\n    })\n}\n\n//通过已知的页面总数渲染所有的数字按钮\nfunction render_list() {\n    el_pagination_list.innerHTML = '';\n    //确定按钮范围\n    var between = calc_start_and_end()\n        , start = between.start\n        , end = between.end\n        ;\n    // 生成翻页按钮\n    for (var i = start; i <= end; i++) {\n        var btn = document.createElement('button');\n        btn.innerText = i;\n        btn.classList.add('pagination-item');\n        btn.dataset.page = i;\n        el_pagination_list.appendChild(btn);\n\n        if (i == config.current)\n            btn.classList.add('active');\n    }\n\n}\n\n// 计算数字按钮开始和结束\nfunction calc_start_and_end() {\n    var start\n        , end\n        , middle = Math.ceil(config.range / 2)\n        , reaching_left = config.current <= middle\n        , reaching_right = config.current >= page_amount - middle\n        ;\n\n    if (reaching_left) {\n        start = 1;\n        end = page_amount;\n    } else if (reaching_right) {\n        start = page_amount - (config.range - 1);\n        end = page_amount;\n    } else {\n        start = config.current - (middle - 1);\n        end = config.current + (middle - 1);\n    };\n\n    return {\n        start: start,\n        end: end\n    }\n}\n\n// 验证并更改当前页\n// 更改后通知回调函数\nfunction change_page(page, force) {\n    // 保存下更改前的页码数\n    var old = config.current;\n    // 切换页码\n    config.current = page;\n    // 如果大于最大的页码数\n    if (page > page_amount) {\n        config.current = page_amount;\n    }\n    \n    //如果小于最小页码数\n    if (page < 1){\n        config.current = 1;\n    }\n    \n    // 通知使用者\n    if (config.on_page_change)\n        config.on_page_change(config.current);\n\n    if (!force && old == config.current)\n        return;\n}\n\n// 计算总页码数\nfunction cal_page_amount() {\n    page_amount = Math.ceil(config.amount / config.limit)\n}\n\n// 副功能 设置列表总数和每页数量\nfunction set_amount_limit(amount,limit){\n    config.amount = amount;\n    config.limit = limit;\n    cal_page_amount();\n\n    render_list();\n}\n\nfunction disabled(){\n    el_pagination_fieldset.disabled = true;\n}\nfunction hide(){\n    el.hidden = true;\n}\n\nfunction show(){\n    el.hidden = false;\n}\n\nfunction is_vissble(){\n    return !el.hidden;\n}\n\nmodule.exports = output//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdpbmF0aW9uLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnaW5hdGlvbi5qcz9kMmFlIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBjb25maWdcbiAgICAsIGVsXG4gICAgLCBwYWdlX2Ftb3VudCAvL+mAmui/h2Ftb3VudC9saW1pdOiuoeeul+aJgOW+l1xuICAgICwgZWxfcGFnaW5hdGlvbl9saXN0XG4gICAgLCBlbF9wYWdpbmF0aW9uX2ZpZWxkc2V0XG4gICAgLCBkZWZhdWx0X2NvbmZpZyA9IHtcbiAgICAgICAgYW1vdW50OiBudWxsLFxuICAgICAgICBsaW1pdDogbnVsbCwgLy8gQD9cbiAgICAgICAgcmFuZ2U6IDUsXG4gICAgICAgIGN1cnJlbnQ6IDFcbiAgICB9XG4gICAgLCBvdXRwdXQgPSB7XG4gICAgICAgIGluaXQ6IGluaXQsXG4gICAgfVxuXG5mdW5jdGlvbiBpbml0KHVzZXJfY29uZmlnKSB7XG4gICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJfY29uZmlnLmVsKTtcblxuICAgIGlmICghZWwpXG4gICAgICAgIHRocm93IFwiSW52YWxpZCByb290IGVsZW1lbnRcIlxuICAgIC8vIOWQiOW5tum7mOiupOmFjee9ruWSjOeUqOaIt+mFjee9rlxuICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRfY29uZmlnLCB1c2VyX2NvbmZpZylcbiAgICBjb25zb2xlLmxvZyhjb25maWcpXG4gICAgLy8g5riy5p+T5o+S5Lu25Z+656GASFRNTOe7k+aehFxuICAgIHJlbmRlcl9pbml0KCk7XG5cbiAgICAvL2Ftb3VudOWSjGxpbWl05Li65b+F5aGr5Y+C5pWwXG4gICAgaWYgKCF1c2VyX2NvbmZpZy5hbW91bnQgfHwgIXVzZXJfY29uZmlnLmxpbWl0KVxuICAgICAgICByZXR1cm47XG4gICAgLy8g6K6h566X5oC76aG15pWwXG4gICAgY2FsX3BhZ2VfYW1vdW50KCk7XG5cbiAgICBjaGFuZ2VfcGFnZShjb25maWcuY3VycmVudCwgdHJ1ZSk7XG4gICAgLy8g6YCa5bey55+l55qE6aG16Z2i5oC75pWw5riy5p+T5omA5pyJ55qE5pWw5a2X5oyJ6ZKuXG4gICAgcmVuZGVyX2xpc3QoKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyX2luaXQoKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCgncGFnaW5hdGlvbicpXG5cbiAgICBlbC5pbm5lckhUTUwgPSBgXG4gICAgPGZpZWxkc2V0IGNsYXNzPVwicGFnaW5hdGlvbi1maWVsZHNldFwiPlxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLXByZVwiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInBhZ2luYXRpb24tZmlyc3RcIj5GaXJzdDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInBhZ2luYXRpb24tcHJldlwiPlByZXY8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1saXN0XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tcG9zdFwiPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInBhZ2luYXRpb24tbmV4dFwiPk5leHQ8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJwYWdpbmF0aW9uLWxhc3RcIj5MYXN0PC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZmllbGRzZXQ+XG4gICAgYDtcblxuICAgIGVsX3BhZ2luYXRpb25fbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uLWxpc3QnKTtcbiAgICBlbF9wYWdpbmF0aW9uX2ZpZWxkc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24tZmllbGRzZXQnKTtcblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IC8v5ZOq5Liq5Zyo5YaS5rOhXG4gICAgICAgICAgICAsIGlzX251bWVyaWNfYnRuID0gdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGFnaW5hdGlvbi1pdGVtJykgLy9jb250YWluc+aWueazlei/lOWbnuW4g+WwlOWAvFxuICAgICAgICAgICAgLCBmaXJzdCA9IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2luYXRpb24tZmlyc3QnKVxuICAgICAgICAgICAgLCBsYXN0ID0gdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGFnaW5hdGlvbi1sYXN0JylcbiAgICAgICAgICAgICwgcHJldiA9IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2luYXRpb24tcHJldicpXG4gICAgICAgICAgICAsIG5leHQgPSB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYWdpbmF0aW9uLW5leHQnKVxuICAgICAgICAgICAgO1xuICAgICAgICBpZiAoaXNfbnVtZXJpY19idG4pIHsgLy/lpoLmnpzmmK/mlbDlrZfmjInpkq5cbiAgICAgICAgICAgIHZhciBwYWdlID0gcGFyc2VJbnQodGFyZ2V0LmRhdGFzZXQucGFnZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye75LqG77yaJyArIHBhZ2UpXG4gICAgICAgICAgICBjaGFuZ2VfcGFnZShwYWdlKTsvL+WIh+aNouW9k+WJjemhteeggeS4uueCueWHu+mhteeggVxuICAgICAgICB9IGVsc2UgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICBjaGFuZ2VfcGFnZSgxKTtcbiAgICAgICAgfSBlbHNlIGlmIChsYXN0KSB7XG4gICAgICAgICAgICBjaGFuZ2VfcGFnZShwYWdlX2Ftb3VudCk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJldikge1xuICAgICAgICAgICAgY2hhbmdlX3BhZ2UoY29uZmlnLmN1cnJlbnQgLSAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0KSB7XG4gICAgICAgICAgICBjaGFuZ2VfcGFnZShjb25maWcuY3VycmVudCArIDEpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXJfbGlzdCgpO1xuICAgIH0pXG59XG5cbi8v6YCa6L+H5bey55+l55qE6aG16Z2i5oC75pWw5riy5p+T5omA5pyJ55qE5pWw5a2X5oyJ6ZKuXG5mdW5jdGlvbiByZW5kZXJfbGlzdCgpIHtcbiAgICBlbF9wYWdpbmF0aW9uX2xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgLy/noa7lrprmjInpkq7ojIPlm7RcbiAgICB2YXIgYmV0d2VlbiA9IGNhbGNfc3RhcnRfYW5kX2VuZCgpXG4gICAgICAgICwgc3RhcnQgPSBiZXR3ZWVuLnN0YXJ0XG4gICAgICAgICwgZW5kID0gYmV0d2Vlbi5lbmRcbiAgICAgICAgO1xuICAgIC8vIOeUn+aIkOe/u+mhteaMiemSrlxuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICB2YXIgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ0bi5pbm5lclRleHQgPSBpO1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgncGFnaW5hdGlvbi1pdGVtJyk7XG4gICAgICAgIGJ0bi5kYXRhc2V0LnBhZ2UgPSBpO1xuICAgICAgICBlbF9wYWdpbmF0aW9uX2xpc3QuYXBwZW5kQ2hpbGQoYnRuKTtcblxuICAgICAgICBpZiAoaSA9PSBjb25maWcuY3VycmVudClcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG5cbn1cblxuLy8g6K6h566X5pWw5a2X5oyJ6ZKu5byA5aeL5ZKM57uT5p2fXG5mdW5jdGlvbiBjYWxjX3N0YXJ0X2FuZF9lbmQoKSB7XG4gICAgdmFyIHN0YXJ0XG4gICAgICAgICwgZW5kXG4gICAgICAgICwgbWlkZGxlID0gTWF0aC5jZWlsKGNvbmZpZy5yYW5nZSAvIDIpXG4gICAgICAgICwgcmVhY2hpbmdfbGVmdCA9IGNvbmZpZy5jdXJyZW50IDw9IG1pZGRsZVxuICAgICAgICAsIHJlYWNoaW5nX3JpZ2h0ID0gY29uZmlnLmN1cnJlbnQgPj0gcGFnZV9hbW91bnQgLSBtaWRkbGVcbiAgICAgICAgO1xuXG4gICAgaWYgKHJlYWNoaW5nX2xlZnQpIHtcbiAgICAgICAgc3RhcnQgPSAxO1xuICAgICAgICBlbmQgPSBwYWdlX2Ftb3VudDtcbiAgICB9IGVsc2UgaWYgKHJlYWNoaW5nX3JpZ2h0KSB7XG4gICAgICAgIHN0YXJ0ID0gcGFnZV9hbW91bnQgLSAoY29uZmlnLnJhbmdlIC0gMSk7XG4gICAgICAgIGVuZCA9IHBhZ2VfYW1vdW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0ID0gY29uZmlnLmN1cnJlbnQgLSAobWlkZGxlIC0gMSk7XG4gICAgICAgIGVuZCA9IGNvbmZpZy5jdXJyZW50ICsgKG1pZGRsZSAtIDEpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZDogZW5kXG4gICAgfVxufVxuXG4vLyDpqozor4Hlubbmm7TmlLnlvZPliY3pobVcbi8vIOabtOaUueWQjumAmuefpeWbnuiwg+WHveaVsFxuZnVuY3Rpb24gY2hhbmdlX3BhZ2UocGFnZSwgZm9yY2UpIHtcbiAgICAvLyDkv53lrZjkuIvmm7TmlLnliY3nmoTpobXnoIHmlbBcbiAgICB2YXIgb2xkID0gY29uZmlnLmN1cnJlbnQ7XG4gICAgLy8g5YiH5o2i6aG156CBXG4gICAgY29uZmlnLmN1cnJlbnQgPSBwYWdlO1xuICAgIC8vIOWmguaenOWkp+S6juacgOWkp+eahOmhteeggeaVsFxuICAgIGlmIChwYWdlID4gcGFnZV9hbW91bnQpIHtcbiAgICAgICAgY29uZmlnLmN1cnJlbnQgPSBwYWdlX2Ftb3VudDtcbiAgICB9XG4gICAgXG4gICAgLy/lpoLmnpzlsI/kuo7mnIDlsI/pobXnoIHmlbBcbiAgICBpZiAocGFnZSA8IDEpe1xuICAgICAgICBjb25maWcuY3VycmVudCA9IDE7XG4gICAgfVxuICAgIFxuICAgIC8vIOmAmuefpeS9v+eUqOiAhVxuICAgIGlmIChjb25maWcub25fcGFnZV9jaGFuZ2UpXG4gICAgICAgIGNvbmZpZy5vbl9wYWdlX2NoYW5nZShjb25maWcuY3VycmVudCk7XG5cbiAgICBpZiAoIWZvcmNlICYmIG9sZCA9PSBjb25maWcuY3VycmVudClcbiAgICAgICAgcmV0dXJuO1xufVxuXG4vLyDorqHnrpfmgLvpobXnoIHmlbBcbmZ1bmN0aW9uIGNhbF9wYWdlX2Ftb3VudCgpIHtcbiAgICBwYWdlX2Ftb3VudCA9IE1hdGguY2VpbChjb25maWcuYW1vdW50IC8gY29uZmlnLmxpbWl0KVxufVxuXG4vLyDlia/lip/og70g6K6+572u5YiX6KGo5oC75pWw5ZKM5q+P6aG15pWw6YePXG5mdW5jdGlvbiBzZXRfYW1vdW50X2xpbWl0KGFtb3VudCxsaW1pdCl7XG4gICAgY29uZmlnLmFtb3VudCA9IGFtb3VudDtcbiAgICBjb25maWcubGltaXQgPSBsaW1pdDtcbiAgICBjYWxfcGFnZV9hbW91bnQoKTtcblxuICAgIHJlbmRlcl9saXN0KCk7XG59XG5cbmZ1bmN0aW9uIGRpc2FibGVkKCl7XG4gICAgZWxfcGFnaW5hdGlvbl9maWVsZHNldC5kaXNhYmxlZCA9IHRydWU7XG59XG5mdW5jdGlvbiBoaWRlKCl7XG4gICAgZWwuaGlkZGVuID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2hvdygpe1xuICAgIGVsLmhpZGRlbiA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc192aXNzYmxlKCl7XG4gICAgcmV0dXJuICFlbC5oaWRkZW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3V0cHV0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pagination.js\n");

/***/ }),

/***/ "./test/index.js":
/*!***********************!*\
  !*** ./test/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pagination = __webpack_require__(/*! ../pagination */ \"./pagination.js\")\n\npagination.init({\n    el:'#page',\n    amount: 15,\n    limit:5,\n\n})\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90ZXN0L2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcz8wNDQxIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBwYWdpbmF0aW9uID0gcmVxdWlyZSgnLi4vcGFnaW5hdGlvbicpXG5cbnBhZ2luYXRpb24uaW5pdCh7XG4gICAgZWw6JyNwYWdlJyxcbiAgICBhbW91bnQ6IDE1LFxuICAgIGxpbWl0OjUsXG5cbn0pXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./test/index.js\n");

/***/ })

/******/ });