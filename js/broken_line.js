import * as d3 from "d3";

const brokenLine = () => {
  const dataset = [
    [5, 20],
    [25, 67],
    [85, 50],
    [150, 70],
    [220, 88],
    [250, 50],
    [330, 95],
    [410, 12],
    [475, 44],
    [480, 90]
  ];

  const width = 800;
  const height = 400;
  const margin = { top: 30, bottom: 60, right: 30, left: 60 };

  const svg = d3
    .select(".broken-line")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset, function(d) {
        return d[0];
      })
    ])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset, function(d) {
        return d[1];
      })
    ])
    .range([height - margin.bottom, margin.top]);

  const axisx = d3.axisBottom(xScale).ticks(5);
  const axisy = d3.axisLeft(yScale).ticks(5);

  svg
    .append("g")
    .attr("transform", "translate(" + 0 + "," + (height - margin.bottom) + ")")
    .call(axisx)
    .append("text")
    .attr("fill", "black")
    .attr("x", (width - margin.left - margin.right) / 2 + margin.left)
    .attr("y", 35)
    .attr("text-anchor", "middle")
    .attr("font-size", "10pt")
    .attr("font-weight", "bold")
    .text("X Label");

  svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + 0 + ")")
    .call(axisy)
    .append("text")
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("x", -(height - margin.top - margin.bottom) / 2 - margin.top)
    .attr("y", -35)
    .attr("transform", "rotate(-90)")
    .attr("font-weight", "bold")
    .attr("font-size", "10pt")
    .text("Y Label");

  svg
    .append("path")
    .datum(dataset)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function(d) {
          return xScale(d[0]);
        })
        .y(function(d) {
          return yScale(d[1]);
        })
    );

  svg
    .append("g")
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d[0]);
    })
    .attr("cy", function(d) {
      return yScale(d[1]);
    })
    .attr("fill", "steelblue")
    .attr("r", 4);
};

export default brokenLine;
