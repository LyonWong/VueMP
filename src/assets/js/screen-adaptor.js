/**
 * Author: LyonWong
 * Date: 2018-03-27
 * designWidth为设计宽度
 * fix为一个依赖于窗口宽度的调整函数，可用于调整显示区域的最大宽度
 */
module.exports = function (designWidth, fit) {
  function f() {
    let d = document;
    let b = d.body;
    let s = b.style;
    s.maxWidth = fit ? fit(window.screen) +'px' : designWidth + 'px';
    s.fontSize = getComputedStyle(b)['font-size'];
    d.documentElement.style.fontSize = (b.offsetWidth * 100 / designWidth) + 'px';
  }
  f();
  window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', f, false);
}
