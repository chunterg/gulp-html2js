var gutil = require('gulp-util');
module.exports = function(opt){
	var options = opt||{
		encode:'gbk'
	};

	function trans(file,cb){
		if (file.isNull()) {
	      return cb(null, file);
	    }

	    if (file.isStream()) {
	      return cb(new gutil.PluginError('gulp-html2js', 'Streaming not supported'));
	    }

	    var fileContent = String(file.contents);

	    console.log(fileContent)
	}

	return trans;
}