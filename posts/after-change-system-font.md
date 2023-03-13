---
title: '微信修改字体大小或者开启关怀模式导致H5页面错乱的解决方案'
date: '2023-03-13'
---

原因 当微信内修改默认字体大小或者开启微信内关怀模式，由于 H5 页面是在微信内置浏览器中打开，所以字体也会随之修改，导致页面布局改变。
解决方案 需要给安卓、ios 同时添加配置，禁止内置浏览器修改 H5 页面。在 vue 中，我们给 public 文件夹下的 index.html 添加配置

- 安卓 在 script 标签内添加方法，通过方法进行配置

```javascript
;(function () {
  if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
    handleFontSize()
  } else {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', handleFontSize)
      document.attachEvent('onWeixinJSBridgeReady', handleFontSize)
    }
  }
  function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on('menu:setfont', function () {
      WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
    })
  }
})()
```

- ios 在 style 标签内添加样式，通过修改样式进行配置
```javascript
body { /* IOS禁止微信调整字体大小 */
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}
```
