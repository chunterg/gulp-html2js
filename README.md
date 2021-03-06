gulp-tpl2js
============

> 将模板文件转成js代码或js模块 

## 用法

```
tpl2js({opt})
```

##例子

```javascript
var gulp = require('gulp');
var tpl2js = require('gulp-tpl2js');
gulp.task('trans', function() {
  gulp.src('./tpl/**')
  	.pipe(tpl2js())
  	.pipe(gulp.dest('./output/tpl'))
});
```

### 参数
```
opt（选填）: {
	type : 'amd' //是否转成amd/cmd模板，默认js字符串
	modBase: 'tpl' //模块id基础路径, 默认tpl
}
```

#### 自定义js字符串的变量名
```html
<!--varname:offerlist-->
<div>varname为输出js字符串的变量名</div>
```

```javascript
//tpl2js()
//输出filename.js
offerlist = '<div>varname为输出js字符串的变量名</div>'

```

#### 转成amd模块示例
```html

<!--varname:offerlist-->
<div>varname为输出js字符串的变量名</div>
```

```javascript
//tpl2js({type:'amd',modBase:'view'})
//输出filename.js
(function() {
  var tpl = '<!--varname:offerlist-->\
<div>varname为输出js字符串的变量名</div>'
  ;

  // cmd
  if (typeof module !== "undefined" && module.exports) {
      module.exports = tpl;
  }
  // amd
 if (typeof define === "function" && (define.amd||define.fmd)) {
      define("view/filename", [], function () {
          return tpl;
      });
  }
})();
```