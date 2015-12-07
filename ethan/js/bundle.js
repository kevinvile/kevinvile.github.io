/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	
	var startTimestamp;
	var checkSeconds = 0.1;
	var maxSeconds = 5;
	var audio = new Audio('audio/railroad_crossing_bell.mp3');
	
	audio.addEventListener('ended', function () {
		audio.play();
	});
	
	var el = document.getElementById('main');
	var stopEl = document.getElementById('stop');
	var startEl = document.getElementById('start');
	var input = document.getElementById('minutesToCheck');
	var form = document.getElementById('update');
	
	input.value = (maxSeconds / 60).toPrecision(2);
	
	input.addEventListener('blur', function (event) {
		updateMaxSeconds(parseFloat(input.value));
	});
	
	form.addEventListener('submit', function (event) {
		event.preventDefault();
		updateMaxSeconds(parseFloat(input.value));
	});
	
	stopEl.addEventListener('click', function () {
		stop();
	});
	
	startEl.addEventListener('click', function () {
		start();
	});
	
	function updateMaxSeconds(mins) {
		maxSeconds = mins * 60;
	}
	
	function getCurrentSeconds() {
		return Math.floor(Date.now() / 1000);
	}
	
	function check() {
		if (startTimestamp !== undefined && startTimestamp !== null) {
	
			var cur = getCurrentSeconds();
	
			if (cur - startTimestamp > maxSeconds) {
				while (el.hasChildNodes()) {
					el.removeChild(el.firstChild);
				}
				var div = document.createElement('div');
				div.className = 'attention';
				div.appendChild(document.createTextNode('Focus!!'));
				div.addEventListener('click', function () {
					audio.pause();
					start();
				});
				el.appendChild(div);
				console.log('Focus!!!');
				audio.play();
				startTimestamp = null;
			} else {
				while (el.hasChildNodes()) {
					el.removeChild(el.firstChild);
				}
				console.log(startTimestamp, cur);
			}
	
			setTimeout(function () {
				check();
			}, checkSeconds * 1000);
		}
	}
	
	function start() {
		startTimestamp = getCurrentSeconds();
		check();
		stopEl.setAttribute('style', 'display: inherit;');
		startEl.setAttribute('style', 'display: none;');
		console.log('Starting');
	}
	
	function stop() {
		audio.pause();
		startTimestamp = null;
		stopEl.setAttribute('style', 'display: none;');
		startEl.setAttribute('style', 'display: inherit;');
		console.log('Stopping!');
	}
	
	stop();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map