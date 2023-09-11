import * as d3 from "d3";

const mapGr = () => {
  const initialScale = 5500; //확대시킬 값
  const initialX = -11900; //초기 위치값 X
  const initialY = 4050; //초기 위치값 Y

  console.dir(d3.geoPath());
  const projection = d3
    .geoMercator()
    .scale(initialScale)
    .translate([initialX, initialY]);

  const svg = d3
    .select(".map-wrap")
    .append("svg")
    .attr("width", 700)
    .attr("height", 500);

  const g = svg.append("g").attr("class", "group");

  const color = ["#0080FF", "red", "pink", "blue"];

  d3.json("korea.json").then(json => {
    console.log(json);

    color.forEach(el => console.log(el));

    g.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("class", "area")
      .attr("d", d3.geoPath().projection(projection))
      .attr("class", "countries")
      .attr(
        "fill",
        color.forEach(el => el)
      );

    g.selectAll("text")
      .data(json.features)
      .enter()
      .append("text")
      .attr("transform", d => {
        let locate = d3
          .geoPath()
          .projection(projection)
          .centroid(d);
        return `translate(${locate[0]}, ${locate[1]})`;
      })
      .text(d => d.properties.name)
      .attr("text-anchor", "middle");
  });
};

export default mapGr;
