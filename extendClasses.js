/**
 * @package ChartCanvas
 * @license http://www.opensource.org/licenses/mit-license.php
 * @author José Vte.Calderón <jvcalcab@gmail.com>
 * @version 1.1.4
 */

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

