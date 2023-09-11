import * as d3 from "d3";

const arc = () => {
  const dataset = [
    { name: "A", value: 5, color: "#178AFD" },
    { name: "B", value: 6, color: "#00E099" },
    { name: "C", value: 8, color: "#FE8045" },
    { name: "D", value: 1, color: "#DD1099" },
    { name: "E", value: 9, color: "#3360EF" }
  ];
  const width = 280;
  const height = 300;
  const radius = Math.min(width, height) / 2 - 10;
  const svg = d3
    .select(".arc-wrap")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  const pie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  // 5. pie 차트 SVG 요소 설정
  const pieGroup = g
    .selectAll(".pie")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "pie");

  const arc = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(65);

  pieGroup
    .append("path")
    .attr("d", arc)
    .attr("fill", d => d.data.color)
    .attr("opacity", 0.75)
    .attr("stroke", "white");

  const text = d3
    .arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);

  pieGroup
    .append("text")
    .attr("fill", "black")
    .attr("transform", function(d) {
      return "translate(" + text.centroid(d) + ")";
    })
    .attr("dy", "5px")
    .attr("font", "10px")
    .attr("text-anchor", "middle")
    .text(function(d) {
      return d.data.name;
    });
};

export default arc;
