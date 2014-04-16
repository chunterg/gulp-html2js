var gutil = require('gulp-util');
var through = require('through2');
var iconv = require('iconv-lite');
var path = require('path');
module.exports = function(opt){

	var options = {},opt = opt||{};
	// 文件编码
	options.encode = opt.encode||"gbk"; 

	// default:普通js字符串
	// amd/cmd: 通用模块
	options.type = opt.type||"default";

	// modBase: 模块id基础路径
	options.modBase = opt.modBase||"tpl";

	function getFileName(filepath){
		var fileBaseArr = filepath.split('.');
        	fileBaseArr.splice(-1);
        return fileBaseArr.join('.');
	}
	function html2js(value) {
		return value.replace(/^\s+|\s+$/g, '').replace(/\r\n/g, "\\\n").replace(/'/g, "\\'");
	}
	function trans(file){
		var output = {},
			varName = '',
			fileName = '';
			fileBasePath = path.basename(file.path),
			filecontentTemp = iconv.decode(file.contents, options.encode);

        // 文件名
        fileName = filecontentTemp.match(/<!--filename:(\w+)-->/);
        try{
            output.fileName = fileName[1];
        }catch(e){
        	
            output.fileName = getFileName(fileBasePath);
        }
        
        //js变量名
        varName = filecontentTemp.match(/<!--varname:(\w+)-->/);
        try{
            output.varname = varName[1];
        }catch(e){
            output.varname = output.fileName;
        }
        
        filecontentTemp = html2js(filecontentTemp);
     	if(options.type=='amd' || options.type=='cmd' || options.type=='fmd'){
            var amdId  = options.modBase?options.modBase+'/'+output.fileName:output.fileName;
            output.fileContent = '(function() {\n  var tpl = \''+filecontentTemp+'\';\n\n  // cmd\n  if (typeof module !== "undefined" && module.exports) {\n      module.exports = tpl;\n  }\n  // amd\n if (typeof define === \"function\" && (define.amd||define.fmd)) {\n      define(\"'+amdId+'\", [], function () {\n          return tpl;\n      });\n  }\n})();'; 
	    }else{
	        output.fileContent = output.varname+'=\'' + filecontentTemp + '\';';
	    }
        return output;
	}
	return through.obj(function(file,enc,cb){
		if (file.isNull()) {
	      return cb(null, file);
	    }

	    if (file.isStream()) {
	      return cb(new gutil.PluginError('gulp-tpl2js', 'Stream not supported'));
	    }
	   	var compiledFile = trans(file);
	    file.contents = iconv.encode(compiledFile.fileContent, options.encode);
	    file.path = gutil.replaceExtension(path.basename(file.path), '.js');
	    this.push(file);

	    return cb();
	});
}