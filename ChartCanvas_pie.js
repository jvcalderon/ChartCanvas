/**
 * La clase ChartCanvas_pie genera gráficos de tipo "pie chart"
 * 
 * @author José Vte. Calderón Cabrera <jvcalderon@n2s-group.com>
 * @copyright Copyright (c) 2013 by New Network Solutions
 * 
 * @see graphicCanvas.js
 */

//Construct----

var ChartCanvas_pie = function(settings) {
	this.__construct(settings);
	};

	
/**
 * @param {string} JSONdata La cadena JSON que recibe los parámetros de configuración
 */
ChartCanvas_pie.prototype.__construct = function (JSONdata) {	
	
	this.data = JSONdata.data;
	
	this._LABEL_LIST_MARGIN = 5;
	this._GRAPH_TYPES = ['pie'];
	
	if(JSONdata.graphTypes != undefined)
		this._GRAPH_TYPES = JSONdata.graphTypes;
	
	};
	
//Methods-------------		

/**
 * 
 */
ChartCanvas_pie.prototype.graphResize = function() {
	$(this.dom).attr('width', this.canvasWidth);
	$(this.dom).attr('width', this.canvasWidth);
	};	

	
/**
 * 
 */	
ChartCanvas_pie.prototype.renderGraph = function() {
	
	this.graphResize();

	var padding = 5;
	var pieCenterLeft = Math.floor(this.canvasWidth/2);
	var pieCenterTop = Math.floor(this.canvasHeight/2);
	
	var radiusWidth = pieCenterTop-padding;
	var circleDiameter = 2*Math.PI;
	var startAngleInRadians = 0;
	var endAngleInRadians = 0;
	var valueSum = 0;
	
	for(var i=0; i<this.data[0].length; i++)
		{
		valueSum = valueSum+this.data[0][i][1];
		}
	
	for(var i=0; i<this.data[0].length; i++)
		{
		
		this.ctx.beginPath();
		this.ctx.moveTo(pieCenterLeft, pieCenterTop);
		this.ctx.fillStyle = "rgb("+this._COLORS[i]+")";
		this.ctx.strokeStyle = "rgb(255,255,255)";
		this.ctx.lineWidth = 1;
		
		var endAngleInRadians = endAngleInRadians+(this.data[0][i][1] * circleDiameter)/valueSum;
		this.ctx.arc(pieCenterLeft, pieCenterTop, radiusWidth, startAngleInRadians, endAngleInRadians);
		this.ctx.lineTo(pieCenterLeft, pieCenterTop);
		
		startAngleInRadians = endAngleInRadians;
		
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.strokeStyle = "rgba(255,255,255, 0)";
		
		}
	
	this.renderDonutHole(radiusWidth, pieCenterLeft, pieCenterTop);
	
	};
	

/**
 * renderDonutHole dibuja un círculo en blanco en medio del pie chart para simular un "donut"
 * 
 * @param {integer} radiusWidth Tamaño del radio en px
 * @param {integer} pieCenterLeft Distancia del centro a la izquierda del canvas
 * @param {integer} pieCenterTop Distancia del centro a la parte superior del canvas
 */
ChartCanvas_pie.prototype.renderDonutHole = function(radiusWidth, pieCenterLeft, pieCenterTop) {	
	
	if(this._GRAPH_TYPES[0] == 'donut')
		{
		this.ctx.beginPath();
		this.ctx.moveTo(pieCenterLeft, pieCenterTop);
		this.ctx.fillStyle = "rgb(255,255,255)";
		this.ctx.arc(pieCenterLeft, pieCenterTop, Math.floor(radiusWidth/2), 0, 2*Math.PI);
		this.ctx.fill();
		}
	
	};
	
	