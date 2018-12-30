# popup

## 弹框插件，可自定义样式
```
title: 'title',             // title
confirmText: '确认',        //  确认按钮文本
cancelText: '取消',         //  取消按钮文本
contentWidth: 250,         //  弹框宽度 width
backdropColor: '#ccc',     //  蒙层背景色 background
backgroundColor: '#fff',   //  弹框背景色 background
cancelColor: '#ddd',       //  取消文本 color
confirmColor: '#0089dc',   //  确认文本 color
borderRadius: 4,           //  弹框border-radius
titlePadding: 12,          //  title的padding
titleLh: 22,               //  title的line-height
titleFontSize: 16,         //  title的font-size
titleColor: 'black',       //  title的color
bottomLh: 38,              //  弹框底部的line-height
bottomFontSize: 14,        //  弹框底部的font-size
borderColor: '#eee'        //  弹框的border color
```
## 引用方式
```
<script src="/.../popup.js"></script>
```
## 调用方式
```
<script>
  let popup = new Popup({
  title: '是否确认此操作'，
  ...
  	// 自定义样式
  })

  // 显示
  function show() {
  popup.show
  }

  // 确认按钮监听
  popup.on('confirm', () => {
  ...
    //  点击确认按钮后执行的逻辑
  })

  // 取消按钮监听
  popup.on('cancel', () => {
  ...
    //  点击取消按钮后执行的逻辑
  })
</script>
```