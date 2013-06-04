ChartCanvas
===========

Generates simple charts in canvas with client side JS or Node.JS with a responsive design. ChartCanvas has the following functions:

- Cartesian charts
- Pie charts
- Multi axes charts
- Support for Node.JS
- Responsive design

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
			<td>Var</td>
			<td>Extension</td>
			<td>Description</td>
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

