function extend(destination, source)
	{
	
	for (var property in source) {
	    if (typeof source[property] === "object") {
	      destination[property] = destination[property] || {};
	      arguments.callee(destination[property], source[property]);
	    } else {
	      destination[property] = source[property];
	    }
	  }
	
	return destination;
	
	}

module.exports.extend = extend;

