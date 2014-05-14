(function() {
  var tpl = '<!--varname:offerlist-->\
<div>varname为输出js字符串的变量名</div>';

  // cmd
  if (typeof module !== "undefined" && module.exports) {
      module.exports = tpl;
  }
  // amd
 if (typeof define === "function" && (define.amd||define.fmd)) {
      define("tpl/test.aa", [], function () {
          return tpl;
      });
  }
})();