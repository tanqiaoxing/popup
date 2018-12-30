;(function() {
  function extend(target, ...rest) {
    for (let i = 0; i < rest.length; i++) {
      let source = rest[i]
      for (let key in source) {
        target[key] = source[key]
      }
    }
    return target
  }

  function Popup(options) {
    this.init(options)
  }

  const def = {
  	title: 'title',
    confirmText: '确认',
    cancelText: '取消',
    contentWidth: 250,
    backdropColor: '#ccc',
    backgroundColor: '#fff',
    cancelColor: '#ddd',
    confirmColor: '#0089dc',
    borderRadius: 4,
    titlePadding: 12,
    titleLh: 22,
    titleFontSize: 16,
    titleColor: 'black',
    bottomLh: 38,
    bottomFontSize: 14,
    borderColor: '#eee'
  }

  Popup.prototype.init = function(options) {
    this._events = {}
    this.options = extend({}, def, options)
    console.log(this.options)
    this.dom = document.createElement('div')
    
    this.containderDom = `
    <div class="popup-container">
      <div class="popup-backdrop"></div>
      <div class="popup-main">
        <div class="popup-content">
          <div class="title">${this.options.title}</div>
          <div class="bottom">
            <div class="left" id="cancelBtn">${this.options.cancelText}</div>
            <div class="right" id="confirmBtn">${this.options.confirmText}</div>
          </div>
        </div>
	    </div>	  
	  </div>`
    let cssStr = `.popup-container {position: fixed; top: 0; left: 0; bottom: 0; right: 0} .popup-main {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);} .popup-content {width: ${this.options.contentWidth}px; border-radius: ${this.options.borderRadius}px;background: ${this.options.backgroundColor};} .popup-content .title {text-align: center; line-height: ${this.options.titleLh}px; padding: ${this.options.titlePadding}px; font-size: ${this.options.titleFontSize}px; color: ${this.options.titleColor}; border-bottom: 1px solid ${this.options.borderColor};} .popup-content .bottom {display: flex; align-items: center; line-height: ${this.options.bottomLh}px; text-align: center; font-size: ${this.options.bottomFontSize}px;} .popup-content .bottom .left {flex: 1;color: ${this.options.cancelColor}; border-right: 1px solid ${this.options.borderColor};} .popup-content .bottom .right {flex: 1;color: ${this.options.confirmColor}} .popup-backdrop {position:absolute; top: 0; left: 0; right: 0; bottom: 0;background: ${this.options.backdropColor}}`

    let styleNode = document.createElement('style')
    styleNode.innerText = cssStr
    document.head.appendChild(styleNode)

  }

  Popup.prototype.show = function() {
  	this.dom.innerHTML = this.containderDom
  	console.log(this.dom)
  	document.body.appendChild(this.dom)

    let confirmBtn = document.getElementById('confirmBtn')
    let cancelBtn = document.getElementById('cancelBtn')
    let _this = this

    confirmBtn.onclick = function(){
      _this.hide()
      if(_this._events['confirm']) {
        _this.trigger('confirm')
      }
    }

    cancelBtn.onclick = function() {
      _this.hide()
      if(_this._events['cancel']) {
        _this.trigger('cancel')
      }
    }
  }

  Popup.prototype.hide = function() {
  	this.dom.innerHTML = ''
  }

  Popup.prototype.on = function(type, fn, context = this) {
    if (!this._events[type]) {
      this._events[type] = []
    }
    this._events[type].push([fn, context])
  }

  Popup.prototype.off = function(type, fn) {
    let events = this._events[type]
    if (!events) {
      return
    }
    if (events instanceof Array) {
      let len = events.length
      for (let i = 0; i < len; i++) {
        console.log('events[' + i + ']' + events[i][0])
        if (events[i][0] === fn) {
          events.splice(i, 1)
        }
      }
    }
    
  }

  Popup.prototype.trigger = function(type) {
    let events = this._events[type]
    if (!events) {
      return
    }
    let len = events.length
    let eventsCopy = [...events]
    for (let i = 0; i < len; i++) {
      let event = eventsCopy[i]
      let [fn, context] = event
      if (fn) {
        fn.apply(context, [].slice.call(arguments, 1))
      }
    }
  }

  _global = (function(){ return this || (0, eval)('this'); }());
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Popup;
  } else if (typeof define === "function" && define.amd) {
    define(function(){return Popup;});
  } else {
    !('Popup' in _global) && (_global.Popup = Popup);
  }
}());