/**
 * Created by rahul on 1/12/2016.
 */
import * as css from './main.css';
import * as d3 from 'd3';
import * as _ from 'lodash';

var dataSet = _.map(_.range(1, 50), function (i) {
    return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 30
    }
})

var margin = {top: 0, right: 0, bottom: 0, left: 0};
var w = 400 - margin.left - margin.right,
    h = 300 - margin.top - margin.bottom;

var svg = d3.select('#chartArea').append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, w]);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataSet, function(d) {
        return d.y;
    })])
    .range([h, 0]);

var colorScale = d3.scaleLinear()
    .domain([0, dataSet.length])
    .range(['yellow', 'red']);

svg.selectAll('circle')
    .data(dataSet)
    .enter()
    .append('circle')
    .attr('class', 'bubble')
    .attr('cx', function(d) {
        return xScale(d.x);
    })
    .attr('cy', function(d) {
        return yScale(d.y);
    })
    .attr('r', function (d) {
        return d.r;
    })
    .attr('fill', colorScale)
    .on('mouseover', function(d) {
        d3.select(this).classed('active', true);
    })
    .on('mouseout', function(d) {
        d3.select(this).classed('active', false);
    })
    .on('mousedown', function(d) {
        d3.select(this).attr('r', d.r * 2);
    })
    .on('mouseup', function(d) {
        d3.select(this).attr('r', d.r);
    });


