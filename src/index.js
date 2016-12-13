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

var margin = {top: 20, right: 30, bottom: 30, left: 30};
var w = 600 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;

var svg = d3.select('#chartArea').append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .attr('viewBox', '0 0 ' + (w + margin.left + margin.right) + ' ' + (h + margin.top + margin.bottom));

const g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, w]);

var xAxis = d3.axisBottom(xScale).ticks(5);

g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0, ' + (h) + ')')
    .call(xAxis);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataSet, function(d) {
        return d.y;
    })])
    .range([h, 0]);

var yAxis = d3.axisLeft(yScale).ticks(5);

g.append('g')
    .attr('class', 'y-axis')
    .attr('transform', 'translate(-5, 0)')
    .call(yAxis);

var colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range(['yellow', 'red']);

g.selectAll('circle')
    .data(dataSet)
    .enter()
    .append('circle')
    .attr('class', 'bubble')
    .attr('fill', colorScale);

g.selectAll('circle')
    .filter(function(d) {
        return d.x < 50;
    })
    .call(steppedTransition);

g.selectAll('circle')
    .filter(function(d) {
        return d.x > 50;
    })
    .call(plainTransition);

g.selectAll('circle')
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

function steppedTransition(selection) {
    selection
        .transition()
        .duration(500)
        .delay(function (d, i) {
            return i * 25;
        })
        .attr('cx', function(d) {
            return xScale(d.x);
        })
        .transition()
        .duration(500)
        .attr('cy', function(d) {
            return yScale(d.y);
        })
        .transition()
        .duration(500)
        .attr('r', function (d) {
            return d.r;
        })
}

function plainTransition(selection) {
    selection
        .transition()
        .duration(500)
        .delay(function (d, i) {
            return i * 25;
        })
        .attr('cx', function(d) {
            return xScale(d.x);
        })
        .attr('cy', function(d) {
            return yScale(d.y);
        })
        .attr('r', function (d) {
            return d.r;
        })
}
