import * as d3 from "d3";

const grScatter = () => {
  const width = 700;
  const height = 500;
  let [mt, mb, mr, ml] = [40, 40, 40, 40];

  const svg = d3
    .select(".circle-wrap")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const graphWidth = width - ml - mr;
  const graphHeight = height - mt - mb;

  const graph = svg
    .append("g")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${ml}, ${mt})`);

  const xAxisG = graph
    .append("g")
    .attr("transform", `translate(0, ${graphHeight})`);
  const yAxisG = graph.append("g");

  d3.json("https://gleaming-tangy-umbra.glitch.me/covid")
    .then(function(data) {
      [_, ...data] = [...data]; //전국 삭제
      console.log(data);

      const x = d3
        .scaleBand()
        .domain(data.map(item => item.지역이름))
        .range([0, graphWidth])
        .padding(0.25);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.확진자수)])
        .range([graphHeight, 0]);

      const bars = graph.selectAll("rect").data(data);

      bars
        .enter()
        .append("circle")
        .attr("fill", "hotpink")
        .attr("cx", d => x(d.지역이름) + 50)
        .attr("cy", d => y(d.확진자수))
        .attr("r", d => d.확진자수 / 250);

      bars
        .enter()
        .append("text")
        .attr("x", d => x(d.지역이름) + 20)
        .attr("y", d => {
          if (d.확진자수 >= 6000) {
            return y(d.확진자수) - 25;
          } else if (d.확진자수 >= 4000) {
            return y(d.확진자수) - 20;
          } else if (d.확진자수 >= 2000) {
            return y(d.확진자수) - 10;
          } else if (d.확진자수 >= 1000) {
            return y(d.확진자수) - 8;
          } else if (d.확진자수 >= 100) {
            return y(d.확진자수) - 5;
          } else if (d.확진자수 >= 10) {
            return y(d.확진자수) - 3;
          }
          return y(d.확진자수);
        })
        .text(d => `${d.확진자수} / ${d.지역이름}`)
        .style("font-size", "12px");
      // .attr('text-anchor', 'end')

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      xAxisG.call(xAxis);
      yAxisG.call(yAxis);

      xAxisG
        .selectAll("text")
        .attr("fill", "#333")
        // .attr('transform', 'rotate(-45)')
        .attr("text-anchor", "end");
    })
    .catch(function(err) {
      console.log("실패!!");
      console.error(err);
    });
};

export default grScatter;
