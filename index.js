var gutil = require('gulp-util');
var through = require('through2');
module.exports = function(opt){
	var options = opt||{
		encode:'gbk'
	};

	function trans(file,enc,cb){
		console.log(file)
		if (file.isNull()) {
	      return cb(null, file);
	    }

	    if (file.isStream()) {
	      return cb(new gutil.PluginError('gulp-html2js', 'Streaming not supported'));
	    }

	    var fileContent = String(file.contents);

	    this.push(file);
	}

	return through.obj(trans);
}