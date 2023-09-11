import * as d3 from "d3";

const barGraph = () => {
  const width = 450;
  const height = 300;
  let [mt, mb, mr, ml] = [30, 30, 30, 30];

  const svg = d3
    .select(".bar-wrap")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const graphWidth = width - ml - mr;
  const graphHeight = height - mt - mb;

  const graph = svg
    .append("g")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${ml + 10}, ${mt + 10})`);

  const xAxisG = graph
    .append("g")
    .attr("transform", `translate(0, ${graphHeight})`);
  const yAxisG = graph.append("g");

  d3.json("https://gleaming-tangy-umbra.glitch.me/allocations")
    .then(data => {
      const x = d3
        .scaleBand()
        .domain(data.map(item => item.name))
        .range([0, graphWidth])
        .padding(0.25);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.allocations)])
        .range([graphHeight, 0]);

      const bars = graph.selectAll("rect").data(data);

      bars
        .enter()
        .append("rect")
        .attr("height", d => graphHeight - y(d.allocations))
        .attr("width", x.bandwidth)
        .attr("fill", d => d.color)
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.allocations));

      bars
        .enter()
        .append("text")
        .attr("x", d => {
          if (d.allocations >= 100) {
            return x(d.name) + 4;
          } else if (d.allocations >= 10) {
            return x(d.name) + 9;
          } else if (d.allocations >= 1) {
            return x(d.name) + 12;
          }
          return x(d.name);
        })
        .attr("y", d => y(d.allocations) - 5)
        .text(d => d.allocations)
        .style("font-size", "12px")
        .attr("text-anchor", "start");

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      xAxisG.call(xAxis);
      yAxisG.call(yAxis);

      xAxisG
        .selectAll("text")
        .attr("fill", "#333")
        .attr("text-anchor", "middle");
    })
    .catch(err => {
      console.error(err);
    });
};

export default barGraph;
