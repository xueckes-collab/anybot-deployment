"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 链接组件弹窗表单
 */
(function (window, $, undefined) {
	// 前台全局命名空间
	var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
	var name = "linkPopUp";
	var picture = phoenixSite[name] || (phoenixSite[name] = {});
	picture.version = "1.0.0"; // 弹窗方法

	$.extend(picture, {
		popPicUp: function popPicUp(picUrl) {
			var popImgBox = '<div class="imgPopBox">';
			popImgBox += '<div class="imgPopWrap">';
			popImgBox += '<div class="imgPopMain">';
			popImgBox += '<div class="imgLoading">';
			popImgBox += '</div>';
			popImgBox += '<span class="imgPopClose hide">';
			popImgBox += '<i class="fa fa-close">';
			popImgBox += '</i>';
			popImgBox += '</span>';
			popImgBox += '<img src=' + picUrl + '>';
			popImgBox += '</img>';
			popImgBox += '</div>';
			popImgBox += '</div>';
			popImgBox += '</div>';
			$('body').append(popImgBox);
			$('body .imgPopBox img').on('load', function () {
				$(this).siblings('.imgLoading').eq(0).hide();
				$(this).siblings('.imgPopClose').eq(0).show();
			});
			/**
			 * NonameGesture v1.0.0
			 * 使用PointerEvent实现的手势库
			 * @param {HTMLElement} element 绑定事件的元素
			 * @param {object} options 配置项
			 */

			function NonameGesture(element, options) {
				this.element = element; // 绑定事件的元素

				this.options = options; // 配置项

				this.point1 = {
					x: 0,
					y: 0
				}; // 第一个触摸点位置

				this.point2 = {
					x: 0,
					y: 0
				}; // 第二个触摸点位置

				this.lastPoint1 = {
					x: 0,
					y: 0
				}; // 上一次第一个触摸点位置

				this.lastPoint2 = {
					x: 0,
					y: 0
				}; // 上一次第二个触摸点位置

				this.distance = {
					x: 0,
					y: 0
				}; // 移动距离

				this.lastDistance = {
					x: 0,
					y: 0
				}; // 上一次移动距离

				this.lastPointermove = {
					x: 0,
					y: 0
				}; // 上一次移动位置

				this.lastCenter = {
					x: 0,
					y: 0
				}; // 上一次中心位置

				this.tapCount = 0; // 点击计数器

				this.points = []; // 移动位置数组 长度20 用于计算是否触发swipe

				this.pointers = []; // 触摸点数组

				this.dragDirection = ''; // 拖拽方向

				this.isPointerdown = false; // 按下标识

				this.singleTapTimeout = null; // 单击延时器

				this.longTapTimeout = null; // 长按延时器
				// 绑定事件

				this.bindEventListener();
			}
			/**
			 * 处理pointerdown
			 * @param {PointerEvent} e
			 */


			NonameGesture.prototype.handlePointerdown = function (e) {
				// 如果是鼠标点击，只响应左键
				if (e.pointerType === 'mouse' && e.button !== 0) {
					return;
				}

				this.pointers.push(e);
				this.point1.x = this.pointers[0].clientX;
				this.point1.y = this.pointers[0].clientY;

				if (this.pointers.length === 1) {
					this.isPointerdown = true;
					this.element.setPointerCapture(e.pointerId);
					this.tapCount++;
					this.dragDirection = '';
					this.points.length = 0;
					clearTimeout(this.singleTapTimeout);
					this.distance.x = 0;
					this.distance.y = 0;
					this.lastDistance.x = 0;
					this.lastDistance.y = 0;
					this.lastPointermove.x = this.pointers[0].clientX;
					this.lastPointermove.y = this.pointers[0].clientY; // 双击两次距离不超过30

					if (this.tapCount > 1) {
						if (Math.abs(this.point1.x - this.lastPoint1.x) > 30 || Math.abs(this.point1.y - this.lastPoint1.y) > 30) {
							this.tapCount = 1;
						}
					}

					if (this.tapCount === 1) {
						// 按住500ms触发长按事件
						var that = this;
						this.longTapTimeout = setTimeout(function () {
							that.tapCount = 0;

							if (that.options.longTap) {
								that.options.longTap(e);
							}
						}, 500);
					}
				} else if (this.pointers.length === 2) {
					this.tapCount = 0;
					clearTimeout(this.longTapTimeout);
					this.point2.x = this.pointers[1].clientX;
					this.point2.y = this.pointers[1].clientY;
					this.lastPoint2.x = this.pointers[1].clientX;
					this.lastPoint2.y = this.pointers[1].clientY;
					this.lastDistance.x = this.distance.x;
					this.lastDistance.y = this.distance.y;
					var center = this.getCenter(this.point1, this.point2);
					this.lastCenter.x = center.x;
					this.lastCenter.y = center.y;
				}

				this.lastPoint1 = {
					x: this.pointers[0].clientX,
					y: this.pointers[0].clientY
				};

				if (this.options.pointerdown) {
					this.options.pointerdown(e);
				}
			};
			/**
			 * 处理pointermove
			 * @param {PointerEvent} e
			 */


			NonameGesture.prototype.handlePointermove = function (e) {
				if (!this.isPointerdown) {
					return;
				}

				this.handlePointers(e, 'update');
				var current1 = {
					x: this.pointers[0].clientX,
					y: this.pointers[0].clientY
				};

				if (this.pointers.length === 1) {
					this.distance.x = current1.x - this.point1.x + this.lastDistance.x;
					this.distance.y = current1.y - this.point1.y + this.lastDistance.y; // 偏移量大于10表示移动

					if (Math.abs(this.distance.x) > 10 || Math.abs(this.distance.y) > 10) {
						this.tapCount = 0;
						clearTimeout(this.longTapTimeout);

						if (this.dragDirection === '') {
							this.dragDirection = this.getDragDirection();
						}
					}

					this.points.unshift({
						x: current1.x,
						y: current1.y,
						timeStamp: e.timeStamp
					});

					if (this.points.length > 20) {
						this.points.pop();
					} // drag


					this.handleDrag(e, current1);
					this.lastPointermove.x = current1.x;
					this.lastPointermove.y = current1.y;
				} else if (this.pointers.length === 2) {
					var current2 = {
						x: this.pointers[1].clientX,
						y: this.pointers[1].clientY
					};
					var center = this.getCenter(current1, current2);
					e._centerX = center.x;
					e._centerY = center.y;
					e._lastCenterX = this.lastCenter.x;
					e._lastCenterY = this.lastCenter.y; // rotate

					this.handleRotate(e, current1, current2); // pinch

					this.handlePinch(e, current1, current2);
					this.lastPoint1.x = current1.x;
					this.lastPoint1.y = current1.y;
					this.lastPoint2.x = current2.x;
					this.lastPoint2.y = current2.y;
					this.lastCenter.x = center.x;
					this.lastCenter.y = center.y;
				}

				if (this.options.pointermove) {
					this.options.pointermove(e);
				} // 阻止默认行为，例如图片拖拽


				e.preventDefault();
			};
			/**
			 * 处理pointerup
			 * @param {PointerEvent} e
			 */


			NonameGesture.prototype.handlePointerup = function (e) {
				if (!this.isPointerdown) {
					return;
				}

				this.handlePointers(e, 'delete');

				if (this.pointers.length === 0) {
					this.isPointerdown = false;
					clearTimeout(this.longTapTimeout);

					if (this.tapCount === 0) {
						this.handleSwipe(e);
					} else {
						if (this.options.tap) {
							this.options.tap(e);
						}

						if (this.tapCount === 1) {
							this.singleTapTimeout = setTimeout(function () {
								this.tapCount = 0;

								if (this.options.singleTap) {
									this.options.singleTap(e);
								}
							}, 250);
						} else if (this.tapCount > 1) {
							this.tapCount = 0;

							if (this.options.doubleTap) {
								this.options.doubleTap(e);
							}
						}
					}
				} else if (this.pointers.length === 1) {
					this.point1.x = this.pointers[0].clientX;
					this.point1.y = this.pointers[0].clientY;
					this.lastPointermove.x = this.pointers[0].clientX;
					this.lastPointermove.y = this.pointers[0].clientY;
				}

				if (this.options.pointerup) {
					this.options.pointerup(e);
				}
			};
			/**
			 * 处理pointercancel
			 * @param {PointerEvent} e
			 */


			NonameGesture.prototype.handlePointercancel = function (e) {
				this.isPointerdown = false;
				this.tapCount = 0;
				clearTimeout(this.longTapTimeout);
				this.pointers.length = 0;

				if (this.options.pointercancel) {
					this.options.pointercancel(e);
				}
			};
			/**
			 * 更新或删除指针
			 * @param {PointerEvent} e
			 * @param {string} type update delete
			 */


			NonameGesture.prototype.handlePointers = function (e, type) {
				for (var i = 0; i < this.pointers.length; i++) {
					if (this.pointers[i].pointerId === e.pointerId) {
						if (type === 'update') {
							this.pointers[i] = e;
						} else if (type === 'delete') {
							this.pointers.splice(i, 1);
						}
					}
				}
			};
			/**
			 * 获取拖拽方向
			 * @returns
			 */


			NonameGesture.prototype.getDragDirection = function () {
				var dragDirection = '';

				if (Math.abs(this.distance.x) > Math.abs(this.distance.y)) {
					dragDirection = this.distance.x > 0 ? 'right' : 'left';
				} else {
					dragDirection = this.distance.y > 0 ? 'down' : 'up';
				}

				return dragDirection;
			};
			/**
			 * 处理拖拽
			 * @param {PointerEvent} e
			 * @param {object} a 第一个点的位置
			 */


			NonameGesture.prototype.handleDrag = function (e, a) {
				e._dragDirection = this.dragDirection;
				e._diffX = a.x - this.lastPointermove.x;
				e._diffY = a.y - this.lastPointermove.y;
				e._distanceX = a.x - this.point1.x + this.lastDistance.x;
				e._distanceY = a.y - this.point1.y + this.lastDistance.y;

				if (this.options.drag) {
					this.options.drag(e);
				}
			};
			/**
			 * 处理swipe
			 * @param {PointerEvent} e
			 */


			NonameGesture.prototype.handleSwipe = function (e) {
				var MIN_SWIPE_DISTANCE = 20;
				var x = 0,
					y = 0; // 如果200ms内移动距离大于20

				var _iterator = _createForOfIteratorHelper(this.points),
					_step;

				try {
					for (_iterator.s(); !(_step = _iterator.n()).done;) {
						var item = _step.value;

						if (e.timeStamp - item.timeStamp < 200) {
							x = e.clientX - item.x;
							y = e.clientY - item.y;
						} else {
							break;
						}

						;
					}
				} catch (err) {
					_iterator.e(err);
				} finally {
					_iterator.f();
				}

				if (Math.abs(x) > MIN_SWIPE_DISTANCE || Math.abs(y) > MIN_SWIPE_DISTANCE) {
					if (Math.abs(x) > Math.abs(y)) {
						e._swipeDirection = x > 0 ? 'right' : 'left';
					} else {
						e._swipeDirection = y > 0 ? 'down' : 'up';
					}

					if (this.options.swipe) {
						this.options.swipe(e);
					}
				}
			};
			/**
			 * 处理rotate
			 * @param {PointerEvent} e
			 * @param {object} a 第一个点的位置
			 * @param {object} b 第二个点的位置
			 */


			NonameGesture.prototype.handleRotate = function (e, a, b) {
				e._rotate = this.getAngle(a, b) - this.getAngle(this.lastPoint1, this.lastPoint2);

				if (this.options.rotate) {
					this.options.rotate(e);
				}
			};
			/**
			 * 处理pinch
			 * @param {PointerEvent} e
			 * @param {object} a 第一个点的位置
			 * @param {object} b 第二个点的位置
			 */


			NonameGesture.prototype.handlePinch = function (e, a, b) {
				e._scale = this.getDistance(a, b) / this.getDistance(this.lastPoint1, this.lastPoint2);

				if (this.options.pinch) {
					this.options.pinch(e);
				}
			};
			/**
			 * 鼠标滚轮缩放
			 * @param {WheelEvent} e
			 */


			NonameGesture.prototype.handleWheel = function (e) {
				e._scale = 1.1;

				if (e.deltaY > 0) {
					e._scale = 1 / 1.1;
				}

				if (this.options.wheel) {
					this.options.wheel(e);
				}
			};
			/**
			 * 绑定事件
			 */


			NonameGesture.prototype.bindEventListener = function () {
				this.handlePointerdown = this.handlePointerdown.bind(this);
				this.handlePointermove = this.handlePointermove.bind(this);
				this.handlePointerup = this.handlePointerup.bind(this);
				this.handlePointercancel = this.handlePointercancel.bind(this);
				this.handleWheel = this.handleWheel.bind(this);
				this.element.addEventListener('pointerdown', this.handlePointerdown);
				this.element.addEventListener('pointermove', this.handlePointermove);
				this.element.addEventListener('pointerup', this.handlePointerup);
				this.element.addEventListener('pointercancel', this.handlePointercancel);
				this.element.addEventListener('wheel', this.handleWheel);
			};
			/**
			 * 解绑事件
			 */


			NonameGesture.prototype.unbindEventListener = function () {
				this.element.removeEventListener('pointerdown', this.handlePointerdown);
				this.element.removeEventListener('pointermove', this.handlePointermove);
				this.element.removeEventListener('pointerup', this.handlePointerup);
				this.element.removeEventListener('pointercancel', this.handlePointercancel);
				this.element.removeEventListener('wheel', this.handleWheel);
			};
			/**
			 * 销毁
			 */


			NonameGesture.prototype.destroy = function () {
				this.unbindEventListener();
			};
			/**
			 * 获取旋转角度
			 * @param {object} a 第一个点的位置
			 * @param {object} b 第二个点的位置
			 * @returns
			 */


			NonameGesture.prototype.getAngle = function (a, b) {
				var x = a.x - b.x;
				var y = a.y - b.y;
				return Math.atan2(y, x) * 180 / Math.PI;
			};
			/**
			 * 获取两点距离
			 * @param {object} a 第一个点的位置
			 * @param {object} b 第二个点的位置
			 * @returns
			 */


			NonameGesture.prototype.getDistance = function (a, b) {
				var x = a.x - b.x;
				var y = a.y - b.y;
				return Math.hypot(x, y); // Math.sqrt(x * x + y * y);
			};
			/**
			 * 获取两点中心点
			 * @param {object} a 第一个点的位置
			 * @param {object} b 第二个点的位置
			 * @returns
			 */


			NonameGesture.prototype.getCenter = function (a, b) {
				var x = (a.x + b.x) / 2;
				var y = (a.y + b.y) / 2;
				return {
					x: x,
					y: y
				};
			};
			/**
			 * 获取图片缩放尺寸
			 * @param {number} naturalWidth 图片自然宽度
			 * @param {number} naturalHeight 图片自然高度
			 * @param {number} maxWidth 最大显示宽度
			 * @param {number} maxHeight 最大显示高度
			 * @returns
			 */


			NonameGesture.prototype.getImgSize = function (naturalWidth, naturalHeight, maxWidth, maxHeight) {
				var imgRatio = naturalWidth / naturalHeight;
				var maxRatio = maxWidth / maxHeight;
				var width, height; // 如果图片实际宽高比例 >= 显示宽高比例

				if (imgRatio >= maxRatio) {
					if (naturalWidth > maxWidth) {
						width = maxWidth;
						height = maxWidth / naturalWidth * naturalHeight;
					} else {
						width = naturalWidth;
						height = naturalHeight;
					}
				} else {
					if (naturalHeight > maxHeight) {
						width = maxHeight / naturalHeight * naturalWidth;
						height = maxHeight;
					} else {
						width = naturalWidth;
						height = naturalHeight;
					}
				}

				return {
					width: width,
					height: height
				};
			}; // 全局变量


			var result,
				maxScale,
				minScale = 0.5,
				x,
				y,
				scale = 1,
				_rotate = 0;
			var image = document.querySelector('.imgPopBox .imgPopMain img');
			image.addEventListener('load', init);

			function init() {
				var gesture = new NonameGesture(image, {
					doubleTap: function doubleTap(e) {
						var ratio = 1 / scale;

						if (scale <= 1) {
							ratio = maxScale / scale;
						}

						var origin = {
							x: (ratio - 1) * result.width * 0.5,
							y: (ratio - 1) * result.height * 0.5
						};
						x -= (ratio - 1) * (e.clientX - x) - origin.x;
						y -= (ratio - 1) * (e.clientY - y) - origin.y;
						scale *= ratio;
						image.style.transition = 'transform 300ms';
						image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(' + scale + ') rotate(' + _rotate + 'deg)';
					},
					drag: function drag(e) {
						x += e._diffX;
						y += e._diffY;
						image.style.transition = 'none';
						image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(' + scale + ') rotate(' + _rotate + 'deg)';
					},
					rotate: function rotate(e) {
						// transform-origin相对于视口左上角的坐标
						var origin = {
							x: result.width * 0.5 + x,
							y: result.height * 0.5 + y
						}; // 以双指中心为原点(0, 0)，计算transform-origin的相对坐标

						var a = {
							x: origin.x - e._centerX,
							y: e._centerY - origin.y
						}; // 计算点a绕双指中心(0, 0)旋转e._rotate度后点b的坐标

						var b = {
							x: (a.x - 0) * Math.cos(e._rotate * Math.PI / 180) + (a.y - 0) * Math.sin(e._rotate * Math.PI / 180) + 0,
							y: (a.x - 0) * Math.sin(e._rotate * Math.PI / 180) - (a.y - 0) * Math.cos(e._rotate * Math.PI / 180) + 0
						};
						_rotate = (_rotate + e._rotate) % 360;
						x -= a.x - b.x;
						y += a.y + b.y;
					},
					pinch: function pinch(e) {
						// 缩放比例，计算宽高width *= e._scale; height *= e._scale;
						var _scale = scale * e._scale;

						if (_scale > maxScale) {
							e._scale = maxScale / scale;
							scale = maxScale;
						} else if (_scale < minScale) {
							e._scale = minScale / scale;
							scale = minScale;
						} else {
							scale = _scale;
						} // 计算图片中心偏移量，默认transform-origin: 50% 50%
						// 如果transform-origin: 30% 40%，那origin.x = (e._scale - 1) * result.width * 0.3
						// origin.y = (e._scale - 1) * result.height * 0.4
						// 如果通过修改宽高或使用transform缩放，但将transform-origin设置为左上角时。
						// 可以不用计算origin，因为(e._scale - 1) * result.width * 0 = 0


						var origin = {
							x: (e._scale - 1) * result.width * 0.5,
							y: (e._scale - 1) * result.height * 0.5
						};
						x -= (e._scale - 1) * (e._centerX - x) - origin.x - (e._centerX - e._lastCenterX);
						y -= (e._scale - 1) * (e._centerY - y) - origin.y - (e._centerY - e._lastCenterY);
						image.style.transition = 'none';
						image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(' + scale + ') rotate(' + _rotate + 'deg)';
					},
					wheel: function wheel(e) {
						var _scale = scale * e._scale;

						if (_scale > maxScale) {
							e._scale = maxScale / scale;
							scale = maxScale;
						} else if (_scale < minScale) {
							e._scale = minScale / scale;
							scale = minScale;
						} else {
							scale = _scale;
						}

						var origin = {
							x: (e._scale - 1) * result.width * 0.5,
							y: (e._scale - 1) * result.height * 0.5
						}; // 以鼠标位置为中心，计算缩放偏移量

						x -= (e._scale - 1) * (e.clientX - x) - origin.x;
						y -= (e._scale - 1) * (e.clientY - y) - origin.y;
						image.style.transition = 'none';
						image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(' + scale + ') rotate(' + _rotate + 'deg)';
						e.preventDefault();
					}
				}); // 图片初始信息

				result = gesture.getImgSize(image.naturalWidth, image.naturalHeight, window.innerWidth * 0.9, window.innerHeight * 0.9);
				image.style.width = result.width + 'px';
				image.style.height = result.height + 'px';
				x = (window.innerWidth - result.width) * 0.5;
				y = (window.innerHeight - result.height) * 0.5;
				image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(1) rotate(' + _rotate + 'deg)';
				maxScale = Math.max(Math.round(image.naturalWidth / result.width), 3);
				$('.imgPopClose').on('click', function (e) {
					// e.stopPropagation();
					$('.imgPopBox').remove();
				});
			}
		}
	});
})(window, jQuery);