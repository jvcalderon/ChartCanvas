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

<head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="ChartCanvas.js"></script>
     
    <!-- En este punto se incluyen sólo las clases a usar; si por ejemplo no se van a utilizar gráficos de tipo "pie chart" podría eliminarse ChartCanvas_pie.js del DOM.-->
    <script src="types/ChartCanvas_axes.js"></script>
    <script src="types/ChartCanvas_pie.js"></script>
</head>

