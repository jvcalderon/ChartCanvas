/**
 * ChartCanvas genera gráficos a partir de los datos facilitados. Para poder renderizar, debe extender cualquier clase proveída en ./types
 *
 * @package ChartCanvas
 * @license http://www.opensource.org/licenses/mit-license.php
 * @author José Vte.Calderón <jvcalcab@gmail.com>
 * @version 1.1.4
 */

//Construct----

var ChartCanvas = function(dom, settings) {
	this.__construct(dom, settings);
	};
	
/**
 * @param dom El objeto dom con el canvas que contendrá el gráfico
 * @param JSONdata La cadena JSON que recibe los parámetros de configuración
 */	
ChartCanvas.prototype.__construct = function (dom, JSONdata){
	
	//Default properties
	this._TIME_PRECISION = 'day'; //second, minute, hour, day, month, year
	this._COLORS = ['#739be4', '#edc240', '#5dc241', '#d22a2a', '#a9cafb', '#fffa71'];
	this._LABEL_LIST = new Array();
	this._LABEL_LIST_MARGIN = 15;
	this._GRAPH_TYPES = new Array();
	this._DEFAULT_WIDTH = 950;
	this._DEFAULT_HEIGHT = 320;
	
	this.dom = dom;
	this.data = JSONdata.data;
	this.ctx = this.dom.getContext('2d');
	this.auxColors = this._COLORS;
	
	if(JSONdata.precision != undefined)
		this._TIME_PRECISION = JSONdata.precision;
	
	if(JSONdata.colors != undefined)
		this._COLORS = JSONdata.colors;
	
	if(JSONdata.labels != undefined)
		this._LABEL_LIST = JSONdata.labels;
	
	this.getCanvasDimensions();
	this.getColors();
	
	};	
	
//Methods-------------	
	
/**
 * 
 */
ChartCanvas.prototype.getCanvasDimensions = function() {
	
	try
		{
		this.canvasWidth = $(this.dom).parent().width();
		this.canvasHeight = $(this.dom).parent().height();
		}
	catch(err)
		{
		console.log(err);
		this.canvasWidth = this._DEFAULT_WIDTH;
		this.canvasHeight = this._DEFAULT_HEIGHT;
		}
	
	};	
	
	
/**
 * 
 */
ChartCanvas.prototype.resize = function() {
	
	try
		{
		this.canvasWidth = $(this.dom).parent().width();
		}
	catch(err)
		{
		console.log(err);
		this.canvasWidth = this._DEFAULT_WIDTH;
		}
		
	};
		

/**
 * 
 */
ChartCanvas.prototype.render = function() {
	
	this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.renderGraph();
	this.renderLabelList();
	
	};
	

/**
 * renderLabelList genera el listado con la leyenda de colores
 */
ChartCanvas.prototype.renderLabelList = function() {
	
	if(this._LABEL_LIST.length > 0)
		{
		
		var fontSizeForList = 10;
		var listPadding = 5;
		var listWidth = 130;
		var maxCharWidth = 14;
		var numRows = this.getNumRowsInLabelList();
		var listHeight = (numRows * fontSizeForList) + (numRows * listPadding) + (listPadding*2);
		
		this.ctx.lineWidth = 1;
		this.ctx.fillStyle = "rgb(255,255,255)";
		
		this.ctx.font = fontSizeForList+"px Verdana";
		this.ctx.fillRect(this.canvasWidth-listWidth-this._LABEL_LIST_MARGIN-(listPadding*2), this._LABEL_LIST_MARGIN, listWidth-this._LABEL_LIST_MARGIN, listHeight);
		
		$currentRowCount = 0;
		for(var i=0; i<this._LABEL_LIST.length; i++)
			{

			var labelText = this._LABEL_LIST[i];
			
			if(labelText != '')
				{
			
				this.ctx.fillStyle = "rgb("+this._COLORS[i]+")";
				var top = ((listPadding+fontSizeForList)*$currentRowCount)+this._LABEL_LIST_MARGIN+listPadding;
				var left = (this.canvasWidth-listWidth)-listPadding-this._LABEL_LIST_MARGIN;
				this.ctx.fillRect(left, top, fontSizeForList+listPadding, fontSizeForList+Math.floor(listPadding/2));
				this.ctx.fillStyle = "rgb(88,88,88)";
				
				if(labelText.length > maxCharWidth)
					{
					labelText = labelText.substring(0, maxCharWidth)+'...';
					}
				
				this.ctx.fillText(labelText, left+fontSizeForList+(listPadding*2), top+fontSizeForList);
				
				$currentRowCount++;
				
				}
				
			}
		
		this.ctx.stroke();
		
		}
	
	};
	

ChartCanvas.prototype.getNumRowsInLabelList = function() {
	
	$numRows = 0;
	
	for(var i=0; i<this._LABEL_LIST.length; i++)
		{
		
		var labelText = this._LABEL_LIST[i];
		if(labelText != '')
			{
			$numRows++;
			}
		
		}
	
	return $numRows;
	
	};
	
	
/**
 * groupDataWithTimePrecision agrupa los datos según la unidad de tiempo facilitada
 */	
ChartCanvas.prototype.groupDataWithTimePrecision = function() {
	
	var globalGroupedArray = new Array;
	
	var auxTimestamp = 0;
	var value = 0;
	
	for(var i=0; i<this.data.length; i++)
		{
		
		var groupedArray = new Array;
		
		for(var j=0; j<this.data[i].length; j++)
			{
			
			var previousDate = this.formatTimeData(auxTimestamp);
			var currentDate = this.formatTimeData(parseInt(this.data[i][j][0]));
			
			if(previousDate == currentDate || j==0)
				{
				value = value+this.data[i][j][1];
				}
			else
				{
				value = this.data[i][j][1];
				}
			
			if(j==1 && previousDate != currentDate)
				{
				groupedArray.push([parseInt(this.data[i][0][0]), this.data[i][0][1]]);
				}
			
			if((previousDate != currentDate || i+1==this.data[i].length) && j>0)
				{
				var arrayValues = [parseInt(this.data[i][j][0]), value];
				groupedArray.push(arrayValues);
				}
			
			auxTimestamp = parseInt(this.data[i][j][0]);
			
			}
		
		globalGroupedArray.push(groupedArray);
		
		}
	
	this.data = globalGroupedArray;

	};		
	

/**
 * @param jsTimestamp 
 * @returns Cadena de texto con el timestamp formateado
 */
ChartCanvas.prototype.formatTimeData = function(jsTimestamp) {
	
	var date = new Date(jsTimestamp);
	var dateString = '';
	
	switch(this._TIME_PRECISION)
		{
	
		case 'milliseconds':
			var dateString = date.getUTCMilliseconds()+' ms.';
		case 'second':
			var dateString = date.getHours()+'h.'+date.getMinutes()+'m.'+date.getSeconds()+'s.';
		break;
		case 'minute':
			var dateString = date.getHours()+'h.'+date.getMinutes()+'m.';
		break;
		case 'hour':
			var dateString = date.getHours()+'h.';
		break;
		case 'day':
			var dateString = date.getUTCDate()+'/'+date.getMonth()+'/'+date.getFullYear();
		break;
		case 'month':
			var dateString = date.getMonth()+'/'+date.getFullYear();
		break;
		case 'year':
			var dateString = date.getFullYear();
		break;
		
		}
	
	return dateString;
	
	};	
	
	

/**
 * getColors genera los colores que usarán los valores del gráfico
 */
ChartCanvas.prototype.getColors = function() {
	
	var colors = new Array();
	var numColors = this.data.length + this.data[0].length;
	
	for(var i=0; i<numColors; i++)
		{
		
		if(this._COLORS[i] != undefined)
			{
			colors.push(this.hexToRgb(this._COLORS[i]));
			}
		else
			{
			colors.push(this.hexToRgb(this.getRandomColor()));
			}
		
		}

	this._COLORS = colors;
	
	};	
	

/**
 * @param hex Color en hexadecimal a convertir a rgb
 * @returns {String} Color en formato rgb
 */
ChartCanvas.prototype.hexToRgb = function(hex) {
	
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return parseInt(result[1], 16)+', '+parseInt(result[2], 16)+', '+parseInt(result[3], 16);
	
	};
	

/**
 * @returns {String} Devuelve un color aleatorio en formato hexadecimal
 */	
ChartCanvas.prototype.getRandomColor = function() { 
		   
	var hex = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
	var randomColor = "#"; 
	for (var i=0; i<6; i++) 
		{ 
	    randPosition = Math.random() * hex.length;
	    randPosition = Math.floor(randPosition);
	    randomColor+=hex[randPosition];
		}  
	
	return randomColor;
	
	}; 
	
	
	
	
try { 
	module.exports=ChartCanvas; //For Node.JS 
} catch(err) {}


try {	
	
	$(window).resize(function() {
		$(".ChartCanvas").each(function(){
			$(this).data('ChartCanvas').resize();
			$(this).data('ChartCanvas').render();
		});
	});	
} catch(err) {}
	