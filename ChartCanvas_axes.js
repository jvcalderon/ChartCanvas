/**
 * La clase ChartCanvas_axes genera gráficos de tipo cartesiano
 * 
 * @author José Vte. Calderón Cabrera <jvcalderon@n2s-group.com>
 * @copyright Copyright (c) 2013 by New Network Solutions
 * 
 * @see graphicCanvas.js
 */

//Construct----

var ChartCanvas_axes = function(settings) { 
	this.__construct(settings);
	};
	

/**
 * @param {string} JSONdata La cadena JSON que recibe los parámetros de configuración
 */
ChartCanvas_axes.prototype.__construct = function (JSONdata) {	
	
	this.data = JSONdata.data;
	
	this._CELL_WIDTH = 27;
	this._FRAME_LINEWIDTH = 2;
	this._MARK_WIDTH = 4;
	this._MAX_FONT_SIZE = 10;
	this._MULTI_Y_AXIS = false;
	this._GRAPH_TYPES = ['linesFill', 'points'];
	this._BG_COLOR = '';
	
	if(JSONdata.graphTypes != undefined)
		this._GRAPH_TYPES = JSONdata.graphTypes;
	
	if(JSONdata.multiYAxis == true)
		this._MULTI_Y_AXIS = true;
	
	if(JSONdata.cellWidth != undefined)
		this._CELL_WIDTH = JSONdata.cellWidth;
	
	if(JSONdata.bgColor != undefined)
		this._BG_COLOR = JSONdata.bgColor;
	
	};
	
//Methods-------------	

ChartCanvas_axes.prototype.graphResize = function() {
		
		try {
			$(this.dom).attr('width', this.canvasWidth);
			$(this.dom).attr('height', this.canvasHeight);
			}
		catch(err)
			{
			console.log(err);
			this.canvasWidth = this._DEFAULT_WIDTH;
			this.canvasHeight = this._DEFAULT_HEIGHT;
			}
		
		};	
		

/**
 * renderGrid renderiza la matriz de cuadros del gráfico
 */
ChartCanvas_axes.prototype.renderGrid = function() {
	
	if(this._MULTI_Y_AXIS == false)
		var numYAxes = 1;
	else
		var numYAxes = this.data.length;
	
	var numOfXCells = Math.floor(this.canvasWidth/this._CELL_WIDTH);
	var numOfYCells = Math.floor(this.canvasHeight/this._CELL_WIDTH);

	this.modifyCanvasToMatchWithGrid(numOfXCells, numOfYCells);
	
	if(this._BG_COLOR != '')
		{
		this.ctx.fillStyle = "rgb("+this.hexToRgb(this._BG_COLOR)+")";
		this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
		}
	
	this.ctx.lineWidth = 1;
	this.ctx.beginPath();
	
	var left = this._CELL_WIDTH*numYAxes;
	for(var i=numYAxes; i<numOfXCells; i++)
		{
		this.ctx.moveTo(left, 0);
		this.ctx.lineTo(left, this.canvasHeight-this._CELL_WIDTH);
		left = left + this._CELL_WIDTH;
		}
	
	var top = this._CELL_WIDTH;
	for(var i=1; i<numOfYCells; i++)
		{
		this.ctx.moveTo(this._CELL_WIDTH*numYAxes, top);
		this.ctx.lineTo(this.canvasWidth-this._CELL_WIDTH, top);
		top = top + this._CELL_WIDTH;	
		}
	
	this.ctx.strokeStyle = "rgb(236,236,236)";
	this.ctx.stroke();
	
	};
	

/**
 * renderAxes renderiza los ejes numéricos X e Y
 */
ChartCanvas_axes.prototype.renderAxes = function() {
	
	this.ctx.lineWidth = this._FRAME_LINEWIDTH;
	this.ctx.beginPath();
	
	this.ctx.moveTo(this._CELL_WIDTH, this._FRAME_LINEWIDTH-1);
	this.ctx.lineTo(this.canvasWidth-this._CELL_WIDTH, this._FRAME_LINEWIDTH-1);
	this.ctx.moveTo(this._CELL_WIDTH, this.canvasHeight-this._CELL_WIDTH);
	this.ctx.lineTo(this.canvasWidth-this._CELL_WIDTH, this.canvasHeight-this._CELL_WIDTH);
	this.ctx.moveTo(this._CELL_WIDTH, 0);
	this.ctx.lineTo(this._CELL_WIDTH, this.canvasHeight-this._CELL_WIDTH);
	this.ctx.moveTo(this.canvasWidth-this._CELL_WIDTH, 0);
	this.ctx.lineTo(this.canvasWidth-this._CELL_WIDTH, this.canvasHeight-this._CELL_WIDTH);
	
	this.ctx.strokeStyle = "rgb(0,0,0)";
	this.ctx.stroke();
	
	this.renderXAxesDates();
	this.renderYAxesDates();
	
	};	
	
	
ChartCanvas_axes.prototype.renderMultiAxisGrid = function() {
	
	this.ctx.lineWidth = this._FRAME_LINEWIDTH;
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb(0,0,0)";

	this.ctx.moveTo(this.canvasWidth-this._CELL_WIDTH, this._FRAME_LINEWIDTH-1);
	this.ctx.lineTo((this._CELL_WIDTH * this.data.length), this._FRAME_LINEWIDTH-1);
	this.ctx.moveTo((this._CELL_WIDTH * this.data.length), this.canvasHeight-this._CELL_WIDTH);
	this.ctx.lineTo(this.canvasWidth-this._CELL_WIDTH, this.canvasHeight-this._CELL_WIDTH);
	this.ctx.moveTo(this.canvasWidth-this._CELL_WIDTH, 0);
	this.ctx.lineTo(this.canvasWidth-this._CELL_WIDTH, this.canvasHeight-this._CELL_WIDTH);

	this.ctx.stroke();
	
	for(var i=1; i<this.data.length+1; i++)
		{
		this.ctx.beginPath();
		this.ctx.strokeStyle = "rgb("+this._COLORS[i-1]+")";
		this.ctx.moveTo(this._CELL_WIDTH*i, 0);
		this.ctx.lineTo(this._CELL_WIDTH*i, this.canvasHeight-this._CELL_WIDTH);
		this.ctx.stroke();
		}
	
	this.ctx.strokeStyle = "rgb(0,0,0)";
	
	this.renderXAxesDates();
	this.renderYAxesDates();
	
	};
	

/**
 * renderXAxesDates renderiza los valores en el eje X
 */
ChartCanvas_axes.prototype.renderXAxesDates = function() {

	if(this._MULTI_Y_AXIS == true)
		var numYAxis = this.data.length;
	else
		var numYAxis = 1;
	
	var arrayGridLimits = this.getLimits();
	var marginSize = Math.floor(this._CELL_WIDTH/2);
	
	var fontSize = Math.floor((this._CELL_WIDTH*10)/25);
	if(fontSize > this._MAX_FONT_SIZE)
		{
		fontSize = this._MAX_FONT_SIZE;
		}
	
	var xAxesTop = this.canvasHeight+fontSize+(this._FRAME_LINEWIDTH*2)-this._CELL_WIDTH;
	
	this.ctx.fillStyle = "rgb(63,63,63)";
	this.ctx.font = fontSize+"px Verdana";
	this.ctx.beginPath();
	
	var numCellsWidth = this.canvasWidth/this._CELL_WIDTH;
	var numCellsInSectionXAxis = Math.floor((numCellsWidth*3)/20);
	if(numCellsInSectionXAxis < 3)
		{
		numCellsInSectionXAxis = 3;
		}
	
	var numSections = (numCellsWidth-(2 +(numYAxis-1)))/numCellsInSectionXAxis;

	var c=0;
	var positionLeft = this._CELL_WIDTH*numYAxis;
	var arrayGridLimits = this.getLimits();
	
	this.ctx.moveTo(positionLeft, this.canvasHeight-this._CELL_WIDTH+4);
	this.ctx.lineTo(positionLeft, this.canvasHeight-this._CELL_WIDTH);
	
	this.ctx.fillText(this.formatTimeData(arrayGridLimits['Xmin']), this._CELL_WIDTH*numYAxis, xAxesTop);
	
	var value = arrayGridLimits['Xmin'];
	var valueAux = '';
	var currentSection = 1;
	for(var i=0; i<numCellsWidth; i++)
		{
		
		c++;
		positionLeft = positionLeft + this._CELL_WIDTH;
		if(c==numCellsInSectionXAxis && (currentSection*numCellsInSectionXAxis)<=(numCellsWidth-(1+numYAxis)))
			{
			
			this.ctx.moveTo(positionLeft, this.canvasHeight-this._CELL_WIDTH+4);
			this.ctx.lineTo(positionLeft, this.canvasHeight-this._CELL_WIDTH);
			c=0;

			var value = value + ((arrayGridLimits['Xmax'] - arrayGridLimits['Xmin'])/numSections);
			
			if(valueAux != value)
				{
				
				if(numSections > currentSection)
					{
					this.ctx.fillText(this.formatTimeData(value), positionLeft, xAxesTop);
					}
				else if(numSections == currentSection)
					{
					this.ctx.fillText(this.formatTimeData(arrayGridLimits['Xmax']), this.canvasWidth-marginSize-this._CELL_WIDTH, xAxesTop);
					}
				
				}
			
			currentSection++;
			
			}
		
		var valueAux = value;
		
		}
	
	this.ctx.strokeStyle = "rgb(0,0,0)";
	this.ctx.stroke();
		
	};		
	
	
/**
 * renderYAxesDates renderiza los valores en el eje Y
 */
ChartCanvas_axes.prototype.renderYAxesDates = function() {

	if(this._MULTI_Y_AXIS == true)
		{
		var arrayGridLimits = this.getMultiYAxisLimits();
		var marginDate = this._MARK_WIDTH;
		}
	else
		{
		var arrayGridLimits = [this.getLimits()];
		var marginDate = 0;
		}
	
	for(var i=0; i<arrayGridLimits.length; i++)
		{
		
		var numCellsHeight = Math.floor((this.canvasHeight-1)/this._CELL_WIDTH);
		var numCellsInSectionYAxis = Math.floor((numCellsHeight*2)/8);
		var numSections = numCellsHeight/numCellsInSectionYAxis;
		
		var fontSize = Math.floor((this._CELL_WIDTH*10)/35);
		if(fontSize > this._MAX_FONT_SIZE)
			{
			fontSize = this._MAX_FONT_SIZE;
			}
		
		this.ctx.beginPath();
		
		if(this._MULTI_Y_AXIS == true)
			{
			this.ctx.fillStyle = "rgb("+this._COLORS[i]+")";
			this.ctx.strokeStyle = "rgb("+this._COLORS[i]+")";
			}
		else
			{
			this.ctx.fillStyle = "rgb(0, 0, 0)";
			this.ctx.strokeStyle = "rgb(0, 0, 0)";
			}
		
		this.ctx.fillText(arrayGridLimits[i]['Ymax'], (this._CELL_WIDTH*i)+marginDate, fontSize);
		
		var c = 0;
		var positionTop = this.canvasHeight-this._CELL_WIDTH;
		
		this.ctx.moveTo(this._CELL_WIDTH+(this._CELL_WIDTH*i), this._MARK_WIDTH-Math.floor(this._MARK_WIDTH/2));
		this.ctx.lineTo(this._CELL_WIDTH+(this._CELL_WIDTH*i)-this._MARK_WIDTH, this._MARK_WIDTH-Math.floor(this._MARK_WIDTH/2));
		
		var value = arrayGridLimits[i]['Ymin'];
		var currentSection = 1;
		for(var j=0; j<numCellsHeight; j++)
			{
			
			c++;
			if(c == numCellsInSectionYAxis)
				{
								
				positionTop = positionTop - (numCellsInSectionYAxis*this._CELL_WIDTH);
				
				this.ctx.moveTo(this._CELL_WIDTH+(this._CELL_WIDTH*i), positionTop);
				this.ctx.lineTo(this._CELL_WIDTH+(this._CELL_WIDTH*i)-4, positionTop);
				c=0;
				
				var value = Math.round((value + ((arrayGridLimits[i]['Ymax'] - arrayGridLimits[i]['Ymin'])/numSections))*10)/10;
				if(numSections > currentSection)
					{
					this.ctx.fillText(value, (this._CELL_WIDTH*i)+marginDate, positionTop);
					}
				
				currentSection++;
				
				}
			
			}
		
		this.ctx.stroke();
		
		}
	
	};	
	

/**
 * modifyCanvasToMatchWithGrid Modifica las dimensiones del canvas para hacerlo coincidir con la matriz
 * 
 * @param numOfXCells Número de celdas en el eje X
 * @param numOfYCells Número de celdas en el eje Y
 */
ChartCanvas_axes.prototype.modifyCanvasToMatchWithGrid = function(numOfXCells, numOfYCells) {
	
	if(this.canvasWidth % this._CELL_WIDTH > 0)
		{
		
		this.canvasWidth = (numOfXCells+1) * this._CELL_WIDTH;
		
		try 
			{
			$(this.dom).attr('width', this.canvasWidth);
			} 
		catch(err)
			{
			console.log(err);
			}
		
		}
	
	if(this.canvasHeight % this._CELL_WIDTH > 0)
		{
		
		this.canvasHeight = (numOfYCells+1) * this._CELL_WIDTH;
		
		try 
			{
			$(this.dom).attr('height', this.canvasHeight);
			}
		catch(err)
			{
			console.log(err);
			}
		
		}
	
	};
	
	
/**
 * modifyCanvasToMatchWithGrid obtiene las coordenadas donde se colocarán los valores en la gráfica
 * 
 * @returns {Array} Array bidimesional (x,y)
 */	
ChartCanvas_axes.prototype.getCoordinates = function() {
		
	var arrayGridLimits = this.getLimits();
	var arrayGridMultiYAxisLimits = this.getMultiYAxisLimits();
	var maxDatetime = arrayGridLimits['Xmax']-arrayGridLimits['Xmin'];
	var coordinatesGlobal = new Array();
	
	this.ctx.lineWidth = this._FRAME_LINEWIDTH;

	for(var i=0; i<this.data.length; i++)
		{
		
		var coordinates = new Array();
		
		for(var j=0; j<this.data[i].length; j++)
			{
			
			if(this._MULTI_Y_AXIS == true)
				{
				var maxYValue = arrayGridMultiYAxisLimits[i]['Ymax'];
				var numYAxis = this.data.length;
				}
			else
				{
				var maxYValue = arrayGridLimits['Ymax'];
				var numYAxis = 1;
				}
			
			var currentValueDatetime = arrayGridLimits['Xmax'] - this.data[i][j][0];
			var marginLeftPosition = Math.floor((this.canvasWidth-this._CELL_WIDTH)-(currentValueDatetime * (this.canvasWidth-this._CELL_WIDTH))/maxDatetime);
			var marginTopPosition = Math.floor((this.canvasHeight-this._CELL_WIDTH+this._FRAME_LINEWIDTH)-(this.data[i][j][1] * (this.canvasHeight-this._CELL_WIDTH))/maxYValue);
			
			if(j==0)
				{
				marginLeftPosition = this._CELL_WIDTH*numYAxis;
				}
			
			if(marginLeftPosition<this._CELL_WIDTH*numYAxis)
				{
				marginLeftPosition = this._CELL_WIDTH*numYAxis;
				}
			
			coordinates.push([marginLeftPosition, marginTopPosition]);
			
			}
		
		coordinatesGlobal.push(coordinates);
		
		}
	
	return coordinatesGlobal;
	
	};	
	
	
/**
 * @returns {___arrayLimits0} Array con los valores máximos y mínimos de los ejes X e Y
 */
ChartCanvas_axes.prototype.getLimits = function() {
	
	var arrayLimits = new Object();
	arrayLimits['Xmax'] = 0;
	arrayLimits['Xmin'] = '';
	arrayLimits['Ymax'] = 0;
	arrayLimits['Ymin'] = 0;
	
	for(var i=0; i<this.data.length; i++)
		{
		
		for(var j=0; j<this.data[i].length; j++)
			{
			
			if(this.data[i][j][0] > arrayLimits['Xmax'])
				{
				arrayLimits['Xmax'] = this.data[i][j][0];
				}
			
			if(arrayLimits['Xmin'] == '' || this.data[i][j][0] < arrayLimits['Xmin'])
				{
				arrayLimits['Xmin'] = this.data[i][j][0];
				}
			
			if(this.data[i][j][1] > arrayLimits['Ymax'])
				{
				arrayLimits['Ymax'] = this.data[i][j][1];
				}
			
			}
		
		}
	
	arrayLimits['Ymax'] = arrayLimits['Ymax']+1;
	
	return arrayLimits;
	
	};	
	

/**
* @returns {___arrayLimits0} Array con los valores máximos y mínimos de cada grupo para el eje Y
*/
ChartCanvas_axes.prototype.getMultiYAxisLimits = function() {	
	
	var arrayLimits = new Array();
	
	for(var i=0; i<this.data.length; i++)
		{
	
		var arrayAux = new Object();
		arrayAux['Ymax'] = 0;
		arrayAux['Ymin'] = '';
		
		for(var j=0; j<this.data[i].length; j++)
			{
			
			if(this.data[i][j][1] > arrayAux['Ymax'])
				{
				arrayAux['Ymax'] = this.data[i][j][1];
				}
		
			if(arrayAux['Ymin'] == '' || this.data[i][j][1] < arrayAux['Ymin'])
				{
				arrayAux['Ymin'] = this.data[i][j][1];
				}
			
			}
		
		arrayLimits.push(arrayAux);
		arrayLimits[i]['Ymax'] = arrayLimits[i]['Ymax']+1;
		
		
		}
	
	return arrayLimits;
	
	};

	
/**
 *
 */	
ChartCanvas_axes.prototype.renderGraph = function() {
	
	this.groupDataWithTimePrecision();
	this.graphResize();
	this.renderGrid();
	
	if(this._MULTI_Y_AXIS == false)
		{
		this.renderAxes();
		}
	else
		{
		this.renderMultiAxisGrid();
		}
	
	var coordinates = this.getCoordinates();

	for(var i=0; i<this._GRAPH_TYPES.length; i++)
		{
		
		if(this._GRAPH_TYPES[i] == 'lines')
			this.renderLine(coordinates, 0);
		
		if(this._GRAPH_TYPES[i] == 'linePoints')
			{
			this.renderLine(coordinates, 0);
			this.renderPoint(coordinates);
			}
		
		if(this._GRAPH_TYPES[i] == 'linesFill')
			{
			this.renderLine(coordinates, 1);
			this.renderPoint(coordinates);
			}
		
		if(this._GRAPH_TYPES[i] == 'steps')
			this.renderSteps(coordinates, 0);
		
		if(this._GRAPH_TYPES[i] == 'stepsFill')
			this.renderSteps(coordinates, 1);
		
		if(this._GRAPH_TYPES[i] == 'bars')
			this.renderBars(coordinates);
		
		if(this._GRAPH_TYPES[i] == 'points')
			this.renderPoint(coordinates);
		
		}
	
	};	
	

/**
 * @param {Array} coordinates
 * @param {bool} fill
 */
ChartCanvas_axes.prototype.renderLine = function(coordinates, fill) {
	
	this.ctx.shadowColor = 'rgba(0,0,0,0.4)';
	
	for(var i=0; i<coordinates.length; i++)
		{

		this.ctx.strokeStyle = "rgb("+this._COLORS[i]+")";
		this.ctx.beginPath();
		
		for(var j=0; j<coordinates[i].length; j++)
			{
			
			if(j==0)
				{
				this.ctx.moveTo(coordinates[i][j][0], coordinates[i][j][1]);
				}
			else
				{
				this.ctx.lineTo(coordinates[i][j][0], coordinates[i][j][1]);
				}
			
			}

		this.ctx.stroke();
		
		if(fill == 1)
			{
			this.fillGraph(coordinates, i);
			}
		
		}
	
	};

	
/**
 * 
 * @param {Array} coordinates
 * @param {bool} fill (true, false) indica si la gráfica tiene relleno
 */	
ChartCanvas_axes.prototype.renderSteps = function(coordinates, fill)
	{

	for(var i=0; i<coordinates.length; i++)
		{
	
		this.ctx.strokeStyle = "rgb("+this._COLORS[i]+")";
		this.ctx.beginPath();
		
		for(var j=0; j<coordinates[i].length; j++)
			{
			
			if(j==0)
				{
				this.ctx.moveTo(coordinates[i][j][0], coordinates[i][j][1]);
				}
			else
				{
				this.ctx.lineTo(coordinates[i][j-1][0], coordinates[i][j][1]);
				this.ctx.lineTo(coordinates[i][j][0], coordinates[i][j][1]);
				}
			
			}
		
		this.ctx.stroke();
		
		if(fill == 1)
			{
			this.fillGraph(coordinates, i);
			}
		
		}
	
	};
	
	
/**
 * fillGraph rellena una gráfica con color
 * 
 * @param {Array} coordinates
 * @param index índice de la secuencia de valores afectada
 */	
ChartCanvas_axes.prototype.fillGraph = function(coordinates, index)
	{
	
	if(coordinates[index].length > 1)
		{
		this.ctx.fillStyle = "rgba("+this._COLORS[index]+",0.4)";
		this.ctx.lineTo(coordinates[index][coordinates[index].length-1][0], this.canvasHeight-this._CELL_WIDTH);
		this.ctx.lineTo(coordinates[index][0][0], this.canvasHeight-this._CELL_WIDTH);
		this.ctx.fill();
		}
	
	}
	

/**
 * @param {Array} coordinates
 */
ChartCanvas_axes.prototype.renderPoint = function(coordinates)
	{
	
	this.ctx.lineWidth = 2;
	this.ctx.fillStyle = "rgb(255,255,255)";
	
	for(var i=0; i<coordinates.length; i++)
		{

		this.ctx.strokeStyle = "rgb("+this._COLORS[i]+")";
		
		for(j=0; j<coordinates[i].length; j++)
			{
			this.ctx.beginPath();
			this.ctx.moveTo(coordinates[i][j][0], coordinates[i][j][1]);
			this.ctx.arc(coordinates[i][j][0], coordinates[i][j][1], 3, 0, 2 * Math.PI);
			this.ctx.stroke();
			this.ctx.fill();
			}
		
		}
	
	};
	

/**
 * @param {Array} coordinates
 */
ChartCanvas_axes.prototype.renderBars = function(coordinates)
	{
	
	var lineWidth = 2;
	var barWidth = 11;
	
	for(var i=0; i<coordinates.length; i++)
		{
	
		for(var j=0; j<coordinates[i].length; j++)
			{
			
			if(this.getLimits()['Xmax'] == this.data[i][j][0])
				{
				var width = 1;
				}
			else
				{
				var width = barWidth;
				}
			
			this.ctx.lineWidth = lineWidth;
			this.ctx.strokeStyle = "rgb("+this._COLORS[i]+")";
			this.ctx.fillStyle = "rgba("+this._COLORS[i]+", 0.4)";
			this.ctx.fillRect(coordinates[i][j][0], coordinates[i][j][1], width, this.canvasHeight-coordinates[i][j][1]-this._CELL_WIDTH-this._FRAME_LINEWIDTH);
			this.ctx.strokeRect(coordinates[i][j][0], coordinates[i][j][1], width, this.canvasHeight-coordinates[i][j][1]-this._CELL_WIDTH-this._FRAME_LINEWIDTH);
			}
		
		}
	
	};
	
	
	
try { 
	module.exports=ChartCanvas_axes; //For Node.JS 
} catch(err) {}	
	
	