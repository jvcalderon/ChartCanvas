ChartCanvas
===========

Generates simple charts in canvas with client side JS or Node.JS with a responsive design. ChartCanvas has the following functions:

- Cartesian charts
- Pie charts
- Multi axes charts
- Support for Node.JS
- Responsive design

Before you read this doc. I recommend see the example HTML file in doc directory.

## Basic use

To use ChartCanvas class you must be include in your HTML: jQuery, ChartCanvas.js file, and chart types that you want to use in your project:

<pre><code>
&lt;!-- You must include this code in HEAD --&gt;
&lt;head&gt;
  &lt;script src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;ChartCanvas.js&quot;&gt;&lt;/script&gt;
  
  &lt;!-- Now you must include the chart type you need--&gt;
  &lt;script src=&quot;types/ChartCanvas_axes.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;types/ChartCanvas_pie.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
</code></pre>

Then we must create one or more canvas elements with the attribute 'class = "ChartCanvas"'. For example:

<pre><code>
&lt;canvas id=&quot;canvas&quot; width=&quot;805&quot; height=&quot;315&quot; class=&quot;ChartCanvas&quot;&gt;
    Fallback content
&lt;/canvas&gt;
</code></pre>

Then we create an array of data that need to display in the graph, with the structure: 
<strong>array [[timestam1, value1], [timestam2, value2]]</strong> in the case of Cartesian graphs or <strong>array [[index1, value1] , [index2, value2]]</strong> in the case of "pie charts".

Once we have the array, we have to create the JSON string to serve as a setting for our graph.
We will generate a graph of type "pie chart" as an example:

<pre><code>
var dataArrayX = new Array();
var dataBar11_X = [
      [1, 2], 
  	  [2, 1],
      [3, 1],
      [4, 6],
      [5, 1],
      [6, 2]];
dataArrayX.push(dataBar11_X); //Each group of data to display in the chart is inserted into the main array. In this there is only one group becouse this is a Pie Chart

var jsonSettingsX = { "data" :    dataArrayX,
    "labels" : ['Pepe', 'Juan', 'Manolo', 'Ana', 'Eustaquio', 'Robustiana'],
    "graphTypes" : ["donut"]
    };
    
var canvas = $.extend(new ChartCanvas($("#canvas")[0], jsonSettingsX), new ChartCanvas_pie(jsonSettingsX));
$("#canvas").data('ChartCanvas', canvas);
$("#canvas").data('ChartCanvas').render();    
</code></pre>

You can see the result in: https://raw.github.com/jvcalderon/ChartCanvas/master/doc/pieChart.jpeg

If you look at the code above, we see that "ChartCanvas" extends in this case "ChartCanvas_pie" if it were a Cartesian graph extend "ChartCanvas_axes".

## JSON Configuration

You can set the following vars with the configuration text in JSON:

<table>
	<thead>
		<tr>
			<td><strong>Var</strong></td>
			<td><strong>Extension</strong></td>
			<td><strong>Description</strong></td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>bgColor</td>
			<td>axes</td>
			<td>[OPTIONAL. Transparent BY DEFAULT] Background color - {'bgColor' : '#ffffff'} //The values should be hex.</td>
		</tr>
		<tr>
			<td>cellWidth</td>
			<td>axes</td>
			<td>[OPTIONAL] Width for each cell - {'cellWidth': value}</td>
		</tr>
		<tr>
			<td>colors</td>
			<td>ALL</td>
			<td>[OPTIONAL] Colors for each group un chart - {'colors' : ['#42d316', '#457cbf', '#FF0000']} // Hex. values</td>
		</tr>
		<tr>
			<td>data</td>
			<td>ALL</td>
			<td>[MANDATORY] Chart data - { 'data' : arrayData }</td>
		</tr>
		<tr>
			<td>graphTypes</td>
			<td>axes, pie</td>
			<td>[OPTIONAL] Chart type as the extended class. They can merge two types superimposed on one canvas - {'graphTypes': ['type1', 'type2' ...]}</td>
		</tr>
		<tr>
			<td>labels</td>
			<td>ALL</td>
			<td>[OPTIONAL] Labels for each group of graphic value. For pie charts each record is read as a group - {'labels': ['value1', 'value2' ...]}</td>
		</tr>
		<tr>
			<td>multiYAxis</td>
			<td>axes</td>
			<td>[OPTIONAL] Boolean true / false. Tell whether each group will have different Y-axes values ​​(true) or share the same (false) - {'multiYAxis': value}</td>
		</tr>
		<tr>
			<td>precision</td>
			<td>ALL</td>
			<td>[OPTIONAL. "day" BY DEFAULT] Minimum unit of time in a Cartesian graph - {'precision': value} / / Possible values ​​are: millisecond, second, minute, hour, day, month, year</td>
		</tr>
	</tbody>
</table>

## Available extensions

### ChartCanvas_axes
Cartesian charts.
* graphTypes: lines, linesFill, linesPoints, steps, stepsFill, bars, points

### ChartCanvas_pie
Pie charts.
* graphTypes: donut, pie

## Examples

Sets of values on a cartesian chart.
You can see the example image in: https://raw.github.com/jvcalderon/ChartCanvas/master/doc/cartesianGraph.jpeg

And here is the code:

<pre><code>
var dataArray = new Array();

var dataBar11_0 = [
    [1338501600000, 2]
    , [1338933600000, 1]
    , [1339106400000, 1]
    , [1339279200000, 6]
    , [1340488800000, 1]
    , [1341093600000, 2]                                                    
    ];
dataArray.push(dataBar11_0);
 
var dataBar11_1 = [
    [1338588000000, 1]
    , [1338847200000, 1]
    , [1339279200000, 4]
    , [1339365600000, 1]
    , [1339538400000, 1]
    , [1339624800000, 1]
    , [1339711200000, 6]
    , [1340316000000, 3]
    , [1340402400000, 1]
    , [1340488800000, 2]
    , [1341007200000, 1]
    , [1341093600000, 1]            
    ];
 
 
dataArray.push(dataBar11_1);
    var dataBar11_2 = [
    [1338588000000, 3]
    , [1338847200000, 10]
    , [1339279200000, 8]
    , [1339365600000, 2]                
    ];
dataArray.push(dataBar11_2);
 
var jsonSettings = { "data" :     dataArray,
    "precision" : "day",
    "graphTypes" : ["points", "linesFill"],
    "labels" : ['Grafica 1', 'Otra grafica mas', 'Y otra']
    };
 
 
var canvas = $.extend(new ChartCanvas($("#canvas")[0], jsonSettings), new ChartCanvas_axes(jsonSettings));
$("#canvas").data('ChartCanvas', canvas);
$("#canvas").data('ChartCanvas').render();
</code></pre>

## Using ChartCanvas with Node.JS

We can use ChartCanvas as a Node.JS module. Here is an example for convert a canvas into a PNG.

To install the necessary modules we move into the directory where you saved the ChartCanvas folder and run:

<pre><code>
npm install canvas #Allow us to convert a canvas to PNG
npm install jsdom #Allows the use of JQuery on server
</code></pre>

And here the code:

<pre><code>
var Jsdom = require('jsdom');
var ChartCanvas = require('./ChartCanvas/ChartCanvas.js');  
var Extend = require('./extendClasses.js');
var Canvas = require('canvas')
    , fs = require('fs');
 
//Chart data------------------------------
 
dataArray.push(dataBar11_1);
    var dataBar11_2 = [
    [1338588000000, 3]
    , [1338847200000, 10]
    , [1339279200000, 8]
    , [1339365600000, 2]                
    ];
dataArray.push(dataBar11_2);
  
var jsonSettings = { "data" :     dataArray,
    "precision" : "day",
    "graphTypes" : ["points", "linesFill"],
    "labels" : ['Grafica 1', 'Otra grafica mas', 'Y otra']
    };
 
//--------------------------
 
Jsdom.env({
    html: '<html><body></body></html>',
    scripts: [
        'http://code.jquery.com/jquery-1.5.min.js'
    ]
    }, function (err, window) {       
        var $ = window.jQuery;
        var canvas = new Canvas(800, 300);//Width and height
        var parent = new ChartCanvas(canvas, jsonSettings);
         
        //For Pie Chart
        var ChartCanvas_pie = require('./ChartCanvas/types/ChartCanvas_pie.js');
        var child = new ChartCanvas_pie(jsonSettings);
 
        /* //For cartesian graph
        var ChartCanvas_axes = require('./ChartCanvas/types/ChartCanvas_axes.js');
        var child = new ChartCanvas_axes(jsonSettings);
        */
         
        var objCanvas = Extend.extend(parent, child);
        objCanvas.render(); 
        Canvas.ctx = objCanvas.ctx;
         
        var out = fs.createWriteStream(__dirname + 'myPNG.png')
        , stream = canvas.createPNGStream();
 
        stream.on('data', function(chunk){
            out.write(chunk);
            });
 
    });
</code></pre>

## How to install ChartCanvas on Symfony2

* You must modify composer.json file with the following code:
<pre><code>
	...
	"repositories": [
	        {
		        "type": "package",
		        "package": {
		            "name": "jvcalderon/ChartCanvas",
		            "version": "1.1.5",
		            "dist": {
		                "url": "https://github.com/jvcalderon/ChartCanvas/archive/1.1.5.zip",
		                "type": "zip"
		            }
		        }
	        }
	    ],
	...
	 "require": {
		...
        "jvcalderon/ChartCanvas": "1.1.*"
    },
</code></pre>

* Now you must update the vendors:
<pre><code>
	composer update
</code></pre>

That's all!

You can include the scripts in your Twig template with Assetic:
<pre><code>
	{% javascripts
		'%kernel.root_dir%/../vendor/jvcalderon/ChartCanvas/ChartCanvas.js'
		'%kernel.root_dir%/../vendor/jvcalderon/ChartCanvas/types/ChartCanvas_axes.js'
		'%kernel.root_dir%/../vendor/jvcalderon/ChartCanvas/types/ChartCanvas_pie.js'
		%}
		<script type="text/javascript" charset="utf-8" src="{{ asset_url }}"></script>
	{% endjavascripts %}
</code></pre>

